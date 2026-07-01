/**
 * @krisspy-file
 * @type doc
 * @name "CryptoApi"
 * @title "Crypto Market Data Source"
 * @description "Isolated data-access layer. The ONLY file that knows the market data URL. Swap this to change source (internal API / CoinGecko / mock / DB)."
 */

import { SimulationError } from '../../types/crypto';

/**
 * Raw response shape from the market_chart endpoint (CoinGecko-compatible).
 *   { prices: [[tsMs, price], ...], market_caps: [...], total_volumes: [...] }
 */
export interface MarketChartResponse {
  prices: [number, number][];
  market_caps?: [number, number][];
  total_volumes?: [number, number][];
}

/**
 * Abstraction over the market data provider. Components never talk to a URL
 * directly — they depend on this interface, so the source can be replaced
 * (internal S'investir API, CoinGecko, mocked data, historized DB) without
 * touching any React code.
 */
export interface MarketDataSource {
  fetchMarketChart(
    coinId: string,
    currency: string,
    days: number,
    signal?: AbortSignal,
  ): Promise<MarketChartResponse>;
}

/** Base URL — overridable via env so it's never hardcoded in components. */
const BASE_URL =
  (import.meta.env.VITE_CRYPTO_API_BASE as string | undefined)?.replace(/\/$/, '') ||
  'https://digital-assets.fritzy.finance';

const DEFAULT_TIMEOUT_MS = 15000;

/** Default HTTP source pointing at the fritzy digital-assets endpoint. */
export const httpMarketDataSource: MarketDataSource = {
  async fetchMarketChart(coinId, currency, days, signal) {
    const url = `${BASE_URL}/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=${encodeURIComponent(
      currency,
    )}&days=${days}`;

    // Combine caller's signal with an internal timeout.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
    if (signal) {
      if (signal.aborted) controller.abort();
      else signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        throw new SimulationError('api_error', `Réponse invalide du serveur (${res.status}).`);
      }
      const json = (await res.json()) as MarketChartResponse;
      if (!json || !Array.isArray(json.prices) || json.prices.length === 0) {
        throw new SimulationError('no_data', 'Aucune donnée de marché disponible pour cet actif.');
      }
      return json;
    } catch (err) {
      if (err instanceof SimulationError) throw err;
      if ((err as Error)?.name === 'AbortError') {
        throw new SimulationError('api_error', 'Le chargement des données a expiré. Réessayez.');
      }
      throw new SimulationError('api_error', 'Impossible de contacter le service de données de marché.');
    } finally {
      clearTimeout(timeout);
    }
  },
};

/** Active source. Swap this single binding to change the whole app's data origin. */
export const marketDataSource: MarketDataSource = httpMarketDataSource;
