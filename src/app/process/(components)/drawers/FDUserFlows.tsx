'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface FDUserFlowsProps {
  className?: string
  onClose?: () => void
}

export function FDUserFlows({ className, onClose }: FDUserFlowsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        genericTool("Whimsical"),
        genericTool("Lucidchart")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Flow Design"
        title="User Flows"
        summary="Map the paths users take — the happy path, the edge cases, and the places they get stuck."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=User%20Flow%20Design"
        enableComments={true}
        itemId="flow-design-flows"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            A user flow is just a diagram of how someone gets from A to B in your product. Start here, click this, see that, done. Simple in theory, surprisingly easy to get wrong in practice.
          </p>
          <p>
            The value of mapping flows is forcing yourself to think through the edge cases. What if they&apos;re not logged in? What if the data is empty? What if they hit the back button? These questions are easier to answer on a whiteboard than in code.
          </p>
        </div>

        {/* What I include */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I include in a flow
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Entry points.</strong> How did they get here? Direct link? Navigation? Search?</li>
              <li><strong>Decision points.</strong> Where do they need to make a choice? What information do they need to make it?</li>
              <li><strong>Error states.</strong> What happens when something goes wrong? Can they recover?</li>
              <li><strong>Exit points.</strong> Where do they go next? Back to home? To another flow?</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Engineers aren&apos;t asking &quot;what happens if...?&quot; during implementation because the flow diagram already answered it.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Information Architecture" variant="default" size="sm" />
            <NavigationChip skill="Wireframing" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
