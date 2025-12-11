import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { type CaseStudyMetadata, getNextCaseStudy, getPreviousCaseStudy } from '@/lib/caseStudies'

interface CaseStudyFooterNavProps {
  currentSlug: string
  className?: string
}

export function CaseStudyFooterNav({ currentSlug, className = '' }: CaseStudyFooterNavProps) {
  const prevCase = getPreviousCaseStudy(currentSlug)
  const nextCase = getNextCaseStudy(currentSlug)

  return (
    <nav 
      className={`border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-16 ${className}`}
      data-case-study-footer
      data-next-case-study={nextCase ? `/case-studies/${nextCase.slug}` : undefined}
    >
      <div className="flex justify-between items-center">
        {prevCase ? (
          <Link
            href={`/case-studies/${prevCase.slug}`}
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors max-w-[45%]"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-1">
              <span className="sm:hidden font-medium text-zinc-900 dark:text-white">Previous</span>
              <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500 shrink-0">Previous:</span>
              <span className="hidden sm:inline font-medium truncate">{prevCase.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextCase ? (
          <Link
            href={`/case-studies/${nextCase.slug}`}
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-right max-w-[45%]"
            data-next-case-study-link
          >
            <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-1">
              <span className="sm:hidden font-medium text-zinc-900 dark:text-white">Next</span>
              <span className="hidden sm:inline font-medium truncate">{nextCase.title}</span>
              <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500 shrink-0">Next</span>
            </div>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
