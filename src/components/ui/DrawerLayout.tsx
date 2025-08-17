'use client'

import { ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CommentSection } from '@/components/CommentSection'

interface DrawerLayoutProps {
  // Step breakdown (green breadcrumb)
  stepText: string
  
  // Title/summary matching clicked element
  title: string
  summary?: string
  
  // Main content sections
  children: ReactNode
  
  // Tools section
  tools?: ReactNode
  
  // Bottom actions  
  caseStudyUrl?: string
  caseStudyFilters?: string
  
  // Comments support
  enableComments?: boolean
  itemId?: string
}

export function DrawerLayout({ 
  stepText,
  title, 
  summary,
  children,
  tools,
  caseStudyUrl,
  caseStudyFilters,
  enableComments = true,
  itemId
}: DrawerLayoutProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'comments'>('overview')
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({})
  const contentRef = useRef<HTMLDivElement>(null)
  const [preloadedComments, setPreloadedComments] = useState<any[] | null>(null)
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [commentsError, setCommentsError] = useState<string | null>(null)

  // Save scroll position when switching tabs
  const saveScrollPosition = (tab: string) => {
    if (contentRef.current) {
      setScrollPositions(prev => ({
        ...prev,
        [tab]: contentRef.current!.scrollTop
      }))
    }
  }

  // Restore scroll position when switching to a tab
  const restoreScrollPosition = (tab: string) => {
    if (contentRef.current && scrollPositions[tab] !== undefined) {
      contentRef.current.scrollTop = scrollPositions[tab]
    }
  }

  // Handle tab switching with scroll preservation
  const handleTabSwitch = (newTab: 'overview' | 'comments') => {
    saveScrollPosition(activeTab)
    setActiveTab(newTab)
    // Use setTimeout to ensure the content has rendered before scrolling
    setTimeout(() => restoreScrollPosition(newTab), 0)
  }

  // Preload comments when drawer opens
  const preloadComments = useCallback(async () => {
    if (!enableComments || !itemId || preloadedComments !== null) return
    
    setIsLoadingComments(true)
    setCommentsError(null)
    
    try {
      const response = await fetch(`/api/comments/${itemId}`)
      if (response.ok) {
        const data = await response.json()
        setPreloadedComments(data.comments || [])
      } else {
        setCommentsError('Failed to load comments')
      }
    } catch (error) {
      console.error('Failed to preload comments:', error)
      setCommentsError('Failed to load comments')
    } finally {
      setIsLoadingComments(false)
    }
  }, [enableComments, itemId, preloadedComments])

  // Preload comments when component mounts
  useEffect(() => {
    preloadComments()
  }, []) // Intentionally not including preloadComments to avoid re-fetching

  return (
    <div className="flex flex-col h-full relative bg-white dark:bg-zinc-900">

      {/* STICKY HEADER: Step breakdown, title, summary, tabs */}
      <div className="sticky top-0 bg-white dark:bg-zinc-900 z-10 border-b border-zinc-200 dark:border-zinc-700">
        {/* 1. Step breakdown (green breadcrumb) - improved spacing */}
        <div className="pt-6 px-6 pb-2">
          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
            {stepText}
          </div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            {title}
          </h1>
          {summary && (
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3">
              {summary}
            </p>
          )}
        </div>

        {/* 2. Overview/Comments tabs */}
        <div className="px-6 pb-3">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => handleTabSwitch('overview')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              Overview
            </button>
            {enableComments && (
              <button
                onClick={() => handleTabSwitch('comments')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'comments'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                Comments
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto px-6 py-4 bg-white dark:bg-zinc-900 relative z-0"
      >
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {children}
            
            {/* Tools section moved into content */}
            {tools && (
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Tools
                </h3>
                {tools}
              </div>
            )}
          </div>
        ) : (
          enableComments && itemId && (
            <CommentSection 
              itemId={itemId} 
              preloadedComments={preloadedComments}
              isLoadingComments={isLoadingComments}
              commentsError={commentsError}
              onCommentsUpdate={setPreloadedComments}
            />
          )
        )}
      </div>

      {/* STICKY FOOTER: Bottom actions only */}
      {caseStudyUrl && (
        <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={caseStudyFilters ? `${caseStudyUrl}?${caseStudyFilters}` : caseStudyUrl}
              className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              View case studies →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}