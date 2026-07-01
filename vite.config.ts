import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import krisspySourceTracker from './vite-plugin-krisspy-source-tracker.js';

// Krisspy stack — DO NOT edit unless you know what you're doing.
// The source-tracker plugin injects data-source-file / data-start-line /
// data-end-line / data-tracker-id attributes on every JSX element so the
// canvas visual inspector can locate a clicked DOM node back to its source.
export default defineConfig({
  plugins: [krisspySourceTracker(), react()],
  server: {
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: true
  },
});
