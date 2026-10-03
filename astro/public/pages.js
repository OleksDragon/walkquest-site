(() => {
  const config = window.WalkQuestPagesI18n;
  if (!config) return;

  const { languages, translations } = config;
  const supported = new Set(languages.map(({ code }) => code));
  const localeBySlug = new Map(languages.map(({ code }) => [code.toLowerCase(), code]));

  function pathLanguage() {
    return localeBySlug.get(location.pathname.split("/").filter(Boolean)[0]?.toLowerCase()) || null;
  }

  function localizedPath(code) {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length && localeBySlug.has(parts[0].toLowerCase())) parts.shift();
    const suffix = parts.length ? "/" + parts.join("/") : "/";
    return code === "en" ? suffix : "/" + code.toLowerCase() + suffix;
  }
  const select = document.getElementById("pageLanguageSelect");
  const languageLabel = document.getElementById("pageLanguageLabel");
  const description = document.querySelector('meta[name="description"]');
  const page = document.body.dataset.page || "guide";
  const navPage = document.body.dataset.navPage || page;

  languages.forEach(({ code, label }) => select.add(new Option(label, code)));

  function resolveLanguage(saved, browserLanguages = []) {
    if (saved && supported.has(saved)) return saved;

    for (const raw of browserLanguages) {
      const normalized = String(raw).replace("_", "-");
      if (supported.has(normalized)) return normalized;
      if (/^pt-BR/i.test(normalized)) return "pt-BR";
      if (/^zh/i.test(normalized)) return "zh-CN";

      const base = normalized.split("-")[0];
      if (supported.has(base)) return base;
    }

    return "en";
  }

  function detectLanguage() {
    const fromPath = pathLanguage();
    if (fromPath) return fromPath;

    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    if (queryLanguage && supported.has(queryLanguage)) return queryLanguage;

    return resolveLanguage(
      localStorage.getItem("walkquest-language"),
      navigator.languages || [navigator.language],
    );
  }

  function applyLanguage(code) {
    const language = languages.find((item) => item.code === code) || languages[0];
    const routeTranslations = window.WalkQuestEuropeRouteI18n?.translations || {};
    const kyotoTranslations = window.WalkQuestKyotoRouteI18n?.translations || {};
    const extendedRouteTranslations = window.WalkQuestExtendedRouteI18n?.translations || {};
    const epicRouteTranslations = window.WalkQuestEpicRouteI18n?.translations || {};
    const copy = { ...translations.en, ...(routeTranslations.en || {}), ...(kyotoTranslations.en || {}), ...(extendedRouteTranslations.en || {}), ...(epicRouteTranslations.en || {}), ...(translations[language.code] || {}), ...(routeTranslations[language.code] || {}), ...(kyotoTranslations[language.code] || {}), ...(extendedRouteTranslations[language.code] || {}), ...(epicRouteTranslations[language.code] || {}) };

    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir || "ltr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const value = copy[element.dataset.i18nAlt];
      if (typeof value === "string") element.alt = value;
    });

    const titleKey = document.body.dataset.titleKey || page + "PageTitle";
    const descriptionKey = document.body.dataset.descriptionKey || page + "PageDescription";
    const title = copy[titleKey] || translations.en[titleKey];
    const summary = copy[descriptionKey] || translations.en[descriptionKey];
    const nextPath = localizedPath(language.code);
    const url = "https://walkquest.site" + nextPath;
    document.title = title;
    if (description) description.content = summary;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", summary);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", summary);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute("content", url);
    history.replaceState(null, "", nextPath + location.search + location.hash);

    if (languageLabel) languageLabel.textContent = copy.languageLabel;
    select.value = language.code;
    select.setAttribute("aria-label", copy.languageLabel);
    localStorage.setItem("walkquest-language", language.code);

    document.querySelectorAll("[data-page-link]").forEach((link) => {
      if (link.dataset.pageLink === navPage) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  select.addEventListener("change", (event) => applyLanguage(event.target.value));
  document.getElementById("year").textContent = new Date().getFullYear();
  applyLanguage(detectLanguage());

  window.WalkQuestPages = Object.freeze({ resolveLanguage, applyLanguage });
})();
