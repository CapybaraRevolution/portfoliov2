'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface WhyWePrioritizeProps {
  className?: string
  onClose?: () => void
}

export function WhyWePrioritize({ className, onClose }: WhyWePrioritizeProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("google", "Google Sheets", "md"),
        genericTool("Prioritization frameworks"),
        genericTool("OKR tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Why We Prioritize"
        summary="Focus beats volume. Prioritization turns a long wish list into the next best set of bets."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="why-we-prioritize"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            You can&apos;t do everything. Prioritization forces the hard conversations about what matters most — and what we&apos;re explicitly choosing not to do (for now). Without it, teams spread thin and ship nothing well.
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
                "Portfolio waste reduction: Poor prioritization creates 20% average portfolio waste, costing organizations millions annually through misaligned projects and missed opportunities",
                "Decision fatigue mitigation: Executives make 35,000 decisions daily, with decision fatigue costing the global economy $400 billion annually in lost productivity—systematic prioritization reduces cognitive load by 60%",
                "Resource optimization: Proper prioritization improves productivity by 2x, reducing context switching costs that consume 40% of knowledge workers' time and enabling teams to focus on highest-value work",
                "Strategic alignment acceleration: Projects aligned through prioritization are 57% more likely to meet business goals, 50% more likely to complete on time, and 45% more likely to stay within budget",
                "Opportunity cost prevention: Wrong priorities compound over time, causing organizations to miss 3x potential returns on strategic investments and lose first-mover advantages in competitive markets"
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
            Strategic business objectives and OKRs from executive leadership · Market analysis and competitive intelligence reports · Customer feedback, NPS scores, and user research insights · Resource capacity assessments and skill inventories · Financial constraints and budget allocations · Technical debt assessments and system architecture evaluations · Regulatory requirements and compliance mandates · Risk assessments and business continuity requirements
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
              "Strategic alignment: score everything against business objectives",
              "Cost of Delay: what&apos;s the cost of not doing this? Sequence by urgency.",
              "Stakeholder alignment: cross-functional workshops to agree on criteria",
              "Capacity reality check: what can we actually do with the team we have?",
              "Risk-adjusted scoring: security and compliance issues get weighted higher",
              "Document the decisions: rationale, assumptions, trade-offs — for future reference"
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
              "Executive prioritization dashboard with interactive scenario modeling",
              "Strategic alignment scorecard mapping initiatives to business objectives",
              "Prioritized initiative roadmap with quarterly release plans",
              "Resource allocation matrix showing team assignments and capacity utilization",
              "Cost of Delay analysis report with economic impact projections",
              "Stakeholder consensus documentation and RACI matrices",
              "Risk-adjusted opportunity backlog with confidence scores",
              "Trade-off analysis presentations for executive decision-making"
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
              "Portfolio efficiency: 80% of resources allocated to strategically aligned initiatives (benchmark: 60%)",
              "Waste reduction: Less than 5% portfolio waste vs. industry average of 20%",
              "Decision velocity: Prioritization decisions made within 48 hours vs. weeks of deliberation",
              "Stakeholder alignment: 85% stakeholder satisfaction with prioritization process and outcomes",
              "Value realization: 40% improvement in value delivery per resource dollar invested",
              "Predictability: 90% of prioritized initiatives meeting defined success criteria",
              "Cycle time reduction: 50% reduction in time from idea to prioritization decision"
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
              "Analysis paralysis: Over-analyzing options instead of making timely decisions with 80% confidence",
              "HiPPO dominance: Allowing the Highest Paid Person's Opinion to override data-driven prioritization",
              "Static prioritization: Failing to regularly reassess priorities as conditions change",
              "Perfect information seeking: Waiting for complete data instead of using probabilistic decision-making",
              "Silo-based decisions: Prioritizing within departments rather than across the portfolio",
              "Ignoring technical debt: Focusing only on features while accumulating crippling technical debt",
              "Metric gaming: Manipulating scoring to justify predetermined decisions"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Portfolio efficiency tracking with resource allocation monitoring, decision velocity measurement from idea to prioritization, stakeholder satisfaction surveys with prioritization confidence scoring, value realization correlation analysis between predicted and actual outcomes
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="OKRs" variant="outline" size="sm" />
            <NavigationChip skill="Prioritization" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}