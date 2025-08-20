import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mapBackendSkill, getSkillsByStandardizedCategory } from '@/lib/skillMapping'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_BACKEND_URL!
const supabaseKey = process.env.SUPABASE_BACKEND_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data: backendSkills, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      // Fallback to standardized skills if backend fails
      const standardizedSkills = getSkillsByStandardizedCategory()
      const flatSkills = Object.values(standardizedSkills).flat()
      return NextResponse.json(flatSkills)
    }

    // Map backend skills to standardized format
    const mappedSkills = (backendSkills || []).map(skill => mapBackendSkill(skill))
    
    // If no backend skills, return standardized skills
    if (mappedSkills.length === 0) {
      const standardizedSkills = getSkillsByStandardizedCategory()
      const flatSkills = Object.values(standardizedSkills).flat()
      return NextResponse.json(flatSkills)
    }

    return NextResponse.json(mappedSkills)
  } catch (error) {
    console.error('API error:', error)
    // Fallback to standardized skills on error
    const standardizedSkills = getSkillsByStandardizedCategory()
    const flatSkills = Object.values(standardizedSkills).flat()
    return NextResponse.json(flatSkills)
  }
}