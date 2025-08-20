import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mapBackendSkill } from '@/lib/skillMapping'
import { getAllCaseStudies } from '@/lib/caseStudies'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_BACKEND_URL!
const supabaseKey = process.env.SUPABASE_BACKEND_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data: caseStudies, error } = await supabase
      .from('case_studies')
      .select(`
        *,
        case_study_skills (
          skills (
            id,
            name,
            category
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // Fallback to local case studies on error
      const localCaseStudies = getAllCaseStudies()
      return NextResponse.json(localCaseStudies)
    }

    // Transform the backend data with proper skill mapping
    const transformedBackendData = caseStudies?.map(study => ({
      ...study,
      href: study.slug ? `/case-studies/${study.slug}` : `/case-studies/${study.title?.toLowerCase().replace(/\s+/g, '-')}`,
      skills: study.case_study_skills?.map((cs: any) => 
        cs.skills ? mapBackendSkill(cs.skills) : null
      ).filter(Boolean) || []
    })) || []

    // Get local case studies
    const localCaseStudies = getAllCaseStudies()
    
    // Convert local case studies to API format with mapped skills
    const transformedLocalData = localCaseStudies.map(study => ({
      id: `local-${study.slug}`,
      title: study.title,
      description: study.description,
      slug: study.slug,
      href: `/case-studies/${study.slug}`,
      category: study.category,
      status: study.status,
      timeline: study.timeline,
      created_at: study.timeline,
      skills: study.services.map(service => mapBackendSkill({
        id: service.toLowerCase().replace(/\s+/g, '-'),
        name: service,
        category: undefined
      }))
    }))

    // Merge backend and local data, avoiding duplicates
    const mergedData = [...transformedBackendData]
    transformedLocalData.forEach(localStudy => {
      const exists = transformedBackendData.some(
        backendStudy => backendStudy.title?.toLowerCase() === localStudy.title?.toLowerCase()
      )
      if (!exists) {
        mergedData.push(localStudy)
      }
    })

    return NextResponse.json(mergedData)
  } catch (error) {
    console.error('API error:', error)
    // Fallback to local case studies on error
    const localCaseStudies = getAllCaseStudies()
    return NextResponse.json(localCaseStudies)
  }
}