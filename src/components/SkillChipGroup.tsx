'use client'

import { useState } from 'react'
import { SkillChip } from '@/components/SkillChip'
import { 
  skillCategories, 
  getSkillsByCategory, 
  SkillCategory,
  getCategoryColors 
} from '@/data/standardizedSkills'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface SkillChipGroupProps {
  categoryId: string
  collapsible?: boolean
  defaultExpanded?: boolean
  showCategoryDescription?: boolean
  skillVariant?: 'default' | 'outline' | 'subtle'
  skillSize?: 'sm' | 'md'
  showDropdown?: boolean
  className?: string
  onSkillClick?: (skillName: string) => void
  selectedSkills?: Set<string>
}

export function SkillChipGroup({
  categoryId,
  collapsible = false,
  defaultExpanded = true,
  showCategoryDescription = false,
  skillVariant = 'outline',
  skillSize = 'sm',
  showDropdown = true,
  className,
  onSkillClick,
  selectedSkills
}: SkillChipGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const category = skillCategories[categoryId]
  const skills = getSkillsByCategory(categoryId)
  const colors = getCategoryColors(categoryId)

  if (!category || skills.length === 0) {
    return null
  }

  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className={`space-y-3 ${className || ''}`}>
      {/* Category Header */}
      <div 
        className={`flex items-center gap-2 ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={toggleExpanded}
      >
        {collapsible && (
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-zinc-500" />
            )}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {/* Category Color Indicator */}
          <div className={`w-3 h-3 rounded-full bg-${colors.color}-500`} />
          
          {/* Category Name */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {category.name}
          </h3>
          
          {/* Skill Count */}
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            ({skills.length} skill{skills.length !== 1 ? 's' : ''})
          </span>
        </div>
      </div>

      {/* Category Description */}
      {showCategoryDescription && isExpanded && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 ml-6">
          {category.description}
        </p>
      )}

      {/* Skills */}
      {isExpanded && (
        <div className="flex flex-wrap gap-2 ml-6">
          {skills.map((skill) => {
            const isSelected = selectedSkills ? selectedSkills.has(skill.name) : false
            const finalVariant = isSelected ? 'default' : skillVariant
            
            return (
              <SkillChip
                key={skill.id}
                skill={skill}
                variant={finalVariant}
                size={skillSize}
                showDropdown={showDropdown}
                onClick={onSkillClick ? () => onSkillClick(skill.name) : undefined}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// Component to display all skill categories
interface AllSkillCategoriesProps {
  collapsible?: boolean
  defaultExpanded?: boolean
  showCategoryDescriptions?: boolean
  skillVariant?: 'default' | 'outline' | 'subtle'
  skillSize?: 'sm' | 'md'
  showDropdown?: boolean
  className?: string
}

export function AllSkillCategories({
  collapsible = true,
  defaultExpanded = false,
  showCategoryDescriptions = true,
  skillVariant = 'outline',
  skillSize = 'sm',
  showDropdown = true,
  className
}: AllSkillCategoriesProps) {
  const categoryOrder = [
    'product-strategy',
    'ux-research', 
    'technical-fluency',
    'ai-data',
    'business-acumen',
    'collaboration',
    'delivery-execution'
  ]

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {categoryOrder.map((categoryId) => (
        <SkillChipGroup
          key={categoryId}
          categoryId={categoryId}
          collapsible={collapsible}
          defaultExpanded={defaultExpanded}
          showCategoryDescription={showCategoryDescriptions}
          skillVariant={skillVariant}
          skillSize={skillSize}
          showDropdown={showDropdown}
        />
      ))}
    </div>
  )
}

// Component for displaying selected skills from multiple categories
interface SelectedSkillsDisplayProps {
  skillIds: string[]
  groupByCategory?: boolean
  skillVariant?: 'default' | 'outline' | 'subtle'
  skillSize?: 'sm' | 'md'
  showDropdown?: boolean
  className?: string
}

export function SelectedSkillsDisplay({
  skillIds,
  groupByCategory = false,
  skillVariant = 'outline',
  skillSize = 'sm',
  showDropdown = true,
  className
}: SelectedSkillsDisplayProps) {
  const { standardizedSkills } = require('@/data/standardizedSkills')
  const skills = skillIds.map(id => standardizedSkills[id]).filter(Boolean)

  if (skills.length === 0) {
    return null
  }

  if (!groupByCategory) {
    return (
      <div className={`flex flex-wrap gap-2 ${className || ''}`}>
        {skills.map((skill) => (
          <SkillChip
            key={skill.id}
            skill={skill}
            variant={skillVariant}
            size={skillSize}
            showDropdown={showDropdown}
          />
        ))}
      </div>
    )
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const categoryId = skill.category.id
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {Object.entries(skillsByCategory).map(([categoryId, categorySkills]) => {
        const category = skillCategories[categoryId]
        const typedCategorySkills = categorySkills as typeof skills
        return (
          <div key={categoryId} className="space-y-2">
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-2 pl-4">
              {typedCategorySkills.map((skill) => (
                <SkillChip
                  key={skill.id}
                  skill={skill}
                  variant={skillVariant}
                  size={skillSize}
                  showDropdown={showDropdown}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}