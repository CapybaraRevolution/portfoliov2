'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import logoLight from '@/images/KyleMcGraw_Logo_Light.svg'
import logoDark from '@/images/KyleMcGraw_Logo_Dark.svg'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a placeholder during SSR and initial load that matches SVG interface
  if (!mounted) {
    return (
      <svg 
        {...props}
        viewBox="0 0 304 37" 
        aria-hidden="true"
        className={`${props.className || ''} animate-pulse`}
      >
        <rect width="304" height="37" fill="currentColor" opacity="0.3" rx="6" />
      </svg>
    )
  }

  const isDark = resolvedTheme === 'dark'
  // Dark mode shows light logo, light mode shows dark logo
  const logoSrc = isDark ? logoLight : logoDark
  
  return (
    <span style={{ display: 'inline-block' }}>
      <Image
        src={logoSrc}
        alt="Kyle McGraw - Product Owner"
        width={304}
        height={37}
        className={props.className || ''}
        style={{ width: 'auto', height: '100%' }}
        priority
      />
    </span>
  )
}
