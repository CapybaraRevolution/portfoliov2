'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { formatText } from '@/lib/textFormatter'

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
  // Close handler
  const handleDrawerClose = () => {
    // Optional tracking: drawer_closed
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleDrawerClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Desktop: right-side tray, Mobile: full-screen */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10 lg:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md sm:max-w-lg lg:max-w-xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
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
                    <div 
                      className="prose prose-sm prose-zinc dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-ul:list-disc prose-ul:ml-4 prose-li:my-1"
                      dangerouslySetInnerHTML={{ 
                        __html: formatText(overview)
                      }}
                    />
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
                    <div 
                      className="prose prose-sm prose-zinc dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:text-sm prose-ul:list-disc prose-ul:ml-4 prose-li:my-1 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 mb-4"
                      dangerouslySetInnerHTML={{ 
                        __html: formatText(sampleContent)
                      }}
                    />
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