# Plan d'action — Simulateur Crypto DCA (S'investir)

Transposition du simulateur crypto de sinvestir.fr dans la nouvelle suite de
simulateurs, en réutilisant le design system dark existant (theme.css + UI kit).

Priorités : 1) démo fonctionnelle · 2) intégration visuelle propre · 3) calculs
fiables · 4) composant autonome · 5) embed simple · 6) README clair.

---

## 0. État des lieux (existant réutilisable)

- **Stack** : React 18 + TS + Vite + Tailwind, routing par fichiers (`src/pages/**`).
- **Design system** : `src/style/theme.css` (tokens + classes `.card`, `.input`,
  `.btn`, `.stat-tile`, `.pill-badge`, `.badge-*`...) et UI kit `src/components/ui`
  (`Button`, `Card`, `StatTile`, `SectionHeader`, `Badge`, `PillBadge`...).
- **Pages référence** : `src/pages/index.tsx` et `src/pages/sinvestir.tsx`
  (`@design "reference"`) → standard visuel à respecter.
- **Données** : `src/data/crypto-assets.json` (liste actifs id/name/symbol).
- **API observée** : `GET /coins/{coinId}/market_chart?vs_currency=EUR&days=N`
  → structure CoinGecko `{ prices: [[ts_ms, price], ...] }` (validé).

Règle : NE PAS éditer `src/App.tsx` (routing auto). NE PAS coupler les composants
React à l'URL de l'API → tout passe par la couche `lib/crypto`.

---

## 1. Types (`src/types/crypto.ts`)

- `CryptoAsset { id; name; symbol; supported }`
- `Frequency = 'daily' | 'weekly' | 'monthly'`
- `SimulationInput { assetId; currency; amount; frequency; start; end }`
- `MarketPoint { date: string; ts: number; price: number }`
- `PurchasePoint { date; price; invested; quantity }`
- `PortfolioPoint { date; invested; value; quantity }` (série temporelle)
- `SimulationResult { totalInvested; days; quantity; avgPrice; finalValue;
  performance; profitLoss; timeline: PortfolioPoint[]; purchases: PurchasePoint[] }`
- `SimulationError` (union : `invalid_dates | no_data | insufficient_history |
  invalid_amount | api_error`)

## 2. Couche données (isolation API — CRITIQUE)

- **`src/lib/crypto/cryptoApi.ts`** : seul fichier qui connaît l'URL.
  - `BASE_URL` via `import.meta.env.VITE_CRYPTO_API_BASE` (fallback = fritzy).
  - `fetchMarketChart(coinId, currency, days)` → JSON brut, `AbortController`
    + timeout, gestion HTTP/erreurs réseau, throw `SimulationError('api_error')`.
  - Interface `MarketDataSource` pour permettre le swap (interne / CoinGecko /
    mock / DB) sans toucher aux composants.
- **`src/lib/crypto/normalizeMarketData.ts`** : `prices[][]` → `MarketPoint[]`
  triés par date, dédupliqués (1 point/jour), index `Map<YYYY-MM-DD, price>`.
  Fonction `priceOnOrBefore(date)` (fallback prix manquant → dernier connu).
- **`src/lib/crypto/queryParams.ts`** : parse/serialise les params d'URL de
  l'embed (asset, currency, amount, frequency, start, end, layout, theme,
  readonly) avec valeurs par défaut cohérentes et validation douce.

## 3. Logique de calcul (`src/lib/crypto/calculateDcaSimulation.ts`)

Fonction pure `calculateDcaSimulation(input, marketData): SimulationResult | { error }`.

1. Valider (dates cohérentes, montant > 0, historique suffisant).
2. Générer les dates d'achat selon `frequency` (borne `start`→`end`).
3. Pour chaque date : `price = priceOnOrBefore(date)` → `qty = amount / price`.
4. Cumuls : `totalInvested`, `quantity`, série `timeline` (valeur = qty cumulée ×
   prix du jour).
5. Final : `finalValue = quantity × prixFinal`,
   `profitLoss = finalValue - totalInvested`,
   `performance = profitLoss / totalInvested`,
   `avgPrice = totalInvested / quantity`.

Garde-fou : limiter le nb de points (ex. fréquence daily sur 10 ans) →
échantillonnage pour le graphe, calcul complet conservé.

## 4. Composants (`src/components/simulators/crypto/`)

Tous stylés avec les tokens/classes du design system (aucune couleur en dur).

- **`CryptoSimulator.tsx`** — orchestrateur autonome. Props :
  `initialInput`, `readonly`, `showChrome`. Gère état, appel data, calcul,
  loading/error. Utilisable tel quel dans page classique ET embed.
- **`CryptoSimulatorForm.tsx`** — bloc configuration : select actif, montant,
  fréquence, dates (classe `.input`, `Button`). Désactivé si `readonly`.
- **`CryptoKeyFigures.tsx`** — bloc « chiffres clés » via `StatTile` (total
  investi, jours, quantité, prix moyen, capital final, perf, +/-).
- **`CryptoHistoryChart.tsx`** — graphique historique (valeur portefeuille vs
  investi) + tooltip lisible.
- **`CryptoProfitLossChart.tsx`** — graphique gains/pertes (aire verte/rouge via
  `--success`/`--danger`).
- États **loading** (skeleton) et **error** (message + retry) réutilisables.

Graphiques : lib légère (`recharts`) ajoutée via package.json + `npm install`.
Responsive obligatoire (ResponsiveContainer, pas de scroll horizontal).

## 5. Pages

- **`src/pages/crypto.tsx`** (`/crypto`) — page classique : header section
  (`SectionHeader`/`PillBadge`), `<CryptoSimulator />`, fond `.bg-page-gradient`,
  `@design` cohérent avec les pages référence.
- **`src/pages/crypto/embed.tsx`** (`/crypto/embed`) — page embed : lit les
  params GET via `queryParams.ts`, rend UNIQUEMENT `<CryptoSimulator>` préconfiguré.
  - `layout=false` → aucun header/nav/footer/marges, largeur fluide, fond
    propre, hauteur adaptée iframe.
  - `readonly=true` (v2) → inputs masqués/désactivés, résultats seuls.
  - Ne casse pas si un param manque (valeurs par défaut).

Note : le routing par fichiers ne prévoit pas `?query` dans le chemin → on lit
les params via `useSearchParams` (react-router). Route finale : `/crypto/embed`.

## 6. Cas limites (gérés proprement)

date fin < début · période sans données · historique insuffisant · prix manquant
(fallback dernier prix) · montant ≤ 0 · fréquence trop fine (échantillonnage) ·
API indispo/réponse invalide (message + retry) · loading state · mobile lisible.

## 7. Robustesse & finitions

- Formatage montants/devises (`Intl.NumberFormat`).
- Debounce sur les changements d'input pour éviter les recalculs excessifs.
- Aucun secret exposé côté client ; embed sans auth.
- README à la racine du périmètre crypto : usage, params embed, exemple iframe,
  comment swapper la source de données.

---

## Arborescence cible

```
src/
  data/crypto-assets.json                 ✅ (créé)
  types/crypto.ts
  lib/crypto/
    cryptoApi.ts
    normalizeMarketData.ts
    calculateDcaSimulation.ts
    queryParams.ts
  components/simulators/crypto/
    CryptoSimulator.tsx
    CryptoSimulatorForm.tsx
    CryptoKeyFigures.tsx
    CryptoHistoryChart.tsx
    CryptoProfitLossChart.tsx
  pages/
    crypto.tsx                            → /crypto
    crypto/embed.tsx                      → /crypto/embed
```

## Dépendances à ajouter

- `recharts` (graphiques responsive) — via package.json + `npm install`.

## Ordre d'exécution recommandé

1. Types + JSON assets (JSON fait).
2. Couche data (`cryptoApi`, `normalizeMarketData`, `queryParams`).
3. Moteur `calculateDcaSimulation` (testable isolément).
4. Composants UI (form, key figures, charts) sur le design system.
5. `CryptoSimulator` orchestrateur + états loading/error.
6. Page `/crypto` puis page `/crypto/embed` (+ `layout=false`).
7. Cas limites, responsive, README.

## Critères de réussite (checklist)

- [ ] Démo fonctionnelle, indicateurs corrects (total, jours, qté, prix moyen,
      capital final, perf, +/-).
- [ ] Design cohérent avec la suite de simulateurs (tokens réutilisés).
- [ ] Code découpé, API isolée dans `lib/crypto`.
- [ ] Cas limites principaux gérés.
- [ ] Responsive, pas de scroll horizontal.
- [ ] Page embed avec params GET + `layout=false` intégrable en iframe.
