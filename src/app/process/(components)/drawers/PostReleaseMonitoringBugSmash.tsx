'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

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
        summary="Stay close to the data. Stay closer to the users."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Analytics"
        enableComments={true}
        itemId="post-release-monitoring-bug-smash"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Launch is just the beginning
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Real user feedback beats any testing environment.
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
              "Monitor metrics, user feedback, and error rates for 48–72h",
              "Triage and fast-track P0/P1 fixes; batch lower priority items"
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
              "Daily health report (metrics, feedback, errors)",
              "Post-launch retro with lessons learned"
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
              "Success metrics trending toward targets within 7 days",
              "P0/P1 bugs resolved within 24h of release"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}