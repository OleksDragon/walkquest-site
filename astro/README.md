# WalkQuest website (Astro migration)

This project builds the multilingual WalkQuest website as static HTML while preserving the existing public URLs.

## Commands

```sh
npm install
npm run dev
npm run build
npm run validate
npm run preview
```

Shared site chrome and route calls to action are rendered by Astro components. The six routes live in `src/data/routes/`, and the nine other page types live in `src/data/pages/`. Each page type has one JSON document containing all localized variants. There are no generated source HTML copies or migration-only import scripts.

SEO metadata is structured and type-checked in `src/lib/page-data.ts`. `BaseLayout.astro` renders titles, descriptions, canonical and hreflang links, Open Graph, Twitter cards, and JSON-LD directly instead of injecting a raw head fragment.

Page chrome is component-based: the landing page and information pages use dedicated Astro header/footer components, privacy intentionally uses a minimal shell, and body scripts are declared as structured data. Raw header, footer, and script HTML fields are rejected by validation.

The build keeps the existing `.html` URLs, emits all 240 localized pages, generates `sitemap.xml`, preserves the custom domain, and deploys through the official Astro GitHub Pages action.

New route work should copy an existing file in `src/data/routes/` and add the new slug to `src/lib/route-pages.ts`.
