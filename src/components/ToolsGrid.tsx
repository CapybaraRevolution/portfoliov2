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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            `**Related services:**\n${currentTool.chips.map(chip => `• [${chip.label}](${chip.href})`).join('\n')}` :
            `**Missing tool links**\n\nChips and service connections need to be configured for this tool.`
          }
        />
      )}
    </>
  )
}