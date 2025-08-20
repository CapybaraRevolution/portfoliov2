'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { isBackendAPIEnabled } from '@/lib/featureFlags'
import { RefactoredProjectCard } from '@/components/RefactoredProjectCard'
import { FilterChip } from '@/components/FilterChip'
import { AIToggle } from '@/components/AIToggle'

// Legacy imports
import { projects, filterProjects, disciplines, skillGroups, type Project } from '@/data/projects'
import { skillCategories, getAllSkillNames, standardizedSkills } from '@/data/standardizedSkills'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { mapSkillNameToStandardized, getSkillsByStandardizedCategory } from '@/lib/skillMapping'

// Types for backend data
interface BackendSkill {
  id: string
  name: string
  category: string
}

interface BackendCaseStudy {
  id: string
  title: string
  description: string
  category: 'UX' | 'Strategy' | 'PM' | 'BA'
  skills: BackendSkill[]
  ai: boolean
  href: string
  status: 'completed' | 'ongoing'
  client?: string
  timeline?: string
  image?: string
  [key: string]: any
}

interface TransformedBackendCaseStudy {
  id: string
  title: string
  description: string
  category: 'UX' | 'Strategy' | 'PM' | 'BA'
  skills: string[] // Transformed from BackendSkill[] to string[]
  ai: boolean
  href: string
  status: 'completed' | 'ongoing'
  client?: string
  timeline?: string
  image?: string
  [key: string]: any
}

export function PortfolioShell() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const backendEnabled = isBackendAPIEnabled()
  
  // State
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set())
  const [aiAccelerated, setAiAccelerated] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  
  // Backend state
  const [backendSkills, setBackendSkills] = useState<BackendSkill[]>([])
  const [backendCaseStudies, setBackendCaseStudies] = useState<BackendCaseStudy[]>([])
  const [backendError, setBackendError] = useState<string | null>(null)

  // Legacy skill mapping (keep for fallback)
  const skillNameMapping: Record<string, string[]> = {
    // Strategy
    'Product Vision': ['Product Vision'],
    'Roadmap': ['Roadmapping'],
    'Prioritization': ['Backlog Shaping', 'Scope Negotiation'],
    'OKRs': ['KPI Dashboards'],
    
    // Discovery & Design
    'User Research': ['User Interviews', 'User Research'],
    'Information Architecture': ['Journey Mapping', 'Service Design'],
    'Wireframes & Prototypes': ['Wireframing', 'Prototyping'],
    'Usability Testing': ['A/B Testing'],
    
    // Build & Ship
    'PRDs (Specs)': ['Opportunity Framing'],
    'System Design': ['Design Systems'],
    'APIs & Integrations': ['Event Instrumentation'],
    'Agile Delivery': ['Release Planning', 'Cross-team Facilitation'],
    
    // Data & AI
    'Product Analytics': ['Funnel Analysis', 'Data Viz'],
    'Experimentation': ['A/B Testing'],
    'Instrumentation': ['Event Instrumentation'],
    'AI Integration': ['AI Prompt Design'],
    
    // Leadership & Collaboration
    'Stakeholder Alignment': ['Stakeholder Alignment'],
    'Communication': ['Data Visualization'],
    'Storytelling': ['Market Research'],
    'Team Facilitation': ['Cross-team Facilitation']
  }

  const findMatchingProjectSkills = (standardizedSkillName: string): string[] => {
    return skillNameMapping[standardizedSkillName] || []
  }

  const reverseMappingCache = new Map<string, string>()
  Object.entries(skillNameMapping).forEach(([standardizedSkill, legacySkills]) => {
    legacySkills.forEach(legacySkill => {
      reverseMappingCache.set(legacySkill, standardizedSkill)
    })
  })

  const findStandardizedSkill = (legacySkillName: string): string | null => {
    return reverseMappingCache.get(legacySkillName) || null
  }

  // Fetch backend data
  useEffect(() => {
    if (!backendEnabled) return

    const fetchBackendData = async () => {
      try {
        setLoading(true)
        setBackendError(null)

        const [skillsResponse, caseStudiesResponse] = await Promise.all([
          fetch('/api/v2/skills'),
          fetch('/api/v2/case-studies')
        ])

        if (!skillsResponse.ok || !caseStudiesResponse.ok) {
          throw new Error('Failed to fetch backend data')
        }

        const [skills, caseStudies] = await Promise.all([
          skillsResponse.json(),
          caseStudiesResponse.json()
        ])

        setBackendSkills(skills)
        setBackendCaseStudies(caseStudies)
      } catch (error) {
        console.error('Backend fetch error:', error)
        setBackendError('Failed to load data from backend')
      } finally {
        setLoading(false)
      }
    }

    fetchBackendData()
  }, [backendEnabled])

  // Get skills grouped by category
  const getSkillGroups = () => {
    if (backendEnabled && backendSkills.length > 0) {
      const grouped: Record<string, string[]> = {}
      backendSkills.forEach(skill => {
        if (!skill || !skill.name || !skill.category) return // Skip invalid skills
        
        // Use the category name (not categoryId) for grouping
        const categoryName = skill.category
        
        if (!grouped[categoryName]) {
          grouped[categoryName] = []
        }
        
        // Prevent duplicate skills in the same category
        if (!grouped[categoryName].includes(skill.name)) {
          grouped[categoryName].push(skill.name)
        }
      })
      
      // If we have skills, return them
      if (Object.keys(grouped).length > 0) {
        return grouped
      }
    }

    // Fallback to legacy skills
    return {
      'Strategy': [
        'Product Vision',
        'Roadmap',
        'Prioritization',
        'OKRs'
      ],
      'Discovery & Design': [
        'User Research',
        'Information Architecture',
        'Wireframes & Prototypes',
        'Usability Testing'
      ],
      'Build & Ship': [
        'PRDs (Specs)',
        'System Design',
        'APIs & Integrations',
        'Agile Delivery'
      ],
      'Data & AI': [
        'Product Analytics',
        'Experimentation',
        'Instrumentation',
        'AI Integration'
      ],
      'Leadership': [
        'Stakeholder Alignment',
        'Communication',
        'Storytelling',
        'Team Facilitation'
      ]
    }
  }

  // Filter projects
  const getFilteredProjects = (): Project[] => {
    if (backendEnabled && backendCaseStudies.length > 0 && !backendError) {
      // Backend case studies already include merged local data from API
      // and have proper href properties, but we need to transform them to Project format
      let filtered: Project[] = backendCaseStudies.map((caseStudy, index) => ({
        ...caseStudy,
        id: caseStudy.id || `merged-case-study-${index}-${Date.now()}`,
        skills: caseStudy.skills?.map(skill => skill?.name).filter(Boolean) || [] // Convert BackendSkill[] to string[]
      }))

      // Filter by selected skills
      if (selectedSkills.size > 0) {
        filtered = filtered.filter(caseStudy => 
          Array.from(selectedSkills).some(selectedSkill => 
            caseStudy.skills && caseStudy.skills.includes(selectedSkill)
          )
        )
      }

      // Note: AI filtering and category filtering would need to be implemented
      // based on how the backend data is structured
      
      return filtered
    }

    // Fallback to case studies from caseStudies.ts
    const allCaseStudies = getAllCaseStudies()
    
    // Convert case studies to the expected format
    let formattedCaseStudies: Project[] = allCaseStudies.map(study => ({
      id: study.slug,
      title: study.title,
      description: study.description,
      category: study.category as 'UX' | 'Strategy' | 'PM' | 'BA',
      skills: study.services || [],
      ai: study.aiAccelerated || false,
      href: `/case-studies/${study.slug}`,
      client: study.role,
      timeline: study.timeline,
      status: study.status === 'Ongoing' ? 'ongoing' as const : 'completed' as const
    }))
    
    // Filter by category
    if (activeCategory !== 'All') {
      formattedCaseStudies = formattedCaseStudies.filter(study => 
        study.category === activeCategory
      )
    }
    
    // Filter by selected skills
    if (selectedSkills.size > 0) {
      formattedCaseStudies = formattedCaseStudies.filter(study =>
        Array.from(selectedSkills).some(selectedSkill =>
          study.skills.includes(selectedSkill)
        )
      )
    }
    
    // Filter by AI acceleration
    if (aiAccelerated) {
      formattedCaseStudies = formattedCaseStudies.filter(study => study.ai)
    }
    
    return formattedCaseStudies
  }

  const skillGroups = getSkillGroups()
  const filteredProjects = getFilteredProjects()
  const activeFiltersCount = selectedSkills.size + (aiAccelerated ? 1 : 0) + (activeCategory !== 'All' ? 1 : 0)

  // Initialize filtersOpen from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem('portfolio-filters-open')
      if (savedState === 'true') {
        setFiltersOpen(true)
      }
    }
  }, [])

  // Persist filtersOpen state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-filters-open', filtersOpen.toString())
    }
  }, [filtersOpen])

  // Initialize from URL params
  useEffect(() => {
    const cat = searchParams.get('cat') || 'All'
    const skillsParam = searchParams.get('skills')
    const legacySkills = skillsParam && typeof skillsParam === 'string' 
      ? skillsParam.split(',').filter(Boolean).filter(skill => skill.trim().length > 0)
      : []
    const ai = searchParams.get('ai') === '1'
    
    if (backendEnabled) {
      // For backend mode, use skills directly (remove duplicates)
      const uniqueSkills = [...new Set(legacySkills.map(skill => decodeURIComponent(skill).trim()))]
      setSelectedSkills(new Set(uniqueSkills))
    } else {
      // Convert legacy skills to standardized skills for legacy mode
      const standardizedSkills = legacySkills
        .map(legacySkill => findStandardizedSkill(decodeURIComponent(legacySkill).trim()))
        .filter(Boolean) as string[]
      
      // Remove duplicates
      const uniqueStandardizedSkills = [...new Set(standardizedSkills)]
      setSelectedSkills(new Set(uniqueStandardizedSkills))
    }
    
    setActiveCategory(cat)
    setAiAccelerated(ai)
  }, [searchParams, backendEnabled])

  // Update URL when filters change
  const updateURL = useCallback((updates: {
    category?: string
    skills?: Set<string>
    ai?: boolean
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.category !== undefined) {
      if (updates.category === 'All') {
        params.delete('cat')
      } else {
        params.set('cat', updates.category)
      }
    }
    
    if (updates.skills !== undefined) {
      if (updates.skills.size === 0) {
        params.delete('skills')
      } else {
        if (backendEnabled) {
          // For backend mode, use skills directly
          params.set('skills', Array.from(updates.skills).join(','))
        } else {
          // Convert standardized skills back to legacy skills for URL
          const legacySkillsForURL = Array.from(updates.skills).flatMap(standardizedSkill => 
            findMatchingProjectSkills(standardizedSkill)
          )
          params.set('skills', legacySkillsForURL.join(','))
        }
      }
    }
    
    if (updates.ai !== undefined) {
      if (updates.ai) {
        params.set('ai', '1')
      } else {
        params.delete('ai')
      }
    }
    
    const paramString = params.toString()
    const newUrl = paramString ? `?${paramString}` : '/work/overview'
    router.replace(newUrl, { scroll: false })
  }, [searchParams, router, backendEnabled])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    updateURL({ category })
  }

  const handleSkillToggle = useCallback((skill: string) => {
    const newSkills = new Set(selectedSkills)
    if (newSkills.has(skill)) {
      newSkills.delete(skill)
    } else {
      newSkills.add(skill)
    }
    setSelectedSkills(newSkills)
    updateURL({ skills: newSkills })
  }, [selectedSkills, updateURL])

  const handleAIToggle = (checked: boolean) => {
    setAiAccelerated(checked)
    updateURL({ ai: checked })
  }

  const clearAllFilters = () => {
    setActiveCategory('All')
    setSelectedSkills(new Set())
    setAiAccelerated(false)
    setFiltersOpen(false)
    router.replace('/work/overview', { scroll: false })
  }

  const removeSkill = (skill: string) => {
    const newSkills = new Set(selectedSkills)
    newSkills.delete(skill)
    setSelectedSkills(newSkills)
    updateURL({ skills: newSkills })
  }

  // Show loading state
  if (backendEnabled && loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  // Show backend error with fallback option
  if (backendEnabled && backendError) {
    return (
      <div className="text-center py-12">
        <div className="max-w-sm mx-auto">
          <div className="text-red-400 mb-4">
            <FunnelIcon className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
            Backend Error
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {backendError}. Falling back to legacy data.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="not-prose">
      {/* Filter Header */}
      <div className="mb-8">
        {/* Filter Controls */}
        <section aria-labelledby="filter-heading">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`group flex items-center font-medium transition-colors ${
                  filtersOpen
                    ? 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <FunnelIcon
                  aria-hidden="true"
                  className={`mr-2 h-5 w-5 flex-none transition-colors ${
                    filtersOpen
                      ? 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
                      : 'text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300'
                  }`}
                />
                • More filters
                <span className="ml-2 min-w-[28px] text-center">
                  {activeFiltersCount > 0 && (
                    <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 transition-all duration-200">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
              </button>
              
              <AIToggle 
                checked={aiAccelerated}
                onChange={handleAIToggle}
              />
            </div>
            
            <div className="flex items-center gap-4">
              {(selectedSkills.size > 0 || aiAccelerated || activeCategory !== 'All') && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-out overflow-hidden ${
              filtersOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Emerald wave of light effect */}
              {filtersOpen && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.1) 30%, rgba(16, 185, 129, 0.2) 50%, rgba(16, 185, 129, 0.1) 70%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    animation: 'emeraldWaveReveal 1.2s ease-out 0.2s forwards'
                  }}
                />
              )}
              
              <div className="space-y-6 relative">
                {/* Skills Filters */}
                <div>
                  <h3 
                    className={`text-sm font-medium text-zinc-900 dark:text-white mb-6 transition-all duration-300 ${
                      filtersOpen ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'
                    }`}
                    style={filtersOpen ? {
                      animation: 'fadeInUp 0.5s ease-out 0.3s both'
                    } : {}}
                  >
                    Filter by skill
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(skillGroups).map(([groupName, skills], groupIndex) => (
                    <div 
                      key={groupName} 
                      className={`space-y-3 transition-all duration-300 ${
                        filtersOpen ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'
                      }`}
                      style={filtersOpen ? {
                        animation: `fadeInUp 0.4s ease-out ${0.4 + groupIndex * 0.1}s both`
                      } : {}}
                    >
                      <h4 className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                        {groupName}
                      </h4>
                      <div className="space-y-2">
                        {skills.map((skill, skillIndex) => (
                          <div
                            key={`${groupName}-${skill}-${skillIndex}`}
                            className={`transition-all duration-300 ${
                              filtersOpen ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'
                            }`}
                            style={filtersOpen ? {
                              animation: `fadeInUp 0.3s ease-out ${0.5 + groupIndex * 0.1 + skillIndex * 0.05}s both`
                            } : {}}
                          >
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                e.nativeEvent?.stopImmediatePropagation?.()
                                handleSkillToggle(skill)
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              onMouseUp={(e) => e.stopPropagation()}
                              className={`inline-flex items-center gap-x-1 rounded-md font-medium transition-all duration-200 text-xs px-2 py-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                                selectedSkills.has(skill)
                                  ? 'border border-emerald-600 text-emerald-800 bg-emerald-200/60 shadow-sm shadow-emerald-500/20 dark:border-emerald-500 dark:text-emerald-100 dark:bg-emerald-400/30 dark:shadow-emerald-400/20'
                                  : 'border border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-600 dark:text-zinc-300 hover:border-emerald-300 hover:text-emerald-700 hover:ring-1 hover:ring-emerald-300/25 hover:shadow-sm hover:shadow-emerald-500/10 dark:hover:border-emerald-500 dark:hover:text-emerald-400 dark:hover:ring-emerald-500/25'
                              }`}
                            >
                              {skill}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
                
                {/* Collapse Filters Button */}
                {filtersOpen && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 animate-pulse"
                      style={{
                        animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        animationDelay: '2s',
                        textShadow: '0 0 8px rgba(156, 163, 175, 0.3), 0 0 12px rgba(156, 163, 175, 0.15)'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Collapse filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Active Filters Bar */}
      {selectedSkills.size > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Active filters:</span>
          {Array.from(selectedSkills).map((skill, index) => (
            <button
              key={`active-filter-${skill}-${index}`}
              onClick={() => removeSkill(skill)}
              className="inline-flex items-center gap-x-1 rounded-md bg-emerald-100 dark:bg-emerald-900 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800"
            >
              {skill}
              <span className="text-emerald-500 hover:text-emerald-700">×</span>
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2 xl:gap-x-12">
          {filteredProjects.map((project, index) => (
            <RefactoredProjectCard 
              key={project.id || `${backendEnabled ? 'backend' : 'legacy'}-project-${index}-${project.title?.replace(/\s+/g, '-')}`} 
              project={project} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <div className="text-zinc-400 mb-4">
              <FunnelIcon className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              No projects match these filters
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Try clearing one or more filters to see more results.
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}