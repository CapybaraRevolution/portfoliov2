'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        genericTool("Tailwind"),
        genericTool("shadcn/ui"),
        toolPill("github", "GitHub", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 3 · Design & Prototyping"
        title="Design Systems"
        summary="Build once, use everywhere. A system saves time and keeps things consistent."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="design-systems"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Without a system, every new screen is a one-off. Different button styles, inconsistent spacing, colors that are almost-but-not-quite the same. It looks sloppy and it&apos;s slow to build.
          </p>
          <p>
            A design system is a shared toolkit: tokens (colors, typography, spacing) and components (buttons, inputs, cards) that everyone uses. Build the button once, use it everywhere. Change the button once, update it everywhere.
          </p>
        </div>

        {/* What I build */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I build
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Design tokens.</strong> The atomic values: colors, type scales, spacing, border radii. Light and dark mode. Documented and named.</li>
              <li><strong>Component library.</strong> Buttons, inputs, cards, modals, navs — all the building blocks with variants (primary, secondary, error, etc.) and states (hover, focus, disabled).</li>
              <li><strong>Usage guidelines.</strong> When to use what. Accessibility requirements. Contribution rules for adding new components.</li>
              <li><strong>Figma ↔ Code parity.</strong> The design library and the code library should match. I work with engineering to keep them in sync.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            New screens are mostly assembled from existing components. Design → dev handoff takes days instead of weeks. Accessibility bugs drop because the system handles it by default.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Design Systems" variant="default" size="sm" />
            <NavigationChip skill="PRDs (Specs)" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
