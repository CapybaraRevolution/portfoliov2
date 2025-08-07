import clsx from 'clsx'

interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
  size?: 'sm' | 'md'
  className?: string
}

export function FilterChip({ 
  label, 
  active, 
  onClick, 
  size = 'md',
  className 
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center rounded-md border font-medium transition-all duration-200 hover:scale-105 active:scale-95',
        // Size variants
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        // State variants - ghost when inactive, filled when active
        active
          ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 hover:border-emerald-600'
          : 'border-zinc-300 bg-transparent text-zinc-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400',
        className
      )}
    >
      {label}
    </button>
  )
}