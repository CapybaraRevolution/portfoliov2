'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { CalendarIcon, BriefcaseIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, type MotionValue } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { AIBadge } from '@/components/ui/AIBadge'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { SkillChip } from '@/components/SkillChip'
import { standardizedSkills } from '@/data/standardizedSkills'
import { GridPattern } from '@/components/GridPattern'
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
  skillIds: string[] // Changed from services to skillIds
  comingSoon?: boolean
  underConstruction?: boolean
}

// Map legacy service strings to standardized skill IDs
const mapServiceToSkillIds = (service: string): string[] => {
  const serviceMap: Record<string, string[]> = {
    // UX & Research Skills
    'Wireframes & Prototypes': ['wireframing', 'prototyping'],
    'Wireframing': ['wireframing'],
    'Prototyping': ['prototyping'],
    'Wireframes': ['wireframing'],
    'Prototypes': ['prototyping'],
    'User Research': ['user-research'],
    'UX Research': ['user-research'],
    'Usability Testing': ['usability-testing'],
    'Design Thinking': ['design-thinking'],
    
    // Product Strategy Skills
    'Product Strategy': ['product-vision'],
    'Product Vision': ['product-vision'],
    'Feature Prioritization': ['feature-prioritization'],
    'Product Discovery': ['product-discovery'],
    'Product Analytics': ['data-analytics-metrics'],
    
    // Technical Skills
    'System Mapping': ['systems-architecture'],
    'System Design': ['systems-architecture'],
    'API Analysis': ['api-integration-design'],
    'Technical Analysis': ['technical-feasibility'],
    'Integration Design': ['api-integration-design'],
    
    // Business & Analysis Skills
    'Business Analysis': ['market-research-analysis'],
    'Market Research': ['market-research-analysis'],
    'Competitive Analysis': ['competitive-analysis'],
    'Go-to-Market Strategy': ['go-to-market-strategy'],
    
    // Data & Analytics Skills
    'Data Visualization': ['data-analytics-metrics'],
    'Analytics': ['data-analytics-metrics'],
    'A/B Testing': ['ab-testing'],
    'Metrics': ['data-analytics-metrics'],
    
    // Collaboration Skills
    'Stakeholder Alignment': ['stakeholder-management'],
    'Stakeholder Management': ['stakeholder-management'],
    'Cross-functional Leadership': ['cross-functional-leadership'],
    'Communication': ['communication'],
    'Team Facilitation': ['cross-functional-leadership'],
    
    // Delivery & Execution Skills
    'Project Management': ['project-management'],
    'Agile Methodologies': ['agile-methodologies'],
    'Agile Delivery': ['agile-methodologies'],
    'Requirements Definition': ['requirements-definition'],
    'PRDs (Specs)': ['requirements-definition'],
    'Release Planning': ['release-planning'],
    'Roadmap': ['product-roadmapping'],
    
    // AI & Data Skills
    'AI Integration': ['generative-ai-integration'],
    'AI Strategy': ['ai-agent-design'],
    'Prompt Engineering': ['prompt-engineering'],
    'Data-Driven Decisions': ['data-driven-decision-making'],
    
    // Visual/Interaction Design
    'Interaction Design': ['prototyping'],
    
    // Experimentation
    'Experimentation': ['ab-testing']
  }
  
  return serviceMap[service] || [] // Return empty if no mapping found
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
      // Coming soon items go last
      if (a.comingSoon && !b.comingSoon) return 1
      if (!a.comingSoon && b.comingSoon) return -1
      
      // Under construction items go after active, before coming soon
      if (a.underConstruction && !b.underConstruction && !b.comingSoon) return 1
      if (!a.underConstruction && !a.comingSoon && b.underConstruction) return -1
      
      // First priority: Active/Ongoing projects at the top
      if (a.status === 'Ongoing' && b.status !== 'Ongoing') return -1
      if (b.status === 'Ongoing' && a.status !== 'Ongoing') return 1
      
      // For same status, sort by actual timeline dates (most recent first)
      const dateA = parseTimelineEndDate(a.timeline)
      const dateB = parseTimelineEndDate(b.timeline)
      return dateB.getTime() - dateA.getTime()
    })
    .map((study, index) => {
      // Get unique skill IDs, filtering out any that don't exist in standardizedSkills
      const skillIds = [...new Set(
        study.services
          .flatMap(service => mapServiceToSkillIds(service))
          .filter(id => standardizedSkills[id])
      )].slice(0, 4) // Limit to first 4 skills for space
      
      return {
        id: `node-${index + 1}`, // Start from 1 to leave 0 for Future Focus
        title: study.descriptiveTitle,
        client: study.client,
        period: study.timeline,
        description: study.description,
        link: `/case-studies/${study.slug}`,
        status: study.status,
        aiAccelerated: study.aiAccelerated,
        comingSoon: study.comingSoon,
        underConstruction: study.underConstruction,
        skillIds
      }
    })

  return caseStudyNodes
}

// Mouse-tracking grid pattern adapted from RefactoredProjectCard
function TimelineCardPattern({
  mouseX,
  mouseY,
  ...gridProps
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  y: string | number
  squares: Array<[x: number, y: number]>
}) {
  const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-xl mask-[linear-gradient(white,transparent)] transition duration-300 group-hover/card:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/2 stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover/card:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay transition duration-300 group-hover/card:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

// Extracted card wrapper to enable per-card useMotionValue hooks for mouse tracking
function TimelineCardElement({
  isActive,
  isDisabled,
  neonColors,
  nodeContent,
  cardFooter,
}: {
  isActive: boolean
  isDisabled: boolean
  neonColors: { firstColor: string; secondColor: string }
  nodeContent: React.ReactNode
  cardFooter: React.ReactNode
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const pattern = { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }

  return (
    <>
      {/* Neon gradient card - shown when active (no transition to avoid flash) */}
      {isActive ? (
        <NeonGradientCard
          className={`[&>div]:p-0 ${isDisabled ? 'before:!opacity-[0.06]' : ''}`}
          borderRadius={12}
          borderSize={2}
          neonColors={neonColors}
          style={{
            '--neon-first-color': neonColors.firstColor,
            '--neon-second-color': neonColors.secondColor,
          } as React.CSSProperties}
        >
          <div
            className="group/card relative z-20 overflow-hidden rounded-[10px] bg-white dark:bg-zinc-800/30"
            onMouseMove={onMouseMove}
          >
            {!isDisabled && <TimelineCardPattern mouseX={mouseX} mouseY={mouseY} {...pattern} />}
            <div className="relative p-4 sm:p-5 md:p-6">
              {nodeContent}
            </div>
            {cardFooter}
          </div>
        </NeonGradientCard>
      ) : (
        /* Regular card - shown when not active */
        <div
          className="group/card relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-[shadow,border-color] hover:shadow-md hover:shadow-zinc-900/5 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/30 dark:hover:shadow-black/5 dark:hover:border-zinc-600"
          onMouseMove={onMouseMove}
        >
          {!isDisabled && <TimelineCardPattern mouseX={mouseX} mouseY={mouseY} {...pattern} />}
          <div className="relative p-4 sm:p-5 md:p-6">
            {nodeContent}
          </div>
          {cardFooter}
        </div>
      )}
    </>
  )
}

export function Timeline() {
  const timelineData = useMemo(() => getTimelineData(), [])
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [shouldRenderBeam, setShouldRenderBeam] = useState(false)
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([])
  
  // Track if timeline is expanded - default open on desktop, closed on mobile
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)
  // Track if entrance animations have completed (prevents neon from firing before cards are visible)
  const [animationsReady, setAnimationsReady] = useState(false)
  // Track hovered card - overrides scroll-based active state (sticky until scroll)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Clear hovered state when scroll changes the active card
  useEffect(() => {
    if (activeNodeIndex !== -1) {
      setHoveredIndex(null)
    }
  }, [activeNodeIndex])

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

  // Render the tracing beam on all devices unless the user has opted out with reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // Enable beam for all screen sizes unless user prefers reduced motion
    setShouldRenderBeam(!prefersReducedMotion)
  }, [prefersReducedMotion])

  // Set initial expanded state based on viewport after hydration
  useEffect(() => {
    setHasHydrated(true)
    // Open by default on desktop (md breakpoint = 768px)
    setIsExpanded(window.innerWidth >= 768)
  }, [])

  // Delay neon activation until entrance animations have time to complete
  useEffect(() => {
    if (isExpanded && hasHydrated) {
      // Reset animations ready when timeline opens
      setAnimationsReady(false)
      // Wait for entrance animations to complete (0.1s delay + 0.5s duration + buffer)
      const timer = setTimeout(() => {
        setAnimationsReady(true)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      setAnimationsReady(false)
    }
  }, [isExpanded, hasHydrated])

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

  // Grayscale colors for disabled/coming soon nodes
  const grayscaleColors = useMemo(
    () => ({ firstColor: '#71717a', secondColor: '#a1a1aa' }), // zinc-500 to zinc-400
    []
  )

  // Get neon colors for nodes - grayscale for disabled, colorful for active
  const getNeonColors = useCallback(
    (index: number, isDisabled: boolean) => {
      if (isDisabled) {
        return grayscaleColors
      }
      return colorSchemes[index % colorSchemes.length]
    },
    [colorSchemes, grayscaleColors]
  )

  // Animation variants for timeline items
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  }

  const timelineContent = (
    <div className="space-y-8 sm:space-y-12 md:space-y-16">
        {timelineData.map((node, index) => {
          // Hover overrides scroll-based active state
          const isActive = animationsReady && (
            hoveredIndex !== null 
              ? hoveredIndex === index 
              : activeNodeIndex === index
          )
          const isDisabled = !!(node.comingSoon || node.underConstruction)
          const isClickable = !isDisabled && node.link !== '#'
          const neonColors = getNeonColors(index, isDisabled)
          const nodeContent = (
            <div className={isDisabled ? 'opacity-60' : ''}>
              {/* Header - Title + Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className={`text-lg font-semibold leading-tight sm:text-xl ${isDisabled ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-900 dark:text-white'}`}>
                  {node.title}
                </h3>
                {isDisabled ? (
                  <span className="inline-flex shrink-0 items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-600">
                    Coming Soon
                  </span>
                ) : (
                  <span
                    className={`inline-flex shrink-0 items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ${
                      node.status === 'Ongoing'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                    }`}
                  >
                    {node.status === 'Ongoing' ? (
                      <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 animate-pulse fill-blue-500">
                        <circle r={3} cx={3} cy={3} />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-emerald-500">
                        <path d="M10.28 2.28a.75.75 0 0 0-1.06-1.06L4.5 5.94 2.78 4.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25Z" />
                      </svg>
                    )}
                    {node.status === 'Completed' ? 'Complete' : node.status}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isDisabled ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {node.description}
              </p>

              {/* Divider */}
              <div className="mt-4 h-px bg-zinc-900/7.5 dark:bg-white/10" />

              {/* Project Details */}
              <div className="mt-4">
                <h4 className={`text-sm font-medium mb-3 ${isDisabled ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-900 dark:text-white'}`}>Project Details</h4>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${isDisabled ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-600 dark:text-zinc-400'}`}>
                    <BriefcaseIcon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">Client:</span>
                    <span className={isDisabled ? '' : 'font-bold text-emerald-600 dark:text-emerald-400'}>{node.client}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isDisabled ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-600 dark:text-zinc-400'}`}>
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">Timeline:</span>
                    <span>{node.period}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {!isDisabled && node.skillIds.length > 0 && (
                <>
                  <div className="mt-4 h-px bg-zinc-900/7.5 dark:bg-white/10" />
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Skills &amp; Approach</h4>
                    <div className="flex flex-wrap gap-2">
                      {node.skillIds.map((skillId) => {
                        const skill = standardizedSkills[skillId]
                        if (!skill) return null
                        return (
                          <SkillChip
                            key={`${node.id}-${skillId}`}
                            skill={skill}
                            size="sm"
                            variant="outline"
                            showDropdown={true}
                          />
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* AI Badge */}
              {!isDisabled && node.aiAccelerated && (
                <>
                  <div className="mt-4 h-px bg-zinc-900/7.5 dark:bg-white/10" />
                  <div className="mt-4 flex items-center gap-2">
                    <AIBadge size="sm">AI-Accelerated</AIBadge>
                  </div>
                </>
              )}
            </div>
          )

          const cardFooter = (
            <div className="bg-zinc-100/50 dark:bg-zinc-800/50 border-t border-zinc-900/7.5 dark:border-white/10 px-4 sm:px-5 md:px-6 py-3">
              <div className="flex justify-center">
                <span className={`inline-flex items-center text-sm font-medium transition-colors ${
                  isDisabled
                    ? 'text-zinc-400 dark:text-zinc-500'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {isDisabled ? 'Coming soon' : 'View case study →'}
                </span>
              </div>
            </div>
          )

          const cardElement = (
            <TimelineCardElement
              isActive={isActive}
              isDisabled={isDisabled}
              neonColors={neonColors}
              nodeContent={nodeContent}
              cardFooter={cardFooter}
            />
          )

          return (
            <motion.div
              key={node.id}
              className="relative"
              ref={(el) => registerNodeRef(index, el)}
              data-node-index={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {isClickable ? (
                <Link href={node.link} className="block cursor-pointer">
                  {cardElement}
                </Link>
              ) : (
                cardElement
              )}
            </motion.div>
          )
        })}
    </div>
  )

  return (
    <section className="relative overflow-visible" data-timeline-section>
      <div className="relative overflow-visible">
        {/* Section Header */}
        <div className="mb-6 sm:mb-10">
          <Heading id="my-journey" label="Experience">My Journey</Heading>
          <p className="mb-6 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
            A decade of building user-centered solutions across industries,
            from startups to enterprise clients. Each role shaped my approach
            to AI-powered product strategy.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button href="/work/overview" className="group">
              View My Work
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
            <Button
              variant="outline"
              href="/services"
              className="group"
            >
              View Services
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </div>

        {/* Toggle Link */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
          {isExpanded ? 'Hide' : 'Show'} experience timeline
          <span className="text-zinc-400 dark:text-zinc-500 font-normal">
            ({timelineData.length} projects)
          </span>
        </button>

        {/* Expandable Timeline Content */}
        <AnimatePresence initial={false}>
          {hasHydrated && isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pt-4"
            >
              {shouldRenderBeam ? (
                <TracingBeam className="max-w-4xl">{timelineContent}</TracingBeam>
              ) : (
                <div className="mx-auto max-w-4xl pl-8 sm:pl-10 md:pl-12">
                  {timelineContent}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
