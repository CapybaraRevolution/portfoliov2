# Houston Ballet Prototype - Changelog & Comparison

**Date:** December 2024  
**Source:** `QR Code Performance Cards/` (Figma Make export)  
**Target:** `src/components/prototypes/houston-ballet/`

---

## Summary

The `QR Code Performance Cards/` folder contains a Figma Make export of the Houston Ballet mobile ticketing prototype. After comparing it with the existing portfolio prototype, here's what changed and what was updated.

---

## Key Differences Found

### 1. Animation Library

| Aspect | Figma Export | Portfolio Prototype |
|--------|--------------|---------------------|
| Package | `motion/react` (Motion One) | `framer-motion` |
| Import | `import { motion } from 'motion/react'` | `import { motion } from 'framer-motion'` |

**Decision:** Keep `framer-motion` for Next.js compatibility and existing ecosystem integration.

---

### 2. Image Handling

| Aspect | Figma Export | Portfolio Prototype |
|--------|--------------|---------------------|
| Component | Raw `<img>` element | Next.js `Image` component |
| Logo path | `figma:asset/ceb7b57d2b9ee52032a8d168d0d96c527a22c790.png` | `/images/case-studies/houston-ballet/houston-ballet-logo.png` |
| Optimization | None | Automatic Next.js optimization |

**Decision:** Keep Next.js `Image` component for performance optimization.

---

### 3. Client Directive

| Figma Export | Portfolio Prototype |
|--------------|---------------------|
| No directive (Vite app) | `'use client'` directive |

**Decision:** Keep `'use client'` directive required for Next.js App Router.

---

### 4. Scrollbar Styling

| Figma Export | Portfolio Prototype |
|--------------|---------------------|
| Default scrollbars | Hidden scrollbars for cleaner mobile appearance |

**CSS applied:**
```css
[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
```

**Decision:** Keep hidden scrollbars for authentic mobile app feel.

---

### 5. Border Color Handling

| Aspect | Figma Export | Portfolio Prototype |
|--------|--------------|---------------------|
| Performance card border | `className="border-transparent"` | `style={{ borderColor: 'transparent' }}` |
| QR code box border | `className="border-[#F6F6F6]"` | `style={{ borderColor: '#F6F6F6' }}` |

**Updated:** Converted inline styles to Tailwind classes for consistency.

---

### 6. QR Code Card Width

| Figma Export | Portfolio Prototype |
|--------------|---------------------|
| `max-w-sm` (constrained) | `w-full` (full width) |

**Decision:** Keep `w-full` for better mobile responsiveness within the container.

---

## What Was Updated

### Image Assets
- ✅ Created `/public/images/case-studies/houston-ballet/` directory
- ✅ Copied Houston Ballet logo from Figma export (`houston-ballet-logo.png`)

### PerformanceList.tsx
- ✅ Cleaned up border color handling (inline style → Tailwind class)
- ✅ Added `hover:border-[#888295]/30` for consistent hover state
- ✅ Verified all other hover states match Figma export

### QRCodeView.tsx
- ✅ Converted QR box border to Tailwind class (`border-[#F6F6F6]`)
- ✅ Converted seat info border to Tailwind class (`border-[#322F3C]/20`)
- ✅ Kept full-width QR card for better mobile UX

### SideMenu.tsx
- ✅ No changes needed - already synced

### AccountSettings.tsx
- ✅ Cleaned up border syntax (`border-[2px]` → `border-2`)

### PlanningYourVisit.tsx
- ✅ No changes needed - already has scrollbar hiding

---

## Tailwind Version Difference

| Figma Export | Portfolio Prototype |
|--------------|---------------------|
| Tailwind v4.1.3 (OKLCH colors, CSS @property) | Tailwind v3.x |

**Note:** The Figma export uses Tailwind v4 with modern CSS features like OKLCH color space and `@property` declarations. The portfolio uses v3.x which is more widely supported.

---

## Files in Figma Export (Reference)

```
QR Code Performance Cards/
├── index.html
├── package.json
├── README.md
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── assets/
    │   └── ceb7b57d2b9ee52032a8d168d0d96c527a22c790.png (HB logo)
    ├── components/
    │   ├── AccountSettings.tsx
    │   ├── PerformanceList.tsx
    │   ├── PlanningYourVisit.tsx
    │   ├── QRCodeView.tsx
    │   ├── SideMenu.tsx
    │   ├── figma/
    │   │   └── ImageWithFallback.tsx
    │   └── ui/
    │       └── [shadcn-ui components...]
    ├── guidelines/
    │   └── Guidelines.md
    ├── imports/
    │   └── Frame1.tsx
    └── styles/
        └── globals.css
```

---

## Conclusion

The portfolio prototype was already well-adapted for Next.js production use. The Figma Make export served as the source for the initial implementation, and the portfolio version includes:

1. **Next.js optimization** (Image component, client directives)
2. **Better mobile UX** (hidden scrollbars, full-width cards)
3. **Ecosystem compatibility** (framer-motion over motion/react)
4. **Production-ready styling** (consistent Tailwind usage)

No breaking changes were introduced. The prototype continues to function as expected with minor style refinements for consistency.

---

## Related Files

- Case Study: `src/app/case-studies/houston-ballet/page.mdx`
- Prototype Embed: `src/components/prototypes/houston-ballet/PrototypeEmbed.tsx`
- Data Source: `src/lib/caseStudies.ts`

