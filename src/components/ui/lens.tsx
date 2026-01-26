"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  /** Whether lens activates on hover (default: true). If false, requires click to activate */
  hoverable?: boolean
  /** Callback when lens active state changes */
  onActiveChange?: (active: boolean) => void
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
  hoverable = true,
  onActiveChange,
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
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartTimeRef = useRef<number>(0)

  // Define dismissTooltip first so it can be used in useEffect
  const dismissTooltip = useCallback(() => {
    setShowTooltip(false)
    // Only persist dismissal for hover mode - click-to-activate always shows tooltip
    if (hoverable) {
      localStorage.setItem('lens-tooltip-dismissed-time', Date.now().toString())
    }
  }, [hoverable])

  // Check if user has seen the tooltip recently (within 4 hours)
  // For click-to-activate mode (hoverable=false), always show tooltip since behavior is less discoverable
  useEffect(() => {
    if (!hoverable) {
      // Click-to-activate mode: always show tooltip to teach the interaction
      setShowTooltip(true)
      return
    }
    
    // Hover mode: check localStorage to avoid showing too frequently
    const lastDismissed = localStorage.getItem('lens-tooltip-dismissed-time')
    const fourHoursInMs = 4 * 60 * 60 * 1000 // 4 hours in milliseconds
    
    if (lastDismissed) {
      const timeSinceDismissal = Date.now() - parseInt(lastDismissed, 10)
      // Show tooltip again if 4 hours have passed
      if (timeSinceDismissal >= fourHoursInMs) {
        setShowTooltip(true)
      }
    } else {
      // First time ever - show tooltip
      setShowTooltip(true)
    }
  }, [hoverable])

  // Auto-dismiss tooltip after 3 seconds
  useEffect(() => {
    if (!showTooltip) return
    
    const timer = setTimeout(() => {
      dismissTooltip()
    }, 3000)

    return () => clearTimeout(timer)
  }, [showTooltip, dismissTooltip])

  // Notify parent when active state changes (must be in useEffect to avoid setState during render)
  useEffect(() => {
    onActiveChange?.(isActive)
  }, [isActive, onActiveChange])

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

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    
    // Update position immediately on click
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    
    // Simple toggle on/off
    setIsActive((prev) => !prev)
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
      if (isActive) {
        setIsActive(false)
      }
    }
  }, [isActive])

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    lensSize / 2
  }px at ${currentPosition.x}px ${
    currentPosition.y
  }px, ${lensColor} 100%, transparent 100%)`

  const LensContent = useMemo(() => {
    const { x, y } = currentPosition

    return (
      <>
        {/* Zoomed Content with Radial Mask */}
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

        {/* Sharp Circle of Light Stroke */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{
            duration: duration * 0.8,
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          className="absolute touch-none pointer-events-none"
          style={{
            left: x - lensSize / 2,
            top: y - lensSize / 2,
            width: lensSize,
            height: lensSize,
            zIndex: 51,
          }}
        >
          {/* Outer glow ring - thinner */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at center, transparent ${lensSize / 2 - 2}px, rgba(255, 255, 255, 0.3) ${lensSize / 2 - 1.5}px, rgba(255, 255, 255, 0.6) ${lensSize / 2 - 0.5}px, rgba(255, 255, 255, 0.2) ${lensSize / 2 + 0.5}px, transparent ${lensSize / 2 + 2}px)`,
              boxShadow: `
                0 0 8px rgba(255, 255, 255, 0.4),
                0 0 12px rgba(255, 255, 255, 0.2)
              `,
            }}
          />
          
          {/* Inner sharp edge - very precise */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at center, transparent ${lensSize / 2 - 1}px, rgba(255, 255, 255, 0.8) ${lensSize / 2 - 0.5}px, rgba(255, 255, 255, 0.9) ${lensSize / 2}px, transparent ${lensSize / 2 + 0.5}px)`,
            }}
          />
        </motion.div>
      </>
    )
  }, [currentPosition, lensSize, lensColor, zoomFactor, children, duration, maskImage])

  // When hoverable is false, only show lens when explicitly clicked (isActive)
  // When hoverable is true (default), show on hover OR click
  const shouldShowLens = hoverable ? (isHovering || isActive) : isActive

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-xl touch-pan-y cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
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

      {/* First-time tooltip */}
      <AnimatePresence>
        {showTooltip && !isActive && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-4 z-[100] pointer-events-auto"
          >
            <div className="bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-2xl border border-white/10 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                  />
                </svg>
                <p className="text-sm font-medium whitespace-nowrap">{hoverable ? "Hover to magnify" : "Click or tap to magnify"}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  dismissTooltip()
                }}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center relative group"
                aria-label="Dismiss tooltip"
              >
                {/* Radial countdown circle - burning fuse effect */}
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                  {/* Background circle */}
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="2.5"
                  />
                  {/* Burning fuse circle */}
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 56.5 }}
                    transition={{ duration: 3, ease: "linear" }}
                    style={{
                      strokeDasharray: "56.5",
                    }}
                    className="drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                  />
                </svg>
                {/* Hover hint dot in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white/90 transition-colors" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
