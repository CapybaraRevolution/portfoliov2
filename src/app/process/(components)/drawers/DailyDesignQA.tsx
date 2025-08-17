'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface DailyDesignQAProps {
  className?: string
  onClose?: () => void
}

export function DailyDesignQA({ className, onClose }: DailyDesignQAProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("DevMode"),
        genericTool("Storybook"),
        genericTool("Percy"),
        genericTool("Chromatic"),
        genericTool("Axe"),
        genericTool("Lighthouse")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Build"
        title="Daily Design QA"
        summary="Ship quality as a habit, not a finale."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="daily-design-qa"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Pixel-perfect, every day
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Frequent, light-touch QA finds small issues before they become big delays.
            </p>
          </div>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Run daily checks against AC (UI, copy, interactions, a11y)",
              "Flag by severity (P0–P3) with owner + due date"
            ]}
          />
        </div>

        {/* Outputs & deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs &amp; deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "QA checklist per story",
              "Daily QA log with pass/fail trend"
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
              "Design QA pass rate ≥ 95%",
              "P0/P1 count trending toward zero before code freeze"
            ]}
          />
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="System Design" variant="default" size="sm" />
            <NavigationChip skill="PRDs (Specs)" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Agile Delivery" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}