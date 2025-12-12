import { createClient } from '@supabase/supabase-js'

// Backend Supabase client for portfolio data (case studies, skills)
const supabaseBackendUrl = process.env.NEXT_PUBLIC_SUPABASE_BACKEND_URL!
const supabaseBackendAnonKey = process.env.NEXT_PUBLIC_SUPABASE_BACKEND_ANON_KEY!

export const supabaseBackend = createClient(supabaseBackendUrl, supabaseBackendAnonKey)

// Server-side client with service role key (for API routes)
export const createBackendServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_BACKEND_SERVICE_ROLE_KEY!
  return createClient(supabaseBackendUrl, serviceRoleKey)
}

// Database types for backend tables
export interface Skill {
  id: number
  name: string
  category: string
  description?: string
  created_at: string
  updated_at: string
}

export interface CaseStudy {
  id: number
  slug: string
  title: string
  description: string
  category: string
  client?: string
  timeline?: string
  status: 'completed' | 'ongoing'
  ai_accelerated: boolean
  image_url?: string
  href: string
  content_path?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CaseStudySkill {
  id: number
  case_study_id: number
  skill_id: number
  is_primary: boolean
  created_at: string
}

// Extended types with joined data
export interface CaseStudyWithSkills extends CaseStudy {
  skills: Array<Skill & { is_primary: boolean }>
}

export interface SkillGroup {
  category: string
  skills: Skill[]
}

// Helper functions
export async function fetchSkillsByCategory(): Promise<SkillGroup[]> {
  const { data: skills, error } = await supabaseBackend
    .from('skills')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }

  // Group skills by category
  const grouped = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  return Object.entries(grouped).map(([category, skills]) => ({
    category,
    skills
  }))
}

export async function fetchCaseStudiesWithSkills(): Promise<CaseStudyWithSkills[]> {
  const { data, error } = await supabaseBackend
    .from('case_studies')
    .select(`
      *,
      case_study_skills (
        is_primary,
        skills (*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching case studies:', error)
    return []
  }

  // Transform the data to match our expected structure
  return data.map(study => ({
    ...study,
    skills: study.case_study_skills.map((css: any) => ({
      ...css.skills,
      is_primary: css.is_primary
    }))
  }))
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudyWithSkills | null> {
  const { data, error } = await supabaseBackend
    .from('case_studies')
    .select(`
      *,
      case_study_skills (
        is_primary,
        skills (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching case study:', error)
    return null
  }

  return {
    ...data,
    skills: data.case_study_skills.map((css: any) => ({
      ...css.skills,
      is_primary: css.is_primary
    }))
  }
}