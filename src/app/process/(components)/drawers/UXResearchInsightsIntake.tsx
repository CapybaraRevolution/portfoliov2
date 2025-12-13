'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Research repos")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Research Insights Intake"
        summary="Research that doesn&apos;t change what you build is just expensive trivia."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Research"
        enableComments={true}
        itemId="ux-research-insights-intake"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            I&apos;ve seen companies do tons of research and then... nothing. The insights live in a deck somewhere. Nobody references them. Features ship without considering what users actually said.
          </p>
          <p>
            Research is only valuable if it changes decisions. That means the insights need to be findable, understandable by non-researchers, and connected to the backlog. Otherwise you&apos;re just generating trivia.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I make research stick
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Atomic insights.</strong> Break findings into small, reusable pieces that can be tagged and searched. &quot;Users struggle with X because Y&quot; — not 50-page reports.</li>
              <li><strong>Connect to decisions.</strong> Every insight should link to a feature, a hypothesis, or a &quot;we decided not to&quot; record. Orphan insights are useless.</li>
              <li><strong>Make it searchable.</strong> If a PM can&apos;t find the research themselves, they won&apos;t use it. Invest in the taxonomy.</li>
              <li><strong>Score by severity × frequency.</strong> A problem that happens to everyone every day matters more than an edge case.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Someone in a planning meeting says &quot;wait, didn&apos;t we research this?&quot; — and then actually finds the answer in under a minute. That&apos;s a research repo doing its job.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
            <NavigationChip skill="Product Strategy" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
