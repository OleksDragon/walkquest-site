export const siteUrl = "https://walkquest.site";
export const imageCopyrightNotice = "© 2026 Gold Digital Studio. All rights reserved.";

export const languages = [
  { code: "en", slug: "", label: "🇬🇧 English", dir: "ltr" },
  { code: "uk", slug: "uk", label: "🇺🇦 Українська", dir: "ltr" },
  { code: "ru", slug: "ru", label: "🇷🇺 Русский", dir: "ltr" },
  { code: "es", slug: "es", label: "🇪🇸 Español", dir: "ltr" },
  { code: "de", slug: "de", label: "🇩🇪 Deutsch", dir: "ltr" },
  { code: "fr", slug: "fr", label: "🇫🇷 Français", dir: "ltr" },
  { code: "pl", slug: "pl", label: "🇵🇱 Polski", dir: "ltr" },
  { code: "pt", slug: "pt", label: "🇵🇹 Português", dir: "ltr" },
  { code: "it", slug: "it", label: "🇮🇹 Italiano", dir: "ltr" },
  { code: "tr", slug: "tr", label: "🇹🇷 Türkçe", dir: "ltr" },
  { code: "ja", slug: "ja", label: "🇯🇵 日本語", dir: "ltr" },
  { code: "ko", slug: "ko", label: "🇰🇷 한국어", dir: "ltr" },
  { code: "zh-CN", slug: "zh-cn", label: "🇨🇳 中文（简体）", dir: "ltr" },
  { code: "ar", slug: "ar", label: "🇸🇦 العربية", dir: "rtl" },
  { code: "hi", slug: "hi", label: "🇮🇳 हिन्दी", dir: "ltr" },
  { code: "pt-BR", slug: "pt-br", label: "🇧🇷 Português (Brasil)", dir: "ltr" },
] as const;

export type Language = (typeof languages)[number];

export const openGraphLocales: Record<Language["code"], string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  pl: "pl_PL",
  pt: "pt_PT",
  it: "it_IT",
  tr: "tr_TR",
  ja: "ja_JP",
  ko: "ko_KR",
  "zh-CN": "zh_CN",
  ar: "ar_SA",
  hi: "hi_IN",
  "pt-BR": "pt_BR",
};

export function languageBySlug(slug: string): Language {
  return languages.find((language) => language.slug === slug) ?? languages[0];
}

export function pageFilename(relativePath: string): string {
  return relativePath.replaceAll("\\", "/").split("/").at(-1) ?? "index.html";
}

export function localizedPageUrl(language: Language, filename: string): string {
  if (language.code === "en") {
    return filename === "index.html" ? `${siteUrl}/` : `${siteUrl}/${filename}`;
  }
  return filename === "index.html" ? `${siteUrl}/${language.slug}/` : `${siteUrl}/${language.slug}/${filename}`;
}

export function imageRights(languageCode: string) {
  const language = languages.find((item) => item.code === languageCode) ?? languages[0];
  const rightsUrl = `${localizedPageUrl(language, "privacy.html")}#image-license`;
  return {
    copyrightNotice: imageCopyrightNotice,
    license: rightsUrl,
    acquireLicensePage: rightsUrl,
  };
}

export function canonicalUrl(relativePath: string): string {
  const normalized = relativePath.replaceAll("\\", "/");
  if (normalized === "index.html") return `${siteUrl}/`;
  if (normalized.endsWith("/index.html")) return `${siteUrl}/${normalized.slice(0, -"index.html".length)}`;
  return `${siteUrl}/${normalized}`;
}

export function alternateLinks(relativePath: string): Array<{ lang: string; href: string }> {
  const filename = pageFilename(relativePath);
  const links = languages.map((language) => ({
    lang: language.code,
    href: localizedPageUrl(language, filename),
  }));
  return [...links, { lang: "x-default", href: localizedPageUrl(languages[0], filename) }];
}

export function openGraphLocale(languageCode: string): string {
  const language = languages.find((item) => item.code === languageCode) ?? languages[0];
  return openGraphLocales[language.code];
}

export function openGraphAlternateLocales(languageCode: string): string[] {
  return languages
    .filter((language) => language.code !== languageCode)
    .map((language) => openGraphLocales[language.code]);
}
