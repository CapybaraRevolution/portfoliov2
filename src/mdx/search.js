// Simplified search implementation to bypass parsing issues

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
  // Import case studies dynamically to avoid server-side issues
  if (typeof window === 'undefined') {
    return []
  }
  
  try {
    // Dynamic import to avoid build issues
    const { getAllCaseStudies } = require('../lib/caseStudies')
    const caseStudies = getAllCaseStudies()
    
    if (!query || query.trim().length === 0) {
      return []
    }
    
    const searchQuery = query.toLowerCase().trim()
    const { limit = 5 } = options
    
    const results = []
    
    // Search through case studies
    caseStudies.forEach(study => {
      let score = 0
      let matches = []
      
      // Check title (high priority)
      if (study.title.toLowerCase().includes(searchQuery)) {
        score += 10
        matches.push('title')
      }
      
      // Check descriptive title (high priority)
      if (study.descriptiveTitle.toLowerCase().includes(searchQuery)) {
        score += 10
        matches.push('descriptive title')
      }
      
      // Check client (medium priority)
      if (study.client.toLowerCase().includes(searchQuery)) {
        score += 8
        matches.push('client')
      }
      
      // Check description (medium priority)
      if (study.description.toLowerCase().includes(searchQuery)) {
        score += 6
        matches.push('description')
      }
      
      // Check services/skills (lower priority)
      study.services.forEach(service => {
        if (service.toLowerCase().includes(searchQuery)) {
          score += 3
          matches.push('service')
        }
      })
      
      // Check tools (lower priority)
      study.tools.forEach(tool => {
        if (tool.toLowerCase().includes(searchQuery)) {
          score += 2
          matches.push('tool')
        }
      })
      
      // Check role (lower priority)
      if (study.role && study.role.toLowerCase().includes(searchQuery)) {
        score += 4
        matches.push('role')
      }
      
      // Check timeline (lower priority)
      if (study.timeline.toLowerCase().includes(searchQuery)) {
        score += 2
        matches.push('timeline')
      }
      
      // If we have matches, add to results
      if (score > 0) {
        results.push({
          url: `/case-studies/${study.slug}`,
          title: study.descriptiveTitle,
          pageTitle: study.title,
          score,
          matches,
          type: 'case-study'
        })
      }
    })
    
    // Sort by score (descending) and limit results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      
  } catch (error) {
    console.warn('Search error:', error)
    return []
  }
}

// Export a minimal Result type definition
/**
 * @typedef {Object} Result
 * @property {string} url
 * @property {string} title  
 * @property {string} pageTitle
 */

// Export empty Result for TypeScript compatibility
export const Result = undefined
