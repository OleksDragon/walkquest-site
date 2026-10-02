(() => {
  const config = window.WalkQuestPrivacyI18n;
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
  const select = document.getElementById("privacyLanguageSelect");
  const languageLabel = document.getElementById("privacyLanguageLabel");
  const backLink = document.getElementById("privacyBackLink");
  const content = document.getElementById("privacyContent");
  const description = document.querySelector('meta[name="description"]');

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

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderInline(value) {
    let html = escapeHtml(value);

    html = html.replace(
      /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi,
      '<a href="mailto:$1">$1</a>',
    );
    html = html.replace(
      /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

    return html;
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    const output = [];
    let listItems = [];
    let paragraphIndex = 0;

    const flushList = () => {
      if (!listItems.length) return;
      output.push("<ul>" + listItems.join("") + "</ul>");
      listItems = [];
    };

    for (const line of lines) {
      if (!line.trim()) {
        flushList();
        continue;
      }

      if (line.startsWith("# ")) {
        flushList();
        output.push("<h1>" + renderInline(line.slice(2)) + "</h1>");
      } else if (line.startsWith("## ")) {
        flushList();
        output.push("<h2>" + renderInline(line.slice(3)) + "</h2>");
      } else if (line.startsWith("- ")) {
        listItems.push("<li>" + renderInline(line.slice(2)) + "</li>");
      } else {
        flushList();
        const className = paragraphIndex === 0 ? ' class="privacy-updated"' : "";
        output.push("<p" + className + ">" + renderInline(line) + "</p>");
        paragraphIndex += 1;
      }
    }

    flushList();
    return output.join("");
  }

  function applyLanguage(code) {
    const language = languages.find((item) => item.code === code) || languages[0];
    const copy = translations[language.code] || translations.en;

    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir || "ltr";
    const title = "WalkQuest — " + copy.shortTitle;
    const nextPath = localizedPath(language.code);
    const url = "https://walkquest.site" + nextPath;
    document.title = title;
    description.content = copy.description;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", copy.description);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute("content", url);
    history.replaceState(null, "", nextPath + location.search + location.hash);
    languageLabel.textContent = copy.languageLabel;
    backLink.textContent = "← " + copy.backLabel;
    backLink.setAttribute("aria-label", copy.backLabel);
    content.innerHTML = renderMarkdown(copy.content);
    select.value = language.code;
    select.setAttribute("aria-label", copy.languageLabel);
    localStorage.setItem("walkquest-language", language.code);
  }

  select.addEventListener("change", (event) => applyLanguage(event.target.value));
  applyLanguage(detectLanguage());

  window.WalkQuestPrivacy = Object.freeze({ resolveLanguage, applyLanguage });
})();
