import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { NavigationChip } from '@/components/NavigationChip'
import { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

const categoryColors = {
  'UX': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-300',
    ring: 'ring-blue-600/20 dark:ring-blue-400/30'
  },
  'Strategy': {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-300',
    ring: 'ring-purple-600/20 dark:ring-purple-400/30'
  },
  'PM': {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    ring: 'ring-emerald-600/20 dark:ring-emerald-400/30'
  },
  'BA': {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
    ring: 'ring-orange-600/20 dark:ring-orange-400/30'
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const colors = categoryColors[project.category]

  return (
    <li className="relative rounded-xl outline outline-zinc-200 dark:outline-zinc-700 hover:outline-zinc-300 dark:hover:outline-zinc-600 transition-colors">
      {/* Header - similar to client card header */}
      <div className="flex items-center gap-x-4 border-b border-zinc-900/5 dark:border-zinc-100/5 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-t-xl">
        <div className="text-sm/6 font-medium text-zinc-900 dark:text-white flex-1">
          {project.title}
        </div>
        
        {/* AI Badge */}
        {project.ai && (
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-400/30">
            AI-Accelerated
          </div>
        )}
        
        {/* Menu */}
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="relative block text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400">
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-2 shadow-lg outline outline-1 outline-zinc-900/5 dark:outline-white/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <Link
                href={project.href}
                className="block px-3 py-1 text-sm/6 text-zinc-900 dark:text-zinc-100 data-focus:bg-zinc-50 dark:data-focus:bg-zinc-700 data-focus:outline-hidden"
              >
                View Case Study<span className="sr-only">, {project.title}</span>
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      
      {/* Content - using definition list structure */}
      <dl className="-my-3 divide-y divide-zinc-100 dark:divide-zinc-700 px-6 py-4 text-sm/6 rounded-b-xl bg-white dark:bg-zinc-900">
        {/* Client */}
        {project.client && (
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-zinc-500 dark:text-zinc-400">Client</dt>
            <dd className="text-zinc-700 dark:text-zinc-300 font-medium">
              {project.client}
            </dd>
          </div>
        )}
        
        {/* Category */}
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
          <dd className="flex items-start gap-x-2">
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colors.bg} ${colors.text} ${colors.ring}`}>
              {project.category}
            </span>
          </dd>
        </div>
        
        {/* Timeline & Status combined */}
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-zinc-500 dark:text-zinc-400">Timeline</dt>
          <dd className="flex items-center gap-x-2">
            {project.timeline && (
              <span className="text-zinc-700 dark:text-zinc-300">
                {project.timeline}
              </span>
            )}
            <span className={`inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              project.status === 'ongoing' 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-blue-600/20 dark:ring-blue-400/30'
                : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 ring-emerald-600/20 dark:ring-emerald-400/30'
            }`}>
              {project.status === 'ongoing' ? (
                <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-blue-500 animate-pulse">
                  <circle r={3} cx={3} cy={3} />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-emerald-500">
                  <path d="M10.28 2.28a.75.75 0 0 0-1.06-1.06L4.5 5.94 2.78 4.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25Z" />
                </svg>
              )}
              {project.status === 'ongoing' ? 'Ongoing' : 'Complete'}
            </span>
          </dd>
        </div>
        
        {/* Description */}
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-zinc-500 dark:text-zinc-400">About</dt>
          <dd className="text-zinc-700 dark:text-zinc-300 max-w-md text-right">
            {project.description}
          </dd>
        </div>
        
        {/* Skills */}
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-zinc-500 dark:text-zinc-400">Skills</dt>
          <dd className="flex flex-wrap justify-end gap-1 max-w-md">
            {project.skills.slice(0, 4).map((skill) => (
              <NavigationChip
                key={skill}
                skill={skill}
                size="sm"
              />
            ))}
            {project.skills.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                +{project.skills.length - 4} more
              </span>
            )}
          </dd>
        </div>
      </dl>
    </li>
  )
}