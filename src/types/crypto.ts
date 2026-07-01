/**
 * @krisspy-file
 * @type doc
 * @name "CryptoTypes"
 * @title "Crypto Simulator Types"
 * @description "Shared TypeScript types for the crypto DCA simulator (assets, inputs, market data, results)."
 */

/** A digital asset selectable in the simulator. */
export interface CryptoAsset {
  /** coinId used by the market data endpoint, e.g. "ethereum". */
  id: string;
  name: string;
  symbol: string;
  /** Whether the id is validated against the current data source. */
  supported: boolean;
}

/** Recurring investment cadence. */
export type Frequency = 'daily' | 'weekly' | 'monthly';

/** User configuration for a DCA simulation. */
export interface SimulationInput {
  assetId: string;
  currency: string;
  /** Amount invested at each purchase, in `currency`. */
  amount: number;
  frequency: Frequency;
  /** ISO date (YYYY-MM-DD). */
  start: string;
  /** ISO date (YYYY-MM-DD). */
  end: string;
}

/** A single normalized market data point (one per day). */
export interface MarketPoint {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Epoch milliseconds. */
  ts: number;
  price: number;
}

/** Normalized market series + fast lookup helpers. */
export interface MarketData {
  points: MarketPoint[];
  /** Price on the given day, falling back to the last known price before it. */
  priceOnOrBefore(date: string): number | null;
  firstDate: string;
  lastDate: string;
  lastPrice: number;
}

/** A single executed purchase in the DCA plan. */
export interface PurchasePoint {
  date: string;
  price: number;
  invested: number;
  quantity: number;
}

/** Portfolio snapshot at a given date (for charts). */
export interface PortfolioPoint {
  date: string;
  ts: number;
  invested: number;
  value: number;
  quantity: number;
  /** Asset unit price on that day. */
  price: number;
  /** value - invested */
  profitLoss: number;
}

/** All computed indicators for a completed simulation. */
export interface SimulationResult {
  totalInvested: number;
  /** Number of days between start and end (inclusive). */
  days: number;
  quantity: number;
  avgPrice: number;
  finalValue: number;
  /** Ratio, e.g. 0.42 = +42%. */
  performance: number;
  profitLoss: number;
  currency: string;
  symbol: string;
  timeline: PortfolioPoint[];
  purchases: PurchasePoint[];
}

/** Machine-readable error codes for graceful handling. */
export type SimulationErrorCode =
  | 'invalid_dates'
  | 'invalid_amount'
  | 'no_data'
  | 'insufficient_history'
  | 'api_error';

export class SimulationError extends Error {
  code: SimulationErrorCode;
  constructor(code: SimulationErrorCode, message: string) {
    super(message);
    this.name = 'SimulationError';
    this.code = code;
  }
}
