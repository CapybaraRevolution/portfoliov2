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
        'bg-gradient-to-r from-pink-100 via-amber-100 to-cyan-100 dark:from-pink-500/20 dark:via-amber-500/20 dark:to-cyan-500/20',
        'text-cyan-800 dark:text-cyan-200 ring-1 ring-cyan-500/30 dark:ring-cyan-400/30',
        'relative overflow-hidden',
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        className
      )}
    >
      {/* Animated rainbow shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse" />
      
      <span className="relative z-10 flex items-center gap-1">
        <span className="text-amber-600 dark:text-amber-300">✨</span>
        {children}
      </span>
    </span>
  )
}