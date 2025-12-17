'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface JMDecisionsProps {
  className?: string
  onClose?: () => void
}

export function JMDecisions({ className, onClose }: JMDecisionsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "Figma", "md"),
        genericTool("Prioritization")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Journey Mapping"
        title="Turn insights into decisions"
        summary="Insights without action are just expensive documentation. Pick something and ship it."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Strategic%20Planning"
        enableComments={true}
        itemId="journey-mapping-decisions"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Journey maps are great, but they&apos;re not the goal. The goal is making something better. I&apos;ve seen teams create beautiful journey maps that sit in a FigJam file forever while the actual product stays broken.
          </p>
          <p>
            The point of mapping is to prioritize. You found 15 friction points? Cool. Which 3 matter most? Which ones can you actually fix with the team and time you have? That&apos;s where the real work starts.
          </p>
        </div>

        {/* How I move from map to action */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I move from map to action
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Score by impact × effort.</strong> Big pain that&apos;s easy to fix? Do that first.</li>
              <li><strong>Identify quick wins.</strong> Things you can ship in under 2 weeks to build momentum and show value.</li>
              <li><strong>Surface dependencies.</strong> Some fixes require coordination across teams. Better to know that now.</li>
              <li><strong>Define success criteria.</strong> How will you know if the fix worked? Decide before you build.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The journey map has dates on it — &quot;Fixed in Q2,&quot; &quot;Experiment running,&quot; &quot;Deprioritized because X.&quot; A map that&apos;s annotated with decisions is a map that&apos;s actually being used.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Prioritization" variant="default" size="sm" />
            <NavigationChip skill="Product Strategy" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}