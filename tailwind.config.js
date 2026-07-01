/** @type {import('tailwindcss').Config} */

// Build a full 50→900 palette from a single CSS variable using `color-mix`.
// Each shade is "mix N% of var with white/black", giving a Tailwind-like
// scale (primary-50, primary-100, …, primary-900) without hardcoding hexes.
//
// Use it like:
//   bg-primary-500   text-primary-700   border-primary-100
//   bg-secondary-50  hover:bg-tertiary-600  ring-neutral-200
const scale = (cssVar) => ({
  DEFAULT: `var(${cssVar})`,
  50:  `color-mix(in srgb, var(${cssVar}) 6%,  white)`,
  100: `color-mix(in srgb, var(${cssVar}) 12%, white)`,
  200: `color-mix(in srgb, var(${cssVar}) 24%, white)`,
  300: `color-mix(in srgb, var(${cssVar}) 40%, white)`,
  400: `color-mix(in srgb, var(${cssVar}) 70%, white)`,
  500: `var(${cssVar})`,
  600: `color-mix(in srgb, var(${cssVar}) 85%, black)`,
  700: `color-mix(in srgb, var(${cssVar}) 70%, black)`,
  800: `color-mix(in srgb, var(${cssVar}) 55%, black)`,
  900: `color-mix(in srgb, var(${cssVar}) 40%, black)`,
});

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Theme colors are CSS variables (see src/style/theme.css).
      // Each name exposes both the bare token (`bg-primary`) and a full
      // 50→900 scale (`bg-primary-100`, `text-primary-700`, …).
      colors: {
        primary: scale('--primary'),
        secondary: scale('--secondary'),
        tertiary: scale('--tertiary'),
        neutral: scale('--neutral'),
        success: scale('--success'),
        danger: scale('--danger'),
        warning: scale('--warning'),
      },
      fontFamily: {
        // Override with whatever lives in --font-heading / --font-body / --font-label.
        // CSS variables let the ThemeEditor (or theme.css) swap them at runtime.
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
        label:   ['var(--font-label)',   'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
        token:   'var(--border-radius)',
      },
    },
  },
  plugins: [],
};
