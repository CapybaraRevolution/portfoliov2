'use client'

import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  searchSlot?: ReactNode
}

export function AppShell({ children, searchSlot }: AppShellProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Planning & Architecture
              </h1>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Strategic foundation work that turns ideas into implementable plans. We map user journeys, prioritize features, and align teams around a shared roadmap.
              </p>
            </div>
            {searchSlot && (
              <div className="hidden md:block">
                {searchSlot}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}