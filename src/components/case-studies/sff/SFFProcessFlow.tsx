"use client"

import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { FileText, Network, GitBranch, Database, ArrowRight } from "lucide-react"

const ProcessNode = forwardRef<
  HTMLDivElement,
  { 
    className?: string
    children?: React.ReactNode
    label: string
    sublabel?: string
  }
>(({ className, children, label, sublabel }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-14 items-center justify-center rounded-xl border-2 bg-white p-3 shadow-md transition-all hover:scale-105 hover:shadow-lg dark:bg-zinc-800",
          className
        )}
      >
        {children}
      </div>
      <div className="text-center">
        <div className="text-xs font-semibold text-zinc-900 dark:text-white">{label}</div>
        {sublabel && (
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 max-w-[80px]">{sublabel}</div>
        )}
      </div>
    </div>
  )
})

ProcessNode.displayName = "ProcessNode"

export function SFFProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const surveyRef = useRef<HTMLDivElement>(null)
  const synthesisRef = useRef<HTMLDivElement>(null)
  const iaRef = useRef<HTMLDivElement>(null)
  const wireframesRef = useRef<HTMLDivElement>(null)
  const docsRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-8 dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800"
      ref={containerRef}
    >
      <div className="flex w-full max-w-md flex-col items-center justify-between gap-8">
        {/* Top row: Survey → Synthesis */}
        <div className="flex w-full items-start justify-between px-4">
          <ProcessNode 
            ref={surveyRef} 
            label="Survey"
            sublabel="42 stakeholders"
            className="border-blue-200 dark:border-blue-800"
          >
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </ProcessNode>
          
          <ProcessNode 
            ref={synthesisRef} 
            label="Synthesis"
            sublabel="Clustering"
            className="border-violet-200 dark:border-violet-800"
          >
            <Network className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </ProcessNode>
        </div>

        {/* Middle: IA (centered) */}
        <div className="flex justify-center">
          <ProcessNode 
            ref={iaRef} 
            label="IA"
            sublabel="Directory-first"
            className="size-16 border-purple-200 dark:border-purple-800"
          >
            <Network className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </ProcessNode>
        </div>

        {/* Bottom row: Wireframes → Docs */}
        <div className="flex w-full items-start justify-between px-4">
          <ProcessNode 
            ref={wireframesRef} 
            label="Wireframes"
            sublabel="9+ templates"
            className="border-amber-200 dark:border-amber-800"
          >
            <GitBranch className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </ProcessNode>
          
          <ProcessNode 
            ref={docsRef} 
            label="Docs"
            sublabel="Obsidian"
            className="border-emerald-200 dark:border-emerald-800"
          >
            <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </ProcessNode>
        </div>
      </div>

      {/* Animated beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={surveyRef}
        toRef={synthesisRef}
        curvature={-20}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
        duration={4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={synthesisRef}
        toRef={iaRef}
        curvature={30}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#a855f7"
        duration={4}
        delay={0.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={surveyRef}
        toRef={iaRef}
        curvature={-30}
        gradientStartColor="#3b82f6"
        gradientStopColor="#a855f7"
        duration={4}
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iaRef}
        toRef={wireframesRef}
        curvature={-30}
        gradientStartColor="#a855f7"
        gradientStopColor="#f59e0b"
        duration={4}
        delay={1.5}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iaRef}
        toRef={docsRef}
        curvature={30}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
        duration={4}
        delay={2}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={wireframesRef}
        toRef={docsRef}
        curvature={20}
        gradientStartColor="#f59e0b"
        gradientStopColor="#10b981"
        duration={4}
        delay={2.5}
      />
    </div>
  )
}
