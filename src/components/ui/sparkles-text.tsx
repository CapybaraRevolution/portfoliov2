"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface SparklesTextProps {
  children: string
  className?: string
  sparklesCount?: number
  colors?: {
    first: string
    second: string
  }
}

export function SparklesText({
  children,
  className,
  sparklesCount = 10,
  colors = {
    first: "#A07CFE",
    second: "#FE8FB5",
  },
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Array<{
    id: number
    x: number
    y: number
  }>>([])
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const generateSparkles = () => {
      const newSparkles = []
      for (let i = 0; i < sparklesCount; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        })
      }
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 2000)

    return () => clearInterval(interval)
  }, [sparklesCount])

  return (
    <span
      ref={textRef}
      className={cn("relative inline-block", className)}
    >
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="pointer-events-none absolute z-0"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 0L5.5 3.5L9 4L5.5 4.5L5 8L4.5 4.5L1 4L4.5 3.5L5 0Z"
              fill={`url(#sparkle-gradient-${sparkle.id})`}
            />
            <defs>
              <linearGradient
                id={`sparkle-gradient-${sparkle.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={colors.first} />
                <stop offset="100%" stopColor={colors.second} />
              </linearGradient>
            </defs>
          </svg>
        </motion.span>
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  )
}
