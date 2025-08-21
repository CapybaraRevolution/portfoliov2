'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { AIBadge } from '@/components/ui/AIBadge'
import { getAllCaseStudies } from '@/lib/caseStudies'

interface TimelineNode {
  id: string
  title: string
  client: string
  period: string
  description: string
  link: string
  status: 'Ongoing' | 'Completed'
  aiAccelerated?: boolean
}

// Generate timeline data from case studies (reverse chronological order)
const getTimelineData = (): TimelineNode[] => {
  const caseStudies = getAllCaseStudies()
  
  return caseStudies
    .sort((a, b) => b.order - a.order) // Reverse chronological (higher order = more recent)
    .map((study, index) => ({
      id: `node-${index}`,
      title: study.descriptiveTitle,
      client: study.client,
      period: study.timeline,
      description: study.description,
      link: `/case-studies/${study.slug}`,
      status: study.status,
      aiAccelerated: study.aiAccelerated
    }))
}

export function Timeline() {
  const router = useRouter()
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)
  
  // Get timeline data from case studies
  const timelineData = getTimelineData()
  const [lightningProgress, setLightningProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Refs for animation tracking (no re-renders)
  const timelineRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const lastScrollTime = useRef(Date.now())
  const lastScrollY = useRef(0)
  const animationFrame = useRef<number | undefined>(undefined)
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const lightningProgressRef = useRef(0)
  const baseProgressRef = useRef(0)
  const currentVelocityRef = useRef(0)
  const lastUpdateTime = useRef(0)

  const registerNodeRef = useCallback((id: string, element: HTMLDivElement | null) => {
    nodeRefs.current[id] = element
  }, [])

  const registerTimelineRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      timelineRef.current = element
    }
  }, [])

  // Super buttery animation function with organic momentum
  const animate = useCallback(() => {
    const diff = baseProgressRef.current - lightningProgressRef.current
    
    // Much looser smoothing for buttery feel (was 0.15-0.3, now 0.03-0.08)
    const velocity = currentVelocityRef.current
    let smoothing = velocity > 1 ? 0.08 : 0.03  // Even looser for momentum
    
    // Add slight overshoot for very fast scrolling
    if (velocity > 5) {
      smoothing = 0.12 // More responsive for fast scroll
    }
    
    lightningProgressRef.current += diff * smoothing
    
    // Update React state for rendering
    setLightningProgress(lightningProgressRef.current)
    
    // Keep animating much longer (was 0.001, now 0.02 for more flow)
    if (Math.abs(diff) > 0.02) {
      animationFrame.current = requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const currentTime = Date.now()
      const currentScrollY = window.scrollY
      
      // Calculate velocity for animation effects
      const deltaTime = currentTime - lastScrollTime.current
      const deltaY = currentScrollY - lastScrollY.current
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0
      
      lastScrollTime.current = currentTime
      lastScrollY.current = currentScrollY
      currentVelocityRef.current = velocity

      // Update velocity state for animations
      if (currentTime - lastUpdateTime.current > 8) {
        setScrollVelocity(velocity)
        setIsScrolling(true)
        lastUpdateTime.current = currentTime
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
        setScrollVelocity(0)
        currentVelocityRef.current = 0
      }, 150)

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const timelineStart = timelineRect.top
      const timelineEnd = timelineRect.bottom
      const timelineHeight = timelineRect.height
      
      // More accurate progress calculation
      let progress = 0
      
      if (timelineStart > viewportHeight) {
        // Timeline hasn't entered viewport yet
        progress = 0
      } else if (timelineEnd < 0) {
        // Timeline has completely passed
        progress = 1
      } else {
        // Timeline is in viewport - calculate progress based on how much has scrolled past
        const scrolledPastTop = Math.max(0, -timelineStart)
        const maxScrollDistance = timelineHeight + viewportHeight
        progress = Math.min(1, scrolledPastTop / maxScrollDistance)
      }

      baseProgressRef.current = progress
      setMaxProgress(progress)

      // Start smooth animation
      if (!animationFrame.current) {
        animate()
      }

      // Find active node based on viewport center
      let newActiveIndex = -1
      let closestDistance = Infinity
      const viewportCenter = viewportHeight * 0.5
      const nodes = Object.entries(nodeRefs.current)
      
      for (let i = 0; i < nodes.length; i++) {
        const [, element] = nodes[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          const nodeCenter = rect.top + rect.height / 2
          const distance = Math.abs(nodeCenter - viewportCenter)
          
          // Only consider nodes that are at least partially visible
          if (rect.bottom > 0 && rect.top < viewportHeight && distance < closestDistance) {
            closestDistance = distance
            newActiveIndex = i
          }
        }
      }

      setActiveNodeIndex(newActiveIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
        animationFrame.current = undefined
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [animate])

  const getNodeColors = (index: number) => {
    const colorSchemes = [
      { 
        border: 'border-emerald-500', 
        shadow: 'shadow-emerald-500/60 dark:shadow-emerald-500/40', 
        bg: 'bg-gradient-to-br from-emerald-500/30 to-blue-500/20', 
        cardBg: 'bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/5 dark:to-blue-500/5', 
        cardBorder: 'border-emerald-500/30 dark:border-emerald-500/20' 
      },
      { 
        border: 'border-blue-500', 
        shadow: 'shadow-blue-500/60 dark:shadow-blue-500/40', 
        bg: 'bg-gradient-to-br from-blue-500/30 to-rose-500/20', 
        cardBg: 'bg-gradient-to-br from-blue-500/10 to-rose-500/10 dark:from-blue-500/5 dark:to-rose-500/5', 
        cardBorder: 'border-blue-500/30 dark:border-blue-500/20' 
      },
      { 
        border: 'border-rose-500', 
        shadow: 'shadow-rose-500/60 dark:shadow-rose-500/40', 
        bg: 'bg-gradient-to-br from-rose-500/30 to-purple-500/20', 
        cardBg: 'bg-gradient-to-br from-rose-500/10 to-purple-500/10 dark:from-rose-500/5 dark:to-purple-500/5', 
        cardBorder: 'border-rose-500/30 dark:border-rose-500/20' 
      },
      { 
        border: 'border-purple-500', 
        shadow: 'shadow-purple-500/60 dark:shadow-purple-500/40', 
        bg: 'bg-gradient-to-br from-purple-500/30 to-emerald-500/20', 
        cardBg: 'bg-gradient-to-br from-purple-500/10 to-emerald-500/10 dark:from-purple-500/5 dark:to-emerald-500/5', 
        cardBorder: 'border-purple-500/30 dark:border-purple-500/20' 
      },
      { 
        border: 'border-emerald-500', 
        shadow: 'shadow-emerald-500/60 dark:shadow-emerald-500/40', 
        bg: 'bg-gradient-to-br from-emerald-500/30 to-blue-500/20', 
        cardBg: 'bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/5 dark:to-blue-500/5', 
        cardBorder: 'border-emerald-500/30 dark:border-emerald-500/20' 
      },
      { 
        border: 'border-blue-500', 
        shadow: 'shadow-blue-500/60 dark:shadow-blue-500/40', 
        bg: 'bg-gradient-to-br from-blue-500/30 to-rose-500/20', 
        cardBg: 'bg-gradient-to-br from-blue-500/10 to-rose-500/10 dark:from-blue-500/5 dark:to-rose-500/5', 
        cardBorder: 'border-blue-500/30 dark:border-blue-500/20' 
      },
      { 
        border: 'border-rose-500', 
        shadow: 'shadow-rose-500/60 dark:shadow-rose-500/40', 
        bg: 'bg-gradient-to-br from-rose-500/30 to-purple-500/20', 
        cardBg: 'bg-gradient-to-br from-rose-500/10 to-purple-500/10 dark:from-rose-500/5 dark:to-purple-500/5', 
        cardBorder: 'border-rose-500/30 dark:border-rose-500/20' 
      }
    ]
    return colorSchemes[index % colorSchemes.length]
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative">
        {/* Section Header */}
        <div className="mb-16">
          <Heading id="my-journey">My Journey</Heading>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mb-8">
            A decade of building user-centered solutions across industries, 
            from startups to enterprise clients. Each role shaped my approach 
            to AI-powered product strategy.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              href="/services#my-process"
              className="group"
            >
              Learn More
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
            <Button 
              href="/services"
              className="group"
            >
              View Services
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-6">
            <div 
              className="space-y-16 relative"
              ref={registerTimelineRef}
            >
              {/* Timeline line with lightning effect */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-600">
                {/* Super smooth gradient line with organic flow */}
                <div 
                  className="absolute top-0 left-0 w-full transition-all duration-[1400ms] ease-out motion-reduce:duration-300"
                  style={{ 
                    height: `${maxProgress * 100}%`,
                    background: maxProgress > 0 
                      ? 'linear-gradient(to bottom, rgb(16 185 129), rgb(59 130 246), rgb(244 63 94), rgb(168 85 247))' 
                      : 'transparent',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                />
                {/* Smooth blue dot that follows active element */}
                {maxProgress > 0 && (
                  <div 
                    className="absolute -left-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg transition-all motion-reduce:transition-none"
                    style={{ 
                      top: `${maxProgress * 100}%`,
                      transform: `translateY(-50%) ${!isScrolling ? 'scale(1.15)' : 'scale(1)'}`,
                      width: `${Math.max(12, Math.min(20, 12 + scrollVelocity * 2))}px`,
                      height: `${Math.max(12, Math.min(20, 12 + scrollVelocity * 2))}px`,
                      boxShadow: `0 0 ${Math.max(20, Math.min(40, 20 + scrollVelocity * 4))}px rgba(16, 185, 129, ${Math.max(0.6, Math.min(0.9, 0.6 + scrollVelocity * 0.1))})`,
                      transition: isScrolling 
                        ? 'all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                        : 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  />
                )}
              </div>
              
              {/* Timeline nodes */}
              <div className="space-y-14">
                {timelineData.map((node, index) => {
                  const colors = getNodeColors(index)
                  const isActive = activeNodeIndex === index
                  
                  return (
                    <div 
                      key={node.id}
                      className="relative flex gap-6 transition-all duration-500"
                      ref={(el) => registerNodeRef(node.id, el)}
                    >
                      {/* Timeline circle */}
                      <div className="relative w-6 h-6 flex-shrink-0">
                        {/* Glow rings for active node */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`absolute w-8 h-8 rounded-full ${colors.cardBg} animate-pulse`} />
                            <div className={`absolute w-6 h-6 rounded-full ${colors.cardBg} animate-pulse`} style={{ animationDelay: '0.5s' }} />
                          </div>
                        )}
                        
                        <div className={`w-6 h-6 rounded-full border-2 bg-white dark:bg-zinc-900 relative z-10 transition-all duration-300 ${
                          isActive
                            ? `${colors.border} ${colors.shadow} shadow-xl ${colors.bg}`
                            : 'border-zinc-300 dark:border-zinc-600'
                        }`} />
                      </div>
                      
                      <div className={`flex-1 space-y-3 pb-6 rounded-lg px-4 py-3 transition-all duration-500 ${
                        isActive 
                          ? `${colors.cardBg} border ${colors.cardBorder} shadow-lg scale-103` 
                          : 'bg-white dark:bg-zinc-800/50 shadow-sm border border-zinc-200 dark:border-zinc-700'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                              {node.title}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              {node.client} • {node.period}
                            </p>
                          </div>
                          <span className={`inline-flex items-center gap-x-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                            node.status === 'Ongoing' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}>
                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-1.5 ${
                              node.status === 'Ongoing' 
                                ? 'fill-emerald-500 animate-pulse' 
                                : 'fill-zinc-400'
                            }`}>
                              <circle r={3} cx={3} cy={3} />
                            </svg>
                            {node.status}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                          {node.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link 
                            href={node.link}
                            className={`inline-flex items-center text-sm font-medium transition-colors duration-300 ${
                              isActive 
                                ? 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300' 
                                : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300'
                            }`}
                          >
                            View Case Study →
                          </Link>
                          {node.aiAccelerated && (
                            <AIBadge size="sm">AI-Accelerated</AIBadge>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}