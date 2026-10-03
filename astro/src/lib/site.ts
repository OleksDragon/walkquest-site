export const siteUrl = "https://walkquest.site";

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

export function languageBySlug(slug: string): Language {
  return languages.find((language) => language.slug === slug) ?? languages[0];
}
