'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface OpportunityBacklogProps {
  className?: string
  onClose?: () => void
}

export function OpportunityBacklog({ className, onClose }: OpportunityBacklogProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("jira", "Jira", "md"),
        genericTool("Roadmap tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Opportunity Backlog"
        summary="One list. Everything that might get built, ranked. No more &quot;wait, I thought we agreed to build X.&quot;"
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="opportunity-backlog"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            The backlog is where ideas go to either become work or die quietly. Without one, you get chaos: conflicting priorities, surprise requests, and the same &quot;urgent&quot; feature getting re-proposed every quarter because nobody remembers killing it last time.
          </p>
          <p>
            A good backlog is boring. It&apos;s just a list — ranked, estimated, and groomed regularly. The magic is in the discipline: one source of truth that everyone references, not five spreadsheets and a PM&apos;s head.
          </p>
        </div>

        {/* How I manage it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I manage it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Keep 2-3 sprints ready.</strong> Not more. If you&apos;re detailing work 6 months out, you&apos;re wasting time on stuff that will change.</li>
              <li><strong>Prune ruthlessly.</strong> Items older than 90 days without movement? Archive or kill them. A stale backlog is a useless backlog.</li>
              <li><strong>Score for real.</strong> Impact, effort, confidence. Not vibes. If you can&apos;t estimate it, you don&apos;t understand it yet.</li>
              <li><strong>Surface dependencies early.</strong> Nothing derails a sprint like discovering a blocker mid-build.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Sprint planning takes 30 minutes instead of 2 hours because everyone already knows what&apos;s next. And stakeholders stop asking &quot;what happened to my feature?&quot; because they can check themselves.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Prioritization" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
