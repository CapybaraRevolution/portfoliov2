'use client'

import { useReducedMotion } from '@/contexts/ReducedMotionContext'

function MotionIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      {/* Play/motion icon - three horizontal lines suggesting movement */}
      <path
        d="M4 6h12M4 10h8M4 14h10"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PauseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      {/* Pause icon - two vertical bars */}
      <path
        d="M7 5v10M13 5v10"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MotionToggle() {
  const { prefersReducedMotion, setReducedMotion, source, mounted } = useReducedMotion()

  const handleClick = () => {
    if (source === 'user') {
      // If user has an override, toggle it or reset to system
      setReducedMotion(!prefersReducedMotion)
    } else {
      // If following system, set explicit user preference opposite to current
      setReducedMotion(!prefersReducedMotion)
    }
  }

  const label = mounted
    ? prefersReducedMotion
      ? 'Enable animations'
      : 'Reduce motion'
    : 'Toggle motion'

  return (
    <button
      type="button"
      className="flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
      aria-label={label}
      title={label}
      onClick={handleClick}
    >
      {prefersReducedMotion ? (
        <PauseIcon className="h-4 w-4 stroke-zinc-500 dark:stroke-zinc-400" />
      ) : (
        <MotionIcon className="h-4 w-4 stroke-zinc-500 dark:stroke-zinc-400" />
      )}
    </button>
  )
}


