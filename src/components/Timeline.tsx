'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { AIBadge } from '@/components/ui/AIBadge'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { getAllCaseStudies } from '@/lib/caseStudies'

const TracingBeam = dynamic(
  () => import('@/components/ui/tracing-beam').then(mod => mod.TracingBeam),
  { ssr: false, loading: () => <div className="relative w-full" /> }
)

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

function ServiceBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-emerald-100/80 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
      {label}
    </span>
  )
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
  const timelineData = useMemo(() => getTimelineData(), [])
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [shouldRenderBeam, setShouldRenderBeam] = useState(false)
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([])

  // Respect prefers-reduced-motion to avoid unnecessary work on low-powered devices
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    setPrefersReducedMotion(media.matches)

    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
    } else {
      media.addListener(handleChange)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handleChange)
      } else {
        media.removeListener(handleChange)
      }
    }
  }, [])

  // Store observer in a ref so it persists across renders
  const observerRef = useRef<IntersectionObserver | null>(null)
  const visibleNodesRef = useRef<Map<number, number>>(new Map())
  const rafIdRef = useRef<number | null>(null)

  // Lazily highlight cards based on which ones are actually visible instead of tracking scroll position every frame.
  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveNodeIndex(-1)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      return
    }

    // Detect mobile to use simpler intersection observer settings
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Use requestAnimationFrame to batch updates and reduce work on mobile
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
        }
        
        rafIdRef.current = requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const index = Number(
              (entry.target as HTMLElement).dataset.nodeIndex ?? -1
            )
            if (Number.isNaN(index) || index < 0) {
              return
            }

            if (entry.isIntersecting) {
              visibleNodesRef.current.set(index, entry.intersectionRatio)
            } else {
              visibleNodesRef.current.delete(index)
            }
          })

          if (!visibleNodesRef.current.size) {
            setActiveNodeIndex(-1)
            return
          }

          const [nextIndex] = [...visibleNodesRef.current.entries()].sort(
            (a, b) => b[1] - a[1]
          )[0]

          setActiveNodeIndex(nextIndex)
        })
      },
      {
        // Simpler settings for mobile to reduce computation
        rootMargin: isMobile ? '-5% 0px -20% 0px' : '-10% 0px -35% 0px',
        threshold: isMobile ? [0.3] : [0.25, 0.4, 0.6],
      }
    )

    observerRef.current = observer

    // Observe all current nodes
    nodeRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      visibleNodesRef.current.clear()
    }
  }, [prefersReducedMotion, timelineData.length])

  // Register node refs and observe them as they're added
  const registerNodeRef = useCallback((index: number, element: HTMLDivElement | null) => {
    nodeRefs.current[index] = element
    
    // Observe the element if observer exists and we're not in reduced motion
    if (element && observerRef.current && !prefersReducedMotion) {
      observerRef.current.observe(element)
    }
  }, [prefersReducedMotion])

  // Only render the motion-heavy tracing beam when we actually have the room (desktop) and the user hasn't opted out.
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      setShouldRenderBeam(false)
      return
    }

    const media = window.matchMedia('(min-width: 768px)')
    const applyCurrentPreference = () => setShouldRenderBeam(media.matches)
    const handleChange = (event: MediaQueryListEvent) =>
      setShouldRenderBeam(event.matches)

    applyCurrentPreference()

    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
    } else {
      media.addListener(handleChange)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handleChange)
      } else {
        media.removeListener(handleChange)
      }
    }
  }, [prefersReducedMotion])

  // Memoize neon colors to avoid recalculating
  const colorSchemes = useMemo(
    () => [
      { firstColor: '#10b981', secondColor: '#3b82f6' }, // emerald to blue
      { firstColor: '#3b82f6', secondColor: '#f43f5e' }, // blue to rose
      { firstColor: '#f43f5e', secondColor: '#a855f7' }, // rose to purple
      { firstColor: '#a855f7', secondColor: '#10b981' }, // purple to emerald
      { firstColor: '#10b981', secondColor: '#3b82f6' }, // emerald to blue
      { firstColor: '#3b82f6', secondColor: '#f43f5e' }, // blue to rose
      { firstColor: '#f43f5e', secondColor: '#a855f7' }, // rose to purple
    ],
    []
  )

  // Get neon colors for active nodes (cycling through gradient colors)
  const getNeonColors = useCallback(
    (index: number) => {
      return colorSchemes[index % colorSchemes.length]
    },
    [colorSchemes]
  )

  const timelineContent = (
    <div className="relative space-y-16">
      <div className="space-y-10 pl-4 sm:space-y-20 sm:pl-16">
        {timelineData.map((node, index) => {
          const isActive = activeNodeIndex === index
          const neonColors = getNeonColors(index)

          const nodeContent = (
            <>
              {/* Title header with status badge in top-right corner */}
              <div className="relative mb-3">
                <h3 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-white sm:text-xl">
                  {node.title}
                </h3>
                <span
                  className={`absolute right-0 top-0 inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    node.status === 'Ongoing'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  <svg
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                    className={`size-1.5 ${
                      node.status === 'Ongoing'
                        ? 'animate-pulse fill-emerald-500'
                        : 'fill-zinc-400'
                    }`}
                  >
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                  {node.status}
                </span>
              </div>

              {/* Client and period */}
              <p className="mb-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 sm:text-sm">
                {node.client} • {node.period}
              </p>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
                {node.description}
              </p>

              {/* Service/Skill chips */}
              {node.services.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {node.services.map((service) => (
                    <ServiceBadge
                      key={`${node.id}-${service}`}
                      label={service}
                    />
                  ))}
                </div>
              )}

              {/* Call-to-action and badges */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                {node.link !== '#' && (
                  <Link
                    href={node.link}
                    className="group inline-flex items-center text-sm font-semibold text-emerald-600 transition-all duration-300 hover:gap-2 dark:text-emerald-400"
                  >
                    View Case Study
                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                )}
                {node.aiAccelerated && <AIBadge size="sm">AI-Accelerated</AIBadge>}
              </div>
            </>
          )

          return (
            <div
              key={node.id}
              className="relative overflow-visible transition-opacity duration-200 sm:transition-all sm:duration-300"
              ref={(el) => registerNodeRef(index, el)}
              data-node-index={index}
            >
              {isActive ? (
                <NeonGradientCard
                  className="transition-opacity duration-200 [&>div]:p-0 sm:transition-all sm:duration-300"
                  borderRadius={12}
                  borderSize={2}
                  neonColors={neonColors}
                >
                  <div className="relative z-20 rounded-[10px] bg-white p-6 dark:bg-zinc-800/30">
                    {nodeContent}
                  </div>
                </NeonGradientCard>
              ) : (
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-opacity duration-200 dark:border-zinc-700 dark:bg-zinc-800/30 sm:transition-all sm:duration-300">
                  {nodeContent}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <section className="relative">
      <div className="relative">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <Heading id="my-journey">My Journey</Heading>
          <p className="mb-6 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400 sm:mb-8 sm:text-base">
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
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
            <Button href="/services" className="group">
              View Services
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-4xl overflow-visible px-4 sm:px-6">
          {shouldRenderBeam ? (
            <TracingBeam className="relative w-full overflow-visible">{timelineContent}</TracingBeam>
          ) : (
            <div className="relative w-full overflow-visible border-l border-zinc-200/70 pl-4 dark:border-zinc-800/70 sm:pl-6">
              {timelineContent}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
