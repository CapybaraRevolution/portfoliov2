'use client'

import { useState } from 'react'

interface PMTask {
  task: string
  pr: string
  status: 'Completed' | 'In QA' | 'Error'
  duration: string
}

interface PMDashboardProps {
  className?: string
}

const pmTabs = [
  { name: 'Daily Design QA', current: true },
  { name: 'Sprint Demo', current: false },
  { name: 'Bug-Smash Friday', current: false },
]

const pmStats = [
  { name: 'Design QA pass rate', value: '96%' },
  { name: 'Avg tickets closed per sprint', value: '38' },
  { name: 'Figma → Prod parity score', value: '98%' },
]

const pmTasks: PMTask[] = [
  {
    task: 'Create Onboarding Flow',
    pr: 'PR #234',
    status: 'Completed',
    duration: '2h ago',
  },
  {
    task: 'Refactor Button Tokens',
    pr: 'PR #235', 
    status: 'In QA',
    duration: '45m ago',
  },
  {
    task: 'Fix Modal Focus Trap',
    pr: 'PR #236',
    status: 'Error',
    duration: '1d ago',
  },
  {
    task: 'Design System Documentation',
    pr: 'PR #237',
    status: 'Completed',
    duration: '3h ago',
  },
  {
    task: 'Mobile Navigation Polish',
    pr: 'PR #238',
    status: 'In QA',
    duration: '1d ago',
  },
]

const statuses = { 
  Completed: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-400/10',
  'In QA': 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-400/10',
  Error: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-400/10'
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function PMDashboard({ className }: PMDashboardProps) {
  const [activeTab, setActiveTab] = useState(pmTabs[0].name)

  return (
    <div className={classNames('bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800', className || '')}>
      {/* Secondary navigation */}
      <nav className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-700 py-4">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-zinc-600 dark:text-zinc-400 sm:px-6"
        >
          {pmTabs.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveTab(item.name)}
                className={classNames(
                  'transition-colors duration-200',
                  activeTab === item.name 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'hover:text-zinc-900 dark:hover:text-zinc-100'
                )}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Heading */}
      <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <div className="flex items-center gap-x-3">
            <div className="flex-none rounded-full bg-emerald-400/10 p-1 text-emerald-500 dark:text-emerald-400">
              <div className="size-2 rounded-full bg-current" />
            </div>
            <h1 className="flex gap-x-3 text-base/7">
              <span className="font-semibold text-zinc-900 dark:text-white">Implementation Support</span>
            </h1>
          </div>
          <p className="mt-2 text-xs/6 text-zinc-500 dark:text-zinc-400">Design isn&apos;t done at hand-off</p>
        </div>
        <div className="order-first flex-none rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30 ring-inset sm:order-0">
          Active Sprint
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 border-t border-zinc-200 dark:border-zinc-700 sm:grid-cols-3">
        {pmStats.map((stat, statIdx) => (
          <div
            key={stat.name}
            className={classNames(
              statIdx % 2 === 1 ? 'sm:border-l' : '',
              'border-t border-zinc-200 dark:border-zinc-700 px-4 py-6 sm:px-6 first:border-t-0',
            )}
          >
            <p className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{stat.value}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Task list */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
        <h2 className="px-4 text-base/7 font-semibold text-zinc-900 dark:text-white sm:px-6">Latest tasks</h2>
        <div className="mt-4 overflow-hidden">
          <table className="w-full text-left">
            <colgroup>
              <col className="w-full sm:w-4/12" />
              <col className="lg:w-3/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-3/12" />
            </colgroup>
            <thead className="border-b border-zinc-200 dark:border-zinc-700 text-sm/6 text-zinc-900 dark:text-white">
              <tr>
                <th scope="col" className="py-2 pr-8 pl-4 font-semibold sm:pl-6">
                  Task
                </th>
                <th scope="col" className="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell">
                  Commit/PR
                </th>
                <th scope="col" className="py-2 pr-4 pl-0 font-semibold">
                  Status
                </th>
                <th scope="col" className="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {pmTasks.map((task, taskIdx) => (
                <tr 
                  key={taskIdx} 
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="py-4 pr-8 pl-4 sm:pl-6">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm text-zinc-900 dark:text-white">{task.task}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
                    <div className="font-mono text-sm text-zinc-500 dark:text-zinc-400">{task.pr}</div>
                  </td>
                  <td className="py-4 pr-4 pl-0 text-sm">
                    <div className="flex items-center gap-x-2">
                      <div className={classNames(statuses[task.status], 'flex-none rounded-full p-1')}>
                        <div className="size-1.5 rounded-full bg-current" />
                      </div>
                      <div className="text-zinc-900 dark:text-white">{task.status}</div>
                    </div>
                  </td>
                  <td className="hidden py-4 pr-4 pl-0 text-right text-sm text-zinc-500 dark:text-zinc-400 sm:table-cell sm:pr-6">
                    {task.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}