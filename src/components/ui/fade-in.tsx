"use client"

import { motion, type Variants, useReducedMotion } from 'motion/react'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/contexts/ReducedMotionContext'

// Use useLayoutEffect on client (runs before paint), useEffect on server (avoids SSR warning)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fade' | 'scale'

interface FadeInProps {
  children: ReactNode
  className?: string
  /** Animation variant - direction the element fades in from */
  variant?: AnimationVariant
  /** Delay before animation starts (in seconds) */
  delay?: number
  /** Duration of the animation (in seconds) */
  duration?: number
  /** Margin for viewport detection (negative values trigger later, when element is deeper in viewport) */
  viewportMargin?: string
  /** Whether to apply animation once or every time element enters view */
  once?: boolean
}

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

/**
 * A wrapper component that animates its children when they enter the viewport.
 *
 * Uses a progressive enhancement approach:
 * - During SSR and initial page load, content renders VISIBLE to prevent the
 *   "blank page" issue where content was invisible (opacity: 0) until JS loaded.
 * - After hydration, elements above the fold stay visible (no animation needed).
 * - Elements below the fold are hidden and animate in when scrolled into view.
 *
 * @example
 * // Simple fade up
 * <FadeIn>
 *   <p>This content fades up on scroll</p>
 * </FadeIn>
 *
 * @example
 * // With delay for staggered effect
 * <FadeIn delay={0.1}>
 *   <Card>First card</Card>
 * </FadeIn>
 * <FadeIn delay={0.2}>
 *   <Card>Second card</Card>
 * </FadeIn>
 */
export function FadeIn({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  viewportMargin = '-60px',
  once = true,
}: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  // 'pending' = SSR/initial render (visible)
  // 'above'   = in/near viewport on mount (stays visible, no animation)
  // 'below'   = below viewport (hidden, waiting for scroll)
  // 'reveal'  = scrolled into view (animating to visible)
  const [placement, setPlacement] = useState<'pending' | 'above' | 'below' | 'reveal'>('pending')

  // Before first browser paint: determine if element is above or below the fold.
  // useLayoutEffect ensures below-fold elements are hidden before the browser
  // paints, preventing a flash of visible content that then disappears.
  // setState in useLayoutEffect triggers a synchronous re-render before paint.
  useIsomorphicLayoutEffect(() => {
    if (!ref.current || placement !== 'pending') return
    const rect = ref.current.getBoundingClientRect()
    // Elements within the viewport + 100px buffer are considered "above fold"
    // and render immediately visible without any animation
    setPlacement(rect.top < window.innerHeight + 100 ? 'above' : 'below')
  }, [placement])

  // Set up IntersectionObserver for below-fold elements to trigger reveal on scroll
  useEffect(() => {
    if (placement !== 'below' || !ref.current) return

    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlacement('reveal')
          if (once) observer.disconnect()
        }
      },
      { rootMargin: viewportMargin, threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [placement, viewportMargin, once])

  // Skip animations entirely for users who prefer reduced motion
  if (prefersReducedMotion || shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  // SSR, initial hydration, or above-fold: render visible immediately.
  // This is the key fix — content is never invisible before JS loads.
  if (placement === 'pending' || placement === 'above') {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    )
  }

  // Below fold: use motion.div for scroll-triggered animation.
  // - When placement='below': initial="hidden" keeps element invisible,
  //   no animate prop means it stays at the hidden state.
  // - When placement='reveal': animate="visible" triggers the entry animation
  //   from the hidden state to visible.
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={placement === 'reveal' ? 'visible' : undefined}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A container that staggers animations of its direct children.
 * Wrap multiple FadeIn components or other elements to create
 * a staggered reveal effect.
 */
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number
  /** Initial delay before first child animates */
  initialDelay?: number
  /** Margin for viewport detection */
  viewportMargin?: string
  once?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  viewportMargin = '-80px',
  once = true,
}: StaggerContainerProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Skip stagger animation if reduced motion is preferred
  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A child element designed to work inside StaggerContainer.
 * Automatically inherits animation timing from parent.
 */
interface StaggerItemProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
}

export function StaggerItem({
  children,
  className,
  variant = 'fadeUp',
}: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Skip animation if reduced motion is preferred
  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants[variant]}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
