/**
 * @krisspy-file
 * @type page
 * @name "CryptoSimulatorPage"
 * @title "Simulateur Crypto"
 * @description "Simulateur d'investissement crypto en DCA — configuration, chiffres clés, graphiques historique et gains/pertes."
 * @routes ["/crypto"]
 * @flowName "Simulateurs"
 */

import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { PillBadge } from '../components/ui';
import { CryptoSimulator } from '../components/simulators/crypto/CryptoSimulator';
import { EmbedModal } from '../components/simulators/crypto/EmbedModal';

// Ouverture automatique de la modal d'intégration via `?embed=1` (ou `?modal=embed`).
// Utilisé pour montrer le flow d'intégration dans un aperçu iframe (canvas Storyloop).
function shouldAutoOpenEmbed(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const embed = params.get('embed');
  return embed === '1' || embed === 'true' || params.get('modal') === 'embed';
}

export default function CryptoSimulatorPage() {
  const [embedOpen, setEmbedOpen] = useState(shouldAutoOpenEmbed);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-page-gradient font-body text-white">
      {/* Decorative glow behind the hero, matching the landing page. */}
      <div className="glow-blue pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <header className="flex flex-col items-center text-center gap-4 mb-12">
          <PillBadge>Simulateur crypto</PillBadge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight leading-[1.05] max-w-3xl">
            Simulez un investissement crypto récurrent
          </h1>
          <p className="text-secondary max-w-xl text-sm sm:text-base leading-relaxed">
            Choisissez un actif, un montant et une fréquence, puis visualisez la performance d'une
            stratégie DCA sur données de marché réelles — quantité acquise, capital final, gains et pertes.
          </p>
        </header>

        <CryptoSimulator />

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setEmbedOpen(true)} className="link-arrow">
            <Code2 size={16} /> Intégrer ce simulateur
          </button>
        </div>
      </div>

      <EmbedModal open={embedOpen} onClose={() => setEmbedOpen(false)} />
    </div>
  );
}
