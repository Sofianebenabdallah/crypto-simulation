import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SimulationInput } from '../../../types/crypto';
import { DEFAULT_CONFIG, serializeEmbedParams } from '../../../lib/crypto/queryParams';
import { CryptoSimulatorForm } from './CryptoSimulatorForm';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Seed the modal with the simulator's current configuration. */
  initialInput?: SimulationInput;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-label text-xs uppercase tracking-wide text-secondary">{label}</span>
      <div className="flex items-stretch gap-2">
        <code className="input font-body flex-1 overflow-x-auto whitespace-nowrap text-xs leading-6 text-primary/90">
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="btn btn-outline shrink-0 !px-3"
          aria-label={t('embed.copy', { label })}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}

/** YouTube-style "embed" modal: configure params, preview, copy URL & iframe. */
export function EmbedModal({ open, onClose, initialInput }: Props) {
  const { t } = useTranslation();
  const [input, setInput] = useState<SimulationInput>(
    initialInput ?? {
      assetId: DEFAULT_CONFIG.assetId,
      currency: DEFAULT_CONFIG.currency,
      amount: DEFAULT_CONFIG.amount,
      frequency: DEFAULT_CONFIG.frequency,
      start: DEFAULT_CONFIG.start,
      end: DEFAULT_CONFIG.end,
    },
  );
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [readonly, setReadonly] = useState(false);
  const [height, setHeight] = useState(760);

  // Sync with the live simulator config each time the modal opens.
  useEffect(() => {
    if (open && initialInput) setInput(initialInput);
  }, [open, initialInput]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const query = useMemo(
    () => serializeEmbedParams({ ...input, layout: false, theme, readonly }),
    [input, theme, readonly],
  );

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${origin}/crypto/embed?${query}`;
  const iframe = `<iframe src="${url}" width="100%" height="${height}" style="border:0;border-radius:16px;overflow:hidden" title="Simulateur crypto DCA" loading="lazy"></iframe>`;

  if (!open) return null;

  const patch = (p: Partial<SimulationInput>) => setInput((prev) => ({ ...prev, ...p }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t('embed.title')}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative my-4 w-full max-w-5xl rounded-[20px] border shadow-2xl"
        style={{ background: '#050E24', borderColor: 'var(--border)' }}
      >
        <header
          className="flex items-center justify-between gap-4 border-b px-6 py-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <div>
            <h2 className="font-heading text-lg font-semibold text-primary">{t('embed.title')}</h2>
            <p className="text-xs text-secondary">
              {t('embed.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-secondary transition-colors hover:bg-white/10 hover:text-primary"
            aria-label={t('embed.close')}
          >
            <X size={20} />
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          {/* Left — configuration */}
          <div className="flex flex-col gap-5">
            <CryptoSimulatorForm value={input} onChange={patch} />

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-xs uppercase tracking-wide text-secondary">{t('embed.theme')}</span>
                <select
                  className="input font-body"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                >
                  <option value="dark" className="bg-[#030B1F]">{t('embed.themeDark')}</option>
                  <option value="light" className="bg-[#030B1F]">{t('embed.themeLight')}</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-xs uppercase tracking-wide text-secondary">{t('embed.height')}</span>
                <input
                  type="number"
                  min={400}
                  step={20}
                  className="input"
                  value={height}
                  onChange={(e) => setHeight(Math.max(400, Number(e.target.value) || 0))}
                />
              </label>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--primary)]"
                checked={readonly}
                onChange={(e) => setReadonly(e.target.checked)}
              />
              <span className="text-sm text-primary">
                {t('embed.lockFields')}
                <span className="text-secondary">{t('embed.lockFieldsHint')}</span>
              </span>
            </label>

            <div className="flex flex-col gap-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
              <CopyField label={t('embed.directLink')} value={url} />
              <CopyField label={t('embed.iframeCode')} value={iframe} />
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="link-arrow self-start text-sm"
              >
                <ExternalLink size={15} /> {t('embed.openNewTab')}
              </a>
            </div>
          </div>

          {/* Right — live preview */}
          <div className="flex flex-col gap-2">
            <span className="font-label text-xs uppercase tracking-wide text-secondary">{t('embed.preview')}</span>
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: 'var(--border)', height: 'min(70vh, 620px)' }}
            >
              <iframe
                key={query}
                src={url}
                title={t('embed.preview')}
                className="h-full w-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
