/**
 * @krisspy-file
 * @type page
 * @name "CryptoSimulatorPage"
 * @title "Simulateur Crypto"
 * @description "Simulateur d'investissement crypto en DCA — configuration, chiffres clés, graphiques historique et gains/pertes."
 * @routes ["/crypto"]
 * @flowName "Simulateurs"
 */

import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { PillBadge } from '../components/ui';
import { CryptoSimulator } from '../components/simulators/crypto/CryptoSimulator';

export default function CryptoSimulatorPage() {
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
          <Link to="/crypto/embed?layout=false" className="link-arrow" target="_blank" rel="noreferrer">
            <Code2 size={16} /> Voir la version intégrable (embed)
          </Link>
        </div>
      </div>
    </div>
  );
}
