import { useTranslation } from 'react-i18next';
import { formatCurrency, formatDateShort, formatNumber } from '../../../lib/crypto/format';

/** Series colour + formatter registry, keyed by dataKey. Labels come from i18n (simulator.series.*). */
export const SERIES: Record<
  string,
  { color: string; fmt: (v: number, ctx: ChartCtx) => string }
> = {
  value: { color: 'var(--secondary)', fmt: (v, c) => formatCurrency(v, c.currency) },
  invested: { color: 'var(--tertiary)', fmt: (v, c) => formatCurrency(v, c.currency) },
  quantity: {
    color: 'var(--warning)',
    fmt: (v, c) => `${formatNumber(v, 2)}${c.symbol ? ` ${c.symbol}` : ''}`,
  },
  price: { color: 'rgba(255,255,255,0.55)', fmt: (v, c) => formatCurrency(v, c.currency, 2) },
  profitLoss: {
    color: 'var(--success)',
    fmt: (v, c) => formatCurrency(v, c.currency),
  },
};

export interface ChartCtx {
  currency: string;
  symbol: string;
}

/** Shared time-zoom window (indices into the timeline). */
export interface ChartRange {
  startIndex: number;
  endIndex: number;
}

/** Common styling for the time-zoom brush shared by both charts. */
export const BRUSH_BASE = {
  dataKey: 'date',
  height: 28,
  travellerWidth: 9,
  gap: 4,
  stroke: 'var(--secondary)',
  fill: 'rgba(2,10,28,0.55)',
  tickFormatter: (d: string) => String(d).slice(0, 7),
} as const;

/** Rich glass tooltip listing every active series with a coloured dot. */
export function RichTooltip({ active, payload, label, ctx }: any) {
  const { t } = useTranslation();
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3.5 py-2.5 text-sm shadow-xl" style={{ minWidth: 170 }}>
      <div className="text-secondary text-xs font-label mb-2">{formatDateShort(label)}</div>
      <div className="flex flex-col gap-1.5">
        {payload
          .filter((p: any) => SERIES[p.dataKey])
          .map((p: any) => {
            const meta = SERIES[p.dataKey];
            const isPL = p.dataKey === 'profitLoss';
            const color = isPL
              ? p.value >= 0
                ? 'var(--success)'
                : 'var(--danger)'
              : meta.color;
            return (
              <div key={p.dataKey} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-secondary">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  {t(`simulator.series.${p.dataKey}`)}
                </span>
                <b style={{ color: isPL ? color : 'var(--text-primary)' }}>{meta.fmt(p.value, ctx)}</b>
              </div>
            );
          })}
      </div>
    </div>
  );
}

/** Small legend chip row rendered above a chart. */
export function ChartLegend({ items }: { items: { dataKey: string; label?: string }[] }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
      {items.map((it) => {
        const meta = SERIES[it.dataKey];
        return (
          <span key={it.dataKey} className="flex items-center gap-1.5 font-label text-xs text-secondary">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
            {it.label ?? t(`simulator.series.${it.dataKey}`)}
          </span>
        );
      })}
    </div>
  );
}

/** Compact axis tick formatter for € values (1.2k / 34k / 1.1M). */
export function compactCurrency(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(v / 1e3).toFixed(1)}k`;
  return String(Math.round(v));
}
