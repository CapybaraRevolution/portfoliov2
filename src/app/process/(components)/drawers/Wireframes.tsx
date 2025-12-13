'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface WireframesProps {
  className?: string
  onClose?: () => void
}

export function Wireframes({ className, onClose }: WireframesProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 3 · Design & Prototyping"
        title="Wireframes"
        summary="Structure before polish. Figure out what goes where before you argue about button colors."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Design"
        enableComments={true}
        itemId="wireframes"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Wireframes are ugly on purpose. Gray boxes. No colors. Placeholder text. The point is to focus on structure — what goes where, in what order, with what priority — without getting distracted by aesthetics.
          </p>
          <p>
            I&apos;ve seen teams burn weeks polishing high-fidelity mockups only to realize the layout didn&apos;t work. Wireframes catch that early, when it&apos;s cheap to change.
          </p>
        </div>

        {/* What I include */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I include
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Information hierarchy.</strong> What&apos;s most important? What comes first? What can be collapsed?</li>
              <li><strong>All the states.</strong> Empty, loading, error, success. If I don&apos;t wireframe it, engineers will have to invent it.</li>
              <li><strong>Mobile and desktop.</strong> They&apos;re different layouts, not just smaller/bigger versions of each other.</li>
              <li><strong>Annotations.</strong> What happens when you click this? Where does this data come from? What are the constraints?</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Stakeholders can walk through the wireframe and describe the user journey in their own words. And engineering can give rough estimates without asking &quot;where does this live?&quot;
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Wireframing" variant="default" size="sm" />
            <NavigationChip skill="Information Architecture" variant="outline" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
