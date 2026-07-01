/**
 * @krisspy-file
 * @type canvas
 * @name "Technical architecture — S'investir"
 *
 * Tech-lead style architecture board: how the project is structured.
 * It details the src/ folder structure, the token-driven design system
 * (theme.css → Tailwind color-mix scale → components/ui), and above all
 * the breakdown of the lib/crypto folder: a data layer isolated behind
 * an interface (MarketDataSource) that can be swapped without breaking the UI.
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

// S'investir palette (extracted from theme.css)
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
// Brand hero — editable main title
// ─────────────────────────────────────────────────────────────
const BrandHeroNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    badge: "Architecture · S'investir",
    title: 'How the project is built',
    subtitle: 'Folder structure, token-driven design system and a decoupled data layer.',
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
// Section title — editable narrative heading
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
// File tree — src/ folder structure
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
          file tree
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
// Tech card — architecture brick (icon, title, subtitle, bullets)
// ─────────────────────────────────────────────────────────────
const TechCardNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    title: 'Brick',
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
// Code card — editable code snippet + caption
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
// Post-it — editable annotation
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

// 👇 a single binding to change to swap everything
export const marketDataSource = httpMarketDataSource;`;

const INITIAL_NODES: any[] = [
  {"id":"hero","type":"brandHero","position":{"x":470,"y":0},"data":{"badge":"Architecture · S'investir","title":"How the project is built","subtitle":"Clear structure, token-driven design system and a decoupled data layer — to swap APIs without breaking anything."},"width":920,"height":235},
  {"id":"sec-structure","type":"sectionTitle","position":{"x":40,"y":340},"data":{"step":"01","title":"Folder structure","subtitle":"A breakdown by responsibility: pages (file-based routing), UI components, isolated business logic, types and theme."},"width":640,"height":93},
  {"id":"tree","type":"fileTree","position":{"x":40,"y":500},"data":{"title":"src/","items":[{"depth":0,"label":"main.tsx","kind":"file","tag":"entry"},{"depth":0,"label":"App.tsx","kind":"file","tag":"auto routes"},{"depth":0,"label":"pages/","kind":"folder","tag":"file-based routing"},{"depth":1,"label":"index.tsx  ·  sinvestir.tsx","kind":"file"},{"depth":1,"label":"designsystem.tsx","kind":"file"},{"depth":1,"label":"crypto.tsx","kind":"file"},{"depth":1,"label":"crypto/decouverte.tsx  ·  embed.tsx","kind":"file"},{"depth":0,"label":"components/","kind":"folder","tag":"UI"},{"depth":1,"label":"ui/","kind":"folder","tag":"kit + barrel"},{"depth":1,"label":"simulators/crypto/","kind":"folder","tag":"form + charts"},{"depth":0,"label":"lib/crypto/","kind":"folder","tag":"logic · no React"},{"depth":1,"label":"cryptoApi.ts","kind":"file","tag":"isolated source"},{"depth":1,"label":"normalizeMarketData.ts","kind":"file"},{"depth":1,"label":"calculateDcaSimulation.ts","kind":"file","tag":"pure"},{"depth":1,"label":"useCryptoSimulation.ts","kind":"file","tag":"hook"},{"depth":1,"label":"queryParams · assets · format","kind":"file"},{"depth":0,"label":"types/crypto.ts","kind":"file","tag":"contracts"},{"depth":0,"label":"style/","kind":"folder","tag":"theme"},{"depth":1,"label":"theme.css  ·  ThemeEditor.tsx","kind":"file"},{"depth":0,"label":"data/crypto-assets.json","kind":"file"}]},"width":560,"height":578},
  {"id":"card-sep","type":"techCard","position":{"x":660,"y":500},"data":{"title":"Separation of concerns","subtitle":"pages · components · lib · types · style","icon":"layers","accent":"#1098F7","width":400,"bullets":["pages/ = what to display (file-based routing, zero config)","components/ = how to display it (reusable UI)","lib/ = the business logic, pure, no React dependency","types/ = the contracts shared between layers"]},"width":400,"height":191},
  {"id":"note-structure","type":"note","position":{"x":660,"y":800},"data":{"label":"Principle","accent":"#7899CE","text":"You can read a folder and guess its role. The crypto logic never depends on the framework: it could be reused server-side or in unit tests without React."},"width":340,"height":178},
  {"id":"sec-design","type":"sectionTitle","position":{"x":40,"y":1360},"data":{"step":"02","title":"Design system & Tailwind theme","subtitle":"A single source of truth (the theme.css tokens) that feeds a generated Tailwind scale, then a kit of reusable components."},"width":640,"height":93},
  {"id":"card-tokens","type":"techCard","position":{"x":40,"y":1560},"data":{"title":"theme.css","subtitle":"the tokens (CSS variables)","icon":"palette","accent":"#0049C6","width":340,"bullets":["Colors, typography, radii as CSS variables","The ThemeEditor changes them live","Single source of truth for the design"]},"width":340,"height":164},
  {"id":"card-scale","type":"techCard","position":{"x":430,"y":1560},"data":{"title":"tailwind.config.js","subtitle":"color-mix scale 50→900","icon":"wand","accent":"#1098F7","width":340,"bullets":["A scale() function derives 50→900 from a token","No hard-coded hex in the config","bg-primary-100, text-primary-700… available"]},"width":340,"height":164},
  {"id":"card-ui","type":"techCard","position":{"x":820,"y":1560},"data":{"title":"components/ui","subtitle":"the reusable kit","icon":"boxes","accent":"#7899CE","width":340,"bullets":["Button, Card, Badge, PillBadge, StatTile…","A barrel index.ts: import in one line","Consumed by every page → consistency"]},"width":340,"height":164},
  {"id":"code-scale","type":"codeCard","position":{"x":1200,"y":1540},"data":{"title":"scale() — 1 token → 9 shades","accent":"#1098F7","code":"// tailwind.config.js\nconst scale = (v) => ({\n  DEFAULT: `var(${v})`,\n  50:  `color-mix(in srgb, var(${v}) 6%,  white)`,\n  500: `var(${v})`,\n  900: `color-mix(in srgb, var(${v}) 40%, black)`,\n});\ncolors: { primary: scale('--primary'), ... }","caption":"Changing one variable in theme.css updates the whole product — buttons, cards, charts.","width":520},"width":520,"height":236},
  {"id":"note-design","type":"note","position":{"x":40,"y":1860},"data":{"label":"Why","accent":"#0049C6","text":"The theme is driven by variables, not by hard-coded classes. A single place to touch to re-brand, and the design system (/designsystem page) acts as a showcase + consistency guardrail."},"width":340,"height":178},
  {"id":"sec-crypto","type":"sectionTitle","position":{"x":40,"y":2140},"data":{"step":"03","title":"The crypto folder — decoupled data","subtitle":"The key choice: no direct dependency on an API. Data comes in through an interface (MarketDataSource) that can be swapped without touching the UI."},"width":640,"height":93},
  {"id":"pipe-api","type":"techCard","position":{"x":40,"y":2360},"data":{"title":"cryptoApi.ts","subtitle":"MarketDataSource","icon":"database","accent":"#0049C6","width":320,"bullets":["The only file that knows the market URL","BASE_URL via env (never hard-coded)","Interface → interchangeable source"]},"width":320,"height":164},
  {"id":"pipe-normalize","type":"techCard","position":{"x":400,"y":2360},"data":{"title":"normalizeMarketData.ts","subtitle":"cleanup","icon":"repeat","accent":"#1098F7","width":320,"bullets":["Turns raw [ts, price] into a clean series","Deduplicated, daily, fast lookup","Fallback when a date is missing"]},"width":320,"height":164},
  {"id":"pipe-engine","type":"techCard","position":{"x":760,"y":2360},"data":{"title":"calculateDcaSimulation.ts","subtitle":"engine · pure function","icon":"cpu","accent":"#f59e0b","width":320,"bullets":["No I/O: inputs → indicators","Capital, quantity, average price, P/L, timeline","Deterministic, so unit-testable"]},"width":320,"height":164},
  {"id":"pipe-hook","type":"techCard","position":{"x":1120,"y":2360},"data":{"title":"useCryptoSimulation.ts","subtitle":"React hook","icon":"branch","accent":"#7899CE","width":320,"bullets":["Orchestration: fetch → normalize → engine","Cache per asset + debounced inputs","Exposes loading / error / result"]},"width":320,"height":164},
  {"id":"pipe-ui","type":"techCard","position":{"x":1480,"y":2360},"data":{"title":"components/simulators/crypto","subtitle":"the view layer","icon":"puzzle","accent":"#22c55e","width":320,"bullets":["Form, key figures, charts","Never talks to a URL directly","Depends on the hook, not the source"]},"width":320,"height":188},
  {"id":"code-swap","type":"codeCard","position":{"x":40,"y":2660},"data":{"title":"Swapping the data source","accent":"#22c55e","code":"// lib/crypto/cryptoApi.ts\nexport interface MarketDataSource {\n  fetchMarketChart(id, cur, days): Promise<...>;\n}\n\nconst httpMarketDataSource: MarketDataSource = { /* fetch */ };\n\n// 👇 a single binding to change to swap everything\nexport const marketDataSource = httpMarketDataSource;","caption":"Internal API, CoinGecko, mocked data or a historised database: rewrite one implementation and change a single binding. Zero component touched.","width":560},"width":560,"height":236},
  {"id":"note-decouple","type":"note","position":{"x":640,"y":2660},"data":{"label":"Benefit","accent":"#22c55e","text":"Dependency inversion: the UI depends on an abstraction, not a provider. You test the engine without the network, swap APIs with no regression risk, and can mock in dev."},"width":340,"height":178},
  {"id":"note-types","type":"note","position":{"x":1000,"y":2660},"data":{"label":"Contracts · types/crypto.ts","accent":"#1098F7","text":"The shared types (SimulationInput, MarketData, SimulationResult, SimulationError) form the boundary between layers: each respects the contract, without knowing the others' implementation."},"width":340,"height":178},
  {"id":"sec-routing","type":"sectionTitle","position":{"x":40,"y":3080},"data":{"step":"04","title":"Routing & embedding","subtitle":"Config-free routes and a URL-driven embeddable simulator."},"width":640,"height":72},
  {"id":"card-routing","type":"techCard","position":{"x":40,"y":3240},"data":{"title":"File-based routing","subtitle":"src/pages/** → routes","icon":"branch","accent":"#0049C6","width":400,"bullets":["Dropping a file creates the route (no App.tsx to edit)","crypto/[param].tsx for dynamic segments","Root layout _layout.tsx via children"]},"width":400,"height":164},
  {"id":"card-embed","type":"techCard","position":{"x":470,"y":3240},"data":{"title":"Embeddable via query params","subtitle":"queryParams.ts","icon":"code","accent":"#22c55e","width":400,"bullets":["State serialised in the URL (asset, amount, period…)","layout=false, theme, readonly for the iframe","Each screen is reproducible and shareable"]},"width":400,"height":164},
  {"id":"note-routing","type":"note","position":{"x":900,"y":3240},"data":{"label":"Consequence","accent":"#7899CE","text":"Since all the state lives in the URL, any screen can be replayed in an iframe (see the “Product presentation” board and the discovery journey)."},"width":340,"height":178},
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
  {"id":"e-ds-1","source":"card-tokens","target":"card-scale","type":"smoothstep","label":"derives","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-ds-2","source":"card-scale","target":"card-ui","type":"smoothstep","label":"feeds","animated":true,"style":{"stroke":"#7899CE","strokeWidth":2}},
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
            S’investir — Technical architecture
          </div>
          <div style={{ fontFamily: FONT_LABEL, fontSize: 11, color: C.periwinkle }}>
            structure · design system · data layer
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

export default function ArchitectureTechniqueEN(props: { canvasId: string; filePath: string }) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
