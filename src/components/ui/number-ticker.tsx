"use client"

import { useEffect, useState } from "react"

interface NumberTickerProps {
  value: number
  className?: string
}

/**
 * Placeholder NumberTicker compatible with Magic UI API.
 * Renders the value directly; animation can be added later.
 */
export function NumberTicker({ value, className }: NumberTickerProps) {
  // Minimal state placeholder to mirror a future animated implementation.
  const [displayValue, setDisplayValue] = useState<number>(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  return <span className={className}>{displayValue}</span>
}
