"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconDotsVertical } from "@tabler/icons-react";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}
export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay,
  autoplayDuration = 5000,
}: CompareProps) => {
  // Create a unique key for localStorage based on images
  const storageKey = `compare-slider-${firstImage}-${secondImage}`;
  
  // Try to load saved position from localStorage
  const getInitialPosition = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          return parsed;
        }
      }
    }
    return initialSliderPercentage;
  };

  const [sliderXPercent, setSliderXPercent] = useState(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [isMouseOver, setIsMouseOver] = useState(false);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, sliderXPercent.toString());
    }
  }, [sliderXPercent, storageKey]);

  // Auto-hide hint after 4 seconds
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowHint(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  function mouseEnterHandler() {
    setIsMouseOver(true);
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowHint(false);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    if (slideMode === "hover") {
      // Keep position where user left it
    }
    if (slideMode === "drag") {
      setIsDragging(false);
      // Keep position where user left it
    }
  }

  const handleStart = useCallback(
    (clientX: number) => {
      if (slideMode === "drag") {
        setIsDragging(true);
      }
      if (!hasInteracted) {
        setHasInteracted(true);
        setShowHint(false);
      }
    },
    [slideMode, hasInteracted]
  );

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      // Move on hover for both modes, or when dragging
      if (slideMode === "hover" || (slideMode === "drag" && (isMouseOver || isDragging))) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging, isMouseOver]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => handleStart(e.clientX),
    [handleStart]
  );
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX);
    },
    [handleStart]
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden", className)}
      style={{
        position: "relative",
        cursor: isDragging ? "grabbing" : "col-resize",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
          <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
          <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <>
              <motion.div 
                className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]"
                animate={!hasInteracted && showHint ? {
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    "0px -1px 0px 0px rgba(255,255,255,0.25)",
                    "0px 0px 12px 2px rgba(99,102,241,0.4)",
                    "0px -1px 0px 0px rgba(255,255,255,0.25)"
                  ]
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IconDotsVertical className="h-4 w-4 text-black" />
              </motion.div>
              
              {/* Drag hint tooltip */}
              <AnimatePresence>
                {showHint && !hasInteracted && slideMode === "drag" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="absolute top-1/2 -translate-y-1/2 -right-24 z-40 pointer-events-none"
                  >
                    <div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2 border border-neutral-200 dark:border-neutral-700">
                      <motion.span
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-0.5"
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60">
                          <path d="M4 1L1 4L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60">
                          <path d="M4 1L7 4L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.span>
                      Drag to compare
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden",
                firstImageClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <img
                alt="first image"
                src={firstImage}
                className={cn(
                  "absolute inset-0  z-20 rounded-2xl shrink-0 w-full h-full select-none",
                  firstImageClassName
                )}
                draggable={false}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.img
            className={cn(
              "absolute top-0 left-0 z-[19]  rounded-2xl w-full h-full select-none",
              secondImageClassname
            )}
            alt="second image"
            src={secondImage}
            draggable={false}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
