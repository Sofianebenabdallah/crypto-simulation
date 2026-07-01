# Project Memory

## Overview

Suite de simulateurs d'investissement **S'investir** (custom Vite stack: React 18 + TS + Vite + Tailwind).  
Premier outil livré : simulateur crypto DCA, avec version intégrable par iframe.

## Theme — S'investir (dark financial, from Figma)

- Palette: primary `#0049C6` (royal blue), secondary/accent `#1098F7` (azure), tertiary `#7899CE` (periwinkle). Surfaces: bg `#000519`, card `#030B1F`, elevated `#061230`. Text white + opacity.
- Page bg = `--gradient-page` via `.bg-page-gradient`. Fonts: Plus Jakarta Sans (headings/body), Lexend 300 (buttons/labels) — loaded in `index.html`.
- Reusable classes (theme.css): `.pill-badge`, `.btn`/`.btn-primary`/`.btn-outline`/`.btn-lg`, `.link-arrow`, `.card`/`.card-active`, `.glass-card`, `.stat-tile`, `.step-chip`, `.badge-soon`, `.glow-blue`, `.input`.
- Presets (all dark): "S'investir", "Midnight", "Azure" in theme-presets.ts.
- Gotcha: `.bg-primary/.bg-secondary/.bg-tertiary` use `!important` and map to SURFACE vars (not brand color). For a brand swatch use inline `style={{ backgroundColor: 'var(--primary)' }}`; `bg-primary/25` (with opacity) is NOT overridden.

## Pages (file-based routing — never edit App.tsx)

- `/` (src/pages/index.tsx) — **Home / intro**. Presents the project, 3 cards linking to /crypto, /sinvestir, /designsystem with role explanations.
- `/designsystem` (src/pages/designsystem.tsx) — design system showcase, @design "reference". (Moved here from `/`.)
- `/sinvestir` (src/pages/sinvestir.tsx) — landing from Figma, @design "reference".
- `/crypto` (src/pages/crypto.tsx) — crypto DCA simulator + "Intégrer ce simulateur" button opening EmbedModal.
- `/crypto/embed` (src/pages/crypto/embed.tsx) — embeddable, configured via GET params. `layout=false` = no chrome; `theme=light` overrides CSS vars at runtime.
- `/crypto?embed=1` (also `?embed=true` / `?modal=embed`) — auto-ouvre l'EmbedModal au chargement (helper `shouldAutoOpenEmbed` dans crypto.tsx), utilisé pour montrer le flow modal en iframe.
- `/crypto/decouverte` (src/pages/crypto/decouverte.tsx) — parcours d'onboarding « product tour » : 3 étapes (montant → actif top 5 → résultats). Piloté par l'URL via `?step=montant|actif|resultats` + `amount`/`frequency`/`asset` (react-router `useSearchParams`), donc chaque étape est rejouable/intégrable en iframe. Réutilise `<CryptoSimulator hideForm>` pour la révélation des courbes. Top 5 = BTC/ETH/BNB/SOL/XRP (hors stablecoins).

## Storyloop custom canvas

- `storyloop-custom/PresentationProduit.tsx` — board de présentation produit (PM) : hero de marque, section 01 design system (brandPanel palette/typo + iframe /designsystem), section 02 pages (/ et /sinvestir), section 03 simulateur + flow d'intégration (crypto → ?embed=1 modal → /crypto/embed), section 04 parcours découverte (3 étapes URL montant→actif→resultats). Edges narratifs animés.
- Les aperçus sont des `browserFrame` (iframe custom du build déployé, PAS PreviewNode) pointant sur `BASE_URL = https://preview.sinvestir.deploy.krisspy.ai`. iframe rendue en largeur desktop puis `transform: scale()` pour tenir dans le cadre.
- Sandbox canvas: uniquement imports `react`/`reactflow`/`lucide-react`/`react-router-dom`/`@krisspy/canvas`, styles inline, jamais d'import depuis `src/`.

## Features — Crypto Simulator

- Data source ISOLATED in `src/lib/crypto/cryptoApi.ts` (only file knowing the URL). Base overridable via `VITE_CRYPTO_API_BASE`, default `https://digital-assets.fritzy.finance`. CoinGecko-shaped `{ prices: [[tsMs, price]] }`. Swap via `MarketDataSource` interface.
- Pipeline: `cryptoApi` → `normalizeMarketData` (1 pt/day, binary-search `priceOnOrBefore` fallback) → `calculateDcaSimulation` (pure engine) → `useCryptoSimulation` hook (fetch+cache+debounce+loading/error/retry).
- Registry `src/data/crypto-assets.json` + `lib/crypto/assets.ts` (`SUPPORTED_ASSETS` = validated ids, 36 supported). Embed params in `lib/crypto/queryParams.ts`.
- UI in `src/components/simulators/crypto/`: `CryptoSimulator` (orchestrator), Form, KeyFigures (hero card + tiles), History + ProfitLoss charts (recharts multi-series), `chartShared.tsx` (`RichTooltip`, `ChartLegend`, `SERIES`, `BRUSH_BASE`, `ChartRange`).
- `AssetCombobox.tsx` — custom searchable asset picker (no external lib), keyboard nav, filter by name/symbol, themed on `.input`.
- `EmbedModal.tsx` — YouTube-style embed modal: config params + theme/height/readonly, live iframe preview, copy direct link & `<iframe>` snippet.
- Time-zoom: both charts share a recharts `<Brush>` synced via `range`/`onRangeChange` in `CryptoSimulator` (reset on new data; "Vue complète" button when zoomed).

## Gotchas

- `formatNumber` (lib/crypto/format.ts) defaults to **2 decimals + thousands grouping**. Quantity tile uses 2 decimals.
- Date inputs: `.input[type=date]` uses `color-scheme: dark` for a visible calendar icon — do NOT also `filter: invert` (double-inverts to black).
- Native `select.input` uses `appearance:none` + custom inset chevron (SVG bg) to match the combobox spacing; number spinner hidden.
- `src/vite-env.d.ts` (`/// <reference types="vite/client" />`) needed so `import.meta.env`/`glob` typecheck under tsc.
- GitHub repo connected: `Sofianebenabdallah/crypto-simulation` (branch main).

## Conventions

- Charts lib: `recharts`. Plan doc: `plan/plan-action.md`.
- Use theme CSS variables, not hardcoded Tailwind colors.

