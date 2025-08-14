'use client'

import { useState, useEffect } from 'react'
import { ComponentDrawer } from '@/components/ComponentDrawer'
import { WhatIsUserResearch } from '@/app/process/(components)/drawers/WhatIsUserResearch'
import { WhyResearchFirst } from '@/app/process/(components)/drawers/WhyResearchFirst'
import { ChooseRightMethod } from '@/app/process/(components)/drawers/ChooseRightMethod'

interface UserResearchStep {
  id: string
  name: string
  href: string
  status: string
}

const userResearchSteps: UserResearchStep[] = [
  {
    id: '01',
    name: 'What is user research?',
    href: '#',
    status: 'complete'
  },
  {
    id: '02', 
    name: 'Why research first?',
    href: '#',
    status: 'current'
  },
  {
    id: '03',
    name: 'Choose the right method', 
    href: '#',
    status: 'upcoming'
  }
]


export function IAFlowsPanel() {
  const [currentStep, setCurrentStep] = useState('01')
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

  const handleStepClick = async (stepId: string) => {
    if (stepId === currentStep) return
    
    setIsAnimating(true)
    
    // Cards slide out animation
    await new Promise(resolve => setTimeout(resolve, 200))
    
    setCurrentStep(stepId)
    
    // Cards slide in animation with stagger
    setTimeout(() => setIsAnimating(false), 100)
  }

  // Calculate step status based on current selection
  const getStepStatus = (stepId: string) => {
    if (stepId === currentStep) return 'current'
    if (stepId < currentStep) return 'complete'
    return 'upcoming'
  }
  
  // Function to handle opening drawer
  const handleProjectClick = (project: any) => {
    setSelectedDeployment(project)
    setDrawerOpen(true)
  }

  // Project data that changes based on step
  const projectsByStep = {
    '01': [
      {
        id: 1,
        name: 'What is user research?',
        href: '#',
        status: 'Complete',
        createdBy: 'Kyle McGraw',
        dueDate: 'March 17, 2023',
        dueDateTime: '2023-03-17T00:00Z',
        description: 'Evidence over guesses—understand how real people perceive, navigate, and use your product.',
        drawerComponent: WhatIsUserResearch,
        itemId: 'user-research-what'
      }
    ],
    '02': [
      {
        id: 2,
        name: 'Why research first?',
        href: '#',
        status: 'In progress',
        createdBy: 'Kyle McGraw',
        dueDate: 'April 5, 2023',
        dueDateTime: '2023-04-05T00:00Z',
        description: 'Research reduces rework, de-risks the roadmap, and reveals the 20% of fixes that unlock 80% of value.',
        drawerComponent: WhyResearchFirst,
        itemId: 'user-research-why'
      }
    ],
    '03': [
      {
        id: 3,
        name: 'Choose the right method',
        href: '#',
        status: 'In progress',
        createdBy: 'UX Researcher',
        dueDate: 'April 15, 2023',
        dueDateTime: '2023-04-15T00:00Z',
        description: 'Pick interviews, surveys, or usability tests based on the decision you need to make.',
        drawerComponent: ChooseRightMethod,
        itemId: 'user-research-method'
      }
    ]
  }

  const currentProjects = projectsByStep[currentStep as keyof typeof projectsByStep] || []
  
  return (
    <div className="space-y-0">
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Stage 1: User Research
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Evidence-based foundations for design decisions
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-900 dark:text-white">3 approaches</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Production ready</p>
          </div>
        </div>
      </div>
      
      
      {/* Progress Stepper */}
      <div className="px-6 py-6 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
        <nav aria-label="Progress">
          <ol role="list" className="divide-y divide-zinc-200 dark:divide-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-700 md:flex md:divide-y-0">
            {userResearchSteps.map((step, stepIdx) => {
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
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-blue-600 dark:text-blue-400">{step.name}</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStepClick(step.id)}
                      className="group flex w-full items-center px-6 py-4 text-sm font-medium transition-colors"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600 group-hover:border-white dark:group-hover:border-zinc-300 group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                        <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">{step.name}</span>
                    </button>
                  )}

                  {stepIdx !== userResearchSteps.length - 1 ? (
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

      {/* Project List */}
      <div className="relative overflow-hidden">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {currentProjects.map((project, index) => (
          <div 
            key={project.id} 
            className={`px-6 py-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-all duration-500 ease-out group ${
              isAnimating || !isLoaded
                ? 'transform translate-y-12 opacity-0' 
                : 'transform translate-y-0 opacity-100'
            }`}
            style={{
              transitionDelay: isAnimating || !isLoaded ? '0ms' : `${index * 75}ms`
            }}
            onClick={() => handleProjectClick(project)}
          >
            <div className="flex items-center justify-between gap-x-6">
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <p className="text-base font-semibold text-zinc-900 dark:text-white">{project.name}</p>
                  {project.status === 'In progress' ? (
                    <span className="inline-flex items-center rounded-md bg-amber-100 dark:bg-amber-900/20 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20 dark:ring-amber-400/20">
                      {project.status}
                    </span>
                  ) : null}
                  {project.status === 'Complete' ? (
                    <span className="inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 dark:ring-emerald-400/20">
                      {project.status}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 flex items-center gap-x-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>{project.description}</p>
                </div>
                <div className="mt-1 flex items-center gap-x-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>Due on <time dateTime={project.dueDateTime}>{project.dueDate}</time></p>
                  <span className="text-zinc-400">•</span>
                  <p>Created by {project.createdBy}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-3 py-1.5 text-sm font-semibold text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                  View project
                </button>
                <svg className="size-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      
      {/* ComponentDrawer */}
      <ComponentDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={selectedDeployment?.name || 'Project Details'}
        enableComments={true}
        itemId={selectedDeployment?.itemId}
      >
        {selectedDeployment?.drawerComponent && (
          <selectedDeployment.drawerComponent />
        )}
      </ComponentDrawer>
    </div>
  )
}