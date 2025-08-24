'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface OpportunityBacklogProps {
  className?: string
  onClose?: () => void
}

export function OpportunityBacklog({ className, onClose }: OpportunityBacklogProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("jira", "Jira", "md"),
        toolPill("asana", "Asana", "md"),
        genericTool("Roadmap tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Opportunity Backlog"
        summary="Our opportunity backlog represents the single source of truth for all potential value-creating initiatives, maintained using DEEP principles."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="opportunity-backlog"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Our opportunity backlog represents the single source of truth for all potential value-creating initiatives, maintained using DEEP principles (Detailed appropriately, Estimated, Emergent, Prioritized). We implement continuous refinement processes that keep 2-3 sprints of ready work available while managing backlog health through age analysis, flow metrics, and value tracking. The backlog evolves through structured ceremonies, stakeholder collaboration, and data-driven grooming sessions that transform raw ideas into actionable, well-defined opportunities ready for development.
          </p>
        </div>

        {/* Why it matters */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Why it matters
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Predictability enhancement: Maintaining 1.5-2x velocity in ready items improves sprint planning accuracy by 85% and reduces planning meeting time by 50%",
              "Waste elimination: Regular backlog grooming prevents 60% of items from becoming stale, saving teams from investing in obsolete requirements",
              "Flow optimization: Proper backlog management improves cycle time by 40% and increases throughput by 25% through reduced wait states",
              "Stakeholder alignment: Transparent backlog management increases stakeholder confidence by 70% through visible priorities and progress",
              "Value maximization: Active backlog curation ensures teams work on highest-value items, improving ROI by 35% compared to ad-hoc selection"
            ]}
          />
        </div>


        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Strategic initiatives from leadership planning, feature requests from customer success and sales teams, technical debt assessments from engineering, user feedback from support channels and research sessions, competitive intelligence from market analysis, compliance and regulatory requirements, bug reports and system performance data, and stakeholder-driven enhancement requests that align with business objectives.
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
              "DEEP maintenance: Ensure backlog items are Detailed appropriately, Estimated accurately, Emergent in priority, and Prioritized by value",
              "Refinement sessions: Conduct regular grooming ceremonies to break down epics, clarify requirements, and estimate complexity",
              "Value assessment: Score opportunities using weighted criteria including business impact, user value, technical feasibility, and strategic alignment",
              "Dependency mapping: Identify and document technical, resource, and timeline dependencies across backlog items",
              "Age analysis: Monitor backlog health through item aging reports, staleness metrics, and regular cleanup of obsolete requirements",
              "Stakeholder collaboration: Facilitate cross-functional discussions to validate assumptions, clarify acceptance criteria, and align on priorities",
              "Flow optimization: Maintain 2-3 sprints of ready work while preventing bottlenecks and ensuring smooth handoffs between teams",
              "Outcome tracking: Connect backlog items to measurable business metrics and user outcomes for post-deployment validation"
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
              "Prioritized opportunity backlog with DEEP compliance scoring, value rankings, and effort estimates for development planning",
              "Backlog health dashboards showing aging analysis, flow metrics, completion rates, and capacity utilization across teams",
              "Opportunity documentation templates including problem statements, success criteria, acceptance criteria, and technical specifications",
              "Value assessment frameworks with weighted scoring models, ROI calculations, and risk-adjusted priority rankings",
              "Refinement session outputs including story breakdowns, dependency maps, technical spike results, and estimation consensus",
              "Stakeholder alignment reports documenting requirement validation, assumption testing results, and cross-functional agreement",
              "Flow optimization recommendations for backlog sizing, queue management, and bottleneck resolution strategies",
              "Outcome tracking systems linking backlog items to business metrics, user satisfaction scores, and post-deployment validation results"
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
              "Sprint planning efficiency: 90% of planned work comes from refined backlog, reducing planning time by 50% and increasing commitment accuracy to 95%",
              "Backlog health metrics: Less than 15% of items are older than 90 days, with 85% of backlog items having clear acceptance criteria and effort estimates",
              "Flow predictability: Teams maintain 1.5-2x sprint capacity in ready work, enabling consistent velocity and reducing blocked work by 40%",
              "Stakeholder satisfaction: 90% of stakeholders report clear visibility into feature status and priorities through self-service backlog access",
              "Value delivery optimization: 80% of completed work traces back to measurable business outcomes with post-deployment validation",
              "Cross-team alignment: Dependency conflicts reduced by 60% through proactive backlog coordination and shared priority understanding",
              "Waste elimination: Less than 10% of started work is abandoned or significantly reworked due to poor requirements or outdated priorities"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Avoid over-engineering the backlog with excessive detail upfront—maintain appropriate fidelity based on timeline proximity. Don't let the backlog become a graveyard of stale items; regularly purge outdated requirements and reassess priorities based on current business context. Resist the temptation to plan too far ahead in detail, as market conditions and technical discoveries will inevitably shift priorities. Prevent stakeholder bypass behaviors by ensuring the backlog remains the authoritative source for all development work, not a parallel system to urgent requests. Finally, don't sacrifice quality for quantity—a smaller, well-maintained backlog with clear priorities outperforms a massive, unwieldy collection of poorly defined opportunities.
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Backlog velocity tracking (items completed per sprint), aging analysis (time since item creation/last update), DEEP compliance scoring (percentage of items meeting quality standards), stakeholder satisfaction surveys (quarterly feedback on backlog transparency), flow metrics (cycle time from backlog to delivery), capacity utilization rates (sprint commitment vs. delivery), dependency conflict tracking (blocked items and resolution time), and outcome correlation analysis (backlog priorities vs. business results).
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Prioritization" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}