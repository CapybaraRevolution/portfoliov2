import { CaseStudyHeader } from '@/components/CaseStudyHeader'
import { CaseStudyMetrics, type MetricData } from '@/components/CaseStudyMetrics'
import { NavigationChip } from '@/components/NavigationChip'
import { ToolPill } from '@/components/ui/ToolPill'
import { type CaseStudyMetadata } from '@/lib/caseStudies'

interface CaseStudyViewerProps {
  caseStudy: CaseStudyMetadata
  metrics?: MetricData[]
  children: React.ReactNode
}

export function CaseStudyViewer({ caseStudy, metrics, children }: CaseStudyViewerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <CaseStudyHeader caseStudy={caseStudy} className="mb-12" />
      
      {/* Metrics Section */}
      {metrics && metrics.length > 0 && (
        <CaseStudyMetrics metrics={metrics} className="mb-12" />
      )}

      {/* Services & Tools Section */}
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Services */}
        {caseStudy.services.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
              Services & Approach
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.services.map((service) => (
                <NavigationChip 
                  key={service} 
                  skill={service}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {caseStudy.tools.length > 0 && (
          <div>
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
      </div>

      {/* Content Section */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}