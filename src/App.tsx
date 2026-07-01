import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

/**
 * File-based routing — DO NOT EDIT.
 *
 * Pages live in `src/pages/**`. Just create a file and a route appears:
 *   src/pages/index.tsx        → /
 *   src/pages/about.tsx        → /about
 *   src/pages/blog/index.tsx   → /blog
 *   src/pages/blog/[slug].tsx  → /blog/:slug
 *
 * Optional layout: `src/pages/_layout.tsx` (default export) wraps every page.
 * Agents never need to edit this file: they only create / modify pages.
 */

const pageModules = import.meta.glob('./pages/**/*.tsx', { eager: false });
const layoutModules = import.meta.glob('./pages/_layout.tsx', { eager: true }) as Record<string, { default: React.ComponentType<{ children: React.ReactNode }> }>;

function fileToRoute(filePath: string): string {
  // ./pages/blog/[slug].tsx → /blog/:slug
  let p = filePath
    .replace(/^\.\/pages/, '')
    .replace(/\.tsx$/, '')
    .replace(/\/index$/, '/')
    .replace(/\[([^\]]+)\]/g, ':$1');
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

const routes = Object.entries(pageModules)
  // Skip files starting with _ (layouts, helpers)
  .filter(([file]) => !/\/_[^/]+\.tsx$/.test(file))
  .map(([file, loader]) => ({
    path: fileToRoute(file),
    Component: lazy(loader as any),
  }));

const RootLayout = layoutModules['./pages/_layout.tsx']?.default;

function PageWrap({ children }: { children: React.ReactNode }) {
  return RootLayout ? <RootLayout>{children}</RootLayout> : <>{children}</>;
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading…</div>}>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<PageWrap><Component /></PageWrap>} />
        ))}
        <Route path="*" element={<PageWrap><div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-2">404</h1><p className="text-slate-400">Page not found</p></div></div></PageWrap>} />
      </Routes>
    </Suspense>
  );
}
