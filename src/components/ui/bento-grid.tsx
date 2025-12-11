import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"

import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href?: string
  cta?: string
  badge?: ReactNode
  onClick?: () => void
  hideContentOnHover?: boolean
  /** When true, applies hover-like styles on mobile (for scroll-based center detection) */
  isMobileActive?: boolean
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  badge,
  onClick,
  hideContentOnHover = false,
  isMobileActive = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    key={name}
    onClick={onClick}
    data-mobile-active={isMobileActive || undefined}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    {/* Gradient backing for text/icon contrast - fades upward */}
    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent dark:from-neutral-900 dark:via-neutral-900/60 dark:to-transparent pointer-events-none z-[5]" />
    
    <div className="relative z-10 p-4">
      <div className={cn(
        "pointer-events-none flex flex-col gap-1 transition-opacity duration-300",
        hideContentOnHover && "group-hover:opacity-0",
        hideContentOnHover && isMobileActive && "opacity-0"
      )}>
        <Icon className="h-12 w-12 text-neutral-700 dark:text-neutral-300" />
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            {name}
          </h3>
          {badge}
        </div>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

    </div>

    <div className={cn(
      "pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10",
      isMobileActive && "bg-black/[.03] dark:bg-neutral-800/10"
    )} />
  </div>
))

BentoCard.displayName = "BentoCard"

export { BentoCard, BentoGrid }
