'use client'

export function RoadmapPanel() {
  return (
    <div className="max-w-2xl">
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800">
        {/* Icon */}
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
            Coming Next: Roadmap & Alignment
          </h2>
          <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
            Visual roadmap components and alignment checklist tools are in development. This panel will include timeline views, stakeholder alignment matrices, and dependency tracking.
          </p>
          
          {/* Feature Preview */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
              Planned Features:
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Interactive timeline visualization
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Stakeholder alignment checklist
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Dependency mapping tools
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Resource allocation views
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}