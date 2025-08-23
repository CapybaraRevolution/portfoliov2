'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface CrossFunctionalRiskAssessmentProps {
  className?: string
  onClose?: () => void
}

export function CrossFunctionalRiskAssessment({ className, onClose }: CrossFunctionalRiskAssessmentProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Confluence"),
        genericTool("Airtable")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Cross-Functional Risk Assessment"
        summary="Bring together diverse expertise to identify, evaluate, and mitigate potential threats before release through structured workshops and risk matrices."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Risk%20Management"
        enableComments={true}
        itemId="cross-functional-risk-assessment"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Cross-functional risk assessment brings together diverse expertise to identify, evaluate, and mitigate potential threats before release. This collaborative approach uses structured workshops and risk matrices to transform uncertain threats into manageable action items. Teams implementing comprehensive risk assessment reduce incident rates by 40% while improving deployment confidence.
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
                "Prevents costly incidents: Proactive risk identification costs 10x less than reactive incident response.",
                "Improves deployment success: Teams with formal risk assessment achieve 85% higher deployment success rates.",
                "Enhances team collaboration: Cross-functional workshops break down silos and improve communication by 30%.",
                "Reduces downtime: Proper risk mitigation decreases unplanned outages by 60%.",
                "Accelerates decision-making: Clear risk frameworks enable 3x faster go/no-go decisions."
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
            System architecture documentation · Historical incident reports · Dependency mapping · Security assessment results · Team capacity analysis
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
              "Facilitate structured risk workshops with 1-hour minimum sessions, 10-15 participants maximum, using TARA methodology (Transfer, Avoid, Reduce, Accept)",
              "Apply risk matrix evaluation using likelihood scales (High: <6 months, Medium: <1 year, Low: predicted) and impact categories with weighted scoring systems",
              "Maintain comprehensive risk registers documenting risk ID/description, probability/impact ratings, ownership assignments, and mitigation strategies",
              "Develop mitigation strategies setting tolerance thresholds, allocating one sprint quarterly for risk reduction, and creating specific action plans",
              "Create contingency plans for critical risks with predefined procedures, rollback plans, emergency communications, and automated triggers",
              "Track risk metrics including velocity of identification/mitigation, burndown progress, coverage percentages, and mitigation effectiveness",
              "Review risk assessments every 8 months minimum, during major changes, when onboarding new members, applying deletion rules for irrelevant risks",
              "Categorize risks systematically across technical (legacy code, dependencies), operational (process errors), external (regulatory), and capacity/scaling dimensions"
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
              "Risk assessment workshop minutes",
              "Risk register with scoring matrix",
              "Mitigation action plans with owners",
              "Contingency procedure documentation",
              "Risk burndown charts",
              "Dependency risk mapping",
              "Executive risk summary dashboard",
              "Quarterly risk review reports"
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
              "Risk identification rate >10 per system minimum",
              "High-risk mitigation 100% planned",
              "Risk review frequency every 8 months achieved",
              "Mitigation effectiveness >75% for implemented controls",
              "Risk velocity positive (more risks closed than opened)",
              "Contingency plan coverage 100% for critical risks",
              "Workshop participation >80% from required teams",
              "Time to risk closure <30 days average"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Conducting risk assessment only at project start, missing cross-functional perspectives, creating generic non-actionable risks, failing to assign clear ownership, over-focusing on technical risks only, lack of regular risk register maintenance
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Risk identification and closure velocity tracking, mitigation effectiveness measurement, workshop participation monitoring, risk burndown progress reporting, contingency plan coverage analysis
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Risk Assessment" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Team Leadership" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}