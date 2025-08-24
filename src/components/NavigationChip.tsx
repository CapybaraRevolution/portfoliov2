'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Chip } from '@/components/ui/Chip'
import { SkillChip } from '@/components/SkillChip'
import { standardizedSkills, StandardizedSkill } from '@/data/standardizedSkills'
import { generateProcessUrl } from '@/data/skillProcessMap'

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
  const pathname = usePathname()

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
    // Try to find a mapping for this skill name by converting to a potential ID
    const potentialSkillId = skillName.toLowerCase().replace(/\s+/g, '-')
    
    // If already on the process page, just update highlight without changing steps
    if (pathname === '/process') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('highlight', potentialSkillId)
      // Keep existing step parameter to prevent unwanted navigation
      router.push(currentUrl.toString())
    } else {
      // If coming from another page, use full navigation
      const processUrl = generateProcessUrl(potentialSkillId)
      router.push(processUrl)
    }
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