'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  slug: string           // e.g., 'figma', 'figjam', 'typeform'
  size?: number          // px square
  alt?: string
}

const ALIAS: Record<string, string> = {
  figjam: 'figma',        // the only special-case fallback
}

export default function SafeToolIcon({ slug, size = 24, alt }: Props) {
  const initialSlug = ALIAS[slug] ?? slug
  const [src, setSrc] = useState(`/images/tools/${initialSlug}.svg`)
  const [visible, setVisible] = useState(true)

  const handleError = () => {
    // If FigJam somehow failed to alias to Figma, last-chance retry once:
    if (slug === 'figjam' && !src.endsWith('/figma.svg')) {
      setSrc('/images/tools/figma.svg')
    } else {
      setVisible(false) // hide icon for any other missing asset
    }
  }

  if (!visible) return null
  return (
    <Image
      src={src}
      alt={alt ?? `${slug} icon`}
      width={size}
      height={size}
      onError={handleError}
      priority={false}
    />
  )
}