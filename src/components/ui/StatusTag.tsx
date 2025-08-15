'use client'

interface StatusTagProps {
  status: 'Production' | 'Preview' | 'In Progress'
  className?: string
}

const statusColors = {
  'Production': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 ring-emerald-600/20 dark:ring-emerald-400/20',
  'Preview': 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 ring-amber-600/20 dark:ring-amber-400/20',
  'In Progress': 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 ring-zinc-600/20 dark:ring-zinc-400/20'
} as const

export function StatusTag({ status, className = '' }: StatusTagProps) {
  const colorClasses = statusColors[status] || statusColors['In Progress']
  
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClasses} ${className}`}>
      {status}
    </span>
  )
}