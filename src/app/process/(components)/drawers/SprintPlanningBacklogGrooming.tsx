'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        genericTool("Jira / Linear"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Kanban boards")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Sprint Planning & Backlog Grooming"
        summary="Most sprint chaos comes from starting work that wasn&apos;t ready. Fix the backlog, fix the sprints."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="sprint-planning-backlog-grooming"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Here&apos;s a pattern I see constantly: team pulls a story into the sprint, starts working on it, realizes the requirements are unclear, spends two days getting answers, misses commitment. Repeat every sprint.
          </p>
          <p>
            The fix isn&apos;t more planning meetings. It&apos;s not pulling stories into the sprint until they&apos;re actually ready. Definition of Ready exists for a reason: clear value, acceptance criteria, right-sized, dependencies resolved. If it&apos;s not ready, it stays in the backlog.
          </p>
        </div>

        {/* How I run it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I run it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Regular refinement.</strong> ~10% of sprint time spent preparing upcoming work. Prune, detail, estimate.</li>
              <li><strong>Definition of Ready gate.</strong> Stories don&apos;t enter the sprint without meeting the checklist. No exceptions.</li>
              <li><strong>Definition of Done agreement.</strong> What does &quot;done&quot; mean? Code reviewed? Tested? Documented? Decide once, enforce always.</li>
              <li><strong>WIP limits.</strong> 1-2 tasks per person max. Finish things instead of starting them.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Sprints feel predictable. Most planned work gets done. Nobody&apos;s blocked mid-sprint waiting for answers that should&apos;ve been sorted last week.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
