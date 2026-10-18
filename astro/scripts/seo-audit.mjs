import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const reportPath = path.resolve("seo-audit-report.json");
const files = [];
const errors = [];
const warnings = [];
const siteOrigin = "https://walkquest.site";
const expectedHreflangs = new Set(["en", "uk", "ru", "es", "de", "fr", "pl", "pt", "pt-BR", "it", "tr", "ja", "ko", "zh-CN", "ar", "hi", "x-default"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function decode(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function first(html, pattern) {
  return decode(html.match(pattern)?.[1]?.trim() ?? "");
}

function stripHtml(value) {
  return decode(value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function outputPathFromUrl(url, currentFile) {
  let pathname;
  try {
    if (/^https?:/i.test(url)) {
      const parsed = new URL(url);
      if (parsed.hostname !== "walkquest.site" && parsed.hostname !== "www.walkquest.site") return null;
      pathname = parsed.pathname;
    } else {
      pathname = url.split(/[?#]/)[0];
    }
  } catch {
    return null;
  }
  if (!pathname || /^(?:mailto:|tel:|data:|javascript:)/i.test(pathname) || pathname.startsWith("#")) return null;
  const resolved = pathname.startsWith("/")
    ? path.join(root, pathname)
    : path.resolve(path.dirname(currentFile), pathname);
  if (pathname.endsWith("/")) return path.join(resolved, "index.html");
  if (!path.extname(resolved)) return `${resolved}.html`;
  return resolved;
}

function canonicalForRelative(relative) {
  if (relative === "index.html") return `${siteOrigin}/`;
  if (relative.endsWith("/index.html")) return `${siteOrigin}/${relative.slice(0, -"index.html".length)}`;
  return `${siteOrigin}/${relative}`;
}

function hreflangForPageLang(lang) {
  if (lang === "zh-cn") return "zh-CN";
  if (lang === "pt-br") return "pt-BR";
  return lang;
}

if (!fs.existsSync(root)) throw new Error("dist/ does not exist. Run npm run build first.");

for (const file of walk(root).filter((entry) => entry.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const lang = first(html, /<html\b[^>]*\blang="([^"]+)"/i).toLowerCase();
  const localeSegment = relative.includes("/") ? relative.split("/")[0] : "en";
  const localeSlugs = new Set(["uk", "ru", "es", "de", "fr", "pl", "pt", "it", "tr", "ja", "ko", "zh-cn", "ar", "hi", "pt-br"]);
  const expectedLang = (localeSlugs.has(localeSegment) ? localeSegment : "en").toLowerCase();
  const title = first(html, /<title>([\s\S]*?)<\/title>/i);
  const description = first(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = first(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripHtml(match[1]));
  const main = first(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const mainText = stripHtml(main);
  const wordCount = mainText.split(/\s+/u).filter(Boolean).length;
  const hreflangs = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)]
    .map((match) => ({ lang: match[1], href: decode(match[2]) }));
  const robots = first(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const externalStylesheets = [...html.matchAll(/<link\s+rel="stylesheet"\s+href="(https?:\/\/[^"]+)"/gi)];

  if (!lang) errors.push(`${relative}: missing html lang.`);
  if (lang !== expectedLang) errors.push(`${relative}: html lang is ${lang}, expected ${expectedLang} from URL.`);
  if (h1s.length !== 1) errors.push(`${relative}: expected exactly one H1, found ${h1s.length}.`);
  if (!title) errors.push(`${relative}: missing title.`);
  if (!description) errors.push(`${relative}: missing meta description.`);
  if (!canonical) errors.push(`${relative}: missing canonical.`);
  if (!robots.includes("index") || !robots.includes("follow")) errors.push(`${relative}: page is not index,follow.`);
  if (title.length > 75) warnings.push(`${relative}: title is ${title.length} characters.`);
  const compactScript = /^(?:ja|ko|zh-cn)$/i.test(lang);
  const minimumDescriptionLength = compactScript ? 18 : 50;
  if (description.length < minimumDescriptionLength || description.length > 190) warnings.push(`${relative}: description is ${description.length} characters.`);
  const hasSubstantialContent = compactScript ? mainText.length >= 400 : wordCount >= 120;
  if (!hasSubstantialContent && !relative.endsWith("privacy.html")) warnings.push(`${relative}: thin main content (${wordCount} tokens, ${mainText.length} characters).`);
  if (hreflangs.length !== 17) errors.push(`${relative}: expected 17 hreflang links, found ${hreflangs.length}.`);
  if (!hreflangs.some((item) => item.lang === "x-default")) errors.push(`${relative}: missing x-default hreflang.`);
  for (const item of hreflangs) {
    const target = outputPathFromUrl(item.href, file);
    if (!target || !fs.existsSync(target)) errors.push(`${relative}: hreflang target does not exist: ${item.href}`);
  }
  for (const block of jsonLd) {
    try { JSON.parse(block[1]); } catch { errors.push(`${relative}: invalid JSON-LD.`); }
  }
  if (!jsonLd.length) warnings.push(`${relative}: no JSON-LD.`);
  if (externalStylesheets.length) errors.push(`${relative}: external stylesheet dependency ${externalStylesheets[0][1]}`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi)) {
    const href = decode(match[1]);
    const target = outputPathFromUrl(href, file);
    if (target && !fs.existsSync(target)) errors.push(`${relative}: broken internal link ${href}`);
  }
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attributes = match[1];
    const src = first(attributes, /\bsrc="([^"]+)"/i);
    const altMatch = attributes.match(/\balt="([^"]*)"/i);
    if (!altMatch || !decode(altMatch[1]).trim()) errors.push(`${relative}: image has empty or missing alt (${src}).`);
    if (!/\bwidth="\d+"/i.test(attributes) || !/\bheight="\d+"/i.test(attributes)) warnings.push(`${relative}: image lacks intrinsic dimensions (${src}).`);
    const target = outputPathFromUrl(src, file);
    if (target && !fs.existsSync(target)) errors.push(`${relative}: missing image ${src}`);
  }
  const internalLinks = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi)]
    .map((match) => ({ href: decode(match[1]), target: outputPathFromUrl(decode(match[1]), file) }))
    .filter(({ target }) => target && target.endsWith(".html"));
  files.push({ file, html, relative, lang, title, description, canonical, hreflangs, internalLinks, h1: h1s[0] ?? "", wordCount });
}

const filesByPath = new Map(files.map((page) => [path.resolve(page.file), page]));
const filesByCanonical = new Map(files.map((page) => [page.canonical, page]));
const inboundLinks = new Map(files.map((page) => [page.relative, 0]));

for (const page of files) {
  const expectedCanonical = canonicalForRelative(page.relative);
  if (page.canonical !== expectedCanonical) errors.push(`${page.relative}: canonical is ${page.canonical}, expected ${expectedCanonical}.`);
  if (filesByCanonical.get(page.canonical) !== page) errors.push(`${page.relative}: canonical is not unique or does not resolve to this page.`);
  const hreflangValues = new Set(page.hreflangs.map((item) => item.lang));
  if (hreflangValues.size !== expectedHreflangs.size || [...expectedHreflangs].some((lang) => !hreflangValues.has(lang))) {
    errors.push(`${page.relative}: incomplete hreflang set.`);
  }
  for (const alternate of page.hreflangs) {
    const targetPath = outputPathFromUrl(alternate.href, page.file);
    const targetPage = targetPath ? filesByPath.get(path.resolve(targetPath)) : undefined;
    if (!targetPage) continue;
    const sourceHreflang = hreflangForPageLang(page.lang);
    if (!targetPage.hreflangs.some((item) => item.lang === sourceHreflang && item.href === page.canonical)) {
      errors.push(`${page.relative}: hreflang ${alternate.lang} target does not link back as ${sourceHreflang}.`);
    }
  }
  for (const link of page.internalLinks) {
    const targetPage = filesByPath.get(path.resolve(link.target));
    if (targetPage) inboundLinks.set(targetPage.relative, (inboundLinks.get(targetPage.relative) ?? 0) + 1);
  }
}

for (const [relative, inbound] of inboundLinks) {
  if (relative !== "index.html" && inbound === 0) errors.push(`${relative}: orphan page with no crawlable internal anchor.`);
}

const sitemapPath = path.join(root, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) errors.push("sitemap.xml is missing.");
else {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  const sitemapSet = new Set(sitemapUrls);
  if (sitemapUrls.length !== sitemapSet.size) errors.push("sitemap.xml contains duplicate <loc> URLs.");
  for (const page of files) if (!sitemapSet.has(page.canonical)) errors.push(`${page.relative}: canonical is missing from sitemap.xml.`);
  for (const url of sitemapSet) if (!filesByCanonical.has(url)) errors.push(`sitemap.xml contains a non-canonical or missing HTML URL: ${url}`);
}

function duplicates(field) {
  const groups = new Map();
  for (const page of files) {
    const key = `${page.lang}\u0000${page[field].toLocaleLowerCase(page.lang || "en")}`;
    const list = groups.get(key) ?? [];
    list.push(page.relative);
    groups.set(key, list);
  }
  return [...groups.values()].filter((list) => list.length > 1);
}

const duplicateTitles = duplicates("title");
const duplicateDescriptions = duplicates("description");
const duplicateH1s = duplicates("h1");
for (const group of duplicateTitles) errors.push(`Duplicate title: ${group.join(", ")}`);
for (const group of duplicateDescriptions) errors.push(`Duplicate description: ${group.join(", ")}`);
for (const group of duplicateH1s) warnings.push(`Duplicate H1: ${group.join(", ")}`);

const report = {
  generatedAt: new Date().toISOString(),
  pages: files.length,
  errors,
  warnings,
  duplicateTitles,
  duplicateDescriptions,
  duplicateH1s,
  titleLengths: { min: Math.min(...files.map((page) => page.title.length)), max: Math.max(...files.map((page) => page.title.length)) },
  descriptionLengths: { min: Math.min(...files.map((page) => page.description.length)), max: Math.max(...files.map((page) => page.description.length)) },
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`SEO audit: ${files.length} pages, ${errors.length} errors, ${warnings.length} warnings.`);
console.log(`Report: ${reportPath}`);
if (errors.length) process.exitCode = 1;
