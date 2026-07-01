import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PortfolioPoint } from '../../../types/crypto';
import {
  BRUSH_BASE,
  ChartLegend,
  RichTooltip,
  compactCurrency,
  type ChartCtx,
  type ChartRange,
} from './chartShared';

interface Props {
  timeline: PortfolioPoint[];
  currency: string;
  symbol: string;
  range?: ChartRange;
  onRangeChange?: (r: ChartRange) => void;
}

/** Fraction (0..1) of the Y range that sits above zero — for the split gradient. */
function zeroOffset(timeline: PortfolioPoint[]): number {
  let min = Infinity;
  let max = -Infinity;
  for (const p of timeline) {
    if (p.profitLoss < min) min = p.profitLoss;
    if (p.profitLoss > max) max = p.profitLoss;
  }
  if (max <= 0) return 0;
  if (min >= 0) return 1;
  return max / (max - min);
}

/**
 * Gains / losses chart — value & invested lines plus a P/L area that is green
 * above zero and red below, with a rich crosshair tooltip.
 */
export function CryptoProfitLossChart({ timeline, currency, symbol, range, onRangeChange }: Props) {
  const ctx: ChartCtx = { currency, symbol };
  const off = zeroOffset(timeline);

  return (
    <div>
      <ChartLegend
        items={[{ dataKey: 'value' }, { dataKey: 'invested' }, { dataKey: 'profitLoss' }]}
      />
      <div className="w-full" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={timeline} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="plFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset={0} stopColor="var(--success)" stopOpacity={0.4} />
                <stop offset={off} stopColor="var(--success)" stopOpacity={0.05} />
                <stop offset={off} stopColor="var(--danger)" stopOpacity={0.05} />
                <stop offset={1} stopColor="var(--danger)" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="plStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="var(--success)" />
                <stop offset={off} stopColor="var(--danger)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickFormatter={(d) => String(d).slice(0, 7)}
              minTickGap={44}
              stroke="rgba(255,255,255,0.1)"
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickFormatter={compactCurrency}
              width={48}
              stroke="rgba(255,255,255,0.1)"
            />
            <Tooltip
              content={<RichTooltip ctx={ctx} />}
              cursor={{ stroke: 'rgba(255,255,255,0.25)', strokeDasharray: '4 4' }}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.22)" />
            <Area
              type="monotone"
              dataKey="profitLoss"
              stroke="url(#plStroke)"
              strokeWidth={2.5}
              fill="url(#plFill)"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line type="monotone" dataKey="value" stroke="var(--secondary)" strokeWidth={1.75} dot={false} />
            <Line type="monotone" dataKey="invested" stroke="var(--tertiary)" strokeWidth={1.75} dot={false} />
            <Brush
              {...BRUSH_BASE}
              startIndex={range?.startIndex}
              endIndex={range?.endIndex}
              onChange={(r: any) =>
                onRangeChange?.({ startIndex: r.startIndex, endIndex: r.endIndex })
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
