'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface PerformanceQualityDrawerProps {
  className?: string
  onClose?: () => void
}

export function PerformanceQualityDrawer({ className, onClose }: PerformanceQualityDrawerProps) {
  // Track drawer open on mount
  useEffect(() => {
    trackProcessDrawerOpen('Performance & Quality')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("google", "Lighthouse CI", "md"),
        toolPill("notion", "axe-core", "md"),
        toolPill("google", "Sentry", "md"),
        toolPill("ga4", "DataDog", "md"),
        toolPill("google", "New Relic", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Performance & Quality"
        summary="Continuously monitor speed, stability, and accessibility to ensure high quality."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Performance%20Optimization"
        enableComments={true}
        itemId="performance-quality"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed italic">
              Performance is UX.
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Users abandon slow sites within 3 seconds, and accessibility gaps exclude users entirely. We treat speed and stability as features, actively tracking Core Web Vitals and error rates.
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
              "Set and enforce performance budgets in CI/CD pipelines",
              "Monitor Core Web Vitals (LCP, FID, CLS) in real-time",
              "Track error rates, crash reports, and API response times",
              "Run automated accessibility testing (WCAG AA compliance)",
              "Set up alerting for performance degradation",
              "Implement quality gates that prevent slow code from shipping",
              "Conduct regular performance audits and optimizations"
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
              "Performance monitoring dashboards (New Relic, DataDog)",
              "CI quality gates and performance budgets",
              "Accessibility audit reports and remediation plans",
              "Error tracking and incident response logs",
              "Load testing results and capacity planning",
              "Performance optimization recommendations"
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
              "≥95% of pages meet Core Web Vitals thresholds",
              "<1% error rate across all user interactions",
              "WCAG AA compliance maintained",
              "Zero performance regressions reach production"
            ]}
          />
        </div>

        {/* Sample - Performance dashboard */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Performance Budget Dashboard</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Metric</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Target</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Current</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 dark:text-zinc-400">
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-2">LCP</td>
                    <td className="py-2">≤2.5s</td>
                    <td className="py-2">2.1s</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                        ✅ Pass
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-2">FID</td>
                    <td className="py-2">≤100ms</td>
                    <td className="py-2">85ms</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                        ✅ Pass
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-2">CLS</td>
                    <td className="py-2">≤0.1</td>
                    <td className="py-2">0.08</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                        ✅ Pass
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Bundle size</td>
                    <td className="py-2">≤250KB</td>
                    <td className="py-2">223KB</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full">
                        ✅ Pass
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-zinc-900 dark:text-white mb-3">Accessibility Checklist</h5>
              <BulletList 
                color="emerald"
                items={[
                  "Color contrast ratio ≥4.5:1",
                  "All interactive elements keyboard accessible",
                  "Form labels and error messages clear",
                  "Images have alt text, videos have captions",
                  "Focus indicators visible and consistent"
                ]}
              />
            </div>
          </div>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Analytics" variant="default" size="sm" />
            <NavigationChip skill="Agile Delivery" variant="outline" size="sm" />
            <NavigationChip skill="System Design" variant="outline" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}