"use client"

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface AnimatedSafariProps {
  children: ReactNode
  className?: string
}

export function AnimatedSafari({ children, className = "" }: AnimatedSafariProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}










