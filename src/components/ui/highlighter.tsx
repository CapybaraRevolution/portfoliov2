"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"
import { useTheme } from "next-themes"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color,
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  // Determine color based on theme if not explicitly provided
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  
  // Default colors: light pink for light mode, darker purple for dark mode (better contrast with white text)
  // Darker purple provides good contrast with white text on dark backgrounds
  const defaultColor = isDark ? "#6d28d9" : "#ffd1dc" // Dark purple for dark mode
  const finalColor = color || defaultColor

  useEffect(() => {
    if (!shouldShow || !mounted) return

    const element = elementRef.current
    if (!element) return

    // Clean up existing annotation before creating a new one
    if (annotationRef.current) {
      annotationRef.current.remove()
      annotationRef.current = null
    }

    const annotationConfig = {
      type: action,
      color: finalColor,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    }

    const annotation = annotate(element, annotationConfig)

    annotationRef.current = annotation
    annotationRef.current.show()

    const resizeObserver = new ResizeObserver(() => {
      if (annotationRef.current) {
        annotationRef.current.hide()
        annotationRef.current.show()
      }
    })

    resizeObserver.observe(element)
    resizeObserver.observe(document.body)

    return () => {
      // Properly remove the annotation
      if (annotationRef.current) {
        annotationRef.current.remove()
        annotationRef.current = null
      }
      resizeObserver.disconnect()
    }
  }, [
    shouldShow,
    mounted,
    action,
    finalColor,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
