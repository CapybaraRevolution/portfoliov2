'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'

interface JMPersonasProps {
  className?: string
  onClose?: () => void
}

export function JMPersonas({ className, onClose }: JMPersonasProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        toolPill("notion", "Notion", "md"),
        toolPill("google", "Interviews", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Journey Mapping"
        title="Personas & contexts"
        summary="Who are we designing for? What do they need? (Not who we imagine them to be.)"
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Persona%20Development"
        enableComments={true}
        itemId="journey-mapping-personas"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Context beats demographics every time
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Focus on what users are trying to accomplish and the constraints they face, not just who they are.
            </p>
          </div>
        </div>

        {/* What I focus on */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I focus on
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "What goals and motivations bring them to this product?",
              "Environmental constraints: time, device, location, stress level",
              "Mental models and expectations they bring with them",
              "Key decision points in their workflow",
              "What does success look like from their perspective?"
            ]}
          />
        </div>

        {/* Key outputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Key outputs
          </h3>
          <BulletList 
            color="blue"
            items={[
              "2-3 primary personas with contextual scenarios",
              "Jobs-to-be-done statements for each persona",
              "Contextual constraints and pain points",
              "Success metrics aligned to user outcomes"
            ]}
          />
        </div>

        {/* Success signals */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Success signals
          </h3>
          <BulletList 
            color="purple"
            items={[
              "Team can name the top 3 user goals without looking",
              "Design decisions reference specific persona needs",
              "Feature discussions include context scenarios"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}