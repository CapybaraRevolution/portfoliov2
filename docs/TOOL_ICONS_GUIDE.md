# Tool Icons Setup Guide

## Overview
This guide outlines which tool icons need to be added to the project and where to place them.

## Current Status
The following tools are currently using placeholder Lucide icons and need brand icon assets:

- **Salesforce** (currently using Cloud icon)
- **Tableau** (currently using BarChart icon)
- **Hotjar** (currently using Flame icon)
- **Google Analytics / GA4** (currently using LineChart icon)

## Where to Add Icons

### File Location
Place all tool icons in:
```
public/images/tools/
```

### File Naming Convention
Icons should be named using the tool slug (lowercase, spaces become underscores). **Exact file names needed:**

| Tool Name in Metadata | File Name to Use |
|----------------------|------------------|
| "Salesforce" | `salesforce.svg` |
| "Tableau" | `tableau.svg` |
| "Hotjar" | `hotjar.svg` |
| "Google Analytics" | `google_analytics.svg` |

**How it works**: The component converts tool names to slugs by:
1. Converting to lowercase
2. Replacing spaces with underscores
3. Looking for `/images/tools/{slug}.svg`

So "Google Analytics" becomes `google_analytics.svg`, "AI Tools" would become `ai_tools.svg`, etc.

## Icon Specifications

### Format
- **Format**: SVG (preferred) or PNG
- **SVG is strongly recommended** for scalability and crisp rendering

### Size
- **ViewBox**: Should be square (e.g., `viewBox="0 0 24 24"` or `0 0 32 32`)
- **Actual dimensions**: The component will scale them, but source should be clean vector graphics
- **No fixed width/height in SVG**: Let the component control sizing

### Styling Requirements
For best results, SVGs should:
1. Use `fill="currentColor"` instead of hardcoded colors (so they match text color)
2. Or use brand colors that work well on both light and dark backgrounds
3. Have transparent backgrounds
4. Be optimized (remove unnecessary metadata, comments, etc.)

### Example SVG Structure
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <!-- paths here -->
</svg>
```

## Where to Find Icons

### Recommended Sources

1. **Simple Icons** (https://simpleicons.org/)
   - Search for: Salesforce, Tableau, Hotjar, Google Analytics
   - Download SVG format
   - Note: These may need color adjustments for dark mode

2. **Official Brand Resources**
   - Check each company's brand/logo guidelines
   - Salesforce: https://www.salesforce.com/company/legal/tmcusageguidelines/
   - Tableau: Part of Salesforce brand guidelines
   - Hotjar: Check their brand resources
   - Google Analytics: Google's brand guidelines

3. **Icon Repositories**
   - Iconduck: https://iconduck.com/
   - SVGmix: https://svgmix.com/
   - BrandPNGLogo: https://brandpnglogo.com/

## After Adding Icons

Once you've added the SVG files to `public/images/tools/`, the `SafeToolIcon` component will **automatically** pick them up. No code changes needed!

The component checks in this order:
1. **Local file first** (`/images/tools/{slug}.svg`) ← **This is where your icons go**
2. Falls back to placeholder Lucide icons (current behavior)

So once you add the files, they'll immediately start showing instead of the placeholders.

## Testing

After adding icons:
1. Check the Tools & Technologies section on case study pages
2. Verify icons appear correctly in both light and dark modes
3. Ensure icons scale properly at different sizes (sm and md)

## Current Placeholder Mappings

These are the current fallback icons being used:

| Tool | Current Placeholder | Target Icon |
|------|-------------------|-------------|
| Salesforce | Cloud (Lucide) | Salesforce logo |
| Tableau | BarChart (Lucide) | Tableau logo |
| Hotjar | Flame (Lucide) | Hotjar logo |
| Google Analytics | LineChart (Lucide) | Google Analytics logo |

## Quick Reference Checklist

When adding each icon:
- [ ] Download SVG format
- [ ] Name file using slug: `salesforce.svg`, `tableau.svg`, etc.
- [ ] Place in `public/images/tools/`
- [ ] Ensure SVG uses `fill="currentColor"` OR brand colors visible on dark backgrounds
- [ ] Test in both light and dark modes
- [ ] Verify at both small (16px) and medium (20px) sizes

## Notes

- Icons should be recognizable brand logos
- If brand colors are used, ensure they're visible on both light (`bg-white`) and dark (`bg-zinc-800`) pill backgrounds
- Consider using `currentColor` in SVGs for automatic theme adaptation
- Test icons at both `sm` (16px) and `md` (20px) sizes
- **No code changes needed** - just add the files and they'll work automatically!
