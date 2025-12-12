'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface FigmaProductParityAuditProps {
  className?: string
  onClose?: () => void
}

export function FigmaProductParityAudit({ className, onClose }: FigmaProductParityAuditProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma", "md"),
        genericTool("Chromatic"),
        genericTool("Storybook"),
        genericTool("Pixel Perfect Pro"),
        genericTool("Visual regression tools")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Figma to Production Parity Audit"
        summary="Does the build match the design? Check before you ship."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Design%20Systems"
        enableComments={true}
        itemId="figma-product-parity-audit"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            &quot;Close enough&quot; isn&apos;t good enough. I run pre-release audits comparing production builds against Figma — pixel-perfect verification, design token compliance, and cross-browser checks. Catch discrepancies before they become design debt.
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
                "Ensures brand consistency: Only 20% of organizations currently implement systematic design system testing, missing critical quality opportunities.",
                "Reduces revision cycles: Catching design discrepancies pre-release eliminates 60% of post-launch design tickets.",
                "Validates design system adoption: Regular audits ensure component library usage and prevent pattern proliferation.",
                "Maintains user experience quality: Pixel-perfect implementation directly correlates with user satisfaction and conversion rates.",
                "Prevents design technical debt: Systematic audits avoid the accumulated cost of minor deviations that compound over time."
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
            Finalized Figma designs with annotations · Design system documentation and tokens · Staging environment builds · Browser/device testing matrix
          </p>
        </div>

        {/* What I do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Visual audits: colors, typography, spacing, component consistency",
              "Pixel-perfect verification: overlay, side-by-side, onion skin",
              "Design system conformance: Storybook + Chromatic, token validation",
              "Cross-browser checks: Safari renders differently (closer to Figma)",
              "Baseline snapshots: automated change detection in CI/CD",
              "Document discrepancies: Figma comments, severity ratings, Kanban tracking"
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
              "Pre-release design audit report with severity ratings",
              "Pixel-perfect verification screenshots",
              "Design token compliance matrix",
              "Component deviation documentation",
              "Cross-browser rendering analysis",
              "Design system adoption metrics",
              "Visual regression test results",
              "Sign-off documentation from design team"
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
              "Visual accuracy >99% for critical UI components",
              "Design token compliance 100% for colors and typography",
              "Component library usage >90% across features",
              "Zero critical design discrepancies at release",
              "Audit completion time <4 hours for standard releases",
              "Cross-browser consistency >95% for all viewports",
              "Design debt accumulation <5% per quarter",
              "Stakeholder approval rate >95% on first review"
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
              "Auditing only after development completion",
              "Ignoring responsive design breakpoints",
              "Accepting \"close enough\" implementations",
              "Missing micro-interactions and animations",
              "Insufficient documentation of approved variations"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Visual regression testing automation, design token compliance monitoring, cross-browser rendering analysis, component library usage tracking, audit completion time measurement, stakeholder approval rate tracking
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
            <NavigationChip skill="Visual Design" variant="outline" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}