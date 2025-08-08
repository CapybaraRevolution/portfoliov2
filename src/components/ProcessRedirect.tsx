'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ProcessRedirect() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#my-process') {
      router.push('/process')
    }
  }, [router])

  return null
}