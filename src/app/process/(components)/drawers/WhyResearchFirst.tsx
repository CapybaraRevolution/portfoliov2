'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { Chip } from '@/components/ui/Chip'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'

interface WhyResearchFirstProps {
  className?: string
  onClose?: () => void
}

export function WhyResearchFirst({ className, onClose }: WhyResearchFirstProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion/Confluence"),
        toolPill("figma", "Figma"),
        toolPill("amplitude", "Amplitude/GA4"),
        toolPill("loom", "Loom")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Stage 1: User Research"
        title="Why research first?"
        summary="Research is the cheapest way to avoid building the wrong thing."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="user-research-why"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <BulletList 
              color="emerald"
              items={[
                <>
                  <strong>Cuts rework:</strong> Finding problems in a prototype costs hours. Finding them in production costs sprints.
                </>,
                <>
                  <strong>Focuses effort:</strong> Clarifies the few moments that actually drive outcomes — activation, conversion, retention.
                </>,
                <>
                  <strong>De-risks bets:</strong> When decisions reference evidence instead of opinions, stakeholder debates get a lot shorter.
                </>
              ]}
              className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed"
            />
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
              "Map the risks and unknowns from discovery — what do we still not know?",
              "Tie every research question to a decision we need to make. No 'nice to know' — only 'need to know.'",
              "Instrument the minimum events needed to measure impact later."
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Risk-to-research matrix (question → method → expected decision)",
              "'If we learn X, we'll do Y' decision table"
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
              "Fewer 'unknowns' sneaking into sprint planning.",
              "Decisions unblocked — with owners and timelines attached."
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}