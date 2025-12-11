'use client'

import { useEffect, useRef, useCallback } from 'react'
import { trackSectionViewed } from '@/components/GoogleAnalytics'

interface SectionTiming {
  enteredAt: number | null
  totalTimeVisible: number
  tracked: boolean
}

interface UseSectionVisibilityOptions {
  page?: string
  threshold?: number // intersection threshold (0-1)
  minTimeToTrack?: number // minimum seconds visible to track
}

/**
 * Hook to track which sections users view on a page
 * Uses Intersection Observer to detect when sections enter viewport
 * Tracks time each section is visible
 */
export function useSectionVisibility(options: UseSectionVisibilityOptions = {}) {
  const { page, threshold = 0.5, minTimeToTrack = 2 } = options
  const sectionTimings = useRef<Map<string, SectionTiming>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const trackSection = useCallback((sectionName: string) => {
    const timing = sectionTimings.current.get(sectionName)
    if (!timing || timing.tracked) return

    const pagePath = page || window.location.pathname
    
    if (timing.totalTimeVisible >= minTimeToTrack) {
      trackSectionViewed(sectionName, pagePath, Math.round(timing.totalTimeVisible))
      timing.tracked = true
    }
  }, [page, minTimeToTrack])

  useEffect(() => {
    const pagePath = page || window.location.pathname
    sectionTimings.current = new Map()

    // Find all sections with data-section attribute
    const sections = document.querySelectorAll('[data-section]')
    
    if (sections.length === 0) return

    // Initialize timings
    sections.forEach((section) => {
      const sectionName = section.getAttribute('data-section')
      if (sectionName) {
        sectionTimings.current.set(sectionName, {
          enteredAt: null,
          totalTimeVisible: 0,
          tracked: false,
        })
      }
    })

    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionName = entry.target.getAttribute('data-section')
          if (!sectionName) return

          const timing = sectionTimings.current.get(sectionName)
          if (!timing) return

          if (entry.isIntersecting) {
            // Section entered viewport
            timing.enteredAt = Date.now()
          } else {
            // Section left viewport
            if (timing.enteredAt) {
              timing.totalTimeVisible += (Date.now() - timing.enteredAt) / 1000
              timing.enteredAt = null
              trackSection(sectionName)
            }
          }
        })
      },
      { threshold }
    )

    // Observe all sections
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    // Cleanup and track remaining visible sections on unmount
    return () => {
      // Track any sections still visible
      sectionTimings.current.forEach((timing, sectionName) => {
        if (timing.enteredAt) {
          timing.totalTimeVisible += (Date.now() - timing.enteredAt) / 1000
          timing.enteredAt = null
        }
        if (!timing.tracked && timing.totalTimeVisible >= minTimeToTrack) {
          trackSectionViewed(sectionName, pagePath, Math.round(timing.totalTimeVisible))
        }
      })

      observerRef.current?.disconnect()
    }
  }, [page, threshold, minTimeToTrack, trackSection])
}
