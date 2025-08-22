'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { RefactoredProjectCard } from '@/components/RefactoredProjectCard'
import { AIToggle } from '@/components/AIToggle'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { type Project } from '@/data/projects'

export function PortfolioShell() {
  // Local state for filtering
  const [filters, setFilters] = useState({
    selectedSkills: new Set<string>(),
    aiAccelerated: false,
    category: 'All',
    searchQuery: ''
  })
  
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  
  const searchParams = useSearchParams()
  
  // Get all case studies
  const allCaseStudies = useMemo(() => getAllCaseStudies(), [])
  
  // Read URL parameters on mount
  useEffect(() => {
    const skillsParam = searchParams.get('skills')
    if (skillsParam) {
      const decodedSkill = decodeURIComponent(skillsParam)
      setFilters(prev => ({
        ...prev,
        selectedSkills: new Set([decodedSkill])
      }))
    }
  }, [searchParams])
  
  // Extract unique skills from all case studies for filter options
  const availableSkills = useMemo(() => {
    const skillsMap = new Map<string, Set<string>>()
    
    // Group skills by category (you can customize these categories)
    const categories = {
      'Strategy': ['Product Vision', 'Roadmap', 'Prioritization', 'OKRs', 'Stakeholder Alignment'],
      'Discovery & Design': ['User Research', 'Information Architecture', 'Wireframing', 'Prototyping', 'Usability Testing', 'Service Design', 'Design Systems'],
      'Build & Ship': ['PRDs (Specs)', 'System Design', 'APIs & Integrations', 'Agile Delivery', 'Cross-team Facilitation'],
      'Data & AI': ['Product Analytics', 'Experimentation', 'Instrumentation', 'AI Integration', 'Data Visualization'],
      'Leadership': ['Team Facilitation', 'Communication', 'Storytelling', 'Stakeholder Management']
    }
    
    // Initialize categories
    Object.keys(categories).forEach(cat => skillsMap.set(cat, new Set()))
    
    // Add skills from case studies to appropriate categories
    allCaseStudies.forEach(study => {
      study.services.forEach(service => {
        // Find which category this service belongs to
        for (const [category, skills] of Object.entries(categories)) {
          if (skills.some(skill => service.includes(skill) || skill.includes(service))) {
            skillsMap.get(category)?.add(service)
            break
          }
        }
        // If no category found, add to a "Other" category
        if (!Array.from(skillsMap.values()).some(set => set.has(service))) {
          if (!skillsMap.has('Other')) skillsMap.set('Other', new Set())
          skillsMap.get('Other')?.add(service)
        }
      })
    })
    
    // Convert to object format
    const result: Record<string, string[]> = {}
    skillsMap.forEach((skills, category) => {
      if (skills.size > 0) {
        result[category] = Array.from(skills).sort()
      }
    })
    
    return result
  }, [allCaseStudies])
  
  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    let filtered = allCaseStudies
    
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(study => 
        study.title.toLowerCase().includes(query) ||
        study.descriptiveTitle.toLowerCase().includes(query) ||
        study.client.toLowerCase().includes(query) ||
        study.description.toLowerCase().includes(query) ||
        study.services.some(s => s.toLowerCase().includes(query))
      )
    }
    
    // Skills filter
    if (filters.selectedSkills.size > 0) {
      filtered = filtered.filter(study =>
        Array.from(filters.selectedSkills).some(skill =>
          study.services.includes(skill)
        )
      )
    }
    
    // AI filter
    if (filters.aiAccelerated) {
      filtered = filtered.filter(study => study.aiAccelerated)
    }
    
    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(study => study.category === filters.category)
    }
    
    // Convert to Project format
    return filtered.map(study => ({
      id: study.slug,
      title: study.descriptiveTitle,
      description: study.description,
      category: study.category as 'UX' | 'Strategy' | 'PM' | 'BA',
      skills: study.services || [],
      ai: study.aiAccelerated || false,
      href: `/case-studies/${study.slug}`,
      client: study.client,
      timeline: study.timeline,
      status: study.status === 'Ongoing' ? 'ongoing' as const : 'completed' as const
    }))
  }, [allCaseStudies, filters])
  
  // Calculate skill counts based on current filters
  const skillCounts = useMemo(() => {
    const counts = new Map<string, number>()
    
    // Start with a filtered list that excludes the skill filter itself
    let projectsForCounting = allCaseStudies
    
    // Apply other filters (not skill filter) to get accurate counts
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      projectsForCounting = projectsForCounting.filter(study => 
        study.title.toLowerCase().includes(query) ||
        study.descriptiveTitle.toLowerCase().includes(query) ||
        study.client.toLowerCase().includes(query) ||
        study.description.toLowerCase().includes(query)
      )
    }
    
    if (filters.aiAccelerated) {
      projectsForCounting = projectsForCounting.filter(study => study.aiAccelerated)
    }
    
    if (filters.category !== 'All') {
      projectsForCounting = projectsForCounting.filter(study => study.category === filters.category)
    }
    
    // Count skills in the filtered projects
    projectsForCounting.forEach(study => {
      study.services.forEach(skill => {
        counts.set(skill, (counts.get(skill) || 0) + 1)
      })
    })
    
    return counts
  }, [allCaseStudies, filters.searchQuery, filters.aiAccelerated, filters.category])
  
  // Filter handlers
  const handleSkillToggle = useCallback((skill: string) => {
    setFilters(prev => {
      const newSkills = new Set(prev.selectedSkills)
      if (newSkills.has(skill)) {
        newSkills.delete(skill)
      } else {
        newSkills.add(skill)
      }
      return { ...prev, selectedSkills: newSkills }
    })
  }, [])
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }))
  }, [])
  
  const handleAIToggle = useCallback((checked: boolean) => {
    setFilters(prev => ({ ...prev, aiAccelerated: checked }))
  }, [])
  
  const clearAllFilters = useCallback(() => {
    setFilters({
      selectedSkills: new Set(),
      aiAccelerated: false,
      category: 'All',
      searchQuery: ''
    })
  }, [])
  
  const removeSkill = useCallback((skill: string) => {
    setFilters(prev => {
      const newSkills = new Set(prev.selectedSkills)
      newSkills.delete(skill)
      return { ...prev, selectedSkills: newSkills }
    })
  }, [])
  
  const clearSearch = useCallback(() => {
    setFilters(prev => ({ ...prev, searchQuery: '' }))
  }, [])
  
  // Calculate active filters count
  const activeFiltersCount = filters.selectedSkills.size + 
    (filters.aiAccelerated ? 1 : 0) + 
    (filters.category !== 'All' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0)
  
  // Persist filter state in session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem('portfolio-filters-open')
      if (savedState === 'true') {
        setFiltersOpen(true)
      }
    }
  }, [])
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-filters-open', filtersOpen.toString())
    }
  }, [filtersOpen])
  
  return (
    <div className="not-prose">
      {/* Search Bar */}
      <div className="mb-6">
        <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search projects, clients, or skills..."
            className="w-full pl-10 pr-10 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        {filters.searchQuery && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
          >
            Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching &ldquo;{filters.searchQuery}&rdquo;
          </motion.p>
        )}
      </div>
      
      {/* Filter Header */}
      <div className="mb-8">
        <section aria-labelledby="filter-heading">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="min-w-0 flex-shrink-0">
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
                  Filters
                  <span className="ml-2 inline-flex items-center justify-center min-w-[2rem]">
                    {activeFiltersCount > 0 && (
                      <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        {activeFiltersCount}
                      </span>
                    )}
                  </span>
                </button>
              </div>
              
              <AIToggle 
                checked={filters.aiAccelerated}
                onChange={handleAIToggle}
              />
            </div>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          
          {/* Expandable Filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-6">
                    Filter by skill
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Object.entries(availableSkills).map(([groupName, skills]) => (
                      <div key={groupName} className="space-y-3">
                        <h4 className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                          {groupName}
                        </h4>
                        <div className="space-y-2">
                          {skills.map(skill => {
                            const count = skillCounts.get(skill) || 0
                            const isSelected = filters.selectedSkills.has(skill)
                            const isDisabled = count === 0 && !isSelected
                            
                            return (
                              <button
                                key={skill}
                                onClick={() => !isDisabled && handleSkillToggle(skill)}
                                disabled={isDisabled}
                                className={`inline-flex items-center justify-between w-full rounded-md font-medium transition-all duration-200 text-xs px-2 py-1 ${
                                  isSelected
                                    ? 'border border-emerald-600 text-emerald-800 bg-emerald-200/60 dark:border-emerald-500 dark:text-emerald-100 dark:bg-emerald-400/30'
                                    : isDisabled
                                    ? 'border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
                                    : 'border border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-600 dark:text-zinc-300 hover:border-emerald-300 hover:text-emerald-700 dark:hover:border-emerald-500 dark:hover:text-emerald-400'
                                }`}
                              >
                                <span className="truncate">{skill}</span>
                                <span className={`ml-2 ${isDisabled ? 'text-zinc-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                  {count}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Collapse Filters Button */}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
      
      {/* Active Filters Pills */}
      {filters.selectedSkills.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap items-center gap-2"
        >
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Active filters:</span>
          {Array.from(filters.selectedSkills).map(skill => (
            <motion.button
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => removeSkill(skill)}
              className="inline-flex items-center gap-x-1 rounded-md bg-emerald-100 dark:bg-emerald-900 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
            >
              {skill}
              <XMarkIcon className="h-3 w-3" />
            </motion.button>
          ))}
        </motion.div>
      )}
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2 xl:gap-x-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: index * 0.05,
                    duration: 0.3
                  }
                }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <RefactoredProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-sm mx-auto">
            <div className="text-zinc-400 mb-4">
              <FunnelIcon className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
              No projects match your filters
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {filters.searchQuery && (
                <>No results for &ldquo;{filters.searchQuery}&rdquo;. </>
              )}
              Try adjusting your filters to see more results.
            </p>
            {activeFiltersCount > 0 && (
              <div className="space-y-2">
                {filters.selectedSkills.size > 0 && (
                  <p className="text-sm text-zinc-500">
                    {filters.selectedSkills.size} skill filter{filters.selectedSkills.size > 1 ? 's' : ''} active
                  </p>
                )}
                {filters.aiAccelerated && (
                  <p className="text-sm text-zinc-500">
                    AI-accelerated filter active
                  </p>
                )}
                <button
                  onClick={clearAllFilters}
                  className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}