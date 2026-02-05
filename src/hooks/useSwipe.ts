"use client"

import { useRef, useCallback } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  /** Minimum distance in pixels to trigger a swipe (default: 50) */
  threshold?: number
  /** Maximum angle deviation from the axis in degrees (default: 30) */
  angleThreshold?: number
  /** Whether to prevent default touch behavior during swipe (default: false) */
  preventDefault?: boolean
}

interface SwipeReturn {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

/**
 * Reusable hook for detecting swipe gestures on touch devices.
 * 
 * Uses angle-based detection to distinguish horizontal from vertical swipes,
 * preventing accidental triggers during scrolling.
 * 
 * @example
 * const swipeHandlers = useSwipe({
 *   onSwipeLeft: () => goToNext(),
 *   onSwipeRight: () => goToPrevious(),
 * })
 * 
 * return <div {...swipeHandlers}>...</div>
 */
export function useSwipe(
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
): SwipeReturn {
  const {
    threshold = 50,
    angleThreshold = 30,
    preventDefault = false,
  } = options

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Calculate the angle from the horizontal axis
    const angle = Math.atan2(absY, absX) * (180 / Math.PI)

    // Determine if this is a horizontal or vertical swipe
    const isHorizontal = angle < angleThreshold
    const isVertical = angle > (90 - angleThreshold)

    if (isHorizontal && absX >= threshold) {
      if (preventDefault) {
        e.preventDefault()
      }
      if (deltaX < 0 && handlers.onSwipeLeft) {
        handlers.onSwipeLeft()
      } else if (deltaX > 0 && handlers.onSwipeRight) {
        handlers.onSwipeRight()
      }
    } else if (isVertical && absY >= threshold) {
      if (preventDefault) {
        e.preventDefault()
      }
      if (deltaY < 0 && handlers.onSwipeUp) {
        handlers.onSwipeUp()
      } else if (deltaY > 0 && handlers.onSwipeDown) {
        handlers.onSwipeDown()
      }
    }

    touchStartRef.current = null
  }, [handlers, threshold, angleThreshold, preventDefault])

  return { onTouchStart, onTouchEnd }
}
