import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { cn } from '../../lib/cn';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n';

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  short: string;
}

const LANGUAGES: Record<SupportedLanguage, LanguageOption> = {
  en: { code: 'en', label: 'English', short: 'EN' },
  fr: { code: 'fr', label: 'Français', short: 'FR' },
};

export interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Compact language picker. Drop it top-right on any page:
 *   <div className="absolute right-4 top-4 z-20"><LanguageSwitcher /></div>
 * Switches the app language via i18next and persists it (localStorage cache).
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = (SUPPORTED_LANGUAGES as readonly string[]).includes(i18n.language)
    ? (i18n.language as SupportedLanguage)
    : 'en';

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const change = (code: SupportedLanguage) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('common.language')}
        className="glass-card inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-label text-sm text-white transition-colors hover:border-secondary/40"
        style={{ borderRadius: 999 }}
      >
        <Globe size={16} className="text-secondary" />
        <span>{LANGUAGES[current].short}</span>
        <ChevronDown
          size={14}
          className={cn('text-secondary transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="glass-card absolute right-0 z-30 mt-2 min-w-[160px] overflow-hidden p-1.5"
        >
          {SUPPORTED_LANGUAGES.map((code) => {
            const opt = LANGUAGES[code];
            const active = code === current;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => change(code)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left font-label text-sm transition-colors',
                    active ? 'text-white' : 'text-secondary hover:text-white',
                  )}
                  style={active ? { backgroundColor: 'var(--primary)' } : undefined}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] opacity-70">{opt.short}</span>
                    {opt.label}
                  </span>
                  {active && <Check size={15} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
