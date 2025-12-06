# Case Study Pages – How They Work Today (v2 with system-level ideas to pressure-test)

Tone: map, not mandate. Please challenge anything that feels too “decided.” I’m listing options and questions so we can steer together.

## Quick recap of today (so we don’t lose the baseline)
- Routes: `src/app/case-studies/<slug>/page.mdx` per case; `fintech/page.tsx` redirects to Breeze.
- Rendering: MDX pages import `CaseStudyViewer` + `getCaseStudyBySlug` and MDX helpers (`CaseImage`, `Figure`, `Video`, `MediaGroup`). Wrapper renders header/meta/results/services/tools; page body is hand-authored MDX/JSX.
- Components in play: `CaseStudyViewer` (wrapper), `CaseStudyHeader` (breadcrumb + meta + badges + buttons), `ImpactSection`/`ImpactMetric` (Results cards), media helpers (`src/components/mdx/CaseStudyComponents.tsx`, `src/components/MediaGroup.tsx`). Unused alt: `CaseMetaBar`; legacy `CaseStudyLayout` not used.
- Outliers: `ecommerce/page.mdx` and `saas/page.mdx` skip the shared wrapper/header.
- Schema: `CaseStudyMetadata` (title, descriptiveTitle, client, description, slug, category, aiAccelerated?, role?, engagementType, location, timeline, status, tools[], services[], order). UI maps these into header badges, services chips, tools pills, next-case nav.

## New system-level direction to consider (cohesion goals)
Nothing locked in—does this skeleton feel right?

**A. Metadata pattern (consistent + quiet)**
- Under-title line: `Client • Timeline • Role • Status` (single row, low-drama).
- AI note: instead of a badge, treat “AI-accelerated” as a tooling note in the approach/clarity section (“Used AI for X”). Question: do we still want a subtle marker near the top for quick scanning, or is the inline note enough?

**B. Section order (same skeleton each time)**
1) Goal (big, gradient, 1 sentence)  
2) Results (3–4 metric cards; keep existing ImpactSection)  
3) The mess (what was unclear/broken)  
4) My role (owned vs. not owned)  
5) How I created clarity (decisions, artifacts, tradeoffs)  
6) What shipped (screens/artifacts with lens zoom)  
7) Tools & technologies (clean list)  
8) Next steps / Learnings (short, memorable)

Questions: Is this the right level of rigor? Any section you’d drop or merge (e.g., combine “The mess” + “Clarity”)? Should “My role” sit higher for credibility?

**C. Media behavior**
- Default images smaller, consistent aspect ratio.
- Lens/zoom for details; captions in your direct voice.
- Preference signal: you want MagicUI’s MCP lens. We should ensure it plays nicely with Next Image sizing (`src/lib/imageSizes.ts`) and mobile.

## Additional considerations from your latest notes
- Keep the “Next case study” button in some form. Maybe inline with a subtle back control so navigation stays discoverable without a CTA bar?
- Services chips are really skill chips: okay to tuck behind a “see more”/accordion? Do we need them visible for cross-link/filter affordance?
- AI badge relocation: move from badge to narrative tooling note (unless we decide on a minimalist marker).

## Open questions (to unblock)
- Which metadata must stay above the fold besides the proposed line (status? category?), or can those move into a compact strip?
- How should “Next case study” coexist with a simpler header (inline link vs. CTA cluster vs. footer nav)?
- Where should Services/skills live if tucked away—accordion near Tools, or a link to filters elsewhere?
- Goal block: schema field (`goal`, `goalDetail`) vs. MDX frontmatter? Hard requirement (1 sentence) or optional?
- Media UX: MCP lens on click, hover, or tap-to-zoom on mobile? Should galleries (`MediaGroup`) also adopt it?
- Canonical order: enforce via layout (hard-coded skeleton) or just document and lint manually? Are `ecommerce/saas` ready to migrate to the shared skeleton so there are no outliers?

## If we choose to implement (still options, not commitments)
- Schema: extend `CaseStudyMetadata` (goal, goalDetail, maybe aiNote/tooling) or add frontmatter; keep metrics as inline arrays or move to metadata.
- Layout: refit `CaseStudyHeader` to the quiet metadata line + back/next; relocate AI to narrative; remove CTA cluster; add Goal block; keep Tools visible; put Services/skills behind a toggle.
- Standardization: migrate `ecommerce` and `saas` onto `CaseStudyViewer` so the skeleton applies everywhere; retire `CaseMetaBar`/`CaseStudyLayout` to reduce drift.
- Media: add MCP lens to `CaseImage`/`Figure` (and optionally `MediaGroup`), maintain sizing via `imageSizes`, and keep captions conversational.

---

## What changed from v1 → v2 (and why) – technical + systematic view
- Added the proposed metadata line + section order from your new context so we have a single “skeleton” to react to. This shows where layout code would need to flex (Header + Viewer).
- Clarified media direction (smaller images + lens/zoom) and called out the specific integration target (MagicUI’s MCP lens) so we remember to check compatibility with Next Image sizing (`src/lib/imageSizes.ts`) and `CaseImage`/`Figure`.
- Kept the “Next case study” requirement in the open questions to ensure we design a home for it inside a simplified header (rather than dropping it with the CTA cluster).
- Flagged Services/skills chips as candidates for a toggle so we can reconcile their filtering role with the “quiet” presentation goal. This points to changes in `CaseStudyViewer` (chip rendering) and possibly the filters elsewhere.
- Pulled the v1 open questions forward so the document remains the full picture—no decisions removed, only layered with the new system-level asks.

## Technical anchor points (so we’re grounded when we decide)
- Header + nav: `src/components/CaseStudyHeader.tsx` (breadcrumb, badges, Back/Next/Contact CTAs). This is where the quiet metadata line, back link, and any retained Next link would live.
- Wrapper + meta blocks: `src/components/CaseStudyViewer.tsx` (renders header, ImpactSection, Services chips, Tools pills, then content). Candidate for Goal insertion and for tucking Services behind a toggle.
- Results: `src/components/case-studies/ImpactSection.tsx` + `ImpactMetric.tsx` (numeric cards). These already match the “3–4 metric cards” idea.
- Media: `src/components/mdx/CaseStudyComponents.tsx` (`CaseImage`, `Figure`, `Video`, `CaseMetric`) + `src/components/MediaGroup.tsx` (gallery/tabs). These are the likely homes for MCP lens and consistent sizing.
- Image sizing constants: `src/lib/imageSizes.ts` (centralized sizes to keep aspect/width consistent).
- Schema: `src/lib/caseStudies.ts` (`CaseStudyMetadata` + data array) feeds header/meta, Services/Tools, and next-case sequencing. Extending this (goal, goalDetail, aiNote/tooling) would propagate through Header/Viewer automatically once used.
- Outliers to migrate: `src/app/case-studies/ecommerce/page.mdx`, `src/app/case-studies/saas/page.mdx` (don’t use shared wrapper/header yet).

## Strategy starter prompts (to keep us honest)
- Do we codify the section order in layout (hard structure) or just document and trust authors?
- Where does the “Next case study” link live in a quieter header—inline link, footer nav, or small pill?
- How hard do we enforce the Goal (1 sentence, gradient) via schema/frontmatter vs. relying on discipline?
- Services/skills chips: keep for filter affordance, but hide behind “See services” toggle? Is that enough signal for users?
- MCP lens UX: click-to-zoom modal vs. hover; mobile tap? Should MediaGroup adopt it too so all images feel consistent?
