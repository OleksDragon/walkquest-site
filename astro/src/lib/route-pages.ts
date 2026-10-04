import fs from "node:fs";
import path from "node:path";
import type { ArticleBlock, PageData } from "./page-data";

const routeDataRoot = path.resolve("src/data/routes");
const cache = new Map<string, { slug: string; locales: Record<string, RoutePage> }>();

export const routeSlugs = new Set([
  "europe-explorer",
  "kyoto-autumn-temples",
  "greek-islands-odyssey",
  "iceland-ring-road",
  "route-66-usa",
  "around-the-world-lite",
]);

export interface RoutePage {
  page: PageData;
  detail: {
    copy: Record<string, string>;
    hero: { className: string; tag: string; title: string; lead: string; image: string; alt: string; chips: Array<{ key?: string; literal?: string; label?: string }> };
    jumpLinks: Array<{ href: string; label: string }>;
    stats: Array<{ key?: string; literal?: string; label: string }>;
    introBlocks: ArticleBlock[];
    features: Array<{ emoji: string; title: string; text: string }>;
    ribbon: { className: string; label: string; stops: Array<{ at: string; name: string; distance: string }> };
    itinerary: { title: string; paragraphs: string[] };
    cities: Array<{ className: string; id: string; number: string; distance: string; name: string; country: string; description: string; factLabel: string; fact: string }>;
    crossing: { className: string; id?: string; visual: string[]; kicker: string; title: string; text: string; items: Array<{ title: string; text: string }> };
    postBlocks: ArticleBlock[];
    faq: { title: string; id?: string; items: Array<{ title?: string; literalTitle?: string; text: string }> };
    cta: { kicker: string; title: string; text: string };
  };
  playLabel: string;
}

export function isRouteFile(relativePath: string): boolean {
  const filename = relativePath.split("/").at(-1) ?? "";
  return routeSlugs.has(filename.replace(/\.html$/, ""));
}

export function getRoutePage(relativePath: string): RoutePage {
  const parts = relativePath.split("/");
  const slug = (parts.at(-1) ?? "").replace(/\.html$/, "");
  const locale = parts.length === 1 ? "en" : parts[0];
  let data = cache.get(slug);
  if (!data) {
    data = JSON.parse(fs.readFileSync(path.join(routeDataRoot, `${slug}.json`), "utf8"));
    cache.set(slug, data!);
  }
  const route = data?.locales[locale];
  if (!route) throw new Error(`Missing structured route data for ${relativePath}`);
  return route;
}
