import { ImpactMetric, type ImpactMetricProps } from '@/components/case-studies/ImpactMetric'
import clsx from 'clsx'

interface ImpactSectionProps {
  title?: string
  metrics: ImpactMetricProps[]
  className?: string
  /** If true, removes default padding and max-width (for use inside containers with their own padding) */
  contained?: boolean
}

export function ImpactSection({ title = 'Impact', metrics, className, contained = false }: ImpactSectionProps) {
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
        'not-prose my-12',
        contained ? 'mx-0 max-w-none px-0' : 'mx-auto max-w-6xl px-6 sm:px-10',
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {metrics.map((metric) => {
          const metricKey =
            typeof metric.label === 'string'
              ? metric.label
              : `${metric.value}-${metric.suffix ?? 'no-suffix'}-${metric.description ?? 'metric'}`

          return <ImpactMetric key={metricKey} {...metric} highlight={isHighlightedMetric(metric)} />
        })}
      </div>
    </section>
  )
}
