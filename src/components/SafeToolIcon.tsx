'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  slug: string           // e.g., 'figma', 'figjam', 'typeform'
  size?: number          // px square
  alt?: string
  className?: string
}

const ALIAS: Record<string, string> = {
  figjam: 'figma',        // the only special-case fallback
  figma_make: 'figma',    // Alias for Figma Make
  'monday.com': 'monday', // Monday.com → monday.png
  'delta_dna': 'deltadna', // Delta DNA → deltadna.png
  'excel': 'ms_excel',    // Excel → ms_excel.svg
}

// Tools that use PNG instead of SVG
const PNG_TOOLS: string[] = ['unity', 'ngui', 'monday.com', 'perforce', 'deltadna', 'delta_dna']

// Mapping of tool slugs to Simple Icons slugs (for tools not in our local assets)
// Simple Icons uses lowercase with hyphens: https://simpleicons.org/
const SIMPLE_ICONS_MAP: Record<string, string | null> = {
  'salesforce': 'salesforce',
  'tableau': 'tableau',
  'hotjar': 'hotjar',
  'google_analytics': 'googleanalytics',
  'google-analytics': 'googleanalytics',
  'ga4': 'googleanalytics',
  'google_forms': 'googleforms',
  'microsoft_forms': 'microsoftforms',
  'excel': 'microsoftexcel',
  'obsidian': 'obsidian',
  'claude': 'anthropic',
  'monday': 'mondaydotcom',
  'miro': 'miro',
  'react': 'react',
  'tailwind_css': 'tailwindcss',
  'tailwindcss': 'tailwindcss',
  'llm_assistants': null, // No simple icon for this, will use Lucide fallback
  'ai_tools': null,
  'ai tools': null,
}

export default function SafeToolIcon({ slug, size = 24, alt, className }: Props) {
  const initialSlug = ALIAS[slug] ?? slug
  const extension = PNG_TOOLS.includes(initialSlug) ? 'png' : 'svg'
  const [src, setSrc] = useState(`/images/tools/${initialSlug}.${extension}`)
  const [useSimpleIcon, setUseSimpleIcon] = useState(false)
  const [visible, setVisible] = useState(true)

  const simpleIconSlug = SIMPLE_ICONS_MAP[slug] || SIMPLE_ICONS_MAP[initialSlug]
  const simpleIconUrl = simpleIconSlug 
    ? `https://cdn.simpleicons.org/${simpleIconSlug}`
    : null

  const handleError = () => {
    // If FigJam somehow failed to alias to Figma, last-chance retry once:
    if (slug === 'figjam' && !src.endsWith('/figma.svg')) {
      setSrc('/images/tools/figma.svg')
    } else if (simpleIconUrl && !useSimpleIcon) {
      // Try Simple Icons CDN as fallback
      setUseSimpleIcon(true)
      setSrc(simpleIconUrl)
    } else {
      setVisible(false) // hide icon if all options exhausted
    }
  }

  if (!visible) {
    // Graceful fallback: First letter of slug
    return (
      <span 
        className={`flex h-full w-full items-center justify-center bg-zinc-100 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 uppercase ${className}`}
        role="img"
        aria-label={alt ?? `${slug} icon placeholder`}
      >
        {slug.charAt(0)}
      </span>
    )
  }
  
  // Use regular img tag for external CDN URLs (Simple Icons)
  if (useSimpleIcon && simpleIconUrl) {
    return (
      <img
        src={simpleIconUrl}
        alt={alt ?? `${slug} icon`}
        width={size}
        height={size}
        className={className || ''}
        onError={handleError}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt ?? `${slug} icon`}
      width={size}
      height={size}
      className={className}
      onError={handleError}
      priority={false}
    />
  )
}