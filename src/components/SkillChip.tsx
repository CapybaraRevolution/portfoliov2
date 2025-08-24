'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Chip } from '@/components/ui/Chip'
import { StandardizedSkill, getCategoryColors } from '@/data/standardizedSkills'
import { generateProcessUrl } from '@/data/skillProcessMap'

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
  const pathname = usePathname()
  // Always use emerald colors for consistency
  const colors = {
    color: 'emerald',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    hoverBgColor: 'hover:bg-emerald-200 dark:hover:bg-emerald-900/30'
  }

  const handleViewProjects = () => {
    router.push(`/work/overview?skills=${encodeURIComponent(skill.name)}`)
  }

  const handleViewProcess = () => {
    // If already on the process page, just update highlight without changing steps
    if (pathname === '/process') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('highlight', skill.id)
      // Keep existing step parameter to prevent unwanted navigation
      router.push(currentUrl.toString())
    } else {
      // If coming from another page, use full navigation with step change
      const processUrl = generateProcessUrl(skill.id)
      router.push(processUrl)
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
          className: `border-emerald-200 dark:border-emerald-800 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300`,
          variant: 'filled' as const
        }
      case 'subtle':
        return {
          className: `border-emerald-100 dark:border-emerald-900/20 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-300`,
          variant: 'outline' as const
        }
      default:
        return {
          className: `border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 hover:dark:bg-emerald-900/20 hover:text-emerald-700 hover:dark:text-emerald-300`,
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