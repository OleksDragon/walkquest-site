(() => {
  const config = window.WalkQuestPagesI18n;
  if (!config) return;

  const { languages, translations } = config;
  const supported = new Set(languages.map(({ code }) => code));
  const select = document.getElementById("pageLanguageSelect");
  const languageLabel = document.getElementById("pageLanguageLabel");
  const description = document.querySelector('meta[name="description"]');
  const page = document.body.dataset.page || "guide";

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
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    if (queryLanguage && supported.has(queryLanguage)) return queryLanguage;

    return resolveLanguage(
      localStorage.getItem("walkquest-language"),
      navigator.languages || [navigator.language],
    );
  }

  function applyLanguage(code) {
    const language = languages.find((item) => item.code === code) || languages[0];
    const copy = { ...translations.en, ...(translations[language.code] || {}) };

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

    const titleKey = page + "PageTitle";
    const descriptionKey = page + "PageDescription";
    document.title = copy[titleKey] || translations.en[titleKey];
    if (description) description.content = copy[descriptionKey] || translations.en[descriptionKey];

    if (languageLabel) languageLabel.textContent = copy.languageLabel;
    select.value = language.code;
    select.setAttribute("aria-label", copy.languageLabel);
    localStorage.setItem("walkquest-language", language.code);

    document.querySelectorAll("[data-page-link]").forEach((link) => {
      if (link.dataset.pageLink === page) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  select.addEventListener("change", (event) => applyLanguage(event.target.value));
  document.getElementById("year").textContent = new Date().getFullYear();
  applyLanguage(detectLanguage());

  window.WalkQuestPages = Object.freeze({ resolveLanguage, applyLanguage });
})();
