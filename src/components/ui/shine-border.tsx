"use client"

import clsx from 'clsx'

interface ShineBorderProps {
  children?: React.ReactNode
  className?: string
  durationMs?: number
}

/**
 * Subtle rotating stroke inspired by Magic UI.
 * Only renders a border sheen; interior uses the child's own background.
 */
export function ShineBorder({ children, className, durationMs = 4000, shineColor }: ShineBorderProps) {
  const stops = shineColor ?? ['#34d399', '#22d3ee', '#60a5fa', '#34d399']

  return (
    <div className={clsx('relative overflow-hidden rounded-2xl', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-[1px] [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] [--shine-duration:4000ms] animate-[shine-spin_var(--shine-duration)_linear_infinite]"
        style={{ background: `conic-gradient(${stops.join(',')})` }}
      />
      <div className="relative rounded-[inherit]">{children}</div>
      <style>
        {`@keyframes shine-spin { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
          }`}
      </style>
    </div>
  )
}
