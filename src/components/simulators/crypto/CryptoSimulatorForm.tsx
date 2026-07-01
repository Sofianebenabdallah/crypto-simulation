import { useTranslation } from 'react-i18next';
import { SUPPORTED_ASSETS } from '../../../lib/crypto/assets';
import type { Frequency, SimulationInput } from '../../../types/crypto';
import { AssetCombobox } from './AssetCombobox';

interface Props {
  value: SimulationInput;
  onChange: (patch: Partial<SimulationInput>) => void;
  readonly?: boolean;
}

const FREQUENCIES: Frequency[] = ['daily', 'weekly', 'monthly'];

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
  const { t } = useTranslation();
  const disabled = !!readonly;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label={t('simulator.form.asset')}>
        <AssetCombobox
          assets={SUPPORTED_ASSETS}
          value={value.assetId}
          disabled={disabled}
          onChange={(assetId) => onChange({ assetId })}
        />
      </Field>

      <Field label={t('simulator.form.amountPerOperation')}>
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

      <Field label={t('simulator.form.frequency')}>
        <select
          className="input font-body"
          value={value.frequency}
          disabled={disabled}
          onChange={(e) => onChange({ frequency: e.target.value as Frequency })}
        >
          {FREQUENCIES.map((f) => (
            <option key={f} value={f} className="bg-[#030B1F]">
              {t(`simulator.form.frequencies.${f}`)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label={t('simulator.form.startDate')}>
          <input
            type="date"
            className="input"
            value={value.start}
            disabled={disabled}
            max={value.end}
            onChange={(e) => onChange({ start: e.target.value })}
          />
        </Field>
        <Field label={t('simulator.form.endDate')}>
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
