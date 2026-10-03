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

Shared site chrome and route calls to action are rendered by Astro components. The six routes live in `src/data/routes/`, and the nine other page types live in `src/data/pages/`. Each page type has one JSON document containing all localized variants. There are no generated source HTML copies.

The build keeps the existing `.html` URLs, emits all 240 localized pages, generates `sitemap.xml`, preserves the custom domain, and deploys through the official Astro GitHub Pages action.

The two scripts named `import-*-data.mjs` document the one-time conversion of the former HTML snapshots. New route work should copy an existing file in `src/data/routes/` and add the new slug to `src/lib/route-pages.ts`.
