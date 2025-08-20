'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
} from 'react'

// Context to determine if we're inside a MediaGroup
const MediaGroupContext = createContext(false)

// Header component for MediaGroup
function MediaGroupHeader({
  title,
  children,
  selectedIndex,
}: {
  title: string
  children: React.ReactNode
  selectedIndex: number
}) {
  const hasTabs = Children.count(children) > 1

  if (!title && !hasTabs) {
    return null
  }

  return (
    <div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-200 bg-zinc-50 px-4 dark:border-zinc-700 dark:bg-zinc-800">
      {title && (
        <h3 className="mr-auto pt-3 text-xs font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>
      )}
      {hasTabs && (
        <TabList className="-mb-px flex gap-4 text-xs font-medium">
          {Children.map(children, (child, childIndex) => {
            const label = isValidElement(child) 
              ? (child.props as any).label || `View ${childIndex + 1}`
              : `View ${childIndex + 1}`
            
            return (
              <Tab
                key={childIndex}
                className={clsx(
                  'border-b py-3 transition focus:outline-none',
                  childIndex === selectedIndex
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300',
                )}
              >
                {label}
              </Tab>
            )
          })}
        </TabList>
      )}
    </div>
  )
}

// Media panel for individual content
function MediaPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('relative bg-zinc-50 dark:bg-white/2.5', className)}>
      {children}
    </div>
  )
}

// MediaGroup panels wrapper
function MediaGroupPanels({
  children,
}: {
  children: React.ReactNode
}) {
  const hasTabs = Children.count(children) > 1

  if (hasTabs) {
    return (
      <TabPanels>
        {Children.map(children, (child) => (
          <TabPanel>
            <MediaPanel>{child}</MediaPanel>
          </TabPanel>
        ))}
      </TabPanels>
    )
  }

  return <MediaPanel>{children}</MediaPanel>
}

// Main MediaGroup component
export function MediaGroup({
  children,
  title,
  className,
}: {
  children: React.ReactNode
  title: string
  className?: string
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const hasTabs = Children.count(children) > 1

  const containerClassName = clsx(
    'my-6 overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-md dark:bg-zinc-900 dark:border-zinc-800 dark:ring-1 dark:ring-white/10',
    className
  )

  const header = (
    <MediaGroupHeader title={title} selectedIndex={selectedIndex}>
      {children}
    </MediaGroupHeader>
  )

  const panels = <MediaGroupPanels>{children}</MediaGroupPanels>

  return (
    <MediaGroupContext.Provider value={true}>
      {hasTabs ? (
        <TabGroup 
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          className={containerClassName}
        >
          <div className="not-prose">
            {header}
            {panels}
          </div>
        </TabGroup>
      ) : (
        <div className={containerClassName}>
          <div className="not-prose">
            {header}
            {panels}
          </div>
        </div>
      )}
    </MediaGroupContext.Provider>
  )
}

// Video component that works with MediaGroup
interface VideoProps {
  src: string
  label?: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  width?: number | string
  height?: number | string
  className?: string
}

export function Video({ 
  src, 
  label,
  poster, 
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  width,
  height,
  className 
}: VideoProps) {
  const isGrouped = useContext(MediaGroupContext)

  const videoElement = (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      className={clsx('w-full h-auto bg-black', className)}
      style={width || height ? {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      } : undefined}
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  )

  // If not in a group, wrap with MediaGroup
  if (!isGrouped && label) {
    return (
      <MediaGroup title={label}>
        {videoElement}
      </MediaGroup>
    )
  }

  return videoElement
}

// Image component that works with MediaGroup
interface MediaImageProps {
  src: string
  alt: string
  label?: string
  width?: number
  height?: number
  className?: string
}

export function MediaImage({ 
  src, 
  alt,
  label,
  width = 800, 
  height = 400, 
  className 
}: MediaImageProps) {
  const isGrouped = useContext(MediaGroupContext)

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={clsx('w-full h-auto', className)}
    />
  )

  // If not in a group, wrap with MediaGroup
  if (!isGrouped && label) {
    return (
      <MediaGroup title={label}>
        {imageElement}
      </MediaGroup>
    )
  }

  return imageElement
}