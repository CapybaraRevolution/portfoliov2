'use client'

import { Chip } from '@/components/ui/Chip'
import { ToolPill } from '@/components/ui/ToolPill'

interface StakeholderAlignmentProps {
  className?: string
}

export function StakeholderAlignment({ className }: StakeholderAlignmentProps) {
  return (
    <div className={className}>
      {/* H1: Stakeholder Alignment */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 1 · Discovery & Strategy
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Stakeholder Alignment
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Align goals, measures, and decision paths so delivery moves faster.
        </p>
      </div>

      {/* Why it matters - Feature card with gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Bold statement */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-3">
                Great products die from misalignment, not bad ideas.
              </h3>
              <p className="text-emerald-800 dark:text-emerald-200">
                Alignment creates a shared definition of &quot;done,&quot; success measures, and decision velocity.
              </p>
            </div>
            
            {/* Right: Small stat list */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-emerald-800 dark:text-emerald-200 font-medium">Fewer blocked tickets</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-emerald-800 dark:text-emerald-200 font-medium">Faster approvals in early sprints</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-emerald-800 dark:text-emerald-200 font-medium">Decisions referenced instead of re-argued</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What I do */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          What I do
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">45–60-min workshops to surface goals, non-goals, constraints, assumptions</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Map decision-makers & influencers; capture RACI and escalation paths</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Define a north-star metric plus 2–3 guardrails</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Spin up a living decision log to avoid re-debates</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Timebox risks/unknowns into research spikes</span>
          </li>
        </ul>
      </div>

      {/* Outputs & artifacts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Outputs & artifacts
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Alignment brief (goals, non-goals, guardrails, risks/assumptions)</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">RACI + stakeholder map (tied to user-facing flow areas)</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Success measures & checkpoint cadence</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Kickoff deck (concise, reusable)</span>
          </li>
        </ul>
      </div>

      {/* Signals of success */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Signals of success
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Every stakeholder can state the same primary goal & metric</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Fewer blocked tickets; faster approvals in early sprints</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Decisions referenced instead of re-argued</span>
          </li>
        </ul>
      </div>

      {/* Sample - Two cards in responsive grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Sample
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A - Workshop agenda */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
              Workshop agenda (45–60 min)
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">1.</span>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Goals & Non-goals</span>
                  <span className="text-zinc-500 dark:text-zinc-400 ml-2">(15m)</span>
                </div>
              </div>
              <div className="flex">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">2.</span>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Success measures</span>
                  <span className="text-zinc-500 dark:text-zinc-400 ml-2">(15m)</span>
                </div>
              </div>
              <div className="flex">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">3.</span>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Constraints & assumptions</span>
                  <span className="text-zinc-500 dark:text-zinc-400 ml-2">(10m)</span>
                </div>
              </div>
              <div className="flex">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">4.</span>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">RACI mapping</span>
                  <span className="text-zinc-500 dark:text-zinc-400 ml-2">(10m)</span>
                </div>
              </div>
              <div className="flex">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm w-6 flex-shrink-0">5.</span>
                <div>
                  <span className="font-medium text-zinc-900 dark:text-white">Decision framework</span>
                  <span className="text-zinc-500 dark:text-zinc-400 ml-2">(5m)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card B - Sample output */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
              Sample output: Alignment brief (excerpt)
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Goal:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Increase checkout completion by 15% in Q2</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Non-goals:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Redesigning the entire cart experience</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">North-star metric:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Checkout completion rate</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Guardrails:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Don&apos;t break mobile performance; maintain accessibility</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Key assumption:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">Users abandon due to too many form fields</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Decision maker:</span>
                <span className="text-zinc-700 dark:text-zinc-300 ml-2">PM (final call), Eng Lead (feasibility), Designer (UX)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools - using ToolPill components */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <ToolPill slug="figma" name="FigJam/Miro" size="md" />
          <ToolPill slug="notion" name="Notion/Confluence" size="md" />
          <ToolPill slug="loom" name="Loom" size="md" />
        </div>
      </div>

      {/* Related - CTA row */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Related
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/work/overview?skills=Stakeholder%20Alignment"
            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            View case studies →
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium rounded-lg transition-colors"
          >
            Back to process overview ↑
          </button>
        </div>
      </div>
    </div>
  )
}