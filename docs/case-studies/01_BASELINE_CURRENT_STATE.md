# Baseline: Current State

**Purpose**: Document the current technical state of case study pages. This is baseline only—no strategy, no proposals.

**See [Master Plan](./00_MASTER_PLAN.md) for implementation direction.**

## Routes and Rendering Pipeline

### Route locations
- `src/app/case-studies/<slug>/page.mdx` — one MDX file per case study
- `src/app/case-studies/fintech/page.tsx` — redirects to Breeze

### Rendering flow
Each MDX page:
1. Imports `CaseStudyViewer` from `src/components/CaseStudyViewer.tsx`
2. Imports `getCaseStudyBySlug` from `src/lib/caseStudies.ts`
3. Imports MDX helpers: `CaseImage`, `Figure`, `Video`, `MediaGroup`
4. Wrapper (`CaseStudyViewer`) renders: header/meta/results/services/tools
5. Page body provides all narrative copy in JSX/MDX

### Outliers
- `src/app/case-studies/ecommerce/page.mdx` — skips shared viewer/header; pure markdown with ad-hoc CTAs
- `src/app/case-studies/saas/page.mdx` — skips shared viewer/header; pure markdown with ad-hoc CTAs

### Unused features
- Auto-exported `sections` arrays (via `src/mdx/rehype.mjs`) exist but are not consumed

## Components in Play

### Core layout
- **CaseStudyViewer** (`src/components/CaseStudyViewer.tsx`) — wrapper component
  - Renders header, optional Results, Services/Tools blocks, then page content

- **CaseStudyHeader** (`src/components/CaseStudyHeader.tsx`) — header component
  - Breadcrumb navigation
  - Title/meta display
  - Badges (category, AI, status)
  - CTA buttons: "Back to work" / "Next case study" / "Contact Kyle"

### Results/metrics
- **ImpactSection** (`src/components/case-studies/ImpactSection.tsx`) — Results container
- **ImpactMetric** (`src/components/case-studies/ImpactMetric.tsx`) — individual metric card
  - Props: `label`, `value: number`, `suffix?`, `description?`, `highlight?`

### Media helpers
- **CaseImage** / **Figure** / **Video** / **CaseMetric** (`src/components/mdx/CaseStudyComponents.tsx`)
  - Sizes from `src/lib/imageSizes.ts`
- **MediaGroup** (`src/components/MediaGroup.tsx`)
  - Re-exported via `src/components/mdx.tsx` as `MediaGroup`, `MediaVideo`, `MediaImage`
  - Gallery/tabs functionality

### Unused alternatives
- **CaseMetaBar** (`src/components/CaseMetaBar.tsx`) — alternative layout with breadcrumb, badges, Services/Tools, CTA buttons (not used)
- **CaseStudyLayout** (`src/components/CaseStudyLayout.tsx`) — legacy standalone layout (not used by current case studies)

## Content Schema

### Type definition
`CaseStudyMetadata` interface in `src/lib/caseStudies.ts`

### Fields
- `title: string`
- `descriptiveTitle: string`
- `client: string`
- `description: string`
- `slug: string`
- `category: CategoryType`
- `aiAccelerated?: boolean` (optional)
- `role?: string` (optional)
- `engagementType: 'Full-time' | 'Contract' | 'Advisory'`
- `location: string`
- `timeline: string`
- `status: 'Ongoing' | 'Completed'`
- `tools: string[]`
- `services: string[]`
- `order: number` (for next-case sequencing)

### UI mappings
- **Header/meta**: `title`, `description`, `engagementType`, `location`, `timeline`, `role`
- **Badges/pills**: 
  - `category` → `CategoryBadge`
  - `aiAccelerated` → `AIBadge`
  - `status` → status pill
- **Chips/pills**:
  - `services` → `NavigationChip`
  - `tools` → `ToolPill`
- **Navigation**: `order` + `slug` drive "Next case study" button

### Example
Breeze Mortgage Hub entry in `src/lib/caseStudies.ts`:
- `aiAccelerated: true`
- `status: 'Ongoing'`
- `services` and `tools` arrays populated
- `order: 1`

### Backend note
Supabase shape exists in `src/lib/supabase-backend.ts`, but pages use the local `caseStudies` array.

## Format Consistency

### Common flow (when using CaseStudyViewer)
1. Header (breadcrumb, title/meta, badges, CTAs)
2. Optional Results (ImpactSection with metrics)
3. Services/Tools blocks
4. Freeform MDX content (section order varies by author)

### Variations
- `ecommerce` and `saas` pages don't use shared header/meta/services/tools
- Metrics presence/format varies per page
- `sections` arrays aren't leveraged
- No enforced section order; consistency depends on author discipline

## Technical Anchor Points

### File paths
- Case study pages: `src/app/case-studies/<slug>/page.mdx`
- Schema: `src/lib/caseStudies.ts`
- Wrapper: `src/components/CaseStudyViewer.tsx`
- Header: `src/components/CaseStudyHeader.tsx`
- Results: `src/components/case-studies/ImpactSection.tsx`, `ImpactMetric.tsx`
- Media: `src/components/mdx/CaseStudyComponents.tsx`
- Media groups: `src/components/MediaGroup.tsx`
- Image sizing: `src/lib/imageSizes.ts`

### Known outliers
- `src/app/case-studies/ecommerce/page.mdx` — standalone, no wrapper
- `src/app/case-studies/saas/page.mdx` — standalone, no wrapper

---

**See [Master Plan](./00_MASTER_PLAN.md) for implementation direction.**
