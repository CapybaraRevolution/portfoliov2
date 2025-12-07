# V3 recommended decisions (so implementation can start)

## 1. Header navigation (your “breadcrumb removal” + CTA cleanup)

### Decision
- Replace breadcrumb with a single top-left control: ← Back to portfolio overview
- Remove the CTA cluster (“Back to Work / Next / Contact”) entirely.

### Keep Next-case navigation (quietly)
- Put Prev / Next as small inline links at the very bottom of the page (footer-nav style), not in the header.
- This preserves discoverability without turning navigation into a CTA block.

## 2. Badges/tags (your “these don’t feel systematic” point)

### Decision
- Eliminate standalone pills for: status, aiAccelerated, and category (no more “UX AI Accelerated” / “Ongoing” badges).
- Replace with one subdued metadata line under the title:
- Client • Timeline • Role • Status
- If AI matters, it becomes a single sentence in How I created clarity:
- “Used AI to accelerate X (and avoided it for Y).”

## 3. Services vs Tools (reduce noise, keep filtering power)

### Decision
- Keep services[] and tools[] in metadata for filtering/site-wide cohesion.
- On the case study page:
- Show Tools & Technologies
- Hide Services chips behind a small disclosure: “See focus areas” (accordion), or remove them from the page entirely.
- My default: hide behind disclosure, because it preserves affordance without clutter.

## 4. Goal block (your gradient “big statement” requirement)

### Decision
- Add goal (required) + optional goalDetail to CaseStudyMetadata (not MDX frontmatter).
- Render it as the first section before Results.
- Styling: gradient text (Aurora) on the goal line; goalDetail as normal body text.

This guarantees every case study has the same “big promise” placement and avoids author drift.

## 5. Canonical section skeleton (soft enforcement, hard defaults)

### Decision
- Enforce the top of the page via layout (hard): 1. Goal 2. Results 3. Tools (optional placement; I’d keep Tools after “What shipped”)
- Keep the rest as an authoring guideline (soft), but provide a reusable MDX snippet/template per case.

This prevents fighting MDX flexibility while still standardizing what matters most above the fold.

## 6. Media sizing + Lens

### Decision
- Make images smaller by default and consistent in width/aspect.
- Add click-to-zoom with lens behavior on:
- CaseImage
- Figure
- optionally MediaGroup (nice-to-have after the first two)
- Mobile: tap to open zoom; no hover assumptions.

---

## Implementation strategy (sequenced to avoid rework)

### Step 1 — Remove drift first (layout unification)
1. Migrate ecommerce and saas to CaseStudyViewer.
2. Decide whether to delete/stop exporting CaseMetaBar + legacy CaseStudyLayout (or at least ensure nothing uses them).

### Acceptance criteria
- All case studies render through the same wrapper and header.

### Step 2 — Header + navigation changes
1. Update CaseStudyHeader.tsx:
   - breadcrumb → back link
   - remove CTA cluster
   - replace badges with quiet metadata row
2. Add footer prev/next links (driven by order) in CaseStudyViewer (or a new small component).

### Step 3 — Schema extension + Goal block
1. Extend CaseStudyMetadata with goal + goalDetail?
2. Render Goal block at the top of CaseStudyViewer (before Results)
3. Add Aurora styling wrapper

### Step 4 — Services/tools presentation cleanup
1. Keep Tools visible.
2. Hide Services behind disclosure (or remove from page).
3. Confirm Services are still used for /services chip filtering and overview pages.

### Step 5 — Lens integration (media)
1. Add lens/zoom to CaseImage and Figure.
2. Standardize image sizing via imageSizes.ts.
3. Optionally extend to MediaGroup after the first pass.

### Step 6 — Content rewrite (only after structure is stable)

Now rewrite Breeze (and then the rest) into your house voice.

---

## Content system (the template that will make every case study feel like “you”)

Use this across all cases:
1. Goal (one sentence, ambitious, gradient)
2. Results (3 cards max; align to buyer outcomes: speed to decision, fewer revisits, shipped clarity)
3. The mess (what was unclear; 4–6 lines)
4. My role (explicit ownership + constraints; 3–5 bullets)
5. How I created clarity (artifacts + decisions; 3–6 bullets; include AI note here if relevant)
6. What shipped (smaller media + lens; captions in your voice)
7. Tools & Technologies
8. Learnings (short, memorable, slightly dry)
