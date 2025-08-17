'use client'

import { useRouter } from 'next/navigation'
import { Chip } from '@/components/ui/Chip'
import { StandardizedSkill, getCategoryColors } from '@/data/standardizedSkills'

interface SkillChipProps {
  skill: StandardizedSkill
  size?: 'sm' | 'md'
  className?: string
  variant?: 'default' | 'outline' | 'subtle'
  showDropdown?: boolean
  onClick?: () => void
}

export function SkillChip({ 
  skill, 
  size = 'md',
  className,
  variant = 'outline',
  showDropdown = true,
  onClick
}: SkillChipProps) {
  const router = useRouter()
  const colors = getCategoryColors(skill.category.id)

  const handleViewProjects = () => {
    router.push(`/work/overview?skills=${encodeURIComponent(skill.name)}`)
  }

  const handleViewProcess = () => {
    // Navigate to process page and highlight relevant steps
    const processSteps = skill.processSteps || []
    if (processSteps.length > 0) {
      // Navigate to first step that contains this skill and add glow parameter
      const stepId = processSteps[0]
      router.push(`/process?step=${stepId}&highlight=${encodeURIComponent(skill.id)}`)
    } else {
      // Fallback to general process page
      router.push(`/process`)
    }
  }

  const dropdownItems = showDropdown ? [
    {
      label: `View projects with ${skill.name}`,
      description: 'See case studies featuring this skill',
      onClick: handleViewProjects
    },
    {
      label: `How ${skill.name} fits into my process`,
      description: 'Learn about my approach and methodology',
      onClick: handleViewProcess
    }
  ] : undefined

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          className: `border-${colors.color}-200 dark:border-${colors.color}-800 ${colors.bgColor} ${colors.textColor}`,
          variant: 'filled' as const
        }
      case 'subtle':
        return {
          className: `border-${colors.color}-100 dark:border-${colors.color}-900/20 bg-${colors.color}-50 dark:bg-${colors.color}-900/10 ${colors.textColor}`,
          variant: 'outline' as const
        }
      default:
        return {
          className: `border-${colors.color}-200 dark:border-${colors.color}-700 hover:${colors.bgColor} hover:${colors.textColor}`,
          variant: 'outline' as const
        }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <Chip
      variant={variantStyles.variant}
      size={size}
      className={`${variantStyles.className} ${className || ''}`}
      dropdown={showDropdown}
      dropdownItems={dropdownItems}
      onClick={onClick}
    >
      {skill.name}
    </Chip>
  )
}

// Convenience component for creating skill chips from skill IDs
interface SkillChipFromIdProps extends Omit<SkillChipProps, 'skill'> {
  skillId: string
}

export function SkillChipFromId({ skillId, ...props }: SkillChipFromIdProps) {
  const { standardizedSkills } = require('@/data/standardizedSkills')
  const skill = standardizedSkills[skillId]
  
  if (!skill) {
    console.warn(`Skill with ID "${skillId}" not found in standardizedSkills`)
    return null
  }

  return <SkillChip skill={skill} {...props} />
}

// Component to render a list of skill chips from skill IDs
interface SkillChipListProps {
  skillIds: string[]
  size?: 'sm' | 'md'
  variant?: 'default' | 'outline' | 'subtle'
  showDropdown?: boolean
  className?: string
}

export function SkillChipList({ 
  skillIds, 
  size = 'sm', 
  variant = 'outline',
  showDropdown = true,
  className 
}: SkillChipListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {skillIds.map((skillId) => (
        <SkillChipFromId
          key={skillId}
          skillId={skillId}
          size={size}
          variant={variant}
          showDropdown={showDropdown}
        />
      ))}
    </div>
  )
}