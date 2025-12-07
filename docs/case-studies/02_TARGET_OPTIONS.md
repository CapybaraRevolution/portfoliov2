# Target Options (Strategy & Unresolved Questions)

**Purpose**: Document strategy options and open questions. Nothing here is locked—see [Decisions Locked](./03_DECISIONS_LOCKED.md) for decided direction.

**See [Master Plan](./00_MASTER_PLAN.md) for implementation sequence.**

## System-Level Direction (Options to Consider)

### A. Metadata pattern (consistent + quiet)

**Proposal**: Under-title line: `Client • Timeline • Role • Status` (single row, low-drama)

**AI note option**: Instead of badge, treat "AI-accelerated" as tooling note in approach/clarity section ("Used AI for X")

**Open question**: Do we still want a subtle marker near the top for quick scanning, or is the inline note enough?

### B. Section order (same skeleton each time)

**Proposed skeleton**:
1. Goal (big, gradient, 1 sentence)
2. Results (3–4 metric cards; keep existing ImpactSection)
3. The mess (what was unclear/broken)
4. My role (owned vs. not owned)
5. How I created clarity (decisions, artifacts, tradeoffs)
6. What shipped (screens/artifacts with lens zoom)
7. Tools & technologies (clean list)
8. Next steps / Learnings (short, memorable)

**Open questions**:
- Is this the right level of rigor?
- Any section to drop or merge (e.g., combine "The mess" + "Clarity")?
- Should "My role" sit higher for credibility?

### C. Media behavior

**Proposal**:
- Default images smaller, consistent aspect ratio
- Lens/zoom for details
- Captions in direct voice

**Preference signal**: MagicUI's MCP lens integration

**Open question**: Ensure it plays nicely with Next Image sizing (`src/lib/imageSizes.ts`) and mobile behavior

## Additional Considerations

### Navigation
- Keep "Next case study" button in some form
- Option: inline with subtle back control so navigation stays discoverable without CTA bar

### Services chips
- Services chips are skill chips
- Option: tuck behind "see more" / accordion
- Open question: Do we need them visible for cross-link/filter affordance?

### AI badge relocation
- Move from badge to narrative tooling note
- Option: minimalist marker (if we decide on one)

## Thoughts for Requested Changes (Not Decisions)

### Back control
- Likely touch `CaseStudyHeader` to swap breadcrumb for single "Back to portfolio overview" control (top-left)
- **Question**: Should this live in wrapper (`CaseStudyViewer`) so we can standardize across outliers too?

### CTA row removal/simplification
- Also in `CaseStudyHeader` (and `CaseMetaBar` if we reuse it)
- **Question**: Keep minimal back/next inline nav, or drop next entirely?

### Tags/pills
- `CaseStudyHeader` owns AI/status/category
- `CaseStudyViewer` renders Services/Tools
- Option: collapse into single metadata row
- **Question**: What metadata matters most to keep visible?

### Tools retained, tag clusters trimmed
- `CaseStudyViewer` currently renders both Services and Tools
- Option: keep Tools, relocate Services or show fewer
- **Question**: Does Services still need to exist for filtering elsewhere?

### New Goal block near top
- No schema field today
- Options:
  - Add `goal` (and optional `goalDetail`) to `CaseStudyMetadata`
  - Accept as MDX frontmatter
- **Question**: Where should it render—inside `CaseStudyViewer` before Results? How to handle pages that skip wrapper?

### Image zoom/lens
- Would live in `CaseImage`/`Figure`/`MediaGroup`
- **Question**: Preference for click-to-zoom modal vs. hover zoom? Mobile behavior?

### Standardization pass
- Migrate `ecommerce` and `saas` pages to `CaseStudyViewer` so changes apply globally
- **Question**: Any reason to keep them bespoke?

## Open Questions

1. Which metadata must stay above the fold (status? AI? category?) vs. can move to compact strip?
2. Do we need "Next case study" at all, or is back-to-overview sufficient for navigation?
3. Should "Services" chips remain visible for cross-linking/filter affordance, or can they be tucked away to reduce noise?
4. For Goal block, do we want single-sentence requirement per case study (enforced via schema), or is optional frontmatter flexibility better?
5. What zoom UX best fits the aesthetic (inline magnify, lightbox, or MediaGroup tabs with zoom)?
6. Do we want canonical section order enforced (e.g., Goal → Results → Services/Tools → Body), or is flexibility more important?

## If We Align on an Approach (Implementation Map)

### Schema
- Extend `CaseStudyMetadata` (and populate per entry) or add MDX frontmatter for Goal/Goal detail
- Decide how metrics are passed (stay inline constants or move to metadata)

### Layout
- Update `CaseStudyHeader` and `CaseStudyViewer` to reflect:
  - New back control
  - CTA removal
  - Metadata row
  - Goal block
  - Simplified tags
- Retire or ignore `CaseMetaBar`/`CaseStudyLayout` to reduce drift

### Content cleanup
- Migrate `ecommerce`/`saas` to shared wrapper
- Ensure all pages supply agreed fields (Goal, metrics, etc.)

### Media
- Enhance `CaseImage`/`Figure`/`MediaGroup` with zoom behavior
- Keep sizing via `src/lib/imageSizes.ts`

---

**See [Decisions Locked](./03_DECISIONS_LOCKED.md) for resolved direction.**
