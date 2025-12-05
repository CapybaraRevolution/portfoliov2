'use client'

import { createContext, useContext, useState, ReactNode, cloneElement, isValidElement } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/Button'
import { ContactContent } from '@/app/contact/page'
import { trackEvent } from '@/components/GoogleAnalytics'

type ContactDrawerContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const ContactDrawerContext = createContext<ContactDrawerContextType | undefined>(undefined)

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <ContactDrawerContext.Provider value={{ open, setOpen }}>
      {children}
      <ContactDrawerContent />
    </ContactDrawerContext.Provider>
  )
}

function ContactDrawerContent() {
  const context = useContext(ContactDrawerContext)
  if (!context) return null

  const { open, setOpen } = context

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="overflow-visible border-none bg-white dark:bg-zinc-900 px-0">
        <DrawerHeader className="sr-only absolute inset-0 pointer-events-none p-0 m-0 gap-0 h-0 overflow-hidden">
          <DrawerTitle>Work With Me</DrawerTitle>
          <DrawerDescription>Let&apos;s start a project</DrawerDescription>
        </DrawerHeader>

        {/* Floating drag handle above the drawer - not clipped by border radius */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
          <div className="group flex flex-col items-center gap-2">
            {/* Interactive drag handle with bounce and glow */}
            <div className="relative h-1.5 w-24 rounded-full bg-zinc-200 dark:bg-zinc-500 cursor-grab active:cursor-grabbing transition-all duration-300 hover:scale-110 hover:bg-emerald-300/40 dark:hover:bg-emerald-500/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_0_16px_rgba(16,185,129,0.8)] animate-[bounce-subtle_3s_ease-in-out_infinite] pointer-events-auto shadow-lg">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Subtle hint text */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Drag down to close
            </p>
          </div>
        </div>

        {/* Close button - Desktop: top-right, Mobile: bottom sticky */}
        {/* Desktop: Top-right */}
        <div className="hidden md:block absolute top-4 right-4 z-50 pointer-events-auto">
          <DrawerClose asChild>
            <Button 
              variant="secondary" 
              className="text-sm shadow-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900"
            >
              Close
            </Button>
          </DrawerClose>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 relative pt-0 border-t-2 border-zinc-300 dark:border-zinc-700">
          {/* Bottom fade gradient for scroll context - desktop only */}
          <div className="hidden md:block pointer-events-none sticky bottom-0 left-0 right-0 h-0 z-10 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 dark:to-transparent" />
          
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 min-h-full pb-6 md:pb-6 pb-24">
            <ContactContent />
          </div>
        </div>

        {/* Mobile: Bottom sticky Close button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-auto p-4 bg-gradient-to-t from-white via-white/95 to-white/80 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-900/80 backdrop-blur-sm border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="max-w-4xl mx-auto">
            <DrawerClose asChild>
              <Button 
                variant="secondary" 
                className="w-full text-sm shadow-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900"
              >
                Close
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext)
  if (!context) {
    throw new Error('useContactDrawer must be used within ContactDrawerProvider')
  }
  return context
}

type ContactDrawerProps = {
  children: React.ReactNode
}

export function ContactDrawer({ children }: ContactDrawerProps) {
  const context = useContext(ContactDrawerContext)
  
  if (!context) {
    // Fallback if provider is not available (shouldn't happen, but for safety)
    return <>{children}</>
  }

  const { setOpen } = context

  const handleClick = (e: React.MouseEvent) => {
    setOpen(true)
    trackEvent('contact_drawer_opened')
  }

  // If children is a valid React element, clone it and merge onClick handlers
  if (isValidElement(children)) {
    const existingOnClick = (children.props as any)?.onClick
    return cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        // Call existing onClick if present
        if (existingOnClick) {
          existingOnClick(e)
        }
        // Then open the drawer
        handleClick(e)
      },
    } as any)
  }

  // Fallback for non-element children
  return (
    <div onClick={handleClick} className="inline-block cursor-pointer">
      {children}
    </div>
  )
}
