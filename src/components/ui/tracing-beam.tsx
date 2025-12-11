"use client";
import React, { useEffect, useRef, useState, useCallback, useId } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const gradientId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Use scroll progress relative to the component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Update height on mount and when content changes
  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      if (height > 0) {
        setSvgHeight(height);
      }
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    updateHeight();

    // Use ResizeObserver to track content height changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    // Also update on window resize
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [updateHeight]);

  // Delayed height update after children render
  useEffect(() => {
    const timeoutId = setTimeout(updateHeight, 100);
    return () => clearTimeout(timeoutId);
  }, [children, updateHeight]);

  // Responsive spring config
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const springConfig = isMobile 
    ? { stiffness: 200, damping: 40 }
    : { stiffness: 400, damping: 70 };

  // Create smooth animated values for the gradient
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]),
    springConfig,
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, Math.max(0, svgHeight - 200)]),
    springConfig,
  );

  // Don't render beam until mounted and we have a valid height
  const showBeam = isMounted && svgHeight > 0;

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full", className)}
    >
      {/* Responsive grid: beam column + content column */}
      <div className="grid grid-cols-[20px_1fr] sm:grid-cols-[24px_1fr] md:grid-cols-[32px_1fr] gap-3 sm:gap-4 md:gap-6">
        {/* Beam column - z-30 to be above neon effects (z-20) but below nav (z-40) */}
        <div className="relative z-30 flex justify-center">
          {showBeam && (
            <svg
              viewBox={`0 0 20 ${svgHeight}`}
              width="20"
              height={svgHeight}
              className="absolute top-0"
              aria-hidden="true"
              style={{ overflow: 'visible' }}
            >
              {/* Background track */}
              <path
                d={`M 10 0 V ${svgHeight}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeWidth="2"
                className="text-zinc-400 dark:text-zinc-600"
              />
              {/* Animated gradient beam */}
              <motion.path
                d={`M 10 0 V ${svgHeight}`}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                strokeLinecap="round"
                className="motion-reduce:hidden"
              />
              <defs>
                <motion.linearGradient
                  id={gradientId}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  x2="0"
                  y1={y1}
                  y2={y2}
                >
                  <stop stopColor="#10b981" stopOpacity="0" />
                  <stop stopColor="#10b981" />
                  <stop offset="0.5" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
                </motion.linearGradient>
              </defs>
            </svg>
          )}
        </div>
        
        {/* Content column */}
        <div ref={contentRef} className="min-w-0">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
