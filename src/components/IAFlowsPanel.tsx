'use client'

import { useState, useEffect } from 'react'
import { ComponentDrawer } from '@/components/ComponentDrawer'
import { TeamTag } from '@/components/ui/TeamTag'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { WhatIsUserResearch } from '@/app/process/(components)/drawers/WhatIsUserResearch'
import { WhyResearchFirst } from '@/app/process/(components)/drawers/WhyResearchFirst'
import { ChooseRightMethod } from '@/app/process/(components)/drawers/ChooseRightMethod'

// Placeholder drawer content for steps without implemented drawers
function PlaceholderDrawerContent({ title }: { title?: string }) {
  return (
    <div className="space-y-8">
      {/* H1 */}
      <div className="mb-6">
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          Step 2 · IA & Flows · Planning & Architecture
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          {title || 'Coming Soon'}
        </h1>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          Executive Summary
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          Content coming soon. This drawer will follow the same comprehensive format as our user research sections.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Detailed content for this section will be provided shortly.
            </p>
          </div>
        </div>
      </div>

      {/* What I do */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          What I do
        </h3>
        <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>• Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>• Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          <li>• Ut enim ad minim veniam, quis nostrud exercitation ullamco.</li>
        </ul>
      </div>

      {/* Deliverables */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Deliverables
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 ring-1 ring-inset ring-zinc-600/20 dark:ring-zinc-400/20">
              Deliverable placeholder
            </span>
          </div>
        </div>
      </div>

      {/* Signals of success */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Signals of success
        </h3>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>• Success metric placeholder.</li>
          <li>• Achievement indicator placeholder.</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-zinc-900 dark:text-white">
              Content coming soon
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Full content for this section will be added shortly
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

type IaStepType = 'user-research' | 'journey-mapping' | 'flow-design'

interface IaStep {
  id: IaStepType
  name: string
  href: string
  status: string
}

type Row = {
  id: string
  title: string
  subtitle: string
  dept: 'Product Team' | 'Design' | 'Engineering' | 'QA'
  status: 'Production' | 'Preview' | 'In Progress'
  priority: number
  drawerId: string
  drawerComponent?: React.ComponentType<any>
  itemId: string
}

const iaSteps: IaStep[] = [
  {
    id: 'user-research',
    name: 'User Research',
    href: '#',
    status: 'complete'
  },
  {
    id: 'journey-mapping', 
    name: 'Journey Mapping',
    href: '#',
    status: 'current'
  },
  {
    id: 'flow-design',
    name: 'Flow Design', 
    href: '#',
    status: 'upcoming'
  }
]

const rowsByStep: Record<IaStepType, Row[]> = {
  'user-research': [
    {
      id: 'ur-what',
      title: 'What is user research?',
      subtitle: 'Evidence over guesses—understand how real people perceive, navigate, and use your product.',
      dept: 'Product Team',
      status: 'Production',
      priority: 94,
      drawerId: 'ur-what',
      drawerComponent: WhatIsUserResearch,
      itemId: 'user-research-what'
    },
    {
      id: 'ur-why-first',
      title: 'Why research first?',
      subtitle: 'Research reduces rework, de-risks the roadmap, and reveals the 20% of fixes that unlock 80% of value.',
      dept: 'Product Team',
      status: 'Production',
      priority: 92,
      drawerId: 'ur-why-first',
      drawerComponent: WhyResearchFirst,
      itemId: 'user-research-why'
    },
    {
      id: 'ur-methods',
      title: 'Choose the right method',
      subtitle: 'Pick interviews, surveys, or usability tests based on the decision you need to make.',
      dept: 'Design',
      status: 'Preview',
      priority: 88,
      drawerId: 'ur-methods',
      drawerComponent: ChooseRightMethod,
      itemId: 'user-research-method'
    }
  ],
  'journey-mapping': [
    {
      id: 'jm-personas',
      title: 'Personas & contexts',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dept: 'Product Team',
      status: 'Production',
      priority: 85,
      drawerId: 'jm-personas',
      itemId: 'journey-mapping-personas'
    },
    {
      id: 'jm-journeys',
      title: 'Journeys & top frictions',
      subtitle: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dept: 'Design',
      status: 'Production',
      priority: 82,
      drawerId: 'jm-journeys',
      itemId: 'journey-mapping-journeys'
    },
    {
      id: 'jm-decisions',
      title: 'Turn signals into decisions',
      subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      dept: 'Product Team',
      status: 'Preview',
      priority: 79,
      drawerId: 'jm-decisions',
      itemId: 'journey-mapping-decisions'
    }
  ],
  'flow-design': [
    {
      id: 'fd-ia',
      title: 'Information architecture',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      dept: 'Design',
      status: 'In Progress',
      priority: 76,
      drawerId: 'fd-ia',
      itemId: 'flow-design-ia'
    },
    {
      id: 'fd-flows',
      title: 'User flow diagrams',
      subtitle: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dept: 'Design',
      status: 'In Progress',
      priority: 73,
      drawerId: 'fd-flows',
      itemId: 'flow-design-flows'
    },
    {
      id: 'fd-validation',
      title: 'Task flow validation',
      subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      dept: 'Design',
      status: 'Production',
      priority: 70,
      drawerId: 'fd-validation',
      itemId: 'flow-design-validation'
    }
  ]
}


export function IAFlowsPanel() {
  const [currentStep, setCurrentStep] = useState<IaStepType>('user-research')
  const [selectedDeployment, setSelectedDeployment] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)


  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(false)
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleStepClick = async (stepId: IaStepType) => {
    if (stepId === currentStep) return
    
    setIsAnimating(true)
    
    // Cards slide out animation
    await new Promise(resolve => setTimeout(resolve, 200))
    
    setCurrentStep(stepId)
    
    // Cards slide in animation with stagger
    setTimeout(() => setIsAnimating(false), 100)
  }

  // Calculate step status based on current selection
  const getStepStatus = (stepId: IaStepType) => {
    const stepOrder = ['user-research', 'journey-mapping', 'flow-design']
    const currentIndex = stepOrder.indexOf(currentStep)
    const stepIndex = stepOrder.indexOf(stepId)
    
    if (stepId === currentStep) return 'current'
    if (stepIndex < currentIndex) return 'complete'
    return 'upcoming'
  }
  
  // Function to handle opening drawer
  const handleRowClick = (row: Row) => {
    setSelectedDeployment(row)
    setDrawerOpen(true)
  }

  const currentRows = rowsByStep[currentStep] || []
  
  return (
    <div className="space-y-0">
      {/* Progress Stepper */}
      <div className="px-6 py-6 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
        <nav aria-label="Progress">
          <ol role="list" className="divide-y divide-zinc-200 dark:divide-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-700 md:flex md:divide-y-0">
            {iaSteps.map((step, stepIdx) => {
              const stepStatus = getStepStatus(step.id)
              return (
                <li key={step.name} className="relative md:flex md:flex-1">
                  {stepStatus === 'complete' ? (
                    <button 
                      onClick={() => handleStepClick(step.id)}
                      className="group flex w-full items-center transition-colors"
                    >
                      <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 dark:bg-emerald-400 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-300 transition-colors">
                          <svg className="size-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="ml-4 text-sm font-medium text-zinc-900 dark:text-white">{step.name}</span>
                      </span>
                    </button>
                  ) : stepStatus === 'current' ? (
                    <button 
                      onClick={() => handleStepClick(step.id)}
                      aria-current="step" 
                      className="flex w-full items-center px-6 py-4 text-sm font-medium transition-colors"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 dark:border-blue-400">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{stepIdx + 1}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-blue-600 dark:text-blue-400">{step.name}</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStepClick(step.id)}
                      className="group flex w-full items-center px-6 py-4 text-sm font-medium transition-colors"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600 group-hover:border-white dark:group-hover:border-zinc-300 group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                        <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">{stepIdx + 1}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">{step.name}</span>
                    </button>
                  )}

                  {stepIdx !== iaSteps.length - 1 ? (
                    <div aria-hidden="true" className="absolute top-0 right-0 hidden h-full w-5 md:block">
                      <svg fill="none" viewBox="0 0 22 80" preserveAspectRatio="none" className="size-full text-zinc-200 dark:text-zinc-700">
                        <path
                          d="M0 -2L20 40L0 82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      {/* Row List */}
      <div className="relative overflow-hidden">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {currentRows.map((row, index) => (
          <div 
            key={row.id} 
            className={`px-6 py-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-all duration-500 ease-out group ${
              isAnimating || !isLoaded
                ? 'transform translate-y-12 opacity-0' 
                : 'transform translate-y-0 opacity-100'
            }`}
            style={{
              transitionDelay: isAnimating || !isLoaded ? '0ms' : `${index * 75}ms`
            }}
            onClick={() => handleRowClick(row)}
          >
            <div className="flex-auto">
              <div className="flex items-center gap-x-3 mb-2">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{row.title}</h3>
                <div className="flex items-center gap-x-2">
                  <TeamTag team={row.dept} />
                  <StatusBadge status={row.status} />
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                {row.subtitle}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>

      
      {/* ComponentDrawer */}
      <ComponentDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={selectedDeployment?.title || 'Project Details'}
        enableComments={true}
        itemId={selectedDeployment?.itemId}
      >
        {selectedDeployment?.drawerComponent ? (
          <selectedDeployment.drawerComponent />
        ) : (
          <PlaceholderDrawerContent title={selectedDeployment?.title} />
        )}
      </ComponentDrawer>
    </div>
  )
}