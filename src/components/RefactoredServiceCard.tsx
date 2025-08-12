'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { GridPattern } from '@/components/GridPattern'
import { ToolChip } from '@/components/ToolChip'
import { Chip } from '@/components/ui/Chip'
import { NavigationChip } from '@/components/NavigationChip'
import { type Service } from '@/data/services'
import { getToolsForService } from '@/lib/toolsConfig'

interface RefactoredServiceCardProps {
  service: Service
}

function ServiceCardPattern({
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

function CategoryTag({ category }: { category: Service['category'] }) {
  return (
    <Chip
      variant="filled"
      size="sm"
      category={category}
    >
      {category}
    </Chip>
  )
}

export function RefactoredServiceCard({ service }: RefactoredServiceCardProps) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)
  const [isExpanded, setIsExpanded] = useState(false)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const serviceTools = getToolsForService(service.id)
  const pattern = { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ServiceCardPattern {...pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-zinc-900/7.5 ring-inset group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {service.title}
          </h3>
          <CategoryTag category={service.category} />
        </div>
      </div>

      {/* Body Section 1 - Blurb */}
      <div className="relative px-6 pb-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {service.blurb}
        </p>
      </div>

      {/* Divider */}
      <div className="relative mx-6 h-px bg-zinc-900/7.5 dark:bg-white/10" />

      {/* Body Section 2 - Tools */}
      <div className="relative p-6 pb-4">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Tools</h4>
        <div className="flex flex-wrap gap-2">
          {serviceTools.map((tool) => (
            <ToolChip key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative mx-6 h-px bg-zinc-900/7.5 dark:bg-white/10" />

      {/* Body Section 3 - Related Skills */}
      <div className="relative p-6 pb-4">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Related skills</h4>
        <div className="flex flex-wrap gap-2">
          {service.relatedSkills.map((skill) => (
            <NavigationChip
              key={skill.label}
              skill={skill.label}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Accordion for expanded details */}
      {service.expandedDetails && (
        <>
          <div className="relative mx-6 h-px bg-zinc-900/7.5 dark:bg-white/10" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative flex items-center justify-between p-6 pb-4 w-full text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-expanded={isExpanded}
          >
            <span className="text-sm font-medium text-zinc-900 dark:text-white">
              Details
            </span>
            <ChevronDownIcon 
              className={`w-4 h-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isExpanded && (
            <div className="relative px-6 pb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.expandedDetails}
              </p>
            </div>
          )}
        </>
      )}

      {/* Footer - Utility Zone */}
      <div className="relative mt-auto bg-zinc-100/50 dark:bg-zinc-800/50 p-6 border-t border-zinc-900/7.5 dark:border-white/10">
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={service.processLink}
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            How this fits into my process →
          </a>
          <a
            href={service.portfolioLink}
            className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            See projects with this service →
          </a>
        </div>
      </div>
    </div>
  )
}