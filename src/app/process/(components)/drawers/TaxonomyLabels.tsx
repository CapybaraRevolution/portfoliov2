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

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Taxonomy is the controlled vocabulary behind your product: the categories, subcategories, tags, and the words we choose for them. Clear, consistent labels create strong information scent and make search work.
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
                "Users convert when the label matches their mental model (&ldquo;TVs&rdquo; vs &ldquo;Televisions&rdquo;).",
                "Consistency across nav, headings, and search boosts first-click success and reduces query reformulation."
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
            Search logs/auto-complete terms · Domain language from SMEs · Prior card sorts
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
              "Harvest terms, build a controlled vocabulary and synonym map",
              "Define category/facet rules (what belongs where and why)",
              "Create a nav copy deck (approved labels, tone, examples)",
              "Quick label checks for readability and ambiguity"
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
              "Taxonomy tree + definitions",
              "Synonym/alias map (for search + navigation)",
              "Nav copy deck (all levels)"
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
              "Fewer search refinements per session",
              "Tree-test direct success up on renamed categories",
              "Reduced &ldquo;where is X?&rdquo; support tickets"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Jargon, look-alike labels (&ldquo;Info&rdquo; vs &ldquo;Resources&rdquo;), drifting terminology across teams
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Track internal search queries with no results; clicks on renamed labels; readability grade of labels
          </p>
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