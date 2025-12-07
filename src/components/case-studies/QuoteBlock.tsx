"use client"

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

interface QuoteBlockProps {
  children: string
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  return (
    <blockquote 
      className={`my-12 border-l-4 border-emerald-500 dark:border-emerald-400 pl-6 py-4 ${className}`}
    >
      <TextGenerateEffect 
        words={children}
        className="text-xl md:text-2xl font-medium text-zinc-700 dark:text-zinc-300 italic leading-relaxed"
        duration={0.3}
      />
    </blockquote>
  )
}
