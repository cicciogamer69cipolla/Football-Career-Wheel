(() => {
  'use strict';

  const VERSION = 1;
  const RECORD_KEY = 'fcw-personal-records-v1';
  const limits = {
    overall: { min: 50, max: 99, step: 1, initial: 85 },
    goals: { min: 10, max: 900, step: 10, initial: 500 },
    assists: { min: 10, max: 500, step: 10, initial: 300 },
    trophies: { min: 1, max: 34, step: 1, initial: 8 },
    careerPoints: { min: 50, max: 800, step: 10, initial: 300 }
  };
  const scenarioRules = {
    bomber: { icon: '⚽', metric: 'goals', target: 500, checks: [['goals', 500], ['shooting', 85]] },
    maestro: { icon: '🎯', metric: 'assists', target: 300, checks: [['assists', 300], ['passing', 85]] },
    captain: { icon: '©', metric: 'trophies', target: 3, checks: [['seasons', 15], ['league', 3]] },
    national: { icon: '🌍', metric: 'trophies', target: 2, checks: [['world', 1], ['continental', 1]] },
    wall: { icon: '🛡', metric: 'overall', target: 85, checks: [['defending', 90], ['physical', 85]] },
    complete: { icon: '✦', metric: 'overall', target: 85, checks: [['overall', 85], ['lowestStat', 80]] }
  };
  const copy = {
    it: {
      scenarios: 'Scenari speciali', scenarioIntro: 'Scegli una storia e prova a raggiungere i suoi obiettivi. Le ruote restano casuali.', free: 'Carriera libera', choose: 'Scegli scenario', selected: 'Selezionato', locked: 'Per cambiare scenario, ricomincia la carriera.',
      custom: 'Sfida con gli amici', customIntro: 'Scegli un obiettivo e condividi il codice. Chi usa lo stesso codice riceve la stessa sequenza casuale: le scelte negli eventi possono cambiare il finale.', title: 'Nome della sfida (facoltativo)', titlePlaceholder: 'La sfida del gruppo', metric: 'Obiettivo', target: 'Valore da raggiungere', create: 'Crea e attiva sfida', importLabel: 'Codice o link della sfida', importPlaceholder: 'Incolla un codice CW1… o il link', import: 'Importa sfida', copyCode: 'Copia codice', copyLink: 'Copia link', code: 'Codice sfida', link: 'Link invito', active: 'Obiettivo attivo', clear: 'Carriera libera', playAgain: 'Riprova', running: 'In corso', ready: 'Pronta per il primo giro', success: 'Obiettivo raggiunto', missed: 'Obiettivo non raggiunto', result: 'Risultato della sfida', resultNotice: 'L’obiettivo viene verificato al termine di tutte le ruote.', seed: 'Stessa sequenza con lo stesso codice', invalid: 'Il codice è incompleto, danneggiato o non supportato.', range: (min, max) => `Scegli un numero intero tra ${min} e ${max}.`, titleLong: 'Il nome può contenere al massimo 48 caratteri.', unavailable: 'La carriera non è ancora pronta. Riprova tra un momento.', copied: 'Copiato.', copyManual: 'Seleziona il campo e copialo manualmente.', activated: 'Sfida attivata. Inserisci nome e numero, poi gira la ruota.', removed: 'Carriera libera attivata.', confirm: 'La carriera in corso verrà ricominciata per cambiare sfida. Continuare?', cancel: 'La carriera in corso è stata mantenuta.', records: 'Record personali', recordsHelp: 'I primati si aggiornano completando una nuova carriera reale. Le anteprime e le carriere riaperte dall’archivio non contano.', noRecords: 'Completa una carriera per stabilire i tuoi primi record.', newRecord: 'Nuovi primati personali', by: 'ottenuto da', points: 'CP', goalText: (label, value) => `${label} almeno ${value}`, progress: (current, target) => `${current} / ${target}`, recordCount: n => `${n} carriere completate`,
      metrics: { overall: 'OVR', goals: 'Gol', assists: 'Assist', trophies: 'Trofei', careerPoints: 'Career Points', shooting: 'Tiro', passing: 'Passaggi', seasons: 'Stagioni', league: 'Campionati', world: 'Mondiali', continental: 'Coppe continentali', defending: 'Difesa', physical: 'Fisico', lowestStat: 'Tutti gli attributi' },
      scenarioCopy: { bomber: ['Bomber senza limiti', 'Segna almeno 500 gol e chiudi con tiro almeno 85.'], maestro: ['Il regista', 'Raggiungi 300 assist e passaggi almeno 85.'], captain: ['Il capitano', 'Gioca almeno 15 stagioni e vinci 3 campionati.'], national: ['Leggenda nazionale', 'Vinci almeno un Mondiale e una coppa continentale.'], wall: ['Il muro', 'Chiudi con difesa almeno 90 e fisico almeno 85.'], complete: ['Calciatore completo', 'Raggiungi OVR 85 e almeno 80 in tutti e sei gli attributi.'] }
    },
    en: {
      scenarios: 'Special scenarios', scenarioIntro: 'Choose a story and try to meet its goals. Wheel results stay random.', free: 'Free career', choose: 'Choose scenario', selected: 'Selected', locked: 'Restart your career to change the scenario.',
      custom: 'Challenge your friends', customIntro: 'Pick a goal and share the code. The same code gives everyone the same random sequence; event choices can change the final result.', title: 'Challenge name (optional)', titlePlaceholder: 'The group challenge', metric: 'Goal', target: 'Target value', create: 'Create and activate', importLabel: 'Challenge code or link', importPlaceholder: 'Paste a CW1… code or link', import: 'Import challenge', copyCode: 'Copy code', copyLink: 'Copy link', code: 'Challenge code', link: 'Invite link', active: 'Active goal', clear: 'Free career', playAgain: 'Try again', running: 'In progress', ready: 'Ready for the first spin', success: 'Goal achieved', missed: 'Goal missed', result: 'Challenge result', resultNotice: 'The goal is checked after you finish every wheel.', seed: 'Same code, same sequence', invalid: 'The code is incomplete, damaged, or unsupported.', range: (min, max) => `Choose a whole number between ${min} and ${max}.`, titleLong: 'The name can contain up to 48 characters.', unavailable: 'The career is not ready yet. Try again in a moment.', copied: 'Copied.', copyManual: 'Select the field and copy it manually.', activated: 'Challenge activated. Enter your name and number, then spin.', removed: 'Free career activated.', confirm: 'Your current career will restart to change the challenge. Continue?', cancel: 'Your current career has been kept.', records: 'Personal records', recordsHelp: 'Records update when you finish a new real career. Previews and careers reopened from the archive do not count.', noRecords: 'Finish a career to set your first records.', newRecord: 'New personal records', by: 'set by', points: 'CP', goalText: (label, value) => `${label} at least ${value}`, progress: (current, target) => `${current} / ${target}`, recordCount: n => `${n} completed careers`,
      metrics: { overall: 'OVR', goals: 'Goals', assists: 'Assists', trophies: 'Trophies', careerPoints: 'Career Points', shooting: 'Shooting', passing: 'Passing', seasons: 'Seasons', league: 'League titles', world: 'World Cups', continental: 'Continental cups', defending: 'Defending', physical: 'Physical', lowestStat: 'Every attribute' },
      scenarioCopy: { bomber: ['Goal machine', 'Score at least 500 goals and finish with shooting at least 85.'], maestro: ['The playmaker', 'Reach 300 assists and passing of at least 85.'], captain: ['The captain', 'Play at least 15 seasons and win 3 league titles.'], national: ['National legend', 'Win at least one World Cup and one continental cup.'], wall: ['The wall', 'Finish with defending of at least 90 and physical of at least 85.'], complete: ['The complete player', 'Reach OVR 85 and at least 80 in all six attributes.'] }
    },
    es: {
      scenarios: 'Escenarios especiales', scenarioIntro: 'Elige una historia e intenta alcanzar sus objetivos. Las ruletas siguen siendo aleatorias.', free: 'Carrera libre', choose: 'Elegir escenario', selected: 'Seleccionado', locked: 'Reinicia la carrera para cambiar el escenario.',
      custom: 'Desafía a tus amigos', customIntro: 'Elige un objetivo y comparte el código. El mismo código ofrece la misma secuencia aleatoria; las decisiones en los eventos pueden cambiar el resultado.', title: 'Nombre del reto (opcional)', titlePlaceholder: 'El reto del grupo', metric: 'Objetivo', target: 'Valor que alcanzar', create: 'Crear y activar', importLabel: 'Código o enlace del reto', importPlaceholder: 'Pega un código CW1… o un enlace', import: 'Importar reto', copyCode: 'Copiar código', copyLink: 'Copiar enlace', code: 'Código del reto', link: 'Enlace de invitación', active: 'Objetivo activo', clear: 'Carrera libre', playAgain: 'Reintentar', running: 'En curso', ready: 'Listo para el primer giro', success: 'Objetivo alcanzado', missed: 'Objetivo no alcanzado', result: 'Resultado del reto', resultNotice: 'El objetivo se comprueba al terminar todas las ruletas.', seed: 'Mismo código, misma secuencia', invalid: 'El código está incompleto, dañado o no es compatible.', range: (min, max) => `Elige un número entero entre ${min} y ${max}.`, titleLong: 'El nombre puede tener hasta 48 caracteres.', unavailable: 'La carrera aún no está lista. Inténtalo de nuevo en un momento.', copied: 'Copiado.', copyManual: 'Selecciona el campo y cópialo manualmente.', activated: 'Reto activado. Introduce nombre y número, y gira la ruleta.', removed: 'Carrera libre activada.', confirm: 'La carrera actual se reiniciará para cambiar de reto. ¿Continuar?', cancel: 'Se ha conservado la carrera actual.', records: 'Récords personales', recordsHelp: 'Los récords se actualizan al completar una nueva carrera real. Las vistas previas y las carreras reabiertas desde el archivo no cuentan.', noRecords: 'Completa una carrera para establecer tus primeros récords.', newRecord: 'Nuevos récords personales', by: 'conseguido por', points: 'CP', goalText: (label, value) => `${label}: al menos ${value}`, progress: (current, target) => `${current} / ${target}`, recordCount: n => `${n} carreras completadas`,
      metrics: { overall: 'OVR', goals: 'Goles', assists: 'Asistencias', trophies: 'Trofeos', careerPoints: 'Puntos de carrera', shooting: 'Tiro', passing: 'Pases', seasons: 'Temporadas', league: 'Ligas', world: 'Mundiales', continental: 'Copas continentales', defending: 'Defensa', physical: 'Físico', lowestStat: 'Todos los atributos' },
      scenarioCopy: { bomber: ['Goleador sin límites', 'Marca al menos 500 goles y termina con tiro de 85 o más.'], maestro: ['El organizador', 'Alcanza 300 asistencias y pases de 85 o más.'], captain: ['El capitán', 'Juega al menos 15 temporadas y gana 3 ligas.'], national: ['Leyenda nacional', 'Gana al menos un Mundial y una copa continental.'], wall: ['El muro', 'Termina con defensa de 90 o más y físico de 85 o más.'], complete: ['Jugador completo', 'Alcanza OVR 85 y al menos 80 en los seis atributos.'] }
    },
    fr: {
      scenarios: 'Scénarios spéciaux', scenarioIntro: 'Choisissez une histoire et tentez d’atteindre ses objectifs. Les roues restent aléatoires.', free: 'Carrière libre', choose: 'Choisir le scénario', selected: 'Sélectionné', locked: 'Recommencez la carrière pour changer de scénario.',
      custom: 'Défiez vos amis', customIntro: 'Choisissez un objectif et partagez le code. Le même code donne la même suite aléatoire ; les choix dans les événements peuvent changer le résultat final.', title: 'Nom du défi (facultatif)', titlePlaceholder: 'Le défi du groupe', metric: 'Objectif', target: 'Valeur à atteindre', create: 'Créer et activer', importLabel: 'Code ou lien du défi', importPlaceholder: 'Collez un code CW1… ou le lien', import: 'Importer le défi', copyCode: 'Copier le code', copyLink: 'Copier le lien', code: 'Code du défi', link: 'Lien d’invitation', active: 'Objectif actif', clear: 'Carrière libre', playAgain: 'Réessayer', running: 'En cours', ready: 'Prêt pour le premier tour', success: 'Objectif atteint', missed: 'Objectif non atteint', result: 'Résultat du défi', resultNotice: 'L’objectif est vérifié après toutes les roues.', seed: 'Même code, même séquence', invalid: 'Le code est incomplet, endommagé ou non pris en charge.', range: (min, max) => `Choisissez un entier entre ${min} et ${max}.`, titleLong: 'Le nom peut contenir jusqu’à 48 caractères.', unavailable: 'La carrière n’est pas encore prête. Réessayez dans un instant.', copied: 'Copié.', copyManual: 'Sélectionnez le champ et copiez-le manuellement.', activated: 'Défi activé. Saisissez votre nom et votre numéro, puis tournez la roue.', removed: 'Carrière libre activée.', confirm: 'La carrière actuelle va recommencer pour changer de défi. Continuer ?', cancel: 'La carrière actuelle a été conservée.', records: 'Records personnels', recordsHelp: 'Les records changent après une nouvelle carrière terminée. Les aperçus et les carrières rouvertes depuis les archives ne comptent pas.', noRecords: 'Terminez une carrière pour établir vos premiers records.', newRecord: 'Nouveaux records personnels', by: 'établi par', points: 'CP', goalText: (label, value) => `${label} : au moins ${value}`, progress: (current, target) => `${current} / ${target}`, recordCount: n => `${n} carrières terminées`,
      metrics: { overall: 'GEN', goals: 'Buts', assists: 'Passes décisives', trophies: 'Trophées', careerPoints: 'Points de carrière', shooting: 'Tir', passing: 'Passes', seasons: 'Saisons', league: 'Championnats', world: 'Coupes du monde', continental: 'Coupes continentales', defending: 'Défense', physical: 'Physique', lowestStat: 'Tous les attributs' },
      scenarioCopy: { bomber: ['Machine à buts', 'Marquez au moins 500 buts et terminez avec un tir d’au moins 85.'], maestro: ['Le meneur de jeu', 'Atteignez 300 passes décisives et une note de passes d’au moins 85.'], captain: ['Le capitaine', 'Jouez au moins 15 saisons et remportez 3 championnats.'], national: ['Légende nationale', 'Remportez au moins une Coupe du monde et une coupe continentale.'], wall: ['Le mur', 'Terminez avec une défense d’au moins 90 et un physique d’au moins 85.'], complete: ['Le joueur complet', 'Atteignez une GEN de 85 et au moins 80 dans les six attributs.'] }
    }
  };
  copy.it.waitSpin = 'Attendi che la ruota si fermi prima di cambiare sfida.';
  copy.en.waitSpin = 'Wait for the wheel to stop before changing the challenge.';
  copy.es.waitSpin = 'Espera a que la ruleta se detenga antes de cambiar de reto.';
  copy.fr.waitSpin = 'Attendez que la roue s’arrête avant de changer de défi.';

  function checksum(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) hash = Math.imul(hash ^ input.charCodeAt(i), 16777619);
    return (hash >>> 0).toString(36).padStart(7, '0');
  }

  function validateChallenge(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('invalid');
    const metric = input.metric;
    if (!Object.hasOwn(limits, metric)) throw new Error('invalid');
    const target = Number(input.target), rule = limits[metric];
    if (!Number.isSafeInteger(target) || target < rule.min || target > rule.max) throw new Error('range');
    const title = String(input.title || '').trim();
    if (title.length > 48 || /[\u0000-\u001f]/.test(title)) throw new Error('titleLong');
    const seed = String(input.seed || '');
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(seed)) throw new Error('invalid');
    const scenarioId = input.scenarioId ? String(input.scenarioId) : '';
    if (scenarioId && !Object.hasOwn(scenarioRules, scenarioId)) throw new Error('invalid');
    if (scenarioId && (scenarioRules[scenarioId].metric !== metric || scenarioRules[scenarioId].target !== target)) throw new Error('invalid');
    const config = { title, metric, target, seed };
    if (scenarioId) config.scenarioId = scenarioId;
    config.id = `cw-${checksum(JSON.stringify(config))}`;
    return config;
  }

  function encodeChallenge(input) {
    const config = validateChallenge(input);
    const payload = JSON.stringify({ v: VERSION, t: config.title, m: config.metric, n: config.target, s: config.seed, ...(config.scenarioId ? { c: config.scenarioId } : {}) });
    const bytes = new TextEncoder().encode(payload);
    const packed = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `CW${VERSION}.${packed}.${checksum(packed)}`;
  }

  function decodeChallenge(raw) {
    let token = String(raw || '').trim();
    if (token.length > 1600) throw new Error('invalid');
    if (/^https?:\/\//i.test(token)) {
      try { token = new URL(token).searchParams.get('challenge') || ''; }
      catch { throw new Error('invalid'); }
    }
    const match = /^CW1\.([A-Za-z0-9_-]{8,1100})\.([a-z0-9]{7})$/.exec(token);
    if (!match || match[2] !== checksum(match[1])) throw new Error('invalid');
    try {
      const base64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
      const bytes = Uint8Array.from(atob(base64), letter => letter.charCodeAt(0));
      const input = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
      if (input.v !== VERSION) throw new Error('invalid');
      return validateChallenge({ title: input.t, metric: input.m, target: input.n, seed: input.s, scenarioId: input.c });
    } catch { throw new Error('invalid'); }
  }

  const number = value => Number.isFinite(Number(value)) ? Number(value) : Number.parseInt(String(value || '').replace(/[^\d]/g, ''), 10) || 0;
  function metricsFor(player, score = 0) {
    const data = player || {}, career = data.career || {};
    const stats = (Array.isArray(data.stats) ? data.stats : []).map(value => number(Array.isArray(value) ? value[1] : value));
    return {
      overall: number(data.overall), goals: number(career.goals), assists: number(career.assists), seasons: number(career.seasons), league: number(career.league), world: number(career.world), continental: number(career.continental),
      trophies: ['league', 'champions', 'world', 'continental', 'ballon'].reduce((total, key) => total + number(career[key]), 0), careerPoints: number(typeof score === 'object' && score ? score.total ?? score.careerPoints : score),
      shooting: stats[1] || 0, passing: stats[2] || 0, defending: stats[4] || 0, physical: stats[5] || 0, lowestStat: stats.length === 6 ? Math.min(...stats) : 0
    };
  }
  function evaluateChallenge(config, metrics) {
    const normalized = validateChallenge(config);
    const checks = normalized.scenarioId ? scenarioRules[normalized.scenarioId].checks : [[normalized.metric, normalized.target]];
    return { success: checks.every(([metric, target]) => number(metrics[metric]) >= target), checks: checks.map(([metric, target]) => ({ metric, target, current: number(metrics[metric]), reached: number(metrics[metric]) >= target })) };
  }
  const publicAPI = { limits, scenarioRules, checksum, validateChallenge, encodeChallenge, decodeChallenge, metricsFor, evaluateChallenge };
  if (typeof module !== 'undefined' && module.exports) module.exports = publicAPI;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.FCWChallenges = publicAPI;

  let snapshot = null, initialized = false, currentConfig = null, freshRecords = [], feedbackKey = '', feedbackRange = null, memoryRecords = null;
  const nodes = {};
  const lang = () => document.documentElement.lang || document.getElementById('languageSelect')?.value || 'it';
  const words = () => copy[lang()] || copy.it;
  const api = () => window.fcwExperience;
  const score = () => {
    try { return api()?.score() ?? 0; } catch { return 0; }
  };
  const seed = () => {
    if (window.crypto?.getRandomValues) return window.crypto.getRandomValues(new Uint32Array(2)).reduce((value, bit) => value + bit.toString(36), '');
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  };
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function field(id, type = 'text') {
    const wrap = element('label', 'fcw-challenge-field'), label = element('span'), input = element('input');
    input.id = id; input.type = type; wrap.append(label, input);
    return { wrap, label, input };
  }
  function button(className = 'fcw-challenge-button') {
    const node = element('button', className); node.type = 'button'; return node;
  }
  function section(id) {
    const details = element('details', 'sub-disclosure fcw-challenge-disclosure'); details.id = id;
    const summary = element('summary', 'sub-disclosure-summary'), heading = element('span'), arrow = element('span', 'sub-disclosure-chevron'); arrow.setAttribute('aria-hidden', 'true');
    summary.append(heading, arrow);
    const body = element('div', 'fcw-challenge-body'), intro = element('p', 'fcw-challenge-note');
    body.append(intro); details.append(summary, body);
    return { details, heading, body, intro };
  }
  function status(key, range = null) {
    feedbackKey = key; feedbackRange = range;
    if (nodes.feedback) nodes.feedback.textContent = key === 'range' && range ? words().range(range.min, range.max) : words()[key] || '';
  }
  function challengeName(config) {
    const t = words();
    return config.scenarioId ? t.scenarioCopy[config.scenarioId][0] : config.title || t.goalText(t.metrics[config.metric], config.target);
  }
  function challengeGoal(config) {
    const t = words();
    return config.scenarioId ? t.scenarioCopy[config.scenarioId][1] : t.goalText(t.metrics[config.metric], config.target);
  }
  function shareLink(config) {
    const url = new URL(window.location.href);
    url.hash = ''; url.searchParams.delete('room'); url.searchParams.set('challenge', encodeChallenge(config));
    return url.href;
  }
  function updateUrl(config) {
    const url = new URL(window.location.href);
    if (config) url.searchParams.set('challenge', encodeChallenge(config)); else url.searchParams.delete('challenge');
    history.replaceState(null, '', url);
  }
  function apply(config, retry = false) {
    if(window.fcwAccountHydrating === true || window.fcwAccountSync?.isBusy?.() || window.fcwLocalDuelSession?.state?.()?.active){status('unavailable');return false;}
    const experience = api();
    if (!experience) { status('unavailable'); return false; }
    const state = experience.snapshot();
    if (state.spinning) { status('waitSpin'); return false; }
    if (state.started && !state.complete && !state.demo && !window.confirm(words().confirm)) { status('cancel'); return false; }
    if ((state.started || state.complete || state.demo || retry || window.fcwDaily?.accountState?.().active) && experience.restart() === false) { status('unavailable'); return false; }
    if (experience.setChallenge(config) === false) { status('unavailable'); return false; }
    currentConfig = config ? validateChallenge(config) : null;
    snapshot = experience.snapshot(); freshRecords = [];
    updateUrl(currentConfig); status(config ? 'activated' : 'removed'); render();
    if (document.getElementById('careerGame')) document.getElementById('careerGame').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    return true;
  }
  async function copyText(text, input) {
    try { await navigator.clipboard.writeText(text); status('copied'); }
    catch { input.focus(); input.select(); status('copyManual'); }
  }
  function readRecords() {
    if (memoryRecords) return memoryRecords;
    try {
      const value = JSON.parse(localStorage.getItem(RECORD_KEY) || '{}');
      return { count: Number(value.count) || 0, seen: Array.isArray(value.seen) ? value.seen : [], best: value.best && typeof value.best === 'object' ? value.best : {} };
    } catch { return { count: 0, seen: [], best: {} }; }
  }
  function recordCompletion(state) {
    if (window.fcwAccountHydrating === true || !state?.complete || state.demo || state.restored || state.archive || !state.runId || !state.playerResult) return;
    const records = readRecords(), id = String(state.runId);
    if (records.seen.includes(id)) return;
    const metrics = metricsFor(state.playerResult, score()), fresh = [], date = new Date().toISOString();
    Object.keys(limits).forEach(metric => {
      if (!records.best[metric] || metrics[metric] > number(records.best[metric].value)) {
        records.best[metric] = { value: metrics[metric], name: String(state.playerResult.name || state.identity?.name || '').slice(0, 24), date, runId: id };
        fresh.push(metric);
      }
    });
    records.count += 1; records.seen.push(id);
    try { localStorage.setItem(RECORD_KEY, JSON.stringify(records)); memoryRecords = null; }
    catch { memoryRecords = records; }
    freshRecords = fresh;
  }

  function build() {
    const challenges = document.getElementById('extraToolsPanel-challenges'), progress = document.getElementById('extraToolsPanel-progress'), game = document.getElementById('careerGame');
    if (!challenges || !progress || !game || initialized) return false;
    initialized = true;
    const scenarios = section('fcwScenarios');
    nodes.scenarioHeading = scenarios.heading; nodes.scenarioIntro = scenarios.intro;
    const grid = element('div', 'fcw-scenario-grid'); nodes.scenarioChoices = [];
    Object.entries(scenarioRules).forEach(([id, rule]) => {
      const item = button('fcw-scenario-card'); item.dataset.scenario = id;
      const icon = element('span', 'fcw-scenario-icon', rule.icon); icon.setAttribute('aria-hidden', 'true');
      const content = element('span', 'fcw-scenario-content'), title = element('strong'), description = element('small'), action = element('b', 'fcw-scenario-action');
      content.append(title, description, action); item.append(icon, content);
      item.addEventListener('click', () => apply(validateChallenge({ ...rule, title: '', seed: seed(), scenarioId: id })));
      nodes.scenarioChoices.push({ id, item, title, description, action }); grid.append(item);
    });
    nodes.free = button('fcw-challenge-button fcw-challenge-subtle'); nodes.free.addEventListener('click', () => apply(null));
    scenarios.body.append(grid, nodes.free);

    const custom = section('fcwCustomChallenges');
    nodes.customHeading = custom.heading; nodes.customIntro = custom.intro;
    const form = element('form', 'fcw-custom-form'); form.noValidate = true;
    nodes.title = field('fcwChallengeTitle'); nodes.title.input.maxLength = 48;
    const metricWrap = element('label', 'fcw-challenge-field'); nodes.metricLabel = element('span'); nodes.metric = element('select'); nodes.metric.id = 'fcwChallengeMetric';
    Object.keys(limits).forEach(id => { const option = element('option'); option.value = id; nodes.metric.append(option); });
    metricWrap.append(nodes.metricLabel, nodes.metric);
    nodes.target = field('fcwChallengeTarget', 'number'); nodes.target.input.inputMode = 'numeric';
    nodes.targetHint = element('small', 'fcw-challenge-field-hint'); nodes.target.wrap.append(nodes.targetHint);
    nodes.create = button('fcw-challenge-button fcw-challenge-primary'); nodes.create.type = 'submit';
    form.append(nodes.title.wrap, metricWrap, nodes.target.wrap, nodes.create);
    nodes.metric.addEventListener('change', () => { targetLimits(true); });
    form.addEventListener('submit', event => {
      event.preventDefault();
      try { apply(validateChallenge({ title: nodes.title.input.value, metric: nodes.metric.value, target: nodes.target.input.value, seed: seed() })); }
      catch (error) { status(error.message, limits[nodes.metric.value]); if (error.message === 'range') nodes.target.input.focus(); }
    });
    const importRow = element('form', 'fcw-challenge-import');
    nodes.import = field('fcwChallengeImport'); nodes.import.input.maxLength = 1600; nodes.import.input.autocomplete = 'off'; nodes.import.input.spellcheck = false;
    nodes.importButton = button(); nodes.importButton.type = 'submit';
    importRow.append(nodes.import.wrap, nodes.importButton);
    importRow.addEventListener('submit', event => {
      event.preventDefault();
      try { const config = decodeChallenge(nodes.import.input.value); if (apply(config)) nodes.import.input.value = ''; }
      catch { status('invalid'); nodes.import.input.focus(); }
    });
    nodes.share = element('div', 'fcw-challenge-share'); nodes.share.hidden = true;
    nodes.code = field('fcwChallengeCode'); nodes.code.input.readOnly = true; nodes.code.input.spellcheck = false;
    nodes.link = field('fcwChallengeLink'); nodes.link.input.readOnly = true;
    const shareActions = element('div', 'fcw-challenge-actions'); nodes.copyCode = button(); nodes.copyLink = button();
    nodes.copyCode.addEventListener('click', () => copyText(nodes.code.input.value, nodes.code.input)); nodes.copyLink.addEventListener('click', () => copyText(nodes.link.input.value, nodes.link.input));
    shareActions.append(nodes.copyCode, nodes.copyLink); nodes.seedNote = element('small', 'fcw-challenge-note');
    nodes.share.append(nodes.code.wrap, nodes.link.wrap, shareActions, nodes.seedNote);
    nodes.feedback = element('p', 'fcw-challenge-feedback'); nodes.feedback.id = 'fcwChallengeFeedback'; nodes.feedback.setAttribute('role', 'status'); nodes.feedback.setAttribute('aria-live', 'polite');
    custom.body.append(form, importRow, nodes.share, nodes.feedback);
    const anchor = document.getElementById('archiveDisclosure'); challenges.insertBefore(scenarios.details, anchor || null); challenges.insertBefore(custom.details, anchor || null);

    const records = section('fcwPersonalRecords');
    nodes.recordHeading = records.heading; nodes.recordHelp = records.intro; nodes.recordList = element('div', 'fcw-record-grid'); nodes.recordCount = element('small', 'fcw-challenge-note');
    records.body.append(nodes.recordList, nodes.recordCount); progress.insertBefore(records.details, progress.firstChild);

    nodes.active = element('div', 'fcw-active-objective'); nodes.active.hidden = true; nodes.active.id = 'fcwActiveObjective';
    const activeContent = element('div', 'fcw-active-objective-copy'); nodes.activeLabel = element('small'); nodes.activeName = element('strong'); nodes.activeGoal = element('span');
    activeContent.append(nodes.activeLabel, nodes.activeName, nodes.activeGoal); nodes.activeStatus = element('b', 'fcw-active-objective-status'); nodes.change = button('fcw-challenge-button fcw-challenge-subtle');
    nodes.change.addEventListener('click', () => { if (window.fcwNavigation) { window.fcwNavigation.open('objectives', 'scenarios'); return; } const tools = document.getElementById('extraTools'); if (tools) tools.open = true; document.getElementById('extraToolsTab-challenges')?.click(); scenarios.details.open = true; scenarios.details.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
    nodes.active.append(activeContent, nodes.activeStatus, nodes.change);
    game.insertBefore(nodes.active, game.querySelector('.prompt'));
    targetLimits(true); return true;
  }

  function targetLimits(reset) {
    if (!nodes.metric) return;
    const rule = limits[nodes.metric.value];
    nodes.target.input.min = rule.min; nodes.target.input.max = rule.max; nodes.target.input.step = 1;
    if (reset) nodes.target.input.value = rule.initial;
    nodes.targetHint.textContent = `${rule.min}–${rule.max}`;
  }
  function renderRecords() {
    const t = words(), records = readRecords(); nodes.recordList.replaceChildren();
    if (!Object.keys(records.best).length) nodes.recordList.append(element('p', 'fcw-record-empty', t.noRecords));
    else Object.keys(limits).forEach(metric => {
      const record = records.best[metric]; if (!record) return;
      const item = element('div', 'fcw-record-item'), label = element('small', '', t.metrics[metric]), value = element('strong', '', String(number(record.value))), name = element('span', '', record.name || '—');
      const date = element('time'); date.dateTime = record.date || '';
      if (record.date && Number.isFinite(Date.parse(record.date))) date.textContent = new Date(record.date).toLocaleDateString(lang(), { day: 'numeric', month: 'short', year: 'numeric' });
      name.title = `${t.by} ${record.name || '—'}`; item.append(label, value, name, date); nodes.recordList.append(item);
    });
    nodes.recordCount.textContent = records.count ? t.recordCount(records.count) : '';
  }
  function resultBlock(state) {
    const record = document.querySelector('#careerSummary .career-record'); if (!record) return;
    let block = document.getElementById('fcwChallengeResult');
    const config = currentConfig;
    if (!state?.complete || state.demo || !config) { if (block) block.hidden = true; }
    else {
      if (!block) { block = element('div', 'fcw-objective-result'); block.id = 'fcwChallengeResult'; record.append(block); }
      const t = words(), result = evaluateChallenge(config, metricsFor(state.playerResult, score()));
      block.hidden = false; block.dataset.success = String(result.success); block.replaceChildren();
      block.append(element('small', 'fcw-challenge-eyebrow', t.result), element('strong', '', `${result.success ? '✓' : '○'} ${t[result.success ? 'success' : 'missed']} · ${challengeName(config)}`));
      const list = element('ul', 'fcw-objective-checks'); result.checks.forEach(check => {
        const item = element('li'); item.dataset.reached = String(check.reached); item.append(element('span', '', t.metrics[check.metric]), element('b', '', t.progress(check.current, check.target))); list.append(item);
      });
      const retry = button('fcw-challenge-button fcw-challenge-subtle'); retry.textContent = t.playAgain; retry.addEventListener('click', () => apply(config, true)); block.append(list, retry);
      retry.disabled = Boolean(state.spinning);
    }
    let banner = document.getElementById('fcwRecordBanner');
    if (!state?.complete || state.demo || state.restored || !freshRecords.length) { if (banner) banner.hidden = true; return; }
    if (!banner) { banner = element('p', 'fcw-new-record-banner'); banner.id = 'fcwRecordBanner'; banner.setAttribute('role', 'status'); record.append(banner); }
    banner.hidden = false; banner.textContent = `↗ ${words().newRecord}: ${freshRecords.map(metric => words().metrics[metric]).join(' · ')}`;
  }
  function render() {
    if (!initialized && !build()) return;
    const t = words();
    nodes.scenarioHeading.textContent = t.scenarios; nodes.scenarioIntro.textContent = t.scenarioIntro; nodes.free.textContent = t.free;
    nodes.customHeading.textContent = t.custom; nodes.customIntro.textContent = t.customIntro;
    nodes.title.label.textContent = t.title; nodes.title.input.placeholder = t.titlePlaceholder; nodes.metricLabel.textContent = t.metric; nodes.target.label.textContent = t.target; nodes.create.textContent = t.create;
    [...nodes.metric.options].forEach(option => { option.textContent = t.metrics[option.value]; });
    nodes.import.label.textContent = t.importLabel; nodes.import.input.placeholder = t.importPlaceholder; nodes.importButton.textContent = t.import;
    nodes.copyCode.textContent = t.copyCode; nodes.copyLink.textContent = t.copyLink; nodes.code.label.textContent = t.code; nodes.link.label.textContent = t.link; nodes.seedNote.textContent = t.seed;
    nodes.recordHeading.textContent = t.records; nodes.recordHelp.textContent = t.recordsHelp;
    nodes.activeLabel.textContent = t.active; nodes.change.textContent = t.scenarios;
    if (api()) { snapshot = api().snapshot(); currentConfig = api().getChallenge() || snapshot.challenge || null; }
    const spinning = Boolean(snapshot?.spinning || window.fcwAccountHydrating === true || window.fcwAccountSync?.isBusy?.() || window.fcwLocalDuelSession?.state?.()?.active);
    [nodes.create, nodes.importButton, nodes.free, nodes.change].forEach(control => { control.disabled = spinning; });
    nodes.scenarioChoices.forEach(({ id, item, title, description, action }) => {
      const selected = currentConfig?.scenarioId === id; title.textContent = t.scenarioCopy[id][0]; description.textContent = t.scenarioCopy[id][1]; action.textContent = selected ? t.selected : t.choose;
      item.dataset.selected = String(selected); item.setAttribute('aria-pressed', String(selected));
      item.disabled = spinning; item.title = spinning ? t.waitSpin : '';
    });
    nodes.share.hidden = !currentConfig; nodes.active.hidden = !currentConfig || snapshot?.demo;
    if (currentConfig) {
      nodes.code.input.value = encodeChallenge(currentConfig); nodes.link.input.value = shareLink(currentConfig);
      nodes.activeName.textContent = challengeName(currentConfig); nodes.activeGoal.textContent = challengeGoal(currentConfig);
      nodes.activeStatus.textContent = snapshot?.complete ? t[evaluateChallenge(currentConfig, metricsFor(snapshot.playerResult, score())).success ? 'success' : 'missed'] : snapshot?.started ? t.running : t.ready;
    }
    status(feedbackKey, feedbackRange); renderRecords(); resultBlock(snapshot);
  }
  function onState(event) {
    snapshot = event.detail || api()?.snapshot() || snapshot;
    if (event.type === 'fcw:complete') recordCompletion(snapshot);
    if (event.type === 'fcw:reset') {
      freshRecords = [];
      if (!snapshot?.challenge) updateUrl(null);
    }
    render();
  }
  ['fcw:state', 'fcw:complete', 'fcw:reset', 'fcw:language'].forEach(event => window.addEventListener(event, onState));
  window.fcwChallenges = {
    accountState() {
      const config = api()?.getChallenge() || currentConfig;
      return { version: 1, challenge: config ? validateChallenge(config) : null };
    },
    restoreAccountState(data) {
      try { currentConfig = data?.version === 1 && data.challenge ? validateChallenge(data.challenge) : null; }
      catch { currentConfig = null; }
      snapshot = api()?.snapshot() || null; freshRecords = []; feedbackKey = ''; feedbackRange = null;
      if (initialized) { updateUrl(currentConfig); render(); }
    }
  };
  window.addEventListener('fcw:account-restore', () => {
    memoryRecords = null; freshRecords = []; feedbackKey = ''; feedbackRange = null;
    snapshot = api()?.snapshot() || null; currentConfig = api()?.getChallenge() || null;
    if (initialized) { updateUrl(currentConfig); render(); }
  });
  function init() {
    if (!build()) { window.setTimeout(init, 100); return; }
    snapshot = api()?.snapshot() || null;
    const fromUrl = new URL(window.location.href).searchParams.get('challenge');
    if (fromUrl) {
      try {
        const config = decodeChallenge(fromUrl);
        const experience = api();
        if (experience && !snapshot?.started && !snapshot?.complete && !snapshot?.demo) { experience.setChallenge(config); currentConfig = config; status('activated'); }
        else { nodes.import.input.value = fromUrl; status('resultNotice'); }
      } catch { status('invalid'); }
    }
    document.getElementById('languageSelect')?.addEventListener('change', render);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
