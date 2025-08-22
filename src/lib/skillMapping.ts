/**
 * Skill Mapping Service
 * Handles transformations between different skill representations across the system
 */

import { standardizedSkills, skillCategories } from '@/data/standardizedSkills'

// Map of common skill names to standardized skill IDs
export const skillNameToStandardizedId: Record<string, string> = {
  // Strategy Skills
  'Product Vision': 'product-vision',
  'Roadmap': 'product-roadmapping',
  'Roadmapping': 'product-roadmapping',
  'Product Roadmapping': 'product-roadmapping',
  'Prioritization': 'feature-prioritization',
  'Feature Prioritization': 'feature-prioritization',
  'Backlog Shaping': 'feature-prioritization',
  'Scope Negotiation': 'feature-prioritization',
  'OKRs': 'okrs-goal-setting',
  'KPI Dashboards': 'okrs-goal-setting',
  'Goal Setting': 'okrs-goal-setting',
  'Product Discovery': 'product-discovery',
  
  // Discovery & Design Skills
  'User Research': 'user-research',
  'User Interviews': 'user-research',
  'Information Architecture': 'ux-design-principles',
  'Journey Mapping': 'design-thinking',
  'Service Design': 'design-thinking',
  'Design Thinking': 'design-thinking',
  'Wireframes & Prototypes': 'wireframing', // Legacy - maps to wireframing for backward compatibility
  'Wireframing': 'wireframing',
  'Prototyping': 'prototyping',
  'Usability Testing': 'usability-testing',
  'A/B Testing': 'ab-testing-experimentation',
  
  // Build & Ship Skills
  'PRDs (Specs)': 'product-requirement-docs',
  'Product Requirement Docs': 'product-requirement-docs',
  'Opportunity Framing': 'product-requirement-docs',
  'System Design': 'systems-architecture',
  'Design Systems': 'systems-architecture',
  'APIs & Integrations': 'api-integration-design',
  'API Design': 'api-integration-design',
  'Event Instrumentation': 'data-analytics-metrics',
  'Agile Delivery': 'agile-methodologies',
  'Release Planning': 'release-planning',
  'Cross-team Facilitation': 'cross-functional-leadership',
  
  // Data & AI Skills
  'Product Analytics': 'data-analytics-metrics',
  'Funnel Analysis': 'data-analytics-metrics',
  'Data Viz': 'data-analytics-metrics',
  'Data Visualization': 'data-analytics-metrics',
  'Experimentation': 'ab-testing-experimentation',
  'Instrumentation': 'data-analytics-metrics',
  'AI Integration': 'generative-ai-integration',
  'AI Prompt Design': 'prompt-engineering',
  'Prompt Engineering': 'prompt-engineering',
  
  // Leadership & Collaboration Skills
  'Stakeholder Alignment': 'stakeholder-management',
  'Stakeholder Management': 'stakeholder-management',
  'Communication': 'communication',
  'Storytelling': 'storytelling-presentation',
  'Team Facilitation': 'cross-functional-leadership',
  'Market Research': 'market-research-analysis',
  'Cross-Functional Leadership': 'cross-functional-leadership',
}

// Map backend category names to standardized category IDs
export const categoryMapping: Record<string, string> = {
  'Strategy': 'product-strategy',
  'Discovery & Design': 'ux-research',
  'Build & Ship': 'technical-fluency',
  'Data & AI': 'ai-data',
  'Leadership': 'collaboration',
  'Leadership & Collaboration': 'collaboration',
  'Business': 'business-acumen',
  'Technical': 'technical-fluency',
  'Delivery': 'delivery-execution'
}

export interface MappedSkill {
  id: string
  name: string
  category: string
  categoryId: string
  standardizedId?: string
}

/**
 * Convert a skill name to its standardized representation
 */
export function mapSkillNameToStandardized(skillName: string): MappedSkill {
  // Try direct mapping first
  const standardizedId = skillNameToStandardizedId[skillName]
  
  if (standardizedId && standardizedSkills[standardizedId]) {
    const skill = standardizedSkills[standardizedId]
    return {
      id: standardizedId,
      name: skill.name,
      category: skill.category.name,
      categoryId: skill.category.id,
      standardizedId
    }
  }
  
  // Fallback: generate from skill name
  const generatedId = skillName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return {
    id: generatedId,
    name: skillName,
    category: 'Unknown',
    categoryId: 'unknown',
    standardizedId: undefined
  }
}

/**
 * Map backend skill data to standardized format
 */
export function mapBackendSkill(backendSkill: {
  id: string | number
  name: string
  category?: string
}): MappedSkill {
  // First try to map by name
  const mappedByName = mapSkillNameToStandardized(backendSkill.name)
  
  // If we found a standardized skill, use it
  if (mappedByName.standardizedId) {
    return mappedByName
  }
  
  // Otherwise, try to map the category
  const mappedCategoryId = backendSkill.category 
    ? (categoryMapping[backendSkill.category] || 'unknown')
    : 'unknown'
    
  const mappedCategory = skillCategories[mappedCategoryId]
  
  return {
    id: String(backendSkill.id),
    name: backendSkill.name,
    category: mappedCategory?.name || backendSkill.category || 'Unknown',
    categoryId: mappedCategoryId,
    standardizedId: undefined
  }
}

/**
 * Get all unique skill names from various sources
 */
export function getAllPossibleSkillNames(): string[] {
  const standardizedNames = Object.values(standardizedSkills).map(s => s.name)
  const mappedNames = Object.keys(skillNameToStandardizedId)
  return [...new Set([...standardizedNames, ...mappedNames])].sort()
}

/**
 * Get skills grouped by standardized categories
 */
export function getSkillsByStandardizedCategory(): Record<string, MappedSkill[]> {
  const grouped: Record<string, MappedSkill[]> = {}
  
  Object.values(skillCategories).forEach(category => {
    grouped[category.name] = []
  })
  
  Object.values(standardizedSkills).forEach(skill => {
    const mapped: MappedSkill = {
      id: skill.id,
      name: skill.name,
      category: skill.category.name,
      categoryId: skill.category.id,
      standardizedId: skill.id
    }
    grouped[skill.category.name].push(mapped)
  })
  
  return grouped
}