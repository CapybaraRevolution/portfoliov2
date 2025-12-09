'use client'

import clsx from 'clsx'
import * as LucideIcons from 'lucide-react'
import SafeToolIcon from '@/components/SafeToolIcon'

interface ToolPillProps {
  slug: string
  name: string
  className?: string
  size?: 'sm' | 'md'
}

// Placeholder Lucide icons for tools that need brand icon assets
// TODO: Add brand icons to public/images/tools/ - see docs/TOOL_ICONS_GUIDE.md
const placeholderIcons: Record<string, keyof typeof LucideIcons> = {
  'salesforce': 'Cloud',
  'tableau': 'BarChart',
  'hotjar': 'Flame',
  'google_analytics': 'LineChart',
}

// Mapping of tool slugs/names to Lucide icon names (for tools without brand icons)
const toolIconMap: Record<string, keyof typeof LucideIcons> = {
  'ai_tools': 'Sparkles',
  'ai tools': 'Sparkles',
  'llm_assistants': 'Brain',
  'llm assistants': 'Brain',
  'llm': 'Brain',
}

export function ToolPill({ 
  slug, 
  name, 
  className,
  size = 'md'
}: ToolPillProps) {
  const iconSize = size === 'sm' ? 16 : 20
  
  // Check if this tool has a placeholder icon (for tools needing brand icons)
  const placeholderIconName = placeholderIcons[slug] || null
  const PlaceholderIcon = placeholderIconName 
    ? (LucideIcons[placeholderIconName] as React.ComponentType<{ className?: string }>) 
    : null
  
  // Check if we should use a Lucide icon (for tools without brand icons)
  const iconName = toolIconMap[slug] || toolIconMap[name.toLowerCase()] || null
  const Icon = iconName ? (LucideIcons[iconName] as React.ComponentType<{ className?: string }>) : null

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
        {Icon ? (
          // Use Lucide icon for generic tools (AI Tools, LLM assistants)
          <Icon className={clsx(
            'text-zinc-700 dark:text-zinc-300',
            size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
          )} />
        ) : PlaceholderIcon ? (
          // Show placeholder until brand icon is added to public/images/tools/
          // Once file is added, SafeToolIcon will automatically pick it up
          // See docs/TOOL_ICONS_GUIDE.md for instructions
          <PlaceholderIcon className={clsx(
            'text-zinc-700 dark:text-zinc-300',
            size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
          )} />
        ) : (
          // Use SafeToolIcon (checks for local file first)
          <SafeToolIcon 
            slug={slug}
            size={iconSize}
            alt={`${name} logo`}
          />
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