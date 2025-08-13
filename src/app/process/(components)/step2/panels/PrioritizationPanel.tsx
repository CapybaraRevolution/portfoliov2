'use client'

// Placeholder for Kyle's Home screen component
function HomeScreenDemo() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 h-96 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mx-auto flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
          Prioritization Interface
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
          Kyle&apos;s dashboard interface will be integrated here
        </p>
      </div>
    </div>
  )
}

export function PrioritizationPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Copy */}
      <div className="space-y-8">
        {/* What it is */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What it is
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            A scoring framework that helps teams prioritize features and improvements based on user impact, business value, and implementation effort. We use data-driven criteria to rank opportunities and build consensus around what to build next.
          </p>
        </div>

        {/* Why it matters */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Why it matters
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            Without clear prioritization, teams waste time building features that don&apos;t move key metrics. A systematic approach ensures we&apos;re always working on the highest-value opportunities and can defend our roadmap decisions with data.
          </p>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              <strong>Impact:</strong> Teams with clear prioritization frameworks ship 2.3x more successful features than those without.
            </p>
          </div>
        </div>

        {/* What I do */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            What I do
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Establish scoring criteria that align with business goals and user needs</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Facilitate scoring sessions with cross-functional stakeholders</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Create visual dashboards for ongoing priority management</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-zinc-700 dark:text-zinc-300">Build consensus through data-driven ranking discussions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column - Demo Interface */}
      <div className="lg:sticky lg:top-8">
        <HomeScreenDemo />
        <div className="mt-4 flex gap-3">
          <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
            View details →
          </button>
          <button className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            Sample scoring rubric
          </button>
        </div>
      </div>
    </div>
  )
}