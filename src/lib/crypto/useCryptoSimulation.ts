/**
 * @krisspy-file
 * @type doc
 * @name "UseCryptoSimulation"
 * @title "Simulation Hook"
 * @description "React hook that fetches market data (via the isolated source), normalizes it, runs the DCA engine, and exposes loading/error/result state with a debounce."
 */

import { useEffect, useRef, useState } from 'react';
import { marketDataSource } from './cryptoApi';
import { normalizeMarketData } from './normalizeMarketData';
import { calculateDcaSimulation } from './calculateDcaSimulation';
import { getAsset } from './assets';
import {
  SimulationError,
  type MarketData,
  type SimulationInput,
  type SimulationResult,
} from '../../types/crypto';

interface State {
  loading: boolean;
  error: { code: string; message: string } | null;
  result: SimulationResult | null;
}

const HISTORY_DAYS = 3650; // ~10 years
// Cache normalized series per asset+currency so tweaking inputs doesn't refetch.
const cache = new Map<string, MarketData>();

export function useCryptoSimulation(input: SimulationInput, enabled = true) {
  const [state, setState] = useState<State>({ loading: true, error: null, result: null });
  const [reloadKey, setReloadKey] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();

    async function run() {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const asset = getAsset(input.assetId);
        const coinId = asset?.id ?? input.assetId;
        const cacheKey = `${coinId}:${input.currency}`;

        let market = cache.get(cacheKey);
        if (!market) {
          const raw = await marketDataSource.fetchMarketChart(
            coinId,
            input.currency,
            HISTORY_DAYS,
            controller.signal,
          );
          market = normalizeMarketData(raw);
          cache.set(cacheKey, market);
        }

        const result = calculateDcaSimulation(input, market);
        result.symbol = asset?.symbol ?? '';
        if (!controller.signal.aborted) {
          setState({ loading: false, error: null, result });
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        const e =
          err instanceof SimulationError
            ? { code: err.code, message: err.message }
            : { code: 'api_error', message: 'Une erreur inattendue est survenue.' };
        setState({ loading: false, error: e, result: null });
      }
    }

    // Debounce rapid input changes.
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(run, 300);

    return () => {
      controller.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    input.assetId,
    input.currency,
    input.amount,
    input.frequency,
    input.start,
    input.end,
    enabled,
    reloadKey,
  ]);

  return { ...state, retry: () => setReloadKey((k) => k + 1) };
}
