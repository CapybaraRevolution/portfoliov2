/**
 * Centralized image sizing constants for consistent responsive behavior
 * 
 * These sizes strings ensure the browser selects appropriate high-DPI candidates
 * that match the actual CSS layout widths across different breakpoints.
 */

export const IMAGE_SIZES = {
  /** Full viewport width - for hero backgrounds and full-bleed images */
  fullBleed: '100vw',
  
  /** Content constrained to max 1200px - most case study images and content */
  contentMax1200: '(max-width: 1024px) 100vw, 1200px',
  
  /** Content constrained to max 1400px - wider case study images */
  contentMax1400: '(max-width: 1024px) 100vw, 1400px',
  
  /** Two column layout - images in side-by-side arrangement */
  twoCol: '(max-width: 1024px) 100vw, 50vw',
  
  /** Three column card grid - thumbnail galleries */
  card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  
  /** Logo sizes - company logos in case studies */
  logo: '(max-width: 768px) 200px, 300px',
  
  /** Hero case study images - large showcase images */
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',
  
  /** Avatar/profile images */
  avatar: '(max-width: 768px) 120px, 150px'
} as const

export type ImageSizeKey = keyof typeof IMAGE_SIZES