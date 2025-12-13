'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, genericTool } from '@/components/ui/ToolSection'
import { ScrollableTable } from '@/components/ui/ScrollableTable'
import { NavigationChip } from '@/components/NavigationChip'

interface CompetitiveAnalysisProps {
  className?: string
  onClose?: () => void
}

export function CompetitiveAnalysis({ className, onClose }: CompetitiveAnalysisProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Heuristic checklists"),
        genericTool("PageSpeed/Lighthouse"),
        genericTool("Wayback Machine"),
        genericTool("Screenshots/recorders")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 1 · Discovery & Strategy"
        title="Competitive Analysis"
        summary="Know what you&apos;re up against. Users compare you to what they already use — whether you like it or not."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Competitive%20Analysis"
        enableComments={true}
        itemId="competitive-analysis"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            There&apos;s this thing called Jakob&apos;s Law: users spend most of their time on <em>other</em> sites. They expect yours to work like the ones they already know. Fight that expectation and you&apos;ll confuse people. Embrace it where it makes sense, and you free up energy to differentiate where it actually matters.
          </p>
          <p>
            Competitive analysis isn&apos;t about copying. It&apos;s about knowing the landscape. What&apos;s table-stakes? Where are competitors weak? What patterns have users already learned that you&apos;d be foolish to reinvent?
          </p>
          <p>
            I look at 5–8 competitors — some direct, some adjacent for inspiration — and break down their onboarding, navigation, key flows, and error states. The output isn&apos;t a 50-page report. It&apos;s a clear picture of where to match, where to beat, and where to not bother.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Heuristic walkthroughs.</strong> I go through each competitor&apos;s key flows and note what works, what doesn&apos;t, and what&apos;s just... fine.</li>
              <li><strong>Gap analysis.</strong> Where are we behind? At parity? Ahead? And does it actually matter for our users?</li>
              <li><strong>Screenshot library.</strong> Annotated screens of patterns worth stealing (or avoiding). Useful for design reviews later.</li>
              <li><strong>Opportunity list.</strong> Quick wins, medium bets, and &quot;prove it&quot; ideas that need validation before investing.</li>
            </ul>
          </div>
        </div>

        {/* Sample - Comparison table */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample gap analysis
          </h3>
          
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <ScrollableTable>
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Feature</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Competitor A</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Competitor B</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Us</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">So what?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">SSO</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Table-stakes. Need it for enterprise.</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Real-time collab</td>
                    <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Nice-to-have. Validate demand first.</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">API webhooks</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Done. Just need better docs.</td>
                  </tr>
                </tbody>
              </table>
            </ScrollableTable>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Prioritization debates shift from &quot;I think users want this&quot; to &quot;Competitor X has this and their users expect it&quot; or &quot;Nobody does this well — there&apos;s an opportunity.&quot;
          </p>
        </div>

        {/* Jakob's Law link */}
        <div className="text-sm">
          <a
            href="https://www.nngroup.com/videos/jakobs-law-internet-ux/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline"
          >
            More on Jakob&apos;s Law →
          </a>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Vision" variant="default" size="sm" />
            <NavigationChip skill="Roadmap" variant="outline" size="sm" />
            <NavigationChip skill="Prioritization" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
