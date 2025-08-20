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
