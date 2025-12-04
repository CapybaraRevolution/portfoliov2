'use client'

import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItem {
  title: string
  content: string | React.ReactNode
}

interface AccordionPanelProps {
  items: AccordionItem[]
  className?: string
}

export function AccordionPanel({ items, className }: AccordionPanelProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={className}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-150"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
                {item.title}
              </h3>
              <motion.div
                animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ChevronDownIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openItems.has(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700 pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}