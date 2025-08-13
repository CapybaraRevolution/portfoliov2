'use client'

import { Chip } from '@/components/ui/Chip'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, CheckIcon } from '@heroicons/react/20/solid'
import { FlowRow } from '../types'

// Sample data adapted for the flow table
const flowData: FlowRow[] = [
  {
    id: 'landing',
    primaryGoal: 'Capture interest and drive sign-ups',
    actions: ['View hero', 'Read benefits', 'Click CTA'],
    risks: 'High bounce rate, unclear value prop',
    events: ['page_view', 'hero_impression', 'cta_click', 'signup_start']
  },
  {
    id: 'signup',
    primaryGoal: 'Complete account creation',
    actions: ['Fill form', 'Verify email', 'Set password'],
    risks: 'Form abandonment, email deliverability',
    events: ['form_start', 'field_error', 'email_verify', 'account_created']
  },
  {
    id: 'login',
    primaryGoal: 'Authenticate returning users',
    actions: ['Enter credentials', 'Remember device', 'Access account'],
    risks: 'Forgotten passwords, security concerns',
    events: ['login_attempt', 'password_reset', 'auth_success', 'remember_device']
  },
  {
    id: 'onboarding',
    primaryGoal: 'Set up user preferences and first project',
    actions: ['Complete profile', 'Choose plan', 'Create first item'],
    risks: 'Overwhelming options, early churn',
    events: ['onboard_start', 'profile_complete', 'plan_selected', 'first_action']
  },
  {
    id: 'product',
    primaryGoal: 'Achieve core user value and engagement',
    actions: ['Use main features', 'Invite teammates', 'Upgrade plan'],
    risks: 'Feature confusion, low adoption',
    events: ['feature_used', 'team_invite', 'upgrade_click', 'retention_milestone']
  }
]

// Stepper steps adapted for user flow
const steps = [
  { id: '01', name: 'Landing', href: '#', status: 'complete' },
  { id: '02', name: 'Sign up', href: '#', status: 'current' },
  { id: '03', name: 'Login', href: '#', status: 'upcoming' },
  { id: '04', name: 'Onboarding', href: '#', status: 'upcoming' },
  { id: '05', name: 'Product', href: '#', status: 'upcoming' },
]

// User Flow Stepper Component
function FlowStepper() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-4">
        User Flow Progress
      </h3>
      <nav aria-label="Progress">
        <ol role="list" className="divide-y divide-zinc-200 dark:divide-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-700 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === 'complete' ? (
                <div className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 dark:bg-emerald-500">
                      <CheckIcon aria-hidden="true" className="size-6 text-white" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-zinc-900 dark:text-white">{step.name}</span>
                  </span>
                </div>
              ) : step.status === 'current' ? (
                <div aria-current="step" className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-emerald-600 dark:border-emerald-400">
                    <span className="text-emerald-600 dark:text-emerald-400">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">{step.name}</span>
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600">
                      <span className="text-zinc-500 dark:text-zinc-400">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">{step.name}</span>
                  </span>
                </div>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
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
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}


export function IAFlowsPanel() {
  const handleCopyEvents = (events: string[]) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(events.join(', '))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Legend:</span>
          <Chip variant="filled" size="sm" category="UX">Entry</Chip>
          <Chip variant="outline" size="sm" category="BA">Friction</Chip>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Mapping critical touchpoints and measurement opportunities
        </p>
      </div>

      {/* Stepper */}
      <FlowStepper />

      {/* Flow Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            User Flow Breakdown
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Each step mapped with goals, actions, risks, and instrumentation
          </p>
        </div>

        {/* Flow List */}
        <ul role="list" className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {flowData.map((flow) => (
            <li key={flow.id} className="flex items-center justify-between gap-x-6 py-5 px-6">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <Chip variant="filled" size="sm" category="UX" className="capitalize mt-0.5">
                    {flow.id}
                  </Chip>
                  <div className="min-w-0">
                    <p className="text-sm/6 font-semibold text-zinc-900 dark:text-white">{flow.primaryGoal}</p>
                    <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-zinc-600 dark:text-zinc-400">
                      <p className="whitespace-nowrap">
                        Actions: {flow.actions.join(', ')}
                      </p>
                      {flow.risks && (
                        <>
                          <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                            <circle r={1} cx={1} cy={1} />
                          </svg>
                          <p className="truncate">Risks: {flow.risks}</p>
                        </>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {flow.events.map((event) => (
                        <Chip key={event} variant="outline" size="sm">
                          {event}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button
                  onClick={() => handleCopyEvents(flow.events)}
                  className="hidden rounded-md bg-zinc-100 dark:bg-zinc-700 px-2.5 py-1.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 sm:block"
                >
                  Copy events<span className="sr-only">, {flow.id}</span>
                </button>
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="relative block text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-2 shadow-lg ring-1 ring-zinc-900/5 dark:ring-zinc-100/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <button className="block px-3 py-1 text-sm/6 text-zinc-900 dark:text-white data-focus:bg-zinc-50 dark:data-focus:bg-zinc-700 w-full text-left">
                        View sample<span className="sr-only">, {flow.id}</span>
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button 
                        onClick={() => handleCopyEvents(flow.events)}
                        className="block px-3 py-1 text-sm/6 text-zinc-900 dark:text-white data-focus:bg-zinc-50 dark:data-focus:bg-zinc-700 w-full text-left"
                      >
                        Copy events<span className="sr-only">, {flow.id}</span>
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button className="block px-3 py-1 text-sm/6 text-zinc-900 dark:text-white data-focus:bg-zinc-50 dark:data-focus:bg-zinc-700 w-full text-left">
                        Edit flow<span className="sr-only">, {flow.id}</span>
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}