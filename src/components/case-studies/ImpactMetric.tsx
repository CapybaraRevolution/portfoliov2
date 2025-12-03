"use client"

import { NumberTicker } from '@/components/ui/number-ticker'
import clsx from 'clsx'

export interface ImpactMetricProps {
  label: string
  value: number
  suffix?: string
  description?: string
  className?: string
}

export function ImpactMetric({ label, value, suffix, description, className }: ImpactMetricProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900/60',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-2 text-4xl font-semibold text-zinc-900 dark:text-white">
        <NumberTicker value={value} className="tabular-nums" />
        {suffix ? <span className="text-xl text-zinc-500 dark:text-zinc-400">{suffix}</span> : null}
      </div>
      {description ? (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
      ) : null
      }
    </div>
  )
}
