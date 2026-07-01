# Project Memory

## Overview

This is the **default Krisspy template project** (custom Vite stack). It comes pre-configured with React + TypeScript + Tailwind CSS, a real Vite dev server, and a design system foundation.

## Planning Instructions

When planning a new project from this template, the agent MUST follow this order:

### Step 1 — Define the Theme

Before generating any page or component, update `/src/style/theme.css` to define the project's visual identity:

- Color palette (primary, secondary, accent, neutrals, semantic colors)
- Typography scale (font families, sizes, weights)
- Spacing, border radius, shadows
- Dark/light mode tokens if applicable

Also create custom presets in `/src/style/theme-presets.ts` — add at least 3 project-specific presets that reflect the brand (colors, radius, font size). These will appear in the Theme Editor so the user can switch between them.

### Step 2 — Update the Design System

Once the theme is defined, update `/src/pages/index.tsx` (the design system showcase) to reflect the new style:

- Showcase all colors, typography, and spacing from the new theme
- Update all UI components (buttons, cards, inputs, badges, etc.) to use the new tokens
- The design system page acts as a living style guide — it must always be up to date with the current theme

### Step 3 — Build the Project

Only after the theme and design system are established, generate the actual pages and features of the project. All new components must use the theme tokens — no hardcoded colors or arbitrary values.

New pages are added by **dropping a file in `/src/pages/**` — the route appears automatically (see `docs/routing.md`). Do NOT edit `/src/App.tsx`.

## Theme — S'investir (dark financial), from Figma import
- Palette: primary `#0049C6` (royal blue), secondary/accent `#1098F7` (azure), tertiary `#7899CE` (muted periwinkle). Dark surfaces: bg `#000519`, card `#030B1F`, elevated `#061230`. Text white + opacity.
- Page background = `--gradient-page` applied via `.bg-page-gradient`. Fonts: Plus Jakarta Sans (headings/body), Lexend 300 (buttons/labels) — loaded in `index.html`.
- Signature gradients in theme.css: `--gradient-panel`, `--gradient-badge-border`, `--glow-blue`.
- Reusable classes (theme.css): `.pill-badge`, `.btn`/`.btn-primary`/`.btn-outline`/`.btn-lg`, `.link-arrow`, `.card`/`.card-active`, `.glass-card`/`.glass-card-active`, `.stat-tile`, `.step-chip`, `.badge-soon`, `.glow-blue`.
- Gotcha: theme.css `.bg-primary`/`.bg-secondary`/`.bg-tertiary` have `!important` and map to SURFACE vars (not the brand color). To show a brand swatch use inline `style={{ backgroundColor: 'var(--primary)' }}`, and `bg-primary/25` (with opacity) is NOT overridden so it uses the brand color.
- Presets added (all dark): "S'investir", "Midnight", "Azure" in theme-presets.ts.

## Pages
- `/` (src/pages/index.tsx) — design system showcase, now @design "reference" (dark).
- `/sinvestir` (src/pages/sinvestir.tsx) — full landing rewritten from Figma, @design "reference". Uses original Figma image assets from `krisspy.blob.core.windows.net/public/figma-assets/img/`. FAQ = interactive accordion; comparators = horizontal snap-scroll.

## Key Files

- `/src/pages/index.tsx` — Design system showcase (home page, always update when theme changes)
- `/src/style/theme.css` — Theme tokens (colors, typography, radius)
- `/src/style/theme-presets.ts` — Theme presets shown in the Theme Editor
- `/src/App.tsx` — File-based router (auto-managed — DO NOT EDIT)
- `/.krisspy.md` — Project rules and constraints for the agent

