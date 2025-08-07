'use client'

import { useState } from 'react'

interface AIToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function AIToggle({ checked, onChange, className }: AIToggleProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className={`flex items-center space-x-2 ml-4 relative transition-all duration-700 ${
      checked 
        ? 'drop-shadow-2xl' 
        : ''
    } ${className}`}>
      {/* Outer glow */}
      <div className={`absolute -inset-4 rounded-xl transition-all duration-700 ${
        checked 
          ? 'bg-gradient-to-r from-emerald-500/20 via-blue-500/15 to-rose-500/20 blur-lg animate-pulse' 
          : 'bg-transparent'
      }`} />
      
      {/* Inner glow */}
      <div className={`absolute -inset-2 rounded-lg transition-all duration-500 ${
        checked 
          ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-sm' 
          : 'bg-transparent'
      }`} />
      
      {/* Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          relative z-10 inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
          ${checked 
            ? 'bg-emerald-500 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-background shadow-lg shadow-emerald-500/25' 
            : 'bg-zinc-200 dark:bg-zinc-700'
          }
          ${isPressed ? 'scale-95' : 'hover:scale-105'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ease-in-out
            ${checked 
              ? 'translate-x-6 shadow-lg' 
              : 'translate-x-1'
            }
          `}
        />
      </button>
      
      {/* Label */}
      <label 
        htmlFor="ai-accelerated" 
        className={`text-sm font-medium relative z-10 cursor-pointer transition-all duration-500 ${
          checked 
            ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
            : 'text-zinc-700 dark:text-zinc-300'
        }`}
        onClick={() => onChange(!checked)}
      >
        AI-Accelerated
      </label>
    </div>
  )
}