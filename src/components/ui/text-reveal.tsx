"use client"

import { useScroll, useTransform, motion } from "motion/react"
import { useRef } from "react"
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

  return (
    <Component
      ref={ref}
      className={cn("relative", className)}
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
        const y = useTransform(scrollYProgress, [start, end], [20, 0])

        return (
          <motion.span
            key={i}
            style={{ opacity, y }}
            transition={{ duration, delay: i * delayMultiple }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        )
      })}
    </Component>
  )
}
