'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface InstrumentationDrawerProps {
  className?: string
  onClose?: () => void
}

export function InstrumentationDrawer({ className, onClose }: InstrumentationDrawerProps) {
  useEffect(() => {
    trackProcessDrawerOpen('Instrumentation')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("google", "Google Analytics", "md"),
        toolPill("ga4", "Mixpanel", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("notion", "DataDog", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Instrumentation"
        summary="Wire up events, funnels, and baselines. Know what&apos;s happening before you guess."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Funnel%20Analysis"
        enableComments={true}
        itemId="instrumentation"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            You can&apos;t improve what you don&apos;t measure. But most teams either measure nothing useful or measure everything and drown in noise. Instrumentation is about finding the middle: track the events that matter, build dashboards people actually look at, and create baselines so you know when something changes.
          </p>
          <p>
            I wire up analytics early — ideally before launch, not after. That way you have baseline data from day one instead of scrambling to add tracking after someone asks &quot;wait, what&apos;s our conversion rate?&quot;
          </p>
        </div>

        {/* What I track */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I track
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Funnels.</strong> Where do people drop off? Checkout step 2? Onboarding day 3? The funnel shows you.</li>
              <li><strong>Feature adoption.</strong> Are people actually using what you built? If not, why not?</li>
              <li><strong>Performance.</strong> Page load times, API latency, error rates. Slow is broken.</li>
              <li><strong>Business metrics.</strong> Revenue, conversion, retention — the stuff that pays the bills.</li>
            </ul>
          </div>
        </div>

        {/* Sample tracking event */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample tracking event
          </h3>
          <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre">
{`{
  "event": "Checkout Step Completed",
  "properties": {
    "step_number": 2,
    "step_name": "payment_method",
    "cart_value_usd": 127.50,
    "device_type": "mobile"
  }
}`}
            </pre>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The team checks the dashboard in standups. Not because someone told them to, but because it&apos;s actually useful. &quot;Checkout completion dropped 2% yesterday — let&apos;s look at what changed.&quot;
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Analytics" variant="default" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
            <NavigationChip skill="Experimentation" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
