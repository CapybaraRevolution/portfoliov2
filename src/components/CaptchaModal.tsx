'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ShieldCheckIcon, ExclamationTriangleIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Turnstile } from '@marsidev/react-turnstile'

interface CaptchaModalProps {
  open: boolean
  onClose: () => void
  onVerified: (name: string, turnstileToken: string) => Promise<void>
  commentContent: string
  isSubmitting?: boolean
}

export function CaptchaModal({ 
  open, 
  onClose, 
  onVerified, 
  commentContent, 
  isSubmitting = false 
}: CaptchaModalProps) {
  const [authorName, setAuthorName] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const turnstileRef = useRef<any>(null)

  const handleSubmit = async () => {
    if (!authorName.trim()) {
      setError('Please enter your name')
      return
    }

    if (!turnstileToken) {
      setError('Please complete the security verification')
      return
    }

    setError(null)
    setIsVerifying(true)

    try {
      await onVerified(authorName.trim(), turnstileToken)
      // Success - parent component will handle closing modal
    } catch (error) {
      const errorMessage = (error as Error).message
      setError(errorMessage)
      // Reset Turnstile on error
      if (turnstileRef.current) {
        turnstileRef.current.reset()
      }
      setTurnstileToken(null)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCancel = () => {
    setAuthorName('')
    setTurnstileToken(null)
    setError(null)
    setIsVerifying(false)
    onClose()
  }

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token)
    setError(null)
  }

  const handleTurnstileError = () => {
    setTurnstileToken(null)
    setError('Security verification failed. Please try again.')
  }

  return (
    <Dialog open={open} onClose={handleCancel} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl outline -outline-offset-1 outline-gray-200 dark:outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                <ShieldCheckIcon aria-hidden="true" className="size-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                  Verify to Post Comment
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please enter your name and complete security verification to post your comment.
                  </p>
                </div>
              </div>
            </div>

            {/* Comment Preview */}
            <div className="mt-4 p-4 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700/50">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <ChatBubbleLeftEllipsisIcon className="size-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                    Preview of your comment:
                  </p>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="whitespace-pre-wrap break-words">&ldquo;{commentContent}&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div className="mt-4">
              <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="author-name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                maxLength={50}
                disabled={isVerifying || isSubmitting}
                autoFocus
              />
            </div>

            {/* Turnstile Captcha */}
            <div className="mt-4 flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={handleTurnstileSuccess}
                onError={handleTurnstileError}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="size-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!authorName.trim() || !turnstileToken || isVerifying || isSubmitting}
                className="inline-flex w-full justify-center rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed sm:col-start-2"
              >
                {isVerifying || isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isVerifying || isSubmitting}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}