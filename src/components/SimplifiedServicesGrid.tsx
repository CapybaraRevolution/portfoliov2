'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { NavigationChip } from '@/components/NavigationChip'
import { generateProcessUrl } from '@/data/skillProcessMap'
import { Button } from '@/components/Button'
import { ContactDrawer } from '@/components/ContactDrawer'
import { cn } from '@/lib/utils'

const services = [
  {
    id: 'strategic-product-planning',
    name: 'Strategic Product Planning',
    description:
      'Turn messy problem spaces into a decision-ready roadmap that everyone can stand behind.',
    processHref: generateProcessUrl('feature-prioritization'),
    ctaHref: '/contact',
    ctaLabel: 'Schedule a roadmap call',
    engagement: 'Project or Advisory',
    icon: ChartBarIcon,
    deliverables: [
      'Impact vs. effort portfolio with clear bets',
      'Roadmap narrative that aligns leadership',
      'Experiment plan to derisk assumptions',
      'Stakeholder playback with next steps',
    ],
    idealFor: [
      'Founders/team leads who need buy-in for the next quarter',
      'Teams juggling competing priorities and scope creep',
    ],
    skills: ['Product Vision', 'Roadmap', 'Prioritization', 'OKRs'],
  },
  {
    id: 'user-research-strategy',
    name: 'User Research & Strategy',
    description:
      'Get crisp evidence fast—so you ship what customers actually need, not what the room prefers.',
    processHref: generateProcessUrl('user-research'),
    ctaHref: '/contact',
    ctaLabel: 'Plan a research sprint',
    engagement: 'Workshop or Sprint',
    icon: MagnifyingGlassIcon,
    deliverables: [
      'Interview synthesis and behavioral patterns',
      'Jobs-to-be-done map and opportunity backlog',
      'Testable hypotheses with success metrics',
      'Executive-friendly readout for quick decisions',
    ],
    idealFor: [
      'Teams validating a new bet before build',
      'Product orgs needing customer signals to re-focus',
    ],
    skills: ['User Research', 'Usability Testing', 'Product Analytics', 'Experimentation'],
  },
  {
    id: 'design-prototyping',
    name: 'Design & Prototyping',
    description:
      'Make the complex feel simple with flows, IA, and prototypes that people can test—before you commit code.',
    processHref: generateProcessUrl('wireframing'),
    ctaHref: '/contact',
    ctaLabel: 'Review a prototype',
    engagement: 'Sprint',
    icon: PaintBrushIcon,
    deliverables: [
      'User flows and information architecture',
      'Clickable prototype covering core paths and edge states',
      'Lean design system/tokens for consistent handoff',
      'Usability findings with fixes prioritized',
    ],
    idealFor: [
      'Teams needing a testable concept to unlock funding or build',
      'Products with cluttered UX that need simplification',
    ],
    skills: ['Wireframing', 'Prototyping', 'Information Architecture', 'Usability Testing'],
  },
  {
    id: 'requirements-analysis',
    name: 'Requirements Analysis',
    description:
      'Bridge business goals and engineering reality with specs that remove ambiguity and unblock delivery.',
    processHref: generateProcessUrl('information-architecture'),
    ctaHref: '/contact',
    ctaLabel: 'Scope a build',
    engagement: 'Project',
    icon: DocumentTextIcon,
    deliverables: [
      'PRD/spec with flows, edge cases, and constraints',
      'Systems + integration map for the build team',
      'Acceptance criteria and test plan',
      'Aligned kickoff with risks and owners called out',
    ],
    idealFor: [
      'PMs/engineering leads needing clarity before sprinting',
      'Cross-functional teams with complex integrations',
    ],
    skills: ['PRDs (Specs)', 'System Design', 'APIs & Integrations', 'Stakeholder Alignment'],
  },
]

function ServiceCard({ service }: { service: typeof services[number] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on interactive elements inside expanded content
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('button:not([data-card-toggle])')) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group flex flex-col rounded-2xl border border-zinc-900/5 bg-white/80 p-6 shadow-sm transition-all duration-300 cursor-pointer dark:border-white/10 dark:bg-zinc-900/60",
        isExpanded 
          ? "hover:border-emerald-200 dark:hover:border-emerald-500/40" 
          : "hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:hover:border-emerald-500/40"
      )}
    >
      {/* Always visible: Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
          <service.icon aria-hidden="true" className="size-6" />
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
          {service.engagement}
        </span>
      </div>

      {/* Always visible: Title and description */}
      <div className="mt-6 space-y-3">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {service.name}
        </h3>
        <p className="text-base text-zinc-600 dark:text-zinc-400">{service.description}</p>
      </div>

      {/* Always visible: Skills chips (condensed) */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {service.skills.slice(0, 3).map((skill) => (
          <NavigationChip key={skill} skill={skill} size="sm" />
        ))}
        {service.skills.length > 3 && !isExpanded && (
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            +{service.skills.length - 3}
          </span>
        )}
      </div>

      {/* Expand/Collapse indicator */}
      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        <span>{isExpanded ? 'Show less' : 'Show details'}</span>
        <ChevronDownIcon 
          className={cn(
            "size-4 transition-transform duration-200",
            isExpanded && "rotate-180"
          )} 
        />
      </div>

      {/* Expandable content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                What you get
              </p>
              <ul className="mt-2 space-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-emerald-500 dark:text-emerald-300">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Ideal for
              </p>
              <ul className="mt-2 space-y-2">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-emerald-500 dark:text-emerald-300">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Show all skills when expanded */}
          {service.skills.length > 3 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.skills.slice(3).map((skill) => (
                <NavigationChip key={skill} skill={skill} size="sm" />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 border-t border-zinc-900/5 pt-6 dark:border-white/10">
            <div className="flex flex-wrap gap-3">
              {service.ctaHref === '/contact' ? (
                <ContactDrawer>
                  <Button variant="outline" arrow="right">
                    {service.ctaLabel}
                  </Button>
                </ContactDrawer>
              ) : (
                <Button href={service.ctaHref} variant="outline" arrow="right">
                  {service.ctaLabel}
                </Button>
              )}
              <Button href={service.processHref} variant="text" arrow="right">
                How this fits into my process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimplifiedServicesGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Services
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Make the complex feel simple—and testable.
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
            I blend UX, product strategy, and systems thinking to create clarity fast. Every service
            ships with evidence, alignment, and a clear next move so teams can make confident
            decisions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:mt-16 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
