'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { NavigationChip } from '@/components/NavigationChip'
import { SideDrawer } from '@/components/SideDrawer'
import { ComponentDrawer } from '@/components/ComponentDrawer'
import { StakeholderAlignment } from '@/app/process/(components)/drawers/StakeholderAlignment'
import { PersonaJourneyMapping } from '@/app/process/(components)/drawers/PersonaJourneyMapping'
import { PMDashboard } from '@/components/PMDashboard'
import { AccordionPanel } from '@/components/AccordionPanel'
import { ProcessCard } from '@/components/ProcessCard'
import { ProcessTabRow } from '@/components/ProcessTabRow'
import { RICETablePreview, FlowDiagramPreview, MilestoneStripPreview } from '@/components/PreviewThumbnails'
import { UsersIcon } from '@/components/icons/UsersIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon'
import { CogIcon } from '@/components/icons/CogIcon'
import { DocumentIcon } from '@/components/icons/DocumentIcon'
import { CursorClickIcon } from '@/components/icons/CursorClickIcon'
import { ShapesIcon } from '@/components/icons/ShapesIcon'
import { ChartBarIcon } from '@/components/icons/ChartBarIcon'
import { FlaskIcon } from '@/components/icons/FlaskIcon'
import { BoltIcon } from '@/components/icons/BoltIcon'
import { ArrowPathIcon } from '@/components/icons/ArrowPathIcon'

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

interface DrawerEntry {
  overview: string
  whyItMatters: {
    stat: string
    text: string
  }
  sample: string
}

interface ProcessCard {
  title: string
  slug: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  pattern: { y: number, squares: Array<[number, number]> }
}

type DrawerKey = 
  | 'stakeholder-alignment' 
  | 'persona-journey-mapping' 
  | 'competitive-analysis' 
  | 'system-analysis'
  | 'wireframes' 
  | 'clickable-prototypes' 
  | 'design-systems'
  | 'instrumentation' 
  | 'experimentation' 
  | 'performance-quality' 
  | 'continuous-improvement'

type DrawerContentMap = Record<DrawerKey, DrawerEntry>

// Convert slug to human-readable title
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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
      href: '/work/overview?skills=Product%20Vision'
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
      href: '/work/overview?skills=Roadmapping'
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
      href: '/work/overview?skills=Prototyping'
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
      href: '/work/overview?skills=Cross-team%20Facilitation'
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
      href: '/work/overview?skills=Funnel%20Analysis'
    }
  }
]

const drawerContent: DrawerContentMap = {
  // Step 1 - Discovery & Strategy
  'stakeholder-alignment': {
    overview: `## Executive Summary
**One-liner:** Align goals, measures, and decision paths so delivery moves faster.

**Why it matters**
Great products die from misalignment, not bad ideas. Alignment creates a shared definition of "done," success measures, and decision velocity.

**What I do**
• 45–60 min workshops to surface goals, non-goals, constraints, and assumptions
• Map decision-makers/influencers; capture RACI & escalation paths
• Define a north-star metric plus 2–3 guardrails
• Spin up a living decision log to avoid re-debates
• Timebox risks/unknowns into research spikes

**Outputs & artifacts**
• Alignment brief (goals, non-goals, guardrails, risks/assumptions)
• RACI + stakeholder map
• Success measures and checkpoint cadence
• Kickoff deck (concise, reusable)

**Signals of success**
• Every stakeholder can state the same primary goal & metric
• Fewer blocked tickets; faster approvals in sprint 1–2
• Decisions referenced instead of re-argued

**Helpful inputs** Org chart, owners, current OKRs, prior strategy docs  
**Tools** FigJam/Miro, Notion/Confluence, Loom`,
    whyItMatters: { 
      stat: 'Every stakeholder can state the same primary goal & metric', 
      text: 'Fewer blocked tickets; faster approvals in sprint 1–2. Decisions referenced instead of re-argued.' 
    },
    sample: `**Workshop Agenda (45-60 min)**
1. **Goals & Non-goals** (15 min) - What are we trying to achieve and explicitly NOT trying to achieve?
2. **Success measures** (15 min) - How will we know we've succeeded? What's our north star?
3. **Constraints & assumptions** (10 min) - What can't we change? What are we assuming?
4. **RACI mapping** (10 min) - Who's responsible, accountable, consulted, informed?
5. **Decision framework** (5 min) - How do we make decisions and escalate when stuck?

**Sample Output - Alignment Brief**
• **Goal:** Increase checkout completion by 15% in Q2
• **Non-goals:** Redesigning the entire cart experience
• **North-star metric:** Checkout completion rate
• **Guardrails:** Don't break mobile performance, maintain accessibility
• **Key assumption:** Users abandon due to too many form fields
• **Decision maker:** Product Manager (final call), Engineer Lead (feasibility), Designer (UX)`
  },
  'persona-journey-mapping': {
    overview: `## Executive Summary
**One-liner:** Turn anecdotes into patterns we can design for—and measure.

**Why it matters**
Personas and journeys turn scattered anecdotes into patterns we can design for—and measure.

**What I do**
• Tight interview script; 5–7 interviews to reach pattern clarity
• Mine tickets & usage data for top tasks and friction points
• Lightweight personas (needs, contexts, JTBD)
• End-to-end journey with key moments and drop-offs
• Pain-point heatmap tied to experiment ideas

**Outputs & artifacts**
• Personas (goals, contexts, constraints)
• Journey map with stages, emotions, and per-stage measures
• JTBD statements and opportunity backlog

**Signals of success**
• Team can name the top 3 user goals and top 3 frictions
• At least 5 instrumented events align to journey stages
• First AB/test queue agreed and scheduled

**Helpful inputs** Data platform access, helpdesk exports, prior research  
**Tools** Figma/FigJam, Dovetail/Notion, data platforms`,
    whyItMatters: { 
      stat: 'Team can name the top 3 user goals and top 3 frictions', 
      text: 'At least 5 instrumented events align to journey stages with first A/B test queue agreed and scheduled.' 
    },
    sample: `**Sample Persona: Sarah - SaaS Buyer**
• **Role:** VP of Operations at 100-person company
• **Goals:** Find tools that integrate with existing stack, minimize training time
• **Contexts:** Evaluating during Q4 budget planning, needs approval from IT and Finance
• **Jobs to be done:** "Help me evaluate if this tool will work with our Salesforce setup"
• **Constraints:** 30-day evaluation window, limited time for demos

**Journey Stage: Evaluation**
• **Emotion:** Cautiously optimistic but pressed for time
• **Actions:** Reviews pricing, checks integrations, schedules demo
• **Drop-off points:** Complex pricing page (40% exit), integration unclear
• **Instrumentation:** evaluation_started, pricing_viewed, demo_requested, integration_checked`
  },
  'competitive-analysis': {
    overview: `## Executive Summary
**One-liner:** Reach parity where it's table-stakes and differentiate where it matters.

**Why it matters**
We must reach parity where it's table-stakes and differentiate where it matters.

**What I do**
• Select 5–8 relevant competitors and analogs
• Heuristic evaluation of onboarding, IA, search, checkout/flows
• Feature gap matrix (parity vs differentiator vs deprioritize)
• Screenshot tear-downs of good patterns & cautionary examples
• Note technical patterns (auth, pricing, performance hints)

**Outputs & artifacts**
• Feature gap matrix with impact/effort notes
• Screens + commentary library
• "Parity plan" and "Differentiator bets" list

**Signals of success**
• Clear list of table-stakes for MVP
• 2–3 differentiators tied to measurable outcomes

**Helpful inputs** Target positioning, segments, price bands  
**Tools** Heuristic checklists, PageSpeed/Lighthouse, Wayback`,
    whyItMatters: { 
      stat: 'Clear list of table-stakes for MVP', 
      text: '2–3 differentiators tied to measurable outcomes, helping focus effort where it returns value.' 
    },
    sample: `**Feature Gap Matrix Sample**
| Feature | Competitor A | Competitor B | Us | Priority |
|---------|-------------|-------------|-------|----------|
| Single sign-on | ✅ | ✅ | ❌ | Parity (P0) |
| Mobile app | ✅ | ❌ | ❌ | Differentiator (P1) |
| API webhooks | ✅ | ✅ | ✅ | Parity (Done) |
| Real-time collab | ❌ | ✅ | ❌ | Differentiator (P2) |

**Differentiator Bets:**
1. **Mobile-first experience** - None of our competitors have a polished mobile app
2. **One-click integrations** - Current solutions require developer setup
3. **Proactive insights** - Others are reactive; we can predict and prevent issues`
  },
  'system-analysis': {
    overview: `## Executive Summary
**One-liner:** Map constraints, quick wins, and integration risk before we design.

**Why it matters**
Design lives inside systems. Mapping current vs future reveals constraints, quick wins, and integration risk.

**What I do**
• Current-state context diagram (domains, data stores, auth, services)
• Identify coupling points, rate-limits, permission edges, vendor risks
• Review data pipeline & event taxonomy; spot blind spots
• Draft future-state deltas and a low-risk migration path
• List "fast-forward" wins the team can ship immediately

**Outputs & artifacts**
• Current/Future system diagram (C4-ish, lightweight)
• Glossary + constraints doc (what we must honor)
• Tracking plan (events, properties, IDs)
• Quick-wins list with owners and effort

**Signals of success**
• Fewer "unknowns" entering sprint planning
• Events instrumented for Step 5 measurement
• Reduced rework from overlooked constraints

**Helpful inputs** High-level architecture, API docs, data dictionary, event snippets  
**Tools** Excalidraw/Lucidchart, Postman, data platforms, Notion`,
    whyItMatters: { 
      stat: 'Fewer "unknowns" entering sprint planning', 
      text: 'Events instrumented for measurement with reduced rework from overlooked constraints.' 
    },
    sample: `**System Context Diagram**
\`\`\`
[User Auth] → [API Gateway] → [Core App]
     ↓              ↓             ↓
[Identity Provider] [Rate Limiter] [Database]
                                    ↓
                              [Data Pipeline]
\`\`\`

**Constraints Document**
• **Rate limits:** 100 API calls/min per user
• **Auth:** Must support SAML and OAuth
• **Data residency:** EU users' data stays in EU
• **Performance:** P95 response time < 200ms

**Quick Wins Identified**
1. **Add loading states** - Frontend only, 2-day effort
2. **Improve error messages** - Copy changes, 1-day effort  
3. **Cache user preferences** - Backend change, 3-day effort`
  },
  
  // Step 3 - Design & Prototyping
  'wireframes': {
    overview: `## Executive Summary
**One-liner:** I map flows and layouts in low-fi so we can argue about the right problems before pixels get precious.

**What I do**
• Frame the task to be solved; capture constraints and success criteria.
• Sketch alt flows (happy, edge, error, empty, loading).
• Use a mathematical spacing grid developers can implement 1:1.

**Outcome**
• Shared mental model of the experience and a faster path to "right".

**Quick stat:** Avg. review/decision time: **<48h** · Rework in hi-fi: **–35%**

---

## Why wireframes?
Fast iteration, clear trade-offs, cheap mistakes.

**Artifacts**
• Task flow diagram, screen skeletons, copy blocks, spacing tokens.

**Definition of ready**
• Flows signed off, edge states captured, event hooks planned.`,
    whyItMatters: { 
      stat: 'Shared mental model of the experience and a faster path to "right".', 
      text: 'Fast iteration, clear trade-offs, cheap mistakes. Average review/decision time under 48 hours with 35% less rework in hi-fi.' 
    },
    sample: `**Task flow diagram example**

1. **Happy path:** Landing → Sign up → Email verify → Onboarding → Dashboard
2. **Edge cases:** Email bounce, slow verify, skip onboarding
3. **Error states:** Invalid email, network fail, timeout
4. **Loading states:** Form submit, email send, verify check
5. **Empty states:** No data, first-time user, cleared cache

**Spacing tokens**
• **Base unit:** 4px grid system
• **Vertical rhythm:** 16px, 24px, 32px, 48px
• **Container widths:** 320px, 768px, 1024px, 1280px`
  },
  'clickable-prototypes': {
    overview: `## Executive Summary
**One-liner:** I turn the flow into an interactive prototype so we can test intent, comprehension, and friction—before we write code.

**What I do**
• Link primary tasks end-to-end; add realistic content and timing.
• Tag success/failure questions for user tests.
• Version variants behind named flags to A/B in research.

**Outcome**
• Evidence on what to ship now vs. explore later.

**Quick stat:** Task success in pilot test: **92%** · Time-on-task: **–28%**

---

## Test plan
5–8 users, think-aloud + task-based, decision metric pre-set.

**What we look for**
• Hesitation, backtracking, dead-ends, copy clarity.

**Exit criteria**
• ≥90% task success **or** blockers logged to backlog.`,
    whyItMatters: { 
      stat: 'Evidence on what to ship now vs. explore later.', 
      text: 'Task success rate of 92% in pilot tests with 28% reduction in time-on-task through interactive validation before development.' 
    },
    sample: `**Live prototype demo link**
*Try the checkout flow →*

**Research questions tagged**
• Can users find the "Apply coupon" field?
• Do they understand the shipping timeline?
• Where do they get confused in address entry?
• Is the payment method selection clear?

**Variants tested**
• **A:** Single-page checkout
• **B:** Multi-step with progress bar
• **C:** Accordion-style sections

**Success measures**
• Task completion: **92%** (target: ≥90%)
• Average time: **3.2 min** (28% faster than baseline)
• Error recovery: **89%** found correction path`
  },
  'design-systems': {
    overview: `## Executive Summary
**One-liner:** I codify decisions into tokens and components so design and dev move as one.

**What I do**
• Define tokens (color, type, spacing, radius, motion) with semantic names.
• Build composable components (Button, Field, Card, Modal) with states.
• Provide code-ready specs + accessibility patterns.

**Outcome**
• Faster shipping, visual parity, fewer regressions.

**Quick stat:** Reuse on new features: **80%** components · Parity Figma→Prod: **98%**

---

## Documentation includes
• Usage rules, do/don't, props, a11y notes, event hooks.

**Governance**
• Change proposals, versioning, deprecation policy.`,
    whyItMatters: { 
      stat: 'Faster shipping, visual parity, fewer regressions.', 
      text: '80% component reuse on new features with 98% visual parity between Figma and production through systematic token-based design.' 
    },
    sample: `**Core tokens**
\`\`\`css
/* Colors */
--color-primary-500: #10b981;
--color-gray-50: #f9fafb;
--color-gray-900: #111827;

/* Typography */
--font-size-sm: 0.875rem;
--font-weight-medium: 500;
--line-height-relaxed: 1.625;

/* Spacing */
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
\`\`\`

**Component example: Button**
• **Variants:** Primary, Secondary, Ghost, Danger
• **Sizes:** SM (32px), MD (40px), LG (48px)
• **States:** Default, Hover, Active, Disabled, Loading
• **Props:** size, variant, disabled, loading, icon, children
• **A11y:** Focus ring, keyboard navigation, screen reader support`
  },
  
  // Step 5 - Launch & Optimization
  'instrumentation': {
    overview: `## Executive Summary
**One-liner:** Measure what matters from day one.

**Why it matters**
Decisions beat hunches. Clean events and dashboards let the team see cause → effect quickly.

**What I do**
• Define success measures tied to user outcomes
• Event schema (names, properties, IDs) and QA checklist
• Dashboard tiles for adoption, task success, and friction

**Outputs & artifacts** Tracking plan, event QA, dashboard  
**Signals of success** Clear baselines, reliable trend lines  
**Tools** Data platforms, BigQuery (as needed)`,
    whyItMatters: { 
      stat: 'Clear baselines, reliable trend lines', 
      text: 'Decisions beat hunches. Clean events and dashboards let the team see cause → effect quickly.' 
    },
    sample: `**Sample Tracking Plan**
\`\`\`json
{
  "event": "checkout_step_completed",
  "properties": {
    "step": "shipping",
    "method": "guest_checkout",
    "device_type": "mobile",
    "session_duration_ms": 45000
  },
  "user_id": "user_12345"
}
\`\`\`

**Dashboard KPIs**
• Checkout completion rate: 67.3% (+2.1pp vs last month)
• Average time to purchase: 4.2 minutes (-15s vs baseline)
• Mobile vs desktop completion: 64% vs 71%
• Top drop-off step: Payment method selection (23% exit)`
  },
  'experimentation': {
    overview: `## Executive Summary
**One-liner:** Learn fast, ship what works.

**Why it matters**
AB tests validate assumptions and focus effort where it returns value.

**What I do**
• Hypothesis framing, sample size and power checks
• Test design with guardrails and success criteria
• Result reads and next-step recommendations

**Outputs & artifacts** Test briefs, experiment configs, readouts  
**Signals of success** Statistically valid wins; fewer "maybe" launches  
**Tools** Optimizely/LaunchDarkly, internal frameworks`,
    whyItMatters: { 
      stat: 'Statistically valid wins; fewer "maybe" launches', 
      text: 'A/B tests validate assumptions and focus effort where it returns measurable value.' 
    },
    sample: `**Experiment: Checkout CTA Copy**
• **Hypothesis:** Changing "Place Order" to "Complete Purchase Securely" will increase checkout completion by ≥3% on mobile
• **Variants:** Control (Place Order) vs Treatment (Complete Purchase Securely)
• **Sample size:** 10,000 users per variant
• **Duration:** 14 days
• **Primary metric:** Checkout completion rate
• **Guardrails:** Bounce rate ≤5% increase, page load time ≤100ms increase

**Results:**
• Control: 64.2% completion rate
• Treatment: 67.8% completion rate
• **Lift:** +3.6pp (p=0.003, statistically significant)
• **Decision:** Ship treatment to 100% of users`
  },
  'continuous-improvement': {
    overview: `## Executive Summary
**One-liner:** Close the loop and keep momentum.

**Why it matters**
We fold learning into the roadmap so wins scale and misses don't repeat.

**What I do**
• Post-launch reviews; backlog grooming with RICE
• UX debt log and prioritization cadence
• Quarterly theme updates based on evidence

**Outputs & artifacts** Post-launch report, updated roadmap, UX debt board  
**Signals of success** Steady measure lift; fewer regressions  
**Tools** Notion/Jira, RICE scoring, dashboards`,
    whyItMatters: { 
      stat: 'Steady measure lift; fewer regressions', 
      text: 'Learning folds into the roadmap so wins scale and misses don\'t repeat.' 
    },
    sample: `**RICE-Scored Backlog**
| Initiative | Reach | Impact | Confidence | Effort | Score |
|------------|-------|--------|------------|--------|-------|
| Mobile checkout polish | 8000 | 3 | 80% | 3 weeks | 64 |
| Payment method icons | 8000 | 2 | 90% | 1 week | 144 |
| Guest checkout flow | 3000 | 4 | 70% | 4 weeks | 21 |

**Monthly Improvement Rhythm**
• Week 1: Analyze measures, identify top 3 friction points
• Week 2: Prioritize fixes using RICE, plan experiments
• Week 3: Design and implement highest-impact changes
• Week 4: Launch A/B tests, measure results, update backlog`
  },
  'performance-quality': {
    overview: `## Executive Summary
**One-liner:** Speed, accessibility, and stability are UX; I monitor and harden them in CI.

**Why it matters**
Performance is UX. Users abandon slow sites, and accessibility gaps exclude users. Core Web Vitals affect SEO and conversion directly.

**What I do**
• Set performance budgets and add CI checks
• Implement accessibility testing in pipelines
• Monitor error rates, Core Web Vitals, and uptime
• Create quality gates that prevent regression

**Outputs & artifacts** Performance dashboard, CI quality gates, accessibility audit  
**Signals of success** ≥95% Core Web Vitals pass, <1% error rate, WCAG AA compliance  
**Tools** Lighthouse CI, axe-core, Sentry, DataDog`,
    whyItMatters: { 
      stat: '≥95% Core Web Vitals pass, <1% error rate', 
      text: 'Performance is UX - users abandon slow sites, and accessibility gaps exclude users directly.' 
    },
    sample: `**Performance Budget Dashboard**
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP | ≤2.5s | 2.1s | ✅ Pass |
| FID | ≤100ms | 85ms | ✅ Pass |
| CLS | ≤0.1 | 0.08 | ✅ Pass |
| Bundle size | ≤250KB | 223KB | ✅ Pass |

**Accessibility Checklist**
• Color contrast ratio ≥4.5:1
• All interactive elements keyboard accessible
• Form labels and error messages clear
• Images have alt text, videos have captions
• Focus indicators visible and consistent`
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
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
}) {
  const getStepLayout = () => {
    switch (step.id) {
      case 1:
        return <Step1Layout 
          step={step} 
          selectedDrawer={selectedDrawer}
          isDrawerOpen={isDrawerOpen}
          onCardClick={onCardClick}
          onDrawerClose={onDrawerClose}
        />
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

// Step 1: Process cards with drawer functionality
function Step1Layout({ 
  step, 
  selectedDrawer, 
  isDrawerOpen, 
  onCardClick, 
  onDrawerClose 
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
}) {
  const cards: ProcessCard[] = [
    {
      title: 'Stakeholder Alignment',
      slug: 'stakeholder-alignment',
      subtitle: 'Align goals, measures, and decision paths so delivery moves faster.',
      icon: UsersIcon,
      pattern: { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Persona & Journey Mapping',
      slug: 'persona-journey-mapping',
      subtitle: 'Turn anecdotes into patterns we can design for—and measure.',
      icon: UserIcon,
      pattern: { y: -6, squares: [[-1, 2], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Competitive Analysis',
      slug: 'competitive-analysis',
      subtitle: 'Reach parity where it\'s table-stakes and differentiate where it matters.',
      icon: MagnifyingGlassIcon,
      pattern: { y: 32, squares: [[0, 2], [1, 4]] as Array<[number, number]> }
    },
    {
      title: 'System Analysis',
      slug: 'system-analysis',
      subtitle: 'Map constraints, quick wins, and integration risk before we design.',
      icon: CogIcon,
      pattern: { y: 22, squares: [[0, 1]] as Array<[number, number]> }
    }
  ]

  return (
    <div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">{step.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards.map((card) => (
          <ProcessCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            pattern={card.pattern}
            onClick={() => onCardClick(card.slug)}
          />
        ))}
      </div>

      {/* Drawer */}
      {isDrawerOpen && selectedDrawer && (
        selectedDrawer === 'stakeholder-alignment' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Stakeholder Alignment"
          >
            <StakeholderAlignment />
          </ComponentDrawer>
        ) : selectedDrawer === 'persona-journey-mapping' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Persona & Journey Mapping"
          >
            <PersonaJourneyMapping />
          </ComponentDrawer>
        ) : (
          <SideDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title={selectedDrawer ? slugToTitle(selectedDrawer) : ''}
            overview={drawerContent[selectedDrawer as keyof typeof drawerContent]?.overview || `## ${selectedDrawer}\n**Content missing for slug: "${selectedDrawer}"**\n\nThis indicates a configuration issue. Please check the browser console for available content keys.`}
            whyItMatters={drawerContent[selectedDrawer as keyof typeof drawerContent]?.whyItMatters || { stat: 'Content missing', text: 'This drawer content needs to be configured in ProcessFlow.tsx' }}
            sampleContent={drawerContent[selectedDrawer as keyof typeof drawerContent]?.sample || `**Missing sample content for "${selectedDrawer}"**\n\nThis content needs to be added to the drawerContent map in ProcessFlow.tsx. Check the console for available content keys.`}
          />
        )
      )}
    </div>
  )
}

// Step 2: Planning & Architecture with tabs
function Step2Layout({ step }: { step: ProcessStep }) {
  const [activeTab, setActiveTab] = useState('Prioritization')
  
  const tabs = [
    { name: 'Prioritization', current: activeTab === 'Prioritization' },
    { name: 'IA & Flows', current: activeTab === 'IA & Flows' },
    { name: 'Roadmap & Alignment', current: activeTab === 'Roadmap & Alignment' }
  ]

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
  }

  const getTabContent = () => {
    switch (activeTab) {
      case 'Prioritization':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Content */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">What it is</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                A crisp backlog refined with RICE scoring so we ship the highest impact work first.
              </p>
              
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Why it matters</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Cuts 40%+ of &ldquo;nice-to-have&rdquo; items before Sprint 1; gives stakeholders a plan they trust.
              </p>
              
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">What I do</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Define scoring criteria with product & engineering</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Score and rank candidate features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Facilitate trade-off discussions; publish a trimmed, ordered backlog</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Feed outputs into release planning</span>
                </li>
              </ul>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <NavigationChip skill="Release Planning" size="sm" />
                <NavigationChip skill="Risk Surfacing" size="sm" />
                <NavigationChip skill="Competitive Analysis" size="sm" />
              </div>

              <a
                href="/work/overview?skills=Release%20Planning"
                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                See a prioritization example →
              </a>
            </div>

            {/* Right column: Preview */}
            <div>
              <RICETablePreview />
              <div className="mt-4 text-center">
                <a
                  href="/work/overview?skills=Release%20Planning"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  View sample →
                </a>
              </div>
            </div>
          </div>
        )
      
      case 'IA & Flows':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Content */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">What it is</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Navigation and flow patterns that make sense on first click; multiple IA variants tested quickly.
              </p>
              
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Why it matters</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Prevents structural rework later; makes design debt visible early.
              </p>
              
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">What I do</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Produce user flow variants for key journeys (happy path + known friction)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Explore IA trees (3 alternatives minimum); choose the winner with the team</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Document entry points, deep links, and guardrails for edge cases</span>
                </li>
              </ul>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <NavigationChip skill="User Flows" size="sm" />
                <NavigationChip skill="Information Architecture" size="sm" />
                <NavigationChip skill="Roadmapping" size="sm" />
              </div>

              <a
                href="/work/overview?skills=User%20Flows"
                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                View a flow sample →
              </a>
            </div>

            {/* Right column: Preview */}
            <div>
              <FlowDiagramPreview />
              <div className="mt-4 text-center">
                <a
                  href="/work/overview?skills=User%20Flows"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  View sample →
                </a>
              </div>
            </div>
          </div>
        )

      case 'Roadmap & Alignment':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Content */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">What it is</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                A realistic path to value—release plan, stakeholder alignment, and a living risk log.
              </p>
              
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Why it matters</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                Protects timelines; gives leadership confidence; reduces last-minute surprises.
              </p>
              
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">What I do</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Build a release plan with milestones and dependencies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Maintain a risk surface (technical, design, operational) with owners & mitigations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-zinc-700 dark:text-zinc-300">Run weekly alignment touchpoints and demos; capture decisions</span>
                </li>
              </ul>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <NavigationChip skill="Cross-team Facilitation" size="sm" />
                <NavigationChip skill="Stakeholder Alignment" size="sm" />
                <NavigationChip skill="Release Planning" size="sm" />
              </div>

              <a
                href="/work/overview?skills=Cross-team%20Facilitation"
                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                See a roadmap sample →
              </a>
            </div>

            {/* Right column: Preview */}
            <div>
              <MilestoneStripPreview />
              <div className="mt-4 text-center">
                <a
                  href="/work/overview?skills=Cross-team%20Facilitation"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  View sample →
                </a>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Intro section (full width) */}
      <div>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">
          Insight turns into a blueprint—clear flows, a ruthlessly prioritised backlog, and a timeline everyone can believe.
        </p>
      </div>

      {/* 2. Tab row (full width) */}
      <div>
        <ProcessTabRow tabs={tabs} onTabChange={handleTabChange} />
      </div>

      {/* 3. Content panel (full width) */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
        {getTabContent()}
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
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
}) {
  const cards: ProcessCard[] = [
    {
      title: 'Wireframes',
      slug: 'wireframes',
      subtitle: 'Fast, precise structure to align teams and flag risks early.',
      icon: DocumentIcon,
      pattern: { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Clickable Prototypes',
      slug: 'clickable-prototypes',
      subtitle: 'Make journeys tangible for decision-makers and test users.',
      icon: CursorClickIcon,
      pattern: { y: -6, squares: [[-1, 2], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Design Systems',
      slug: 'design-systems',
      subtitle: 'Reusable components that speed delivery and keep UX consistent.',
      icon: ShapesIcon,
      pattern: { y: 32, squares: [[0, 2], [1, 4]] as Array<[number, number]> }
    }
  ]

  return (
    <div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">{step.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <ProcessCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            pattern={card.pattern}
            onClick={() => onCardClick(card.slug)}
          />
        ))}
      </div>

      {/* Drawer */}
      {isDrawerOpen && selectedDrawer && (
        <SideDrawer
          open={isDrawerOpen}
          onClose={onDrawerClose}
          title={selectedDrawer ? slugToTitle(selectedDrawer) : ''}
          overview={drawerContent[selectedDrawer as keyof typeof drawerContent]?.overview || `## ${selectedDrawer}\n**Content missing for slug: "${selectedDrawer}"**\n\nThis indicates a configuration issue. Please check the browser console for available content keys.`}
          whyItMatters={drawerContent[selectedDrawer as keyof typeof drawerContent]?.whyItMatters || { stat: 'Content missing', text: 'This drawer content needs to be configured in ProcessFlow.tsx' }}
          sampleContent={drawerContent[selectedDrawer as keyof typeof drawerContent]?.sample || `**Missing sample content for "${selectedDrawer}"**\n\nThis content needs to be added to the drawerContent map in ProcessFlow.tsx. Check the console for available content keys.`}
        />
      )}
    </div>
  )
}

// Step 4: Implementation Support Dashboard
function Step4Layout({ step }: { step: ProcessStep }) {
  const [activeTab, setActiveTab] = useState('Daily Design QA')
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false)
  
  const tabs = ['Daily Design QA', 'Sprint Demo', 'Bug-Smash Friday']
  
  // Main KPIs (only 3)
  const mainKPIs = [
    {
      name: 'Design QA pass rate',
      value: '96%',
      trend: '↗ +2pp',
      target: '≥95%',
      tooltip: '% of UI checks passing on first review (layout, tokens, states, a11y).'
    },
    {
      name: 'Avg tickets closed per sprint', 
      value: '38',
      trend: '↗ +4',
      target: '≥35',
      tooltip: 'Average tickets closed per sprint across the active squad.'
    },
    {
      name: 'Figma→Prod parity',
      value: '98%',
      trend: '—',
      target: '≥95%',
      tooltip: 'Visual parity across tokens, spacing grid, and component variants.'
    }
  ]
  
  // Header indicators (secondary data)
  const statusIndicators = {
    releaseConfidence: 88,
    a11yDefects: { p0: 0, p1: 2 }
  }
  
  // Sample tasks data
  const sampleTasks = [
    {
      id: 1,
      task: 'Create Onboarding Flow',
      pr: '#234',
      area: 'Navigation',
      owner: 'Sarah Chen',
      status: 'Completed',
      severity: 'P1',
      updated: '2h ago',
      acceptance: ['User can complete signup flow', 'Email verification works', 'Onboarding steps are intuitive'],
      tests: ['Unit tests pass', 'E2E flow tested', 'A11y compliance verified'],
      instrumentationHooks: ['log_signup_start', 'log_step_completion', 'log_signup_success'],
      dodChecklist: ['Design QA passed', 'Code review approved', 'Tests written', 'Data hooks added']
    },
    {
      id: 2,
      task: 'Refactor Button Tokens',
      pr: '#235',
      area: 'DS',
      owner: 'Marcus Rodriguez',
      status: 'In QA',
      severity: 'P2',
      updated: '45m ago'
    },
    {
      id: 3,
      task: 'Fix Modal Focus Trap',
      pr: '#236',
      area: 'A11y',
      owner: 'Alex Kim',
      status: 'Fix Needed',
      severity: 'P1',
      updated: '1d ago'
    },
    {
      id: 4,
      task: 'Design System Documentation',
      pr: '#237',
      area: 'DS',
      owner: null,
      status: 'Completed',
      severity: 'P3',
      updated: '3h ago'
    },
    {
      id: 5,
      task: 'Mobile Navigation Polish',
      pr: '#238',
      area: 'Navigation',
      owner: null,
      status: 'In QA',
      severity: 'P2',
      updated: '1d ago'
    }
  ]
  
  const accordionItems = [
    {
      title: 'Sprint Planning & Backlog Grooming',
      content: 'RICE scoring, dependency mapping. Weekly ceremonies where we break down user stories, estimate effort, and sequence work based on dependencies and business impact. I facilitate these sessions to ensure design and technical constraints are surfaced early.'
    },
    {
      title: 'Daily Design QA & Handoff Reviews',
      content: 'Pixel parity checks, copy QA, a11y. Every feature gets a design QA pass before and after implementation. I pair with engineers to review Figma specs, validate component usage, and ensure accessibility standards are met throughout the development cycle.'
    },
    {
      title: 'Cross-functional Risk Assessment',
      content: 'Perf budgets, event hooks, error paths. I maintain a running risk log that tracks potential blockers, technical debt implications, and scope creep. This includes monitoring for design system breaking changes and coordinating with stakeholders when trade-offs are needed.'
    }
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'In QA':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Fix Needed':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
      case 'Blocked':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
    }
  }
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'P0':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'P1':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'P2':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
    }
  }


  return (
    <div className="space-y-8">
      {/* Intro paragraph */}
      <p className="text-lg text-zinc-700 dark:text-zinc-300">
        Design isn&apos;t done at hand-off. I pair with engineers and QA to ship pixel-perfect, test-covered increments—fast.
      </p>
      
      {/* Implementation Dashboard */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        {/* Secondary navigation */}
        <nav className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-700 py-4">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-zinc-600 dark:text-zinc-400 sm:px-6"
          >
            {tabs.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setActiveTab(item)}
                  className={`transition-colors duration-200 ${
                    activeTab === item 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <div className="flex items-center gap-x-3">
              <div className="flex-none rounded-full bg-emerald-400/10 p-1 text-emerald-500 dark:text-emerald-400">
                <div className="size-2 rounded-full bg-current" />
              </div>
              <h1 className="flex gap-x-3 text-base/7">
                <span className="font-semibold text-zinc-900 dark:text-white">Sprint 47: Mobile Polish & A11y</span>
              </h1>
            </div>
            <p className="mt-2 text-xs/6 text-zinc-500 dark:text-zinc-400">Active · 3 days remaining</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className={`order-first flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset sm:order-0 ${
              statusIndicators.releaseConfidence >= 85 
                ? 'bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/30' 
                : 'bg-zinc-400/10 text-zinc-600 dark:text-zinc-400 ring-zinc-500/30'
            }`}>
              Release confidence: {statusIndicators.releaseConfidence}/100
            </div>
            <div className={`flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              statusIndicators.a11yDefects.p0 > 0 
                ? 'bg-orange-400/10 text-orange-600 dark:text-orange-400 ring-orange-500/30'
                : 'bg-blue-400/10 text-blue-600 dark:text-blue-400 ring-blue-500/30'
            }`}>
              A11y: P0:{statusIndicators.a11yDefects.p0}·P1:{statusIndicators.a11yDefects.p1}
            </div>
          </div>
        </div>

        {/* Performance KPIs */}
        <div className="grid grid-cols-1 border-t border-zinc-200 dark:border-zinc-700 sm:grid-cols-3">
          {mainKPIs.map((stat, statIdx) => (
            <div
              key={stat.name}
              title={stat.tooltip}
              className={`border-t border-zinc-200 dark:border-zinc-700 px-4 py-6 sm:px-6 first:border-t-0 ${
                statIdx === 1 ? 'sm:border-l sm:border-r sm:border-zinc-200 dark:sm:border-zinc-700' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">{stat.name}</p>
                <span className={`text-xs font-medium ${
                  stat.trend === '—' ? 'text-zinc-500 dark:text-zinc-500' :
                  stat.trend.includes('+') ? 'text-emerald-600 dark:text-emerald-400' :
                  'text-rose-600 dark:text-rose-400'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{stat.value}</span>
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">Target: {stat.target}</p>
            </div>
          ))}
        </div>

        {/* Task list */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
          <h2 className="px-4 text-base/7 font-semibold text-zinc-900 dark:text-white sm:px-6">Latest tasks</h2>
          <div className="mt-4 overflow-hidden">
            <table className="w-full text-left">
              <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-3/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
              </colgroup>
              <thead className="border-b border-zinc-200 dark:border-zinc-700 text-sm/6 text-zinc-900 dark:text-white">
                <tr>
                  <th scope="col" className="py-2 pr-8 pl-4 font-semibold sm:pl-6">
                    Task
                  </th>
                  <th scope="col" className="hidden py-2 pr-8 pl-0 font-semibold md:table-cell">
                    Area
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 font-semibold">
                    Owner
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="hidden py-2 pr-8 pl-0 font-semibold md:table-cell">
                    Severity
                  </th>
                  <th scope="col" className="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {sampleTasks.map((task) => (
                  <tr 
                    key={task.id} 
                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-150 cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task)
                      setIsTaskDrawerOpen(true)
                    }}
                  >
                    <td className="py-4 pr-8 pl-4 sm:pl-6">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-zinc-900 dark:text-white">{task.task}</div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pr-8 pl-0 text-sm md:table-cell">
                      <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/10">
                        {task.area}
                      </span>
                    </td>
                    <td className="py-4 pr-4 pl-0 text-sm">
                      <div className="text-zinc-900 dark:text-white">{task.owner || 'N/A'}</div>
                    </td>
                    <td className="py-4 pr-4 pl-0 text-sm">
                      <div className="flex items-center gap-x-2">
                        <div className={`flex-none rounded-full p-1 ${
                          task.status === 'Completed' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10' :
                          task.status === 'In QA' ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-400/10' :
                          task.status === 'Fix Needed' ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-400/10' :
                          'text-zinc-600 bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-400/10'
                        }`}>
                          <div className="size-1.5 rounded-full bg-current" />
                        </div>
                        <div className="text-zinc-900 dark:text-white">{task.status}</div>
                      </div>
                    </td>
                    <td className="hidden py-4 pr-8 pl-0 text-sm md:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(task.severity)}`}>
                        {task.severity}
                      </span>
                    </td>
                    <td className="hidden py-4 pr-4 pl-0 text-right text-sm text-zinc-500 dark:text-zinc-400 sm:table-cell sm:pr-6">
                      {task.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* How I Support Implementation accordions */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">How I Support Implementation</h3>
        <AccordionPanel items={accordionItems} />
        
        {/* Skill chips */}
        <div className="flex flex-wrap gap-2 mt-6">
          {['Cross-team Facilitation', 'Scope Negotiation', 'QA Collaboration', 'Event Instrumentation'].map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Task Detail Drawer */}
      {selectedTask && (
        <SideDrawer
          open={isTaskDrawerOpen}
          onClose={() => setIsTaskDrawerOpen(false)}
          title={selectedTask.task}
          overview={selectedTask.acceptance ? `## Acceptance Criteria
${selectedTask.acceptance.map((criteria: string) => `• ${criteria}`).join('\n')}

## Test Cases
${selectedTask.tests ? selectedTask.tests.map((test: string) => `• ${test}`).join('\n') : 'Tests pending'}

## Data Hooks
${selectedTask.instrumentationHooks ? selectedTask.instrumentationHooks.map((hook: string) => `• ${hook}`).join('\n') : 'No data hooks'}` : 'Task details loading...'}
          whyItMatters={{ 
            stat: `${selectedTask.severity} priority · ${selectedTask.area}`, 
            text: `${selectedTask.owner ? `Owned by ${selectedTask.owner}` : 'Unassigned'} · Last updated ${selectedTask.updated}` 
          }}
          sampleContent={selectedTask.dodChecklist ? `## Definition of Done
${selectedTask.dodChecklist.map((item: string) => `• ${item}`).join('\n')}

**Pull Request:** ${selectedTask.pr}
**Area:** ${selectedTask.area}
**Status:** ${selectedTask.status}
**Severity:** ${selectedTask.severity}` : 'Definition of Done checklist pending...'}
        />
      )}
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
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
}) {
  const cards: ProcessCard[] = [
    {
      title: 'Instrumentation',
      slug: 'instrumentation',
      subtitle: 'Wire up events, funnels, and baselines to measure what matters.',
      icon: ChartBarIcon,
      pattern: { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Experimentation',
      slug: 'experimentation',
      subtitle: 'Run small, falsifiable tests to de-risk decisions.',
      icon: FlaskIcon,
      pattern: { y: -6, squares: [[-1, 2], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Performance & Quality',
      slug: 'performance-quality',
      subtitle: 'Monitor speed, accessibility, and stability in CI.',
      icon: BoltIcon,
      pattern: { y: 8, squares: [[1, 2], [2, 4]] as Array<[number, number]> }
    },
    {
      title: 'Continuous Improvement',
      slug: 'continuous-improvement',
      subtitle: 'Turn insights into a prioritized backlog, prune and ship weekly.',
      icon: ArrowPathIcon,
      pattern: { y: 32, squares: [[0, 2], [1, 4]] as Array<[number, number]> }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {cards.map((card) => (
          <ProcessCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            pattern={card.pattern}
            onClick={() => onCardClick(card.slug)}
          />
        ))}
      </div>
      
      {/* Drawer */}
      {isDrawerOpen && selectedDrawer && (
        <SideDrawer
          open={isDrawerOpen}
          onClose={onDrawerClose}
          title={selectedDrawer ? slugToTitle(selectedDrawer) : ''}
          overview={drawerContent[selectedDrawer as keyof typeof drawerContent]?.overview || `## ${selectedDrawer}\n**Content missing for slug: "${selectedDrawer}"**\n\nThis indicates a configuration issue. Please check the browser console for available content keys.`}
          whyItMatters={drawerContent[selectedDrawer as keyof typeof drawerContent]?.whyItMatters || { stat: 'Content missing', text: 'This drawer content needs to be configured in ProcessFlow.tsx' }}
          sampleContent={drawerContent[selectedDrawer as keyof typeof drawerContent]?.sample || `**Missing sample content for "${selectedDrawer}"**\n\nThis content needs to be added to the drawerContent map in ProcessFlow.tsx. Check the console for available content keys.`}
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

function ProcessFlowContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeStep, setActiveStep] = useState(1)
  
  // State for drawer functionality across all steps
  const [selectedDrawer, setSelectedDrawer] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // URL parameter handling
  useEffect(() => {
    const panel = searchParams.get('panel')
    if (panel) {
      setSelectedDrawer(panel)
      setIsDrawerOpen(true)
    } else {
      setIsDrawerOpen(false)
      setSelectedDrawer(null)
    }
  }, [searchParams])

  // Drawer handlers for all steps
  const handleCardClick = (title: string) => {
    console.log('[DEBUG] Available drawerContent keys:', Object.keys(drawerContent))
    console.log('[DEBUG] Card clicked with title:', title)
    
    const contentExists = !!drawerContent[title as keyof typeof drawerContent]
    console.log('[DEBUG] Content exists for title:', contentExists)
    
    if (!contentExists) {
      console.warn(`[DRAWER] Missing content for slug: "${title}". Available slugs:`, Object.keys(drawerContent))
    }
    
    setSelectedDrawer(title)
    setIsDrawerOpen(true)
    
    // Update URL with panel parameter
    const url = new URL(window.location.href)
    url.searchParams.set('panel', title) // title is now a slug, already kebab-case
    window.history.pushState(null, '', url.toString())
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedDrawer(null)
    
    // Remove panel parameter from URL
    const url = new URL(window.location.href)
    url.searchParams.delete('panel')
    window.history.pushState(null, '', url.toString())
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

export function ProcessFlow() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />}>
      <ProcessFlowContent />
    </Suspense>
  )
}