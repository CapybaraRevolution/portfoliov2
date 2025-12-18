"use client"

import * as LucideIcons from "lucide-react"
import SafeToolIcon from "@/components/SafeToolIcon"
import { cn } from "@/lib/utils"

interface Tool {
  name: string
  description?: string
  icon?: keyof typeof LucideIcons
}

interface ToolsStackProps {
  tools: Tool[]
  className?: string
}

// Mapping of tool names to Lucide icon names for tools not in the system
const toolIconMap: Record<string, keyof typeof LucideIcons> = {
  "Salesforce": "Building2",
  "Tableau": "BarChart",
  "AI Tools": "Sparkles",
  "LLM assistants": "Brain",
  "LLM": "Brain",
}

export function ToolsStack({ tools, className }: ToolsStackProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {tools.map((tool, index) => {
        // Try to get icon from tool.icon prop, then from mapping
        const iconName = tool.icon || toolIconMap[tool.name] || null
        const Icon = iconName ? (LucideIcons[iconName] as React.ComponentType<{ className?: string }>) : null
        
        // Generate slug for SafeToolIcon
        const slug = tool.name.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_')
        
        // If we have a mapped icon, prefer it; otherwise try SafeToolIcon
        const useLucideIcon = !!Icon && toolIconMap[tool.name]
        
        return (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-3"
          >
            {/* Icon container */}
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {useLucideIcon && Icon ? (
                <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              ) : (
                <SafeToolIcon 
                  slug={slug}
                  size={24}
                  alt={`${tool.name} logo`}
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                {tool.name}
              </div>
              {tool.description && (
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  {tool.description}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}










