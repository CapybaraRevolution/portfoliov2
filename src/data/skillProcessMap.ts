/**
 * Skill-to-Process Deep-linking Map
 * 
 * Maps standardized skill IDs to specific process steps, targets, and tabs
 * for consistent navigation across Services, Work Overview, and case studies.
 */

export interface ProcessMapping {
  step: number
  target: string
  tab?: string
  notes?: string
}

export const skillProcessMap: Record<string, ProcessMapping> = {
  // Strategy
  'product-vision': {
    step: 1,
    target: 'stakeholder-alignment',
    notes: 'Vision is set via alignment goals/guardrails'
  },
  'roadmap': {
    step: 4,
    target: 'release-planning-cut-candidate',
    tab: 'Plan',
    notes: 'Temporary fallback until Step 2 "Roadmap & Alignment" exists'
  },
  'feature-prioritization': {
    step: 2,
    target: 'how-we-prioritize',
    tab: 'Prioritization',
    notes: 'Could also link why-we-prioritize; choose one for consistency'
  },
  'okrs-goal-setting': {
    step: 1,
    target: 'stakeholder-alignment',
    notes: 'Ties to north-star/metrics in alignment'
  },

  // Discovery & Design
  'user-research': {
    step: 1,
    target: 'persona-journey-mapping',
    notes: 'Pattern-finding + journey pains'
  },
  'information-architecture': {
    step: 2,
    target: 'ia-flows',
    tab: 'IA & Flows',
    notes: 'Highlights the Information Architecture row in the IA & Flows tab'
  },
  'wireframing': {
    step: 3,
    target: 'wireframes',
    notes: 'Primary entry; user can switch to "Clickable Prototypes" in-drawer'
  },
  'prototyping': {
    step: 3,
    target: 'clickable-prototypes',
    notes: 'Clickable prototypes and interaction design'
  },
  'usability-testing': {
    step: 5,
    target: 'instrumentation',
    notes: 'Usability testing connects to instrumentation and measurement'
  },

  // Build & Ship
  'product-requirement-docs': {
    step: 4,
    target: 'dev-handoff-packages',
    tab: 'Plan',
    notes: 'Bundle context/specs for build'
  },
  'systems-architecture': {
    step: 1,
    target: 'system-analysis',
    notes: 'Current/future-state, constraints, integration risk'
  },
  'api-integration-design': {
    step: 1,
    target: 'system-analysis',
    notes: 'Same drawer covers API edges/risks'
  },
  'agile-methodologies': {
    step: 4,
    target: 'sprint-planning-backlog-grooming',
    tab: 'Plan',
    notes: 'Delivery rhythm + sequencing'
  },

  // Data & AI
  'data-analytics-metrics': {
    step: 5,
    target: 'instrumentation',
    notes: 'Tracking plan, funnels, dashboards'
  },
  'ab-testing-experimentation': {
    step: 5,
    target: 'experimentation',
    notes: 'A/B setup, hypotheses, guardrails'
  },
  'instrumentation': {
    step: 5,
    target: 'instrumentation',
    notes: 'Direct mapping'
  },
  'generative-ai-integration': {
    step: 5,
    target: 'continuous-improvement',
    notes: 'Until an AI-specific drawer exists; position as ongoing iteration/AI assist'
  },

  // Leadership & Collaboration
  'stakeholder-alignment': {
    step: 1,
    target: 'stakeholder-alignment',
    notes: 'Direct mapping'
  },
  'communication': {
    step: 4,
    target: 'stakeholder-demos-acceptance',
    tab: 'Plan',
    notes: 'Demo cadence & clarity'
  },
  'storytelling': {
    step: 4,
    target: 'stakeholder-demos-acceptance',
    tab: 'Plan',
    notes: 'Same target; narrative of change'
  },
  'cross-functional-leadership': {
    step: 4,
    target: 'sprint-planning-backlog-grooming',
    tab: 'Plan',
    notes: 'Facilitation around planning/grooming'
  },

  // Additional mappings for completeness
  'persona-journey-mapping': {
    step: 1,
    target: 'persona-journey-mapping',
    notes: 'Direct mapping for persona and journey work'
  },
  'competitive-analysis': {
    step: 1,
    target: 'competitive-analysis',
    notes: 'Market research and competitive positioning'
  },
  'design-thinking': {
    step: 1,
    target: 'persona-journey-mapping',
    notes: 'Design thinking process and methodologies'
  },
  'ux-design-principles': {
    step: 3,
    target: 'wireframes',
    notes: 'UX principles applied in wireframing and design'
  },
  'product-market-fit': {
    step: 1,
    target: 'competitive-analysis',
    notes: 'Market analysis and product-market fit validation'
  },
  'go-to-market-strategy': {
    step: 2,
    target: 'how-we-prioritize',
    tab: 'Prioritization',
    notes: 'GTM strategy tied to prioritization framework'
  },
  'software-development-lifecycle': {
    step: 4,
    target: 'sprint-planning-backlog-grooming',
    tab: 'Plan',
    notes: 'SDLC processes and development lifecycle'
  },
  'iterative-development': {
    step: 5,
    target: 'continuous-improvement',
    notes: 'Iterative approach and continuous improvement'
  },
  'data-driven-decision-making': {
    step: 5,
    target: 'experimentation',
    notes: 'Data-driven approach through experimentation'
  }
}

/**
 * Generate a process navigation URL for a given skill
 */
export function generateProcessUrl(skillId: string): string {
  const mapping = skillProcessMap[skillId]
  if (!mapping) {
    // Fallback to step 1 if no mapping found
    return '/process?step=1'
  }

  const params = new URLSearchParams()
  params.set('step', mapping.step.toString())
  // Highlight disabled: only step (and optional tab)
  
  if (mapping.tab) {
    params.set('tab', mapping.tab)
  }

  return `/process?${params.toString()}`
}

/**
 * Parse process URL parameters
 */
export function parseProcessUrl(searchParams: URLSearchParams) {
  const step = searchParams.get('step') ? parseInt(searchParams.get('step')!) : null
  const highlight = searchParams.get('highlight')
  const tab = searchParams.get('tab')

  return {
    step: step && step >= 1 && step <= 5 ? step : null,
    highlight,
    tab
  }
}

/**
 * Analytics event data for process navigation
 */
export function getNavigationAnalytics(skillId: string) {
  const mapping = skillProcessMap[skillId]
  if (!mapping) return null

  return {
    skill: skillId,
    step: mapping.step,
    target: mapping.target,
    tab: mapping.tab || null
  }
}
