export interface Project {
  id: string
  title: string
  description: string
  category: 'UX' | 'Strategy' | 'PM' | 'BA'
  skills: string[]
  ai: boolean
  image?: string
  href: string
  client?: string
  timeline?: string
  status: 'completed' | 'ongoing'
}

// Skills organized into new 5-category system
export const skillGroups = {
  'Strategy': [
    'Product Vision',
    'Roadmapping',
    'Backlog Shaping',
    'Scope Negotiation',
    'KPI Dashboards'
  ],
  'Discovery & Design': [
    'User Interviews',
    'Journey Mapping',
    'Service Design',
    'Wireframing',
    'Prototyping',
    'A/B Testing'
  ],
  'Build & Ship': [
    'Opportunity Framing',
    'Design Systems',
    'Event Instrumentation',
    'Release Planning',
    'Cross-team Facilitation'
  ],
  'Data & AI': [
    'Funnel Analysis',
    'Data Viz',
    'A/B Testing',
    'Event Instrumentation',
    'AI Prompt Design'
  ],
  'Leadership & Collaboration': [
    'Stakeholder Alignment',
    'Data Visualization',
    'Market Research',
    'Cross-team Facilitation'
  ]
} as const

// Flatten all skills for easy reference
export const allSkills = Object.values(skillGroups).flat()

// Primary discipline categories
export const disciplines = ['All', 'UX', 'Strategy', 'PM', 'Business Analysis'] as const

export const projects: Project[] = [
  {
    id: 'fintech-mobile-app',
    title: 'FinTech Mobile App',
    description: 'Comprehensive audit and clickable prototypes to secure funding by clarifying product vision to investors.',
    category: 'Strategy',
    skills: [
      'Product Vision',
      'Stakeholder Alignment',
      'Prototyping',
      'Design Systems',
      'Market Research',
      'Risk Surfacing'
    ],
    ai: true,
    href: '/case-studies/breeze-mortgage-hub',
    client: 'Confidential',
    timeline: '2024–Present',
    status: 'ongoing'
  },
  {
    id: 'healthcare-portal',
    title: 'Pharmaceutical Project Management Portal',
    description: 'Redesigning patient data access and care coordination workflows to improve outcomes and reduce administrative burden.',
    category: 'UX',
    skills: [
      'User Research',
      'Service Design',
      'Data Visualization',
      'Design Systems',
      'Accessibility',
      'Wireframing'
    ],
    ai: true,
    href: '/case-studies/healthcare',
    client: 'Confidential',
    timeline: '2023',
    status: 'completed'
  },
  {
    id: 'ai-ux-pipeline',
    title: 'AI-Powered UX Pipeline',
    description: 'Built comprehensive UX pipeline with AI-assisted analytics instrumentation for faster releases and cleaner handoffs.',
    category: 'PM',
    skills: [
      'Roadmapping',
      'Event Instrumentation',
      'KPI Dashboards',
      'AI Prompt Design',
      'Release Planning',
      'Cross-team Facilitation'
    ],
    ai: true,
    href: '/case-studies/avatar-generations',
    client: 'Navigator Games',
    timeline: '2021–2023',
    status: 'completed'
  }
]

// Helper functions
export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return projects
  return projects.filter(project => project.category === category)
}

export function getProjectsBySkills(skills: string[]): Project[] {
  if (skills.length === 0) return projects
  return projects.filter(project => 
    skills.some(skill => project.skills.includes(skill))
  )
}

export function getProjectsByAI(aiOnly: boolean): Project[] {
  if (!aiOnly) return projects
  return projects.filter(project => project.ai)
}

export function filterProjects(
  category: string = 'All',
  skills: string[] = [],
  aiOnly: boolean = false
): Project[] {
  let filtered = projects

  // Filter by category
  if (category !== 'All') {
    filtered = filtered.filter(project => project.category === category)
  }

  // Filter by AI
  if (aiOnly) {
    filtered = filtered.filter(project => project.ai)
  }

  // Filter by skills (OR logic - project must have at least one of the selected skills)
  if (skills.length > 0) {
    filtered = filtered.filter(project =>
      skills.some(skill => project.skills.includes(skill))
    )
  }

  return filtered
}