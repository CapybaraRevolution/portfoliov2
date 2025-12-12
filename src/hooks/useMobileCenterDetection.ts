'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

interface UseMobileCenterDetectionOptions {
  /**
   * Breakpoint below which mobile detection activates (default: 1024 for lg breakpoint)
   */
  mobileBreakpoint?: number
  /**
   * Throttle delay for scroll handler in ms (default: 50)
   */
  throttleMs?: number
}

/**
 * Hook to detect which element in a list is closest to the vertical center of the viewport.
 * Only activates on mobile/tablet devices below the specified breakpoint.
 * 
 * @param itemCount - Number of items to track
 * @param options - Configuration options
 * @returns Object containing refs array and the index of the centered item (-1 if none)
 */
export function useMobileCenterDetection<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseMobileCenterDetectionOptions = {}
): {
  refs: RefObject<T | null>[]
  centeredIndex: number
  isMobile: boolean
} {
  const { mobileBreakpoint = 1024, throttleMs = 50 } = options
  
  const [centeredIndex, setCenteredIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)
  
  // Create stable refs array
  const refsRef = useRef<RefObject<T | null>[]>([])
  if (refsRef.current.length !== itemCount) {
    refsRef.current = Array.from({ length: itemCount }, () => ({ current: null }))
  }
  
  const lastScrollTime = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  useEffect(() => {
    if (!isMobile) {
      setCenteredIndex(-1)
      return
    }

    const calculateCenteredItem = () => {
      const viewportCenter = window.innerHeight / 2
      let closestIndex = -1
      let closestDistance = Infinity

      refsRef.current.forEach((ref, index) => {
        const element = ref.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        // Calculate the center of the element
        const elementCenter = rect.top + rect.height / 2
        // Distance from viewport center
        const distance = Math.abs(elementCenter - viewportCenter)

        // Only consider elements that are at least partially visible
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight
        
        if (isVisible && distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setCenteredIndex(closestIndex)
    }

    const handleScroll = () => {
      const now = Date.now()
      
      // Throttle scroll events
      if (now - lastScrollTime.current < throttleMs) {
        // Schedule a calculation for after throttle period
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
        rafId.current = requestAnimationFrame(() => {
          calculateCenteredItem()
        })
        return
      }
      
      lastScrollTime.current = now
      calculateCenteredItem()
    }

    // Initial calculation
    calculateCenteredItem()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also listen to resize in case it affects positions
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isMobile, throttleMs])

  return {
    refs: refsRef.current,
    centeredIndex,
    isMobile,
  }
}
