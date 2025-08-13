'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ComponentDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function ComponentDrawer({ 
  open, 
  onClose, 
  title, 
  children
}: ComponentDrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
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
                    <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-white sr-only">
                      {title}
                    </DialogTitle>
                    <div className="ml-auto flex h-7 items-center">
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
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}