'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/components/GoogleAnalytics'
import { triggerHotjarEvent } from '@/components/Hotjar'

interface UseScrollDepthOptions {
  thresholds?: number[]
  page?: string
}

/**
 * Hook to track scroll depth milestones
 * Fires GA events when user scrolls past 25%, 50%, 75%, and 100% of the page
 */
export function useScrollDepth(options: UseScrollDepthOptions = {}) {
  const { thresholds = [25, 50, 75, 100], page } = options
  const startTime = useRef<number>(Date.now())
  const trackedThresholds = useRef<Set<number>>(new Set())

  useEffect(() => {
    // Reset on page change
    startTime.current = Date.now()
    trackedThresholds.current = new Set()

    const pagePath = page || window.location.pathname

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      if (docHeight <= 0) return
      
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      const timeElapsed = Math.round((Date.now() - startTime.current) / 1000)

      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !trackedThresholds.current.has(threshold)) {
          trackedThresholds.current.add(threshold)
          trackScrollDepth(pagePath, threshold, timeElapsed)

          // Fire Hotjar event at 75% so recordings can be filtered for deep readers
          if (threshold === 75 && pagePath.includes('/case-studies/')) {
            triggerHotjarEvent('case_study_deep_read')
          }
        }
      }
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [thresholds, page])
}
