# Krisspy App

This project runs in the **`custom` stack** — a real Vite dev server, not Sandpack.

The agent can run shell commands here (`npm install`, `npm run dev`, lint, tests).
Edit `.krisspy/run.json` to change the start command or port.

## Routing

File-based — drop a file in `src/pages/` and the route appears. See `docs/routing.md`.
```
src/pages/index.tsx        → /
src/pages/about.tsx        → /about
src/pages/blog/[slug].tsx  → /blog/:slug
```

Don't edit `src/App.tsx` — it scans `src/pages/**` automatically.

## Theming

All colors / radius / font-size come from CSS variables in `src/style/theme.css`.
Use them via Tailwind (`bg-primary`, `text-secondary`, `rounded-[var(--border-radius)]`)
or via the component classes (`btn-primary`, `card`, `input`, `badge-success`).

The **ThemeEditor** (gear icon, top-right) lets you preview presets live and
save changes back to `theme.css`. Always check `src/pages/DesignSystemTest.tsx`
when you change the theme — it's the showcase page.
