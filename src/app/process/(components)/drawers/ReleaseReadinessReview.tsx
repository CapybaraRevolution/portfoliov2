'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
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
        genericTool("Linear"),
        toolPill("jira", "Jira", "md"),
        genericTool("Release checklists"),
        genericTool("Quality dashboards")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Release Readiness Review"
        summary="Provide systematic validation that all technical, operational, and business criteria are met before production deployment through structured go/no-go decision frameworks."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="release-readiness-review"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Ship with confidence
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              A systematic final check prevents avoidable release issues.
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
              "Review checklist across all functions (dev, design, QA, legal, ops)",
              "Confirm rollback plan, comms plan, and success metrics are ready"
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
              "Release readiness scorecard (signed off by owners)",
              "Final go/no-go decision with rationale"
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
              "100% of launch checklist complete",
              "All teams can describe their post-release responsibilities"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}