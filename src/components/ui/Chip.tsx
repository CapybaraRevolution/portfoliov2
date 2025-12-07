'use client'

import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

import { CATEGORY_COLORS } from './CategoryBadge'

interface ChipProps {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  size?: 'sm' | 'md'
  category?: keyof typeof CATEGORY_COLORS
  icon?: React.ReactNode
  as?: 'button' | 'a' | 'span'
  onClick?: () => void
  href?: string
  selected?: boolean
  className?: string
  dropdown?: boolean
  dropdownItems?: Array<{
    label: string
    description?: string
    onClick: () => void
  }>
}

export function Chip({
  children,
  variant = 'outline',
  size = 'md',
  category,
  icon,
  as = 'span',
  onClick,
  href,
  selected = false,
  className,
  dropdown = false,
  dropdownItems = []
}: ChipProps) {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  const baseClasses = clsx(
    'inline-flex items-center gap-x-1 rounded-md font-medium transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
    // Size variants
    size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
    className
  )

  const variantClasses = {
    filled: clsx(
      'border-0',
      category 
        ? CATEGORY_COLORS[category]
        : selected
        ? 'bg-emerald-600 text-white ring-1 ring-emerald-600'
        : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300'
    ),
    outline: clsx(
      'border border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-600 dark:text-zinc-300',
      selected 
        ? 'border-emerald-500 text-emerald-700 ring-1 ring-emerald-300/25 bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:bg-emerald-900/20'
        : 'hover:border-emerald-300 hover:text-emerald-700 hover:ring-1 hover:ring-emerald-300/25 hover:shadow-sm hover:shadow-emerald-500/10 dark:hover:border-emerald-500 dark:hover:text-emerald-400 dark:hover:ring-emerald-500/25'
    )
  }

  const allClasses = clsx(baseClasses, variantClasses[variant])

  const content = (
    <>
      {icon && <div className="flex-shrink-0">{icon}</div>}
      {children}
      {dropdown && <ChevronDownIcon className="h-3 w-3" />}
    </>
  )

  if (dropdown && dropdownItems.length > 0) {
    return (
      <Menu as="div" className="relative inline-block group">
        {/* Hover glow effect */}
        <div className="absolute -inset-1 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 blur-sm" />
        
        <MenuButton 
          className={clsx(allClasses, 'relative z-10')}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          {content}
        </MenuButton>

        <MenuItems
          anchor="bottom start"
          transition
          className="mt-1 w-64 rounded-md py-1 shadow-xl shadow-black/10 dark:shadow-black/20 ring-1 ring-black/10 dark:ring-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          style={{
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            opacity: '1',
            zIndex: 999999,
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none'
          }}
        >
          {dropdownItems.map((item, index) => (
            <MenuItem key={index}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  item.onClick()
                }}
                className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 data-focus:bg-emerald-50 dark:data-focus:bg-emerald-900/20 data-focus:text-emerald-700 dark:data-focus:text-emerald-300 data-focus:outline-hidden"
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {item.description}
                  </div>
                )}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    )
  }

  if (as === 'button') {
    return (
      <button onClick={onClick} className={allClasses}>
        {content}
      </button>
    )
  }

  if (as === 'a' && href) {
    return (
      <a href={href} className={allClasses}>
        {content}
      </a>
    )
  }

  return (
    <span className={allClasses}>
      {content}
    </span>
  )
}