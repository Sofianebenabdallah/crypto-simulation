export interface ThemePreset {
  name: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  fontSize: string;
  radius: string;
}

export const themePresets: ThemePreset[] = [
  {
    // Signature S'investir dark theme (matches the Figma landing page)
    name: 'S’investir',
    primary: '#0049C6', primaryHover: '#0056EA', secondary: '#1098F7',
    bgPrimary: '#000519', bgSecondary: '#030B1F', bgTertiary: '#061230',
    textPrimary: '#FFFFFF', textSecondary: 'rgba(255,255,255,0.72)', border: 'rgba(255,255,255,0.10)',
    fontSize: '16px', radius: '16px',
  },
  {
    // Deeper, higher-contrast variant
    name: 'Midnight',
    primary: '#1D4ED8', primaryHover: '#2563EB', secondary: '#38BDF8',
    bgPrimary: '#01030F', bgSecondary: '#050B1C', bgTertiary: '#0A1730',
    textPrimary: '#FFFFFF', textSecondary: 'rgba(255,255,255,0.68)', border: 'rgba(255,255,255,0.08)',
    fontSize: '16px', radius: '18px',
  },
  {
    // Warmer azure accent for a lighter feel
    name: 'Azure',
    primary: '#0066FF', primaryHover: '#1A75FF', secondary: '#22D3EE',
    bgPrimary: '#020A1A', bgSecondary: '#061428', bgTertiary: '#0C1E3A',
    textPrimary: '#FFFFFF', textSecondary: 'rgba(255,255,255,0.74)', border: 'rgba(255,255,255,0.12)',
    fontSize: '16px', radius: '14px',
  },
  {
    name: 'Moss',
    primary: '#059669', primaryHover: '#047857', secondary: '#10b981',
    bgPrimary: '#f0fdf4', bgSecondary: '#dcfce7', bgTertiary: '#bbf7d0',
    textPrimary: '#14532d', textSecondary: '#166534', border: '#86efac',
    fontSize: '15px', radius: '8px',
  },
  {
    name: 'Mist',
    primary: '#64748b', primaryHover: '#475569', secondary: '#94a3b8',
    bgPrimary: '#f8fafc', bgSecondary: '#f1f5f9', bgTertiary: '#e2e8f0',
    textPrimary: '#1e293b', textSecondary: '#475569', border: '#cbd5e1',
    fontSize: '16px', radius: '6px',
  },
  {
    name: 'Clay',
    primary: '#c2410c', primaryHover: '#9a3412', secondary: '#ea580c',
    bgPrimary: '#fff7ed', bgSecondary: '#ffedd5', bgTertiary: '#fed7aa',
    textPrimary: '#431407', textSecondary: '#7c2d12', border: '#fdba74',
    fontSize: '17px', radius: '16px',
  },
  {
    name: 'Dusk',
    primary: '#7c3aed', primaryHover: '#6d28d9', secondary: '#a78bfa',
    bgPrimary: '#faf5ff', bgSecondary: '#f3e8ff', bgTertiary: '#e9d5ff',
    textPrimary: '#2e1065', textSecondary: '#5b21b6', border: '#c4b5fd',
    fontSize: '16px', radius: '20px',
  },
  {
    name: 'Rose',
    primary: '#be123c', primaryHover: '#9f1239', secondary: '#e11d48',
    bgPrimary: '#fff1f2', bgSecondary: '#ffe4e6', bgTertiary: '#fecdd3',
    textPrimary: '#4c0519', textSecondary: '#881337', border: '#fda4af',
    fontSize: '15px', radius: '10px',
  },
];
