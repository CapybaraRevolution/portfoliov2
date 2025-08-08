'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface NavigationChipProps {
  skill: string
  size?: 'sm' | 'md'
  className?: string
}

export function NavigationChip({ 
  skill, 
  size = 'md',
  className 
}: NavigationChipProps) {
  const router = useRouter()

  const handleViewProjects = () => {
    router.push(`/portfolio?skills=${encodeURIComponent(skill)}`)
  }

  const handleViewProcess = () => {
    // Future page - for now just scroll to top of current page or placeholder
    router.push(`/process#${skill.toLowerCase().replace(/\s+/g, '-')}`)
  }

  return (
    <Menu as="div" className="relative inline-block group">
      {/* Hover glow effect */}
      <div className="absolute -inset-1 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 blur-sm" />
      
      <MenuButton
        className={clsx(
          'relative z-10 inline-flex items-center gap-x-1 rounded-md border border-zinc-300 bg-transparent text-zinc-700 font-medium transition-all duration-200 hover:border-emerald-300 hover:text-emerald-700 hover:ring-1 hover:ring-emerald-300/25 hover:shadow-sm hover:shadow-emerald-500/10 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400 dark:hover:ring-emerald-500/25 dark:hover:shadow-emerald-500/10',
          // Size variants
          size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
          className
        )}
      >
        {skill}
        <ChevronDownIcon className="h-3 w-3" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute left-0 z-20 mt-1 w-64 origin-top-left rounded-md bg-white dark:bg-zinc-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <button
            onClick={handleViewProjects}
            className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 data-focus:bg-emerald-50 dark:data-focus:bg-emerald-900/20 data-focus:text-emerald-700 dark:data-focus:text-emerald-300 data-focus:outline-hidden"
          >
            <div className="font-medium">View projects with {skill}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              See case studies featuring this skill
            </div>
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={handleViewProcess}
            className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 data-focus:bg-emerald-50 dark:data-focus:bg-emerald-900/20 data-focus:text-emerald-700 dark:data-focus:text-emerald-300 data-focus:outline-hidden"
          >
            <div className="font-medium">How {skill} fits into my process</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Learn about my approach and methodology
            </div>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}