"use client"

import { motion } from 'motion/react'

interface GoalBlockProps {
  goal: string
  goalDetail?: string
  className?: string
}

export function GoalBlock({ goal, goalDetail, className = '' }: GoalBlockProps) {
  return (
    <motion.section 
      className={`mb-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
        {goal}
      </h2>
      {goalDetail && (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl italic">
          {goalDetail}
        </p>
      )}
    </motion.section>
  )
}
