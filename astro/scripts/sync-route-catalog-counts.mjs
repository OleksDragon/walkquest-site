import fs from "node:fs";
import path from "node:path";

const file = path.resolve("src/data/pages/routes.json");
const document = JSON.parse(fs.readFileSync(file, "utf8"));
const titles = {
  en: "35 virtual journeys. One pair of walking shoes.",
  uk: "Тридцять п’ять подорожей. Одна пара кросівок.",
  ru: "Тридцать пять путешествий. Одна пара кроссовок.",
  es: "Treinta y cinco viajes. Un par de zapatos para caminar.",
  de: "Fünfunddreißig Reisen. Ein Paar Wanderschuhe.",
  fr: "Trente-cinq voyages. Une paire de chaussures de marche.",
  pl: "Trzydzieści pięć podróży. Jedna para butów do chodzenia.",
  pt: "Trinta e cinco viagens. Um par de sapatos de caminhada.",
  it: "Trentacinque viaggi. Un paio di scarpe da passeggio.",
  tr: "Otuz beş yolculuk. Bir çift yürüyüş ayakkabısı.",
  ja: "35の旅。ウォーキングシューズ一足。",
  ko: "서른다섯 번의 여행. 운동화 한 켤레.",
  "zh-cn": "三十五次旅程。一双步行鞋。",
  ar: "خمس وثلاثون رحلة. زوج واحد من أحذية المشي.",
  hi: "पैंतीस यात्राएँ। चलने के जूते की एक जोड़ी।",
  "pt-br": "Trinta e cinco viagens. Um par de sapatos de caminhada."
};
const cta = {
  en: "Choose one of five short starter routes free, then explore longer journeys with rewarded ads or Premium.",
  uk: "Оберіть один із п’яти коротких стартових маршрутів безкоштовно, а довші подорожі відкривайте за рекламу або з Premium.",
  ru: "Выберите один из пяти коротких стартовых маршрутов бесплатно, а длинные путешествия открывайте за рекламу или с Premium.",
  es: "Elige gratis una de cinco rutas iniciales cortas y abre viajes más largos con anuncios con recompensa o Premium.",
  de: "Wähle eine von fünf kurzen Startrouten kostenlos und öffne längere Reisen mit Rewarded Ads oder Premium.",
  fr: "Choisissez gratuitement l’un des cinq courts parcours de départ, puis ouvrez les longs voyages avec des publicités récompensées ou Premium.",
  pl: "Wybierz bezpłatnie jedną z pięciu krótkich tras startowych, a dłuższe podróże otwieraj reklamami z nagrodą lub Premium.",
  pt: "Escolha gratuitamente uma de cinco rotas iniciais curtas e abra viagens mais longas com anúncios recompensados ou Premium.",
  it: "Scegli gratis uno dei cinque brevi percorsi iniziali e apri i viaggi più lunghi con annunci con premio o Premium.",
  tr: "Beş kısa başlangıç rotasından birini ücretsiz seçin; uzun yolculukları ödüllü reklamlarla veya Premium ile açın.",
  ja: "5つの短いスタータールートから1つを無料で選び、長い旅はリワード広告またはPremiumで解放できます。",
  ko: "5개의 짧은 스타터 경로 중 하나를 무료로 선택하고, 긴 여행은 보상형 광고 또는 Premium으로 여세요.",
  "zh-cn": "可免费选择五条短途入门路线中的一条，较长旅程可通过激励广告或Premium解锁。",
  ar: "اختر مجانًا مسار بداية قصيرًا واحدًا من خمسة، وافتح الرحلات الأطول بالإعلانات بمكافأة أو Premium.",
  hi: "पाँच छोटे स्टार्टर मार्गों में से एक मुफ़्त चुनें और लंबे सफ़र रिवॉर्ड विज्ञापनों या Premium से खोलें।",
  "pt-br": "Escolha grátis uma de cinco rotas iniciais curtas e libere viagens mais longas com anúncios premiados ou Premium."
};

function update(value) {
  if (typeof value === "string") return value.replace(/\b303\b/g, "328").replace(/\b30\b/g, "35");
  if (Array.isArray(value)) return value.map(update);
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) value[key] = update(value[key]);
  }
  return value;
}

update(document);
for (const [locale, page] of Object.entries(document.locales)) {
  page.routes.copy.routesTitle = titles[locale];
  page.routes.copy.routesCtaText = cta[locale];
}
fs.writeFileSync(file, `${JSON.stringify(document, null, 2)}\n`);
console.log("Synchronized route catalog totals: 35 routes, 328 stops, 18 transfers.");
