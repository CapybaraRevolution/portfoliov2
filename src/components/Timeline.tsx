'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { AIBadge } from '@/components/ui/AIBadge'
import { NavigationChip } from '@/components/NavigationChip'
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
    'Wireframes & Prototypes': ['Prototyping & Wireframing'],
    'Wireframes': ['Prototyping & Wireframing'],
    'Prototypes': ['Prototyping & Wireframing'],
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
  
  // Get timeline data from case studies
  const timelineData = getTimelineData()
  const [rainbowProgress, setRainbowProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Refs for precise tracking
  const timelineRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const lastScrollTime = useRef(Date.now())
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  const registerNodeRef = useCallback((id: string, element: HTMLDivElement | null) => {
    nodeRefs.current[id] = element
  }, [])

  const registerTimelineRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      timelineRef.current = element
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

      // Update scrolling state
      setScrollVelocity(velocity)
      setIsScrolling(velocity > 0.1)

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
        setScrollVelocity(0)
      }, 150)

      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight * 0.4 // Slightly above center for better feel
      
      // Calculate rainbow progress based on visible nodes
      let newActiveIndex = -1
      let newProgress = 0
      let closestDistance = Infinity
      
      const nodes = Object.entries(nodeRefs.current)
      
      for (let i = 0; i < nodes.length; i++) {
        const [, element] = nodes[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          const nodeCenter = rect.top + rect.height / 2
          const distance = Math.abs(nodeCenter - viewportCenter)
          
          // Check if this node is closest to the viewport center
          if (distance < closestDistance && rect.bottom > 0 && rect.top < viewportHeight) {
            closestDistance = distance
            newActiveIndex = i
            
            // Calculate progress based on how far through the visible nodes we are
            // Plus interpolation for smooth in-between states
            const nodeProgress = i / Math.max(1, nodes.length - 1)
            const interpolation = Math.max(0, Math.min(1, (viewportCenter - rect.top) / rect.height))
            newProgress = nodeProgress + (interpolation / nodes.length)
          }
        }
      }
      
      // Clamp progress and make it more responsive
      newProgress = Math.max(0, Math.min(1, newProgress))
      
      // Update states with immediate responsiveness
      setRainbowProgress(newProgress)
      setActiveNodeIndex(newActiveIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

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
              {/* Timeline line with responsive rainbow effect */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-700 rounded-full z-10">
                {/* Responsive rainbow gradient line */}
                <div 
                  className="absolute top-0 left-0 w-full rounded-full transition-all duration-200 ease-out z-20"
                  style={{ 
                    height: `${rainbowProgress * 100}%`,
                    background: rainbowProgress > 0 
                      ? 'linear-gradient(to bottom, rgb(16 185 129), rgb(59 130 246), rgb(244 63 94), rgb(168 85 247))' 
                      : 'transparent',
                    opacity: rainbowProgress > 0 ? 1 : 0
                  }}
                />
                {/* Responsive dot that follows progress */}
                {rainbowProgress > 0 && (
                  <div 
                    className="absolute -left-1 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-lg transition-all duration-200 ease-out z-30"
                    style={{ 
                      top: `${rainbowProgress * 100}%`,
                      transform: 'translateY(-50%)',
                      width: `${Math.max(16, Math.min(22, 16 + scrollVelocity * 1.5))}px`,
                      height: `${Math.max(16, Math.min(22, 16 + scrollVelocity * 1.5))}px`,
                      boxShadow: `0 0 ${Math.max(24, Math.min(36, 24 + scrollVelocity * 3))}px rgba(16, 185, 129, ${Math.max(0.4, Math.min(0.8, 0.4 + scrollVelocity * 0.1))})`
                    }}
                  />
                )}
              </div>
              
              {/* Timeline nodes */}
              <div className="space-y-20">
                {timelineData.map((node, index) => {
                  const colors = getNodeColors(index)
                  const isActive = activeNodeIndex === index
                  
                  return (
                    <div 
                      key={node.id}
                      className="relative transition-all duration-300 pl-16"
                      ref={(el) => registerNodeRef(node.id, el)}
                    >
                      {/* Timeline circle - absolutely positioned to align with line and text */}
                      <div className="absolute left-2 w-8 h-8 top-1/2 transform -translate-y-1/2 z-50">
                        {/* Glow rings for active node */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`absolute w-12 h-12 rounded-full ${colors.cardBg} animate-pulse opacity-60`} />
                            <div className={`absolute w-8 h-8 rounded-full ${colors.cardBg} animate-pulse opacity-40`} style={{ animationDelay: '0.5s' }} />
                          </div>
                        )}
                        
                        <div className={`w-8 h-8 rounded-full border-3 bg-white dark:bg-zinc-900 relative z-40 transition-all duration-300 ${
                          isActive
                            ? `${colors.border} ${colors.shadow} shadow-xl ${colors.bg} scale-110`
                            : 'border-zinc-300 dark:border-zinc-600 scale-100'
                        }`} />
                      </div>
                      
                      <div className={`rounded-xl transition-all duration-300 ${
                        isActive 
                          ? `${colors.cardBg} border ${colors.cardBorder} shadow-xl scale-105 translate-x-2` 
                          : 'bg-white dark:bg-zinc-800/30 shadow-md border border-zinc-200 dark:border-zinc-700 scale-100'
                      }`}>
                        {/* Title header - no top padding */}
                        <div className="flex items-start justify-between gap-4 px-6 py-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white leading-tight">
                              {node.title}
                            </h3>
                          </div>
                          <span className={`inline-flex items-center gap-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
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
                        
                        {/* Content section */}
                        <div className="px-6 pb-3 space-y-3">
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                            {node.client} • {node.period}
                          </p>
                          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {node.description}
                          </p>
                          {/* Service/Skill chips */}
                          {node.services.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {node.services.map((service) => (
                                <NavigationChip 
                                  key={service} 
                                  skill={service}
                                  size="sm"
                                />
                              ))}
                            </div>
                          )}
                          {/* Only show call-to-action for actual case studies */}
                          {node.link !== '#' && (
                            <div className="flex items-center justify-between pt-1">
                              <Link 
                                href={node.link}
                                className={`inline-flex items-center text-sm font-semibold transition-all duration-300 hover:gap-2 group ${
                                  isActive 
                                    ? 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300' 
                                    : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300'
                                }`}
                              >
                                View Case Study 
                                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                              </Link>
                              {node.aiAccelerated && (
                                <AIBadge size="sm">AI-Accelerated</AIBadge>
                              )}
                            </div>
                          )}
                          
                          {/* For Future Focus, just show AI badge if applicable */}
                          {node.link === '#' && node.aiAccelerated && (
                            <div className="pt-1">
                              <AIBadge size="sm">AI-Accelerated</AIBadge>
                            </div>
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