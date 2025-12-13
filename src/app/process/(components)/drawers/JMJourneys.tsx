'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface JMJourneysProps {
  className?: string
  onClose?: () => void
}

export function JMJourneys({ className, onClose }: JMJourneysProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("ga4", "Analytics", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Journey Mapping"
        title="Journeys & top frictions"
        summary="Where do users get stuck? Where do they leave? Map the friction, then fix it."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Journey%20Mapping"
        enableComments={true}
        itemId="journey-mapping-journeys"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            A journey map is just a visual story of how someone goes from &quot;I have a problem&quot; to &quot;problem solved&quot; (or, more commonly, &quot;I gave up&quot;). The value isn&apos;t in the artifact — it&apos;s in the conversations it forces about where things break down.
          </p>
          <p>
            I map the whole flow: first touch to success. Along the way I note where emotions spike (good or bad), where people drop off, and where the current experience doesn&apos;t match what users expect. Those gaps are opportunities.
          </p>
        </div>

        {/* What I look for */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I look for
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Drop-off points.</strong> Where in the flow do people leave? Is it confusion, friction, or just a natural exit?</li>
              <li><strong>Emotional peaks.</strong> Delight moments we should amplify, frustration moments we should fix.</li>
              <li><strong>Channel handoffs.</strong> Email → app → phone? Those transitions are often where trust breaks.</li>
              <li><strong>Unmet expectations.</strong> What did they expect to happen that didn&apos;t?</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The team can point to the journey map and say &quot;this is the highest-friction moment&quot; — and everyone agrees because there&apos;s data backing it up.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
