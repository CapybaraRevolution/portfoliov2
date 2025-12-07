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
    <nav className={`border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-16 ${className}`}>
      <div className="flex justify-between items-center">
        {prevCase ? (
          <Link
            href={`/case-studies/${prevCase.slug}`}
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500">Previous:</span>
            <span className="font-medium">{prevCase.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextCase ? (
          <Link
            href={`/case-studies/${nextCase.slug}`}
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <span className="font-medium">{nextCase.title}</span>
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500">Next</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
