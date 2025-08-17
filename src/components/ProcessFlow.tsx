'use client'

import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react'
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
import { WhyWePrioritize } from '@/app/process/(components)/drawers/WhyWePrioritize'
import { HowWePrioritize } from '@/app/process/(components)/drawers/HowWePrioritize'
import { OpportunityBacklog } from '@/app/process/(components)/drawers/OpportunityBacklog'
import { TechnicalDebtTriage } from '@/app/process/(components)/drawers/TechnicalDebtTriage'
import { UXResearchInsightsIntake } from '@/app/process/(components)/drawers/UXResearchInsightsIntake'
import { Wireframes } from '@/app/process/(components)/drawers/Wireframes'
import { ClickablePrototypes } from '@/app/process/(components)/drawers/ClickablePrototypes'
import { DesignSystems } from '@/app/process/(components)/drawers/DesignSystems'
import { SprintPlanningBacklogGrooming } from '@/app/process/(components)/drawers/SprintPlanningBacklogGrooming'
import { ReleasePlanningCutCandidate } from '@/app/process/(components)/drawers/ReleasePlanningCutCandidate'
import { DevHandoffPackages } from '@/app/process/(components)/drawers/DevHandoffPackages'
import { StakeholderDemosAcceptance } from '@/app/process/(components)/drawers/StakeholderDemosAcceptance'
import { DailyDesignQA } from '@/app/process/(components)/drawers/DailyDesignQA'
import { FigmaProductParityAudit } from '@/app/process/(components)/drawers/FigmaProductParityAudit'
import { AccessibilityPerformanceQA } from '@/app/process/(components)/drawers/AccessibilityPerformanceQA'
import { AnalyticsEventsTrackingSpec } from '@/app/process/(components)/drawers/AnalyticsEventsTrackingSpec'
import { CrossFunctionalRiskAssessment } from '@/app/process/(components)/drawers/CrossFunctionalRiskAssessment'
import { ReleaseReadinessReview } from '@/app/process/(components)/drawers/ReleaseReadinessReview'
import { IncidentRollbackPlan } from '@/app/process/(components)/drawers/IncidentRollbackPlan'
import { PostReleaseMonitoringBugSmash } from '@/app/process/(components)/drawers/PostReleaseMonitoringBugSmash'
import { InstrumentationDrawer } from '@/app/process/(components)/drawers/InstrumentationDrawer'
import { ExperimentationDrawer } from '@/app/process/(components)/drawers/ExperimentationDrawer'
import { PerformanceQualityDrawer } from '@/app/process/(components)/drawers/PerformanceQualityDrawer'
import { ContinuousImprovementDrawer } from '@/app/process/(components)/drawers/ContinuousImprovementDrawer'
import { IAFlowsPanel } from '@/components/IAFlowsPanel'
import { PMDashboard } from '@/components/PMDashboard'
import { AccordionPanel } from '@/components/AccordionPanel'
import { ProcessCard } from '@/components/ProcessCard'
import { ProcessTabRow } from '@/components/ProcessTabRow'
import { ScrollableTable } from '@/components/ui/ScrollableTable'
import { TeamTag } from '@/components/ui/TeamTag'
import { StatusBadge } from '@/components/ui/StatusBadge'
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
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import { ClipboardIcon } from '@/components/icons/ClipboardIcon'
import { PackageIcon } from '@/components/icons/PackageIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'
import { GridPattern } from '@/components/GridPattern'
import { standardizedSkills, getSkillById } from '@/data/standardizedSkills'

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

// For static content drawers (excludes Step 3 which uses dedicated components)
type StaticDrawerKey = 
  | 'stakeholder-alignment' 
  | 'persona-journey-mapping' 
  | 'competitive-analysis' 
  | 'system-analysis'
  | 'instrumentation' 
  | 'experimentation' 
  | 'performance-quality' 
  | 'continuous-improvement'

type DrawerContentMap = Record<StaticDrawerKey, DrawerEntry>

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

// Helper function to determine if a card should be highlighted
const isCardHighlighted = (cardSlug: string, highlightedSkillId: string | null, currentStepId: number): boolean => {
  if (!highlightedSkillId) return false
  
  const skill = getSkillById(highlightedSkillId)
  if (!skill || !skill.processSteps || !skill.processSteps.includes(currentStepId)) {
    return false
  }
  
  // Map standardized skill IDs to card slugs for each step
  const skillToCardMapping: Record<string, Record<string, string[]>> = {
    '1': { // Discovery & Strategy
      'stakeholder-alignment': ['stakeholder-management', 'communication'],
      'persona-journey-mapping': ['user-research', 'design-thinking'],
      'competitive-analysis': ['competitive-analysis', 'market-research-analysis'],
      'system-analysis': ['systems-architecture', 'technical-feasibility-analysis']
    },
    '3': { // Design & Prototyping
      'wireframes': ['prototyping-wireframing', 'ux-design-principles'],
      'clickable-prototypes': ['prototyping-wireframing', 'usability-testing'],
      'design-systems': ['ux-design-principles', 'systems-architecture']
    },
    '5': { // Launch & Optimization
      'instrumentation': ['data-analytics-metrics', 'ab-testing-experimentation'],
      'experimentation': ['ab-testing-experimentation', 'data-driven-decision-making'],
      'performance-quality': ['technical-feasibility-analysis', 'usability-testing'],
      'continuous-improvement': ['iterative-development', 'data-driven-decision-making']
    }
  }
  
  const stepMapping = skillToCardMapping[currentStepId.toString()]
  if (!stepMapping) return false
  
  const cardSkills = stepMapping[cardSlug]
  return cardSkills ? cardSkills.includes(highlightedSkillId) : false
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
    name: 'Launch & Optimization',
    title: 'Launch & Optimization', 
    description: 'After launch, we measure, learn, and iterate – using data and experiments to keep moving the needle.',
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
• Lightweight personas (needs, contexts, Jobs-to-be-done)
• End-to-end journey with key moments and drop-offs
• Pain-point heatmap tied to experiment ideas

**Outputs & artifacts**
• Personas (goals, contexts, constraints)
• Journey map with stages, emotions, and per-stage measures
• Jobs-to-be-done statements and opportunity backlog

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
  
  // Step 3 - Design & Prototyping (now using dedicated components)
  
  // Step 5 - Launch & Optimization
  'instrumentation': {
    overview: `## Instrumentation & Analytics
**One-liner:** Measure what matters from day one.

**Why it matters**
Without proper instrumentation, we're flying blind. Analytics reveal where users encounter friction, enabling data-driven improvements that directly impact conversion and satisfaction. Clean events and dashboards let the team see cause → effect quickly.

**What we do**
• Define success metrics tied to user outcomes and business goals
• Wire up comprehensive event tracking (page views, clicks, conversions)
• Build analytics funnels to identify drop-off points
• Create real-time dashboards for key user actions and outcomes
• Implement user session recordings and heatmaps for behavior visualization
• Set up automated alerts for metric degradation

**Outputs & artifacts**
• Tracking plan with event taxonomy
• Analytics dashboards (Google Analytics, Mixpanel)
• Funnel analysis reports
• User flow visualizations
• Performance baselines

**Signals of success**
• Clear baselines established within first week
• <2% data discrepancy rate
• Daily dashboard usage by team
• Actionable insights driving iterations`,
    whyItMatters: { 
      stat: 'Clear baselines, reliable trend lines', 
      text: 'Analytics reveal where users encounter friction, enabling data-driven improvements that directly impact conversion.' 
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
    overview: `## Experimentation (A/B Testing)
**One-liner:** Learn fast, ship what works.

**Why it matters**
Instead of making big guesses, we run controlled experiments to validate improvements. A/B testing de-risks decisions by showing which version performs better on metrics like conversion or task success, ensuring we invest effort where it returns measurable value.

**What we do**
• Design small, falsifiable tests with clear hypotheses
• Calculate proper sample sizes and statistical power
• Set up controlled A/B tests and feature rollouts
• Define success criteria and guardrail metrics
• Monitor experiments in real-time for early signals
• Analyze results with statistical significance testing
• Make data-driven decisions on feature rollouts

**Outputs & artifacts**
• Experiment briefs with hypothesis and success criteria
• A/B test configurations (Optimizely, LaunchDarkly)
• Statistical analysis and readout reports
• Decision recommendations with confidence intervals
• Winning variation implementation guides

**Signals of success**
• >80% of major feature decisions backed by experiments
• Statistically significant results (p<0.05)
• Average 15% improvement in tested metrics
• Reduced rollback rate due to data validation`,
    whyItMatters: { 
      stat: 'Statistically valid wins; fewer "maybe" launches', 
      text: 'A/B testing de-risks decisions by showing which version performs better, ensuring we invest effort where it returns value.' 
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
    overview: `## Continuous Improvement & Iteration
**One-liner:** Close the loop and keep momentum.

**Why it matters**
Launch is just the beginning. Continuous improvement means your product never stops getting better. We systematically collect user feedback, analyze performance data, and turn insights into a prioritized backlog of enhancements that keep moving the needle.

**What we do**
• Collect user feedback through surveys, support tickets, and reviews
• Conduct quarterly usability testing with real users
• Analyze analytics data for patterns and friction points
• Maintain a prioritized improvement backlog using RICE scoring
• Plan and execute regular enhancement sprints
• Track improvement impact with before/after metrics
• Hold retrospectives to identify process optimizations

**Outputs & artifacts**
• User feedback analysis reports
• Usability testing findings and recordings
• RICE-prioritized enhancement backlog
• Post-launch improvement reports
• Regular release notes documenting changes
• Performance impact assessments

**Signals of success**
• Quarterly NPS improvement (+5 points per quarter target)
• 95% of user-reported issues addressed within 2 sprints
• Consistent velocity in shipping improvements
• Measurable impact from each enhancement cycle`,
    whyItMatters: { 
      stat: 'Steady measure lift; fewer regressions', 
      text: 'Systematic feedback collection and iteration ensure the product continuously improves and user needs stay met.' 
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
    overview: `## Performance & Quality Monitoring
**One-liner:** Speed, accessibility, and stability are UX; we monitor and harden them continuously.

**Why it matters**
Performance is UX. Users abandon slow sites within 3 seconds, and accessibility gaps exclude users entirely. We treat speed and stability as features, actively tracking Core Web Vitals, error rates, and uptime to ensure a high-quality experience for everyone.

**What we do**
• Set and enforce performance budgets in CI/CD pipelines
• Monitor Core Web Vitals (LCP, FID, CLS) in real-time
• Track error rates, crash reports, and API response times
• Run automated accessibility testing (WCAG AA compliance)
• Set up alerting for performance degradation
• Implement quality gates that prevent slow code from shipping
• Conduct regular performance audits and optimizations

**Outputs & artifacts**
• Performance monitoring dashboards (New Relic, DataDog)
• CI quality gates and performance budgets
• Accessibility audit reports and remediation plans
• Error tracking and incident response logs
• Load testing results and capacity planning
• Performance optimization recommendations

**Signals of success**
• ≥95% of pages meet Core Web Vitals thresholds
• <1% error rate across all user interactions
• WCAG AA compliance maintained
• Zero performance regressions reach production`,
    whyItMatters: { 
      stat: '≥95% Core Web Vitals pass, <1% error rate', 
      text: 'Users abandon slow sites within 3 seconds - we proactively monitor speed, stability, and accessibility to ensure quality.' 
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
  onDrawerClose,
  highlightedSkillId
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
  highlightedSkillId: string | null
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
          highlightedSkillId={highlightedSkillId}
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
          highlightedSkillId={highlightedSkillId}
        />
      case 4:
        return <Step4Layout 
          step={step} 
          selectedDrawer={selectedDrawer}
          isDrawerOpen={isDrawerOpen}
          onCardClick={onCardClick}
          onDrawerClose={onDrawerClose}
        />
      case 5:
        return <Step5Layout 
          step={step} 
          selectedDrawer={selectedDrawer}
          isDrawerOpen={isDrawerOpen}
          onCardClick={onCardClick}
          onDrawerClose={onDrawerClose}
          highlightedSkillId={highlightedSkillId}
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
  onDrawerClose,
  highlightedSkillId
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
  highlightedSkillId: string | null
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
      title: 'Personas',
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
            isHighlighted={isCardHighlighted(card.slug, highlightedSkillId, step.id)}
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
            enableComments={true}
          >
            <StakeholderAlignment onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : selectedDrawer === 'persona-journey-mapping' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Personas"
            enableComments={true}
          >
            <PersonaJourneyMapping onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : selectedDrawer === 'competitive-analysis' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Competitive Analysis"
            enableComments={true}
          >
            <CompetitiveAnalysis onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : selectedDrawer === 'system-analysis' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="System Analysis"
            enableComments={true}
          >
            <SystemAnalysis onClose={onDrawerClose} />
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Function to determine status based on progress score
  const getStatusFromScore = (score: number): 'Draft' | 'In Review' | 'Approved' => {
    if (score >= 85) return 'Approved'
    if (score >= 50) return 'In Review'
    return 'Draft'
  }

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
  
  const deployments = useMemo(() => [
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
      drawerComponent: WhyWePrioritize,
      itemId: 'why-we-prioritize'
    },
    {
      id: 2,
      href: '#',
      projectName: 'How We Prioritize',
      teamName: 'Product Team, Data',
      status: 'online',
      statusText: 'Updated 1h ago',
      description: 'Scoring framework with thresholds, tie-breakers, and review cadence.',
      environment: 'Production',
      riceScore: 89,
      drawerComponent: HowWePrioritize,
      itemId: 'how-we-prioritize'
    },
    {
      id: 3,
      href: '#',
      projectName: 'Opportunity Backlog',
      teamName: 'Product Team, Design, Research',
      status: 'online',
      statusText: 'Updated 1h ago',
      description: 'Curated list of opportunities sourced from personas, journeys, system analysis, and competitive gaps.',
      environment: 'Production',
      riceScore: 82,
      drawerComponent: OpportunityBacklog,
      itemId: 'opportunity-backlog'
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
      riceScore: 72,
      drawerComponent: TechnicalDebtTriage,
      itemId: 'technical-debt-triage'
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
      riceScore: 42,
      drawerComponent: UXResearchInsightsIntake,
      itemId: 'ux-research-insights-intake'
    },
  ], [])

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
            <tbody>
              {deployments.map((deployment, index) => (
                <React.Fragment key={deployment.id}>
                  {/* Main content row */}
                  <tr 
                    data-deployment-index={index}
                    className={`deployment-row-main cursor-pointer transition-transform transition-opacity duration-200 ease-out ${hoveredIndex === index ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''} ${
                      isAnimating || !isLoaded
                        ? 'transform translate-y-12 opacity-0' 
                        : 'transform translate-y-0 opacity-100'
                    }`}
                    style={{
                      transitionDelay: isAnimating || !isLoaded ? '0ms' : `${index * 75}ms`
                    }}
                    onClick={() => handleDeploymentClick(deployment)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
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
                        
                      </div>
                    </td>
                    
                    {/* Team column */}
                    <td className="py-4 pr-4 pl-0 sm:pr-8" style={{ minWidth: '200px' }}>
                      <div className="flex flex-wrap gap-1">
                        {deployment.teamName.split(', ').map((team: string, index: number) => {
                          // Map team names to our standardized TeamTag component
                          const teamName = team.trim() as 'Engineering' | 'Product Team' | 'Design' | 'QA' | 'Data' | 'Research';
                          return (
                            <TeamTag key={index} team={teamName} />
                          );
                        })}
                      </div>
                    </td>
                    
                    {/* Status column */}
                    <td className="py-4 pr-4 pl-0 text-sm sm:pr-6" style={{ minWidth: '120px' }}>
                      <StatusBadge 
                        status={getStatusFromScore(deployment.riceScore)} 
                      />
                    </td>
                  </tr>
                  
                  {/* Progress bar sub-row - spans full width */}
                  <tr 
                    data-deployment-index={index}
                    className={`deployment-row-progress cursor-pointer transition-transform transition-opacity duration-200 ease-out border-b border-zinc-200 dark:border-zinc-700 ${hoveredIndex === index ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''} ${
                      isAnimating || !isLoaded
                        ? 'transform translate-y-12 opacity-0' 
                        : 'transform translate-y-0 opacity-100'
                    }`}
                    style={{
                      transitionDelay: isAnimating || !isLoaded ? '0ms' : `${index * 75}ms`
                    }}
                    onClick={() => handleDeploymentClick(deployment)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <td colSpan={3} className="pb-4 px-6" style={{ paddingTop: '0px' }}>
                      <div 
                        data-progress-bar={index}
                        className="hover:bg-zinc-50/30 dark:hover:bg-zinc-800/30 -m-2 p-2 rounded transition-colors duration-200 ease-out"
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
        itemId={selectedDeployment?.itemId}
      >
        {selectedDeployment?.drawerComponent && (
          <selectedDeployment.drawerComponent onClose={() => setDrawerOpen(false)} />
        )}
        {false && selectedDeployment && selectedDeployment.drawerContent && (
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

// Step 3: Interactive card gallery with component drawer
function Step3Layout({ 
  step, 
  selectedDrawer, 
  isDrawerOpen, 
  onCardClick, 
  onDrawerClose,
  highlightedSkillId
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
  highlightedSkillId: string | null
}) {
  const cards: ProcessCard[] = [
    {
      title: 'Wireframes',
      slug: 'wireframes',
      subtitle: 'Structure before polish—fast frames answer "what goes where and why."',
      icon: DocumentIcon,
      pattern: { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Clickable Prototypes',
      slug: 'clickable-prototypes',
      subtitle: 'Make the idea testable in days—click through the real flow, not a slide deck.',
      icon: CursorClickIcon,
      pattern: { y: -6, squares: [[-1, 2], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Design Systems',
      slug: 'design-systems',
      subtitle: 'Reusable parts, shared rules—ship faster with consistent, accessible UI.',
      icon: ShapesIcon,
      pattern: { y: 32, squares: [[0, 2], [1, 4]] as Array<[number, number]> }
    }
  ]

  // Render the appropriate drawer component
  const renderDrawerContent = () => {
    switch (selectedDrawer) {
      case 'wireframes':
        return <Wireframes onClose={onDrawerClose} />
      case 'clickable-prototypes':
        return <ClickablePrototypes onClose={onDrawerClose} />
      case 'design-systems':
        return <DesignSystems onClose={onDrawerClose} />
      // Step 4: Plan tab drawers
      case 'sprint-planning-backlog-grooming':
        return <SprintPlanningBacklogGrooming onClose={onDrawerClose} />
      case 'release-planning-cut-candidate':
        return <ReleasePlanningCutCandidate onClose={onDrawerClose} />
      case 'dev-handoff-packages':
        return <DevHandoffPackages onClose={onDrawerClose} />
      case 'stakeholder-demos-acceptance':
        return <StakeholderDemosAcceptance onClose={onDrawerClose} />
      // Step 4: Build tab drawers
      case 'daily-design-qa':
        return <DailyDesignQA onClose={onDrawerClose} />
      case 'figma-product-parity-audit':
        return <FigmaProductParityAudit onClose={onDrawerClose} />
      case 'accessibility-performance-qa':
        return <AccessibilityPerformanceQA onClose={onDrawerClose} />
      case 'analytics-events-tracking-spec':
        return <AnalyticsEventsTrackingSpec onClose={onDrawerClose} />
      // Step 4: Ship tab drawers
      case 'cross-functional-risk-assessment':
        return <CrossFunctionalRiskAssessment onClose={onDrawerClose} />
      case 'release-readiness-review':
        return <ReleaseReadinessReview onClose={onDrawerClose} />
      case 'incident-rollback-plan':
        return <IncidentRollbackPlan onClose={onDrawerClose} />
      case 'post-release-monitoring-bug-smash':
        return <PostReleaseMonitoringBugSmash onClose={onDrawerClose} />
      default:
        return null
    }
  }

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
            isHighlighted={isCardHighlighted(card.slug, highlightedSkillId, step.id)}
          />
        ))}
      </div>

      {/* Component Drawer */}
      {isDrawerOpen && selectedDrawer && (
        <ComponentDrawer
          open={isDrawerOpen}
          onClose={onDrawerClose}
          title={selectedDrawer ? slugToTitle(selectedDrawer) : ''}
        >
          {renderDrawerContent()}
        </ComponentDrawer>
      )}
    </div>
  )
}

// Step 4: Implementation Support Dashboard
function Step4Layout({ 
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
  const [activeTab, setActiveTab] = useState('Plan')
  
  const tabs = ['Plan', 'Build', 'Ship']
  
  // Main KPIs (updated for new workflow)
  const mainKPIs = [
    {
      name: 'Release readiness',
      value: '92%',
      trend: '↗ +5pp',
      target: '≥90%',
      tooltip: 'Percentage of planned items completed and ready for release.'
    },
    {
      name: 'Implementation velocity', 
      value: '12',
      trend: '↗ +2',
      target: '≥10',
      tooltip: 'Average implementation items completed per sprint.'
    },
    {
      name: 'Quality score',
      value: '96%',
      trend: '—',
      target: '≥95%',
      tooltip: 'Combined score across design QA, accessibility, and performance metrics.'
    }
  ]
  
  // Header indicators (secondary data)
  const statusIndicators = {
    releaseConfidence: 92,
    riskLevel: { high: 1, medium: 3 }
  }
  
  // Implementation items organized by tab
  const implementationItems = {
    Plan: [
      {
        id: 1,
        title: 'Sprint Planning & Backlog Grooming',
        slug: 'sprint-planning-backlog-grooming',
        area: 'Planning',
        description: 'Clear priorities beat long wish lists.',
        status: 'Active',
        priority: 'P1',
        updated: '2h ago'
      },
      {
        id: 2,
        title: 'Release Planning & Cut Candidate',
        slug: 'release-planning-cut-candidate',
        area: 'Planning',
        description: 'Know what you&apos;re building. Ship what you planned.',
        status: 'Active',
        priority: 'P1',
        updated: '1d ago'
      },
      {
        id: 3,
        title: 'Dev Handoff & Packages',
        slug: 'dev-handoff-packages',
        area: 'Coordination',
        description: 'Bundle context so engineers can execute with confidence.',
        status: 'In Review',
        priority: 'P2',
        updated: '3h ago'
      },
      {
        id: 4,
        title: 'Stakeholder Demos & Acceptance',
        slug: 'stakeholder-demos-acceptance',
        area: 'Communication',
        description: 'Demo to build trust, not to surprise.',
        status: 'Scheduled',
        priority: 'P1',
        updated: '5h ago'
      }
    ],
    Build: [
      {
        id: 5,
        title: 'Daily Design QA',
        slug: 'daily-design-qa',
        area: 'Quality',
        description: 'Ship quality as a habit, not a finale.',
        status: 'Active',
        priority: 'P1',
        updated: '1h ago'
      },
      {
        id: 6,
        title: 'Figma → Prod Parity Audit',
        slug: 'figma-product-parity-audit',
        area: 'Design Systems',
        description: 'One system, one look—no "almosts."',
        status: 'In Progress',
        priority: 'P2',
        updated: '4h ago'
      },
      {
        id: 7,
        title: 'Accessibility & Performance QA',
        slug: 'accessibility-performance-qa',
        area: 'Quality',
        description: 'Fast, inclusive experiences help everyone.',
        status: 'Active',
        priority: 'P1',
        updated: '2h ago'
      },
      {
        id: 8,
        title: 'Analytics Events & Tracking Spec',
        slug: 'analytics-events-tracking-spec',
        area: 'Measurement',
        description: 'If we can&apos;t measure it, we can&apos;t know it worked.',
        status: 'In Review',
        priority: 'P2',
        updated: '1d ago'
      }
    ],
    Ship: [
      {
        id: 9,
        title: 'Cross-Functional Risk Assessment',
        slug: 'cross-functional-risk-assessment',
        area: 'Risk Management',
        description: 'Find the icebergs before they sink the ship.',
        status: 'Pending',
        priority: 'P1',
        updated: '6h ago'
      },
      {
        id: 10,
        title: 'Release Readiness Review',
        slug: 'release-readiness-review',
        area: 'Validation',
        description: 'The final check before the world sees your work.',
        status: 'Scheduled',
        priority: 'P1',
        updated: '8h ago'
      },
      {
        id: 11,
        title: 'Incident & Rollback Plan',
        slug: 'incident-rollback-plan',
        area: 'Risk Management',
        description: 'Hope for the best, plan for the worst.',
        status: 'In Progress',
        priority: 'P2',
        updated: '1d ago'
      },
      {
        id: 12,
        title: 'Post-Release Monitoring & Bug Smash',
        slug: 'post-release-monitoring-bug-smash',
        area: 'Monitoring',
        description: 'Stay close to the data. Stay closer to the users.',
        status: 'Planned',
        priority: 'P2',
        updated: '2d ago'
      }
    ]
  }

  const accordionItems = [
    {
      title: 'Plan: Setting up for success',
      content: 'Strategic planning and coordination activities that ensure teams have clear priorities, well-defined requirements, and aligned expectations before implementation begins.'
    },
    {
      title: 'Build: Quality throughout the process',
      content: 'Continuous quality assurance and systematic validation that maintains design integrity, accessibility standards, and performance benchmarks during active development.'
    },
    {
      title: 'Ship: Confident delivery',
      content: 'Risk assessment, readiness validation, and monitoring setup that enables confident releases with proper fallback plans and post-launch support systems.'
    }
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'In Review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'Pending':
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
      case 'Planned':
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
    }
  }
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const currentItems = implementationItems[activeTab as keyof typeof implementationItems]

  // Convert slug to title
  const slugToTitle = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Render the appropriate drawer component
  const renderDrawerContent = () => {
    switch (selectedDrawer) {
      // Step 4: Plan tab drawers
      case 'sprint-planning-backlog-grooming':
        return <SprintPlanningBacklogGrooming onClose={onDrawerClose} />
      case 'release-planning-cut-candidate':
        return <ReleasePlanningCutCandidate onClose={onDrawerClose} />
      case 'dev-handoff-packages':
        return <DevHandoffPackages onClose={onDrawerClose} />
      case 'stakeholder-demos-acceptance':
        return <StakeholderDemosAcceptance onClose={onDrawerClose} />
      // Step 4: Build tab drawers
      case 'daily-design-qa':
        return <DailyDesignQA onClose={onDrawerClose} />
      case 'figma-product-parity-audit':
        return <FigmaProductParityAudit onClose={onDrawerClose} />
      case 'accessibility-performance-qa':
        return <AccessibilityPerformanceQA onClose={onDrawerClose} />
      case 'analytics-events-tracking-spec':
        return <AnalyticsEventsTrackingSpec onClose={onDrawerClose} />
      // Step 4: Ship tab drawers
      case 'cross-functional-risk-assessment':
        return <CrossFunctionalRiskAssessment onClose={onDrawerClose} />
      case 'release-readiness-review':
        return <ReleaseReadinessReview onClose={onDrawerClose} />
      case 'incident-rollback-plan':
        return <IncidentRollbackPlan onClose={onDrawerClose} />
      case 'post-release-monitoring-bug-smash':
        return <PostReleaseMonitoringBugSmash onClose={onDrawerClose} />
      default:
        return null
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
                <span className="font-semibold text-zinc-900 dark:text-white">Implementation Support · {activeTab}</span>
              </h1>
            </div>
            <p className="mt-2 text-xs/6 text-zinc-500 dark:text-zinc-400">Active workflow · {currentItems.length} items</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className={`order-first flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset sm:order-0 ${
              statusIndicators.releaseConfidence >= 90 
                ? 'bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/30' 
                : 'bg-zinc-400/10 text-zinc-600 dark:text-zinc-400 ring-zinc-500/30'
            }`}>
              Release confidence: {statusIndicators.releaseConfidence}/100
            </div>
            <div className={`flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              statusIndicators.riskLevel.high > 0 
                ? 'bg-orange-400/10 text-orange-600 dark:text-orange-400 ring-orange-500/30'
                : 'bg-blue-400/10 text-blue-600 dark:text-blue-400 ring-blue-500/30'
            }`}>
              Risks: High:{statusIndicators.riskLevel.high}·Med:{statusIndicators.riskLevel.medium}
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

        {/* Implementation items list */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
          <h2 className="px-4 text-base/7 font-semibold text-zinc-900 dark:text-white sm:px-6">{activeTab} items</h2>
          <div className="mt-4">
            <ScrollableTable>
              <table className="w-full text-left min-w-[800px]">
              <colgroup>
                <col style={{ minWidth: '200px' }} />
                <col style={{ minWidth: '150px' }} />
                <col style={{ minWidth: '250px' }} />
                <col style={{ minWidth: '120px' }} />
                <col style={{ minWidth: '100px' }} />
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
                    Description
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="py-2 pr-8 pl-0 font-semibold">
                    Priority
                  </th>
                  <th scope="col" className="py-2 pr-4 pl-0 text-right font-semibold sm:pr-6">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {currentItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-150 cursor-pointer"
                    onClick={() => onCardClick(item.slug)}
                  >
                    <td className="py-4 pr-8 pl-4 sm:pl-6">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-zinc-900 dark:text-white">{item.title}</div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-8 pl-0 text-sm">
                      <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/10">
                        {item.area}
                      </span>
                    </td>
                    <td className="py-4 pr-4 pl-0 text-sm text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </td>
                    <td className="py-4 pr-4 pl-0 text-sm">
                      <div className="flex items-center gap-x-2">
                        <div className={`flex-none rounded-full p-1 ${
                          item.status === 'Active' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10' :
                          item.status === 'In Progress' ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-400/10' :
                          item.status === 'In Review' ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-400/10' :
                          item.status === 'Scheduled' ? 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-400/10' :
                          'text-zinc-600 bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-400/10'
                        }`}>
                          <div className="size-1.5 rounded-full bg-current" />
                        </div>
                        <div className="text-zinc-900 dark:text-white">{item.status}</div>
                      </div>
                    </td>
                    <td className="py-4 pr-8 pl-0 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-4 pr-4 pl-0 text-right text-sm text-zinc-500 dark:text-zinc-400 sm:pr-6">
                      {item.updated}
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

      {/* Component Drawer */}
      {isDrawerOpen && selectedDrawer && (
        <ComponentDrawer
          open={isDrawerOpen}
          onClose={onDrawerClose}
          title={selectedDrawer ? slugToTitle(selectedDrawer) : ''}
        >
          {renderDrawerContent()}
        </ComponentDrawer>
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
  onDrawerClose,
  highlightedSkillId
}: { 
  step: ProcessStep
  selectedDrawer: string | null
  isDrawerOpen: boolean
  onCardClick: (slug: string) => void
  onDrawerClose: () => void
  highlightedSkillId: string | null
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
      subtitle: 'Run small experiments (A/B tests) to learn what works and de-risk big decisions.',
      icon: FlaskIcon,
      pattern: { y: -6, squares: [[-1, 2], [1, 3]] as Array<[number, number]> }
    },
    {
      title: 'Performance & Quality',
      slug: 'performance-quality',
      subtitle: 'Continuously monitor speed, stability, and accessibility to ensure high quality.',
      icon: BoltIcon,
      pattern: { y: 8, squares: [[1, 2], [2, 4]] as Array<[number, number]> }
    },
    {
      title: 'Continuous Improvement',
      slug: 'continuous-improvement',
      subtitle: 'Turn user insights into a prioritized backlog – refine and ship updates weekly.',
      icon: ArrowPathIcon,
      pattern: { y: 32, squares: [[0, 2], [1, 4]] as Array<[number, number]> }
    }
  ]

  return (
    <div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">{step.description}</p>
      
      {/* KPI Cards - Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">+28%</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Conversion rate increase</div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Pages meet Core Web Vitals</div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.7★</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">User satisfaction</div>
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
            isHighlighted={isCardHighlighted(card.slug, highlightedSkillId, step.id)}
          />
        ))}
      </div>
      
      {/* Drawer */}
      {isDrawerOpen && selectedDrawer && (
        selectedDrawer === 'instrumentation' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Instrumentation"
            enableComments={true}
          >
            <InstrumentationDrawer onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : selectedDrawer === 'experimentation' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Experimentation"
            enableComments={true}
          >
            <ExperimentationDrawer onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : selectedDrawer === 'performance-quality' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Performance & Quality"
            enableComments={true}
          >
            <PerformanceQualityDrawer onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : selectedDrawer === 'continuous-improvement' ? (
          <ComponentDrawer
            open={isDrawerOpen}
            onClose={onDrawerClose}
            title="Continuous Improvement"
            enableComments={true}
          >
            <ContinuousImprovementDrawer onClose={onDrawerClose} />
          </ComponentDrawer>
        ) : null
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
  
  // State for skill highlighting
  const [highlightedSkillId, setHighlightedSkillId] = useState<string | null>(null)

  // URL parameter handling
  useEffect(() => {
    const panel = searchParams.get('panel')
    const step = searchParams.get('step')
    const highlight = searchParams.get('highlight')
    
    // Handle panel parameter
    if (panel) {
      setSelectedDrawer(panel)
      setIsDrawerOpen(true)
    } else {
      setIsDrawerOpen(false)
      setSelectedDrawer(null)
    }
    
    // Handle step parameter
    if (step) {
      const stepId = parseInt(step)
      if (stepId >= 1 && stepId <= 5) {
        setActiveStep(stepId)
      }
    }
    
    // Handle highlight parameter
    setHighlightedSkillId(highlight)
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
          highlightedSkillId={highlightedSkillId}
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