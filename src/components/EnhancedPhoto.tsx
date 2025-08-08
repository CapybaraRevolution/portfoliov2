'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { GridPattern } from '@/components/GridPattern'

interface EnhancedPhotoProps {
  src: any
  alt: string
  width: number
  height: number
}

function ElectricalPattern({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Base Grid Pattern */}
      <div className="absolute inset-0 rounded-2xl mask-[linear-gradient(white,transparent)] opacity-20">
        <GridPattern
          width={32}
          height={32}
          x="50%"
          y="50%"
          className="absolute inset-x-0 inset-y-[-20%] h-[140%] w-full skew-y-[-12deg] fill-emerald-500/10 stroke-emerald-500/20 dark:fill-emerald-400/5 dark:stroke-emerald-400/10"
          squares={[
            [1, 1], [3, 2], [2, 4], [4, 3], [0, 2], [2, 0], [4, 1], [1, 3]
          ]}
        />
      </div>
      
      {/* Interactive Electrical Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-blue-500/15 to-purple-500/20 opacity-0 transition duration-500 group-hover:opacity-100 dark:from-emerald-400/15 dark:via-blue-400/10 dark:to-purple-400/15"
        style={style}
      />
      
      {/* Sparkling Grid Overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={16}
          height={16}
          x="50%"
          y="50%"
          className="absolute inset-x-0 inset-y-[-10%] h-[120%] w-full fill-white/20 stroke-white/40 dark:fill-emerald-400/20 dark:stroke-emerald-400/30"
          squares={[
            [2, 1], [1, 2], [3, 3], [0, 1], [2, 3], [1, 0], [3, 2], [0, 3]
          ]}
        />
      </motion.div>
    </div>
  )
}

function LightningTraces() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      viewBox="0 0 320 400"
      aria-hidden="true"
    >
      {/* Lightning traces around the photo */}
      <path
        d="M50 50 L80 120 L60 180 L90 240 L70 300"
        fill="none"
        stroke="url(#lightning-gradient)"
        strokeWidth="1"
        strokeDasharray="4 8"
        className="opacity-60"
        style={{
          animation: 'lightning-trace 3s ease-in-out infinite',
          animationDelay: '0s'
        }}
      />
      <path
        d="M270 80 L240 140 L260 200 L230 280 L250 350"
        fill="none"
        stroke="url(#lightning-gradient)"
        strokeWidth="1"
        strokeDasharray="4 8"
        className="opacity-60"
        style={{
          animation: 'lightning-trace 3s ease-in-out infinite',
          animationDelay: '1s'
        }}
      />
      <path
        d="M160 20 L180 100 L140 160 L170 240 L150 320"
        fill="none"
        stroke="url(#lightning-gradient)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
        className="opacity-40"
        style={{
          animation: 'lightning-trace 4s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
      
      <defs>
        <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="rgb(59 130 246)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(168 85 247)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function FloatingParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.8,
    size: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `electrical-sparkle 2s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export function EnhancedPhoto({ src, alt, width, height }: EnhancedPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div 
      ref={containerRef}
      className="group relative"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassy Backdrop Layers */}
      <div className="absolute -inset-8 rounded-3xl backdrop-blur-xs bg-gradient-to-br from-white/10 via-emerald-50/20 to-blue-50/10 dark:from-zinc-900/20 dark:via-emerald-900/10 dark:to-blue-900/5 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
      
      {/* Pulsing Aura Rings */}
      <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-purple-500/20 opacity-40 transition-all duration-1000" 
           style={{ 
             animation: 'aura-pulse 4s ease-in-out infinite',
             animationDelay: '0s'
           }} />
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-emerald-500/15 opacity-30 transition-all duration-1000" 
           style={{ 
             animation: 'aura-pulse 4s ease-in-out infinite',
             animationDelay: '1s'
           }} />
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-purple-500/10 via-emerald-500/5 to-blue-500/10 opacity-20 transition-all duration-1000" 
           style={{ 
             animation: 'aura-pulse 4s ease-in-out infinite',
             animationDelay: '2s'
           }} />

      {/* Lightning Traces */}
      <LightningTraces />
      
      {/* Floating Electrical Particles */}
      <FloatingParticles />
      
      {/* Main Photo Container */}
      <div className="relative">
        {/* Electrical Pattern Overlay */}
        <ElectricalPattern mouseX={mouseX} mouseY={mouseY} />
        
        {/* Photo with Enhanced Styling */}
        <motion.div
          className="relative overflow-hidden rounded-2xl ring-1 ring-zinc-900/10 dark:ring-white/10 transition-all duration-700"
          style={{
            animation: 'photo-breathe 6s ease-in-out infinite',
            boxShadow: isHovered 
              ? '0 20px 40px rgb(16 185 129 / 0.3), 0 0 80px rgb(59 130 246 / 0.2), inset 0 0 40px rgb(168 85 247 / 0.1)' 
              : '0 10px 30px rgb(0 0 0 / 0.1), 0 4px 20px rgb(16 185 129 / 0.1)'
          }}
        >
          {/* Glassy Inner Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 via-emerald-50/30 to-blue-50/40 dark:from-white/5 dark:via-emerald-900/10 dark:to-blue-900/5" />
          
          {/* Main Image */}
          <Image
            src={src}
            alt={alt}
            className="relative z-10 object-cover transition-all duration-700 group-hover:scale-[1.02]"
            priority
            placeholder="blur"
            width={width}
            height={height}
            style={{ width, height }}
          />
          
          {/* Subtle Overlay for Integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-zinc-900/5 mix-blend-overlay" />
        </motion.div>
      </div>
    </div>
  )
}