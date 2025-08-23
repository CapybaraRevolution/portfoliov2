'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface TaxonomyLabelsProps {
  className?: string
  onClose?: () => void
}

export function TaxonomyLabels({ className, onClose }: TaxonomyLabelsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        genericTool("Search analytics"),
        genericTool("Support ticket tools"),
        genericTool("Airtable"),
        genericTool("Spreadsheet tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Taxonomy & Labels"
        summary="Name things the way users think."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-taxonomy-labels"
      >

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              First-click success ↑; search dependence ↓
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Labels and controlled vocabularies make content findable. Consistent names, synonyms, and facets reduce dead ends, search rewrites, and pogo-sticking. Aligning labels to user vocabulary improves direct navigation and reduces &ldquo;type-and-pray&rdquo; behavior.
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
              "Controlled vocabulary: Canonical terms + definitions",
              "Synonym map: User language (e.g., &ldquo;TVs&rdquo; ⇄ &ldquo;Televisions&rdquo;; &ldquo;Cell&rdquo; ⇄ &ldquo;Phone&rdquo;)",
              "Facets & attributes: Only what users actually filter by",
              "Nav copy deck: Approved labels at each level"
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
              "Taxonomy hierarchy (categories, subcats, relations)",
              "Synonym/alias sheet + search mapping",
              "Facet spec (names, data source, rules)",
              "Nav copy deck (microcopy ready for build)"
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
              "Fewer search refinements and no-results queries",
              "Higher first-click success in tree tests",
              "Consistent labels across nav, headings, and filters"
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
              "Inconsistent terminology across surfaces",
              "Facet bloat (near-duplicate or unclear filters)",
              "Ambiguous or clever labels with weak information scent"
            ]}
          />
        </div>

        {/* Sample Template */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Taxonomy starter
          </h4>
          <BulletList 
            color="emerald"
            items={[
              "Category → Subcategory → (Optional) Sub-subcategory",
              "Facets: Brand · Type · Price · Audience · Level",
              "Synonyms: Map user terms to canonical labels",
              "Copy rules: Plain language; avoid internal jargon"
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