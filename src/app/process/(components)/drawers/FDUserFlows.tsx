'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface FDUserFlowsProps {
  className?: string
  onClose?: () => void
}

export function FDUserFlows({ className, onClose }: FDUserFlowsProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        genericTool("Whimsical"),
        genericTool("Lucidchart")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Flow Design"
        title="User flow diagrams"
        summary="Map where users go, where they get stuck, and where they drop off."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=User%20Flow%20Design"
        enableComments={true}
        itemId="flow-design-flows"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Map the invisible paths users actually take
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Flow diagrams reveal gaps between intended and actual user behavior, preventing costly redesigns later.
            </p>
          </div>
        </div>

        {/* Flow mapping approach */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Flow mapping approach
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Start with user goals, not feature lists",
              "Map happy path, edge cases, and error scenarios",
              "Include entry and exit points for each flow",
              "Document decision points and branching logic",
              "Consider cross-device and multi-session journeys"
            ]}
          />
        </div>

        {/* Key considerations */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Key considerations
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Authentication and permission states",
              "Loading, empty, and error state handling",
              "Progressive disclosure and step optimization",
              "Back navigation and state preservation",
              "Mobile-specific interaction patterns"
            ]}
          />
        </div>

        {/* Validation outputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Validation outputs
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Annotated flow diagrams with context and constraints",
              "Step-by-step wireframes for complex interactions",
              "State machine documentation for dynamic content",
              "Analytics event plan for flow optimization tracking"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}