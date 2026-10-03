import fs from "node:fs";
import path from "node:path";

const legacyRoot = path.resolve("legacy-pages");

export interface LegacyPage {
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

function capture(source: string, expression: RegExp, fallback = ""): string {
  return source.match(expression)?.[1]?.trim() ?? fallback;
}

function text(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#039;/g, "'").trim();
}

function label(source: string, key: string): string {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text(capture(source, new RegExp(`<[^>]+data-i18n=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`)));
}

function bodyAttributes(source: string): Record<string, string> {
  const opening = capture(source, /<body\s*([^>]*)>/i);
  const attributes: Record<string, string> = {};
  for (const match of opening.matchAll(/([:\w-]+)="([^"]*)"/g)) attributes[match[1]] = match[2];
  return attributes;
}

export function getLegacyPage(relativePath: string): LegacyPage {
  const normalized = relativePath.replaceAll("\\", "/");
  const source = fs.readFileSync(path.join(legacyRoot, ...normalized.split("/")), "utf8");
  const headHtml = capture(source, /<head>([\s\S]*?)<\/head>/i);
  const headerHtml = capture(source, /(<header class="site-header"[\s\S]*?<\/header>)/i);
  const mainHtml = capture(source, /(<main\b[\s\S]*<\/main>)/i);
  const footerHtml = capture(source, /(<footer\b[\s\S]*?<\/footer>)/i);
  const scriptsHtml = capture(source, /(<script\s+src=[\s\S]*?)<\/body>/i);
  const attributes = bodyAttributes(source);
  const htmlAttributes = capture(source, /<html\s+([^>]*)>/i);
  const lang = capture(htmlAttributes, /lang="([^"]+)"/i, "en");
  const dir = capture(htmlAttributes, /dir="([^"]+)"/i, lang === "ar" ? "rtl" : "ltr");

  return {
    relativePath: normalized,
    lang,
    dir,
    headHtml,
    bodyAttributes: attributes,
    headerHtml,
    mainHtml,
    footerHtml,
    scriptsHtml,
    isInfoSite: (attributes.class ?? "").split(/\s+/).includes("info-site"),
    labels: {
      skipLink: text(capture(source, /<a class="skip-link"[^>]*>([\s\S]*?)<\/a>/i, "Skip to content")),
      navHome: label(headerHtml, "navHome"),
      navGuide: label(headerHtml, "navGuide"),
      navRoutes: label(headerHtml, "navRoutes"),
      navPremium: label(headerHtml, "navPremium"),
      navNews: label(headerHtml, "navNews"),
      navPrivacy: label(headerHtml, "navPrivacy"),
      languageLabel: label(headerHtml, "languageLabel"),
      footerTagline: label(footerHtml, "footerTagline"),
      footerRights: label(footerHtml, "footerRights"),
    },
  };
}

export function listLegacyPages(): string[] {
  return fs.readdirSync(legacyRoot, { recursive: true, encoding: "utf8" })
    .filter((entry: string) => entry.endsWith(".html"))
    .map((entry: string) => entry.replaceAll("\\", "/"))
    .sort();
}
