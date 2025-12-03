# Magic UI integration + Raycast v2 alignment (current state of repo)

## 0) Big-picture architecture & design system

- **Tailwind version**: Tailwind v4.1.11 (`tailwindcss` dep) with v4-style `@import 'tailwindcss'` in `src/styles/tailwind.css`. Typography plugin config lives in `typography.ts`.
- **Magic UI/shadcn status**: No shadcn-style CLI integration. Magic UI pieces were hand-copied into `src/components/ui` (animated-beam, background-ripple-effect, 3d-marquee) and wrapped into higher-level Raycast components under `src/components/` (e.g., `RaycastInspiredGallery.tsx`, `ThreeDMarqueeDemo.tsx`). No generated registries.
- **v3 vs v4 docs**: Using Tailwind v4; no legacy v3 Magic UI usage detected.
- **Primitives vs compositions**: Low-level UI experiments now live under `src/components/ui/`; compositions under `src/components/` (and `src/app/lab/raycast/page.tsx` for the playground). Existing legacy components also sit in `src/components` (Button, Layout, etc.).
- **Design tokens**: `src/styles/tailwind.css` defines CSS vars for `bg-background`, `text-foreground`, etc., plus radius tokens. Many legacy components still use hard-coded `bg-zinc-*`/`text-white` classes; the new experimental components also mostly hard-code colors. Tokens are not yet consistently applied across the system.
- **Motion stack**: Framer Motion is used throughout (`Header`, animations in hero, etc.) plus some CSS keyframes in `tailwind.css`. No Magic UI Motion primitives in use. No known perf constraints documented; no global guard on “animation budget” yet.

## 1) Theming & theme toggler

- **Theme management**: `next-themes` with `ThemeProvider attribute="class" disableTransitionOnChange` in `src/app/providers.tsx`, mounted at the root layout (`src/app/layout.tsx`). Theme is applied via class on `<html>`, with `suppressHydrationWarning` on `<html>` and dark mode supported.
- **Theme watcher**: `ThemeWatcher` in `providers.tsx` watches `prefers-color-scheme` and flips to `system` when user preference matches resolved theme.
- **Toggler location**: UI lives in `src/components/ThemeToggle.tsx`; renders a simple button swapping `setTheme('light'|'dark')` with mounted-state guard. Used in `src/components/Header.tsx`.
- **Scope**: Applies globally (all routes including MDX) via Provider at root; no nav wiring beyond Header button.
- **Known quirks**: Minimal; relies on mounted state to avoid hydration mismatch. No custom animations on toggle. No SSR gating beyond `disableTransitionOnChange`.
- **For Magic UI AnimatedThemeToggler**: Current API is compatible with `setTheme('light'|'dark')`; an adapter should be trivial. We should consider delaying render until mounted if Magic UI’s icon desync bug reproduces. No special color modes beyond light/dark/system.
- **Token usage coverage**: Not universal. To benefit from theme toggles, many components would need refactors from hard-coded `bg-zinc-*`/`text-white` to tokenized classes.

## 2) Case-study data & NumberTicker

- **Storage format**: Mixed. Several case studies are MDX (`src/app/case-studies/ecommerce/page.mdx`, etc.), some TSX redirects (`.../fintech/page.tsx`), and some TSX layouts. No central data model or frontmatter schema for metrics.
- **Impact metrics**: Currently inline prose, not structured data; no NumberTicker usage.
- **Recommended API** (net-new): `metrics: { label: string; value: number; suffix?: string; description?: string }[]` passed into a shared `ImpactSection` component. All current metrics would need to be extracted from copy or added as new fields.
- **Animation trigger**: Preference not defined; IntersectionObserver-once would keep SSR-friendly pages and limit motion. Acceptable to mark the metrics block `use client` while keeping page shells server-rendered.
- **Fallback/a11y**: No current pattern. Numbers should degrade to static text; add `aria-label` for screen readers when implementing.

## 3) Text treatments (MorphingText, AuroraText)

- **Localization**: No i18n setup; all strings are hard-coded in MDX/TSX. MorphingText inputs would be static arrays unless we introduce a CMS/translation layer.
- **Placement ideas**: Heroes (home/services) would be the natural spots; not yet used.
- **Motion preferences**: No global motion policy beyond CSS `prefers-reduced-motion` overrides in `tailwind.css` for some keyframes. If we add MorphingText, we should honor `prefers-reduced-motion` and consider single-run or long-interval rotations.
- **Color/theming**: Aurora gradients should be aligned to brand tokens; current components often hard-code colors, so we’d want light/dark variants for legibility.

## 4) Visual frames & image interaction (Safari, Lens)

- **Image handling today**: Predominantly `next/image` across components (`CaseStudyLayout`, `EnhancedPhoto`, etc.). Assets live in `public/`; experiments allow `assets.aceternity.com` via `next.config.mjs` for remote images.
- **Safari mock**: Not used today. Case-study heroes are plain images or MDX content; adding Safari would be net-new and should respect wrapper-controlled aspect ratio.
- **Lens**: Not present. Would be client-only and likely desktop-first; mixing `img` with `next/image` would need a consistent approach. Consider breakpoint gating if added.
- **Performance**: No special lazy strategies beyond Next/Image defaults. No documented perf budgets; would need to watch image-heavy pages if adding interactive frames.

## 5) Scroll & page-level feedback (ScrollProgress)

- **Current state**: No scroll-progress component in use. Case studies are rendered via shared `Layout` and MDX components; no progress bar.
- **Integration considerations**: Could wrap long-form layouts (MDX pages) with a provider in a shared layout, but would need a client boundary. No conflicting sticky headers besides the existing top nav (fixed); bar placement should account for that.
- **Accessibility**: No current policy; should respect `prefers-reduced-motion` and smooth updates if added.

## 6) Decorative effects & emphasis

- **ShineBorder**: Not present. If adopted, better as a dedicated wrapper (e.g., `FeaturedCard`) around CTAs/hero cards to avoid ad-hoc usage. Colors should follow accent tokens (emerald/brand), not random neon.
- **OrbitingCircles**: Not present. Potential use: tool ecosystem around a central “service/outcome” in Services hero. Would require curated icon list (Figma, Notion, Linear, etc.). Might need Tailwind keyframe tweaks for stability on v4.
- **AnimatedList**: Not present. Possible placements: “Recent wins” on home/services, or per-case-study timelines. Data model currently absent; would start as hard-coded arrays.

## 7) Integration strategy & branching

- **Branching**: `main` is stable (baseline commit with hydration + image fixes). Experiments live on `feat/raycast-services-lab` with `/lab/raycast` playground. Continue adding Magic UI integrations on the lab branch, then cherry-pick/merge approved pieces into `main`.
- **Component organization**: Keep primitives in `src/components/ui/` (Magic UI imports) and compositions in feature folders (`src/components/raycast/` if we split, currently `src/components/*`). Name by domain (e.g., `case-studies/ImpactSection.tsx`, `services/BeamFlow.tsx`).
- **Roll-out order suggestion**: (1) Implement `ImpactSection` + NumberTicker on one case study; (2) Integrate AnimatedThemeToggler via adapter to existing `next-themes` setup; (3) Experiment with Morphing/Aurora text in `/lab` hero; (4) Test Safari/Lens/ScrollProgress on a lab long-form page; (5) Promote vetted pieces into Services v2 and selected case studies, then PR to `main`.

## 8) Roadmap & releases

This section outlines how we roll out Magic UI integrations and Raycast-inspired v2 work in small, reviewable slices. The goal is to keep `main` stable while `feat/raycast-services-lab` is our playground.

### Release 0 – Baseline & alignment (DONE)

**Status:** complete.

- Fixed MDX hydration issues on `/services`.
- Allowed remote images from `assets.aceternity.com` in `next.config.mjs`.
- Removed duplicate MDX pages for:
  - `/contact` (kept `page.tsx`).
  - `/case-studies/fintech` (kept `page.tsx` redirect).
- Created `feat/raycast-services-lab` branch with:
  - Magic UI / Raycast-style experiments under `src/components/ui/*` and `src/components/*`.
  - A playground route at `/lab/raycast`.
- Documented current state and constraints in `reference/magic-ui-alignment.md`.

> `main` is now the stable baseline; all new experiments land on `feat/raycast-services-lab` first.

---

### Release 1 – Impact metrics MVP (NumberTicker)

**Goal:** Prove out the “Impact” concept in one case study using Magic UI’s `NumberTicker`, without touching the rest of the site.

**Scope:**

- Keep all work on `feat/raycast-services-lab`.
- Implement a reusable `ImpactSection` + `ImpactMetric` composition that wraps Magic UI’s `NumberTicker`.
- Wire it into **one** flagship case study (e.g., `ecommerce`) with 3–4 real metrics.

**Tasks (dev):**

1. Ensure the stray `src/app/contact/page.mdx` is removed/renamed on the lab branch so `/contact` has a single `page.tsx`.
2. Import Magic UI’s `NumberTicker` into `src/components/ui/number-ticker.tsx` (or equivalent), following Magic UI docs.
3. Create:
   - `src/components/case-studies/ImpactMetric.tsx` (one metric block).
   - `src/components/case-studies/ImpactSection.tsx` (grid of metrics with section title).
4. Choose one case study page and:
   - Define a local `metrics` array with `{ label, value, suffix?, description? }`.
   - Render `<ImpactSection metrics={metrics} />` in that page.
5. Start the animation when the section scrolls into view (IntersectionObserver-once) and ensure:
   - Numbers degrade gracefully to static text.
   - Add `aria-label` where needed for screen readers.

**Tasks (UX/product):**

- Decide which case study is the “flagship” for the first Impact section.
- Provide the actual metrics:
  - Labels (e.g. “Increase in demo requests”).
  - Values (e.g. `127`).
  - Suffix (e.g. `%`, `x`).
  - Short descriptions.

**Exit criteria:**

- `/case-studies/<chosen>` on `feat/raycast-services-lab` shows a polished Impact section with animated metrics.
- No new hydration warnings or severe layout jank.
- Metrics feel on-brand and legible in both light and dark themes.

---

### Release 2 – Theme toggle polish (AnimatedThemeToggler)

**Goal:** Upgrade the existing theme toggle to a more expressive visual without breaking the well-behaved `next-themes` setup.

**Scope:**

- Still on `feat/raycast-services-lab`.
- Swap or wrap Magic UI’s `AnimatedThemeToggler` into the header, built on top of the existing `ThemeToggle` logic.

**Tasks (dev):**

1. Integrate Magic UI’s `AnimatedThemeToggler` into `src/components/ui/animated-theme-toggler.tsx` (or similar).
2. Create a thin adapter that:
   - Uses the existing `useTheme()` hook from `next-themes`.
   - Calls `setTheme('light' | 'dark')` in response to toggle.
   - Deals with mounted state (only render once theme is resolved) to avoid icon desync.
3. Replace the internal button UI in `src/components/ThemeToggle.tsx` with the new animated toggler.
4. Verify:
   - Toggling works across the site (including MDX pages).
   - No hydration mismatches or flickers.

**Tasks (UX/product):**

- Confirm position and prominence of the toggler in the header still feel right.
- Sanity check the animation style vs brand tone (fun, but not gimmicky).

**Exit criteria:**

- Header theme toggle uses the Magic UI animation, backed by our existing theme logic.
- No regressions in light/dark behavior.

---

### Release 3 – Services v2 hero experiments (text + orbiting visuals)

**Goal:** Evolve the Services page toward a Raycast-inspired v2 experience, starting with the hero: text treatments + one visual flourish.

**Scope:**

- Experiments live in `/lab/services-v2` (new route) on `feat/raycast-services-lab`.
- Use:
  - `MorphingText` for a rotating descriptor line.
  - `AuroraText` or similar for key headings.
  - Optionally one visual like `OrbitingCircles` to explain “tooling ecosystem”.

**Tasks (dev):**

1. Add a `/lab/services-v2` page that:
   - Uses existing Services copy as a starting point.
   - Integrates MorphingText with a simple static `texts` array.
   - Wraps one hero heading with an Aurora-like text component, respecting theme tokens.
2. Optionally, add an OrbitingCircles block with a curated set of tools (icons/logos).
3. Ensure motion respects `prefers-reduced-motion` (fall back to static text where needed).

**Tasks (UX/product):**

- Provide the copy for MorphingText (e.g. “product teams”, “startups”, “B2B SaaS”, etc.).
- Decide which headlines should get Aurora/shine treatment vs staying plain.
- Review the hero as a whole: does it feel like a unified story vs a pile of effects?

**Exit criteria:**

- `/lab/services-v2` feels like a coherent, Raycast-inspired Services hero.
- There’s a clear decision (yes/no) on which elements should eventually be promoted to the real `/services`.

---

### Release 4 – Case study polish (frames, scroll, lens)

**Goal:** Improve the storytelling and readability of long-form case studies.

**Scope:**

- Still on `feat/raycast-services-lab`.
- Add:
  - `Safari` frames for key screenshots.
  - `Lens` for zooming in on complex UI.
  - `ScrollProgress` for long case study pages.

**Tasks (dev):**

1. Create wrapper components:
   - `CaseStudyBrowserFrame` (Safari wrapper around `next/image`).
   - `ZoomableScreenshot` (Lens integration with sensible desktop-only behavior).
2. Add `ScrollProgress` via a provider to the case-study layout, ensuring it plays nicely with the fixed header.
3. Apply these enhancements to one case study first (ideally the same one that has the ImpactSection).

**Tasks (UX/product):**

- Choose which screenshots deserve the browser frame vs remaining inline.
- Decide where zoom makes sense (e.g. dense tables or intricate UI).
- Check that ScrollProgress feels helpful, not distracting.

**Exit criteria:**

- One case study on the lab branch showcases:
  - Impact metrics,
  - Polished hero text,
  - Framed screenshots,
  - Optional zoom and scroll feedback.
- From this, we decide which patterns should be rolled out across all case studies.

---

### Release 5 – Promote to `main` (Services v2 + case studies)

**Goal:** Move from “lab experiments” to shipping a cohesive v2.

**Scope:**

- Open PR(s) from `feat/raycast-services-lab` into `main`.

**Tasks (dev):**

1. For each shippable feature (ImpactSection, new theme toggle, Services hero, case-study polish), ensure:
   - It’s integrated into the real routes (`/services`, `/case-studies/*`).
   - The implementation is behind a single PR (or a small set of PRs) with clear description.
2. Merge into `main` after review and manual QA.

**Tasks (UX/product):**

- Do a full walkthrough on the deployment:
  - Home → Services → a couple of case studies.
- Confirm that:
  - Effects support the narrative,
  - Motion is not overwhelming,
  - Light/dark theming feels consistent.

**Exit criteria:**

- `main` serves the updated Services v2 and at least one fully polished case study.
- Lab routes (`/lab/*`) can stay for future experiments, or be removed later if desired.

## Key file references

- Tailwind/theme: `src/styles/tailwind.css`, `typography.ts`
- Theme provider & toggle: `src/app/providers.tsx`, `src/components/ThemeToggle.tsx`, `src/components/Header.tsx`
- Layout: `src/app/layout.tsx`
- Case studies: `src/app/case-studies/**` (mix of MDX/TSX)
- Magic UI experiments: `src/components/ui/*`, `src/components/AnimatedBeam*.tsx`, `src/components/RaycastInspiredGallery.tsx`, `src/components/ThreeDMarqueeDemo.tsx`, `src/app/lab/raycast/page.tsx`
