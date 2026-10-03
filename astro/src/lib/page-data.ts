import fs from "node:fs";
import path from "node:path";

const pageDataRoot = path.resolve("src/data/pages");
const routeDataRoot = path.resolve("src/data/routes");
const cache = new Map<string, { slug: string; locales: Record<string, PageData> }>();

export interface PageData {
  relativePath: string;
  lang: string;
  dir: string;
  headHtml: string;
  bodyAttributes: Record<string, string>;
  headerHtml: string;
  mainHtml: string;
  footerHtml: string;
  scriptsHtml: string;
  labels: Record<string, string>;
  isInfoSite: boolean;
}

export function getPageData(relativePath: string): PageData {
  const normalized = relativePath.replaceAll("\\", "/");
  const parts = normalized.split("/");
  const slug = (parts.at(-1) ?? "").replace(/\.html$/, "");
  const locale = parts.length === 1 ? "en" : parts[0];
  let data = cache.get(slug);
  if (!data) {
    data = JSON.parse(fs.readFileSync(path.join(pageDataRoot, `${slug}.json`), "utf8"));
    cache.set(slug, data!);
  }
  const page = data?.locales[locale];
  if (!page) throw new Error(`Missing structured page data for ${relativePath}`);
  return page;
}

export function listPageFiles(): string[] {
  return [pageDataRoot, routeDataRoot].flatMap((directory) => fs.readdirSync(directory)
    .filter((entry) => entry.endsWith(".json"))
    .flatMap((entry) => {
      const data = JSON.parse(fs.readFileSync(path.join(directory, entry), "utf8"));
      return Object.keys(data.locales).map((locale) => locale === "en" ? `${data.slug}.html` : `${locale}/${data.slug}.html`);
    })).sort();
}
