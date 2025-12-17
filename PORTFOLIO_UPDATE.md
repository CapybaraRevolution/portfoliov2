# Houston Ballet Case Study - Portfolio Update

> **For Kyle**: This is draft content to extend your existing Houston Ballet case study. It covers the "prototype to production architecture" work. Copy/adapt as needed for your portfolio.

---

## New Section: From Demo to Developer Handoff

The prototype proved the concept. But a prototype isn't a product.

Taking it from "thing that works" to "thing developers can build on" meant confronting a different set of problems. Not *can we make this?* but *can this scale? Can someone else work on it? What happens when we don't know the answer yet?*

### The Gap Between Working and Ready

The Figma Make export ran. You could tap through it, see the QR codes, browse the venue info. But under the hood:

- The logo was a 40-character hash string (`ceb7b57d2b9ee52032a8d168d0d96c527a22c790.png`)
- Mock data lived directly in `App.tsx`
- Colors were hardcoded hex values scattered across components
- There was no concept of "this is Houston Ballet's app" vs "this could be anyone's app"

None of that matters for a demo. All of it matters when you're handing code to developers who need to build on it.

### Designing for Questions You Can't Answer Yet

Here's what I didn't know when I started the architecture work:

- How does the proprietary QR code system work? (Gary's building it, not me)
- What does Tessitura's API actually return? (The middleware doesn't exist yet)
- Will clients want redirect auth or embedded SSO? (Depends on the client)
- What content blocks will different venues want? (Nobody's asked them yet)

The temptation is to wait until you have answers. But waiting means the developers have nothing to work with. So instead, you design *interfaces* that define the contract without defining the implementation.

```tsx
// I don't know how Gary's QR code works.
// But I know what it needs to accept.
export interface QRCodeDisplayProps {
  data: string;      // The ticket data to encode
  size?: number;     // Display size (default 200)
  className?: string;
}
```

Gary can implement whatever he wants behind that interface. The rest of the app doesn't care.

### Multi-Tenancy from Day One

Houston Ballet is client #1. But the architecture assumes client #2 exists.

```
src/
├── assets/tenants/
│   └── houston-ballet/
│       └── logo.png
├── styles/themes/
│   └── houston-ballet.css
└── config/
    └── tenant.ts
```

This might seem like overkill for a single client. But the cost of building it now is low. The cost of retrofitting it later—when you have production code, real users, and tight deadlines—is high.

The decision compounds. Every new component I built used the tenant config. Every color came from a CSS variable. When client #2 shows up, the path is clear: add a folder, add a theme file, set an environment variable.

### The Token → Component Flow

Design systems talk a lot about "tokens." Here's what that actually looks like in practice:

```
tokens/colors.css (CSS variables)
        ↓
globals.css → @theme inline (Tailwind integration)
        ↓
Components use: className="bg-brand-primary"
        ↓
Tenant theme overrides the CSS variable values
        ↓
Houston Ballet gets purple, next client gets whatever
```

Change `--color-brand-primary` in one place. Every button, every header, every accent color updates. That's the point.

But tokens aren't just colors. The animation system uses the same pattern:

```css
/* The Bezier curves that control how motion feels */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

Tune these and the whole app feels different. Snappier. Bouncier. More deliberate. The *feel* becomes a parameter you can adjust.

### Documentation as Design Artifact

The README isn't an afterthought. It's part of the handoff.

I wrote it for two specific people: Gary (QR code integration) and Sunny (design system and scaling). Not generic "dear developer" prose. Actual names, actual guidance, actual open questions.

```markdown
## Gary - QR Code Integration

Gary, if you want to try implementing your QR code here, feel free.

**It's here:** `src/components/core/QRCode/`

**Stuff I don't know:**
- How your QR code is built
- If it needs initialization or setup
- Any security/validation that happens client-side
```

This does two things. First, it tells Gary exactly where to look and what to do. Second, it signals that I've *thought about* his work, even if I couldn't do it for him. The handoff isn't "here's code, good luck." It's "here's code, here's what I know, here's what I don't."

---

## New Metrics to Add

| Metric | Value |
|--------|-------|
| New infrastructure code | ~4,900 lines |
| Directories created | 9 (types, services, hooks, mocks, config, lib, tokens, themes, core components) |
| TypeScript interfaces | 15+ |
| Animation variants | 20+ |
| Developer guide | 337 lines |

---

## Updated Learning Cards

### The value keeps shifting
Production time compresses. Architecture time stays the same (or expands). The prototype took a day. The architecture work took another. But that second day is what makes the prototype *usable*.

### Interfaces over implementations
When you don't know how something will work, define what it needs to accept. Gary's QR code can be anything. The props interface is the contract.

### Compound decisions
Multi-tenancy, design tokens, service abstractions—these feel like overkill for one client. But each decision makes the next client easier. Architecture is about making future work cheaper.

### Documentation is design
The README isn't prose you write after the code. It's a design artifact that shapes how developers understand and extend the system. Write it for specific people with specific questions.

---

## Suggested Section Structure

If you want to add this to your existing page, here's how it might flow:

1. **Context** (existing)
2. **The Experiment** (existing - Figma Make workflow)
3. **Try It** (existing - interactive prototype)
4. **What This Means** (existing - AI tooling reflections)
5. **NEW: From Demo to Handoff** (the architecture work)
   - The gap between working and ready
   - Designing for unanswered questions
   - Multi-tenancy from day one
   - Documentation as design artifact
6. **Credits** (existing)

---

## Alternative: Shorter Addition

If you want something lighter, here's a condensed version to add after "What This Means":

---

### What Happened Next

The prototype did its job. It showed Houston Ballet what the experience *could* feel like. But a prototype isn't a product.

The next phase was quieter: taking code that works and making it code that scales. Multi-tenant architecture so client #2 doesn't require a rewrite. Design tokens so brand changes cascade automatically. TypeScript interfaces for APIs that don't exist yet. Documentation written for the specific developers who'll inherit this.

None of that is visible in the prototype. All of it is visible in the [codebase](https://github.com/...). The prototype took a day. The architecture took another. That second day is what makes the first day matter.

---

## Code Snippets for Visual Interest

If you want to show code in the case study, these are good candidates:

**Tenant Config (shows the multi-tenant thinking):**
```ts
const tenants: Record<string, TenantConfig> = {
  'houston-ballet': {
    id: 'houston-ballet',
    displayName: 'Houston Ballet',
    branding: {
      logo: houstonBalletLogo,
      primaryColor: '#322F3C',
    },
    features: {
      ticketTransfers: true,
      planningYourVisit: true,
    },
  },
  // Next client goes here
};
```

**QR Code Interface (shows designing for unknowns):**
```tsx
// Gary implements whatever he wants behind this interface
export interface QRCodeDisplayProps {
  data: string;
  size?: number;
  className?: string;
}
```

**Animation Tokens (shows the "feel" as parameter):**
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## Final Thought

The Figma Make case study is about *speed*—how AI tooling compressed the prototype phase. This update is about *what speed enables*. When you're not spending days on boilerplate, you can spend them on architecture. The tools didn't just make the prototype faster. They made room for the thinking that makes prototypes matter.

