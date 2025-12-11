import { NextResponse } from 'next/server'
import { getAllCaseStudies } from '@/lib/caseStudies'

export async function GET() {
  try {
    const caseStudies = getAllCaseStudies()
    
    // Transform to API format
    const transformedData = caseStudies.map(study => ({
      id: `local-${study.slug}`,
      title: study.title,
      descriptiveTitle: study.descriptiveTitle,
      description: study.description,
      slug: study.slug,
      href: `/case-studies/${study.slug}`,
      category: study.category,
      status: study.status,
      timeline: study.timeline,
      aiAccelerated: study.aiAccelerated,
      tools: study.tools,
      services: study.services,
      order: study.order,
      comingSoon: study.comingSoon,
      underConstruction: study.underConstruction,
    }))

    return NextResponse.json(transformedData)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    )
  }
}
