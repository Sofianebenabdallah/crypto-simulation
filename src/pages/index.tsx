/**
 * @krisspy-file
 * @type page
 * @name "Home"
 * @title "Accueil — Suite de simulateurs"
 * @description "Page d'introduction du projet : présente la suite S'investir et renvoie vers les simulateurs, la landing page et le design system."
 * @routes ["/"]
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Coins, LayoutTemplate, Palette, Code2, Sparkles, PanelsTopLeft, Workflow } from 'lucide-react';
import { Card, PillBadge } from '../components/ui';

interface Canvas {
  href: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
}

const CANVASES: Canvas[] = [
  {
    href: 'https://labs.krisspy.ai/share/1R3njMDfgr3H9qOGMXGc5/5c2b49545c2e6aba1e150a33ff0d9744?view=custom%3A%2Fstoryloop-custom%2FPresentationProduit.tsx',
    icon: <PanelsTopLeft size={24} />,
    badge: 'Présentation produit',
    title: 'Le projet expliqué de bout en bout',
    description:
      "Un canva interactif présente tout le projet comme le ferait un product manager : la marque, le design system, les pages et le parcours découverte, avec des aperçus live de chaque écran.",
  },
  {
    href: 'https://labs.krisspy.ai/share/1R3njMDfgr3H9qOGMXGc5/8762b495ed3c240c38fa155f23a73529?view=custom%3A%2Fstoryloop-custom%2FArchitectureTechnique.tsx',
    icon: <Workflow size={24} />,
    badge: 'Architecture technique',
    title: 'Comment le projet est construit',
    description:
      "La vue tech lead : structure du dossier, design system piloté par tokens et couche de données découplée — pour changer d’API sans rien casser.",
  },
];

interface Destination {
  to: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
}

const DESTINATIONS: Destination[] = [
  {
    to: '/crypto',
    icon: <Coins size={22} />,
    badge: 'Simulateur',
    title: 'Simulateur crypto DCA',
    description:
      "Simulez un investissement récurrent (Dollar Cost Averaging) sur un actif crypto à partir de données de marché réelles.",
    points: [
      'Actif, montant, fréquence et période configurables',
      'Chiffres clés : capital, quantité, prix moyen, gains/pertes',
      'Graphiques historique & gains/pertes avec zoom temporel',
    ],
    cta: 'Ouvrir le simulateur',
  },
  {
    to: '/crypto/decouverte',
    icon: <Sparkles size={22} />,
    badge: 'Onboarding',
    title: 'Parcours découverte',
    description:
      "Une version guidée du simulateur crypto : on onboarde pas à pas un utilisateur qui découvre le DCA, sans jargon.",
    points: [
      'Trois étapes : la mise, la crypto, le résultat',
      'Top 5 des cryptos à choisir en un clic',
      'Chaque étape vit dans l’URL — rejouable et intégrable',
    ],
    cta: 'Lancer le parcours',
  },
  {
    to: '/sinvestir',
    icon: <LayoutTemplate size={22} />,
    badge: 'Landing',
    title: "Landing page S'investir",
    description:
      "La page vitrine de la suite : positionnement, présentation des outils et appels à l'action.",
    points: [
      'Structure marketing complète',
      'Sert de référence de design pour les autres pages',
    ],
    cta: 'Voir la landing',
  },
  {
    to: '/designsystem',
    icon: <Palette size={22} />,
    badge: 'Design',
    title: 'Design System',
    description:
      "Le guide de style vivant : couleurs, typographie, composants et tokens partagés par tout le projet.",
    points: [
      'Tokens de thème (theme.css) et échelle 50→900',
      'Composants UI réutilisables (boutons, cartes, badges…)',
      'Aperçu live — modifier un token met tout à jour',
    ],
    cta: 'Explorer le design system',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-page-gradient font-body text-white">
      <div className="glow-blue pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <header className="mb-14 flex flex-col items-center gap-4 text-center">
          <PillBadge>Suite S'investir</PillBadge>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[54px]">
            Une suite d'outils pour chiffrer vos décisions d'investissement
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-secondary sm:text-base">
            Ce projet transpose les simulateurs S'investir dans une interface unifiée, sombre et
            intégrable. Choisissez une destination ci-dessous — chaque page a un rôle précis.
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
                    {c.badge}
                  </span>
                </div>
                <div>
                  <h2 className="mb-1.5 font-heading text-lg font-semibold">{c.title}</h2>
                  <p className="text-sm leading-relaxed text-secondary">{c.description}</p>
                </div>
                <span className="link-arrow mt-auto text-sm">
                  Ouvrir le canva{' '}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d) => (
            <Link key={d.to} to={d.to} className="group">
              <Card className="flex h-full flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:border-white/25">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 bg-primary/25 text-secondary">
                    {d.icon}
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-wide text-secondary">
                    {d.badge}
                  </span>
                </div>

                <h2 className="mb-2 font-heading text-xl font-semibold">{d.title}</h2>
                <p className="mb-4 text-sm leading-relaxed text-secondary">{d.description}</p>

                <ul className="mb-6 flex flex-col gap-2">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-white/75">
                      <ArrowRight size={15} className="mt-0.5 shrink-0 text-secondary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <span className="link-arrow mt-auto text-sm">
                  {d.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-secondary">
          <Code2 size={14} />
          <span>
            Le simulateur crypto est intégrable via iframe — ouvrez-le puis cliquez sur « Intégrer ce simulateur ».
          </span>
        </div>
      </div>
    </div>
  );
}
