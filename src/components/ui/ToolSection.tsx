'use client'

import { ReactNode } from 'react'
import { ToolPill } from './ToolPill'

interface ToolItem {
  type: 'pill' | 'generic'
  slug?: string  // For ToolPill
  name: string
  size?: 'sm' | 'md'  // For ToolPill
}

interface ToolSectionProps {
  tools: (ToolItem | ReactNode)[]
}

export function ToolSection({ tools }: ToolSectionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tools.map((tool, index) => {
        // If it's a ReactNode (existing span elements), render directly
        if (typeof tool === 'object' && tool !== null && 'type' in tool === false) {
          return <div key={index}>{tool}</div>
        }
        
        // If it's a ToolItem config object
        const toolItem = tool as ToolItem
        
        if (toolItem.type === 'pill' && toolItem.slug) {
          return (
            <ToolPill 
              key={index}
              slug={toolItem.slug} 
              name={toolItem.name} 
              size={toolItem.size || 'md'} 
            />
          )
        }
        
        // Generic tool span
        return (
          <span 
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
          >
            {toolItem.name}
          </span>
        )
      })}
    </div>
  )
}

// Helper function to create tool configurations
export function createTools(tools: (ToolItem | ReactNode)[]): (ToolItem | ReactNode)[] {
  return tools
}

// Helper functions for common tool types
export const toolPill = (slug: string, name: string, size: 'sm' | 'md' = 'md'): ToolItem => ({
  type: 'pill',
  slug,
  name,
  size
})

export const genericTool = (name: string): ToolItem => ({
  type: 'generic',
  name
})