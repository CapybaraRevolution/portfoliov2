import { Button } from '@/components/Button'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { AIBadge } from '@/components/ui/AIBadge'
import { ToolPill } from '@/components/ui/ToolPill'
import { NavigationChip } from '@/components/NavigationChip'
import { type CaseStudyMetadata, getNextCaseStudy } from '@/lib/caseStudies'
import { 
  MapPinIcon, 
  CalendarIcon, 
  BriefcaseIcon,
  UserIcon 
} from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface CaseMetaBarProps {
  caseStudy: CaseStudyMetadata
  className?: string
}

export function CaseMetaBar({ caseStudy, className }: CaseMetaBarProps) {
  const nextCase = getNextCaseStudy(caseStudy.slug)
  
  const breadcrumbItems = [
    { label: 'Work', href: '/work/overview' },
    { label: 'Case studies' },
    { label: caseStudy.title }
  ]

  return (
    <div className={clsx('border-b border-zinc-200 dark:border-zinc-700 pb-8 mb-12', className)}>
      {/* Breadcrumbs */}
      <div className="mb-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Title and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            {caseStudy.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {caseStudy.description}
          </p>
        </div>

        {/* Actions cluster */}
        <div className="flex flex-wrap gap-3 lg:flex-nowrap">
          <Button href="/work/overview" variant="outline">
            Back to work
          </Button>
          {nextCase && (
            <Button 
              href={`/case-studies/${nextCase.slug}`} 
              variant="outline"
            >
              Next case study
            </Button>
          )}
          <Button href="/contact" variant="filled">
            Contact Kyle
          </Button>
        </div>
      </div>

      {/* Meta strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Engagement & Location */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
            <BriefcaseIcon className="h-4 w-4" />
            {caseStudy.engagementType}
          </div>
          <span className="text-zinc-400 dark:text-zinc-500">•</span>
          <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
            <MapPinIcon className="h-4 w-4" />
            {caseStudy.location}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
          <CalendarIcon className="h-4 w-4" />
          {caseStudy.timeline}
        </div>

        {/* Status */}
        <div>
          <span className={clsx(
            'inline-flex items-center gap-x-1.5 px-2 py-1 rounded-md text-xs font-medium',
            caseStudy.status === 'Completed' 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
          )}>
            {caseStudy.status === 'Completed' ? (
              <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-emerald-500">
                <path d="M10.28 2.28a.75.75 0 0 0-1.06-1.06L4.5 5.94 2.78 4.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 animate-pulse fill-blue-500">
                <circle r={3} cx={3} cy={3} />
              </svg>
            )}
            {caseStudy.status === 'Completed' ? 'Complete' : caseStudy.status}
          </span>
        </div>

        {/* Role */}
        {caseStudy.role && (
          <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
            <UserIcon className="h-4 w-4" />
            {caseStudy.role}
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <CategoryBadge category={caseStudy.category} />
        {caseStudy.aiAccelerated && <AIBadge size="sm" />}
      </div>

      {/* Services (Process chips) */}
      {caseStudy.services.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
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
  )
}