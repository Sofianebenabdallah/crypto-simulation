/**
 * @krisspy-file
 * @type page
 * @name "CryptoDecouverte"
 * @title "Simulateur Crypto — Découverte"
 * @description "Parcours d'onboarding guidé du simulateur crypto : on accompagne l'utilisateur étape par étape (mise, choix de la crypto, résultat) façon product tour. Chaque étape est reflétée dans l'URL (?step=montant|actif|resultats) pour être rejouée / intégrée."
 * @routes ["/crypto/decouverte"]
 * @flowName "Simulateurs"
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Repeat,
  Maximize2,
} from 'lucide-react';
import { Card, Button, PillBadge } from '../../components/ui';
import { CryptoSimulator } from '../../components/simulators/crypto/CryptoSimulator';
import { DEFAULT_CONFIG } from '../../lib/crypto/queryParams';
import type { Frequency, SimulationInput } from '../../types/crypto';

// ── Étapes du parcours (reflétées dans l'URL via ?step=) ──────────────
// URL keys stay in French for backward compatibility; tKey maps to i18n.
type Step = 'montant' | 'actif' | 'resultats';
const STEPS: { key: Step; tKey: string }[] = [
  { key: 'montant', tKey: 'amount' },
  { key: 'actif', tKey: 'asset' },
  { key: 'resultats', tKey: 'results' },
];

// Top 5 des cryptos les plus connues (hors stablecoins, pour des courbes parlantes).
const TOP5 = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB', color: '#F3BA2F' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', color: '#14A9F1' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', color: '#4AA7D8' },
];

const FREQ: { value: Frequency }[] = [
  { value: 'daily' },
  { value: 'weekly' },
  { value: 'monthly' },
];

const AMOUNT_PRESETS = [10, 25, 50, 100];

function parseAmount(raw: string | null): number {
  const a = Number(raw);
  return isFinite(a) && a > 0 ? a : 50;
}
function parseFreq(raw: string | null): Frequency {
  return raw === 'daily' || raw === 'weekly' || raw === 'monthly' ? raw : 'monthly';
}

// ── Indicateur d'étapes ───────────────────────────────────────────────
function Stepper({ current }: { current: Step }) {
  const { t } = useTranslation();
  const activeIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((s, i) => {
        const done = i < activeIdx;
        const active = i === activeIdx;
        return (
          <div key={s.key} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 place-items-center rounded-full font-label text-sm font-semibold transition-colors"
                style={{
                  background: active || done ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active || done ? 'var(--primary)' : 'var(--border)'}`,
                  color: active || done ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {done ? <Check size={15} /> : i + 1}
              </span>
              <span
                className="hidden font-label text-sm sm:inline"
                style={{ color: active ? '#fff' : 'var(--text-secondary)' }}
              >
                {t(`decouverte.steps.${s.tKey}`)}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className="h-px w-6 sm:w-12"
                style={{ background: done ? 'var(--primary)' : 'var(--border)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CryptoDecouverte() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const step = (params.get('step') as Step) || 'montant';

  const [amount, setAmount] = useState<number>(() => parseAmount(params.get('amount')));
  const [frequency, setFrequency] = useState<Frequency>(() => parseFreq(params.get('frequency')));
  const [assetId, setAssetId] = useState<string>(() => params.get('asset') || '');

  // Navigue vers une étape en persistant les choix dans l'URL (rejouable / intégrable).
  function goTo(next: Step, overrides?: { asset?: string }) {
    const asset = overrides?.asset ?? assetId;
    const p = new URLSearchParams();
    p.set('step', next);
    p.set('amount', String(amount));
    p.set('frequency', frequency);
    if (asset) p.set('asset', asset);
    setParams(p);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const activeAsset = assetId || 'bitcoin';
  const activeCoin = TOP5.find((c) => c.id === activeAsset) ?? TOP5[0];
  const input: SimulationInput = {
    assetId: activeAsset,
    currency: DEFAULT_CONFIG.currency,
    amount,
    frequency,
    start: DEFAULT_CONFIG.start,
    end: DEFAULT_CONFIG.end,
  };
  const startYear = DEFAULT_CONFIG.start.slice(0, 4);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-page-gradient font-body text-white">
      <div className="glow-blue pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
        {/* En-tête + stepper */}
        <header className="mb-10 flex flex-col items-center gap-5 text-center">
          <PillBadge>{t('decouverte.badge')}</PillBadge>
          <Stepper current={step} />
        </header>

        {/* ── Étape 1 · La mise ───────────────────────────────── */}
        {step === 'montant' && (
          <Card className="mx-auto max-w-2xl">
            <div className="flex flex-col items-center gap-6 p-2 text-center sm:p-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary bg-white/[0.04] text-secondary">
                <Sparkles size={26} />
              </span>
              <div>
                <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
                  {t('decouverte.amount.title')}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-secondary">
                  {t('decouverte.amount.description')}
                </p>
              </div>

              <div className="w-full max-w-md text-left">
                <label className="font-label text-xs uppercase tracking-wide text-secondary">
                  {t('decouverte.amount.amountLabel')}
                </label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    min={1}
                    step={1}
                    className="input pr-16 text-lg"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-sm text-secondary">
                    {DEFAULT_CONFIG.currency}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {AMOUNT_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p)}
                      className="rounded-full border border-primary bg-white/[0.03] px-3.5 py-1.5 font-label text-sm text-secondary transition-colors hover:border-white/25 hover:text-white"
                      style={
                        amount === p
                          ? { borderColor: 'var(--primary)', color: '#fff', background: 'rgba(0,73,198,0.18)' }
                          : undefined
                      }
                    >
                      {p} {DEFAULT_CONFIG.currency}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-md text-left">
                <span className="font-label text-xs uppercase tracking-wide text-secondary">
                  {t('decouverte.amount.rhythmLabel')}
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {FREQ.map((f) => {
                    const on = frequency === f.value;
                    return (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => setFrequency(f.value)}
                        className="flex flex-col items-center gap-0.5 rounded-xl border px-2 py-3 transition-colors"
                        style={{
                          borderColor: on ? 'var(--primary)' : 'var(--border)',
                          background: on ? 'rgba(0,73,198,0.18)' : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <Repeat size={15} className={on ? 'text-white' : 'text-tertiary'} />
                        <span
                          className="font-label text-sm"
                          style={{ color: on ? '#fff' : 'var(--text-secondary)' }}
                        >
                          {t(`decouverte.frequencies.${f.value}`)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                className="mt-2 w-full max-w-md"
                onClick={() => goTo('actif')}
                disabled={amount <= 0}
              >
                {t('decouverte.amount.continue')} <ArrowRight size={18} />
              </Button>
            </div>
          </Card>
        )}

        {/* ── Étape 2 · La crypto ─────────────────────────────── */}
        {step === 'actif' && (
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
                {t('decouverte.asset.title')}
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-secondary">
                {t('decouverte.asset.descriptionPrefix')}{' '}
                <span className="text-white">
                  {amount} {DEFAULT_CONFIG.currency} {t(`decouverte.frequencySentence.${frequency}`)}
                </span>{' '}
                {t('decouverte.asset.descriptionSuffix')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {TOP5.map((coin) => (
                <button
                  key={coin.id}
                  type="button"
                  onClick={() => {
                    setAssetId(coin.id);
                    goTo('resultats', { asset: coin.id });
                  }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-primary bg-white/[0.03] p-5 text-center transition-all hover:-translate-y-1 hover:border-white/25"
                >
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full font-heading text-base font-bold text-white shadow-lg"
                    style={{ background: coin.color }}
                  >
                    {coin.symbol}
                  </span>
                  <div>
                    <div className="font-heading font-semibold">{coin.name}</div>
                    <div className="font-label text-xs text-tertiary">{t(`decouverte.tags.${coin.id}`)}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => goTo('montant')}
                className="flex items-center gap-1.5 font-label text-sm text-secondary transition-colors hover:text-white"
              >
                <ArrowLeft size={15} /> {t('decouverte.asset.back')}
              </button>
            </div>
          </div>
        )}

        {/* ── Étape 3 · Le résultat ───────────────────────────── */}
        {step === 'resultats' && (
          <div>
            <div className="mb-8 text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-secondary">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full font-heading text-sm font-bold text-white"
                  style={{ background: activeCoin.color }}
                >
                  {activeCoin.symbol}
                </span>
                <Wallet size={18} className="text-tertiary" />
              </div>
              <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
                {t('decouverte.results.title')}
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-secondary">
                {t('decouverte.results.descriptionPrefix')}{' '}
                <span className="text-white">
                  {amount} {DEFAULT_CONFIG.currency} {t(`decouverte.frequencySentence.${frequency}`)}
                </span>{' '}
                {t('decouverte.results.descriptionMiddle')} <span className="text-white">{activeCoin.name}</span>{' '}
                {t('decouverte.results.descriptionSuffix', { year: startYear })}
              </p>
            </div>

            <CryptoSimulator hideForm initialInput={input} />

            {/* Actions de fin de parcours */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={() => goTo('actif')}>
                  <Repeat size={17} /> {t('decouverte.results.tryAnother')}
                </Button>
                <Button variant="outline" onClick={() => goTo('montant')}>
                  <RotateCcw size={17} /> {t('decouverte.results.restart')}
                </Button>
              </div>
              <Link to="/crypto" className="link-arrow">
                <Maximize2 size={16} /> {t('decouverte.results.openFull')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
