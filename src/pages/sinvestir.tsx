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
import { Check, Play, Plus, ChevronDown, ArrowRight } from 'lucide-react';
import {
  Button, Card, GlassCard, LinkArrow, Logo, PillBadge, SectionHeader, SoonBadge, StatTile, StepChip,
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
  { id: '1:339', title: 'Comparateur PEA', desc: 'Quel courtier choisir pour ouvrir votre PEA ? Ce comparateur analyse pour vous les meilleures offres du marché selon plus de 40 critères.' },
  { id: '1:349', title: 'Comparateur CTO', desc: 'Quel courtier choisir pour ouvrir un compte-titres ? Ce comparateur analyse les offres selon les frais, les produits, les services et la qualité globale.' },
  { id: '1:359', title: 'Comparateur Assurance-Vie', desc: 'Quelle assurance-vie choisir ? Ce comparateur analyse les meilleures offres selon les frais, les fonds euros, les unités de compte et la qualité de service.' },
  { id: '1:369', title: 'Comparateur PER', desc: 'Quel PER choisir ? Ce comparateur analyse les offres selon les frais, les fonds euros, les unités de compte et la qualité globale.' },
  { id: '1:379', title: 'Comparateur SCPI', desc: 'Quelles SCPI choisir ? Ce comparateur identifie les SCPI les plus performantes pour maximiser votre rendement.' },
  { id: '1:389', title: 'Comparateur Crypto', desc: "Quelle plateforme de crypto-actifs choisir ? Ce comparateur analyse les offres selon l'accessibilité, les fonctionnalités, les frais et la sécurité." },
  { id: '1:399', title: 'Comparateur Banque en ligne', desc: 'Quelle est la meilleure banque en ligne et celle qui vous correspond le plus ?' },
  { id: '1:409', title: 'Comparateur Banque en ligne professionnelle', desc: 'Quelle banque en ligne pro choisir pour votre entreprise ?' },
  { id: '1:419', title: 'Comparateur meilleurs ETF', desc: "Quels ETF choisir ? Ce comparateur rassemble une sélection d'ETF selon la catégorie, les frais, l'encours, le PEA et le mode de réplication.", soon: true },
].map((c) => ({ ...c, img: `${IMG}bzkFMxkppRh87BkBPlhlnd-${c.id}.png` }));

const STEPS = [
  { n: 1, title: 'Simulez ou comparez', desc: 'Choisissez un simulateur ou un comparateur, et commencez votre simulation.' },
  { n: 2, title: 'Sauvegardez votre simulation', desc: 'Gardez vos calculs dans votre espace personnel pour les retrouver plus tard.' },
  { n: 3, title: 'Partagez vos résultats', desc: 'Diffusez un lien clair de vos hypothèses et résultats en quelques clics.' },
];

const FEATURES = [
  'Sauvegardez vos simulations',
  'Partagez vos résultats',
  'Outils gratuits',
  'Données accessibles à tout moment',
];

const QUICK_STATS = [
  { v: '+ 40k', l: 'simulations créées' },
  { v: '8', l: 'simulateurs disponibles' },
  { v: '8', l: 'comparateurs disponibles' },
];

const FAQ = [
  { q: 'Est-ce que les simulateurs sont gratuits ?', a: 'Oui, tous nos simulateurs et comparateurs sont accessibles gratuitement et sans limite.' },
  { q: 'Pourquoi créer un compte ?', a: 'Un compte gratuit vous permet de sauvegarder vos simulations, les retrouver plus tard et les partager en un lien.' },
  { q: 'Mes données sont-elles publiques ?', a: 'Non. Vos simulations restent privées ; vous seul décidez de partager un résultat via un lien.' },
  { q: 'Les résultats sont-ils « garantis » ?', a: 'Les résultats sont purement indicatifs et pédagogiques. Ils ne constituent pas un conseil en investissement.' },
  { q: 'De nouveaux simulateurs vont arriver ?', a: 'Oui, de nouveaux outils sont ajoutés régulièrement en fonction des besoins de la communauté.' },
  { q: 'Ces simulateurs sont-ils adaptés aux débutants ?', a: 'Absolument. Chaque outil est pensé pour être clair et accessible, quel que soit votre niveau.' },
  { q: 'Combien de temps faut-il pour faire une simulation ?', a: 'Quelques minutes suffisent : saisissez vos hypothèses et obtenez un résultat immédiat.' },
];

const FOOTER_LINKS = ['Cookies', 'CGVU', 'Mentions légales', 'Politique de confidentialité'];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Sinvestir() {
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
            <Button variant="outline">Se connecter <ArrowRight size={15} /></Button>
            <Button>Créer un compte</Button>
          </nav>
        </header>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="flex flex-col items-center text-center mt-16 sm:mt-24">
          <PillBadge>Les simulateurs S’investir</PillBadge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mt-6 max-w-4xl">
            Les simulateurs et comparateurs financiers pour chiffrer vos décisions
          </h1>
          <p className="text-secondary text-base sm:text-lg mt-6 max-w-2xl">
            Simulez, enregistrez et partagez vos calculs d’investissement en quelques clics.
            Accédez à des outils clairs, fiables et totalement gratuits !
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-9">
            <Button size="lg">Démarrer gratuitement</Button>
            <LinkArrow iconSize={18}>Découvrir les simulateurs</LinkArrow>
          </div>

          {/* Hero visual */}
          <div className="relative w-full max-w-5xl mt-14">
            <img
              src={HERO_IMG}
              alt="Aperçu des simulateurs S'investir"
              className="w-full h-auto rounded-2xl object-contain"
              loading="eager"
            />
          </div>

          {/* Feature strip */}
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mt-10">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-white/80 text-sm">
                <Check size={18} style={{ color: 'var(--secondary)' }} />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Community counter ──────────────────────────────────── */}
        <section className="mt-32 flex flex-col items-center gap-8">
          <SectionHeader
            badge="Rejoignez-nous"
            title={<>Une communauté d’investisseurs<br className="hidden sm:block" /> qui grandit chaque jour</>}
          />
          <div className="flex flex-wrap justify-center gap-3">
            {['2', '5', '6', '3', '6'].map((d, i) => (
              <StatTile key={i} className="w-[100px] sm:w-[120px] h-[150px] sm:h-[170px] flex items-center justify-center">
                <span className="font-heading text-6xl sm:text-[90px] font-medium leading-none">{d}</span>
              </StatTile>
            ))}
          </div>
          <p className="text-lg font-medium tracking-wide">UTILISATEURS INSCRITS</p>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section className="mt-32 flex flex-col gap-10">
          <SectionHeader badge="Comment ça marche ?" title="Vos simulations, du calcul au partage" />
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Steps */}
            <div className="flex flex-col gap-4">
              {STEPS.map((s, i) => (
                <Card key={s.n} active={i === 0} className="rounded-token">
                  <div className="flex gap-4">
                    <StepChip>{s.n}</StepChip>
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
              <img src={HOWTO_IMG} alt="Illustration du parcours de simulation" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,4,14,0.02) 0%, rgba(1,4,14,0.28) 100%)' }} />
            </div>
          </div>
          <div className="flex justify-center">
            <Button size="lg">Commencer une simulation</Button>
          </div>
        </section>

        {/* ── Toolbox / app ──────────────────────────────────────── */}
        <section className="mt-32 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Logo className="h-7" />
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] leading-tight mt-6">
              La boîte à outils de la communauté S’investir
            </h2>
            <p className="text-secondary mt-5 max-w-lg">
              Des simulateurs clairs et des comparateurs détaillés, pensés pour prendre de meilleures
              décisions avec un compte gratuit pour centraliser, sauvegarder et partager vos simulations.
            </p>
            <Button size="lg" className="mt-8">Créer un compte gratuitement</Button>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-10 sm:gap-16 mt-12">
              {QUICK_STATS.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-heading text-5xl sm:text-6xl">{s.v}</div>
                  <div className="mt-2 text-sm" style={{ color: 'var(--tertiary)' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/70">Déjà plus de 25 636 inscrits !</p>
          </div>

          {/* App visual with play button */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="glow-blue absolute inset-0 -m-10 rounded-full" />
            <img src={APP_IMG} alt="Application S'investir" className="relative w-full h-auto rounded-[24px] object-contain" loading="lazy" />
            <button
              aria-label="Lire la vidéo"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-md hover:scale-105 transition"
              style={{ background: 'rgba(4,8,21,0.22)' }}
            >
              <Play size={26} className="text-white ml-1" fill="white" />
            </button>
          </div>
        </section>

        {/* ── Simulators grid ────────────────────────────────────── */}
        <section className="mt-32 flex flex-col gap-10">
          <SectionHeader badge="Nos simulateurs" title="Accédez à tous nos simulateurs" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIMULATOR_IMGS.map((src, i) => (
              <div key={i} className="rounded-[20px] overflow-hidden border border-white/5 bg-white/[0.02] hover:border-primary/60 transition">
                <img src={src} alt={`Simulateur ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button size="lg">Lancez votre première simulation</Button>
          </div>
        </section>

        {/* ── Comparators (horizontal scroll) ────────────────────── */}
        <section className="mt-32 flex flex-col gap-10">
          <SectionHeader badge="Nos comparateurs" title="Comparez avant de faire un choix" />
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 snap-x">
            {COMPARATORS.map((c) => (
              <ComparatorCard key={c.id} {...c} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button size="lg">Essayez nos comparateurs</Button>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="mt-32 flex flex-col items-center gap-12">
          <SectionHeader badge="FAQ" title="Questions fréquentes" />
          <div className="w-full max-w-3xl flex flex-col gap-4">
            {FAQ.map((item, i) => (
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
  return (
    <footer className="relative border-t border-white/[0.08] mt-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Logo className="h-8" />
        </div>
        <p className="text-xs font-light text-white/40 leading-relaxed border-y border-white/[0.08] py-6 text-center">
          Les simulateurs proposés sont mis à disposition gratuitement, à des fins exclusivement pédagogiques et
          informatives. Ils ont pour but d’aider les utilisateurs à mieux comprendre certaines notions ou à estimer des
          situations selon les informations saisies. Ils ne constituent en aucun cas un conseil en investissement, en
          fiscalité ou une recommandation personnalisée. Investir comporte des risques, y compris de perte en capital.
          Les performances passées ne préjugent en rien des performances futures. Les résultats obtenus sont purement
          indicatifs et doivent être analysés avec discernement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-white/45">Copyright © 2026 S’investir | Création Pulsion Studio</p>
          <nav className="flex items-center gap-6 text-xs font-light text-white/45">
            {FOOTER_LINKS.map((l) => (
              <a key={l} href="#" className="hover:text-white/80 transition">{l}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
