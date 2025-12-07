"use client"

import { useState } from 'react'
import { CaseStudyHeader } from '@/components/CaseStudyHeader'
import { GoalBlock } from '@/components/case-studies/GoalBlock'
import { ImpactSection } from '@/components/case-studies/ImpactSection'
import { CaseStudyFooterNav } from '@/components/case-studies/CaseStudyFooterNav'
import { type ImpactMetricProps } from '@/components/case-studies/ImpactMetric'
import { NavigationChip } from '@/components/NavigationChip'
import { ToolPill } from '@/components/ui/ToolPill'
import { type CaseStudyMetadata } from '@/lib/caseStudies'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface CaseStudyViewerProps {
  caseStudy: CaseStudyMetadata
  metrics?: ImpactMetricProps[] | null
  /** Optional hero image element to render above the goal block */
  heroImage?: React.ReactNode
  children: React.ReactNode
}

export function CaseStudyViewer({ caseStudy, metrics, heroImage, children }: CaseStudyViewerProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <CaseStudyHeader caseStudy={caseStudy} className="mb-12" />
      
      {/* Optional Hero Image - renders above goal */}
      {heroImage && (
        <div className="mb-8">
          {heroImage}
        </div>
      )}

      {/* Goal Block - renders before Results */}
      {caseStudy.goal && (
        <GoalBlock 
          goal={caseStudy.goal} 
          goalDetail={caseStudy.goalDetail} 
          className="mb-12" 
        />
      )}
      
      {/* Results/Metrics Section */}
      {metrics && metrics.length > 0 && (
        <ImpactSection title="Results" metrics={metrics} className="mb-12" contained />
      )}

      {/* Content Section */}
      <div className="mb-12">
        {children}
          </div>

      {/* Tools & Technologies Section - always visible */}
        {caseStudy.tools.length > 0 && (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tools.map((tool) => (
                <ToolPill 
                  key={tool} 
                  slug={tool.toLowerCase().replace(/\s+/g, '_')} 
                  name={tool}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

      {/* Services - hidden behind disclosure */}
      {caseStudy.services.length > 0 && (
        <div className="mb-12">
          <button
            onClick={() => setServicesExpanded(!servicesExpanded)}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <span>See focus areas</span>
            <ChevronDownIcon 
              className={`w-4 h-4 transition-transform ${servicesExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {servicesExpanded && (
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.services.map((service) => (
                <NavigationChip 
                  key={service} 
                  skill={service}
                  size="sm"
                />
              ))}
      </div>
          )}
      </div>
      )}

      {/* Footer Navigation - Prev/Next */}
      <CaseStudyFooterNav currentSlug={caseStudy.slug} />
    </div>
  )
}
