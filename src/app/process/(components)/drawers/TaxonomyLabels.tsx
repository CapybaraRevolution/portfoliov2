'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        genericTool("Spreadsheets")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Taxonomy & Labels"
        summary="Call things what users call them. Not what your org chart calls them."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-taxonomy-labels"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            &quot;Resources&quot; vs &quot;Help.&quot; &quot;Solutions&quot; vs &quot;Products.&quot; &quot;Support&quot; vs &quot;Contact.&quot; These seem like small decisions, but wrong labels cause real findability problems. Users click on what makes sense to <em>them</em>, not what makes sense to your marketing team.
          </p>
          <p>
            I build taxonomies from user language — search queries, support tickets, interview transcripts. What words do they actually use? Those become the labels.
          </p>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Harvest user terms.</strong> Search logs are a goldmine. What are people actually typing?</li>
              <li><strong>Build a controlled vocabulary.</strong> One word per concept. No synonyms in the nav.</li>
              <li><strong>Create synonym maps for search.</strong> Users can type whatever they want — search should understand.</li>
              <li><strong>Test confusable labels.</strong> &quot;Info&quot; and &quot;Resources&quot; sound different but mean nothing. Test which one wins.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Search refinements drop because people find what they need on the first try. Support tickets about &quot;where do I find X&quot; decrease.
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
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
