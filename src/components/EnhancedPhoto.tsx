'use client'

import Image from 'next/image'
import { BorderBeam } from '@/components/ui/border-beam'
import { IMAGE_SIZES } from '@/lib/imageSizes'

interface EnhancedPhotoProps {
  src: any
  alt: string
  width: number
  height: number
  priority?: boolean
  sizes?: string
}

export function EnhancedPhoto({ src, alt, width, height, priority = false, sizes = IMAGE_SIZES.contentMax1200 }: EnhancedPhotoProps) {
  return (
    <div className="group relative">
      {/* Photo with Simple Styling */}
      <div 
        className="relative overflow-hidden rounded-2xl ring-2 ring-emerald-500/20 dark:ring-emerald-400/20 transition-all duration-500"
        style={{
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Light Rays Effect */}
        <BorderBeam
          size={100}
          duration={8}
          colorFrom="#10b981"
          colorTo="#34d399"
          delay={0}
          borderWidth={2}
        />
        
        {/* Main Image */}
        <Image
          src={src}
          alt={alt}
          className="relative z-10 w-full h-auto"
          priority={priority}
          placeholder="blur"
          width={width}
          height={height}
          sizes={sizes}
          quality={90}
        />
      </div>
      
      {/* Subtle Neon Glow on Hover */}
      <div 
        className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.15), transparent 70%)',
        }}
      />
    </div>
  )
}