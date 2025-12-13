'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ValidateIAProps {
  className?: string
  onClose?: () => void
}

export function ValidateIA({ className, onClose }: ValidateIAProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("OptimalSort"),
        genericTool("Treejack"),
        toolPill("figma", "FigJam", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Validate IA"
        summary="Test the structure before you polish the pixels. Card sorts and tree tests tell you if it works."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-validate-ia"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            You can argue about navigation labels for weeks. Or you can just test them. Card sorting shows you how users naturally group things. Tree testing shows you whether they can actually find stuff in your proposed structure.
          </p>
          <p>
            I don&apos;t guess at IA. I validate it. If users can&apos;t find the thing on a text-only tree, pretty icons and clever animations won&apos;t save it.
          </p>
        </div>

        {/* How I validate */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I validate
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Card sorting.</strong> Give people cards with content names, ask them to group them. Their groupings reveal mental models. ~15 participants is usually enough.</li>
              <li><strong>Tree testing.</strong> Strip away all the UI — just show the hierarchy as text. Give tasks like &quot;Find X.&quot; Measure success rate and directness.</li>
              <li><strong>Iterate.</strong> Test → tweak labels/groupings → retest. Keep going until findability hits target (usually 80%+ direct success).</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Tree test success jumps after a label rename, and the debate about what to call that section finally ends because there&apos;s data.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Usability Testing" variant="default" size="sm" />
            <NavigationChip skill="Information Architecture" variant="outline" size="sm" />
            <NavigationChip skill="User Research" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
