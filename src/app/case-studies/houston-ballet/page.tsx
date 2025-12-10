import { CaseStudyViewer } from '@/components/CaseStudyViewer'
import { getCaseStudyBySlug } from '@/lib/caseStudies'
import { Heading } from '@/components/Heading'
import { QuoteBlock } from '@/components/case-studies/QuoteBlock'
import { SplitSection, OrbitContainer } from '@/components/case-studies/SplitSection'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { LearningCard } from '@/components/case-studies/LearningCard'
import { Tooltip } from '@/components/ui/tooltip-card'
import { Highlighter } from '@/components/ui/highlighter'
import { Ticket, ArrowLeftRight, CreditCard, Smartphone, QrCode, MapPin, Building2, Users, Calendar, Armchair } from 'lucide-react'
import PrototypeEmbed from '@/components/prototypes/houston-ballet/PrototypeEmbed'

export const metadata = {
  title: 'Houston Ballet - Case Study',
  description: 'Mobile ticketing experience for Houston Ballet patrons, from performance discovery to venue arrival.',
}

// Note: sections are defined here for reference but not exported
// (Layout only imports sections from .mdx files)
const pageSections = [
  { title: 'Context', id: 'context' },
  { title: 'The Work', id: 'the-work' },
  { title: 'Interactive Prototype', id: 'interactive-prototype' },
  { title: 'Outcomes', id: 'outcomes' },
  { title: 'Learnings', id: 'learnings' },
]

export default function HoustonBalletCaseStudy() {
  const caseStudy = getCaseStudyBySlug('houston-ballet')
  
  if (!caseStudy) {
    return <div>Case study not found</div>
  }

  const metrics = [
    {
      label: 'Screens Designed',
      value: 8,
      description: 'Complete flows from tickets to venue planning',
      highlight: true,
    },
    {
      label: 'Built In',
      value: 1,
      suffix: ' day',
      description: 'From concept to functional prototype',
      highlight: true,
    },
    {
      label: 'User Flows',
      value: 4,
      description: 'Ticket viewing, QR presentation, settings, venue info',
      highlight: true,
    }
  ]

  // Visual for the Context section - showing the relationship between patron journey touchpoints
  const contextVisual = (
    <OrbitContainer
      height="h-[320px]"
      center={
        <div className="flex size-14 items-center justify-center rounded-full bg-[#322F3C] text-white ring-2 shadow-lg" style={{ '--tw-ring-color': 'rgb(136, 130, 149 / 0.3)' } as React.CSSProperties}>
          <Ticket className="h-5 w-5" aria-label="Houston Ballet Tickets" />
        </div>
      }
    >
      {/* Outer orbit - patron journey stages */}
      <OrbitingCircles radius={120} duration={24} iconSize={44}>
        <div className="flex size-full items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-2 dark:bg-emerald-950 dark:text-emerald-200" style={{ '--tw-ring-color': 'rgb(209, 250, 229)' } as React.CSSProperties}>
          <CreditCard className="h-5 w-5" />
        </div>
        <div className="flex size-full items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-2 dark:bg-blue-950 dark:text-blue-200" style={{ '--tw-ring-color': 'rgb(219, 234, 254)' } as React.CSSProperties}>
          <QrCode className="h-5 w-5" />
        </div>
        <div className="flex size-full items-center justify-center rounded-full bg-purple-50 text-purple-700 ring-2 dark:bg-purple-950 dark:text-purple-200" style={{ '--tw-ring-color': 'rgb(243, 232, 255)' } as React.CSSProperties}>
          <MapPin className="h-5 w-5" />
        </div>
      </OrbitingCircles>

      {/* Inner orbit - supporting elements */}
      <OrbitingCircles radius={70} duration={16} reverse iconSize={36}>
        <div className="flex size-full items-center justify-center rounded-full bg-zinc-100 text-zinc-600 ring-2 dark:bg-zinc-800 dark:text-zinc-300" style={{ '--tw-ring-color': 'rgb(228, 228, 231)' } as React.CSSProperties}>
          <Calendar className="h-4 w-4" />
        </div>
        <div className="flex size-full items-center justify-center rounded-full bg-zinc-100 text-zinc-600 ring-2 dark:bg-zinc-800 dark:text-zinc-300" style={{ '--tw-ring-color': 'rgb(228, 228, 231)' } as React.CSSProperties}>
          <Armchair className="h-4 w-4" />
        </div>
      </OrbitingCircles>
    </OrbitContainer>
  )

  return (
    <CaseStudyViewer caseStudy={caseStudy} metrics={metrics}>
      
      {/* Context - with visual */}
      <SplitSection
        visual={contextVisual}
        align="center"
      >
        <Heading id="context" level={2} className="mt-0">Context</Heading>
        <p>
          Houston Ballet is a recurring client of <Tooltip containerClassName="inline" content="A technology consultancy I work with on ticketing and venue experience projects."><span className="font-bold">Jixaw Technologies</span></Tooltip>, 
          and I've been supporting their digital ticketing initiatives across multiple workstreams. The relationship 
          spans purchase flows, ticket management, and patron experience—touching everything from how someone buys 
          a ticket to how they get to their seat.
        </p>
        <p>
          This case study showcases one piece of that work: a mobile ticketing app concept that demonstrates the 
          end-to-end <Tooltip containerClassName="inline" content="The complete path a customer takes from discovering a performance through attending it—encompassing purchase, preparation, arrival, and post-event experience."><span className="font-bold">patron journey</span></Tooltip>. Rather than describe it, I built a functional prototype you can interact with below.
        </p>
      </SplitSection>

      {/* The Work */}
      <section className="mb-16">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <Heading id="the-work" level={2}>The Work</Heading>
          <p>
            My work with Houston Ballet through Jixaw has covered several interconnected areas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Purchase Paths */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-zinc-900 dark:text-white font-semibold">Purchase Paths</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <Tooltip containerClassName="inline" content="Low-fidelity page layouts that show structure and functionality without visual design—used to test concepts before committing to high-fidelity design."><span className="font-bold">Wireframes</span></Tooltip> and <Tooltip containerClassName="inline" content="Step-by-step paths users take to complete a task, mapping screens, decisions, and interactions from start to finish."><span className="font-bold">flow definitions</span></Tooltip> for ticket purchase journeys, from single tickets to <Tooltip containerClassName="inline" content="Multi-ticket packages offering season access or bundles—requiring different purchase logic than single-event tickets."><span className="font-bold">subscription packages</span></Tooltip>.
            </p>
          </div>

          {/* Return & Exchange */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <ArrowLeftRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-zinc-900 dark:text-white font-semibold">Return & Exchange</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Defining return, exchange, and swap flows for the ticketing system—reducing friction when plans change.
            </p>
          </div>

          {/* Dance Pass */}
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <Ticket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-zinc-900 dark:text-white font-semibold">Dance Pass</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Implementation support for Houston Ballet's Dance Pass subscription program.
            </p>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none mt-8">
          <p>
            The prototype below represents a different angle: the <Tooltip containerClassName="inline" content="The set of interactions and touchpoints that happen on performance day—finding tickets, presenting them for entry, and accessing venue information."><span className="font-bold">day-of experience</span></Tooltip>. What happens 
            after you've bought your ticket? How do you find it, present it, and navigate your visit?
          </p>
        </div>
      </section>

      {/* Quote */}
      <QuoteBlock className="my-16">
        The{' '}
        <Highlighter action="underline">
          best way
        </Highlighter>
        {' '}to demonstrate a mobile experience is to{' '}
        <Highlighter action="highlight">
          let people use it
        </Highlighter>
        .
      </QuoteBlock>

      {/* Interactive Prototype + Design Approach - Side by Side on Desktop */}
      <section className="mb-16">
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
          <Heading id="interactive-prototype" level={2}>Interactive Prototype</Heading>
          <p>
            Try it yourself—tap around to explore the ticket list, view QR codes, access account settings, 
            and browse venue information.
          </p>
        </div>

        {/* Side-by-side layout on desktop */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">
          {/* Prototype */}
          <div className="flex justify-center xl:sticky xl:top-24">
            <PrototypeEmbed />
          </div>

          {/* Design Approach */}
          <div className="space-y-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <h3 className="mt-0">Design Approach</h3>
              <p>
                The design language draws from Houston Ballet's sophisticated brand while prioritizing 
                usability in a theater environment—low light, quick interactions, <Tooltip containerClassName="inline" content="Mobile interfaces designed for thumb-reachable zones and single-hand operation—critical for users carrying bags, coats, or holding a companion's hand."><span className="font-bold">one-handed use</span></Tooltip>.
              </p>
            </div>

            {/* Design Decision Cards */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg shrink-0">
                    <QrCode className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1"><Tooltip containerClassName="inline" content="Design with strong visual separation between elements—critical for readability in challenging lighting and ensuring QR codes scan reliably."><span className="font-bold">High Contrast</span></Tooltip> QR Codes</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Maximum contrast with dark purple borders ensures reliable scanning in varying lobby lighting conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg shrink-0">
                    <Armchair className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1"><Tooltip containerClassName="inline" content="Information design that allows users to extract key details in under 3 seconds without focused reading—essential for quick reference in busy environments."><span className="font-bold">Glanceable Information</span></Tooltip></h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Essential details—date, time, venue, and seat info—are visible without extra taps. Ushers often ask 
                      "which section?" while scanning; keeping seat info on the QR screen eliminates that back-and-forth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg shrink-0">
                    <MapPin className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">Planning as <Tooltip containerClassName="inline" content="Treating a feature as core to the experience with prominent placement and dedicated resources—not an afterthought or buried in menus."><span className="font-bold">First-Class</span></Tooltip></h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Parking, dining, and venue details get their own dedicated section—not buried in settings. For occasional 
                      theater-goers, this practical info often matters more than account preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg shrink-0">
                    <Calendar className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">Chronological by Default</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Tickets sort by date (soonest first) because most users check close to showtime. Title sort exists 
                      for patrons managing multiple performances.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-white">💡 Try it:</span> Tap the hamburger menu to explore different sections. 
                Select a performance to see the QR ticket view, then hit "View Details" for the full venue guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mb-16">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <Heading id="outcomes" level={2}>Outcomes</Heading>
          <p>
            The <Tooltip containerClassName="inline" content="A working, interactive model of the product that users can click through and experience—going beyond static mockups to demonstrate real behavior and flows."><span className="font-bold">prototype</span></Tooltip> you interacted with above. A functional demonstration of the day-of patron experience—from 
            finding your ticket to navigating your visit—built in a single day using Figma Make.
          </p>
        </div>
      </section>

      {/* Learnings */}
      <section>
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
          <Heading id="learnings" level={2}>Learnings</Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <LearningCard 
            title="Figma Make accelerates prototyping"
            icon="Zap"
          >
            Building a functional <Tooltip containerClassName="inline" content="A JavaScript library for building user interfaces—industry standard for creating interactive web applications with reusable components."><span className="font-bold">React</span></Tooltip> prototype directly from <Tooltip containerClassName="inline" content="A tool that automatically converts Figma designs into production-ready React code—reducing the gap between design and implementation."><span className="font-bold">Figma Make</span></Tooltip> collapsed what would have been 
            days of development into hours. The tool isn't perfect, but the speed-to-demo tradeoff is worth it.
          </LearningCard>

          <LearningCard 
            title="Context shapes mobile design"
            icon="Smartphone"
          >
            A theater lobby isn't a living room. Designing for actual usage—low light, quick interactions, 
            one-handed use—drove decisions that wouldn't surface in a standard mobile audit.
          </LearningCard>

          <LearningCard 
            title="Interactive beats static"
            icon="Play"
          >
            <Tooltip containerClassName="inline" content="Decision-makers who need to approve, fund, or support the project—executives, clients, investors, or cross-functional partners."><span className="font-bold">Stakeholders</span></Tooltip> align faster when they can tap through a prototype rather than reviewing{' '}
            <Tooltip containerClassName="inline" content="Visual diagrams showing the sequence of screens and decisions users encounter—useful for planning but less visceral than interactive prototypes."><span className="font-bold">flow diagrams</span></Tooltip>. This prototype exists because showing is faster than explaining.
          </LearningCard>
        </div>
      </section>

      {/* Credits */}
      <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h3>Credits</h3>
          <p>Houston Ballet, Jixaw Technologies, and the teams working to make the patron experience seamless from purchase to performance.</p>
        </div>
      </section>
    </CaseStudyViewer>
  )
}

export const dynamic = 'error'
