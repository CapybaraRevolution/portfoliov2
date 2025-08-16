'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface SprintPlanningBacklogGroomingProps {
  className?: string
  onClose?: () => void
}

export function SprintPlanningBacklogGrooming({ className, onClose }: SprintPlanningBacklogGroomingProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("confluence", "Confluence", "md"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Google Sheets"),
        genericTool("Prioritization frameworks"),
        genericTool("OKR tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Sprint Planning & Backlog Grooming"
        summary="Clear priorities beat long wish lists."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="sprint-planning-backlog-grooming"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Turn discovery into focused plans
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Without rules, the roadmap drifts. Priorities reduce thrash, speed decisions, and keep us building what moves the metric.
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
              "Map business goals to user needs and system constraints",
              "Co-create scoring criteria (impact, effort, confidence)",
              "Sequence initiatives → epics → opportunities/stories",
              "Keep a visible &quot;Not this sprint&quot; list to limit WIP"
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
              "One-page prioritization policy",
              "Groomed backlog (initiative → epic → story taxonomy)",
              "Sprint plan with DRI/acceptance criteria"
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
              "Team can explain the top 3 priorities and why",
              "< 2 weeks from idea to prioritized backlog placement",
              "Roadmap changes correlate to new data, not new opinions"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}