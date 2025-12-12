'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface PerformanceQualityDrawerProps {
  className?: string
  onClose?: () => void
}

export function PerformanceQualityDrawer({ className, onClose }: PerformanceQualityDrawerProps) {
  // Track drawer open on mount
  useEffect(() => {
    trackProcessDrawerOpen('Performance & Quality')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("github", "GitHub Actions", "md"),
        toolPill("sonarqube", "SonarQube", "md"),
        toolPill("jest", "Jest", "md"),
        toolPill("cypress", "Cypress", "md"),
        toolPill("storybook", "Storybook", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Ship Quality as a Habit, Not a Finale"
        summary="Quality isn't a phase at the end. It's a habit throughout."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Quality%20Assurance"
        enableComments={true}
        itemId="ship-quality-habit"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Quality that happens at the end is too late. I build testing into every step — devs write tests, QA coaches quality, and everyone owns the outcome. Shift-left catches bugs when they&apos;re cheap to fix.
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
                "Reduces correction costs 10x: Preventive quality measures cost 90% less than reactive fixes, saving up to $67 million per 5,000 employees.",
                "Accelerates delivery: Teams with excellent test coverage are 2.5x more likely to achieve 50-100% deployment frequency improvements.",
                "Decreases failure rates: Strong quality cultures see 46% fewer mistakes and achieve 0-15% change failure rates (elite performer standard).",
                "Improves team velocity: Near 100% code review coverage reduces post-merge errors while maintaining 300-500 lines/hour review speeds.",
                "Enables sustainable pace: Shift-left testing catches issues early when they&apos;re cheapest to fix, preventing technical debt accumulation."
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
            Team capability assessments · Current quality metrics baseline · Development workflow documentation · Testing infrastructure inventory · Historical defect data
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
              "Shared ownership: devs write tests, QA coaches quality",
              "Shift-left testing: catch bugs at local build, not in staging",
              "Testing pyramid: 80%+ unit/integration coverage",
              "Peer reviews: 200-400 lines, 60-90 min max, near 100% coverage",
              "CI/CD quality gates: SonarQube metrics, fail builds on violations",
              "DORA metrics: deployment frequency, lead time, change failure rate, MTTR"
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
              "Quality culture maturity assessment",
              "Automated testing framework documentation",
              "Code review standards and checklists",
              "CI/CD pipeline configuration with quality gates",
              "Team quality dashboard with DORA metrics",
              "Shift-left testing playbook",
              "Peer review process documentation",
              "Quality metrics reporting templates"
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
              "Code review coverage >95% of all changes",
              "Unit test coverage >80% for new code",
              "Change failure rate <15% (elite performer level)",
              "Mean time to recovery <1 hour for critical issues",
              "Deployment frequency >1 per day for mature teams",
              "Review turnaround time <24 hours for most changes",
              "Defect escape rate <10% to production",
              "Team quality NPS >70 indicating culture adoption"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Treating quality as solely QA team&apos;s responsibility, focusing only on test quantity over quality, implementing tools without cultural change, creating quality gates that become bottlenecks, measuring activity instead of outcomes
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Code review coverage tracking, automated test coverage reporting, DORA metrics dashboard (deployment frequency, lead time, change failure rate, MTTR), defect escape rate monitoring, team quality culture surveys
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