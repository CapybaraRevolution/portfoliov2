'use client'

import { cn } from '@/lib/utils'

interface Step {
  id: number
  name: string
}

// Support both API styles: 
// 1. steps array + currentStep (new API)
// 2. currentStep + totalSteps (legacy API from MultiStepContactForm)
interface ContactStepperProps {
  steps?: Step[]
  currentStep: number
  totalSteps?: number
  onStepClick?: (stepId: number) => void
}

export function ContactStepper({ steps, currentStep, totalSteps, onStepClick }: ContactStepperProps) {
  // Generate steps array if not provided (legacy API support)
  const stepList = steps || Array.from({ length: totalSteps || 5 }, (_, i) => ({ 
    id: i + 1, 
    name: `Step ${i + 1}` 
  }))
  
  return (
    <nav aria-label="Progress" className="flex items-center justify-center">
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Step {currentStep} of {stepList.length}
      </p>
      <ol role="list" className="ml-6 flex items-center space-x-3">
        {stepList.map((step) => {
          const isComplete = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isClickable = step.id < currentStep && onStepClick

          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={cn(
                  "block transition-all duration-300 ease-out",
                  isClickable && "cursor-pointer hover:scale-110"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? (
                  <span
                    className="block size-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-sm shadow-emerald-500/30"
                  >
                    <span className="sr-only">{step.name}</span>
                  </span>
                ) : isCurrent ? (
                  <span className="relative flex items-center justify-center">
                    <span 
                      aria-hidden="true" 
                      className="absolute flex size-5 p-px animate-pulse"
                    >
                      <span className="size-full rounded-full bg-emerald-200/60 dark:bg-emerald-800/60" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative block size-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                    />
                    <span className="sr-only">{step.name}</span>
                  </span>
                ) : (
                  <span
                    className="block size-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700"
                  >
                    <span className="sr-only">{step.name}</span>
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
