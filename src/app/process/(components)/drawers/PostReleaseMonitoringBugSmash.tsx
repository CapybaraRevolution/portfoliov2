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
        summary="Establish continuous monitoring and rapid response systems to maintain product quality and user experience after deployment."
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
            Post-release monitoring and bug smash establishes continuous observability and rapid response systems to maintain product quality and user experience after deployment. This vigilant approach transforms launches from one-time events into ongoing quality commitments through proactive monitoring and swift issue resolution. Organizations with mature post-release practices achieve 90% faster issue detection and 65% better customer satisfaction scores.
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
                "Prevents user churn: 88% of users abandon apps after experiencing bugs, making rapid post-release fixes critical for retention.",
                "Accelerates product learning: Real user data in the first 48-72 hours provides insights impossible to replicate in testing environments.",
                "Reduces resolution costs: Issues caught within 24 hours of release cost 10x less to fix than those discovered weeks later.",
                "Improves deployment confidence: Teams with strong monitoring deploy 3x more frequently with 50% fewer rollbacks.",
                "Drives continuous improvement: Post-release retrospectives identify process gaps that prevent future issues."
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

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Establish comprehensive monitoring dashboards tracking business metrics, technical health, user behavior, and error rates with real-time alerting for critical thresholds",
              "Implement post-release validation protocols monitoring success metrics for 48-72 hours, comparing against baselines with statistical significance testing",
              "Create bug triage and prioritization frameworks using P0-P4 severity levels, customer impact assessment, and business value analysis for rapid decision-making",
              "Deploy rapid response procedures with <2 hour P0 acknowledgment, dedicated bug smash teams, and escalation paths for critical issues affecting user experience",
              "Monitor user feedback channels through support tickets, social media, app store reviews, and user session recordings to identify pain points early",
              "Track performance metrics including Core Web Vitals, API response times, error rates, and user engagement patterns with hourly trend analysis",
              "Conduct daily post-release health reviews with cross-functional teams sharing monitoring insights, user feedback, and prioritized action items",
              "Execute comprehensive retrospectives within 1 week of release documenting lessons learned, process improvements, and preventive measures for future releases"
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
              "Real-time monitoring dashboard with success metrics",
              "Daily post-release health reports",
              "Bug triage and prioritization matrix",
              "User feedback analysis and insights",
              "Performance trend analysis reports",
              "Incident response action items",
              "Post-release retrospective documentation",
              "Continuous improvement recommendations"
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
              "Success metrics trending toward targets within 72 hours",
              "P0/P1 bugs acknowledged <2 hours, resolved <24 hours",
              "User satisfaction maintained >90% post-release",
              "Error rate increase <0.5% from pre-release baseline",
              "Performance regression <5% for Core Web Vitals",
              "Customer support ticket volume increase <20%",
              "Post-release retrospective completion 100% within 1 week",
              "Bug smash team response time <30 minutes for critical issues"
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
              "Monitoring metrics without user context",
              "Delayed bug triage leading to cascading issues",
              "Ignoring edge case feedback",
              "Treating monitoring as purely technical activity",
              "Missing cross-functional collaboration in post-release reviews"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Success metrics trend monitoring, error rate tracking, user feedback sentiment analysis, performance regression detection, bug resolution time measurement, customer satisfaction scoring, team response time tracking
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