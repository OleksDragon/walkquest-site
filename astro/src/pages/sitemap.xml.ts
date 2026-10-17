import type { APIRoute } from "astro";
import { listPageFiles } from "../lib/page-data";
import { alternateLinks, canonicalUrl, languages, siteUrl } from "../lib/site";
import { localizedRoutePath, newRoutes } from "../data/new-routes";

const escapeXml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

export const GET: APIRoute = () => {
  const lastModified = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const existingUrls = listPageFiles().map((file) => {
    const alternates = alternateLinks(file)
      .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`)
      .join("\n");
    const isRoute = file.endsWith("europe-explorer.html") || file.endsWith("kyoto-autumn-temples.html") || file.endsWith("greek-islands-odyssey.html") || file.endsWith("iceland-ring-road.html") || file.endsWith("route-66-usa.html") || file.endsWith("around-the-world-lite.html");
    return `  <url>\n    <loc>${escapeXml(canonicalUrl(file))}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${isRoute ? "0.8" : "0.6"}</priority>\n${alternates}\n  </url>`;
  });
  const newRouteUrls = newRoutes.flatMap((route) => languages.map((language) => {
    const alternates = [...languages.map((alternate) => ({ lang: alternate.code, href: `${siteUrl}${localizedRoutePath(route, alternate)}` })), { lang: "x-default", href: `${siteUrl}${localizedRoutePath(route, languages[0])}` }]
      .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`).join("\n");
    return `  <url>\n    <loc>${escapeXml(`${siteUrl}${localizedRoutePath(route, language)}`)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n${alternates}\n  </url>`;
  }));
  const urls = [...existingUrls, ...newRouteUrls];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
