'use client';

/**
 * 🎭 Past Performances (Performance History)
 * 
 * Shows the user's past attended shows with an "Attended" badge.
 * Includes sort controls for date or title.
 */
import { ArrowLeft, ArrowUpDown, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Performance } from './mockData';

interface PastPerformancesProps {
  performances: Performance[];
  onBack: () => void;
}

export default function PastPerformances({
  performances,
  onBack,
}: PastPerformancesProps) {
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  const sortedPerformances = [...performances].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      // Sort in descending order (most recent first) for past performances
      return dateB.getTime() - dateA.getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F6F6F6] h-full overflow-auto overscroll-none scrollbar-hide pb-6"
    >
      {/* Header */}
      <div className="px-[17px] pt-12 pb-4 sticky top-0 bg-[#322F3C] z-20">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors mb-3"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-white text-xl font-semibold">Performance History</h1>
        <p className="text-sm text-white/70 mt-1">Your past attended shows</p>
      </div>

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

      {/* Past Performance Cards */}
      <div className="px-3 pt-2 space-y-4">
        {sortedPerformances.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#F6F6F6] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-8 text-[#888295]" />
            </div>
            <h3 className="text-[#322F3C] font-semibold mb-2">No Past Performances</h3>
            <p className="text-sm text-[#888295]">
              Your attended performances will appear here after the show dates pass.
            </p>
          </motion.div>
        ) : (
          sortedPerformances.map((perf, index) => (
            <motion.div
              key={perf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent"
            >
              <div className="flex gap-4 py-4 pl-4 pr-4">
                {/* Image */}
                <div className="relative shrink-0 self-center">
                  <img 
                    src={perf.image}
                    alt={perf.title}
                    className="rounded-lg w-24 h-24 object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[2px]" />
                </div>
                
                {/* Info Container */}
                <div className="flex flex-col justify-center flex-1 text-left gap-1">
                  <div className="flex items-start gap-2">
                    <h3 className="text-[#322F3C] font-semibold flex-1">{perf.title}</h3>
                    {/* Attended Badge - inline with title */}
                    <div className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1 shadow-sm shrink-0">
                      <CheckCircle className="size-3" />
                      <span className="hidden sm:inline">Attended</span>
                      <span className="sm:hidden">✓</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#888295] font-bold text-[13px]">{perf.date} • {perf.time}</p>
                  <p className="text-xs text-[#888295]">{perf.venue}</p>
                  <p className="text-xs text-[#888295]/70">{perf.seats}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

