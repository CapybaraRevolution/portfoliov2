'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { Chip } from '@/components/ui/Chip'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { trackProcessDrawerOpen, trackEvent } from '@/components/GoogleAnalytics'

interface PersonaJourneyMappingProps {
  className?: string
  onClose?: () => void
}

export function PersonaJourneyMapping({ className, onClose }: PersonaJourneyMappingProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  // Touch state for swipe navigation
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [touchEndY, setTouchEndY] = useState<number | null>(null)
  
  // Track drawer open on mount
  useEffect(() => {
    trackProcessDrawerOpen('Persona & Journey Mapping')
  }, [])
  
  // Persona images
  const personas = [
    { image: '/images/personas/Persona-1.png' },
    { image: '/images/personas/Persona-2.png' },
    { image: '/images/personas/Persona-3.png' },
  ]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    trackEvent('persona_example_viewed', {
      persona_index: index + 1,
      process_step: 'Persona & Journey Mapping'
    })
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxIndex(0)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % personas.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + personas.length) % personas.length)
  }

  // Touch event handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null)
    setTouchEndY(null)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return
    
    const distanceX = touchStartX - touchEndX
    const distanceY = touchStartY - touchEndY
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)
    
    // Only trigger navigation for horizontal swipes
    if (!isVerticalSwipe) {
      if (isLeftSwipe && personas.length > 1) {
        nextLightboxImage()
      } else if (isRightSwipe && personas.length > 1) {
        prevLightboxImage()
      }
    }
  }

  // Handle keyboard navigation for lightbox
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
      document.body.style.overflow = 'hidden' // Prevent scrolling
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
        toolPill("google", "Maze", "md"),
        toolPill("notion", "Notion / Dovetail", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 1 · Discovery & Strategy"
        title="Persona & Journey Mapping"
        summary="Turn anecdotes into patterns we can design for—and measure."
        tools={tools}
        caseStudyUrl="/case-studies/fintech"
        enableComments={true}
        itemId="persona-journey-mapping"
      >

      {/* Why it matters - Feature card with gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed italic">
              Every Member of Our Team Should Know the Top 3 User Goals
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Design with the end user in mind. Clear personas and journeys turn scattered anecdotes into evidence we can design against—so teams agree on who we&apos;re serving, what they&apos;re trying to do, and how we&apos;ll measure progress.
            </p>
          </div>
        </div>
      </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Tight interview script; 5–7 interviews to reach pattern clarity",
              "Mine tickets & usage data for top tasks and friction points",
              "Lightweight personas (needs, contexts, JTBD)",
              "End-to-end journey with key moments and drop-offs",
              "Pain-point heatmap tied to experiment ideas"
            ]}
          />
        </div>

        {/* Outputs & artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & artifacts
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Personas (goals, contexts, constraints)",
              "Journey map with stages, emotions, and per-stage measures",
              "JTBD statements and opportunity backlog"
            ]}
          />
        </div>

        {/* Signals of success */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Signals of success
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Team can name the top 3 user goals and top 3 frictions",
              "≥ 5 instrumented events align to journey stages"
            ]}
          />
        </div>

        {/* Sample - Persona image gallery */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          
          {/* Persona Image Gallery */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Persona Examples</h4>
            
            {/* Grid layout for personas */}
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
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
                        Click to enlarge
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </DrawerLayout>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button - positioned outside the image area */}
            {personas.length > 1 && (
              <button
                onClick={prevLightboxImage}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/70 hover:bg-black/80 text-white rounded-full transition-colors shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-8 h-8" />
              </button>
            )}

            {/* Next button - positioned outside the image area */}
            {personas.length > 1 && (
              <button
                onClick={nextLightboxImage}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/70 hover:bg-black/80 text-white rounded-full transition-colors shadow-lg"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-8 h-8" />
              </button>
            )}

            {/* Main image container with touch/swipe support */}
            <div 
              className="relative max-w-[calc(100vw-200px)] max-h-[calc(100vh-120px)] mx-auto touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={personas[lightboxIndex].image}
                alt={`Persona example ${lightboxIndex + 1} (enlarged)`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain shadow-2xl"
                priority
              />
            </div>

            {/* Image counter */}
            {personas.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                {lightboxIndex + 1} of {personas.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}