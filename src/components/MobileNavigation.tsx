'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Suspense, createContext, useContext, useCallback } from 'react'
import { create } from 'zustand'

import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 10 9"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
    </svg>
  )
}

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 10 9"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m1.5 1 7 7M8.5 1l-7 7" />
    </svg>
  )
}

const IsInsideMobileNavigationContext = createContext(false)

function MobileNavigationDialog({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) {
  // Handle swipe to close
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // Close if swiped left more than 100px or with velocity
      if (info.offset.x < -100 || info.velocity.x < -500) {
        close()
      }
    },
    [close]
  )

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-50 lg:hidden"
    >
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <DialogBackdrop
              as={motion.div}
              static
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 bg-zinc-400/20 backdrop-blur-xs dark:bg-black/40"
              onClick={close}
            />

            <DialogPanel static>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Header />
              </motion.div>

              {/* Swipeable navigation drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={{ left: 0.2, right: 0 }}
                onDragEnd={handleDragEnd}
                className="fixed top-14 bottom-0 left-0 w-[85vw] max-w-sm overflow-y-auto bg-white px-4 pt-6 pb-4 shadow-2xl border-r border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 touch-pan-y"
              >
                {/* Drag handle indicator */}
                <div className="absolute top-3 right-2 flex flex-col gap-1 opacity-30">
                  <div className="w-1 h-8 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                </div>
                <Navigation />
              </motion.div>
            </DialogPanel>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext)
}

export const useMobileNavigationStore = create<{
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export function MobileNavigation() {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { isOpen, toggle, close } = useMobileNavigationStore()
  let ToggleIcon = isOpen ? XIcon : MenuIcon

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <ToggleIcon className="w-2.5 stroke-zinc-900 dark:stroke-white" />
      </button>
      {!isInsideMobileNavigation && (
        <Suspense fallback={null}>
          <MobileNavigationDialog isOpen={isOpen} close={close} />
        </Suspense>
      )}
    </IsInsideMobileNavigationContext.Provider>
  )
}
