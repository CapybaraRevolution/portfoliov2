'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface HowWePrioritizeProps {
  className?: string
  onClose?: () => void
}

export function HowWePrioritize({ className, onClose }: HowWePrioritizeProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("google", "Google Sheets", "md"),
        genericTool("RICE framework"),
        genericTool("WSJF framework"),
        genericTool("Kano model tools"),
        genericTool("Planning Poker")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="How We Prioritize"
        summary="RICE, impact scoring, and other frameworks to rank opportunities objectively."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="how-we-prioritize"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            We deploy a sophisticated toolkit of prioritization frameworks tailored to context, combining quantitative scoring models with qualitative assessment techniques. Our multi-framework approach includes RICE for data-driven feature prioritization, WSJF for economic sequencing in agile environments, Kano model for customer delight optimization, MoSCoW for time-boxed deliveries, and Impact/Effort matrices for rapid decision-making. Each framework is calibrated to organizational context with clear scoring rubrics, inter-rater reliability measures, and continuous refinement based on outcome analysis.
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
                "Bias reduction: Structured frameworks eliminate 70% of cognitive biases in decision-making, replacing subjective preferences with objective scoring criteria",
                "Consistency improvement: Teams using calibrated frameworks report 40-60% improvement in prioritization confidence and 50% reduction in decision reversal rates",
                "Stakeholder buy-in: Transparent methodologies increase stakeholder agreement by 85% through clear scoring logic and documented rationale",
                "Speed enhancement: Framework-based decisions are made 3x faster than unstructured deliberations while maintaining higher quality outcomes",
                "Economic optimization: WSJF implementation improves economic returns by 25-40% through optimal job sequencing based on cost of delay"
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
            Quantitative metrics: user analytics, conversion rates, revenue data · Qualitative research: user interviews, usability findings, support tickets · Technical assessments: effort estimates, architectural impact, dependencies · Market intelligence: competitive analysis, industry trends, regulatory changes · Resource constraints: team capacity, skill availability, budget limitations · Strategic priorities: business objectives, OKRs, executive mandates · Risk evaluations: security assessments, compliance requirements, technical debt
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
              "RICE implementation: Score initiatives using Reach (users impacted quarterly), Impact (0.25-3 scale), Confidence (50-100%), and Effort (person-months), calculating final scores as (R×I×C)/E with documented rationale for each component",
              "WSJF calculation: Quantify Cost of Delay using business value, time criticality, and risk reduction factors (Fibonacci scale 1-20), divide by job duration to sequence work for maximum economic benefit",
              "Kano analysis execution: Design and deploy feature preference surveys with functional/dysfunctional question pairs, analyze responses to categorize features as Must-Be, Performance, or Attractive, prioritizing based on customer satisfaction impact",
              "MoSCoW categorization: Facilitate stakeholder workshops to classify requirements as Must-Have (max 60%), Should-Have, Could-Have (20% buffer), and Won't-Have, using evidence-based negotiation to resolve conflicts",
              "Impact/Effort matrix plotting: Conduct collaborative workshops using dot voting to place initiatives in quadrants (Quick Wins, Major Projects, Fill-ins, Thankless Tasks), focusing resources on high-impact/low-effort opportunities",
              "Framework calibration sessions: Run quarterly calibration workshops to align scoring interpretations across teams, review historical scores against actual outcomes, and refine estimation accuracy",
              "Multi-framework synthesis: Apply appropriate frameworks based on context—RICE for product features, WSJF for agile programs, Kano for customer experience, MoSCoW for fixed timelines—combining insights for comprehensive prioritization",
              "Scoring documentation: Maintain detailed records of all scoring decisions including assumptions, data sources, confidence levels, and dissenting opinions for future reference and continuous improvement"
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
              "RICE scoring spreadsheet with automated calculations and visualizations",
              "WSJF priority matrix with economic sequencing recommendations",
              "Kano model analysis report with feature categorization and satisfaction projections",
              "MoSCoW requirement breakdown with resource allocation percentages",
              "Impact/Effort quadrant visualization with action recommendations",
              "Framework selection guide mapping contexts to appropriate methodologies",
              "Calibration workshop reports with inter-rater reliability metrics",
              "Prioritization decision log with comprehensive scoring rationale"
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
              "Scoring consistency: Inter-rater reliability coefficient >0.8 across teams",
              "Framework adoption: 100% of product decisions using structured frameworks",
              "Prediction accuracy: 85% correlation between predicted and actual impact",
              "Decision speed: Average prioritization time reduced from days to hours",
              "Stakeholder satisfaction: 90% agreement with framework-based decisions",
              "Value delivery: 30% increase in delivered value per sprint",
              "Feature success rate: 75% of prioritized features meeting success metrics"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Framework rigidity: Applying frameworks without considering context or exceptions · Over-precision: Creating false accuracy with excessive decimal places in scoring · Gaming the system: Manipulating inputs to achieve desired prioritization outcomes · Single framework dependence: Using one framework for all situations regardless of fit · Calibration drift: Allowing scoring interpretations to diverge over time · Documentation gaps: Failing to record rationale for future learning · Stakeholder exclusion: Not involving key perspectives in scoring processes
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Inter-rater reliability scoring for framework consistency, prediction accuracy tracking comparing forecasted to actual impact, decision velocity measurement from request to prioritization, stakeholder satisfaction surveys with framework confidence ratings
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Prioritization" variant="default" size="sm" />
            <NavigationChip skill="OKRs" variant="outline" size="sm" />
            <NavigationChip skill="Roadmap" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}