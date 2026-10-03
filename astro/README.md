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

Shared site chrome and route calls to action are rendered by Astro components. The six routes live in `src/data/routes/`, one JSON document per route with all localized variants. The remaining non-route pages stay in `legacy-pages/` until their component migration is complete.

The build keeps the existing `.html` URLs, emits all 240 localized pages, generates `sitemap.xml`, preserves the custom domain, and deploys through the official Astro GitHub Pages action.

`scripts/import-route-data.mjs` documents the one-time import used to convert the former route HTML snapshots. New route work should copy an existing file in `src/data/routes/` and add the new slug to `src/lib/route-pages.ts`.
