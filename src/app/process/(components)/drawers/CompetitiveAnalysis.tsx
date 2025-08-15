'use client'

import { ToolPill } from '@/components/ui/ToolPill'
import { ScrollableTable } from '@/components/ui/ScrollableTable'

interface CompetitiveAnalysisProps {
  className?: string
}

export function CompetitiveAnalysis({ className }: CompetitiveAnalysisProps) {
  return (
    <div className={className}>
      {/* H1: Competitive Analysis */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 1 · Discovery & Strategy
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Competitive Analysis
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          One-liner: Reach parity where it’s table‑stakes — and differentiate where it matters.
        </p>
      </div>

      {/* Why it matters - Normal paragraph block */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Why it matters
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Customers judge us against what they already use. Per Jakob’s Law, users spend most of their time on other products and expect familiar patterns here. Let’s meet expectations where it’s standard, and invest in differentiation where it moves outcomes.
        </p>
        <a
          href="https://www.nngroup.com/videos/jakobs-law-internet-ux/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline"
        >
          Jakob’s Law on NN/g
        </a>
      </div>

      {/* What I do */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          What I do
        </h2>
        <ul className="space-y-3 pl-6">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Research 5–8 relevant competitors/analogs (same segment + a few inspirational adjacents).</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Heuristic evaluation of onboarding, IA/navigation, search, checkout/flows, and empty/error states.</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Feature gap analysis: Where our product is behind, at parity, or ahead (note impact/effort).</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Screenshot teardowns of good patterns + cautionary examples with commentary.</span>
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
            <span className="text-zinc-700 dark:text-zinc-300">Competitive report summarizing parity gaps, UX patterns, and quick wins.</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Annotated screen library (key flows with pros/cons notes).</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Opportunity list: quick wins, medium bets, and “prove it” ideas.</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Measurement & research plan: what to instrument and how we’ll validate impact.</span>
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
            <span className="text-zinc-700 dark:text-zinc-300">Shared understanding of table‑stakes for MVP/next release.</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Prioritized opportunity list with owners and success criteria.</span>
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-zinc-700 dark:text-zinc-300">Instrumentation plan merged into analytics backlog (events & dashboards defined).</span>
          </li>
        </ul>
      </div>

      {/* Tools - using ToolPill components */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            Heuristic checklists
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            PageSpeed/Lighthouse
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            Wayback Machine
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            Screenshots/recorders
          </span>
        </div>
      </div>

      {/* Sample - Comparison table and differentiator ideas */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Sample
        </h2>
        
        {/* Comparison table */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 mb-6">
          <ScrollableTable>
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Feature / Pattern</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Competitor A</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Competitor B</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Us</th>
                  <th className="text-left py-2 text-zinc-900 dark:text-white font-medium">Notes / Next Step</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="py-3 text-zinc-700 dark:text-zinc-300">Single sign-on (SSO)</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                  <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                  <td className="py-3 text-zinc-700 dark:text-zinc-300">P0 parity target</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="py-3 text-zinc-700 dark:text-zinc-300">Real-time collab</td>
                  <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                  <td className="py-3 text-red-600 dark:text-red-400">❌</td>
                  <td className="py-3 text-zinc-700 dark:text-zinc-300">P2 differentiator</td>
                </tr>
                <tr>
                  <td className="py-3 text-zinc-700 dark:text-zinc-300">API webhooks</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">✅</td>
                  <td className="py-3 text-zinc-700 dark:text-zinc-300">Done – document</td>
                </tr>
              </tbody>
            </table>
          </ScrollableTable>
        </div>

        {/* Differentiator ideas */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
            Differentiator ideas
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Progressive disclosure of advanced features to reduce cognitive load</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Context-aware onboarding that adapts to user role and use case</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Proactive error prevention with inline validation and smart defaults</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Related - CTA row */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Related
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/work/overview?skills=Competitive%20Analysis"
            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            Open case study →
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