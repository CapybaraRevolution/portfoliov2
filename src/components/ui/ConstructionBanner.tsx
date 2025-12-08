'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

export function ConstructionBanner() {
  const [show, setShow] = useState(true)

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-start justify-end px-4 sm:p-6 z-50"
        style={{ top: '36px', paddingTop: '36px' }} // Position 36px below navbar
      >
        <div className="flex w-full flex-col items-end space-y-4">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-zinc-50 border border-zinc-200 shadow-lg transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 data-leave:duration-100 data-leave:ease-in dark:bg-zinc-800 dark:border-zinc-700">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <WrenchScrewdriverIcon aria-hidden="true" className="size-6 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Page Under Construction
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      This case study is currently being updated. Thanks for your patience!
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="rounded-md text-sm font-medium text-emerald-600 hover:text-emerald-500 focus:outline-2 focus:outline-offset-2 focus:outline-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus:outline-emerald-400"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => setShow(false)}
                      className="inline-flex rounded-md text-zinc-400 hover:text-zinc-600 focus:outline-2 focus:outline-offset-2 focus:outline-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus:outline-zinc-400"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
