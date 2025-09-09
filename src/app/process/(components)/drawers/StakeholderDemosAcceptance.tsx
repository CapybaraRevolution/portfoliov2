'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface StakeholderDemosAcceptanceProps {
  className?: string
  onClose?: () => void
}

export function StakeholderDemosAcceptance({ className, onClose }: StakeholderDemosAcceptanceProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("loom", "Loom", "md"),
        toolPill("zoom", "Zoom", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("jira", "Jira", "md"),
        genericTool("Linear"),
        genericTool("Sprint Review Canvas")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Stakeholder Demos & Acceptance"
        summary="Transform demos from presentations into strategic engagement opportunities that drive business value realization."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="stakeholder-demos-acceptance"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Stakeholder demos and acceptance represent the critical touchpoint where development work translates into business value. We use structured sprint reviews, collaborative feedback sessions, and formal acceptance procedures to ensure delivered functionality meets business objectives while achieving 78% stakeholder attendance rates.
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
                "Accelerates buy-in and adoption: Teams with structured demo processes achieve 85+ NPS scores for stakeholder satisfaction.",
                "Reduces rework by 36%: Collaborative review sessions during development significantly decrease post-deployment defects.",
                "Improves alignment: Regular sprint reviews ensure 45% better business-IT alignment compared to traditional waterfall approaches.",
                "Drives measurable business outcomes: Structured acceptance processes increase demo-to-close ratios by 42%.",
                "Creates feedback velocity: Organizations implementing formal feedback loops see 15% faster time-to-market for subsequent features."
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
            Sprint backlog with completed user stories · Definition of Done criteria · Product increment ready for demonstration · Business value metrics and KPIs
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
              "Facilitate structured sprint reviews following Scrum.org guidelines with time-boxed sessions (4 hours max for monthly sprints)",
              "Implement Sprint Review Canvas approach covering sprint goals achievement, challenges encountered, stakeholder input capture",
              "Orchestrate live demonstrations of working functionality using actual production-ready code, avoiding mockups or slideware",
              "Apply value-driven presentation frameworks starting with business outcomes and connecting features to measurable results",
              "Execute multi-channel feedback capture including real-time polling, post-demo surveys, one-on-one interviews with key stakeholders",
              "Manage formal acceptance procedures using INVEST criteria with Given/When/Then acceptance scenarios",
              "Conduct stakeholder mapping using influence/interest matrices to optimize meeting schedules and ensure right-level participation"
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
              "Sprint Review meeting minutes with attendance tracking",
              "Stakeholder feedback register with priority scoring",
              "Acceptance confirmation documentation",
              "Business value realization reports",
              "Demo effectiveness dashboard",
              "Action items tracker with ownership assignments",
              "Video recordings of key demonstrations",
              "Updated product backlog based on feedback"
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
              "Attendance rate >78% for sprint review sessions (Microsoft benchmark)",
              "Net Promoter Score >85 for stakeholder satisfaction (Adobe standard)",
              "Feedback implementation rate >45% within subsequent sprints",
              "Demo-to-acceptance ratio >90% for demonstrated features",
              "Average participation rate >42% (questions, polls, active engagement)",
              "Response time <24 hours for feedback incorporation decisions",
              "Business value metrics achievement >80% against sprint goals"
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
              "Using sprint reviews as first-time acceptance",
              "Presenting incomplete work",
              "Focusing on technical features instead of business value",
              "Creating adversarial atmosphere",
              "Ignoring stakeholder feedback",
              "Information overload through unstructured presentations"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Attendance tracking across demo sessions, NPS surveys for stakeholder satisfaction, feedback implementation velocity, demo-to-acceptance conversion rates, business value achievement against KPIs, participation engagement metrics
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Stakeholder Management" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}