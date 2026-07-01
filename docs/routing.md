# File-based routing

Pages live in `src/pages/`. Just create a file — the route appears automatically.

| File                          | Route        |
|-------------------------------|--------------|
| `pages/index.tsx`             | `/`          |
| `pages/about.tsx`             | `/about`     |
| `pages/blog/index.tsx`        | `/blog`      |
| `pages/blog/[slug].tsx`       | `/blog/:slug` |
| `pages/_layout.tsx`           | wraps every page |

The router is generated at build time by `src/App.tsx` via Vite's `import.meta.glob`. **Don't edit `App.tsx`** — just add files in `pages/`.

To read a dynamic param:

```tsx
import { useParams } from 'react-router-dom';
export default function Post() {
  const { slug } = useParams();
  return <div>Post: {slug}</div>;
}
```
