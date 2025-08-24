'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/ui/NavigationChip'

interface UXResearchInsightsIntakeProps {
  className?: string
  onClose?: () => void
}

export function UXResearchInsightsIntake({ className, onClose }: UXResearchInsightsIntakeProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("dovetail", "Dovetail", "md"),
        toolPill("airtable", "Airtable", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("userinterviews", "UserInterviews", "md"),
        genericTool("Research repositories"),
        genericTool("Opportunity solution trees")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="UX Research Insights Intake"
        summary="We transform UX research findings into actionable product decisions through systematic synthesis, prioritization, and impact measurement frameworks. Our methodology integrates atomic research principles for knowledge management, opportunity solution trees for research-to-roadmap translation, and mixed-methods validation for confidence scoring."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Research"
        enableComments={true}
        itemId="ux-research-insights-intake"
      >

        {/* Why it matters */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Why it matters
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Decision confidence: Structured insight prioritization improves product decision confidence by 60% through evidence-based scoring and validation",
              "Research ROI maximization: Atomic research methodology enables 70% insight reuse across projects, reducing duplicate research and accelerating decision-making",
              "Impact measurement: Connecting research insights to business metrics demonstrates 35% improvement in feature success rates",
              "Democratization benefits: Self-service research platforms increase insight consumption by 3x while reducing researcher bottlenecks",
              "Speed to action: Systematic research-to-roadmap translation reduces time from insight to implementation by 50%"
            ]}
          />
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            User interview transcripts and recordings · Usability testing results and task success metrics · Survey responses and quantitative data · Analytics data and behavioral metrics · Customer support tickets and feedback · Competitive analysis and market research · Journey maps and service blueprints · Diary study entries and ethnographic observations
          </p>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Affinity mapping synthesis: Facilitate collaborative sessions to cluster observations into themes, use diverge-converge techniques for democratic participation, prioritize theme clusters through dot voting, create actionable insight statements from patterns",
              "Thematic analysis execution: Apply six-step Braun & Clarke process (familiarization, coding, theme generation, review, definition, reporting), conduct inductive analysis for emergent themes, validate themes through inter-rater reliability checks",
              "Atomic research implementation: Break insights into reusable components (experiments, facts, insights, conclusions), create searchable taxonomies with global and project-specific tags, enable cross-project insight discovery, maintain evidence provenance for all assertions",
              "Severity-frequency prioritization: Score usability issues on severity (blocker to cosmetic) and frequency (every use to rare), create prioritization matrices identifying critical issues, calculate cumulative impact for minor but frequent problems",
              "RICE scoring for insights: Assess Reach (users affected), Impact (0.25-3 scale), Confidence (50-100%), and Effort to address, calculate prioritized scores for research-driven features, document confidence levels based on evidence strength",
              "Opportunity solution mapping: Connect research insights to desired business outcomes, map customer opportunities from research findings, generate solution hypotheses linked to specific insights, design experiments to validate assumptions",
              "Mixed-methods validation: Triangulate qualitative findings with quantitative data, calculate statistical significance for behavioral patterns, determine sample sizes for generalization confidence, create confidence intervals for key insights",
              "Research democratization setup: Implement self-service platforms with role-based access, create insight repositories with standardized formats, develop training programs for non-researchers, establish quality assurance workflows"
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Deliverables
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Research synthesis report with prioritized insights",
              "Atomic research repository with tagged, searchable insights",
              "Opportunity solution tree linking insights to product decisions",
              "Severity-frequency matrix for usability issues",
              "RICE-scored feature recommendations from research",
              "Confidence assessment framework with validation metrics",
              "Research democratization playbook and training materials",
              "Impact measurement dashboard tracking insight outcomes"
            ]}
          />
        </div>

        {/* Signals of success */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Signals of success
          </h3>
          <BulletList 
            color="orange"
            items={[
              "Insight utilization rate: 80% of research insights influencing product decisions",
              "Reuse efficiency: 70% of insights referenced across multiple projects",
              "Decision speed: 50% reduction in time from research to product decision",
              "Validation confidence: 85% of insights validated through mixed methods",
              "Democratization adoption: 3x increase in non-researcher insight consumption",
              "Impact correlation: 75% of successful features traced to research insights",
              "Repository health: 90% of insights properly tagged and findable"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Analysis paralysis: Over-analyzing instead of moving to action · Cherry-picking: Selecting only insights that confirm existing beliefs · Context stripping: Removing insights from their original context · Over-democratization: Sacrificing quality for accessibility · Validation gaps: Acting on unvalidated qualitative findings · Taxonomy bloat: Creating overly complex categorization systems · Insight hoarding: Keeping insights in silos rather than sharing broadly
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Research insight utilization tracking with product decision correlation, atomic research repository health monitoring with tagging and search analytics, validation confidence scoring with mixed-methods verification rates, democratization platform usage analytics with non-researcher adoption metrics
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" />
            <NavigationChip skill="Data Analysis" variant="outline" />
            <NavigationChip skill="Product Strategy" variant="outline" />
            <NavigationChip skill="Communication" variant="outline" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}