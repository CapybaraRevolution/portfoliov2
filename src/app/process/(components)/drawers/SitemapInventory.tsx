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
        genericTool("CMS exports")
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

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Content inventory + sitemap to reveal what exists, what matters, and how it should be grouped. Prevents &ldquo;lost pages,&rdquo; duplication, and orphan content before we design nav.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Existing site map/export",
              "CMS list", 
              "Analytics top pages"
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
              "Content inventory sheet",
              "Sitemap diagram"
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
              "95%+ content coverage audited",
              "No orphaned &ldquo;must-have&rdquo; pages in final IA"
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
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}