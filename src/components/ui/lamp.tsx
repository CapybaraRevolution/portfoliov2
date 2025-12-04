"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-zinc-950",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 90deg at 50% 50%, #a7f3d0 0%, #10b981 50%, #a7f3d0 100%)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 90deg at 50% 50%, #a7f3d0 0%, #10b981 50%, #a7f3d0 100%)`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 90deg at 50% 50%, #a7f3d0 0%, #10b981 50%, #a7f3d0 100%)`,
          }}
          className="absolute inset-auto h-56 w-[30rem] blur-3xl"
        />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-emerald-400/50 dark:bg-emerald-500/60 opacity-50 dark:opacity-60 blur-2xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-72 w-64 -translate-y-[6rem] rounded-full bg-emerald-300/40 dark:bg-emerald-400/50 opacity-40 dark:opacity-50 blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-emerald-400/60 dark:bg-emerald-500/70"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

