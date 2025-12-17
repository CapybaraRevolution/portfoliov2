'use client'

import { useReducedMotion } from '@/contexts/ReducedMotionContext'
import { Switch } from '@/components/ui/switch'

export function MotionToggle() {
  const { prefersReducedMotion, setReducedMotion, mounted } = useReducedMotion()

  const handleToggle = (checked: boolean) => {
    setReducedMotion(checked)
  }

  const label = mounted
    ? prefersReducedMotion
      ? 'Animations are reduced'
      : 'Animations are enabled'
    : 'Toggle motion preference'

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <span className="text-sm text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white transition-colors">
        Reduce Motion
      </span>
      <Switch
        checked={prefersReducedMotion}
        onCheckedChange={handleToggle}
        aria-label={label}
      />
    </label>
  )
}


