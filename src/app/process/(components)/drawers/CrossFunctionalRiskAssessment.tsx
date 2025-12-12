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
        summary="What could go wrong? Ask everyone in the room. Then plan for it."
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
            Risks you don&apos;t talk about still happen — they just surprise you. I run structured workshops with dev, QA, ops, security, and product to surface risks early and plan mitigations before we ship.
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

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Structured risk workshops: 1 hour, 10-15 people, TARA method (Transfer, Avoid, Reduce, Accept)",
              "Risk matrix: likelihood × impact scoring with clear thresholds",
              "Risk register: ID, description, probability, impact, owner, mitigation",
              "Mitigation planning: contingency procedures, rollback plans, emergency comms",
              "Quarterly reviews: reassess, close what&apos;s handled, catch new risks",
              "Categorize: technical, operational, external, capacity/scaling"
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
          <BulletList 
            color="zinc"
            items={[
              "Conducting risk assessment only at project start",
              "Missing cross-functional perspectives",
              "Creating generic non-actionable risks",
              "Failing to assign clear ownership",
              "Over-focusing on technical risks only",
              "Lack of regular risk register maintenance"
            ]}
          />
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