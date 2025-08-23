'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface NavigationPatternsProps {
  className?: string
  onClose?: () => void
}

export function NavigationPatterns({ className, onClose }: NavigationPatternsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Wireframing tools"),
        genericTool("Prototype tools"),
        genericTool("Analytics tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Navigation Patterns & Cross-linking"
        summary="Make the structure visible—and give users smart side-doors."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-nav-patterns"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            IA isn&apos;t just a tree; it&apos;s how users move. We select the right patterns (mega-menu, hub-and-spoke, faceted filters, breadcrumbs) and design intentional cross-links so people can recover from wrong turns.
          </p>
        </div>

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <BulletList 
              color="emerald"
              items={[
                "The right pattern reduces cognitive load.",
                "Cross-links rescue ambiguous cases and boost content depth without trapping users."
              ]}
              className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed"
            />
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Content scale/complexity · Device mix · Top journeys · Known ambiguity hot-spots
          </p>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Choose global nav pattern (breadth vs depth), define breadcrumb rules",
              "Specify when to use mega-menus vs. category landing pages",
              "Design facets/filters (focused, non-duplicative)",
              "Create cross-link rules (e.g., product ↔ docs, FAQ ↔ related guides)",
              "Page templates show where nav, breadcrumbs, and cross-links live"
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Navigation spec (patterns, breakpoints, interactions)",
              "Breadcrumb + local-nav rules",
              "Cross-linking matrix & content model diagrams",
              "Mobile patterns and accessibility notes"
            ]}
          />
        </div>

        {/* Signals of success */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Signals of success
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Pogo-sticking down, onward clicks from category pages up",
              "Deeper content depth (pages/session) without loops",
              "Mobile nav task success on par with desktop"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Deep, skinny hierarchies (&gt;3–4 levels), facet bloat, dead-end pages, desktop-only patterns
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Nav clicks by label/position, breadcrumb usage, filter application/clear rates, dead-end detection (no onward links)
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Information Architecture" variant="default" size="sm" />
            <NavigationChip skill="Wireframing" variant="outline" size="sm" />
            <NavigationChip skill="Prototyping" variant="outline" size="sm" />
            <NavigationChip skill="User Experience Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}