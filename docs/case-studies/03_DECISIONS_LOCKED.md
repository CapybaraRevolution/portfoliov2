# Decisions Locked

**Purpose**: Document all locked decisions for the Case Study structural refactor. These are the directions implementation must follow.

**See [Master Plan](./00_MASTER_PLAN.md) for implementation sequence.**

## 1. Header Navigation

### Decision
- Replace breadcrumb with single top-left control: ← Back to portfolio overview
- Remove CTA cluster ("Back to Work / Next / Contact") entirely

### Keep Next-case navigation (quietly)
- Put Prev / Next as small inline links at very bottom of page (footer-nav style), not in header
- Preserves discoverability without turning navigation into CTA block

### Rationale
Removes visual noise from header while maintaining navigation affordance at footer.

### Implementation notes
- Update `src/components/CaseStudyHeader.tsx`: breadcrumb → back link, remove CTA cluster
- Add footer prev/next links (driven by `order`) in `CaseStudyViewer` or new small component

### Acceptance criteria
- Header shows single back link (no breadcrumb)
- No CTA cluster in header
- Prev/Next links appear at footer

---

## 2. Badges/Tags

### Decision
- Eliminate standalone pills for: status, aiAccelerated, and category (no more "UX AI Accelerated" / "Ongoing" badges)
- Replace with one subdued metadata line under title: `Client • Timeline • Role • Status`
- If AI matters, it becomes single sentence in "How I created clarity": "Used AI to accelerate X (and avoided it for Y)."

### Rationale
Reduces visual noise while preserving essential metadata in scannable format.

### Implementation notes
- Update `src/components/CaseStudyHeader.tsx`: replace badges with quiet metadata row
- Format: Client • Timeline • Role • Status

### Acceptance criteria
- Header shows quiet metadata row (no standalone badge pills)
- AI note appears in narrative section if relevant

---

## 3. Services vs Tools

### Decision
- Keep `services[]` and `tools[]` in metadata for filtering/site-wide cohesion
- On case study page:
  - Show Tools & Technologies (visible)
  - Hide Services chips behind small disclosure: "See focus areas" (accordion), or remove from page entirely
- Default: hide behind disclosure (preserves affordance without clutter)

### Rationale
Maintains filtering power while reducing page noise. Services still available for site-wide filtering.

### Implementation notes
- Keep Tools visible in `CaseStudyViewer`
- Hide Services behind disclosure (accordion) or remove from page
- Confirm Services still used for `/services` chip filtering and overview pages

### Acceptance criteria
- Tools & Technologies section visible
- Services hidden behind disclosure (or removed from page)
- Services still functional for filtering elsewhere

---

## 4. Goal Block

### Decision
- Add `goal` (required) + optional `goalDetail` to `CaseStudyMetadata` (not MDX frontmatter)
- Render as first section before Results
- Styling: gradient text (Aurora) on goal line; `goalDetail` as normal body text

### Rationale
Guarantees every case study has same "big promise" placement and avoids author drift.

### Implementation notes
- Extend `CaseStudyMetadata` in `src/lib/caseStudies.ts` with `goal` (required) + `goalDetail` (optional)
- Render Goal block at top of `CaseStudyViewer` (before Results)
- Add Aurora styling wrapper

### Acceptance criteria
- Schema includes `goal` (required) and `goalDetail` (optional)
- Goal block renders before Results with Aurora gradient
- All case study entries have `goal` field populated

---

## 5. Canonical Section Skeleton

### Decision
- Enforce top of page via layout (hard): 1. Goal 2. Results 3. Tools (optional placement; keep Tools after "What shipped")
- Keep rest as authoring guideline (soft), but provide reusable MDX snippet/template per case

### Rationale
Prevents fighting MDX flexibility while standardizing what matters most above the fold.

### Implementation notes
- Layout enforces: Goal → Results → Tools at top
- Provide MDX template/snippet for remaining sections (soft guideline)

### Acceptance criteria
- Goal, Results, Tools appear in consistent order at top
- Template/snippet available for remaining sections

---

## 6. Media Sizing + Lens

### Decision
- Make images smaller by default and consistent in width/aspect
- Add click-to-zoom with lens behavior on:
  - CaseImage
  - Figure
  - optionally MediaGroup (nice-to-have after first two)
- Mobile: tap to open zoom; no hover assumptions

### Rationale
Improves visual consistency and enables detail exploration without cluttering page.

### Implementation notes
- Add lens/zoom to `CaseImage` and `Figure` in `src/components/mdx/CaseStudyComponents.tsx`
- Standardize image sizing via `src/lib/imageSizes.ts`
- Optionally extend to MediaGroup after first pass

### Acceptance criteria
- CaseImage supports click-to-zoom lens
- Figure supports click-to-zoom lens
- Images use consistent sizing from imageSizes.ts
- Mobile: tap to open zoom

---

## Implementation Strategy (Sequenced to Avoid Rework)

### Step 1 — Remove drift first (layout unification)
1. Migrate ecommerce and saas to CaseStudyViewer
2. Decide whether to delete/stop exporting CaseMetaBar + legacy CaseStudyLayout (or at least ensure nothing uses them)

**Acceptance criteria**: All case studies render through same wrapper and header.

### Step 2 — Header + navigation changes
1. Update CaseStudyHeader.tsx:
   - breadcrumb → back link
   - remove CTA cluster
   - replace badges with quiet metadata row
2. Add footer prev/next links (driven by order) in CaseStudyViewer (or new small component)

### Step 3 — Schema extension + Goal block
1. Extend CaseStudyMetadata with goal + goalDetail
2. Render Goal block at top of CaseStudyViewer (before Results)
3. Add Aurora styling wrapper

### Step 4 — Services/tools presentation cleanup
1. Keep Tools visible
2. Hide Services behind disclosure (or remove from page)
3. Confirm Services still used for /services chip filtering and overview pages

### Step 5 — Lens integration (media)
1. Add lens/zoom to CaseImage and Figure
2. Standardize image sizing via imageSizes.ts
3. Optionally extend to MediaGroup after first pass

### Step 6 — Content rewrite (only after structure is stable)
Now rewrite Breeze (and then the rest) into house voice.

---

## Content System (Template)

Use this across all cases:

1. **Goal** (one sentence, ambitious, gradient)
2. **Results** (3 cards max; align to buyer outcomes: speed to decision, fewer revisits, shipped clarity)
3. **The mess** (what was unclear; 4–6 lines)
4. **My role** (explicit ownership + constraints; 3–5 bullets)
5. **How I created clarity** (artifacts + decisions; 3–6 bullets; include AI note here if relevant)
6. **What shipped** (smaller media + lens; captions in direct voice)
7. **Tools & Technologies**
8. **Learnings** (short, memorable, slightly dry)

---

**See [Master Plan](./00_MASTER_PLAN.md) for full implementation sequence.**
