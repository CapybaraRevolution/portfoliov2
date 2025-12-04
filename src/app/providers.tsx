'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect } from 'react'
import { ContactDrawerProvider } from '@/components/ContactDrawer'

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

function ChunkErrorHandler() {
  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      const m = String(e?.message || '')
      if (m.includes('Loading chunk') || m.includes('ChunkLoadError')) {
        if ('caches' in window) {
          caches
            .keys()
            .then(keys => Promise.all(keys.map(k => caches.delete(k))))
            .finally(() => location.reload())
        } else {
          location.reload()
        }
      }
    }
    window.addEventListener('error', handler)
    return () => window.removeEventListener('error', handler)
  }, [])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      <ChunkErrorHandler />
      <ContactDrawerProvider>
      {children}
      </ContactDrawerProvider>
    </ThemeProvider>
  )
}
