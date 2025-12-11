"use client"

import { useState, useRef } from 'react'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'
import { Sparkles, FileText, MessageCircle, Bot, CheckCircle2, ThumbsUp, ThumbsDown, Undo2, X, Send } from 'lucide-react'
import { Marquee } from '@/components/ui/marquee'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SparklesCore } from '@/components/ui/sparkles'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'
import { cn } from '@/lib/utils'
import { useMobileCenterDetection } from '@/hooks/useMobileCenterDetection'

const documentTypeColors = {
  Income: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50",
  Employment: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50",
  Assets: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50",
  Property: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50",
  Credit: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50",
}

const documents = [
  { name: "T4 Tax Form", type: "Income" as keyof typeof documentTypeColors },
  { name: "Pay Stub", type: "Income" as keyof typeof documentTypeColors },
  { name: "Employment Letter", type: "Employment" as keyof typeof documentTypeColors },
  { name: "Bank Statement", type: "Assets" as keyof typeof documentTypeColors },
  { name: "Property Appraisal", type: "Property" as keyof typeof documentTypeColors },
  { name: "Credit Report", type: "Credit" as keyof typeof documentTypeColors },
]

const formFields = [
  { field: "Full Name", value: "Auto-filled from ID" },
  { field: "Date of Birth", value: "Auto-filled from ID" },
  { field: "Address", value: "Auto-filled from utility bill" },
  { field: "Employer", value: "Auto-filled from pay stub" },
]

type ChatMessage = {
  type: "user" | "ai"
  text: string
  suggested?: boolean
}

const chatMessages: ChatMessage[] = [
  { type: "user", text: "How do I calculate my debt ratio?" },
  { type: "ai", text: "I can help with that! Add all monthly debt payments and divide by gross monthly income.", suggested: true },
  { type: "user", text: "What documents do I need?" },
  { type: "ai", text: "For your application, you'll need proof of income, employment verification, and asset statements.", suggested: true },
  { type: "user", text: "What's the next step in my application?" },
  { type: "ai", text: "Next, we'll need to verify your employment history and review your credit report.", suggested: true },
  { type: "user", text: "How long does approval take?" },
  { type: "ai", text: "Typically 2-3 business days once all documents are submitted and verified.", suggested: true },
]

export function AIFeaturesBento() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [feedbackState, setFeedbackState] = useState<{ [key: string]: 'idle' | 'thumbsUp' | 'feedback' | 'submitted' }>({})
  const [showFeedbackModal, setShowFeedbackModal] = useState<string | null>(null)
  const [isExiting, setIsExiting] = useState(false)
  const [dismissedFields, setDismissedFields] = useState<Set<number>>(new Set())
  const [isResetting, setIsResetting] = useState(false)
  const confettiRef = useRef<ConfettiRef>(null)
  
  // Mobile center detection for scroll-based hover effect
  const { refs: cardRefs, centeredIndex, isMobile } = useMobileCenterDetection<HTMLDivElement>(4)
  
  // Helper to check if a card should show active styles on mobile
  const isMobileCentered = (cardIndex: number) => isMobile && centeredIndex === cardIndex

  const handleCardClick = (cardName: string) => {
    setActiveCard(activeCard === cardName ? null : cardName)
  }

  const handleThumbsUp = (messageId: string) => {
    setFeedbackState(prev => ({ ...prev, [messageId]: 'thumbsUp' }))
  }

  const handleThumbsDown = (messageId: string) => {
    setFeedbackState(prev => ({ ...prev, [messageId]: 'feedback' }))
  }

  const handleSendFeedback = (messageId: string) => {
    setShowFeedbackModal(messageId)
    setIsExiting(false)
  }

  const closeFeedbackModal = () => {
    setIsExiting(true)
    setTimeout(() => {
      setShowFeedbackModal(null)
      setIsExiting(false)
    }, 400) // Match animation duration
  }

  const handleSubmitFeedback = (messageId: string) => {
    // Fire confetti Easter egg!
    if (confettiRef.current) {
      confettiRef.current.fire({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#a855f7', '#8b5cf6', '#7c3aed', '#ec4899', '#f472b6', '#fbbf24'],
      })
    }
    
    setIsExiting(true)
    setTimeout(() => {
      setShowFeedbackModal(null)
      setIsExiting(false)
      setFeedbackState(prev => ({ ...prev, [messageId]: 'submitted' }))
    }, 500) // Match exit animation duration
  }

  const handleDismissField = (fieldIndex: number) => {
    setDismissedFields(prev => {
      const newSet = new Set(prev)
      newSet.add(fieldIndex)
      
      // Check if all fields are dismissed
      if (newSet.size === formFields.length) {
        // Reset after a brief delay
        setTimeout(() => {
          setIsResetting(true)
          setDismissedFields(new Set())
          // Reset the resetting flag after animation completes
          setTimeout(() => setIsResetting(false), formFields.length * 100 + 300)
        }, 500)
      }
      
      return newSet
    })
  }

  return (
    <>
    {/* Confetti canvas for Easter egg celebration */}
    <Confetti 
      ref={confettiRef} 
      manualstart 
      className="pointer-events-none fixed inset-0 z-[200]" 
    />
    <BentoGrid className="md:grid-cols-2 lg:grid-cols-4 auto-rows-[22rem]">
      {/* Smart Form Assist - with sparkles */}
      <BentoCard
        ref={cardRefs[0]}
        name="Smart Form Assist"
        description="Reduce typing and rework with intelligent form pre-filling"
        Icon={Sparkles}
        className="col-span-3 md:col-span-1 lg:col-span-2 cursor-pointer"
        onClick={() => handleCardClick('smart-form')}
        hideContentOnHover={true}
        isMobileActive={isMobileCentered(0)}
        background={
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50" />
            <SparklesCore
              id="smart-form-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={80}
              className="w-full h-full"
              particleColor="#71717a"
            />
            {/* Progressive fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50 dark:to-neutral-900/80 pointer-events-none" />
            
            <div className="absolute top-4 left-4 right-4 bottom-4 overflow-hidden">
              {formFields.map((field, idx) => {
                const isDismissed = dismissedFields.has(idx)
                
                return (
                  <div
                    key={idx}
                    className={cn(
                      "relative rounded-lg border p-3 backdrop-blur-sm overflow-hidden",
                      "bg-neutral-200/80 dark:bg-neutral-800/50",
                      "border-neutral-300 dark:border-neutral-700",
                      "transition-all duration-300 ease-out",
                      activeCard === 'smart-form' && "lg:bg-emerald-50/90 dark:lg:bg-emerald-950/30 lg:border-emerald-200 dark:lg:border-emerald-800",
                      "group-hover:bg-emerald-50/90 dark:group-hover:bg-emerald-950/30 group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
                      // Mobile center detection - apply hover styles when centered
                      isMobileCentered(0) && "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
                      // Dismissal animation - collapse height and fade
                      isDismissed ? "opacity-0 scale-95 -translate-x-4 max-h-0 mb-0 p-0 border-0" : "max-h-24 mb-2",
                      // Cascading entrance animation when resetting
                      isResetting && !isDismissed && "animate-in slide-in-from-right-4 fade-in duration-300"
                    )}
                    style={
                      isResetting && !isDismissed 
                        ? { animationDelay: `${idx * 100}ms` }
                        : {}
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className={cn(
                          "text-xs font-medium text-neutral-500 dark:text-neutral-400 transition-colors duration-300",
                          activeCard === 'smart-form' && "lg:text-emerald-700 dark:lg:text-emerald-300",
                          "group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
                          isMobileCentered(0) && "text-emerald-700 dark:text-emerald-300"
                        )}>
                          {field.field}
                        </div>
                        <div className={cn(
                          "text-sm text-neutral-400 dark:text-neutral-500 italic transition-colors duration-300",
                          activeCard === 'smart-form' && "lg:text-emerald-600 dark:lg:text-emerald-400",
                          "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
                          isMobileCentered(0) && "text-emerald-600 dark:text-emerald-400"
                        )}>
                          {field.value}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleDismissField(idx)}
                          className={cn(
                            "p-1 rounded hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 transition-all duration-200 group/undo",
                            activeCard === 'smart-form' && "lg:hover:bg-emerald-100 dark:lg:hover:bg-emerald-900/50",
                            "group-hover:hover:bg-emerald-100 dark:group-hover:hover:bg-emerald-900/50"
                          )}
                        >
                          <Undo2 className={cn(
                            "h-3 w-3 text-neutral-400 dark:text-neutral-600 transition-all duration-200",
                            "group-hover/undo:rotate-180 group-hover/undo:scale-110",
                            activeCard === 'smart-form' && "lg:text-emerald-600 dark:lg:text-emerald-400",
                            "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
                            isMobileCentered(0) && "text-emerald-600 dark:text-emerald-400"
                          )} />
                        </button>
                        <button 
                          onClick={() => handleDismissField(idx)}
                          className={cn(
                            "p-1 rounded hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 transition-all duration-200 group/check",
                            activeCard === 'smart-form' && "lg:hover:bg-emerald-100 dark:lg:hover:bg-emerald-900/50",
                            "group-hover:hover:bg-emerald-100 dark:group-hover:hover:bg-emerald-900/50"
                          )}
                        >
                          <CheckCircle2 className={cn(
                            "h-4 w-4 text-neutral-400 dark:text-neutral-600 transition-all duration-200",
                            "group-hover/check:scale-110",
                            activeCard === 'smart-form' && "lg:text-emerald-600 dark:lg:text-emerald-400",
                            "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
                            isMobileCentered(0) && "text-emerald-600 dark:text-emerald-400"
                          )} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
      />

      {/* Document Classification - with marquee and ticker */}
      <BentoCard
        ref={cardRefs[1]}
        name="Document Classification"
        description="Predictive classification so humans can spend more time confirming instead of individually classifying bulk document uploads"
        Icon={FileText}
        className="col-span-3 md:col-span-1 lg:col-span-2 cursor-pointer"
        onClick={() => handleCardClick('document')}
        isMobileActive={isMobileCentered(1)}
        badge={
          <div className={cn(
            "flex items-baseline gap-1 rounded-full border backdrop-blur-sm px-2.5 py-0.5 text-xs transition-colors duration-300",
            "border-neutral-300 dark:border-neutral-700 bg-neutral-200/80 dark:bg-neutral-800/80",
            activeCard === 'document' && "lg:border-emerald-200 dark:lg:border-emerald-800 lg:bg-emerald-50/80 dark:lg:bg-emerald-950/30",
            "group-hover:border-emerald-200 dark:group-hover:border-emerald-800 group-hover:bg-emerald-50/80 dark:group-hover:bg-emerald-950/30",
            isMobileCentered(1) && "border-emerald-200 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/30"
          )}>
            <span className={cn(
              "font-bold text-neutral-600 dark:text-neutral-400 transition-colors duration-300",
              activeCard === 'document' && "lg:text-emerald-700 dark:lg:text-emerald-300",
              "group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
              isMobileCentered(1) && "text-emerald-700 dark:text-emerald-300"
            )}>
              <NumberTicker value={94.5} />%
            </span>
            <span className={cn(
              "text-neutral-500 dark:text-neutral-500 transition-colors duration-300",
              activeCard === 'document' && "lg:text-emerald-600 dark:lg:text-emerald-400",
              "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
              isMobileCentered(1) && "text-emerald-600 dark:text-emerald-400"
            )}>accuracy</span>
          </div>
        }
        background={
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50">
            <Marquee
              pauseOnHover
              className="absolute top-10 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)] [--duration:20s]"
            >
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
                    "border-neutral-300 bg-neutral-200/80 dark:border-neutral-700 dark:bg-neutral-800/80",
                    "backdrop-blur-sm transition-all duration-300 ease-out"
                  )}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {doc.name}
                    </div>
                    <div className={cn(
                      "inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-300",
                      "bg-neutral-300/80 text-neutral-500 dark:bg-neutral-700/80 dark:text-neutral-400",
                      activeCard === 'document' && `lg:${documentTypeColors[doc.type]}`,
                      `group-hover:${documentTypeColors[doc.type]}`,
                      isMobileCentered(1) && documentTypeColors[doc.type]
                    )}>
                      {doc.type}
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        }
      />

      {/* Conversational Guidance - with animated messages */}
      <BentoCard
        ref={cardRefs[2]}
        name="Conversational Guidance"
        description="Lightweight conversational guidance for complex steps"
        Icon={MessageCircle}
        className="col-span-3 md:col-span-1 lg:col-span-2 cursor-pointer"
        onClick={() => handleCardClick('chat')}
        hideContentOnHover={true}
        isMobileActive={isMobileCentered(2)}
        background={
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50">
            {/* Progressive fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50 dark:to-neutral-900/80 pointer-events-none" />
            
            <Marquee
              vertical
              pauseOnHover={!showFeedbackModal}
              className={cn(
                "absolute inset-0 [--duration:30s]",
                // Keep paused while modal is visible (including during exit animation)
                showFeedbackModal && "[animation-play-state:paused]!important"
              )}
            >
              <div className="space-y-3 px-4 py-4">
                {chatMessages.map((message, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex transition-all duration-300 ease-out",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className="relative max-w-[80%]">
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2 text-sm backdrop-blur-sm transition-all duration-300",
                          message.type === "user"
                            ? cn(
                                "bg-neutral-200/80 dark:bg-neutral-700/80 border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400",
                                activeCard === 'chat' && "lg:bg-purple-100/80 dark:lg:bg-purple-950/30 lg:border-purple-200 dark:lg:border-purple-800 lg:text-purple-900 dark:lg:text-purple-100",
                                "group-hover:bg-purple-100/80 dark:group-hover:bg-purple-950/30 group-hover:border-purple-200 dark:group-hover:border-purple-800 group-hover:text-purple-900 dark:group-hover:text-purple-100",
                                isMobileCentered(2) && "bg-purple-100/80 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100"
                              )
                            : cn(
                                "bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400",
                                activeCard === 'chat' && "lg:bg-white/90 dark:lg:bg-neutral-800/90 lg:border-purple-200 dark:lg:border-purple-800 lg:text-purple-700 dark:lg:text-purple-300",
                                "group-hover:bg-white/90 dark:group-hover:bg-neutral-800/90 group-hover:border-purple-200 dark:group-hover:border-purple-800 group-hover:text-purple-700 dark:group-hover:text-purple-300",
                                isMobileCentered(2) && "bg-white/90 dark:bg-neutral-800/90 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                              )
                        )}
                      >
                        {message.text}
                      </div>
                      {message.type === "ai" && (
                        <div className={cn(
                          "flex items-center gap-1 mt-1",
                          "justify-start"
                        )}>
                          {feedbackState[`chat-${idx}`] === 'thumbsUp' ? (
                            <div className="flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <CheckCircle2 className={cn(
                                "h-3 w-3 text-purple-600 dark:text-purple-400 animate-in zoom-in-50 duration-300"
                              )} />
                              <span className="text-xs text-purple-600 dark:text-purple-400 animate-in fade-in duration-300 delay-100">Thanks!</span>
                            </div>
                          ) : feedbackState[`chat-${idx}`] === 'submitted' ? (
                            <div className="flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <CheckCircle2 className={cn(
                                "h-3 w-3 text-purple-600 dark:text-purple-400 animate-in zoom-in-50 duration-300"
                              )} />
                              <span className="text-[10px] text-purple-600 dark:text-purple-400 animate-in fade-in duration-300 delay-100">Thanks for providing your feedback</span>
                            </div>
                          ) : feedbackState[`chat-${idx}`] === 'feedback' ? (
                            <div className="flex items-center gap-1 animate-in fade-in slide-in-from-left-2 duration-300">
                              <button
                                onClick={() => handleSendFeedback(`chat-${idx}`)}
                                className={cn(
                                  "text-[10px] text-purple-700 dark:text-purple-300 transition-all duration-200",
                                  "hover:underline hover:text-purple-900 dark:hover:text-purple-100"
                                )}
                              >
                                Send feedback
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleThumbsUp(`chat-${idx}`)}
                                className={cn(
                                  "p-0.5 rounded hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 transition-all duration-300 group/thumb",
                                  activeCard === 'chat' && "lg:hover:bg-purple-100 dark:lg:hover:bg-purple-900/50",
                                  "group-hover:hover:bg-purple-100 dark:group-hover:hover:bg-purple-900/50"
                                )}
                              >
                                <ThumbsUp className={cn(
                                  "h-3 w-3 text-neutral-400 dark:text-neutral-600 transition-all duration-300",
                                  "group-hover/thumb:scale-110 group-hover/thumb:-rotate-12",
                                  activeCard === 'chat' && "lg:text-purple-600 dark:lg:text-purple-400",
                                  "group-hover:text-purple-600 dark:group-hover:text-purple-400",
                                  isMobileCentered(2) && "text-purple-600 dark:text-purple-400"
                                )} />
                              </button>
                              <button
                                onClick={() => handleThumbsDown(`chat-${idx}`)}
                                className={cn(
                                  "p-0.5 rounded hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 transition-all duration-300 group/thumb",
                                  activeCard === 'chat' && "lg:hover:bg-purple-100 dark:lg:hover:bg-purple-900/50",
                                  "group-hover:hover:bg-purple-100 dark:group-hover:hover:bg-purple-900/50"
                                )}
                              >
                                <ThumbsDown className={cn(
                                  "h-3 w-3 text-neutral-400 dark:text-neutral-600 transition-all duration-300",
                                  "group-hover/thumb:scale-110 group-hover/thumb:rotate-12",
                                  activeCard === 'chat' && "lg:text-purple-600 dark:lg:text-purple-400",
                                  "group-hover:text-purple-600 dark:group-hover:text-purple-400",
                                  isMobileCentered(2) && "text-purple-600 dark:text-purple-400"
                                )} />
                              </button>
                            </>
                          )}
                          
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
            
            {/* Feedback Modal - Fixed position in center of screen */}
            {showFeedbackModal && showFeedbackModal.startsWith('chat-') && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
                <div
                  className={cn(
                    "absolute inset-0 bg-black/20 dark:bg-black/40 transition-opacity duration-300",
                    isExiting ? "opacity-0" : "animate-in fade-in duration-200"
                  )}
                  onClick={closeFeedbackModal}
                />
                <div className={cn(
                  "relative w-64 bg-white dark:bg-neutral-800 rounded-xl border-2 border-purple-200 dark:border-purple-800 shadow-2xl p-4 transition-all duration-500",
                  isExiting 
                    ? "scale-50 -rotate-12 translate-y-8 opacity-0" 
                    : "animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 scale-100 rotate-0 translate-y-0 opacity-100"
                )}>
                  <button
                    onClick={closeFeedbackModal}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-purple-100 dark:bg-purple-900 border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    <X className="h-3 w-3 text-purple-700 dark:text-purple-300" />
                  </button>
                  <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    What went wrong?
                  </h3>
                  <textarea
                    placeholder="Tell us how we can improve..."
                    className="w-full text-xs p-2 rounded-lg border border-purple-200 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-100 placeholder:text-purple-400 dark:placeholder:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 resize-none"
                    rows={3}
                  />
                  <button
                    onClick={() => handleSubmitFeedback(showFeedbackModal)}
                    className="mt-2 w-full flex items-center justify-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                  >
                    <Send className="h-3 w-3" />
                    Send Feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* AI Writing Assistant - with image */}
      <BentoCard
        ref={cardRefs[3]}
        name="AI Writing Assistant"
        description="Draft broker-to-client messages with AI assistance and human approval before sending"
        Icon={Bot}
        className="col-span-3 md:col-span-1 lg:col-span-2 cursor-pointer"
        onClick={() => handleCardClick('writing')}
        isMobileActive={isMobileCentered(3)}
        background={
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50">
            {/* AI Tools Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src="/images/case-studies/breeze-mortgage-hub/aitools.png"
                alt="AI Writing Tools Interface"
                className={cn(
                  "w-full h-full object-cover transition-all duration-500 ease-out",
                  "opacity-40 grayscale scale-110",
                  activeCard === 'writing' && "lg:opacity-90 lg:grayscale-0",
                  "group-hover:opacity-90 group-hover:grayscale-0",
                  isMobileCentered(3) && "opacity-90 grayscale-0"
                )}
              />
            </div>
            
            {/* Overlay for better text contrast */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br transition-all duration-500",
              "from-neutral-50/80 to-neutral-100/80 dark:from-neutral-900/80 dark:to-neutral-800/80",
              activeCard === 'writing' && "lg:from-blue-50/60 lg:to-indigo-50/60 dark:lg:from-blue-950/40 dark:lg:to-indigo-950/40",
              "group-hover:from-blue-50/60 group-hover:to-indigo-50/60 dark:group-hover:from-blue-950/40 dark:group-hover:to-indigo-950/40",
              isMobileCentered(3) && "from-blue-50/60 to-indigo-50/60 dark:from-blue-950/40 dark:to-indigo-950/40"
            )} />
          </div>
        }
      />
    </BentoGrid>
    </>
  )
}

