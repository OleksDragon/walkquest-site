import fs from "node:fs";
import path from "node:path";

const file = path.resolve("src/data/routes/europe-explorer.json");
const document = JSON.parse(fs.readFileSync(file, "utf8"));

const copy = {
  en: ["Europe Explorer is a 1,240 km virtual route with 12 stops across six countries. Access it with Premium or through rewarded ads.", "Premium or rewarded ads · Easy", "Without Premium", "Watch 3 rewarded ads for the first 10 km, then one ad per day to sync steps after 10 km."],
  uk: ["Europe Explorer — віртуальний маршрут завдовжки 1 240 км із 12 зупинками в шести країнах. Доступний із Premium або за винагороджувану рекламу.", "Premium або реклама · Легко", "Без Premium", "Перегляньте 3 винагороджувані реклами для перших 10 км, а після 10 км — одну рекламу на день для синхронізації кроків."],
  ru: ["Europe Explorer — виртуальный маршрут длиной 1 240 км с 12 остановками в шести странах. Доступен с Premium или за рекламу с вознаграждением.", "Premium или реклама · Легко", "Без Premium", "Посмотрите 3 рекламы с вознаграждением для первых 10 км, а после 10 км — одну рекламу в день для синхронизации шагов."],
  es: ["Europe Explorer es una ruta virtual de 1240 km con 12 paradas en seis países. Está disponible con Premium o mediante anuncios con recompensa.", "Premium o anuncios · Fácil", "Sin Premium", "Mira 3 anuncios con recompensa para los primeros 10 km y, después, uno al día para sincronizar pasos."],
  de: ["Europe Explorer ist eine virtuelle Route über 1.240 km mit 12 Stopps in sechs Ländern. Zugriff gibt es mit Premium oder über Rewarded Ads.", "Premium oder Ads · Leicht", "Ohne Premium", "3 Rewarded Ads öffnen die ersten 10 km; danach ermöglicht eine Ad pro Tag die Schrittsynchronisierung."],
  fr: ["Europe Explorer est un parcours virtuel de 1 240 km avec 12 étapes dans six pays. Il est accessible avec Premium ou via des publicités récompensées.", "Premium ou publicités · Facile", "Sans Premium", "Regardez 3 publicités récompensées pour les 10 premiers km, puis une par jour pour synchroniser les pas."],
  pl: ["Europe Explorer to wirtualna trasa o długości 1240 km z 12 przystankami w sześciu krajach. Dostępna z Premium lub przez reklamy z nagrodą.", "Premium lub reklamy · Łatwa", "Bez Premium", "Obejrzyj 3 reklamy z nagrodą, aby otworzyć pierwsze 10 km, a później jedną dziennie, by synchronizować kroki."],
  pt: ["Europe Explorer é uma rota virtual de 1 240 km com 12 paragens em seis países. Está disponível com Premium ou através de anúncios recompensados.", "Premium ou anúncios · Fácil", "Sem Premium", "Veja 3 anúncios recompensados para os primeiros 10 km e depois um por dia para sincronizar passos."],
  it: ["Europe Explorer è un percorso virtuale di 1.240 km con 12 tappe in sei paesi. È accessibile con Premium o tramite annunci con premio.", "Premium o annunci · Facile", "Senza Premium", "Guarda 3 annunci con premio per i primi 10 km, poi uno al giorno per sincronizzare i passi."],
  tr: ["Europe Explorer, altı ülkede 12 durak içeren 1.240 km’lik sanal bir rotadır. Premium veya ödüllü reklamlarla erişilebilir.", "Premium veya reklam · Kolay", "Premium olmadan", "İlk 10 km için 3 ödüllü reklam, sonrasında adım eşitlemek için günde bir reklam izleyin."],
  ja: ["Europe Explorerは6か国12地点を巡る全長1,240kmのバーチャルルートです。Premiumまたはリワード広告で利用できます。", "Premiumまたは広告・初級", "Premiumなし", "広告3回で最初の10kmを解放し、以降は1日1回の広告で歩数を同期できます。"],
  ko: ["Europe Explorer는 6개국 12개 지점을 잇는 1,240km 가상 경로입니다. Premium 또는 보상형 광고로 이용할 수 있습니다.", "Premium 또는 광고 · 쉬움", "Premium 없이", "보상형 광고 3회로 첫 10km를 열고, 이후에는 하루 광고 1회로 걸음을 동기화하세요."],
  "zh-cn": ["Europe Explorer是一条全长1240公里、跨越6个国家并设有12个停靠点的虚拟路线，可通过Premium或激励广告使用。", "Premium或广告・简单", "不使用Premium", "观看3次激励广告可解锁前10公里，之后每天观看1次即可同步步数。"],
  ar: ["Europe Explorer مسار افتراضي بطول 1,240 كم يضم 12 محطة في ست دول. يتاح عبر Premium أو الإعلانات بمكافأة.", "Premium أو إعلانات · سهل", "من دون Premium", "شاهد 3 إعلانات بمكافأة لأول 10 كم، ثم إعلانًا واحدًا يوميًا لمزامنة الخطوات."],
  hi: ["Europe Explorer छह देशों में 12 पड़ावों वाला 1,240 किमी का आभासी मार्ग है। इसे Premium या रिवॉर्ड विज्ञापनों से खोला जा सकता है।", "Premium या विज्ञापन · आसान", "Premium के बिना", "पहले 10 किमी के लिए 3 रिवॉर्ड विज्ञापन देखें, फिर कदम सिंक करने के लिए प्रतिदिन एक विज्ञापन देखें।"],
  "pt-br": ["Europe Explorer é uma rota virtual de 1.240 km com 12 paradas em seis países. Está disponível com Premium ou por anúncios premiados.", "Premium ou anúncios · Fácil", "Sem Premium", "Veja 3 anúncios premiados para os primeiros 10 km e depois um por dia para sincronizar os passos."]
};

for (const [locale, localized] of Object.entries(document.locales)) {
  const [description, tag, freeTitle, freeDetail] = copy[locale];
  const { page, detail } = localized;
  page.head.description = description;
  page.head.openGraph.description = description;
  page.head.twitter.description = description;
  for (const schema of page.head.structuredData) if (schema.description) schema.description = description;
  detail.copy.europeLead = description;
  detail.copy.routeEuropeTag = tag;
  detail.copy.europeIntroP1 = `${description} ${freeDetail}`;
  detail.copy.freeTitle = freeTitle;
  detail.copy.free1 = freeDetail;
}

fs.writeFileSync(file, `${JSON.stringify(document, null, 2)}\n`);
console.log("Synchronized Europe Explorer access copy in 16 locales.");
