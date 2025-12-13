'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface AnalyticsEventsTrackingSpecProps {
  className?: string
  onClose?: () => void
}

export function AnalyticsEventsTrackingSpec({ className, onClose }: AnalyticsEventsTrackingSpecProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Amplitude"),
        toolPill("ga4", "GA4", "md"),
        genericTool("Segment"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Analytics Events Implementation"
        summary="Name your events consistently. Track the right things. Actually trust the data."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Analytics"
        enableComments={true}
        itemId="analytics-events-tracking-spec"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Analytics is one of those things that&apos;s easy to do badly. You fire off events with whatever names make sense at the time, properties are inconsistent, and six months later nobody trusts the data because &quot;checkout_complete&quot; and &quot;CheckoutCompleted&quot; and &quot;purchase_done&quot; are all measuring... something?
          </p>
          <p>
            I&apos;ve seen teams with dashboards nobody looks at because the data is too messy to trust. That&apos;s a waste. The fix isn&apos;t complicated — it&apos;s just discipline. Consistent naming. Clear definitions. Schema validation so bad data fails the build instead of silently corrupting your funnel.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Start with the questions.</strong> What do you actually need to know? Map business goals → KPIs → events. Don&apos;t track everything; track what matters.</li>
              <li><strong>Object-Action naming.</strong> &quot;Song Played&quot;, &quot;Cart Updated&quot;, &quot;Checkout Completed&quot;. Past tense, proper case, snake_case properties. Pick a convention and stick to it.</li>
              <li><strong>Tracking plan as source of truth.</strong> Every event has a definition, trigger condition, and property spec. Engineers reference this, not Slack threads.</li>
              <li><strong>Schema validation in CI.</strong> If an event doesn&apos;t match the spec, the build fails. Sounds strict, but it&apos;s the only way to keep things clean.</li>
              <li><strong>Treat analytics code like product code.</strong> Peer review. Tests. The same rigor you&apos;d apply to anything else.</li>
            </ul>
          </div>
        </div>

        {/* Sample */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample event spec
          </h3>
          <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre">
{`{
  "event": "Checkout Step Completed",
  "trigger": "User completes a checkout step",
  "properties": {
    "step_number": "integer (1-4)",
    "step_name": "string (shipping|payment|review|confirm)",
    "cart_value": "number (USD)",
    "item_count": "integer"
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
            Someone asks &quot;how many users completed checkout last week?&quot; and you can answer in 30 seconds — confidently — because you know exactly what &quot;completed checkout&quot; means and trust the data behind it.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Data Analysis" variant="default" size="sm" />
            <NavigationChip skill="Product Strategy" variant="outline" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
