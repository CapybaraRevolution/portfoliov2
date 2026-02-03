"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const lastTouchTime = useRef<number>(0);

  // Handle client-side mounting for portal
  useEffect(() => {
    setIsMounted(true);
    // Detect mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    // Use a small delay to avoid immediate close on the same tap
    const timeoutId = setTimeout(() => {
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile, isVisible]);

  const calculatePosition = useCallback(() => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Tooltip dimensions - larger on mobile
    const tooltipWidth = isMobile ? Math.min(320, viewportWidth - 32) : 240;
    const tooltipHeight = contentRef.current?.scrollHeight || 100;

    // On mobile, center the tooltip horizontally and position above the element
    if (isMobile) {
      const centerX = (viewportWidth - tooltipWidth) / 2;
      let y = containerRect.top - tooltipHeight - 16;

      // If tooltip would go above viewport, position below instead
      if (y < 16) {
        y = containerRect.bottom + 16;
      }

      // If still would go below viewport, center vertically
      if (y + tooltipHeight > viewportHeight - 16) {
        y = Math.max(16, (viewportHeight - tooltipHeight) / 2);
      }

      return { x: centerX, y };
    }

    // Desktop positioning - follow mouse cursor style
    let x = containerRect.right + 12;
    let y = containerRect.top;

    // Check if tooltip goes beyond right edge
    if (x + tooltipWidth > viewportWidth - 16) {
      x = containerRect.left - tooltipWidth - 12;
    }

    // Check if tooltip goes beyond left edge
    if (x < 16) {
      x = 16;
    }

    // Check if tooltip goes beyond bottom edge
    if (y + tooltipHeight > viewportHeight - 16) {
      y = viewportHeight - tooltipHeight - 16;
    }

    // Check if tooltip goes beyond top edge
    if (y < 16) {
      y = 16;
    }

    return { x, y };
  }, [isMobile]);

  // Update position when visible
  useEffect(() => {
    if (isVisible) {
      const newPosition = calculatePosition();
      setTooltipPosition(newPosition);
    }
  }, [isVisible, calculatePosition]);

  // Recalculate on scroll
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const newPosition = calculatePosition();
      setTooltipPosition(newPosition);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isVisible, calculatePosition]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isMobile) return;
    // Skip if we just handled a touch event (prevents double-firing)
    if (Date.now() - lastTouchTime.current < 500) return;
    e.preventDefault();
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLSpanElement>) => {
    if (!isMobile) return;
    // Record touch time to prevent click from double-firing
    lastTouchTime.current = Date.now();
    e.preventDefault();
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  // Tooltip content component
  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          key="tooltip"
          initial={{ opacity: 0, scale: 0.95, y: isMobile ? 10 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: isMobile ? 10 : 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.2,
          }}
          className={cn(
            "fixed z-[9999] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900",
            // Larger on mobile for better readability
            isMobile ? "min-w-[280px] max-w-[calc(100vw-32px)]" : "min-w-[15rem] max-w-[20rem]"
          )}
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
          }}
        >
          <div
            ref={contentRef}
            className={cn(
              "text-zinc-600 dark:text-zinc-400",
              // Larger padding and text on mobile
              isMobile ? "p-4 text-base leading-relaxed" : "p-3 text-sm"
            )}
          >
            {content}
          </div>
          {/* Close hint on mobile */}
          {isMobile && (
            <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-2 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-500">
              Tap anywhere to close
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <span
        ref={containerRef}
        className={cn(
          "relative inline cursor-pointer",
          // Visual styling to indicate this is interactive/hoverable
          "text-emerald-700 dark:text-emerald-400",
          "underline decoration-emerald-500/40 decoration-dotted underline-offset-2",
          "hover:decoration-emerald-500 hover:decoration-solid",
          "transition-all duration-150",
          containerClassName
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        style={{ touchAction: "manipulation" }}
      >
        {children}
      </span>
      {/* Render tooltip in portal to escape overflow containers */}
      {isMounted && createPortal(tooltipContent, document.body)}
    </>
  );
};
