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
        summary="Prepare comprehensive incident response and rollback strategies to minimize mean time to recovery during critical production failures."
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
            Incident and rollback planning prepares comprehensive response strategies to minimize mean time to recovery during critical production failures. This systematic approach transforms chaotic emergencies into orchestrated responses through predefined runbooks and tested procedures. Organizations with mature incident response achieve 75% faster recovery times while reducing customer impact by 60%.
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

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Create comprehensive incident response runbooks documenting detection triggers, escalation matrices, communication protocols, and decision trees for P0-P3 severity levels",
              "Develop tested rollback procedures with scripted steps, timing estimates (target <15 minutes), verification checklists, and automated rollback triggers where possible",
              "Establish incident communication frameworks using status page templates, stakeholder notification trees, and customer communication scripts with pre-approved messaging",
              "Implement monitoring and alerting strategies defining SLI/SLO thresholds, alert fatigue prevention, and escalation policies with oncall rotations",
              "Conduct tabletop exercises and fire drills quarterly testing runbook effectiveness, team response times, and communication flows under simulated pressure",
              "Document post-incident review processes using blameless retrospectives, root cause analysis templates, and action item tracking for continuous improvement",
              "Create rollback decision criteria matrix defining go/no-go thresholds, risk assessment frameworks, and rollback vs. forward-fix decision trees",
              "Maintain incident knowledge base capturing common failure patterns, resolution playbooks, and lessons learned from previous incidents"
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