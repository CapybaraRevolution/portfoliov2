'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Building2, ShieldAlert, Compass, TrendingUp, ArrowRight, ChevronRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/contexts/ReducedMotionContext'
import { trackHighlightsExpanded, trackHighlightsCollapsed } from '@/components/GoogleAnalytics'
import { triggerHotjarEvent } from '@/components/Hotjar'
import { getNextCaseStudy } from '@/lib/caseStudies'
import Link from 'next/link'
import clsx from 'clsx'

/** A field value can be a plain string or an array of strings (rendered as a bullet list). */
type SummaryField = string | string[]

export interface CaseSummaryData {
  /** What the project was about — company, product, situation */
  context: SummaryField
  /** What made this hard — timeline, team size, technical limits, stakeholder complexity */
  constraints: SummaryField
  /** 2-3 key design decisions the designer made */
  decisions: SummaryField
  /** Concrete outcomes and metrics */
  impact: SummaryField
}

/** Render a summary field — plain text for strings, a bullet list for arrays. */
function SummaryValue({ value }: { value: SummaryField }) {
  if (Array.isArray(value)) {
    return (
      <ul className="space-y-1.5 mt-0.5">
        {value.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-zinc-300 dark:text-zinc-600 shrink-0 select-none leading-relaxed" aria-hidden>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  return <>{value}</>
}

interface CaseSummaryCardProps {
  summary: CaseSummaryData
  /** Slug used for analytics attribution */
  caseStudySlug?: string
  className?: string
}

const STORAGE_KEY = 'case-summary-expanded'
const ease = [0.25, 0.46, 0.45, 0.94] as const

const fields = [
  { key: 'context' as const, label: 'Context', Icon: Building2 },
  { key: 'constraints' as const, label: 'Constraints', Icon: ShieldAlert },
  { key: 'decisions' as const, label: 'Key Decisions', Icon: Compass },
  { key: 'impact' as const, label: 'Impact', Icon: TrendingUp },
]

export function CaseSummaryCard({ summary, caseStudySlug, className }: CaseSummaryCardProps) {
  // Read initial state from sessionStorage so the preference persists
  // across case-study navigations but resets on a new browser session.
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored === null ? false : stored === '1'
    } catch {
      return true
    }
  })
  const [shimmerDone, setShimmerDone] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const expandedAtRef = useRef<number | null>(null)

  const nextCaseStudy = caseStudySlug ? getNextCaseStudy(caseStudySlug) : undefined

  // Persist expanded/collapsed preference to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, isExpanded ? '1' : '0')
    } catch {
      // sessionStorage unavailable (e.g. private browsing quota)
    }
  }, [isExpanded])

  const handleToggle = useCallback(() => {
    const slug = caseStudySlug || 'unknown'

    if (!isExpanded) {
      // Expanding
      expandedAtRef.current = Date.now()
      trackHighlightsExpanded(slug)
      triggerHotjarEvent('highlights_expanded')
    } else {
      // Collapsing — calculate how long it was open
      const timeExpanded = expandedAtRef.current
        ? Math.round((Date.now() - expandedAtRef.current) / 1000)
        : 0
      trackHighlightsCollapsed(slug, timeExpanded)
      expandedAtRef.current = null
    }

    setIsExpanded((v) => !v)
  }, [isExpanded, caseStudySlug])

  // Reduced motion: render fully expanded, no animations
  if (prefersReducedMotion) {
    return (
      <div
        className={clsx(
          'rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 p-5 sm:p-6',
          className,
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            At a Glance
          </h3>
          {nextCaseStudy && (
            <Link
              href={`/case-studies/${nextCaseStudy.slug}`}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              Next Case Study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {fields.map(({ key, label, Icon }) => (
            <div key={key}>
              <dt className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Icon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                {label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                <SummaryValue value={summary[key]} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }

  return (
    <div className={clsx('relative', className)}>
      <div
        className={clsx(
          'relative overflow-hidden rounded-xl transition-colors duration-500',
          isExpanded
            ? 'border border-zinc-300/80 dark:border-zinc-600/80 bg-zinc-50/70 dark:bg-zinc-800/40'
            : 'border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30',
        )}
      >
        {/* ── Shimmer sweep — runs once on mount when collapsed ── */}
        {!isExpanded && !shimmerDone && (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-zinc-400/30 to-transparent dark:via-white/6"
            initial={{ x: '-100%' }}
            animate={{ x: '250%' }}
            transition={{ duration: 1.6, delay: 1, ease: 'easeInOut' }}
            onAnimationComplete={() => setShimmerDone(true)}
          />
        )}

        {/* ── Glow flash on expand ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl bg-zinc-300/10 dark:bg-emerald-500/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                boxShadow:
                  '0 0 40px rgba(16, 185, 129, 0.12), inset 0 0 40px rgba(16, 185, 129, 0.04)',
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Trigger bar — entire bar toggles, nav links stop propagation ── */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle() } }}
          aria-expanded={isExpanded}
          className={clsx(
            'group relative z-10 flex w-full items-center justify-between cursor-pointer',
            'px-5 py-3.5 sm:px-6 sm:py-4',
            'transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-700/20',
          )}
        >
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.25, ease }}
            >
              <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isExpanded ? 'open' : 'closed'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                {isExpanded ? 'At a Glance' : 'In a rush? Get the highlights'}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isExpanded && nextCaseStudy && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`/case-studies/${nextCaseStudy.slug}`}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-200 group/next"
                >
                  Next Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/next:translate-x-0.5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Expandable content ── */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.45, ease },
                opacity: { duration: 0.3, delay: 0.08 },
              }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="border-t border-zinc-200/60 dark:border-zinc-700/60 pt-5">
                  <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {fields.map(({ key, label, Icon }, index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.12 + index * 0.09,
                          ease,
                        }}
                      >
                        <dt className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          <Icon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                          {label}
                        </dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          <SummaryValue value={summary[key]} />
                        </dd>
                      </motion.div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
