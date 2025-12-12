'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface AccessibilityPerformanceQAProps {
  className?: string
  onClose?: () => void
}

export function AccessibilityPerformanceQA({ className, onClose }: AccessibilityPerformanceQAProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("axe-core"),
        toolPill("lighthouse", "Lighthouse", "md"),
        genericTool("WAVE"),
        genericTool("Pa11y-CI"),
        genericTool("WebPageTest"),
        toolPill("nvda", "NVDA", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Accessibility and Performance QA"
        summary="Fast for everyone. Usable by everyone. No exceptions."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Accessibility"
        enableComments={true}
        itemId="accessibility-performance-qa"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Accessibility isn&apos;t a nice-to-have — it&apos;s table stakes. I test for WCAG 2.2 compliance and Core Web Vitals because slow, inaccessible products lose users and invite lawsuits. (~95% of top sites fail basic accessibility checks.)
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
                "Mitigates legal risk: 4,500+ accessibility lawsuits filed in 2023, with ADA Title II requiring WCAG 2.1 AA compliance by 2026.",
                "Expands market reach: 15% of global population has disabilities, representing $13 trillion in annual disposable income.",
                "Improves SEO and conversions: Sites meeting Core Web Vitals see 24% better user engagement and higher search rankings.",
                "Reduces bounce rates: Every second of load time improvement increases conversions by 7%.",
                "Ensures inclusive experiences: Accessibility improvements benefit all users through better usability and clearer interfaces."
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
            WCAG 2.2 compliance requirements · Core Web Vitals baselines · User journey maps for testing · Performance budgets · Browser/device matrix
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
              "Automated + manual testing (automated catches 30-40% — the rest needs human eyes)",
              "axe-core, Lighthouse, WAVE for automated scans; target >90 scores",
              "Screen reader testing with NVDA + one other (JAWS or VoiceOver)",
              "Keyboard navigation verification — if you can&apos;t tab to it, it&apos;s broken",
              "CI/CD integration: Pa11y-CI, Lighthouse CI, fail builds on violations",
              "Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1",
              "Performance budgets: <170KB critical path, <5s TTI on 3G"
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
              "WCAG 2.2 compliance audit report",
              "Lighthouse performance/accessibility scores",
              "Screen reader testing documentation",
              "Core Web Vitals dashboard",
              "Performance budget tracking sheets",
              "Accessibility violation remediation plan",
              "Automated test results archive",
              "Compliance certification documentation"
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
              "WCAG 2.1 AA compliance 100% for critical paths",
              "Lighthouse accessibility score >90 consistently",
              "Core Web Vitals passing >75% of page loads",
              "Zero critical accessibility violations in production",
              "Page load time <3 seconds on 4G networks",
              "Keyboard navigation 100% functional",
              "Screen reader compatibility 100% verified",
              "Performance regression rate <1% in CI/CD"
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
              "Relying solely on automated testing (catches only 30-40%)",
              "Testing accessibility as an afterthought",
              "Ignoring mobile performance constraints",
              "Accepting violations for &quot;edge cases&quot;",
              "Testing with single assistive technology"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Automated CI/CD accessibility and performance testing, Core Web Vitals monitoring, Lighthouse score tracking, accessibility violation reporting, performance regression detection, screen reader compatibility verification
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Accessibility" variant="default" size="sm" />
            <NavigationChip skill="Quality Assurance" variant="outline" size="sm" />
            <NavigationChip skill="Performance Optimization" variant="outline" size="sm" />
            <NavigationChip skill="User Experience Design" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}