'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface OpportunityBacklogProps {
  className?: string
  onClose?: () => void
}

export function OpportunityBacklog({ className, onClose }: OpportunityBacklogProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("jira", "Jira", "md"),
        toolPill("asana", "Asana", "md"),
        genericTool("Roadmap tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Opportunity Backlog"
        summary="A living taxonomy that turns scattered requests into ranked, actionable work streams."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="opportunity-backlog"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Without structure, great ideas get lost in Slack threads and meeting notes. A proper backlog captures, categorizes, and connects opportunities to measurable outcomes.
            </p>
          </div>
        </div>

        {/* Backlog taxonomy */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Backlog hierarchy
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Initiative (6-12 months)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ &quot;Improve checkout conversion&quot; - tied to OKRs</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Epic (1-3 months)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ &quot;Streamline payment flow&quot; - deliverable scope</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Opportunity/Story (1-2 weeks)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ &quot;Reduce form fields from 12 to 6&quot; - actionable work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Design intake process that captures context and success criteria",
              "Create templates for consistent opportunity documentation",
              "Establish tagging system for easy filtering and reporting",
              "Build connection between backlog items and user research insights"
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Backlog taxonomy and intake templates",
              "Opportunity documentation standards",
              "Tagging and filtering system",
              "Quarterly backlog health reports"
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
              "Zero ideas lost - everything has a discoverable home",
              "Sprint planning pulls from backlog 90%+ of the time",
              "Stakeholders can find and understand any opportunity's status"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}