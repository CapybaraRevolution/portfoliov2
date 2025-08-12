'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

interface TimelineNode {
  id: string
  title: string
  company: string
  period: string
  description: string
  link: string
  linkText: string
}

const timelineData: TimelineNode[] = [
  {
    id: 'node-0',
    title: 'Senior UX Designer / Business Analyst',
    company: 'Jigsaw Technologies (Open Theater / Tessitura)',
    period: '2024–Present',
    description: 'Stakeholder discovery and IA for complex ticketing workflows; clarified requirements and de-risked delivery.',
    link: '/case-studies/ecommerce',
    linkText: 'View project(s)'
  },
  {
    id: 'node-1',
    title: 'Product Designer',
    company: 'Breeze Mortgage Hub',
    period: '2024–Present',
    description: 'Audits → clickable prototypes → component system; sharpened vision and de-risked roadmap for funding.',
    link: '/case-studies/fintech',
    linkText: 'View project(s)'
  },
  {
    id: 'node-2',
    title: 'Senior UX Strategist',
    company: 'Briteweb (BC Cancer Foundation; Social Finance Fund)',
    period: '2023–Present',
    description: 'IA + forms redesign; stakeholder alignment; clearer donor and ops flows prepared for dev.',
    link: '/case-studies/saas',
    linkText: 'View project(s)'
  },
  {
    id: 'node-3',
    title: 'Senior UX Designer (Contract)',
    company: 'Cornell SC Johnson College of Business',
    period: '2023–2024',
    description: 'Modular patterns for hierarchical content; accessible system and scalable IA.',
    link: '/case-studies/healthcare',
    linkText: 'View project(s)'
  },
  {
    id: 'node-4',
    title: 'Senior UX Designer (Contract)',
    company: 'AMFA Class Filters',
    period: '2024–2025',
    description: 'Reworked filter architecture and labeling; simpler program selection.',
    link: '/case-studies/ecommerce',
    linkText: 'View project(s)'
  },
  {
    id: 'node-5',
    title: 'UX Lead',
    company: 'Navigator Games',
    period: '2021–2023',
    description: 'Built UX pipeline and data instrumentation; faster releases and cleaner handoffs.',
    link: '/services',
    linkText: 'View project(s)'
  },
  {
    id: 'node-6',
    title: 'Forward Focus',
    company: '',
    period: '2025→',
    description: 'AI-first product ops: research synthesis, IA variants, instrumentation-by-default, model-backed UX.',
    link: '/services#my-process',
    linkText: 'Process → AI Assists'
  }
]

export function Timeline() {
  const router = useRouter()
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)
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
      
      // Calculate velocity using refs (no setState in scroll handler)
      const deltaTime = currentTime - lastScrollTime.current
      const deltaY = currentScrollY - lastScrollY.current
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0
      
      lastScrollTime.current = currentTime
      lastScrollY.current = currentScrollY
      currentVelocityRef.current = velocity

      // High refresh rate updates (every ~8ms for 120fps buttery feel)
      if (currentTime - lastUpdateTime.current > 8) {
        setScrollVelocity(velocity)
        setIsScrolling(true)
        lastUpdateTime.current = currentTime
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set timeout to detect when scrolling stops (longer for buttery settling)
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
        setScrollVelocity(0)
        currentVelocityRef.current = 0
      }, 250)

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const timelineHeight = timelineRect.height
      
      // Calculate base progress using refs
      const baseProgress = Math.max(0, Math.min(1, 
        (viewportHeight - timelineRect.top) / (viewportHeight + timelineHeight)
      ))

      baseProgressRef.current = baseProgress
      setMaxProgress(baseProgress)

      // Start animation if not already running
      if (!animationFrame.current) {
        animate()
      }

      // Determine active node
      let newActiveIndex = -1
      let closestDistance = Infinity
      const nodes = Object.entries(nodeRefs.current)
      
      for (let i = 0; i < nodes.length; i++) {
        const [, element] = nodes[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          const centerY = rect.top + rect.height / 2
          const targetY = viewportHeight * 0.5
          const distance = Math.abs(centerY - targetY)
          
          if (rect.bottom > 0 && rect.top < viewportHeight) {
            if (distance < closestDistance) {
              closestDistance = distance
              newActiveIndex = i
            }
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
        <div className="max-w-4xl mx-auto">
            <div 
              className="space-y-8 relative"
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
                {/* Super Buttery Lightning point with dramatic velocity response */}
                {lightningProgress > 0 && (
                  <div 
                    className="absolute -left-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg transition-all motion-reduce:transition-none"
                    style={{ 
                      top: `${maxProgress * 100}%`,
                      transform: `translateY(-50%) ${!isScrolling ? 'scale(1.2)' : 'scale(1)'}`,
                      width: `${Math.max(10, Math.min(28, 10 + scrollVelocity * 4))}px`,
                      height: `${Math.max(10, Math.min(28, 10 + scrollVelocity * 4))}px`,
                      boxShadow: `0 0 ${Math.max(15, Math.min(60, 15 + scrollVelocity * 8))}px rgba(16, 185, 129, ${Math.max(0.4, Math.min(1, 0.4 + scrollVelocity * 0.15))})`,
                      animation: !isScrolling ? 'timeline-bob 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                      transition: isScrolling 
                        ? 'all 0.05s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                        : 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  />
                )}
              </div>
              
              {/* Timeline nodes */}
              <div className="space-y-12">
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
                            <div className={`absolute w-10 h-10 rounded-full ${colors.cardBg} animate-pulse`} />
                            <div className={`absolute w-8 h-8 rounded-full ${colors.cardBg} animate-pulse`} style={{ animationDelay: '0.5s' }} />
                          </div>
                        )}
                        
                        <div className={`w-6 h-6 rounded-full border-2 bg-white dark:bg-zinc-900 relative z-10 transition-all duration-300 ${
                          isActive
                            ? `${colors.border} ${colors.shadow} shadow-xl ${colors.bg}`
                            : 'border-zinc-300 dark:border-zinc-600'
                        }`} />
                      </div>
                      
                      <div className={`flex-1 space-y-2 pb-6 rounded-lg px-4 py-3 transition-all duration-500 ${
                        isActive 
                          ? `${colors.cardBg} border ${colors.cardBorder} shadow-lg scale-105` 
                          : 'bg-white dark:bg-zinc-800/50 shadow-sm border border-zinc-200 dark:border-zinc-700'
                      }`}>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {node.title}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {node.company} {node.company && '•'} {node.period}
                          </p>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                          {node.description}
                        </p>
                        <Link 
                          href={node.link}
                          className={`inline-flex items-center text-sm font-medium transition-colors duration-300 ${
                            isActive 
                              ? 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300' 
                              : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300'
                          }`}
                        >
                          {node.linkText} →
                        </Link>
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