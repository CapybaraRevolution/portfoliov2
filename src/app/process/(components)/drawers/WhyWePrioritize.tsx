'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        genericTool("OKR tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Why Prioritize"
        summary="You can&apos;t do everything. Prioritization forces the hard conversation about what actually matters."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="why-we-prioritize"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Every team I&apos;ve worked with has more ideas than capacity. That&apos;s not a problem — it&apos;s the default state. The problem is when nobody wants to make the hard call about what <em>not</em> to do.
          </p>
          <p>
            Without prioritization, everything becomes &quot;high priority,&quot; which means nothing is. Teams spread thin trying to do a little of everything and end up shipping nothing well. Or worse, the loudest stakeholder wins every time, regardless of actual value.
          </p>
          <p>
            Prioritization forces the conversation. It makes trade-offs explicit. It turns a wish list into a strategy.
          </p>
        </div>

        {/* Why I care */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Why this matters to me
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              I&apos;ve seen teams burn out trying to do everything their stakeholders asked for. I&apos;ve seen roadmaps that were really just lists of demands with no sequencing logic. I&apos;ve seen features ship that nobody wanted because someone had to justify a quarter&apos;s work.
            </p>
            <p>
              Good prioritization prevents all of that. It&apos;s not sexy, but it&apos;s the difference between a team that ships value and a team that ships tickets.
            </p>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Someone asks &quot;why aren&apos;t we building X?&quot; and there&apos;s an actual answer with reasoning — not just &quot;we ran out of time.&quot;
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
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
