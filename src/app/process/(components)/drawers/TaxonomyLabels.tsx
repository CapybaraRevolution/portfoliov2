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
        genericTool("Airtable")
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

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Define controlled vocabulary, categories, and synonyms so labels match user language and search behavior. Eliminates ambiguous/jargon labels and improves findability.
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
              "Search logs",
              "Support tickets", 
              "Stakeholder terms"
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
              "Labels sheet (nav copy deck)",
              "Synonym map",
              "Facet schema (if needed)"
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
              "Reduced ambiguous labels",
              "Fewer zero-result searches",
              "Consistent terminology across UI"
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
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}