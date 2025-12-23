# JixTix Houston Ballet Prototype - Feature Analysis

**Purpose:** Documenting the sophisticated design decisions and clever UX patterns in the JixTix mobile ticketing prototype for case study content.

---

## 🎯 Executive Summary

The JixTix prototype showcases a production-ready mobile ticketing experience for Houston Ballet. Key innovations include a swipeable multi-ticket QR carousel, tenant-configurable architecture, and thoughtful UX decisions around accessibility and venue constraints.

---

## 🌟 Standout Features

### 1. Multi-Ticket QR Code Carousel

**The Challenge:** Users often purchase multiple tickets (2-4 seats) but need to present each ticket individually at venue entry.

**The Solution:** A horizontal swipeable carousel where each ticket card contains:
- Individual QR code with unique ticket ID
- Per-ticket seat information (not all seats at once)
- "Ticket 1 of 4" counter
- Pagination dots for visual progress

**Clever Implementation Details:**
- Parses seat strings like "Seats 12-13" into individual ticket objects
- Generates unique QR data per seat with ticket IDs
- Supports touch swipe, mouse drag, trackpad scroll, AND keyboard arrows
- Spring-based animations for natural feel
- Drag constraints prevent over-scrolling

```typescript
// Desktop users can scroll through tickets with trackpad
const handleWheel = useCallback((e: WheelEvent) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
    // Navigate tickets based on scroll direction
  }
}, [currentTicketIndex, tickets.length]);
```

**Why It's Smart:**
- Eliminates confusion at entry ("which QR do I scan?")
- Works offline (QR data is pre-generated)
- Respects venue scanner workflows
- Feels native on both mobile and desktop demo

---

### 2. Tenant-Configurable Architecture

**The Challenge:** Build once, deploy for multiple arts organizations with different branding, features, and auth flows.

**The Solution:** A `TenantConfig` system that controls:

| Aspect | Configurable? |
|--------|--------------|
| Logo & Branding | ✅ |
| Primary/Secondary Colors | ✅ |
| Feature Toggles | ✅ |
| Auth Strategy | ✅ |
| Venue IDs | ✅ |
| Contact Info | ✅ |
| Legal Links | ✅ |

**Feature Flags Include:**
- `ticketTransfers` - Enable/disable transfer functionality
- `performanceHistory` - Show past attended shows
- `walletIntegration` - Apple/Google Wallet (Phase 2)
- `qrCodeBackground` - Decorative background image toggle

**Why It's Smart:**
- New clients = new config object, not new codebase
- Features can be A/B tested per tenant
- Branding changes don't require code changes
- Clear path from prototype to white-label product

---

### 3. Optional QR Background with UX Rationale

**The Feature:** Tenants can optionally display a decorative background image on the QR code screen.

**The Clever Part:** The code includes detailed documentation about *why* this might be a bad idea:

```typescript
/**
 * 🎨 Optional Background Image
 * 
 * UX/ACCESSIBILITY NOTE: 
 * - May reduce visual clarity of the ticket screen
 * - Can impact contrast ratios (WCAG AA/AAA)
 * - The QR code screen's primary job is presenting a scannable ticket
 * - May cause scanning issues in low-light venues
 * 
 * Default: OFF
 */
```

**Why It's Smart:**
- Demonstrates user-centered thinking over feature-creep
- Shows ability to push back on client requests with rationale
- Provides toggle for client to test and reconsider
- Documents accessibility considerations inline

---

### 4. Performance History with Smart Sorting

**The Challenge:** Show past attended performances without cluttering the main ticket view.

**The Solution:**
- Dedicated "Performance History" section accessed from side menu
- Cards show "Attended" badge with checkmark
- Sort controls: Date (newest first by default) or Title (A-Z)
- Images slightly dimmed (opacity-90) to visually distinguish from active tickets

**Why It's Smart:**
- Keeps main view focused on actionable items
- Provides receipt/history functionality users expect
- Sort flexibility for users with many past events
- Visual hierarchy clearly separates past from upcoming

---

### 5. Contextual Tooltips with Touch Support

**The Feature:** Info icon on seat information card shows helpful tooltip.

**Clever Implementation:**
```typescript
onMouseEnter={() => setShowTooltip(true)}
onMouseLeave={() => setShowTooltip(false)}
onTouchStart={() => setShowTooltip(true)}
onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
```

**Why It's Smart:**
- Works on both desktop (hover) and mobile (tap)
- Touch users get 2-second delay so they can read it
- Provides contextual guidance ("Have your seat info ready for ushers")
- Animated entrance/exit for polish

---

### 6. Sort Controls with Visual Feedback

**The Pattern:** Pill-shaped toggle buttons for sorting.

```typescript
className={`px-3 py-1 rounded-full text-xs transition-colors ${
  sortBy === 'date'
    ? 'bg-[#322F3C] text-white'
    : 'bg-white text-[#888295] hover:bg-[#322F3C]/10'
}`}
```

**Why It's Smart:**
- Clear active state (filled vs outlined)
- Compact footprint doesn't compete with content
- Consistent pattern across multiple views
- Smooth transition states

---

### 7. Dynamic Content Block Architecture (API-Ready)

**The Vision:** The "View Details" panel contains hardcoded content blocks (Performance History, Composer, Ticket Policy) with detailed comments explaining future API integration:

```typescript
/**
 * WHAT NEEDS TO HAPPEN:
 * 1. Add a hook for content blocks:
 *    const { contentBlocks } = usePerformanceContent(performance.id);
 * 
 * 2. Create a ContentBlockRenderer component
 * 
 * 3. Replace hardcoded JSX with:
 *    {contentBlocks.map(block => <ContentBlockRenderer block={block} />)}
 */
```

**Why It's Smart:**
- Demonstrates forward-thinking architecture
- Client sees the vision, not just current state
- Clear migration path documented inline
- Type definitions already exist in `src/types/content.ts`

---

### 8. Safe Area Handling for Modern Devices

**The Challenge:** iPhone notches, Dynamic Island, and home indicators.

**The Solution:** CSS environment variables throughout:

```typescript
style={{
  paddingTop: 'max(3rem, calc(3rem + env(safe-area-inset-top)))',
}}

style={{
  bottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))',
}}
```

**Why It's Smart:**
- Content never hidden by notch
- Close buttons always accessible
- Footer content respects home indicator
- Works on older devices too (falls back to first value)

---

### 9. Coming Soon Badge Pattern

**The Feature:** Menu items that aren't ready yet show "Coming Soon" pill.

```typescript
{item.comingSoon && (
  <span className="px-2.5 py-1 bg-[#322F3C] text-white text-xs rounded-full shadow-sm">
    Coming Soon
  </span>
)}
```

**Why It's Smart:**
- Sets expectations without removing navigation structure
- Shows product roadmap within the product
- Prevents dead-end taps
- Professional polish for demo/pitch scenarios

---

### 10. Keyboard Accessibility Throughout

**The Feature:** Ticket carousel supports keyboard navigation:

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (showDetails) return; // Don't navigate when details panel is open
    
    if (e.key === 'ArrowLeft') handlePrevious();
    else if (e.key === 'ArrowRight') handleNext();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [showDetails, currentTicketIndex]);
```

**Why It's Smart:**
- Full keyboard control for accessibility
- Disabled when modal is open (focus trap pattern)
- Clean event listener cleanup
- Works alongside touch/mouse controls

---

## 📐 Architecture Highlights

### Component Structure
```
houston-ballet/
├── HoustonBalletApp.tsx    # Main state management
├── PerformanceList.tsx     # Home screen with sort
├── QRCodeView.tsx          # Ticket carousel + details
├── PastPerformances.tsx    # History view
├── SideMenu.tsx            # Navigation drawer
├── AccountSettings.tsx     # Profile view
├── PlanningYourVisit.tsx   # Venue info
└── mockData.ts             # Demo data (API-ready shape)
```

### State Management
- Simple `useState` hooks - no Redux complexity
- View-based navigation with `currentView` state
- Performance selection triggers view switch
- Clean separation of concerns

### Animation Library
- Framer Motion for all transitions
- `AnimatePresence` for enter/exit animations
- Spring physics for natural movement
- `whileTap` for button feedback

---

## 💡 Case Study Talking Points

1. **Multi-stakeholder UX:** Balances patron needs (easy scanning), venue needs (individual ticket validation), and organization needs (branding, features).

2. **Accessibility-first:** Safe area handling, keyboard navigation, contrast considerations, touch-friendly interactions.

3. **Scalable architecture:** Tenant configuration system means one codebase serves multiple arts organizations.

4. **Offline-ready:** QR codes pre-generated with all necessary data - works in venues with poor connectivity.

5. **Documentation as design:** Inline comments explain not just *what* but *why*, including pushback on questionable client requests.

6. **Progressive disclosure:** Complex ticket info hidden behind "View Details" - main screen stays focused on the QR.

---

## 🚀 What's Next (Product Roadmap)

Based on feature flags and comments:

- [ ] Ticket Transfers between patrons
- [ ] Apple Wallet / Google Pay integration  
- [ ] Push notification reminders
- [ ] Real API integration (Tessitura)
- [ ] Dynamic content blocks from CMS
- [ ] Multi-venue support

---

*Document created: December 2024*
*For: Portfolio case study enhancement*

