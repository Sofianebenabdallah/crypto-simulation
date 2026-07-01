# Theming

All visual tokens (colors, sizes, radius) live in `src/style/theme.css` as
CSS custom properties.

## Using theme tokens

In Tailwind: the config maps `bg-primary`, `text-primary`, `border-primary`,
`bg-secondary`, etc. to the CSS variables. Use them like any utility class.

For arbitrary values:
```tsx
<div className="rounded-[var(--border-radius)] bg-[color:var(--bg-secondary)]" />
```

Or use the prebuilt component classes:

| Class | Effect |
|-------|--------|
| `btn btn-primary` | Primary button (filled) |
| `btn btn-secondary` | Secondary button (outlined) |
| `btn btn-ghost` | Ghost button (transparent) |
| `card` | Padded surface with border + shadow |
| `input` | Text input / select with focus ring |
| `badge badge-{success\|info\|warning\|danger}` | Small status pill |

## The Theme Editor

A gear icon in the top-right of the preview opens the **Theme Editor**. It
lets you switch between presets (Moss, Mist, Clay, Dusk, Rose) or tweak
typography / colors live, then `Save theme` writes the change back to
`theme.css` via a postMessage to the parent (Krisspy canvas).

Show / hide the editor:
```js
window.dispatchEvent(new CustomEvent('storyloop-theme-editor-toggle', { detail: { open: true } }));
```
