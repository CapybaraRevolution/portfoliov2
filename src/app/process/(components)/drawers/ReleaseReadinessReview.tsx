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

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Release readiness review provides systematic validation that all technical, operational, and business criteria are met before production deployment. This formal checkpoint integrates multi-team perspectives through structured go/no-go decision frameworks. Organizations with mature readiness reviews achieve 99% deployment success rates while reducing rollback frequency by 70%.
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
                "Reduces deployment failures: Formal readiness reviews decrease change failure rates from 45% to less than 15%.",
                "Prevents customer impact: Structured validation catches 95% of potential issues before they reach production.",
                "Aligns stakeholders: Multi-team sign-off ensures organizational readiness beyond just technical completion.",
                "Accelerates recovery: Clear rollback procedures reduce MTTR by 75% when issues occur."
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
            Release scope documentation · Test completion reports · Quality metrics dashboard · Security scan results · Support team preparedness status
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
              "Execute formal readiness checklists covering planning artifacts, development completion, testing validation, and documentation updates",
              "Validate testing completion ensuring >80% unit test coverage, integration tests passed, performance benchmarks met, security scans clear",
              "Coordinate multi-team sign-offs from development, QA, operations, security, product, and support teams",
              "Facilitate go/no-go meetings lasting 5-15 minutes maximum, with clear decision criteria and documented rationale",
              "Track readiness metrics including release success rate, change failure rate, deployment frequency, and mean time to recovery"
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
              "Release readiness checklist completed",
              "Multi-team sign-off documentation",
              "Go/no-go decision record",
              "Test completion certificates",
              "Quality metrics report",
              "Deployment runbook verified"
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
              "Go/no-go meeting duration <15 minutes consistently",
              "First-time go rate >85% for releases",
              "Sign-off completion 100% before deployment",
              "Release success rate >99% achieved",
              "Rollback invocation <5% of deployments"
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
              "Treating review as rubber stamp exercise",
              "Missing key stakeholder sign-offs",
              "Unclear go/no-go criteria",
              "Accepting \"almost ready\" status",
              "Skipping documentation updates"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Release success rate tracking, go/no-go decision time measurement, sign-off completion monitoring, rollback frequency analysis, stakeholder satisfaction surveys
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
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Team Leadership" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}