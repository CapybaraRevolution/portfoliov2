'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface ExperimentationDrawerProps {
  className?: string
  onClose?: () => void
}

export function ExperimentationDrawer({ className, onClose }: ExperimentationDrawerProps) {
  useEffect(() => {
    trackProcessDrawerOpen('Experimentation')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("google", "Optimizely", "md"),
        toolPill("notion", "LaunchDarkly", "md"),
        toolPill("ga4", "GA4", "md"),
        toolPill("figma", "Figma", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Experimentation"
        summary="Don&apos;t guess. Test. Small experiments de-risk big decisions."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Conversion%20Optimisation"
        enableComments={true}
        itemId="experimentation"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            &quot;I think users will prefer this&quot; is a hypothesis, not a decision. When stakes are high — checkout flows, onboarding, pricing — I&apos;d rather run a controlled experiment than bet the quarter on someone&apos;s intuition.
          </p>
          <p>
            A/B testing isn&apos;t complicated. Show version A to half the users, version B to the other half, measure what happens. The hard part is being disciplined: clear hypotheses, proper sample sizes, and actually waiting for statistical significance instead of calling it early.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Start with a hypothesis.</strong> &quot;Changing X will improve Y by at least Z%.&quot; If you can&apos;t state it clearly, you&apos;re not ready to test.</li>
              <li><strong>Calculate sample size.</strong> How many users do you need to detect a meaningful difference? Running underpowered tests is worse than not testing.</li>
              <li><strong>Define success criteria upfront.</strong> Primary metric, guardrail metrics, minimum detectable effect. No moving goalposts.</li>
              <li><strong>Wait for significance.</strong> p &lt; 0.05 or don&apos;t ship. Peeking at results and stopping early inflates false positives.</li>
              <li><strong>Document everything.</strong> What you tested, why, what happened, what you learned. Future you will thank present you.</li>
            </ul>
          </div>
        </div>

        {/* Sample experiment */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample experiment
          </h3>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Hypothesis:</span>
                <span className="text-zinc-600 dark:text-zinc-400 ml-2">Changing &quot;Place Order&quot; to &quot;Complete Purchase&quot; will increase checkout completion by ≥3%</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Sample:</span>
                <span className="text-zinc-600 dark:text-zinc-400 ml-2">10,000 users per variant, 14 days</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Result:</span>
                <span className="text-zinc-600 dark:text-zinc-400 ml-2">+3.6pp lift (p=0.003) → Ship treatment</span>
              </div>
            </div>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Debates shift from &quot;I think&quot; to &quot;let&apos;s test it.&quot; And when experiments fail (which they often do), the team learns something instead of shipping a mistake.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Experimentation" variant="default" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
            <NavigationChip skill="OKRs" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
