'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FinTechRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the merged Breeze Mortgage Hub case study
    router.replace('/case-studies/breeze-mortgage-hub')
  }, [router])
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Redirecting...</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This case study has been merged with Breeze Mortgage Hub
        </p>
      </div>
    </div>
  )
}