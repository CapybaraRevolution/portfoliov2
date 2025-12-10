"use client"

import { cn } from '@/lib/utils'
import { FadeIn } from '@/components/ui/fade-in'

interface SplitSectionProps {
  /** The text content (prose section) */
  children: React.ReactNode
  /** The visual content (image, component, etc.) */
  visual: React.ReactNode
  /** Flip the layout so visual is on the left */
  flip?: boolean
  /** Optional heading ID for scroll targeting */
  id?: string
  /** Alignment of both columns */
  align?: 'start' | 'center' | 'stretch'
  /** Additional className for the container */
  className?: string
}

/**
 * A 50/50 split layout component for case studies.
 * 
 * Provides consistent spacing and visual continuity between text and content.
 * The visual content fills the available space while maintaining proper alignment.
 * Includes scroll-triggered animations for elegant reveal on first view.
 * 
 * @example
 * <SplitSection
 *   visual={<OrbitingCirclesDemo />}
 *   id="context"
 * >
 *   <h2>Context</h2>
 *   <p>Your content here...</p>
 * </SplitSection>
 */
export function SplitSection({
  children,
  visual,
  flip = false,
  id,
  align = 'start',
  className,
}: SplitSectionProps) {
  const alignmentClasses = {
    start: 'items-start',
    center: 'items-center',
    stretch: 'items-stretch',
  }

  return (
    <section className={cn('mb-16', className)}>
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
          alignmentClasses[align]
        )}
      >
        {/* Text content */}
        <FadeIn 
          variant={flip ? 'fadeLeft' : 'fadeRight'}
          className={cn(
            'prose prose-zinc dark:prose-invert max-w-none relative',
            flip && 'lg:order-2'
          )}
        >
          {id && (
            <span id={id} className="absolute -top-24" aria-hidden="true" />
          )}
          {children}
        </FadeIn>

        {/* Visual content - fills available space with proper centering */}
        <FadeIn
          variant={flip ? 'fadeRight' : 'fadeLeft'}
          delay={0.15}
          className={cn(
            'relative flex items-center justify-center min-h-[280px]',
            flip && 'lg:order-1'
          )}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {visual}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/**
 * A variant specifically designed for orbiting circles and similar 
 * centered animated components that need a fixed container.
 */
interface OrbitContainerProps {
  /** The orbiting circles component(s) */
  children: React.ReactNode
  /** Optional center content */
  center?: React.ReactNode
  /** Height of the container */
  height?: string
  /** Additional className */
  className?: string
}

export function OrbitContainer({
  children,
  center,
  height = 'h-[320px]',
  className,
}: OrbitContainerProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-full',
        height,
        className
      )}
    >
      {/* Orbiting content - positioned relative to this container */}
      <div className="absolute inset-0">
        {children}
      </div>

      {/* Center content */}
      {center && (
        <div className="relative z-10">
          {center}
        </div>
      )}
    </div>
  )
}
