'use client'

import { useRef, useState, useEffect } from 'react'

interface ScrollableTableProps {
  children: React.ReactNode
  className?: string
}

export function ScrollableTable({ children, className = '' }: ScrollableTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  // Check scroll position to show/hide scroll indicators
  const checkScrollPosition = () => {
    const element = scrollRef.current
    if (!element) return

    setCanScrollLeft(element.scrollLeft > 0)
    setCanScrollRight(
      element.scrollLeft < element.scrollWidth - element.clientWidth
    )
  }

  useEffect(() => {
    checkScrollPosition()
    const element = scrollRef.current
    if (element) {
      element.addEventListener('scroll', checkScrollPosition)
      return () => element.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  // Touch/mouse handlers for more deliberate horizontal scrolling
  const [startY, setStartY] = useState(0)
  const [initialDirection, setInitialDirection] = useState<'horizontal' | 'vertical' | null>(null)

  const handleStart = (clientX: number, clientY?: number) => {
    setIsDragging(true)
    setStartX(clientX)
    if (clientY !== undefined) setStartY(clientY)
    setScrollStart(scrollRef.current?.scrollLeft || 0)
    setInitialDirection(null)
  }

  const handleMove = (clientX: number, clientY?: number) => {
    if (!isDragging || !scrollRef.current) return
    
    const deltaX = startX - clientX
    const deltaY = clientY !== undefined ? startY - clientY : 0
    
    // Determine initial direction if not set
    if (initialDirection === null && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        setInitialDirection('horizontal')
      } else {
        setInitialDirection('vertical')
        setIsDragging(false) // Stop tracking if it's a vertical gesture
        return
      }
    }
    
    // Only apply horizontal scroll if direction is horizontal
    if (initialDirection === 'horizontal') {
      scrollRef.current.scrollLeft = scrollStart + deltaX
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
    setInitialDirection(null)
  }

  // Touch events with improved direction detection
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (initialDirection === 'horizontal') {
      e.preventDefault() // Prevent page scroll only for horizontal gestures
    }
    handleMove(e.touches[0].clientX, e.touches[0].clientY)
  }

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  return (
    <div className="relative">
      {/* Left scroll indicator */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none md:hidden">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Right scroll indicator */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none md:hidden">
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto scrollbar-hide touch-pan-x ${className}`}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          WebkitOverflowScrolling: 'touch'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {children}
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .touch-pan-x {
          touch-action: pan-x;
        }
      `}</style>
    </div>
  )
}