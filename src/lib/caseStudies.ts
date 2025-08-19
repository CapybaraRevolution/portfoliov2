import { type CategoryType } from '@/components/ui/CategoryBadge'

export interface CaseStudyMetadata {
  title: string
  description: string
  slug: string
  category: CategoryType
  aiAccelerated?: boolean
  role?: string
  engagementType: 'Full-time' | 'Contract' | 'Advisory'
  location: string
  timeline: string
  status: 'Ongoing' | 'Completed'
  tools: string[]
  services: string[]
  order: number
}

// Case studies data - this will eventually be loaded from MDX frontmatter
export const caseStudies: CaseStudyMetadata[] = [
  {
    title: "FinTech Mobile App",
    description: "Comprehensive audit and clickable prototypes to secure funding by clarifying product vision to investors.",
    slug: "fintech",
    category: "Strategy",
    aiAccelerated: true,
    role: "UX Lead",
    engagementType: "Contract",
    location: "Remote",
    timeline: "2024–Present",
    status: "Ongoing",
    tools: ["Figma", "Jira", "Confluence", "Notion"],
    services: ["Prototyping", "Design Systems", "Stakeholder Alignment"],
    order: 1
  },
  {
    title: "Healthcare Portal",
    description: "Redesigning patient data access and care coordination workflows to improve outcomes and reduce administrative burden.",
    slug: "healthcare",
    category: "UX",
    aiAccelerated: true,
    role: "Senior UX Designer",
    engagementType: "Contract",
    location: "Remote",
    timeline: "2023–2024",
    status: "Completed",
    tools: ["Figma", "Miro", "Amplitude", "Notion"],
    services: ["User Research", "Service Design", "Data Visualization"],
    order: 2
  },
  {
    title: "Boveda Tr1n1ty",
    description: "From fragmented workflow to coherent, measurable experience—aligning stakeholders, simplifying flows, and shipping modernized UX.",
    slug: "boveda-tr1n1ty",
    category: "UX",
    aiAccelerated: false,
    role: "Business Analyst & Feature Designer",
    engagementType: "Contract",
    location: "Remote",
    timeline: "July 2018 – December 2019",
    status: "Completed",
    tools: ["Figma", "FigJam", "Notion", "Jira"],
    services: ["Product Vision", "User Research", "Information Architecture", "Wireframes & Prototypes", "Stakeholder Management", "Product Analytics"],
    order: 3
  },
  {
    title: "Old Skool Game Studios",
    description: "UX research + systematic design improvements that lifted engagement and fixed localization pain.",
    slug: "old-skool",
    category: "UX",
    aiAccelerated: false,
    role: "Lead UX Designer & UX Researcher",
    engagementType: "Full-time",
    location: "Remote",
    timeline: "January 2019 – September 2021",
    status: "Completed",
    tools: ["Figma", "FigJam", "Jira", "Confluence"],
    services: ["User Research", "Information Architecture", "Wireframes & Prototypes", "Usability Testing", "Stakeholder Alignment", "Communication", "Team Facilitation", "PRDs (Specs)", "System Design", "Agile Delivery"],
    order: 4
  }
]

export function getCaseStudyBySlug(slug: string): CaseStudyMetadata | undefined {
  return caseStudies.find(study => study.slug === slug)
}

export function getNextCaseStudy(currentSlug: string): CaseStudyMetadata | undefined {
  const sortedStudies = [...caseStudies].sort((a, b) => a.order - b.order)
  const currentIndex = sortedStudies.findIndex(study => study.slug === currentSlug)
  
  if (currentIndex === -1) return undefined
  
  // Wrap to first if on last
  const nextIndex = currentIndex + 1 >= sortedStudies.length ? 0 : currentIndex + 1
  return sortedStudies[nextIndex]
}

export function getAllCaseStudies(): CaseStudyMetadata[] {
  return [...caseStudies].sort((a, b) => a.order - b.order)
}