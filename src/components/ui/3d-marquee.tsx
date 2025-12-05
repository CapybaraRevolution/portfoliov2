'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

type ThreeDMarqueeProps = {
  images: string[]
  className?: string
  speedSeconds?: number
}

export function ThreeDMarquee({
  images,
  className,
  speedSeconds = 28,
}: ThreeDMarqueeProps) {
  const shouldReduceMotion = useReducedMotion()
  const reel = [...images, ...images] // duplicate to avoid gaps during loop

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/40 via-white/20 to-white/10 p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] dark:border-emerald-900/40 dark:from-emerald-950/50 dark:via-emerald-900/20 dark:to-emerald-950/40',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-emerald-500/5" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="relative h-full overflow-hidden">
        <motion.div
          className="flex h-full items-center gap-6"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: ['0%', '-50%'] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  repeat: Infinity,
                  ease: 'linear',
                  duration: speedSeconds,
                }
          }
        >
          {reel.map((src, index) => (
            <MarqueeCard key={`${src}-${index}`} src={src} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function MarqueeCard({ src }: { src: string }) {
  return (
    <div className="group relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_25px_60px_-32px_rgba(0,0,0,0.65)] dark:border-emerald-900/40 dark:bg-emerald-900/40 dark:ring-emerald-800/40">
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-emerald-100/30 opacity-0 transition duration-500 group-hover:opacity-100 dark:from-white/5 dark:to-emerald-600/15" />
      <div className="absolute -left-12 -top-12 h-24 w-24 rotate-45 bg-emerald-400/15 blur-3xl transition duration-500 group-hover:translate-y-4 group-hover:scale-110 dark:bg-emerald-500/10" />
      <Image
        src={src}
        alt=""
        fill
        sizes="288px"
        className="h-full w-full object-cover"
        priority={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-black/30" />
    </div>
  )
}
