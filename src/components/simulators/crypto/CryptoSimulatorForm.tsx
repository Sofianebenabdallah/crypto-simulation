import { SUPPORTED_ASSETS } from '../../../lib/crypto/assets';
import type { Frequency, SimulationInput } from '../../../types/crypto';

interface Props {
  value: SimulationInput;
  onChange: (patch: Partial<SimulationInput>) => void;
  readonly?: boolean;
}

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: 'daily', label: 'Quotidien' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'monthly', label: 'Mensuel' },
];

const CURRENCIES = ['EUR', 'USD'];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-label text-xs uppercase tracking-wide text-secondary leading-tight min-h-[2rem] flex items-start">{label}</span>
      {children}
    </label>
  );
}

/** Configuration block — asset, amount, frequency, date range. */
export function CryptoSimulatorForm({ value, onChange, readonly }: Props) {
  const disabled = !!readonly;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Actif numérique">
        <select
          className="input font-body"
          value={value.assetId}
          disabled={disabled}
          onChange={(e) => onChange({ assetId: e.target.value })}
        >
          {SUPPORTED_ASSETS.map((a) => (
            <option key={a.id} value={a.id} className="bg-[#030B1F]">
              {a.name} ({a.symbol})
            </option>
          ))}
        </select>
      </Field>

      <Field label="Montant par opération">
        <div className="relative">
          <input
            type="number"
            min={1}
            step={1}
            className="input pr-14"
            value={value.amount}
            disabled={disabled}
            onChange={(e) => onChange({ amount: Number(e.target.value) })}
          />
          <select
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-transparent text-secondary font-label text-sm outline-none"
            value={value.currency}
            disabled={disabled}
            onChange={(e) => onChange({ currency: e.target.value })}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c} className="bg-[#030B1F]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <Field label="Fréquence d'investissement">
        <select
          className="input font-body"
          value={value.frequency}
          disabled={disabled}
          onChange={(e) => onChange({ frequency: e.target.value as Frequency })}
        >
          {FREQUENCIES.map((f) => (
            <option key={f.value} value={f.value} className="bg-[#030B1F]">
              {f.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Date de début">
          <input
            type="date"
            className="input"
            value={value.start}
            disabled={disabled}
            max={value.end}
            onChange={(e) => onChange({ start: e.target.value })}
          />
        </Field>
        <Field label="Date de fin">
          <input
            type="date"
            className="input"
            value={value.end}
            disabled={disabled}
            min={value.start}
            onChange={(e) => onChange({ end: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
