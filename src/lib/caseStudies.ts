import { type CategoryType } from '@/components/ui/CategoryBadge'

export interface CaseStudyMetadata {
  title: string
  descriptiveTitle: string
  client: string
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
  /** Required: One-sentence ambitious goal statement (renders with Aurora gradient) */
  goal: string
  /** Optional: Supporting detail for the goal (renders as body text below goal) */
  goalDetail?: string
}

// Case studies data - this will eventually be loaded from MDX frontmatter
export const caseStudies: CaseStudyMetadata[] = [
  // Temporarily unlisted - can be restored later
  // {
  //   title: "Pharmaceutical Project Management Portal",
  //   descriptiveTitle: "Pharmaceutical Project Management Portal",
  //   client: "Confidential",
  //   description: "Designed internal tools atop a Salesforce data model so researchers and business leaders could analyze budgets, track outcomes, and manage cross-system data with confidence.",
  //   slug: "healthcare",
  //   category: "UX",
  //   aiAccelerated: true,
  //   role: "Business Analyst, System Designer",
  //   engagementType: "Contract",
  //   location: "Remote",
  //   timeline: "June 2023",
  //   status: "Completed",
  //   tools: ["Salesforce", "Figma", "Miro", "Jira", "Confluence", "Tableau"],
  //   services: ["System Mapping", "API Analysis", "Information Architecture", "Data Visualization", "Wireframes", "Stakeholder Alignment"],
  //   order: 2,
  //   goal: "Design internal tools that let researchers and business leaders analyze budgets, track outcomes, and manage cross-system data with confidence."
  // },
  {
    title: "Cornell University — SC Johnson College of Business",
    descriptiveTitle: "Cornell University",
    client: "Cornell University — SC Johnson College of Business",
    description: "Unifying three distinct institutions through a cohesive digital experience",
    slug: "cornell-university",
    category: "Strategy",
    aiAccelerated: true,
    role: "UX Strategist",
    engagementType: "Contract",
    location: "Remote",
    timeline: "January – June 2024",
    status: "Completed",
    tools: ["Figma", "FigJam", "Hotjar", "Google Analytics", "LLM assistants"],
    services: ["Information Architecture", "Wireframing", "Prototyping", "Product Vision", "PRDs (Specs)", "Stakeholder Alignment", "System Design"],
    order: 2,
    goal: "Unify three distinct schools into one digital experience that feels coherent, findable, and maintainable",
    goalDetail: "This was not a visual refresh. It was a system-building job: shared navigation rules, shared page modules, and shared language, without sanding off each school's identity."
  },
  {
    title: "Breeze Mortgage Hub",
    descriptiveTitle: "Mortgage Platform",
    client: "Breeze",
    description: "Secured $2.3M Series A funding by transforming an incomplete product into a modern, AI-enabled mortgage experience",
    slug: "breeze-mortgage-hub",
    category: "UX",
    aiAccelerated: true,
    role: "UX Lead, Business Analyst & AI Strategist",
    engagementType: "Contract",
    location: "Remote",
    timeline: "2024 – September 2025",
    status: "Completed",
    tools: ["Figma", "AI Tools", "Tableau", "Salesforce"],
    services: ["Product Vision", "Roadmap", "Information Architecture", "Wireframing", "Prototyping", "Usability Testing", "PRDs (Specs)", "System Design", "AI Integration", "Product Analytics", "Stakeholder Alignment", "Team Facilitation"],
    order: 1,
    goal: "Transforming an incomplete product into a modern AI-enabled mortgage experience.",
    goalDetail: "The outcome wasn't \"prettier screens.\" It was transforming a messy beta into a buildable product with fewer interpretation gaps, a scalable design system, and clearer information architecture."
  },
  {
    title: "AMFA Class Filter Redesign",
    descriptiveTitle: "Museum Filter/Sort Experience",
    client: "Arkansas Museum of Fine Arts",
    description: "Improving navigation and registration through smarter filtering and cross-system user flows for the Arkansas Museum of Fine Arts",
    slug: "amfa-class-filter-redesign",
    category: "UX",
    aiAccelerated: false,
    role: "UX Designer, Systems Analyst & Facilitator",
    engagementType: "Contract",
    location: "Remote",
    timeline: "February 2024 – Present",
    status: "Ongoing",
    tools: ["Figma", "FigJam", "Miro", "Notion"],
    services: ["Information Architecture", "Wireframing", "Prototyping", "Stakeholder Alignment", "Product Analytics", "Usability Testing", "PRDs (Specs)", "Team Facilitation"],
    order: 3,
    goal: "Improve navigation and registration through smarter filtering and cross-system user flows."
  },
  {
    title: "Avatar: Generations",
    descriptiveTitle: "Mobile Game",
    client: "Navigator Games, Paramount, Nickelodeon",
    description: "UX leadership across a multi-stakeholder mobile RPG",
    slug: "avatar-generations",
    category: "UX",
    aiAccelerated: false,
    role: "UX Lead",
    engagementType: "Contract",
    location: "Remote",
    timeline: "September 2021 – September 2023",
    status: "Completed",
    tools: ["Figma", "FigJam", "Notion", "Jira", "Unity", "Lottie"],
    services: ["Stakeholder Alignment", "System Design", "Wireframing", "Prototyping", "PRDs (Specs)", "Roadmap", "Team Facilitation", "User Research", "Usability Testing", "Product Analytics", "Experimentation"],
    order: 4,
    goal: "Lead UX across a multi-stakeholder mobile RPG, balancing franchise requirements with player experience."
  },
  {
    title: "Social Finance Fund",
    descriptiveTitle: "Government Social Finance Initiative",
    client: "Social Finance Fund",
    description: "UX strategy + facilitation to align multi-org stakeholders and ship a usable IA/wireframe package",
    slug: "social-finance-fund",
    category: "Strategy",
    aiAccelerated: true,
    role: "Lead UX Strategist & Research Facilitator",
    engagementType: "Contract",
    location: "Remote",
    timeline: "June 2024 – February 2025",
    status: "Completed",
    tools: ["Microsoft Forms", "Excel", "Obsidian", "Figma"],
    services: ["Product Vision", "User Research", "Information Architecture", "Wireframing", "Prototyping", "Stakeholder Alignment", "Team Facilitation"],
    order: 5,
    goal: "Align multi-org stakeholders and ship a usable IA/wireframe package for a government social finance initiative."
  },
  {
    title: "Old Skool Game Studios",
    descriptiveTitle: "Mobile Casino Game Studio",
    client: "Old Skool Game Studios (now MahiGaming)",
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
    services: ["User Research", "Information Architecture", "Wireframing", "Prototyping", "Usability Testing", "Stakeholder Alignment", "Communication", "Team Facilitation", "PRDs (Specs)", "System Design", "Agile Delivery"],
    order: 6,
    goal: "Apply systematic UX research and design improvements to lift engagement and fix localization pain across mobile casino games."
  },
  {
    title: "Boveda Tr1n1ty",
    descriptiveTitle: "Digital Heartbeat Timer",
    client: "Boveda",
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
    services: ["Product Vision", "User Research", "Information Architecture", "Wireframing", "Prototyping", "Stakeholder Management", "Product Analytics"],
    order: 7,
    goal: "Turn a fragmented workflow into a coherent, measurable experience that stakeholders could rally behind."
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

export function getPreviousCaseStudy(currentSlug: string): CaseStudyMetadata | undefined {
  const sortedStudies = [...caseStudies].sort((a, b) => a.order - b.order)
  const currentIndex = sortedStudies.findIndex(study => study.slug === currentSlug)
  
  if (currentIndex === -1) return undefined
  
  // Wrap to last if on first
  const prevIndex = currentIndex - 1 < 0 ? sortedStudies.length - 1 : currentIndex - 1
  return sortedStudies[prevIndex]
}

export function getAllCaseStudies(): CaseStudyMetadata[] {
  return [...caseStudies].sort((a, b) => a.order - b.order)
}