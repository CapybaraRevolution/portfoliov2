'use client'

import { Ticket, Menu, ArrowUpDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export interface Performance {
  id: string
  title: string
  date: string
  time: string
  venue: string
  seats: string
  image: string
}

interface PerformanceListProps {
  performances: Performance[]
  onSelectPerformance: (performance: Performance) => void
  onOpenMenu: () => void
}

export default function PerformanceList({
  performances,
  onSelectPerformance,
  onOpenMenu,
}: PerformanceListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  const sortedPerformances = [...performances].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  return (
    <div className="bg-[#F6F6F6] h-full overflow-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header - Added more padding for notch */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-[17px] pt-12 pb-4 sticky top-0 bg-[#322F3C] z-10"
      >
        <div className="relative flex items-center justify-center">
          {/* Hamburger Menu Button */}
          <button 
            onClick={onOpenMenu}
            className="absolute left-0 text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            <Menu className="size-6" />
          </button>
          
          {/* Logo */}
          <div className="w-[120px] h-[50px] flex items-center justify-center relative">
            <Image 
              src="/images/case-studies/houston-ballet/houston-ballet-logo.png" 
              alt="Houston Ballet" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* Sort Controls */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="size-4 text-[#888295]" />
          <span className="text-xs text-[#888295]">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                sortBy === 'date'
                  ? 'bg-[#322F3C] text-white'
                  : 'bg-white text-[#888295] hover:bg-[#322F3C]/10'
              }`}
            >
              Date
            </button>
            <button
              onClick={() => setSortBy('title')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                sortBy === 'title'
                  ? 'bg-[#322F3C] text-white'
                  : 'bg-white text-[#888295] hover:bg-[#322F3C]/10'
              }`}
            >
              Title
            </button>
          </div>
        </div>
      </div>
      
      {/* Performance Cards */}
      <div className="px-3 pt-2 space-y-4">
        {sortedPerformances.map((perf, index) => (
          <motion.button
            key={perf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPerformance(perf)}
            className="w-full bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all border-2"
            style={{ borderColor: 'transparent' } as React.CSSProperties}
          >
            <div className="flex gap-4 py-4 pl-4 pr-4">
              {/* Image */}
              <div className="relative shrink-0 self-center w-24 h-24">
                <Image 
                  src={perf.image}
                  alt={perf.title}
                  fill
                  className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[2px]" />
              </div>
              
              {/* Info Container */}
              <div className="flex flex-col justify-center flex-1 text-left gap-1">
                <h3 className="text-[#322F3C] group-hover:text-[#888295] transition-colors">{perf.title}</h3>
                <p className="text-sm text-[#888295] font-bold text-[13px]">{perf.date} • {perf.time}</p>
                <p className="text-xs text-[#888295]">{perf.venue}</p>
                <p className="text-xs text-[#888295]/70">{perf.seats}</p>
              </div>

              {/* Arrow Button */}
              <div className="self-center shrink-0">
                <div className="w-8 h-8 rounded-full border border-[#888295]/30 flex items-center justify-center text-[#322F3C] group-hover:border-[#322F3C] group-hover:bg-[#322F3C]/5 transition-all">
                  →
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
