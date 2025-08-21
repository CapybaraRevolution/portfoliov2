import clsx from 'clsx'

interface AIBadgeProps {
  className?: string
  size?: 'sm' | 'md'
  children?: React.ReactNode
}

export function AIBadge({ 
  className,
  size = 'md',
  children = 'AI-Accelerated'
}: AIBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md font-medium transition-all duration-200',
        'bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 dark:from-violet-500/10 dark:via-blue-500/10 dark:to-cyan-500/10',
        'text-slate-700 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-700',
        'relative overflow-hidden',
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        className
      )}
    >
      {/* Subtle rainbow shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-pulse" 
           style={{ animationDuration: '3s' }} />
      
      <span className="relative z-10 flex items-center gap-1">
        <span className="text-blue-500 dark:text-blue-400">✨</span>
        {children}
      </span>
    </span>
  )
}