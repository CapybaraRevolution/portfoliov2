'use client'

import { useState } from 'react'
import clsx from 'clsx'
import SafeToolIcon from '@/components/SafeToolIcon'

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
  // Generate letter avatar from name for fallback
  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') {
      return 'XX' // Fallback for undefined/null names
    }
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  const initials = getInitials(name)

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
        <SafeToolIcon 
          slug={slug}
          size={size === 'sm' ? 16 : 20}
          alt={`${name} logo`}
        />
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