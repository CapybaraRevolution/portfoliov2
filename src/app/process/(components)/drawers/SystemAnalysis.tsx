'use client'

import { useState } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface SystemAnalysisProps {
  className?: string
  onClose?: () => void
}

export function SystemAnalysis({ className, onClose }: SystemAnalysisProps) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  
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
        summary="Know the constraints before you start designing. Otherwise you&apos;ll design something that can&apos;t be built."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=System%20Analysis"
        enableComments={true}
        itemId="system-analysis"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            I&apos;ve seen designers hand off beautiful work that engineering looked at and said &quot;...we can&apos;t do that.&quot; Not because it was bad design, but because nobody checked what the system could actually support. Maybe the API doesn&apos;t return that data. Maybe the auth model doesn&apos;t work that way. Maybe that &quot;simple&quot; feature touches six services nobody mentioned.
          </p>
          <p>
            System analysis is about understanding the machine before you try to redesign it. I sit down with engineers early — not to slow things down, but to avoid wasted effort later. What does the stack look like? Where does data live? What&apos;s instrumented and what&apos;s a black box?
          </p>
          <p>
            The payoff is designing within reality instead of discovering constraints at the worst possible moment.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Talk to the people who built it.</strong> Engineers know where the bodies are buried. A 30-minute conversation can save weeks of rework.</li>
              <li><strong>Map what exists.</strong> I sketch out the current system — domains, services, data stores, integrations. Nothing fancy, just enough to see the shape.</li>
              <li><strong>Find the blind spots.</strong> What isn&apos;t being tracked? What data do we wish we had? This informs what to instrument later.</li>
              <li><strong>Spot quick wins.</strong> Sometimes there&apos;s low-hanging fruit — things the team can ship immediately while bigger work is in progress.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Sprint planning has fewer &quot;unknowns&quot; and nobody&apos;s surprised mid-sprint by a technical constraint that should have been obvious.
          </p>
        </div>

        {/* Sample - Image carousel */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample outputs
          </h3>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <div className="relative">
              <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
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
                      {carouselIndex + 1} of {sampleImages.length}
                    </p>
                  </div>
                </div>
                
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

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="System Design" variant="default" size="sm" />
            <NavigationChip skill="APIs & Integrations" variant="outline" size="sm" />
            <NavigationChip skill="PRDs (Specs)" variant="outline" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
