import { ImpactMetric, type ImpactMetricProps } from '@/components/case-studies/ImpactMetric'
import clsx from 'clsx'

interface ImpactSectionProps {
  title?: string
  metrics: ImpactMetricProps[]
  className?: string
  /** If true, removes default padding and max-width (for use inside containers with their own padding) */
  contained?: boolean
  /** Optional legend/footnote text to display below the metrics (e.g., "* Internal directional indicators...") */
  legend?: string
}

export function ImpactSection({ title = 'Impact', metrics, className, contained = false, legend }: ImpactSectionProps) {
  if (!metrics?.length) return null

  const isHighlightedMetric = (metric: ImpactMetricProps) => {
    if (typeof metric.highlight === 'boolean') return metric.highlight
    if (metric.suffix === '%' || metric.suffix === undefined) return metric.value >= 90
    if (metric.suffix === 'x') return metric.value >= 2
    return false
  }

  // Determine if legend should be shown
  const hasDirectionalIndicators = legend || metrics.some((metric) => {
    // Check if any metric has directional flag
    if (metric.directional) return true
    
    // Check if any metric label or description contains an asterisk
    const labelStr = typeof metric.label === 'string' ? metric.label : String(metric.label)
    const descStr = typeof metric.description === 'string' ? metric.description : String(metric.description || '')
    const suffixStr = metric.suffix || ''
    
    return labelStr.includes('*') || descStr.includes('*') || suffixStr.includes('*')
  })

  const legendText = legend || '* Internal directional indicators; details available if helpful.'

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

      <div className="mt-6 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] [grid-auto-rows:1fr]">
        {metrics.map((metric) => {
          const metricKey =
            typeof metric.label === 'string'
              ? metric.label
              : `${metric.value}-${metric.suffix ?? 'no-suffix'}-${metric.description ?? 'metric'}`

          return <ImpactMetric key={metricKey} {...metric} highlight={isHighlightedMetric(metric)} />
        })}
      </div>

      {hasDirectionalIndicators && (
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 text-center">
          {legendText}
        </p>
      )}
    </section>
  )
}
