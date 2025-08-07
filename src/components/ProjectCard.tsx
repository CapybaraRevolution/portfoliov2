import Link from 'next/link'
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
  'Business Analysis': {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
    ring: 'ring-orange-600/20 dark:ring-orange-400/30'
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const colors = categoryColors[project.category]

  return (
    <li className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-900/5 dark:border-zinc-100/5 bg-zinc-50 dark:bg-zinc-800/50 p-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white truncate">
            {project.title}
          </h3>
          {project.client && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {project.client}
            </p>
          )}
        </div>
        
        {/* AI Badge */}
        {project.ai && (
          <div className="ml-3 flex-shrink-0">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-400/30">
              AI-Accelerated
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Description */}
        <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">
          {project.description}
        </p>

        {/* Category and Timeline */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colors.bg} ${colors.text} ${colors.ring}`}>
              {project.category}
            </span>
            {project.timeline && (
              <span className="text-zinc-500 dark:text-zinc-400">
                {project.timeline}
              </span>
            )}
          </div>
          <div className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            project.status === 'ongoing' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-400/30'
              : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/10 dark:ring-zinc-400/20'
          }`}>
            {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
            Skills
          </h4>
          <div className="flex flex-wrap gap-1">
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
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Link
            href={project.href}
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            View Case Study
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </li>
  )
}