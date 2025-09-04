// Central tools configuration registry

export interface ToolConfig {
  slug: string
  label: string
  category: 'PM' | 'UX' | 'BA' | 'DS' | 'AI' | 'Dev' | 'Research' | 'Data'
  serviceRefs: string[] // which service IDs use this tool
  a11yAlt: string
}

export const toolsRegistry: ToolConfig[] = [
  // PM Tools
  {
    slug: 'jira',
    label: 'Jira', 
    category: 'PM',
    serviceRefs: ['strategic-product-planning'],
    a11yAlt: 'Jira project management tool'
  },
  {
    slug: 'confluence',
    label: 'Confluence',
 
    category: 'PM',
    serviceRefs: ['strategic-product-planning', 'requirements-analysis'],
    a11yAlt: 'Confluence documentation tool'
  },
  {
    slug: 'notion',
    label: 'Notion',
    category: 'PM', 
    serviceRefs: ['strategic-product-planning', 'requirements-analysis'],
    a11yAlt: 'Notion workspace tool'
  },
  {
    slug: 'airtable',
    label: 'Airtable',
    category: 'PM',
    serviceRefs: ['requirements-analysis'],
    a11yAlt: 'Airtable database tool'
  },
  
  // UX Design Tools
  {
    slug: 'figma',
    label: 'Figma',
    category: 'UX',
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Figma design tool'
  },
  {
    slug: 'framer',
    label: 'Framer', 
    category: 'UX',
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Framer prototyping tool'
  },
  {
    slug: 'principle',
    label: 'Principle',
    category: 'UX', 
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Principle animation tool'
  },
  {
    slug: 'webflow',
    label: 'Webflow',
    category: 'UX',
    serviceRefs: ['design-prototyping'],
    a11yAlt: 'Webflow design tool'
  },
  
  // Research Tools
  {
    slug: 'userinterviews',
    label: 'UserInterviews',
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'UserInterviews research tool'
  },
  {
    slug: 'typeform',
    label: 'Typeform',
 
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Typeform survey tool'
  },
  {
    slug: 'hotjar',
    label: 'Hotjar',
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Hotjar analytics tool'
  },
  {
    slug: 'ga4',
    label: 'GA4',
    category: 'Data',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Google Analytics 4'
  },
  {
    slug: 'maze',
    label: 'Maze', 
    category: 'Research',
    serviceRefs: ['user-research-strategy'],
    a11yAlt: 'Maze testing tool'
  },
  
  // Communication Tools  
  {
    slug: 'loom',
    label: 'Loom',
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