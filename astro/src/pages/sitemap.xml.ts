import type { APIRoute } from "astro";
import { listPageFiles } from "../lib/page-data";
import { alternateLinks, canonicalUrl } from "../lib/site";

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
  const urls = listPageFiles().map((file) => {
    const alternates = alternateLinks(file)
      .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`)
      .join("\n");
    return `  <url>\n    <loc>${escapeXml(canonicalUrl(file))}</loc>\n    <lastmod>${lastModified}</lastmod>\n${alternates}\n  </url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
