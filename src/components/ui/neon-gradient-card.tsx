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
  return (
    <div
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          padding: `${borderSize}px`,
          ...style,
        } as CSSProperties & Record<string, string | number>
      }
      className={cn(
        "relative z-10 size-full rounded-[var(--border-radius)] bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-white/95 p-6 dark:bg-neutral-900/70",
          "before:absolute before:inset-0 before:-z-10 before:block",
          "before:rounded-[var(--border-radius)] before:content-['']",
          "before:bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%]",
          "before:animate-background-position-spin",
          "after:absolute after:inset-0 after:-z-10 after:block",
          "after:rounded-[var(--border-radius)] after:blur-xl after:content-['']",
          "after:bg-[linear-gradient(120deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80",
          "after:animate-background-position-spin",
          "break-words"
        )}
      >
        {children}
      </div>
    </div>
  )
}
