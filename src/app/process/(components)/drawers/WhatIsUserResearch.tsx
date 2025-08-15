'use client'

import { Chip } from '@/components/ui/Chip'
import { ToolPill } from '@/components/ui/ToolPill'

interface WhatIsUserResearchProps {
  className?: string
}

export function WhatIsUserResearch({ className }: WhatIsUserResearchProps) {
  return (
    <div className={className}>
      {/* H1: What is user research? */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 2 · IA & Flows · Stage 1: User Research
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          What is user research?
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          User research replaces assumptions with evidence so design and engineering build the right thing.
        </p>
      </div>

      {/* Why it matters - Feature card with gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4 leading-relaxed">
              Why it matters
            </h3>
            <ul className="space-y-2 text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              <li>• Builds empathy and shared language around user goals and constraints.</li>
              <li>• Surfaces hidden friction before expensive design/dev cycles.</li>
              <li>• Creates a &ldquo;source of truth&rdquo; that aligns stakeholders and speeds decisions.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What I do */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          What I do
        </h3>
        <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>• Clarify the decision we&apos;re trying to make and the risks of guessing.</li>
          <li>• Draft a lightweight research plan (objectives, participants, methods, success signals).</li>
          <li>• Recruit a representative slice of users/customers; schedule and consent.</li>
          <li>• Run sessions (scripted but flexible); capture notes and recordings.</li>
        </ul>
      </div>

      {/* Deliverables */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Deliverables
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Chip variant="production" size="sm">
              Research plan + screener
            </Chip>
          </div>
          <div className="flex items-center space-x-3">
            <Chip variant="production" size="sm">
              Interview script(s)
            </Chip>
          </div>
          <div className="flex items-center space-x-3">
            <Chip variant="production" size="sm">
              Note pack + recordings
            </Chip>
          </div>
          <div className="flex items-center space-x-3">
            <Chip variant="production" size="sm">
              Quick-read summary of key insights
            </Chip>
          </div>
        </div>
      </div>

      {/* Signals of success */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Signals of success
        </h3>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>• Team can state the top 3 user goals and top 3 frictions in the same words.</li>
          <li>• Clear hypotheses to validate next (and what we&apos;ll stop debating).</li>
        </ul>
      </div>

      {/* Tools */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          <ToolPill>Figma/FigJam</ToolPill>
          <ToolPill>Typeform</ToolPill>
          <ToolPill>Google Forms</ToolPill>
          <ToolPill>UserInterviews</ToolPill>
          <ToolPill>Calendly</ToolPill>
          <ToolPill>Notion/Obsidian</ToolPill>
          <ToolPill>Loom</ToolPill>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-zinc-900 dark:text-white">
              See this approach in action
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Check out case studies where user research informed product decisions
            </p>
          </div>
          <a
            href="/work/overview?skills=User%20Research"
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
          >
            View projects →
          </a>
        </div>
      </div>
    </div>
  )
}