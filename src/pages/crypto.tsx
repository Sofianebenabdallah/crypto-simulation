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
import { useTranslation } from 'react-i18next';
import { Code2 } from 'lucide-react';
import { PillBadge, LanguageSwitcher } from '../components/ui';
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
  const { t } = useTranslation();
  const [embedOpen, setEmbedOpen] = useState(shouldAutoOpenEmbed);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-page-gradient font-body text-white">
      {/* Decorative glow behind the hero, matching the landing page. */}
      <div className="glow-blue pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2" />

      <div className="absolute right-4 top-4 z-30 sm:right-8 sm:top-6">
        <LanguageSwitcher />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <header className="flex flex-col items-center text-center gap-4 mb-12">
          <PillBadge>{t('crypto.badge')}</PillBadge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight leading-[1.05] max-w-3xl">
            {t('crypto.title')}
          </h1>
          <p className="text-secondary max-w-xl text-sm sm:text-base leading-relaxed">
            {t('crypto.subtitle')}
          </p>
        </header>

        <CryptoSimulator />

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setEmbedOpen(true)} className="link-arrow">
            <Code2 size={16} /> {t('crypto.embedButton')}
          </button>
        </div>
      </div>

      <EmbedModal open={embedOpen} onClose={() => setEmbedOpen(false)} />
    </div>
  );
}
