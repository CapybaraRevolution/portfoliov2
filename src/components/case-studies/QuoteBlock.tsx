"use client"

import { useScroll, useTransform, motion } from "motion/react"
import { useRef } from "react"

interface QuoteBlockProps {
  children: string
  className?: string
}

export function QuoteBlock({ children, className = '' }: QuoteBlockProps) {
  const ref = useRef<HTMLQuoteElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll progress to background position (sweeps from left to right)
  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["-200% 0%", "200% 0%"]
  )
  
  return (
    <blockquote 
      ref={ref}
      className={`my-12 border-l-4 border-emerald-500 dark:border-emerald-400 pl-6 py-4 ${className}`}
    >
      <motion.p
        style={{
          backgroundPosition,
          backgroundImage: "linear-gradient(90deg, #10b981, #14b8a6, #06b6d4, #8b5cf6, #ec4899, #10b981)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-xl md:text-2xl font-medium italic leading-relaxed"
      >
        {children}
      </motion.p>
    </blockquote>
  )
}
