'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useScroll } from 'motion/react'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { AIBadge } from '@/components/ui/AIBadge'
import { NavigationChip } from '@/components/NavigationChip'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
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
  services: string[]
}

// Map legacy service strings to standardized skill names
const mapServiceToStandardizedSkills = (service: string): string[] => {
  const serviceMap: Record<string, string[]> = {
    // UX & Research Skills
    'Wireframes & Prototypes': ['Wireframing', 'Prototyping'], // Legacy support
    'Wireframing': ['Wireframing'],
    'Prototyping': ['Prototyping'],
    'Wireframes': ['Wireframing'],
    'Prototypes': ['Prototyping'],
    'User Research': ['User Research'],
    'UX Research': ['User Research'],
    'Information Architecture': ['UX Design Principles'],
    'Usability Testing': ['Usability Testing'],
    'Design Thinking': ['Design Thinking'],
    
    // Product Strategy Skills
    'Product Strategy': ['Product Vision'],
    'Product Vision': ['Product Vision'],
    'Feature Prioritization': ['Feature Prioritization'],
    'Product Discovery': ['Product Discovery'],
    'Product Analytics': ['Data Analytics & Metrics'],
    
    // Technical Skills
    'System Mapping': ['Systems Architecture'],
    'API Analysis': ['API & Integration Design'],
    'Technical Analysis': ['Technical Feasibility Analysis'],
    'Integration Design': ['API & Integration Design'],
    
    // Business & Analysis Skills
    'Business Analysis': ['Market Research & Analysis'],
    'Market Research': ['Market Research & Analysis'],
    'Competitive Analysis': ['Competitive Analysis'],
    'Go-to-Market Strategy': ['Go-to-Market Strategy'],
    
    // Data & Analytics Skills
    'Data Visualization': ['Data Analytics & Metrics'],
    'Analytics': ['Data Analytics & Metrics'],
    'A/B Testing': ['A/B Testing & Experimentation'],
    'Metrics': ['Data Analytics & Metrics'],
    
    // Collaboration Skills
    'Stakeholder Alignment': ['Stakeholder Management'],
    'Stakeholder Management': ['Stakeholder Management'],
    'Cross-functional Leadership': ['Cross-Functional Leadership'],
    'Communication': ['Communication'],
    
    // Delivery & Execution Skills
    'Project Management': ['Project Management'],
    'Agile Methodologies': ['Agile Methodologies'],
    'Requirements Definition': ['Requirements Definition'],
    'Release Planning': ['Release Planning'],
    
    // AI & Data Skills
    'AI Integration': ['Generative AI Integration'],
    'AI Strategy': ['AI Agent Design'],
    'Prompt Engineering': ['Prompt Engineering'],
    'Data-Driven Decisions': ['Data-Driven Decision Making']
  }
  
  return serviceMap[service] || [service] // Fallback to original if no mapping
}

// Parse date from timeline string to get end date for sorting
const parseTimelineEndDate = (timeline: string): Date => {
  // Handle different timeline formats
  if (timeline.includes('Present') || timeline.includes('Current')) {
    // For ongoing projects, use current date
    return new Date()
  } else if (timeline.includes('–') || timeline.includes('-')) {
    // Extract end date from range like "July 2018 – December 2019" or "January – June 2024"
    const parts = timeline.split(/[–-]/)
    const endDateStr = parts[parts.length - 1].trim()
    
    // Handle partial ranges like "January – June 2024"
    if (endDateStr.includes(' ')) {
      // Full month year format
      return new Date(endDateStr + ' 1') // Add day for proper parsing
    } else {
      // Just year or month
      return new Date(endDateStr)
    }
  } else {
    // Single date like "June 2023" or "2023"
    if (timeline.includes(' ')) {
      // Month year format - use end of month
      return new Date(timeline + ' 1')
    } else {
      // Just year - use end of year
      return new Date(timeline + '-12-31')
    }
  }
}

// Generate timeline data from case studies (reverse chronological order)
const getTimelineData = (): TimelineNode[] => {
  const caseStudies = getAllCaseStudies()
  
  const caseStudyNodes = caseStudies
    .sort((a, b) => {
      // First priority: Active/Ongoing projects at the top
      if (a.status === 'Ongoing' && b.status !== 'Ongoing') return -1
      if (b.status === 'Ongoing' && a.status !== 'Ongoing') return 1
      
      // For same status, sort by actual timeline dates (most recent first)
      const dateA = parseTimelineEndDate(a.timeline)
      const dateB = parseTimelineEndDate(b.timeline)
      return dateB.getTime() - dateA.getTime()
    })
    .map((study, index) => ({
      id: `node-${index + 1}`, // Start from 1 to leave 0 for Future Focus
      title: study.descriptiveTitle,
      client: study.client,
      period: study.timeline,
      description: study.description,
      link: `/case-studies/${study.slug}`,
      status: study.status,
      aiAccelerated: study.aiAccelerated,
      services: study.services
        .flatMap(service => mapServiceToStandardizedSkills(service))
        .slice(0, 4) // Limit to first 4 services for space
    }))

  // Add Future Focus entry at the top
  const futureFocusNode: TimelineNode = {
    id: 'node-0',
    title: 'Future Focus: AI-Driven Workflows',
    client: 'Innovation & Strategy',
    period: '2024 – Present',
    description: 'Exploring how AI tools can enhance product workflows, from automated user research synthesis to intelligent design systems and predictive analytics.',
    link: '#', // No link for future focus
    status: 'Ongoing',
    aiAccelerated: true,
    services: [] // No skill chips for future focus
  }

  return [futureFocusNode, ...caseStudyNodes]
}

export function Timeline() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)
  
  // Memoize timeline data to avoid recalculating on every render
  const timelineData = useMemo(() => getTimelineData(), [])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  // Refs for precise tracking
  const timelineRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  
  // Use scroll progress to determine active node based on beam position
  // Track the timeline container - TracingBeam will track its own wrapper
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end start"],
  })

  const registerNodeRef = useCallback((id: string, element: HTMLDivElement | null) => {
    nodeRefs.current[id] = element
  }, [])

  const registerTimelineRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      timelineRef.current = element
    }
  }, [])


  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(media.matches)
      const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      if (media.addEventListener) media.addEventListener('change', onChange)
      else media.addListener(onChange)
      return () => {
        if (media.removeEventListener) media.removeEventListener('change', onChange)
        else media.removeListener(onChange)
      }
    }
  }, [])

  // Calculate active node based on scroll progress (beam position)
  // Throttle updates to reduce re-renders on mobile
  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveNodeIndex(-1)
      return
    }

    let rafId: number | null = null
    let lastProgress = -1

    const updateActiveNode = (progress: number) => {
      // Throttle: only update if progress changed significantly (0.05 threshold)
      if (Math.abs(progress - lastProgress) < 0.05) return
      lastProgress = progress

      if (!timelineRef.current) return
      
      const total = timelineData.length
      if (total === 0) return
      
      // Calculate which node should be active based on scroll progress
      // Map progress (0-1) to node indices (0 to total-1)
      // Use a threshold approach: each node gets a portion of the scroll range
      const nodeProgress = progress * total
      const nodeIndex = Math.min(
        Math.floor(nodeProgress),
        total - 1
      )
      
      // Also consider the next node if we're close to it
      const remainder = nodeProgress - nodeIndex
      const finalIndex = remainder > 0.3 && nodeIndex < total - 1 
        ? nodeIndex + 1 
        : nodeIndex
      
      setActiveNodeIndex(finalIndex >= 0 ? finalIndex : -1)
    }

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Use requestAnimationFrame to batch updates
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        updateActiveNode(progress)
      })
    })

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      unsubscribe()
    }
  }, [prefersReducedMotion, timelineData.length, scrollYProgress])

  // Memoize neon colors to avoid recalculating
  const colorSchemes = useMemo(() => [
    { firstColor: '#10b981', secondColor: '#3b82f6' }, // emerald to blue
    { firstColor: '#3b82f6', secondColor: '#f43f5e' }, // blue to rose
    { firstColor: '#f43f5e', secondColor: '#a855f7' }, // rose to purple
    { firstColor: '#a855f7', secondColor: '#10b981' }, // purple to emerald
    { firstColor: '#10b981', secondColor: '#3b82f6' }, // emerald to blue
    { firstColor: '#3b82f6', secondColor: '#f43f5e' }, // blue to rose
    { firstColor: '#f43f5e', secondColor: '#a855f7' }, // rose to purple
  ], [])

  // Get neon colors for active nodes (cycling through gradient colors)
  const getNeonColors = useCallback((index: number) => {
    return colorSchemes[index % colorSchemes.length]
  }, [colorSchemes])

  return (
    <section className="relative">
      <div className="relative">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <Heading id="my-journey">My Journey</Heading>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mb-6 sm:mb-8 text-sm sm:text-base">
            A decade of building user-centered solutions across industries, 
            from startups to enterprise clients. Each role shaped my approach 
            to AI-powered product strategy.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 overflow-visible">
          <TracingBeam className="relative w-full">
            <div 
              className="space-y-16 relative"
              ref={registerTimelineRef}
            >
              {/* Timeline nodes */}
              <div className="space-y-10 sm:space-y-20 pl-12 sm:pl-16">
                {timelineData.map((node, index) => {
                  const isActive = activeNodeIndex === index
                  const neonColors = getNeonColors(index)
                  
                  // Node content
                  const nodeContent = (
                    <>
                      {/* Title header with status badge in top-right corner */}
                      <div className="relative mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white leading-tight pr-20 -mt-0.5">
                          {node.title}
                        </h3>
                        <span className={`absolute top-0 right-0 inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
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
                      
                      {/* Client and period */}
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium mb-3">
                        {node.client} • {node.period}
                      </p>
                      
                      {/* Description */}
                      <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                        {node.description}
                      </p>
                      
                      {/* Service/Skill chips */}
                      {node.services.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {node.services.map((service) => (
                            <NavigationChip 
                              key={service} 
                              skill={service}
                              size="sm"
                              variant="outline"
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Call-to-action and badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        {node.link !== '#' && (
                          <Link 
                            href={node.link}
                            className="inline-flex items-center text-sm font-semibold transition-all duration-300 hover:gap-2 group text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                          >
                            View Case Study 
                            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                          </Link>
                        )}
                        {node.aiAccelerated && (
                          <AIBadge size="sm">AI-Accelerated</AIBadge>
                        )}
                      </div>
                    </>
                  )
                  
                  return (
                    <div 
                      key={node.id}
                      className="relative transition-all duration-300"
                      ref={(el) => registerNodeRef(node.id, el)}
                      data-node-index={index}
                    >
                      {isActive ? (
                        <NeonGradientCard
                          className="transition-all duration-300 [&>div]:p-0"
                          borderRadius={12}
                          borderSize={2}
                          neonColors={neonColors}
                        >
                          <div className="bg-white dark:bg-zinc-800/30 rounded-[10px] p-6 relative z-20">
                            {nodeContent}
                          </div>
                        </NeonGradientCard>
                      ) : (
                        <div className="rounded-xl bg-white dark:bg-zinc-800/30 shadow-sm border border-zinc-200 dark:border-zinc-700 transition-all duration-300 p-6">
                          {nodeContent}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  )
}
