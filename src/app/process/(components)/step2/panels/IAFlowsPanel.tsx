'use client'

import { Chip } from '@/components/ui/Chip'
import { FlowRow } from '../types'

// Sample data for the flow table
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

// Placeholder stepper component
function FlowStepper() {
  const steps = [
    { id: 'landing', label: 'Landing' },
    { id: 'signup', label: 'Sign up' },
    { id: 'login', label: 'Log in' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'product', label: 'Product' }
  ]

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-4">
        User Flow Progress
      </h3>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-600 dark:border-emerald-400 flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {index + 1}
                </span>
              </div>
              <span className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-0.5 bg-emerald-200 dark:bg-emerald-700 mx-2 mt-[-16px]" />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
        Kyle's stepper component will replace this placeholder
      </p>
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
          <Chip variant="filled" size="sm" category="Design">Entry</Chip>
          <Chip variant="outline" size="sm" category="Research">Friction</Chip>
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

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Step
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Primary Goal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Key Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Edge Cases / Risks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Instrumentation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {flowData.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Chip variant="filled" size="sm" category="Design" className="capitalize">
                      {row.id}
                    </Chip>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-900 dark:text-white font-medium">
                      {row.primaryGoal}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {row.actions.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {row.risks || '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {row.events.map((event) => (
                        <Chip key={event} variant="outline" size="sm">
                          {event}
                        </Chip>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
                        View sample
                      </button>
                      <button 
                        onClick={() => handleCopyEvents(row.events)}
                        className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        title="Copy events"
                      >
                        Copy
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-700">
          {flowData.map((row) => (
            <div key={row.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Chip variant="filled" size="sm" category="Design" className="capitalize">
                  {row.id}
                </Chip>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    View sample
                  </button>
                  <button 
                    onClick={() => handleCopyEvents(row.events)}
                    className="text-xs text-zinc-500"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Primary Goal
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900 dark:text-white">
                    {row.primaryGoal}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Key Actions
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {row.actions.join(', ')}
                  </dd>
                </div>
                
                {row.risks && (
                  <div>
                    <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Edge Cases / Risks
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {row.risks}
                    </dd>
                  </div>
                )}
                
                <div>
                  <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Instrumentation
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1">
                    {row.events.map((event) => (
                      <Chip key={event} variant="outline" size="sm">
                        {event}
                      </Chip>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}