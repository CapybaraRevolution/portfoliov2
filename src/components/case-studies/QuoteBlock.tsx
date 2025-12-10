"use client"

import { ReactNode } from "react"
import { TextAnimate } from "@/components/ui/text-animate"
import { Highlighter } from "@/components/ui/highlighter"

interface QuoteBlockProps {
  children: ReactNode
  className?: string
  highlight?: boolean
}

export function QuoteBlock({ children, className = '', highlight = false }: QuoteBlockProps) {
  // Check if children is a string for TextAnimate
  const isString = typeof children === 'string'
  
  const content = isString ? (
    <TextAnimate
      by="word"
      animation="blurInUp"
      once={true}
    >
      {children}
    </TextAnimate>
  ) : (
    children
  )
  
  return (
    <blockquote
      className={`my-16 w-full ${className}`}
    >
      <div className="text-center w-full">
        {/* Quote text */}
        <div className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed w-full">
          {highlight ? (
            <Highlighter>
              {content}
            </Highlighter>
          ) : (
            content
          )}
        </div>
      </div>
    </blockquote>
  )
}
