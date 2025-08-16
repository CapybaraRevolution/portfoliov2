'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'

interface AccessibilityPerformanceQAProps {
  className?: string
  onClose?: () => void
}

export function AccessibilityPerformanceQA({ className, onClose }: AccessibilityPerformanceQAProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("Axe DevTools"),
        genericTool("Lighthouse"),
        genericTool("WebPageTest"),
        genericTool("Chrome DevTools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Build"
        title="Accessibility & Performance QA"
        summary="Fast, inclusive experiences help everyone."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Accessibility"
        enableComments={true}
        itemId="accessibility-performance-qa"
      >

        {/* Why it matters */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              WCAG-aligned and fast
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              A11y/perf debt compounds—catch it before launch.
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
              "Automated and manual a11y checks, keyboard paths",
              "Perf pass (Lighthouse) and Web Vitals review with Eng"
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
              "A11y report (violations, fixes, owners)",
              "Perf report (LCP/CLS/INP) with recommendations"
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
              "0 critical a11y violations; Lighthouse ≥ 90",
              "P95 page load time within target"
            ]}
          />
        </div>

      </DrawerLayout>
    </div>
  )
}