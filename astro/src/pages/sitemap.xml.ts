import type { APIRoute } from "astro";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { getPageData, listPageFiles } from "../lib/page-data";
import { alternateLinks, canonicalUrl, languages, siteUrl } from "../lib/site";
import { localizedRoutePath, newRoutes } from "../data/new-routes";

const escapeXml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

export const GET: APIRoute = () => {
  let lastModified = "2026-10-17";
  try {
    const repository = path.resolve("..").replaceAll("\\", "/");
    const commitDate = execFileSync("git", ["-c", `safe.directory=${repository}`, "log", "-1", "--format=%cs", "--", "."], { encoding: "utf8" }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(commitDate)) lastModified = commitDate;
  } catch {
    // Git metadata is optional in static build environments; use the last audited release date.
  }
  const existingUrls = listPageFiles().map((file) => {
    const page = getPageData(file);
    const alternates = alternateLinks(file)
      .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`)
      .join("\n");
    const isRoute = file.endsWith("europe-explorer.html") || file.endsWith("kyoto-autumn-temples.html") || file.endsWith("greek-islands-odyssey.html") || file.endsWith("iceland-ring-road.html") || file.endsWith("route-66-usa.html") || file.endsWith("around-the-world-lite.html");
    const image = page.head.openGraph.image.startsWith("https://walkquest.site/")
      ? `\n    <image:image>\n      <image:loc>${escapeXml(page.head.openGraph.image)}</image:loc>\n      <image:title>${escapeXml(page.head.openGraph.imageAlt)}</image:title>\n    </image:image>`
      : "";
    return `  <url>\n    <loc>${escapeXml(canonicalUrl(file))}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${isRoute ? "0.8" : "0.6"}</priority>\n${alternates}${image}\n  </url>`;
  });
  const newRouteUrls = newRoutes.flatMap((route) => languages.map((language) => {
    const alternates = [...languages.map((alternate) => ({ lang: alternate.code, href: `${siteUrl}${localizedRoutePath(route, alternate)}` })), { lang: "x-default", href: `${siteUrl}${localizedRoutePath(route, languages[0])}` }]
      .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`).join("\n");
    const translation = route.translations[language.code];
    return `  <url>\n    <loc>${escapeXml(`${siteUrl}${localizedRoutePath(route, language)}`)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n${alternates}\n    <image:image>\n      <image:loc>${escapeXml(`${siteUrl}${route.image}`)}</image:loc>\n      <image:title>${escapeXml(translation.alt)}</image:title>\n    </image:image>\n  </url>`;
  }));
  const urls = [...existingUrls, ...newRouteUrls];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
