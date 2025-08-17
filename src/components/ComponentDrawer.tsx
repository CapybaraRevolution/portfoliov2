'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  onCaptchaRequired?: () => Promise<boolean>
}

export function ComponentDrawer({ 
  open, 
  onClose, 
  title, 
  children,
  enableComments = true,
  itemId,
  onCaptchaRequired
}: ComponentDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'comments'>('overview')
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [lastX, setLastX] = useState(0)
  const [lastTime, setLastTime] = useState(0)
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState<boolean | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [preloadedComments, setPreloadedComments] = useState<any[] | null>(null)
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [commentsError, setCommentsError] = useState<string | null>(null)

  // Enhanced touch handlers for drag-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now()
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    
    setIsDragging(true)
    setStartX(x)
    setStartY(y)
    setStartTime(now)
    setLastX(x)
    setLastTime(now)
    setDragOffset(0)
    setIsHorizontalSwipe(null) // Reset swipe direction detection
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const now = Date.now()
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - startX
    const deltaY = currentY - startY
    
    // Determine swipe direction on first significant movement (10px threshold)
    if (isHorizontalSwipe === null && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      // Check if swipe is primarily horizontal (angle less than 30 degrees from horizontal)
      const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI)
      setIsHorizontalSwipe(angle < 30 || angle > 150)
    }
    
    // Only handle horizontal swipes, ignore vertical scrolling
    if (isHorizontalSwipe === false) {
      setIsDragging(false)
      return
    }
    
    // Update velocity tracking
    setLastX(currentX)
    setLastTime(now)
    
    // Only allow dragging to the right (positive deltaX) and if it's a horizontal swipe
    if (deltaX > 0 && isHorizontalSwipe) {
      setDragOffset(deltaX)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Calculate velocity (pixels per millisecond)
    const now = Date.now()
    const timeDiff = now - lastTime
    const distance = lastX - startX
    const velocity = timeDiff > 0 ? distance / timeDiff : 0
    
    // Get panel width for percentage calculation
    const panelWidth = panelRef.current?.offsetWidth || 400
    const dragPercentage = dragOffset / panelWidth
    
    // Close conditions (less sensitive to prevent accidental dismissal):
    // 1. Dragged more than 40% of width (increased threshold)
    // 2. OR fast swipe to the right (velocity > 0.5 pixels/ms)
    // 3. OR dragged at least 100px with decent velocity (> 0.25 pixels/ms)
    const shouldClose = 
      dragPercentage >= 0.4 || 
      velocity > 0.5 ||
      (dragOffset > 100 && velocity > 0.25)
    
    if (shouldClose) {
      onClose()
    } else {
      // Snap back to open
      setDragOffset(0)
    }
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

  // Reset drag state when drawer closes and preload comments when it opens
  useEffect(() => {
    if (!open) {
      setDragOffset(0)
      setIsDragging(false)
      setIsHorizontalSwipe(null)
      // Reset comments when drawer closes
      setPreloadedComments(null)
      setCommentsError(null)
    } else {
      // Preload comments when drawer opens
      preloadComments()
    }
  }, [open, itemId]) // Intentionally not including preloadComments to avoid re-fetching

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
              className={`pointer-events-auto w-screen max-w-md sm:max-w-lg lg:max-w-xl transform data-closed:translate-x-full relative ${
                isDragging 
                  ? 'transition-none' 
                  : 'transition duration-300 ease-out'
              }`}
              style={{
                transform: `translateX(${dragOffset}px)`
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* X Button - Fixed to panel, not scrollable content */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors bg-white dark:bg-zinc-900"
                aria-label="Close drawer"
              >
                <XMarkIcon className="size-5" />
              </button>
              
              <div className="relative flex h-full flex-col overflow-y-auto bg-white dark:bg-zinc-900 shadow-xl shadow-black/20 dark:shadow-2xl dark:shadow-black/50 dark:ring-1 dark:ring-white/10 dark:drop-shadow-[0_0_24px_rgba(255,255,255,0.06)]">
                {/* Hidden title for accessibility */}
                <DialogTitle className="sr-only">
                  {title}
                </DialogTitle>
                
                <div className="relative flex-1">
                  {activeTab === 'overview' ? (
                    children
                  ) : (
                    enableComments && itemId && (
                      <div className="px-4 sm:px-6 py-6">
                        <CommentSection 
                          itemId={itemId} 
                          onCaptchaRequired={onCaptchaRequired}
                          preloadedComments={preloadedComments}
                          isLoadingComments={isLoadingComments}
                          commentsError={commentsError}
                          onCommentsUpdate={setPreloadedComments}
                        />
                      </div>
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