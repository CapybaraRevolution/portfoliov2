"use client"

import { AuroraText } from '@/components/ui/aurora-text'

interface GoalBlockProps {
  goal: string
  goalDetail?: string
  className?: string
}

export function GoalBlock({ goal, goalDetail, className = '' }: GoalBlockProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
        <AuroraText 
          colors={["#10b981", "#14b8a6", "#0ea5e9", "#8b5cf6"]}
          speed={0.5}
        >
          {goal}
        </AuroraText>
      </h2>
      {goalDetail && (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl italic">
          {goalDetail}
        </p>
      )}
    </section>
  )
}
