import Image from 'next/image'
import clsx from 'clsx'
import { 
  InformationCircleIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/20/solid'

// Section component with Protocol-style dividers
interface SectionProps {
  title?: string
  id?: string
  children: React.ReactNode
  className?: string
}

export function Section({ title, id, children, className }: SectionProps) {
  return (
    <section id={id} className={clsx('my-12', className)}>
      {title && (
        <>
          <div className="border-t border-zinc-200 dark:border-zinc-700 mb-8" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            {title}
          </h2>
        </>
      )}
      {children}
      <div className="border-t border-zinc-200 dark:border-zinc-700 mt-8" />
    </section>
  )
}

// Responsive Grid component
interface GridProps {
  cols?: 1 | 2 | 3
  children: React.ReactNode
  className?: string
}

export function Grid({ cols = 2, children, className }: GridProps) {
  return (
    <div
      className={clsx(
        'grid gap-6',
        {
          'grid-cols-1': cols === 1,
          'grid-cols-1 md:grid-cols-2': cols === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

// Callout component with variants
interface CalloutProps {
  variant?: 'info' | 'success' | 'warn' | 'danger'
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({ 
  variant = 'info', 
  title, 
  children, 
  className 
}: CalloutProps) {
  const variants = {
    info: {
      container: 'bg-sky-50 border-sky-200 dark:bg-sky-900/20 dark:border-sky-800',
      icon: <InformationCircleIcon className="h-5 w-5 text-sky-500" />,
      title: 'text-sky-800 dark:text-sky-300',
      content: 'text-sky-700 dark:text-sky-200'
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800',
      icon: <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
      title: 'text-emerald-800 dark:text-emerald-300',
      content: 'text-emerald-700 dark:text-emerald-200'
    },
    warn: {
      container: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
      icon: <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />,
      title: 'text-amber-800 dark:text-amber-300',
      content: 'text-amber-700 dark:text-amber-200'
    },
    danger: {
      container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
      title: 'text-red-800 dark:text-red-300',
      content: 'text-red-700 dark:text-red-200'
    }
  }

  const config = variants[variant]

  return (
    <div
      className={clsx(
        'rounded-lg border p-4 my-6',
        config.container,
        className
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={clsx('font-medium mb-2', config.title)}>
              {title}
            </h4>
          )}
          <div className={clsx('text-sm', config.content)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat component
interface StatProps {
  label: string
  value: string
  note?: string
  className?: string
}

export function Stat({ label, value, note, className }: StatProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 text-center',
        className
      )}
    >
      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
        {value}
      </div>
      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
        {label}
      </div>
      {note && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {note}
        </div>
      )}
    </div>
  )
}

// Figure component with caption
interface FigureProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
}

export function Figure({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 400, 
  className 
}: FigureProps) {
  return (
    <figure className={clsx('my-8', className)}>
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-zinc-600 dark:text-zinc-400 text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Video component
interface VideoProps {
  src: string
  caption?: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  inline?: boolean
  width?: number | string
  height?: number | string
  className?: string
}

export function Video({ 
  src, 
  caption, 
  poster, 
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  inline = false,
  width,
  height,
  className 
}: VideoProps) {
  const videoElement = (
    <div className="group my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
      {/* Clean header like Protocol code blocks */}
      {caption && (
        <div className="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
          <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
            {caption}
          </h3>
        </div>
      )}
      
      {/* Video content */}
      <div className="relative dark:bg-white/2.5">
        <video
          src={src}
          poster={poster}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          className={clsx(
            'w-full h-auto bg-black',
            {
              'max-w-none': inline
            }
          )}
          style={width || height ? {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height
          } : undefined}
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )

  if (inline) {
    return (
      <span className={clsx('inline-block align-middle mx-2', className)}>
        {videoElement}
      </span>
    )
  }

  return (
    <figure className={clsx('my-8', className)}>
      {videoElement}
    </figure>
  )
}

// CaseImage component (alias for Figure with case study styling)
interface CaseImageProps {
  src: string
  alt: string
  variant?: 'hero' | 'default' | 'logo'
  caption?: string
  width?: number
  height?: number
  className?: string
}

export function CaseImage({ 
  src, 
  alt, 
  variant = 'default',
  caption, 
  width = 800, 
  height = 400, 
  className 
}: CaseImageProps) {
  // For logo variant, use flexible sizing to preserve aspect ratio
  const isLogo = variant === 'logo'
  
  // For logos, we'll use a reasonable default size but let Next.js handle optimization
  const imageWidth = isLogo ? 600 : width
  const imageHeight = isLogo ? 300 : height

  return (
    <figure className={clsx(
      'my-8',
      {
        'my-12': variant === 'hero',
        'my-4': variant === 'logo'
      },
      className
    )}>
      {variant === 'logo' ? (
        // Half-width logo aligned left for content flow
        <div className="py-6">
          <Image
            src={src}
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            className="h-auto w-full max-w-md object-contain"
            style={{ maxWidth: '50%', height: 'auto' }}
            priority
          />
        </div>
      ) : (
        // Original container for hero and default images
        <div className="group my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
          {/* Clean header like Protocol code blocks */}
          {caption && (
            <div className="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
              <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
                {caption}
              </h3>
            </div>
          )}
          
          {/* Image content */}
          <div className="relative dark:bg-white/2.5">
            <Image
              src={src}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              className={clsx(
                'w-full h-auto',
                {
                  'max-w-none': variant === 'hero'
                }
              )}
            />
          </div>
        </div>
      )}
    </figure>
  )
}

// CaseMetric component for displaying metrics
interface CaseMetricProps {
  label: string
  value: string
  context?: string
  className?: string
}

export function CaseMetric({ label, value, context, className }: CaseMetricProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6',
        className
      )}
    >
      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
        {value}
      </div>
      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
        {label}
      </div>
      {context && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {context}
        </div>
      )}
    </div>
  )
}