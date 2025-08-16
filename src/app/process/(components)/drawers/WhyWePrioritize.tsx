'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

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

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Without rules, the roadmap drifts. Clear priorities reduce thrash, accelerate decisions, and keep us building what moves the metric.
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
              "Map business goals to user needs and system constraints",
              "Create shared scoring criteria (impact, effort, confidence)",
              "Establish decision-making cadence and DRI ownership",
              "Build transparent backlog with clear acceptance criteria"
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Prioritization policy (one page)",
              "Shared backlog taxonomy (Initiative → Epic → Opportunity/Story)",
              "Decision RACI & DRI",
              "Scoring framework with clear criteria"
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
              "Team can explain top 3 priorities and why they rank higher than #4",
              "< 2 weeks from idea to prioritized backlog placement",
              "Roadmap changes correlate to new data, not new opinions"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}