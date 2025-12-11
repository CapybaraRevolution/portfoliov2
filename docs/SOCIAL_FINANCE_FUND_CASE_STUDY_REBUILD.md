# Social Finance Fund Case Study Adaptation

## Overview
Transform the Social Finance Fund case study from a basic prose layout into a rich, interactive story-driven page following the patterns established in Cornell, Breeze, and Houston Ballet case studies. The adaptation will preserve the core story while enhancing it with modern components, visual storytelling, and better information architecture.

## Current State Analysis
- **File**: `src/app/case-studies/social-finance-fund/page.mdx`
- **Current structure**: Basic prose with simple headings, includes ConstructionBanner (needs removal)
- **Content**: Good story about stakeholder alignment, survey work, AI-assisted IA, wireframes
- **Assets**: Logo, survey conditional logic image
- **Metrics**: Already defined (Stakeholder Alignment 95%, Users Surveyed 42, Pages Wireframed 5)

## Target Structure (Following Examples)

### 1. Goal Section
- Use `GoalBlock` component with aurora text animation
- Goal: "Align multi-org stakeholders and ship a usable IA/wireframe package for a government social finance initiative"
- Optional detail: "What began as 'just wireframes' became a wayfinding effort: align people, clarify goals, and create practical deliverables the group could rally around"

### 2. Context Section (50/50 SplitSection)
- **Left**: Prose about the Social Finance Fund initiative, multi-org challenge, and your role via Briteweb
- **Right**: Visual - orbiting circles showing the 3-4 organizations with their relationships
- Use `SplitSection` component with `OrbitContainer` and `OrbitingCircles` to show stakeholder relationships

### 3. The Problem Section (50/50 SplitSection, flipped)
- **Left**: Visual showing the complexity - file tree showing conflicting priorities
- **Right**: Prose about conflicting priorities, power dynamics, low trust, lean budget
- Use `SplitSection` with `flip` prop and `Tree` component

### 4. Quote Block
- Key quote: "Wireframes are diplomacy tools: shared artifacts resolve abstract disagreements"
- Or: "Sometimes the real UX problem isn't the interface—it's misalignment at the human level"
- Use `QuoteBlock` component

### 5. My Role Section (ProseSection)
- What you optimized for: Alignment, Clarity, Practical Deliverables
- Use `ProseSection` and `ProseBlock` components

### 6. How I Created Clarity (Timeline)
- Use `Timeline` component (like Cornell) with steps:
  - Survey → shared facts
  - Workshops → alignment  
  - AI-Accelerated concepting
  - Wireframes → proof of intent
- Include the survey conditional logic image with `Figure` or `FocusImageGallery`

### 7. Practical AI Section (ProseSection)
- Where AI helped: IA concepting, survey synthesis, content organization, documentation efficiency
- Use `ProseSection` and `ProseBlock`
- Keep as prose (no Bento Grid)

### 8. Outcomes & Deliverables (ProseSection)
- What shipped: Survey design & analysis, Obsidian research hub, IA & sitemap, Figma wireframes
- Use `FocusImageGallery` to showcase wireframe images
- Could also use `LearningCard` components in a grid or `ProseSection` with list

### 9. Learnings Section (LearningCards)
- Three key learnings:
  - "Wireframes are diplomacy tools: shared artifacts resolve abstract disagreements"
  - "Lightweight research > heavy decks early: Obsidian kept us fast and aligned"
  - "Prototypes spark better conversations: especially in multi-org, high-stakes contexts"
- Use `LearningCard` component in a 3-column grid

### 10. Credits Section
- Simple prose section with credits

## Visual Components to Use

### Required Components
- `CaseStudyViewer` - wrapper (already used)
- `SplitSection` - for 50/50 layouts
- `ProseSection` / `ProseBlock` - for prose content
- `QuoteBlock` - for key quotes
- `LearningCard` - for learnings
- `Heading` - for section headers
- `OrbitContainer` / `OrbitingCircles` - for stakeholder visualization
- `Tree` / `Folder` / `File` - for file tree visual in Problem section
- `Figure` - for images
- `FocusImageGallery` - for wireframe images gallery
- `Timeline` - for process steps
- `Tooltip` - for inline definitions
- `FadeIn` - for animations

### Visual Assets Available
- `/images/case-studies/social-finance-fund/sff-logo.png` (and .avif, .webp)
- `/images/case-studies/social-finance-fund/SFFSurveyConditionalLogic.png` (and .avif, .webp)

### Visual Assets Needed
- Wireframe screenshots for FocusImageGallery (user has these available)

## Content Refinements

### Preserve Core Story
- Multi-org challenge (3-4 organizations)
- Conflicting priorities and power dynamics
- Survey work with role-based branching
- Workshop facilitation
- AI-assisted IA concepting
- Wireframe deliverables
- Lean budget/timeline constraints

### Enhancements
- Add more specific examples of stakeholder navigation
- Expand on the Obsidian research hub approach
- Clarify the AI acceleration story
- Better structure for deliverables section

## Implementation Steps

1. **Remove ConstructionBanner** - delete the component usage
2. **Add GoalBlock** - at the top after CaseStudyViewer opening
3. **Restructure Context** - convert to SplitSection with orbiting circles visual
4. **Restructure The Problem** - convert to SplitSection (flipped) with file tree visual
5. **Add QuoteBlock** - between problem and approach
6. **Add My Role** - new section with ProseSection
7. **Restructure Approach** - convert to "How I Created Clarity" with Timeline component
8. **Restructure AI Section** - convert to "Practical AI" with ProseSection (no Bento Grid)
9. **Restructure Deliverables** - convert to "Outcomes" with FocusImageGallery for wireframes
10. **Restructure Learnings** - convert to LearningCard grid
11. **Add Credits** - simple prose section at end
12. **Add sections array** - for navigation (if used)
13. **Add proper imports** - all required components
14. **Test and refine** - ensure animations and layout work

## Decisions Made

1. **Visual for Context section**: Use orbiting circles showing the 3-4 organizations
2. **Visual for Problem section**: File tree showing conflicting priorities
3. **Timeline vs Prose**: Use Timeline component (like Cornell)
4. **Wireframe images**: Create FocusImageGallery for wireframe screenshots
5. **AI visualization**: Keep as prose (no Bento Grid)

## File to Modify
- `src/app/case-studies/social-finance-fund/page.mdx` - complete restructure

## Dependencies
All required components already exist in the codebase:
- `@/components/case-studies/GoalBlock`
- `@/components/case-studies/QuoteBlock`
- `@/components/case-studies/SplitSection`
- `@/components/case-studies/ProseSection`
- `@/components/case-studies/LearningCard`
- `@/components/ui/orbiting-circles`
- `@/components/ui/newacetimeline`
- `@/components/ui/focus-image-gallery`
- `@/components/ui/file-tree`
- `@/components/Heading`
- `@/components/ui/tooltip-card`
- `@/components/ui/fade-in`
