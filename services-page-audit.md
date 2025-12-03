# Services Page Audit & Recommendations

**Date**: 2025-11-30
**Purpose**: Review current services page and identify opportunities to transform it into a professional agency-style services page

---

## Current State

### Page Structure
- **Location**: `src/app/services/page.mdx`
- **Main Component**: `SimplifiedServicesGrid.tsx`
- **Layout**: Basic 2-column grid (responsive to 1 column on mobile)

### Existing Content

#### Page Header
- Simple "Services" title
- ProcessRedirect component
- Single CTA: "View My Work"

#### Four Services Offered

**1. Strategic Product Planning**
- Description: "Product roadmaps and stakeholder alignment that translate business goals into actionable development plans."
- Skills: Product Vision, Roadmap, Prioritization, OKRs
- Links to: Feature Prioritization process

**2. User Research & Strategy**
- Description: "User insights through interviews and behavioral analysis that inform strategic product decisions."
- Skills: User Research, Usability Testing, Product Analytics, Experimentation
- Links to: User Research process

**3. Design & Prototyping**
- Description: "Intuitive interfaces from wireframes to design systems that balance user needs with business goals."
- Skills: Wireframing, Prototyping, Information Architecture, Usability Testing
- Links to: Wireframing process

**4. Requirements Analysis**
- Description: "Technical requirements gathering that bridges stakeholder needs with development feasibility."
- Skills: PRDs (Specs), System Design, APIs & Integrations, Stakeholder Alignment
- Links to: Information Architecture process

### Current Design Elements
- Green circular icons (Heroicons: ChartBar, MagnifyingGlass, PaintBrush, DocumentText)
- Skill chips as navigation elements (using NavigationChip component)
- "How this fits into my process →" links at bottom of each card
- Single closing CTA button

---

## Issues Identified

### 1. Visual Hierarchy & Layout
- No compelling intro text or value proposition above the grid
- Generic grid layout doesn't convey premium agency positioning
- Lacks visual interest and breathing room

### 2. Content & Messaging
- Service descriptions are functional but lack storytelling and impact
- Doesn't align with the new homepage positioning: "hybrid UX Designer and Business Analyst who loves turning messy problem spaces into clear, testable ideas"
- Missing the "clarity" brand message established on homepage
- No clear differentiation or unique value proposition

### 3. Missing Elements
- No pricing information or engagement models
- No testimonials or social proof
- No case study links or project examples
- No process overview or methodology explanation
- Limited calls-to-action (only one generic button)

### 4. User Experience Gaps
- No clear path for different user types (enterprise vs startup, design-focused vs technical-focused)
- Service-specific CTAs missing
- No indication of engagement models (consulting, workshops, ongoing support, etc.)
- Links point to process pages rather than being self-contained service explanations

### 5. Brand Alignment
- Doesn't strongly communicate the positioning from homepage
- Missing emphasis on:
  - Systems thinking
  - Clarity and simplification
  - Workshop facilitation
  - Architecture mapping
  - Alignment and shared vision

---

## Recommendations for Professional Agency-Style Services Page

### Hero Section
- Strong headline aligned with homepage messaging
- Subheadline emphasizing unique value proposition
- Brief intro paragraph about approach/philosophy
- Primary CTA (e.g., "Schedule a Call") and secondary CTA (e.g., "View Case Studies")

### Services Section Improvements

**Content Strategy:**
- Rewrite service descriptions to emphasize outcomes and transformation, not just activities
- Add "What You Get" or "Deliverables" for each service
- Include "Ideal For" sections to help visitors self-identify
- Consider adding engagement types (1-week sprint, ongoing retainer, workshop, etc.)

**Visual Design:**
- Consider card-based layout with hover effects
- Add service-specific imagery or illustrations
- Implement better spacing and visual hierarchy
- Use color/visual treatment to create distinction between services

**Additional Sections to Consider:**
1. **How I Work** - Brief methodology overview
2. **Client Success Stories** - Testimonials or mini case studies
3. **Engagement Models** - How clients can work with you (retainer, project-based, workshops)
4. **Industries/Company Types** - Who you work best with
5. **FAQ Section** - Common questions about services
6. **Strong Closing CTA** - Multiple paths (schedule call, view work, download service guide)

### Content Alignment
Ensure service descriptions reflect the new positioning:
- "Turning messy problem spaces into clear, testable ideas"
- "Make the complex feel simple"
- "Keep everyone aligned around a shared vision"
- Emphasis on workshops, architecture mapping, prototyping, clarity

---

## Next Steps

1. **Content Specialist**: Rewrite service descriptions with storytelling, outcomes, and brand alignment
2. **Systems Analyst**: Define engagement models, deliverables, and process integration
3. **Engineer**: Review technical requirements for enhanced layout components and interactions
4. **Design Review**: Create mockups or references for professional agency-style layout

---

## Technical Files to Update

- `src/app/services/page.mdx` - Main page structure
- `src/components/SimplifiedServicesGrid.tsx` - Service grid component
- Consider creating new components:
  - `ServicesHero.tsx`
  - `ServiceCard.tsx` (enhanced version)
  - `EngagementModels.tsx`
  - `ServicesCTA.tsx`
