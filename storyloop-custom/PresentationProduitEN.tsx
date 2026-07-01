/**
 * @krisspy-file
 * @type canvas
 * @name "Product presentation — S'investir"
 *
 * Product-Manager style presentation board for the S'investir simulator
 * suite: the brand, the design system, then the product pages.
 * Previews are iframes of the deployed build (no PreviewNode):
 * BASE_URL = https://preview.sinvestir.deploy.krisspy.ai
 * It notably shows the embed modal flow (/crypto?embed=1)
 * and the embeddable version (/crypto/embed?...&layout=false).
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
import { Coins, LayoutTemplate, Palette, Home, Code2, MousePointerClick, Monitor, Tablet, Smartphone } from 'lucide-react';
import {
  useKrisspyCanvas,
  useKrisspyNodeData,
  useCustomCanvasDropHandlers,
  useCustomCanvasCopyPaste,
  KrisspyCollab,
  KrisspyAlignmentOverlay,
} from '@krisspy/canvas';

// ─────────────────────────────────────────────────────────────
// Deployment link — iframes point here (not the PreviewNode)
// ─────────────────────────────────────────────────────────────
const BASE_URL = 'https://preview.sinvestir.deploy.krisspy.ai';

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

const stopEvents = (e: React.MouseEvent | React.KeyboardEvent) => e.stopPropagation();

// ─────────────────────────────────────────────────────────────
// Brand hero — editable main title
// ─────────────────────────────────────────────────────────────
const BrandHeroNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    badge: "S'investir Suite",
    title: 'Quantify every investment decision',
    subtitle:
      'A suite of dark, unified and embeddable tools. First deliverable: the crypto DCA simulator.',
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
// Brand panel — visual identity: colors + typography
// ─────────────────────────────────────────────────────────────
const BrandPanelNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    title: "S'investir identity",
    subtitle: 'Dark financial · from Figma',
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
          Typography
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
// Browser frame — iframe of the deployed build, with browser chrome
// The iframe renders at a "desktop" width then is scaled down.
// ─────────────────────────────────────────────────────────────
const ICONS: Record<string, any> = {
  home: Home,
  palette: Palette,
  layout: LayoutTemplate,
  coins: Coins,
  code: Code2,
  cursor: MousePointerClick,
  monitor: Monitor,
  tablet: Tablet,
  smartphone: Smartphone,
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

      {/* Browser bar — drag zone */}
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

      {/* Live preview — scaled iframe */}
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
// Device frame — realistic tablet / mobile mockup (bezel + notch/camera)
// The iframe renders at the device width then is scaled down,
// to trigger the page's real responsive behaviour.
// ─────────────────────────────────────────────────────────────
const DeviceFrameNode = ({ id, data: initial }: any) => {
  const [data, updateData] = useKrisspyNodeData(id, {
    device: 'mobile', // 'mobile' | 'tablet'
    title: 'Mobile',
    route: '/',
    accent: C.primary,
    screenWidth: 260,
    designWidth: 390,
    designHeight: 844,
    ...initial,
  });

  const device = data.device ?? 'mobile';
  const screenWidth = data.screenWidth ?? 260;
  const designWidth = data.designWidth ?? 390;
  const designHeight = data.designHeight ?? 844;
  const scale = screenWidth / designWidth;
  const screenH = Math.round(designHeight * scale);
  const route = data.route ?? '/';
  const src = `${BASE_URL}${route}`;
  const accent = data.accent ?? C.primary;

  const isTablet = device === 'tablet';
  const bezel = isTablet ? 14 : 12;
  const shellRadius = isTablet ? 30 : 44;
  const screenRadius = isTablet ? 14 : 32;
  const shellW = screenWidth + bezel * 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div
        className="drag-handle"
        style={{
          position: 'relative',
          width: shellW,
          padding: bezel,
          background: 'linear-gradient(160deg, #1a2036 0%, #05070f 60%)',
          borderRadius: shellRadius,
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: `0 30px 70px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22`,
          cursor: 'grab',
        }}
      >
        <Handle type="target" position={Position.Left} style={{ background: accent, width: 10, height: 10 }} />
        <Handle type="source" position={Position.Right} style={{ background: accent, width: 10, height: 10 }} />

        {/* Screen */}
        <div
          className="nodrag nopan nowheel"
          style={{
            width: screenWidth,
            height: screenH,
            overflow: 'hidden',
            position: 'relative',
            background: C.bg,
            borderRadius: screenRadius,
          }}
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

          {/* Mobile notch / tablet camera */}
          {isTablet ? (
            <span
              style={{
                position: 'absolute',
                top: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#000',
                boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.18)',
              }}
            />
          ) : (
            <span
              style={{
                position: 'absolute',
                top: 9,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 84,
                height: 22,
                borderRadius: 999,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
            </span>
          )}
        </div>

        {/* Side buttons (mobile only) */}
        {!isTablet && (
          <>
            <span style={{ position: 'absolute', right: -2, top: 90, width: 3, height: 46, borderRadius: 3, background: 'rgba(255,255,255,0.16)' }} />
            <span style={{ position: 'absolute', left: -2, top: 74, width: 3, height: 30, borderRadius: 3, background: 'rgba(255,255,255,0.16)' }} />
            <span style={{ position: 'absolute', left: -2, top: 112, width: 3, height: 30, borderRadius: 3, background: 'rgba(255,255,255,0.16)' }} />
          </>
        )}
      </div>

      {/* Device caption */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {isTablet ? <Tablet size={14} color={accent} /> : <Smartphone size={14} color={accent} />}
        <span
          className="nodrag nopan"
          contentEditable
          suppressContentEditableWarning
          onClick={stopEvents}
          onMouseDown={stopEvents}
          onDoubleClick={stopEvents}
          onKeyDown={stopEvents}
          onBlur={(e) => updateData({ title: e.currentTarget.textContent || '' })}
          style={{ fontFamily: FONT_LABEL, fontSize: 13, fontWeight: 600, color: '#fff', outline: 'none', cursor: 'text' }}
        >
          {data.title ?? ''}
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Post-it — editable PM annotation
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
  deviceFrame: DeviceFrameNode,
  note: NoteNode,
};

// Computed heights: 46 (bar) + designHeight*scale
// w760 → 557 · w820 → 597 · w900 → 651
const INITIAL_NODES: any[] = [
  {"id":"hero","type":"brandHero","position":{"x":470,"y":0},"data":{"badge":"S'investir Suite","title":"Quantify every investment decision","subtitle":"A suite of dark, unified and embeddable tools. First deliverable: the crypto DCA simulator, with an iframe-embeddable version."},"width":920,"height":235},
  {"id":"sec-brand","type":"sectionTitle","position":{"x":40,"y":340},"data":{"step":"01","title":"The brand & the design system","subtitle":"A “dark financial” identity from Figma, centralised in theme.css. Every token drives the whole UI through the Theme Editor."},"width":620,"height":93},
  {"id":"brand-panel","type":"brandPanel","position":{"x":40,"y":500},"data":{"title":"S'investir identity","subtitle":"Dark financial · from Figma","colors":[{"name":"Primary","value":"#0049C6"},{"name":"Azure","value":"#1098F7"},{"name":"Periwinkle","value":"#7899CE"},{"name":"Success","value":"#22c55e"},{"name":"Danger","value":"#ef4444"},{"name":"Surface","value":"#030B1F"}],"fonts":[{"name":"Plus Jakarta Sans","role":"Headings & body"},{"name":"Lexend","role":"Buttons & labels"}]},"width":480,"height":518},
  {"id":"frame-designsystem","type":"browserFrame","position":{"x":600,"y":500},"data":{"title":"Design System","route":"/designsystem","icon":"palette","accent":"#1098F7","frameWidth":900,"designWidth":1280,"designHeight":860},"width":900,"height":653},
  {"id":"note-designsystem","type":"note","position":{"x":1560,"y":560},"data":{"label":"Why","accent":"#7899CE","text":"The design system is the living showcase: tokens, 50→900 scale, components (buttons, cards, badges, inputs). Changing a token updates every page."},"width":340,"height":164},
  {"id":"sec-pages","type":"sectionTitle","position":{"x":40,"y":1320},"data":{"step":"02","title":"The product pages","subtitle":"File-based routing: each screen has a precise role in the journey."},"width":620,"height":72},
  {"id":"frame-home","type":"browserFrame","position":{"x":40,"y":1480},"data":{"title":"Home","route":"/","icon":"home","accent":"#0049C6","frameWidth":760,"designWidth":1280,"designHeight":860},"width":760,"height":559},
  {"id":"note-home","type":"note","position":{"x":40,"y":2070},"data":{"label":"Home · /","accent":"#0049C6","text":"Entry point: presents the suite and routes to the simulator, the landing and the design system, with the role of each page."},"width":340,"height":164},
  {"id":"frame-landing","type":"browserFrame","position":{"x":880,"y":1480},"data":{"title":"Landing","route":"/sinvestir","icon":"layout","accent":"#1098F7","frameWidth":760,"designWidth":1280,"designHeight":860},"width":760,"height":559},
  {"id":"note-landing","type":"note","position":{"x":880,"y":2070},"data":{"label":"Landing · /sinvestir","accent":"#1098F7","text":"Marketing showcase page taken from Figma. Serves as the design reference (@design \"reference\") for all other pages."},"width":340,"height":164},
  {"id":"sec-crypto","type":"sectionTitle","position":{"x":40,"y":2360},"data":{"step":"03","title":"Crypto simulator & embedding","subtitle":"The heart of the product: a DCA simulator on real data, and its YouTube-style embeddable version (modal → iframe snippet)."},"width":620,"height":93},
  {"id":"frame-crypto","type":"browserFrame","position":{"x":40,"y":2540},"data":{"title":"Simulator","route":"/crypto","icon":"coins","accent":"#0049C6","frameWidth":760,"designWidth":1280,"designHeight":900},"width":760,"height":582},
  {"id":"frame-crypto-modal","type":"browserFrame","position":{"x":900,"y":2540},"data":{"title":"Embed modal","route":"/crypto?embed=1","displayUrl":"preview.sinvestir.deploy.krisspy.ai/crypto?embed=1","icon":"cursor","accent":"#1098F7","frameWidth":760,"designWidth":1280,"designHeight":900},"width":760,"height":582},
  {"id":"frame-embed","type":"browserFrame","position":{"x":1760,"y":2540},"data":{"title":"Embedded version","route":"/crypto/embed?asset=bitcoin&currency=eur&amount=50&frequency=weekly&layout=false","displayUrl":"preview.sinvestir.deploy.krisspy.ai/crypto/embed?…&layout=false","icon":"code","accent":"#22c55e","frameWidth":700,"designWidth":900,"designHeight":1000},"width":700,"height":826},
  {"id":"note-crypto","type":"note","position":{"x":40,"y":3150},"data":{"label":"Simulator · /crypto","accent":"#0049C6","text":"Asset, amount, frequency and period → capital, quantity, average price, gains/losses + history & P/L charts with time zoom."},"width":340,"height":164},
  {"id":"note-modal","type":"note","position":{"x":900,"y":3150},"data":{"label":"Embed flow","accent":"#1098F7","text":"?embed=1 opens the YouTube-style modal: set the parameters, see a live preview, then copy the direct link or the <iframe> snippet."},"width":340,"height":164},
  {"id":"note-embed","type":"note","position":{"x":1758.8459102444506,"y":3400.4374769542133},"data":{"label":"Embeddable · /crypto/embed","accent":"#22c55e","text":"Configured through GET parameters. layout=false removes the chrome, theme=light overrides the variables, readonly=true locks the fields."},"width":340,"height":164},
  {"id":"sec-tour","type":"sectionTitle","position":{"x":40,"y":3760},"data":{"step":"04","title":"Discovery journey — product tour","subtitle":"An onboarded version of the simulator that guides the user step by step. Each step lives in the URL (?step=…), so it is replayable and embeddable as-is."},"width":620,"height":93},
  {"id":"frame-tour-montant","type":"browserFrame","position":{"x":40,"y":3960},"data":{"title":"Step 1 · The stake","route":"/crypto/decouverte?step=montant","displayUrl":"…/crypto/decouverte?step=montant","icon":"coins","accent":"#0049C6","frameWidth":700,"designWidth":1280,"designHeight":900},"width":700,"height":540},
  {"id":"frame-tour-actif","type":"browserFrame","position":{"x":800,"y":3960},"data":{"title":"Step 2 · The crypto","route":"/crypto/decouverte?step=actif&amount=50&frequency=monthly","displayUrl":"…?step=actif&amount=50&frequency=monthly","icon":"cursor","accent":"#1098F7","frameWidth":700,"designWidth":1280,"designHeight":900},"width":700,"height":540},
  {"id":"frame-tour-resultats","type":"browserFrame","position":{"x":1560,"y":3960},"data":{"title":"Step 3 · The result","route":"/crypto/decouverte?step=resultats&asset=bitcoin&amount=50&frequency=monthly","displayUrl":"…?step=resultats&asset=bitcoin&amount=50…","icon":"coins","accent":"#22c55e","frameWidth":700,"designWidth":1280,"designHeight":1500},"width":700,"height":868},
  {"id":"note-tour","type":"note","position":{"x":40,"y":4540},"data":{"label":"Why a product tour","accent":"#0049C6","text":"Rather than a wall of text, we onboard: stake → crypto (top 5) → reveal of the curves. The user can go back or open the full simulator."},"width":340,"height":164},
  {"id":"note-tour-url","type":"note","position":{"x":800,"y":4540},"data":{"label":"Steps in the URL","accent":"#1098F7","text":"?step=montant | actif | resultats, plus amount / frequency / asset. Each screen is reproducible, which lets us replay it here in an iframe to tell the workflow story."},"width":340,"height":164},
  {"id":"sec-responsive","type":"sectionTitle","position":{"x":2700,"y":2360},"data":{"step":"05","title":"Responsive — web, tablet, mobile","subtitle":"The embeddable simulator adapts to every screen size. Same URL, same content: the layout reflows automatically based on the viewport width."},"width":620,"height":93},
  {"id":"frame-resp-web","type":"browserFrame","position":{"x":2700,"y":2540},"data":{"title":"Web · Desktop","route":"/crypto/embed?asset=bitcoin&currency=eur&amount=50&frequency=weekly&layout=false","displayUrl":"…/crypto/embed · 1280px","icon":"monitor","accent":"#0049C6","frameWidth":620,"designWidth":1280,"designHeight":900},"width":620,"height":484},
  {"id":"frame-resp-tablet","type":"deviceFrame","position":{"x":3380,"y":2540},"data":{"device":"tablet","title":"Tablet · 768px","route":"/crypto/embed?asset=bitcoin&currency=eur&amount=50&frequency=weekly&layout=false","accent":"#1098F7","screenWidth":360,"designWidth":768,"designHeight":1024},"width":388,"height":544},
  {"id":"frame-resp-mobile","type":"deviceFrame","position":{"x":3830,"y":2540},"data":{"device":"mobile","title":"Mobile · 390px","route":"/crypto/embed?asset=bitcoin&currency=eur&amount=50&frequency=weekly&layout=false","accent":"#22c55e","screenWidth":250,"designWidth":390,"designHeight":844},"width":274,"height":601},
  {"id":"note-responsive","type":"note","position":{"x":2700,"y":3200},"data":{"label":"Why responsive","accent":"#0049C6","text":"A single embed for every device: blog article on desktop, tablet or mobile app. The simulator columns stack, the charts resize, no extra setup on the integrator's side."},"width":340,"height":164},
];

const INITIAL_EDGES = [
  {"id":"e-brand-ds","source":"brand-panel","target":"frame-designsystem","type":"smoothstep","label":"Tokens in action","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-crypto-modal","source":"frame-crypto","target":"frame-crypto-modal","type":"smoothstep","label":"1 · “Embed this simulator”","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-modal-embed","source":"frame-crypto-modal","target":"frame-embed","type":"smoothstep","label":"2 · Copy the iframe snippet","animated":true,"style":{"stroke":"#22c55e","strokeWidth":2}},
  {"id":"e-tour-1-2","source":"frame-tour-montant","target":"frame-tour-actif","type":"smoothstep","label":"Continue","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-tour-2-3","source":"frame-tour-actif","target":"frame-tour-resultats","type":"smoothstep","label":"Choosing the crypto","animated":true,"style":{"stroke":"#22c55e","strokeWidth":2}},
  {"id":"e-embed-resp","source":"frame-embed","target":"frame-resp-web","type":"smoothstep","label":"The same embed, everywhere","animated":true,"style":{"stroke":"#7899CE","strokeWidth":2}},
  {"id":"e-resp-web-tablet","source":"frame-resp-web","target":"frame-resp-tablet","type":"smoothstep","label":"768px","animated":true,"style":{"stroke":"#1098F7","strokeWidth":2}},
  {"id":"e-resp-tablet-mobile","source":"frame-resp-tablet","target":"frame-resp-mobile","type":"smoothstep","label":"390px","animated":true,"style":{"stroke":"#22c55e","strokeWidth":2}},
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
      {/* Brand banner */}
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
            S’investir — Product presentation
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

export default function PresentationProduitEN(props: { canvasId: string; filePath: string }) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
