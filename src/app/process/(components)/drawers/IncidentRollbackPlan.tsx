'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface IncidentRollbackPlanProps {
  className?: string
  onClose?: () => void
}

export function IncidentRollbackPlan({ className, onClose }: IncidentRollbackPlanProps) {
  const tools = (
    <ToolSection 
      tools={[
        genericTool("PagerDuty"),
        genericTool("DataDog"),
        genericTool("Sentry"),
        genericTool("Runbooks"),
        toolPill("slack", "Slack", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Ship"
        title="Incident & Rollback Plan"
        summary="When it breaks (and it will), know exactly what to do. Rollback plans aren't optional."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Risk%20Management"
        enableComments={true}
        itemId="incident-rollback-plan"
      >

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Overview
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Emergencies feel chaotic when nobody knows what to do. I create runbooks, escalation paths, and tested rollback procedures so when things break, recovery is fast and calm — not improvised.
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
                "Accelerates recovery times: Teams with documented incident response achieve 75% faster MTTR compared to ad-hoc responses.",
                "Reduces customer impact: Proper rollback procedures limit blast radius to <5% of users during critical failures.",
                "Minimizes revenue loss: Fast incident response prevents $5,600/minute downtime costs for typical e-commerce platforms.",
                "Prevents escalation chaos: Clear communication protocols reduce stakeholder confusion by 85% during outages.",
                "Enables confident deployments: Teams with tested rollback plans deploy 3x more frequently with lower stress levels."
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
            System architecture documentation · Historical incident data · SLA/SLO requirements · Team contact information · Monitoring and alerting setup
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
              "Incident response runbooks: detection triggers, escalation paths, communication protocols, decision trees by severity (P0-P3)",
              "Tested rollback procedures: scripted steps, target <15 min, verification checklists",
              "Communication templates: status page copy, stakeholder notifications, customer messaging",
              "Alerting strategy: SLI/SLO thresholds, alert fatigue prevention, oncall rotations",
              "Quarterly fire drills: test the runbooks before you need them for real",
              "Blameless post-mortems: root cause analysis, action items, lessons learned"
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
              "Incident response runbook with escalation matrix",
              "Tested rollback playbook with timing estimates",
              "Communication templates for stakeholders and customers",
              "Monitoring and alerting configuration documentation",
              "Post-incident review process and templates",
              "Tabletop exercise scenarios and results",
              "Oncall rotation schedule and handoff procedures",
              "Incident knowledge base with common patterns"
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
              "Mean time to recovery <15 minutes for critical incidents",
              "Rollback success rate >95% when executed",
              "Incident response time <5 minutes from detection",
              "Communication completeness >90% stakeholder coverage",
              "Post-incident review completion 100% within 48 hours",
              "Runbook accuracy >95% during real incidents",
              "Team confidence rating >8/10 for incident handling",
              "Customer communication latency <10 minutes for P0 incidents"
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
              "Creating runbooks without testing them",
              "Unclear rollback decision criteria",
              "Missing communication templates",
              "Inadequate monitoring coverage",
              "Blame-focused incident reviews",
              "Over-complex escalation matrices"
            ]}
          />
        </div>

        {/* Instrumentation */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">
            Instrumentation
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Mean time to recovery tracking, rollback success rate monitoring, incident response time measurement, communication completeness scoring, post-incident review completion rates, team confidence surveys
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Risk Management" variant="default" size="sm" />
            <NavigationChip skill="Process Design" variant="outline" size="sm" />
            <NavigationChip skill="Communication" variant="outline" size="sm" />
            <NavigationChip skill="Team Leadership" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}