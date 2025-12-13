'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface CrossFunctionalRiskAssessmentProps {
  className?: string
  onClose?: () => void
}

export function CrossFunctionalRiskAssessment({ className, onClose }: CrossFunctionalRiskAssessmentProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        genericTool("Confluence")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Cross-Functional Risk Assessment"
        summary="What could go wrong? Ask everyone in the room. Then plan for it."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Risk%20Management"
        enableComments={true}
        itemId="cross-functional-risk-assessment"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Risks you don&apos;t talk about still happen — they just surprise you. And surprised teams make bad decisions under pressure.
          </p>
          <p>
            I run structured workshops before major releases. Dev, QA, ops, security, product — everyone in one room (or call) for an hour. The goal isn&apos;t to predict every failure. It&apos;s to surface the ones we can prepare for and agree on what we&apos;ll do if they happen.
          </p>
          <p>
            Most risks aren&apos;t surprises to anyone individually. Someone on the team usually knows. The workshop just creates space for them to say it out loud.
          </p>
        </div>

        {/* How I run it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I run it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>60 minutes, 8-12 people.</strong> Anyone who touches the release or will be on the hook if it breaks.</li>
              <li><strong>Silent brainstorm first.</strong> Everyone writes down risks for 5 minutes. Prevents groupthink.</li>
              <li><strong>Likelihood × Impact scoring.</strong> Simple 1-5 scale. High-high gets a mitigation plan. Low-low gets noted and moved on.</li>
              <li><strong>Assign owners.</strong> Every high-priority risk has a name next to it. No orphan risks.</li>
              <li><strong>Decision: Transfer, Avoid, Reduce, or Accept (TARA).</strong> If we can&apos;t reduce it, we at least know we&apos;re accepting it consciously.</li>
            </ul>
          </div>
        </div>

        {/* Sample risk register */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample risk register
          </h3>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Risk</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">L×I</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Owner</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Mitigation</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600 dark:text-zinc-400">
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="py-2">Payment API rate limits</td>
                  <td className="py-2">4×5</td>
                  <td className="py-2">Sarah (Eng)</td>
                  <td className="py-2">Add retry logic, alert at 70% capacity</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="py-2">Mobile layout breaks on iOS 16</td>
                  <td className="py-2">3×3</td>
                  <td className="py-2">Mike (QA)</td>
                  <td className="py-2">Test on physical devices pre-release</td>
                </tr>
                <tr>
                  <td className="py-2">Launch coincides with marketing push</td>
                  <td className="py-2">2×4</td>
                  <td className="py-2">Kim (PM)</td>
                  <td className="py-2">Coordinate timing, have rollback ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Something breaks, and instead of panic, someone says &quot;we talked about this — here&apos;s the plan.&quot; That calm is worth the hour you spent.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Risk Assessment" variant="default" size="sm" />
            <NavigationChip skill="Team Facilitation" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
