'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface ReleasePlanningCutCandidateProps {
  className?: string
  onClose?: () => void
}

export function ReleasePlanningCutCandidate({ className, onClose }: ReleasePlanningCutCandidateProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Linear"),
        toolPill("jira", "Jira", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("loom", "Loom", "md"),
        toolPill("slack", "Slack", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Plan"
        title="Release Planning & Cut Candidate"
        summary="Protect dates without sacrificing quality—move scope, not deadlines."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="release-planning-cut-candidate"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Ship with confidence
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Teams ship with confidence when we know what drops first if risk rises.
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
              "Create R/A lists (release vs. after) aligned to goals",
              "Define &quot;cut candidate&quot; rules and escalation paths",
              "Maintain release notes and change log as we go"
            ]}
          />
        </div>

        {/* Outputs & deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs &amp; deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Release brief (goals, metrics, cut rules, owners)",
              "Candidate list with severities (Must/Should/Could)",
              "Draft release notes"
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
              "No surprise scope cuts in the final week",
              "Demos align with the written release brief"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}