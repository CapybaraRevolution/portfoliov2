'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/20/solid'
import { GridPattern } from '@/components/GridPattern'
import { AIBadge } from '@/components/ui/AIBadge'
import { NavigationChip } from '@/components/NavigationChip'
import { type Project } from '@/data/projects'

interface RefactoredProjectCardProps {
  project: Project
}

function ProjectCardPattern({
  mouseX,
  mouseY,
  ...gridProps
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  y: string | number
  squares: Array<[x: number, y: number]>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl mask-[linear-gradient(white,transparent)] transition duration-300 group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/2 stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

export function RefactoredProjectCard({ project }: RefactoredProjectCardProps) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const pattern = { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }

  return (
    <Link href={project.href} className="group">
      <div
        onMouseMove={onMouseMove}
        className="relative flex flex-col overflow-hidden rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5 cursor-pointer"
      >
      <ProjectCardPattern {...pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-zinc-900/7.5 ring-inset group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {project.title}
          </h3>
          <span className={`inline-flex items-center gap-x-1.5 px-2 py-1 rounded-md text-xs font-medium ${
            project.status === 'ongoing' 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
          }`}>
            <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-1.5 ${
              project.status === 'ongoing' 
                ? 'fill-emerald-500 animate-pulse' 
                : 'fill-zinc-400'
            }`}>
              <circle r={3} cx={3} cy={3} />
            </svg>
            {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
          </span>
        </div>
      </div>

      {/* Body Section 1 - Description */}
      <div className="relative px-6 pb-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Divider */}
      <div className="relative mx-6 h-px bg-zinc-900/7.5 dark:bg-white/10" />

      {/* Body Section 2 - Project Meta */}
      <div className="relative p-6 pb-4">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Project Details</h4>
        <div className="space-y-2">
          {project.client && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <BriefcaseIcon className="h-4 w-4" />
              <span className="font-medium">Client:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{project.client}</span>
            </div>
          )}
          {project.timeline && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CalendarIcon className="h-4 w-4" />
              <span className="font-medium">Timeline:</span>
              <span>{project.timeline}</span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="relative mx-6 h-px bg-zinc-900/7.5 dark:bg-white/10" />

      {/* Body Section 3 - Skills */}
      <div className="relative p-6 pb-4">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Skills & Approach</h4>
        <div className="flex flex-wrap gap-2">
          {(project.skills || []).slice(0, 6).map((skill, index) => (
            <NavigationChip
              key={`${project.id || 'project'}-skill-${skill}-${index}`}
              skill={skill}
              size="sm"
            />
          ))}
          {(project.skills || []).length > 6 && (
            <span className="inline-flex items-center px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              +{(project.skills || []).length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Badges Section */}
      {project.ai && (
        <>
          <div className="relative mx-6 h-px bg-zinc-900/7.5 dark:bg-white/10" />
          <div className="relative p-6 pb-4">
            <div className="flex items-center gap-2">
              <AIBadge size="sm" />
            </div>
          </div>
        </>
      )}


      {/* Footer - Utility Zone */}
      <div className="relative mt-auto bg-zinc-100/50 dark:bg-zinc-800/50 p-6 border-t border-zinc-900/7.5 dark:border-white/10">
        <div className="flex justify-center">
          <span className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors">
            View case study →
          </span>
        </div>
      </div>
    </div>
    </Link>
  )
}