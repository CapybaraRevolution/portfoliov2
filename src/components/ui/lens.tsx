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
  duration = 0.15,
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
  const [isActive, setIsActive] = useState(false)
  const [mousePosition, setMousePosition] = useState<Position>(position)
  const [touchStartPosition, setTouchStartPosition] = useState<Position | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartTimeRef = useRef<number>(0)

  const currentPosition = useMemo(() => {
    if (isStatic) return position
    if (defaultPosition && !isHovering && !isActive) return defaultPosition
    return mousePosition
  }, [isStatic, position, defaultPosition, isHovering, isActive, mousePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (!touch || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    
    touchStartTimeRef.current = Date.now()
    setTouchStartPosition({ x, y })
    setMousePosition({ x, y })
    setIsTouching(true)
    
    // Toggle lens on/off
    setIsActive((prev) => !prev)
    
    // Prevent scrolling while interacting with lens
    e.preventDefault()
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isActive || !containerRef.current) return
    
    const touch = e.touches[0]
    if (!touch) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    
    setMousePosition({ x, y })
    
    // Prevent scrolling while dragging lens
    e.preventDefault()
  }, [isActive])

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touchDuration = Date.now() - touchStartTimeRef.current
    
    // If it was a quick tap (< 200ms) and didn't move much, toggle off
    if (touchDuration < 200 && touchStartPosition) {
      const touch = e.changedTouches[0]
      if (touch && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        const distance = Math.sqrt(
          Math.pow(x - touchStartPosition.x, 2) + Math.pow(y - touchStartPosition.y, 2)
        )
        
        // If moved less than 10px, it's a tap - toggle off
        if (distance < 10 && isActive) {
          setIsActive(false)
        }
      }
    }
    
    setIsTouching(false)
    setTouchStartPosition(null)
  }, [isActive, touchStartPosition])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsHovering(false)
      setIsActive(false)
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
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ 
          duration,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="absolute inset-0 overflow-hidden touch-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin: `${x}px ${y}px`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {children}
        </div>
      </motion.div>
    )
  }, [currentPosition, lensSize, lensColor, zoomFactor, children, duration, maskImage])

  const shouldShowLens = isHovering || isActive

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-xl touch-pan-y"
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
      style={{
        touchAction: isActive ? "none" : "pan-y",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {children}
      {isStatic || defaultPosition ? (
        LensContent
      ) : (
        <AnimatePresence mode="wait">
          {shouldShowLens && LensContent}
        </AnimatePresence>
      )}
    </div>
  )
}
