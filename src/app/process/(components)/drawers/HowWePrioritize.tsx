'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface HowWePrioritizeProps {
  className?: string
  onClose?: () => void
}

export function HowWePrioritize({ className, onClose }: HowWePrioritizeProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("figma", "FigJam", "md"),
        toolPill("google", "Google Sheets", "md"),
        genericTool("RICE / WSJF")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="How to Prioritize"
        summary="RICE, impact/effort, cost of delay — frameworks that turn opinions into ranked decisions."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="how-we-prioritize"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            &quot;We should build X&quot; isn&apos;t a strategy. Neither is &quot;the CEO wants it.&quot; You need a way to compare options that doesn&apos;t just come down to who argues loudest.
          </p>
          <p>
            Frameworks help. Not because they give you perfect answers — they don&apos;t — but because they force you to think through the same dimensions for every option. Impact. Effort. Confidence. Reach. Suddenly the debate shifts from &quot;I think X is important&quot; to &quot;X scores higher because...&quot;
          </p>
        </div>

        {/* Frameworks I use */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Frameworks I actually use
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <p className="text-zinc-900 dark:text-white font-medium">RICE</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">Reach × Impact × Confidence ÷ Effort. Good for comparing features with different scopes.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <p className="text-zinc-900 dark:text-white font-medium">Impact / Effort matrix</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">Quick and dirty. Plot things on 2x2, do the quick wins first.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <p className="text-zinc-900 dark:text-white font-medium">Cost of Delay</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">What does it cost us each week we don&apos;t ship this? Helps with sequencing.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <p className="text-zinc-900 dark:text-white font-medium">MoSCoW</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">Must / Should / Could / Won&apos;t. Useful for fixed timelines. Keep Must-Have under 60%.</p>
            </div>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Stakeholders stop lobbying for their pet features and start asking &quot;how did this score?&quot; That&apos;s when you know the framework has credibility.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Prioritization" variant="default" size="sm" />
            <NavigationChip skill="OKRs" variant="outline" size="sm" />
            <NavigationChip skill="Roadmap" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
