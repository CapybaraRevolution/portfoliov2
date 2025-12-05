"use client";
import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<any>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full pointer-events-auto overflow-hidden",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
      )}
    >
      {/* Subtle gradient at top - similar to homepage */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-96 z-[1] bg-gradient-to-b from-[#36b49f]/10 via-[#36b49f]/5 to-transparent dark:from-[#36b49f]/15 dark:via-[#36b49f]/8 dark:to-transparent mask-[radial-gradient(farthest-side_at_top,white,transparent)]" />
      
      {/* Grid container with fade edges */}
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-600"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
        
        {/* Left fade gradient - fades out ripple effect at left edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-[4] bg-gradient-to-r from-white via-white/30 to-transparent dark:from-zinc-900 dark:via-zinc-900/30 dark:to-transparent" />
        
        {/* Right fade gradient - fades out ripple effect at right edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-[4] bg-gradient-to-l from-white via-white/30 to-transparent dark:from-zinc-900 dark:via-zinc-900/30 dark:to-transparent" />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  // Use a large number of columns to ensure full width coverage
  // The fade masks will handle the edges smoothly
  const totalCols = Math.max(cols, 80); // Extended to cover more width (80 * 56px = 4480px)
  const totalCells = rows * totalCols;

  const cells = useMemo(
    () => Array.from({ length: totalCells }, (_, idx) => idx),
    [rows, totalCols, totalCells],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${totalCols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: `${totalCols * cellSize}px`,
    height: `${rows * cellSize}px`,
    marginLeft: "50%",
    transform: "translateX(-50%)",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / totalCols);
        const colIdx = idx % totalCols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        const hasRipple = clickedCell && distance > 0 && distance < 5;
        const rippleIntensity = clickedCell ? Math.max(0, 1 - distance / 5) : 0;
        
        // Calculate emerald border color intensity based on distance
        const emeraldBorderOpacity = hasRipple ? rippleIntensity * 0.6 : 0;
        const emeraldBorderColor = hasRipple 
          ? `rgba(16, 185, 129, ${emeraldBorderOpacity})` 
          : borderColor;
        
        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-all duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: emeraldBorderColor,
              transition: 'border-color 200ms ease-out',
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          >
            {/* Subtle emerald pulse that expands outward and returns - liquid glass effect */}
            {hasRipple && (
              <div
                className="absolute inset-0 rounded-sm bg-emerald-400/15 dark:bg-emerald-500/20"
                style={{
                  opacity: 0,
                  animation: `emerald-ripple ${duration}ms ease-out ${delay}ms forwards`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
