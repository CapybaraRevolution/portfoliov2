'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { Chip } from '@/components/ui/Chip'
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
        summary="Agree on what success looks like before you start building."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Stakeholder%20Alignment"
        enableComments={true}
        itemId="stakeholder-alignment"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Great products die from misalignment, not bad ideas.
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Alignment creates a shared definition of &quot;done,&quot; success measures, and decision velocity.
            </p>
          </div>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "45–60-min workshops: goals, non-goals, constraints, assumptions",
              "Map decision-makers and influencers; capture RACI and escalation paths",
              "Define a north-star metric + 2–3 guardrails",
              "Spin up a living decision log — stops the same debates from recurring",
              "Timebox risks/unknowns into research spikes"
            ]}
          />
        </div>

        {/* Outputs & artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Alignment brief (goals, non-goals, guardrails, risks/assumptions)",
              "RACI + stakeholder map (tied to user-facing flow areas)",
              "Success measures & checkpoint cadence",
              "Kickoff deck (concise, reusable)"
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
              "Every stakeholder can state the same primary goal & metric",
              "Fewer blocked tickets; faster approvals in early sprints",
              "Decisions referenced instead of re-argued"
            ]}
          />
        </div>

        {/* Sample - Two cards in responsive grid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card A - Workshop agenda */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                Workshop agenda (45–60 min)
              </h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">1.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Goals & Non-goals</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(15m)</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">2.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Success measures</span>
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
                    <span className="font-medium text-zinc-900 dark:text-white">RACI mapping</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(10m)</span>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">5.</span>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">Decision framework</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">(5m)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card B - Sample output */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                Sample output: Alignment brief (excerpt)
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Goal:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Increase checkout completion by 15% in Q2</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Non-goals:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Redesigning the entire cart experience</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">North-star metric:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Checkout completion rate</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Guardrails:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Don&apos;t break mobile performance; maintain accessibility</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Key assumption:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">Users abandon due to too many form fields</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Decision maker:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 ml-2">PM (final call), Eng Lead (feasibility), Designer (UX)</span>
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
            <NavigationChip skill="Stakeholder Alignment" variant="default" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Team Facilitation" variant="outline" size="sm" />
            <NavigationChip skill="Storytelling" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}