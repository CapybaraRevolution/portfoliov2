import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.js'

const withMDX = nextMDX({
  options: { remarkPlugins, rehypePlugins, recmaPlugins },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Perf + security niceties
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'assets.aceternity.com' }],
  },

  // Reduce bundle size for common libs (adjust list to what you actually use)
  experimental: {
    optimizePackageImports: ['framer-motion', 'date-fns', '@headlessui/react'],
  },
  
  // Force webpack for MDX compatibility (Turbopack has issues with MDX loader serialization)
  webpack: (config, { isServer }) => {
    // Ensure webpack is used instead of Turbopack
    return config
  },

  // Keep your MDX tracing so content isn't pruned
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
}

export default withSearch(withMDX(nextConfig))
