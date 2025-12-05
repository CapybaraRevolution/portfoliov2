"use client"

import { useEffect, useRef, useState } from 'react'

interface NumberTickerProps {
  value: number
  durationMs?: number
  className?: string
}

/**
 * Animated number ticker: counts from the previous value to the new value.
 * Simple requestAnimationFrame-based interpolation for smooth updates.
 */
export function NumberTicker({ value, durationMs = 1000, className }: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState<number>(0)
  const startRef = useRef<number | null>(null)
  const startValueRef = useRef<number>(0)
  const targetRef = useRef<number>(value)

  useEffect(() => {
    startRef.current = null
    startValueRef.current = displayValue
    targetRef.current = value

    let frameId: number

    const step = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp
      }

      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      const next =
        startValueRef.current +
        (targetRef.current - startValueRef.current) * progress

      setDisplayValue(next)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
    // Intentional dependency: restart animation when value or duration changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs])

  const formatted = Number.isInteger(value)
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toFixed(1)

  return <span className={className}>{formatted}</span>
}
