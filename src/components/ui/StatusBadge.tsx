'use client'

interface StatusBadgeProps {
  status: 'Production' | 'Preview' | 'In Progress' | 'online' | 'offline' | 'Completed' | 'In QA' | 'Fix Needed' | 'Blocked' | 'Draft' | 'In Review' | 'Approved' | 'Deployed' | 'Archived'
  className?: string
}

const statusColors = {
  // Development workflow statuses (new refined style)
  'Draft': 'fill-red-400',
  'In Review': 'fill-yellow-400',
  'Approved': 'fill-green-400',
  'Deployed': 'fill-blue-400',
  'Archived': 'fill-purple-400',
  
  // Legacy statuses (maintaining compatibility)
  'Production': 'fill-green-400',
  'Preview': 'fill-yellow-400', 
  'In Progress': 'fill-blue-400',
  'online': 'fill-green-400',
  'offline': 'fill-red-400',
  'Completed': 'fill-green-400',
  'In QA': 'fill-blue-400',
  'Fix Needed': 'fill-red-400',
  'Blocked': 'fill-red-400'
} as const

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const dotColor = statusColors[status] || statusColors['Draft']
  
  return (
    <span className={`inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-200 ring-1 ring-inset ring-white/10 ${className}`}>
      <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-1.5 ${dotColor}`}>
        <circle r={3} cx={3} cy={3} />
      </svg>
      {status}
    </span>
  )
}