'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface FigmaProductParityAuditProps {
  className?: string
  onClose?: () => void
}

export function FigmaProductParityAudit({ className, onClose }: FigmaProductParityAuditProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma tokens", "md"),
        genericTool("DS docs"),
        genericTool("Visual diff tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Build"
        title="Figma → Prod Parity Audit"
        summary="One system, one look—no &quot;almosts.&quot;"
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="figma-product-parity-audit"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Protect UX consistency
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Parity protects UX consistency and speeds future work.
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
              "Audit screens vs. DS tokens/components",
              "File fixes or propose DS updates when mismatches are intentional"
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
              "Parity scorecard and diff screenshots",
              "Fix list by owner (DS vs. app)"
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
              "Parity ≥ 98% on audited scope",
              "Fewer &quot;custom&quot; one-offs in codebase"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}