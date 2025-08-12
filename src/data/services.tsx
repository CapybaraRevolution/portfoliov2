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
      { label: 'Roadmapping', href: '/work/overview?tag=roadmapping' },
      { label: 'Backlog Grooming', href: '/work/overview?tag=backlog-grooming' },
      { label: 'Release Planning', href: '/work/overview?tag=release-planning' }
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
      { label: 'User Interviews', href: '/process?panel=user-interviews' },
      { label: 'Journey Mapping', href: '/process?panel=persona-journey-mapping' },
      { label: 'Competitive Analysis', href: '/work/overview?tag=competitive-analysis' }
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
      { label: 'Wireframes', href: '/process?panel=wireframes' },
      { label: 'Clickable Prototypes', href: '/process?panel=clickable-prototypes' },
      { label: 'Design Systems', href: '/process?panel=design-systems' }
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
      { label: 'Requirements', href: '/work/overview?tag=requirements' },
      { label: 'IA Map', href: '/process?panel=ia-map' },
      { label: 'Risk Surfacing', href: '/work/overview?tag=risk-analysis' }
    ],
    processLink: '/process#step-2',
    portfolioLink: '/work/overview?tag=business-analysis',
    expandedDetails: 'Business process mapping, functional specifications, and risk assessment with clear implementation guidance.'
  }
]