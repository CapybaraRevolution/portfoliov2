'use client'

import Script from 'next/script'
import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-L73K96EYMF'

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') return
    
    // Initialize gtag
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push(arguments)
    }
    
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [])

  // Don't load analytics in development
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}

// Utility functions for tracking custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') return
  
  if (window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Pre-defined tracking functions for your portfolio
export const trackContactFormSubmission = (formData: any) => {
  trackEvent('contact_form_submit', {
    engagement_type: formData.engagement,
    budget_range: formData.budget,
    timeline: formData.timeline,
  })
}

export const trackProcessDrawerOpen = (drawerName: string) => {
  trackEvent('process_drawer_open', {
    drawer_name: drawerName,
  })
}

export const trackCaseStudyView = (caseStudyName: string) => {
  trackEvent('case_study_view', {
    case_study: caseStudyName,
  })
}

export const trackPortfolioProjectClick = (projectName: string) => {
  trackEvent('portfolio_project_click', {
    project_name: projectName,
  })
}

// Scroll depth tracking
export const trackScrollDepth = (page: string, depth: number, timeToReach: number) => {
  trackEvent('scroll_depth', {
    page,
    depth_percent: depth,
    time_to_reach_seconds: timeToReach,
  })
}

// Filter usage tracking
export const trackFilterApplied = (filterType: string, filterValue: string, resultsCount: number) => {
  trackEvent('filter_applied', {
    filter_type: filterType,
    filter_value: filterValue,
    results_count: resultsCount,
  })
}

// External link tracking
export const trackExternalLinkClick = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    url,
    link_text: linkText,
  })
}

// Resume download tracking
export const trackResumeDownload = (source: string) => {
  trackEvent('resume_download', {
    source,
  })
}

// CTA click tracking
export const trackCTAClick = (ctaName: string, destination: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    destination,
    location,
  })
}

// Navigation click tracking
export const trackNavigationClick = (linkName: string, destination: string, source: string) => {
  trackEvent('nav_click', {
    link_name: linkName,
    destination,
    source,
  })
}

// Case study entry tracking
export const trackCaseStudyEntry = (caseStudyName: string, referrer: string) => {
  trackEvent('case_study_entry', {
    case_study: caseStudyName,
    referrer,
    entry_source: getReferrerType(referrer),
  })
}

// Contact page/drawer tracking
export const trackContactPageView = (referrer: string, referringPage: string) => {
  trackEvent('contact_opened', {
    referrer,
    source_page: referringPage,
  })
}

export const trackContactDrawerOpen = (triggerLocation: string) => {
  trackEvent('contact_drawer_opened', {
    trigger_location: triggerLocation,
  })
}

export const trackContactFormAbandoned = (lastStep: number, timeSpent: number, fieldsCompleted: string[]) => {
  trackEvent('contact_form_abandoned', {
    abandoned_at_step: lastStep,
    time_spent_seconds: timeSpent,
    fields_completed: fieldsCompleted.join(','),
  })
}

export const trackContactStepCompleted = (stepNumber: number, stepName: string, timeOnStep: number) => {
  trackEvent('contact_step_completed', {
    step_number: stepNumber,
    step_name: stepName,
    time_on_step_seconds: timeOnStep,
  })
}

// Section visibility tracking (for case studies)
export const trackSectionViewed = (sectionName: string, page: string, timeVisible: number) => {
  trackEvent('section_viewed', {
    section_name: sectionName,
    page,
    time_visible_seconds: timeVisible,
  })
}

// Time on page tracking
export const trackTimeOnPage = (page: string, duration: number) => {
  trackEvent('time_on_page', {
    page,
    duration_seconds: duration,
  })
}

// Highlights (CaseSummaryCard) tracking
export const trackHighlightsExpanded = (caseStudy: string) => {
  trackEvent('highlights_expanded', {
    case_study: caseStudy,
    event_category: 'engagement',
  })
}

export const trackHighlightsCollapsed = (caseStudy: string, timeExpanded: number) => {
  trackEvent('highlights_collapsed', {
    case_study: caseStudy,
    time_expanded_seconds: timeExpanded,
    event_category: 'engagement',
  })
}

// Journey step tracking (for funnel analysis)
export const trackJourneyStep = (step: string, page: string) => {
  trackEvent('journey_step', {
    step,
    page,
  })
}

// Helper to categorize referrer
function getReferrerType(referrer: string): string {
  if (!referrer) return 'direct'
  
  try {
    const url = new URL(referrer)
    const hostname = url.hostname
    
    // Check if it's internal
    if (hostname.includes('kylemcgraw.io') || hostname.includes('localhost')) {
      const path = url.pathname
      if (path === '/' || path === '') return 'homepage'
      if (path.includes('/work')) return 'work_overview'
      if (path.includes('/process')) return 'process_page'
      if (path.includes('/case-studies')) return 'other_case_study'
      return 'internal_other'
    }
    
    // External sources
    if (hostname.includes('google')) return 'google_search'
    if (hostname.includes('linkedin')) return 'linkedin'
    if (hostname.includes('twitter') || hostname.includes('x.com')) return 'twitter'
    return 'external_other'
  } catch {
    return 'unknown'
  }
}