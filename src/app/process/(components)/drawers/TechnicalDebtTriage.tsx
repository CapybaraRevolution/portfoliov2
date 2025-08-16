'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface TechnicalDebtTriageProps {
  className?: string
  onClose?: () => void
}

export function TechnicalDebtTriage({ className, onClose }: TechnicalDebtTriageProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("github", "GitHub", "md"),
        toolPill("jira", "Jira", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("Code analysis tools"),
        genericTool("Performance monitoring")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Technical Debt Triage"
        summary="Balance new features with system health using objective criteria and business impact."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Technical%20Strategy"
        enableComments={true}
        itemId="technical-debt-triage"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 border border-orange-200 dark:border-orange-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <p className="text-base text-orange-800 dark:text-orange-200 leading-relaxed">
              Unchecked tech debt slows feature delivery and creates reliability risks. Systematic triage keeps debt manageable while maintaining product velocity.
            </p>
          </div>
        </div>

        {/* Debt classification */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Technical debt classification
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Critical (Fix now)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Security vulnerabilities, data corruption risks, major performance issues</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">High (Next sprint)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Blocking feature development, significant velocity impact</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Medium (This quarter)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Code maintainability, testing gaps, minor performance issues</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Low (Backlog)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Code style, outdated dependencies with no functional impact</p>
                </div>
              </div>
            </div>
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
              "Establish debt classification criteria with engineering team",
              "Create debt inventory with business impact assessment",
              "Build debt allocation model (e.g., 70% features, 30% debt)",
              "Track debt accumulation and paydown velocity over time"
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
              "Technical debt classification framework",
              "Debt inventory with impact and effort estimates",
              "Allocation guidelines and sprint planning integration",
              "Monthly debt health reports and trends"
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
              "Critical and high-priority debt addressed within SLA",
              "Feature development velocity remains stable over time",
              "Engineering team satisfaction with codebase quality improves"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}