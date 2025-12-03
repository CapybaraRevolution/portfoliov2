'use client'

import { useEffect, useId, useState } from 'react'

type AnimatedBeamProps = {
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  color?: string
  thickness?: number
}

type Point = { x: number; y: number }

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  color = 'rgba(16,185,129,0.7)',
  thickness = 2.5,
}: AnimatedBeamProps) {
  const [path, setPath] = useState<string | null>(null)
  const gradientId = useId()

  useEffect(() => {
    function update() {
      const container = containerRef.current
      const fromEl = fromRef.current
      const toEl = toRef.current
      if (!container || !fromEl || !toEl) return

      const cRect = container.getBoundingClientRect()
      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()

      const from: Point = {
        x: fromRect.left + fromRect.width / 2 - cRect.left,
        y: fromRect.top + fromRect.height / 2 - cRect.top,
      }
      const to: Point = {
        x: toRect.left + toRect.width / 2 - cRect.left,
        y: toRect.top + toRect.height / 2 - cRect.top,
      }

      const offset = Math.abs(to.x - from.x) * 0.35 + 40
      const control1: Point = { x: from.x + offset, y: from.y }
      const control2: Point = { x: to.x - offset, y: to.y }

      setPath(`M ${from.x},${from.y} C ${control1.x},${control1.y} ${control2.x},${control2.y} ${to.x},${to.y}`)
    }

    update()
    const onResize = () => update()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
  }, [containerRef, fromRef, toRef])

  if (!path) return null

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.05" />
          <stop offset="40%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={thickness}
        strokeLinecap="round"
        className="drop-shadow-[0_12px_24px_rgba(16,185,129,0.25)]"
      />
    </svg>
  )
}
