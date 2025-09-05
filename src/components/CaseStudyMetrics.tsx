import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export interface MetricData {
  name: string
  stat: string
  previousStat?: string
  change?: string
  changeType?: 'increase' | 'decrease'
  // Optional: force positive (green) styling even for decreases (e.g., debt ↓)
  positive?: boolean
  description?: string
}

interface CaseStudyMetricsProps {
  title?: string
  metrics: MetricData[]
  className?: string
}

export function CaseStudyMetrics({ 
  title = "Key Results", 
  metrics, 
  className 
}: CaseStudyMetricsProps) {
  // Helper function to detect exceptional metrics (90%+ improvement)
  const isExceptionalMetric = (change?: string) => {
    if (!change) return false
    const numericValue = parseInt(change.replace(/[^0-9]/g, ''))
    return numericValue >= 90
  }
  // Responsive columns: 1 on small, 2 on md when exactly two metrics, else 3 on md+
  const gridColsClass = metrics.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <div className={className}>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{title}</h3>
      <dl className={clsx(
        "mt-5 grid grid-cols-1 divide-zinc-200 dark:divide-zinc-700 overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 md:divide-x md:divide-y-0",
        gridColsClass
      )}>
        {metrics.map((item) => {
          const isExceptional = isExceptionalMetric(item.change)
          const isPositive = item.positive ?? (item.changeType === 'increase')
          const showUpArrow = isPositive || item.changeType === 'increase'
          const srText = isPositive
            ? 'Improved by'
            : item.changeType === 'increase'
              ? 'Increased by'
              : 'Decreased by'
          return (
          <div key={item.name} className={clsx(
            "px-4 py-5 sm:p-6 relative",
            isExceptional && "bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-indigo-950/20"
          )}>
            <dt className="text-base font-normal text-zinc-700 dark:text-zinc-300">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                {item.stat}
                {item.previousStat && (
                  <span className="ml-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    from {item.previousStat}
                  </span>
                )}
              </div>

              {item.change && item.changeType && (
                <div
                  className={clsx(
                    isExceptional && item.changeType === 'increase'
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg animate-pulse'
                      : isPositive
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                  )}
                >
                  {showUpArrow ? (
                    <ArrowUpIcon aria-hidden="true" className="mr-0.5 -ml-1 size-5 shrink-0 self-center" />
                  ) : (
                    <ArrowDownIcon aria-hidden="true" className="mr-0.5 -ml-1 size-5 shrink-0 self-center" />
                  )}
                  <span className="sr-only"> {srText} </span>
                  {item.change}
                </div>
              )}
            </dd>
          </div>
        )
        })}
      </dl>
    </div>
  )
}
