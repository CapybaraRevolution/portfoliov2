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
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
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