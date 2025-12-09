"use client";
import React, { useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function ServicesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true); // Start visible
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Track when we're in the scroll zone (show until we've scrolled past)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest < 1);
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  // Control exit animation - slide up as if scrolling away
  const y = useTransform(scrollYProgress, [0.7, 1], ["0%", "-100%"]);

  // Fade out scroll indicator as user scrolls
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      {/* Scroll tracking container - determines animation duration */}
      <div
        ref={ref}
        className="relative h-[300vh] -mx-4 sm:-mx-6 lg:-mx-8"
      />
      
      {/* Fixed overlay that stays in place while scrolling through the tracking container */}
      {isInView && (
        <motion.div 
          style={{ y }}
          className="fixed inset-0 top-0 z-30 flex items-center justify-center bg-white dark:bg-zinc-900 lg:left-72 xl:left-80"
        >
          <div className="w-full h-full flex items-center justify-center relative">
            <GoogleGeminiEffect
              pathLengths={[
                pathLengthFirst,
                pathLengthSecond,
                pathLengthThird,
                pathLengthFourth,
                pathLengthFifth,
              ]}
              title="Build With Me"
              description="I align teams fast, map complex systems, and test what matters before committing code. Let's bring clarity and confidence to your next project."
            />
            
            {/* Bottom gradient fade to suggest more content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none" />
            
            {/* Scroll indicator - using CSS animation for better performance */}
            <motion.div
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-40"
            >
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Scroll to explore
              </span>
              <div className="flex flex-col items-center animate-bounce">
                <ChevronDownIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
