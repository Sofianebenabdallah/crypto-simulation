import { useEffect, useState } from 'react';
import { AlertTriangle, Loader2, Settings2, LineChart, TrendingUp, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '../../ui';
import { CryptoSimulatorForm } from './CryptoSimulatorForm';
import { CryptoKeyFigures } from './CryptoKeyFigures';
import { CryptoHistoryChart } from './CryptoHistoryChart';
import { CryptoProfitLossChart } from './CryptoProfitLossChart';
import { useCryptoSimulation } from '../../../lib/crypto/useCryptoSimulation';
import { DEFAULT_CONFIG } from '../../../lib/crypto/queryParams';
import type { SimulationInput } from '../../../types/crypto';
import type { ChartRange } from './chartShared';

export interface CryptoSimulatorProps {
  /** Preset input (e.g. from embed query params). */
  initialInput?: Partial<SimulationInput>;
  /** Lock inputs, show results only. */
  readonly?: boolean;
  /** Hide the configuration card (pure results, e.g. tight embeds). */
  hideForm?: boolean;
  className?: string;
}

function SectionTitle({
  icon,
  children,
  action,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary bg-white/[0.04] text-secondary">
          {icon}
        </span>
        <h3 className="font-heading text-base sm:text-lg font-semibold">{children}</h3>
      </div>
      {action}
    </div>
  );
}

function StatePanel({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex min-h-[300px] flex-col items-center justify-center text-center">{children}</Card>
  );
}

function ZoomReset({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full border border-primary bg-white/[0.04] px-3 py-1.5 font-label text-xs text-secondary transition-colors hover:border-white/25 hover:text-white"
    >
      <RotateCcw size={13} /> {t('simulator.fullView')}
    </button>
  );
}

/**
 * Self-contained crypto DCA simulator. Works identically on the standalone
 * page and inside an iframe embed — it owns its state and data fetching.
 */
export function CryptoSimulator({ initialInput, readonly, hideForm, className }: CryptoSimulatorProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState<SimulationInput>({
    assetId: initialInput?.assetId ?? DEFAULT_CONFIG.assetId,
    currency: initialInput?.currency ?? DEFAULT_CONFIG.currency,
    amount: initialInput?.amount ?? DEFAULT_CONFIG.amount,
    frequency: initialInput?.frequency ?? DEFAULT_CONFIG.frequency,
    start: initialInput?.start ?? DEFAULT_CONFIG.start,
    end: initialInput?.end ?? DEFAULT_CONFIG.end,
  });

  const { loading, error, result, retry } = useCryptoSimulation(input);
  const patch = (p: Partial<SimulationInput>) => setInput((prev) => ({ ...prev, ...p }));

  // Shared time-zoom range across both charts. Resets to full on new data.
  const len = result?.timeline.length ?? 0;
  const [range, setRange] = useState<ChartRange>({ startIndex: 0, endIndex: 0 });
  useEffect(() => {
    if (len > 0) setRange({ startIndex: 0, endIndex: len - 1 });
  }, [len]);

  const zoomed = len > 0 && (range.startIndex > 0 || range.endIndex < len - 1);
  const resetZoom = () => setRange({ startIndex: 0, endIndex: len - 1 });
  const onRangeChange = (r: ChartRange) => {
    if (r.startIndex == null || r.endIndex == null) return;
    setRange({ startIndex: r.startIndex, endIndex: r.endIndex });
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Configuration */}
        {!hideForm && (
          <Card className="lg:col-span-5 xl:col-span-4 h-fit">
            <SectionTitle icon={<Settings2 size={16} />}>{t('simulator.configuration')}</SectionTitle>
            <CryptoSimulatorForm value={input} onChange={patch} readonly={readonly} />
          </Card>
        )}

        {/* Chiffres clés */}
        <div className={hideForm ? 'lg:col-span-12' : 'lg:col-span-7 xl:col-span-8'}>
          {loading && (
            <StatePanel>
              <Loader2 className="animate-spin text-secondary" size={30} />
              <span className="mt-3 font-label text-sm text-secondary">
                {t('simulator.loading')}
              </span>
            </StatePanel>
          )}
          {!loading && error && (
            <StatePanel>
              <AlertTriangle className="text-danger" size={30} />
              <p className="mt-3 max-w-sm text-sm text-secondary">{error.message}</p>
              <Button variant="outline" className="mt-4" onClick={retry}>
                {t('simulator.retry')}
              </Button>
            </StatePanel>
          )}
          {!loading && !error && result && <CryptoKeyFigures result={result} />}
        </div>
      </div>

      {/* Charts */}
      {!loading && !error && result && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
          <Card>
            <SectionTitle
              icon={<LineChart size={16} />}
              action={zoomed ? <ZoomReset onClick={resetZoom} /> : undefined}
            >
              {t('simulator.portfolioEvolution')}
            </SectionTitle>
            <CryptoHistoryChart
              timeline={result.timeline}
              currency={result.currency}
              symbol={result.symbol}
              range={range}
              onRangeChange={onRangeChange}
            />
          </Card>
          <Card>
            <SectionTitle
              icon={<TrendingUp size={16} />}
              action={zoomed ? <ZoomReset onClick={resetZoom} /> : undefined}
            >
              {t('simulator.gainsLosses')}
            </SectionTitle>
            <CryptoProfitLossChart
              timeline={result.timeline}
              currency={result.currency}
              symbol={result.symbol}
              range={range}
              onRangeChange={onRangeChange}
            />
          </Card>
        </div>
      )}
    </div>
  );
}
