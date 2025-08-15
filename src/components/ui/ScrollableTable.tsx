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
        className={`overflow-x-auto scrollbar-hide ${className}`}
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x pan-y' // Allow both horizontal and vertical panning
        }}
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
      `}</style>
    </div>
  )
}