const host = "walkquest.site";
const key = "65d7c3e213a94afe9b0b38a697859c42";
const sitemapUrl = `https://${host}/sitemap.xml`;
const keyLocation = `https://${host}/${key}.txt`;

const sitemapResponse = await fetch(sitemapUrl, { headers: { "User-Agent": "WalkQuest-IndexNow/1.0" } });
if (!sitemapResponse.ok) throw new Error(`Could not fetch ${sitemapUrl}: HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urls.length) throw new Error("The live sitemap does not contain any URLs.");
if (urls.some((url) => new URL(url).hostname !== host)) throw new Error("The sitemap contains a URL outside walkquest.site.");

const keyResponse = await fetch(keyLocation, { headers: { "User-Agent": "WalkQuest-IndexNow/1.0" } });
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow key verification failed at ${keyLocation}.`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow rejected ${urls.length} URLs: HTTP ${response.status} ${await response.text()}`);
}
console.log(`IndexNow accepted ${urls.length} canonical URLs (HTTP ${response.status}).`);
