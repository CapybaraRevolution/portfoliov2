'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'reduced-motion-preference'

type MotionSource = 'system' | 'user'

interface ReducedMotionContextValue {
  /** Whether reduced motion is currently active */
  prefersReducedMotion: boolean
  /** Toggle or set reduced motion preference (persists to localStorage) */
  setReducedMotion: (value: boolean | 'system') => void
  /** Whether the preference comes from system or user override */
  source: MotionSource
  /** Whether the component has mounted (for SSR safety) */
  mounted: boolean
}

const ReducedMotionContext = createContext<ReducedMotionContextValue | null>(null)

function getSystemPreference(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getStoredPreference(): boolean | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'true') return true
  if (stored === 'false') return false
  return null
}

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [systemPreference, setSystemPreference] = useState(false)
  const [userOverride, setUserOverride] = useState<boolean | null>(null)

  // Initialize on mount
  useEffect(() => {
    setSystemPreference(getSystemPreference())
    setUserOverride(getStoredPreference())
    setMounted(true)
  }, [])

  // Listen for OS preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Sync data attribute to <html> for CSS fallback
  useEffect(() => {
    if (!mounted) return
    const prefersReduced = userOverride ?? systemPreference
    document.documentElement.setAttribute(
      'data-reduced-motion',
      prefersReduced ? 'true' : 'false'
    )
  }, [mounted, userOverride, systemPreference])

  const setReducedMotion = useCallback((value: boolean | 'system') => {
    if (value === 'system') {
      localStorage.removeItem(STORAGE_KEY)
      setUserOverride(null)
    } else {
      localStorage.setItem(STORAGE_KEY, String(value))
      setUserOverride(value)
    }
  }, [])

  const prefersReducedMotion = userOverride ?? systemPreference
  const source: MotionSource = userOverride !== null ? 'user' : 'system'

  return (
    <ReducedMotionContext.Provider
      value={{
        prefersReducedMotion,
        setReducedMotion,
        source,
        mounted,
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  )
}

export function useReducedMotion(): ReducedMotionContextValue {
  const context = useContext(ReducedMotionContext)
  if (!context) {
    throw new Error('useReducedMotion must be used within a ReducedMotionProvider')
  }
  return context
}

/**
 * Lightweight hook that just returns the boolean preference.
 * Safe to use in components that only need to check the value.
 */
export function usePrefersReducedMotion(): boolean {
  const context = useContext(ReducedMotionContext)
  // Fallback to system preference if no provider (graceful degradation)
  if (!context) {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return context.prefersReducedMotion
}



