'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const TOAST_DURATION = 8000 // 8 seconds

const letterContent = {
  greeting: 'Hi Mercury team —',
  paragraphs: [
    'I applied for the Principal Product Designer – Experiences role through Greenhouse. There wasn\'t a place to attach a cover letter, so I\'m leaving a short note here in case it\'s useful context alongside my resume and portfolio.',
    'When your job description opened with A Pattern Language, I have to say it immediately signaled the kind of systems work you care about: coherence, care, and human judgment—not scale for its own sake. That balance is rare, and it matches how I approach design.',
    'What stands out about Mercury is how reliably complex, high‑stakes financial actions stay understandable in the human sense—not just "possible," but legible and confidence‑building. In my experience, the challenge shifts as products add more workflows, more roles, and more entities. That\'s where experience drift creeps in: the same intent expressed in different places starts to behave differently, and edge cases become harder to reason about. The Experiences charter feels like the place where that drift gets prevented and corrected—so the product stays coherent as it grows.',
    'The work I tend to lead sits right at that boundary between clarity and growth. Day to day, that looks like partnering closely with design, product, and engineering to define the problem precisely, making decisions based on impact (not taste), and leaving behind artifacts that help teams move faster with less re‑litigation. I also care a lot about what it feels like to work together: I try to run critiques that are specific and generous, coach designers through ambiguity without taking ownership away from them, and translate between executives who need a clear story and teams who need concrete, shippable direction.',
    'If I joined, I\'d be excited to lead work across teams in three areas:\n\t•\tA shared interaction framework for money movement and review — including exception and "something needs attention" states, so trust is built through predictable behavior.\n\t•\tNavigation and context patterns that scale to multi‑entity and multi‑role usage, without making the product feel heavier as it expands.\n\t•\tA global "find and act" layer that makes it fast to move from intent to action across accounts, vendors, bills, cards, and settings.',
    'I generally approach product design through user pathways rather than isolated features. In large products, intent often stays constant while context changes, and designing feature‑by‑feature can make those transitions feel fragmented. I anchor decisions in where users already are when they act, then shape patterns that support those flows across the product. My working style is collaborative and grounded in real usage: I start with cross‑surface audits of everyday journeys and failure modes, partner with the designers closest to each area to understand where patterns diverge and why, and prototype early—often with realistic data—because interaction decisions around dense tables, review states, and permissions tend to resolve themselves only through use.',
    'Over the past few years, my work has increasingly included AI‑assisted workflows. My bias there is toward legibility and control: make system behavior visible, allow quick correction, and avoid hiding consequences behind "smart" defaults. In financial and operational tools, trust is built through predictability—and AI should reinforce that, not undermine it.',
    'If this is aligned with what you\'re looking for, I\'d welcome the chance to share examples of system audits, pattern‑level work, and interaction prototypes—and to talk through how I\'d approach Experiences as Mercury continues to grow.',
  ],
  closing: 'Sincerely,',
  signature: 'Kyle McGraw',
}

export function MercuryToast() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Show toast on mount
  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('mercury-toast-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Small delay before showing toast
    const showTimer = setTimeout(() => {
      setIsVisible(true)
      startTimeRef.current = Date.now()
    }, 1500)

    return () => clearTimeout(showTimer)
  }, [])

  // Handle auto-dismiss timer and progress
  useEffect(() => {
    if (!isVisible || isExpanded || isDismissed) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      return
    }

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / TOAST_DURATION) * 100, 100)
      setProgress(newProgress)

      if (elapsed >= TOAST_DURATION) {
        handleDismiss()
      }
    }, 16) // ~60fps

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isVisible, isExpanded, isDismissed])

  const handleDismiss = useCallback(() => {
    setIsVisible(false)
    setIsExpanded(false)
    setIsDismissed(true)
    sessionStorage.setItem('mercury-toast-dismissed', 'true')
  }, [])

  const handleExpand = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsExpanded(true)
  }, [])

  // Handle scroll to detect bottom and calculate progress
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const progress = scrollTop / (scrollHeight - clientHeight)
    setScrollProgress(Math.min(Math.max(progress, 0), 1))
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50
    if (isAtBottom && !hasReachedBottom) {
      setHasReachedBottom(true)
    }
  }, [hasReachedBottom])

  if (isDismissed && !isExpanded) return null

  // Calculate circle progress for the timer ring
  const circumference = 2 * Math.PI * 10
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence mode="wait">
      {isVisible && !isExpanded && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            mass: 0.8,
          }}
          className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
          layoutId="mercury-container"
        >
          <div
            className={cn(
              'relative flex items-start gap-3 rounded-xl p-4',
              'bg-white dark:bg-zinc-900',
              'shadow-lg shadow-zinc-900/10 dark:shadow-black/20',
              'ring-1 ring-inset ring-zinc-900/10 dark:ring-white/10',
              'border border-zinc-300 dark:border-zinc-600',
              'hover:border-zinc-400 dark:hover:border-zinc-500',
              'group cursor-pointer',
              'max-w-sm transition-all',
            )}
            onClick={handleExpand}
          >
            {/* Mercury brand icon */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500 dark:bg-emerald-400/10 shadow-sm ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-400/30">
              <EnvelopeIcon className="h-5 w-5 text-white dark:text-emerald-400" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pr-8">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Reviewing my Mercury application?
              </p>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                I have a short letter for you
              </p>
              <button
                className={cn(
                  'mt-2 text-sm font-medium',
                  'text-emerald-600 dark:text-emerald-400',
                  'hover:text-emerald-700 dark:hover:text-emerald-300',
                  'transition-colors',
                )}
              >
                Read it →
              </button>
            </div>

            {/* Progress ring dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDismiss()
              }}
              className="absolute right-3 top-3 rounded-full p-1 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
              aria-label="Dismiss"
            >
              <div className="relative h-6 w-6">
                {/* Background circle */}
                <svg
                  className="absolute inset-0 h-6 w-6 -rotate-90"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-zinc-200 dark:text-zinc-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-zinc-400 dark:text-zinc-500"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 16ms linear' }}
                  />
                </svg>
                {/* X icon in center */}
                <XMarkIcon className="absolute inset-0 m-auto h-3 w-3 text-zinc-500 dark:text-zinc-400" />
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {isExpanded && (
        <motion.div
          key="expanded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Letter modal */}
          <motion.div
            layoutId="mercury-container"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              mass: 0.8,
            }}
            className={cn(
              'relative flex max-h-[85vh] w-full max-w-2xl flex-col',
              'overflow-hidden rounded-2xl',
              'bg-white dark:bg-zinc-900',
              'shadow-2xl shadow-zinc-900/20 dark:shadow-black/40',
              'border border-zinc-300 dark:border-zinc-600',
            )}
          >
            {/* Sticky header */}
            <div
              className={cn(
                'sticky top-0 z-10',
                'px-6 py-4',
                'bg-white/95 dark:bg-zinc-900/95',
                'backdrop-blur-sm',
                'border-b border-zinc-900/5 dark:border-zinc-100/5',
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 dark:bg-emerald-400/10 shadow-sm ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-400/30">
                    <EnvelopeIcon className="h-5 w-5 text-white dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      Cover Letter for Mercury
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Principal Product Designer - Experiences
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className={cn(
                    'rounded-full p-2',
                    'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white',
                    'hover:bg-zinc-50 dark:hover:bg-zinc-800',
                    'transition-colors',
                  )}
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Scroll progress bar */}
              {isExpanded && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500"
                  style={{
                    scaleX: scrollProgress,
                  }}
                />
              )}
            </div>

            {/* Scrollable content */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="px-6 py-6">
                {/* Letter content with staggered animation */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="prose prose-sm prose-zinc max-w-none dark:prose-invert"
                >
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      },
                    }}
                    className="font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    {letterContent.greeting}
                  </motion.p>

                  {letterContent.paragraphs.map((paragraph, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: 'easeOut' },
                        },
                      }}
                      className="leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      {paragraph.split('\n').map((line, lineIndex) => {
                        if (line.startsWith('\t•\t')) {
                          return (
                            <div key={lineIndex} className="ml-6 mt-2">
                              <span className="mr-2">•</span>
                              {line.replace('\t•\t', '')}
                            </div>
                          )
                        }
                        return (
                          <p key={lineIndex} className={lineIndex > 0 ? 'mt-4' : ''}>
                            {line}
                          </p>
                        )
                      })}
                    </motion.div>
                  ))}

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      },
                    }}
                    className="mt-6 space-y-1"
                  >
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {letterContent.closing}
                    </p>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {letterContent.signature}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={cn(
                  'sticky bottom-0',
                  'px-6 py-4',
                  'bg-gradient-to-t from-white via-white to-white/80 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/80',
                  'border-t border-zinc-900/5 dark:border-zinc-100/5',
                )}
              >
                <Link
                  href="/case-studies/breeze-mortgage-hub"
                  onClick={handleDismiss}
                  className={cn(
                    'flex w-full items-center justify-center gap-2',
                    'rounded-full px-6 py-3',
                    'bg-zinc-900 hover:bg-zinc-700',
                    'dark:bg-emerald-600 dark:hover:bg-emerald-700',
                    'font-medium text-white',
                    'shadow-lg',
                    'transition-all duration-300',
                    'hover:scale-[1.02] hover:shadow-xl',
                    hasReachedBottom && 'animate-[bounce-subtle_3s_ease-in-out_infinite]',
                  )}
                >
                  <span>Get Started With My First Case Study</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
