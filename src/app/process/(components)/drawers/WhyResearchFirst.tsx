'use client'

import { Chip } from '@/components/ui/Chip'
import { ToolPill } from '@/components/ui/ToolPill'

interface WhyResearchFirstProps {
  className?: string
}

export function WhyResearchFirst({ className }: WhyResearchFirstProps) {
  return (
    <div className={className}>
      {/* H1: Why research first? */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 2 · IA & Flows · Stage 1: User Research
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Why research first?
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Research is the cheapest way to avoid building the wrong thing.
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
              <li>• <strong>Cuts rework:</strong> finding problems on paper or in a prototype is orders of magnitude cheaper than after code ships.</li>
              <li>• <strong>Focuses effort:</strong> clarifies the few moments that drive outcomes (activation, conversion, retention).</li>
              <li>• <strong>De-risks bets:</strong> decisions reference evidence, not the loudest opinion; stakeholder alignment improves.</li>
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
          <li>• Map risks/opportunities from Step 1 (Stakeholders, Competitive, Systems).</li>
          <li>• Tie research questions to business outcomes (e.g., &ldquo;What blocks activation?&rdquo;).</li>
          <li>• Instrument the minimum events needed to measure impact in Step 5.</li>
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
              Risk-to-research matrix (question → method → expected decision)
            </Chip>
          </div>
          <div className="flex items-center space-x-3">
            <Chip variant="production" size="sm">
              &ldquo;If we learn X, we&apos;ll do Y&rdquo; decision table
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
          <li>• Fewer &ldquo;unknowns&rdquo; entering sprint planning.</li>
          <li>• A small set of decisions unblocked (with owners and timelines).</li>
        </ul>
      </div>

      {/* Tools */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          <ToolPill>Notion/Confluence</ToolPill>
          <ToolPill>Figma</ToolPill>
          <ToolPill>Amplitude/GA4</ToolPill>
          <ToolPill>Loom</ToolPill>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-zinc-900 dark:text-white">
              See strategic research planning
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              View how research informs product strategy and reduces risk
            </p>
          </div>
          <a
            href="/work/overview?skills=Product%20Strategy"
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
          >
            View projects →
          </a>
        </div>
      </div>
    </div>
  )
}