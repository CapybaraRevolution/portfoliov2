'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ClickablePrototypesProps {
  className?: string
  onClose?: () => void
}

export function ClickablePrototypes({ className, onClose }: ClickablePrototypesProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Maze"),
        toolPill("zoom", "Zoom", "md"),
        toolPill("loom", "Loom", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 3 · Design & Prototyping"
        title="Clickable Prototypes"
        summary="Click through it before you build it. A prototype is cheaper than a rewrite."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Prototyping"
        enableComments={true}
        itemId="clickable-prototypes"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            A prototype lets you experience the product before it exists. Click this, see that, go here. It&apos;s not code — it&apos;s a simulation. But it&apos;s realistic enough to test with users and get meaningful feedback.
          </p>
          <p>
            I build prototypes for the critical paths: onboarding, first-time use, the purchase flow, whatever matters most. Then I run quick usability tests to catch problems while they&apos;re still cheap to fix.
          </p>
        </div>

        {/* How I use them */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I use them
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>User testing.</strong> &quot;Show me how you&apos;d do X.&quot; Watch where they hesitate, where they click wrong, where they get confused.</li>
              <li><strong>Stakeholder alignment.</strong> A prototype ends debates about what &quot;it&quot; is. Everyone can see the same thing.</li>
              <li><strong>Engineering handoff.</strong> Instead of describing interactions, I show them. Click, hover, transition, done.</li>
              <li><strong>Investor/client demos.</strong> A polished prototype is worth more than a slide deck full of promises.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Users complete the critical tasks in the prototype without getting stuck. And the team makes a decision — ship, revise, or cut — within a week of testing.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Prototyping" variant="default" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
