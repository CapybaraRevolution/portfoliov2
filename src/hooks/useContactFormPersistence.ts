'use client'

import { useEffect, useRef, useCallback } from 'react'

const STORAGE_KEY = 'contact-form-state'
const STORAGE_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

interface ContactFormState {
  hasStarted: boolean
  currentStep: number
  formData: {
    name: string
    email: string
    company: string
    website: string
    project: string
    success: string
    engagement: string
  }
  touched: {
    name?: boolean
    email?: boolean
    company?: boolean
    website?: boolean
    project?: boolean
    success?: boolean
  }
  validationAttempted: {
    project?: boolean
  }
  emailFocused: boolean
  showFAQs: boolean
  timestamp: number
}

// Helper function to get initial state synchronously (for useState lazy initialization)
export function getInitialContactFormState(): Omit<ContactFormState, 'timestamp'> | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed: ContactFormState = JSON.parse(stored)
      const now = Date.now()
      
      // Check if data is expired
      if (now - parsed.timestamp > STORAGE_EXPIRY_MS) {
        localStorage.removeItem(STORAGE_KEY)
        return null
      }
      
      return {
        hasStarted: parsed.hasStarted,
        currentStep: parsed.currentStep,
        formData: parsed.formData,
        touched: parsed.touched,
        validationAttempted: parsed.validationAttempted,
        emailFocused: parsed.emailFocused,
        showFAQs: parsed.showFAQs,
      }
    }
  } catch (error) {
    console.error('Failed to read contact form state:', error)
    localStorage.removeItem(STORAGE_KEY)
  }
  
  return null
}

interface UseContactFormPersistenceOptions {
  hasStarted: boolean
  currentStep: number
  formData: ContactFormState['formData']
  touched: ContactFormState['touched']
  validationAttempted: ContactFormState['validationAttempted']
  emailFocused: boolean
  showFAQs: boolean
  onStateRestore?: (state: Omit<ContactFormState, 'timestamp'>) => void
  onClear?: () => void
  skipInitialRestore?: boolean // Skip restoration if state was already initialized
}

export function useContactFormPersistence({
  hasStarted,
  currentStep,
  formData,
  touched,
  validationAttempted,
  emailFocused,
  showFAQs,
  onStateRestore,
  onClear,
  skipInitialRestore = false,
}: UseContactFormPersistenceOptions) {
  const isInitialMount = useRef(true)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Restore state on mount (only if not skipped - i.e., state wasn't already initialized)
  useEffect(() => {
    if (isInitialMount.current && !skipInitialRestore && onStateRestore) {
      isInitialMount.current = false
      
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed: ContactFormState = JSON.parse(stored)
          
          // Check if data is expired
          const now = Date.now()
          if (now - parsed.timestamp > STORAGE_EXPIRY_MS) {
            localStorage.removeItem(STORAGE_KEY)
            return
          }
          
          // Restore state (fallback if lazy initialization didn't work)
          onStateRestore({
            hasStarted: parsed.hasStarted,
            currentStep: parsed.currentStep,
            formData: parsed.formData,
            touched: parsed.touched,
            validationAttempted: parsed.validationAttempted,
            emailFocused: parsed.emailFocused,
            showFAQs: parsed.showFAQs,
          })
        }
      } catch (error) {
        console.error('Failed to restore contact form state:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    } else if (isInitialMount.current) {
      isInitialMount.current = false
    }
  }, [skipInitialRestore, onStateRestore]) // Only run on mount

  // Save state when it changes (debounced)
  const saveState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const state: ContactFormState = {
          hasStarted,
          currentStep,
          formData,
          touched,
          validationAttempted,
          emailFocused,
          showFAQs,
          timestamp: Date.now(),
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch (error) {
        console.error('Failed to save contact form state:', error)
      }
    }, 500) // Debounce by 500ms
  }, [hasStarted, currentStep, formData, touched, validationAttempted, emailFocused, showFAQs])

  // Save state whenever it changes
  useEffect(() => {
    if (!isInitialMount.current) {
      saveState()
    }
  }, [hasStarted, currentStep, formData, touched, validationAttempted, emailFocused, showFAQs, saveState])

  // Clear state function
  const clearState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    localStorage.removeItem(STORAGE_KEY)
    onClear?.()
  }, [onClear])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return { clearState }
}
