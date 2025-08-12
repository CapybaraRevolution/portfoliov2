import clsx from 'clsx'

// Category color system - single source of truth
export const CATEGORY_COLORS = {
  PM: 'bg-sky-100 text-sky-800 ring-1 ring-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30',
  UX: 'bg-violet-100 text-violet-800 ring-1 ring-violet-500/30 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/30',
  BA: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
  Strategy: 'bg-amber-100 text-amber-800 ring-1 ring-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30',
  AI: 'bg-gradient-to-r from-pink-100 via-amber-100 to-cyan-100 text-cyan-800 ring-1 ring-cyan-500/30 dark:from-pink-500/20 dark:via-amber-500/20 dark:to-cyan-500/20 dark:text-cyan-200 dark:ring-cyan-400/30',
  DS: 'bg-purple-100 text-purple-800 ring-1 ring-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300 dark:ring-purple-500/30'
} as const

export type CategoryType = keyof typeof CATEGORY_COLORS

interface CategoryBadgeProps {
  category: CategoryType
  className?: string
  size?: 'sm' | 'md'
}

export function CategoryBadge({ 
  category, 
  className,
  size = 'md'
}: CategoryBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md font-medium transition-all duration-200',
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        CATEGORY_COLORS[category],
        className
      )}
    >
      {category}
    </span>
  )
}