const siteOrigin = "https://walkquest.site";
const sitemapResponse = await fetch(`${siteOrigin}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`sitemap.xml returned HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const agents = {
  Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  Bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
};
const failures = [];

async function inspect(url, agentName, userAgent) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": userAgent, Accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(30000),
    });
    const body = await response.text();
    const canonical = body.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    const robots = body.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1]?.toLowerCase() ?? "";
    const xRobots = response.headers.get("x-robots-tag")?.toLowerCase() ?? "";
    if (response.status !== 200) failures.push(`${agentName} ${url}: HTTP ${response.status}`);
    if (!response.headers.get("content-type")?.includes("text/html")) failures.push(`${agentName} ${url}: invalid Content-Type`);
    if (response.url !== url) failures.push(`${agentName} ${url}: redirected to ${response.url}`);
    if (canonical !== url) failures.push(`${agentName} ${url}: canonical is ${canonical || "missing"}`);
    if (robots.includes("noindex") || xRobots.includes("noindex")) failures.push(`${agentName} ${url}: noindex detected`);
  } catch (error) {
    failures.push(`${agentName} ${url}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (const [agentName, userAgent] of Object.entries(agents)) {
  const queue = [...urls];
  const workers = Array.from({ length: 12 }, async () => {
    while (queue.length) await inspect(queue.shift(), agentName, userAgent);
  });
  await Promise.all(workers);
  console.log(`${agentName}: checked ${urls.length} canonical URLs.`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Live crawl audit passed: ${urls.length} URLs × ${Object.keys(agents).length} search crawlers, 0 errors.`);
}
