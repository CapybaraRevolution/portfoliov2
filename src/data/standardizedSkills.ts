export interface StandardizedSkill {
  id: string
  name: string
  category: SkillCategory
  description: string
  processSteps?: number[] // Which process steps contain this skill
}

export interface SkillCategory {
  id: string
  name: string
  description: string
  color: string // Tailwind color class
  bgColor: string // Background color class
  textColor: string // Text color class
}

// Skill Categories
export const skillCategories: Record<string, SkillCategory> = {
  'product-strategy': {
    id: 'product-strategy',
    name: 'Product Strategy',
    description: 'Defining compelling vision and roadmap that aligns with customer needs and business goals',
    color: 'emerald',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    textColor: 'text-emerald-800 dark:text-emerald-200'
  },
  'ux-research': {
    id: 'ux-research',
    name: 'UX & Research',
    description: 'Keeping the user at the center of product development through research and design thinking',
    color: 'blue',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    textColor: 'text-blue-800 dark:text-blue-200'
  },
  'technical-fluency': {
    id: 'technical-fluency',
    name: 'Technical Fluency',
    description: 'Understanding technology and working effectively with engineering teams',
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    textColor: 'text-purple-800 dark:text-purple-200'
  },
  'ai-data': {
    id: 'ai-data',
    name: 'AI & Data',
    description: 'Leveraging AI and data analytics to drive innovation and evidence-based decisions',
    color: 'amber',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    textColor: 'text-amber-800 dark:text-amber-200'
  },
  'business-acumen': {
    id: 'business-acumen',
    name: 'Business Acumen',
    description: 'Thinking like a founder to ensure products delight users and make business sense',
    color: 'indigo',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    textColor: 'text-indigo-800 dark:text-indigo-200'
  },
  'collaboration': {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Leadership and communication abilities to rally diverse teams toward a product vision',
    color: 'pink',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    textColor: 'text-pink-800 dark:text-pink-200'
  },
  'delivery-execution': {
    id: 'delivery-execution',
    name: 'Delivery & Execution',
    description: 'Turning plans into reality through efficient implementation, testing, and iteration',
    color: 'teal',
    bgColor: 'bg-teal-100 dark:bg-teal-900/20',
    textColor: 'text-teal-800 dark:text-teal-200'
  }
}

// Standardized Skills (32 total across 7 categories)
export const standardizedSkills: Record<string, StandardizedSkill> = {
  // Product Strategy (5 skills)
  'product-vision': {
    id: 'product-vision',
    name: 'Product Vision',
    category: skillCategories['product-strategy'],
    description: 'Crafting an inspiring end-state for the product'
  },
  'product-roadmapping': {
    id: 'product-roadmapping',
    name: 'Product Roadmapping',
    category: skillCategories['product-strategy'],
    description: 'Strategic roadmap planning and evolution'
  },
  'feature-prioritization': {
    id: 'feature-prioritization',
    name: 'Feature Prioritization',
    category: skillCategories['product-strategy'],
    description: 'Deciding what to build first based on impact and alignment'
  },
  'product-discovery': {
    id: 'product-discovery',
    name: 'Product Discovery',
    category: skillCategories['product-strategy'],
    description: 'Validating ideas through user/market research before development'
  },
  'okrs-goal-setting': {
    id: 'okrs-goal-setting',
    name: 'OKRs & Goal Setting',
    category: skillCategories['product-strategy'],
    description: 'Defining clear Objectives and Key Results to align team efforts'
  },

  // UX & Research (5 skills)
  'user-research': {
    id: 'user-research',
    name: 'User Research',
    category: skillCategories['ux-research'],
    description: 'Gathering user needs via interviews, surveys, observations',
    processSteps: [1]
  },
  'design-thinking': {
    id: 'design-thinking',
    name: 'Design Thinking',
    category: skillCategories['ux-research'],
    description: 'Applying empathy & iterative design to solve user problems',
    processSteps: [1]
  },
  'prototyping-wireframing': {
    id: 'prototyping-wireframing',
    name: 'Prototyping & Wireframing',
    category: skillCategories['ux-research'],
    description: 'Crafting low-fi prototypes or wireframes to test concepts',
    processSteps: [3]
  },
  'usability-testing': {
    id: 'usability-testing',
    name: 'Usability Testing',
    category: skillCategories['ux-research'],
    description: 'Observing users to ensure the product is easy and effective to use'
  },
  'ux-design-principles': {
    id: 'ux-design-principles',
    name: 'UX Design Principles',
    category: skillCategories['ux-research'],
    description: 'Understanding intuitive UX/UI patterns and accessibility standards'
  },

  // Technical Fluency (5 skills)
  'systems-architecture': {
    id: 'systems-architecture',
    name: 'Systems Architecture',
    category: skillCategories['technical-fluency'],
    description: 'Grasping how the product\'s components and services fit together'
  },
  'software-development-lifecycle': {
    id: 'software-development-lifecycle',
    name: 'Software Development Lifecycle (SDLC)',
    category: skillCategories['technical-fluency'],
    description: 'Knowledge of stages from development to deployment'
  },
  'api-integration-design': {
    id: 'api-integration-design',
    name: 'API & Integration Design',
    category: skillCategories['technical-fluency'],
    description: 'Understanding how to leverage APIs and integrate with other platforms'
  },
  'product-requirement-docs': {
    id: 'product-requirement-docs',
    name: 'Product Requirement Docs (PRDs)',
    category: skillCategories['technical-fluency'],
    description: 'Writing clear specifications and user stories for engineering'
  },
  'technical-feasibility-analysis': {
    id: 'technical-feasibility-analysis',
    name: 'Technical Feasibility Analysis',
    category: skillCategories['technical-fluency'],
    description: 'Assessing technical constraints & effort during planning'
  },

  // AI & Data (7 skills)
  'generative-ai-integration': {
    id: 'generative-ai-integration',
    name: 'Generative AI Integration',
    category: skillCategories['ai-data'],
    description: 'Embedding AI/ML capabilities into product features'
  },
  'prompt-engineering': {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: skillCategories['ai-data'],
    description: 'Crafting effective prompts for LLMs to harness AI outputs'
  },
  'ai-model-fine-tuning': {
    id: 'ai-model-fine-tuning',
    name: 'AI Model Fine-Tuning',
    category: skillCategories['ai-data'],
    description: 'Adapting ML models (e.g. LLMs) to domain-specific needs'
  },
  'ai-agent-design': {
    id: 'ai-agent-design',
    name: 'AI Agent Design',
    category: skillCategories['ai-data'],
    description: 'Designing autonomous AI agents or workflows to enhance products'
  },
  'data-analytics-metrics': {
    id: 'data-analytics-metrics',
    name: 'Data Analytics & Metrics',
    category: skillCategories['ai-data'],
    description: 'Defining and analyzing KPIs, product usage data, and trends',
    processSteps: [5]
  },
  'ab-testing-experimentation': {
    id: 'ab-testing-experimentation',
    name: 'A/B Testing & Experimentation',
    category: skillCategories['ai-data'],
    description: 'Running experiments to test hypotheses and optimize features',
    processSteps: [5]
  },
  'data-driven-decision-making': {
    id: 'data-driven-decision-making',
    name: 'Data-Driven Decision Making',
    category: skillCategories['ai-data'],
    description: 'Using data insights to inform strategy and product changes',
    processSteps: [5]
  },

  // Business Acumen (7 skills)
  'market-research-analysis': {
    id: 'market-research-analysis',
    name: 'Market Research & Analysis',
    category: skillCategories['business-acumen'],
    description: 'Researching market needs, trends, and competitor offerings'
  },
  'competitive-analysis': {
    id: 'competitive-analysis',
    name: 'Competitive Analysis',
    category: skillCategories['business-acumen'],
    description: 'Understanding the competition and differentiators in the landscape'
  },
  'product-market-fit': {
    id: 'product-market-fit',
    name: 'Product-Market Fit',
    category: skillCategories['business-acumen'],
    description: 'Assessing and iterating until the product meets a real market need'
  },
  'go-to-market-strategy': {
    id: 'go-to-market-strategy',
    name: 'Go-to-Market Strategy',
    category: skillCategories['business-acumen'],
    description: 'Planning product launch, marketing, and distribution approach'
  },
  'monetization-pricing': {
    id: 'monetization-pricing',
    name: 'Monetization & Pricing',
    category: skillCategories['business-acumen'],
    description: 'Defining the business model, pricing strategy, and revenue streams'
  },
  'growth-strategy': {
    id: 'growth-strategy',
    name: 'Growth Strategy',
    category: skillCategories['business-acumen'],
    description: 'Driving user acquisition, retention, and expansion tactics'
  },
  'operations-scaling': {
    id: 'operations-scaling',
    name: 'Operations & Scaling',
    category: skillCategories['business-acumen'],
    description: 'Planning operational processes and scaling strategies for growth'
  },

  // Collaboration (5 skills)
  'communication': {
    id: 'communication',
    name: 'Communication',
    category: skillCategories['collaboration'],
    description: 'Clear, persuasive communication across written, verbal, and presentation contexts',
    processSteps: [1]
  },
  'stakeholder-management': {
    id: 'stakeholder-management',
    name: 'Stakeholder Management',
    category: skillCategories['collaboration'],
    description: 'Aligning and managing expectations of leadership, customers, and partners',
    processSteps: [1]
  },
  'cross-functional-leadership': {
    id: 'cross-functional-leadership',
    name: 'Cross-Functional Leadership',
    category: skillCategories['collaboration'],
    description: 'Coordinating and motivating engineering, design, marketing, etc., toward common goals'
  },
  'influencing-without-authority': {
    id: 'influencing-without-authority',
    name: 'Influencing without Authority',
    category: skillCategories['collaboration'],
    description: 'Driving decisions and change through persuasion and credibility rather than formal power'
  },
  'storytelling-presentation': {
    id: 'storytelling-presentation',
    name: 'Storytelling & Presentation',
    category: skillCategories['collaboration'],
    description: 'Crafting a compelling narrative about the product and presenting insights effectively'
  },

  // Delivery & Execution (5 skills)
  'project-management': {
    id: 'project-management',
    name: 'Project Management',
    category: skillCategories['delivery-execution'],
    description: 'Organizing tasks, timelines, and resources to drive projects to completion'
  },
  'agile-methodologies': {
    id: 'agile-methodologies',
    name: 'Agile Methodologies',
    category: skillCategories['delivery-execution'],
    description: 'Applying Scrum/Kanban practices and an adaptive, iterative mindset'
  },
  'requirements-definition': {
    id: 'requirements-definition',
    name: 'Requirements Definition',
    category: skillCategories['delivery-execution'],
    description: 'Gathering and specifying functional requirements and user stories'
  },
  'release-planning': {
    id: 'release-planning',
    name: 'Release Planning',
    category: skillCategories['delivery-execution'],
    description: 'Managing product release cycles, roadmaps, and launch coordination'
  },
  'iterative-development': {
    id: 'iterative-development',
    name: 'Iterative Development',
    category: skillCategories['delivery-execution'],
    description: 'Rapidly iterating and improving the product based on testing and feedback'
  }
}

// Helper functions
export const getSkillsByCategory = (categoryId: string): StandardizedSkill[] => {
  return Object.values(standardizedSkills).filter(skill => skill.category.id === categoryId)
}

export const getAllSkillNames = (): string[] => {
  return Object.values(standardizedSkills).map(skill => skill.name)
}

export const getSkillById = (id: string): StandardizedSkill | undefined => {
  return standardizedSkills[id]
}

export const getCategoryColors = (categoryId: string) => {
  const category = skillCategories[categoryId]
  if (!category) return {
    color: 'zinc',
    bgColor: 'bg-zinc-100 dark:bg-zinc-900/20',
    textColor: 'text-zinc-800 dark:text-zinc-200'
  }
  return {
    color: category.color,
    bgColor: category.bgColor,
    textColor: category.textColor
  }
}