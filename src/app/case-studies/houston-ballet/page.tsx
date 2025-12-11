import { CaseStudyViewer } from '@/components/CaseStudyViewer'
import { getCaseStudyBySlug } from '@/lib/caseStudies'
import { Heading } from '@/components/Heading'
import { QuoteBlock } from '@/components/case-studies/QuoteBlock'
import { ProseSection, ProseBlock } from '@/components/case-studies/ProseSection'
import { LearningCard } from '@/components/case-studies/LearningCard'
import { Tooltip } from '@/components/ui/tooltip-card'
import { Highlighter } from '@/components/ui/highlighter'
import { FadeIn } from '@/components/ui/fade-in'
import { QrCode, MapPin, Calendar, Armchair, Sparkles, Zap, Clock } from 'lucide-react'
import PrototypeEmbed from '@/components/prototypes/houston-ballet/PrototypeEmbed'

export const metadata = {
  title: 'Houston Ballet - Case Study',
  description: 'A reflection on how AI tooling is changing design work, told through a mobile ticketing prototype.',
}

// Note: sections are defined here for reference but not exported
// (Layout only imports sections from .mdx files)
const pageSections = [
  { title: 'Context', id: 'context' },
  { title: 'The Experiment', id: 'the-experiment' },
  { title: 'Try It', id: 'try-it' },
  { title: 'What This Means', id: 'what-this-means' },
]

export default function HoustonBalletCaseStudy() {
  const caseStudy = getCaseStudyBySlug('houston-ballet')
  
  if (!caseStudy) {
    return <div>Case study not found</div>
  }

  const metrics = [
    {
      label: 'Concept to Prototype',
      value: 1,
      suffix: ' day',
      description: 'From grey boxes to functional React code',
      highlight: true,
    },
    {
      label: 'Screens',
      value: 8,
      description: 'Complete flows you can actually tap through',
      highlight: true,
    },
    {
      label: 'Lines of Code Written',
      value: 0,
      description: 'Figma Make generated it all',
      highlight: true,
    }
  ]

  return (
    <CaseStudyViewer caseStudy={caseStudy} metrics={metrics}>
      
      {/* Context - lighter touch */}
      <ProseSection>
        <ProseBlock>
          <Heading id="context" level={2} className="mt-0">Context</Heading>
          <p>
            I've been working with Houston Ballet through <Tooltip containerClassName="inline" content="A technology consultancy I work with on ticketing and venue experience projects."><span className="font-bold">Jixaw Technologies</span></Tooltip> for a while now. Ticketing flows, purchase paths, the usual. They're a good client. Clear feedback, realistic timelines, no drama. If you've freelanced, you know how rare that is.
          </p>
          <p>
            This case study is a little different. There's no dramatic problem statement here. No "the system was broken and we fixed it" arc. Instead, this is a reflection on something I've been thinking about a lot lately: <strong>how AI tooling is actually changing the work.</strong>
          </p>
          <p>
            The prototype below started as a quick exploration, a way to show what a mobile ticketing experience <em>could</em> feel like. But the process of making it turned into something more interesting than the artifact itself.
          </p>
        </ProseBlock>
      </ProseSection>

      {/* The Experiment - Figma Make */}
      <ProseSection>
        <ProseBlock>
          <Heading id="the-experiment" level={2}>The Experiment</Heading>
          <p>
            Look, I'll be honest: natural language prompting has been pretty rough for a while. I've tried the "describe what you want and watch it appear" tools. Most of them produce something that looks like a website from 2008 had a fever dream. The gap between "what I imagined" and "what appeared" was usually big enough to make the whole exercise feel pointless.
          </p>
          <p>
            <Tooltip containerClassName="inline" content="A tool that converts Figma designs into production-ready code using AI, part of the emerging 'design-to-code' workflow."><span className="font-bold">Figma Make</span></Tooltip> is different. Not perfect (I'll get to that), but different enough that it changed how I approached this project.
          </p>
        </ProseBlock>

        <ProseBlock delay={0.1} className="mt-8">
          <h3>The Workflow That Actually Worked</h3>
          <p>
            Here's what I did: I started with grey boxes. Literal rectangles representing the <Tooltip containerClassName="inline" content="The structural blueprint of how screens, content, and features are organized. The skeleton before the skin."><span className="font-bold">information architecture</span></Tooltip>. Header here, list of tickets there, navigation at the bottom. No colors, no polish. Just structure.
          </p>
          <p>
            Then I layered in Houston Ballet's brand assets. Logo, color palette, typography. The tool understood these as constraints, not suggestions. When I asked for "a ticket card," it used the purple from the brand, not some default blue.
          </p>
          <p>
            From there, I could iterate in natural language. "Make the QR code bigger." "Add seat information below the date." "Put a hamburger menu in the header." Each prompt built on the last. The tool remembered context. It felt less like starting over and more like... directing.
          </p>
        </ProseBlock>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <Clock className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                </div>
                <h4 className="text-zinc-900 dark:text-white font-semibold text-sm">Morning</h4>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Grey-box wireframes. IA skeleton. Basic screen flow mapped out.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <Sparkles className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                </div>
                <h4 className="text-zinc-900 dark:text-white font-semibold text-sm">Afternoon</h4>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Brand assets in. Natural language iteration. Real components taking shape.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <Zap className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                </div>
                <h4 className="text-zinc-900 dark:text-white font-semibold text-sm">Evening</h4>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Functional React prototype. Exported, cleaned up, deployed.
              </p>
            </div>
          </div>
        </FadeIn>

        <ProseBlock delay={0.2}>
          <h3>What's Still Clunky</h3>
          <p>
            I'm not going to pretend this was seamless. The exported code needed cleanup. Naming conventions were inconsistent, some components were over-nested, and the responsive behavior required manual adjustment. If you're expecting "prompt → production," you'll be disappointed.
          </p>
          <p>
            But here's the thing: I wasn't expecting that. I was expecting "prompt → something we can look at together and pick apart." And that's exactly what I got. The time I saved on boilerplate meant more time on the decisions that actually matter: interaction patterns, information hierarchy, the stuff that makes a prototype <em>useful</em> instead of just pretty.
          </p>
        </ProseBlock>
      </ProseSection>

      {/* Quote */}
      <QuoteBlock className="my-16">
        The{' '}
        <Highlighter action="underline">
          best way
        </Highlighter>
        {' '}to show what something feels like is to{' '}
        <Highlighter action="highlight">
          let people use it
        </Highlighter>
        .
      </QuoteBlock>

      {/* Interactive Prototype + Design Approach - Side by Side on Desktop */}
      <section className="mb-16">
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
          <Heading id="try-it" level={2}>Try It</Heading>
          <p>
            Here's the prototype. Tap around, explore the ticket list, view QR codes, check account settings, browse venue info. It's a real React app, not a clickable mockup. That distinction matters when you're trying to communicate <em>how something feels</em>, not just how it looks.
          </p>
        </div>

        {/* Side-by-side layout on desktop */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">
          {/* Prototype */}
          <div className="xl:sticky xl:top-24">
            <div className="flex justify-center">
              <PrototypeEmbed />
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-3 leading-relaxed">
              Not representative of final product. All brand assets are property of Houston Ballet.
            </p>
          </div>

          {/* Design Decisions */}
          <div className="space-y-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <h3 className="mt-0">Design Decisions</h3>
              <p>
                A theater lobby isn't a living room. Low light, one hand free (the other's holding a coat or a partner), and you've got about three seconds before the usher needs to see your ticket. These constraints shaped everything.
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
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">High Contrast QR Codes</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Dark purple borders on white. Scans reliably even in dim lobby lighting. (This sounds obvious until you've watched someone struggle with a low-contrast QR code at a venue entrance.)
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
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">Seat Info on the QR Screen</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Ushers always ask "which section?" while scanning. Keeping seat info visible eliminates that back-and-forth. Small thing, but it matters when you're holding up a line.
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
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">Planning Gets Its Own Section</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Parking, dining, venue details. Not buried in settings. For occasional theater-goers, this practical info often matters more than account preferences.
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
                    <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-1">Date-Sorted by Default</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Most people check their tickets close to showtime. Soonest first makes sense. Title sort exists for the season-ticket holders managing multiple performances.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-white">Explore:</span> Tap the hamburger menu to see different sections. Select a performance for the QR view. Hit "View Details" for the full venue guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <ProseSection>
        <ProseBlock>
          <Heading id="what-this-means" level={2}>What This Means</Heading>
          <p>
            I've been thinking about this a lot. AI isn't replacing designers—at least not yet, and probably not in the way people fear. What it's doing is shifting where we spend our time.
          </p>
          <p>
            Before tools like this, a significant chunk of my energy went into <em>production</em>: translating decisions into pixels, wiring up interactions, making sure the spacing was consistent. That work still matters, but the tools are getting better at handling it. What they can't do is make the decisions in the first place.
          </p>
          <p>
            This prototype took a day. But the thinking behind it—what information matters on a QR screen, why venue planning deserves its own section, how to design for a theater lobby instead of an idealized user testing lab—that's where the value lives. The tool let me spend more time there.
          </p>
        </ProseBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <LearningCard 
            title="The value is shifting"
            icon="ArrowRight"
            index={0}
          >
            Production time compresses. Decision time stays the same (or expands, because you can explore more options). The designers who thrive will be the ones who are good at decisions, not just execution.
          </LearningCard>

          <LearningCard 
            title="Modularity matters"
            icon="Layers"
            index={1}
          >
            Figma Make works well because Figma is modular. Components, variants, design tokens. The cleaner your inputs, the better the outputs. This isn't new advice, but it's more consequential now.
          </LearningCard>

          <LearningCard 
            title="I'm cautiously optimistic"
            icon="Eye"
            index={2}
          >
            The hype cycle is real. Not every AI tool is worth the breathless LinkedIn posts. But this one? It actually changed how I worked on this project. That's worth paying attention to.
          </LearningCard>
        </div>

        <ProseBlock delay={0.1}>
          <p>
            I don't know where this goes. Maybe these tools plateau. Maybe they get dramatically better. Either way, I'd rather be experimenting with them now than catching up later. This prototype was one experiment. There will be more.
          </p>
        </ProseBlock>
      </ProseSection>

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
