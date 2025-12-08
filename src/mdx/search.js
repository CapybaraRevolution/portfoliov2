// Enhanced search implementation with FlexSearch for semantic search
import { Document } from 'flexsearch'

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

// Cache the search index to avoid rebuilding on every search
let searchIndex = null
let indexedStudies = null

function initializeSearchIndex() {
  if (searchIndex) {
    return { index: searchIndex, studies: indexedStudies }
  }

  const { getAllCaseStudies } = require('../lib/caseStudies')
  const caseStudies = getAllCaseStudies()

  // Create a Document index with multiple fields and custom scoring
  searchIndex = new Document({
    tokenize: 'forward',
    cache: 100,
    document: {
      id: 'slug',
      index: [
        {
          field: 'title',
          tokenize: 'full',
          optimize: true,
          resolution: 9,
        },
        {
          field: 'descriptiveTitle',
          tokenize: 'full',
          optimize: true,
          resolution: 9,
        },
        {
          field: 'client',
          tokenize: 'forward',
          optimize: true,
          resolution: 5,
        },
        {
          field: 'description',
          tokenize: 'strict',
          optimize: true,
          resolution: 5,
        },
        {
          field: 'services',
          tokenize: 'forward',
          optimize: true,
          resolution: 3,
        },
        {
          field: 'tools',
          tokenize: 'forward',
          optimize: true,
          resolution: 3,
        },
        {
          field: 'role',
          tokenize: 'forward',
          optimize: true,
          resolution: 3,
        },
      ],
    },
  })

  // Index all case studies
  caseStudies.forEach(study => {
    searchIndex.add({
      slug: study.slug,
      title: study.title,
      descriptiveTitle: study.descriptiveTitle,
      client: study.client,
      description: study.description,
      services: study.services.join(' '),
      tools: study.tools.join(' '),
      role: study.role || '',
    })
  })

  indexedStudies = caseStudies

  return { index: searchIndex, studies: indexedStudies }
}

function getMatchContext(text, query, maxLength = 100) {
  if (!text || !query) return ''
  
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const queryWords = lowerQuery.split(/\s+/)
  
  // Find the first match
  let matchIndex = -1
  for (const word of queryWords) {
    const idx = lowerText.indexOf(word)
    if (idx !== -1) {
      matchIndex = idx
      break
    }
  }
  
  if (matchIndex === -1) return text.substring(0, maxLength)
  
  // Extract context around the match
  const start = Math.max(0, matchIndex - 20)
  const end = Math.min(text.length, matchIndex + maxLength)
  let snippet = text.substring(start, end)
  
  if (start > 0) snippet = '...' + snippet
  if (end < text.length) snippet = snippet + '...'
  
  return snippet
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
    const { index, studies } = initializeSearchIndex()
    
    // Search across all fields
    const searchResults = index.search(query, {
      limit: limit * 3, // Get more results for better scoring
      enrich: true,
    })
    
    // Create a map of slug to study for quick lookup
    const studyMap = new Map()
    studies.forEach(study => {
      studyMap.set(study.slug, study)
    })
    
    // Collect and score results
    const scoredResults = new Map()
    
    searchResults.forEach(fieldResult => {
      const field = fieldResult.field
      const results = fieldResult.result
      
      results.forEach(result => {
        const slug = result.id
        const study = studyMap.get(slug)
        
        if (!study) return
        
        // Initialize result entry if not exists
        if (!scoredResults.has(slug)) {
          scoredResults.set(slug, {
            study,
            score: 0,
            matchedFields: [],
            contexts: {},
          })
        }
        
        const entry = scoredResults.get(slug)
        
        // Weighted scoring based on field importance
        let fieldScore = 0
        let fieldName = ''
        
        switch (field) {
          case 'title':
            fieldScore = 100
            fieldName = 'title'
            entry.contexts.title = getMatchContext(study.title, query, 60)
            break
          case 'descriptiveTitle':
            fieldScore = 90
            fieldName = 'descriptive title'
            entry.contexts.descriptiveTitle = getMatchContext(study.descriptiveTitle, query, 60)
            break
          case 'client':
            fieldScore = 80
            fieldName = 'client'
            entry.contexts.client = study.client
            break
          case 'description':
            fieldScore = 60
            fieldName = 'description'
            entry.contexts.description = getMatchContext(study.description, query, 100)
            break
          case 'services':
            fieldScore = 40
            fieldName = 'service'
            break
          case 'tools':
            fieldScore = 30
            fieldName = 'tool'
            break
          case 'role':
            fieldScore = 50
            fieldName = 'role'
            entry.contexts.role = study.role
            break
        }
        
        // Boost score for exact matches
        const queryLower = query.toLowerCase()
        const fieldValue = study[field] || (field === 'services' || field === 'tools' ? study[field].join(' ') : '')
        
        if (typeof fieldValue === 'string' && fieldValue.toLowerCase() === queryLower) {
          fieldScore *= 2
        } else if (typeof fieldValue === 'string' && fieldValue.toLowerCase().startsWith(queryLower)) {
          fieldScore *= 1.5
        }
        
        entry.score += fieldScore
        if (!entry.matchedFields.includes(fieldName)) {
          entry.matchedFields.push(fieldName)
        }
      })
    })
    
    // Convert to array and sort by score
    const results = Array.from(scoredResults.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(entry => {
        // Determine the best context to show
        let displayContext = entry.contexts.title || 
                           entry.contexts.descriptiveTitle || 
                           entry.contexts.description ||
                           entry.contexts.client ||
                           entry.contexts.role ||
                           ''
        
        return {
          url: `/case-studies/${entry.study.slug}`,
          title: entry.study.descriptiveTitle,
          pageTitle: entry.study.title,
          score: entry.score,
          matches: entry.matchedFields,
          context: displayContext,
          type: 'case-study',
        }
      })
    
    return results
      
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
 * @property {number} score
 * @property {string[]} matches
 * @property {string} context
 * @property {string} type
 */

// Export empty Result for TypeScript compatibility
export const Result = undefined
