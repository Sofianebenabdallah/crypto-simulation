import { ArrowDownRight, ArrowUpRight, Calendar, Coins, PiggyBank, Tag, Wallet } from 'lucide-react';
import type { SimulationResult } from '../../../types/crypto';
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/crypto/format';

interface Props {
  result: SimulationResult;
}

function Tile({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-primary bg-white/[0.03] p-4 transition-colors hover:border-white/20">
      <div className="flex items-center gap-2 text-secondary mb-2">
        <span className="text-tertiary">{icon}</span>
        <span className="font-label text-[11px] uppercase tracking-wide">{label}</span>
      </div>
      <div className="font-heading text-xl sm:text-2xl font-semibold text-white leading-tight">{value}</div>
      {sub && <div className="font-label text-xs text-secondary mt-1">{sub}</div>}
    </div>
  );
}

/** "Chiffres clés" — a hero result card + a grid of supporting indicators. */
export function CryptoKeyFigures({ result }: Props) {
  const { currency, symbol } = result;
  const gain = result.profitLoss >= 0;
  const accent = gain ? 'var(--success)' : 'var(--danger)';

  return (
    <div className="flex flex-col gap-4">
      {/* Hero result */}
      <div className="card-active relative overflow-hidden rounded-2xl p-5 sm:p-6">
        <div className="glow-blue absolute -right-10 -top-16 h-48 w-48" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-label text-[11px] uppercase tracking-wide text-secondary mb-1">
              Capital final
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-semibold text-white">
              {formatCurrency(result.finalValue, currency)}
            </div>
            <div className="mt-1 font-label text-sm" style={{ color: accent }}>
              {gain ? '+' : ''}
              {formatCurrency(result.profitLoss, currency)} de {gain ? 'gains' : 'pertes'}
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 font-heading text-lg font-semibold"
            style={{ background: `${accent}22`, color: accent }}
          >
            {gain ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            {formatPercent(result.performance)}
          </div>
        </div>
      </div>

      {/* Supporting indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Tile
          icon={<PiggyBank size={16} />}
          label="Total investi"
          value={formatCurrency(result.totalInvested, currency)}
        />
        <Tile
          icon={<Coins size={16} />}
          label={`Quantité acquise`}
          value={`${formatNumber(result.quantity, 2)}`}
          sub={symbol}
        />
        <Tile
          icon={<Tag size={16} />}
          label="Prix moyen d'achat"
          value={formatCurrency(result.avgPrice, currency, 2)}
        />
        <Tile icon={<Calendar size={16} />} label="Jours simulés" value={formatNumber(result.days, 0)} />
      </div>
    </div>
  );
}
