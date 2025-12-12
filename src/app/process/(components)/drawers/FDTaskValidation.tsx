'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface FDTaskValidationProps {
  className?: string
  onClose?: () => void
}

export function FDTaskValidation({ className, onClose }: FDTaskValidationProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Maze"),
        genericTool("UserTesting"),
        toolPill("hotjar", "Hotjar", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Flow Design"
        title="Task flow validation"
        summary="Test the flow before you build it. Fix problems when they're cheap."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Usability%20Testing"
        enableComments={true}
        itemId="flow-design-validation"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Test early, fix cheap
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Validating flows before development catches usability issues when they&apos;re easy and inexpensive to fix.
            </p>
          </div>
        </div>

        {/* Testing approach */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Testing approach
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Task-based scenarios reflecting real user goals",
              "Low-fidelity prototypes to focus on flow logic",
              "Think-aloud protocol to capture mental models",
              "Error recovery and edge case validation",
              "Cross-device testing for responsive flows"
            ]}
          />
        </div>

        {/* Success metrics */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Success metrics
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Task completion rates above 85%",
              "Time on task within expected ranges",
              "Error rates and recovery success",
              "User confidence and satisfaction scores",
              "Cognitive load and confusion indicators"
            ]}
          />
        </div>

        {/* Iteration process */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Iteration process
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Identify top usability issues from testing",
              "Prioritize fixes by impact and effort",
              "Rapid prototype iteration and re-testing",
              "Stakeholder alignment on final flow decisions",
              "Documentation for development handoff"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}