import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const errors = [];
const legacyRouteSlugs = ["europe-explorer", "kyoto-autumn-temples", "greek-islands-odyssey", "iceland-ring-road", "route-66-usa", "around-the-world-lite"];
const newRouteSlugs = ["italy-dream", "japan-tour", "nordic-route", "camino-de-santiago", "silk-road-journey", "ancient-egypt", "australia-coast", "alps-journey", "around-ukraine", "france-tour", "spain-tour", "great-britain-walk", "turkey-journey", "balkan-route", "south-america-explorer", "canada-route", "thailand-journey", "kyiv-heritage-legends", "alpine-peaks-castles", "bali-tropical-trail", "scandinavian-fjords-coast", "prague-bohemian-castles", "patagonia-wilderness", "scottish-highlands-lochs"];
const routeSlugs = new Set([...legacyRouteSlugs, ...newRouteSlugs]);
const expectedLocales = new Set(["en", "uk", "ru", "es", "de", "fr", "pl", "pt", "it", "tr", "ja", "ko", "zh-cn", "ar", "hi", "pt-br"]);
const expectedHreflang = new Set(["en", "uk", "ru", "es", "de", "fr", "pl", "pt", "pt-BR", "it", "tr", "ja", "ko", "zh-CN", "ar", "hi", "x-default"]);
const expectedOgLocales = new Set(["en_US", "uk_UA", "ru_RU", "es_ES", "de_DE", "fr_FR", "pl_PL", "pt_PT", "pt_BR", "it_IT", "tr_TR", "ja_JP", "ko_KR", "zh_CN", "ar_SA", "hi_IN"]);

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
      if (page.headerHtml || page.footerHtml || page.scriptsHtml || "isInfoSite" in page || "mainHtml" in page) {
        errors.push(`${filename}:${locale}: page shell still contains raw HTML fields.`);
      }
      if (!["landing", "site", "privacy"].includes(page.chrome) || !Array.isArray(page.bodyScripts)) {
        errors.push(`${filename}:${locale}: invalid page chrome or body scripts.`);
      }
      if (page.chrome === "privacy" && !page.privacy?.blocks?.length) {
        errors.push(`${filename}:${locale}: privacy content is not structured.`);
      }
      if (page.chrome === "landing" && !page.landing?.copy?.heroTitle) {
        errors.push(`${filename}:${locale}: landing content is not structured.`);
      }
      if (filename === "news.json" && !page.news?.copy?.newsTitle) {
        errors.push(`${filename}:${locale}: news content is not structured.`);
      }
      if (filename === "rules.json" && !page.rules?.copy?.guideTitle) {
        errors.push(`${filename}:${locale}: rules content is not structured.`);
      }
      if (filename === "premium.json" && !page.premium?.copy?.premiumTitle) {
        errors.push(`${filename}:${locale}: premium content is not structured.`);
      }
      if (filename === "routes.json" && !page.routes?.copy?.routesTitle) {
        errors.push(`${filename}:${locale}: route catalog content is not structured.`);
      }
      if (["health-connect-guide.json", "release-notes.json", "sharing-achievements.json"].includes(filename) && !page.article?.blocks?.length) {
        errors.push(`${filename}:${locale}: article content is not structured.`);
      }
      if (!head?.title || !head.description || !head.canonical) errors.push(`${filename}:${locale}: incomplete SEO head data.`);
      if (directory.endsWith("routes") && (localized.beforeCtaHtml || localized.afterCtaHtml || localized.ctaCopyHtml || !localized.detail?.cities?.length)) {
        errors.push(`${filename}:${locale}: route detail content is not structured.`);
      }
      if (head?.alternates?.length !== 17) errors.push(`${filename}:${locale}: expected 17 hreflang links.`);
      if (!Array.isArray(head?.structuredData) || !Array.isArray(head?.scripts) || !Array.isArray(head?.inlineStyles)) {
        errors.push(`${filename}:${locale}: invalid structured head collections.`);
      }
    }
  }
}
if (sourcePageCount !== 240) errors.push(`Expected 240 source page records, found ${sourcePageCount}.`);

const pages = walk(root).filter((file) => file.endsWith(".html"));
if (pages.length !== 624) errors.push(`Expected 624 HTML pages, found ${pages.length}.`);

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const relative = path.relative(root, page).replaceAll("\\", "/");
  const expectedCanonical = relative === "index.html"
    ? "https://walkquest.site/"
    : relative.endsWith("/index.html")
      ? `https://walkquest.site/${relative.slice(0, -"index.html".length)}`
      : `https://walkquest.site/${relative}`;
  for (const required of ['<link rel="canonical"', 'hreflang="x-default"', '<meta name="description"', "<main"]) {
    if (!html.includes(required)) errors.push(`${relative}: missing ${required}`);
  }
  if ([...html.matchAll(/<link rel="canonical"/g)].length !== 1) errors.push(`${relative}: expected one canonical link.`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) errors.push(`${relative}: canonical is not self-referencing.`);
  if ([...html.matchAll(/<link rel="alternate" hreflang=/g)].length !== 17) errors.push(`${relative}: expected 17 hreflang links.`);
  const hreflangValues = new Set([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((match) => match[1]));
  if (hreflangValues.size !== expectedHreflang.size || [...expectedHreflang].some((lang) => !hreflangValues.has(lang))) {
    errors.push(`${relative}: incomplete hreflang language set.`);
  }
  const ogLocaleValues = [...html.matchAll(/<meta property="og:locale(?:|:alternate)" content="([^"]+)">/g)].map((match) => match[1]);
  if (ogLocaleValues.length !== 16 || new Set(ogLocaleValues).size !== expectedOgLocales.size || [...expectedOgLocales].some((locale) => !ogLocaleValues.includes(locale))) {
    errors.push(`${relative}: incomplete Open Graph locale set.`);
  }
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
  if (newRouteSlugs.includes(path.basename(page, ".html"))) {
    for (const schemaType of ['"@type":"TouristTrip"', '"@type":"BreadcrumbList"', '"@type":"ImageObject"']) {
      if (!html.includes(schemaType)) errors.push(`${relative}: missing ${schemaType} structured data.`);
    }
    if (!html.includes('<meta name="image-credit"')) errors.push(`${relative}: image credit meta is missing.`);
    if (!html.includes('width="1200" height="630"')) errors.push(`${relative}: hero dimensions are missing.`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapCount = [...sitemap.matchAll(/<url>/g)].length;
if (sitemapCount !== 624) errors.push(`Expected 624 sitemap URLs, found ${sitemapCount}.`);
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) errors.push("Sitemap xhtml namespace is missing.");
if (!sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) errors.push("Sitemap image namespace is missing.");
const sitemapAlternates = [...sitemap.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g)];
if (sitemapAlternates.length !== 624 * 17) errors.push(`Expected ${624 * 17} sitemap hreflang links, found ${sitemapAlternates.length}.`);
const sitemapImages = [...sitemap.matchAll(/<image:image>/g)].length;
if (sitemapImages !== 624) errors.push(`Expected 624 sitemap image records, found ${sitemapImages}.`);
for (const slug of newRouteSlugs) {
  const image = path.resolve("public", "images", "routes", `${slug}.webp`);
  if (!fs.existsSync(image)) errors.push(`${slug}: hero image is missing.`);
  else if (fs.statSync(image).size > 250 * 1024) errors.push(`${slug}: hero image exceeds 250 KB.`);
}
if (!fs.existsSync(path.join(root, "CNAME"))) errors.push("CNAME is missing.");
if (!fs.existsSync(path.join(root, ".nojekyll"))) errors.push(".nojekyll is missing.");
if (!fs.existsSync(path.join(root, "65d7c3e213a94afe9b0b38a697859c42.txt"))) errors.push("IndexNow verification key is missing.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${sourcePageCount} legacy records plus ${newRouteSlugs.length * 16} generated route pages, ${pages.length} pages, ${sitemapCount} sitemap URLs, SEO metadata, schema, RTL, local resources and Google Play links.`);
