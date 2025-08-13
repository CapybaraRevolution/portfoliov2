'use client'

import { useState, useEffect } from 'react'
import { Chip } from '@/components/ui/Chip'
import { ToolPill } from '@/components/ui/ToolPill'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PersonaJourneyMappingProps {
  className?: string
}

export function PersonaJourneyMapping({ className }: PersonaJourneyMappingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  // Persona images
  const personas = [
    { image: '/images/personas/Persona-1.png' },
    { image: '/images/personas/Persona-2.png' },
    { image: '/images/personas/Persona-3.png' },
  ]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
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
  }, [lightboxOpen])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % personas.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + personas.length) % personas.length)
  }

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
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Bold statement */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-3">
                Team can name the top 3 user goals & top 3 frictions
              </h3>
              <p className="text-emerald-800 dark:text-emerald-200">
                Design with the end user in mind. Clear personas and journeys turn scattered anecdotes into evidence we can design against—so teams agree on who we're serving, what they're trying to do, and how we'll measure progress.
              </p>
            </div>
            
            {/* Right: Small stat list */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-emerald-800 dark:text-emerald-200 font-medium">≥ 5 instrumented events align to journey stages</span>
              </div>
            </div>
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

      {/* Sample - Persona details and carousel */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Sample
        </h2>
        
        {/* Sample Persona Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 mb-6">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
            Sample Persona: Sarah — SaaS Buyer
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-zinc-900 dark:text-white">Role:</span>
              <span className="text-zinc-700 dark:text-zinc-300 ml-2">VP of Operations at 100-person company</span>
            </div>
            <div>
              <span className="font-medium text-zinc-900 dark:text-white">Goals:</span>
              <span className="text-zinc-700 dark:text-zinc-300 ml-2">Find tools that integrate with existing stack; minimize training time</span>
            </div>
            <div>
              <span className="font-medium text-zinc-900 dark:text-white">Contexts:</span>
              <span className="text-zinc-700 dark:text-zinc-300 ml-2">Evaluating during Q4 budget planning; needs approval from IT & Finance</span>
            </div>
            <div>
              <span className="font-medium text-zinc-900 dark:text-white">Jobs to be done:</span>
              <span className="text-zinc-700 dark:text-zinc-300 ml-2">"Help me evaluate if this tool will work with our Salesforce setup."</span>
            </div>
            <div>
              <span className="font-medium text-zinc-900 dark:text-white">Constraints:</span>
              <span className="text-zinc-700 dark:text-zinc-300 ml-2">30-day evaluation window; limited time for demos</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Journey Stage: Evaluation</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Emotion:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Cautiously optimistic but pressed for time</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Actions:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Reviews pricing, checks integrations, schedules demo</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Drop-off points:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Complex pricing page; integration unclear</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Instrumentation:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">evaluation_started, pricing_viewed, demo_requested, integration_checked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Persona Image Carousel */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Persona Gallery</h4>
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {personas.map((persona, index) => (
                  <div key={index} className="w-full flex-shrink-0 lg:w-1/2">
                    <div className="mx-2">
                      <button
                        onClick={() => openLightbox(index)}
                        className="w-full bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors group"
                      >
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-700 overflow-hidden relative">
                          <img 
                            src={persona.image} 
                            alt={`Persona example ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                              Click to enlarge
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Previous persona"
            >
              <ChevronLeftIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Next persona"
            >
              <ChevronRightIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {personas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide 
                      ? 'bg-emerald-600 dark:bg-emerald-400' 
                      : 'bg-zinc-300 dark:bg-zinc-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
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
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
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

            {/* Previous button */}
            {personas.length > 1 && (
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
            )}

            {/* Next button */}
            {personas.length > 1 && (
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            )}

            {/* Main image */}
            <img
              src={personas[lightboxIndex].image}
              alt={`Persona example ${lightboxIndex + 1} (enlarged)`}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={closeLightbox}
            />

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