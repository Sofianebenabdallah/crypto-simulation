import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeEditor } from './style/ThemeEditor';
import './i18n';
import './style/theme.css';
import './index.css';

// Visual inspector — click-to-edit / element capture / hide-element. Loaded
// async so it never blocks the first paint; failure to load is silent.
import('./visual-inspector.js').catch(() => {});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ThemeEditor />
    </BrowserRouter>
  </React.StrictMode>,
);
