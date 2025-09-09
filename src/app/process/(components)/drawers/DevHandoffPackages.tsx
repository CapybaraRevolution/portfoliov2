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
        summary="Create a seamless designer-to-developer handoff with a single source of truth – shared design tokens, specs, and traceable mappings from Figma to code – so nothing gets lost in translation."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="dev-handoff-packages"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Seamless designer-to-developer handoffs require a single source of truth. We create shared design tokens, detailed specs, and traceable mappings from Figma to code. This prevents &quot;lost in translation&quot; moments and reduces implementation errors.
          </p>
        </div>

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <BulletList 
              color="emerald"
              items={[
                "Design-code consistency: Using common design tokens across tools prevents visual bugs and reduces guesswork.",
                "Faster implementation with clarity: Clear specs with component details and acceptance criteria speed up development.",
                "Traceability and reduced misses: When every UI element can be traced from Figma to code, nothing falls through the cracks.",
                "Single source of truth: Maintaining one authoritative spec prevents version mismatches and divergence.",
                "Better collaboration: Early dev input during design reduces costly late-stage surprises and iterations."
              ]}
              className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed"
            />
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Finalized Figma designs and prototypes · Design system components and tokens · User stories and acceptance criteria · Platform-specific requirements and constraints
          </p>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Build a living style guide: define design tokens (colors, fonts, spacing) in Figma and sync to code using token management tools",
              "Prepare comprehensive handoff packages: Figma frames with all states, downloadable assets, and written specs with behaviors and acceptance criteria",
              "Leverage Figma Dev Mode for developers to inspect elements and get CSS properties, measurements, and token names directly",
              "Annotate edge cases (responsive behavior, error states, loading spinners) so they&apos;re not overlooked",
              "Map each component to user stories with full traceability linking design → Jira ticket → Git commit",
              "Create platform-specific packages: export optimized SVGs, sprites, or other dev-ready assets",
              "Establish version-controlled design deliverables where the design system updates go through review processes"
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Design specification document outlining element dimensions, interactions, and non-obvious logic",
              "Design tokens library (JSON or style file) that developers can import with variables for colors, font sizes, spacing",
              "Component inventory referencing whether each UI component is already built in code or needs to be created",
              "Visual and functional acceptance criteria per user story (&quot;Matches design at 1× and 2× resolutions, uses token X for color&quot;)",
              "Mapping tables linking Figma layer names to code component names for design system consistency",
              "Dev-ready assets (optimized SVGs, icons, images) in shared accessible locations"
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
              "Fewer design-dev defects: 30% reduction in UI bugs where implementation doesn&apos;t match design",
              "Development velocity: Decreased lead time from design approval to dev completion (e.g. 8 days to 5 days)",
              "Design-system parity: 100% of style values in code come from shared tokens, with near 1:1 component parity",
              "Reduced back-and-forth: Fewer clarification questions after handoff (e.g. from 10 per feature to 2)",
              "Less rework: Decreased instances of major visual rework due to missing information",
              "High design system adoption: Rising percentage of UI built with existing components vs custom (80% to 95%)"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <BulletList 
            color="zinc"
            items={[
              "Overloading with excessive detail",
              "Maintaining divergent sources when design changes aren't propagated",
              "Ignoring platform nuances (mobile vs web)",
              "Lack of developer input during design",
              "Missing visual acceptance criteria in Definition of Done"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Automated design token export from Figma to code variables, design change tracking with developer notifications, code review checklists requiring design spec verification, style audit scripts comparing computed CSS against design token values, dev feedback surveys after major handoffs
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Design Systems" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}