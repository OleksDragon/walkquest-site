import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const errors = [];
const routeSlugs = new Set(["europe-explorer", "kyoto-autumn-temples", "greek-islands-odyssey", "iceland-ring-road", "route-66-usa", "around-the-world-lite"]);

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

const pages = walk(root).filter((file) => file.endsWith(".html"));
if (pages.length !== 240) errors.push(`Expected 240 HTML pages, found ${pages.length}.`);

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const relative = path.relative(root, page).replaceAll("\\", "/");
  for (const required of ['<link rel="canonical"', 'hreflang="x-default"', '<meta name="description"', "<main"]) {
    if (!html.includes(required)) errors.push(`${relative}: missing ${required}`);
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

console.log(`Validated ${pages.length} pages, ${sitemapCount} sitemap URLs, RTL, local resources and Google Play links.`);
