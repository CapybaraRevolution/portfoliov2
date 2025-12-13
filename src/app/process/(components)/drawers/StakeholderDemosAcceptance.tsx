'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill, genericTool } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface StakeholderDemosAcceptanceProps {
  className?: string
  onClose?: () => void
}

export function StakeholderDemosAcceptance({ className, onClose }: StakeholderDemosAcceptanceProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("loom", "Loom", "md"),
        toolPill("zoom", "Zoom", "md"),
        toolPill("notion", "Notion", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 4 · Implementation Support · Execute"
        title="Stakeholder Demos & Acceptance"
        summary="Show working software, not slide decks. Get sign-off before you ship."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="stakeholder-demos-acceptance"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Demos should never be a surprise. If a stakeholder sees the feature for the first time in a sprint review and hates it, something went wrong weeks ago. But they still matter — it&apos;s where you get formal sign-off that yes, this is what we agreed to.
          </p>
          <p>
            I run structured demos with working software, not mockups. Lead with the business value, then show the feature. Capture feedback in real-time. Get explicit acceptance before we call it done.
          </p>
        </div>

        {/* How I run them */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I run them
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Time-boxed.</strong> 30 minutes max. Focused on what shipped, not what might ship someday.</li>
              <li><strong>Working software.</strong> Click through the actual build. No mockups, no slide decks, no &quot;imagine if...&quot;</li>
              <li><strong>Business value first.</strong> &quot;This helps users do X, which affects metric Y&quot; — then show how.</li>
              <li><strong>Capture feedback live.</strong> Notes, questions, concerns — all documented during the meeting.</li>
              <li><strong>Formal acceptance.</strong> Clear criteria, explicit sign-off. &quot;Is this done?&quot; needs a yes or no.</li>
            </ul>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Stakeholders leave the demo with a clear understanding of what shipped and why it matters. And feedback gets incorporated into the backlog with priorities attached, not lost in a Slack thread.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="Communication" variant="default" size="sm" />
            <NavigationChip skill="Stakeholder Alignment" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
