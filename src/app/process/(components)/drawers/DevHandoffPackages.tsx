'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface DevHandoffPackagesProps {
  className?: string
  onClose?: () => void
}

export function DevHandoffPackages({ className, onClose }: DevHandoffPackagesProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("DevMode"),
        toolPill("jira", "Jira", "md"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Dev Handoff Packages"
        summary="Everything engineers need to build it right — in one place, not scattered across Slack threads."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="dev-handoff-packages"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Handoffs fail when the spec lives in someone&apos;s head. Or when it&apos;s scattered across 15 Figma files, 3 Slack threads, and a ticket that hasn&apos;t been updated since kickoff.
          </p>
          <p>
            A good handoff package has everything an engineer needs to build: the designs, the specs, the edge cases, the acceptance criteria. All in one place. No hunting. No guessing. No &quot;I thought it was supposed to work like...&quot;
          </p>
        </div>

        {/* What I include */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I include
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Figma frames with every state.</strong> Not just the happy path — empty, loading, error, disabled. All of it.</li>
              <li><strong>Annotations.</strong> What happens on click? Where does this data come from? What are the character limits?</li>
              <li><strong>Design tokens.</strong> The colors, spacing, and typography values — named and documented so devs don&apos;t eyeball it.</li>
              <li><strong>Acceptance criteria.</strong> How do we know it&apos;s done? Specific, testable conditions.</li>
              <li><strong>Assets.</strong> Optimized SVGs, icons, whatever they need — exported and ready to use.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Engineers stop asking clarifying questions after handoff. The build matches the design on the first review. No one says &quot;I didn&apos;t know it was supposed to do that.&quot;
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Design Systems" variant="default" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
