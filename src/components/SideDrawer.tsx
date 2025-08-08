'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface SideDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  overview: string
  whyItMatters: {
    stat: string
    text: string
  }
  sampleContent: string
}

export function SideDrawer({ 
  open, 
  onClose, 
  title, 
  overview, 
  whyItMatters, 
  sampleContent 
}: SideDrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-lg transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="relative flex h-full flex-col overflow-y-auto bg-white dark:bg-zinc-900 py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-white">
                      {title}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {/* Overview Section */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Overview</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {overview}
                    </p>
                  </div>

                  {/* Why it matters Section */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                      <h3 className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-3">Why it matters</h3>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                          {whyItMatters.stat}
                        </div>
                        <p className="text-sm text-emerald-800 dark:text-emerald-200 flex-1">
                          {whyItMatters.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sample Section */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Sample</h3>
                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg h-48 mb-4 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-3 mx-auto flex items-center justify-center">
                          <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{sampleContent}</p>
                      </div>
                    </div>
                    <a
                      href="/portfolio"
                      className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Open case study →
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}