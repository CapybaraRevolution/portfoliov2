'use client'

import { useEffect } from 'react'
import { trackJourneyStep } from '@/components/GoogleAnalytics'

interface JourneyTrackerProps {
  /** Funnel step name, e.g. "homepage_visit", "work_overview_visit" */
  step: string
  /** Page path for attribution */
  page?: string
}

/**
 * Zero-render client component that fires a GA4 journey_step event on mount.
 * Drop into any MDX page to record the step in the conversion funnel.
 */
export function JourneyTracker({ step, page }: JourneyTrackerProps) {
  useEffect(() => {
    const pagePath = page || window.location.pathname
    trackJourneyStep(step, pagePath)
  }, [step, page])

  return null
}
