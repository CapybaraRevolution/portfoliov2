"use client"

import { useScroll, useTransform, motion, useMotionValue } from "motion/react"
import { useRef, useMemo } from "react"
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

  const words = useMemo(() => children.split(" "), [children])

  // Create transforms for each word
  const wordTransforms = useMemo(() => {
    return words.map((_, i) => {
      const start = i / words.length
      const end = start + 1 / words.length
      return {
        opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
        y: useTransform(scrollYProgress, [start, end], [20, 0]),
      }
    })
  }, [words.length, scrollYProgress])

  return (
    <Component
      ref={ref}
      className={cn("relative", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ 
            opacity: wordTransforms[i].opacity, 
            y: wordTransforms[i].y 
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
