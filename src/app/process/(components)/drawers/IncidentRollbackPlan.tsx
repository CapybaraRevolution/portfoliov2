'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
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
        toolPill("slack", "Slack", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Ship"
        title="Incident & Rollback Plan"
        summary="When it breaks (and it will), know exactly what to do."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Risk%20Management"
        enableComments={true}
        itemId="incident-rollback-plan"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Emergencies feel chaotic when nobody knows what to do. I&apos;ve been in war rooms where five people are yelling different things, nobody knows who&apos;s in charge, and the rollback takes 45 minutes because someone has to figure out the process in real-time.
          </p>
          <p>
            The fix is boring: write it down ahead of time. Runbooks, escalation paths, communication templates. Test them before you need them. When something actually breaks, recovery is fast and calm — not improvised.
          </p>
        </div>

        {/* What I prepare */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I prepare
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Runbooks.</strong> Step-by-step for common failure modes. &quot;Database connection errors&quot; shouldn&apos;t require thinking.</li>
              <li><strong>Escalation paths.</strong> Who gets paged at 2am? Who makes the call to rollback? Who talks to customers?</li>
              <li><strong>Rollback procedures.</strong> Tested, scripted, with timing estimates. Target: under 15 minutes from decision to deployed.</li>
              <li><strong>Communication templates.</strong> Status page copy, stakeholder updates, customer messaging. Written in advance so nobody&apos;s wordsmithing during an outage.</li>
              <li><strong>Severity definitions.</strong> P0 through P3. Clear criteria so there&apos;s no debate about whether this is &quot;really a P0.&quot;</li>
            </ul>
          </div>
        </div>

        {/* Fire drills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Fire drills
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              I like running tabletop exercises quarterly. Pick a scenario (&quot;payment provider goes down&quot;), walk through the runbook, time it. You&apos;ll find gaps. Better to find them in a meeting than at 3am.
            </p>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            An incident happens and the on-call engineer says &quot;I followed the runbook, we were back up in 12 minutes.&quot; No panic, no heroics — just the process working.
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
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
