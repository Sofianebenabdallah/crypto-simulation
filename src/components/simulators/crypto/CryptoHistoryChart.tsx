import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
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

/**
 * Historical chart — portfolio value (area) vs cumulative invested and the
 * accumulated crypto quantity (right axis), with a rich crosshair tooltip and
 * a draggable time-zoom brush at the bottom.
 */
export function CryptoHistoryChart({ timeline, currency, symbol, range, onRangeChange }: Props) {
  const ctx: ChartCtx = { currency, symbol };
  return (
    <div>
      <ChartLegend items={[{ dataKey: 'value' }, { dataKey: 'invested' }, { dataKey: 'quantity' }]} />
      <div className="w-full" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={timeline} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
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
              yAxisId="money"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickFormatter={compactCurrency}
              width={48}
              stroke="rgba(255,255,255,0.1)"
            />
            <YAxis
              yAxisId="qty"
              orientation="right"
              tick={{ fill: 'rgba(245,158,11,0.7)', fontSize: 11 }}
              tickFormatter={compactCurrency}
              width={44}
              stroke="rgba(255,255,255,0.1)"
            />
            <Tooltip
              content={<RichTooltip ctx={ctx} />}
              cursor={{ stroke: 'rgba(255,255,255,0.25)', strokeDasharray: '4 4' }}
            />
            <Area
              yAxisId="money"
              type="monotone"
              dataKey="value"
              stroke="var(--secondary)"
              strokeWidth={2.5}
              fill="url(#valueFill)"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              yAxisId="money"
              type="monotone"
              dataKey="invested"
              stroke="var(--tertiary)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="qty"
              type="monotone"
              dataKey="quantity"
              stroke="var(--warning)"
              strokeWidth={1.75}
              strokeDasharray="5 3"
              dot={false}
            />
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
