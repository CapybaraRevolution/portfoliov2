"use client"

import { TextReveal } from '@/components/ui/text-reveal'

interface QuoteBlockProps {
  children: string
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  return (
    <blockquote 
      className={`my-16 w-full border-l-4 border-emerald-500 dark:border-emerald-400 pl-6 py-4 ${className}`}
    >
      <TextReveal
        as="p"
        className="text-2xl md:text-3xl font-medium text-emerald-600 dark:text-emerald-400 italic leading-relaxed"
        duration={0.3}
        delayMultiple={0.05}
      >
        {children}
      </TextReveal>
    </blockquote>
  )
}
