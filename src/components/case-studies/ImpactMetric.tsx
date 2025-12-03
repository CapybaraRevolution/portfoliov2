"use client"

import { NumberTicker } from '@/components/ui/number-ticker'
import { ShineBorder } from '@/components/ui/shine-border'
import clsx from 'clsx'

export interface ImpactMetricProps {
  label: string
  value: number
  suffix?: string
  description?: string
  className?: string
  highlight?: boolean
}

export function ImpactMetric({ label, value, suffix, description, className, highlight }: ImpactMetricProps) {
  const isHighlighted = Boolean(highlight)

  const content = (
    <div
      className={clsx(
        'rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm transition dark:border-white/10 dark:bg-zinc-900/60',
        isHighlighted && 'border-zinc-900/10 bg-white/90 shadow-lg dark:border-white/15 dark:bg-zinc-900/70',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        {label}
      </p>
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

  return isHighlighted ? <ShineBorder className="rounded-2xl">{content}</ShineBorder> : content
}
