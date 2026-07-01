/**
 * @krisspy-file
 * @type doc
 * @name "CalculateDcaSimulation"
 * @title "DCA Simulation Engine"
 * @description "Pure function computing all DCA indicators (total invested, quantity, avg price, final value, performance, P/L) plus a portfolio timeline for charts."
 */

import {
  SimulationError,
  type MarketData,
  type PortfolioPoint,
  type PurchasePoint,
  type SimulationInput,
  type SimulationResult,
} from '../../types/crypto';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Max number of timeline points kept for charts (calculation stays exact). */
const MAX_TIMELINE_POINTS = 730;

function parseISO(date: string): number {
  return new Date(date + 'T00:00:00Z').getTime();
}

function addDays(ts: number, n: number): number {
  return ts + n * MS_PER_DAY;
}

function addMonths(ts: number, n: number): number {
  const d = new Date(ts);
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.getTime();
}

/** Generate purchase timestamps between start and end (inclusive) per cadence. */
function purchaseSchedule(startTs: number, endTs: number, frequency: SimulationInput['frequency']): number[] {
  const out: number[] = [];
  let cursor = startTs;
  let i = 0;
  // Hard cap to avoid runaway loops on pathological inputs.
  const HARD_CAP = 20000;
  while (cursor <= endTs && i < HARD_CAP) {
    out.push(cursor);
    i++;
    if (frequency === 'daily') cursor = addDays(startTs, i);
    else if (frequency === 'weekly') cursor = addDays(startTs, i * 7);
    else cursor = addMonths(startTs, i);
  }
  return out;
}

/** Downsample a series to at most `max` points, always keeping the last one. */
function downsample<T>(arr: T[], max: number): T[] {
  if (arr.length <= max) return arr;
  const step = Math.ceil(arr.length / max);
  const out: T[] = [];
  for (let i = 0; i < arr.length; i += step) out.push(arr[i]);
  if (out[out.length - 1] !== arr[arr.length - 1]) out.push(arr[arr.length - 1]);
  return out;
}

/**
 * Run the DCA simulation. Pure & synchronous — throws `SimulationError` for
 * invalid inputs or unusable data so callers can render a clean message.
 */
export function calculateDcaSimulation(input: SimulationInput, market: MarketData): SimulationResult {
  const { amount, frequency, start, end, currency } = input;

  // --- Validation / edge cases -------------------------------------------
  if (!amount || amount <= 0 || !isFinite(amount)) {
    throw new SimulationError('invalid_amount', 'Le montant investi doit être supérieur à 0.');
  }
  const startTs = parseISO(start);
  const endTs = parseISO(end);
  if (isNaN(startTs) || isNaN(endTs)) {
    throw new SimulationError('invalid_dates', 'Dates invalides.');
  }
  if (endTs < startTs) {
    throw new SimulationError('invalid_dates', 'La date de fin doit être postérieure à la date de début.');
  }
  if (market.points.length === 0) {
    throw new SimulationError('no_data', 'Aucune donnée de marché disponible.');
  }
  // Clamp the effective range to the available history.
  const histStart = parseISO(market.firstDate);
  const histEnd = parseISO(market.lastDate);
  const effStart = Math.max(startTs, histStart);
  const effEnd = Math.min(endTs, histEnd);
  if (effEnd < effStart) {
    throw new SimulationError(
      'insufficient_history',
      `Historique insuffisant. Données disponibles du ${market.firstDate} au ${market.lastDate}.`,
    );
  }

  // --- DCA purchases ------------------------------------------------------
  const schedule = purchaseSchedule(effStart, effEnd, frequency);
  const purchases: PurchasePoint[] = [];
  let totalInvested = 0;
  let quantity = 0;

  for (const ts of schedule) {
    const date = new Date(ts).toISOString().slice(0, 10);
    const price = market.priceOnOrBefore(date);
    if (price == null || price <= 0) continue; // missing price → skip that date
    const qty = amount / price;
    totalInvested += amount;
    quantity += qty;
    purchases.push({ date, price, invested: amount, quantity: qty });
  }

  if (purchases.length === 0 || quantity <= 0) {
    throw new SimulationError('no_data', 'Aucun prix exploitable sur la période sélectionnée.');
  }

  // --- Portfolio timeline (daily value of holdings) -----------------------
  const timelineFull: PortfolioPoint[] = [];
  let purchaseIdx = 0;
  let runningInvested = 0;
  let runningQty = 0;
  for (let ts = effStart; ts <= effEnd; ts = addDays(ts, 1)) {
    const date = new Date(ts).toISOString().slice(0, 10);
    // Apply any purchases scheduled on/before this day.
    while (purchaseIdx < purchases.length && purchases[purchaseIdx].date <= date) {
      runningInvested += purchases[purchaseIdx].invested;
      runningQty += purchases[purchaseIdx].quantity;
      purchaseIdx++;
    }
    const price = market.priceOnOrBefore(date);
    if (price == null) continue;
    const value = runningQty * price;
    timelineFull.push({
      date,
      ts,
      invested: runningInvested,
      value,
      quantity: runningQty,
      price,
      profitLoss: value - runningInvested,
    });
  }

  // --- Final indicators ---------------------------------------------------
  const finalPrice = market.priceOnOrBefore(new Date(effEnd).toISOString().slice(0, 10)) ?? market.lastPrice;
  const finalValue = quantity * finalPrice;
  const profitLoss = finalValue - totalInvested;
  const performance = totalInvested > 0 ? profitLoss / totalInvested : 0;
  const avgPrice = quantity > 0 ? totalInvested / quantity : 0;
  const days = Math.round((effEnd - effStart) / MS_PER_DAY) + 1;

  return {
    totalInvested,
    days,
    quantity,
    avgPrice,
    finalValue,
    performance,
    profitLoss,
    currency,
    symbol: '',
    timeline: downsample(timelineFull, MAX_TIMELINE_POINTS),
    purchases,
  };
}
