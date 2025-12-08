"use client"

import { useScroll, motion, useMotionValueEvent } from "motion/react"
import { useRef, useState, ReactNode } from "react"
import { SparklesText } from '@/components/ui/sparkles-text'

interface QuoteBlockProps {
  children: ReactNode
  className?: string
}

// Check if children is a plain string (not a React element)
function isPlainString(children: ReactNode): boolean {
  return typeof children === 'string' || typeof children === 'number'
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  const ref = useRef<HTMLQuoteElement>(null)
  
  // If children is already a React element (like TextAnimate), just render it
  if (!isPlainString(children)) {
    return (
      <blockquote 
        ref={ref}
        className={`mt-20 mb-32 w-full border-l-4 border-emerald-500 dark:border-emerald-400 pl-0 py-0 ${className}`}
      >
        {children}
      </blockquote>
    )
  }

  // Otherwise, do the word-by-word animation for plain strings
  const hasAnimatedRef = useRef(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1.5", "start 0.5"],
  })

  const textContent = String(children)
  const words = textContent.split(" ").filter(word => word.length > 0)
  const [revealedWords, setRevealedWords] = useState<Set<number>>(new Set())

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only animate once - if we've already fully animated, don't update
    if (hasAnimatedRef.current) {
      return
    }

    const newRevealed = new Set<number>()
    words.forEach((_, i) => {
      const start = i / words.length
      if (latest >= start) {
        newRevealed.add(i)
      }
    })
    
    // Mark as animated once all words are revealed
    if (newRevealed.size === words.length) {
      hasAnimatedRef.current = true
    }
    
    setRevealedWords(newRevealed)
  })
  
  return (
    <blockquote 
      ref={ref}
      className={`mt-20 mb-32 w-full border-l-4 border-emerald-500 dark:border-emerald-400 pl-0 py-0 ${className}`}
    >
      <p className="text-2xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
        {words.map((word, i) => {
          const wordWithoutPunct = word.toLowerCase().replace(/[.,!?;:]/, '')
          const isClarity = wordWithoutPunct === 'clarity'
          
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: revealedWords.has(i) ? 1 : 0,
                y: revealedWords.has(i) ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="inline-block mr-2"
            >
              {isClarity ? (
                <SparklesText
                  sparklesCount={6}
                  colors={{
                    first: "#10b981",
                    second: "#14b8a6",
                  }}
                  className="text-emerald-600 dark:text-emerald-400"
                >
                  {word}
                </SparklesText>
              ) : (
                <span>{word}</span>
              )}
            </motion.span>
          )
        })}
      </p>
    </blockquote>
  )
}
