'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface ChooseRightMethodProps {
  className?: string
  onClose?: () => void
}

export function ChooseRightMethod({ className, onClose }: ChooseRightMethodProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("userinterviews", "UserInterviews"),
        toolPill("typeform", "Typeform"),
        toolPill("maze", "Maze"),
        toolPill("zoom", "Zoom"),
        toolPill("loom", "Loom"),
        toolPill("figjam", "FigJam")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Stage 1: User Research"
        title="Choosing the right method"
        summary="Interviews, surveys, usability tests — each answers different questions. Pick wrong and you get noise."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=UX%20Research"
        enableComments={true}
        itemId="user-research-method"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            Not all research methods are interchangeable. Interviews tell you <em>why</em> people behave a certain way. Surveys tell you <em>how many</em> share that behavior. Usability tests tell you <em>whether they can actually do the thing</em>. Use the wrong one and you&apos;ll get confident-sounding answers to the wrong question.
          </p>
          <p>
            I&apos;ve seen teams run surveys when they should have done interviews, then wonder why the data was useless. The method has to match the question.
          </p>
        </div>

        {/* Method chooser */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Quick decision guide
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">&quot;Why do users do this?&quot;</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Interviews. 5–7 is usually enough to see patterns.</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">&quot;How many users feel this way?&quot;</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Survey. But only after you know what questions to ask.</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">&quot;Can users actually complete this task?&quot;</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Usability test with clear success criteria.</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-medium">&quot;Which version performs better?&quot;</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ A/B test — but only once you have traffic and instrumentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            Stakeholders agree on the method <em>before</em> any sessions run. No one argues about methodology after the fact because it was decided upfront.
          </p>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Related Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <NavigationChip skill="User Research" variant="default" size="sm" />
            <NavigationChip skill="Usability Testing" variant="outline" size="sm" />
            <NavigationChip skill="Product Analytics" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
