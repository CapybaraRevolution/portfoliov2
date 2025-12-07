"use client"

import { TextReveal } from '@/components/ui/text-reveal'
import { SparklesText } from '@/components/ui/sparkles-text'

interface QuoteBlockProps {
  children: string
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  // Split text to highlight "clarity" with emerald and sparkles
  const parts = children.split(/(clarity)/i)
  
  return (
    <blockquote 
      className={`my-20 w-full border-l-4 border-emerald-500 dark:border-emerald-400 pl-0 py-0 ${className}`}
    >
      <p className="text-2xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
        {parts.map((part, i) => {
          if (part.toLowerCase() === 'clarity') {
            return (
              <SparklesText
                key={i}
                sparklesCount={6}
                colors={{
                  first: "#10b981",
                  second: "#14b8a6",
                }}
                className="text-emerald-600 dark:text-emerald-400"
              >
                {part}
              </SparklesText>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </p>
    </blockquote>
  )
}
