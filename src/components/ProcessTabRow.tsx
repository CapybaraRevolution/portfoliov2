'use client'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface ProcessTab {
  name: string
  current: boolean
}

interface ProcessTabRowProps {
  tabs: ProcessTab[]
  onTabChange: (tabName: string) => void
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function ProcessTabRow({ tabs, onTabChange }: ProcessTabRowProps) {
  const currentTab = tabs.find((tab) => tab.current)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTabChange(event.target.value)
  }

  const handleTabClick = (tabName: string) => {
    onTabChange(tabName)
  }

  const handleKeyDown = (event: React.KeyboardEvent, tabName: string, index: number) => {
    const currentTabIndex = tabs.findIndex(tab => tab.current)
    let nextTabIndex = currentTabIndex

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        nextTabIndex = currentTabIndex > 0 ? currentTabIndex - 1 : tabs.length - 1
        onTabChange(tabs[nextTabIndex].name)
        break
      case 'ArrowRight':
        event.preventDefault()
        nextTabIndex = currentTabIndex < tabs.length - 1 ? currentTabIndex + 1 : 0
        onTabChange(tabs[nextTabIndex].name)
        break
      case 'Home':
        event.preventDefault()
        onTabChange(tabs[0].name)
        break
      case 'End':
        event.preventDefault()
        onTabChange(tabs[tabs.length - 1].name)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        onTabChange(tabName)
        break
    }
  }

  return (
    <div>
      {/* Mobile dropdown */}
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab?.name}
          onChange={handleSelectChange}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white dark:bg-zinc-800 py-2 pr-8 pl-3 text-base text-zinc-900 dark:text-white outline-1 -outline-offset-1 outline-zinc-300 dark:outline-zinc-600 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 dark:focus:outline-emerald-400"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-zinc-500 dark:fill-zinc-400"
        />
      </div>
      
      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <nav aria-label="Process step tabs" className="flex space-x-4" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              onKeyDown={(e) => handleKeyDown(e, tab.name, index)}
              role="tab"
              aria-selected={tab.current}
              aria-current={tab.current ? 'page' : undefined}
              tabIndex={tab.current ? 0 : -1}
              className={classNames(
                tab.current 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' 
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300',
                'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-800',
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}