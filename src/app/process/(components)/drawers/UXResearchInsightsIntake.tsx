'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

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
        summary="Turn research findings into decisions that ship — not decks that collect dust."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Research"
        enableComments={true}
        itemId="ux-research-insights-intake"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Research is only valuable if it changes what you build
            </h3>
            <BulletList 
              color="emerald"
              items={[
                "Decisions backed by evidence stick. Decisions backed by opinions get re-argued.",
                "Insights that live in a searchable repo get reused. Insights buried in Notion die.",
                "Features tied to research succeed more often. (Turns out users know what they need.)"
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
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Interview transcripts · Usability test results · Survey data · Analytics · Support tickets · Competitive research · Journey maps
          </p>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Affinity mapping: cluster observations into themes, dot-vote to prioritize, turn patterns into actionable insights",
              "Atomic research: break insights into reusable pieces (facts, insights, conclusions) with tags so they&apos;re findable later",
              "Severity × frequency scoring: prioritize usability issues by how bad they are and how often they happen",
              "RICE scoring: Reach, Impact, Confidence, Effort — score insights so the backlog isn&apos;t just vibes",
              "Opportunity solution trees: connect insights → opportunities → solutions → experiments",
              "Mixed-methods validation: back up qualitative with quantitative (or flag when you can&apos;t)"
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
              "Research synthesis with prioritized insights",
              "Searchable insight repository (tagged, reusable)",
              "Opportunity solution tree",
              "Severity-frequency matrix",
              "RICE-scored feature recommendations"
            ]}
          />
        </div>

        {/* Signals of success */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Signals of success
          </h3>
          <BulletList 
            color="zinc"
            items={[
              "Research insights actually influence what gets built",
              "Old insights get reused instead of re-researched",
              "Time from insight to decision shrinks",
              "Non-researchers can find and use the research themselves"
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
              "Analysis paralysis — at some point you have to ship",
              "Cherry-picking insights that confirm what you already wanted to build",
              "Stripping context until the insight means nothing",
              "Taxonomy bloat (17 levels of tags nobody uses)",
              "Hoarding insights in silos instead of sharing them"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Insight utilization tracking · Repository search analytics · Feature-to-insight traceability
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