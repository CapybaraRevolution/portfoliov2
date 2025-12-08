"use client"

import React from 'react'

import { cn } from '@/lib/utils'

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

// Adds the keyframes/utility needed for the orbit animation so the component is
// self-contained even if Tailwind doesn't know about `animate-orbit`.
const OrbitingStyles = () => (
  <style jsx global>{`
    @keyframes orbit {
      from {
        transform: rotate(calc(var(--angle) * 1deg))
          translateX(var(--radius)) rotate(calc(var(--angle) * -1deg));
      }
      to {
        transform: rotate(calc(var(--angle) * 1deg + 360deg))
          translateX(var(--radius)) rotate(calc(var(--angle) * -1deg - 360deg));
      }
    }
    .animate-orbit {
      animation: orbit calc(var(--duration) * 1s) linear infinite;
      transform-origin: center;
    }
  `}</style>
)

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed

  return (
    <>
      <OrbitingStyles />
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        return (
          <div
            style={
              {
                '--duration': calculatedDuration,
                '--radius': `${radius}px`,
                '--angle': angle,
                '--icon-size': `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              'animate-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full',
              { '[animation-direction:reverse]': reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
