'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CommentSection } from './CommentSection'

interface ComponentDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  enableComments?: boolean
  itemId?: string
}

export function ComponentDrawer({ 
  open, 
  onClose, 
  title, 
  children,
  enableComments = true,
  itemId
}: ComponentDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'comments'>('overview')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Touch handlers for swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isRightSwipe = distance < -50 // Swipe right threshold
    
    if (isRightSwipe) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Desktop: right-side tray, Mobile: full-screen */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10 lg:pl-16">
            <DialogPanel
              ref={panelRef}
              transition
              className="pointer-events-auto w-screen max-w-md sm:max-w-lg lg:max-w-xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative flex h-full flex-col overflow-y-auto bg-white dark:bg-zinc-900 py-6 shadow-xl shadow-black/20 dark:shadow-2xl dark:shadow-black/50 dark:ring-1 dark:ring-white/10 dark:drop-shadow-[0_0_24px_rgba(255,255,255,0.06)]">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-white sr-only">
                      {title}
                    </DialogTitle>
                    <div className="ml-auto flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {enableComments && (
                  <div className="px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-700">
                    <nav className="flex space-x-8" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === 'overview'
                            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('comments')}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === 'comments'
                            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        Comments
                      </button>
                    </nav>
                  </div>
                )}
                
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {activeTab === 'overview' ? (
                    children
                  ) : (
                    enableComments && itemId && (
                      <CommentSection itemId={itemId} />
                    )
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}