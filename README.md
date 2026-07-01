# Suite de simulateurs S'investir

Suite d'outils web pour **chiffrer des décisions d'investissement**. Le premier
outil est un **simulateur crypto en DCA** (Dollar Cost Averaging) : investissement
récurrent sur un actif crypto, calculé sur des données de marché réelles, avec
graphiques interactifs et **version intégrable par iframe**.

Stack : **React 18 + TypeScript + Vite + Tailwind CSS** (vrai serveur Vite, pas Sandpack).
Graphiques : **Recharts**. Icônes : **Lucide**.

## Démarrer le projet

```bash
npm install       # installer les dépendances
npm run dev       # serveur de dev Vite (http://localhost:5173)
npm run build     # build de production (tsc -b && vite build)
npm run preview   # prévisualiser le build
```

## Pages & routes

Routing **basé sur les fichiers** : déposez un fichier dans `src/pages/` et la
route apparaît (voir `docs/routing.md`). Ne pas éditer `src/App.tsx`.

| Route             | Fichier                        | Rôle |
|-------------------|--------------------------------|------|
| `/`               | `src/pages/index.tsx`          | Accueil — introduit le projet et renvoie vers les pages |
| `/crypto`         | `src/pages/crypto.tsx`         | Simulateur crypto DCA (config, chiffres clés, graphiques) |
| `/crypto/embed`   | `src/pages/crypto/embed.tsx`   | Version intégrable, configurée via paramètres GET |
| `/sinvestir`      | `src/pages/sinvestir.tsx`      | Landing page (référence de design) |
| `/designsystem`   | `src/pages/designsystem.tsx`   | Design system vivant (tokens & composants, référence de design) |

## Simulateur crypto — architecture

La logique est découplée de l'UI pour rester testable et réutilisable.

```
src/lib/crypto/
  cryptoApi.ts             ← SEUL fichier connaissant l'URL de la source de données
  normalizeMarketData.ts   ← série journalière + lookup de prix (fallback)
  calculateDcaSimulation.ts← moteur DCA pur (indicateurs + timeline)
  useCryptoSimulation.ts   ← hook React (fetch + cache + debounce + états)
  assets.ts / format.ts / queryParams.ts
src/components/simulators/crypto/
  CryptoSimulator.tsx      ← orchestrateur autonome
  CryptoSimulatorForm.tsx  ← formulaire (combobox actif recherchable, montant, fréquence, dates)
  CryptoKeyFigures.tsx     ← chiffres clés (capital, quantité, prix moyen, gains/pertes)
  CryptoHistoryChart.tsx / CryptoProfitLossChart.tsx  ← graphiques multi-séries + zoom
  EmbedModal.tsx           ← modal d'intégration (config + aperçu + copie du code iframe)
```

### Source de données (swappable)

Toute la connaissance de l'API est confinée dans `src/lib/crypto/cryptoApi.ts`.
Pour changer de source (API interne, CoinGecko, mock, base de données), il suffit
d'implémenter l'interface `MarketDataSource` — aucun composant React ne dépend de l'URL.

- Base par défaut : `https://digital-assets.fritzy.finance`
- Surchargeable via la variable d'environnement `VITE_CRYPTO_API_BASE`
- Format attendu (type CoinGecko) : `{ prices: [[timestampMs, price], ...] }`

## Intégration (embed)

Depuis `/crypto`, le bouton **« Intégrer ce simulateur »** ouvre une modal façon
YouTube : on configure les paramètres, on voit un aperçu live, et on copie le lien
direct ou le snippet `<iframe>`.

La page `/crypto/embed` se configure entièrement par paramètres GET :

`asset`, `currency`, `amount`, `frequency`, `start`, `end`, `layout`, `theme`, `readonly`

- `layout=false` → rend uniquement le simulateur, sans habillage/marges (idéal iframe)
- `theme=light` → surcharge les variables CSS à l'exécution
- `readonly=true` → champs verrouillés, résultat seul

Exemple :

```html
<iframe
  src="https://votre-domaine/crypto/embed?asset=bitcoin&amount=50&frequency=weekly&layout=false"
  width="100%" height="760" style="border:0;border-radius:16px" loading="lazy"
></iframe>
```

## Theming

Toutes les couleurs / rayons / tailles proviennent de variables CSS dans
`src/style/theme.css`. On les utilise via Tailwind (`bg-primary`, `text-secondary`)
ou via les classes composant (`btn-primary`, `card`, `input`, `badge-success`).
Le **Theme Editor** (icône engrenage) permet de prévisualiser des presets et de
les enregistrer dans `theme.css`. La page `/designsystem` est la vitrine à garder à jour.
