'use client'

import { useEffect } from 'react'
import { Button } from '@/components/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
          Something went wrong!
        </h2>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          We encountered an error while loading this page.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            variant="primary"
          >
            Try again
          </Button>
          <Button
            href="/"
            variant="secondary"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}