'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ValidateIAProps {
  className?: string
  onClose?: () => void
}

export function ValidateIA({ className, onClose }: ValidateIAProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("OptimalSort"),
        genericTool("Maze"),
        genericTool("UserZoom"),
        toolPill("figma", "FigJam", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Validate IA (Card Sort + Tree Test)"
        summary="Test the structure before you polish the pixels."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-validate-ia"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Use card sorting (≈15 participants) to learn mental models; tree testing to quantify findability without UI noise. Iterate until tasks are easy to find.
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
              "Draft categories/labels",
              "Key user tasks"
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
              "Card-sort groupings",
              "Tree-test results (success, first-click, time)"
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
              "≥80% direct success on key tasks",
              "Reduced time-to-find across iterations"
            ]}
          />
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Usability Testing" variant="default" size="sm" />
            <NavigationChip skill="Information Architecture" variant="outline" size="sm" />
            <NavigationChip skill="User Research" variant="outline" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}