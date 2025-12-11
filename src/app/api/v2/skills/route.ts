import { NextResponse } from 'next/server'
import { getSkillsByStandardizedCategory } from '@/lib/skillMapping'

export async function GET() {
  try {
    const standardizedSkills = getSkillsByStandardizedCategory()
    const flatSkills = Object.values(standardizedSkills).flat()
    return NextResponse.json(flatSkills)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}
