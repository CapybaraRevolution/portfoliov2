'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface FDTaskValidationProps {
  className?: string
  onClose?: () => void
}

export function FDTaskValidation({ className, onClose }: FDTaskValidationProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Maze"),
        toolPill("hotjar", "Hotjar", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Flow Design"
        title="Task Flow Validation"
        summary="Test the flow before you build it. Fixing problems in prototypes is cheap. Fixing them in production isn&apos;t."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Usability%20Testing"
        enableComments={true}
        itemId="flow-design-validation"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            You can stare at a flow diagram all day and still miss obvious problems. The only way to know if it works is to put it in front of real users and watch them try to use it.
          </p>
          <p>
            I test flows with low-fidelity prototypes — clickable wireframes, basically. Not because pretty doesn&apos;t matter, but because at this stage, I want feedback on the logic, not the visuals. Does this sequence make sense? Do people understand what&apos;s being asked of them?
          </p>
        </div>

        {/* How I test */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I test
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Task-based scenarios.</strong> &quot;You want to do X. Show me how you&apos;d do it.&quot; Then shut up and watch.</li>
              <li><strong>Think-aloud protocol.</strong> Ask them to narrate what they&apos;re thinking. The confusion they vocalize is gold.</li>
              <li><strong>Error recovery.</strong> Intentionally break things. Can they figure out how to get back on track?</li>
              <li><strong>5 users is enough.</strong> You&apos;ll catch most of the big issues. Don&apos;t over-test at this stage.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            You find problems in the prototype that would have been expensive to fix in code. That&apos;s the whole point.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Usability Testing" variant="default" size="sm" />
            <NavigationChip skill="Prototyping" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
