'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TabId, TabConfig } from './types'
import { PrioritizationPanel } from './panels/PrioritizationPanel'
import { IAFlowsPanel } from './panels/IAFlowsPanel'
import { RoadmapPanel } from './panels/RoadmapPanel'

const tabs: TabConfig[] = [
  { id: 'prioritization', label: 'Prioritization', href: '?tab=prioritization' },
  { id: 'ia', label: 'IA & Flows', href: '?tab=ia' },
  { id: 'roadmap', label: 'Roadmap & Alignment', href: '?tab=roadmap' },
]

export function Step2Tabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabListRef = useRef<HTMLDivElement>(null)
  
  // Get active tab from URL or default to first tab
  const urlTab = searchParams.get('tab') as TabId | null
  const [activeTab, setActiveTab] = useState<TabId>(
    urlTab && tabs.find(tab => tab.id === urlTab) ? urlTab : 'prioritization'
  )

  // Sync with URL changes
  useEffect(() => {
    const urlTab = searchParams.get('tab') as TabId | null
    if (urlTab && tabs.find(tab => tab.id === urlTab)) {
      setActiveTab(urlTab)
    }
  }, [searchParams])

  // Persist to localStorage as fallback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('step2-last-tab', activeTab)
    }
  }, [activeTab])

  // Load from localStorage if no URL param
  useEffect(() => {
    if (!urlTab && typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('step2-last-tab') as TabId | null
      if (savedTab && tabs.find(tab => tab.id === savedTab)) {
        setActiveTab(savedTab)
        router.replace(`?tab=${savedTab}`, { scroll: false })
      }
    }
  }, [urlTab, router])

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId)
    router.replace(`?tab=${tabId}`, { scroll: false })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, tabId: TabId) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId)
    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        break
      case 'ArrowRight':
        event.preventDefault()
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = tabs.length - 1
        break
      default:
        return
    }

    const nextTab = tabs[nextIndex]
    if (nextTab) {
      handleTabClick(nextTab.id)
      
      // Focus the next tab button
      const nextButton = tabListRef.current?.querySelector(
        `button[data-tab-id="${nextTab.id}"]`
      ) as HTMLButtonElement
      nextButton?.focus()
    }
  }

  const renderTabPanel = () => {
    switch (activeTab) {
      case 'prioritization':
        return <PrioritizationPanel />
      case 'ia':
        return <IAFlowsPanel />
      case 'roadmap':
        return <RoadmapPanel />
      default:
        return <PrioritizationPanel />
    }
  }

  return (
    <>
      {/* Tab Navigation */}
      <div className="border-b border-zinc-200 dark:border-zinc-700">
        <div 
          ref={tabListRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide" 
          role="tablist"
          aria-label="Planning & Architecture sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:border-zinc-600'
              }`}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panel */}
      <div 
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-8"
      >
        {renderTabPanel()}
      </div>
    </>
  )
}