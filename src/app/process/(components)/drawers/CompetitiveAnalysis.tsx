'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
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
        summary="Parity where it&apos;s table-stakes. Differentiate where it matters."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Competitive%20Analysis"
        enableComments={true}
        itemId="competitive-analysis"
      >

      {/* Why it matters - Normal paragraph block */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Why it matters
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Users judge your product against what they already use. Per Jakob&apos;s Law, they spend most of their time elsewhere and expect familiar patterns here. Meet expectations where it&apos;s standard. Differentiate where it actually moves outcomes.
        </p>
        <a
          href="https://www.nngroup.com/videos/jakobs-law-internet-ux/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline"
        >
          Jakob&apos;s Law on NN/g
        </a>
      </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Research 5–8 relevant competitors/analogs (same segment + a few inspirational adjacents)",
              "Heuristic evaluation of onboarding, IA/navigation, search, checkout/flows, and empty/error states",
              "Feature gap analysis: where the product is behind, at parity, or ahead (with impact/effort notes)",
              "Screenshot teardowns of good patterns + cautionary examples with commentary"
            ]}
          />
        </div>

        {/* Outputs & artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & artifacts
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Competitive report: parity gaps, UX patterns, quick wins",
              "Annotated screen library (key flows with pros/cons notes)",
              "Opportunity list: quick wins, medium bets, and \"prove it\" ideas",
              "Measurement plan: what to instrument and how to validate impact"
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
              "Shared understanding of table-stakes for MVP/next release",
              "Prioritized opportunity list with owners and success criteria",
              "Instrumentation plan merged into analytics backlog"
            ]}
          />
        </div>

        {/* Sample - Comparison table and differentiator ideas */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          
          {/* Comparison table */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 mb-6">
            <ScrollableTable>
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Feature / Pattern</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Competitor A</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Competitor B</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Us</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Notes / Next Step</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Single sign-on (SSO)</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">P0 parity target</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Real-time collab</td>
                    <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">P2 differentiator</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">API webhooks</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">Done – document</td>
                  </tr>
                </tbody>
              </table>
            </ScrollableTable>
          </div>

          {/* Differentiator ideas */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">
              Differentiator ideas
            </h4>
            <BulletList 
              color="zinc"
              items={[
                "Progressive disclosure of advanced features to reduce cognitive load",
                "Context-aware onboarding that adapts to user role and use case",
                "Proactive error prevention with inline validation and smart defaults"
              ]}
            />
          </div>
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
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
