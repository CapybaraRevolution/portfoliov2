'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface DesignSystemsProps {
  className?: string
  onClose?: () => void
}

export function DesignSystems({ className, onClose }: DesignSystemsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Storybook"),
        genericTool("Chromatic"),
        genericTool("Tailwind"),
        genericTool("shadcn/ui"),
        genericTool("Radix Primitives"),
        genericTool("Axe"),
        toolPill("github", "GitHub", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 3 · Design & Prototyping"
        title="Design Systems"
        summary="Reusable parts, shared rules. Ship faster. Stay consistent."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="design-systems"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Scalable product development
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              A system turns one-off screens into a scalable product. Tokens and components reduce rework, improve accessibility, and keep the brand coherent across teams.
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
              "Audit current UI and code to find duplicates, inconsistencies, and gaps",
              "Define design tokens (color, type, spacing, radius, shadows) with light/dark support",
              "Build a component library (buttons, inputs, cards, dialogs, nav) with variants and states",
              "Write usage guidance and contribution rules; set up change control and versioning",
              "Pair with engineering to map tokens/components to code (Tailwind/shadcn/Storybook)"
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
              "Token file + theming spec (WCAG-checked)",
              "Figma library with documentation pages",
              "Contribution guide (how to propose, test, and release components)",
              "Release notes / changelog"
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
              "New screens are composed 90% from existing components",
              "Accessibility issues drop (fewer color/contrast and focus bugs)",
              "Faster cycle time: design → dev handoff measured in days, not weeks"
            ]}
          />
        </div>

        {/* Future lightbox placeholder */}
        {/* TODO: Add lightbox section for before/after component audit, token palette, and component anatomy callout */}

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="System Design" variant="default" size="sm" />
            <NavigationChip skill="PRDs (Specs)" variant="outline" size="sm" />
            <NavigationChip skill="Agile Delivery" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}