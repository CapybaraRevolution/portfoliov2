// Feature flag utilities for safe backend rollout

export const featureFlags = {
  backendAPIEnabled: process.env.NEXT_PUBLIC_USE_BACKEND_API === 'true',
} as const

export function isBackendEnabled(): boolean {
  return featureFlags.backendAPIEnabled
}

// Type guard to ensure we handle both data sources
export function isBackendProject(project: any): project is import('./supabase-backend').CaseStudyWithSkills {
  return 'id' in project && typeof project.id === 'number'
}

// Convert backend case study to legacy project format for compatibility
export function convertBackendToLegacy(backendStudy: import('./supabase-backend').CaseStudyWithSkills): import('../data/projects').Project {
  return {
    id: backendStudy.slug,
    title: backendStudy.title,
    description: backendStudy.description,
    category: backendStudy.category as 'UX' | 'Strategy' | 'PM' | 'BA',
    skills: backendStudy.skills.map(skill => skill.name),
    ai: backendStudy.ai_accelerated,
    href: backendStudy.href,
    client: backendStudy.client,
    timeline: backendStudy.timeline,
    status: backendStudy.status
  }
}

// Convert legacy project skills to standardized backend skills for API calls
export function convertLegacySkillsToBackend(legacySkills: string[]): string[] {
  // This uses the same mapping logic from PortfolioGrid but in reverse
  const legacyToStandardizedMapping: Record<string, string> = {
    // Strategy
    'Product Vision': 'Product Vision',
    'Roadmapping': 'Roadmap',
    'Backlog Shaping': 'Prioritization',
    'Scope Negotiation': 'Prioritization',
    'KPI Dashboards': 'OKRs',
    
    // Discovery & Design
    'User Interviews': 'User Research',
    'User Research': 'User Research',
    'Journey Mapping': 'Information Architecture',
    'Service Design': 'Information Architecture',
    'Wireframing': 'Wireframes & Prototypes',
    'Prototyping': 'Wireframes & Prototypes',
    'A/B Testing': 'Usability Testing',
    
    // Build & Ship
    'Opportunity Framing': 'PRDs (Specs)',
    'Design Systems': 'System Design',
    'Event Instrumentation': 'APIs & Integrations',
    'Release Planning': 'Agile Delivery',
    'Cross-team Facilitation': 'Agile Delivery',
    
    // Data & AI
    'Funnel Analysis': 'Product Analytics',
    'Data Viz': 'Product Analytics',
    'AI Prompt Design': 'AI Integration',
    
    // Leadership
    'Stakeholder Alignment': 'Stakeholder Alignment',
    'Data Visualization': 'Communication',
    'Market Research': 'Storytelling'
  }

  return legacySkills
    .map(skill => legacyToStandardizedMapping[skill])
    .filter(Boolean)
}