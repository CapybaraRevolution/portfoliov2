'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface ToolPillProps {
  slug: string
  name: string
  className?: string
  size?: 'sm' | 'md'
}

export function ToolPill({ 
  slug, 
  name, 
  className,
  size = 'md'
}: ToolPillProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Generate letter avatar from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  const initials = getInitials(name)
  const imagePath = `/images/tools/${slug}.svg`

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm',
        size === 'sm' ? 'px-2.5 py-1.5' : 'px-3 py-2',
        className
      )}
    >
      <div className={clsx(
        'relative flex items-center justify-center flex-shrink-0 rounded-md overflow-hidden',
        size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
      )}>
        {!imageError && !imageLoaded && (
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-700 animate-pulse" />
        )}
        
        {!imageError ? (
          <Image
            src={imagePath}
            alt={`${name} logo`}
            width={size === 'sm' ? 16 : 20}
            height={size === 'sm' ? 16 : 20}
            className="object-contain"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={clsx(
              'flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 text-zinc-600 dark:text-zinc-300 font-medium',
              size === 'sm' ? 'text-xs h-4 w-4' : 'text-xs h-5 w-5'
            )}
          >
            {initials}
          </div>
        )}
      </div>
      
      <span className={clsx(
        'font-medium text-zinc-700 dark:text-zinc-300',
        size === 'sm' ? 'text-xs' : 'text-sm'
      )}>
        {name}
      </span>
    </div>
  )
}