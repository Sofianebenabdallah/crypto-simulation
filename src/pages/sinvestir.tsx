/**
 * @krisspy-file
 * @type page
 * @name "Sinvestir"
 * @title "S'investir — Simulateurs & comparateurs financiers"
 * @description "Landing page S'investir : simulateurs et comparateurs financiers gratuits pour chiffrer ses décisions d'investissement. Rewrite responsive du design Figma."
 * @routes ["/sinvestir"]
 * @design "reference"
 * @requiresAuth false
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Play, Plus, ChevronDown, ArrowRight } from 'lucide-react';
import {
  Button, Card, GlassCard, LanguageSwitcher, LinkArrow, Logo, PillBadge, SectionHeader, SoonBadge, StatTile, StepChip,
} from '../components/ui';

/* ── Data ─────────────────────────────────────────────────────────────────
 * Assets are the original Figma exports hosted on Krisspy blob storage. */
const IMG = 'https://krisspy.blob.core.windows.net/public/figma-assets/img/';

const HERO_IMG = `${IMG}bzkFMxkppRh87BkBPlhlnd-1:75.png`;
const HOWTO_IMG = `${IMG}5da3439b.jpg`;
const APP_IMG = `${IMG}4644a896.png`;

const SIMULATOR_IMGS = [
  '1:262', '1:270', '1:278', '1:286', '1:294', '1:302', '1:310', '1:318',
].map((id) => `${IMG}bzkFMxkppRh87BkBPlhlnd-${id}.png`);

const COMPARATORS = [
  { id: '1:339', key: 'pea' },
  { id: '1:349', key: 'cto' },
  { id: '1:359', key: 'assuranceVie' },
  { id: '1:369', key: 'per' },
  { id: '1:379', key: 'scpi' },
  { id: '1:389', key: 'crypto' },
  { id: '1:399', key: 'bank' },
  { id: '1:409', key: 'proBank' },
  { id: '1:419', key: 'etf', soon: true },
].map((c) => ({ ...c, img: `${IMG}bzkFMxkppRh87BkBPlhlnd-${c.id}.png` }));

const FEATURE_KEYS = ['save', 'share', 'free', 'anytime'] as const;

const QUICK_STATS = [
  { v: '+ 40k', key: 'simulationsCreated' },
  { v: '8', key: 'simulatorsAvailable' },
  { v: '8', key: 'comparatorsAvailable' },
];

const FOOTER_LINK_KEYS = ['cookies', 'terms', 'legal', 'privacy'] as const;

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Sinvestir() {
  const { t } = useTranslation();
  const steps = t('sinvestir.howItWorks.steps', { returnObjects: true }) as { title: string; desc: string }[];
  return (
    <div className="relative min-h-screen w-full bg-page-gradient font-body text-white overflow-x-hidden">
      {/* Ambient glows */}
      <div className="glow-blue absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full opacity-70" />
      <div className="glow-blue absolute top-[1600px] -left-60 w-[1000px] h-[900px] rounded-full opacity-60" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 pt-6 pb-16">

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="flex items-center justify-between">
          <Logo className="h-8" />
          <nav className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <Button variant="outline">{t('common.login')} <ArrowRight size={15} /></Button>
            <Button>{t('common.createAccount')}</Button>
          </nav>
        </header>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="flex flex-col items-center text-center mt-16 sm:mt-24">
          <PillBadge>{t('sinvestir.hero.badge')}</PillBadge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mt-6 max-w-4xl">
            {t('sinvestir.hero.title')}
          </h1>
          <p className="text-secondary text-base sm:text-lg mt-6 max-w-2xl">
            {t('sinvestir.hero.subtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-9">
            <Button size="lg">{t('sinvestir.hero.startFree')}</Button>
            <LinkArrow iconSize={18}>{t('sinvestir.hero.discover')}</LinkArrow>
          </div>

          {/* Hero visual */}
          <div className="relative w-full max-w-5xl mt-14">
            <img
              src={HERO_IMG}
              alt={t('sinvestir.hero.heroAlt')}
              className="w-full h-auto rounded-2xl object-contain"
              loading="eager"
            />
          </div>

          {/* Feature strip */}
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mt-10">
            {FEATURE_KEYS.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-white/80 text-sm">
                <Check size={18} style={{ color: 'var(--secondary)' }} />
                {t(`sinvestir.features.${f}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Community counter ──────────────────────────────────── */}
        <section className="mt-32 flex flex-col items-center gap-8">
          <SectionHeader
            badge={t('sinvestir.community.badge')}
            title={t('sinvestir.community.title')}
          />
          <div className="flex flex-wrap justify-center gap-3">
            {['2', '5', '6', '3', '6'].map((d, i) => (
              <StatTile key={i} className="w-[100px] sm:w-[120px] h-[150px] sm:h-[170px] flex items-center justify-center">
                <span className="font-heading text-6xl sm:text-[90px] font-medium leading-none">{d}</span>
              </StatTile>
            ))}
          </div>
          <p className="text-lg font-medium tracking-wide">{t('sinvestir.community.label')}</p>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section className="mt-32 flex flex-col gap-10">
          <SectionHeader badge={t('sinvestir.howItWorks.badge')} title={t('sinvestir.howItWorks.title')} />
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Steps */}
            <div className="flex flex-col gap-4">
              {steps.map((s, i) => (
                <Card key={i} active={i === 0} className="rounded-token">
                  <div className="flex gap-4">
                    <StepChip>{i + 1}</StepChip>
                    <div>
                      <h3 className={`text-2xl mb-1.5 ${i === 0 ? 'text-white/90' : 'text-white/60'}`}>{s.title}</h3>
                      <p className={i === 0 ? 'text-white/90' : 'text-white/50'}>{s.desc}</p>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-white/10 mt-6" />
                </Card>
              ))}
            </div>
            {/* Illustration */}
            <div className="relative rounded-[20px] overflow-hidden border border-white/10 aspect-[776/452]">
              <img src={HOWTO_IMG} alt={t('sinvestir.howItWorks.illustrationAlt')} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,4,14,0.02) 0%, rgba(1,4,14,0.28) 100%)' }} />
            </div>
          </div>
          <div className="flex justify-center">
            <Button size="lg">{t('sinvestir.howItWorks.cta')}</Button>
          </div>
        </section>

        {/* ── Toolbox / app ──────────────────────────────────────── */}
        <section className="mt-32 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Logo className="h-7" />
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] leading-tight mt-6">
              {t('sinvestir.toolbox.title')}
            </h2>
            <p className="text-secondary mt-5 max-w-lg">
              {t('sinvestir.toolbox.description')}
            </p>
            <Button size="lg" className="mt-8">{t('sinvestir.toolbox.cta')}</Button>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-10 sm:gap-16 mt-12">
              {QUICK_STATS.map((s) => (
                <div key={s.key} className="text-center">
                  <div className="font-heading text-5xl sm:text-6xl">{s.v}</div>
                  <div className="mt-2 text-sm" style={{ color: 'var(--tertiary)' }}>{t(`sinvestir.toolbox.stats.${s.key}`)}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/70">{t('sinvestir.toolbox.registeredNote')}</p>
          </div>

          {/* App visual with play button */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="glow-blue absolute inset-0 -m-10 rounded-full" />
            <img src={APP_IMG} alt={t('sinvestir.toolbox.appAlt')} className="relative w-full h-auto rounded-[24px] object-contain" loading="lazy" />
            <button
              aria-label={t('sinvestir.toolbox.playVideo')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-md hover:scale-105 transition"
              style={{ background: 'rgba(4,8,21,0.22)' }}
            >
              <Play size={26} className="text-white ml-1" fill="white" />
            </button>
          </div>
        </section>

        {/* ── Simulators grid ────────────────────────────────────── */}
        <section className="mt-32 flex flex-col gap-10">
          <SectionHeader badge={t('sinvestir.simulators.badge')} title={t('sinvestir.simulators.title')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIMULATOR_IMGS.map((src, i) => (
              <div key={i} className="rounded-[20px] overflow-hidden border border-white/5 bg-white/[0.02] hover:border-primary/60 transition">
                <img src={src} alt={t('sinvestir.simulators.itemAlt', { index: i + 1 })} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button size="lg">{t('sinvestir.simulators.cta')}</Button>
          </div>
        </section>

        {/* ── Comparators (horizontal scroll) ────────────────────── */}
        <section className="mt-32 flex flex-col gap-10">
          <SectionHeader badge={t('sinvestir.comparators.badge')} title={t('sinvestir.comparators.title')} />
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 snap-x">
            {COMPARATORS.map((c) => (
              <ComparatorCard
                key={c.id}
                img={c.img}
                title={t(`sinvestir.comparators.items.${c.key}.title`)}
                desc={t(`sinvestir.comparators.items.${c.key}.desc`)}
                soon={c.soon}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button size="lg">{t('sinvestir.comparators.cta')}</Button>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="mt-32 flex flex-col items-center gap-12">
          <SectionHeader badge={t('sinvestir.faq.badge')} title={t('sinvestir.faq.title')} />
          <div className="w-full max-w-3xl flex flex-col gap-4">
            {(t('sinvestir.faq.items', { returnObjects: true }) as { q: string; a: string }[]).map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}

/* ── Local page sections ─────────────────────────────────────────────────── */

function ComparatorCard({ img, title, desc, soon }: { img: string; title: string; desc: string; soon?: boolean }) {
  return (
    <article className="relative shrink-0 w-[300px] sm:w-[321px] h-[380px] rounded-[20px] overflow-hidden border border-white/5 snap-start">
      <img src={img} alt={title} className="absolute inset-0 w-full h-[236px] object-cover" loading="lazy" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(108% 40% at 66% 32%, rgba(16,152,247,0.20) 0%, rgba(16,152,247,0) 36%), linear-gradient(180deg, rgba(4,8,20,0.02) 0%, rgba(4,8,20,0.08) 40%, rgba(4,8,20,0.90) 100%)' }}
      />
      {soon && (
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <SoonBadge />
          <span className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/5">
            <Plus size={18} className="text-white" />
          </span>
        </div>
      )}
      <div className={`absolute inset-x-0 bottom-0 p-6 flex flex-col gap-1.5 ${soon ? 'opacity-60' : ''}`}>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm font-light text-white/70">{desc}</p>
      </div>
    </article>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <GlassCard active={open} className="overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-white/90 text-base">{q}</span>
        <ChevronDown size={20} className={`shrink-0 text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm text-white/60 leading-relaxed">{a}</p>
        </div>
      </div>
    </GlassCard>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative border-t border-white/[0.08] mt-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Logo className="h-8" />
        </div>
        <p className="text-xs font-light text-white/40 leading-relaxed border-y border-white/[0.08] py-6 text-center">
          {t('sinvestir.footer.disclaimer')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-white/45">{t('sinvestir.footer.copyright')}</p>
          <nav className="flex items-center gap-6 text-xs font-light text-white/45">
            {FOOTER_LINK_KEYS.map((l) => (
              <a key={l} href="#" className="hover:text-white/80 transition">{t(`sinvestir.footer.links.${l}`)}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
