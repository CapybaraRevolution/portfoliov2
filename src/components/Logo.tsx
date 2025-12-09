'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import logoLight from '@/images/logos/KyleMcGraw_Icon_Light.png'
import logoDark from '@/images/logos/KyleMcGraw_Icon_Dark.png'

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
        className={`animate-pulse bg-zinc-300 dark:bg-zinc-600 rounded ${className || 'h-8'}`}
        style={{ aspectRatio: '140/32' }}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'
  // Dark mode shows light logo (white text), light mode shows dark logo (black text)
  const logoSrc = isDark ? logoLight : logoDark
  
  return (
    <Image
      src={logoSrc}
      alt="Kyle McGraw"
      height={40}
      width={175}
      className={`w-auto ${className || 'h-8'}`}
      priority
    />
  )
}
