import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Chip } from '@/components/ui/Chip'
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
      console.log(`Navigate to content for ${tool.label}`)
    }
  }

  const handleImageError = () => {
    setImageError(true)
    logoFailureCache.add(tool.slug)
  }

  const icon = (
    <div className="w-4 h-4 relative flex items-center justify-center">
      {!imageError ? (
        <Image
          src={tool.iconPath}
          alt={tool.a11yAlt}
          width={16}
          height={16}
          className="w-full h-full object-contain"
          onError={handleImageError}
          unoptimized
        />
      ) : (
        <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {tool.label.charAt(0)}
        </div>
      )}
    </div>
  )

  return (
    <Chip
      variant="outline"
      size="sm"
      as="button"
      onClick={handleClick}
      icon={icon}
    >
      {tool.label}
    </Chip>
  )
}