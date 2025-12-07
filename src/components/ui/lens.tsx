"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionTemplate } from "motion/react"

interface Position {
  /** The x coordinate of the lens */
  x: number
  /** The y coordinate of the lens */
  y: number
}

interface LensProps {
  /** The children of the lens */
  children: React.ReactNode
  /** The zoom factor of the lens */
  zoomFactor?: number
  /** The size of the lens */
  lensSize?: number
  /** The position of the lens */
  position?: Position
  /** The default position of the lens */
  defaultPosition?: Position
  /** Whether the lens is static */
  isStatic?: boolean
  /** The duration of the animation */
  duration?: number
  /** The color of the lens */
  lensColor?: string
  /** The aria label of the lens */
  ariaLabel?: string
}

export function Lens({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area",
}: LensProps) {
  if (zoomFactor < 1) {
    throw new Error("zoomFactor must be greater than 1")
  }
  if (lensSize < 0) {
    throw new Error("lensSize must be greater than 0")
  }

  const [isHovering, setIsHovering] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [lensActive, setLensActive] = useState(false)
  const [mousePosition, setMousePosition] = useState<Position>(position)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<Position | null>(null)

  const currentPosition = useMemo(() => {
    if (isStatic) return position
    if (defaultPosition && !isHovering && !lensActive) return defaultPosition
    return mousePosition
  }, [isStatic, position, defaultPosition, isHovering, lensActive, mousePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const touchPos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }
    
    // If lens is already active, toggle it off
    if (lensActive) {
      setLensActive(false)
      setIsTouching(false)
      return
    }
    
    // Otherwise, activate lens and set position
    touchStartRef.current = touchPos
    setMousePosition(touchPos)
    setLensActive(true)
    setIsTouching(true)
  }, [lensActive])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!lensActive || !isTouching) return
    
    e.preventDefault() // Prevent scrolling while dragging
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    setMousePosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })
  }, [lensActive, isTouching])

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false)
    touchStartRef.current = null
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsHovering(false)
      setLensActive(false)
    }
  }, [])

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    lensSize / 2
  }px at ${currentPosition.x}px ${
    currentPosition.y
  }px, ${lensColor} 100%, transparent 100%)`

  const LensContent = useMemo(() => {
    const { x, y } = currentPosition

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration }}
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin: `${x}px ${y}px`,
          }}
        >
          {children}
        </div>
      </motion.div>
    )
  }, [currentPosition, lensSize, lensColor, zoomFactor, children, duration, maskImage])

  const showLens = isHovering || lensActive

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-xl touch-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {isStatic || defaultPosition ? (
        LensContent
      ) : (
        <AnimatePresence mode="popLayout">
          {showLens && LensContent}
        </AnimatePresence>
      )}
    </div>
  )
}
