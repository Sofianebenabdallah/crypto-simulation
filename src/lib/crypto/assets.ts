/**
 * @krisspy-file
 * @type doc
 * @name "CryptoAssets"
 * @title "Crypto Assets Registry"
 * @description "Loads the digital-assets list from JSON and exposes helpers to look up an asset by id/symbol."
 */

import raw from '../../data/crypto-assets.json';
import type { CryptoAsset } from '../../types/crypto';

export const ALL_ASSETS: CryptoAsset[] = (raw.assets as CryptoAsset[]);

/** Assets validated against the current data source (safe to select). */
export const SUPPORTED_ASSETS: CryptoAsset[] = ALL_ASSETS.filter((a) => a.supported);

export function getAsset(id: string): CryptoAsset | undefined {
  const key = id.toLowerCase();
  return ALL_ASSETS.find((a) => a.id.toLowerCase() === key || a.symbol.toLowerCase() === key);
}
