'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface WhyResearchFirstProps {
  className?: string
  onClose?: () => void
}

export function WhyResearchFirst({ className, onClose }: WhyResearchFirstProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion/Confluence"),
        toolPill("figma", "Figma"),
        toolPill("amplitude", "Amplitude/GA4"),
        toolPill("loom", "Loom")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Stage 1: User Research"
        title="Why research first?"
        summary="Because guessing is expensive. Research is cheap insurance."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="user-research-why"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Here&apos;s the uncomfortable truth: most product decisions are educated guesses. That&apos;s fine — you can&apos;t know everything. But some guesses are more expensive to get wrong than others.
          </p>
          <p>
            Research is how you figure out which bets are risky before you make them. Finding a problem in a prototype costs hours. Finding it in production costs sprints. Finding it after launch costs customers.
          </p>
          <p>
            I&apos;m not saying research everything to death. I&apos;m saying be strategic about what you validate. The goal is fewer surprises, not perfect certainty.
          </p>
        </div>

        {/* How I think about it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I think about it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Every research question should connect to a decision. &quot;What do users think about feature X?&quot; is not a research question — it&apos;s trivia. &quot;Should we build feature X, and if so, what version?&quot; is a decision. Research answers that.
            </p>
            <p>
              I start by listing the unknowns from discovery, then ask: which ones could sink us if we guess wrong? Those get research. The rest get timeboxed assumptions we&apos;ll validate later with data.
            </p>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Sprint planning has fewer &quot;unknowns&quot; and stakeholder debates end with &quot;the research showed...&quot; instead of &quot;I think...&quot;
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" size="sm" />
            <NavigationChip skill="Product Strategy" variant="outline" size="sm" />
            <NavigationChip skill="Prioritization" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
