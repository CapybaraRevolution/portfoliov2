'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ValidateIAProps {
  className?: string
  onClose?: () => void
}

export function ValidateIA({ className, onClose }: ValidateIAProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("OptimalSort"),
        genericTool("Maze"),
        genericTool("UserZoom"),
        genericTool("Treejack"),
        toolPill("figma", "FigJam", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Information Architecture"
        title="Validate IA (Card Sort + Tree Test)"
        summary="Test the structure before you polish the pixels."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="information-architecture-validate-ia"
      >

        {/* Why it matters - Feature card */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              ≥80–90% tree-test success
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Evidence over guesses. Card sorting reveals mental models; tree testing validates findability without UI chrome. Validated IA reduces misnavigation, accelerates onboarding, and protects build time from rework.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Card sorting (open → early discovery; closed → label validation)",
              "Diverse users; stop when clusters stabilize (~15 is a solid baseline)",
              "Tree testing (text-only nav) - Measure success, directness/first-try, time-to-find",
              "Iterate until key tasks hit ≥80–90% success (mission-critical aim >90%)"
            ]}
          />
        </div>

        {/* Artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Artifacts
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Sort dendrograms & clusters; label recommendations",
              "Tree-test report: paths, misroutes, time, success rubric",
              "Change log (test → tweak → retest)"
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
              "≥80–90% success on representative tasks",
              "Time-to-content trending down; misroutes concentrated and fixed",
              "Clear rationale linking labels to findings"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <BulletList 
            color="zinc"
            items={[
              "Testing with insiders only",
              "Letting UI chrome mask IA problems",
              "Declaring victory without retest on critical paths"
            ]}
          />
        </div>

        {/* Sample Template */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Tree-test KPI (per task)
          </h4>
          <BulletList 
            color="emerald"
            items={[
              "Success: ≥80% (very good), >90% (excellent for mission-critical)",
              "Directness (first-try): ≥70% target",
              "Median time-to-find: ↓ vs. prior test"
            ]}
          />
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mt-6 mb-4">
            Minimal task set (example)
          </h4>
          <BulletList 
            color="emerald"
            items={[
              "Find Program tuition & aid",
              "Find Faculty directory",
              "Find Enrollment deadlines"
            ]}
          />
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Usability Testing" variant="default" size="sm" />
            <NavigationChip skill="Information Architecture" variant="outline" size="sm" />
            <NavigationChip skill="User Research" variant="outline" size="sm" />
            <NavigationChip skill="Data Analysis" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}