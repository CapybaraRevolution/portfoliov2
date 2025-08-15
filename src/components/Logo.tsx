'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import logoLight from '@/images/KyleMcGraw_Logo_Light.svg'
import logoDark from '@/images/KyleMcGraw_Logo_Dark.svg'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a placeholder during SSR and initial load
  if (!mounted) {
    return (
      <div 
        className={`${className || ''} animate-pulse bg-zinc-300 dark:bg-zinc-600 rounded`}
        style={{ width: '152px', height: '18.5px' }} // Half the logo dimensions for h-10 scaling
      />
    )
  }

  const isDark = resolvedTheme === 'dark'
  // Dark mode shows light logo, light mode shows dark logo
  const logoSrc = isDark ? logoLight : logoDark
  
  return (
    <Image
      src={logoSrc}
      alt="Kyle McGraw - Product Manager"
      width={304}
      height={37}
      className={className || ''}
      style={{ width: 'auto', height: '100%' }}
      priority
    />
  )
}
