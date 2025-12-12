'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

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
        summary="Plan releases with a sharp focus on risk – decide early what to cut or defer, use gradual rollouts, and ensure nothing high-risk sneaks in late."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="release-planning-cut-candidate"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Smart release planning focuses on risk management. We define clear go/no-go criteria, maintain cut candidate lists, use progressive delivery techniques like feature flags and canary releases, and institute code freezes. This prevents last-minute chaos while enabling confident releases.
          </p>
        </div>

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <BulletList 
              color="emerald"
              items={[
                "Risk-based scope decisions: High-performing teams trim scope to protect release dates. Smaller releases succeed ~10x more than large ones.",
                "Preventing release chaos: Planned feature freeze windows reduce late changes and lower the chance of last-minute bugs.",
                "Progressive delivery reduces failures: Feature flags, canary releases, and phased rollouts dramatically cut risk vs. &quot;big bang&quot; deploys.",
                "Managed expectations: Explicit release planning with defined cut-off criteria curbs scope creep and builds stakeholder confidence."
              ]}
              className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed"
            />
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Release timeline and milestones · Product roadmap priorities · Technical dependencies and constraints · Stakeholder requirements and constraints
          </p>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Define clear go/no-go criteria and identify &quot;must-haves&quot; vs &quot;nice-to-haves&quot; using MoSCoW or similar frameworks",
              "Maintain a cut candidate list – features that will be dropped first if the release is behind schedule or proving too risky",
              "Institute code freeze periods (e.g. one week before launch) where only blocker defect fixes are allowed",
              "Implement progressive delivery: all new features behind feature flags by default, canary releases to small user cohorts first",
              "Monitor key metrics closely during gradual rollout (errors, latency, conversion) with instant kill switches available",
              "Schedule release review meetings involving Dev, QA, SRE/Ops, and Product for final risk assessment and rollback plan validation"
            ]}
          />
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Release plan document (scope, cut candidates, timeline, freeze date, responsible owners)",
              "Feature flag register (list of features toggled off at launch with criteria for enabling)",
              "Go/No-Go checklist covering quality gates (test pass rate, performance benchmarks, security review)",
              "Change freeze calendar communicated to all teams",
              "Release notes draft (updated if scope is cut)",
              "Launch decision log recording any late changes or cuts with rationale"
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
              "Change failure rate <15% (percentage of releases causing an incident, aligning with elite DORA performance)",
              "Scope stability: ≤5% of planned scope gets dropped last-minute",
              "100% adherence to freeze – no unplanned features snuck in after cutoff",
              "Progressive rollout coverage: 100% of new features go through staged rollout before full release",
              "Time to detect issues in canary (MTTD) is low – major issues surface within minutes/hours",
              "Decreasing trend of emergency rollbacks or feature kill-switch usage"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Big bang releases without progressive rollout, moving goalposts by dropping quality instead of scope, poor cut criteria where everything is &quot;must have,&quot; no rollback plan, neglecting cross-functional reviews (security, compliance)
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Feature flag toggle monitoring with baseline metric comparison, deployment pipeline rollout tracking with error rate alerts, release health dashboards tracking Golden Signals (latency, traffic, errors, saturation), release-to-incident correlation tracking for change failure rate analysis
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Product Strategy" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Risk Assessment" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}