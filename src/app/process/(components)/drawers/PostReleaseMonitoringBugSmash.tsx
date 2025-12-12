'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
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
        genericTool("Hotjar"),
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

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Launching is the beginning, not the end. I set up monitoring so we know what&apos;s working (and what&apos;s on fire) within hours — not weeks. When something breaks, we triage fast and fix faster.
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
                "Users don't send bug reports. They just leave. Fast fixes = fewer silent exits.",
                "The first 48-72 hours of real usage teach you more than months of testing ever could.",
                "Bugs caught in the first 24 hours cost 10x less to fix than ones discovered weeks later.",
                "Teams with strong monitoring deploy more often and roll back less. Confidence compounds.",
                "Post-release retros catch the process gaps that pre-release testing misses."
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
            Success metrics and KPIs · Error tracking and logging setup · User feedback collection systems · Performance monitoring baselines · Rollback procedures and criteria
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
              "Set up dashboards that surface what matters: errors, drop-offs, performance regressions — with alerts that wake someone up if things go sideways",
              "Watch the metrics for 48-72 hours post-launch. Compare to baseline. Know if we shipped a win or a problem.",
              "Triage bugs by severity (P0-P4) and customer impact — not by who's yelling loudest",
              "Run rapid response: P0 acknowledged in <2 hours, dedicated bug smash mode, clear escalation paths",
              "Monitor feedback channels — support tickets, reviews, session recordings — to catch pain points before they become patterns",
              "Track Core Web Vitals, API response times, error rates. Hourly. (Yes, hourly.)",
              "Daily post-release standups: what's working, what's broken, what's next",
              "Retro within a week: what did we learn, what do we change for next time"
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
              "Real-time monitoring dashboard",
              "Daily health reports (first week post-launch)",
              "Bug triage matrix with severity and owners",
              "User feedback synthesis",
              "Performance trend reports",
              "Retro doc with action items"
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
              "Metrics trending toward targets within 72 hours",
              "P0/P1 bugs: acknowledged <2 hours, resolved <24 hours",
              "Error rate stays within 0.5% of baseline",
              "Core Web Vitals regression <5%",
              "Support ticket spike <20%",
              "Retro complete within 1 week"
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
              "Watching metrics without understanding the user story behind them",
              "Slow triage — small bugs become big bugs fast",
              "Dismissing edge case feedback (edge cases have a way of becoming common cases)",
              "Treating monitoring as an engineering-only activity",
              "Skipping the retro because 'it shipped, we're done'"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Error rate tracking · Performance regression alerts · Bug resolution time · Feedback sentiment · Team response time
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
            <NavigationChip skill="User Research" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}