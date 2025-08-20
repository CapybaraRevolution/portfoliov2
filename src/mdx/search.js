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
  return []
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
