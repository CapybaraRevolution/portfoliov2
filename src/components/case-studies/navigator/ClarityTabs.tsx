"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeIn } from '@/components/ui/fade-in'
import { Tooltip } from '@/components/ui/tooltip-card'
import { FocusImageGallery } from '@/components/ui/focus-image-gallery'
import { FlowWalkthrough } from './FlowWalkthrough'
import { ButtonHierarchy } from './ButtonHierarchy'
import { Layers, Map, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabId = 'user-flows' | 'component-anatomy' | 'design-system'

interface Tab {
  id: TabId
  name: string
  shortName: string
  icon: React.ReactNode
}

const tabs: Tab[] = [
  { id: 'user-flows', name: 'User Flows', shortName: 'Flows', icon: <Map className="w-4 h-4" /> },
  { id: 'component-anatomy', name: 'Component Anatomy', shortName: 'Anatomy', icon: <Layers className="w-4 h-4" /> },
  { id: 'design-system', name: 'Design System', shortName: 'System', icon: <Palette className="w-4 h-4" /> },
]

export function ClarityTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('user-flows')

  return (
    <FadeIn delay={0.1}>
      {/* Outer container with border to group tabs + content */}
      <div className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        {/* Tab List - sits at top of container */}
        <div className="flex h-auto p-1.5 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all",
                activeTab === tab.id
                  ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.shortName}</span>
            </button>
          ))}
        </div>

        {/* Tab Content - contained within the same card */}
        <div className="bg-white dark:bg-zinc-900/50 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'user-flows' && <UserFlowsContent />}
              {activeTab === 'component-anatomy' && <ComponentAnatomyContent />}
              {activeTab === 'design-system' && <DesignSystemContent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </FadeIn>
  )
}

function UserFlowsContent() {
  return (
    <div className="space-y-8">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-0 mb-4">Mapping the Invisible</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Players don&apos;t think in features. They think in goals.</p>
        <p className="text-zinc-600 dark:text-zinc-400">A player who wants to upgrade their character&apos;s outfit doesn&apos;t care that &quot;costume customization&quot; is a separate system from &quot;character management.&quot; They just want to make their character look cooler.</p>
        <p className="text-zinc-600 dark:text-zinc-400">So I mapped the entire journey—from lobby to character selection to customization to upgrade confirmation. Every tap, every <Tooltip containerClassName="inline" content="A moment where the user must choose between paths—critical to map because each branch needs its own documentation."><span className="font-bold">decision point</span></Tooltip>, every edge case.</p>
      </div>

      {/* Flow Walkthrough with integrated diagram viewer */}
      <FlowWalkthrough />
    </div>
  )
}

function ComponentAnatomyContent() {
  const documentationImages = [
    {
      src: "/images/case-studies/avatar-generations/docs-task-overview.png",
      alt: "Dropdown UX Task Overview showing structured design workflow",
      caption: "Task breakdown: from documentation review through concept creation (covering all states), feedback loops, polish (animations, VFX), and final sign-off. This structure ensures nothing falls through the cracks."
    },
    {
      src: "/images/case-studies/avatar-generations/docs-states.png",
      alt: "Dropdown UX Documentation showing all interaction states",
      caption: "Comprehensive state documentation: Active, Disabled, Hover, Highlight (with options debated in comments), Focus, Completed input, and Fail feedback. Every interaction state defined so engineers know exactly what to build."
    },
    {
      src: "/images/case-studies/avatar-generations/docs-placeholder-text.png",
      alt: "Placeholder Text guidelines for dropdown components",
      caption: "Edge case documentation: should the placeholder be blank, show \"Select\", \"Choose...\", or something else? These micro-decisions compound across a product. Documenting them once prevents different interpretations."
    },
    {
      src: "/images/case-studies/avatar-generations/docs-store-layouts.png",
      alt: "Store Layouts documentation showing grid, vertical, and horizontal options",
      caption: "Store system layout documentation: Grid, Vertical, and Horizontal approaches. Each layout has specific use cases and trade-offs documented for the content container system."
    },
    {
      src: "/images/case-studies/avatar-generations/docs-store-anatomy.png",
      alt: "Store Homepage Anatomy showing user flow and component documentation",
      caption: "Store homepage anatomy: a cropped view of a larger flow showing how the store opens, item selection triggers bundle pop-ups, and purchase confirmation. The anatomy panel below documents navigation patterns, store interactions, and tab behaviors—the kind of detail that prevents implementation guesswork."
    }
  ]

  return (
    <div className="space-y-8">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-0 mb-4">Documentation That Ships</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Every screen is made of components. Every component has states. Every state has rules.</p>
        <p className="text-zinc-600 dark:text-zinc-400">I documented screens down to the atomic level—not because I love spreadsheets (okay, maybe a little), but because engineers needed to build the same thing whether they were in Vancouver or reviewing async. Ambiguity costs time. Specs save it.</p>
        <p className="text-zinc-600 dark:text-zinc-400">Below are examples of the documentation I create to establish shared understanding across teams. Click any image to view details.</p>
      </div>

      {/* Documentation Gallery */}
      <div className="flex justify-center">
        <FocusImageGallery images={documentationImages} />
      </div>
    </div>
  )
}

function DesignSystemContent() {
  return (
    <div className="space-y-8">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mt-0 mb-4">Systematized Decisions</h3>
        <p className="text-zinc-600 dark:text-zinc-400">In a UI-heavy game, buttons aren&apos;t just buttons. They&apos;re a language.</p>
        <p className="text-zinc-600 dark:text-zinc-400">We established a hierarchy so players could intuit importance without reading. Color became meaning. Every button communicated its role through a <Tooltip containerClassName="inline" content="A consistent set of visual rules that communicate meaning without words."><span className="font-bold">visual language</span></Tooltip> that players learned implicitly.</p>
      </div>

      {/* Button Hierarchy Component */}
      <ButtonHierarchy />

      <div className="prose prose-zinc dark:prose-invert max-w-none mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mt-0">Why This Matters</h4>
        <p className="text-zinc-600 dark:text-zinc-400">This wasn&apos;t aesthetic polish—it was <Tooltip containerClassName="inline" content="The mental effort required to use something—good design minimizes this by making interfaces intuitive and predictable."><span className="font-bold">cognitive load</span></Tooltip> management. When every button looks different, players have to read. When colors mean things, they can act on instinct.</p>
        <p className="text-zinc-600 dark:text-zinc-400">The system also scaled. New features could inherit the established patterns instead of inventing new ones. Consistency compounded.</p>
      </div>

      {/* Typography System */}
      <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-6">
          <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mt-0">Typography System</h4>
          <p className="text-zinc-600 dark:text-zinc-400">Two typeface families served distinct purposes. <strong>P22 Mackinac</strong> brought personality to headers and focus states—warm serifs that felt true to the Avatar universe. <strong>Alegreya</strong> handled body text, stats, and UI labels with clean readability across screen sizes.</p>
          <p className="text-zinc-600 dark:text-zinc-400">Each style was documented with specific use cases: where it appears, what size, what weight, what context. The right side shows real screens with callouts mapping styles to implementation.</p>
        </div>

        <div className="flex justify-center">
          <FocusImageGallery 
            images={[
              {
                src: "/images/case-studies/avatar-generations/typography-system.png",
                alt: "Ares Typography system showing P22 Mackinac and Alegreya typefaces with usage examples",
                caption: "Typography documentation: two typeface families (P22 Mackinac for personality, Alegreya for utility), each style mapped to specific UI contexts with real implementation examples."
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
