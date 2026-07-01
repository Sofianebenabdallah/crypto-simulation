import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CryptoAsset } from '../../../types/crypto';

interface Props {
  assets: CryptoAsset[];
  value: string;
  onChange: (assetId: string) => void;
  disabled?: boolean;
}

/** Searchable, keyboard-friendly asset picker themed on the design system. */
export function AssetCombobox({ assets, value, onChange, disabled }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = assets.find((a) => a.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter(
      (a) => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q),
    );
  }, [assets, query]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  // Focus the search field & reset state when opening.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(Math.max(0, filtered.findIndex((a) => a.id === value)));
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the active option in view.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  function commit(asset: CryptoAsset) {
    onChange(asset.id);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const asset = filtered[active];
      if (asset) commit(asset);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        className="input font-body flex items-center justify-between gap-2 text-left"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span className={selected ? 'text-primary' : 'text-secondary'}>
          {selected ? `${selected.name} (${selected.symbol})` : t('simulator.combobox.select')}
        </span>
        <ChevronDown
          size={16}
          className="shrink-0 text-secondary transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-[var(--border-radius)] border shadow-2xl"
          style={{ background: '#050E24', borderColor: 'var(--border)' }}
        >
          <div className="relative border-b" style={{ borderColor: 'var(--border)' }}>
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder={t('simulator.combobox.search')}
              className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm text-primary outline-none placeholder:text-secondary/60"
            />
          </div>

          <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-sm text-secondary">{t('simulator.combobox.empty')}</li>
            )}
            {filtered.map((a, i) => {
              const isSelected = a.id === value;
              const isActive = i === active;
              return (
                <li
                  key={a.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(a)}
                  className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm"
                  style={{ background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary">{a.name}</span>
                    <span className="text-xs text-secondary">{a.symbol}</span>
                  </span>
                  {isSelected && <Check size={15} style={{ color: 'var(--secondary)' }} />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
