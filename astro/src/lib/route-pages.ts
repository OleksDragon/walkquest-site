import { getLegacyPage, type LegacyPage } from "./legacy-pages";

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
  const page = getLegacyPage(relativePath);
  const match = page.mainHtml.match(
    /^([\s\S]*?)<section class="page-cta"><div class="shell page-cta-card"><div>([\s\S]*?)<\/div><a class="play-button light-button"[\s\S]*?<small[^>]*>([\s\S]*?)<\/small>[\s\S]*?<\/a><\/div><\/section>([\s\S]*)$/,
  );
  if (!match) throw new Error(`Unable to parse route CTA in ${relativePath}`);
  return {
    page,
    beforeCtaHtml: match[1],
    ctaCopyHtml: match[2],
    playLabel: match[3].replace(/<[^>]+>/g, "").trim(),
    afterCtaHtml: match[4],
  };
}
