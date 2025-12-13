'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface TechnicalDebtTriageProps {
  className?: string
  onClose?: () => void
}

export function TechnicalDebtTriage({ className, onClose }: TechnicalDebtTriageProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("github", "GitHub", "md"),
        toolPill("jira", "Jira", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("SonarQube"),
        genericTool("Code analysis")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Technical Debt Triage"
        summary="Tech debt is why that &quot;simple&quot; feature takes 3x longer than it should. Name it, rank it, pay it down."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Technical%20Strategy"
        enableComments={true}
        itemId="technical-debt-triage"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Tech debt isn&apos;t abstract. It&apos;s the reason every feature estimate comes with a nervous caveat. It&apos;s why engineers groan when you mention &quot;that part of the codebase.&quot; It&apos;s real, it compounds, and ignoring it doesn&apos;t make it go away.
          </p>
          <p>
            The problem is, debt is invisible to stakeholders. They see features shipping slowly and wonder why. So I make it visible: quantify the impact, show the trade-offs, and fight for capacity to pay it down.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Catalog it.</strong> You can&apos;t prioritize what you don&apos;t see. I work with engineers to build a debt registry with rough estimates.</li>
              <li><strong>Translate to business impact.</strong> &quot;Messy code&quot; doesn&apos;t get prioritized. &quot;This is why checkout takes 3 sprints instead of 1&quot; does.</li>
              <li><strong>Prioritize by pain.</strong> Some debt is annoying but harmless. Some blocks everything. Focus on the blockers.</li>
              <li><strong>Reserve capacity.</strong> I advocate for 20% of sprint capacity going to debt paydown. Non-negotiable. Otherwise it never happens.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Engineers stop saying &quot;we should really fix that someday&quot; because &quot;someday&quot; is actually on the roadmap. And feature estimates start getting more accurate because there&apos;s less hidden complexity.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Risk Management" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
