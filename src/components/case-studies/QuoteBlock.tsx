"use client"

import { ReactNode } from "react"
import { TextAnimate } from "@/components/ui/text-animate"

interface QuoteBlockProps {
  children: ReactNode
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  // Check if children is a string for TextAnimate
  const isString = typeof children === 'string'
  
  return (
    <blockquote
      className={`my-16 w-full ${className}`}
    >
      <div className="text-center w-full">
        {/* Quote text */}
        <div className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed w-full">
          {isString ? (
            <TextAnimate
              by="word"
              animation="blurInUp"
              once={true}
            >
              {children}
            </TextAnimate>
          ) : (
            children
          )}
        </div>
      </div>
    </blockquote>
  )
}
