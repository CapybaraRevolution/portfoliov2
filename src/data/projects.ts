export interface Project {
  id: string
  title: string
  description: string
  category: 'UX' | 'Strategy' | 'PM' | 'Business Analysis'
  skills: string[]
  ai: boolean
  image?: string
  href: string
  client?: string
  timeline?: string
  status: 'completed' | 'ongoing'
}

// Skills organized according to IA brief
export const skillGroups = {
  'UX': [
    'User Interviews',
    'Journey Mapping', 
    'Wireframing',
    'Prototyping',
    'Design Systems',
    'Accessibility'
  ],
  'Strategy & Vision': [
    'Product Vision',
    'Stakeholder Alignment',
    'Opportunity Framing',
    'Market Research',
    'Competitive Analysis'
  ],
  'PM': [
    'Roadmapping',
    'Backlog Shaping',
    'Scope Negotiation',
    'Risk Surfacing',
    'Release Planning',
    'Cross-team Facilitation'
  ],
  'Analytics & AI': [
    'Event Instrumentation',
    'Funnel Analysis',
    'A/B Testing',
    'KPI Dashboards',
    'Data Viz',
    'AI Prompt Design'
  ]
} as const

// Flatten all skills for easy reference
export const allSkills = Object.values(skillGroups).flat()

// Primary discipline categories
export const disciplines = ['All', 'UX', 'Strategy', 'PM', 'Business Analysis'] as const

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform Redesign',
    description: 'Increased conversion rates by 34% and reduced cart abandonment by 28% through user research and strategic UX improvements.',
    category: 'UX',
    skills: [
      'User Interviews',
      'Journey Mapping',
      'Wireframing',
      'Prototyping',
      'Funnel Analysis',
      'A/B Testing',
      'Competitive Analysis'
    ],
    ai: false,
    href: '/case-studies/ecommerce',
    client: 'Mid-market fashion retailer',
    timeline: '6 months',
    status: 'completed'
  },
  {
    id: 'fintech-mobile-app',
    title: 'FinTech Mobile App',
    description: 'Comprehensive audit and clickable prototypes that helped secure funding by clearly demonstrating product vision to investors.',
    category: 'Strategy',
    skills: [
      'Product Vision',
      'Stakeholder Alignment',
      'Prototyping',
      'Design Systems',
      'Market Research',
      'Risk Surfacing'
    ],
    ai: false,
    href: '/case-studies/fintech',
    client: 'Breeze Mortgage Hub',
    timeline: '2024–Present',
    status: 'ongoing'
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Dashboard',
    description: 'Strategic IA redesign that streamlined donor experience and internal operations while aligning diverse stakeholders.',
    category: 'Strategy',
    skills: [
      'Stakeholder Alignment',
      'Opportunity Framing',
      'Wireframing',
      'Journey Mapping',
      'Cross-team Facilitation'
    ],
    ai: false,
    href: '/case-studies/saas',
    client: 'BC Cancer Foundation',
    timeline: '2023–Present',
    status: 'ongoing'
  },
  {
    id: 'healthcare-portal',
    title: 'Healthcare Portal',
    description: 'Modular patterns for hierarchical content with accessible system design and scalable information architecture.',
    category: 'UX',
    skills: [
      'Design Systems',
      'Accessibility',
      'Wireframing',
      'Stakeholder Alignment',
      'Opportunity Framing'
    ],
    ai: false,
    href: '/case-studies/healthcare',
    client: 'Cornell SC Johnson College of Business',
    timeline: '2023–2024',
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
    href: '/case-studies/saas',
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