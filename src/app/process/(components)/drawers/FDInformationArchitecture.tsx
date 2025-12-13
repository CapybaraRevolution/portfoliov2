'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface FDInformationArchitectureProps {
  className?: string
  onClose?: () => void
}

export function FDInformationArchitecture({ className, onClose }: FDInformationArchitectureProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("Card sorting")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Flow Design"
        title="Information Architecture"
        summary="Organize content the way users think, not the way the org chart looks."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="flow-design-ia"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Every confusing product I&apos;ve ever audited has the same problem: the navigation reflects how the company thinks, not how users think. &quot;Products&quot; and &quot;Solutions&quot; and &quot;Resources&quot; — labels that mean something internally but nothing to someone trying to accomplish a task.
          </p>
          <p>
            Good IA is invisible. When it&apos;s working, people find what they need without thinking about it. When it&apos;s broken, they wander, backtrack, and eventually leave.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Start with user goals.</strong> What are they trying to do? Group things by tasks, not by internal departments.</li>
              <li><strong>Use real language.</strong> Card sorting reveals what labels make sense to users. Their words, not yours.</li>
              <li><strong>Plan for growth.</strong> Where will new content go? If you can&apos;t answer that, the structure won&apos;t scale.</li>
              <li><strong>Test findability.</strong> Tree testing tells you whether people can actually find things. Do this before you build.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Support tickets about &quot;where do I find X?&quot; drop. Search usage for basic features drops. People get where they&apos;re going on the first try.
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
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
