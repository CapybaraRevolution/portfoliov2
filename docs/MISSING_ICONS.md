# Missing Tool Icons

The following tools are using fallback icons (either generic Lucide icons or text-based fallbacks) because their brand icons are missing from `public/images/tools/` or are not mapped in `SafeToolIcon.tsx`.

## How to Fix
1. Find the SVG logo for the tool (e.g., from [Simple Icons](https://simpleicons.org/) or the official website).
2. Save it to `public/images/tools/<slug>.svg`.
3. If the tool name has spaces (e.g., "Figma Make"), the slug uses underscores (e.g., `figma_make`).

## Tools needing icons

### From Case Studies (Houston Ballet, etc.)
- **Figma Make** (`figma_make`) -> Currently aliased to `figma` in `SafeToolIcon.tsx`. Ideally needs its own icon if different.
- **React** (`react`) -> Mapped to Simple Icons CDN in `SafeToolIcon.tsx`. Better to add local `react.svg`.
- **Tailwind CSS** (`tailwind_css`) -> Mapped to Simple Icons CDN in `SafeToolIcon.tsx`. Better to add local `tailwind_css.svg`.

### From Tools Grid (`src/data/tools.tsx`)
These currently use generic Lucide icons. To upgrade to brand icons, add the SVG files and update `src/data/tools.tsx` to remove the `iconName` (or update `ToolCard` to prefer `SafeToolIcon` over `iconName`).

- **Jira** (Currently `SquaresPlusIcon`) -> Add `jira.svg`
- **Notion** (Currently `BookIcon`) -> Add `notion.svg`
- **Amplitude** (Currently `ChartBarIcon`) -> Add `amplitude.svg`
- **Hotjar** (Currently `MagnifyingGlassIcon`) -> Add `hotjar.svg` (mapped to CDN in `SafeToolIcon`)
- **GitHub** (Currently `LinkIcon`) -> Add `github.svg`
- **Vercel** (Currently `BoltIcon`) -> Add `vercel.svg`
- **Storybook** (Currently `PackageIcon`) -> Add `storybook.svg`
- **Optimizely** (Currently `FlaskIcon`) -> Add `optimizely.svg`
- **Slack** (Currently `ChatBubbleIcon`) -> Add `slack.svg`
- **UserInterviews** (Currently `CogIcon`) -> Add `user_interviews.svg`
- **Airtable** (Currently `FolderIcon`) -> Add `airtable.svg`
- **Framer** (Currently `BoltIcon`) -> Add `framer.svg`
- **VS Code** (Currently `CogIcon`) -> Add `vs_code.svg`
- **Miro** (Currently `ShapesIcon`) -> Add `miro.svg`
- **Mixpanel** (Currently `ChartBarIcon`) -> Add `mixpanel.svg`
