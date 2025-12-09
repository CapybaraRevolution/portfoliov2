"use client"

import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import clsx from 'clsx'

export interface ImpactMetricProps {
  label: ReactNode
  value: number
  suffix?: string
  description?: ReactNode
  className?: string
  highlight?: boolean
}

export function ImpactMetric({ label, value, suffix, description, className, highlight }: ImpactMetricProps) {
  const isHighlighted = Boolean(highlight)
  const isPlainTextLabel = typeof label === 'string'

  // Mouse tracking for text gradient
  const gradientSize = 200
  const proximityRadius = 400 // Distance in pixels where gradient starts appearing
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)
  const globalMouseX = useMotionValue(0)
  const globalMouseY = useMotionValue(0)
  const opacity = useMotionValue(0)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const reset = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [mouseX, mouseY])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  // Global mouse tracking for proximity detection (throttled for performance)
  useEffect(() => {
    if (!isHighlighted || !cardRef.current) return

    let rafId: number | null = null
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (rafId) return // Throttle using requestAnimationFrame
      
      rafId = requestAnimationFrame(() => {
        globalMouseX.set(e.clientX)
        globalMouseY.set(e.clientY)
        
        const rect = cardRef.current!.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2)
        )
        
        // Calculate opacity based on proximity with ease-out curve (more pronounced when close)
        // Using ease-out: 1 - (1 - t)^2 for more dramatic effect when close
        const normalizedDistance = Math.min(1, distance / proximityRadius)
        const easeOut = 1 - Math.pow(1 - (1 - normalizedDistance), 2)
        // Boost intensity when very close (within 150px gets extra glow)
        const closeBoost = distance < 150 ? 1.3 : 1
        const proximityOpacity = Math.min(1, Math.max(0, easeOut * closeBoost))
        opacity.set(proximityOpacity)
        
        // Update relative mouse position for gradient
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
        
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isHighlighted, globalMouseX, globalMouseY, mouseX, mouseY, opacity])

  useEffect(() => {
    if (!isHighlighted) {
      opacity.set(0)
      reset()
    }
  }, [isHighlighted, reset, opacity])

  const content = (
    <div
      className={clsx(
        'flex h-full flex-col rounded-2xl bg-white/70 p-6 shadow-sm transition dark:bg-zinc-800/70',
        !isHighlighted && 'border border-zinc-900/5 dark:border-white/10',
        className,
      )}
    >
      {isHighlighted ? (
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-white">
          {label}
        </div>
      ) : (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          {label}
        </p>
      )}
      <div className="relative mt-3 flex items-center gap-2 text-4xl font-semibold text-zinc-900 dark:text-white">
        {/* Base white text */}
        <NumberTicker value={value} className="tabular-nums" />
        
        {/* Gradient text overlay */}
        {isHighlighted && (
          <motion.span
            className="absolute left-0 top-0 tabular-nums"
            style={{
              backgroundImage: useMotionTemplate`
                radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                #10b981,
                #2dd4bf,
                #38bdf8,
                transparent 100%
                )
              `,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: opacity,
            }}
          >
            <NumberTicker value={value} />
          </motion.span>
        )}
        {suffix ? (
          <span
            className={clsx(
              'text-4xl transition-colors duration-300',
              isHighlighted 
                ? 'text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-500/80 dark:group-hover:text-emerald-300/80' 
                : 'text-zinc-500 dark:text-zinc-400',
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
      ) : null}
    </div>
  )

  return (
    <div
      ref={isHighlighted ? cardRef : undefined}
      className="group relative flex h-full flex-col rounded-2xl"
      onPointerMove={isHighlighted ? handlePointerMove : undefined}
      onPointerLeave={isHighlighted ? reset : undefined}
      onPointerEnter={isHighlighted ? reset : undefined}
    >
      {/* Base neutral border (always visible) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-[2px] border-zinc-400 dark:border-zinc-600" />
      
      {/* Proximity-based gradient border overlay (only for highlighted cards) */}
      {isHighlighted && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              #10b981, 
              #38bdf8, 
              transparent 100%
              )
            `,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
            opacity: opacity,
          }}
        />
      )}
      
      {/* Background layer (creates border effect) */}
      <div className="bg-background absolute inset-[2px] rounded-2xl" />
      
      {/* Subtle inner glow (only for highlighted cards) */}
      {isHighlighted && (
        <motion.div
          className="pointer-events-none absolute inset-[2px] rounded-2xl"
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, 
              rgba(16, 185, 129, 0.1), 
              transparent 100%)
            `,
            opacity: opacity,
          }}
        />
      )}
      
      <div className="relative h-full">{content}</div>
    </div>
  )
}
