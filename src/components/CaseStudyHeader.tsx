import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronRightIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import { Button } from '@/components/Button'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { AIBadge } from '@/components/ui/AIBadge'
import { type CaseStudyMetadata, getNextCaseStudy } from '@/lib/caseStudies'
import clsx from 'clsx'

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyMetadata
  className?: string
}

export function CaseStudyHeader({ caseStudy, className }: CaseStudyHeaderProps) {
  const nextCase = getNextCaseStudy(caseStudy.slug)

  return (
    <div className={clsx('lg:flex lg:items-center lg:justify-between', className)}>
      <div className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <a 
                  href="/work/overview" 
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Work
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                <span className="ml-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Case Studies
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="mt-2 text-2xl/7 font-bold text-zinc-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {caseStudy.title}
        </h1>

        {/* Meta information */}
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            <BriefcaseIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
            {caseStudy.engagementType}
          </div>
          <div className="mt-2 flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            <MapPinIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
            {caseStudy.location}
          </div>
          <div className="mt-2 flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            <CalendarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
            {caseStudy.timeline}
          </div>
          {caseStudy.role && (
            <div className="mt-2 flex items-center text-sm text-zinc-600 dark:text-zinc-400">
              <UserIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
              {caseStudy.role}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {caseStudy.description}
        </p>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <CategoryBadge category={caseStudy.category} />
          {caseStudy.aiAccelerated && <AIBadge size="sm" />}
          <span className={clsx(
            'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
            caseStudy.status === 'Completed' 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
          )}>
            {caseStudy.status}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <Button href="/work/overview" variant="outline">
            Back to work
          </Button>
        </span>

        {nextCase && (
          <span className="ml-3 hidden sm:block">
            <Button 
              href={`/case-studies/${nextCase.slug}`} 
              variant="outline"
            >
              Next case study
            </Button>
          </span>
        )}

        <span className="sm:ml-3">
          <Button href="/contact" variant="filled">
            Contact Kyle
          </Button>
        </span>
      </div>
    </div>
  )
}