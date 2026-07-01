/**
 * @krisspy-file
 * @type doc
 * @name "CryptoFormat"
 * @title "Formatting Helpers"
 * @description "Locale-aware currency, number and percentage formatters used across the simulator UI."
 */

export function formatCurrency(value: number, currency = 'EUR', maximumFractionDigits = 0): string {
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, digits = 4): string {
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits }).format(value);
}

export function formatPercent(ratio: number): string {
  if (!isFinite(ratio)) return '—';
  const sign = ratio > 0 ? '+' : '';
  return sign + new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 }).format(ratio);
}

export function formatDateShort(date: string): string {
  const d = new Date(date + 'T00:00:00Z');
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}
