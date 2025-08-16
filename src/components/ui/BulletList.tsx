'use client'

import { ReactNode } from 'react'

type BulletColor = 'emerald' | 'blue' | 'purple' | 'zinc'

interface BulletListProps {
  items: string[] | ReactNode[]
  color?: BulletColor
  className?: string
}

const colorStyles: Record<BulletColor, string> = {
  emerald: 'bg-emerald-500 dark:bg-emerald-400',
  blue: 'bg-blue-500 dark:bg-blue-400', 
  purple: 'bg-purple-500 dark:bg-purple-400',
  zinc: 'bg-zinc-400 dark:bg-zinc-500'
}

export function BulletList({ items, color = 'emerald', className = '' }: BulletListProps) {
  const bulletColor = colorStyles[color]
  
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className={`w-1.5 h-1.5 ${bulletColor} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
          <span className="text-zinc-700 dark:text-zinc-300">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}