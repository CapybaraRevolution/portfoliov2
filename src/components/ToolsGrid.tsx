'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ToolCard } from '@/components/ToolCard'
import { SideDrawer } from '@/components/SideDrawer'
import { type Tool } from '@/data/tools'

interface ToolsGridProps {
  tools: Tool[]
}

export function ToolsGrid({ tools }: ToolsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // URL parameter handling
  useEffect(() => {
    const tool = searchParams.get('tool')
    if (tool) {
      setSelectedTool(tool)
      setIsDrawerOpen(true)
    } else {
      setIsDrawerOpen(false)
      setSelectedTool(null)
    }
  }, [searchParams])

  const handleToolClick = (slug: string) => {
    const toolData = tools.find(t => t.slug === slug)
    if (!toolData) {
      console.warn(`[TOOLS] Missing content for tool slug: "${slug}". Available tools:`, tools.map(t => t.slug))
      return
    }

    console.log('[DEBUG] Tool clicked:', slug)
    setSelectedTool(slug)
    setIsDrawerOpen(true)

    // Update URL with tool parameter
    const url = new URL(window.location.href)
    url.searchParams.set('tool', slug)
    window.history.pushState(null, '', url.toString())
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedTool(null)

    // Remove tool parameter from URL
    const url = new URL(window.location.href)
    url.searchParams.delete('tool')
    window.history.pushState(null, '', url.toString())
  }

  // Convert slug to human-readable title
  function slugToTitle(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const currentTool = selectedTool ? tools.find(t => t.slug === selectedTool) : null

  // Category filtering (for future enhancement)
  const categories = ['Design', 'Research', 'PM', 'Dev', 'Experimentation', 'Data', 'AI']
  const getCategoryTools = (category: string) => tools.filter(tool => tool.category === category)

  interface CategoryChipProps {
    label: string
    href: string
  }

  function CategoryChip({ label, href }: CategoryChipProps) {
    return (
      <a
        href={href}
        className="inline-flex items-center bg-zinc-800/50 text-white/80 rounded-full px-4 py-2 text-sm font-medium hover:bg-zinc-700/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
      >
        {label}
      </a>
    )
  }

  const categoryChips = [
    { label: 'Design', href: '#design' },
    { label: 'Research', href: '#research' },
    { label: 'PM', href: '#pm' },
    { label: 'Dev', href: '#dev' },
    { label: 'Experimentation', href: '#experimentation' },
    { label: 'Data', href: '#data' },
    { label: 'AI', href: '#ai' }
  ]

  return (
    <>
      <div className="space-y-8">
        {/* Category chips row */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryChips.map((chip) => (
            <CategoryChip key={chip.label} label={chip.label} href={chip.href} />
          ))}
        </div>

        {/* Tools grid - Updated to 3/2/1 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              title={tool.title}
              summary={tool.summary}
              iconName={tool.iconName}
              pattern={tool.pattern}
              onClick={() => handleToolClick(tool.slug)}
            />
          ))}
        </div>
      </div>

      {selectedTool && (
        <SideDrawer
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          title={currentTool?.title || slugToTitle(selectedTool)}
          overview={currentTool ? 
            `## ${currentTool.title}\n\n${currentTool.summary}\n\n## What I use it for\n${currentTool.whatIUseItFor.map(item => `• ${item}`).join('\n')}` :
            `## ${slugToTitle(selectedTool)}\n**Missing tool content**\n\nThis tool needs configuration in the tools data. Check the console for available tools.`
          }
          whyItMatters={{ 
            stat: currentTool ? 'Essential Tool' : 'Content missing', 
            text: currentTool ? 'This tool is part of my core workflow for delivering great products.' : 'This tool content needs to be configured.'
          }}
          sampleContent={currentTool ? 
            `**Related services:**\n${currentTool.relatedServices.map(service => `• [${service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}](/services#${service})`).join('\n')}\n\n**Related skills:**\n${currentTool.chips.map(chip => `• [${chip.label}](${chip.href})`).join('\n')}` :
            `**Missing tool links**\n\nChips and service connections need to be configured for this tool.`
          }
        />
      )}
    </>
  )
}