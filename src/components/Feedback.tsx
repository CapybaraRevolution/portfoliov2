'use client'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { forwardRef, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitFeedback } from '@/app/feedback/actions'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="10" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"
      />
    </svg>
  )
}

function FeedbackButton(
  props: Omit<React.ComponentPropsWithoutRef<'button'>, 'type' | 'className'>,
) {
  return (
    <button
      type="submit"
      className="px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-900/2.5 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
      {...props}
    />
  )
}

const FeedbackForm = forwardRef<
  React.ElementRef<'form'>,
  React.ComponentPropsWithoutRef<'form'> & { isSubmitting?: boolean }
>(function FeedbackForm({ onSubmit, className, isSubmitting = false, ...props }, ref) {
  return (
    <form
      {...props}
      ref={ref}
      onSubmit={onSubmit}
      className={clsx(
        className,
        'absolute inset-0 flex items-center justify-center gap-6 md:justify-start',
      )}
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Was this page helpful?
      </p>
      <div className="group grid h-8 grid-cols-[1fr_1px_1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10">
        <FeedbackButton data-response="yes" disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Yes'}
        </FeedbackButton>
        <div className="bg-zinc-900/10 dark:bg-white/10" />
        <FeedbackButton data-response="no" disabled={isSubmitting}>
          {isSubmitting ? '...' : 'No'}
        </FeedbackButton>
      </div>
    </form>
  )
})

const FeedbackThanks = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function FeedbackThanks({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'absolute inset-0 flex justify-center md:justify-start',
      )}
    >
      <div className="flex items-center gap-3 rounded-full bg-emerald-50/50 py-1 pr-3 pl-1.5 text-sm text-emerald-900 ring-1 ring-emerald-500/20 ring-inset dark:bg-emerald-500/5 dark:text-emerald-200 dark:ring-emerald-500/30">
        <CheckIcon className="h-5 w-5 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
        Thanks for your feedback!
      </div>
    </div>
  )
})

const EasterEggModal = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { 
    onClose: () => void
    confettiRef: React.RefObject<ConfettiRef>
  }
>(function EasterEggModal({ onClose, confettiRef, className, ...props }, ref) {
  const [showInput, setShowInput] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Fire confetti when modal appears
    const timer = setTimeout(() => {
      if (confettiRef.current) {
        confettiRef.current.fire({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#fbbf24'],
        })
      }
    }, 200)
    
    return () => clearTimeout(timer)
  }, [confettiRef])

  const handleRatingClick = (value: number) => {
    setRating(value)
    setShowInput(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Submit additional feedback
    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
      const pageTitle = typeof window !== 'undefined' 
        ? document.title.replace(' - Kyle McGraw', '').trim() 
        : ''
      
      await submitFeedback({
        response: 'yes', // Easter egg is always positive!
        pageUrl,
        pageTitle: `Easter Egg Feedback${pageTitle ? ` - ${pageTitle}` : ''}`,
        rating: rating || undefined,
        comment: comment || undefined,
      })
      
      // Small delay for UX
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (error) {
      console.error('Easter egg feedback error:', error)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-0 z-[100] flex items-center justify-center p-4'
      )}
      {...props}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mb-4 text-6xl"
          >
            🎉
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white"
          >
            You found a secret!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-zinc-600 dark:text-zinc-400"
          >
            Tell me how you&apos;re liking the site?
          </motion.p>

          {!showInput ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-2"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  className="transform rounded-full bg-zinc-100 p-3 text-2xl transition-all hover:scale-110 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  {value === 1 ? '😞' : value === 2 ? '😐' : value === 3 ? '🙂' : value === 4 ? '😊' : '🤩'}
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Your rating: {rating && (rating === 1 ? '😞' : rating === 2 ? '😐' : rating === 3 ? '🙂' : rating === 4 ? '😊' : '🤩')}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts (optional)..."
                  className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
})

export function Feedback() {
  const [submitted, setSubmitted] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pageUrl, setPageUrl] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const confettiRef = useRef<ConfettiRef>(null)

  useEffect(() => {
    // Capture current page URL and title
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href)
      setPageTitle(document.title.replace(' - Kyle McGraw', '').trim())
    }
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    // Get the submitter from the native event
    const nativeEvent = event.nativeEvent as any
    const submitter = nativeEvent.submitter as HTMLButtonElement | null
    const response = submitter?.dataset.response as 'yes' | 'no' | undefined

    if (!response || !pageUrl) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitFeedback({
        response,
        pageUrl,
        pageTitle,
      })

      setSubmitted(true)
      
      // Always show easter egg after submission (success or error)
      setTimeout(() => {
        setShowEasterEgg(true)
      }, 1000)
      
      if (!result.success) {
        // Log error but still show easter egg
        console.error('Feedback submission error:', result.message)
      }
    } catch (error) {
      console.error('Feedback submission error:', error)
      // Still show thanks and easter egg on error
      setSubmitted(true)
      setTimeout(() => {
        setShowEasterEgg(true)
      }, 1000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Confetti ref={confettiRef} manualstart className="fixed inset-0 pointer-events-none z-50" />
      <div className="relative h-8">
        <Transition show={!submitted}>
          <FeedbackForm
            className="duration-300 data-closed:opacity-0 data-leave:pointer-events-none"
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </Transition>
        <Transition show={submitted && !showEasterEgg}>
          <FeedbackThanks className="delay-150 duration-300 data-closed:opacity-0" />
        </Transition>
      </div>
      
      <AnimatePresence mode="wait">
        {showEasterEgg && (
          <EasterEggModal
            key="easter-egg-modal"
            onClose={() => setShowEasterEgg(false)}
            confettiRef={confettiRef}
          />
        )}
      </AnimatePresence>
    </>
  )
}
