'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import { type CaseStudyMetadata, getNextCaseStudy, getPreviousCaseStudy } from '@/lib/caseStudies'

interface CaseStudyFooterNavProps {
  currentSlug: string
  className?: string
}

export function CaseStudyFooterNav({ currentSlug, className = '' }: CaseStudyFooterNavProps) {
  const prevCase = getPreviousCaseStudy(currentSlug)
  const nextCase = getNextCaseStudy(currentSlug)
  const [shouldPulse, setShouldPulse] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Pulse when footer becomes visible - once triggered, stays pulsing
  useEffect(() => {
    if (!navRef.current || !nextCase) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPulse(true)
            // Once pulsing starts, it stays - disconnect observer
            observer.disconnect()
          }
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
              className={`group relative flex items-center gap-2 text-sm transition-all duration-300 text-right ${
                shouldPulse 
                  ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              data-next-case-study-link
            >
              <motion.div 
                className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-1"
                variants={shouldPulse ? {
                  initial: { scale: 1 },
                  hover: { scale: 1.02 },
                } : undefined}
                transition={{ duration: 0.2 }}
              >
                <span className="sm:hidden font-medium text-zinc-900 dark:text-white">Next</span>
                <span className="hidden sm:inline font-medium truncate">{nextCase.title}</span>
                <motion.span 
                  className="hidden sm:inline text-zinc-400 dark:text-zinc-500 shrink-0"
                  variants={shouldPulse ? {
                    initial: { color: 'rgb(161, 161, 170)' },
                    hover: { color: 'rgb(52, 211, 153)' },
                  } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  Next
                </motion.span>
              </motion.div>
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
          </motion.div>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
