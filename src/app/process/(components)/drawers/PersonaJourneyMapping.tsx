'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { trackProcessDrawerOpen, trackEvent } from '@/components/GoogleAnalytics'

interface PersonaJourneyMappingProps {
  className?: string
  onClose?: () => void
}

export function PersonaJourneyMapping({ className, onClose }: PersonaJourneyMappingProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [touchEndY, setTouchEndY] = useState<number | null>(null)
  
  useEffect(() => {
    trackProcessDrawerOpen('Personas')
  }, [])
  
  const personas = [
    { image: '/images/personas/Persona-1.png' },
    { image: '/images/personas/Persona-2.png' },
    { image: '/images/personas/Persona-3.png' },
  ]

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    trackEvent('persona_example_viewed', {
      persona_index: index + 1,
      process_step: 'Personas'
    })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setLightboxIndex(0)
  }, [])

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % personas.length)
  }, [personas.length])

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + personas.length) % personas.length)
  }, [personas.length])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEndX(null)
    setTouchEndY(null)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return
    
    const distanceX = touchStartX - touchEndX
    const distanceY = touchStartY - touchEndY
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)
    
    if (!isVerticalSwipe) {
      if (isLeftSwipe && personas.length > 1) {
        nextLightboxImage()
      } else if (isRightSwipe && personas.length > 1) {
        prevLightboxImage()
      }
    }
  }, [touchStartX, touchEndX, touchStartY, touchEndY, nextLightboxImage, prevLightboxImage, personas.length])

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (lightboxOpen) {
        if (event.key === 'Escape') {
          closeLightbox()
        } else if (event.key === 'ArrowRight') {
          nextLightboxImage()
        } else if (event.key === 'ArrowLeft') {
          prevLightboxImage()
        }
      }
    }

    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyboard)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboard)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen, nextLightboxImage, prevLightboxImage, closeLightbox])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma / FigJam", "md"),
        toolPill("google", "Typeform", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("ga4", "GA4", "md"),
        toolPill("notion", "Notion / Dovetail", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 1 · Discovery & Strategy"
        title="Personas"
        summary="Who are you building for? If everyone on the team has a different answer, that&apos;s a problem."
        tools={tools}
        caseStudyUrl="/case-studies/breeze-mortgage-hub"
        enableComments={true}
        itemId="persona-journey-mapping"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Here&apos;s a test: ask three people on your team who the primary user is and what they&apos;re trying to accomplish. If you get three different answers, you don&apos;t have alignment — you have a collection of assumptions that will pull the product in different directions.
          </p>
          <p>
            Personas fix this. Not the 40-page &quot;Marketing Mary loves yoga and drives a Prius&quot; kind. I mean lightweight, evidence-based profiles that capture what users are trying to do, what&apos;s getting in their way, and how you&apos;ll know if you&apos;ve helped.
          </p>
          <p>
            The goal isn&apos;t a deliverable that sits in a Notion folder. It&apos;s shared language. When someone says &quot;but what about the power user?&quot; in a meeting, everyone should picture the same person.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              I usually start with existing data — support tickets, analytics, session recordings. You&apos;d be surprised how much you can learn before talking to anyone. Then I do 5–7 interviews, enough to see patterns without drowning in transcripts.
            </p>
            <p>
              The output is simple: who they are (context, not demographics), what they&apos;re trying to do (jobs-to-be-done), and what&apos;s frustrating them. I map this to a journey — the stages they go through, where they drop off, and what emotions they&apos;re feeling at each step.
            </p>
            <p>
              It&apos;s not fancy, but it&apos;s usable. Teams can actually reference it in sprint planning instead of treating it like archived research.
            </p>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Someone in a meeting says &quot;yeah but Sarah wouldn&apos;t do that&quot; and everyone knows exactly who Sarah is and why she matters. That&apos;s the whole point.
          </p>
        </div>

        {/* Persona Example - image gallery */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Example personas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="bg-white dark:bg-zinc-800 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors group"
              >
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-700 overflow-hidden relative">
                  <Image 
                    src={persona.image} 
                    alt={`Persona example ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    style={{ pointerEvents: 'none' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
                      Click to enlarge
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" size="sm" />
            <NavigationChip skill="Information Architecture" variant="outline" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>

      {/* Lightbox */}
      {isMounted && lightboxOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {personas.length > 1 && (
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-black/70 hover:bg-black/80 text-white rounded-full transition-colors shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {personas.length > 1 && (
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-black/70 hover:bg-black/80 text-white rounded-full transition-colors shadow-lg"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            <div 
              className="relative w-full h-full flex items-center justify-center mx-auto touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={personas[lightboxIndex].image}
                alt={`Persona example ${lightboxIndex + 1} (enlarged)`}
                width={1200}
                height={800}
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain shadow-2xl"
                priority
              />
            </div>

            {personas.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                {lightboxIndex + 1} of {personas.length}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
