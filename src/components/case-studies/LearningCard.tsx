"use client"

import { MagicCard } from "@/components/ui/magic-card"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

interface LearningCardProps {
  title: string
  children: React.ReactNode
  icon?: keyof typeof LucideIcons
  className?: string
}

export function LearningCard({ title, children, icon, className }: LearningCardProps) {
  const Icon = icon ? (LucideIcons[icon] as React.ComponentType<{ className?: string }>) : null

  return (
    <MagicCard
      className={cn(
        "rounded-2xl border border-zinc-200 dark:border-zinc-800",
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
  )
}
