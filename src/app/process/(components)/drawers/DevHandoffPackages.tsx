'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
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
        toolPill("figma", "FigJam", "md"),
        toolPill("jira", "Jira", "md"),
        genericTool("Linear"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Dev Handoff Packages"
        summary="Great handoffs remove guesswork and reduce rework."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="dev-handoff-packages"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              No detective work required
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Specs, flows, and edge cases up front shrink back-and-forth and keep velocity high.
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
              "Prep annotated frames (states, variants, tokens)",
              "Provide flows, copy, empty/error states, a11y notes",
              "Link acceptance criteria and tracking spec"
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
              "Handoff doc linking design, tickets, events, AC",
              "&quot;Day-1 build&quot; checklist per story"
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
              "< 2 clarification pings per story",
              "Story passes QA on first review"
            ]}
          />
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="PRDs (Specs)" variant="default" size="sm" />
            <NavigationChip skill="APIs & Integrations" variant="outline" size="sm" />
            <NavigationChip skill="System Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}