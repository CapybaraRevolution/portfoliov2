import { useState, useEffect } from 'react'
import Image from 'next/image'
import { type ToolConfig } from '@/lib/toolsConfig'

interface ToolChipProps {
  tool: ToolConfig
  onClick?: () => void
}

// Session-based cache for logo failures to prevent network spam
const logoFailureCache = new Set<string>()

export function ToolChip({ tool, onClick }: ToolChipProps) {
  const [imageError, setImageError] = useState(logoFailureCache.has(tool.slug))

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Default behavior: navigate to case studies or process anchors
      // For now, stub - we can wire the links later per your brief
      console.log(`Navigate to content for ${tool.label}`)
    }
  }

  const handleImageError = () => {
    setImageError(true)
    logoFailureCache.add(tool.slug) // Cache failure to prevent retries
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:scale-105 hover:border-emerald-300 hover:text-emerald-700 active:scale-95 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      aria-label={`View ${tool.label} details`}
    >
      {/* Tool icon with fallback */}
      <div className="w-4 h-4 relative flex items-center justify-center">
        {!imageError ? (
          <Image
            src={tool.iconPath}
            alt={tool.a11yAlt}
            width={16}
            height={16}
            className="w-full h-full object-contain"
            onError={handleImageError}
            unoptimized // Allow SVG loading without optimization
          />
        ) : (
          // Neutral placeholder icon for missing logos  
          <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {tool.label.charAt(0)}
          </div>
        )}
      </div>
      {tool.label}
    </button>
  )
}