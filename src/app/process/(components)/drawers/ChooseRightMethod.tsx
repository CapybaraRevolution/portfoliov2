'use client'

import { Chip } from '@/components/ui/Chip'
import { ToolPill } from '@/components/ui/ToolPill'

interface ChooseRightMethodProps {
  className?: string
}

export function ChooseRightMethod({ className }: ChooseRightMethodProps) {
  return (
    <div className={className}>
      {/* H1: Choose the right method */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 2 · IA & Flows · Stage 1: User Research
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Choose the right method
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Match the method to the decision, not the fashion.
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
            <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
              The wrong method produces confident-sounding noise. The right one answers the question you actually have.
            </p>
          </div>
        </div>
      </div>

      {/* Method chooser */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Method chooser (quick map)
        </h3>
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div>
                <p className="text-zinc-900 dark:text-white font-medium">Understand why people behave a certain way</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Semi-structured interviews (5–7)</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-zinc-900 dark:text-white font-medium">Measure how many share a behavior/attitude</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Survey with clean branching</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-zinc-900 dark:text-white font-medium">Verify can they do it</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ Task-based usability test with success criteria</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-zinc-900 dark:text-white font-medium">Compare alternatives</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">→ A/B or multivariate once you have traffic + events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What I do */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          What I do
        </h3>
        <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>• Draft scripts and pilots to remove bias.</li>
          <li>• Recruit ethically and representatively; incentive appropriately.</li>
          <li>• Run and record; timestamp notable moments for fast synthesis later.</li>
        </ul>
      </div>

      {/* Deliverables */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Deliverables
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Chip variant="outline" size="sm">
              Method + sample size rationale
            </Chip>
          </div>
          <div className="flex items-center space-x-3">
            <Chip variant="outline" size="sm">
              Scripts / tasks
            </Chip>
          </div>
          <div className="flex items-center space-x-3">
            <Chip variant="outline" size="sm">
              Scheduling + consent kit
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
          <li>• Stakeholders agree on the method before any sessions run.</li>
          <li>• Sessions yield usable quotes, clips, and task metrics (not just opinions).</li>
        </ul>
      </div>

      {/* Tools */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          <ToolPill>UserInterviews</ToolPill>
          <ToolPill>Typeform</ToolPill>
          <ToolPill>Google Forms</ToolPill>
          <ToolPill>Maze</ToolPill>
          <ToolPill>Useberry</ToolPill>
          <ToolPill>Zoom</ToolPill>
          <ToolPill>Loom</ToolPill>
          <ToolPill>FigJam</ToolPill>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-zinc-900 dark:text-white">
              See method selection in practice
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Explore how different research methods answer different questions
            </p>
          </div>
          <a
            href="/work/overview?skills=UX%20Research"
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
          >
            View research →
          </a>
        </div>
      </div>
    </div>
  )
}