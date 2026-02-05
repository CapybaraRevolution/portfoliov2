import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { 
  CalendarIcon, 
  UserIcon,
  BuildingOffice2Icon
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import { type CaseStudyMetadata } from '@/lib/caseStudies'
import clsx from 'clsx'

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyMetadata
  className?: string
}

export function CaseStudyHeader({ caseStudy, className }: CaseStudyHeaderProps) {
  return (
    <div className={clsx('', className)}>
      {/* Back link */}
      <Link
        href="/work/overview" 
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back to portfolio overview</span>
      </Link>

      {/* Title */}
      <h1 className="text-2xl/7 font-bold text-zinc-900 dark:text-white sm:text-3xl sm:tracking-tight">
        {caseStudy.title}
      </h1>

      {/* Enhanced metadata row with icons and status badge */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {caseStudy.client && (
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <BuildingOffice2Icon className="h-4 w-4 shrink-0" />
            <span>{caseStudy.client}</span>
          </div>
        )}
        {caseStudy.timeline && (
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <CalendarIcon className="h-4 w-4 shrink-0" />
            <span>{caseStudy.timeline}</span>
          </div>
        )}
        {caseStudy.role && (
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <UserIcon className="h-4 w-4 shrink-0" />
            <span>{caseStudy.role}</span>
          </div>
        )}
        {/* Status badge — blue pulse for ongoing, green check for complete */}
        {caseStudy.status && (
          <span
            className={clsx(
              'inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium',
              caseStudy.status === 'Completed'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            )}
          >
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
        )}
      </div>
    </div>
  )
}
