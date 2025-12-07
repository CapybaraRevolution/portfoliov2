interface PreviewProps {
  className?: string
}

export function RICETablePreview({ className = "" }: PreviewProps) {
  return (
    <div className={`bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 ${className}`}>
      <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">RICE Scoring Matrix</div>
      <div className="space-y-2">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-500 pb-1 border-b border-zinc-200 dark:border-zinc-700">
          <div>Feature</div>
          <div>R</div>
          <div>I</div>
          <div>C</div>
          <div>Score</div>
        </div>
        {/* Sample rows */}
        <div className="grid grid-cols-5 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
          <div>Mobile checkout</div>
          <div className="text-emerald-600 dark:text-emerald-400">8k</div>
          <div className="text-emerald-600 dark:text-emerald-400">3</div>
          <div className="text-emerald-600 dark:text-emerald-400">80%</div>
          <div className="font-medium">64</div>
        </div>
        <div className="grid grid-cols-5 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
          <div>Payment icons</div>
          <div className="text-emerald-600 dark:text-emerald-400">8k</div>
          <div className="text-emerald-600 dark:text-emerald-400">2</div>
          <div className="text-emerald-600 dark:text-emerald-400">90%</div>
          <div className="font-medium">144</div>
        </div>
        <div className="grid grid-cols-5 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div>Guest checkout</div>
          <div>3k</div>
          <div>4</div>
          <div>70%</div>
          <div className="font-medium">21</div>
        </div>
      </div>
    </div>
  )
}

export function FlowDiagramPreview({ className = "" }: PreviewProps) {
  return (
    <div className={`bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 ${className}`}>
      <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">User Flow Example</div>
      <div className="flex items-center justify-center space-x-2">
        {/* Flow steps */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-6 bg-emerald-200 dark:bg-emerald-800 rounded text-xs flex items-center justify-center font-medium text-emerald-800 dark:text-emerald-200">
            H
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Home</div>
        </div>
        
        <svg className="w-3 h-3 text-zinc-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-6 bg-blue-200 dark:bg-blue-800 rounded text-xs flex items-center justify-center font-medium text-blue-800 dark:text-blue-200">
            B
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Browse</div>
        </div>
        
        <svg className="w-3 h-3 text-zinc-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-6 bg-purple-200 dark:bg-purple-800 rounded text-xs flex items-center justify-center font-medium text-purple-800 dark:text-purple-200">
            P
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Product</div>
        </div>
        
        <svg className="w-3 h-3 text-zinc-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        
        <div className="flex flex-col items-center">
          <div className="w-8 h-6 bg-orange-200 dark:bg-orange-800 rounded text-xs flex items-center justify-center font-medium text-orange-800 dark:text-orange-200">
            C
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Cart</div>
        </div>
      </div>
      
      {/* Entry points indicator */}
      <div className="mt-3 flex items-center justify-center">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
        <span className="text-xs text-zinc-500 dark:text-zinc-500">Entry point</span>
        <div className="w-2 h-2 bg-red-400 rounded-full ml-4 mr-2"></div>
        <span className="text-xs text-zinc-500 dark:text-zinc-500">Friction</span>
      </div>
    </div>
  )
}

export function MilestoneStripPreview({ className = "" }: PreviewProps) {
  return (
    <div className={`bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 ${className}`}>
      <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">Release Timeline</div>
      <div className="flex items-center justify-between">
        {/* Milestones */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-emerald-700 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              M1
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">MVP</div>
          </div>
          
          {/* Timeline line */}
          <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-600 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              M2
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Polish</div>
          </div>
          
          <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-600"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              M3
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Scale</div>
          </div>
        </div>
      </div>
      
      {/* Risk indicator */}
      <div className="mt-3 flex items-center">
        <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
        <span className="text-xs text-amber-600 dark:text-amber-400">Dependency risk</span>
      </div>
    </div>
  )
}