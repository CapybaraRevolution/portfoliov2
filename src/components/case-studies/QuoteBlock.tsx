interface QuoteBlockProps {
  children: string
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  return (
    <blockquote 
      className={`my-16 border-l-4 border-emerald-500 dark:border-emerald-400 pl-6 py-4 ${className}`}
    >
      <p className="text-2xl md:text-3xl font-medium text-emerald-600 dark:text-emerald-400 italic leading-relaxed">
        {children}
      </p>
    </blockquote>
  )
}
