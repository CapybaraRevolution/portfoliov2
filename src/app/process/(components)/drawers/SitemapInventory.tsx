'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface SitemapInventoryProps {
  className?: string
  onClose?: () => void
}

export function SitemapInventory({ className, onClose }: SitemapInventoryProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("Analytics tools"),
        genericTool("CMS exports"),
        genericTool("Spreadsheet tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Sitemap & Inventory"
        summary="See the whole forest before pruning any trees."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-sitemap-inventory"
      >

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Findability drives task success
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              A content inventory prevents blind spots and &ldquo;orphan&rdquo; pages. It&apos;s the foundation for a rational IA that improves findability, deflects support, and reduces wasted redesign effort. A clear, complete map reduces backtracking and enables the IA work that lifts findability, conversion, and support deflection.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Content inventory & ROT audit (redundant/outdated/trivial): URL, owner, purpose, usage, status",
              "Gap & overlap analysis: Spot duplicates, dead ends, and unclear entry points",
              "Draft sitemap: Group by user mental models, not org chart",
              "De-risking notes: Flags for accessibility, SEO, and deep/skinny paths"
            ]}
          />
        </div>

        {/* Artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Artifacts
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Inventory spreadsheet + keep/fix/remove matrix",
              "Draft sitemap (tree diagram) with entry/exit points",
              "Risks & assumptions list for hand-off"
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
              "100% of in-scope content accounted for; no orphan pages",
              "Category pages show lower bounce and higher onward CTR",
              "Fewer &ldquo;where is X?&rdquo; support tickets and internal &ldquo;content hunts&rdquo;"
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
              "Mirroring the org chart",
              "Over-nesting (>3–4 levels)",
              "Keeping legacy pages that dilute information scent"
            ]}
          />
        </div>

        {/* Sample Template */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Inventory columns (minimum)
          </h4>
          <BulletList 
            color="emerald"
            items={[
              "URL · Title · Owner · Last updated · Purpose · Audience",
              "Engagement (views/entrances) · SEO (indexable?) · Accessibility flags",
              "Status: Keep / Update / Merge / Remove"
            ]}
          />
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mt-6 mb-4">
            Sitemap notes
          </h4>
          <BulletList 
            color="emerald"
            items={[
              "Group by user goals; cap depth at 3–4 levels",
              "Mark cross-links where users commonly choose the &ldquo;other&rdquo; path"
            ]}
          />
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Information Architecture" variant="default" size="sm" />
            <NavigationChip skill="User Research" variant="outline" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}