'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface JMDecisionsProps {
  className?: string
  onClose?: () => void
}

export function JMDecisions({ className, onClose }: JMDecisionsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "Figma", "md"),
        genericTool("Prioritization frameworks")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Journey Mapping"
        title="Turn signals into decisions"
        summary="Insights without action are just expensive documentation. Ship something."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Strategic%20Planning"
        enableComments={true}
        itemId="journey-mapping-decisions"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Research without action is just expensive documentation
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Bridge the gap between insights and implementation by translating journey findings into prioritized initiatives.
            </p>
          </div>
        </div>

        {/* Decision framework */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Decision framework
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Impact scoring based on user pain severity",
              "Effort estimation with engineering input",
              "Risk assessment for technical and business factors",
              "Dependency mapping across teams and systems",
              "Timeline alignment with business objectives"
            ]}
          />
        </div>

        {/* Prioritization outputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Prioritization outputs
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Ranked opportunity backlog with RICE scores",
              "Quick wins that can ship within 2 weeks",
              "Strategic initiatives requiring cross-team coordination",
              "Experiment hypotheses for uncertain opportunities"
            ]}
          />
        </div>

        {/* Success tracking */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Success tracking
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Clear success metrics for each initiative",
              "Timeline for measuring impact post-launch",
              "Owner assignment and accountability framework",
              "Regular review cadence for course correction"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}