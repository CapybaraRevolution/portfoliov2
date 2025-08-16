'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface SystemAnalysisProps {
  className?: string
  onClose?: () => void
}

export function SystemAnalysis({ className, onClose }: SystemAnalysisProps) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  // Sample images - placeholders until assets are provided
  const sampleImages = [
    { 
      image: '/images/samples/system-analysis/context-diagram.png', 
      alt: 'System context diagram',
      caption: 'Current/Future system diagram (C4-style)'
    },
    { 
      image: '/images/samples/system-analysis/constraints-doc.png', 
      alt: 'Constraints documentation',
      caption: 'Technical constraints and opportunities'
    },
    { 
      image: '/images/samples/system-analysis/quick-wins.png', 
      alt: 'Quick wins list',
      caption: 'Prioritized quick-wins with owners'
    },
  ]

  const nextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % sampleImages.length)
  }

  const prevImage = () => {
    setCarouselIndex((prev) => (prev - 1 + sampleImages.length) % sampleImages.length)
  }

  const tools = (
    <ToolSection 
      tools={[
        toolPill("excalidraw", "Excalidraw", "md"),
        toolPill("postman", "Postman", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("Data platforms")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 1 · Discovery & Strategy"
        title="System Analysis"
        summary="Surface constraints, opportunities, and low-risk paths so we design what's feasible and impactful."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=System%20Analysis"
        enableComments={true}
        itemId="system-analysis"
      >

      {/* Why it matters - Feature card with gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Technical debt kills velocity—system awareness prevents it.
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Understanding constraints early means designing solutions that ship fast and scale well.
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
              "Meet key engineers/owners to understand the stack and touchpoints.",
              "Map current-state context (domains, services, data stores, auth, integrations).",
              "Review data pipeline/event taxonomy to reveal blind spots.",
              "Propose future-state deltas and a low-risk migration path.",
              "Compile a quick-wins list the team can ship immediately."
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Current/Future system diagram (C4-ish) — annotate in Figma.",
              "Tracking plan (events, properties, IDs) where applicable.",
              "Quick-wins list with owners + effort."
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
              "Fewer \"unknowns\" entering sprint planning.",
              "Events instrumented for measurement in Step 5.",
              "Reduced rework from overlooked constraints."
            ]}
          />
        </div>

        {/* Sample - Image carousel */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <div className="relative">
              {/* Carousel container */}
              <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
                {/* Placeholder for images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-zinc-200 dark:bg-zinc-600 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                      {sampleImages[carouselIndex].caption}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Sample image {carouselIndex + 1} of {sampleImages.length}
                    </p>
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                  disabled={sampleImages.length <= 1}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                  disabled={sampleImages.length <= 1}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel indicators */}
              {sampleImages.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {sampleImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCarouselIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === carouselIndex 
                          ? 'bg-emerald-500' 
                          : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}