'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface NavigationPatternsProps {
  className?: string
  onClose?: () => void
}

export function NavigationPatterns({ className, onClose }: NavigationPatternsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Wireframing"),
        genericTool("Analytics")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Navigation Patterns"
        summary="Pick the right pattern for your content. Mega-menus aren&apos;t always the answer."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-nav-patterns"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            IA isn&apos;t just a tree in a doc — it&apos;s how people actually move through your product. Mega-menu? Hub-and-spoke? Faceted search? Each pattern works for different content types and user behaviors.
          </p>
          <p>
            I pick navigation patterns based on content scale, device mix, and how users actually browse. A 50-page marketing site doesn&apos;t need the same nav as a 10,000-SKU e-commerce catalog.
          </p>
        </div>

        {/* Pattern considerations */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I consider
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Breadth vs depth.</strong> Flat structures work for small sites. Deep hierarchies need local nav and breadcrumbs.</li>
              <li><strong>Mobile-first.</strong> What works on desktop often fails on a phone. Design the mobile nav first.</li>
              <li><strong>Cross-linking.</strong> Not everyone enters through the front door. Smart cross-links help people recover from wrong turns.</li>
              <li><strong>Dead ends.</strong> Every page needs an obvious &quot;what next.&quot; No orphans.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Pogo-sticking (back-and-forth clicking) drops. Pages per session goes up without people getting lost. Mobile task success matches desktop.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Information Architecture" variant="default" size="sm" />
            <NavigationChip skill="Wireframing" variant="outline" size="sm" />
            <NavigationChip skill="Prototyping" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
