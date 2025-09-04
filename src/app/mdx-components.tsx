import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'
import path from 'path'
import fs from 'fs'
import sizeOf from 'image-size'

function dimsForPublic(src: string) {
  try {
    const p = path.join(process.cwd(), 'public', src.replace(/^\//, ''))
    if (fs.existsSync(p)) {
      const { width, height } = sizeOf(p)
      return { width: width ?? 1600, height: height ?? 900 }
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
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1024px) 100vw, 1200px"
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