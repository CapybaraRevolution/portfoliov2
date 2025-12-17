"use client"

import { motion, type Variants } from 'motion/react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/contexts/ReducedMotionContext'

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
  /** Margin for viewport detection (negative values trigger earlier) */
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
  viewportMargin = '-80px',
  once = true,
}: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Skip animation entirely if reduced motion is preferred
  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
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
