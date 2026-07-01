/**
 * @krisspy-file
 * @type page
 * @name "CryptoSimulatorEmbed"
 * @title "Simulateur Crypto — Embed"
 * @description "Version intégrable du simulateur crypto. Se configure entièrement via les paramètres GET (asset, currency, amount, frequency, start, end, layout, theme, readonly)."
 * @routes ["/crypto/embed"]
 * @flowName "Simulateurs"
 */

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { parseEmbedParams } from '../../lib/crypto/queryParams';
import { CryptoSimulator } from '../../components/simulators/crypto/CryptoSimulator';

/**
 * Embeddable simulator.
 *
 * Example:
 *   /crypto/embed?asset=ethereum&currency=EUR&amount=25&frequency=daily
 *     &start=2018-01-01&end=2026-07-01&layout=false
 *
 * With layout=false the page renders ONLY the simulator (no header/nav/footer,
 * no site margins) for a clean iframe integration.
 */
export default function CryptoSimulatorEmbed() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const cfg = useMemo(() => parseEmbedParams(params), [params]);

  // Light theme support for embeds on white editorial pages.
  useEffect(() => {
    const root = document.documentElement;
    if (cfg.theme === 'light') {
      root.style.setProperty('--bg-primary', '#F6F8FC');
      root.style.setProperty('--bg-secondary', '#FFFFFF');
      root.style.setProperty('--bg-tertiary', '#EEF3FB');
      root.style.setProperty('--text-primary', '#0A1330');
      root.style.setProperty('--text-secondary', 'rgba(10,19,48,0.66)');
      root.style.setProperty('--text-muted', 'rgba(10,19,48,0.42)');
      root.style.setProperty('--border', 'rgba(10,19,48,0.12)');
      root.style.setProperty('--gradient-page', 'linear-gradient(180deg,#FFFFFF 0%,#F1F5FC 100%)');
    }
    return () => {
      // Reset overrides on unmount so we don't leak into other pages.
      ['--bg-primary', '--bg-secondary', '--bg-tertiary', '--text-primary', '--text-secondary', '--text-muted', '--border', '--gradient-page'].forEach(
        (v) => root.style.removeProperty(v),
      );
    };
  }, [cfg.theme]);

  const initialInput = {
    assetId: cfg.assetId,
    currency: cfg.currency,
    amount: cfg.amount,
    frequency: cfg.frequency,
    start: cfg.start,
    end: cfg.end,
  };

  // layout=false → bare, fluid, no chrome, transparent-friendly.
  if (!cfg.layout) {
    return (
      <div className="w-full min-h-screen font-body text-white" style={{ background: 'var(--gradient-page)' }}>
        <div className="w-full max-w-6xl mx-auto p-3 sm:p-5">
          <CryptoSimulator initialInput={initialInput} readonly={cfg.readonly} />
        </div>
      </div>
    );
  }

  // Default: a light framing so the embed still looks intentional standalone.
  return (
    <div className="min-h-screen w-full bg-page-gradient font-body text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="font-heading text-2xl font-semibold mb-6">{t('crypto.embedTitle')}</h1>
        <CryptoSimulator initialInput={initialInput} readonly={cfg.readonly} />
      </div>
    </div>
  );
}
