'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface DailyDesignQAProps {
  className?: string
  onClose?: () => void
}

export function DailyDesignQA({ className, onClose }: DailyDesignQAProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("DevMode"),
        genericTool("Storybook"),
        genericTool("Percy"),
        genericTool("Chromatic"),
        genericTool("Applitools"),
        genericTool("Pixel Perfect Pro")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Daily Design QA"
        summary="Establish continuous quality checkpoints that prevent visual and interaction debt from accumulating during development."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="daily-design-qa"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Daily Design QA establishes continuous quality checkpoints that prevent visual and interaction debt from accumulating during development. This proactive approach compares implementation against design specifications in real-time, catching discrepancies before they compound while achieving 90%+ visual accuracy.
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
                "Prevents design debt accumulation: Regular checks avoid marginal degradation that costs 20-30% additional development time to fix later.",
                "Delivers 9,900% ROI: Every dollar invested in UX and design quality brings exceptional returns through improved user experience.",
                "Reduces false positives: Modern visual AI tools achieve 99% accuracy in detecting meaningful changes while filtering irrelevant differences.",
                "Accelerates delivery: Teams with daily design QA report 40+ UI comparisons possible in under 60 seconds, enabling rapid iteration.",
                "Maintains brand consistency: Systematic design validation ensures pixel-perfect implementation across all touchpoints."
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
            Figma design files with component specifications · Design tokens (colors, typography, spacing) · Implementation code for review · Device and browser testing matrix
          </p>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Execute component-level testing rather than full-page reviews, enabling granular quality control with 500+ concurrent experiments monthly",
              "Implement automated visual regression testing using Chromatic, Percy, or Applitools integrated into CI/CD pipelines",
              "Apply pixel-perfect verification techniques including overlay methods, side-by-side comparisons, and onion skin mode alternating between design and implementation",
              "Validate typography, spacing, and colors through automated token checking and browser-specific rendering tests",
              "Utilize professional QA tools like Pixel Perfect Pro, Avocode&apos;s Pixel Checker, and Figma QA plugins for systematic comparison",
              "Conduct cross-browser consistency checks accounting for font rendering variance (Safari matches Figma more closely)",
              "Maintain design debt prevention strategies following the Boy Scout Rule and allocating 20-30% sprint time for quality improvements"
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
              "Daily design QA checklist completion reports",
              "Visual regression test results with annotated screenshots",
              "Design token validation reports",
              "Browser-specific rendering documentation",
              "Component deviation log with severity ratings",
              "Design debt register with prioritization",
              "Cross-browser compatibility matrix",
              "Weekly design quality scorecards"
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
              "Visual accuracy >90% for detecting meaningful changes",
              "Design token compliance >95% across components",
              "Processing speed >40 UI comparisons in under 60 seconds",
              "False positive rate <5% in automated testing",
              "Daily QA completion rate 100% for new features",
              "Design debt ratio <10% of total development effort",
              "Component test coverage >80% for design system",
              "Cross-browser consistency >98% for critical paths"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300">
            Testing only at end of sprints, ignoring browser-specific rendering differences, over-relying on automated tools without manual verification, missing responsive breakpoint testing, accepting &quot;close enough&quot; implementations
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Automated visual regression testing integrated into CI/CD, design token compliance monitoring, cross-browser rendering analysis, component test coverage tracking, design debt accumulation metrics
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Design Systems" variant="default" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}