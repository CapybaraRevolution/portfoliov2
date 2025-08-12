'use client'

import { useRouter } from 'next/navigation'
import { Chip } from '@/components/ui/Chip'

interface NavigationChipProps {
  skill: string
  size?: 'sm' | 'md'
  className?: string
}

export function NavigationChip({ 
  skill, 
  size = 'md',
  className 
}: NavigationChipProps) {
  const router = useRouter()

  const handleViewProjects = () => {
    router.push(`/portfolio?skills=${encodeURIComponent(skill)}`)
  }

  const handleViewProcess = () => {
    router.push(`/process#${skill.toLowerCase().replace(/\s+/g, '-')}`)
  }

  const dropdownItems = [
    {
      label: `View projects with ${skill}`,
      description: 'See case studies featuring this skill',
      onClick: handleViewProjects
    },
    {
      label: `How ${skill} fits into my process`,
      description: 'Learn about my approach and methodology',
      onClick: handleViewProcess
    }
  ]

  return (
    <Chip
      variant="outline"
      size={size}
      className={className}
      dropdown={true}
      dropdownItems={dropdownItems}
    >
      {skill}
    </Chip>
  )
}