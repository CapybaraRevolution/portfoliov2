'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
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
        genericTool("Useberry"),
        toolPill("zoom", "Zoom", "md"),
        toolPill("loom", "Loom", "md"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 3 · Design & Prototyping"
        title="Clickable Prototypes"
        summary="Make the idea testable in days—click through the real flow, not a slide deck."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Prototyping"
        enableComments={true}
        itemId="clickable-prototypes"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Create shared truth
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Prototypes create shared truth. They unlock user tests, investor demos, and fast product decisions by showing how it works and how it feels.
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
              "Prioritize critical paths (onboarding, first value, purchase/submit)",
              "Build high-fidelity screens with component states and micro-interactions",
              "Script 3–5 tasks for usability sessions; recruit and run quick tests",
              "Capture clips and timestamps for decisions; note must-fix vs. later"
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
              "Figma prototype with link map",
              "Test plan (tasks, success criteria, observers&apos; checklist)",
              "Findings highlight reel (2–3 min) + decision table (&quot;If we learn X, we&apos;ll do Y&quot;)"
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
              "≥80% task success on the critical path in the prototype",
              "One or more decisions made (ship / revise / cut) within a week of testing",
              "Engineering questions shift from &quot;what are we building?&quot; to &quot;how shall we implement?&quot;"
            ]}
          />
        </div>

        {/* Future lightbox placeholder */}
        {/* TODO: Add lightbox section for demo video and 2-3 GIFs of key interactions */}

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Prototyping" variant="default" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}