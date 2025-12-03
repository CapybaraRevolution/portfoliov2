import { ImpactMetric, type ImpactMetricProps } from '@/components/case-studies/ImpactMetric'
import clsx from 'clsx'

interface ImpactSectionProps {
  title?: string
  metrics: ImpactMetricProps[]
  className?: string
}

export function ImpactSection({ title = 'Impact', metrics, className }: ImpactSectionProps) {
  if (!metrics?.length) return null

  return (
    <section
      className={clsx(
        'not-prose mx-auto my-12 max-w-6xl rounded-3xl border border-zinc-900/5 bg-white/80 px-6 py-10 shadow-xl ring-1 ring-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/5 sm:px-10 sm:py-12',
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Results
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <ImpactMetric key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  )
}
