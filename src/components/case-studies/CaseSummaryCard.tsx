'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Building2, ShieldAlert, Compass, TrendingUp, ChevronRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/contexts/ReducedMotionContext'
import { trackHighlightsExpanded, trackHighlightsCollapsed } from '@/components/GoogleAnalytics'
import { triggerHotjarEvent } from '@/components/Hotjar'
import clsx from 'clsx'

export interface CaseSummaryData {
  /** What the project was about — company, product, situation */
  context: string
  /** What made this hard — timeline, team size, technical limits, stakeholder complexity */
  constraints: string
  /** 2-3 key design decisions the designer made */
  decisions: string
  /** Concrete outcomes and metrics */
  impact: string
}

interface CaseSummaryCardProps {
  summary: CaseSummaryData
  /** Slug used for analytics attribution */
  caseStudySlug?: string
  className?: string
}

const ease = [0.25, 0.46, 0.45, 0.94] as const

const fields = [
  { key: 'context' as const, label: 'Context', Icon: Building2 },
  { key: 'constraints' as const, label: 'Constraints', Icon: ShieldAlert },
  { key: 'decisions' as const, label: 'Key Decisions', Icon: Compass },
  { key: 'impact' as const, label: 'Impact', Icon: TrendingUp },
]

export function CaseSummaryCard({ summary, caseStudySlug, className }: CaseSummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [shimmerDone, setShimmerDone] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const expandedAtRef = useRef<number | null>(null)

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
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          At a Glance
        </h3>
        <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {fields.map(({ key, label, Icon }) => (
            <div key={key}>
              <dt className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Icon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                {label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {summary[key]}
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/[0.09] to-transparent dark:via-emerald-400/[0.07]"
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
              className="pointer-events-none absolute inset-0 rounded-xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                boxShadow:
                  '0 0 50px rgba(16, 185, 129, 0.22), inset 0 0 40px rgba(16, 185, 129, 0.07)',
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Trigger bar ── */}
        <button
          onClick={handleToggle}
          className={clsx(
            'group relative z-10 flex w-full items-center justify-between',
            'px-5 py-3.5 sm:px-6 sm:py-4 text-left',
            'transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-700/20',
          )}
          aria-expanded={isExpanded}
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

          {!isExpanded && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          )}
        </button>

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
                          {summary[key]}
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
