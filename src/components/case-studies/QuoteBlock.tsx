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
  
  // Large-scale gradient that moves slowly - feels like looking through text at a background
  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["-50% 0%", "150% 0%"]
  )
  
  return (
    <blockquote 
      ref={ref}
      className={`my-12 border-l-4 border-emerald-500 dark:border-emerald-400 pl-6 py-4 ${className}`}
    >
      <motion.p
        style={{
          backgroundPosition,
          backgroundImage: "linear-gradient(90deg, #6b7280 0%, #10b981 20%, #14b8a6 35%, #06b6d4 50%, #8b5cf6 65%, #ec4899 80%, #6b7280 100%)",
          backgroundSize: "600% 100%",
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
