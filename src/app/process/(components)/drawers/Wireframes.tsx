'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
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
        genericTool("Axure"),
        toolPill("notion", "Notion", "md"),
        toolPill("confluence", "Confluence", "md"),
        toolPill("loom", "Loom", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 3 · Design & Prototyping"
        title="Wireframes"
        summary="Structure before polish—fast frames answer &quot;what goes where and why.&quot;"
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Design"
        enableComments={true}
        itemId="wireframes"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              De-risk navigation and scope
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Wireframes de-risk navigation and scope. They align people on layout, hierarchy, and flow so we catch gaps before pixels and code get expensive.
            </p>
          </div>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Map key tasks → screens → states (happy + known friction)",
              "Draft low–mid fidelity frames that show information priority, not visual design",
              "Annotate interactions, empty/error/loading states, and content sources",
              "Validate edge cases and accessibility basics (reading order, focus, tap targets)"
            ]}
          />
        </div>

        {/* Outputs & deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs &amp; deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Screen list + sitemap",
              "Wireframe set (desktop + mobile variants)",
              "Interaction notes and acceptance criteria",
              "&quot;Open questions&quot; list for stakeholders/dev"
            ]}
          />
        </div>

        {/* Signals of success */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Signals of success
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Stakeholders can navigate the wireframe and describe the journey in the same words",
              "Dev estimates unlocked with <10% churn from layout surprises",
              "Fewer &quot;where does this live?&quot; questions during prototyping"
            ]}
          />
        </div>

        {/* Future lightbox placeholder */}
        {/* TODO: Add lightbox section for 3-5 hero frames (Home, Task start, Decision point, Error, Success) */}

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Wireframes & Prototypes" variant="default" size="sm" />
            <NavigationChip skill="Information Architecture" variant="outline" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}