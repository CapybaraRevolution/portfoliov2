// Service category color mappings with AA+ contrast using centralized tokens
export const serviceCategoryColors = {
  PM: {
    bg: 'bg-token-pm',
    text: 'text-token-pm',
    border: 'border-token-pm border',
    hover: 'hover:bg-token-pm hover:bg-opacity-20'
  },
  UX: {
    bg: 'bg-token-ux', 
    text: 'text-token-ux',
    border: 'border-token-ux border',
    hover: 'hover:bg-token-ux hover:bg-opacity-20'
  },
  BA: {
    bg: 'bg-token-ba',
    text: 'text-token-ba', 
    border: 'border-token-ba border',
    hover: 'hover:bg-token-ba hover:bg-opacity-20'
  },
  DS: {
    bg: 'bg-token-ds',
    text: 'text-token-ds',
    border: 'border-token-ds border', 
    hover: 'hover:bg-token-ds hover:bg-opacity-20'
  },
  AI: {
    bg: 'bg-gradient-ai bg-opacity-10',
    text: 'text-gradient-ai',
    border: 'border-pink-500/20 border',
    hover: 'hover:bg-gradient-ai hover:bg-opacity-20'
  }
} as const

export type ServiceCategory = keyof typeof serviceCategoryColors

// AI rainbow gradient token (matching AI-Accelerated toggle/timeline)
export const aiRainbowGradient = {
  background: 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500',
  text: 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent',
  border: 'border-gradient-to-r from-pink-500 via-purple-500 to-blue-500'
} as const