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
        summary="Building quality as an organizational habit transforms testing from a phase-gate activity into a continuous, collaborative practice embedded throughout development."
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
            Building quality as an organizational habit transforms testing from a phase-gate activity into a continuous, collaborative practice embedded throughout development. This cultural shift reduces bugs by 36% during development while accelerating deployment frequency by 50-100%. Teams embrace shared ownership where quality becomes everyone&apos;s responsibility, not just QA&apos;s mandate.
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

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Establish shared ownership model where developers write testable code and unit tests, QA engineers serve as quality coaches",
              "Implement shift-left testing strategies enabling developers to test at local build stage with optimized containerized test environments",
              "Deploy comprehensive automated testing following the testing pyramid with 80% minimum unit/integration coverage",
              "Facilitate peer code reviews maintaining 200-400 lines per session, 60-90 minute maximum duration, near 100% coverage",
              "Create continuous feedback loops through QA office hours, cross-functional daily meetings, and shared communication channels",
              "Integrate CI/CD quality gates with four-stage structure (planning, development, testing, deployment) and SonarQube metrics",
              "Monitor DORA metrics tracking deployment frequency, lead time, change failure rate, and MTTR for elite performance standards",
              "Build quality-first culture focusing on three pillars: people (collaborative learning), processes (clear frameworks), technology (enabling systems)"
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