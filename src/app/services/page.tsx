'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { RaycastFigureCard } from '@/components/RaycastInspiredGallery'
import { FilterChip } from '@/components/FilterChip'
import { RefactoredProjectCard } from '@/components/RefactoredProjectCard'
import { AccordionPanel } from '@/components/AccordionPanel'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { trackEvent } from '@/components/GoogleAnalytics'
import {
  ChartBarIcon,
  PaintBrushIcon,
  BeakerIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

// Offers data
const offers = [
  {
    id: 'clarity-sprint',
    title: 'Clarity Sprint',
    duration: '1–2 weeks',
    whoItsFor: 'When requirements are messy and teams need alignment fast',
    outcomes: [
      'Shared understanding of the problem and constraints',
      'Prioritized roadmap slice with clear tradeoffs',
      'Decision-ready readout with next steps and owners',
    ],
    included: [
      'Stakeholder interviews and alignment workshops',
      'Quick prototype or flow maps to test assumptions',
      'Executive readout with go/no-go recommendation',
    ],
    exampleServices: ['Product Vision', 'Stakeholder Alignment', 'Roadmap'],
    icon: BeakerIcon,
  },
  {
    id: 'ux-blueprint',
    title: 'UX Blueprint',
    duration: '2–4 weeks',
    whoItsFor: 'When UX or information architecture needs improvement',
    outcomes: [
      'Clear user flows and information architecture',
      'Testable prototype covering core paths',
      'Design handoff ready for engineering',
    ],
    included: [
      'User research and usability testing',
      'Wireframes and interactive prototypes',
      'Design system tokens for consistent implementation',
    ],
    exampleServices: ['Information Architecture', 'Wireframing', 'Prototyping', 'Usability Testing'],
    icon: PaintBrushIcon,
  },
  {
    id: 'product-partner',
    title: 'Product Partner',
    duration: 'Ongoing',
    whoItsFor: 'When you need ongoing external product leadership',
    outcomes: [
      'Continuous product momentum without losing clarity',
      'Fast feedback on roadmaps, flows, and experiments',
      'Strategic guidance aligned with business goals',
    ],
    included: [
      'Weekly or bi-weekly product leadership cadence',
      'Rapid prototyping and validation support',
      'Strategic roadmap and prioritization guidance',
    ],
    exampleServices: ['Product Vision', 'Roadmap', 'Prioritization', 'Stakeholder Alignment'],
    icon: UserGroupIcon,
  },
]

// Deliverables data
const deliverables = [
  {
    id: 'product-narrative',
    title: 'Decision-ready product narrative',
    description: 'A clear story that aligns leadership and teams around what to build and why.',
    details: 'Includes problem framing, success metrics, constraints, and strategic tradeoffs that help stakeholders make confident decisions.',
  },
  {
    id: 'roadmap-slice',
    title: 'Roadmap slice + tradeoffs',
    description: 'Prioritized features with clear impact vs. effort analysis.',
    details: 'Shows what to build now, what to defer, and why—with explicit tradeoffs documented so teams stay aligned on priorities.',
  },
  {
    id: 'clickable-prototype',
    title: 'Clickable prototype',
    description: 'Test risk early with interactive flows covering core paths and edge cases.',
    details: 'Validates assumptions with real users before committing engineering resources. Includes usability findings and recommended fixes.',
  },
  {
    id: 'requirements-ac',
    title: 'Requirements + acceptance criteria',
    description: 'Specs that remove ambiguity and unblock engineering delivery.',
    details: 'Clear functional requirements, edge cases, system constraints, and testable acceptance criteria that engineering can execute against.',
  },
  {
    id: 'decision-log',
    title: 'Lightweight decision log',
    description: 'Track key decisions and their rationale so teams stay aligned.',
    details: 'Documents why choices were made, what alternatives were considered, and who owns each decision—preventing re-litigation later.',
  },
]

// Chip taxonomy (buyer + skill language)
const chipFilters = [
  'Requirements Clarity',
  'Rapid Prototyping',
  'Roadmapping',
  'Stakeholder Alignment',
  'Product Vision',
  'UX & IA',
]

// Process steps
const processSteps = [
  {
    title: 'Frame',
    description: 'Clarify the problem, constraints, and success metrics with stakeholders.',
  },
  {
    title: 'Align',
    description: 'Surface decision points and get buy-in on what matters most.',
  },
  {
    title: 'Explore',
    description: 'Map flows, options, and tradeoffs visually so teams can evaluate paths.',
  },
  {
    title: 'Prototype',
    description: 'Test the riskiest assumptions with a clickable prototype or research.',
  },
  {
    title: 'Define',
    description: 'Document requirements and acceptance criteria engineering can execute.',
  },
  {
    title: 'Support delivery',
    description: 'Handoff with clarity and stay available for iteration as needed.',
  },
]

// Engagement models for accordion
const engagementModels = [
  {
    title: 'Sprint — 1–2 weeks to align and decide',
    content: (
      <div className="space-y-3">
        <p>
          <strong className="text-zinc-900 dark:text-white">Best for:</strong> Teams that need fast alignment on a specific problem or feature.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-white">Deliverables:</strong> Alignment map, quick prototype, decision-ready readout with go/no-go recommendation.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-white">Format:</strong> Focused workshops and async collaboration with a final presentation.
        </p>
      </div>
    ),
  },
  {
    title: 'Project — 2–8 weeks for end-to-end execution',
    content: (
      <div className="space-y-3">
        <p>
          <strong className="text-zinc-900 dark:text-white">Best for:</strong> Teams ready to ship a feature or product improvement with full UX and requirements.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-white">Deliverables:</strong> Research, prototypes, design specs, PRDs, and build-ready acceptance criteria.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-white">Format:</strong> Dedicated project timeline with milestones, check-ins, and handoff support.
        </p>
      </div>
    ),
  },
  {
    title: 'Advisory — Ongoing product leadership',
    content: (
      <div className="space-y-3">
        <p>
          <strong className="text-zinc-900 dark:text-white">Best for:</strong> Founders and heads of product who need external product leadership on demand.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-white">Deliverables:</strong> Strategic guidance, rapid prototyping, roadmap reviews, and team facilitation as needed.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-white">Format:</strong> Weekly or bi-weekly cadence with async support between sessions.
        </p>
      </div>
    ),
  },
]

export default function ServicesPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const allCaseStudies = getAllCaseStudies()

  // Filter case studies based on active chips
  const filteredCaseStudies = activeFilters.length === 0
    ? allCaseStudies.slice(0, 3) // Default: show first 3 (Breeze, Healthcare, Boveda)
    : allCaseStudies.filter(study =>
        activeFilters.some(filter => study.services.includes(filter))
      )

  const toggleFilter = (filter: string) => {
    const isActivating = !activeFilters.includes(filter)
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
    
    // Track chip clicks
    trackEvent('services_chip_clicked', {
      chip_label: filter,
      action: isActivating ? 'activate' : 'deactivate',
      active_filters_count: isActivating ? activeFilters.length + 1 : activeFilters.length - 1,
    })
  }

  const handlePrimaryCTA = (location: string) => {
    trackEvent('services_primary_cta_clicked', {
      cta_location: location,
      cta_text: 'Get in touch',
    })
  }

  const handleSecondaryCTA = (location: string) => {
    trackEvent('services_secondary_cta_clicked', {
      cta_location: location,
      cta_text: 'View case studies',
    })
  }

  const handleOfferCTA = (offerTitle: string) => {
    trackEvent('services_offer_cta_clicked', {
      offer_name: offerTitle,
    })
  }

  const handleProofCardClick = (studyTitle: string) => {
    trackEvent('services_proof_card_clicked', {
      case_study: studyTitle,
      active_filters: activeFilters.join(', '),
    })
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="not-prose py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-900/5 bg-white/80 shadow-xl ring-1 ring-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/50 dark:ring-white/5">
            {/* Soft aura */}
            <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-br from-emerald-200/25 via-white/10 to-sky-200/25 blur-3xl dark:from-emerald-500/15 dark:via-emerald-900/10 dark:to-sky-500/15" aria-hidden="true" />
            {/* Subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(16,185,129,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.12) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-emerald-100/30 dark:from-emerald-500/10 dark:via-transparent dark:to-emerald-400/5" />
            <Image
              src="/images/samples/wireframes/Annotated-Wireframe_Hero.png"
              alt="Annotated wireframe showing structured UX planning"
              width={4752}
              height={2016}
              className="h-full w-full object-cover"
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>

          <div className="mt-12 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Services
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Turn unclear requirements into a clear, testable plan.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">
              I help <strong>founders</strong> and <strong>heads of product</strong> align fast, reduce decision churn, and ship confidently—through product strategy, UX, and rapid prototyping.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                href="/contact" 
                arrow="right"
                onClick={() => handlePrimaryCTA('hero')}
              >
                Get in touch
              </Button>
              <Button 
                href="/work/overview" 
                variant="secondary" 
                arrow="right"
                onClick={() => handleSecondaryCTA('hero')}
              >
                View case studies
              </Button>
            </div>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Prefer email? The form works great—or book time if you'd rather talk live.
            </p>
          </div>
        </div>
      </section>

      {/* FIG_01 - How I create clarity */}
      <section className="not-prose mx-auto mt-12 max-w-5xl px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Clarity → Alignment → Delightful UX
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300">
            Most teams don't need more ideas—they need a shared plan they can test and build.
          </p>
        </div>
        <RaycastFigureCard
          figureId="systems-audit"
          eyebrow="FIG_01"
          title="How I create clarity"
          description="Align goals and constraints, shape flows and prototypes, then deliver requirements engineering can execute."
        />
      </section>

      {/* Deliverables - What you'll walk away with */}
      <section className="not-prose mx-auto my-16 max-w-6xl px-6 lg:px-8 sm:my-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Deliverables
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            What you'll walk away with
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            Every engagement delivers tangible artifacts that move your team from ambiguity to action.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((deliverable) => (
            <div
              key={deliverable.id}
              className="group flex flex-col rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm transition duration-200 hover:border-emerald-200 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-emerald-500/40"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {deliverable.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {deliverable.description}
              </p>
              {/* Placeholder for future drawer implementation */}
              {deliverable.details && (
                <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500 italic border-t border-zinc-200 dark:border-zinc-700 pt-4">
                  {deliverable.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Offers - 3 packages */}
      <section className="not-prose mx-auto my-16 max-w-6xl px-6 lg:px-8 sm:my-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Offers
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Make hiring me feel simple
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            Three structured ways to work together—choose the one that fits where you are now.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group flex h-full flex-col rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-emerald-500/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                  <offer.icon aria-hidden="true" className="size-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  {offer.duration}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-white">
                {offer.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {offer.whoItsFor}
              </p>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Outcomes
                </p>
                <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {offer.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2">
                      <span aria-hidden="true" className="text-emerald-500 dark:text-emerald-300">
                        •
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  What's included
                </p>
                <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {offer.included.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-emerald-500 dark:text-emerald-300">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-900/5 dark:border-white/10">
                <div className="flex flex-col gap-3">
                  <Button 
                    href="/contact" 
                    variant="outline" 
                    arrow="right" 
                    className="w-full justify-center"
                    onClick={() => handleOfferCTA(offer.title)}
                  >
                    Get in touch
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proof - Show me you've done this */}
      <section className="not-prose mx-auto my-16 max-w-6xl px-6 lg:px-8 sm:my-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Proof
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Show me you've done this
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            Filter by the challenges you're facing to see relevant case studies.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap gap-3">
          {chipFilters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              active={activeFilters.includes(filter)}
              onClick={() => toggleFilter(filter)}
            />
          ))}
        </div>

        {/* Case study cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {filteredCaseStudies.length > 0 ? (
            filteredCaseStudies.slice(0, 6).map((study) => (
              <div 
                key={study.slug}
                onClick={() => handleProofCardClick(study.title)}
              >
                <RefactoredProjectCard
                  project={{
                    id: study.slug,
                    title: study.title,
                    description: study.description,
                    href: `/case-studies/${study.slug}`,
                    client: study.client,
                    timeline: study.timeline,
                    status: study.status === 'Ongoing' ? 'ongoing' : 'completed',
                    skills: study.services,
                    ai: study.aiAccelerated,
                  }}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">
                No case studies match the selected filters. Try different criteria.
              </p>
            </div>
          )}
        </div>

        {filteredCaseStudies.length > 6 && (
          <div className="mt-8 text-center">
            <Button 
              href="/work/overview" 
              variant="secondary" 
              arrow="right"
              onClick={() => handleSecondaryCTA('proof-section')}
            >
              View all case studies
            </Button>
          </div>
        )}
      </section>

      {/* Process - Clarity first, then momentum */}
      <section className="not-prose mx-auto my-16 max-w-6xl px-6 lg:px-8 sm:my-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Clarity first, then momentum
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            A structured approach that keeps everyone aligned around the same story.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-zinc-900/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900/60"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to work together (quiet section) */}
      <section className="not-prose mx-auto my-16 max-w-4xl px-6 lg:px-8 sm:my-20">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Ways to work together
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Choose the engagement model that fits your timeline and team needs.
          </p>
        </div>

        <AccordionPanel items={engagementModels} />
      </section>

      {/* Final CTA */}
      <section className="not-prose mx-auto my-16 max-w-5xl px-6 text-center lg:px-8 sm:my-20">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Ready to bring clarity to your roadmap?
        </h2>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
          Tell me where you're stuck—alignment, research, prototyping, or requirements—and we'll design the smallest step that unlocks your next decision.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button 
            href="/contact" 
            arrow="right"
            onClick={() => handlePrimaryCTA('final-cta')}
          >
            Get in touch
          </Button>
          <Button 
            href="/work/overview" 
            variant="secondary" 
            arrow="right"
            onClick={() => handleSecondaryCTA('final-cta')}
          >
            View case studies
          </Button>
        </div>
      </section>
    </div>
  )
}

