"use client"

import { MagicCard } from "@/components/ui/magic-card"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"
import { motion } from "motion/react"

interface LearningCardProps {
  title: string
  children: React.ReactNode
  icon?: keyof typeof LucideIcons
  className?: string
  /** Index for stagger animation (0, 1, 2, etc.) */
  index?: number
}

export function LearningCard({ title, children, icon, className, index = 0 }: LearningCardProps) {
  const Icon = icon ? (LucideIcons[icon] as React.ComponentType<{ className?: string }>) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <MagicCard
        className={cn(
          "rounded-2xl border border-zinc-200 dark:border-zinc-800 h-full",
          className
        )}
        gradientSize={180}
        gradientColor="#52525b"
        gradientOpacity={0.15}
        gradientFrom="#a1a1aa"
        gradientTo="#71717a"
      >
        <div className="p-6">
          {Icon && (
            <Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300 mb-4" />
          )}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            {title}
          </h3>
          <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {children}
          </div>
        </div>
      </MagicCard>
    </motion.div>
  )
}

