"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline"
import { Lens } from "@/components/ui/lens"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface FocusImage {
  src: string
  alt: string
  caption?: string
}

interface FocusImageGalleryProps {
  images: FocusImage[]
  className?: string
}

export function FocusImageGallery({ images, className }: FocusImageGalleryProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [magnifierActive, setMagnifierActive] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setMagnifierActive(false)
  }, [])

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setMagnifierActive(false)
  }, [images.length])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setMagnifierActive(false)
  }, [images.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])

  const activeImage = images[activeIndex]

  return (
    <>
      {/* Grid of focus cards */}
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full", className)}>
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => openLightbox(index)}
            className={cn(
              "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-full transition-all duration-300 ease-out cursor-pointer group",
              hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
            )}
          >
            <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-contain rounded-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            
            {/* Expand overlay - appears on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-black/0 group-hover:bg-black/30 flex flex-col items-center justify-center gap-2 transition-all duration-300 rounded-lg",
                hovered === index ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                <MagnifyingGlassPlusIcon className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
              </div>
              <span className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                Click to expand
              </span>
            </div>
            
            {image.caption && (
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent flex items-end py-3 px-4 transition-opacity duration-300 rounded-b-lg",
                  hovered === index ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="text-xs md:text-sm font-medium text-white line-clamp-2">
                  {image.caption}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>

            {/* Magnifier Status Indicator */}
            <AnimatePresence>
              {magnifierActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                >
                  <MagnifyingGlassPlusIcon className="w-4 h-4 text-white" />
                  <span className="text-xs text-white/90 font-medium">Magnifier active</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation - Previous */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Navigation - Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Content - clicking outside the image closes lightbox */}
            <div
              className="h-full flex flex-col items-center justify-center p-6 lg:p-12"
              onClick={closeLightbox}
            >
              {/* Image with Lens - only this area captures clicks for magnifier */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                ref={imageContainerRef}
                className="w-full max-w-6xl flex-1 flex items-center justify-center min-h-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  onClick={() => setMagnifierActive(prev => !prev)}
                  className="relative"
                >
                  <Lens zoomFactor={1.5} lensSize={300}>
                    <motion.img
                      key={activeImage.src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={activeImage.src}
                      alt={activeImage.alt}
                      className="max-h-[60vh] lg:max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                    />
                  </Lens>
                </div>
              </motion.div>

              {/* Caption - clicking here also closes */}
              {activeImage.caption && (
                <div 
                  className="w-full max-w-4xl mt-6 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-base lg:text-lg text-white/90 leading-relaxed"
                  >
                    {activeImage.caption}
                  </motion.p>
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-3 text-sm text-white/50"
                    >
                      {activeIndex + 1} of {images.length}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
