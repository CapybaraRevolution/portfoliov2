'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface InstrumentationDrawerProps {
  className?: string
  onClose?: () => void
}

export function InstrumentationDrawer({ className, onClose }: InstrumentationDrawerProps) {
  // Track drawer open on mount
  useEffect(() => {
    trackProcessDrawerOpen('Instrumentation')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("google", "Google Analytics", "md"),
        toolPill("ga4", "Mixpanel", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("google", "BigQuery", "md"),
        toolPill("notion", "DataDog", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Instrumentation"
        summary="Wire up events, funnels, and baselines to measure what matters."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Funnel%20Analysis"
        enableComments={true}
        itemId="instrumentation"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed italic">
              Without proper instrumentation, we&apos;re flying blind.
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Analytics reveal where users encounter friction, enabling data-driven improvements that directly impact conversion and satisfaction. Clean events and dashboards let the team see cause → effect quickly.
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
              "Define success metrics tied to user outcomes and business goals",
              "Wire up comprehensive event tracking (page views, clicks, conversions)",
              "Build analytics funnels to identify drop-off points",
              "Create real-time dashboards for key user actions and outcomes",
              "Implement user session recordings and heatmaps for behavior visualization",
              "Set up automated alerts for metric degradation"
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
              "Tracking plan with event taxonomy",
              "Analytics dashboards (Google Analytics, Mixpanel)",
              "Funnel analysis reports",
              "User flow visualizations",
              "Performance baselines"
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
              "Clear baselines established within first week",
              "<2% data discrepancy rate",
              "Daily dashboard usage by team",
              "Actionable insights driving iterations"
            ]}
          />
        </div>

        {/* Sample - Tracking plan */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Sample Tracking Plan</h4>
            
            <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 whitespace-pre">
{`{
  "event": "checkout_step_completed",
  "properties": {
    "step_number": 2,
    "step_name": "payment_method",
    "checkout_id": "chk_12345",
    "user_id": "user_67890",
    "device_type": "mobile",
    "session_duration_ms": 45000
  },
  "user_id": "user_12345"
}`}
              </pre>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-zinc-900 dark:text-white mb-3">Dashboard KPIs</h5>
              <BulletList 
                color="emerald"
                items={[
                  "Checkout completion rate: 67.3% (+2.1pp vs last month)",
                  "Average time to purchase: 4.2 minutes (-15s vs baseline)",
                  "Mobile vs desktop completion: 64% vs 71%",
                  "Top drop-off step: Payment method selection (23% exit)"
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
            <NavigationChip skill="Instrumentation" variant="default" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
            <NavigationChip skill="AI Integration" variant="outline" size="sm" />
            <NavigationChip skill="Agile Delivery" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}