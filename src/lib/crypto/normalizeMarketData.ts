/**
 * @krisspy-file
 * @type doc
 * @name "NormalizeMarketData"
 * @title "Market Data Normalization"
 * @description "Turns the raw [tsMs, price][] payload into a clean, deduplicated daily series with fast price lookup (with fallback for missing dates)."
 */

import type { MarketChartResponse } from './cryptoApi';
import type { MarketData, MarketPoint } from '../../types/crypto';

/** Format an epoch-ms timestamp as an ISO day string (UTC). */
export function toISODate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/**
 * Normalize the raw provider payload into a sorted, one-point-per-day series
 * plus lookup helpers. The last price of a given day wins.
 */
export function normalizeMarketData(raw: MarketChartResponse): MarketData {
  const byDay = new Map<string, MarketPoint>();

  for (const [ts, price] of raw.prices) {
    if (typeof price !== 'number' || !isFinite(price) || price <= 0) continue;
    const date = toISODate(ts);
    byDay.set(date, { date, ts, price });
  }

  const points = Array.from(byDay.values()).sort((a, b) => a.ts - b.ts);

  // Index dates for binary search of "price on or before".
  const dates = points.map((p) => p.date);

  function priceOnOrBefore(date: string): number | null {
    if (points.length === 0) return null;
    // Fast path: exact hit.
    const exact = byDay.get(date);
    if (exact) return exact.price;
    // Binary search for the latest point with date <= target.
    let lo = 0;
    let hi = dates.length - 1;
    let idx = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (dates[mid] <= date) {
        idx = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return idx >= 0 ? points[idx].price : null;
  }

  return {
    points,
    priceOnOrBefore,
    firstDate: points[0]?.date ?? '',
    lastDate: points[points.length - 1]?.date ?? '',
    lastPrice: points[points.length - 1]?.price ?? 0,
  };
}
