/**
 * Feature flags for portfolio site
 * Currently all features use local data - no backend required
 */

export const featureFlags = {
  // All data is local - no backend API
  useLocalData: true,
} as const

// Helper to check if a feature is enabled
export function isFeatureEnabled(feature: keyof typeof featureFlags): boolean {
  return featureFlags[feature]
}
