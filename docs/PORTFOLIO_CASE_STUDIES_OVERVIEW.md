# Portfolio Case Studies Overview

This document provides context about Kyle McGraw's design and product portfolio, specifically the published case studies that demonstrate UX leadership, systems thinking, and practical design artifacts.

## Portfolio Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown with JSX components)
- **Interactions**: Custom React components with Framer Motion animations
- **Hosting**: Vercel

---

## Case Study 1: Breeze Mortgage Hub

### Project Overview

Transformed an incomplete mortgage platform into a modern, AI-enabled experience. The product had scattered wireframes, unclear requirements, and a beta that felt outdated. This work helped secure **$2.3M Series A funding**.

### Role

**UX Lead** — Led discovery, design system creation, and stakeholder alignment for a fintech startup navigating product-market fit.

### Tools & Technologies

| Category | Tools |
|----------|-------|
| Design | Figma, AI Tools |
| Analytics | Tableau, Salesforce |

### Key Metrics & Outcomes

- **95+ Design System Components** — Designed, documented, and annotated
- **56 Screens Designed** — Across 12 distinct user flows
- **96% Reduction** — In feature design time (from months of circling back to alignment in a week)

### Interactive Portfolio Features

This case study showcases several custom interactive components:

1. **Before/After Comparison Slider** — Drag-enabled comparison between the old and new interface, wrapped in an animated Safari browser frame
2. **AI Features Bento Grid** — Interactive cards demonstrating AI capabilities:
   - Smart Form Assist with auto-fill animations
   - Document Classification with marquee animation (94.5% accuracy)
   - Conversational Guidance with animated chat and feedback modals
   - AI Writing Assistant with hover-reveal interaction
3. **Integration Icon Cloud** — Visual representation of system integrations
4. **Focus Image Gallery** — Lightbox gallery showcasing dashboard, client portal, and chat screens
5. **Animated Beam Demo** — Workflow visualization with animated connecting lines

### Key Deliverables

- Interactive prototypes for stakeholder and investor walkthroughs
- Componentized design system with interaction rules and design tokens
- UX artifacts including journey maps, information architecture diagrams, and decision documentation
- Dev-ready acceptance criteria and requirements specifications

### Case Study Structure

1. The Problem — Challenge context with integration icon cloud
2. My Role — UX Lead responsibilities with animated beam visual
3. Before/After Comparison — Interactive slider demonstration
4. How I Created Clarity — Discovery, competitive analysis, prototyping approach
5. Practical AI — AI integration opportunities displayed in bento grid
6. What Shipped — Deliverables summary
7. Learnings — Three takeaway cards

---

## Case Study 2: Cornell University (SC Johnson College of Business)

### Project Overview

Unified three distinct business schools (Johnson, Nolan, Dyson) into one cohesive digital experience. After a 2016 merger, the web presence still behaved like three separate institutions with inconsistent navigation, terminology, and page structures.

### Role

**UX Lead** — Led information architecture research, persona development, and module-based wireframing to create a unified digital foundation.

### Tools & Technologies

| Category | Tools |
|----------|-------|
| Design | Figma, FigJam |
| Analytics | Hotjar, Google Analytics |
| AI | LLM assistants (for IA clustering, synthesis, terminology linting) |

### Key Metrics & Outcomes

- **92% Findability Improvement** — Users successfully found program information in under 2 minutes
- **55 Modules & Screens Wireframed** — System-first approach to design
- **3 Core Personas Defined** — To anchor decisions across stakeholders

### Interactive Portfolio Features

1. **Orbiting Circles Animation** — Visual showing three schools orbiting around the central college, with inner orbit displaying system/process icons
2. **Interactive File Tree** — Expandable tree component revealing navigation inconsistencies across the three schools
3. **Timeline Component** — Step-by-step approach with expandable accordion sections:
   - Insight work (with collapsible "Nerdy aside" technical details)
   - Personas development
   - Module design methodology
   - Navigation system design
   - Handoff documentation
4. **Lens Component** — Zoom tool for examining annotated Hotjar heatmap data
5. **Focus Image Gallery** — Persona slides and navigation flow diagrams
6. **Parallax Wireframe Section** — Annotated wireframes with scroll-based parallax effect

### Key Deliverables

- 55+ wireframed modules and screens using a modular system
- 3 validated personas with detailed user stories
- Navigation system documentation with naming conventions and grouping rules
- Annotated design system with component anatomy, interaction logic, and visual feedback states
- PRD-lite specifications reducing interpretation gaps between design and development

### Case Study Structure

1. Context — Background on the 2016 merger with orbiting circles visual
2. The Problem — Consistency issues illustrated via file tree component
3. How I Created Clarity — Five-phase timeline (Insight → Personas → Modules → Navigation → Handoff)
4. Practical AI — AI assistance applications in the project
5. Outcomes & Artefacts — Results with annotated wireframes gallery
6. Learnings — Three takeaway cards

---

## Case Study 3: Avatar Generations (Mobile RPG)

### Project Overview

Systems-level UX documentation for a UI-heavy mobile RPG based on Avatar: The Last Airbender. The game was menu-intensive, and the gap between design intent and implementation was growing. The work focused on creating comprehensive documentation as the single source of truth between art and engineering.

### Role

**UX Designer / Documentation Lead** — Served as the translation layer between art direction and engineering, establishing documentation practices that scaled.

### Tools & Technologies

| Category | Tools |
|----------|-------|
| Design | Figma, FigJam |
| Project Management | Monday.com, Confluence, Jira |
| Development | Perforce, Unity, NGUI |
| Analytics | Delta DNA |

### Key Metrics & Outcomes

- **42% Reduction** — In UI ticket cycle time (for owned tickets)
- **34% Reduction** — In design rework (fewer implementation mismatches)
- **25% Increase** — In onboarding completion (Delta DNA funnel analysis)

### Interactive Portfolio Features

1. **Tabbed Documentation Showcase** — Interactive tabs revealing three artifact types:
   - **User Flows Tab**: Flow walkthrough component showing journey mapping
   - **Component Anatomy Tab**: 5-image gallery demonstrating:
     - Task overview structure
     - All interaction states (Active, Disabled, Hover, Focus, Completed, Fail)
     - Placeholder text guidelines
     - Store layouts (Grid, Vertical, Horizontal)
     - Store homepage anatomy
   - **Design System Tab**: Button hierarchy visualization and typography system
2. **Flow Walkthrough Component** — Interactive visualization of user flow documentation
3. **Button Hierarchy Visual** — System showing button types and their relationships
4. **Focus Image Gallery** — 8 shipped game screens including:
   - Story dialogue scenes
   - Battle preparation and combat UI
   - Character stats panels
   - Victory screens
   - Combat UI redesign
   - Modal pattern specifications

### Key Deliverables

- User flow documentation mapping every path, decision point, and edge case
- Component anatomy specs defining screen regions, interaction behaviors, and state definitions
- Design system foundations including button hierarchies, typography rules, and spacing standards
- Implementation review process to catch issues before development
- Comprehensive state documentation (Active, Disabled, Hover, Focus, Completed, Fail states)

### Case Study Structure

1. The Problem — UI-heavy game where interface was central to experience
2. My Role — Translation layer between art and engineering
3. How I Created Clarity — Tabbed showcase of three artifact types
4. What Shipped — Game launch summary with screen gallery
5. Learnings — Three takeaway cards

---

## Common Patterns Across Case Studies

### Consistent Narrative Structure

All case studies follow a similar flow:
1. **Problem/Context** — Establish the challenge
2. **Role Definition** — Clarify responsibilities and scope
3. **Process ("How I Created Clarity")** — Methodology and approach
4. **Outcomes** — Measurable results and deliverables
5. **Learnings** — Reflective takeaways

### Interactive & Visual Features

- **Custom React Components**: Each case study leverages purpose-built components (bento grids, timelines, comparison sliders, galleries)
- **Animated Visualizations**: Framer Motion animations bring concepts to life
- **Lightbox Galleries**: Focus galleries with zoom and navigation for detailed image exploration
- **Educational Tooltips**: Contextual explanations of UX terminology and concepts
- **Parallax Effects**: Scroll-based animations adding depth to presentations

### Design Philosophy Themes

- **Clarity as the Core Value**: All case studies emphasize creating clarity through documentation, systems, and structured thinking
- **Practical AI Integration**: Thoughtful application of AI tools where they add genuine value
- **Systems Thinking**: Focus on scalable, modular solutions rather than one-off designs
- **Documentation as Communication**: Treating documentation as a design deliverable, not an afterthought
- **Measurable Outcomes**: Quantified impact metrics demonstrating business value

### Technical Implementation

- **MDX Content**: Case studies are written in MDX, allowing embedded React components within markdown
- **CaseStudyViewer Wrapper**: Consistent shell providing header, metrics display, and footer navigation
- **Responsive Design**: All interactive elements adapt to mobile with touch-friendly interactions
- **Accessible Patterns**: Focus states, keyboard navigation, and screen reader considerations

---

## Portfolio Unique Selling Points

1. **Fully Interactive Prototypes**: Case studies don't just describe work—they demonstrate it through functional interactive components
2. **Design System Documentation**: Comprehensive component libraries with states, variants, and usage guidelines
3. **Process Transparency**: Clear documentation of methodology and decision-making
4. **Quantified Impact**: Each case study includes measurable outcomes tied to business value
5. **Technical Depth**: Understanding of development constraints and implementation considerations
6. **Cross-Functional Communication**: Artifacts designed to bridge design, product, and engineering

---

## Summary

This portfolio demonstrates expertise in:

- **UX Strategy & Leadership** — Leading discovery, research, and design for complex products
- **Design Systems** — Creating scalable component libraries with comprehensive documentation
- **Information Architecture** — Structuring content and navigation for findability
- **Documentation Excellence** — Treating specs and guidelines as first-class deliverables
- **Practical AI Application** — Integrating AI tools thoughtfully into design workflows
- **Stakeholder Alignment** — Using interactive prototypes and clear artifacts to drive consensus

The interactive nature of the portfolio itself serves as a demonstration of technical capability and attention to user experience.
