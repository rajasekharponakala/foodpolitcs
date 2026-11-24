(() => {
  'use strict';

  const data = window.bookData;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storage = {
    get(key, fallback) {
      try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch { return false; }
    }
  };

  const state = {
    access: 0,
    nutrient: 'protein',
    mythFilter: 'all',
    openMyths: new Set(),
    evidenceFilter: 'all',
    tradeoff: 'nutrition',
    role: storage.get('fp-role-v1', 'student'),
    meal: new Set(storage.get('fp-meal-v1', [])),
    actions: storage.get('fp-actions-v1', {}),
    searchIndex: [],
    searchResults: [],
    searchSelection: 0
  };

  if (!data.actions[state.role]) state.role = 'student';
  state.meal = new Set([...state.meal].filter((id) => data.mealFoods.some((food) => food.id === id)));

  let toastTimer;
  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('is-visible'), 2600);
  }

  function sourceButton(id, dark = false) {
    return `<button class="text-button${dark ? ' text-button-light' : ''}" type="button" data-open-source="${id}">Inspect source <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>`;
  }

  function openSource(id) {
    const source = data.sources[id];
    if (!source) return;
    $('#source-type').textContent = source.type;
    $('#source-title').textContent = source.title;
    $('#source-dialog-body').innerHTML = `
      <div class="source-meta"><span>${escapeHTML(source.type)}</span><span>SOURCE ${escapeHTML(id)}</span></div>
      <p class="source-publisher">${escapeHTML(source.publisher)}</p>
      <div class="source-note"><strong>How to read it</strong><br>${escapeHTML(source.note)}</div>
      <a class="button button-primary source-open" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">Open original source <svg class="icon" aria-hidden="true"><use href="#i-external"></use></svg></a>
    `;
    const dialog = $('#source-dialog');
    if (!dialog.open) dialog.showModal();
  }

  function closeDialog(dialog) {
    if (dialog && dialog.open) dialog.close();
  }

  // Scroll, navigation and progressive reveal.
  const revealElements = $$('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const navSections = ['access', 'nutrients', 'myths', 'policy', 'chapters', 'action'].map((id) => document.getElementById(id));
  let scrollQueued = false;
  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    $('#reading-progress').style.width = `${scrollRange > 0 ? (scrollTop / scrollRange) * 100 : 0}%`;
    $('#back-to-top').classList.toggle('is-visible', scrollTop > 900);

    let activeId = '';
    navSections.forEach((section) => {
      if (section && section.getBoundingClientRect().top <= 160) activeId = section.id;
    });
    $$('.desktop-nav a').forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`));
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScrollUI); }
  }, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });
  updateScrollUI();

  $('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

  const menuTrigger = $('#menu-trigger');
  const mobileNav = $('#mobile-nav');
  function setMenu(open) {
    mobileNav.hidden = !open;
    menuTrigger.setAttribute('aria-expanded', String(open));
    menuTrigger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuTrigger.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${open ? 'close' : 'menu'}"></use></svg>`;
    document.body.classList.toggle('is-locked', open);
  }
  menuTrigger.addEventListener('click', () => setMenu(menuTrigger.getAttribute('aria-expanded') !== 'true'));
  $$('#mobile-nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  // Hero lens.
  const heroLenses = {
    nutrients: { index: '01', title: 'Nutrients are more than calories.', text: 'Protein quality, mineral absorption and B12 reveal why a plate must be assessed as a whole.' },
    access: { index: '02', title: 'Knowing what to eat is not access.', text: 'Income, markets, schools and social permission decide which foods can actually reach a person.' },
    identity: { index: '03', title: 'Food carries identity—and hierarchy.', text: 'The book asks when cultural preference becomes a rule imposed on someone else.' },
    power: { index: '04', title: 'Every plate has a policy behind it.', text: 'Budgets, suppliers, guidelines and laws shape menus long before anyone takes a bite.' }
  };
  $$('[data-hero-lens]').forEach((button) => button.addEventListener('click', () => {
    const lens = heroLenses[button.dataset.heroLens];
    $$('[data-hero-lens]').forEach((node) => node.setAttribute('aria-pressed', String(node === button)));
    $('#insight-index').textContent = lens.index;
    $('#insight-title').textContent = lens.title;
    $('#insight-text').textContent = lens.text;
  }));

  // Access chain.
  function renderAccess() {
    $('#access-buttons').innerHTML = data.accessSteps.map((step, index) => `
      <button class="chain-step${index === state.access ? ' is-active' : ''}" type="button" data-access-step="${index}" aria-pressed="${index === state.access}">
        <span>${step.number}</span><strong>${escapeHTML(step.title)}</strong>
      </button>
    `).join('');
    setAccess(state.access);
  }
  function setAccess(index) {
    state.access = Math.max(0, Math.min(data.accessSteps.length - 1, index));
    const step = data.accessSteps[state.access];
    $$('[data-access-step]').forEach((button) => {
      const active = Number(button.dataset.accessStep) === state.access;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $('#chain-progress').style.width = `${((state.access + 1) / data.accessSteps.length) * 100}%`;
    $('#access-detail').innerHTML = `
      <div><span class="detail-kicker">${escapeHTML(step.chapter)} / ${escapeHTML(step.short)}</span><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.text)}</p></div>
      <div class="access-stat"><strong>${escapeHTML(step.stat)}</strong><span>${escapeHTML(step.statLabel)}</span><button type="button" data-open-source="${step.source}">${escapeHTML(step.chapter)} · source ↗</button></div>
    `;
  }
  renderAccess();

  // Nutrient lab.
  function renderNutrient(key) {
    state.nutrient = key;
    const nutrient = data.nutrient[key];
    $$('[data-nutrient]').forEach((button) => {
      const active = button.dataset.nutrient === key;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    $('#nutrient-panel').setAttribute('aria-labelledby', `tab-${key}`);
    const visual = nutrient.chart ? `
      <div class="protein-chart" role="img" aria-label="True ileal amino acid digestibility: mung bean 65.2 percent, finger millet 68.4 percent, rice 78.5 percent, chicken egg 87.4 percent">
        ${nutrient.chart.map((row) => `<div class="protein-row"><span>${escapeHTML(row.label)}</span><div class="protein-track"><i class="bar-${row.color}" data-bar="${row.value}"></i></div><strong>${row.display}</strong></div>`).join('')}
      </div>` : `
      <div class="factor-grid">${nutrient.factors.map((factor) => `<article class="factor-card"><span aria-hidden="true">${factor.icon}</span><h4>${escapeHTML(factor.title)}</h4><p>${escapeHTML(factor.text)}</p></article>`).join('')}</div>`;
    $('#nutrient-panel').innerHTML = `
      <div class="nutrient-copy"><span class="eyebrow">${escapeHTML(nutrient.eyebrow)}</span><h3>${escapeHTML(nutrient.title)}</h3><p>${escapeHTML(nutrient.intro)}</p><div class="nutrient-source">${sourceButton(nutrient.source)}</div></div>
      ${visual}
      <p class="nutrient-footnote">${escapeHTML(nutrient.footer)}</p>
    `;
    requestAnimationFrame(() => $$('[data-bar]', $('#nutrient-panel')).forEach((bar) => { bar.style.width = `${bar.dataset.bar}%`; }));
  }
  renderNutrient('protein');

  // Meal lab.
  function renderMealFoods() {
    $('#food-grid').innerHTML = data.mealFoods.map((food) => `
      <button class="food-option" type="button" data-food="${food.id}" aria-pressed="${state.meal.has(food.id)}">
        <span class="food-icon" aria-hidden="true">${food.icon}</span><span><strong>${escapeHTML(food.name)}</strong><small>${escapeHTML(food.hint)}</small></span>
      </button>
    `).join('');
    updateMeal();
  }
  function updateMeal() {
    const selected = data.mealFoods.filter((food) => state.meal.has(food.id));
    const covered = new Set(selected.flatMap((food) => food.roles));
    const score = covered.size;
    $('#meal-score').innerHTML = `${score}<span>/7</span>`;
    const palette = ['#c8ff62', '#91bfff', '#ffda4c', '#ff7058', '#f8a6d4', '#f3efe5', '#c8ff62', '#91bfff'];
    const segments = selected.length ? selected.map((food, index) => `${palette[index % palette.length]} ${index / selected.length * 100}% ${(index + 1) / selected.length * 100}%`) : ['#f3efe5 0% 100%'];
    $('#meal-plate').style.background = `conic-gradient(from 0deg, ${segments.join(',')})`;
    $('#role-list').innerHTML = data.mealRoles.map((role) => `<span class="role-pill${covered.has(role.id) ? ' is-covered' : ''}">${covered.has(role.id) ? '✓ ' : '○ '}${escapeHTML(role.label)}</span>`).join('');

    let summary = 'Choose foods to see which roles this learning tray represents.';
    if (selected.length) {
      const missing = data.mealRoles.filter((role) => !covered.has(role.id));
      if (!covered.has('energy')) summary = 'An energy base is missing. A tray’s role coverage is only a starting question, not a calorie calculation.';
      else if (!covered.has('protein')) summary = 'This pattern has an energy base but no explicit protein role. Add or inspect protein-rich options.';
      else if (!covered.has('b12')) summary = 'No explicit B12 source is selected. Fortified foods or individualized planning may also matter.';
      else if (score >= 6) summary = 'Broad role coverage. Portion size, preparation, affordability and individual needs still determine adequacy.';
      else if (missing.length) summary = `${score} of 7 roles represented. Missing: ${missing.map((role) => role.label.toLowerCase()).join(', ')}.`;
    }
    $('#meal-summary').textContent = summary;
    $$('[data-food]').forEach((button) => button.setAttribute('aria-pressed', String(state.meal.has(button.dataset.food))));
    storage.set('fp-meal-v1', [...state.meal]);
  }
  renderMealFoods();

  // Myth decoder.
  function renderMyths() {
    const myths = data.myths.filter((myth) => state.mythFilter === 'all' || myth.category === state.mythFilter);
    $('#myth-grid').innerHTML = myths.map((myth, index) => `
      <details class="myth-card" data-myth-id="${myth.id}"${state.openMyths.has(myth.id) ? ' open' : ''}>
        <summary><span class="myth-number">${String(index + 1).padStart(2, '0')}</span><span class="myth-claim">${escapeHTML(myth.claim)}</span><span class="myth-toggle" aria-hidden="true">+</span></summary>
        <div class="myth-body">
          <p class="response"><strong>The book’s challenge:</strong> ${escapeHTML(myth.response)}</p>
          <div class="myth-nuance"><strong>KEEP THE NUANCE</strong>${escapeHTML(myth.nuance)}</div>
          <div class="myth-meta"><span>${escapeHTML(myth.chapter)}</span><button type="button" data-open-source="${myth.source}">Source ↗</button></div>
        </div>
      </details>
    `).join('');
    $('#myth-status').textContent = state.mythFilter === 'all' ? `Showing all ${myths.length} claims` : `Showing ${myths.length} ${state.mythFilter} claim${myths.length === 1 ? '' : 's'}`;
    $$('.myth-card').forEach((card) => card.addEventListener('toggle', () => {
      if (card.open) state.openMyths.add(card.dataset.mythId); else state.openMyths.delete(card.dataset.mythId);
    }));
  }
  renderMyths();

  // Policy evidence lens.
  function renderPolicy() {
    const claims = data.policyClaims.filter((claim) => state.evidenceFilter === 'all' || claim.evidence === state.evidenceFilter);
    $('#policy-grid').innerHTML = claims.map((claim) => `
      <article class="policy-card" data-evidence="${claim.evidence}">
        <span class="policy-label">${escapeHTML(data.evidenceLabels[claim.evidence])}</span>
        <h3>${escapeHTML(claim.title)}</h3><p>${escapeHTML(claim.text)}</p>
        <div class="policy-check"><strong>Context check:</strong> ${escapeHTML(claim.check)}</div>
        <button class="policy-source" type="button" data-open-source="${claim.source}">Evidence note ↗</button>
      </article>
    `).join('');
    $('#evidence-count').textContent = `Showing ${claims.length} item${claims.length === 1 ? '' : 's'}`;
  }
  renderPolicy();

  // Trade-off canvas.
  function renderTradeoffTabs() {
    $('#tradeoff-tabs').innerHTML = data.tradeoffs.map((item) => `
      <button class="tradeoff-tab" id="tradeoff-${item.id}" type="button" role="tab" aria-selected="${item.id === state.tradeoff}" aria-controls="tradeoff-detail" tabindex="${item.id === state.tradeoff ? 0 : -1}" data-tradeoff="${item.id}">
        <span>${item.number}</span><strong>${escapeHTML(item.title)}</strong><i aria-hidden="true">→</i>
      </button>
    `).join('');
    setTradeoff(state.tradeoff);
  }
  function setTradeoff(id) {
    state.tradeoff = id;
    const item = data.tradeoffs.find((entry) => entry.id === id);
    $$('[data-tradeoff]').forEach((button) => {
      const active = button.dataset.tradeoff === id;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    $('#tradeoff-detail').setAttribute('aria-labelledby', `tradeoff-${id}`);
    $('#tradeoff-detail').innerHTML = `<span class="eyebrow">LENS ${item.number} / ${escapeHTML(item.title)}</span><h3>${escapeHTML(item.question)}</h3><div class="tradeoff-measures">${item.measures.map((measure) => `<span>${escapeHTML(measure)}</span>`).join('')}</div><p>${escapeHTML(item.note)}</p>`;
  }
  renderTradeoffTabs();

  // Chapter map and briefings.
  function renderChapters() {
    $('#chapter-grid').innerHTML = data.chapters.map((chapter) => `
      <button class="chapter-card" type="button" data-chapter="${chapter.number}">
        <span class="chapter-number">${chapter.number}</span><span class="chapter-kicker">${escapeHTML(chapter.kicker)}</span><h3>${escapeHTML(chapter.title)}</h3>
      </button>
    `).join('');
  }
  function openChapter(number) {
    const index = data.chapters.findIndex((chapter) => chapter.number === number);
    if (index < 0) return;
    const chapter = data.chapters[index];
    const next = data.chapters[(index + 1) % data.chapters.length];
    $('#chapter-dialog-kicker').textContent = `CHAPTER ${chapter.number} / ${chapter.kicker}`;
    $('#chapter-dialog-title').textContent = chapter.title;
    $('#chapter-dialog-body').innerHTML = `
      <div class="chapter-dialog-top"><span class="chapter-dialog-number">${chapter.number}</span><span>THE MEAT OF THE MATTER</span></div>
      <p class="chapter-summary">${escapeHTML(chapter.summary)}</p>
      <div class="chapter-question"><strong>QUESTION TO CARRY</strong><p>${escapeHTML(chapter.question)}</p></div>
      <p class="chapter-anchor"><strong>Evidence anchor:</strong> ${escapeHTML(chapter.anchor)}</p>
      <div class="chapter-dialog-actions">${sourceButton(chapter.source)}<button class="button button-ghost" type="button" data-next-chapter="${next.number}">Next chapter ${next.number} →</button></div>
    `;
    closeDialog($('#chapter-dialog'));
    $('#chapter-dialog').showModal();
  }
  renderChapters();

  // Action checklist.
  function actionProgress(role) {
    const checked = state.actions[role] || [];
    return data.actions[role].items.reduce((sum, _, index) => sum + (checked.includes(index) ? 1 : 0), 0);
  }
  function renderActionTabs() {
    $('#action-tabs').innerHTML = Object.entries(data.actions).map(([id, role]) => `
      <button class="action-tab" id="action-${id}" type="button" role="tab" aria-selected="${state.role === id}" aria-controls="action-checklist" tabindex="${state.role === id ? 0 : -1}" data-role="${id}">${escapeHTML(role.label)}</button>
    `).join('');
    renderActionContent();
  }
  function renderActionContent() {
    const role = data.actions[state.role];
    const checked = state.actions[state.role] || [];
    const progress = actionProgress(state.role);
    $$('[data-role]').forEach((button) => {
      const active = button.dataset.role === state.role;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    $('#action-title-role').textContent = role.label;
    $('#action-intro').textContent = role.intro;
    $('#action-progress').textContent = `${progress}/${role.items.length}`;
    $('#action-progress-bar').style.width = `${(progress / role.items.length) * 100}%`;
    $('#action-checklist').setAttribute('aria-labelledby', `action-${state.role}`);
    $('#action-checklist').innerHTML = role.items.map((item, index) => `
      <label class="action-item"><input type="checkbox" data-action-check="${index}"${checked.includes(index) ? ' checked' : ''}><span class="action-text">${escapeHTML(item)}</span></label>
    `).join('');
    $('#save-status').textContent = 'Saved on this device';
  }
  renderActionTabs();
  function saveActions() {
    const saved = storage.set('fp-actions-v1', state.actions);
    $('#save-status').textContent = saved ? 'Saved on this device' : 'Storage unavailable this session';
  }
  async function copyChecklist() {
    const role = data.actions[state.role];
    const checked = state.actions[state.role] || [];
    const text = `${role.label} — Plate & Power action checklist\n\n${role.items.map((item, index) => `${checked.includes(index) ? '[x]' : '[ ]'} ${item}`).join('\n')}\n\nSource: Plate & Power, an interactive companion to The Meat of the Matter.`;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const copied = document.execCommand('copy');
        area.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      toast('Checklist copied to clipboard');
    } catch { toast('Copy unavailable — select the checklist text instead'); }
  }
  $('#copy-checklist').addEventListener('click', copyChecklist);
  $('#clear-checklist').addEventListener('click', () => {
    delete state.actions[state.role];
    saveActions();
    renderActionContent();
    toast(`${data.actions[state.role].label} checklist cleared`);
  });

  // Sources.
  function renderSources() {
    $('#source-list').innerHTML = Object.entries(data.sources).map(([id, source]) => `
      <article class="source-item"><span class="source-id">${id}</span><div><h3>${escapeHTML(source.title)}</h3><p>${escapeHTML(source.publisher)} · ${escapeHTML(source.note)}</p></div><span class="source-type">${escapeHTML(source.type)}</span><a class="source-link" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(source.title)}"><svg class="icon" aria-hidden="true"><use href="#i-external"></use></svg></a></article>
    `).join('');
  }
  renderSources();

  // Search.
  function buildSearchIndex() {
    state.searchIndex = [
      ...data.chapters.map((chapter) => ({ id: `chapter-${chapter.number}`, type: 'chapter', marker: chapter.number, title: chapter.title, subtitle: `${chapter.kicker} · ${chapter.summary}`, action: () => openChapter(chapter.number) })),
      ...data.myths.map((myth) => ({ id: `myth-${myth.id}`, type: 'myth', marker: 'MY', title: myth.claim, subtitle: `${myth.chapter} · ${myth.response}`, action: () => { state.mythFilter = 'all'; $$('[data-myth-filter]').forEach((button) => { const active = button.dataset.mythFilter === 'all'; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); }); renderMyths(); document.getElementById('myths').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); requestAnimationFrame(() => { const card = $(`[data-myth-id="${myth.id}"]`); if (card) card.open = true; }); } })),
      ...Object.entries(data.nutrient).map(([id, nutrient]) => ({ id: `nutrient-${id}`, type: 'nutrient', marker: 'N', title: nutrient.title, subtitle: nutrient.intro, action: () => { renderNutrient(id); document.getElementById('nutrients').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); } })),
      ...data.accessSteps.map((step, index) => ({ id: `access-${step.id}`, type: 'access', marker: step.number, title: step.title, subtitle: `${step.short} ${step.text}`, action: () => { setAccess(index); document.getElementById('access').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); } })),
      ...data.tradeoffs.map((item) => ({ id: `tradeoff-${item.id}`, type: 'policy', marker: item.number, title: item.title, subtitle: item.question, action: () => { setTradeoff(item.id); document.getElementById('tradeoffs').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); } })),
      ...Object.entries(data.sources).map(([id, source]) => ({ id: `source-${id}`, type: 'source', marker: id, title: source.title, subtitle: `${source.publisher} · ${source.type}`, action: () => openSource(id) })),
      ...Object.entries(data.actions).map(([id, role]) => ({ id: `action-${id}`, type: 'action', marker: '→', title: `${role.label} actions`, subtitle: role.intro, action: () => { state.role = id; storage.set('fp-role-v1', id); renderActionTabs(); document.getElementById('action').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); } })),
      { id: 'meal-lab', type: 'interactive', marker: 'LAB', title: 'Build a learning tray', subtitle: 'Explore food-role coverage with an interactive meal model.', action: () => document.getElementById('meal-lab').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }) }
    ];
  }
  buildSearchIndex();

  function renderSearchResults(query = '') {
    const term = query.trim().toLowerCase();
    state.searchResults = term ? state.searchIndex
      .map((item, order) => {
        const title = item.title.toLowerCase();
        const subtitle = item.subtitle.toLowerCase();
        const id = item.id.toLowerCase();
        const score = title.startsWith(term) ? 100 : title.includes(term) ? 70 : id.includes(term) ? 60 : subtitle.includes(term) ? 30 : item.type.includes(term) ? 20 : 0;
        return { item, score, order };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .slice(0, 14)
      .map((entry) => entry.item) : state.searchIndex.filter((item) => item.type === 'chapter').slice(0, 7);
    state.searchSelection = Math.min(state.searchSelection, Math.max(0, state.searchResults.length - 1));
    $('#search-results').innerHTML = state.searchResults.length ? state.searchResults.map((item, index) => `
      <button class="search-result${index === state.searchSelection ? ' is-selected' : ''}" type="button" data-search-index="${index}"><span>${escapeHTML(item.marker)}</span><span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.type.toUpperCase())} · ${escapeHTML(item.subtitle.slice(0, 135))}${item.subtitle.length > 135 ? '…' : ''}</small></span><span aria-hidden="true">↗</span></button>
    `).join('') : `<div class="search-empty"><strong>No exact match.</strong><p>Try a broader idea: “protein”, “school”, “climate”, “myth” or “source”.</p></div>`;
  }
  function activateSearchResult(index) {
    const item = state.searchResults[index];
    if (!item) return;
    closeDialog($('#search-dialog'));
    item.action();
  }
  const searchDialog = $('#search-dialog');
  $('#search-trigger').addEventListener('click', () => {
    $('#search-input').value = '';
    state.searchSelection = 0;
    renderSearchResults();
    searchDialog.showModal();
    requestAnimationFrame(() => $('#search-input').focus());
  });
  $('#search-input').addEventListener('input', (event) => { state.searchSelection = 0; renderSearchResults(event.target.value); });
  $('#search-input').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); state.searchSelection = Math.min(state.searchSelection + 1, state.searchResults.length - 1); renderSearchResults(event.target.value); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); state.searchSelection = Math.max(state.searchSelection - 1, 0); renderSearchResults(event.target.value); }
    else if (event.key === 'Enter') { event.preventDefault(); activateSearchResult(state.searchSelection); }
  });

  // Delegated interactions.
  document.addEventListener('click', (event) => {
    const sourceTrigger = event.target.closest('[data-open-source]');
    if (sourceTrigger) { openSource(sourceTrigger.dataset.openSource); return; }

    const closeTrigger = event.target.closest('[data-close-dialog]');
    if (closeTrigger) { closeDialog(closeTrigger.closest('dialog')); return; }

    const accessTrigger = event.target.closest('[data-access-step]');
    if (accessTrigger) { setAccess(Number(accessTrigger.dataset.accessStep)); return; }

    const nutrientTrigger = event.target.closest('[data-nutrient]');
    if (nutrientTrigger) { renderNutrient(nutrientTrigger.dataset.nutrient); return; }

    const foodTrigger = event.target.closest('[data-food]');
    if (foodTrigger) {
      const id = foodTrigger.dataset.food;
      if (state.meal.has(id)) state.meal.delete(id); else state.meal.add(id);
      updateMeal();
      return;
    }

    const presetTrigger = event.target.closest('[data-meal-preset]');
    if (presetTrigger) {
      const presets = { cereal: ['staple'], lacto: ['staple', 'pulse', 'vegetable', 'greens', 'dairy', 'fruit'], mixed: ['staple', 'pulse', 'vegetable', 'greens', 'egg', 'fish', 'fruit'] };
      state.meal = new Set(presets[presetTrigger.dataset.mealPreset] || []);
      updateMeal();
      return;
    }

    const mythFilter = event.target.closest('[data-myth-filter]');
    if (mythFilter) {
      state.mythFilter = mythFilter.dataset.mythFilter;
      $$('[data-myth-filter]').forEach((button) => { const active = button === mythFilter; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
      renderMyths();
      return;
    }

    const evidenceFilter = event.target.closest('[data-evidence-filter]');
    if (evidenceFilter) {
      state.evidenceFilter = evidenceFilter.dataset.evidenceFilter;
      $$('[data-evidence-filter]').forEach((button) => { const active = button === evidenceFilter; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
      renderPolicy();
      return;
    }

    const tradeoffTrigger = event.target.closest('[data-tradeoff]');
    if (tradeoffTrigger) { setTradeoff(tradeoffTrigger.dataset.tradeoff); return; }

    const chapterTrigger = event.target.closest('[data-chapter]');
    if (chapterTrigger) { openChapter(chapterTrigger.dataset.chapter); return; }

    const nextChapter = event.target.closest('[data-next-chapter]');
    if (nextChapter) { openChapter(nextChapter.dataset.nextChapter); return; }

    const roleTrigger = event.target.closest('[data-role]');
    if (roleTrigger) { state.role = roleTrigger.dataset.role; storage.set('fp-role-v1', state.role); renderActionContent(); return; }

    const searchResult = event.target.closest('[data-search-index]');
    if (searchResult) activateSearchResult(Number(searchResult.dataset.searchIndex));
  });

  $('#meal-reset').addEventListener('click', () => { state.meal.clear(); updateMeal(); toast('Learning tray reset'); });

  document.addEventListener('change', (event) => {
    if (!event.target.matches('[data-action-check]')) return;
    const index = Number(event.target.dataset.actionCheck);
    const checked = new Set(state.actions[state.role] || []);
    if (event.target.checked) checked.add(index); else checked.delete(index);
    state.actions[state.role] = [...checked];
    saveActions();
    const progress = actionProgress(state.role);
    $('#action-progress').textContent = `${progress}/${data.actions[state.role].items.length}`;
    $('#action-progress-bar').style.width = `${(progress / data.actions[state.role].items.length) * 100}%`;
  });

  // Keyboard tab navigation and global search shortcut.
  $$('[role="tablist"]').forEach((tablist) => tablist.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = $$('[role="tab"]', tablist).filter((tab) => !tab.disabled);
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    tabs[next].click();
  }));

  document.addEventListener('keydown', (event) => {
    const typing = event.target.matches('input, textarea, [contenteditable="true"]');
    if ((event.key === '/' && !typing) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      if (!searchDialog.open) $('#search-trigger').click();
    }
    if (event.key === 'Escape' && menuTrigger.getAttribute('aria-expanded') === 'true') setMenu(false);
  });

  $$('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    }
  }));
})();
