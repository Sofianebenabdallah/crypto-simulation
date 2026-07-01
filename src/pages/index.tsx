/**
 * @krisspy-file
 * @type page
 * @name "Home"
 * @title "Accueil — Suite de simulateurs"
 * @description "Page d'introduction du projet : présente la suite S'investir et renvoie vers les simulateurs, la landing page et le design system."
 * @routes ["/"]
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Coins, LayoutTemplate, Palette, Code2, Sparkles, PanelsTopLeft, Workflow } from 'lucide-react';
import { Card, PillBadge, LanguageSwitcher } from '../components/ui';

interface Canvas {
  href: string;
  icon: React.ReactNode;
  key: string;
}

const CANVASES: Canvas[] = [
  {
    href: 'https://labs.krisspy.ai/share/1R3njMDfgr3H9qOGMXGc5/5c2b49545c2e6aba1e150a33ff0d9744?view=custom%3A%2Fstoryloop-custom%2FPresentationProduit.tsx',
    icon: <PanelsTopLeft size={24} />,
    key: 'presentation',
  },
  {
    href: 'https://labs.krisspy.ai/share/1R3njMDfgr3H9qOGMXGc5/8762b495ed3c240c38fa155f23a73529?view=custom%3A%2Fstoryloop-custom%2FArchitectureTechnique.tsx',
    icon: <Workflow size={24} />,
    key: 'architecture',
  },
];

interface Destination {
  to: string;
  icon: React.ReactNode;
  key: string;
}

const DESTINATIONS: Destination[] = [
  { to: '/crypto', icon: <Coins size={22} />, key: 'crypto' },
  { to: '/crypto/decouverte', icon: <Sparkles size={22} />, key: 'decouverte' },
  { to: '/sinvestir', icon: <LayoutTemplate size={22} />, key: 'sinvestir' },
  { to: '/designsystem', icon: <Palette size={22} />, key: 'designsystem' },
];

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-page-gradient font-body text-white">
      <div className="glow-blue pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2" />

      <div className="absolute right-4 top-4 z-30 sm:right-8 sm:top-6">
        <LanguageSwitcher />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <header className="mb-14 flex flex-col items-center gap-4 text-center">
          <PillBadge>{t('home.badge')}</PillBadge>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[54px]">
            {t('home.title')}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-secondary sm:text-base">
            {t('home.subtitle')}
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {CANVASES.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="flex h-full flex-col gap-4 border-secondary/25 bg-primary/10 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-secondary/40">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-primary/25 text-secondary">
                    {c.icon}
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-wide text-secondary">
                    {t(`home.canvases.${c.key}.badge`)}
                  </span>
                </div>
                <div>
                  <h2 className="mb-1.5 font-heading text-lg font-semibold">{t(`home.canvases.${c.key}.title`)}</h2>
                  <p className="text-sm leading-relaxed text-secondary">{t(`home.canvases.${c.key}.description`)}</p>
                </div>
                <span className="link-arrow mt-auto text-sm">
                  {t('home.openCanvas')}{' '}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d) => {
            const points = t(`home.destinations.${d.key}.points`, { returnObjects: true }) as string[];
            return (
              <Link key={d.to} to={d.to} className="group">
                <Card className="flex h-full flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:border-white/25">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 bg-primary/25 text-secondary">
                      {d.icon}
                    </span>
                    <span className="font-label text-[11px] uppercase tracking-wide text-secondary">
                      {t(`home.destinations.${d.key}.badge`)}
                    </span>
                  </div>

                  <h2 className="mb-2 font-heading text-xl font-semibold">{t(`home.destinations.${d.key}.title`)}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-secondary">{t(`home.destinations.${d.key}.description`)}</p>

                  <ul className="mb-6 flex flex-col gap-2">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-white/75">
                        <ArrowRight size={15} className="mt-0.5 shrink-0 text-secondary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="link-arrow mt-auto text-sm">
                    {t(`home.destinations.${d.key}.cta`)} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-secondary">
          <Code2 size={14} />
          <span>
            {t('home.footerNote')}
          </span>
        </div>
      </div>
    </div>
  );
}
