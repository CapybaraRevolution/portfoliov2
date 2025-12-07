interface QuoteBlockProps {
  children: string
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  return (
    <blockquote 
      className={`my-16 w-full border-l-4 border-emerald-500 dark:border-emerald-400 pl-6 py-4 ${className}`}
    >
      <p className="prose prose-zinc dark:prose-invert max-w-none text-emerald-600 dark:text-emerald-400 italic">
        {children}
      </p>
    </blockquote>
  )
}
