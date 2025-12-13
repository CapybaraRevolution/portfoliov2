'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface DailyDesignQAProps {
  className?: string
  onClose?: () => void
}

export function DailyDesignQA({ className, onClose }: DailyDesignQAProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("DevMode"),
        genericTool("Storybook"),
        genericTool("Percy"),
        genericTool("Chromatic")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Daily Design QA"
        summary="I check the build against the design every day. Because &quot;close enough&quot; compounds."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="daily-design-qa"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Design drift is sneaky. A button that&apos;s 4px off. A color that&apos;s <em>almost</em> right. A font weight nobody noticed. Each one is harmless on its own. But they stack up, and by the end of the sprint you&apos;re looking at something that doesn&apos;t quite feel like the design — and nobody can point to when it went wrong.
          </p>
          <p>
            I&apos;d rather catch it Tuesday than explain it Friday.
          </p>
          <p>
            So I compare implementation against specs daily. Not a big formal review — just a habit. Pull up the build, pull up Figma, and look. Overlay mode. Side-by-side. Sometimes I&apos;ll literally squint. It sounds low-tech, but you&apos;d be surprised how often &quot;I swear I matched the design&quot; turns out to be off by a border-radius or two.
          </p>
        </div>

        {/* Why I care */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Why I care about this
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              I&apos;ve seen teams ship entire features and <em>then</em> realize the implementation doesn&apos;t match. At that point, fixing it feels like a chore nobody wants to prioritize. &quot;It works, ship it.&quot; And now you&apos;ve got design debt that compounds every release.
            </p>
            <p>
              Daily QA keeps the debt from piling up. It also builds trust with engineers — they know I&apos;m not going to show up at the end with a laundry list of &quot;actually, this is all wrong.&quot; We catch things together, early, when they&apos;re easy to fix.
            </p>
          </div>
        </div>

        {/* What this looks like in practice */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What this looks like in practice
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Component-level checks.</strong> I don&apos;t review full pages — I check components as they&apos;re built. Smaller surface area, faster feedback.</li>
              <li><strong>Visual regression in CI.</strong> Tools like Chromatic or Percy catch things I might miss. If a PR changes something visually, it fails the build until someone approves it.</li>
              <li><strong>Browser reality checks.</strong> Safari renders things differently than Chrome. Figma actually matches Safari closer, which surprises people. I test both.</li>
              <li><strong>The Boy Scout Rule.</strong> If I&apos;m in there anyway, I fix small things I notice. Leave the UI cleaner than I found it.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Engineers start flagging their own visual bugs before I do. That&apos;s the goal — not me being the design police, but everyone caring about the details.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Design Systems" variant="default" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
