'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
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
        genericTool("RICE framework"),
        genericTool("Value vs Effort matrix")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="How We Prioritize"
        summary="RICE, impact scoring, and other frameworks to rank opportunities objectively."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="how-we-prioritize"
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
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Consistent scoring removes bias and politics from roadmap decisions. Teams can focus on execution rather than re-arguing priorities every sprint.
            </p>
          </div>
        </div>

        {/* Framework comparison */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Prioritization frameworks
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">RICE (Reach × Impact × Confidence ÷ Effort)</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Best for feature prioritization with user data</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Value vs Effort Matrix</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Quick visual for stakeholder alignment</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">Kano Model</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Categorize features by user satisfaction impact</p>
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
              "Select framework based on team maturity and data availability",
              "Calibrate scoring with real examples from your domain",
              "Create templates and train team on consistent application",
              "Track framework effectiveness and iterate based on outcomes"
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
              "Prioritization framework selection and rationale",
              "Scoring templates with examples and anchors",
              "Team training materials and calibration exercises",
              "Prioritized backlog with scores and rationale"
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
              "Scoring consistency across team members (< 20% variance)",
              "Stakeholders can predict priority ranking for new requests",
              "Time from idea to priority score < 1 week"
            ]}
          />
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
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}