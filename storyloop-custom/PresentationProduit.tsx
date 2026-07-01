/**
 * @krisspy-file
 * @type canvas
 * @name "Présentation produit — S'investir"
 *
 * Board de présentation façon Product Manager pour la suite de simulateurs
 * S'investir : la marque, le design system, puis les pages du produit.
 * Les aperçus sont des iframes du build déployé (pas de PreviewNode) :
 * BASE_URL = https://preview.sinvestir.deploy.krisspy.ai
 * On y montre notamment le flow de la modal d'intégration (/crypto?embed=1)
 * et la version embarquable (/crypto/embed?...&layout=false).
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
import { Coins, LayoutTemplate, Palette, Home, Code2, MousePointerClick } from 'lucide-react';
import {
  useKrisspyCanvas,
  useKrisspyNodeData,
  useCustomCanvasDropHandlers,
  useCustomCanvasCopyPaste,
  KrisspyCollab,
  KrisspyAlignmentOverlay,
} from '@krisspy/canvas';

// ─────────────────────────────────────────────────────────────
// Lien de déploiement — les iframes pointent ici (pas les PreviewNode)
// ─────────────────────────────────────────────────────────────
const BASE_URL = 'https://preview.sinvestir.deploy.krisspy.ai';

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

const stopEvents = (e: React.MouseEvent | React.KeyboardEvent) => e.stopPropagation();

// ─────────────────────────────────────────────────────────────
// Brand hero — titre principal éditable
// ─────────────────────────────────────────────────────────────
const BrandHeroNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    badge: "Suite S'investir",
    title: 'Chiffrer chaque décision d’investissement',
    subtitle:
      'Une suite d’outils sombres, unifiés et intégrables. Premier livrable : le simulateur crypto DCA.',
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
    <div className="drag-handle" style={{ width: 620, cursor: 'grab' }}>
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
// Brand panel — identité visuelle : couleurs + typographies
// ─────────────────────────────────────────────────────────────
const BrandPanelNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    title: 'Identité S’investir',
    subtitle: 'Dark financial · issue du Figma',
    colors: [],
    fonts: [],
    ...initial,
  });

  const colors = data.colors ?? [];
  const fonts = data.fonts ?? [];

  return (
    <div
      style={{
        width: 480,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
        overflow: 'hidden',
      }}
    >
      <div
        className="drag-handle"
        style={{
          padding: '18px 22px',
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.azure} 100%)`,
          cursor: 'grab',
        }}
      >
        <div
          className="nodrag nopan"
          contentEditable
          suppressContentEditableWarning
          onClick={stopEvents}
          onMouseDown={stopEvents}
          onDoubleClick={stopEvents}
          onKeyDown={stopEvents}
          onBlur={(e) => updateData({ title: e.currentTarget.textContent || '' })}
          style={{ fontFamily: FONT_HEADING, fontSize: 19, fontWeight: 700, color: '#fff', outline: 'none', cursor: 'text' }}
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
          style={{ fontFamily: FONT_LABEL, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4, outline: 'none', cursor: 'text' }}
        >
          {data.subtitle ?? ''}
        </div>
      </div>

      <div style={{ padding: 22 }}>
        <div style={{ fontFamily: FONT_LABEL, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.textMuted, marginBottom: 12 }}>
          Palette
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {colors.map((c: any, i: number) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  height: 52,
                  borderRadius: 12,
                  background: c?.value ?? '#000',
                  border: `1px solid ${C.border}`,
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              />
              <div style={{ fontFamily: FONT_LABEL, fontSize: 11, color: '#fff', marginTop: 6 }}>{c?.name ?? ''}</div>
              <div style={{ fontFamily: FONT_LABEL, fontSize: 10, color: C.textMuted }}>{c?.value ?? ''}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: FONT_LABEL, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.textMuted, marginBottom: 12 }}>
          Typographie
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {fonts.map((f: any, i: number) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 12,
                background: C.elevated,
                border: `1px solid ${C.border}`,
              }}
            >
              <span style={{ fontFamily: FONT_HEADING, fontSize: 17, fontWeight: 600, color: '#fff' }}>{f?.name ?? ''}</span>
              <span style={{ fontFamily: FONT_LABEL, fontSize: 11, color: C.periwinkle }}>{f?.role ?? ''}</span>
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: C.azure, width: 10, height: 10 }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Browser frame — iframe du build déployé, avec une chrome de navigateur
// L'iframe est rendue à une largeur "desktop" puis mise à l'échelle.
// ─────────────────────────────────────────────────────────────
const ICONS: Record<string, any> = {
  home: Home,
  palette: Palette,
  layout: LayoutTemplate,
  coins: Coins,
  code: Code2,
  cursor: MousePointerClick,
};

const BrowserFrameNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    title: 'Page',
    route: '/',
    displayUrl: '',
    icon: 'home',
    accent: C.primary,
    frameWidth: 760,
    designWidth: 1280,
    designHeight: 860,
    ...initial,
  });

  const frameWidth = data.frameWidth ?? 760;
  const designWidth = data.designWidth ?? 1280;
  const designHeight = data.designHeight ?? 860;
  const scale = frameWidth / designWidth;
  const iframeH = Math.round(designHeight * scale);
  const route = data.route ?? '/';
  const src = `${BASE_URL}${route}`;
  const displayUrl = data.displayUrl || `preview.sinvestir.deploy.krisspy.ai${route}`;
  const Icon = ICONS[data.icon ?? 'home'] ?? Home;
  const accent = data.accent ?? C.primary;

  return (
    <div
      style={{
        width: frameWidth,
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 22px 55px rgba(0,0,0,0.5)',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: accent, width: 10, height: 10, top: 40 }} />
      <Handle type="source" position={Position.Right} style={{ background: accent, width: 10, height: 10, top: 40 }} />

      {/* Barre de navigateur — zone de drag */}
      <div
        className="drag-handle"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: 46,
          padding: '0 14px',
          background: C.elevated,
          borderBottom: `1px solid ${C.border}`,
          cursor: 'grab',
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 26,
            padding: '0 12px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${C.border}`,
            fontFamily: FONT_LABEL,
            fontSize: 11.5,
            color: C.periwinkle,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Icon size={13} color={accent} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayUrl}</span>
        </div>
        <span style={{ fontFamily: FONT_LABEL, fontSize: 12, fontWeight: 600, color: '#fff' }}>{data.title ?? ''}</span>
      </div>

      {/* Aperçu live — iframe mise à l'échelle */}
      <div
        className="nodrag nopan nowheel"
        style={{ width: frameWidth, height: iframeH, overflow: 'hidden', position: 'relative', background: C.bg }}
      >
        <iframe
          title={data.title ?? route}
          src={src}
          loading="lazy"
          style={{
            width: designWidth,
            height: designHeight,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Post-it — annotation PM éditable
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
          height: 118,
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
  brandPanel: BrandPanelNode,
  browserFrame: BrowserFrameNode,
  note: NoteNode,
};

// Hauteurs calculées : 46 (barre) + designHeight*scale
// w760 → 557 · w820 → 597 · w900 → 651
const INITIAL_NODES: any[] = [
  {"id":"hero","type":"brandHero","position":{"x":470,"y":0},"data":{"badge":"Suite S'investir","title":"Chiffrer chaque décision d’investissement","subtitle":"Une suite d’outils sombres, unifiés et intégrables. Premier livrable : le simulateur crypto DCA, avec version embarquable par iframe."},"width":920,"height":235},
  {"id":"sec-brand","type":"sectionTitle","position":{"x":40,"y":340},"data":{"step":"01","title":"La marque & le design system","subtitle":"Une identité « dark financial » issue du Figma, centralisée dans theme.css. Chaque token pilote toute l’UI via le Theme Editor."},"width":620,"height":93},
  {"id":"brand-panel","type":"brandPanel","position":{"x":40,"y":500},"data":{"title":"Identité S’investir","subtitle":"Dark financial · issue du Figma","colors":[{"name":"Primary","value":"#0049C6"},{"name":"Azure","value":"#1098F7"},{"name":"Periwinkle","value":"#7899CE"},{"name":"Success","value":"#22c55e"},{"name":"Danger","value":"#ef4444"},{"name":"Surface","value":"#030B1F"}],"fonts":[{"name":"Plus Jakarta Sans","role":"Titres & corps"},{"name":"Lexend","role":"Boutons & labels"}]},"width":480,"height":518},
  {"id":"frame-designsystem","type":"browserFrame","position":{"x":600,"y":500},"data":{"title":"Design System","route":"/designsystem","icon":"palette","accent":"#1098F7","frameWidth":900,"designWidth":1280,"designHeight":860},"width":900,"height":653},
  {"id":"note-designsystem","type":"note","position":{"x":1560,"y":560},"data":{"label":"Pourquoi","accent":"#7899CE","text":"Le design system est la vitrine vivante : tokens, échelle 50→900, composants (boutons, cartes, badges, inputs). Modifier un token met toutes les pages à jour."},"width":340,"height":164},
  {"id":"sec-pages","type":"sectionTitle","position":{"x":40,"y":1320},"data":{"step":"02","title":"Les pages du produit","subtitle":"Routing basé sur les fichiers : chaque écran a un rôle précis dans le parcours."},"width":620,"height":72},
  {"id":"frame-home","type":"browserFrame","position":{"x":40,"y":1480},"data":{"title":"Accueil","route":"/","icon":"home","accent":"#0049C6","frameWidth":760,"designWidth":1280,"designHeight":860},"width":760,"height":559},
  {"id":"note-home","type":"note","position":{"x":40,"y":2070},"data":{"label":"Accueil · /","accent":"#0049C6","text":"Porte d’entrée : présente la suite et oriente vers le simulateur, la landing et le design system, avec le rôle de chaque page."},"width":340,"height":164},
  {"id":"frame-landing","type":"browserFrame","position":{"x":880,"y":1480},"data":{"title":"Landing","route":"/sinvestir","icon":"layout","accent":"#1098F7","frameWidth":760,"designWidth":1280,"designHeight":860},"width":760,"height":559},
  {"id":"note-landing","type":"note","position":{"x":880,"y":2070},"data":{"label":"Landing · /sinvestir","accent":"#1098F7","text":"Page vitrine marketing reprise du Figma. Sert de référence de design (@design \"reference\") pour toutes les autres pages."},"width":340,"height":164},
  {"id":"sec-crypto","type":"sectionTitle","position":{"x":40,"y":2360},"data":{"step":"03","title":"Simulateur crypto & intégration","subtitle":"Le cœur du produit : un simulateur DCA sur données réelles, et sa version embarquable façon YouTube (modal → snippet iframe)."},"width":620,"height":93},
  {"id":"frame-crypto","type":"browserFrame","position":{"x":40,"y":2540},"data":{"title":"Simulateur","route":"/crypto","icon":"coins","accent":"#0049C6","frameWidth":760,"designWidth":1280,"designHeight":900},"width":760,"height":582},
  {"id":"frame-crypto-modal","type":"browserFrame","position":{"x":900,"y":2540},"data":{"title":"Modal d’intégration","route":"/crypto?embed=1","displayUrl":"preview.sinvestir.deploy.krisspy.ai/crypto?embed=1","icon":"cursor","accent":"#1098F7","frameWidth":760,"designWidth":1280,"designHeight":900},"width":760,"height":582},
  {"id":"frame-embed","type":"browserFrame","position":{"x":1760,"y":2540},"data":{"title":"Version embarquée","route":"/crypto/embed?asset=bitcoin&currency=eur&amount=50&frequency=weekly&layout=false","displayUrl":"preview.sinvestir.deploy.krisspy.ai/crypto/embed?…&layout=false","icon":"code","accent":"#22c55e","frameWidth":700,"designWidth":900,"designHeight":1000},"width":700,"height":826},
  {"id":"note-crypto","type":"note","position":{"x":40,"y":3150},"data":{"label":"Simulateur · /crypto","accent":"#0049C6","text":"Actif, montant, fréquence et période → capital, quantité, prix moyen, gains/pertes + graphiques historique & P/L avec zoom temporel."},"width":340,"height":164},
  {"id":"note-modal","type":"note","position":{"x":900,"y":3150},"data":{"label":"Flow d’intégration","accent":"#1098F7","text":"?embed=1 ouvre la modal façon YouTube : on règle les paramètres, on voit un aperçu live, puis on copie le lien direct ou le snippet <iframe>."},"width":340,"height":164},
  {"id":"note-embed","type":"note","position":{"x":1760,"y":3150},"data":{"label":"Embarquable · /crypto/embed","accent":"#22c55e","text":"Configurée par paramètres GET. layout=false retire l’habillage, theme=light surcharge les variables, readonly=true verrouille les champs."},"width":340,"height":164},
];

const INITIAL_EDGES = [
  {"id":"e-brand-ds","source":"brand-panel","target":"frame-designsystem","type":"smoothstep","label":"Tokens en action","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-crypto-modal","source":"frame-crypto","target":"frame-crypto-modal","type":"smoothstep","label":"1 · « Intégrer ce simulateur »","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-modal-embed","source":"frame-crypto-modal","target":"frame-embed","type":"smoothstep","label":"2 · Copier le snippet iframe","animated":true,"style":{"stroke":"#22c55e","strokeWidth":2}},
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
      {/* Bandeau de marque */}
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
            S’investir — Présentation produit
          </div>
          <div style={{ fontFamily: FONT_LABEL, fontSize: 11, color: C.periwinkle }}>
            {BASE_URL.replace('https://', '')}
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
      <KrisspyCollab canvasId={canvasId} name="Product" />
    </div>
  );
}

export default function PresentationProduit(props: { canvasId: string; filePath: string }) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
