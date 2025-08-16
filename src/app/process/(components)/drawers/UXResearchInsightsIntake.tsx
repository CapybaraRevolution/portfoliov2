'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface UXResearchInsightsIntakeProps {
  className?: string
  onClose?: () => void
}

export function UXResearchInsightsIntake({ className, onClose }: UXResearchInsightsIntakeProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("dovetail", "Dovetail", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("userinterviews", "UserInterviews", "md"),
        genericTool("Research repositories")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="UX Research Insights Intake"
        summary="Transform research findings into prioritized product opportunities with clear success criteria."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Research"
        enableComments={true}
        itemId="ux-research-insights-intake"
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
              Research insights lose impact when they sit in reports. Systematic intake translates findings into scored opportunities that compete fairly in prioritization.
            </p>
          </div>
        </div>

        {/* Research-to-roadmap flow */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Research-to-roadmap flow
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">1. Extract insights</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ User pain points, unmet needs, behavior patterns</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">2. Generate opportunities</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ "How might we..." statements linked to specific insights</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">3. Score and prioritize</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Apply standard framework with research confidence level</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">4. Define success criteria</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Measurable outcomes that validate the research hypothesis</p>
                </div>
              </div>
            </div>
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
              "Create intake templates that capture insight context and confidence",
              "Facilitate workshops to translate findings into opportunity statements",
              "Establish scoring criteria that weight research quality and sample size",
              "Build feedback loops from implementation back to research hypotheses"
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
              "Research insight intake templates and process",
              "Insight-to-opportunity mapping workshops",
              "Research-weighted scoring criteria",
              "Success criteria definitions tied to research goals"
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
              "Research insights become backlog items within 2 weeks of study completion",
              "Product decisions can be traced back to specific research findings",
              "Research ROI is measurable through implemented opportunity outcomes"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}