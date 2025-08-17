'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface ExperimentationDrawerProps {
  className?: string
  onClose?: () => void
}

export function ExperimentationDrawer({ className, onClose }: ExperimentationDrawerProps) {
  // Track drawer open on mount
  useEffect(() => {
    trackProcessDrawerOpen('Experimentation')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("google", "Optimizely", "md"),
        toolPill("notion", "LaunchDarkly", "md"),
        toolPill("google", "Google Optimize", "md"),
        toolPill("ga4", "Statistical Tools", "md"),
        toolPill("figma", "Figma", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Experimentation"
        summary="Run small experiments (A/B tests) to learn what works and de-risk big decisions."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Conversion%20Optimisation"
        enableComments={true}
        itemId="experimentation"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed italic">
              Learn fast, ship what works.
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Instead of making big guesses, we run controlled experiments to validate improvements. A/B testing de-risks decisions by showing which version performs better on metrics like conversion or task success.
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
              "Design small, falsifiable tests with clear hypotheses",
              "Calculate proper sample sizes and statistical power",
              "Set up controlled A/B tests and feature rollouts",
              "Define success criteria and guardrail metrics",
              "Monitor experiments in real-time for early signals",
              "Analyze results with statistical significance testing",
              "Make data-driven decisions on feature rollouts"
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
              "Experiment briefs with hypothesis and success criteria",
              "A/B test configurations (Optimizely, LaunchDarkly)",
              "Statistical analysis and readout reports",
              "Decision recommendations with confidence intervals",
              "Winning variation implementation guides"
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
              ">80% of major feature decisions backed by experiments",
              "Statistically significant results (p<0.05)",
              "Average 15% improvement in tested metrics",
              "Reduced rollback rate due to data validation"
            ]}
          />
        </div>

        {/* Sample - Experiment template */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Experiment: Checkout CTA Copy</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-zinc-900 dark:text-white mb-2">Hypothesis</h5>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Changing &quot;Place Order&quot; to &quot;Secure Checkout&quot; will increase checkout completion by ≥3% on mobile
                </p>
              </div>

              <div>
                <h5 className="font-medium text-zinc-900 dark:text-white mb-2">Test Setup</h5>
                <BulletList 
                  color="emerald"
                  items={[
                    "Variants: Control (Place Order) vs Treatment (Secure Checkout)",
                    "Sample size: 10,000 users per variant",
                    "Duration: 14 days",
                    "Primary metric: Checkout completion rate",
                    "Guardrails: Bounce rate ≤5% increase, page load time ≤100ms increase"
                  ]}
                />
              </div>

              <div>
                <h5 className="font-medium text-zinc-900 dark:text-white mb-2">Results</h5>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                  <BulletList 
                    color="emerald"
                    items={[
                      "Control: 64.2% completion rate",
                      "Treatment: 67.8% completion rate",
                      "Lift: +3.6pp (p=0.003, statistically significant)",
                      "Decision: Ship treatment to 100% of users"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
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
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}