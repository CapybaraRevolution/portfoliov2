'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { NavigationChip } from '@/components/NavigationChip'
import { SideDrawer } from '@/components/SideDrawer'
import { PMDashboard } from '@/components/PMDashboard'
import { AccordionPanel } from '@/components/AccordionPanel'

interface ProcessStep {
  id: number
  name: string
  title: string
  description: string
  skills: string[]
  cta?: {
    text: string
    href: string
  }
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    name: 'Discovery & Strategy',
    title: 'Discovery & Strategy',
    description: 'Before I draw a single box or line, I map the terrain - your goals, your users, and the tech guardrails we can\'t ignore.',
    skills: ['User Interviews', 'Stakeholder Alignment', 'Market Research', 'Competitive Analysis', 'Opportunity Framing'],
    cta: {
      text: 'See a real discovery charter →',
      href: '/portfolio?skills=Product%20Vision'
    }
  },
  {
    id: 2,
    name: 'Planning & Architecture',
    title: 'Planning & Architecture', 
    description: 'Insight turns into blueprint - clear flows, a ruthlessly prioritised backlog, and a timeline everyone can believe.',
    skills: ['Roadmapping', 'Information Architecture', 'User Flows', 'Release Planning', 'Risk Surfacing'],
    cta: {
      text: 'View a roadmap sample →',
      href: '/portfolio?skills=Roadmapping'
    }
  },
  {
    id: 3,
    name: 'Design & Prototyping',
    title: 'Design & Prototyping',
    description: 'Ideas become tangibles - wireframes, interactive prototypes, and a living design system.',
    skills: ['Wireframing', 'Prototyping', 'Design Systems', 'Accessibility', 'A/B Testing'],
    cta: {
      text: 'Test a live prototype →',
      href: '/portfolio?skills=Prototyping'
    }
  },
  {
    id: 4,
    name: 'Implementation Support',
    title: 'Implementation Support',
    description: 'Design isn\'t done at hand-off. I pair with engineers and QA to ship pixel-perfect, test-covered increments.',
    skills: ['Cross-team Facilitation', 'Scope Negotiation', 'QA Collaboration', 'Event Instrumentation'],
    cta: {
      text: 'Read a sprint report →',
      href: '/portfolio?skills=Cross-team%20Facilitation'
    }
  },
  {
    id: 5,
    name: 'Launch & Optimisation',
    title: 'Launch & Optimisation', 
    description: 'After go-live we measure, learn, and iterate with experiments that move the needle.',
    skills: ['KPI Dashboards', 'Funnel Analysis', 'Conversion Optimisation', 'AI Prompt Design'],
    cta: {
      text: 'See optimisation case study →',
      href: '/portfolio?skills=Funnel%20Analysis'
    }
  }
]

const drawerContent = {
  // Step 3 - Design & Prototyping
  'Wireframes': {
    overview: 'Low-fidelity layouts that map user flows and define content hierarchy before visual design begins.',
    whyItMatters: { 
      stat: '67%', 
      text: 'faster design iteration when wireframes are tested early' 
    },
    sample: 'Interactive wireframe gallery'
  },
  'Click-through Prototype': {
    overview: 'Interactive Figma prototypes that simulate the real experience for stakeholder buy-in and user testing.',
    whyItMatters: { 
      stat: '3x', 
      text: 'more effective user feedback compared to static designs' 
    },
    sample: 'Live prototype demo'
  },
  'Design System': {
    overview: 'Token-based component library ensuring visual consistency and faster developer handoff.',
    whyItMatters: { 
      stat: '40%', 
      text: 'reduction in design-dev QA cycles with systematic approach' 
    },
    sample: 'Component library showcase'
  },
  
  // Step 5 - Launch & Optimization
  'Instrumentation': {
    overview: `I don't guess; I instrument. Before (or immediately after) release, I wire up the critical events and state we need to see: sign-up start/finish, paywall views, plan selection, purchase completion, error surfaces, and user intent signals (search, filter, save). I also tag UX states—empty, loading, and error—so we can separate "no demand" from "bad experience."

**What I set up**
• **Events & properties:** consistent names, lower-snake-case, versioned.
• **Funnels:** tasks users must complete (e.g., "Checkout").
• **Baseline metrics:** conversion, drop-off by step, time-to-complete, repeat usage.
• **Alerts:** threshold-based pings to Slack/Email when a KPI moves outside bounds.
• **Dashboards:** exec view (outcomes) + team view (leading indicators).`,
    whyItMatters: { 
      stat: 'Design debates evaporate when we can **see** where users fall out.', 
      text: 'Instrumentation turns opinions into a ranked list of opportunities, unlocks targeted experiments, and lets us measure the compounding effect of many small fixes.' 
    },
    sample: `**Core event schema (example)**
\`\`\`json
{
  "event": "checkout_step_viewed",
  "properties": {
    "step": "shipping",
    "device": "mobile",
    "ab_variant": "B",
    "country": "CA",
    "session_cwv_lcp_ms": 1750
  },
  "user_id": "hash_abc123",
  "timestamp": "2025-08-07T18:22:15Z"
}
\`\`\`

**Starter KPIs**
• Checkout completion (14-day rolling): +5.9%
• Mobile LCP p75: 1.8s, INP p75: 180ms
• Drop-off at "Shipping": –32% vs baseline`
  },
  'Experimentation': {
    overview: `I design small, falsifiable experiments that answer one question at a time. Every test has a clear hypothesis, a primary decision metric, guardrails (SRM, runtime, and stop conditions), and a plan for what we'll ship if the variant wins—or what we'll learn if it doesn't.

**How I run tests**
• **Hypothesis:** "Changing X for Y audience will move Z metric by N%."
• **Design:** A/B for copy/layout; multivariate sparingly; feature flags for safe rollout.
• **Power:** Minimum detectable effect (MDE) set up-front; sample size & runtime calculator.
• **Quality:** SRM checks, outlier handling, novelty & day-of-week effects.
• **Decision:** Pre-registered rules (e.g., ship if p<0.05 and uplift ≥ +3%, else iterate).`,
    whyItMatters: { 
      stat: 'High-tempo', 
      text: 'cadence of safe experiments produces compounding gains—and protects the roadmap from "big bet" detours based on hunches.' 
    },
    sample: `**Experiment card**
• **Name:** Checkout copy—confidence nudges
• **Hypothesis:** Reframing the CTA ("Complete order securely") will increase checkout completion by ≥ +3% on mobile.
• **Variants:** Control / CTA-Secure
• **Primary metric:** Checkout completion
• **Guardrails:** Bounce rate, INP p75
• **Status:** Running (day 5 of 10)
• **Decision rule:** Ship if +3% uplift (p<0.05); else revert + test address-autocomplete next.`
  },
  'Performance & Quality': {
    overview: `Speed and stability are UX. I track Core Web Vitals (LCP, INP, CLS), accessibility defects, broken flows, and top error surfaces. We fix the things users feel first and bake guardrails into CI so regressions don't creep back in.

**What I monitor**
• **CWV (p75):** LCP < 2.5s, INP < 200ms, CLS < 0.1 (mobile first).
• **A11y:** Focus management, color contrast, semantic roles, screen-reader paths.
• **Reliability:** Error rate, retry loops, dead-end screens, empty-state recovery.
• **Release hygiene:** Pixel parity (Figma → Prod), visual regression snapshots.`,
    whyItMatters: { 
      stat: 'Fast, stable interfaces convert better, rank better', 
      text: 'and reduce support costs. Performance wins often unlock conversion wins "for free."' 
    },
    sample: `**Mini metric table (last 14 days)**

| Metric | p75 | Δ vs prev |
|--------|-----|-----------|
| LCP (mobile) | 1.8s | –0.4s |
| INP (mobile) | 180ms | –35ms |
| CLS (mobile) | 0.06 | –0.03 |
| Error rate | 0.27% | –0.11pp |

**A11y fixes shipped**
• Focus trap for modal + keyboard escape
• Tooltip: aria-describedby + hover/keyboard parity
• Contrast: buttons raised from 3.3:1 → 4.8:1`
  },
  'Continuous Improvement': {
    overview: `Insights only matter if they change the backlog. I convert findings into tickets, score with RICE, prune every sprint, and keep a living "impact log" so the team can see how small wins compound over time.

**Operating cadence**
• **Weekly triage:** Convert insights → tickets; link evidence.
• **Prioritise:** RICE scoring; guard against pet projects.
• **Ship:** Bundle small fixes into "UX polish" increments.
• **Log impact:** Before/after metrics captured on each ticket.`,
    whyItMatters: { 
      stat: 'This closes the loop:', 
      text: 'measure → learn → improve. It keeps momentum high and ensures we spend time where it actually moves the needle.' 
    },
    sample: `**Backlog (RICE-scored)**
1. **Shorten address form (mobile)** — RICE 68
   Insight: 40% drop-off at shipping; plan: 3-field version + autocomplete.
2. **Product card image size** — RICE 41
   Insight: Slow LCP on PLP; plan: next-gen format + lazy-load.
3. **Password show/hide** — RICE 24
   Insight: High error rate on create-account.

**Impact log extract**
• Address form redesign → –23% step drop-off; +11% task speed.
• Image optimisation → –350ms LCP; +2.4% PLP → PDP click-through.`
  }
}

function ProgressTracker({ 
  steps, 
  activeStep, 
  onStepClick 
}: { 
  steps: ProcessStep[]
  activeStep: number
  onStepClick: (stepId: number) => void
}) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Ensure animations only run on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8 overflow-x-auto md:overflow-visible">
        {steps.map((step) => (
          <li key={step.id} className="md:flex-1 flex-shrink-0 relative">
            {/* Pulse animation for active step - only on client */}
            {step.id === activeStep && isMounted && (
              <motion.div
                className="absolute -inset-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            <button
              onClick={() => onStepClick(step.id)}
              className={`relative group flex flex-col border-l-4 py-2 pl-4 hover:border-emerald-600 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0 w-full text-left transition-colors ${
                step.id === activeStep
                  ? 'border-emerald-600'
                  : step.id < activeStep
                  ? 'border-emerald-600'
                  : 'border-zinc-200 dark:border-zinc-700'
              }`}
              aria-current={step.id === activeStep ? 'step' : undefined}
            >
              <span className={`text-sm font-medium transition-colors ${
                step.id === activeStep
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : step.id < activeStep
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300'
              }`}>
                Step {step.id}
              </span>
              <span className={`text-sm font-medium transition-colors ${
                step.id === activeStep || step.id < activeStep
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-900 dark:text-white'
              }`}>
                {step.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function StepContent({ 
  step, 
  selectedDrawer, 
  isDrawerOpen, 
  onCardClick, 
  onDrawerClose 
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (title: string) => void
  onDrawerClose: () => void
}) {
  const getStepLayout = () => {
    switch (step.id) {
      case 1:
        return <Step1Layout step={step} />
      case 2:
        return <Step2Layout step={step} />
      case 3:
        return <Step3Layout 
          step={step} 
          selectedDrawer={selectedDrawer}
          isDrawerOpen={isDrawerOpen}
          onCardClick={onCardClick}
          onDrawerClose={onDrawerClose}
        />
      case 4:
        return <Step4Layout step={step} />
      case 5:
        return <Step5Layout 
          step={step} 
          selectedDrawer={selectedDrawer}
          isDrawerOpen={isDrawerOpen}
          onCardClick={onCardClick}
          onDrawerClose={onDrawerClose}
        />
      default:
        return <DefaultLayout step={step} />
    }
  }

  return (
    <div className="not-prose">
      {getStepLayout()}
    </div>
  )
}

// Animated card component for Step 1
function AnimatedCard({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  const ref = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Ensure animations only run on client
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={isMounted ? { opacity: 0, y: 20 } : false}
      animate={isMounted && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700"
    >
      <div className="flex items-center mb-4">
        <motion.div 
          className="p-2 rounded-lg"
          initial={isMounted ? { opacity: 0 } : false}
          animate={isMounted && isInView ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.25, delay: delay + 0.2, ease: "easeOut" }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white ml-3">{title}</h3>
      </div>
      <motion.p 
        className="text-sm text-zinc-600 dark:text-zinc-400"
        initial={isMounted ? { opacity: 0, y: 4 } : false}
        animate={isMounted && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: delay + 0.3, ease: "easeOut" }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

// Step 1: Bento 2×2 grid layout
function Step1Layout({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bento 2x2 Grid */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedCard
            delay={0}
            title="Stakeholder Alignment"
            description="In 45-minute discovery workshops we surface hidden assumptions, define a north-star metric, and leave with one shared definition of 'done.'"
            icon={
              <div className="bg-emerald-100 dark:bg-emerald-900/30">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            }
          />
          
          <AnimatedCard
            delay={0.1}
            title="Persona & Journey Mapping"
            description="Interviews, diary studies, and support-ticket sleuthing crystallise who's using the product and where the friction lives."
            icon={
              <div className="bg-blue-100 dark:bg-blue-900/30">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            }
          />
          
          <AnimatedCard
            delay={0.2}
            title="Competitive Analysis"
            description="A feature-gap matrix shows where we must reach parity and - more importantly - where we can leapfrog."
            icon={
              <div className="bg-purple-100 dark:bg-purple-900/30">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            }
          />
          
          <AnimatedCard
            delay={0.3}
            title="System Analysis"
            description="Current-vs-future system diagrams expose quick wins and flag costly detours before Sprint 1 even kicks off."
            icon={
              <div className="bg-orange-100 dark:bg-orange-900/30">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            }
          />
        </div>
      </div>
      
      {/* Why it matters highlight card */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Why it matters</h3>
          <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-4">
            Teams often build elegant solutions to the wrong problem.
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            A two-week discovery sprint typically saves 4–6 weeks of rework and earns stakeholder trust on day 1.
          </p>
        </div>
      </div>
    </div>
  )
}

// Step 2: Two-column layout
function Step2Layout({ step }: { step: ProcessStep }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">{step.description}</p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">RICE Prioritisation Matrix</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Reach, Impact, Confidence, Effort scoring trims 40% of the &ldquo;nice-to-have&rdquo; backlog before Sprint 1.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">IA Tree & Flow Variants</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Three navigation options tested with real tasks; we keep the winner, ditch the noise.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Sprint Cadence & Risk Log</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Five-day design/dev sprints, weekly demos, red-flag log owner assigned on day 0.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-8 flex items-center justify-center">
        {/* Simple sitemap SVG */}
        <svg viewBox="0 0 400 300" className="w-full h-48 text-zinc-400 dark:text-zinc-500">
          <g fill="currentColor">
            {/* Root node */}
            <rect x="175" y="20" width="50" height="30" rx="4" />
            <text x="200" y="38" textAnchor="middle" className="text-xs fill-zinc-700 dark:fill-zinc-300">Home</text>
            
            {/* Level 1 nodes */}
            <rect x="75" y="100" width="50" height="30" rx="4" />
            <text x="100" y="118" textAnchor="middle" className="text-xs fill-zinc-700 dark:fill-zinc-300">About</text>
            
            <rect x="175" y="100" width="50" height="30" rx="4" />
            <text x="200" y="118" textAnchor="middle" className="text-xs fill-zinc-700 dark:fill-zinc-300">Work</text>
            
            <rect x="275" y="100" width="50" height="30" rx="4" />
            <text x="300" y="118" textAnchor="middle" className="text-xs fill-zinc-700 dark:fill-zinc-300">Contact</text>
            
            {/* Level 2 nodes */}
            <rect x="125" y="180" width="50" height="30" rx="4" />
            <text x="150" y="198" textAnchor="middle" className="text-xs fill-zinc-700 dark:fill-zinc-300">Case 1</text>
            
            <rect x="225" y="180" width="50" height="30" rx="4" />
            <text x="250" y="198" textAnchor="middle" className="text-xs fill-zinc-700 dark:fill-zinc-300">Case 2</text>
            
            {/* Connecting lines */}
            <line x1="200" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="50" x2="200" y2="100" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="50" x2="300" y2="100" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="130" x2="150" y2="180" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="130" x2="250" y2="180" stroke="currentColor" strokeWidth="1" />
          </g>
        </svg>
      </div>
    </div>
  )
}

// Step 3: Interactive card gallery with side drawer
function Step3Layout({ 
  step, 
  selectedDrawer, 
  isDrawerOpen, 
  onCardClick, 
  onDrawerClose 
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (title: string) => void
  onDrawerClose: () => void
}) {

  const cards = [
    {
      title: 'Wireframes',
      description: 'Low-fi layouts and user flows',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: 'Click-through Prototype',
      description: 'Interactive Figma prototype',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      title: 'Design System',
      description: 'Token-based component library',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    }
  ]

  return (
    <div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">{step.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <motion.button
            key={card.title}
            onClick={() => onCardClick(card.title)}
            className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-left transition-all duration-200 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg h-32 mb-4 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors duration-200">
              <div className="group-hover:text-emerald-500 transition-colors duration-200">
                {card.icon}
              </div>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">{card.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{card.description}</p>
            <div className="mt-3 flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Learn more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Side Drawer */}
      {selectedDrawer && drawerContent[selectedDrawer as keyof typeof drawerContent] && (
        <SideDrawer
          open={isDrawerOpen}
          onClose={onDrawerClose}
          title={selectedDrawer}
          overview={drawerContent[selectedDrawer as keyof typeof drawerContent].overview}
          whyItMatters={drawerContent[selectedDrawer as keyof typeof drawerContent].whyItMatters}
          sampleContent={drawerContent[selectedDrawer as keyof typeof drawerContent].sample}
        />
      )}
    </div>
  )
}

// Step 4: PM Dashboard layout with accordion panels
function Step4Layout({ step }: { step: ProcessStep }) {
  const accordionItems = [
    {
      title: 'Sprint Planning & Backlog Grooming',
      content: 'Weekly ceremonies where we break down user stories, estimate effort, and sequence work based on dependencies and business impact. I facilitate these sessions to ensure design and technical constraints are surfaced early.'
    },
    {
      title: 'Daily Design QA & Handoff Reviews',
      content: 'Every feature gets a design QA pass before and after implementation. I pair with engineers to review Figma specs, validate component usage, and ensure accessibility standards are met throughout the development cycle.'
    },
    {
      title: 'Cross-functional Risk Assessment',
      content: 'I maintain a running risk log that tracks potential blockers, technical debt implications, and scope creep. This includes monitoring for design system breaking changes and coordinating with stakeholders when trade-offs are needed.'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Intro paragraph */}
      <p className="text-lg text-zinc-700 dark:text-zinc-300">{step.description}</p>
      
      {/* PM Dashboard */}
      <PMDashboard />
      
      {/* Accordion Panel */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">How I Support Implementation</h3>
        <AccordionPanel items={accordionItems} />
      </div>
    </div>
  )
}

// Step 5: KPI dashboard layout
function Step5Layout({ 
  step, 
  selectedDrawer, 
  isDrawerOpen, 
  onCardClick, 
  onDrawerClose 
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (title: string) => void
  onDrawerClose: () => void
}) {

  const cards = [
    {
      title: 'Instrumentation',
      description: 'Events, funnels, and dashboards',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Experimentation',
      description: 'A/B tests and feature flags',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Performance & Quality',
      description: 'Core Web Vitals and A11y',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Continuous Improvement',
      description: 'RICE scoring and impact logs',
      icon: (
        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ]

  return (
    <div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">{step.description}</p>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">+28%</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Conversion lift</div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Core Web Vitals pass</div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.7★</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">User sentiment</div>
        </div>
      </div>

      {/* Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => onCardClick(card.title)}
            className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 text-left transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-700 p-3 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                {card.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {card.description}
                </p>
              </div>
              <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      {/* Drawer */}
      {isDrawerOpen && selectedDrawer && (
        <SideDrawer
          open={isDrawerOpen}
          onClose={onDrawerClose}
          title={selectedDrawer}
          overview={drawerContent[selectedDrawer as keyof typeof drawerContent]?.overview || ''}
          whyItMatters={drawerContent[selectedDrawer as keyof typeof drawerContent]?.whyItMatters || { stat: '', text: '' }}
          sampleContent={drawerContent[selectedDrawer as keyof typeof drawerContent]?.sample || ''}
        />
      )}
    </div>
  )
}

// Default layout for any missing steps
function DefaultLayout({ step }: { step: ProcessStep }) {
  return (
    <div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">{step.description}</p>
    </div>
  )
}

export function ProcessFlow() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(1)
  
  // State for Step 3 drawer functionality
  const [selectedDrawer, setSelectedDrawer] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Drawer handlers for Step 3
  const handleCardClick = (title: string) => {
    setSelectedDrawer(title)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedDrawer(null)
  }

  // Handle URL hash sync
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const stepMatch = hash.match(/#step-(\d+)/)
      if (stepMatch) {
        const stepId = parseInt(stepMatch[1])
        if (stepId >= 1 && stepId <= 5) {
          setActiveStep(stepId)
        }
      }
    }
  }, [])

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId)
    window.history.pushState(null, '', `#step-${stepId}`)
    
    // Smooth scroll to top of content
    const element = document.getElementById('step-content')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentStep = processSteps.find(step => step.id === activeStep) || processSteps[0]

  return (
    <div className="not-prose">
      <ProgressTracker 
        steps={processSteps}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
      
      <div id="step-content" className="scroll-mt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            {currentStep.title}
          </h2>
        </div>
        
        <StepContent 
          step={currentStep}
          selectedDrawer={selectedDrawer}
          isDrawerOpen={isDrawerOpen}
          onCardClick={handleCardClick}
          onDrawerClose={handleDrawerClose}
        />
        
        {/* Skills and CTA */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {currentStep.skills.map((skill) => (
                <NavigationChip
                  key={skill}
                  skill={skill}
                  size="sm"
                />
              ))}
            </div>
            
            {currentStep.cta && (
              <a
                href={currentStep.cta.href}
                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 whitespace-nowrap"
              >
                {currentStep.cta.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}