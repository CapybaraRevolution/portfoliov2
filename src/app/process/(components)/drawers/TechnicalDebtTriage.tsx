'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/ui/NavigationChip'

interface TechnicalDebtTriageProps {
  className?: string
  onClose?: () => void
}

export function TechnicalDebtTriage({ className, onClose }: TechnicalDebtTriageProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("github", "GitHub", "md"),
        toolPill("jira", "Jira", "md"),
        toolPill("notion", "Notion", "md"),
        genericTool("SonarQube"),
        genericTool("CodeClimate"),
        genericTool("Code analysis tools"),
        genericTool("Performance monitoring")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · Planning & Architecture · Stage 1: Prioritization"
        title="Technical Debt Triage"
        summary="We quantify and prioritize technical debt using financial models that translate code quality issues into business impact metrics."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Technical%20Strategy"
        enableComments={true}
        itemId="technical-debt-triage"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We quantify and prioritize technical debt using financial models that translate code quality issues into business impact metrics. Our approach combines SQALE methodology for debt quantification, Cost of Delay calculations for economic prioritization, and risk-adjusted scoring for security and compliance issues. We maintain technical debt visibility through comprehensive registers, automated tracking via SonarQube integration, and regular portfolio reviews that balance debt paydown with feature delivery using the 20% allocation rule and targeted refactoring strategies.
          </p>
        </div>

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 border border-orange-200 dark:border-orange-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <BulletList 
              color="orange"
              items={[
                "Velocity recovery: Technical debt causes 20-42% development effort waste; systematic paydown recovers this lost capacity and improves team productivity",
                "Cost multiplication prevention: Feature development in high-debt codebases takes 1.2-2.5x longer; prioritized debt reduction prevents exponential cost growth",
                "Risk mitigation: Security and compliance debt carry 3-10x risk multipliers; proper prioritization prevents catastrophic failures and regulatory penalties",
                "Quality improvement: Structured debt management reduces defect rates by 50% and regression issues by 40-60%",
                "Market responsiveness: Companies managing technical debt effectively show 20% higher revenue growth through improved agility and faster time-to-market"
              ]}
            />
          </div>
        </div>

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Inputs
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Static code analysis reports (SonarQube, CodeClimate) · Architecture assessment documentation · Security vulnerability scans and penetration test results · Performance profiling and monitoring data · Development velocity metrics and trend analysis · Defect density and regression rate statistics · Infrastructure cost reports and scaling projections · Compliance audit findings and regulatory requirements
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
              "SQALE implementation: Calculate remediation costs using time estimates for fixing each issue, compute Technical Debt Ratio as percentage of development cost, assign letter grades (A-E) based on debt ratios (A≤5%, B=6-10%, C=11-20%, D=21-50%, E>50%), track debt trends over time",
              "Cost of Delay quantification: Estimate velocity impact from debt (20-42% productivity loss), calculate defect rate correlations (2-3x increase in high-debt areas), project time-to-market delays (25-60% feature throughput reduction), quantify customer satisfaction impact through performance and reliability metrics",
              "CD3 prioritization: Calculate Cost of Delay for each debt item including productivity impact, risk exposure, and opportunity costs, estimate remediation duration in person-weeks, compute CD3 score (CoD/Duration), sequence debt items by highest CD3 first",
              "Risk-adjusted scoring: Apply multipliers for security debt (2-5x for critical vulnerabilities), compliance debt (3-10x for regulatory requirements), performance debt (1.5-3x based on user impact), operational debt (2-4x for reliability concerns), creating composite priority scores",
              "Debt registry maintenance: Catalog all identified technical debt with business impact assessments, maintain remediation estimates and priority scores, track status and progress on debt reduction initiatives, conduct quarterly reviews to reassess priorities",
              "Allocation strategy implementation: Enforce 20% capacity rule for debt paydown, implement Boy Scout Rule for continuous improvement, balance dedicated refactoring sprints with ongoing paydown, create technical debt budgets aligned with business goals",
              "Visualization and reporting: Create debt heat maps showing concentration across codebase, maintain executive dashboards with debt trends and projections, generate burndown charts tracking debt reduction progress, provide ROI analysis for debt paydown investments",
              "Tool integration management: Configure SonarQube with custom quality gates, integrate debt metrics into CI/CD pipelines, establish automated alerting for debt threshold breaches, enable IDE plugins for real-time developer feedback"
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
              "Technical debt register with quantified business impact",
              "SQALE analysis report with letter grades and trends",
              "Cost of Delay calculations with CD3 prioritization matrix",
              "Risk-adjusted debt backlog with remediation roadmap",
              "Debt allocation plan with sprint-by-sprint targets",
              "Heat map visualizations of debt concentration",
              "Executive dashboard with debt metrics and ROI projections",
              "Quarterly debt portfolio review presentations"
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
              "Debt ratio improvement: Maintaining Technical Debt Ratio below 10% (industry average 20-25%)",
              "Velocity recovery: 20-30% improvement in feature delivery speed after debt reduction",
              "Defect reduction: 50% decrease in production defects from high-debt areas",
              "Allocation consistency: Maintaining 20% capacity for debt work across all sprints",
              "Remediation velocity: Completing high-priority debt items within 2 quarters",
              "ROI achievement: Demonstrating 2-3x return on debt paydown investments",
              "Quality gate compliance: 95% of code changes passing automated debt checks"
            ]}
          />
        </div>

        {/* Pitfalls to avoid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Pitfalls to avoid
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Perfectionism pursuit: Trying to eliminate all debt instead of managing to acceptable levels · Business disconnection: Discussing debt in technical terms rather than business impact · Tool over-reliance: Depending solely on automated analysis without architectural assessment · Big bang refactoring: Attempting massive rewrites instead of incremental improvement · Debt hiding: Underestimating or ignoring debt to appear more productive · Allocation erosion: Allowing feature pressure to eliminate debt paydown time · Metric gaming: Fixing easy issues to improve metrics while ignoring critical debt
          </p>
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Technical debt ratio tracking with business impact correlation, velocity recovery measurement post-remediation, defect density analysis in high-debt versus low-debt areas, cost of delay calculations for prioritization accuracy, allocation compliance monitoring for 20% rule adherence
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip
              href="/process?skill=risk-management"
              variant="default"
              size="sm"
            >
              Risk Management
            </NavigationChip>
            <NavigationChip
              href="/process?skill=process-design"
              variant="outline"
              size="sm"
            >
              Process Design
            </NavigationChip>
            <NavigationChip
              href="/process?skill=quality-assurance"
              variant="outline"
              size="sm"
            >
              Quality Assurance
            </NavigationChip>
            <NavigationChip
              href="/process?skill=performance-optimization"
              variant="outline"
              size="sm"
            >
              Performance Optimization
            </NavigationChip>
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}