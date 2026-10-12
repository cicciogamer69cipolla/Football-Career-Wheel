/* Shared career lifecycle for challenges, personalization and private rooms. */
(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const uid = () => globalThis.crypto?.randomUUID?.() || `run-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const copy = {
    it: { setup: 'Il tuo calciatore', ready: 'Nome, maglia e modalità', locked: 'Identità bloccata', points: 'Career Points', explanation: 'Gol e assist pesati per ruolo, stagioni e trofei.', goals: 'Gol', assists: 'Assist', seasons: 'Stagioni', trophies: 'Trofei', breakdown: 'Come sono calcolati', preview: 'Esempio' },
    en: { setup: 'Your player', ready: 'Name, shirt and mode', locked: 'Identity locked', points: 'Career Points', explanation: 'Goals and assists weighted by position, seasons and trophies.', goals: 'Goals', assists: 'Assists', seasons: 'Seasons', trophies: 'Trophies', breakdown: 'How points are calculated', preview: 'Preview' },
    es: { setup: 'Tu jugador', ready: 'Nombre, dorsal y modo', locked: 'Identidad bloqueada', points: 'Career Points', explanation: 'Goles y asistencias ponderados por posición, temporadas y trofeos.', goals: 'Goles', assists: 'Asistencias', seasons: 'Temporadas', trophies: 'Trofeos', breakdown: 'Cómo se calculan', preview: 'Ejemplo' },
    fr: { setup: 'Ton joueur', ready: 'Nom, maillot et mode', locked: 'Identité verrouillée', points: 'Career Points', explanation: 'Buts et passes pondérés par poste, saisons et trophées.', goals: 'Buts', assists: 'Passes', seasons: 'Saisons', trophies: 'Trophées', breakdown: 'Calcul des points', preview: 'Aperçu' }
  };
  let runId = uid(), restored = false, challenge = null, seededRandom = null;
  const fairMode = { it: 'Sfida con codice: modalità Normale uguale per tutti.', en: 'Code challenge: everyone uses Normal mode.', es: 'Reto con código: modo Normal para todos.', fr: 'Défi avec code : mode Normal pour tous.' };
  const fairDailyMode = { it: 'Sfida del giorno: modalità Normale uguale per tutti.', en: 'Daily challenge: everyone uses Normal mode.', es: 'Reto del día: modo Normal para todos.', fr: 'Défi du jour : mode Normal pour tous.' };
  const archiveConfirm = {
    it: 'Aprire questa carriera archiviata interromperà la carriera in corso. Continuare?',
    en: 'Opening this archived career will interrupt your current career. Continue?',
    es: 'Abrir esta carrera archivada interrumpirá tu carrera actual. ¿Continuar?',
    fr: 'Ouvrir cette carrière archivée interrompra votre carrière en cours. Continuer ?'
  };
  const actionLabels = {
    it: ['Salva carriera', 'Condividi carta PNG', 'Condividi carta + palmarès'],
    en: ['Save career', 'Share card PNG', 'Share card & honours'],
    es: ['Guardar carrera', 'Compartir carta PNG', 'Compartir carta y palmarés'],
    fr: ['Enregistrer la carrière', 'Partager la carte PNG', 'Partager carte et palmarès']
  };
  const awardLabels = {
    it: ['campionati', 'Champions League', 'Mondiali', 'coppe continentali', 'Palloni d’Oro'],
    en: ['league titles', 'Champions Leagues', 'World Cups', 'continental cups', 'Ballons d’Or'],
    es: ['ligas', 'Champions League', 'Mundiales', 'copas continentales', 'Balones de Oro'],
    fr: ['championnats', 'Ligues des champions', 'Coupes du monde', 'coupes continentales', 'Ballons d’Or']
  };
  let startedBefore = false, scheduled = false, completedRun = '', previousResult = '';
  const persistence = new Map();
  const exportAssets = new Map();
  window.fcwExportAsset = async source => {
    const url = new URL(source, location.href);
    if (!['crests.football-data.org', 'upload.wikimedia.org', 'site.api.football'].includes(url.hostname)) return source;
    if (!exportAssets.has(source)) {
      const pending = fetch(`/api/card-asset?url=${encodeURIComponent(source)}`, { signal: AbortSignal.timeout(2500) }).then(async response => {
        if (!response.ok) throw new Error('Card logo unavailable');
        const payload = await response.json();
        if (typeof payload.dataUrl !== 'string' || !payload.dataUrl.startsWith('data:image/')) throw new Error('Invalid card logo');
        return payload.dataUrl;
      }).catch(error => { exportAssets.delete(source); throw error; });
      exportAssets.set(source, pending);
    }
    return exportAssets.get(source);
  };
  const numeric = value => Number(String(value ?? '').match(/\d+/)?.[0]) || 0;
  const read = question => answers[steps.findIndex(step => step.q === question)]?.value || '';
  const kindValue = kind => answers.find(answer => answer?.kind === kind)?.value || '';
  function snapshot() {
    const complete = !byId('careerSummary').hidden;
    const statQuestions = ['Velocità', 'Finalizzazione', 'Passaggi', 'Dribbling', 'Difesa', 'Forza'];
    const statNodes = [...document.querySelectorAll('#cardStats .card-stat strong')];
    const stats = complete && statNodes.length === 6 ? statNodes.map(node => numeric(node.textContent)) : statQuestions.map(q => numeric(read(q)));
    const playerResult = {
      name: byId('careerName').value.trim(), shirtNumber: numeric(byId('shirtNumber').value),
      position: kindValue('position'), overall: complete ? numeric(byId('cardRating').textContent) : 0, stats,
      career: {
        goals: numeric(read('Quanti gol hai segnato?')), assists: numeric(read('Quanti assist hai fatto?')),
        seasons: numeric(read('Quante stagioni hai giocato?')), league: numeric(read('Quanti campionati nazionali hai vinto?')),
        champions: numeric(read('Quante Champions League hai vinto?')), world: numeric(read('Quanti Mondiali hai vinto?')),
        continental: numeric(read('Quante coppe continentali hai vinto?')), ballon: numeric(read('Quanti Palloni d’Oro hai vinto?'))
      }
    };
    const s = steps[Math.min(idx, steps.length - 1)];
    return {
      runId, language, started: byId('careerName').readOnly || spinning || answers.some(Boolean),
      complete, demo: Boolean(demoPreviewActive), restored: restored || Boolean(restoringArchive),
      spinning, preview: Boolean(wheelPreviewActive), index: idx, total: steps.length,
      completedSteps: answers.filter(Boolean).length, question: s?.q || '', group: s?.group || '',
      result: answers[idx]?.value || (s?.kind === 'trait' ? chosenTraits.join(' · ') : ''),
      lastResult: [...careerTimeline].reverse().find(event => event.type !== 'careerEvent')?.value || '',
      identity: { name: playerResult.name, shirtNumber: playerResult.shirtNumber }, playerResult,
      context: { club: kindValue('club'), nation: kindValue('country'), league: kindValue('league'),
        style: kindValue('playstyle'), seasons: read('Quante stagioni hai giocato?'),
        goals: read('Quanti gol hai segnato?'), assists: read('Quanti assist hai fatto?'),
        traits: [...chosenTraits], events: careerEvents.map(event => ({ ...event })), group: s?.group || '' },
      challenge: challenge ? { ...challenge } : null
    };
  }
  function seedGenerator(seed) {
    let state = 2166136261;
    for (const char of String(seed)) state = Math.imul(state ^ char.charCodeAt(0), 16777619);
    const random = () => {
      state += 0x6D2B79F5;
      let value = Math.imul(state ^ (state >>> 15), 1 | state);
      value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
    random.state = () => state >>> 0;
    random.restore = value => { if (Number.isInteger(value) && value >= 0 && value <= 4294967295) state = value; };
    return random;
  }
  const standardRandom = window.fcwWheelRandom;
  window.fcwWheelRandom = () => seededRandom ? seededRandom() : standardRandom();
  const standardRand = window.rand;
  window.rand = max => seededRandom ? Math.floor(seededRandom() * max) : standardRand(max);
  function setChallenge(config) {
    if (snapshot().started && !snapshot().demo) return false;
    challenge = config && typeof config === 'object' ? { ...config } : null;
    seededRandom = challenge?.seed ? seedGenerator(challenge.seed) : null;
    if (seededRandom) { careerMode = 'normal'; renderCareerModeUI(); update(); }
    window.dispatchEvent(new CustomEvent('fcw:challenge', { detail: snapshot() }));
    schedule();
    return true;
  }
  function clearRun() {
    runId = uid(); restored = false; completedRun = ''; startedBefore = false; previousResult = '';
    challenge = null; seededRandom = null;
    byId('playerSetup').open = true;
    byId('careerSummary').classList.remove('experience-final-reveal');
    queueMicrotask(() => {
      window.dispatchEvent(new CustomEvent('fcw:reset', { detail: snapshot() }));
      schedule();
    });
  }
  function restart(options = {}) {
    if (spinning || window.fcwAccountSync?.isBusy?.()) return false;
    const previous = options.preserveChallenge ? challenge : null;
    if (wheelPreviewActive) byId('wheelPreviewPanel').querySelector('summary').click();
    byId('reset').click();
    if (previous) setChallenge(previous);
    return true;
  }
  function resetForRoom(identity) {
    if (spinning || window.fcwAccountSync?.isBusy?.()) return false;
    if (restart() === false) return false;
    byId('careerName').value = String(identity?.name || '').slice(0, 24);
    byId('shirtNumber').value = String(Math.max(1, Math.min(99, numeric(identity?.shirtNumber) || 10)));
    refreshIdentityGate(); schedule();
    return true;
  }
  const translate = value => tr(String(value ?? ''));
  window.fcwExperience = {
    snapshot, restart, resetForRoom, setChallenge, getChallenge: () => challenge ? { ...challenge } : null,
    accountState: () => ({version:1,runId,restored,challenge:challenge?{...challenge}:null,randomState:seededRandom?.state(),completedRun}),
    restoreAccountState(data) {
      runId = typeof data?.runId === 'string' && /^[A-Za-z0-9_-]{1,160}$/.test(data.runId) ? data.runId : uid();
      restored = Boolean(data?.restored);
      challenge = data?.challenge && typeof data.challenge === 'object' ? {...data.challenge} : null;
      seededRandom = challenge?.seed ? seedGenerator(challenge.seed) : null;
      seededRandom?.restore(data?.randomState);
      completedRun = !byId('careerSummary').hidden ? runId : '';
      startedBefore = false; previousResult = ''; render(snapshot());
    },
    score: () => window.FCWScoring.careerPoints(snapshot().playerResult), translate, translateLabel: translate,
    registerPersistence(adapter) { if (adapter?.id && typeof adapter.serialize === 'function') persistence.set(adapter.id, adapter); }
  };

  const setup = document.createElement('details');
  setup.id = 'playerSetup'; setup.className = 'player-setup'; setup.open = true;
  const header = document.createElement('summary');
  const title = document.createElement('strong'); title.id = 'playerSetupTitle';
  const status = document.createElement('span'); status.id = 'playerSetupStatus';
  header.append(title, status);
  const body = document.createElement('div'); body.id = 'playerSetupBody'; body.className = 'player-setup-body';
  const identity = document.querySelector('.player-identity-entry');
  identity.before(setup); setup.append(header, body);
  body.append(identity, byId('careerModePicker'), byId('identityLockNotice'));
  const pointPanel = document.createElement('section');
  pointPanel.id = 'experiencePoints'; pointPanel.className = 'experience-points';
  const pointHeading = document.createElement('div'); pointHeading.className = 'experience-points-head';
  const pointLabel = document.createElement('span'); pointLabel.id = 'experiencePointsLabel';
  const pointValue = document.createElement('strong'); pointValue.id = 'experiencePointsValue';
  pointHeading.append(pointLabel, pointValue);
  const pointNote = document.createElement('p'); pointNote.id = 'experiencePointsNote';
  const pointDetails = document.createElement('details'); pointDetails.className = 'experience-points-details';
  const pointSummary = document.createElement('summary');
  const pointRows = document.createElement('div'); pointRows.className = 'experience-points-rows';
  pointDetails.append(pointSummary, pointRows); pointPanel.append(pointHeading, pointNote, pointDetails);
  document.querySelector('.career-record .record-title').after(pointPanel);
  function render(state) {
    const text = copy[state.language] || copy.it;
    byId('testCard').disabled = state.spinning || state.preview;
    if (challenge?.seed || window.fcwDaily?.normalMode?.()) {
      byId('careerModePicker').disabled = true;
      const modeCopy = challenge?.seed ? fairMode : fairDailyMode;
      byId('careerModeDescription').textContent = modeCopy[state.language] || modeCopy.it;
    }
    title.textContent = text.setup;
    status.textContent = state.started ? `${state.identity.name || text.preview} · #${state.identity.shirtNumber || 10} · ${text.locked}` : text.ready;
    setup.classList.toggle('is-started', state.started);
    if (state.started && !startedBefore) setup.open = false;
    startedBefore = state.started;
    if (!state.started && !state.complete && !state.preview) byId('hint').innerHTML = tr('Ogni giro determina una parte della tua storia.<br>Il risultato viene scelto dalla ruota.');
    if (state.complete && !state.preview) {
      byId('cardPosition').style.fontSize = byId('cardPosition').textContent.length > 4 ? '11px' : '';
      byId('spin').textContent = tr('Rigioca la carriera ↻');
      byId('spin').disabled = state.spinning || state.preview;
      const awards = awardLabels[state.language] || awardLabels.it;
      byId('resultSub').textContent = ['league', 'champions', 'world', 'continental', 'ballon'].map((key, index) => `${state.playerResult.career[key]} ${awards[index]}`).join(' · ');
      document.querySelectorAll('.card-extra-actions button').forEach((button, index) => { button.textContent = (actionLabels[state.language] || actionLabels.it)[index] || button.textContent; });
      const points = window.FCWScoring.careerPoints(state.playerResult);
      pointLabel.textContent = text.points;
      pointValue.textContent = new Intl.NumberFormat(state.language).format(points.total);
      pointNote.textContent = text.explanation;
      pointSummary.textContent = text.breakdown;
      pointRows.replaceChildren(...['goals', 'assists', 'seasons', 'trophies'].map(key => {
        const row = document.createElement('div'), label = document.createElement('span'), value = document.createElement('b');
        label.textContent = text[key]; value.textContent = `+${points[key]}`; row.append(label, value); return row;
      }));
    }
  }
  function animateResult(state) {
    if (state.spinning || state.preview || state.complete || !state.result) return;
    const key = `${state.index}:${state.result}`;
    if (key === previousResult) return;
    previousResult = key;
    const resultBox = byId('resultName').closest('.result');
    resultBox.classList.remove('experience-result-arrive', 'experience-rare-result');
    void resultBox.offsetWidth;
    resultBox.classList.add('experience-result-arrive');
    const step = currentStep(), weights = weightsFor(step), selected = String(state.result);
    const rarity = window.fcwWheelVisual?.rarityFor?.(step, weights);
    if (Array.isArray(rarity?.tiers)) {
      const selectedIndex = step.items.findIndex(item => String(item) === selected);
      if (['rare', 'veryRare'].includes(rarity.tiers[selectedIndex])) resultBox.classList.add('experience-rare-result');
      return;
    }
    const grouped = new Map();
    step.items.forEach((item, index) => grouped.set(String(item), (grouped.get(String(item)) || 0) + weights[index]));
    const total = weights.reduce((sum, value) => sum + value, 0), values = [...grouped.values()];
    const chosen = grouped.get(selected);
    if (chosen && values.length > 1 && Math.max(...values) > Math.min(...values) * 1.5 && chosen / total <= .08) resultBox.classList.add('experience-rare-result');
  }
  function emit() {
    scheduled = false;
    const state = snapshot(); render(state); animateResult(state);
    window.dispatchEvent(new CustomEvent('fcw:state', { detail: state }));
    if (state.complete && !state.demo && !state.restored && completedRun !== state.runId) {
      completedRun = state.runId;
      window.dispatchEvent(new CustomEvent('fcw:complete', { detail: state }));
    }
  }
  function schedule() { if (!scheduled) { scheduled = true; queueMicrotask(emit); } }
  const oldUpdate = window.update;
  window.update = function (...args) { const value = oldUpdate.apply(this, args); schedule(); return value; };
  const oldFinish = window.finishCareer;
  window.finishCareer = function (...args) {
    if (restoringArchive) restored = true;
    const value = oldFinish.apply(this, args);
    const summary = byId('careerSummary');
    if (!restored) {
      summary.classList.remove('experience-final-reveal'); void summary.offsetWidth;
      summary.classList.add('experience-final-reveal');
    }
    schedule(); return value;
  };
  const oldReset = window.reset;
  window.reset = function (...args) { clearRun(); const value = oldReset.apply(this, args); schedule(); return value; };
  byId('reset').addEventListener('click', clearRun);
  ['spin', 'wheel', 'testCard'].forEach(id => byId(id).addEventListener('click', schedule));
  ['spin', 'wheel'].forEach(id => byId(id).addEventListener('click', event => {
    if (byId('careerSummary').hidden || spinning || wheelPreviewActive) return;
    event.preventDefault(); event.stopImmediatePropagation();
    restart({ preserveChallenge: true });
    byId('careerName').focus();
  }, { capture: true }));
  // A MouseEvent passed as the first argument otherwise activates native sharing.
  byId('downloadCard').removeEventListener('click', window.downloadPlayerCard);
  byId('downloadCard').addEventListener('click', () => window.downloadPlayerCard(false));
  ['careerName', 'shirtNumber'].forEach(id => byId(id).addEventListener('input', schedule));
  const oldRecord = window.careerRecord;
  window.careerRecord = function (...args) {
    const record = oldRecord.apply(this, args), state = snapshot(), extras = {};
    for (const [id, adapter] of persistence) {
      try { extras[id] = adapter.serialize(state); } catch (error) { console.warn(`Career extension ${id} could not be saved`, error); }
    }
    record.experience = { version: 1, runId, challenge: challenge ? { ...challenge } : null, extras };
    return record;
  };
  // Delegation survives legacy renderArchive handlers replacing every row.
  byId('archiveList').addEventListener('click', event => {
    const button = event.target.closest('.archive-item-actions button'), row = button?.closest('.archive-item');
    if (!row || button !== row.querySelector('.archive-item-actions button')) return;
    const index = [...byId('archiveList').querySelectorAll('.archive-item')].indexOf(row), entry = savedCareers()[index];
    if (!entry) return;
    const blocked = spinning || window.fcwAccountHydrating === true || window.fcwAccountSync?.isBusy?.() ||
      (typeof pendingCareerChoice !== 'undefined' && pendingCareerChoice) || window.fcwLocalDuelSession?.state?.()?.active;
    const state = snapshot();
    if (blocked || (state.started && !state.complete && !state.demo && !state.restored && !window.confirm(archiveConfirm[state.language] || archiveConfirm.it))) {
      event.preventDefault(); event.stopImmediatePropagation(); return;
    }
    restored = true; runId = entry.experience?.runId || `archive-${entry.id}`;
    challenge = entry.experience?.challenge || null; seededRandom = null;
    for (const [id, adapter] of persistence) {
      try { adapter.restore?.(entry.experience?.extras?.[id] || null, { ...snapshot(), restored: true }); }
      catch (error) { console.warn(`Career extension ${id} could not be restored`, error); }
    }
  }, { capture: true });
  byId('languageSelect').addEventListener('change', () => {
    schedule(); queueMicrotask(() => window.dispatchEvent(new CustomEvent('fcw:language', { detail: snapshot() })));
  });
  renderArchive(); schedule();
})();
