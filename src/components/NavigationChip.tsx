'use client'

import { useRouter } from 'next/navigation'
import { Chip } from '@/components/ui/Chip'
import { SkillChip } from '@/components/SkillChip'
import { standardizedSkills, StandardizedSkill } from '@/data/standardizedSkills'

interface NavigationChipProps {
  skill: string | StandardizedSkill
  size?: 'sm' | 'md'
  className?: string
  variant?: 'default' | 'outline' | 'subtle'
  showDropdown?: boolean
}

export function NavigationChip({ 
  skill, 
  size = 'md',
  className,
  variant = 'outline',
  showDropdown = true
}: NavigationChipProps) {
  const router = useRouter()

  // If skill is a StandardizedSkill object, use SkillChip
  if (typeof skill === 'object' && skill.id) {
    return (
      <SkillChip
        skill={skill}
        size={size}
        className={className}
        variant={variant}
        showDropdown={showDropdown}
      />
    )
  }

  // If skill is a string, try to find it in standardized skills first
  const skillName = typeof skill === 'string' ? skill : skill.name
  const standardizedSkill = Object.values(standardizedSkills).find(
    s => s.name.toLowerCase() === skillName.toLowerCase()
  )

  if (standardizedSkill) {
    return (
      <SkillChip
        skill={standardizedSkill}
        size={size}
        className={className}
        variant={variant}
        showDropdown={showDropdown}
      />
    )
  }

  // Fallback to legacy behavior for non-standardized skills
  const handleViewProjects = () => {
    router.push(`/work/overview?skills=${encodeURIComponent(skillName)}`)
  }

  const handleViewProcess = () => {
    router.push(`/process#${skillName.toLowerCase().replace(/\s+/g, '-')}`)
  }

  const dropdownItems = showDropdown ? [
    {
      label: `View projects with ${skillName}`,
      description: 'See case studies featuring this skill',
      onClick: handleViewProjects
    },
    {
      label: `How ${skillName} fits into my process`,
      description: 'Learn about my approach and methodology',
      onClick: handleViewProcess
    }
  ] : undefined

  const chipVariant = variant === 'default' ? 'filled' : 'outline'
  
  return (
    <Chip
      variant={chipVariant}
      size={size}
      className={className}
      dropdown={showDropdown}
      dropdownItems={dropdownItems}
    >
      {skillName}
    </Chip>
  )
}