import fs from "node:fs";
import path from "node:path";
import type { LegacyPage } from "./legacy-pages";

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
  page: LegacyPage;
  beforeCtaHtml: string;
  afterCtaHtml: string;
  ctaCopyHtml: string;
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
