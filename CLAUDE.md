# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kyle McGraw's design and product portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. It features MDX support for content, interactive process flows, case studies, and a comment system powered by Supabase.

## Essential Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Building & Production
npm run build        # Build for production (runs linting and type checking)
npm run start        # Start production server
npm run lint         # Run ESLint

# Type Checking (no dedicated script, use directly)
npx tsc --noEmit     # Run TypeScript type checking
```

## Architecture & Key Patterns

### Component Organization

The codebase follows a drawer-based architecture for process documentation:
- **Drawer Components** (`src/app/process/(components)/drawers/`): Individual process methodology components that open in side drawers
- **ComponentDrawer** (`src/components/ComponentDrawer.tsx`): Main drawer container with swipe-to-dismiss on mobile
- **DrawerLayout** (`src/components/ui/DrawerLayout.tsx`): Centralized layout wrapper for all drawers with sticky header

### State Management

- **Hover States**: Prioritization table uses `hoveredIndex` state pattern to unify hover effects across multi-row items
- **Animation States**: Cascading animations use `isLoaded` and `isAnimating` flags with transition delays

### Key Implementation Details

1. **Mobile Drawer Dismissal**: ComponentDrawer detects swipe direction (horizontal vs vertical) with 30° angle threshold to prevent accidental dismissal during scrolling

2. **Table Row Hovering**: ProcessFlow.tsx prioritization table uses paired `<tr>` elements with shared hover state via `hoveredIndex`

3. **Z-Index Layering**: DrawerLayout applies `relative z-0` to scrollable content to prevent overlap with sticky headers

4. **Build Requirements**: ESLint must pass for production builds. Common issues:
   - Unescaped quotes/apostrophes in JSX (use HTML entities: `&quot;`, `&apos;`)
   - Missing alt text on images

### Environment Configuration

- Uses `.env.local` for environment variables (not tracked in git)
- Supabase integration for comments system
- Vercel deployment configuration

### MDX Content

- MDX files can be used as pages (`.mdx` extension)
- Custom MDX plugins configured in `src/mdx/` directory
- Search functionality integrated via `withSearch` wrapper

### Path Aliases

- `@/*` maps to `./src/*` for cleaner imports

## Common Patterns to Follow

- When fixing hover states, remove transition delays on background colors for instant feedback
- When implementing animations, apply transitions only to transform and opacity, not colors
- For drawer components, always test swipe behavior on mobile views
- Always run `npm run build` before pushing to ensure no ESLint errors break deployment