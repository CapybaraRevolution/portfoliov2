"use client"

import React from "react"
import { Users, Lightbulb, Network, FileText, ClipboardList, Database, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessStepProps {
  icon: React.ReactNode
  label: string
  colorClass: string
  iconColorClass: string
}

function ProcessStep({ icon, label, colorClass, iconColorClass }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-[80px] sm:w-[100px]">
      <div
        className={cn(
          "flex size-10 sm:size-12 items-center justify-center rounded-lg",
          colorClass
        )}
      >
        <div className={iconColorClass}>
          {icon}
        </div>
      </div>
      <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 text-center">
        {label}
      </div>
    </div>
  )
}

function ProcessArrow() {
  return (
    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400 dark:text-zinc-600 shrink-0 -mx-1" />
  )
}

export function ProcessStrip() {
  const steps = [
    {
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: "Survey",
      colorClass: "bg-blue-100 dark:bg-blue-900/50",
      iconColorClass: "text-blue-700 dark:text-blue-300",
    },
    {
      icon: <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: "Synthesis",
      colorClass: "bg-violet-100 dark:bg-violet-900/50",
      iconColorClass: "text-violet-700 dark:text-violet-300",
    },
    {
      icon: <Network className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: "IA",
      colorClass: "bg-purple-100 dark:bg-purple-900/50",
      iconColorClass: "text-purple-700 dark:text-purple-300",
    },
    {
      icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: "Wireframes",
      colorClass: "bg-amber-100 dark:bg-amber-900/50",
      iconColorClass: "text-amber-700 dark:text-amber-300",
    },
    {
      icon: <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: "Requirements",
      colorClass: "bg-cyan-100 dark:bg-cyan-900/50",
      iconColorClass: "text-cyan-700 dark:text-cyan-300",
    },
    {
      icon: <Database className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: "Documentation",
      colorClass: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColorClass: "text-emerald-700 dark:text-emerald-300",
    },
  ]

  return (
    <div className="w-full overflow-x-auto py-6 px-2">
      <div className="inline-grid grid-flow-col auto-cols-max items-start justify-center gap-1 sm:gap-2 mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <ProcessStep {...step} />
            {index < steps.length - 1 && (
              <div className="flex items-center h-[40px] sm:h-[48px]">
                <ProcessArrow />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
