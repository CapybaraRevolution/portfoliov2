import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'
import path from 'path'
import { IMAGE_SIZES } from '@/lib/imageSizes'

function dimsForPublic(src: string) {
  // Only run on server-side
  if (typeof window !== 'undefined') {
    return { width: 1600, height: 900 }
  }
  
  try {
    const fs = require('fs') as typeof import('fs')
    const sizeOf = require('image-size') as typeof import('image-size').default
    const p = path.join(process.cwd(), 'public', src.replace(/^\//, ''))
    if (fs.existsSync(p)) {
      const dimensions = sizeOf(fs.readFileSync(p))
      return { width: dimensions.width ?? 1600, height: dimensions.height ?? 900 }
    }
  } catch (error) {
    console.warn(`Could not get dimensions for image: ${src}`, error)
  }
  return { width: 1600, height: 900 }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props: any) => {
      const { src = '', alt = '' } = props
      const { width, height } = dimsForPublic(src)
      
      // Determine if this is likely a hero image based on size or alt text
      const isLikelyHero = width > 1800 || alt.toLowerCase().includes('hero') || alt.toLowerCase().includes('dashboard')
      const sizes = isLikelyHero ? IMAGE_SIZES.hero : IMAGE_SIZES.contentMax1200
      
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={90}
          className="rounded-lg"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      )
    },
    ...components,
  }
}