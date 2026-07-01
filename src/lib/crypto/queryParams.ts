/**
 * @krisspy-file
 * @type doc
 * @name "QueryParams"
 * @title "Embed Query Params"
 * @description "Parse & serialize the crypto simulator embed URL params (asset, currency, amount, frequency, start, end, layout, theme, readonly) with safe defaults."
 */

import type { Frequency, SimulationInput } from '../../types/crypto';

export interface EmbedConfig extends SimulationInput {
  /** Show the site chrome (header/footer). `layout=false` → false. */
  layout: boolean;
  /** 'light' | 'dark'. */
  theme: 'light' | 'dark';
  /** Lock inputs, show results only. */
  readonly: boolean;
}

export const DEFAULT_CONFIG: EmbedConfig = {
  assetId: 'ethereum',
  currency: 'EUR',
  amount: 25,
  frequency: 'daily',
  start: '2018-01-01',
  end: new Date().toISOString().slice(0, 10),
  layout: true,
  theme: 'dark',
  readonly: false,
};

const FREQUENCIES: Frequency[] = ['daily', 'weekly', 'monthly'];

function parseBool(v: string | null, fallback: boolean): boolean {
  if (v == null) return fallback;
  return v !== 'false' && v !== '0' && v !== 'no';
}

function isISODate(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(new Date(v).getTime());
}

/**
 * Build an EmbedConfig from URLSearchParams. Never throws: any missing or
 * invalid param falls back to a coherent default, so a partial URL still works.
 */
export function parseEmbedParams(params: URLSearchParams): EmbedConfig {
  const asset = params.get('asset');
  const currency = params.get('currency');
  const amountRaw = params.get('amount');
  const frequency = params.get('frequency') as Frequency | null;
  const start = params.get('start');
  const end = params.get('end');
  const theme = params.get('theme');

  const amount = amountRaw != null ? Number(amountRaw) : DEFAULT_CONFIG.amount;

  return {
    assetId: asset && asset.trim() ? asset.trim().toLowerCase() : DEFAULT_CONFIG.assetId,
    currency: currency && currency.trim() ? currency.trim().toUpperCase() : DEFAULT_CONFIG.currency,
    amount: isFinite(amount) && amount > 0 ? amount : DEFAULT_CONFIG.amount,
    frequency: frequency && FREQUENCIES.includes(frequency) ? frequency : DEFAULT_CONFIG.frequency,
    start: start && isISODate(start) ? start : DEFAULT_CONFIG.start,
    end: end && isISODate(end) ? end : DEFAULT_CONFIG.end,
    layout: parseBool(params.get('layout'), DEFAULT_CONFIG.layout),
    theme: theme === 'light' ? 'light' : 'dark',
    readonly: parseBool(params.get('readonly'), false),
  };
}

/** Serialize a config back to a query string (for building embed URLs). */
export function serializeEmbedParams(cfg: Partial<EmbedConfig>): string {
  const p = new URLSearchParams();
  if (cfg.assetId) p.set('asset', cfg.assetId);
  if (cfg.currency) p.set('currency', cfg.currency);
  if (cfg.amount != null) p.set('amount', String(cfg.amount));
  if (cfg.frequency) p.set('frequency', cfg.frequency);
  if (cfg.start) p.set('start', cfg.start);
  if (cfg.end) p.set('end', cfg.end);
  if (cfg.layout === false) p.set('layout', 'false');
  if (cfg.theme) p.set('theme', cfg.theme);
  if (cfg.readonly) p.set('readonly', 'true');
  return p.toString();
}
