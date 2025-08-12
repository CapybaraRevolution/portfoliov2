// Central tools configuration registry
export interface ToolConfig {
  slug: string
  label: string
  iconPath: string
  category: 'PM' | 'UX' | 'BA' | 'DS' | 'AI' | 'Dev' | 'Research' | 'Data'
  serviceRefs: string[] // which service IDs use this tool
  a11yAlt: string
}

export const toolsRegistry: ToolConfig[] = [
  // PM Tools
  {
    slug: 'jira',
    label: 'Jira', 
    iconPath: '/images/tools/jira.svg',
    category: 'PM',
    serviceRefs: ['strategic-product-planning'],
    a11yAlt: 'Jira project management tool'
  },
  {
    slug: 'confluence',
    label: 'Confluence',
    iconPath: '/images/tools/confluence.svg', 
    category: 'PM',
    serviceRefs: ['strategic-product-planning', 'requirements-analysis'],
    a11yAlt: 'Confluence documentation tool'
  },
  {
    slug: 'notion',
    label: 'Notion',
    iconPath: '/images/tools/notion.svg',
    category: 'PM', 
    serviceRefs: ['strategic-product-planning', 'requirements-analysis'],
    a11yAlt: 'Notion workspace tool'
  },
  {
    slug: 'airtable',
    label: 'Airtable',
    iconPath: '/images/tools/trello.svg',
    category: 'PM',
    serviceRefs: ['requirements-analysis'],
    a11yAlt: 'Airtable database tool'
  },
  
  // UX Design Tools
  {
    slug: 'figma',
    label: 'Figma',
    iconPath: '/images/tools/figma.svg',
    category: 'UX',
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Figma design tool'
  },
  {
    slug: 'framer',
    label: 'Framer', 
    iconPath: '/images/tools/framer.svg',
    category: 'UX',
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Framer prototyping tool'
  },
  {
    slug: 'principle',
    label: 'Principle',
    iconPath: '/images/tools/adobe_after_effects.svg',
    category: 'UX', 
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Principle animation tool'
  },
  {
    slug: 'webflow',
    label: 'Webflow',
    iconPath: '/images/tools/chrome.svg',
    category: 'UX',
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Webflow design tool'
  },
  
  // Research Tools
  {
    slug: 'userinterviews',
    label: 'UserInterviews',
    iconPath: '/images/tools/zoom.svg',
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'UserInterviews research tool'
  },
  {
    slug: 'typeform',
    label: 'Typeform',
    iconPath: '/images/tools/google docs.svg', 
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Typeform survey tool'
  },
  {
    slug: 'hotjar',
    label: 'Hotjar',
    iconPath: '/images/tools/google.svg',
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Hotjar analytics tool'
  },
  {
    slug: 'ga4',
    label: 'GA4',
    iconPath: '/images/tools/ga4.svg',
    category: 'Data',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Google Analytics 4'
  },
  {
    slug: 'maze',
    label: 'Maze', 
    iconPath: '/images/tools/github.svg',
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Maze testing tool'
  },
  
  // Communication Tools  
  {
    slug: 'loom',
    label: 'Loom',
    iconPath: '/images/tools/loom.svg',
    category: 'PM',
    serviceRefs: ['strategic-product-planning'],
    a11yAlt: 'Loom screen recording tool'
  }
]

// Helper functions
export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolsRegistry.find(tool => tool.slug === slug)
}

export function getToolsForService(serviceId: string): ToolConfig[] {
  return toolsRegistry.filter(tool => tool.serviceRefs.includes(serviceId))
}