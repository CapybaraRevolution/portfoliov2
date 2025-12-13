'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface FigmaProductParityAuditProps {
  className?: string
  onClose?: () => void
}

export function FigmaProductParityAudit({ className, onClose }: FigmaProductParityAuditProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Chromatic"),
        genericTool("Storybook"),
        genericTool("DevTools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Figma to Production Parity Audit"
        summary="Does the build match the design? Check before you ship, not after."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="figma-product-parity-audit"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            This is basically Daily Design QA, but as a pre-release gate. Before a feature ships, I do a final audit: Figma on one side, staging build on the other. Pixel-perfect? No. But close enough that users won&apos;t notice? Yes.
          </p>
          <p>
            The audit isn&apos;t about catching everything — it&apos;s about catching the stuff that matters. A 2px padding difference? Probably fine. A completely wrong hover state? That&apos;s a blocker.
          </p>
        </div>

        {/* What I check */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I check
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Visual fidelity.</strong> Colors, typography, spacing. The stuff that&apos;s obviously wrong if you look.</li>
              <li><strong>Interactions.</strong> Hover states, focus rings, transitions. Easy to forget, easy to ship broken.</li>
              <li><strong>Responsive behavior.</strong> Does it actually work at mobile breakpoints, or did someone just shrink the desktop version?</li>
              <li><strong>Design token compliance.</strong> Are we using the system, or did someone hardcode a hex value?</li>
              <li><strong>Cross-browser.</strong> Safari renders differently than Chrome. Figma is closer to Safari, which surprises people.</li>
            </ul>
          </div>
        </div>

        {/* How I do it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I do it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Figma DevMode on one monitor, staging on the other. I&apos;ll do overlay comparisons for layout-heavy screens, side-by-side for everything else. Issues get logged directly in Figma comments with severity ratings (blocker, should-fix, nice-to-have).
            </p>
            <p>
              For teams with visual regression testing (Chromatic, Percy), I&apos;ll review the automated diffs too. But I don&apos;t rely on them exclusively — tools miss context that humans catch.
            </p>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Designers stop being surprised by production. &quot;Wait, that&apos;s not what I designed&quot; becomes rare because discrepancies get caught before release, not after.
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
            <NavigationChip skill="Visual Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
