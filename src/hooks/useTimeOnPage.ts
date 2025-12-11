'use client'

import { useEffect, useRef } from 'react'
import { trackTimeOnPage } from '@/components/GoogleAnalytics'

interface UseTimeOnPageOptions {
  page?: string
  trackIntervals?: number[] // seconds at which to fire events
}

/**
 * Hook to track time spent on a page
 * Fires GA event on page unload with total duration
 * Optionally fires at specific intervals (e.g., 30s, 60s, 2min, 5min)
 */
export function useTimeOnPage(options: UseTimeOnPageOptions = {}) {
  const { page, trackIntervals = [30, 60, 120, 300] } = options
  const startTime = useRef<number>(Date.now())
  const trackedIntervals = useRef<Set<number>>(new Set())

  useEffect(() => {
    startTime.current = Date.now()
    trackedIntervals.current = new Set()

    const pagePath = page || window.location.pathname

    // Track intervals
    const intervalId = setInterval(() => {
      const elapsed = Math.round((Date.now() - startTime.current) / 1000)
      
      for (const interval of trackIntervals) {
        if (elapsed >= interval && !trackedIntervals.current.has(interval)) {
          trackedIntervals.current.add(interval)
          trackTimeOnPage(pagePath, interval)
        }
      }
    }, 5000) // Check every 5 seconds

    // Track on page unload
    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000)
      trackTimeOnPage(pagePath, duration)
    }

    // Track on visibility change (user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const duration = Math.round((Date.now() - startTime.current) / 1000)
        trackTimeOnPage(pagePath, duration)
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('beforeunload', handleUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      // Fire final duration on cleanup (route change)
      const duration = Math.round((Date.now() - startTime.current) / 1000)
      if (duration > 0) {
        trackTimeOnPage(pagePath, duration)
      }
    }
  }, [page, trackIntervals])
}
