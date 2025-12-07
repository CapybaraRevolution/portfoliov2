# Case Study Overhaul — Master Plan

## Purpose

This documentation system provides a stable source of truth for the Case Study structural refactor. It separates baseline (current state) from strategy (options) and decisions (locked direction), preventing drift across worktrees.

**How to use:**
- Start with this file for status and implementation sequence
- Reference `01_BASELINE_CURRENT_STATE.md` for current technical state
- Review `02_TARGET_OPTIONS.md` for unresolved questions
- Follow `03_DECISIONS_LOCKED.md` for implementation direction
- Log decisions in `04_DECISION_LOG.md` as they're made

## Current Status

### Decided
- Header navigation: breadcrumb → back link; remove CTA cluster; prev/next at footer
- Badges/tags: eliminate standalone pills; use quiet metadata line (Client • Timeline • Role • Status)
- Services vs Tools: keep Tools visible; hide Services behind disclosure
- Goal block: required field in schema; render before Results with Aurora gradient
- Canonical sections: enforce Goal → Results → Tools at top; rest as guideline
- Media: smaller default images; click-to-zoom lens on CaseImage/Figure

### Pending
- Migration of ecommerce/saas outliers to CaseStudyViewer
- Schema extension (goal + goalDetail fields)
- Lens implementation details (MagicUI integration)
- Content rewrite (after structure is stable)

## Acceptance Criteria

The structural refactor is "done" when:

1. **Layout unification**: All case studies render through CaseStudyViewer (no outliers)
2. **Header consistency**: Single back link; no CTA cluster; quiet metadata row
3. **Goal block**: Every case study has goal field; renders before Results with Aurora styling
4. **Navigation**: Prev/Next links at footer (driven by order)
5. **Services/Tools**: Tools visible; Services behind disclosure
6. **Media zoom**: CaseImage and Figure support click-to-zoom lens
7. **Image sizing**: Consistent default sizes via imageSizes.ts

## Implementation Sequence

### Step 1 — Remove drift first (layout unification)
- Migrate `src/app/case-studies/ecommerce/page.mdx` to CaseStudyViewer
- Migrate `src/app/case-studies/saas/page.mdx` to CaseStudyViewer
- Decide whether to delete/stop exporting CaseMetaBar + legacy CaseStudyLayout

**Acceptance**: All case studies render through the same wrapper and header.

### Step 2 — Header + navigation changes
- Update `src/components/CaseStudyHeader.tsx`:
  - breadcrumb → back link
  - remove CTA cluster
  - replace badges with quiet metadata row
- Add footer prev/next links (driven by order) in CaseStudyViewer

### Step 3 — Schema extension + Goal block
- Extend `CaseStudyMetadata` in `src/lib/caseStudies.ts` with `goal` (required) + `goalDetail` (optional)
- Render Goal block at top of CaseStudyViewer (before Results)
- Add Aurora styling wrapper

### Step 4 — Services/tools presentation cleanup
- Keep Tools visible
- Hide Services behind disclosure (accordion)
- Confirm Services still used for /services chip filtering and overview pages

### Step 5 — Lens integration (media)
- Add lens/zoom to `CaseImage` and `Figure` components
- Standardize image sizing via `src/lib/imageSizes.ts`
- Optionally extend to MediaGroup after first pass

### Step 6 — Content rewrite (only after structure is stable)
- Rewrite Breeze (and then the rest) into house voice using canonical section skeleton

## Files We Will Touch

### Core components
- `src/components/CaseStudyViewer.tsx` — wrapper; add Goal block, footer nav
- `src/components/CaseStudyHeader.tsx` — back link, remove CTA, quiet metadata row
- `src/components/case-studies/ImpactSection.tsx` — Results cards (no changes expected)
- `src/components/mdx/CaseStudyComponents.tsx` — CaseImage, Figure (add lens)
- `src/components/MediaGroup.tsx` — optional lens extension

### Schema and data
- `src/lib/caseStudies.ts` — extend CaseStudyMetadata (goal, goalDetail)
- `src/lib/imageSizes.ts` — standardize sizing

### Outlier pages (migrate to CaseStudyViewer)
- `src/app/case-studies/ecommerce/page.mdx`
- `src/app/case-studies/saas/page.mdx`

### Standard case study pages (content updates after structure)
- `src/app/case-studies/breeze-mortgage-hub/page.mdx`
- `src/app/case-studies/<slug>/page.mdx` (all others)

### Legacy (evaluate for removal)
- `src/components/CaseMetaBar.tsx` — unused alternative layout
- `src/components/CaseStudyLayout.tsx` — legacy standalone layout

## Review Checklist

Before marking a worktree attempt as complete, verify:

- [ ] All case studies render through CaseStudyViewer (no standalone pages)
- [ ] Header shows single back link (no breadcrumb)
- [ ] Header shows quiet metadata row: Client • Timeline • Role • Status
- [ ] No CTA cluster in header
- [ ] Prev/Next links appear at footer (driven by order)
- [ ] Goal block renders before Results with Aurora gradient
- [ ] Tools & Technologies section visible
- [ ] Services hidden behind disclosure (or removed from page)
- [ ] CaseImage supports click-to-zoom lens
- [ ] Figure supports click-to-zoom lens
- [ ] Images use consistent sizing from imageSizes.ts
- [ ] Schema includes goal (required) and goalDetail (optional)
- [ ] All case study entries in caseStudies.ts have goal field populated

---

**See also:**
- [Baseline Current State](./01_BASELINE_CURRENT_STATE.md)
- [Target Options](./02_TARGET_OPTIONS.md)
- [Decisions Locked](./03_DECISIONS_LOCKED.md)
- [Decision Log](./04_DECISION_LOG.md)
