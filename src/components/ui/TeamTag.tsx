'use client'

interface TeamTagProps {
  team: 'Engineering' | 'Product Team' | 'Design' | 'QA' | 'Data' | 'Research'
  className?: string
}

const teamColors = {
  'Engineering': 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-blue-600/20 dark:ring-blue-400/20',
  'Product Team': 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 ring-purple-600/20 dark:ring-purple-400/20',
  'Design': 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 ring-amber-600/20 dark:ring-amber-400/20',
  'QA': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 ring-orange-600/20 dark:ring-orange-400/20',
  'Data': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 ring-emerald-600/20 dark:ring-emerald-400/20',
  'Research': 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 ring-pink-600/20 dark:ring-pink-400/20'
} as const

export function TeamTag({ team, className = '' }: TeamTagProps) {
  const colorClasses = teamColors[team] || teamColors['Engineering']
  
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClasses} ${className}`}>
      {team}
    </span>
  )
}