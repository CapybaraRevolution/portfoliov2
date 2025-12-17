# Performance & Structure Audit (portfoliov2)

## What I looked at
- Stack/config: `package.json`, `next.config.mjs`, `tsconfig.json`, Tailwind 4 setup in `src/styles/tailwind.css`.
- Rendering shell: `src/app/layout.tsx`, `src/components/Layout.tsx`, `src/app/providers.tsx`, global analytics injectors.
- Home/content model: `src/app/page.mdx` (and other MDX pages), section discovery logic, navigation/layout components (`Header`, `Navigation`, `HeroPattern`).
- High-motion/global UI: `src/components/MercuryToast.tsx`, `src/components/ui/fade-in.tsx`, framer-motion usage, theme/search/mobile navigation.
- Media/visual effects: components still using `<img>` (`src/components/ui/image-gallery.tsx`, `SafeToolIcon.tsx`, etc.), particle effect in `src/components/ui/sparkles.tsx`.
- Data + APIs: case study data in `src/lib/caseStudies.ts`, client-side search helper `src/mdx/search.js`, comments API `src/app/api/comments/[itemId]/route.ts`.

## Quick snapshot of the stack
- Next.js 16 (App Router) + React 19, MDX pages; most routes already static via `export const dynamic = 'error'`.
- Tailwind 4 with a large custom animation palette; many client components (≈129 files begin with `'use client'`).
- Both `framer-motion` and `motion` packages are in use, so two animation runtimes can be bundled.
- Images pipeline exists (`scripts/optimize-images.js`), but several components still use raw `<img>` elements.

## Findings
- **Global client weight:** Core chrome (`Layout`, `Header`, `Navigation`, `MercuryToast`) is client-rendered and uses framer-motion, so every page hydrates a sizeable bundle even when static content would suffice.
- **Duplicate animation libs:** Mixed imports from `framer-motion` and `motion/react` risk shipping both runtimes instead of one optimized tree.
- **MercuryToast overhead:** The toast (`src/components/MercuryToast.tsx`) mounts everywhere, sets a 60fps interval to drive the ring, and pulls framer-motion into the root bundle even for visitors who never open it.
- **Image optimization gaps:** Several UI components still rely on `<img>` (e.g., `src/components/ui/image-gallery.tsx`, `SafeToolIcon.tsx`, `ui/carousel.tsx`). These bypass Next/Image (no responsive sizing, decoding hints, or blur placeholders).
- **Layout section discovery at runtime:** `src/app/layout.tsx` does a `fast-glob` + dynamic imports to collect sections on every build/render. This is fine for now but slows builds and prevents fully static export without Node I/O.
- **Search helper is client-only with logging:** `src/mdx/search.js` runs in the browser, dynamically imports case-study data, and logs queries/results. Good for prototyping, but it keeps search logic out of the static build and adds console noise.
- **Heavy visual effects:** `src/components/ui/sparkles.tsx` bundles `@tsparticles/*` (large) and is imported synchronously in a few places; there’s no guard for `prefers-reduced-motion`. Tailwind includes many keyframes even when unused.
- **Backups/duplicates increase noise:** Files like `ProcessFlow.tsx.backup` and `IAFlowsPanel.tsx.backup` live beside production code, making navigation harder and risking accidental imports.
- **Analytics always wired in layout:** GA and Hotjar are gated by `NODE_ENV`, but the components are still mounted in the root layout. That keeps layout client-bound and adds hydration work on every page.

## Recommended actions (prioritized)
1) **Reclaim client-side budget**
   - Move `MercuryToast` to a lazily loaded island (e.g., `next/dynamic` with `ssr: false`) and gate by route (`usePathname`) so only Mercury-related visitors download it. Replace the 16ms interval with a CSS animation + one `setTimeout` for auto-dismiss to avoid constant state churn.
   - Split the chrome: keep a server-driven `Layout` wrapper and mount a smaller client shell for nav/search/theme. Audit the ≈129 `'use client'` files and convert purely presentational pieces (logos, prose wrappers, static grids) back to server components to cut JS.
   - Standardize on **either** `motion` **or** `framer-motion` so the bundle only includes one animation runtime.

2) **Tighten image delivery**
   - Swap remaining `<img>` usages to `next/image` with width/height/sizes + `priority` where needed (`src/components/ui/image-gallery.tsx`, `ui/carousel.tsx`, `ui/compare.tsx`, `SafeToolIcon.tsx`, etc.).
   - Run `npm run img:opt` regularly; add `img:lint` to CI to catch oversize/unsupported formats before commit.

3) **Make section metadata static**
   - Replace the `fast-glob` + dynamic import loop in `src/app/layout.tsx` with a generated manifest (small JSON built at `prebuild`), or lift section arrays into a single `src/data/sections.ts`. That removes Node I/O from the layout and makes a future `output: 'export'` path straightforward.

4) **Control heavy/animated effects**
   - Load `SparklesCore` and other particle/animation-heavy widgets via `next/dynamic` and guard with `prefers-reduced-motion`. Keep them route-local so the homepage/work pages don’t pay for `@tsparticles/*` when not used.
   - Prune unused Tailwind keyframes and ensure motion wrappers (`FadeIn`, marquee, ripple) respect reduced-motion by default.

5) **Search/indexing**
   - Move the case-study index generation to build time (static JSON) and run queries in a Web Worker or serverless endpoint. Remove console logging from `src/mdx/search.js` to cut client noise.

6) **Analytics & third-party**
   - Consider lazy mounting GA/Hotjar only in production via `next/dynamic` or environment-checked wrappers so the root layout can stay server-rendered. Also add `data-testid` guards so they don’t block hydration when scripts are blocked.

7) **Codebase hygiene**
   - Remove or archive backup files (`*.backup`) and align component grouping (e.g., `/components/sections/…`, `/components/ui/…`, `/components/marketing/…`). This trims accidental imports and makes tree-shaking more predictable.
   - Add `next/font/local` for any brand typography to remove layout shift and rely less on networked fonts.

## “Static approach” guidance
- You already mark pages with `dynamic = 'error'`; continue treating new routes as static-first. For the static portfolio surface, aim for: no data fetching in client components, deterministic props from compiled data files, and route-level dynamic imports for anything interactive.
- If the API routes remain, keep them isolated; otherwise consider `output: 'export'` for a pure static deploy with a separate lightweight functions host for comments/contact.

## Fast wins to tackle first
- Lazy-load `MercuryToast` and gate it by path.
- Pick one animation library and migrate imports.
- Convert the `<img>` usages to `next/image`.
- Generate a static sections manifest to drop `fast-glob` from `src/app/layout.tsx`.
