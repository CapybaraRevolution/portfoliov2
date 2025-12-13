'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface ContinuousImprovementDrawerProps {
  className?: string
  onClose?: () => void
}

export function ContinuousImprovementDrawer({ className, onClose }: ContinuousImprovementDrawerProps) {
  useEffect(() => {
    trackProcessDrawerOpen('Continuous Improvement')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "Figma", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("linear", "Linear", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Continuous Improvement"
        summary="Launch is just the beginning. Keep making it better."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="continuous-improvement"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Shipping is not the finish line — it&apos;s the starting gun. The real learning begins when actual users interact with actual features. Their behavior tells you what&apos;s working, what&apos;s confusing, and what you got wrong.
          </p>
          <p>
            Continuous improvement means systematically collecting that feedback, analyzing it, and turning it into a prioritized backlog of enhancements. Not feature-factory mode, but disciplined iteration based on evidence.
          </p>
        </div>

        {/* The rhythm */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            The rhythm
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Week 1:</strong> Analyze metrics from the last cycle. What moved? What didn&apos;t? Identify the top 3 friction points.</li>
              <li><strong>Week 2:</strong> Prioritize fixes using RICE (Reach × Impact × Confidence ÷ Effort). Scope the experiments.</li>
              <li><strong>Week 3:</strong> Design and implement the highest-impact changes.</li>
              <li><strong>Week 4:</strong> Ship. Measure. Update the backlog. Repeat.</li>
            </ul>
          </div>
        </div>

        {/* Feedback sources */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Where feedback comes from
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Analytics.</strong> Funnel drop-offs, feature adoption, error rates.</li>
              <li><strong>Session recordings.</strong> Watch real users struggle (or succeed).</li>
              <li><strong>Support tickets.</strong> Patterns in complaints are patterns in the product.</li>
              <li><strong>Surveys and NPS.</strong> Direct feedback from people willing to give it.</li>
              <li><strong>Quarterly usability tests.</strong> Structured research with real users.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The product gets noticeably better every month. Not big splashy launches — just steady improvement that users notice over time. &quot;Hey, this is easier than it used to be.&quot;
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="OKRs" variant="default" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
            <NavigationChip skill="Experimentation" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
