'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Lazy load Timeline component when it comes into view
const Timeline = dynamic(
  () => import('@/components/Timeline').then(mod => ({ default: mod.Timeline })),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
    ),
    // Avoid rendering the interactive timeline during SSR so it never blocks TTFB.
    ssr: false,
  }
)

export function LazyTimeline() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it comes into view
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={ref}>
      {shouldLoad ? <Timeline /> : <div className="h-96" />}
    </div>
  )
}
