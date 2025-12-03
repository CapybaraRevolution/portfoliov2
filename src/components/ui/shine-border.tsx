"use client"

import clsx from 'clsx'

interface ShineBorderProps {
  children?: React.ReactNode
  className?: string
  durationMs?: number
}

/**
 * Simple shine border wrapper inspired by Magic UI.
 * Renders a rotating conic-gradient stroke around its children.
 */
export function ShineBorder({ children, className, durationMs = 4000 }: ShineBorderProps) {
  return (
    <div
      className={clsx('relative overflow-hidden rounded-2xl p-[1px]', className)}
      style={{ ['--shine-duration' as string]: `${durationMs}ms` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[conic-gradient(from_90deg,rgba(16,185,129,0.4),rgba(59,130,246,0.35),rgba(14,165,233,0.3),rgba(16,185,129,0.4))] animate-[shine-spin_var(--shine-duration)_linear_infinite]"
      />
      <div className="relative rounded-[inherit] bg-white/80 dark:bg-zinc-900/70">
        {children}
      </div>
      <style>
        {`@keyframes shine-spin { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
          }`}
      </style>
    </div>
  )
}
