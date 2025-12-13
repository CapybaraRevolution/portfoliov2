'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ReleaseReadinessReviewProps {
  className?: string
  onClose?: () => void
}

export function ReleaseReadinessReview({ className, onClose }: ReleaseReadinessReviewProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        genericTool("Linear / Jira"),
        genericTool("Quality dashboards")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Release Readiness Review"
        summary="Is it ready? Really ready? A 15-minute go/no-go before anything hits production."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="release-readiness-review"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            &quot;It&apos;s almost ready&quot; is not ready. Before anything goes to production, I run a quick go/no-go review. All teams sign off. All criteria are met. If something&apos;s not right, we don&apos;t ship it.
          </p>
          <p>
            This isn&apos;t bureaucracy — it&apos;s a 15-minute checkpoint that prevents &quot;wait, was that supposed to go out?&quot; conversations at midnight.
          </p>
        </div>

        {/* What I check */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I check
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Tests passing.</strong> Not &quot;mostly passing.&quot; All of them.</li>
              <li><strong>Docs updated.</strong> If it changes user behavior, someone needs to know.</li>
              <li><strong>Rollback plan.</strong> If this goes wrong, how do we undo it?</li>
              <li><strong>Sign-offs.</strong> Dev, QA, product, ops. Everyone who needs to say yes has said yes.</li>
              <li><strong>Monitoring ready.</strong> Will we know if it breaks? What alerts fire?</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Releases are boring. No surprises, no scrambling, no &quot;who approved this?&quot; Just a quick check, a green light, and a clean deployment.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Quality Assurance" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
