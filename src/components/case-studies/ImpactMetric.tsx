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
  /** Force highlight state; otherwise inferred by ImpactSection */
  highlight?: boolean
}

export function ImpactMetric({ label, value, suffix, description, className, highlight }: ImpactMetricProps) {
  const isHighlighted = Boolean(highlight)
  const isPlainTextLabel = typeof label === 'string'

  const surfaceClasses = clsx(
    'relative flex h-full flex-col rounded-2xl border bg-white/80 p-6 text-left shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-md transition',
    'border-zinc-200/80 dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]',
    isHighlighted &&
      'border-emerald-200/70 ring-1 ring-emerald-400/40 shadow-[0_20px_60px_rgba(16,185,129,0.16)] dark:border-emerald-300/30 dark:ring-emerald-300/45 dark:shadow-[0_24px_70px_rgba(16,185,129,0.35)]',
    className,
  )

  const labelContent = isHighlighted ? (
    isPlainTextLabel ? (
      <AuroraText
        className="text-xs font-semibold uppercase tracking-wide"
        colors={['#10b981', '#2dd4bf', '#38bdf8']}
        speed={1.2}
      >
        {label}
      </AuroraText>
    ) : (
      <div className="text-xs font-semibold uppercase tracking-wide text-gradient-ai">{label}</div>
    )
  ) : (
    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">{label}</p>
  )

  const content = (
    <div className={surfaceClasses}>
      {labelContent}

      <div
        className={clsx(
          'mt-3 flex flex-wrap items-baseline gap-2 text-4xl font-semibold leading-tight',
          isHighlighted
            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(16,185,129,0.4)]'
            : 'text-zinc-900 dark:text-white',
        )}
      >
        <NumberTicker value={value} className="tabular-nums" />
        {suffix ? (
          <span
            className={clsx(
              'text-xl font-semibold',
              isHighlighted ? 'text-emerald-500/80 dark:text-emerald-300/85' : 'text-zinc-500 dark:text-zinc-400',
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>

      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{description}</p>
      ) : null}
    </div>
  )

  return isHighlighted ? (
    <div className="group relative h-full w-full overflow-hidden">
      <ShineBorder
        className="rounded-2xl opacity-80 group-hover:opacity-100"
        shineColor={['rgba(16, 185, 129, 0.9)', 'rgba(20, 184, 166, 0.9)', 'rgba(56, 189, 248, 0.9)']}
        borderWidth={2}
        duration={10}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.28), transparent 70%), radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.18), transparent 55%)',
        }}
      />

      <div className="relative z-10 h-full w-full">{content}</div>
    </div>
  ) : (
    content
  )
}
