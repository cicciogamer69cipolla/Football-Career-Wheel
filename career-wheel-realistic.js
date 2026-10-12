/* Game heuristics for new Realistic careers. The wheel remains the source of every result. */
(() => {
  'use strict';
  const experience = window.fcwExperience;
  if (!experience || typeof currentStep !== 'function') return;
  const REVISION = 2;
  let revision = answers.some(Boolean) ? 1 : REVISION;
  const statKeys = ['Velocità', 'Finalizzazione', 'Passaggi', 'Dribbling', 'Difesa', 'Forza'];
  const profiles = {
    keeper: { stats: [52, 28, 66, 37, 82, 78], importance: [1, 0, 2, 0, 6, 4], goals: .06, assists: .25, height: 1.87 },
    centreback: { stats: [63, 38, 65, 49, 81, 81], importance: [1, 0, 1, 0, 5, 3], goals: 1.8, assists: 1.4, height: 1.85 },
    fullback: { stats: [77, 48, 72, 66, 77, 71], importance: [3, 0, 2, 1, 4, 2], goals: 2.3, assists: 5, height: 1.78 },
    wingback: { stats: [80, 52, 75, 73, 72, 68], importance: [3, 1, 3, 2, 3, 1], goals: 3.5, assists: 7, height: 1.78 },
    holding: { stats: [66, 49, 79, 65, 80, 76], importance: [1, 0, 3, 1, 4, 3], goals: 3.2, assists: 5.5, height: 1.82 },
    midfield: { stats: [72, 65, 82, 75, 66, 70], importance: [1, 1, 4, 3, 1, 1], goals: 6, assists: 9, height: 1.80 },
    playmaker: { stats: [77, 75, 82, 83, 44, 61], importance: [2, 3, 4, 4, 0, 1], goals: 9, assists: 10, height: 1.77 },
    winger: { stats: [83, 76, 75, 84, 37, 65], importance: [4, 3, 2, 4, 0, 1], goals: 12, assists: 8, height: 1.77 },
    striker: { stats: [76, 84, 65, 76, 35, 79], importance: [2, 5, 1, 2, 0, 3], goals: 17, assists: 4.5, height: 1.83 },
    forward: { stats: [79, 82, 75, 81, 39, 71], importance: [2, 5, 3, 4, 0, 1], goals: 15, assists: 7, height: 1.80 }
  };
  const copy = {
    it: {
      description: 'Ruolo, attributi e stagioni influenzano i risultati. I grandi record restano rari.',
      legacy: 'Questa carriera conserva le probabilità con cui è iniziata.',
      note: 'Nelle nuove carriere Realistiche, l’OVR è una media pesata per ruolo dei sei attributi, bonus inclusi. Negli altri casi è la media semplice.',
      rating: 'OVR pesato per ruolo',
      context: (role, seasons) => `Realistica · ${role}${seasons ? ` · ${seasons} stagioni` : ''} · probabilità adattate alla carriera`,
      preview: 'Realistica · anteprima basata sui dati della carriera disponibili'
    },
    en: {
      description: 'Position, attributes and seasons influence results. Great records remain rare.',
      legacy: 'This career keeps the odds it started with.',
      note: 'In new Realistic careers, OVR is a position-weighted average of the six attributes, including bonuses. Other careers use a simple average.',
      rating: 'OVR weighted by position',
      context: (role, seasons) => `Realistic · ${role}${seasons ? ` · ${seasons} seasons` : ''} · odds adapted to your career`,
      preview: 'Realistic · preview based on available career details'
    },
    es: {
      description: 'La posición, los atributos y las temporadas influyen en los resultados. Los grandes récords siguen siendo raros.',
      legacy: 'Esta carrera conserva las probabilidades con las que empezó.',
      note: 'En las nuevas carreras Realistas, el OVR es la media de los seis atributos ponderada por posición, con bonificaciones. Las demás usan una media simple.',
      rating: 'OVR ponderado por posición',
      context: (role, seasons) => `Realista · ${role}${seasons ? ` · ${seasons} temporadas` : ''} · probabilidades adaptadas a la carrera`,
      preview: 'Realista · vista previa basada en los datos disponibles de la carrera'
    },
    fr: {
      description: 'Le poste, les attributs et les saisons influencent les résultats. Les grands records restent rares.',
      legacy: 'Cette carrière conserve ses probabilités de départ.',
      note: 'Dans les nouvelles carrières Réalistes, la note est la moyenne des six attributs pondérée par poste, bonus compris. Les autres utilisent une moyenne simple.',
      rating: 'Note pondérée par poste',
      context: (role, seasons) => `Réaliste · ${role}${seasons ? ` · ${seasons} saisons` : ''} · probabilités adaptées à la carrière`,
      preview: 'Réaliste · aperçu fondé sur les données disponibles de la carrière'
    }
  };
  const enabled = () => revision === REVISION && careerMode === 'realistic' && !demoPreviewActive;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const number = value => Number(String(value ?? '').match(/\d+(?:\.\d+)?/)?.[0]) || 0;
  const read = question => answers[steps.findIndex(step => step.q === question)]?.value;
  function context() {
    const role = answers.find(answer => answer?.kind === 'position')?.value || '';
    const key = ['Portiere', 'GK'].includes(role) ? 'keeper' : role === 'CB' ? 'centreback'
      : ['LB', 'RB'].includes(role) ? 'fullback' : ['LWB', 'RWB'].includes(role) ? 'wingback'
      : role === 'CDM' ? 'holding' : ['CM', 'LM', 'RM'].includes(role) ? 'midfield'
      : role === 'CAM' ? 'playmaker' : ['LW', 'RW'].includes(role) ? 'winger'
      : role === 'ST' ? 'striker' : role === 'CF' ? 'forward' : 'midfield';
    const profile = profiles[key];
    const stats = statKeys.map((question, index) => number(read(question)) || profile.stats[index]);
    const seasons = clamp(number(read('Quante stagioni hai giocato?')) || 15, 1, 27);
    const quality = stats.reduce((sum, stat, index) => sum + stat * profile.importance[index], 0) / profile.importance.reduce((sum, value) => sum + value, 0);
    return { role, key, profile, stats, seasons, quality };
  }
  function weightedStep(step, items, weights) {
    return { ...step, items, colors: items.map(() => step.colors?.[0] || '#2864ed'), realisticWeights: weights };
  }
  function exactCounts(step, mean, maximum) {
    const factors = [0, .25, .5, .75, 1, 1.3, 1.7, 2.2, 3];
    const weights = [.8, 1.6, 3, 5, 7, 4.5, 2, .45, .045];
    const outcomes = new Map();
    factors.forEach((factor, index) => {
      const raw = Math.min(maximum, mean * factor);
      const unit = raw >= 150 ? 10 : raw >= 10 ? 5 : 1;
      const count = Math.min(Math.floor(maximum), Math.max(0, Math.round(raw / unit) * unit));
      const item = String(count);
      outcomes.set(item, (outcomes.get(item) || 0) + weights[index]);
    });
    return weightedStep(step, [...outcomes.keys()], [...outcomes.values()]);
  }
  function trophyStep(step, ctx) {
    const opportunities = 1 + Math.floor((ctx.seasons - 1) / 4);
    const quality = clamp(.65 + (ctx.quality - 65) / 40, .5, 1.5);
    const settings = {
      'Quanti campionati nazionali hai vinto?': [Math.min(10, ctx.seasons), ctx.seasons * .09 * quality],
      'Quante Champions League hai vinto?': [Math.min(7, ctx.seasons), ctx.seasons * .025 * quality],
      'Quante coppe continentali hai vinto?': [Math.min(5, opportunities), opportunities * .08 * quality],
      'Quanti Mondiali hai vinto?': [Math.min(4, opportunities), opportunities * .055 * quality],
      'Quanti Palloni d’Oro hai vinto?': [Math.min(8, ctx.seasons), ctx.seasons * .004 * Math.exp((ctx.quality - 70) / 10)]
    };
    const setting = settings[step.q];
    if (!setting) return step;
    const [maximum, expected] = setting, items = ['Mai'], weights = [1];
    // Poisson-shaped weights are a game model, not historical football statistics.
    for (let count = 1; count <= maximum; count++) {
      items.push(String(count)); weights.push(Math.max(.0005, weights[count - 1] * expected / count));
    }
    return weightedStep(step, items, weights);
  }
  function model(step) {
    if (!enabled()) return step;
    const ctx = context();
    if (step.kind === 'stat') {
      const statIndex = statKeys.indexOf(step.q);
      if (statIndex < 0) return step;
      const target = ctx.profile.stats[statIndex];
      const values = target < 55 ? [20, 30, 40, 50, 60, 70, 80, 90, 99] : [45, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99];
      const weights = values.map(value => Math.max(.001, Math.exp(-.5 * ((value - target) / 9) ** 2) * (value >= 99 ? .12 : value >= 95 ? .35 : 1)));
      return weightedStep(step, values.map(String), weights);
    }
    if (step.kind === 'talents') return { ...step, realisticWeights: [48, 32, 14, 4.5, 1.2, .3] };
    if (step.kind === 'height') {
      return { ...step, realisticWeights: step.items.map(item => {
        const height = Number(String(item).replace('m', '.'));
        return Math.max(.04, Math.exp(-.5 * ((height - ctx.profile.height) / .06) ** 2));
      }) };
    }
    if (step.q === 'Quanti gol hai segnato?' || step.q === 'Quanti assist hai fatto?') {
      const goals = step.q === 'Quanti gol hai segnato?', rate = goals ? ctx.profile.goals : ctx.profile.assists;
      const quality = clamp(.65 + (ctx.stats[goals ? 1 : 2] - 45) / 70, .4, 1.45);
      const expected = ctx.seasons * rate * quality;
      return exactCounts(step, expected, ctx.seasons * rate * quality * 3);
    }
    if (step.kind === 'trophy') return trophyStep(step, ctx);
    return step;
  }
  const originalStep = window.currentStep;
  window.currentStep = function realisticStep(...args) { return model(originalStep.apply(this, args)); };
  const originalWeights = window.weightsFor;
  window.weightsFor = function realisticWeights(step) {
    if (enabled() && Array.isArray(step.realisticWeights) && step.realisticWeights.length === step.items.length) return [...step.realisticWeights];
    return originalWeights(step);
  };
  const originalAccountState = experience.accountState;
  experience.accountState = function (...args) { return { ...originalAccountState.apply(this, args), realisticRules: revision }; };
  const originalRestore = experience.restoreAccountState;
  experience.restoreAccountState = function (data) {
    revision = data?.realisticRules === REVISION ? REVISION : answers.some(Boolean) ? 1 : REVISION;
    const result = originalRestore.call(this, data); renderContext(); return result;
  };
  experience.registerPersistence({
    id: 'realisticRules', serialize: () => ({ revision }),
    restore(data) { revision = data?.revision === REVISION ? REVISION : 1; renderContext(); }
  });
  const contextNote = document.createElement('p');
  contextNote.id = 'realisticWheelContext'; contextNote.className = 'realistic-wheel-context'; contextNote.hidden = true;
  document.getElementById('oddsDescription')?.after(contextNote);
  const ratingNote = document.createElement('small');
  ratingNote.id = 'realisticRatingNote'; ratingNote.className = 'realistic-rating-note'; ratingNote.hidden = true;
  document.querySelector('.career-record .record-title')?.after(ratingNote);
  function renderContext() {
    const text = copy[language] || copy.it;
    if (careerMode === 'realistic' && !experience.getChallenge()?.seed) {
      document.getElementById('careerModeDescription').textContent = revision === REVISION ? text.description : text.legacy;
    }
    document.getElementById('ovrLegendNote').textContent = text.note;
    const ctx = context();
    contextNote.hidden = !enabled();
    contextNote.textContent = wheelPreviewActive ? text.preview : text.context(ctx.role ? tr(ctx.role) : tr('Ruolo'), number(read('Quante stagioni hai giocato?')));
    ratingNote.hidden = !enabled() || document.getElementById('careerSummary').hidden;
    ratingNote.textContent = text.rating;
  }
  const originalUpdate = window.update;
  window.update = function (...args) { const result = originalUpdate.apply(this, args); renderContext(); return result; };
  const originalLegend = window.updateOvrLegend;
  window.updateOvrLegend = function (...args) { const result = originalLegend.apply(this, args); renderContext(); return result; };
  window.fcwRealistic = {
    overall(values, role) {
      if (!enabled()) return null;
      const ctx = context(), weights = ctx.profile.importance;
      if (role !== ctx.role || !Array.isArray(values) || values.length !== 6) return null;
      return clamp(Math.round(values.reduce((sum, value, index) => sum + value * weights[index], 0) / weights.reduce((sum, value) => sum + value, 0)), 1, 99);
    },
    revision: () => revision,
    setRevision(value) { revision = value === REVISION ? REVISION : 1; wheelDirty = true; renderContext(); },
    usesRoleRating: enabled
  };
  window.addEventListener('fcw:reset', () => {
    const duel = window.fcwLocalDuelSession?.state?.();
    revision = duel?.active ? duel.balanceRevision === REVISION ? REVISION : 1 : REVISION;
    wheelDirty = true; renderContext();
  });
  ['fcw:state', 'fcw:language', 'fcw:account-restore', 'fcw:ready'].forEach(name => window.addEventListener(name, renderContext));
  renderContext();
})();
