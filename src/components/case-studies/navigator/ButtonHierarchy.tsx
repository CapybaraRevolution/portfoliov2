"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ExternalLink, Coins } from 'lucide-react'

interface ButtonSpec {
  id: string
  color: string
  role: string
  roleBadgeClass: string
  usage: string
  example: string
  exampleIcon?: React.ReactNode
  context: string
  bullets?: string[]
  bgClass: string
  imageSrc: string
}

const buttonSpecs: ButtonSpec[] = [
  {
    id: "green",
    color: "Green",
    role: "Ideal action",
    roleBadgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    usage: "The action we want users to take",
    example: "CONTINUE",
    context: "Green buttons guide players toward the optimal path. When you see green, you know: this is what the game wants you to do next.",
    bullets: [
      "The guided choice—nudges players toward the intended experience",
      "Used for progression: continue, confirm, start",
      "Creates clear visual hierarchy when paired with other button colors",
      "Reinforces positive momentum in the player journey"
    ],
    bgClass: "bg-green-600",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-green.png"
  },
  {
    id: "orange",
    color: "Orange",
    role: "Primary action",
    roleBadgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    usage: "Important but not the guided path",
    example: "EQUIP",
    context: "Orange signals importance without prescription. It says \"this matters\" but doesn't push the player in a specific direction.",
    bullets: [
      "Important actions where players control the timing",
      "Navigation to key features and menus",
      "Equipping items, customizing characters",
      "High-value actions that aren't part of the critical path"
    ],
    bgClass: "bg-orange-500",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-orange.png"
  },
  {
    id: "blue",
    color: "Blue",
    role: "Informational",
    roleBadgeClass: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    usage: "Costs, values, learn more—no commitment",
    example: "500",
    exampleIcon: <Coins className="w-4 h-4" />,
    context: "Blue buttons communicate information, often with embedded values. They use a modular pattern: icon + currency amount + action label. This systematic approach kept the team aligned on how to present different currencies and costs.",
    bullets: [
      "Icon representing the currency type (coins, gems, premium currency)",
      "Numerical value clearly displayed",
      "Action label (\"BUY\", \"VIEW DETAILS\", \"UNLOCK\")",
      "No commitment—players can explore without purchasing"
    ],
    bgClass: "bg-sky-500",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-blue.png"
  },
  {
    id: "slate",
    color: "Slate",
    role: "Secondary",
    roleBadgeClass: "bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300",
    usage: "Supporting action, alternative to primary",
    example: "CANCEL",
    context: "Slate emerged during the UI reskin as our secondary action color. It's visually quieter than orange but still clearly interactive.",
    bullets: [
      "Cancel, back, close—the \"not right now\" options",
      "Doesn't compete with primary actions for attention",
      "Introduced mid-project to replace unused ghost button pattern",
      "Maintains interactivity while receding into the background"
    ],
    bgClass: "bg-slate-500",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-slate.png"
  },
  {
    id: "brown",
    color: "Brown",
    role: "Neutral",
    roleBadgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    usage: "Unobtrusive—ToS, external links, legal",
    example: "TERMS",
    context: "Brown buttons fade into the background intentionally. Things that need to be accessible but shouldn't compete for attention.",
    bullets: [
      "Legal links: Terms of Service, Privacy Policy",
      "External navigation (paired with external link icon)",
      "Low-priority UI navigation",
      "Created early, found specific use cases through systematic refinement"
    ],
    bgClass: "bg-amber-700",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-brown.png"
  },
  {
    id: "gray",
    color: "Gray",
    role: "Disabled",
    roleBadgeClass: "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400",
    usage: "Not available right now",
    example: "LOCKED",
    context: "Gray means \"not yet.\" The button exists, the action is real, but something blocks it.",
    bullets: [
      "Insufficient resources or currency",
      "Locked content requiring progression",
      "Active cooldown timers",
      "Teaches players conditions to revisit later"
    ],
    bgClass: "bg-gray-400",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-gray.png"
  },
  {
    id: "red",
    color: "Red",
    role: "Dangerous",
    roleBadgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    usage: "Destructive, irreversible, or premium currency",
    example: "DELETE",
    context: "Red demands attention and caution. The color creates a natural pause—players hesitate before tapping red, which is exactly the point.",
    bullets: [
      "Destructive actions: delete, dismantle, sell",
      "Irreversible decisions with lasting consequences",
      "Premium currency spending",
      "Visual warning system that slows down interaction"
    ],
    bgClass: "bg-red-600",
    imageSrc: "/images/case-studies/avatar-generations/buttons/button-red.png"
  },
]

export function ButtonHierarchy() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const selectedButton = buttonSpecs.find(spec => spec.id === selectedId)

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
      {/* Interactive Button Grid */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Button System
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Click to explore
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {buttonSpecs.map((spec, index) => {
            const isSelected = selectedId === spec.id
            
            return (
              <motion.button
                key={spec.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setSelectedId(isSelected ? null : spec.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 cursor-pointer",
                  // Hover state: subtle background fill only (no stroke)
                  "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50",
                  // Selected state: solid background
                  isSelected && "bg-zinc-200 dark:bg-zinc-800"
                )}
                style={isSelected ? { 
                  boxShadow: 'inset 0 0 0 2px #a1a1aa' 
                } : undefined}
              >
                <div className="relative w-[110px] h-[44px] sm:w-[120px] sm:h-[48px]">
                  <Image
                    src={spec.imageSrc}
                    alt={`${spec.color} button - ${spec.role}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors",
                  isSelected 
                    ? "text-zinc-900 dark:text-white" 
                    : "text-zinc-500"
                )}>
                  {spec.color}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Detail Panel - Progressive Disclosure */}
      <motion.div 
        className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 overflow-hidden"
        layout
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <AnimatePresence mode="wait">
          {selectedButton ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left: Color indicator and role */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedButton.id + "-left"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex items-center gap-4 md:w-48 shrink-0"
                  >
                    <div className={cn("w-5 h-5 rounded-full shrink-0", selectedButton.bgClass)} />
                    <div className="space-y-1.5">
                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {selectedButton.color}
                      </p>
                      <span className={cn(
                        "inline-block px-2 py-0.5 rounded-md text-xs font-medium",
                        selectedButton.roleBadgeClass
                      )}>
                        {selectedButton.role}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Right: Context and usage */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedButton.id + "-right"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex-1 space-y-3"
                  >
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {selectedButton.context}
                    </p>
                    
                    {selectedButton.bullets && (
                      <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {selectedButton.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-zinc-400 dark:text-zinc-500 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          Example:
                        </span>
                        <span className={cn(
                          "px-3 py-1 rounded text-sm font-semibold text-white flex items-center gap-1.5",
                          selectedButton.bgClass
                        )}>
                          {selectedButton.exampleIcon}
                          {selectedButton.example}
                        </span>
                      </div>
                      {selectedButton.id === "brown" && (
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <ExternalLink className="w-3 h-3" />
                          <span>Often paired with external link icon</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6"
            >
              <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
                Select a button above to learn how it fits into the visual language
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
