'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface FDInformationArchitectureProps {
  className?: string
  onClose?: () => void
}

export function FDInformationArchitecture({ className, onClose }: FDInformationArchitectureProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "FigJam", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("Card sorting tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Flow Design"
        title="Information architecture"
        summary="Organize content and features in a way that matches users' mental models and supports key tasks."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Information%20Architecture"
        enableComments={true}
        itemId="flow-design-ia"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Structure drives behavior
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Clear information hierarchy reduces cognitive load and guides users toward successful task completion.
            </p>
          </div>
        </div>

        {/* Design approach */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Design approach
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Start with user goals and mental models, not org structure",
              "Group related functionality by task completion patterns",
              "Create clear content hierarchy with scannable labels",
              "Plan for growth and edge cases from the start",
              "Validate with card sorting and tree testing"
            ]}
          />
        </div>

        {/* Key deliverables */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Key deliverables
          </h3>
          <BulletList 
            color="blue"
            items={[
              "Site map with content hierarchy and navigation paths",
              "Page-level wireframes showing content relationships",
              "URL structure and routing plan",
              "Search and filtering taxonomy",
              "Mobile-first responsive navigation strategy"
            ]}
          />
        </div>

        {/* Validation methods */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Validation methods
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Card sorting to understand user mental models",
              "Tree testing for findability validation",
              "First-click testing on key entry points",
              "Analytics review of current navigation patterns"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}