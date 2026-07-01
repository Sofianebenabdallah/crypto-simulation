/**
 * @krisspy-file
 * @type page
 * @name "DesignSystem"
 * @title "Design System"
 * @description "Living design system for S'investir — dark financial theme. Every token lives in theme.css and Tailwind exposes a 50→900 scale for each."
 * @routes ["/designsystem"]
 * @design "reference"
 * @requiresAuth false
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search, Check, Info, AlertTriangle, X, Star,
  Save, Share2, Gift, ArrowRight, Play, ChevronDown,
} from 'lucide-react';
import {
  Badge, Button, Card, GlassCard, LanguageSwitcher, LinkArrow, PillBadge, SoonBadge, StatTile, StepChip,
} from '../components/ui';

/**
 * Living style guide for the S'investir dark theme.
 * Colours come from `src/style/theme.css` (Tailwind exposes a 50→900 scale per
 * token) and every visual primitive is a component from `src/components/ui`.
 * Edit a CSS variable and every block below updates live.
 */
export default function DesignSystem() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full bg-page-gradient font-body text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16">

        <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <PillBadge className="mb-4">{t('designSystem.badge')}</PillBadge>
            <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight">
              {t('designSystem.title')}
            </h1>
            <p className="text-secondary text-sm mt-3 max-w-xl">
              {t('designSystem.subtitlePrefix')} <code className="font-label text-secondary">theme.css</code>{t('designSystem.subtitleMiddle')} <code className="font-label text-secondary">src/components/ui</code>.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <LanguageSwitcher />
            <span className="inline-flex items-center gap-2 text-xs font-label text-secondary">
              <span className="w-2 h-2 rounded-full bg-success" /> {t('designSystem.livePreview')}
            </span>
          </div>
        </header>

        {/* ── Palettes ─────────────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.colors')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
          <PaletteCard label="Primary"   token="--primary"   tone="primary"   />
          <PaletteCard label="Secondary" token="--secondary" tone="secondary" />
          <PaletteCard label="Tertiary"  token="--tertiary"  tone="tertiary"  />
          <PaletteCard label="Neutral"   token="--neutral"   tone="neutral"   />
        </div>

        {/* ── Typography ───────────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.typography')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-secondary font-label">{t('designSystem.typography.headingBody')}</span>
              <span className="text-sm text-secondary font-label">Plus Jakarta Sans</span>
            </div>
            <p className="font-heading text-5xl font-semibold mb-2">{t('designSystem.typography.headingSample')}</p>
            <p className="text-secondary">
              {t('designSystem.typography.bodySample')}
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-secondary font-label">{t('designSystem.typography.labelButtons')}</span>
              <span className="text-sm text-secondary font-label">Lexend</span>
            </div>
            <p className="font-label text-4xl font-light mb-2">{t('designSystem.typography.labelSample')}</p>
            <p className="font-label text-secondary font-light">{t('designSystem.typography.labelNote')}</p>
          </Card>
        </div>

        {/* ── Badges / labels ──────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.sectionLabels')}</SectionTitle>
        <Card className="mb-14 flex flex-wrap gap-4 items-center">
          <PillBadge>{t('designSystem.pills.simulators')}</PillBadge>
          <PillBadge>{t('designSystem.pills.howItWorks')}</PillBadge>
          <PillBadge>{t('designSystem.pills.joinUs')}</PillBadge>
          <PillBadge>{t('designSystem.pills.faq')}</PillBadge>
        </Card>

        {/* ── Buttons ──────────────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.buttons')}</SectionTitle>
        <Card className="mb-14 flex flex-wrap items-center gap-5">
          <Button size="lg">{t('designSystem.buttons.startFree')}</Button>
          <Button>{t('designSystem.buttons.createAccount')}</Button>
          <Button variant="outline">{t('designSystem.buttons.login')} <ArrowRight size={15} /></Button>
          <LinkArrow>{t('designSystem.buttons.discover')}</LinkArrow>
        </Card>

        {/* ── Cards ────────────────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.cards')}</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
          <Card active className="rounded-token">
            <div className="flex gap-4">
              <StepChip>1</StepChip>
              <div>
                <h3 className="text-xl mb-1">{t('designSystem.cards.step1Title')}</h3>
                <p className="text-secondary text-sm">
                  {t('designSystem.cards.step1Desc')}
                </p>
              </div>
            </div>
            <div className="h-1 rounded-full bg-white/10 mt-6" />
          </Card>

          <Card>
            <div className="flex gap-4">
              <StepChip>2</StepChip>
              <div>
                <h3 className="text-xl mb-1 text-white/70">{t('designSystem.cards.step2Title')}</h3>
                <p className="text-white/50 text-sm">
                  {t('designSystem.cards.step2Desc')}
                </p>
              </div>
            </div>
            <div className="h-1 rounded-full bg-white/10 mt-6" />
          </Card>

          <GlassCard active className="p-6 flex items-center justify-between">
            <span className="text-white/90">{t('designSystem.cards.faqSample')}</span>
            <ChevronDown size={20} className="text-secondary" />
          </GlassCard>
        </div>

        {/* ── Stat tiles ───────────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.counters')}</SectionTitle>
        <div className="mb-14">
          <div className="flex flex-wrap gap-3 justify-center">
            {['2', '5', '6', '3', '6'].map((d, i) => (
              <StatTile key={i} className="w-[110px] h-[140px] flex items-center justify-center">
                <span className="font-heading text-7xl font-medium">{d}</span>
              </StatTile>
            ))}
          </div>
          <p className="text-center mt-4 text-lg font-medium tracking-wide">{t('designSystem.counters.label')}</p>

          <div className="flex flex-wrap justify-center gap-16 mt-10">
            <Stat value="+ 40k" label={t('designSystem.counters.simulationsCreated')} />
            <Stat value="8" label={t('designSystem.counters.simulatorsAvailable')} />
            <Stat value="8" label={t('designSystem.counters.comparatorsAvailable')} />
          </div>
        </div>

        {/* ── Icons + feature list ─────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.iconsLists')}</SectionTitle>
        <Card className="mb-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {[
            { icon: Save, key: 'save' },
            { icon: Share2, key: 'share' },
            { icon: Gift, key: 'free' },
            { icon: Check, key: 'anytime' },
          ].map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/25 border border-secondary/30 text-secondary">
                <Icon size={18} />
              </span>
              <span className="text-white/80">{t(`designSystem.features.${key}`)}</span>
            </div>
          ))}
        </Card>

        {/* ── Alerts + form ────────────────────────────────────────────── */}
        <SectionTitle>{t('designSystem.sections.alertsForms')}</SectionTitle>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AlertsCard />
          <FormCard />
        </section>

      </div>
    </div>
  );
}

/* ─── Local showcase blocks ──────────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-secondary mb-5">{children}</h2>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-heading text-6xl">{value}</div>
      <div className="mt-2 text-base" style={{ color: 'var(--tertiary)' }}>{label}</div>
    </div>
  );
}

/**
 * Static class map — Tailwind's JIT cannot detect classes built by string
 * interpolation, so we list every shade explicitly.
 */
const SHADE_CLASSES: Record<string, string[]> = {
  primary:   ['bg-primary-50','bg-primary-100','bg-primary-200','bg-primary-300','bg-primary-400','bg-primary-500','bg-primary-600','bg-primary-700','bg-primary-800','bg-primary-900'],
  secondary: ['bg-secondary-50','bg-secondary-100','bg-secondary-200','bg-secondary-300','bg-secondary-400','bg-secondary-500','bg-secondary-600','bg-secondary-700','bg-secondary-800','bg-secondary-900'],
  tertiary:  ['bg-tertiary-50','bg-tertiary-100','bg-tertiary-200','bg-tertiary-300','bg-tertiary-400','bg-tertiary-500','bg-tertiary-600','bg-tertiary-700','bg-tertiary-800','bg-tertiary-900'],
  neutral:   ['bg-neutral-50','bg-neutral-100','bg-neutral-200','bg-neutral-300','bg-neutral-400','bg-neutral-500','bg-neutral-600','bg-neutral-700','bg-neutral-800','bg-neutral-900'],
};

function PaletteCard({ label, token, tone }: { label: string; token: string; tone: 'primary' | 'secondary' | 'tertiary' | 'neutral' }) {
  const varName: Record<string, string> = {
    primary: '--primary', secondary: '--secondary', tertiary: '--tertiary', neutral: '--neutral',
  };
  return (
    <Card className="!p-0 overflow-hidden">
      <div
        className="text-white p-5 flex items-center justify-between"
        style={{ backgroundColor: `var(${varName[tone]})` }}
      >
        <span className="font-heading font-semibold">{label}</span>
        <code className="font-label text-xs opacity-90">{token}</code>
      </div>
      <div className="grid grid-cols-10 h-12">
        {SHADE_CLASSES[tone].map((cls, i) => (
          <div key={cls} title={`${tone}-${[50,100,200,300,400,500,600,700,800,900][i]}`} className={cls} />
        ))}
      </div>
    </Card>
  );
}

function AlertsCard() {
  const { t } = useTranslation();
  const items = [
    { icon: Check,         title: 'Success', msg: t('designSystem.alerts.successMsg'), tone: 'success' as const },
    { icon: Info,          title: 'Info',    msg: t('designSystem.alerts.infoMsg'),    tone: 'info' as const },
    { icon: AlertTriangle, title: 'Warning', msg: t('designSystem.alerts.warningMsg'), tone: 'warning' as const },
    { icon: X,             title: 'Error',   msg: t('designSystem.alerts.errorMsg'),   tone: 'danger' as const },
  ];
  const palette: Record<string, { bg: string; text: string; border: string }> = {
    success: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' },
    info:    { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/30' },
    warning: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30' },
    danger:  { bg: 'bg-danger/10',  text: 'text-danger',  border: 'border-danger/30' },
  };
  return (
    <Card className="!p-6">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-heading font-semibold">{t('designSystem.alerts.title')}</span>
        <span className="text-xs font-label text-secondary">{t('designSystem.alerts.subtitle')}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map(({ icon: Icon, title, msg, tone }) => {
          const c = palette[tone];
          return (
            <div key={title} className={`flex items-start gap-3 p-3 rounded-token border ${c.bg} ${c.border}`}>
              <Icon size={16} className={`mt-0.5 ${c.text}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${c.text}`}>{title}</p>
                <p className="text-xs text-white/60">{msg}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function FormCard() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  return (
    <Card className="!p-6">
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-heading font-semibold">{t('designSystem.form.title')}</span>
        <span className="text-xs font-label text-secondary">{t('designSystem.form.subtitle')}</span>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-xs font-label text-secondary">{t('designSystem.form.fullName')}</label>
        <div className="flex items-center gap-2 input">
          <Search size={16} className="text-white/40" />
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('designSystem.form.searchPlaceholder')}
            className="bg-transparent outline-none text-sm flex-1 font-label placeholder:text-white/40 text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap mt-1">
          <Badge tone="info">Info</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <SoonBadge />
        </div>
        <div className="flex gap-3 mt-3">
          <Button><Star size={14} /> {t('designSystem.form.save')}</Button>
          <Button variant="outline"><Play size={14} /> {t('designSystem.form.preview')}</Button>
        </div>
      </div>
    </Card>
  );
}
