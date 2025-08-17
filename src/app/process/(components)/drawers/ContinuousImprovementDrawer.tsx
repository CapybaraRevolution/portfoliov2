'use client'

import { useEffect } from 'react'
import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { BulletList } from '@/components/ui/BulletList'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'
import { trackProcessDrawerOpen } from '@/components/GoogleAnalytics'

interface ContinuousImprovementDrawerProps {
  className?: string
  onClose?: () => void
}

export function ContinuousImprovementDrawer({ className, onClose }: ContinuousImprovementDrawerProps) {
  // Track drawer open on mount
  useEffect(() => {
    trackProcessDrawerOpen('Continuous Improvement')
  }, [])

  const tools = (
    <ToolSection 
      tools={[
        toolPill("notion", "Notion", "md"),
        toolPill("google", "Jira", "md"),
        toolPill("figma", "Figma", "md"),
        toolPill("hotjar", "Hotjar", "md"),
        toolPill("google", "UserVoice", "md")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 5 · Launch & Optimization"
        title="Continuous Improvement"
        summary="Turn user insights into a prioritized backlog – refine and ship updates weekly."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=Product%20Strategy"
        enableComments={true}
        itemId="continuous-improvement"
      >

        {/* Why it matters - Feature card with gradient */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed italic">
              Launch is just the beginning.
            </h3>
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Continuous improvement means your product never stops getting better. We systematically collect user feedback, analyze performance data, and turn insights into prioritized enhancements.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What we do
          </h3>
          <BulletList 
            color="emerald"
            items={[
              "Collect user feedback through surveys, support tickets, and reviews",
              "Conduct quarterly usability testing with real users",
              "Analyze analytics data for patterns and friction points",
              "Maintain a prioritized improvement backlog using RICE scoring",
              "Plan and execute regular enhancement sprints",
              "Track improvement impact with before/after metrics",
              "Hold retrospectives to identify process optimizations"
            ]}
          />
        </div>

        {/* Outputs & artifacts */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Outputs & artifacts
          </h3>
          <BulletList 
            color="blue"
            items={[
              "User feedback analysis reports",
              "Usability testing findings and recordings",
              "RICE-prioritized enhancement backlog",
              "Post-launch improvement reports",
              "Regular release notes documenting changes",
              "Performance impact assessments"
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
              "Quarterly NPS improvement (+5 points per quarter target)",
              "95% of user-reported issues addressed within 2 sprints",
              "Consistent velocity in shipping improvements",
              "Measurable impact from each enhancement cycle"
            ]}
          />
        </div>

        {/* Sample - RICE backlog */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Sample
          </h3>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-4">RICE-Scored Backlog</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Initiative</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Reach</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Impact</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Confidence</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Effort</th>
                    <th className="text-left py-2 text-zinc-900 dark:text-white">Score</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 dark:text-zinc-400">
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-2">Mobile checkout polish</td>
                    <td className="py-2">8000</td>
                    <td className="py-2">3</td>
                    <td className="py-2">80%</td>
                    <td className="py-2">3 weeks</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-full">
                        64
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-2">Payment method icons</td>
                    <td className="py-2">8000</td>
                    <td className="py-2">2</td>
                    <td className="py-2">90%</td>
                    <td className="py-2">1 week</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
                        144
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Guest checkout flow</td>
                    <td className="py-2">3000</td>
                    <td className="py-2">4</td>
                    <td className="py-2">70%</td>
                    <td className="py-2">4 weeks</td>
                    <td className="py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 rounded-full">
                        21
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-zinc-900 dark:text-white mb-3">Monthly Improvement Rhythm</h5>
              <BulletList 
                color="emerald"
                items={[
                  "Week 1: Analyze measures, identify top 3 friction points",
                  "Week 2: Prioritize fixes using RICE, plan experiments",
                  "Week 3: Design and implement highest-impact changes",
                  "Week 4: Launch A/B tests, measure results, update backlog"
                ]}
              />
            </div>
          </div>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="OKRs" variant="default" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
            <NavigationChip skill="Experimentation" variant="outline" size="sm" />
            <NavigationChip skill="Team Facilitation" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}