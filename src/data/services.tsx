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
  }>
  processLink: string
  portfolioLink: string
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
      { label: 'Product Vision', href: '/work/overview?tag=product-vision' },
      { label: 'Roadmap', href: '/work/overview?tag=roadmap' },
      { label: 'Prioritization', href: '/work/overview?tag=prioritization' },
      { label: 'OKRs', href: '/work/overview?tag=okrs' }
    ],
    processLink: '/process#step-2',
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
      { label: 'User Research', href: '/work/overview?tag=user-research' },
      { label: 'Usability Testing', href: '/work/overview?tag=usability-testing' },
      { label: 'Product Analytics', href: '/work/overview?tag=product-analytics' },
      { label: 'Experimentation', href: '/work/overview?tag=experimentation' }
    ],
    processLink: '/process#step-1', 
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
      { label: 'Wireframes & Prototypes', href: '/work/overview?tag=wireframes-prototypes' },
      { label: 'Information Architecture', href: '/work/overview?tag=information-architecture' },
      { label: 'Usability Testing', href: '/work/overview?tag=usability-testing' },
      { label: 'Stakeholder Alignment', href: '/work/overview?tag=stakeholder-alignment' }
    ],
    processLink: '/process#step-3',
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
      { label: 'PRDs (Specs)', href: '/work/overview?tag=prds-specs' },
      { label: 'System Design', href: '/work/overview?tag=system-design' },
      { label: 'APIs & Integrations', href: '/work/overview?tag=apis-integrations' },
      { label: 'Stakeholder Alignment', href: '/work/overview?tag=stakeholder-alignment' }
    ],
    processLink: '/process#step-2',
    portfolioLink: '/work/overview?tag=business-analysis',
    expandedDetails: 'Business process mapping, functional specifications, and risk assessment with clear implementation guidance.'
  }
]