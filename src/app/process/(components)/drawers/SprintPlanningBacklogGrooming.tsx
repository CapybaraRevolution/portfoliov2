'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface SprintPlanningBacklogGroomingProps {
  className?: string
  onClose?: () => void
}

export function SprintPlanningBacklogGrooming({ className, onClose }: SprintPlanningBacklogGroomingProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Jira"),
        genericTool("Azure DevOps"),
        genericTool("Linear"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Prioritization frameworks"),
        genericTool("Kanban boards")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Sprint Planning & Backlog Grooming"
        summary="A clean backlog means fewer surprises mid-sprint. Plan the work, then work the plan."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="sprint-planning-backlog-grooming"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Most sprint chaos comes from starting work that wasn&apos;t ready. I run refinement sessions, enforce Definition of Ready checklists, and keep WIP limits tight. The goal: predictable sprints where nobody&apos;s blocked waiting for answers that should&apos;ve been sorted last week.
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
                "If a story isn't ready, it shouldn't be in the sprint. Simple rule, routinely ignored, always regretted.",
                "A shared Definition of Done prevents half-baked features from sneaking into production.",
                "Small batches = faster feedback. You find problems sooner and fix them cheaper.",
                "WIP limits aren't about slowing down — they're about finishing things instead of starting them."
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
            Product roadmap priorities · User stories and epics · Team capacity and velocity data · Stakeholder feedback and business constraints
          </p>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Run regular refinement (~10% of sprint time) to prune, detail, and estimate upcoming work",
              "Apply Definition of Ready: clear value, acceptance criteria, right-sized, dependencies resolved",
              "Prioritize with RICE or WSJF — not gut feel, not who asked loudest",
              "Sprint planning = sprint goal + stories that are actually ready + realistic capacity",
              "Definition of Done checkpoints: code complete, tested, integrated, documented",
              "Enforce WIP limits (1-2 tasks per dev max) and swarm on blockers"
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
              "Prioritized backlog (always current, never stale)",
              "Definition of Ready checklist",
              "Definition of Done checklist",
              "Sprint plan with goal, committed items, and estimates",
              "Prioritization matrix (RICE/WSJF scores visible)"
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
              "≥80% of planned stories completed (good teams hit 90%)",
              "Zero mid-sprint blocks from unclear requirements",
              "<5% carryover to next sprint",
              "Cycle time trending down after WIP limits kick in",
              ">90% of sprint work ties to top OKRs",
              "Story to release in under a week"
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
              "Skipping refinement ('we'll figure it out in the sprint')",
              "Trusting the RICE score without strategic context",
              "Ignoring WIP limits when things get 'urgent'",
              "Vague Definition of Done ('it works on my machine')",
              "Forgetting cross-team dependencies until they bite you"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Commitment vs completion rate · Blocked story flags · WIP limit alerts · Cycle time tracking · Lead time (idea → deployment)
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}