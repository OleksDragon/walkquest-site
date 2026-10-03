import type { APIRoute } from "astro";
import { listLegacyPages } from "../lib/legacy-pages";
import { siteUrl } from "../lib/site";

export const GET: APIRoute = () => {
  const urls = listLegacyPages().map((file) => {
    const url = file === "index.html" ? `${siteUrl}/` : `${siteUrl}/${file}`;
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-10-03</lastmod>\n  </url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
