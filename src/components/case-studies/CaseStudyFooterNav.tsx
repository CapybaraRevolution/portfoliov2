'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import { type CaseStudyMetadata, getNextCaseStudy, getPreviousCaseStudy } from '@/lib/caseStudies'
import { trackNavigationClick } from '@/components/GoogleAnalytics'

interface CaseStudyFooterNavProps {
  currentSlug: string
  className?: string
}

export function CaseStudyFooterNav({ currentSlug, className = '' }: CaseStudyFooterNavProps) {
  const prevCase = getPreviousCaseStudy(currentSlug)
  const nextCase = getNextCaseStudy(currentSlug)
  const [shouldPulse, setShouldPulse] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Pulse when footer becomes visible - stops when user scrolls away
  useEffect(() => {
    if (!navRef.current || !nextCase) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShouldPulse(entry.isIntersecting)
        })
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    observer.observe(navRef.current)

    return () => observer.disconnect()
  }, [nextCase])

  return (
    <nav 
      ref={navRef}
      className={`border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-16 ${className}`}
      data-case-study-footer
      data-next-case-study={nextCase ? `/case-studies/${nextCase.slug}` : undefined}
    >
      <div className="flex justify-between items-center">
        {prevCase ? (
          <Link
            href={`/case-studies/${prevCase.slug}`}
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors max-w-[45%]"
            onClick={() => trackNavigationClick(prevCase.title, `/case-studies/${prevCase.slug}`, 'case_study_footer_prev')}
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
          <motion.div
            className="relative max-w-[45%]"
            whileHover={shouldPulse ? "hover" : undefined}
            initial="initial"
            animate="initial"
          >
            {/* Emerald glow effect - only shows on hover when pulsing */}
            {shouldPulse && (
              <motion.div
                className="absolute -inset-3 rounded-xl pointer-events-none"
                variants={{
                  initial: { 
                    opacity: 0,
                    scale: 0.95,
                  },
                  hover: { 
                    opacity: 1,
                    scale: 1,
                  },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            )}
            {/* Secondary inner glow */}
            {shouldPulse && (
              <motion.div
                className="absolute -inset-2 rounded-lg pointer-events-none"
                variants={{
                  initial: { 
                    opacity: 0,
                    boxShadow: '0 0 0 rgba(16, 185, 129, 0)',
                  },
                  hover: { 
                    opacity: 1,
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
                  },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
            <Link
              href={`/case-studies/${nextCase.slug}`}
              className={`group relative flex items-center gap-2 text-sm transition-all duration-300 text-right rounded-lg px-3 py-2 -mx-3 -my-2 ${
                shouldPulse 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-white dark:bg-zinc-900' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              data-next-case-study-link
              onClick={() => trackNavigationClick(nextCase.title, `/case-studies/${nextCase.slug}`, 'case_study_footer_next')}
            >
              <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-1">
                <span className="sm:hidden font-medium text-zinc-900 dark:text-white">Next</span>
                <span className="hidden sm:inline font-medium truncate">{nextCase.title}</span>
                <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500 shrink-0">Next</span>
              </div>
              {shouldPulse ? (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: [0, 1, 0], x: [-4, 0, -4] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  variants={{
                    hover: { scale: 1.1 },
                  }}
                >
                  <ArrowRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </motion.span>
              ) : (
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
              )}
            </Link>
            {/* Stroke border — matches Link bg boundary exactly, only appears on hover */}
            {shouldPulse && (
              <motion.div
                className="absolute -inset-x-3 -inset-y-2 rounded-lg pointer-events-none"
                variants={{
                  initial: { 
                    opacity: 0,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(161, 161, 170, 0)',
                  },
                  hover: { 
                    opacity: 1,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(161, 161, 170, 0.35)',
                  },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.div>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
