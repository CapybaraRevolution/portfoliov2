"use client"

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/contexts/ReducedMotionContext'
import { ChevronLeft, ChevronRight, Loader2, Users, Search, FileCheck, Handshake, Eye } from 'lucide-react'
import { Tooltip } from '@/components/ui/tooltip-card'
import { useSwipe } from '@/hooks/useSwipe'
import Image from 'next/image'

interface WalkthroughStep {
  id: number
  title: string
  description: ReactNode
  highlight: string
  icon: 'users' | 'search' | 'fileCheck' | 'handshake' | 'eye'
}

const iconMap = {
  users: Users,
  search: Search,
  fileCheck: FileCheck,
  handshake: Handshake,
  eye: Eye,
}

// Tooltip wrapper for jargon terms
// Using whitespace-nowrap prevents line breaks mid-term which causes tooltip positioning issues
const Term = ({ term, definition, children }: { term?: string, definition: string, children: ReactNode }) => (
  <Tooltip containerClassName="inline" content={definition}>
    <span className="font-semibold border-b border-dotted border-zinc-400 dark:border-zinc-500 cursor-help whitespace-nowrap">
      {children || term}
    </span>
  </Tooltip>
)

// Define the steps for the SFF user journey
// User: New investor seeking to align capital with social/environmental goals
const steps: WalkthroughStep[] = [
  {
    id: 1,
    title: "Landing Page",
    description: (
      <>
        <p>A new investor arrives at the platform, seeking to align their capital with social and environmental goals. They want data, directories, and educational content to inform their decision.</p>
        <p>Just below the fold, a three-card layout filters users to their respective paths:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>For Investors</li>
          <li>For <Term definition="Nonprofits, co-ops, and social enterprises seeking funding to generate social/environmental impact—like indigenous-owned businesses or companies reducing carbon emissions.">Social Purpose Organizations</Term></li>
          <li>For <Term definition="Organizations that connect investors to SPOs, facilitating the flow of capital toward impact.">Intermediaries</Term></li>
        </ul>
        <p className="mt-3">The investor clicks &quot;For Investors&quot; to continue.</p>
      </>
    ),
    highlight: "Entry point",
    icon: 'users'
  },
  {
    id: 2,
    title: "Investor Landing Page",
    description: (
      <>
        <p>The investor-specific page surfaces what matters most:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>Filterable directories of <Term definition="Social Purpose Organizations—nonprofits, co-ops, and social enterprises like indigenous-owned businesses or companies tackling carbon emissions.">SPOs</Term></li>
          <li>Information about <Term definition="Quantitative and qualitative data showing how investments create social/environmental change.">impact measurement</Term></li>
          <li>Educational content and guidance on social financing</li>
        </ul>
        <p className="mt-3">Clear calls-to-action guide next steps: Browse the Directory, Explore Impact Measurement Guides, or Attend Upcoming Events. The investor selects &quot;Browse the Directory.&quot;</p>
      </>
    ),
    highlight: "Role-based routing",
    icon: 'users'
  },
  {
    id: 3,
    title: "Directory Tool",
    description: (
      <>
        <p>The directory lets investors apply filters to narrow their search:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>Impact area (gender equity, responsible consumption, etc.)</li>
          <li>Geography (province or region)</li>
          <li>Investment stage (early, growth, established)</li>
        </ul>
        <p className="mt-3">This investor filters by <strong>gender equity</strong> and <strong>responsible consumption and production</strong>—two impact areas I proposed during the taxonomy work. Results display in an accordion-style layout; the investor finds a promising <Term definition="Social Purpose Organization—a nonprofit, co-op, or social enterprise like an indigenous-owned business or climate-focused company.">SPO</Term> and clicks &quot;Visit Page.&quot;</p>
      </>
    ),
    highlight: "Discovery",
    icon: 'search'
  },
  {
    id: 4,
    title: "Directory Entry",
    description: (
      <>
        <p>The <Term definition="Social Purpose Organization—a nonprofit, co-op, or social enterprise like an indigenous-owned business or climate-focused company.">SPO</Term> profile page presents key information:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>Mission statement and impact metrics</li>
          <li>Leadership team and financial needs</li>
          <li>Past achievements and &quot;In the News&quot; coverage</li>
        </ul>
        <p className="mt-3">The investor can skim the overview, dive into detailed financials, or take action—bookmark the SPO, visit their website, or connect directly.</p>
      </>
    ),
    highlight: "Evaluation",
    icon: 'fileCheck'
  },
  {
    id: 5,
    title: "Learning Hub",
    description: (
      <>
        <p>Discovered via the footer, the Learning Hub offers educational content for users who need more context before committing.</p>
        <p className="mt-3">Structured similarly to the home page, it provides resources tailored to each user type—giving the investor the background knowledge to make informed decisions about <Term definition="Investment strategies that seek both financial returns and measurable social/environmental impact.">social finance</Term>.</p>
      </>
    ),
    highlight: "Education",
    icon: 'handshake'
  },
  {
    id: 6,
    title: "Full Journey Overview",
    description: (
      <>
        <p>This user journey helped us define one specific path through the platform—a new investor discovering, evaluating, and connecting with social purpose organizations.</p>
        <p className="mt-3">Mapping journeys like this is essential for understanding how users flow through products and sites. It reveals where friction might occur, what information users need at each step, and how to design clear paths to conversion.</p>
      </>
    ),
    highlight: "Summary",
    icon: 'eye'
  },
]

// =============================================================================
// VIEWPORT CONFIGURATION
// =============================================================================
// x: horizontal pan (percentage of the zoomed image container)
// y: vertical pan (percentage of the zoomed image container)
//
// The image container uses a fixed zoom (width/height set once via CSS)
// matching the FlowWalkthrough pattern for consistent cross-device behavior.
// Only x/y positions are animated — no zoom transitions between steps.
// =============================================================================
const stepViewports = [
  { x: 0,   y: 10  },   // Step 1: Landing Page - Start Point area
  { x: 14,  y: 14  },   // Step 2: Investor Landing Page  
  { x: 32,  y: 18  },   // Step 3: Directory Tool
  { x: 52,  y: 14  },   // Step 4: Directory Entry
  { x: 74,  y: 14  },   // Step 5: Learning Hub - right side
  { x: 0,   y: 0   },   // Step 6: Full Overview - zoomed out
]

// Step 6 shows the full journey — use a smaller zoom to fit everything
const DETAIL_ZOOM_WIDTH = '380%'
const DETAIL_ZOOM_HEIGHT = '280%'
const OVERVIEW_WIDTH = '100%'
const OVERVIEW_HEIGHT = '100%'

interface JourneyWalkthroughProps {
  /** When true, removes top border and top rounded corners for seamless accordion integration */
  seamless?: boolean
}

export function JourneyWalkthrough({ seamless = false }: JourneyWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [shimmerReady, setShimmerReady] = useState(false)
  const [shimmerDone, setShimmerDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Determine if we're on the overview step (last step)
  const isOverview = currentStep === steps.length - 1

  // Fire shimmer once after component scrolls into view + 1.5s delay
  useEffect(() => {
    if (prefersReducedMotion || shimmerDone) return

    const el = containerRef.current
    if (!el) return

    let delayTimer: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shimmerReady) {
          delayTimer = setTimeout(() => setShimmerReady(true), 1500)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (delayTimer) clearTimeout(delayTimer)
    }
  }, [prefersReducedMotion, shimmerReady, shimmerDone])

  // Fallback: if image hasn't loaded after 5 seconds, show it anyway
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [imageLoaded])

  const goToPrevious = () => {
    setCurrentStep(currentStep === 0 ? steps.length - 1 : currentStep - 1)
  }

  const goToNext = () => {
    setCurrentStep(currentStep === steps.length - 1 ? 0 : currentStep + 1)
  }

  // Swipe support for mobile navigation
  const swipeHandlers = useSwipe(
    {
      onSwipeLeft: goToNext,
      onSwipeRight: goToPrevious,
    },
    { threshold: 40 }
  )

  const currentStepData = steps[currentStep]
  const viewport = stepViewports[currentStep]
  const IconComponent = iconMap[currentStepData.icon]

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-white dark:bg-zinc-800/50 overflow-hidden",
        seamless 
          ? "border-t border-zinc-200 dark:border-zinc-700" 
          : "rounded-xl border border-zinc-200 dark:border-zinc-700"
      )}
    >
      {/* ── Shimmer sweep — fires once after scrolling into view ── */}
      {shimmerReady && !shimmerDone && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent dark:via-white/[0.06]"
          initial={{ x: '-100%' }}
          animate={{ x: '250%' }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          onAnimationComplete={() => setShimmerDone(true)}
        />
      )}

      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            User Journey Walkthrough
          </span>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded-full text-zinc-600 dark:text-zinc-300">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Next step"
          >
            <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Journey Map Viewer — swipeable on mobile */}
      <div
        className="relative w-full aspect-[2/1] bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-700"
        {...swipeHandlers}
      >
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Loading journey map...</span>
            </div>
          </div>
        )}
        
        {/* Animated image container — fixed zoom, animated position (matching FlowWalkthrough pattern) */}
        <motion.div
          className="absolute"
          style={{
            width: isOverview ? OVERVIEW_WIDTH : DETAIL_ZOOM_WIDTH,
            height: isOverview ? OVERVIEW_HEIGHT : DETAIL_ZOOM_HEIGHT,
          }}
          animate={{
            x: isOverview ? '0%' : `${-viewport.x}%`,
            y: isOverview ? '0%' : `${-viewport.y}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 1,
          }}
        >
          <Image
            src="/images/case-studies/social-finance-fund/user-flow-journey-map.png"
            alt="Social Finance Hub User Journey Map"
            fill
            className={cn(
              "object-contain object-top-left transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 400vw, 380vw"
            quality={100}
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Current location badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white shadow-sm">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold">
              {currentStep + 1}
            </span>
            <span>{currentStepData.title}</span>
          </div>
        </div>

        {/* Hint text — adapt for mobile */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="px-2.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 shadow-sm">
            <span className="hidden md:inline">Use steps to navigate</span>
            <span className="md:hidden">Swipe or tap steps</span>
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="px-6 py-3 border-b border-zinc-100 dark:border-zinc-700/50 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/30">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(index)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
              index === currentStep
                ? "bg-emerald-500 text-white scale-110"
                : index < currentStep
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                : "bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600"
            )}
          >
            {step.id}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Title with icon and highlight badge */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                  <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {currentStepData.title}
                </h4>
              </div>
              <span className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {currentStepData.highlight}
              </span>
            </div>

            {/* Description */}
            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {currentStepData.description}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-zinc-100 dark:bg-zinc-700">
        <motion.div
          className="h-full bg-emerald-500"
          initial={false}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
