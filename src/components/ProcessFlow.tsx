'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { NavigationChip } from '@/components/NavigationChip'
import { SideDrawer } from '@/components/SideDrawer'
import { ComponentDrawer } from '@/components/ComponentDrawer'
import { StakeholderAlignment } from '@/app/process/(components)/drawers/StakeholderAlignment'
import { PersonaJourneyMapping } from '@/app/process/(components)/drawers/PersonaJourneyMapping'
import { CompetitiveAnalysis } from '@/app/process/(components)/drawers/CompetitiveAnalysis'
import { SystemAnalysis } from '@/app/process/(components)/drawers/SystemAnalysis'
import { WhatIsUserResearch } from '@/app/process/(components)/drawers/WhatIsUserResearch'
import { WhyResearchFirst } from '@/app/process/(components)/drawers/WhyResearchFirst'
import { ChooseRightMethod } from '@/app/process/(components)/drawers/ChooseRightMethod'
import { IAFlowsPanel } from '@/components/IAFlowsPanel'
import { PMDashboard } from '@/components/PMDashboard'
import { AccordionPanel } from '@/components/AccordionPanel'
import { ProcessCard } from '@/components/ProcessCard'
import { ProcessTabRow } from '@/components/ProcessTabRow'
import { ScrollableTable } from '@/components/ui/ScrollableTable'
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
  if (!slug || typeof slug !== 'string') {
    return 'Unknown Title' // Fallback for undefined/null slugs
  }
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
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
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
            enableComments={false}
          >
            <StakeholderAlignment />
          </ComponentDrawer>
        ) : selectedDrawer === 'persona-journey-mapping' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Persona & Journey Mapping"
            enableComments={false}
          >
            <PersonaJourneyMapping />
          </ComponentDrawer>
        ) : selectedDrawer === 'competitive-analysis' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Competitive Analysis"
            enableComments={false}
          >
            <CompetitiveAnalysis />
          </ComponentDrawer>
        ) : selectedDrawer === 'system-analysis' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="System Analysis"
            enableComments={false}
          >
            <SystemAnalysis />
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

// Step 2: Planning & Architecture Application Shell
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Prioritization':
        return <PrioritizationPanel />
      case 'IA & Flows':
        return <IAFlowsPanel />
      case 'Roadmap & Alignment':
        return <RoadmapPanel />
      default:
        return <PrioritizationPanel />
    }
  }

  return (
    <div className="space-y-8">
      {/* Intro section */}
      <div>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">
          {step.description}
        </p>
      </div>

      {/* Application Shell */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Top Navigation */}
        <nav className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Kyle McGraw"
                    src="/favicon.ico"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => handleTabChange(tab.name)}
                        aria-current={tab.current ? 'page' : undefined}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          tab.current
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-700">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabChange(tab.name)}
                  aria-current={tab.current ? 'page' : undefined}
                  className={`block rounded-md px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                    tab.current 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' 
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {activeTab}
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white dark:bg-zinc-900">
          {renderTabContent()}
        </main>
      </div>
    </div>
  )
}

// Panel Components
function PrioritizationPanel() {
  const [selectedDeployment, setSelectedDeployment] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [visibleProgressBars, setVisibleProgressBars] = useState<Set<number>>(new Set())

  // Function to get color based on current fill percentage
  const getProgressColor = (currentPercentage: number, projectName?: string) => {
    // Use orange for tech debt items regardless of score
    if (projectName?.toLowerCase().includes('technical debt')) {
      return 'bg-gradient-to-r from-orange-500 to-orange-400'
    }
    
    if (currentPercentage >= 90) {
      return 'bg-gradient-to-r from-emerald-500 to-emerald-400'
    } else if (currentPercentage >= 78) {
      return 'bg-gradient-to-r from-emerald-500 to-emerald-400'
    } else if (currentPercentage >= 65) {
      return 'bg-gradient-to-r from-yellow-500 to-yellow-400'
    } else if (currentPercentage >= 50) {
      return 'bg-gradient-to-r from-orange-500 to-orange-400'
    } else {
      return 'bg-gradient-to-r from-red-500 to-red-400'
    }
  }

  // Check if user is on mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Trigger animations on component mount
  useEffect(() => {
    setIsLoaded(false)
    const timer = setTimeout(() => {
      setIsLoaded(true)
      // On desktop, show all progress bars immediately for cascading effect
      if (!isMobile) {
        setVisibleProgressBars(new Set(deployments.map((_, index) => index)))
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [isMobile, deployments])

  // Intersection Observer for progress bar animations (mobile only)
  useEffect(() => {
    if (!isMobile || !isLoaded) return
    
    const progressBarElements = document.querySelectorAll('[data-progress-bar]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-progress-bar') || '0')
            setVisibleProgressBars(prev => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of the progress bar is visible
        rootMargin: '0px 0px -10% 0px' // Start animation slightly before fully in view
      }
    )

    progressBarElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [isMobile, isLoaded]) // Re-run when mobile state or table content loads

  // Function to trigger cascading animation
  const handleSortChange = async () => {
    setIsAnimating(true)
    
    // Cards slide out animation
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Cards slide in animation with stagger
    setTimeout(() => setIsAnimating(false), 100)
  }

  // Function to handle opening drawer
  const handleDeploymentClick = (deployment: any) => {
    setSelectedDeployment(deployment)
    setDrawerOpen(true)
  }

  const deployments = [
    {
      id: 1,
      href: '#',
      projectName: 'Why We Prioritize',
      teamName: 'Product Team',
      status: 'online',
      statusText: 'Updated 30m ago',
      description: 'Shared rules for turning discovery into a focused plan.',
      environment: 'Production',
      riceScore: 92,
      drawerContent: {
        oneLiner: 'Focus beats volume. Prioritization turns a long wish list into the next best set of bets.',
        whyItMatters: 'Without rules, the roadmap drifts. Clear priorities reduce thrash, accelerate decisions, and keep us building what moves the metric.',
        whatWeDo: [
          'Set decision principles (customer value first, measurable outcomes, time-to-learning).',
          'Define a cadence (bi-weekly triage, monthly re-score, quarterly planning).',
          'Publish a single source backlog (opportunities, experiments, tech debt).',
          'Make trade-offs explicit (what we say "no" to, and why).'
        ],
        inputs: 'Persona & Journey insights • System constraints & quick wins • Competitive parity/differentiators • Business goals/OKRs.',
        deliverables: [
          'Prioritization policy (one page).',
          'Shared backlog taxonomy (Initiative → Epic → Opportunity/Story).',
          'Decision RACI & DRI.'
        ],
        signalsOfSuccess: [
          'Stakeholders can explain why top 10 items are top 10.',
          'Fewer reopen/pend requests after planning.',
          'Lead time from idea → decision shrinks.'
        ],
        tools: 'Notion/Confluence, Jira/Linear, FigJam/Miro.'
      }
    },
    {
      id: 2,
      href: '#',
      projectName: 'How We Prioritize (RICE + Risk)',
      teamName: 'Product Team, Data',
      status: 'online',
      statusText: 'Updated 1h ago',
      description: 'Scoring framework with thresholds, tie-breakers, and review cadence.',
      environment: 'Production',
      riceScore: 89,
      drawerContent: {
        oneLiner: 'Score what matters, then sanity-check with risk and constraints.',
        whyItMatters: 'A lightweight, transparent model prevents the loudest voice from setting the roadmap.',
        whatWeDo: [
          'Score each opportunity with RICE:',
          'Reach (people/week or /month)',
          'Impact (0.25 / 0.5 / 1 / 2 / 3) on the target metric',
          'Confidence (0–100%)',
          'Effort (person-weeks)',
          'Score = (Reach × Impact × Confidence) ÷ Effort',
          'Apply a Risk/Readiness modifier (+/− 10–20%) for dependency risk, compliance, or system limits.',
          'Normalize to 0–100 for display.',
          'Tie-breakers: strategic fit with OKRs, time-to-learning, and customer commitments.',
          'Re-score monthly; freeze scores one week before quarterly planning.'
        ],
        inputs: 'Event data & funnels • Research evidence & severity of friction • System constraints from Step 1 • Business commitments.',
        deliverables: [
          'RICE scorecard (Notion/Sheet) + thresholds (e.g., ship if ≥ 65).',
          'Comments log (assumptions behind Reach/Impact/Confidence).',
          '"Now / Next / Later" migration on the roadmap.'
        ],
        signalsOfSuccess: [
          'Scores correlate with post-ship outcomes (retention, activation, conversion).',
          'Less debate time; more execution time.',
          'New ideas get a decision within 10 business days.'
        ],
        tools: 'Amplitude/Mixpanel/GA4, Notion/Sheets, Jira/Linear.',
        sampleTemplate: 'Columns: ID • Title • Epic • Reach (units) • Impact (0.25–3) • Confidence (%) • Effort (pw) • Risk adj (%) • RICE (0–100) • DRI • Status.\nThresholds: Ship ≥65, Research/Refine 45–64, Archive <45.'
      }
    },
    {
      id: 3,
      href: '#',
      projectName: 'Opportunity Backlog (from Step 1)',
      teamName: 'Product Team, Design, Research',
      status: 'online',
      statusText: 'Updated 1h ago',
      description: 'Curated list of opportunities sourced from personas, journeys, system analysis, and competitive gaps.',
      environment: 'Production',
      riceScore: 87,
      drawerContent: {
        oneLiner: 'A single, deduped list of problems and bets sourced from discovery.',
        whyItMatters: 'Scattered ideas = duplicate effort. One backlog creates clarity and prevents lost insights.',
        whatWeDo: [
          'Convert research notes into opportunities (problem statements, evidence, metric).',
          'Merge duplicates; link to personas, journey stages, and competitive references.',
          'Attach preliminary RICE and owner.',
          'Flag dependencies (system, compliance, data gaps).'
        ],
        inputs: 'Persona/Journey frictions • Competitive gaps • Quick wins from System Analysis • Support tickets & sales notes.',
        deliverables: [
          'Opportunity register with tags: Persona, Journey Stage, Metric, Epic, Risk.',
          'Top 20 prioritized list with DRI and next step (design spike, data check, prototype, etc.).'
        ],
        signalsOfSuccess: [
          'No "ideas in the ether"—everything visible, tagged, and owned.',
          'Fewer one-off docs; more linked artifacts.'
        ],
        tools: 'Notion/Backlog tool, FigJam/Miro for mapping.'
      }
    },
    {
      id: 4,
      href: '#',
      projectName: 'Technical Debt Triage',
      teamName: 'Engineering',
      status: 'online',
      statusText: 'Updated 8h ago',
      description: 'Reliability, performance, and developer-velocity fixes ranked alongside features.',
      environment: 'Production',
      riceScore: 80,
      drawerContent: {
        oneLiner: 'Protect reliability and velocity by triaging debt alongside features.',
        whyItMatters: 'Invisible debt slows everything. Making it visible—and comparable—keeps the product fast and safe.',
        whatWeDo: [
          'Intake debt with severity (S1–S4) and blast radius.',
          'Score with ICE (Impact, Confidence, Effort) or WSJF where flow efficiency matters.',
          'Map to customer impact (perf, accessibility, reliability) and developer impact (build time, flake rate).',
          'Set SLAs for Sev-1/2; schedule recurring "debt sprints" or rolling capacity (e.g., 20%).'
        ],
        inputs: 'SLO/SLA breaches, performance traces, error budgets, developer feedback.',
        deliverables: [
          'Debt backlog with severity, score, owner, mitigation, and ETA.',
          'Quarterly "keep the lights fast" plan (perf, a11y, stability objectives).'
        ],
        signalsOfSuccess: [
          'P95 latency & error rates trend down.',
          'Build times and flaky test rate trend down.',
          'Fewer incidents tied to known debt.'
        ],
        tools: 'Jira/Linear, Sentry/New Relic, Lighthouse/PageSpeed, Playwright/Cypress CI.'
      }
    },
    {
      id: 5,
      href: '#',
      projectName: 'UX Research Insights Intake',
      teamName: 'Design',
      status: 'online',
      statusText: 'Updated 2d ago',
      description: 'Repeatable way to capture, de-duplicate, and convert insights into opportunities.',
      environment: 'Production',
      riceScore: 76,
      drawerContent: {
        oneLiner: 'A crisp path from observation → insight → opportunity.',
        whyItMatters: 'If insights don\'t enter the system, they don\'t shape the roadmap.',
        whatWeDo: [
          'Intake form: What we saw, where, who, evidence (clip/screenshot), suspected metric, severity.',
          'De-duplicate, tag to persona/journey stage, and link to existing opportunities.',
          'Weekly triage: convert to opportunity or archive with reason.',
          'Close loop with submitter.'
        ],
        inputs: 'Interviews, usability tests, analytics anomalies, support themes.',
        deliverables: [
          'Insight log, conversion rate to opportunities, top recurring themes.',
          '"Open questions" list to feed future research.'
        ],
        signalsOfSuccess: [
          'Time from insight → decision shrinks.',
          'Higher % of roadmap items traceable to user evidence.'
        ],
        tools: 'Typeform/Google Forms, Notion, Dovetail, Loom.'
      }
    },
  ]


  const statuses = {
    offline: 'text-zinc-500 bg-zinc-100/10 dark:text-zinc-400 dark:bg-zinc-400/10',
    online: 'text-emerald-500 bg-emerald-100/10 dark:text-emerald-400 dark:bg-emerald-400/10',
    error: 'text-rose-500 bg-rose-100/10 dark:text-rose-400 dark:bg-rose-400/10',
  }

  const environments = {
    Preview: 'text-zinc-400 bg-zinc-100/10 ring-zinc-400/20 dark:text-zinc-400 dark:bg-zinc-400/10 dark:ring-zinc-400/20',
    Production: 'text-emerald-600 bg-emerald-100/10 ring-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-400/10 dark:ring-emerald-400/30',
  }

  return (
    <div className="space-y-8">
      {/* Priority queue table - horizontal scroll like Step 4 */}
      <div>
        <ScrollableTable>
          <table className="w-full text-left min-w-[620px]">
            <colgroup>
              <col style={{ minWidth: '300px' }} />
              <col style={{ minWidth: '200px' }} />
              <col style={{ minWidth: '120px' }} />
            </colgroup>
            <thead className="border-b border-zinc-200 dark:border-zinc-700 text-sm/6 text-zinc-900 dark:text-white">
              <tr>
                <th scope="col" className="py-2 pr-8 pl-4 font-semibold sm:pl-6">
                  Project
                </th>
                <th scope="col" className="py-2 pr-8 pl-0 font-semibold">
                  Team
                </th>
                <th scope="col" className="py-2 pr-4 pl-0 font-semibold sm:pr-6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {deployments.map((deployment, index) => (
                <React.Fragment key={deployment.id}>
                  {/* Main content row */}
                  <tr 
                    className={`group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-500 ease-out cursor-pointer ${
                      isAnimating || !isLoaded
                        ? 'transform translate-y-12 opacity-0' 
                        : 'transform translate-y-0 opacity-100'
                    }`}
                    style={{
                      transitionDelay: isAnimating || !isLoaded ? '0ms' : `${index * 75}ms`
                    }}
                    onClick={() => handleDeploymentClick(deployment)}
                  >
                    {/* Project column */}
                    <td className="py-4 pr-8 pl-4 sm:pl-6" style={{ minWidth: '300px' }}>
                      <div className="flex items-start gap-x-3">
                        {/* Status indicator */}
                        <div className={`flex-none rounded-full p-1.5 mt-0.5 ${statuses[deployment.status as keyof typeof statuses]}`}>
                          <div className="size-2 rounded-full bg-current" />
                        </div>
                        
                        {/* Project content */}
                        <div className="flex-auto">
                          <div className="font-medium text-sm text-zinc-900 dark:text-white">{deployment.projectName}</div>
                          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{deployment.description}</div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{deployment.statusText}</div>
                        </div>
                        
                        {/* Arrow (visible on hover) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    
                    {/* Team column */}
                    <td className="py-4 pr-4 pl-0 sm:pr-8" style={{ minWidth: '200px' }}>
                      <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {deployment.teamName}
                      </span>
                    </td>
                    
                    {/* Status column */}
                    <td className="py-4 pr-4 pl-0 text-sm sm:pr-6" style={{ minWidth: '120px' }}>
                      <div
                        className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${environments[deployment.environment as keyof typeof environments]}`}
                      >
                        {deployment.environment}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Progress bar sub-row - spans full width */}
                  <tr className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td colSpan={3} className="pb-4 px-6" style={{ paddingTop: '0px' }}>
                      <div 
                        data-progress-bar={index}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Priority Score</span>
                          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{deployment.riceScore}/100</span>
                        </div>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 shadow-inner">
                          <div 
                            className={`h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm ${getProgressColor(deployment.riceScore, deployment.projectName)}`}
                            style={{
                              width: (isLoaded && visibleProgressBars.has(index)) ? `${deployment.riceScore}%` : '0%',
                              transitionDelay: visibleProgressBars.has(index) ? `${index * 100}ms` : '0ms',
                              ...(deployment.riceScore >= 90 && visibleProgressBars.has(index) && {
                                animation: 'progress-glow-pulse 4s ease-in-out infinite'
                              })
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </ScrollableTable>
      </div>

      {/* Side Drawer */}
      <ComponentDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={selectedDeployment?.projectName || 'Project Details'}
        enableComments={true}
        itemId={selectedDeployment?.projectName?.toLowerCase().replace(/\s+/g, '-')}
      >
        {selectedDeployment && selectedDeployment.drawerContent && (
          <div className="space-y-8">
            {/* One-liner */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                {selectedDeployment.projectName}
              </h3>
              <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                {selectedDeployment.drawerContent.oneLiner}
              </p>
            </div>

            {/* Why it matters */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
              <h4 className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-3">Why it matters</h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                {selectedDeployment.drawerContent.whyItMatters}
              </p>
            </div>

            {/* What we do */}
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">What we do</h4>
              <ul className="space-y-2">
                {selectedDeployment.drawerContent.whatWeDo.map((item: string, index: number) => (
                  <li key={index} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Inputs */}
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Inputs</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {selectedDeployment.drawerContent.inputs}
              </p>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Deliverables</h4>
              <ul className="space-y-2">
                {selectedDeployment.drawerContent.deliverables.map((item: string, index: number) => (
                  <li key={index} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signals of success */}
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Signals of success</h4>
              <ul className="space-y-2">
                {selectedDeployment.drawerContent.signalsOfSuccess.map((item: string, index: number) => (
                  <li key={index} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Tools</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {selectedDeployment.drawerContent.tools}
              </p>
            </div>

            {/* Sample/Template (if available) */}
            {selectedDeployment.drawerContent.sampleTemplate && (
              <div>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Sample / Template</h4>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                  <pre className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap font-mono">
                    {selectedDeployment.drawerContent.sampleTemplate}
                  </pre>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Team:</span>
                  <span className="ml-2 text-zinc-600 dark:text-zinc-400">{selectedDeployment.teamName}</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Status:</span>
                  <span className="ml-2 text-zinc-600 dark:text-zinc-400">{selectedDeployment.environment}</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Priority Score:</span>
                  <span className="ml-2 text-zinc-600 dark:text-zinc-400">{selectedDeployment.riceScore}/100</span>
                </div>
                <div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Updated:</span>
                  <span className="ml-2 text-zinc-600 dark:text-zinc-400">{selectedDeployment.statusText}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </ComponentDrawer>
    </div>
  )
}

// IAFlowsPanel component moved to separate file for better organization
// Now using the imported component

function RoadmapPanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800">
        {/* Icon */}
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
            Coming Next: Roadmap & Alignment
          </h2>
          <p className="text-base text-emerald-800 dark:text-emerald-200 leading-relaxed">
            Visual roadmap components and alignment checklist tools are in development. This panel will include timeline views, stakeholder alignment matrices, and dependency tracking.
          </p>
          
          {/* Feature Preview */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
              Planned Features:
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Interactive timeline visualization
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Stakeholder alignment checklist
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Dependency mapping tools
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                Resource allocation views
              </li>
            </ul>
          </div>
        </div>
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
            className="flex gap-x-6 px-4 text-sm/6 font-semibold text-zinc-600 dark:text-zinc-400 sm:px-6"
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
          <div className="mt-4">
            <ScrollableTable>
              <table className="w-full text-left min-w-[800px]">
              <colgroup>
                <col style={{ minWidth: '200px' }} />
                <col style={{ minWidth: '150px' }} />
                <col style={{ minWidth: '120px' }} />
                <col style={{ minWidth: '120px' }} />
                <col style={{ minWidth: '100px' }} />
              </colgroup>
              <thead className="border-b border-zinc-200 dark:border-zinc-700 text-sm/6 text-zinc-900 dark:text-white">
                <tr>
                  <th scope="col" className="py-2 pr-8 pl-4 font-semibold sm:pl-6">
                    Task
                  </th>
                  <th scope="col" className="py-2 pr-8 pl-0 font-semibold">
                    Area
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 font-semibold">
                    Owner
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="py-2 pr-8 pl-0 font-semibold">
                    Severity
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 text-right font-semibold sm:pr-6">
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
                    <td className="py-4 pr-8 pl-0 text-sm">
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
                    <td className="py-4 pr-8 pl-0 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(task.severity)}`}>
                        {task.severity}
                      </span>
                    </td>
                    <td className="py-4 pr-4 pl-0 text-right text-sm text-zinc-500 dark:text-zinc-400 sm:pr-6">
                      {task.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </ScrollableTable>
          </div>
        </div>
      </div>
      
      {/* How I Support Implementation accordions */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">How I Support Implementation</h3>
        <AccordionPanel items={accordionItems} />
        
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
    
    // Update URL without causing a jump
    window.history.replaceState(null, '', `#step-${stepId}`)
    
    // Maintain scroll position by scrolling to top smoothly
    window.scrollTo({ top: 0, behavior: 'instant' })
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