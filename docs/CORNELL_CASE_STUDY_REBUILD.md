# Cornell Case Study Rebuild

## Overview

Rebuilding the Cornell University SC Johnson College of Business case study with new content and tailored interactive components following the Breeze Mortgage Hub benchmark.

## Approach

Transform the Cornell case study into a story-driven page with interactive elements that reinforce the "three schools to one unified system" narrative. Follow Breeze's pattern of 50/50 layouts, custom bento grids, and meaningful animations.

## Key Files

| File | Purpose |
|------|---------|
| `src/app/case-studies/cornell-university/page.mdx` | Main case study page |
| `src/components/case-studies/cornell/CornellAIBento.tsx` | Custom AI features bento grid |
| `src/components/case-studies/GoalBlock.tsx` | Reusable goal section with aurora text |
| `src/components/case-studies/QuoteBlock.tsx` | Scroll-reveal quote component |
| `src/components/ui/image-gallery.tsx` | Lightbox gallery for images |

## Page Structure

### 1. Hero and Goal Section
- `GoalBlock` with aurora text animation
- Goal: "Unify three distinct schools into one digital experience that feels coherent, findable, and maintainable"
- Subtle AI indicator badge: "AI-accelerated (human-reviewed)"
- Goal detail as italic subtext

### 2. Context Section (50/50 layout)
- **Left**: Prose about the 2016 merger and 2024 web fragmentation
- **Right**: Cornell logo or visual metaphor

### 3. The Mess Section (50/50 layout, flipped)
- **Left**: Visual showing navigation inconsistency
- **Right**: Prose about lack of shared rules, terminology mismatches

### 4. Quote Block
- Scroll-reveal animation
- "If a user needs a mental model of Cornell's org chart to find a program, the system has already lost."

### 5. My Role Section
- What I optimized for: Alignment, Clarity, Maintainability

### 6. How I Created Clarity (multi-part)

| Section | Layout | Visual Asset |
|---------|--------|--------------|
| 6a. Insight Work | Prose + collapsible | `treasuremap.jpg`, `nerdycornelldata.jpg` |
| 6b. Personas | 50/50 | `persona-slide1.png` in Safari wrapper |
| 6c. Module Design | 50/50 flipped | `cornell-fieldchip.jpg` |
| 6d. Navigation | Image gallery | `cornell-nav-flow.jpg`, `Cornell-nav-flow2.png` |
| 6e. Handoff | Prose only | - |

### 7. Where AI Helped Section

Custom `CornellAIBento` component with 4 interactive cards:

| Card | Icon | Interactive Element |
|------|------|---------------------|
| IA Clustering Aid | `FolderTree` | Animated clustering visualization |
| Story Synthesis | `FileText` | Marquee of user story snippets |
| Terminology Linting | `SpellCheck` | Before/after terminology animation |
| Doc Automation | `ListChecks` | Auto-generating checklist items |

### 8. Outcomes Section
- `NumberTicker` components for metrics
- ~1.7 min time-to-find
- 3 personas defined
- ~55 modules/screens wireframed

### 9. Learnings Section
- Three styled callout cards
- Hover animations

### 10. Closing
- Brief wrap-up paragraph
- Credits section

## Existing Assets

Located in `/public/images/case-studies/cornell-university/`:

| File | Usage |
|------|-------|
| `cornelllogo.png` | Hero section |
| `treasuremap.jpg` | Nerdy aside - data metaphor |
| `nerdycornelldata.jpg` | Nerdy aside - Hotjar data |
| `persona-slide1.png` | Personas section |
| `cornell-fieldchip.jpg` | Module design section |
| `cornell-nav-flow.jpg` | Navigation gallery |
| `Cornell-nav-flow2.png` | Navigation gallery |
| `taxes.jpg` | Optional - inconsistency metaphor |

## Suggested New Assets

1. **Navigation before/after**: Screenshots showing inconsistent vs. unified navigation for `Compare` component
2. **Three-to-one visual**: Graphic showing three school logos merging into unified system

## Component Dependencies

```
CornellAIBento.tsx
├── BentoGrid, BentoCard (@/components/ui/bento-grid)
├── Marquee (@/components/ui/marquee)
├── NumberTicker (@/components/ui/number-ticker)
├── cn (@/lib/utils)
└── lucide-react icons
```

## Implementation Checklist

- [ ] Create `CornellAIBento.tsx` component
- [ ] Restructure `page.mdx` with new sections
- [ ] Add `GoalBlock` with AI indicator
- [ ] Add `QuoteBlock` with scroll-reveal
- [ ] Implement 50/50 grid layouts
- [ ] Add `ImageGallery` for navigation images
- [ ] Add `NumberTicker` for outcomes
- [ ] Style learnings as callout cards
