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
        genericTool("Prototype tools")
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

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Select appropriate global/local nav (e.g., mega-menu vs. focused navbar), breadcrumbs, faceted filters, and purposeful cross-links. Include page templates so the structure survives implementation.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Final IA + taxonomy",
              "Priority user journeys"
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
              "Nav pattern spec",
              "Cross-link rules",
              "Page templates (wireframes) showing breadcrumbs/local nav"
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
              "Fewer pogo-stick loops",
              "Higher onward clicks from category pages",
              "Lower reliance on internal search"
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