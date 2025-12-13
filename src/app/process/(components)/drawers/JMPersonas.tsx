'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface JMPersonasProps {
  className?: string
  onClose?: () => void
}

export function JMPersonas({ className, onClose }: JMPersonasProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Journey Mapping"
        title="Personas & contexts"
        summary="Context beats demographics. What are they trying to do, and what&apos;s getting in the way?"
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Persona%20Development"
        enableComments={true}
        itemId="journey-mapping-personas"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            I don&apos;t care that &quot;Marketing Mary is 34 and lives in the suburbs.&quot; That tells me nothing useful. What I care about is: what is she trying to accomplish? What constraints is she operating under? What has she already tried?
          </p>
          <p>
            Good personas are about context, not demographics. Someone using your product on their phone while commuting has different needs than someone at a desk with a second monitor. The same person, different context — different design requirements.
          </p>
        </div>

        {/* What I focus on */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I actually want to know
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Goals.</strong> What are they trying to accomplish? What does success look like from their perspective?</li>
              <li><strong>Constraints.</strong> Time pressure? Mobile vs. desktop? Interrupted attention? Low technical confidence?</li>
              <li><strong>Mental models.</strong> What do they expect based on other products they use?</li>
              <li><strong>Decision points.</strong> Where in their workflow do they need to make a choice?</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Design discussions include phrases like &quot;but in that context, they&apos;d need...&quot; instead of just arguing about button colors.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
