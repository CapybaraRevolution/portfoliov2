"use client"

import { type ReactNode } from 'react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShineBorder } from '@/components/ui/shine-border'
import { AuroraText } from '@/components/ui/aurora-text'
import clsx from 'clsx'

export interface ImpactMetricProps {
  label: ReactNode
  value: number
  suffix?: string
  description?: ReactNode
  className?: string
  highlight?: boolean
}

export function ImpactMetric({ label, value, suffix, description, className, highlight }: ImpactMetricProps) {
  const isHighlighted = Boolean(highlight)
  const isPlainTextLabel = typeof label === 'string'

  const content = (
    <div
      className={clsx(
        'rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm transition dark:border-white/10 dark:bg-zinc-900/60',
        isHighlighted && 'border-transparent bg-white/90 shadow-lg dark:border-white/15 dark:bg-zinc-900/70',
        className,
      )}
    >
      {isHighlighted ? (
        isPlainTextLabel ? (
          <AuroraText
            className="text-xs font-semibold uppercase tracking-wide"
            colors={["#10b981", "#2dd4bf", "#38bdf8"]}
            speed={1.2}
          >
            {label}
          </AuroraText>
        ) : (
          <div className="text-xs font-semibold uppercase tracking-wide">{label}</div>
        )
      ) : (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          {label}
        </p>
      )}
      <div
        className={clsx(
          'mt-3 flex items-baseline gap-2 text-4xl font-semibold',
          isHighlighted
            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(16,185,129,0.4)]'
            : 'text-zinc-900 dark:text-white',
        )}
      >
        <NumberTicker value={value} className="tabular-nums" />
        {suffix ? (
          <span
            className={clsx(
              'text-xl',
              isHighlighted ? 'text-emerald-500/80 dark:text-emerald-300/80' : 'text-zinc-500 dark:text-zinc-400',
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
      ) : null}
    </div>
  )

  return isHighlighted ? (
    <div className="group relative h-full w-full">
      {/* Animated shine border */}
      <ShineBorder
        className="rounded-2xl"
        shineColor={["rgba(16, 185, 129, 0.8)", "rgba(20, 184, 166, 0.8)", "rgba(56, 189, 248, 0.8)"]}
        borderWidth={2}
        duration={10}
      />

      {/* Outer glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50 blur-xl transition-opacity duration-300 group-hover:opacity-70"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.4), transparent 70%)',
        }}
      />

      {/* Content with proper z-index */}
      <div className="relative z-10 h-full w-full">{content}</div>
    </div>
  ) : (
    content
  )
}
