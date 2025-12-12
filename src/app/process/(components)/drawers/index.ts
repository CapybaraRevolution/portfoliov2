/**
 * Process Drawer Manifest
 * 
 * Organized by Step for easier maintenance and systematic passes.
 * When making bulk changes (tone, format, etc.), iterate by step.
 */

// Step 1 · Discovery & Strategy
export { PersonaJourneyMapping } from './PersonaJourneyMapping'
export { StakeholderAlignment } from './StakeholderAlignment'
export { SystemAnalysis } from './SystemAnalysis'
export { CompetitiveAnalysis } from './CompetitiveAnalysis'

// Step 2 · IA & Flows
// -- User Research
export { WhyResearchFirst } from './WhyResearchFirst'
export { WhatIsUserResearch } from './WhatIsUserResearch'
export { ChooseRightMethod } from './ChooseRightMethod'
// -- Prioritization
export { OpportunityBacklog } from './OpportunityBacklog'
export { TechnicalDebtTriage } from './TechnicalDebtTriage'
export { WhyWePrioritize } from './WhyWePrioritize'
export { HowWePrioritize } from './HowWePrioritize'
export { UXResearchInsightsIntake } from './UXResearchInsightsIntake'
// -- Journey Mapping
export { JMPersonas } from './JMPersonas'
export { JMJourneys } from './JMJourneys'
export { JMDecisions } from './JMDecisions'
// -- Flow Design
export { FDInformationArchitecture } from './FDInformationArchitecture'
export { FDUserFlows } from './FDUserFlows'
export { FDTaskValidation } from './FDTaskValidation'
// -- Information Architecture
export { ValidateIA } from './ValidateIA'
export { SitemapInventory } from './SitemapInventory'
export { TaxonomyLabels } from './TaxonomyLabels'
export { NavigationPatterns } from './NavigationPatterns'

// Step 3 · Design & Prototyping
export { Wireframes } from './Wireframes'
export { ClickablePrototypes } from './ClickablePrototypes'
export { DesignSystems } from './DesignSystems'

// Step 4 · Implementation Support
// -- Plan
export { DevHandoffPackages } from './DevHandoffPackages'
export { ReleasePlanningCutCandidate } from './ReleasePlanningCutCandidate'
export { SprintPlanningBacklogGrooming } from './SprintPlanningBacklogGrooming'
// -- Execute
export { DailyDesignQA } from './DailyDesignQA'
export { StakeholderDemosAcceptance } from './StakeholderDemosAcceptance'
export { AccessibilityPerformanceQA } from './AccessibilityPerformanceQA'
export { ReleaseReadinessReview } from './ReleaseReadinessReview'
export { CrossFunctionalRiskAssessment } from './CrossFunctionalRiskAssessment'
export { AnalyticsEventsTrackingSpec } from './AnalyticsEventsTrackingSpec'
export { FigmaProductParityAudit } from './FigmaProductParityAudit'
export { PerformanceQualityDrawer } from './PerformanceQualityDrawer'
// -- Ship
export { IncidentRollbackPlan } from './IncidentRollbackPlan'
export { PostReleaseMonitoringBugSmash } from './PostReleaseMonitoringBugSmash'

// Step 5 · Launch & Optimization
export { InstrumentationDrawer } from './InstrumentationDrawer'
export { ExperimentationDrawer } from './ExperimentationDrawer'
export { ContinuousImprovementDrawer } from './ContinuousImprovementDrawer'

/**
 * Drawer metadata for programmatic access
 */
export const DRAWER_MANIFEST = {
  step1: {
    name: 'Discovery & Strategy',
    drawers: ['PersonaJourneyMapping', 'StakeholderAlignment', 'SystemAnalysis', 'CompetitiveAnalysis']
  },
  step2: {
    name: 'IA & Flows',
    substages: {
      userResearch: ['WhyResearchFirst', 'WhatIsUserResearch', 'ChooseRightMethod'],
      prioritization: ['OpportunityBacklog', 'TechnicalDebtTriage', 'WhyWePrioritize', 'HowWePrioritize', 'UXResearchInsightsIntake'],
      journeyMapping: ['JMPersonas', 'JMJourneys', 'JMDecisions'],
      flowDesign: ['FDInformationArchitecture', 'FDUserFlows', 'FDTaskValidation'],
      informationArchitecture: ['ValidateIA', 'SitemapInventory', 'TaxonomyLabels', 'NavigationPatterns']
    }
  },
  step3: {
    name: 'Design & Prototyping',
    drawers: ['Wireframes', 'ClickablePrototypes', 'DesignSystems']
  },
  step4: {
    name: 'Implementation Support',
    substages: {
      plan: ['DevHandoffPackages', 'ReleasePlanningCutCandidate', 'SprintPlanningBacklogGrooming'],
      execute: ['DailyDesignQA', 'StakeholderDemosAcceptance', 'AccessibilityPerformanceQA', 'ReleaseReadinessReview', 'CrossFunctionalRiskAssessment', 'AnalyticsEventsTrackingSpec', 'FigmaProductParityAudit', 'PerformanceQualityDrawer'],
      ship: ['IncidentRollbackPlan', 'PostReleaseMonitoringBugSmash']
    }
  },
  step5: {
    name: 'Launch & Optimization',
    drawers: ['InstrumentationDrawer', 'ExperimentationDrawer', 'ContinuousImprovementDrawer']
  }
} as const
