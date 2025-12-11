'use client'

import { useEffect } from 'react'
import { trackCaseStudyEntry, trackCaseStudyView } from '@/components/GoogleAnalytics'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { useSectionVisibility } from '@/hooks/useSectionVisibility'
import { useTimeOnPage } from '@/hooks/useTimeOnPage'

interface CaseStudyTrackerProps {
  caseStudyName: string
  enableScrollDepth?: boolean
  enableSectionVisibility?: boolean
  enableTimeTracking?: boolean
}

/**
 * Client component to track case study engagement metrics
 * Add this component to case study pages to automatically track:
 * - Entry source (referrer)
 * - Scroll depth
 * - Section visibility
 * - Time on page
 */
export function CaseStudyTracker({ 
  caseStudyName,
  enableScrollDepth = true,
  enableSectionVisibility = true,
  enableTimeTracking = true
}: CaseStudyTrackerProps) {
  // Track case study entry on mount
  useEffect(() => {
    const referrer = document.referrer
    trackCaseStudyEntry(caseStudyName, referrer)
    trackCaseStudyView(caseStudyName)
  }, [caseStudyName])

  // Optional: Track scroll depth
  useScrollDepth(enableScrollDepth ? { page: `/case-studies/${caseStudyName}` } : { thresholds: [] })

  // Optional: Track section visibility (requires data-section attributes on sections)
  useSectionVisibility(enableSectionVisibility ? { page: `/case-studies/${caseStudyName}` } : { threshold: 0 })

  // Optional: Track time on page
  useTimeOnPage(enableTimeTracking ? { page: `/case-studies/${caseStudyName}` } : { trackIntervals: [] })

  // This component doesn't render anything
  return null
}
