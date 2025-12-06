"use client"

import { CSSProperties, ReactElement, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface NeonColorsProps {
  firstColor: string
  secondColor: string
}

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  style,
  ...props
}) => {
  const contentRadius = Math.max(borderRadius - borderSize, 0)
  const cardStyle: CSSProperties & Record<string, string | number> = {
    "--border-size": `${borderSize}px`,
    "--border-radius": `${borderRadius}px`,
    "--neon-first-color": neonColors.firstColor,
    "--neon-second-color": neonColors.secondColor,
    borderRadius,
    padding: borderSize,
    ...style,
  }

  return (
    <div
      style={cardStyle}
      className={cn(
        "relative z-10 isolate size-full rounded-[var(--border-radius)]",
        // Card background stays solid (same as inactive state) - no gradient fill
        "bg-white dark:bg-zinc-800/30",
        // External glow effect using box-shadow that emanates outward
        "shadow-[0_0_15px_var(--neon-first-color),0_0_30px_var(--neon-first-color),0_0_45px_var(--neon-second-color)]",
        // Gradient border using pseudo-element - creates border by being behind and larger
        "before:pointer-events-none before:absolute before:-inset-[var(--border-size)] before:-z-[1] before:rounded-[var(--border-radius)]",
        "before:bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:200%_200%]",
        "before:animate-background-position-spin before:content-['']",
        // Outer glow blur effect that emanates further out
        "after:pointer-events-none after:absolute after:-inset-6 after:-z-10 after:rounded-[var(--border-radius)]",
        "after:bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))] after:opacity-50 after:blur-2xl after:content-['']",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 size-full min-h-[inherit] break-words bg-white p-6",
          "dark:bg-zinc-800/30"
        )}
        style={{ borderRadius: contentRadius }}
      >
        {children}
      </div>
    </div>
  )
}
