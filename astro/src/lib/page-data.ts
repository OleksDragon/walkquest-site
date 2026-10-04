import fs from "node:fs";
import path from "node:path";

const pageDataRoot = path.resolve("src/data/pages");
const routeDataRoot = path.resolve("src/data/routes");
const cache = new Map<string, { slug: string; locales: Record<string, PageData> }>();

export interface HeadData {
  charset: string;
  title: string;
  description: string;
  robots: string;
  themeColor?: string;
  canonical: string;
  alternates: Array<{ lang: string; href: string }>;
  icon?: { href: string; type?: string };
  preconnects: Array<{ href: string; crossOrigin: boolean }>;
  stylesheets: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imageWidth?: string;
    imageHeight?: string;
    url: string;
    type: string;
    siteName: string;
    locale: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    url: string;
  };
  structuredData: Array<Record<string, unknown>>;
  scripts: Array<{ src: string; defer: boolean }>;
  inlineStyles: string[];
}

export type InlineNode =
  | { type: "text" | "strong"; text: string }
  | { type: "link"; text: string; href: string; external: boolean; strong: boolean };

export type PrivacyBlock =
  | { type: "heading"; level: 1 | 2; content: InlineNode[] }
  | { type: "paragraph"; updated: boolean; content: InlineNode[] }
  | { type: "list"; items: InlineNode[][] };

export interface PrivacyContent {
  backLabel: string;
  languageLabel: string;
  blocks: PrivacyBlock[];
}

export interface PageData {
  relativePath: string;
  lang: string;
  dir: string;
  head: HeadData;
  bodyAttributes: Record<string, string>;
  mainHtml?: string;
  privacy?: PrivacyContent;
  chrome: "landing" | "site" | "privacy";
  bodyScripts: Array<{ src: string; defer: boolean }>;
  labels: Record<string, string>;
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
