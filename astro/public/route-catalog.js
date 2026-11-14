(() => {
  const tools = document.querySelector("[data-route-tools]");
  const grid = document.querySelector("[data-route-grid]");
  if (!tools || !grid) return;

  const search = tools.querySelector("[data-route-search]");
  const filters = [...tools.querySelectorAll("[data-route-filter]")];
  const sort = tools.querySelector("[data-route-sort]");
  const reset = tools.querySelector("[data-route-reset]");
  const results = document.querySelector("[data-route-results]");
  const empty = document.querySelector("[data-route-empty]");
  const cards = [...grid.querySelectorAll("[data-route-card]")];
  const difficultyOrder = { easy: 0, medium: 1, hard: 2, epic: 3 };
  const locale = document.documentElement.lang || "en";

  function normalized(value) {
    return String(value || "").toLocaleLowerCase(locale).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function update() {
    const query = normalized(search.value);
    const values = Object.fromEntries(filters.map((filter) => [filter.dataset.routeFilter, filter.value]));
    const visible = cards.filter((card) => {
      const matchesSearch = !query || normalized(card.dataset.search).includes(query);
      const matchesAccess = values.access === "all" || card.dataset.access === values.access;
      const matchesRegion = values.region === "all" || card.dataset.region === values.region;
      const matchesDifficulty = values.difficulty === "all" || card.dataset.difficulty === values.difficulty;
      card.hidden = !(matchesSearch && matchesAccess && matchesRegion && matchesDifficulty);
      return !card.hidden;
    });

    visible.sort((a, b) => {
      if (sort.value === "distance-asc") return Number(a.dataset.distance) - Number(b.dataset.distance);
      if (sort.value === "distance-desc") return Number(b.dataset.distance) - Number(a.dataset.distance);
      if (sort.value === "name") return a.dataset.name.localeCompare(b.dataset.name, locale, { sensitivity: "base" });
      if (sort.value === "difficulty") return difficultyOrder[a.dataset.difficulty] - difficultyOrder[b.dataset.difficulty] || Number(a.dataset.distance) - Number(b.dataset.distance);
      return Number(a.dataset.order) - Number(b.dataset.order);
    }).forEach((card) => grid.append(card));

    if (results) results.textContent = results.dataset.template.replace("{count}", String(visible.length));
    if (empty) empty.hidden = visible.length !== 0;
  }

  search.addEventListener("input", update);
  filters.forEach((filter) => filter.addEventListener("change", update));
  sort.addEventListener("change", update);
  reset.addEventListener("click", () => {
    search.value = "";
    filters.forEach((filter) => { filter.value = "all"; });
    sort.value = "recommended";
    update();
    search.focus();
  });

  update();
})();
