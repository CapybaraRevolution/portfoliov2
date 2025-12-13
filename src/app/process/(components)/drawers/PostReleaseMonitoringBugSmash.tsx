'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface PostReleaseMonitoringBugSmashProps {
  className?: string
  onClose?: () => void
}

export function PostReleaseMonitoringBugSmash({ className, onClose }: PostReleaseMonitoringBugSmashProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("DataDog"),
        genericTool("Amplitude"),
        toolPill("ga4", "GA4", "md"),
        genericTool("Sentry"),
        toolPill("linear", "Linear", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Ship"
        title="Post-Release Monitoring & Bug Smash"
        summary="Ship it, watch it, fix what breaks. Fast."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Analytics"
        enableComments={true}
        itemId="post-release-monitoring-bug-smash"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Launching is the beginning, not the end. Users don&apos;t file bug reports — they just leave. So the first 48-72 hours after release are critical. I set up monitoring so we know what&apos;s working (and what&apos;s on fire) within hours, not weeks.
          </p>
          <p>
            When something breaks, we triage fast and fix faster. P0 bugs get acknowledged in under 2 hours. Everything else gets prioritized by customer impact, not by who&apos;s yelling loudest.
          </p>
        </div>

        {/* What I watch */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I watch
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Error rates.</strong> Sentry, DataDog — anything that&apos;s throwing exceptions that weren&apos;t there before.</li>
              <li><strong>Performance regressions.</strong> Core Web Vitals, API response times. Slow is broken.</li>
              <li><strong>Funnel metrics.</strong> Did the change move the needle? Or did we break something upstream?</li>
              <li><strong>Support tickets.</strong> The canary in the coal mine. Spikes mean something&apos;s wrong.</li>
              <li><strong>Session recordings.</strong> Watch real users hit real problems in real time.</li>
            </ul>
          </div>
        </div>

        {/* The rhythm */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            The first week
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Day 1:</strong> Hourly check-ins on dashboards. Any red flags?</li>
              <li><strong>Days 2-3:</strong> Compare metrics to baseline. Are we trending the right direction?</li>
              <li><strong>Day 4-5:</strong> Triage bugs by severity. Assign owners. Start fixing.</li>
              <li><strong>Day 7:</strong> Retro. What did we learn? What do we change next time?</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            A bug gets reported and someone says &quot;yeah, we already saw that in the dashboard and there&apos;s a fix in review.&quot; Proactive, not reactive.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Data Analysis" variant="default" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
