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
    'I\'m Kyle McGraw. I applied for the Principal Product Designer – Experiences role, and since there wasn\'t a place to include a cover letter, I wanted to leave a short note about why this role and this moment at Mercury stand out to me.',
    'Mercury feels like it\'s at a real turning point. The product is growing beyond core banking into more workflows, and the connective tissue of the experience matters more and more. Navigation, shared patterns, notifications, and overall system craft will shape whether that growth continues to feel clear as the product and teams scale.',
    'One thing I admire about Mercury\'s mission -> making high-stakes financial actions still feel straightforward and calm. That\'s hard to hold onto as products expand across banking, spend, payables, reimbursements, treasury, etc. The list of features grows, but so must our design patterns. I\'ve seen this stage of growth as the point where experience drift starts to show up quietly. That\'s why the work of the Experiences group feels especially important.',
    'If there\'s a strong fit, I\'d be excited to help lead work in a few areas. That includes establishing shared interaction patterns for money movement and review, shaping navigation and context patterns that work well for multi-entity use, and helping define a global "find and act" layer so users can move from intent to action without friction.',
    'My working style is practical and collaborative. I usually start by looking across everyday journeys and failure modes, then work closely with designers, engineers, and product partners to turn what we learn into patterns teams can reuse. I prototype early, sometimes in Figma and sometimes in code, because many interaction decisions only become clear when you see them in motion with real data.',
    'Over the past few years, my work has focused on helping teams turn messy workflows into systems that feel simple and trustworthy. I spend a lot of time mentoring designers and helping teams navigate ambiguity, especially when tradeoffs around craft, clarity, or system integrity come up. When it comes to AI-assisted interactions, my bias is toward legibility and control. Show what the system did, let people correct it quickly, and don\'t hide consequences behind "smart" defaults.',
    'If this sounds aligned, I\'d be glad to share examples of pattern-level work, system audits, and prototypes, and to talk through how I\'d support the Experiences group as Mercury continues to grow.',
  ],
  closing: '— Kyle',
  signature: '',
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
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1], // Bouncy ease for "poof" effect
              scale: {
                type: 'spring',
                stiffness: 400,
                damping: 15,
              }
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.7,
            transition: {
              duration: 0.2,
              ease: [0.4, 0, 1, 1], // Quick fade out
            }
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
                'bg-zinc-50/95 dark:bg-zinc-800/95',
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
                      A Note to Mercury
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
                    className="mt-6"
                  >
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {letterContent.closing}
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
                  'bg-gradient-to-t from-zinc-50 via-zinc-50 to-zinc-50/80 dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800/80',
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
