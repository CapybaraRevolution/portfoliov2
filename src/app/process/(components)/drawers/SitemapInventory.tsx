'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        genericTool("Spreadsheets")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Sitemap & Content Inventory"
        summary="See the whole forest before you start pruning trees."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-sitemap-inventory"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Before you can organize content, you need to know what content exists. Sounds obvious, but I&apos;ve seen redesigns launch with orphaned pages, broken redirects, and content nobody knew was there.
          </p>
          <p>
            A content inventory is tedious work, but it prevents surprises. You audit every page: what is it, who owns it, is it worth keeping? Then you map the current structure so you can see where things are — and where they should go.
          </p>
        </div>

        {/* What I audit */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I audit
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Every page.</strong> Including the ones nobody remembers creating. Export from CMS, crawl the site, check analytics for hidden traffic.</li>
              <li><strong>Files and assets.</strong> PDFs, downloads, embedded media. These get lost in redesigns all the time.</li>
              <li><strong>ROT.</strong> Redundant, Outdated, Trivial. Flag what should be deleted, merged, or updated.</li>
              <li><strong>Ownership.</strong> Who&apos;s responsible for this content? If nobody knows, that&apos;s a red flag.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The redesign launches without anyone asking &quot;wait, what happened to that page?&quot; and your 404 rate doesn&apos;t spike.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Information Architecture" variant="default" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
