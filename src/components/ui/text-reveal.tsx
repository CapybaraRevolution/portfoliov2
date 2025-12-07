"use client"

import { useScroll, motion, useMotionValueEvent } from "motion/react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: string
  className?: string
  duration?: number
  delayMultiple?: number
  as?: keyof JSX.IntrinsicElements
}

export function TextReveal({
  children,
  className,
  duration = 0.5,
  delayMultiple = 0.1,
  as: Component = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.25"],
  })

  const words = children.split(" ")
  const [revealedWords, setRevealedWords] = useState<Set<number>>(new Set())

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newRevealed = new Set<number>()
    words.forEach((_, i) => {
      const start = i / words.length
      if (latest >= start) {
        newRevealed.add(i)
      }
    })
    setRevealedWords(newRevealed)
  })

  return (
    <Component
      ref={ref}
      className={cn("relative", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: revealedWords.has(i) ? 1 : 0,
            y: revealedWords.has(i) ? 0 : 20,
          }}
          transition={{ duration, delay: i * delayMultiple }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}
