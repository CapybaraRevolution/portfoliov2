/**
 * Feature flag utilities for backend API integration
 */

export const isBackendAPIEnabled = () => {
  return process.env.NEXT_PUBLIC_USE_BACKEND_API === 'true'
}

export const getBackendConfig = () => {
  return {
    enabled: isBackendAPIEnabled(),
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_BACKEND_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_BACKEND_ANON_KEY,
  }
}