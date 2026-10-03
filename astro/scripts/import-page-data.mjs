import fs from "node:fs";
import path from "node:path";

const root = path.resolve("legacy-pages");
const output = path.resolve("src/data/pages");
const pages = ["index", "rules", "routes", "premium", "news", "sharing-achievements", "release-notes", "health-connect-guide", "privacy"];
const locales = ["en", "uk", "ru", "es", "de", "fr", "pl", "pt", "it", "tr", "ja", "ko", "zh-cn", "ar", "hi", "pt-br"];

function capture(source, expression, fallback = "") {
  return source.match(expression)?.[1]?.trim() ?? fallback;
}

function text(value) {
  return value.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#039;/g, "'").trim();
}

function label(source, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text(capture(source, new RegExp(`<[^>]+data-i18n=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`)));
}

function parse(source, relativePath) {
  const headHtml = capture(source, /<head>([\s\S]*?)<\/head>/i);
  const headerHtml = capture(source, /(<header class="site-header"[\s\S]*?<\/header>)/i);
  const mainHtml = capture(source, /(<main\b[\s\S]*<\/main>)/i);
  const footerHtml = capture(source, /(<footer\b[\s\S]*?<\/footer>)/i);
  const scriptsHtml = capture(source, /(<script\s+src=[\s\S]*?)<\/body>/i);
  const bodyOpening = capture(source, /<body\s*([^>]*)>/i);
  const bodyAttributes = Object.fromEntries([...bodyOpening.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
  const htmlAttributes = capture(source, /<html\s+([^>]*)>/i);
  const lang = capture(htmlAttributes, /lang="([^"]+)"/i, "en");
  const dir = capture(htmlAttributes, /dir="([^"]+)"/i, lang === "ar" ? "rtl" : "ltr");
  return {
    relativePath, lang, dir, headHtml, bodyAttributes, headerHtml, mainHtml, footerHtml, scriptsHtml,
    isInfoSite: (bodyAttributes.class ?? "").split(/\s+/).includes("info-site"),
    labels: {
      skipLink: text(capture(source, /<a class="skip-link"[^>]*>([\s\S]*?)<\/a>/i, "Skip to content")),
      navHome: label(headerHtml, "navHome"), navGuide: label(headerHtml, "navGuide"), navRoutes: label(headerHtml, "navRoutes"),
      navPremium: label(headerHtml, "navPremium"), navNews: label(headerHtml, "navNews"), navPrivacy: label(headerHtml, "navPrivacy"),
      languageLabel: label(headerHtml, "languageLabel"), footerTagline: label(footerHtml, "footerTagline"), footerRights: label(footerHtml, "footerRights"),
    },
  };
}

fs.mkdirSync(output, { recursive: true });
for (const slug of pages) {
  const entries = {};
  for (const locale of locales) {
    const relativePath = locale === "en" ? `${slug}.html` : `${locale}/${slug}.html`;
    entries[locale] = parse(fs.readFileSync(path.join(root, ...relativePath.split("/")), "utf8"), relativePath);
  }
  fs.writeFileSync(path.join(output, `${slug}.json`), `${JSON.stringify({ slug, locales: entries }, null, 2)}\n`);
}

console.log(`Imported ${pages.length} pages and ${pages.length * locales.length} localized documents.`);
