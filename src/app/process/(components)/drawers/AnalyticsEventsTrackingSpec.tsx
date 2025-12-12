'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

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
        genericTool("mParticle"),
        genericTool("Schema validation tools"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Analytics Events Implementation"
        summary="Track the right events. Name them consistently. Trust the data."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Analytics"
        enableComments={true}
        itemId="analytics-events-tracking-spec"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Bad event naming breaks funnels. Missing events leave you guessing. I create structured tracking plans with consistent taxonomy, schema validation, and quality gates so the data you collect is actually usable.
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
                "Accelerates decision-making: Companies with reliable analytics make data-driven decisions 5x faster than competitors.",
                "Prevents data debt: Proactive validation costs $1 per record versus $10 for reactive fixes and $100/year for inaction.",
                "Enables personalization: Proper event tracking powers recommendation engines that drive 35% of Amazon&apos;s revenue.",
                "Improves product development: Teams with comprehensive analytics ship features 2x faster with higher success rates.",
                "Drives revenue growth: Data-driven organizations are 23x more likely to acquire customers and 6x more likely to retain them."
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
            Business goals and KPIs · User journey maps · Feature specifications · Data governance policies · Technology stack details
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
              "Map business goals → KPIs → events",
              "Object-Action taxonomy: &quot;Song Played&quot;, proper case, snake_case properties, past tense",
              "Tracking plan: 20-300 events, definitions, triggers, property specs",
              "Schema validation in CI/CD — bad data fails the build",
              "Peer review for analytics code (treat it like product code)",
              "Data quality monitoring: >99% accuracy for critical events",
              "Regular cleanup: prune unused events before they rot"
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
              "Analytics tracking plan documentation",
              "Event taxonomy guide with naming conventions",
              "Implementation code review checklist",
              "Automated test suite for analytics",
              "Data quality dashboard",
              "Schema validation reports",
              "Event coverage heat map",
              "Analytics implementation roadmap"
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
              "Data accuracy >99% for mission-critical events",
              "Event coverage >90% for primary user journeys",
              "Schema validation pass rate 100% in production",
              "Implementation review time <4 hours average",
              "Data downtime <4 hours monthly (TTD + TTR)",
              "Table uptime >95% for production systems",
              "Zero privacy violations or data breaches",
              "Analytics adoption >80% across teams"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Using dynamic event names that break funnel analysis, implementing without clear business goals, neglecting data governance and privacy, creating event sprawl without documentation, treating analytics as developer-only concern
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Event accuracy monitoring with schema validation, data quality dashboards tracking completeness and consistency, automated test coverage reporting, peer review compliance tracking, real-time data flow monitoring
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Data Analysis" variant="default" size="sm" />
            <NavigationChip skill="Product Strategy" variant="outline" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}