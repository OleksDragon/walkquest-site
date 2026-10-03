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

The current migration phase keeps the verified page content in `legacy-pages/`, while shared site chrome is rendered by Astro components. Route and article content will be moved into structured collections after output parity is confirmed.

The build keeps the existing `.html` URLs, emits all 240 localized pages, generates `sitemap.xml`, preserves the custom domain, and deploys through the official Astro GitHub Pages action.
