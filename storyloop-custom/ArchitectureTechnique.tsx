/**
 * @krisspy-file
 * @type canvas
 * @name "Architecture technique — S'investir"
 *
 * Board d'architecture façon tech lead : comment le projet est structuré.
 * On y détaille la structure du dossier src/, le design system piloté par
 * tokens (theme.css → échelle Tailwind color-mix → composants/ui), et surtout
 * le découpage du dossier lib/crypto : une couche de données isolée derrière
 * une interface (MarketDataSource) qu'on peut remplacer sans casser l'UI.
 */
import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  BackgroundVariant,
  Handle,
  Position,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  FolderTree,
  Folder,
  FileCode,
  Palette,
  Boxes,
  Database,
  Cpu,
  Repeat,
  Layers,
  GitBranch,
  Code2,
  Puzzle,
  Wand2,
  Terminal,
} from 'lucide-react';
import {
  useKrisspyCanvas,
  useKrisspyNodeData,
  useCustomCanvasDropHandlers,
  useCustomCanvasCopyPaste,
  KrisspyCollab,
  KrisspyAlignmentOverlay,
} from '@krisspy/canvas';

// Palette S'investir (extraite de theme.css)
const C = {
  primary: '#0049C6',
  azure: '#1098F7',
  periwinkle: '#7899CE',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  bg: '#000519',
  card: '#030B1F',
  elevated: '#061230',
  border: 'rgba(255,255,255,0.10)',
  textMuted: 'rgba(255,255,255,0.55)',
};

const FONT_HEADING = "'Plus Jakarta Sans', system-ui, sans-serif";
const FONT_LABEL = "'Lexend', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'SFMono-Regular', ui-monospace, Menlo, monospace";

const stopEvents = (e: React.MouseEvent | React.KeyboardEvent) => e.stopPropagation();

const TECH_ICONS: Record<string, any> = {
  folder: FolderTree,
  palette: Palette,
  boxes: Boxes,
  database: Database,
  cpu: Cpu,
  repeat: Repeat,
  layers: Layers,
  branch: GitBranch,
  code: Code2,
  puzzle: Puzzle,
  wand: Wand2,
  terminal: Terminal,
};

// ─────────────────────────────────────────────────────────────
// Brand hero — titre principal éditable
// ─────────────────────────────────────────────────────────────
const BrandHeroNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    badge: "Architecture · S'investir",
    title: 'Comment le projet est construit',
    subtitle: 'Structure du dossier, design system piloté par tokens et couche de données découplée.',
    ...initial,
  });

  return (
    <div
      style={{
        width: 920,
        padding: '38px 46px',
        background: `radial-gradient(90% 130% at 50% -10%, rgba(16,152,247,0.22) 0%, ${C.card} 55%, ${C.bg} 100%)`,
        border: `1px solid ${C.border}`,
        borderRadius: 22,
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        textAlign: 'center',
      }}
    >
      <span
        className="drag-handle"
        style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: 999,
          fontFamily: FONT_LABEL,
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: C.periwinkle,
          background: 'rgba(16,152,247,0.12)',
          border: `1px solid ${C.border}`,
          cursor: 'grab',
          marginBottom: 18,
        }}
      >
        {data.badge ?? ''}
      </span>
      <div
        className="nodrag nopan"
        contentEditable
        suppressContentEditableWarning
        onClick={stopEvents}
        onMouseDown={stopEvents}
        onDoubleClick={stopEvents}
        onKeyDown={stopEvents}
        onBlur={(e) => updateData({ title: e.currentTarget.textContent || '' })}
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          color: '#fff',
          letterSpacing: '-0.02em',
          outline: 'none',
          marginBottom: 14,
          cursor: 'text',
        }}
      >
        {data.title ?? ''}
      </div>
      <div
        className="nodrag nopan"
        contentEditable
        suppressContentEditableWarning
        onClick={stopEvents}
        onMouseDown={stopEvents}
        onDoubleClick={stopEvents}
        onKeyDown={stopEvents}
        onBlur={(e) => updateData({ subtitle: e.currentTarget.textContent || '' })}
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 16,
          lineHeight: 1.6,
          color: C.textMuted,
          maxWidth: 640,
          margin: '0 auto',
          outline: 'none',
          cursor: 'text',
        }}
      >
        {data.subtitle ?? ''}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Section title — intertitre narratif éditable
// ─────────────────────────────────────────────────────────────
const SectionTitleNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    step: '01',
    title: 'Section',
    subtitle: '',
    ...initial,
  });
  return (
    <div className="drag-handle" style={{ width: 640, cursor: 'grab' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span
          style={{
            fontFamily: FONT_LABEL,
            fontSize: 15,
            fontWeight: 600,
            color: C.azure,
            padding: '2px 10px',
            borderRadius: 8,
            background: 'rgba(16,152,247,0.12)',
            border: `1px solid ${C.border}`,
          }}
        >
          {data.step ?? ''}
        </span>
        <div
          className="nodrag nopan"
          contentEditable
          suppressContentEditableWarning
          onClick={stopEvents}
          onMouseDown={stopEvents}
          onDoubleClick={stopEvents}
          onKeyDown={stopEvents}
          onBlur={(e) => updateData({ title: e.currentTarget.textContent || '' })}
          style={{
            fontFamily: FONT_HEADING,
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.01em',
            outline: 'none',
            cursor: 'text',
          }}
        >
          {data.title ?? ''}
        </div>
      </div>
      <div
        className="nodrag nopan"
        contentEditable
        suppressContentEditableWarning
        onClick={stopEvents}
        onMouseDown={stopEvents}
        onDoubleClick={stopEvents}
        onKeyDown={stopEvents}
        onBlur={(e) => updateData({ subtitle: e.currentTarget.textContent || '' })}
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 14,
          lineHeight: 1.55,
          color: C.textMuted,
          marginTop: 8,
          marginLeft: 2,
          outline: 'none',
          cursor: 'text',
        }}
      >
        {data.subtitle ?? ''}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// File tree — arborescence du dossier src/
// ─────────────────────────────────────────────────────────────
const FileTreeNode = ({ id, data: initial }: any) => {
  const [data] = useKrisspyNodeData(id, {
    title: 'src/',
    items: [],
    ...initial,
  });
  const items = data.items ?? [];

  return (
    <div
      style={{
        width: 560,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
        overflow: 'hidden',
      }}
    >
      <div
        className="drag-handle"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 18px',
          background: C.elevated,
          borderBottom: `1px solid ${C.border}`,
          cursor: 'grab',
        }}
      >
        <FolderTree size={16} color={C.azure} />
        <span style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 600, color: '#fff' }}>
          {data.title ?? ''}
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: FONT_LABEL, fontSize: 11, color: C.textMuted }}>
          arborescence
        </span>
      </div>
      <div style={{ padding: '10px 0' }}>
        {items.map((it: any, i: number) => {
          const depth = it?.depth ?? 0;
          const kind = it?.kind ?? 'file';
          const isFolder = kind === 'folder';
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '3px 18px',
                paddingLeft: 18 + depth * 20,
              }}
            >
              {isFolder ? (
                <Folder size={13} color={C.azure} style={{ flexShrink: 0 }} />
              ) : (
                <FileCode size={13} color={C.periwinkle} style={{ flexShrink: 0 }} />
              )}
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12.5,
                  color: isFolder ? '#fff' : 'rgba(255,255,255,0.72)',
                  fontWeight: isFolder ? 600 : 400,
                }}
              >
                {it?.label ?? ''}
              </span>
              {it?.tag ? (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: FONT_LABEL,
                    fontSize: 10.5,
                    color: C.periwinkle,
                    background: 'rgba(120,153,206,0.10)',
                    border: `1px solid ${C.border}`,
                    borderRadius: 6,
                    padding: '1px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {it.tag}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Tech card — brique d'architecture (icône, titre, sous-titre, points)
// ─────────────────────────────────────────────────────────────
const TechCardNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    title: 'Brique',
    subtitle: '',
    icon: 'layers',
    accent: C.azure,
    bullets: [],
    width: 340,
    ...initial,
  });
  const bullets = data.bullets ?? [];
  const accent = data.accent ?? C.azure;
  const width = data.width ?? 340;
  const Icon = TECH_ICONS[data.icon ?? 'layers'] ?? Layers;

  return (
    <div
      style={{
        width,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 16,
        boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
        overflow: 'hidden',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: accent, width: 10, height: 10, top: 38 }} />
      <Handle type="source" position={Position.Right} style={{ background: accent, width: 10, height: 10, top: 38 }} />

      <div
        className="drag-handle"
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px 12px', cursor: 'grab' }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            background: `${accent}22`,
            border: `1px solid ${accent}55`,
          }}
        >
          <Icon size={19} color={accent} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            className="nodrag nopan"
            contentEditable
            suppressContentEditableWarning
            onClick={stopEvents}
            onMouseDown={stopEvents}
            onDoubleClick={stopEvents}
            onKeyDown={stopEvents}
            onBlur={(e) => updateData({ title: e.currentTarget.textContent || '' })}
            style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: '#fff', outline: 'none', cursor: 'text' }}
          >
            {data.title ?? ''}
          </div>
          <div
            className="nodrag nopan"
            contentEditable
            suppressContentEditableWarning
            onClick={stopEvents}
            onMouseDown={stopEvents}
            onDoubleClick={stopEvents}
            onKeyDown={stopEvents}
            onBlur={(e) => updateData({ subtitle: e.currentTarget.textContent || '' })}
            style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.periwinkle, marginTop: 3, outline: 'none', cursor: 'text' }}
          >
            {data.subtitle ?? ''}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bullets.map((b: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, marginTop: 7, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT_HEADING, fontSize: 12.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.78)' }}>
              {b}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Code card — extrait de code éditable + légende
// ─────────────────────────────────────────────────────────────
const CodeCardNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    title: 'snippet',
    code: '',
    caption: '',
    accent: C.success,
    width: 480,
    ...initial,
  });
  const accent = data.accent ?? C.success;
  const width = data.width ?? 480;

  return (
    <div
      style={{
        width,
        background: '#020814',
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}
    >
      <div
        className="drag-handle"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: C.elevated,
          borderBottom: `1px solid ${C.border}`,
          cursor: 'grab',
        }}
      >
        <Code2 size={14} color={accent} />
        <span style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 600, color: '#fff' }}>{data.title ?? ''}</span>
      </div>
      <textarea
        value={data.code ?? ''}
        onChange={(e) => updateData({ code: e.target.value })}
        spellCheck={false}
        className="nodrag nopan nowheel"
        style={{
          width: '100%',
          minHeight: 132,
          padding: '14px 16px',
          background: 'transparent',
          border: 'none',
          resize: 'none',
          outline: 'none',
          fontFamily: FONT_MONO,
          fontSize: 12,
          lineHeight: 1.65,
          color: '#cde3ff',
          whiteSpace: 'pre',
          overflowX: 'auto',
        }}
      />
      {data.caption ? (
        <div
          style={{
            padding: '10px 16px',
            borderTop: `1px solid ${C.border}`,
            fontFamily: FONT_HEADING,
            fontSize: 12,
            lineHeight: 1.5,
            color: C.textMuted,
            background: 'rgba(34,197,94,0.05)',
          }}
        >
          {data.caption}
        </div>
      ) : null}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Post-it — annotation éditable
// ─────────────────────────────────────────────────────────────
const NoteNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    label: 'Note',
    text: '',
    accent: C.azure,
    ...initial,
  });
  const accent = data.accent ?? C.azure;
  return (
    <div
      style={{
        width: 340,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 12,
        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}
    >
      <div
        className="drag-handle"
        style={{
          padding: '10px 16px',
          fontFamily: FONT_LABEL,
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: accent,
          cursor: 'grab',
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {data.label ?? ''}
      </div>
      <textarea
        value={data.text ?? ''}
        onChange={(e) => updateData({ text: e.target.value })}
        className="nodrag nopan nowheel"
        style={{
          width: '100%',
          height: 132,
          padding: '12px 16px',
          background: 'transparent',
          border: 'none',
          resize: 'none',
          outline: 'none',
          fontFamily: FONT_HEADING,
          fontSize: 13,
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.82)',
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Node types (module scope)
// ─────────────────────────────────────────────────────────────
const nodeTypes = {
  brandHero: BrandHeroNode,
  sectionTitle: SectionTitleNode,
  fileTree: FileTreeNode,
  techCard: TechCardNode,
  codeCard: CodeCardNode,
  note: NoteNode,
};

const SCALE_CODE = `// tailwind.config.js
const scale = (v) => ({
  DEFAULT: \`var(\${v})\`,
  50:  \`color-mix(in srgb, var(\${v}) 6%,  white)\`,
  500: \`var(\${v})\`,
  900: \`color-mix(in srgb, var(\${v}) 40%, black)\`,
});
colors: { primary: scale('--primary'), ... }`;

const SWAP_CODE = `// lib/crypto/cryptoApi.ts
export interface MarketDataSource {
  fetchMarketChart(id, cur, days): Promise<...>;
}

const httpMarketDataSource: MarketDataSource = { /* fetch */ };

// 👇 un seul binding à changer pour tout basculer
export const marketDataSource = httpMarketDataSource;`;

const INITIAL_NODES: any[] = [
  {"id":"hero","type":"brandHero","position":{"x":470,"y":0},"data":{"badge":"Architecture · S'investir","title":"Comment le projet est construit","subtitle":"Structure claire, design system piloté par tokens et couche de données découplée — pour changer d’API sans rien casser."},"width":920,"height":235},
  {"id":"sec-structure","type":"sectionTitle","position":{"x":40,"y":340},"data":{"step":"01","title":"Structure du dossier","subtitle":"Un découpage par responsabilité : pages (routing par fichiers), composants d’UI, logique métier isolée, types et thème."},"width":640,"height":93},
  {"id":"tree","type":"fileTree","position":{"x":40,"y":500},"data":{"title":"src/","items":[{"depth":0,"label":"main.tsx","kind":"file","tag":"entrée"},{"depth":0,"label":"App.tsx","kind":"file","tag":"routes auto"},{"depth":0,"label":"pages/","kind":"folder","tag":"file-based routing"},{"depth":1,"label":"index.tsx  ·  sinvestir.tsx","kind":"file"},{"depth":1,"label":"designsystem.tsx","kind":"file"},{"depth":1,"label":"crypto.tsx","kind":"file"},{"depth":1,"label":"crypto/decouverte.tsx  ·  embed.tsx","kind":"file"},{"depth":0,"label":"components/","kind":"folder","tag":"UI"},{"depth":1,"label":"ui/","kind":"folder","tag":"kit + barrel"},{"depth":1,"label":"simulators/crypto/","kind":"folder","tag":"form + charts"},{"depth":0,"label":"lib/crypto/","kind":"folder","tag":"logique · sans React"},{"depth":1,"label":"cryptoApi.ts","kind":"file","tag":"source isolée"},{"depth":1,"label":"normalizeMarketData.ts","kind":"file"},{"depth":1,"label":"calculateDcaSimulation.ts","kind":"file","tag":"pur"},{"depth":1,"label":"useCryptoSimulation.ts","kind":"file","tag":"hook"},{"depth":1,"label":"queryParams · assets · format","kind":"file"},{"depth":0,"label":"types/crypto.ts","kind":"file","tag":"contrats"},{"depth":0,"label":"style/","kind":"folder","tag":"thème"},{"depth":1,"label":"theme.css  ·  ThemeEditor.tsx","kind":"file"},{"depth":0,"label":"data/crypto-assets.json","kind":"file"}]},"width":560,"height":578},
  {"id":"card-sep","type":"techCard","position":{"x":660,"y":500},"data":{"title":"Séparation des responsabilités","subtitle":"pages · components · lib · types · style","icon":"layers","accent":"#1098F7","width":400,"bullets":["pages/ = quoi afficher (routing par fichiers, zéro config)","components/ = comment l’afficher (UI réutilisable)","lib/ = la logique métier, pure, sans dépendance à React","types/ = les contrats partagés entre les couches"]},"width":400,"height":191},
  {"id":"note-structure","type":"note","position":{"x":660,"y":800},"data":{"label":"Principe","accent":"#7899CE","text":"On peut lire un dossier et deviner son rôle. La logique crypto ne dépend jamais du framework : on pourrait la réutiliser côté serveur ou dans des tests unitaires sans React."},"width":340,"height":178},
  {"id":"sec-design","type":"sectionTitle","position":{"x":40,"y":1360},"data":{"step":"02","title":"Design system & thème Tailwind","subtitle":"Une seule source de vérité (les tokens theme.css) qui alimente une échelle Tailwind générée, puis un kit de composants réutilisables."},"width":640,"height":93},
  {"id":"card-tokens","type":"techCard","position":{"x":40,"y":1560},"data":{"title":"theme.css","subtitle":"les tokens (CSS variables)","icon":"palette","accent":"#0049C6","width":340,"bullets":["Couleurs, typographies, rayons en variables CSS","Le ThemeEditor les modifie à chaud","Source de vérité unique du design"]},"width":340,"height":164},
  {"id":"card-scale","type":"techCard","position":{"x":430,"y":1560},"data":{"title":"tailwind.config.js","subtitle":"échelle color-mix 50→900","icon":"wand","accent":"#1098F7","width":340,"bullets":["Une fonction scale() dérive 50→900 d’un token","Aucun hex codé en dur dans le config","bg-primary-100, text-primary-700… disponibles"]},"width":340,"height":164},
  {"id":"card-ui","type":"techCard","position":{"x":820,"y":1560},"data":{"title":"components/ui","subtitle":"le kit réutilisable","icon":"boxes","accent":"#7899CE","width":340,"bullets":["Button, Card, Badge, PillBadge, StatTile…","Un barrel index.ts : import en une ligne","Consommé par toutes les pages → cohérence"]},"width":340,"height":164},
  {"id":"code-scale","type":"codeCard","position":{"x":1200,"y":1540},"data":{"title":"scale() — 1 token → 9 nuances","accent":"#1098F7","code":"// tailwind.config.js\nconst scale = (v) => ({\n  DEFAULT: `var(${v})`,\n  50:  `color-mix(in srgb, var(${v}) 6%,  white)`,\n  500: `var(${v})`,\n  900: `color-mix(in srgb, var(${v}) 40%, black)`,\n});\ncolors: { primary: scale('--primary'), ... }","caption":"Changer une variable dans theme.css met à jour tout le produit — boutons, cartes, graphiques.","width":520},"width":520,"height":236},
  {"id":"note-design","type":"note","position":{"x":40,"y":1860},"data":{"label":"Pourquoi","accent":"#0049C6","text":"Le thème est piloté par des variables, pas par des classes figées. Un seul endroit à toucher pour re-brander, et le design system (page /designsystem) sert de vitrine + garde-fou de cohérence."},"width":340,"height":178},
  {"id":"sec-crypto","type":"sectionTitle","position":{"x":40,"y":2140},"data":{"step":"03","title":"Le dossier crypto — données découplées","subtitle":"Le choix clé : aucune dépendance directe à une API. La donnée entre par une interface (MarketDataSource) qu’on peut remplacer sans toucher à l’UI."},"width":640,"height":93},
  {"id":"pipe-api","type":"techCard","position":{"x":40,"y":2360},"data":{"title":"cryptoApi.ts","subtitle":"MarketDataSource","icon":"database","accent":"#0049C6","width":320,"bullets":["Seul fichier qui connaît l’URL du marché","BASE_URL via env (jamais codée en dur)","Interface → source interchangeable"]},"width":320,"height":164},
  {"id":"pipe-normalize","type":"techCard","position":{"x":400,"y":2360},"data":{"title":"normalizeMarketData.ts","subtitle":"nettoyage","icon":"repeat","accent":"#1098F7","width":320,"bullets":["Transforme le brut [ts, prix] en série propre","Dédupliquée, quotidienne, lookup rapide","Fallback si une date manque"]},"width":320,"height":164},
  {"id":"pipe-engine","type":"techCard","position":{"x":760,"y":2360},"data":{"title":"calculateDcaSimulation.ts","subtitle":"moteur · fonction pure","icon":"cpu","accent":"#f59e0b","width":320,"bullets":["Aucune I/O : entrées → indicateurs","Capital, quantité, prix moyen, P/L, timeline","Déterministe donc testable unitairement"]},"width":320,"height":164},
  {"id":"pipe-hook","type":"techCard","position":{"x":1120,"y":2360},"data":{"title":"useCryptoSimulation.ts","subtitle":"hook React","icon":"branch","accent":"#7899CE","width":320,"bullets":["Orchestration : fetch → normalize → moteur","Cache par actif + debounce des saisies","Expose loading / error / result"]},"width":320,"height":164},
  {"id":"pipe-ui","type":"techCard","position":{"x":1480,"y":2360},"data":{"title":"components/simulators/crypto","subtitle":"la couche vue","icon":"puzzle","accent":"#22c55e","width":320,"bullets":["Form, chiffres clés, graphiques","Ne parle jamais à une URL directement","Dépend du hook, pas de la source"]},"width":320,"height":188},
  {"id":"code-swap","type":"codeCard","position":{"x":40,"y":2660},"data":{"title":"Basculer de source de données","accent":"#22c55e","code":"// lib/crypto/cryptoApi.ts\nexport interface MarketDataSource {\n  fetchMarketChart(id, cur, days): Promise<...>;\n}\n\nconst httpMarketDataSource: MarketDataSource = { /* fetch */ };\n\n// 👇 un seul binding à changer pour tout basculer\nexport const marketDataSource = httpMarketDataSource;","caption":"API interne, CoinGecko, données mockées ou une base historisée : on réécrit une implémentation et on change un seul binding. Zéro composant modifié.","width":560},"width":560,"height":236},
  {"id":"note-decouple","type":"note","position":{"x":640,"y":2660},"data":{"label":"Bénéfice","accent":"#22c55e","text":"Inversion de dépendance : l’UI dépend d’une abstraction, pas d’un fournisseur. On teste le moteur sans réseau, on change d’API sans risque de régression, et on peut mocker en dev."},"width":340,"height":178},
  {"id":"note-types","type":"note","position":{"x":1000,"y":2660},"data":{"label":"Contrats · types/crypto.ts","accent":"#1098F7","text":"Les types partagés (SimulationInput, MarketData, SimulationResult, SimulationError) forment la frontière entre les couches : chacune respecte le contrat, sans connaître l’implémentation des autres."},"width":340,"height":178},
  {"id":"sec-routing","type":"sectionTitle","position":{"x":40,"y":3080},"data":{"step":"04","title":"Routing & intégration","subtitle":"Des routes sans config et un simulateur embarquable piloté par l’URL."},"width":640,"height":72},
  {"id":"card-routing","type":"techCard","position":{"x":40,"y":3240},"data":{"title":"File-based routing","subtitle":"src/pages/** → routes","icon":"branch","accent":"#0049C6","width":400,"bullets":["Déposer un fichier crée la route (aucun App.tsx à éditer)","crypto/[param].tsx pour les segments dynamiques","Layout racine _layout.tsx via children"]},"width":400,"height":164},
  {"id":"card-embed","type":"techCard","position":{"x":470,"y":3240},"data":{"title":"Embarquable par query params","subtitle":"queryParams.ts","icon":"code","accent":"#22c55e","width":400,"bullets":["État sérialisé dans l’URL (asset, montant, période…)","layout=false, theme, readonly pour l’iframe","Chaque écran est reproductible et partageable"]},"width":400,"height":164},
  {"id":"note-routing","type":"note","position":{"x":900,"y":3240},"data":{"label":"Conséquence","accent":"#7899CE","text":"Comme tout l’état vit dans l’URL, on peut rejouer n’importe quel écran en iframe (voir le board « Présentation produit » et le parcours découverte)."},"width":340,"height":178},
];

const edge = (id: string, source: string, target: string, label: string, stroke: string) => ({
  id,
  source,
  target,
  type: 'smoothstep',
  label,
  animated: true,
  style: { stroke, strokeWidth: 2 },
});

const INITIAL_EDGES = [
  {"id":"e-ds-1","source":"card-tokens","target":"card-scale","type":"smoothstep","label":"dérive","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-ds-2","source":"card-scale","target":"card-ui","type":"smoothstep","label":"alimente","animated":true,"style":{"stroke":"#7899CE","strokeWidth":2}},
  {"id":"e-pipe-1","source":"pipe-api","target":"pipe-normalize","type":"smoothstep","label":"","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-pipe-2","source":"pipe-normalize","target":"pipe-engine","type":"smoothstep","label":"","animated":true,"style":{"stroke":"#f59e0b","strokeWidth":2}},
  {"id":"e-pipe-3","source":"pipe-engine","target":"pipe-hook","type":"smoothstep","label":"","animated":true,"style":{"stroke":"#7899CE","strokeWidth":2}},
  {"id":"e-pipe-4","source":"pipe-hook","target":"pipe-ui","type":"smoothstep","label":"result","animated":true,"style":{"stroke":"#22c55e","strokeWidth":2}},
];

function Inner({ canvasId, filePath }: { canvasId: string; filePath: string }) {
  const [nodes, setNodes, onNodesChange, edges, , onEdgesChange] = useKrisspyCanvas(
    canvasId,
    INITIAL_NODES,
    INITIAL_EDGES,
    { persist: { filePath } }
  );

  const rf = useReactFlow();
  const { onDrop, onDragOver } = useCustomCanvasDropHandlers({ canvasId, filePath, reactFlowInstance: rf });
  useCustomCanvasCopyPaste({ nodes, setNodes, canvasId, filePath });

  return (
    <div style={{ width: '100%', height: '100%', background: C.bg, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 18px',
          borderRadius: 14,
          background: 'rgba(6,18,48,0.72)',
          border: `1px solid ${C.border}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.azure} 100%)`,
            display: 'grid',
            placeItems: 'center',
            fontFamily: FONT_HEADING,
            fontWeight: 800,
            color: '#fff',
            fontSize: 15,
          }}
        >
          S
        </span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontFamily: FONT_HEADING, fontSize: 14, fontWeight: 700, color: '#fff' }}>
            S’investir — Architecture technique
          </div>
          <div style={{ fontFamily: FONT_LABEL, fontSize: 11, color: C.periwinkle }}>
            structure · design system · couche de données
          </div>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.05}
        maxZoom={1.5}
        nodeDragThreshold={5}
        panOnScroll
        zoomOnScroll={false}
        zoomOnPinch
        panOnDrag
      >
        <Background variant={BackgroundVariant.Dots} gap={28} color="rgba(255,255,255,0.06)" />
        <KrisspyAlignmentOverlay />
        <Controls style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}` }} />
      </ReactFlow>
      <KrisspyCollab canvasId={canvasId} name="Tech" />
    </div>
  );
}

export default function ArchitectureTechnique(props: { canvasId: string; filePath: string }) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
