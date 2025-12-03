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
export function ShineBorder({ children, className, durationMs = 4000 }: ShineBorderProps) {
  return (
    <div
      className={clsx('relative overflow-hidden rounded-2xl p-[2px]', className)}
      style={{ ['--shine-duration' as string]: `${durationMs}ms` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] animate-[shine-spin_var(--shine-duration)_linear_infinite]"
        style={{
          background:
            'conic-gradient(from 90deg, rgba(16,185,129,0.45), rgba(59,130,246,0.35), rgba(14,165,233,0.3), rgba(16,185,129,0.45))',
          mask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
          WebkitMask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
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
