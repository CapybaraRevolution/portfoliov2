"use client"

import {
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react"

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
  return (
    <div
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          borderRadius,
          padding: borderSize,
          ...style,
        } as CSSProperties & Record<string, string | number>
      }
      className={cn(
        "relative z-10 isolate size-full rounded-[var(--border-radius)]",
        "bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))]",
        "before:pointer-events-none before:absolute before:-inset-8 before:-z-10 before:rounded-[var(--border-radius)]",
        "before:bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))] before:opacity-35 before:blur-3xl before:content-['']",
        "after:pointer-events-none after:absolute after:inset-0 after:-z-[1] after:rounded-[var(--border-radius)]",
        "after:bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:200%_200%]",
        "after:animate-background-position-spin after:content-['']",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 size-full min-h-[inherit] break-words bg-white/95 p-6",
          "dark:bg-neutral-900"
        )}
        style={{ borderRadius: contentRadius }}
      >
        {children}
      </div>
    </div>
  )
}
