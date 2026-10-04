import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const errors = [];
const routeSlugs = new Set(["europe-explorer", "kyoto-autumn-temples", "greek-islands-odyssey", "iceland-ring-road", "route-66-usa", "around-the-world-lite"]);
const expectedLocales = new Set(["en", "uk", "ru", "es", "de", "fr", "pl", "pt", "it", "tr", "ja", "ko", "zh-cn", "ar", "hi", "pt-br"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function localTarget(page, reference) {
  const clean = reference.split(/[?#]/)[0];
  if (!clean || /^(?:https?:|data:|mailto:|tel:)/.test(clean)) return null;
  return clean.startsWith("/") ? path.join(root, clean) : path.resolve(path.dirname(page), clean);
}

if (!fs.existsSync(root)) throw new Error("dist/ does not exist. Run npm run build first.");

let sourcePageCount = 0;
for (const directory of [path.resolve("src/data/pages"), path.resolve("src/data/routes")]) {
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith(".json"))) {
    const document = JSON.parse(fs.readFileSync(path.join(directory, filename), "utf8"));
    const locales = Object.keys(document.locales);
    if (locales.length !== expectedLocales.size || locales.some((locale) => !expectedLocales.has(locale))) {
      errors.push(`${filename}: expected the complete 16-locale set.`);
    }
    for (const [locale, localized] of Object.entries(document.locales)) {
      const page = localized.page ?? localized;
      const head = page.head;
      sourcePageCount += 1;
      if (page.headHtml || !head) errors.push(`${filename}:${locale}: head data is not structured.`);
      if (page.headerHtml || page.footerHtml || page.scriptsHtml || "isInfoSite" in page) {
        errors.push(`${filename}:${locale}: page shell still contains raw HTML fields.`);
      }
      if (!["landing", "site", "privacy"].includes(page.chrome) || !Array.isArray(page.bodyScripts)) {
        errors.push(`${filename}:${locale}: invalid page chrome or body scripts.`);
      }
      if (page.chrome === "privacy" && (page.mainHtml || !page.privacy?.blocks?.length)) {
        errors.push(`${filename}:${locale}: privacy content is not structured.`);
      }
      if (!head?.title || !head.description || !head.canonical) errors.push(`${filename}:${locale}: incomplete SEO head data.`);
      if (head?.alternates?.length !== 17) errors.push(`${filename}:${locale}: expected 17 hreflang links.`);
      if (!Array.isArray(head?.structuredData) || !Array.isArray(head?.scripts) || !Array.isArray(head?.inlineStyles)) {
        errors.push(`${filename}:${locale}: invalid structured head collections.`);
      }
    }
  }
}
if (sourcePageCount !== 240) errors.push(`Expected 240 source page records, found ${sourcePageCount}.`);

const pages = walk(root).filter((file) => file.endsWith(".html"));
if (pages.length !== 240) errors.push(`Expected 240 HTML pages, found ${pages.length}.`);

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const relative = path.relative(root, page).replaceAll("\\", "/");
  for (const required of ['<link rel="canonical"', 'hreflang="x-default"', '<meta name="description"', "<main"]) {
    if (!html.includes(required)) errors.push(`${relative}: missing ${required}`);
  }
  if ([...html.matchAll(/<link rel="canonical"/g)].length !== 1) errors.push(`${relative}: expected one canonical link.`);
  if ([...html.matchAll(/<link rel="alternate" hreflang=/g)].length !== 17) errors.push(`${relative}: expected 17 hreflang links.`);
  for (const required of ['property="og:title"', 'property="og:image"', 'name="twitter:card"', 'name="twitter:title"']) {
    if (!html.includes(required)) errors.push(`${relative}: missing ${required}`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${relative}: invalid JSON-LD.`); }
  }
  if (relative.startsWith("ar/") && !/<html\s+lang="ar"\s+dir="rtl">/.test(html)) {
    errors.push(`${relative}: Arabic page is not RTL.`);
  }
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const target = localTarget(page, match[1]);
    if (target && !fs.existsSync(target)) errors.push(`${relative}: missing local resource ${match[1]}`);
  }
  for (const match of html.matchAll(/https:\/\/play\.google\.com\/store\/apps\/details\?[^"']*/g)) {
    if (!match[0].includes("id=com.walkquest")) errors.push(`${relative}: wrong Google Play package URL.`);
  }
  if (routeSlugs.has(path.basename(page, ".html"))) {
    const routeCtas = [...html.matchAll(/class="play-button light-button"/g)].length;
    const completeIcons = [...html.matchAll(/M3\.9 35\.6l14\.2-8\.1/g)].length;
    if (routeCtas !== 1 || completeIcons !== 1) errors.push(`${relative}: route CTA is not using one complete shared Google Play icon.`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapCount = [...sitemap.matchAll(/<url>/g)].length;
if (sitemapCount !== 240) errors.push(`Expected 240 sitemap URLs, found ${sitemapCount}.`);
if (!fs.existsSync(path.join(root, "CNAME"))) errors.push("CNAME is missing.");
if (!fs.existsSync(path.join(root, ".nojekyll"))) errors.push(".nojekyll is missing.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${sourcePageCount} typed page records, ${pages.length} pages, ${sitemapCount} sitemap URLs, SEO metadata, RTL, local resources and Google Play links.`);
