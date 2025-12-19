# Tooltip Inventory

A comprehensive record of tooltip terms and definitions used across the site. Terms are bolded inline in case studies and render via `<Tooltip>`. **Use these exact definitions site-wide to ensure consistency.**

## Site-Wide Standard Definitions

These definitions should be used **verbatim** across all pages where the term appears for the first time:

### Core UX/Product Terms

| Term | Definition |
|------|------------|
| **Information architecture (IA)** | The structural design of how content and features are organized, labeled, and connected—the blueprint for where things live and how users find them. |
| **Design system** | A Figma library of reusable components—organized with design tokens (colors, fonts), interaction logic, and even bezier curves for consistent motion. |
| **Personas** | Research-backed archetypes that represent key user types, used to keep decisions anchored to real needs instead of opinions. |
| **Progressive disclosure** | A UX technique that reveals information gradually as needed, preventing overwhelm by showing only what's relevant at each step. |
| **Cognitive load** | The mental effort required to use something—good design minimizes this by making interfaces intuitive and predictable. |
| **UX artefacts** | Deliverables designed to empower teams—wireframes, personas, user journey maps—giving everyone shared context on user needs and product direction. |

### Process & Research Terms

| Term | Definition |
|------|------------|
| **Discovery** | The research phase where you learn about users, business goals, and constraints before designing anything. |
| **Competitive scanning** | Systematic review of competitor products to identify patterns, gaps, and opportunities—not to copy, but to understand industry conventions. |
| **De-risked** | Reducing uncertainty by testing ideas before building—cheaper to fix a prototype than production code. |
| **Clickable prototypes** | Interactive mockups that simulate real product behavior—stakeholders can click through flows instead of imagining them from static screens. |
| **Happy path theatre** | The demo version of reality where WiFi is always fast, users never misclick, and edge cases don't exist. |

### Technical & Design Terms

| Term | Definition |
|------|------------|
| **Component behavior** | Reusable UI building blocks (buttons, forms, cards) that behave the same way everywhere—reducing user confusion and speeding up development. |
| **Component patterns** | Standardized rules for how UI elements look and behave—ensuring buttons, inputs, and feedback work consistently across the product. |
| **Dev-ready** | Specifications detailed enough that engineers can build from them without guesswork—including edge cases, states, and expected behaviors. |
| **Acceptance criteria** | Specific conditions a feature must meet to be considered 'done'—removes ambiguity about what success looks like before code is written. |
| **Spacing/token logic** | Design tokens that standardize spacing, color, and typography values so engineers and designers stay in sync. |
| **PRD-lite** | A lightweight requirements document that captures intent, states, and edge cases without the bloat of a full Product Requirements Document. |

### Analytics & Research Tools

| Term | Definition |
|------|------------|
| **Hotjar** | Behavior analytics for seeing how people actually navigate via heatmaps, scroll depth, and session replays. |
| **GA (Google Analytics)** | Traffic and event data that shows what's happening at scale. |
| **Data-driven** | Buzzword for 'I looked at some numbers before making this decision' (usually said while pointing at a chart). |

### AI Integration Terms

| Term | Definition |
|------|------------|
| **IA clustering support** | AI-assisted grouping of content and labels to propose an information architecture faster—humans still approve the final taxonomy. |
| **Terminology linting** | Automated checks that flag inconsistent labels and naming collisions across sections so we can standardize intentionally. |

### Consultant/Business Terms

| Term | Definition |
|------|------------|
| **10,000 ft** | Consultant terminology for looking at something from a high-level perspective (usually while standing very far away from the actual problem). |
| **Design debt** | Accumulated inconsistencies that make every new design or page slower because decisions keep getting re-made. |

---

## Usage by Page

### Breeze Mortgage Hub

- **Information architecture** — first use, with standard definition
- **Component behavior** — standard definition
- **Dev-ready** — standard definition
- **Discovery** — standard definition
- **Competitive scanning** — standard definition
- **De-risked** — standard definition
- **Component patterns** — standard definition
- **Progressive disclosure** — standard definition
- **Clickable prototypes** — standard definition
- **Happy path theatre** — standard definition
- **Design system** — standard definition (shared with Cornell)
- **UX artefacts** — standard definition
- **IA maps** — "The structural blueprint of how content and features are organized—mapping where things live and how users navigate between them."
- **Acceptance criteria** — standard definition
- **Cognitive load** — standard definition

### Cornell University

- **Hotjar** — standard definition
- **GA** — standard definition
- **Personas** — standard definition
- **Reusable page modules** — "Prebuilt, reusable page building blocks that share inputs, variants, and rules—keeping pages consistent and faster to assemble."
- **Patterns and Rules** (Navigation) — "A governed set of global, sectional, and in-page patterns with naming/grouping rules so navigation feels predictable everywhere."
- **Design system** — standard definition (shared with Breeze)
- **Spacing/token logic** — standard definition
- **PRD-lite** — standard definition
- **10,000 ft** — standard definition
- **Design debt** — standard definition
- **IA clustering support** — standard definition
- **Terminology linting** — standard definition
- **Data-driven** — standard definition
- **IA** — standard information architecture definition (used in Outcomes section)

### Social Finance Fund

- **Role-branched survey** — "Survey logic that shows different questions based on the respondent's role, so each stakeholder type gets relevant questions without unnecessary complexity."

---

## Guidelines

### When to Add Tooltips

1. **First occurrence only** — Each term should have a tooltip only on its first meaningful appearance per page
2. **Jargon that benefits from demystification** — Industry terms that sound impressive but benefit from plain-language explanation
3. **Terms that could be interpreted multiple ways** — Clarify your specific meaning
4. **Abbreviations** — Always define on first use (IA, GA, PRD, etc.)

### When NOT to Add Tooltips

1. **Common terms** — Don't tooltip "wireframe," "prototype," or "design" unless using them in a specific, unusual way
2. **Subsequent uses** — After the first tooltip, trust the reader to remember
3. **Self-explanatory terms** — If context makes the meaning clear, skip the tooltip
4. **Dense passages** — Too many tooltips in one paragraph feels cluttered; space them out

### Tone

Following the Case Study Tone Guide, tooltips should:

- Start with a **legitimate definition**
- Optionally add **personality** (self-aware commentary)
- Use the structure: *[Actual explanation] + [Self-aware commentary]*

**Good example:**
> "Data-driven" — Buzzword for 'I looked at some numbers before making this decision' (usually said while pointing at a chart).

**Avoid:**
- Pure jokes without educational value
- Definitions that are too long (keep to 1-2 sentences)
- Sarcasm directed at clients or users
