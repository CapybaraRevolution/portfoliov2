'use client'

import { DrawerLayout } from '@/components/ui/DrawerLayout'
import { ToolSection, toolPill } from '@/components/ui/ToolSection'
import { NavigationChip } from '@/components/NavigationChip'

interface WhatIsUserResearchProps {
  className?: string
  onClose?: () => void
}

export function WhatIsUserResearch({ className, onClose }: WhatIsUserResearchProps) {
  const tools = (
    <ToolSection 
      tools={[
        toolPill("figma", "Figma/FigJam"),
        toolPill("typeform", "Typeform"),
        toolPill("userinterviews", "UserInterviews"),
        toolPill("notion", "Notion/Dovetail"),
        toolPill("loom", "Loom")
      ]}
    />
  )

  return (
    <div className={className}>
      <DrawerLayout
        stepText="Step 2 · IA & Flows · Stage 1: User Research"
        title="What is user research?"
        summary="Talking to users so you can stop guessing what they want."
        tools={tools}
        caseStudyUrl="/work/overview"
        caseStudyFilters="skills=User%20Research"
        enableComments={true}
        itemId="user-research-what"
      >

        {/* The idea */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            User research is just... talking to people. Watching them use things. Asking why they do what they do. It sounds simple because it is. The hard part is doing it rigorously enough that the insights are trustworthy.
          </p>
          <p>
            The goal isn&apos;t to validate your ideas (that&apos;s confirmation bias wearing a lab coat). It&apos;s to understand the problem space well enough that good solutions become obvious. Sometimes that means learning you were headed in the wrong direction — and that&apos;s a win.
          </p>
        </div>

        {/* How I approach it */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            How I approach it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <ul>
              <li><strong>Start with the decision.</strong> What are we trying to figure out, and what happens if we guess wrong?</li>
              <li><strong>Keep it lightweight.</strong> A research plan shouldn&apos;t be a thesis. Objectives, participants, method, done.</li>
              <li><strong>Recruit carefully.</strong> The wrong participants give you confidently wrong answers. Screen for the people who actually represent your users.</li>
              <li><strong>Run scripted sessions.</strong> Flexibility is good, but consistency makes synthesis possible. Same core questions, every time.</li>
            </ul>
          </div>
        </div>

        {/* What comes out */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What comes out of it
          </h3>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Not a 50-page report. A clear summary: here&apos;s what we learned, here&apos;s what it means, here&apos;s what we should do about it. Plus the raw notes and recordings for anyone who wants to go deeper.
            </p>
          </div>
        </div>

        {/* When it's working */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-3">
            You know it&apos;s working when...
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">
            The team can articulate the top 3 user goals and top 3 frictions — in the same words. That&apos;s shared understanding, and it changes how decisions get made.
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
            <NavigationChip skill="Storytelling" variant="outline" size="sm" />
          </div>
        </div>

      </DrawerLayout>
    </div>
  )
}
