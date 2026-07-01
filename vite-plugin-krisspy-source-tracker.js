import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import * as t from '@babel/types';

const traverse = _traverse.default ?? _traverse;
const generate = _generate.default ?? _generate;

const SKIP_FILES = new Set(['visual-inspector.js']);

function injectSourceAttrs(code, filePath) {
  if (!code || !code.includes('<')) return null;
  if (SKIP_FILES.has(filePath.split('/').pop())) return null;
  if (code.includes('data-source-file=')) return null;

  let ast;
  try {
    ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch {
    return null;
  }

  let modified = false;
  traverse(ast, {
    JSXOpeningElement(path) {
      const name = path.node.name;
      // Only inject on host elements (lowercase tag names): div, span, button…
      // React components (uppercase) accept data-* via spread, but injecting
      // there causes "Unknown prop" warnings and breaks typed components.
      if (!t.isJSXIdentifier(name)) return;
      const tag = name.name;
      if (tag[0] !== tag[0].toLowerCase()) return;

      const hasAttr = path.node.attributes.some(
        (a) => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name) && a.name.name === 'data-source-file',
      );
      if (hasAttr) return;

      const elementNode = path.parent;
      const openingLoc = path.node.loc;
      const elementLoc = elementNode && elementNode.loc ? elementNode.loc : openingLoc;
      if (!openingLoc || !elementLoc) return;

      const startLine = openingLoc.start.line;
      const endLine = elementLoc.end.line;
      const trackerId = filePath + ':' + startLine;

      const attrs = [
        ['data-source-file', filePath],
        ['data-start-line', String(startLine)],
        ['data-end-line', String(endLine)],
        ['data-tracker-id', trackerId],
      ].map(([k, v]) =>
        t.jsxAttribute(t.jsxIdentifier(k), t.stringLiteral(v)),
      );

      path.node.attributes.push(...attrs);
      modified = true;
    },
  });

  if (!modified) return null;
  return generate(ast, { retainLines: true, compact: false }).code;
}

export default function krisspySourceTracker() {
  return {
    name: 'krisspy-source-tracker',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id)) return null;
      if (id.includes('/node_modules/')) return null;
      // Strip the absolute prefix so the inspector gets a stable relative path
      // (e.g. "/src/pages/index.tsx").
      const rel = id.replace(process.cwd(), '').replace(/^\/+/, '/');
      const out = injectSourceAttrs(code, rel);
      if (!out) return null;
      return { code: out, map: null };
    },
  };
}
