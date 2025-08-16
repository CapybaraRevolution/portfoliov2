'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { Chip } from '@/components/ui/Chip'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'

interface WhatIsUserResearchProps {
  className?: string
  onClose?: () => void
}

export function WhatIsUserResearch({ className, onClose }: WhatIsUserResearchProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma/FigJam"),
        toolPill("typeform", "Typeform"),
        toolPill("google-forms", "Google Forms"),
        toolPill("userinterviews", "UserInterviews"),
        toolPill("calendly", "Calendly"),
        toolPill("notion", "Notion/Obsidian"),
        toolPill("loom", "Loom")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Stage 1: User Research"
        title="What is user research?"
        summary="User research replaces assumptions with evidence so design and engineering build the right thing."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=User%20Research"
        enableComments={true}
        itemId="user-research-what"
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
                "Builds empathy and shared language around user goals and constraints.",
                "Surfaces hidden friction before expensive design/dev cycles.",
                "Creates a 'source of truth' that aligns stakeholders and speeds decisions."
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
              "Clarify the decision we're trying to make and the risks of guessing.",
              "Draft a lightweight research plan (objectives, participants, methods, success signals).",
              "Recruit a representative slice of users/customers; schedule and consent.",
              "Run sessions (scripted but flexible); capture notes and recordings."
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
              "Research plan + screener",
              "Interview script(s)",
              "Note pack + recordings",
              "Quick-read summary of key insights"
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
              "Team can state the top 3 user goals and top 3 frictions in the same words.",
              "Clear hypotheses to validate next (and what we'll stop debating)."
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}