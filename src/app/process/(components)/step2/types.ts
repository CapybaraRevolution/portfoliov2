export type StepId = 'landing' | 'signup' | 'login' | 'onboarding' | 'product'

export interface FlowRow {
  id: StepId
  primaryGoal: string
  actions: string[]
  risks?: string
  events: string[] // event names shown as chips
}

export type TabId = 'prioritization' | 'ia' | 'roadmap'

export interface TabConfig {
  id: TabId
  label: string
  href: string
}