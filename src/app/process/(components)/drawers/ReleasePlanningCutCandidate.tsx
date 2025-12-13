'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ReleasePlanningCutCandidateProps {
  className?: string
  onClose?: () => void
}

export function ReleasePlanningCutCandidate({ className, onClose }: ReleasePlanningCutCandidateProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Linear"),
        toolPill("jira", "Jira", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("slack", "Slack", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Release Planning & Cut Candidates"
        summary="Know what you&apos;ll cut before you need to. Panicking the week of release is not a strategy."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="release-planning-cut-candidate"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Every release runs into trouble. Something takes longer than expected. A bug surfaces. A dependency slips. The question is whether you&apos;ve already decided what to cut — or whether you&apos;re scrambling to figure it out at 11pm the night before launch.
          </p>
          <p>
            I maintain a &quot;cut candidate&quot; list from the start. These are features that would be nice to have but aren&apos;t critical. If we run out of time, we know exactly what to drop. No debates, no drama, no shipping half-baked work.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Clear go/no-go criteria.</strong> What has to work? What&apos;s a must-have vs. nice-to-have? Decide this early.</li>
              <li><strong>Cut candidate list.</strong> Explicitly mark features that can be dropped if needed. Rank them.</li>
              <li><strong>Code freeze.</strong> A week before launch, no new features. Bug fixes only. This prevents last-minute chaos.</li>
              <li><strong>Progressive rollout.</strong> Don&apos;t ship to everyone at once. Feature flags, canary releases, gradual percentage rollouts.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Something goes wrong during release prep and instead of panic, someone says &quot;okay, we cut X and Y from this release, they move to next sprint.&quot; That&apos;s planning doing its job.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Risk Management" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
