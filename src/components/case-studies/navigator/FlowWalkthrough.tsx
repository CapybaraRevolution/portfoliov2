"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Loader2, Box, Layers, Users, FileText } from 'lucide-react'
import Image from 'next/image'
import { Lens } from '@/components/ui/lens'
import { FocusImageGallery } from '@/components/ui/focus-image-gallery'
import { useSwipe } from '@/hooks/useSwipe'

interface StepImage {
  src: string
  alt: string
  caption?: string
}

interface ComponentCard {
  icon: 'box' | 'layers' | 'users' | 'fileText'
  title: string
  description: string
}

interface WalkthroughStep {
  id: number
  title: string
  description: string | string[]  // Can be single string or array of paragraphs
  highlight: string
  /** Single image with Lens hover-to-zoom (slightly smaller) */
  images?: StepImage[]
  /** Multiple images in a gallery with lightbox */
  gallery?: StepImage[]
  /** Component specification cards - rendered BEFORE images by default */
  componentCards?: ComponentCard[]
  /** If true, render component cards AFTER images instead of before */
  cardsAfterImages?: boolean
}

const iconMap = {
  box: Box,
  layers: Layers,
  users: Users,
  fileText: FileText,
}

const steps: WalkthroughStep[] = [
  {
    id: 1,
    title: "Start: Lobby",
    description: [
      "Every user flow should start where the user theoretically could start. Knowing where your users are coming from is key to understanding how to guide them to their destination.",
      "The lobby serves as a home base—a familiar anchor point that players know well. It's the central navigation hub, making it the natural starting point for most player-initiated journeys.",
      "This approach wouldn't apply to something like a combat system or arena screen, which have different mental and systematic anchors due to their nested nature."
    ],
    highlight: "Entry point"
  },
  {
    id: 2,
    title: "Character Selection",
    description: [
      "The player has navigated to the character management screen—a central hub for browsing their roster. A vertical scroll lets them view different characters rendered as 3D models.",
      "Selecting a character reveals their stats and customization options. The key action here? Tapping the costume icon (the robe/shirt icon at the top right of the character panel) opens the customization screen.",
      "If there's a new item available, we show a notification blip to draw attention without interrupting the browsing experience."
    ],
    highlight: "Decision point",
    images: [
      {
        src: "/images/case-studies/avatar-generations/team-screen.jpg",
        alt: "Team screen showing Masaru with character roster on the left and costume icon on the right",
        caption: "The Team screen lets players browse their character roster. Tapping the costume icon (right side) opens customization."
      }
    ]
  },
  {
    id: 3,
    title: "Customization Screen",
    description: [
      "This is where players spend most of their time making characters their own. Three tabs organize items by type: Outfit, Head, and Ornament. Each tab can display its own notification state for new items.",
      "The layout is intentional. The left side reserves a protected zone for the 3D model preview—it updates in real-time as players browse, so UI elements need to stay clear of this area.",
      "The right panel shows item details, stats, and the critical Equip/Upgrade actions. Documentation like this gave engineers and our team a shared mental model of what we were building."
    ],
    highlight: "Core screen",
    componentCards: [
      {
        icon: 'users',
        title: "3D Model Safe Area",
        description: "Protected region for character preview. UI elements position around this zone, never overlapping."
      }
    ],
    gallery: [
      {
        src: "/images/case-studies/avatar-generations/customization-wireframe.png",
        alt: "Customization screen wireframe showing Outfit/Head/Ornament tabs and item grid",
        caption: "Screen anatomy: 3D model area, item details panel, and tabbed navigation."
      },
      {
        src: "/images/case-studies/avatar-generations/selected-item-panel-anatomy.png",
        alt: "Selected Item Panel component documentation showing default and locked states",
        caption: "Selected Item Panel: detailed specs for both default and locked states, with every element documented."
      }
    ]
  },
  {
    id: 4,
    title: "Item Selection",
    description: [
      "Tapping an item previews it on the 3D model instantly—no confirmation needed for browsing. This lets players explore freely without commitment.",
      "Locked items are visually distinct: greyed out with a lock icon. When selected, they display how to acquire them rather than just showing \"unavailable.\"",
      "The system also distinguishes between \"no new items\" and \"new item unlocked\" states. The latter triggers a VFX flourish to celebrate the unlock—a small moment of delight."
    ],
    highlight: "Interaction",
    images: [
      {
        src: "/images/case-studies/avatar-generations/scrolling-item-component.png",
        alt: "Scrolling Item Component documentation showing tabs, item views, and counter",
        caption: "Scrolling Item Component: tabs cycle through item categories (Outfit/Head/Ornament), with multiple item states documented."
      }
    ]
  },
  {
    id: 5,
    title: "Equip or Upgrade",
    description: [
      "Here the flow branches into two clear paths.",
      "Equip confirms immediately with a satisfying VFX flourish and updates the character's appearance. No extra confirmation needed—players see the result instantly.",
      "Upgrade opens a modal with its own sub-flow for spending resources. This is where the complexity lives, and it needed its own documentation (see Step 6).",
      "Button states depend on context: locked items disable both buttons, already-equipped items disable Equip, and maxed items disable Upgrade. Every state is documented below."
    ],
    highlight: "Branch point",
    componentCards: [
      {
        icon: 'box',
        title: "Primary Buttons Region",
        description: "Equip and Upgrade actions with clear visual hierarchy. Green for ideal action, orange for primary alternative."
      },
      {
        icon: 'layers',
        title: "Selected Item Panel",
        description: "Shows current selection with default and locked states. Locked items display acquisition path."
      },
      {
        icon: 'users',
        title: "3D Model Safe Area",
        description: "Protected region for character preview. UI elements position around this zone, never overlapping."
      },
      {
        icon: 'fileText',
        title: "Scrolling Item Component",
        description: "Tabbed navigation (Outfit, Head, Ornament) with notification blips for new items."
      }
    ],
    gallery: [
      {
        src: "/images/case-studies/avatar-generations/customization-wireframe.png",
        alt: "Customization screen wireframe showing the Equip and Upgrade buttons in context",
        caption: "The Equip and Upgrade buttons in context—positioned for easy thumb access on mobile."
      },
      {
        src: "/images/case-studies/avatar-generations/equip-upgrade-buttons.png",
        alt: "Equip and Upgrade button states documentation showing enabled/disabled logic",
        caption: "Button states and functionality: logic for when each button is enabled or disabled based on item status."
      }
    ]
  },
  {
    id: 6,
    title: "Upgrade Flow",
    description: [
      "The upgrade modal is a flow within a flow. The tier system let players upgrade their customization items—simple concept, complex execution.",
      "A single modal needed to show: current tier progress, how the system works, previews of other tiers, resource costs, and confirmation flows. All without overwhelming the player.",
      "A slider lets players adjust how many resources to spend. Confirmation triggers a presentation sequence—different animations play depending on whether max level is reached.",
      "I documented every panel, every state, every interaction—so engineering could build it once, correctly."
    ],
    highlight: "Sub-flow",
    cardsAfterImages: true,
    componentCards: [
      {
        icon: 'layers',
        title: "Complexity in a Box",
        description: "A single modal containing tier progress, system explanation, previews, resource costs, and confirmation flows—all documented for one-time correct implementation."
      }
    ],
    images: [
      {
        src: "/images/case-studies/avatar-generations/customization-tiers-modal.png",
        alt: "Customization Tiers modal anatomy showing tier progress, preview panel, and components",
        caption: "Customization Tiers modal: tier progress panel, \"how it works\" explanation, reward previews, and detailed component specs."
      }
    ]
  },
]

// Viewport positions for each step (percentage-based)
// x: horizontal position (0 = left edge, higher = more right)
// y: vertical position (0 = top edge, higher = more down)
// With higher zoom, smaller increments move the view more
const stepViewports = [
  { x: 0, y: 18 },     // Step 1: Lobby - red "Follow-Up" start box (good)
  { x: 8, y: 18 },     // Step 2: Character Selection (good)
  { x: 15, y: 26 },    // Step 3: Customization - panned down to show Outfit/Head/Ornament tabs + hexagonal buttons
  { x: 33, y: 21 },    // Step 4: Item Selection - "No New Items"/"New Item unlocked" anchored left, show right side
  { x: 48, y: 22 },    // Step 5: Equip/Upgrade - EQUIP/UPGRADE buttons, Select Item diamonds
  { x: 65, y: 38 },    // Step 6: Upgrade Flow - modal with slider, confirm, presentation sequences
]

export { steps }
export type { WalkthroughStep }

interface FlowWalkthroughProps {
  currentStep?: number
  onStepChange?: (step: number) => void
}

export function FlowWalkthrough({ currentStep: controlledStep, onStepChange }: FlowWalkthroughProps) {
  const [internalStep, setInternalStep] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const isControlled = controlledStep !== undefined
  const currentStep = isControlled ? controlledStep : internalStep
  
  const setCurrentStep = (step: number) => {
    if (!isControlled) {
      setInternalStep(step)
    }
    onStepChange?.(step)
  }

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

  return (
    <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden my-8">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Flow Walkthrough
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

      {/* Flow Diagram Viewer — swipeable on mobile */}
      <div className="relative w-full aspect-2/1 bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-700" {...swipeHandlers}>
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Loading diagram...</span>
            </div>
          </div>
        )}
        
        {/* Animated image container - zoomed in to show detail */}
        <motion.div
          className="absolute"
          style={{
            width: '380%',  // Higher zoom to see individual nodes
            height: '280%',
          }}
          animate={{
            x: `${-viewport.x}%`,
            y: `${-viewport.y}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 1,
          }}
        >
          <Image
            src="/images/case-studies/avatar-generations/user-flow-diagram-full.png"
            alt="Complete User Flow Diagram for Costume Customization"
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
            {/* Title and highlight badge */}
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {currentStepData.title}
              </h4>
              <span className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {currentStepData.highlight}
              </span>
            </div>

            {/* Description - supports single string or array of paragraphs */}
            <div className="space-y-3">
              {Array.isArray(currentStepData.description) ? (
                currentStepData.description.map((paragraph, idx) => (
                  <p key={idx} className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {currentStepData.description}
                </p>
              )}
            </div>

            {/* Component Specification Cards - before images (default) */}
            {currentStepData.componentCards && currentStepData.componentCards.length > 0 && !currentStepData.cardsAfterImages && (
              <div className={cn(
                "pt-4 grid gap-4",
                currentStepData.componentCards.length === 1 
                  ? "grid-cols-1 max-w-lg" 
                  : "grid-cols-1 md:grid-cols-2"
              )}>
                {currentStepData.componentCards.map((card, idx) => {
                  const IconComponent = iconMap[card.icon]
                  return (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg shrink-0">
                          <IconComponent className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <div>
                          <h5 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">
                            {card.title}
                          </h5>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Single images with Lens click-to-zoom */}
            {currentStepData.images && currentStepData.images.length > 0 && (
              <div className="pt-4 space-y-4">
                {currentStepData.images.map((image, idx) => (
                  <div key={idx} className="space-y-2 max-w-2xl mx-auto">
                    <Lens zoomFactor={1.5} lensSize={280} hoverable={false}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={700}
                        height={400}
                        className="w-full h-auto rounded-lg border border-zinc-200 dark:border-zinc-700"
                      />
                    </Lens>
                    {image.caption && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 italic text-center">
                        {image.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Multiple images in gallery with lightbox - centered */}
            {currentStepData.gallery && currentStepData.gallery.length > 0 && (
              <div className="pt-4 flex justify-center">
                <FocusImageGallery images={currentStepData.gallery} />
              </div>
            )}

            {/* Component Specification Cards - after images (when cardsAfterImages is true) */}
            {currentStepData.componentCards && currentStepData.componentCards.length > 0 && currentStepData.cardsAfterImages && (
              <div className={cn(
                "pt-4 grid gap-4",
                currentStepData.componentCards.length === 1 
                  ? "grid-cols-1 max-w-lg" 
                  : "grid-cols-1 md:grid-cols-2"
              )}>
                {currentStepData.componentCards.map((card, idx) => {
                  const IconComponent = iconMap[card.icon]
                  return (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg shrink-0">
                          <IconComponent className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <div>
                          <h5 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">
                            {card.title}
                          </h5>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
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
