# Services Page Audit - Answers to Your Questions

## 1. Is `/services` currently MDX or TSX?

**Answer: MDX** (`src/app/services/page.mdx`)

- Currently an MDX file with component imports
- Uses JSX syntax within MDX (e.g., `<Button>`, `<RaycastFigureCard>`)
- **Comfortable adding component blocks?** ✅ Yes - MDX supports React components seamlessly. You're already using:
  - `<SimplifiedServicesGrid />`
  - `<RaycastFigureCard />`
  - `<ThreeDMarqueeDemo />`
  - `<AnimatedBeamMultipleOutputDemo />`

**Recommendation:** You can add FIG sections, offers, and proof components directly in MDX without issues.

---

## 2. How is the current primary CTA wired?

**Answer: Routes to `/contact` page**

- Primary CTA: `<Button href="/contact" arrow="right">Schedule a call</Button>`
- Secondary CTA: `<Button href="/work/overview" variant="secondary">View case studies</Button>`

**Contact page details:**
- `/contact` is a TSX page (`src/app/contact/page.tsx`)
- Has a contact form (submits via server action)
- Also has a Calendly button: `href="https://calendly.com/kylemcgraw"`
- After form submission, shows a "Book intro call" button linking to Calendly

**Current flow:**
1. Services page → `/contact` (form page)
2. Contact page has both form AND Calendly link
3. Form success → shows Calendly link

**Which is preferred as primary?**
- Currently: Contact form is primary
- Calendly is secondary/fallback
- **Recommendation:** Consider making Calendly the primary CTA on Services (direct booking), keep form as secondary for detailed inquiries

---

## 3. Do we already have chip filtering anywhere?

**Answer: ✅ Yes, extensively implemented**

**Components:**
- `FilterChip` component (`src/components/FilterChip.tsx`) - basic toggle chip
- `NavigationChip` component (`src/components/NavigationChip.tsx`) - skill-based chips with dropdowns
- `Chip` component (`src/components/ui/Chip.tsx`) - base chip component

**Where it's used:**
- `PortfolioShell` (`src/components/PortfolioShell.tsx`) - full filtering system
- `PortfolioGrid` (`src/components/PortfolioGrid.tsx`) - alternative portfolio view
- Both support: skills, category, AI filter, search

**Can chips filter case studies in-place (client-side)?**
✅ **Yes, absolutely!** The filtering is already client-side:
- Uses `useState` and `useMemo` for filtering
- No API calls needed
- Filters by: `services` array, `category`, `aiAccelerated`, search query
- Can be easily adapted for Services page

**Example from PortfolioShell:**
```typescript
const filteredProjects = useMemo(() => {
  let filtered = allCaseStudies
  
  // Skills filter
  if (filters.selectedSkills.size > 0) {
    filtered = filtered.filter(study =>
      Array.from(filters.selectedSkills).some(skill =>
        study.services.includes(skill)
      )
    )
  }
  // ... other filters
}, [allCaseStudies, filters])
```

---

## 4. Where do case studies live and how are they listed?

**Answer: Multiple locations, with shared metadata**

**File structure:**
- Individual pages: `src/app/case-studies/[slug]/page.mdx`
- Metadata source: `src/lib/caseStudies.ts` - exports `CaseStudyMetadata[]`
- Helper: `getAllCaseStudies()` function

**Shared components:**
- ✅ `RefactoredProjectCard` (`src/components/RefactoredProjectCard.tsx`) - card component
- ✅ `CaseStudyViewer` (`src/components/CaseStudyViewer.tsx`) - full case study layout
- ✅ `CaseStudyLayout` (`src/components/CaseStudyLayout.tsx`) - layout wrapper

**Metadata structure:**
```typescript
interface CaseStudyMetadata {
  title: string
  descriptiveTitle: string
  client: string
  description: string
  slug: string
  category: CategoryType
  aiAccelerated?: boolean
  services: string[]  // ← This is what you'd filter on
  tools: string[]
  // ... more fields
}
```

**Can filter on:**
- `services` array (skills/tags)
- `category` (UX, Strategy, PM, BA)
- `aiAccelerated` (boolean)
- `client`, `timeline`, `status`

---

## 5. Can we create a Proof section on Services that pulls from case study metadata (tags)?

**Answer: ✅ Yes, straightforward**

**Approach:**
1. Import `getAllCaseStudies()` from `src/lib/caseStudies.ts`
2. Filter by `services` array (which acts as tags)
3. Use `RefactoredProjectCard` or create a simpler card variant
4. Display filtered case studies

**Example implementation:**
```tsx
import { getAllCaseStudies } from '@/lib/caseStudies'
import { RefactoredProjectCard } from '@/components/RefactoredProjectCard'

// Filter case studies by service tag
const proofCaseStudies = getAllCaseStudies()
  .filter(study => study.services.includes('Information Architecture'))
  .slice(0, 3)  // Show top 3
```

**Metadata available for filtering:**
- `services: string[]` - primary filter (e.g., "Information Architecture", "Wireframing")
- `category: CategoryType` - secondary filter
- `client`, `timeline`, `status` - display metadata

---

## 6. Do we have analytics tracking (even lightweight) for CTA clicks, chip clicks, case-study clicks?

**Answer: ✅ Yes, Google Analytics is set up**

**Location:** `src/components/GoogleAnalytics.tsx`

**Available functions:**
- `trackEvent(eventName, parameters)` - generic event tracking
- `trackContactFormSubmission(formData)` - form-specific
- `trackCaseStudyView(caseStudyName)` - case study views
- `trackPortfolioProjectClick(projectName)` - project clicks

**Current usage:**
- Contact form submission: ✅ Tracked
- Calendly clicks: ✅ Tracked (`trackEvent('contact_calendar_clicked')`)
- Email reveals: ✅ Tracked

**What's NOT tracked yet:**
- ❌ CTA clicks on Services page
- ❌ Chip filter clicks
- ❌ Case study card clicks in portfolio

**Easy to add:**
```tsx
import { trackEvent } from '@/components/GoogleAnalytics'

// On CTA click
<Button 
  href="/contact" 
  onClick={() => trackEvent('services_cta_clicked', { cta_type: 'schedule_call' })}
>

// On chip click
<FilterChip 
  onClick={() => {
    trackEvent('services_filter_chip_clicked', { filter: skill })
    handleFilter(skill)
  }}
/>
```

---

## 7. Any known constraints with adding a "FIG 01" diagram module?

**Answer: ✅ Already exists! No constraints**

**Existing implementation:**
- `RaycastFigureCard` component (`src/components/RaycastInspiredGallery.tsx`)
- Already used on Services page: `<RaycastFigureCard figureId="systems-audit" eyebrow="FIG_01" />`
- Three figures available: `systems-audit`, `ui-blueprint`, `experiment-loop`

**Features:**
- SVG-based (no Three.js needed)
- Interactive hover states
- Grid background component included
- Responsive and styled

**To add more FIG diagrams:**
1. Add SVG to `raycastFigureSvgs` object
2. Add figure definition to `raycastFigures` array
3. Use `<RaycastFigureCard figureId="your-id" />`

**No constraints** - the system is ready for expansion.

---

## 8. Are we okay making Services TSX if it unlocks better structure?

**Answer: ✅ Yes, recommended for this use case**

**Current state:**
- MDX with lots of JSX components
- Mix of content and interactive elements
- Filtering, state management would be easier in TSX

**Benefits of converting to TSX:**
1. **State management** - Easier to add filtering, interactive sections
2. **Component composition** - Better structure for proof section, offers
3. **Client-side interactivity** - No need for 'use client' boundaries
4. **Type safety** - Better TypeScript support
5. **Data fetching** - Can use `getAllCaseStudies()` directly

**Recommendation:**
- ✅ Convert to TSX (`src/app/services/page.tsx`)
- Keep content sections as components
- Use MDX only for pure content pages (case studies, blog posts)

**Migration path:**
1. Create `src/app/services/page.tsx`
2. Move MDX content into component sections
3. Add interactive features (filtering, proof section)
4. Keep same URL structure

---

## Summary & Recommendations

### Quick Wins:
1. ✅ Add analytics tracking to Services CTAs
2. ✅ Create Proof section using `getAllCaseStudies()` + `RefactoredProjectCard`
3. ✅ Add chip filtering for case studies (reuse `FilterChip` + `PortfolioShell` logic)

### Medium Effort:
4. ✅ Convert Services to TSX for better structure
5. ✅ Add FIG section component blocks (already have infrastructure)

### Architecture Notes:
- Case study metadata is centralized in `src/lib/caseStudies.ts`
- Filtering system is mature and reusable
- Analytics is lightweight but functional
- FIG diagrams are SVG-based and extensible

**All systems are go for your enhancements!** 🚀




