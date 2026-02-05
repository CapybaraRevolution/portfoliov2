"use client"

import { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface ProseSectionProps {
  children: ReactNode
  className?: string
  /** Animation delay in seconds */
  delay?: number
}

/**
 * Animated prose section wrapper for case study content.
 * Provides consistent scroll-triggered fade-up animation.
 */
export function ProseSection({ children, className, delay = 0 }: ProseSectionProps) {
  return (
    <motion.section
      className={cn('mb-16 text-zinc-700 dark:text-zinc-300', className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  )
}

/**
 * Animated div wrapper for prose content blocks.
 * Use within ProseSection or standalone for animated text content.
 */
interface ProseBlockProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ProseBlock({ children, className, delay = 0 }: ProseBlockProps) {
  return (
    <motion.div
      className={cn('prose prose-zinc dark:prose-invert max-w-none', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
