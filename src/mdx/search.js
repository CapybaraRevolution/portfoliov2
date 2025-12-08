// Simplified search implementation - basic text matching
import { caseStudies } from '../lib/caseStudies'

export default function Search(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  })
}

export function search(query, options = {}) {
  // Server-side rendering guard
  if (typeof window === 'undefined') {
    return []
  }
  
  try {
    if (!query || query.trim().length === 0) {
      return []
    }
    
    const { limit = 5 } = options
    const searchQuery = query.toLowerCase().trim()
    
    // Sort case studies by order
    const sortedStudies = [...caseStudies].sort((a, b) => a.order - b.order)
    
    // Debug logging
    console.log('Search called with query:', searchQuery)
    console.log('Case studies count:', sortedStudies.length)
    
    const results = []
    
    // Search through case studies with weighted scoring
    sortedStudies.forEach(study => {
      let score = 0
      let matches = []
      
      // Check title (highest priority)
      if (study.title.toLowerCase().includes(searchQuery)) {
        score += 100
        matches.push('title')
      }
      
      // Check descriptive title (high priority)
      if (study.descriptiveTitle.toLowerCase().includes(searchQuery)) {
        score += 90
        matches.push('descriptive title')
      }
      
      // Check client (high priority)
      if (study.client.toLowerCase().includes(searchQuery)) {
        score += 80
        matches.push('client')
      }
      
      // Check description (medium priority)
      if (study.description.toLowerCase().includes(searchQuery)) {
        score += 60
        matches.push('description')
      }
      
      // Check services/skills (lower priority)
      study.services.forEach(service => {
        if (service.toLowerCase().includes(searchQuery)) {
          score += 40
          matches.push('service')
        }
      })
      
      // Check tools (lower priority)
      study.tools.forEach(tool => {
        if (tool.toLowerCase().includes(searchQuery)) {
          score += 30
          matches.push('tool')
        }
      })
      
      // Check role (medium priority)
      if (study.role && study.role.toLowerCase().includes(searchQuery)) {
        score += 50
        matches.push('role')
      }
      
      // If we have matches, add to results
      if (score > 0) {
        results.push({
          url: `/case-studies/${study.slug}`,
          title: study.descriptiveTitle,
          pageTitle: study.title,
          score,
          matches,
          context: study.description.substring(0, 100),
          type: 'case-study'
        })
      }
    })
    
    // Sort by score (descending) and limit results
    const finalResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
    
    console.log('Search results:', finalResults)
    
    return finalResults
      
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

// Export a minimal Result type definition
/**
 * @typedef {Object} Result
 * @property {string} url
 * @property {string} title  
 * @property {string} pageTitle
 * @property {number} score
 * @property {string[]} matches
 * @property {string} context
 * @property {string} type
 */

// Export empty Result for TypeScript compatibility
export const Result = undefined
