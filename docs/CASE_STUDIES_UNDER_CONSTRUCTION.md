# Case Studies Under Construction

This document provides context for case studies that are marked as "coming soon" or need refinement. Use this to inform Claude Opus when working on completing or refining these case studies.

---

## Quick Reference: Status Overview

| Case Study | Content State | Primary Need |
|------------|---------------|--------------|
| Social Finance Fund | Substantial (needs polish) | Restructure to match modern patterns |
| AMFA Class Filter Redesign | Complete | Remove construction banner |
| Old Skool Game Studios | Complete | Remove construction banner |
| Boveda Tr1n1ty | Mostly complete | Add real metrics (has placeholders) |
| BC Cancer Foundation | No page exists | Build from scratch |

---

## 1. Social Finance Fund

### Project Summary

A multi-stakeholder alignment project for a government-backed social finance initiative. The core challenge was getting four organizations to agree on shared direction, then delivering usable wireframes and information architecture.

### Current State

- **File**: `src/app/case-studies/social-finance-fund/page.mdx` (372 lines)
- **Status**: Has substantial content with modern components
- **Flag**: `comingSoon: true` in metadata

### Metadata

| Field | Value |
|-------|-------|
| Role | Lead UX Strategist & Research Facilitator |
| Timeline | June 2024 – February 2025 |
| Category | Strategy |
| AI Accelerated | Yes |
| Engagement | Contract (via Briteweb) |

### Tools Used

- Microsoft Forms (survey)
- Excel (data cleaning)
- Obsidian (synthesis/documentation)
- Figma (wireframes)

### Services Provided

- Product Vision
- User Research
- Information Architecture
- Wireframing
- Prototyping
- Stakeholder Alignment
- Team Facilitation

### Current Metrics

- **Users Surveyed**: 42
- **Pages Wireframed**: 5

### Current Structure

1. **Context** — Background with orbiting circles visual showing 4 stakeholder organizations
2. **The Problem** — Conflicting priorities, power dynamics, trust issues, lean budget (<$10k)
3. **My Role** — UX strategist via Briteweb, focus on alignment
4. **How I Created Clarity** — Timeline with 4 steps (Survey → Workshops → AI concepting → Wireframes)
5. **Practical AI** — AI usage in IA concepting, survey synthesis, content clustering
6. **Outcomes** — 4 LearningCards showing deliverables
7. **Learnings** — 3 LearningCards with takeaways

### Interactive Components Already Used

- `CaseStudyViewer` wrapper
- `GoalBlock` with aurora text animation
- `SplitSection` for 50/50 layouts
- `OrbitContainer` / `OrbitingCircles` showing stakeholder relationships
- `Tree` / `Folder` / `File` for file tree visual
- `Timeline` for process steps
- `Tooltip` for inline definitions
- `LearningCard` components
- `FocusImageGallery` (currently minimal)
- `QuoteBlock`
- `ProseSection` / `ProseBlock`
- `FadeIn` animations

### Available Assets

```
/images/case-studies/social-finance-fund/
├── sff-logo.png (.avif, .webp)
└── SFFSurveyConditionalLogic.png (.avif, .webp)
```

### Core Story Elements

- **Multi-org challenge**: 4 organizations with different priorities
- **Role-branched survey**: 42 responses with conditional logic based on role
- **Workshop facilitation**: Alignment sessions to build consensus
- **AI-assisted IA**: Used AI for concepting and synthesis (human judgment remained core)
- **Lean constraints**: Budget under $10k, tight timeline
- **Obsidian research hub**: Lightweight documentation approach

### Key Quote

> "Sometimes the real UX problem isn't the interface—it's misalignment at the human level."

### Key Learnings

1. "Wireframes are diplomacy tools: shared artifacts resolve abstract disagreements"
2. "Lightweight research > heavy decks early: Obsidian kept us fast and aligned"
3. "Trust before artifacts: Relationships made the work possible"

### Work Remaining

1. **Add wireframe images** to `FocusImageGallery` (user has these available)
2. **Review content** for alignment with other published case studies
3. **Set `comingSoon: false`** in `src/lib/caseStudies.ts` when ready
4. Content and structure are already modernized following rebuild plan

### Existing Documentation

- `docs/SOCIAL_FINANCE_FUND_CASE_STUDY_REBUILD.md` — Detailed rebuild plan (already implemented)

---

## 2. AMFA Class Filter Redesign

### Project Summary

Redesigned the class filtering and registration experience for AMFA (American Musical and Dramatic Academy alumni association or similar arts organization). Focus on improving navigation, discovery, and registration through smarter filtering and cross-system user flows.

### Current State

- **File**: `src/app/case-studies/amfa-class-filter-redesign/page.mdx`
- **Status**: Complete narrative content, just needs banner removed
- **Flag**: `comingSoon: true` in metadata

### Metadata

| Field | Value |
|-------|-------|
| Role | UX Designer, Systems Analyst & Facilitator |
| Timeline | February 2024 – Present |
| Category | UX |
| AI Accelerated | No |
| Engagement | Contract |

### Tools Used

- Figma
- FigJam
- Miro
- Notion

### Current Metrics

- **Filter Completion Rate**: 92%
- **Class Discovery Time**: 8.9s
- **Cart Completion**: 66%

### Current Structure

9 defined sections:
1. Overview
2. Key Challenges
3. My Approach
4. System Architecture
5. Deliverables
6. Measurement Strategy
7. Stakeholder Navigation
8. Outcome
9. Learnings

Plus Credits section.

### Interactive Components Used

- `CaseStudyViewer` wrapper
- `ConstructionBanner` (to be removed)
- `CaseImage` (logo variant)
- `Figure` component (flow diagram)
- `CaseMetric` metrics

### Available Assets

```
/images/case-studies/amfa-class-filter-redesign/
├── amfalogo.png
└── AMFAFilters.png
```

### Work Remaining

1. **Remove `ConstructionBanner`** component when ready
2. **Verify metrics accuracy**
3. **Set `comingSoon: false`** in `src/lib/caseStudies.ts`

Content appears complete and ready for publication.

---

## 3. Old Skool Game Studios

### Project Summary

Applied systematic UX research and design improvements to mobile casino games at Old Skool Game Studios. Work focused on lifting engagement metrics and fixing localization pain points across the game portfolio.

### Current State

- **File**: `src/app/case-studies/old-skool/page.mdx`
- **Status**: Complete narrative content with video asset
- **Flag**: `comingSoon: true` in metadata

### Metadata

| Field | Value |
|-------|-------|
| Role | Lead UX Designer & UX Researcher |
| Timeline | January 2019 – September 2021 |
| Category | UX |
| AI Accelerated | No |
| Engagement | Full-time |

### Tools Used

- Figma
- FigJam
- Jira
- Confluence

### Current Metrics

- **Non-English Session Length**: +13%
- **Design Consistency Improvement**: 14%
- **Component Library**: 42 components

### Current Structure

Uses h2 headings (no explicit sections array):
1. Executive summary
2. Context & challenges
3. What I did (with 4 subsections)
4. Outcomes
5. What I learned
6. Credits

### Interactive Components Used

- `CaseStudyViewer` wrapper
- `ConstructionBanner` (to be removed)
- `CaseImage` (hero variant with collage)
- `MediaGroup` with `MediaVideo` (microanimation video with autoplay/loop)
- `CaseImage` (feature screen with caption)
- `CaseMetric` metrics

### Available Assets

```
/images/case-studies/old-skool/
├── oldskoolgamecollage.png
├── ascensionfeaturescreen.png
└── OldSkoolmicroanimation1.mp4  (video asset!)
```

### Work Remaining

1. **Remove `ConstructionBanner`** component when ready
2. **Consider adding explicit sections array** for navigation consistency
3. **Set `comingSoon: false`** in `src/lib/caseStudies.ts`

Content appears complete and ready for publication.

---

## 4. Boveda Tr1n1ty

### Project Summary

Turned a fragmented workflow into a coherent, measurable experience for Boveda's Tr1n1ty product. Work focused on business analysis and feature design to create something stakeholders could rally behind.

### Current State

- **File**: `src/app/case-studies/boveda-tr1n1ty/page.mdx`
- **Status**: Complete structure but has placeholder metrics
- **Flag**: `comingSoon: true` in metadata

### Metadata

| Field | Value |
|-------|-------|
| Role | Business Analyst & Feature Designer |
| Timeline | July 2018 – December 2019 |
| Category | UX |
| AI Accelerated | No |
| Engagement | Contract |

### Tools Used

- Figma
- FigJam
- Notion
- Jira

### Current Metrics (displayed)

- **User Flows Drafted**: 7

### Current Structure

5 defined sections:
1. Overview
2. Strategy & Solution
3. Implementation Process
4. Results & Impact
5. Reflection & Learning

Additional sections in content (not in array):
- Executive summary
- Research & Discovery

### Interactive Components Used

- `CaseStudyViewer` wrapper
- `ConstructionBanner` (to be removed)
- `Figure` component (product mockup)
- `CaseMetric` metrics

### Available Assets

```
/images/case-studies/boveda/
└── tr1n1tymockup.png
```

Note: Images are in `boveda/` directory, not `boveda-tr1n1ty/`

### Placeholder Content Needing Real Values

In the "Results & Impact" section, the following metrics are placeholder text:
- "Checkout Completion: Improved from X% to Y% (+Z pp increase)"
- "Task Completion Time: Reduced P50 time from T1 to T2 (N% improvement)"
- "Support Tickets: Decreased flow-related tickets from A to B (M% reduction)"

### Work Remaining

1. **Replace placeholder metrics** with real values (or remove if unavailable)
2. **Align sections array** with actual content (add Research & Discovery)
3. **Remove `ConstructionBanner`** component when ready
4. **Set `comingSoon: false`** in `src/lib/caseStudies.ts`

---

## 5. BC Cancer Foundation

### Project Summary

Transform the digital experience for donors and supporters of cancer research at BC Cancer Foundation.

### Current State

- **File**: Does not exist
- **Status**: Metadata only, no page content
- **Flag**: `comingSoon: true` in metadata

### Metadata

| Field | Value |
|-------|-------|
| Role | UX Strategist |
| Timeline | 2025 |
| Category | Strategy |
| AI Accelerated | No |
| Engagement | Contract |
| Status | Ongoing |

### Tools Used

- Figma
- FigJam

### Available Assets

None found in `/public/images/case-studies/`

### Work Required

This case study needs to be built from scratch:

1. **Create directory**: `src/app/case-studies/bc-cancer-foundation/`
2. **Create page.mdx** with standard structure:
   - Import statements
   - `CaseStudyViewer` wrapper with props
   - `ConstructionBanner` (until content is ready)
   - Sections array definition
   - Content sections following established patterns

3. **Gather content**:
   - Project context and challenge
   - Role and responsibilities
   - Approach and methodology
   - Deliverables
   - Outcomes/metrics (if available)
   - Learnings

4. **Create/gather assets**:
   - Logo
   - Screenshots or mockups
   - Process diagrams

---

## Common Patterns for Case Studies

### Required Structure

All case studies should follow this general pattern:

```jsx
import { CaseStudyViewer } from '@/components/case-studies/CaseStudyViewer'
// ... other imports

export const sections = [
  { id: 'context', title: 'Context' },
  { id: 'the-problem', title: 'The Problem' },
  // ... additional sections
]

<CaseStudyViewer slug="case-study-slug" sections={sections}>
  {/* Content sections */}
</CaseStudyViewer>
```

### Standard Sections

1. **Context/Overview** — Background and project setup
2. **The Problem** — Challenge to solve
3. **My Role** — Responsibilities and scope
4. **How I Created Clarity** — Methodology and approach
5. **Practical AI** (if applicable) — AI tool usage
6. **Outcomes/What Shipped** — Deliverables and results
7. **Learnings** — Key takeaways

### Recommended Components

- `GoalBlock` — Aurora-animated goal statement
- `SplitSection` — 50/50 layouts (with `flip` prop for alternating)
- `ProseSection` / `ProseBlock` — Structured prose
- `QuoteBlock` — Key quotes
- `Timeline` — Process steps
- `LearningCard` — Takeaway cards (usually 3)
- `FocusImageGallery` — Lightbox image galleries
- `Figure` — Single images with captions
- `OrbitingCircles` — Relationship visualizations
- `Tree` / `Folder` / `File` — File tree visuals
- `Tooltip` — Inline definitions
- `FadeIn` — Animation wrapper

### Metrics Display

Metrics are defined in `src/lib/caseStudies.ts` and displayed automatically by `CaseStudyViewer`. Format:

```typescript
metrics: [
  { label: 'Metric Name', value: '95%', highlight: true },
  { label: 'Another Metric', value: '42', highlight: true },
  // ...
]
```

---

## Metadata File Location

All case study metadata is defined in:
```
src/lib/caseStudies.ts
```

Key fields to update when publishing:
- `comingSoon: false` — Removes from "coming soon" state
- `order` — Controls display order in listings

---

## Tone and Writing Guidelines

Reference: `docs/CASE_STUDY_TONE_GUIDE.md`

Key principles:
- Honest about constraints and challenges
- Focus on clarity and practical outcomes
- Show don't tell (interactive demonstrations)
- Quantify impact where possible
- Acknowledge collaboration and team contributions
