(() => {
  'use strict';

  const KEY = 'fcw-profile-cosmetics-v1';
  const rewards = [
    { id: 'base', level: 1, icon: '◆', colors: ['#121924', '#121924', '#121924'], accent: '#bac7be' },
    { id: 'emerald', level: 3, icon: '✦', colors: ['#071713', '#174238', '#091b16'], accent: '#70d7b0' },
    { id: 'sapphire', level: 6, icon: '◇', colors: ['#081522', '#1c365c', '#0a1325'], accent: '#83bbff' },
    { id: 'gold', level: 10, icon: '★', colors: ['#20190c', '#54411e', '#15110a'], accent: '#f2ca72' },
    { id: 'aurora', level: 15, icon: '✧', colors: ['#102b2a', '#393054', '#122c35'], accent: '#c5acff' },
    { id: 'legend', level: 20, icon: '♛', colors: ['#2d1833', '#563559', '#1b213a'], accent: '#e3b5e8' }
  ];
  const copy = {
    it: {
      profile: 'LIVELLO DEL PROFILO', level: 'Livello', totalXP: 'XP totali',
      help: 'Ogni missione assegna XP una volta sola. Il livello resta tra le carriere e sblocca titoli e sfondi per la carta.',
      next: 'Prossimo sblocco', allRewards: 'Tutti gli stili sbloccati', rewards: 'Titoli e sfondi', cosmetic: 'Ricompense estetiche: si usano anche nella carta PNG.',
      equipped: 'In uso', available: 'Usa stile', locked: 'Da sbloccare', titleLabel: 'Titolo del profilo', background: 'Sfondo della carta',
      titles: ['Esordiente', 'Promessa', 'Protagonista', 'Fuoriclasse', 'Icona', 'Leggenda'],
      styles: ['Classico', 'Smeraldo', 'Zaffiro', 'Oro', 'Aurora', 'Leggenda'],
      pending: 'Da completare', earned: 'Ottenute', all: 'Tutte', filters: 'Filtra le missioni', category: 'Categoria',
      categories: ['Tutte le categorie', 'Attributi', 'Carriera e trofei', 'Esplorazione', 'Segrete'],
      empty: 'Nessuna missione in questa selezione.', show: n => 'Mostra tutte (' + n + ')', less: 'Riduci elenco',
      nextLevel: (xp, n) => xp + ' XP al livello ' + n, finish: xp => xp + ' XP per completare il catalogo', complete: 'Catalogo completato',
      nextReward: (n, title) => 'Livello ' + n + ' · ' + title, archiveXP: xp => xp + ' XP nelle missioni di questa carriera'
    },
    en: {
      profile: 'PROFILE LEVEL', level: 'Level', totalXP: 'total XP',
      help: 'Each quest awards XP once. Your level carries across careers and unlocks titles and card backgrounds.',
      next: 'Next unlock', allRewards: 'Every style unlocked', rewards: 'Titles & backgrounds', cosmetic: 'Cosmetic rewards also appear in the card PNG.',
      equipped: 'Equipped', available: 'Use style', locked: 'Locked', titleLabel: 'Profile title', background: 'Card background',
      titles: ['Rookie', 'Prospect', 'Star', 'World class', 'Icon', 'Legend'], styles: ['Classic', 'Emerald', 'Sapphire', 'Gold', 'Aurora', 'Legend'],
      pending: 'To complete', earned: 'Earned', all: 'All', filters: 'Filter quests', category: 'Category',
      categories: ['All categories', 'Attributes', 'Career & trophies', 'Exploration', 'Secret'],
      empty: 'No quests match this selection.', show: n => 'Show all (' + n + ')', less: 'Show fewer',
      nextLevel: (xp, n) => xp + ' XP to level ' + n, finish: xp => xp + ' XP to complete the catalog', complete: 'Catalog complete',
      nextReward: (n, title) => 'Level ' + n + ' · ' + title, archiveXP: xp => xp + ' XP from this career’s quests'
    },
    es: {
      profile: 'NIVEL DEL PERFIL', level: 'Nivel', totalXP: 'XP totales',
      help: 'Cada misión otorga XP una sola vez. Tu nivel se conserva entre carreras y desbloquea títulos y fondos para la carta.',
      next: 'Próximo desbloqueo', allRewards: 'Todos los estilos desbloqueados', rewards: 'Títulos y fondos', cosmetic: 'Las recompensas estéticas también aparecen en la carta PNG.',
      equipped: 'En uso', available: 'Usar estilo', locked: 'Bloqueado', titleLabel: 'Título del perfil', background: 'Fondo de la carta',
      titles: ['Novato', 'Promesa', 'Protagonista', 'Clase mundial', 'Icono', 'Leyenda'], styles: ['Clásico', 'Esmeralda', 'Zafiro', 'Oro', 'Aurora', 'Leyenda'],
      pending: 'Pendientes', earned: 'Obtenidas', all: 'Todas', filters: 'Filtrar misiones', category: 'Categoría',
      categories: ['Todas las categorías', 'Atributos', 'Carrera y trofeos', 'Exploración', 'Secretas'],
      empty: 'No hay misiones en esta selección.', show: n => 'Mostrar todas (' + n + ')', less: 'Mostrar menos',
      nextLevel: (xp, n) => xp + ' XP para el nivel ' + n, finish: xp => xp + ' XP para completar el catálogo', complete: 'Catálogo completado',
      nextReward: (n, title) => 'Nivel ' + n + ' · ' + title, archiveXP: xp => xp + ' XP en las misiones de esta carrera'
    },
    fr: {
      profile: 'NIVEAU DU PROFIL', level: 'Niveau', totalXP: 'XP au total',
      help: 'Chaque mission donne des XP une seule fois. Votre niveau reste entre les carrières et débloque des titres et des fonds de carte.',
      next: 'Prochain déblocage', allRewards: 'Tous les styles débloqués', rewards: 'Titres et fonds', cosmetic: 'Les récompenses visuelles apparaissent aussi dans la carte PNG.',
      equipped: 'Équipé', available: 'Utiliser', locked: 'Verrouillé', titleLabel: 'Titre du profil', background: 'Fond de carte',
      titles: ['Débutant', 'Espoir', 'Vedette', 'Classe mondiale', 'Icône', 'Légende'], styles: ['Classique', 'Émeraude', 'Saphir', 'Or', 'Aurore', 'Légende'],
      pending: 'À terminer', earned: 'Obtenues', all: 'Toutes', filters: 'Filtrer les missions', category: 'Catégorie',
      categories: ['Toutes les catégories', 'Attributs', 'Carrière et trophées', 'Exploration', 'Secrètes'],
      empty: 'Aucune mission dans cette sélection.', show: n => 'Tout afficher (' + n + ')', less: 'Réduire la liste',
      nextLevel: (xp, n) => xp + ' XP pour le niveau ' + n, finish: xp => xp + ' XP pour terminer le catalogue', complete: 'Catalogue terminé',
      nextReward: (n, title) => 'Niveau ' + n + ' · ' + title, archiveXP: xp => xp + ' XP dans les missions de cette carrière'
    }
  };
  const milestoneCopy = {
    it: { milestone: 'Il prossimo traguardo', lifetime: 'Tra tutte le carriere', career: 'In questa carriera', ready: 'Pronto: completa la carriera per ottenere gli XP', details: 'Vedi obiettivo', note: 'Gli XP si ottengono una volta sola, completando una carriera reale.' },
    en: { milestone: 'Your next milestone', lifetime: 'Across all careers', career: 'In this career', ready: 'Ready: finish the career to earn the XP', details: 'View objective', note: 'XP is earned once, after finishing a real career.' },
    es: { milestone: 'Tu próximo hito', lifetime: 'Entre todas las carreras', career: 'En esta carrera', ready: 'Listo: termina la carrera para obtener los XP', details: 'Ver objetivo', note: 'Los XP se obtienen una sola vez, al completar una carrera real.' },
    fr: { milestone: 'Votre prochain objectif', lifetime: 'Sur toutes les carrières', career: 'Dans cette carrière', ready: 'Prêt : terminez la carrière pour obtenir les XP', details: 'Voir l’objectif', note: 'Les XP sont obtenus une seule fois, après une vraie carrière terminée.' }
  };
  const $ = id => document.getElementById(id);
  const words = () => copy[document.documentElement.lang] || copy.it;
  const element = (tag, className, text) => { const el = document.createElement(tag); el.className = className; if (text !== undefined) el.textContent = text; return el; };
  let selected = 'base', restoredSelection = '', scope = 'pending', category = 'all', mounted = false, hasSavedSelection = false;
  const nodes = {};
  try { const value = JSON.parse(localStorage.getItem(KEY) || 'null'); if (rewards.some(r => r.id === value?.selected)) { selected = value.selected; hasSavedSelection = true; } } catch {}

  function profileState() {
    const profile = loadAchievementProfile(), missions = achievementDefinitions.map((item, index) => ({ item: item.metric === 'goals' && item.target === 1000 ? { ...item, target: 900 } : item, index, id: item.metric + '-' + item.target, xp: achievementXP(item) }));
    const earned = missions.filter(m => profile.unlocked[m.id]), xp = earned.reduce((sum, m) => sum + m.xp, 0);
    return { profile, missions, xp, level: Math.floor(xp / 500) + 1, count: earned.length, total: missions.length, maxXP: missions.reduce((sum, m) => sum + m.xp, 0) };
  }
  function equipped() {
    const state = profileState();
    return rewards.find(r => r.id === (restoredSelection || selected) && r.level <= state.level) || rewards[0];
  }
  function indexOfReward(reward) { return rewards.findIndex(r => r.id === reward.id); }
  function applyPresentation() {
    const card = $('cardInner'); if (!card) return;
    const reward = equipped(), image = card.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[0];
    if (image) card.style.backgroundImage = image + ', linear-gradient(135deg, ' + reward.colors.join(', ') + ')';
    card.style.backgroundColor = reward.colors[0];
    card.dataset.presentation = reward.id;
    const medal = $('playerAchievementMedal'); if (!medal) return;
    const c = words(), state = profileState(), index = indexOfReward(reward);
    medal.style.setProperty('--profile-accent', reward.accent);
    medal.className = 'player-achievement-medal profile-medal';
    medal.setAttribute('aria-label', c.titleLabel + ': ' + c.titles[index] + ' · ' + c.level + ' ' + state.level);
    medal.replaceChildren();
    const crest = element('span', 'player-achievement-crest', reward.icon); crest.setAttribute('aria-hidden', 'true');
    const content = element('span', 'player-achievement-medal-copy');
    content.append(element('strong', '', c.titles[index] + ' · ' + c.level + ' ' + state.level), element('small', '', state.xp + ' ' + c.totalXP));
    medal.append(crest, content);
  }
  function paintBackground(ctx, width, height) {
    const reward = equipped(), half = (width + height) / 4;
    const gradient = ctx.createLinearGradient(width / 2 - half, height / 2 - half, width / 2 + half, height / 2 + half);
    reward.colors.forEach((color, index) => gradient.addColorStop(index / (reward.colors.length - 1), color));
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
  }
  function missionCategory(item) {
    if (item.secret) return 'secret';
    if (item.group === 'account' || item.groupId === 'account' || item.category === 'account' || item.group === 'exploration' || item.category === 'exploration' || /^(completedCareers|careerCount|unique|lifetime|totalCareer|played)/.test(item.metric)) return 'exploration';
    if (item.group === 'attributes' || ['overall', 'bestStat', 'eliteStats', 'highStats', 'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'].includes(item.metric)) return 'attributes';
    return 'career';
  }
  function applyFilters() {
    if (!mounted) return;
    const c = words(), state = profileState(), live = missionState();
    const expanded = $('achievementList').classList.contains('is-expanded');
    const badges = [...$('achievementList').children];
    const candidates = state.missions.map(m => ({ ...m, node: badges.find(b => Number(b.dataset.missionIndex) === m.index) || badges[m.index], earned: Boolean(state.profile.unlocked[m.id]), current: live.missions[m.index]?.current || 0 }));
    const matches = candidates.filter(m => (scope === 'all' || m.earned === (scope === 'earned')) && (category === 'all' || missionCategory(m.item) === category));
    if (scope === 'pending') matches.sort((a, b) => Number(a.item.secret) - Number(b.item.secret) || Math.min(1, b.current / b.item.target) - Math.min(1, a.current / a.item.target) || a.index - b.index);
    const visible = new Set(matches.map(m => m.index)), featured = new Set(matches.slice(0, 3).map(m => m.index));
    candidates.forEach(m => { if (!m.node) return; m.node.dataset.missionIndex = String(m.index); m.node.hidden = !visible.has(m.index); m.node.classList.toggle('is-featured', featured.has(m.index)); });
    matches.forEach(m => { if (m.node) $('achievementList').append(m.node); });
    nodes.empty.hidden = matches.length > 0; nodes.empty.textContent = c.empty;
    const toggle = $('achievementToggle'); toggle.hidden = matches.length <= 3; toggle.textContent = expanded ? c.less : c.show(matches.length);
    toggle.setAttribute('aria-expanded', String(expanded));
    nodes.scopes.forEach(button => { button.textContent = c[button.dataset.scope]; button.setAttribute('aria-pressed', String(button.dataset.scope === scope)); });
    nodes.filter.setAttribute('aria-label', c.filters); nodes.categoryLabel.textContent = c.category;
    [...nodes.category.options].forEach((option, index) => option.textContent = c.categories[index]); nodes.category.setAttribute('aria-label', c.category);
  }
  function renderRewards(state, c) {
    const current = equipped(), index = indexOfReward(current), next = rewards.find(r => r.level > state.level);
    nodes.rewardTitle.textContent = c.rewards;
    nodes.rewardMeta.textContent = c.styles[index]; nodes.cosmetic.textContent = c.cosmetic;
    nodes.nextLabel.textContent = next ? c.next : c.allRewards;
    nodes.nextValue.textContent = next ? c.nextReward(next.level, c.styles[indexOfReward(next)]) : c.styles[c.styles.length - 1];
    nodes.rewards.forEach(({ reward, button, name, title, status }) => {
      const unlocked = state.level >= reward.level, active = current.id === reward.id, i = indexOfReward(reward);
      button.disabled = !unlocked; button.setAttribute('aria-pressed', String(active)); button.classList.toggle('is-equipped', active);
      name.textContent = c.styles[i]; title.textContent = c.titleLabel + ': ' + c.titles[i];
      status.textContent = active ? c.equipped : unlocked ? c.available : c.level + ' ' + reward.level;
      button.setAttribute('aria-label', c.styles[i] + ' · ' + c.titles[i] + ' · ' + status.textContent);
    });
  }
  function renderMilestone() {
    const item = window.fcwAchievements?.nextMilestone?.();
    nodes.milestone.hidden = !item;
    if (!item) return;
    const locale = document.documentElement.lang, c = milestoneCopy[locale] || milestoneCopy.it;
    const labels = (achievementCopy[locale] || achievementCopy.it).items[item.index];
    nodes.milestone.style.setProperty('--milestone-accent', item.color);
    nodes.milestoneLabel.textContent = c.milestone;
    nodes.milestoneName.textContent = labels[0]; nodes.milestoneRule.textContent = labels[1];
    nodes.milestoneIcon.textContent = item.icon;
    nodes.milestoneReward.textContent = '+' + item.xp + ' XP';
    nodes.milestoneScope.textContent = item.ready ? c.ready : c[item.scope];
    nodes.milestoneAmount.textContent = new Intl.NumberFormat(locale).format(item.current) + ' / ' + new Intl.NumberFormat(locale).format(item.target);
    nodes.milestoneFill.style.width = Math.round(item.progress * 100) + '%';
    nodes.milestoneMeter.setAttribute('aria-label', labels[0]);
    nodes.milestoneMeter.setAttribute('aria-valuenow', String(item.current));
    nodes.milestoneMeter.setAttribute('aria-valuemax', String(item.target));
    nodes.milestoneButton.setAttribute('aria-label', c.details + ': ' + labels[0]);
    nodes.milestoneNote.textContent = c.note;
  }
  function render() {
    mount(); if (!mounted) return;
    const state = profileState(), c = words();
    if (!hasSavedSelection) {
      selected = rewards.filter(r => r.level <= state.level).at(-1).id;
      hasSavedSelection = true;
      try { localStorage.setItem(KEY, JSON.stringify({ version: 1, selected })); } catch {}
    }
    const reward = equipped();
    nodes.hero.style.setProperty('--profile-accent', reward.accent);
    nodes.profile.textContent = c.profile;
    nodes.level.textContent = c.level + ' ' + state.level;
    nodes.title.textContent = c.titles[indexOfReward(reward)];
    nodes.xp.textContent = state.xp + ' ' + c.totalXP;
    nodes.help.textContent = c.help;
    const nextThreshold = Math.min((state.level * 500), state.maxXP), remaining = Math.max(0, nextThreshold - state.xp);
    nodes.progress.textContent = state.count === state.total ? c.complete : nextThreshold < state.level * 500 ? c.finish(remaining) : c.nextLevel(remaining, state.level + 1);
    const previousThreshold = (state.level - 1) * 500, span = Math.max(1, nextThreshold - previousThreshold);
    nodes.fill.style.width = (state.count === state.total ? 100 : Math.min(100, Math.max(0, (state.xp - previousThreshold) / span * 100))) + '%';
    const countText = state.count + '/' + state.total + ' ' + (achievementCopy[document.documentElement.lang] || achievementCopy.it).count;
    $('achievementSummaryCount').textContent = countText;
    $('achievementCount').textContent = countText;
    $('careerLevelSummary').textContent = c.level + ' ' + state.level + ' · ' + state.xp + ' XP';
    renderRewards(state, c); renderMilestone(); applyPresentation(); applyFilters();
  }
  function mount() {
    if (mounted || !$('achievementPanel')) return;
    mounted = true;
    const panel = $('achievementPanel');
    nodes.hero = element('section', 'profile-progression'); nodes.hero.id = 'profileProgression';
    const top = element('div', 'profile-progression-top'), levelCopy = element('div', 'profile-progression-copy');
    nodes.profile = element('small', 'profile-progression-eyebrow');
    const headline = element('div', 'profile-progression-headline'); nodes.level = element('strong', 'profile-progression-level'); nodes.title = element('span', 'profile-progression-title'); headline.append(nodes.level, nodes.title);
    nodes.xp = element('small', 'profile-progression-xp'); levelCopy.append(nodes.profile, headline, nodes.xp);
    const next = element('div', 'profile-progression-next'); nodes.nextLabel = element('small', ''); nodes.nextValue = element('strong', ''); next.append(nodes.nextLabel, nodes.nextValue); top.append(levelCopy, next);
    const meter = element('div', 'profile-progression-meter'); meter.setAttribute('aria-hidden', 'true'); nodes.fill = element('span', ''); meter.append(nodes.fill);
    nodes.progress = element('small', 'profile-progression-progress'); nodes.help = element('p', 'profile-progression-help');
    nodes.hero.append(top, meter, nodes.progress, nodes.help);
    nodes.milestone = element('section', 'next-achievement-milestone'); nodes.milestone.id = 'nextAchievementMilestone'; nodes.milestone.hidden = true;
    nodes.milestoneLabel = element('small', 'next-milestone-label'); nodes.milestoneLabel.id = 'nextAchievementMilestoneLabel';
    nodes.milestone.setAttribute('aria-labelledby', nodes.milestoneLabel.id);
    nodes.milestoneButton = element('button', 'next-milestone-open'); nodes.milestoneButton.type = 'button';
    nodes.milestoneIcon = element('span', 'next-milestone-icon'); nodes.milestoneIcon.setAttribute('aria-hidden', 'true');
    const milestoneCopyBlock = element('span', 'next-milestone-copy'); nodes.milestoneName = element('strong', ''); nodes.milestoneRule = element('small', ''); milestoneCopyBlock.append(nodes.milestoneName, nodes.milestoneRule);
    nodes.milestoneReward = element('b', 'next-milestone-reward'); nodes.milestoneButton.append(nodes.milestoneIcon, milestoneCopyBlock, nodes.milestoneReward);
    nodes.milestoneButton.addEventListener('click', () => {
      const item = window.fcwAchievements?.nextMilestone?.(); if (!item) return;
      const mission = missionState().missions[item.index];
      showAchievementDetails({ ...mission, current: item.current, earned: false }, achievementCopy[document.documentElement.lang] || achievementCopy.it);
    });
    nodes.milestoneMeter = element('div', 'next-milestone-meter'); nodes.milestoneMeter.setAttribute('role', 'progressbar'); nodes.milestoneMeter.setAttribute('aria-valuemin', '0'); nodes.milestoneFill = element('span', ''); nodes.milestoneMeter.append(nodes.milestoneFill);
    const milestoneMeta = element('div', 'next-milestone-meta'); nodes.milestoneScope = element('small', ''); nodes.milestoneAmount = element('small', ''); milestoneMeta.append(nodes.milestoneScope, nodes.milestoneAmount);
    nodes.milestoneNote = element('p', 'next-milestone-note'); nodes.milestone.append(nodes.milestoneLabel, nodes.milestoneButton, nodes.milestoneMeter, milestoneMeta, nodes.milestoneNote);
    nodes.rewardDetails = element('details', 'profile-rewards'); nodes.rewardDetails.id = 'profileRewards';
    const summary = element('summary', ''); nodes.rewardTitle = element('strong', ''); nodes.rewardMeta = element('small', ''); summary.append(nodes.rewardTitle, nodes.rewardMeta);
    const body = element('div', 'profile-rewards-body'); nodes.cosmetic = element('p', 'profile-rewards-help'); const grid = element('div', 'profile-rewards-grid'); nodes.rewards = [];
    rewards.forEach(reward => {
      const button = element('button', 'profile-reward'); button.type = 'button'; button.dataset.reward = reward.id; button.style.setProperty('--reward-accent', reward.accent);
      const swatch = element('span', 'profile-reward-swatch', reward.icon); swatch.style.backgroundImage = 'linear-gradient(135deg,' + reward.colors.join(',') + ')'; swatch.setAttribute('aria-hidden', 'true');
      const text = element('span', 'profile-reward-copy'), name = element('strong', ''), title = element('small', ''), status = element('span', 'profile-reward-status'); text.append(name, title); button.append(swatch, text, status);
      button.addEventListener('click', () => {
        if (profileState().level < reward.level) return;
        selected = reward.id; restoredSelection = ''; try { localStorage.setItem(KEY, JSON.stringify({ version: 1, selected })); } catch {}
        render();
      });
      grid.append(button); nodes.rewards.push({ reward, button, name, title, status });
    });
    body.append(nodes.cosmetic, grid); nodes.rewardDetails.append(summary, body);
    nodes.filter = element('div', 'mission-filters'); nodes.scopes = ['pending', 'earned', 'all'].map(value => { const button = element('button', ''); button.type = 'button'; button.dataset.scope = value; button.addEventListener('click', () => { scope = value; $('achievementList').classList.remove('is-expanded'); $('achievementToggle').setAttribute('aria-expanded', 'false'); applyFilters(); }); nodes.filter.append(button); return button; });
    const categoryLabel = element('label', 'mission-category'); nodes.categoryLabel = element('span', ''); nodes.category = element('select', ''); nodes.category.id = 'missionCategory';
    ['all', 'attributes', 'career', 'exploration', 'secret'].forEach(value => { const option = document.createElement('option'); option.value = value; nodes.category.append(option); });
    nodes.category.addEventListener('change', () => { category = nodes.category.value; $('achievementList').classList.remove('is-expanded'); applyFilters(); }); categoryLabel.append(nodes.categoryLabel, nodes.category); nodes.filter.append(categoryLabel);
    nodes.empty = element('p', 'mission-empty'); nodes.empty.hidden = true;
    $('achievementList').before(nodes.hero, nodes.milestone, nodes.rewardDetails, nodes.filter, nodes.empty);
    $('achievementList').setAttribute('aria-live', 'off');
    $('achievementToggle').addEventListener('click', () => queueMicrotask(applyFilters));
    window.fcwExperience?.registerPersistence({ id: 'presentation', serialize: () => ({ version: 1, reward: equipped().id }), restore(data) { restoredSelection = rewards.some(r => r.id === data?.reward) ? data.reward : ''; render(); } });
  }
  const oldRender = window.renderAchievements;
  window.renderAchievements = function (...args) { const result = oldRender.apply(this, args); render(); return result; };
  const oldArchive = window.renderArchive;
  window.renderArchive = function (...args) {
    const result = oldArchive.apply(this, args), c = words();
    const entries = savedCareers();
    document.querySelectorAll('#archiveList .archive-item').forEach((row, index) => {
      const entry = entries[index], text = row.querySelector('.archive-achievement-summary'); if (!entry || !text) return;
      const state = missionState(normalizeCareerAnswers(entry), entry.stats || [], entry.overall || 0, entry.traits || []);
      text.textContent = c.archiveXP(state.xp);
    });
    return result;
  };
  window.fcwProgression = { state: profileState, presentation: () => equipped().id, paintBackground };
  ['fcw:state', 'fcw:complete', 'fcw:language', 'fcw:ready'].forEach(name => window.addEventListener(name, render));
  window.addEventListener('fcw:reset', () => { restoredSelection = ''; render(); });
  window.addEventListener('fcw:account-restore', () => {
    selected = 'base'; restoredSelection = ''; hasSavedSelection = false;
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (rewards.some(reward => reward.id === value?.selected)) {
        selected = value.selected; hasSavedSelection = true;
      }
    } catch { /* An empty account uses its highest unlocked style. */ }
    render();
  });
  window.addEventListener('storage', event => {
    if (event.key !== KEY || (event.storageArea && event.storageArea !== localStorage) || window.fcwAccountHydrating === true) return;
    try {
      const sync = window.fcwAccountSync;
      const owner = JSON.parse(localStorage.getItem('fcw-account-owner-v1') || 'null');
      // The shared cache can already belong to another account before its owner event arrives.
      if ((owner?.userId || null) !== (sync?.state?.()?.userId || null)) return;
      const value = JSON.parse(localStorage.getItem(KEY) || 'null');
      selected = rewards.some(reward => reward.id === value?.selected) ? value.selected : rewards.filter(reward => reward.level <= profileState().level).at(-1).id;
      hasSavedSelection = true;
      render();
    } catch { /* A malformed shared cache keeps the current presentation. */ }
  });
  $('languageSelect')?.addEventListener('change', () => requestAnimationFrame(() => { window.renderAchievements(); window.renderArchive(); }));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true }); else render();
})();
