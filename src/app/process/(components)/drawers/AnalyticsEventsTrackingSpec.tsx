'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface AnalyticsEventsTrackingSpecProps {
  className?: string
  onClose?: () => void
}

export function AnalyticsEventsTrackingSpec({ className, onClose }: AnalyticsEventsTrackingSpecProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Amplitude"),
        toolPill("ga4", "GA4", "md"),
        genericTool("Segment"),
        genericTool("Postman"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Build"
        title="Analytics Events & Tracking Spec"
        summary="If we can&apos;t measure it, we can&apos;t know it worked."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Analytics"
        enableComments={true}
        itemId="analytics-events-tracking-spec"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Prove the release worked
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Clean, minimal events tie work to outcomes.
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
              "Define event names/properties/IDs and success metrics",
              "Validate in dev and prod; sample payloads in the doc"
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
              "Tracking spec (events, properties, IDs, owners)",
              "QA checklist and validation screenshots"
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
              "Events visible in Amplitude/GA4 within 24h of deploy",
              "Dashboards show expected movement (activation, task success)"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}