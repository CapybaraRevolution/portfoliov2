'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Lazy load AnimatedTestimonialsWrapper component when it comes into view
const AnimatedTestimonialsWrapper = dynamic(
  () => import('@/components/AnimatedTestimonialsWrapper').then(mod => ({ default: mod.AnimatedTestimonialsWrapper })),
  {
    loading: () => (
      <div className="h-64 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
    ),
    ssr: false,
  }
)

export function LazyTestimonials() {
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
      {shouldLoad ? <AnimatedTestimonialsWrapper /> : <div className="h-64" />}
    </div>
  )
}
