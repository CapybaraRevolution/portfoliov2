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
        summary="Choose the right pattern and add smart side-doors."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-nav-patterns"
      >

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Pogo-sticking ↓; onward clicks ↑
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              The IA must be visible and traversable. Pattern choice (mega-menu, hub-and-spoke, breadcrumbs, faceted browse) and intentional cross-links reduce dead ends and support exploration. Making structure visible and adding cross-links keeps users oriented and moving toward outcomes.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Pattern selection by scenario & scale: Mega-menus for breadth; breadcrumbs for depth",
              "Faceted navigation for attribute-driven sets; Hub-and-spoke for help/knowledge centers",
              "Cross-link strategy: Add lateral links where users commonly go &ldquo;the other way&rdquo;",
              "Page templates: Where global nav, local nav, breadcrumbs, and links live",
              "Mobile first: Thumb reach, progressive disclosure, performance"
            ]}
          />
        </div>

        {/* Artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Artifacts
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Navigation spec (patterns, states, breakpoints)",
              "Page template wireframes with nav placement",
              "Cross-link rules (when/where to add side-doors)"
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
              "Pogo-sticking down (fewer backtracks/rapid hops)",
              "Onward clicks up from category hubs",
              "Mobile nav task success & time-to-content improve"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <BulletList 
            color="zinc"
            items={[
              "Deep/skinny hierarchies on mobile",
              "Duplicate/overlapping categories without guidance",
              "Filters that silo content or hide key paths"
            ]}
          />
        </div>

        {/* Sample Template */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Pattern cheat-sheet
          </h4>
          <BulletList 
            color="emerald"
            items={[
              "Lots of categories? Use mega-menu or category landing pages",
              "Deep paths? Add breadcrumbs + contextual links",
              "Large sets? Use faceted filters with clear, limited attributes",
              "Common misroutes? Add cross-reference links in both locations"
            ]}
          />
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