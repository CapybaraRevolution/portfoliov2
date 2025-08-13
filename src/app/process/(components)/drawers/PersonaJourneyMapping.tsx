'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Chip } from '@/components/ui/Chip'
import { ToolPill } from '@/components/ui/ToolPill'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { trackProcessDrawerOpen, trackEvent } from '@/components/GoogleAnalytics'

interface PersonaJourneyMappingProps {
  className?: string
}

export function PersonaJourneyMapping({ className }: PersonaJourneyMappingProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
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

  return (
    <div className={className}>
      {/* H1: Persona & Journey Mapping */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 1 · Discovery & Strategy
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Persona & Journey Mapping
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Turn anecdotes into patterns we can design for—and measure.
        </p>
      </div>

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
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          What I do
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Tight interview script; 5–7 interviews to reach pattern clarity</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Mine tickets & usage data for top tasks and friction points</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Lightweight personas (needs, contexts, JTBD)</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">End-to-end journey with key moments and drop-offs</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Pain-point heatmap tied to experiment ideas</span>
          </li>
        </ul>
      </div>

      {/* Outputs & artifacts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Outputs & artifacts
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Personas (goals, contexts, constraints)</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Journey map with stages, emotions, and per-stage measures</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">JTBD statements and opportunity backlog</span>
          </li>
        </ul>
      </div>

      {/* Signals of success */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Signals of success
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Team can name the top 3 user goals and top 3 frictions</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">≥ 5 instrumented events align to journey stages</span>
          </li>
        </ul>
      </div>

      {/* Sample - Persona image gallery */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Sample
        </h2>
        
        {/* Persona Image Gallery */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h3 className="font-medium text-zinc-900 dark:text-white mb-4">Persona Examples</h3>
          
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

      {/* Tools - using ToolPill components */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <ToolPill slug="figma" name="Figma / FigJam" size="md" />
          <ToolPill slug="google" name="Typeform" size="md" />
          <ToolPill slug="hotjar" name="Hotjar" size="md" />
          <ToolPill slug="ga4" name="GA4" size="md" />
          <ToolPill slug="google" name="Maze" size="md" />
          <ToolPill slug="notion" name="Notion / Dovetail" size="md" />
        </div>
      </div>

      {/* Related - CTA row */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Related
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/case-studies/fintech"
            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            onClick={() => trackEvent('case_study_link_clicked', {
              case_study: 'fintech',
              source: 'process_drawer',
              process_step: 'Persona & Journey Mapping'
            })}
          >
            Open case study →
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium rounded-lg transition-colors"
          >
            Back to process overview ↑
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
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

            {/* Main image container with much wider spacing for arrows */}
            <div className="relative max-w-[calc(100vw-200px)] max-h-[calc(100vh-120px)] mx-auto" onClick={closeLightbox}>
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