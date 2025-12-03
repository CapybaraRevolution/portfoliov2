import { ImpactMetric, type ImpactMetricProps } from '@/components/case-studies/ImpactMetric'
import clsx from 'clsx'

interface ImpactSectionProps {
  title?: string
  metrics: ImpactMetricProps[]
  className?: string
}

export function ImpactSection({ title = 'Impact', metrics, className }: ImpactSectionProps) {
  if (!metrics?.length) return null

  const isHighlightedMetric = (metric: ImpactMetricProps) => {
    if (typeof metric.highlight === 'boolean') return metric.highlight
    if (metric.suffix === '%' || metric.suffix === undefined) return metric.value >= 90
    if (metric.suffix === 'x') return metric.value >= 2
    return false
  }

  return (
    <section
      className={clsx(
        'not-prose mx-auto my-12 max-w-6xl px-6 sm:px-10',
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

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <ImpactMetric key={metric.label} {...metric} highlight={isHighlightedMetric(metric)} />
        ))}
      </div>
    </section>
  )
}
