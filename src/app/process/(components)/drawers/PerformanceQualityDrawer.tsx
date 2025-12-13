'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface PerformanceQualityDrawerProps {
  className?: string
  onClose?: () => void
}

export function PerformanceQualityDrawer({ className, onClose }: PerformanceQualityDrawerProps) {
  useEffect(() => {
    trackProcessDrawerOpen('Performance & Quality')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("github", "GitHub Actions", "md"),
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
        title="Quality as a Habit"
        summary="Quality isn&apos;t a phase at the end. It&apos;s a habit throughout."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Quality%20Assurance"
        enableComments={true}
        itemId="ship-quality-habit"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            I&apos;ve seen teams treat quality like a gate at the end — build the feature, throw it over the wall to QA, wait for the bug list, fix, repeat. It&apos;s slow and demoralizing.
          </p>
          <p>
            The alternative: quality is everyone&apos;s job, built into every step. Devs write tests. QA coaches quality instead of policing it. Code review isn&apos;t a rubber stamp — it&apos;s a real conversation. When something ships, everyone owns the outcome.
          </p>
          <p>
            &quot;Shift-left&quot; is the buzzword, but the idea is simple: catch bugs when they&apos;re cheap to fix (at the developer&apos;s machine), not when they&apos;re expensive (in production).
          </p>
        </div>

        {/* What this looks like */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What this looks like
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Testing pyramid.</strong> Lots of unit tests, fewer integration tests, even fewer E2E. Fast feedback loops.</li>
              <li><strong>Peer reviews that matter.</strong> 200-400 lines at a time, not rubber-stamping 2,000-line PRs. Reviewers actually read the code.</li>
              <li><strong>CI/CD quality gates.</strong> If tests fail, the build fails. If coverage drops, the build fails. No exceptions, no &quot;we&apos;ll fix it later.&quot;</li>
              <li><strong>Shared ownership.</strong> QA isn&apos;t the last line of defense — they&apos;re coaches helping the team get better at not needing them.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The team deploys multiple times a day and nobody&apos;s anxious about it. Bugs still happen, but they&apos;re rare and recovery is fast. QA stops feeling like a bottleneck and starts feeling like a partner.
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
            <NavigationChip skill="Team Leadership" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
