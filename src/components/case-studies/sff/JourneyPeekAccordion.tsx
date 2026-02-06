"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/contexts/ReducedMotionContext'
import { Map, ChevronDown } from 'lucide-react'
import { JourneyWalkthrough } from './JourneyWalkthrough'

// Standard ease used across the codebase (FadeIn, ProseSection, CaseSummaryCard, etc.)
const ease = [0.25, 0.46, 0.45, 0.94] as const

export function JourneyPeekAccordion() {
  const [isOpen, setIsOpen] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Reveal CTA label once the section scrolls into view
  useEffect(() => {
    if (showCta) return

    // Reduced motion: show immediately in settled (zinc) state
    if (prefersReducedMotion) {
      setShowCta(true)
      return
    }

    const el = containerRef.current
    if (!el) return

    let showTimer: ReturnType<typeof setTimeout>
    let fadeTimer: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay so FadeIn wrapper settles first
          showTimer = setTimeout(() => {
            setShowCta(true)
            setIsHighlighted(true)
            // Fade emerald sheen → neutral zinc
            fadeTimer = setTimeout(() => setIsHighlighted(false), 2500)
          }, 1200)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (showTimer) clearTimeout(showTimer)
      if (fadeTimer) clearTimeout(fadeTimer)
    }
  }, [prefersReducedMotion, showCta])

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
    // Settle highlight immediately on click
    if (isHighlighted) setIsHighlighted(false)
  }, [isHighlighted])

  // Content expand/collapse — matches CaseSummaryCard pattern
  const contentTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        height: { duration: 0.45, ease },
        opacity: { duration: 0.3, delay: 0.08 },
      }

  return (
    <div
      ref={containerRef}
      data-state={isOpen ? 'open' : 'closed'}
      className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-transparent"
    >
      {/* Trigger */}
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="journey-walkthrough-content"
        className={cn(
          "w-full text-left transition-colors cursor-pointer",
          "hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300",
        )}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              <Map className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white text-sm">
                User Journey Walkthrough
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Interactive flow diagram with step-by-step annotations
              </div>
            </div>
          </div>

          {/* Chevron area — CTA expands leftward, persists, sheen fades to zinc */}
          <div className="flex items-center shrink-0">
            <AnimatePresence>
              {showCta && !isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0, marginRight: 0 }}
                  animate={{ opacity: 1, width: "auto", marginRight: 8 }}
                  exit={{ opacity: 0, width: 0, marginRight: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden inline-flex items-center"
                >
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap py-1 px-2.5 rounded-full border",
                      isHighlighted
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/40"
                        : "text-zinc-500 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-700/40",
                    )}
                    style={{
                      transitionProperty: 'color, background-color, border-color',
                      transitionDuration: '500ms',
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  >
                    Click to explore
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0",
                isOpen && "rotate-180",
                isHighlighted && !isOpen
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-500 dark:text-zinc-400",
              )}
              style={{
                transition: 'color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="journey-walkthrough-content"
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={contentTransition}
            className="overflow-hidden"
          >
            <JourneyWalkthrough seamless />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
