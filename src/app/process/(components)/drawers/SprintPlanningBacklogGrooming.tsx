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
        summary="Plan each sprint with a well-groomed backlog and clear criteria so the team works only on ready, high-value items."
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
            Strong sprint planning starts with a well-groomed backlog. We hold regular refinement sessions, apply Definition of Ready (DoR) and Done (DoD) checklists, use data-informed prioritization, and enforce WIP limits. This creates predictable sprints where teams work on clear, high-value items.
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
                "Clarity upfront reduces churn: A strong Definition of Ready ensures each story is fully understood before sprint start, minimizing mid-sprint surprises.",
                "Quality and consistency: A shared Definition of Done sets quality benchmarks, preventing half-baked features and reducing post-sprint defects.",
                "Faster flow with small batches: Working in small batches improves throughput and feedback, reducing time to find and fix issues.",
                "WIP limits improve throughput: Capping Work In Progress forces focus, helping teams finish work faster and exposing bottlenecks early."
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

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Hold regular backlog refinement sessions (~10% of sprint time) to prune, detail, and estimate upcoming stories",
              "Apply Definition of Ready checklists to each candidate story (clear business value, acceptance criteria, size feasible, dependencies resolved)",
              "Use prioritization models (RICE scoring for product features, WSJF for scaled program items) to sequence work objectively",
              "Sprint planning commits to a sprint goal and stories that meet DoR and fit team capacity",
              "Set explicit Definition of Done checkpoints (code complete, tested, integrated, etc.)",
              "Enforce WIP limits (e.g. no more than 1-2 tasks per dev in progress) and encourage swarming on blocked work"
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
              "Prioritized Product Backlog (constantly refined list of user stories and tasks)",
              "Definition of Ready checklist (criteria a backlog item must meet before pulling into a sprint)",
              "Definition of Done checklist (quality criteria for completed increments)",
              "Sprint plans with sprint goal, committed backlog items and estimates",
              "Prioritization matrix (RICE/WSJF scoring to show how items stack rank)"
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
              "≥80% of planned sprint stories completed within sprint (high-performing teams hit ~90%)",
              "Zero stories blocked for unclear requirements during sprint (all pulled work met DoR)",
              "<5% of tasks regularly carry over to next sprint",
              "Cycle time (idea to done) trending downward after implementing WIP limits",
              ">90% of sprint work aligns with top product OKRs or roadmap priorities",
              "Shorter lead time for changes (story from definition to release in under a week)"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Skipping refinement sessions, relying blindly on numeric prioritization without strategic context, ignoring WIP limits, vague Definition of Done, neglecting cross-team dependencies in planning
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Sprint commitment vs completion rate, story blocked flags and block reasons, kanban WIP limit alerts, RICE/WSJF score tracking, cycle time and lead time measurement from idea to deployment
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