import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { type CaseStudyMetadata } from '@/lib/caseStudies'
import clsx from 'clsx'

interface CaseStudyHeaderProps {
  caseStudy: CaseStudyMetadata
  className?: string
}

export function CaseStudyHeader({ caseStudy, className }: CaseStudyHeaderProps) {
  // Build metadata parts for the quiet row
  const metadataParts = [
    caseStudy.client,
    caseStudy.timeline,
    caseStudy.role,
    caseStudy.status
  ].filter(Boolean)

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

      {/* Quiet metadata row: Client • Timeline • Role • Status */}
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {metadataParts.join(' • ')}
      </p>

        {/* Description */}
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {caseStudy.description}
        </p>
    </div>
  )
}
