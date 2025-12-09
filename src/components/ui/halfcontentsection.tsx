'use client'

import React, { ReactNode, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

interface HalfContentSectionProps {
  // Visual/Image Props
  imageSrc?: string
  imageAlt?: string
  darkModeImageSrc?: string
  customVisual?: ReactNode
  
  // Content Props
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string | ReactNode
  features?: Feature[]
  additionalContent?: ReactNode
  
  // Layout Props
  flip?: boolean
  accentColor?: 'emerald' | 'indigo' | 'red' | 'blue' | 'amber'
  className?: string
  fullWidth?: boolean
  parallax?: boolean
}

export function HalfContentSection({
  imageSrc,
  imageAlt = '',
  darkModeImageSrc,
  customVisual,
  eyebrow,
  title,
  subtitle,
  description,
  features,
  additionalContent,
  flip = false,
  accentColor = 'emerald',
  className = '',
  fullWidth = false,
  parallax = false,
}: HalfContentSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!parallax || !imageRef.current || !containerRef.current) return

    const handleScroll = () => {
      if (!imageRef.current || !containerRef.current) return
      
      const containerRect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      
      // Calculate scroll progress through the container
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - containerTop) / (windowHeight + containerHeight)
      ))
      
      // Parallax effect: pan the image within a fixed viewport (no container movement)
      // We adjust object-position and add zoom for more dramatic effect
      const maxPan = 40 // percentage shift in object position (increased for more movement)
      const objectPositionY = Math.max(0, Math.min(100, scrollProgress * maxPan))
      
      // Zoom effect: scale up the image slightly as you scroll
      const minScale = 1.1 // Start at 110% zoom
      const maxScale = 1.2 // End at 120% zoom
      const scale = minScale + (scrollProgress * (maxScale - minScale))

      const imgElements = imageRef.current.querySelectorAll('img')
      imgElements.forEach((imgElement) => {
        imgElement.style.transform = `scale(${scale})`
        imgElement.style.objectPosition = `center ${objectPositionY}%`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [parallax])

  const accentColors = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    red: 'text-red-600 dark:text-red-400',
    blue: 'text-blue-600 dark:text-blue-400',
    amber: 'text-amber-600 dark:text-amber-400',
  }

  const visualContent = customVisual || (
    imageSrc && (
      <>
        {/* Light mode image */}
        <Image
          alt={imageAlt}
          src={imageSrc}
          fill
          sizes={fullWidth ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
          className="absolute inset-0 size-full bg-zinc-50 object-cover object-top dark:hidden transition-transform duration-300 ease-out"
          quality={90}
          priority
        />
        {/* Dark mode image */}
        {darkModeImageSrc && (
          <Image
            alt={imageAlt}
            src={darkModeImageSrc}
            fill
            sizes={fullWidth ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
            className="absolute inset-0 size-full bg-zinc-800 object-cover object-top hidden dark:block transition-transform duration-300 ease-out"
            quality={90}
            priority
          />
        )}
        {/* Fallback if no dark mode image provided */}
        {!darkModeImageSrc && (
          <Image
            alt={imageAlt}
            src={imageSrc}
            fill
            sizes={fullWidth ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
            className="absolute inset-0 size-full bg-zinc-800 object-cover object-top hidden dark:block transition-transform duration-300 ease-out"
            quality={90}
            priority
          />
        )}
      </>
    )
  )

  return (
    <div 
      ref={containerRef}
      className={`relative bg-white dark:bg-zinc-900 w-full ${className}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'mx-auto max-w-7xl'} lg:flex lg:justify-between lg:items-start ${fullWidth ? 'px-0' : 'lg:px-8'} xl:justify-end`}>
        {/* Visual Side */}
        <div className={`lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:w-1/2 ${
          flip ? 'xl:left-1/2' : 'xl:right-1/2'
        }`}>
          <div 
            ref={imageRef}
            className={`relative h-80 lg:h-full lg:w-full lg:grow xl:ml-0 overflow-hidden ${
              flip ? 'lg:-mr-8 xl:mr-0' : fullWidth ? '' : 'lg:-ml-8'
            }`}
          >
            {visualContent}
          </div>
        </div>

        {/* Content Side */}
        {fullWidth ? (
          <div className="px-6 lg:px-8 lg:flex lg:w-1/2 lg:shrink-0 xl:w-1/2 lg:items-start">
            <div className={`mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:w-full lg:max-w-lg lg:flex-none lg:pt-16 xl:w-full ${
              flip ? 'lg:mr-8 lg:ml-0' : 'lg:ml-8'
            }`}>
              {eyebrow && (
                <p className={`text-base/7 font-semibold ${accentColors[accentColor]}`}>
                  {eyebrow}
                </p>
              )}
              
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl dark:text-white">
                {title}
              </h2>
              
              {subtitle && (
                <p className="mt-6 text-xl/8 text-zinc-700 dark:text-zinc-300">
                  {subtitle}
                </p>
              )}

              <div className="mt-10 max-w-xl text-base/7 text-zinc-600 lg:max-w-none dark:text-zinc-400">
                {typeof description === 'string' ? <p>{description}</p> : description}
                
                {features && features.length > 0 && (
                  <ul role="list" className="mt-8 space-y-8 text-zinc-600 dark:text-zinc-400">
                    {features.map((feature, index) => (
                      <li key={index} className="flex gap-x-3">
                        <span className={`mt-1 size-5 flex-none ${accentColors[accentColor]}`}>
                          {feature.icon}
                        </span>
                        <span>
                          <strong className="font-semibold text-zinc-900 dark:text-white">
                            {feature.title}
                          </strong>{' '}
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {additionalContent && (
                  <div className="mt-8">
                    {additionalContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 lg:contents">
            <div className={`mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:w-full lg:max-w-lg lg:flex-none lg:pt-16 xl:w-1/2 ${
              flip ? 'lg:mr-8 lg:ml-0' : 'lg:mr-0 lg:ml-8'
            }`}>
              {eyebrow && (
                <p className={`text-base/7 font-semibold ${accentColors[accentColor]}`}>
                  {eyebrow}
                </p>
              )}
              
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl dark:text-white">
                {title}
              </h2>
              
              {subtitle && (
                <p className="mt-6 text-xl/8 text-zinc-700 dark:text-zinc-300">
                  {subtitle}
                </p>
              )}

              <div className="mt-10 max-w-xl text-base/7 text-zinc-600 lg:max-w-none dark:text-zinc-400">
                {typeof description === 'string' ? <p>{description}</p> : description}
                
                {features && features.length > 0 && (
                  <ul role="list" className="mt-8 space-y-8 text-zinc-600 dark:text-zinc-400">
                    {features.map((feature, index) => (
                      <li key={index} className="flex gap-x-3">
                        <span className={`mt-1 size-5 flex-none ${accentColors[accentColor]}`}>
                          {feature.icon}
                        </span>
                        <span>
                          <strong className="font-semibold text-zinc-900 dark:text-white">
                            {feature.title}
                          </strong>{' '}
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {additionalContent && (
                  <div className="mt-8">
                    {additionalContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HalfContentSection
