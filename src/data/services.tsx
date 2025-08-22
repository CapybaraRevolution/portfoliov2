import { type ServiceCategory } from '@/lib/serviceTokens'

export interface Service {
  id: string
  title: string
  category: ServiceCategory
  blurb: string // 1-2 sentence value statement
  toolSlugs: string[] // references to toolsRegistry
  relatedSkills: Array<{
    label: string
    href: string
    skillId?: string // Standardized skill ID for process deep-linking
  }>
  processLink: string
  portfolioLink: string
  primarySkillId?: string // Primary skill for "How this fits into my process" link
  expandedDetails?: string // optional accordion content
}

export const services: Service[] = [
  {
    id: 'strategic-product-planning',
    title: 'Strategic Product Planning',
    category: 'PM',
    blurb: 'Product roadmaps and stakeholder alignment that translate business goals into actionable development plans.',
    toolSlugs: ['jira', 'confluence', 'notion', 'loom'],
    relatedSkills: [
      { label: 'Product Vision', href: '/work/overview?tag=product-vision', skillId: 'product-vision' },
      { label: 'Roadmap', href: '/work/overview?tag=roadmap', skillId: 'roadmap' },
      { label: 'Prioritization', href: '/work/overview?tag=prioritization', skillId: 'feature-prioritization' },
      { label: 'OKRs', href: '/work/overview?tag=okrs', skillId: 'okrs-goal-setting' }
    ],
    processLink: '/process#step-2',
    primarySkillId: 'feature-prioritization',
    portfolioLink: '/work/overview?tag=product-planning',
    expandedDetails: 'Deep dive into feature prioritization, cross-functional coordination, and agile methodology implementation with measurable outcomes.'
  },
  {
    id: 'user-research-strategy',
    title: 'User Research & Strategy', 
    category: 'UX',
    blurb: 'User insights through interviews and behavioral analysis that inform strategic product decisions.',
    toolSlugs: ['userinterviews', 'typeform', 'hotjar', 'ga4', 'maze'],
    relatedSkills: [
      { label: 'User Research', href: '/work/overview?tag=user-research', skillId: 'user-research' },
      { label: 'Usability Testing', href: '/work/overview?tag=usability-testing', skillId: 'usability-testing' },
      { label: 'Product Analytics', href: '/work/overview?tag=product-analytics', skillId: 'data-analytics-metrics' },
      { label: 'Experimentation', href: '/work/overview?tag=experimentation', skillId: 'ab-testing-experimentation' }
    ],
    processLink: '/process#step-1',
    primarySkillId: 'user-research', 
    portfolioLink: '/work/overview?tag=user-research',
    expandedDetails: 'Comprehensive user testing, persona development, and competitive analysis with actionable insights and recommendations.'
  },
  {
    id: 'design-prototyping',
    title: 'Design & Prototyping',
    category: 'UX',
    blurb: 'Intuitive interfaces from wireframes to design systems that balance user needs with business goals.',
    toolSlugs: ['figma', 'framer', 'principle', 'webflow'],
    relatedSkills: [
      { label: 'Wireframing', href: '/work/overview?skills=Wireframing', skillId: 'wireframing' },
      { label: 'Prototyping', href: '/work/overview?skills=Prototyping', skillId: 'prototyping' },
      { label: 'Information Architecture', href: '/work/overview?tag=information-architecture', skillId: 'information-architecture' },
      { label: 'Usability Testing', href: '/work/overview?tag=usability-testing', skillId: 'usability-testing' },
      { label: 'Stakeholder Alignment', href: '/work/overview?tag=stakeholder-alignment', skillId: 'stakeholder-alignment' }
    ],
    processLink: '/process#step-3',
    primarySkillId: 'wireframing',
    portfolioLink: '/work/overview?tag=design',
    expandedDetails: 'High-fidelity prototypes, design system documentation, and developer handoff with pixel-perfect specifications.'
  },
  {
    id: 'requirements-analysis',
    title: 'Requirements Analysis',
    category: 'BA', 
    blurb: 'Technical requirements gathering that bridges stakeholder needs with development feasibility.',
    toolSlugs: ['confluence', 'notion', 'airtable'],
    relatedSkills: [
      { label: 'PRDs (Specs)', href: '/work/overview?tag=prds-specs', skillId: 'product-requirement-docs' },
      { label: 'System Design', href: '/work/overview?tag=system-design', skillId: 'systems-architecture' },
      { label: 'APIs & Integrations', href: '/work/overview?tag=apis-integrations', skillId: 'api-integration-design' },
      { label: 'Stakeholder Alignment', href: '/work/overview?tag=stakeholder-alignment', skillId: 'stakeholder-alignment' }
    ],
    processLink: '/process#step-2',
    primarySkillId: 'product-requirement-docs',
    portfolioLink: '/work/overview?tag=business-analysis',
    expandedDetails: 'Business process mapping, functional specifications, and risk assessment with clear implementation guidance.'
  }
]