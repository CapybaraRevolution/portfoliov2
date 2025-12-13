'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface StakeholderAlignmentProps {
  className?: string
  onClose?: () => void
}

export function StakeholderAlignment({ className, onClose }: StakeholderAlignmentProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("miro", "Miro/FigJam"),
        toolPill("notion", "Notion"),
        toolPill("google-docs", "Google Docs"),
        toolPill("loom", "Loom")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 1 · Discovery & Strategy"
        title="Stakeholder Alignment"
        summary="Great products die from misalignment, not bad ideas. Get everyone on the same page early."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Stakeholder%20Alignment"
        enableComments={true}
        itemId="stakeholder-alignment"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            I&apos;ve watched smart teams build the wrong thing because they never stopped to agree on what &quot;done&quot; actually meant. Everyone had a slightly different picture in their head. By the time they realized it, months had passed.
          </p>
          <p>
            Alignment isn&apos;t about getting sign-off. It&apos;s about making sure that when someone says &quot;success,&quot; everyone pictures the same outcome. When someone says &quot;out of scope,&quot; nobody&apos;s surprised. When a decision needs to be made, people know who makes it.
          </p>
          <p>
            I run a workshop early — usually 45-60 minutes — where we nail down goals, non-goals, success metrics, and who&apos;s responsible for what. Then I document it in a way that people will actually reference later. (Most alignment docs collect dust. Mine don&apos;t.)
          </p>
        </div>

        {/* Why this matters */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Why I insist on this
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Because the alternative is re-arguing the same decisions every sprint. I&apos;ve seen teams stuck in loops — &quot;wait, I thought we agreed...&quot; — and it&apos;s always because nobody wrote it down, or the doc was too long to read, or the wrong people weren&apos;t in the room.
            </p>
            <p>
              A good alignment session saves more time than it takes. It also surfaces disagreements early, when they&apos;re cheap to resolve, instead of late, when they&apos;re expensive.
            </p>
          </div>
        </div>

        {/* Sample - Two cards in responsive grid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What this looks like
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card A - Workshop agenda */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">
                A typical workshop (45–60 min)
              </h4>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">1.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Goals & non-goals</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(15m)</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">2.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">How we&apos;ll measure success</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(15m)</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">3.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Constraints & assumptions</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(10m)</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">4.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Who decides what</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(10m)</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">5.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Open questions to resolve</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(5m)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card B - Sample output */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">
                Sample alignment brief
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Goal:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Increase checkout completion by 15% in Q2</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Non-goal:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Redesigning the entire cart (that&apos;s next quarter)</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Metric:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Checkout completion rate</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Guardrails:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Don&apos;t break mobile; maintain accessibility</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Assumption:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Users abandon because of too many form fields</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Decision maker:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">PM (final call), Eng Lead (feasibility)</span>
                </div>
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
            Someone links to the alignment doc in a Slack thread to settle a debate, instead of re-arguing from scratch. That&apos;s alignment doing its job.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Stakeholder Alignment" variant="default" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Team Facilitation" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
