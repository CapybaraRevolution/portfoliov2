'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'

interface JMJourneysProps {
  className?: string
  onClose?: () => void
}

export function JMJourneys({ className, onClose }: JMJourneysProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("ga4", "Analytics", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Journey Mapping"
        title="Journeys & top frictions"
        summary="Map the end-to-end experience to identify friction points and optimization opportunities."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Journey%20Mapping"
        enableComments={true}
        itemId="journey-mapping-journeys"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Map the friction, measure the improvement
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Journey maps reveal where users struggle most, giving us clear targets for optimization and measurement.
            </p>
          </div>
        </div>

        {/* What I map */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I map
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "End-to-end workflow from awareness to success",
              "Emotional highs and lows at each stage",
              "Touchpoints across channels and systems",
              "Decision points and potential drop-offs",
              "Current vs. future state opportunities"
            ]}
          />
        </div>

        {/* Friction analysis */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Friction analysis
          </h3>
          <BulletList 
            color="blue"
            items={[
              "High-impact pain points backed by data",
              "Severity and frequency scoring for issues",
              "Quick wins vs. strategic improvements",
              "Cross-functional dependencies and blockers"
            ]}
          />
        </div>

        {/* Measurement plan */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Measurement plan
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Key metrics for each journey stage",
              "Event instrumentation for drop-off analysis",
              "Baseline measurements before optimization",
              "Success criteria for journey improvements"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}