'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { projects, filterProjects, disciplines, skillGroups } from '@/data/projects'
import { RefactoredProjectCard } from '@/components/RefactoredProjectCard'
import { FilterChip } from '@/components/FilterChip'
import { AIToggle } from '@/components/AIToggle'

export function PortfolioGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State from URL params
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set())
  const [aiAccelerated, setAiAccelerated] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  
  // Derived state
  const filteredProjects = filterProjects(
    activeCategory,
    Array.from(selectedSkills),
    aiAccelerated
  )
  
  const activeFiltersCount = selectedSkills.size + (aiAccelerated ? 1 : 0) + (activeCategory !== 'All' ? 1 : 0)

  // Initialize from URL params
  useEffect(() => {
    const cat = searchParams.get('cat') || 'All'
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || []
    const ai = searchParams.get('ai') === '1'
    
    setActiveCategory(cat)
    setSelectedSkills(new Set(skills))
    setAiAccelerated(ai)
  }, [searchParams])

  // Update URL when filters change
  const updateURL = (updates: {
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
        params.set('skills', Array.from(updates.skills).join(','))
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
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    updateURL({ category })
  }

  const handleSkillToggle = (skill: string) => {
    const newSkills = new Set(selectedSkills)
    if (newSkills.has(skill)) {
      newSkills.delete(skill)
    } else {
      newSkills.add(skill)
    }
    setSelectedSkills(newSkills)
    updateURL({ skills: newSkills })
  }

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
          >
            <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6 relative overflow-hidden">
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
                    className={`text-sm font-medium text-zinc-900 dark:text-white mb-4 transition-all duration-300 ${
                      filtersOpen ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'
                    }`}
                    style={filtersOpen ? {
                      animation: 'fadeInUp 0.5s ease-out 0.3s both'
                    } : {}}
                  >
                    Filter by skill
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            key={skill}
                            className={`transition-all duration-300 ${
                              filtersOpen ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'
                            }`}
                            style={filtersOpen ? {
                              animation: `fadeInUp 0.3s ease-out ${0.5 + groupIndex * 0.1 + skillIndex * 0.05}s both`
                            } : {}}
                          >
                            <button
                              onClick={() => handleSkillToggle(skill)}
                              className={`inline-flex items-center gap-x-1 rounded-md font-medium transition-all duration-200 text-xs px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
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
          {Array.from(selectedSkills).map((skill) => (
            <button
              key={skill}
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
          {filteredProjects.map((project) => (
            <RefactoredProjectCard key={project.id} project={project} />
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