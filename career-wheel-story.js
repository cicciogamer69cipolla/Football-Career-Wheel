/* A career's identity and three factual highlights, rebuilt from its saved results. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const languages = ['it', 'en', 'es', 'fr'];
  const words = {
    it: {
      eyebrow: 'LA TUA IMPRONTA', demo: 'PROFILO DI ESEMPIO', full: 'Racconto completo', moments: 'Tre momenti della carriera',
      titles: { uncrowned: 'Il bomber senza corona', collector: 'Il collezionista di trofei', world: 'Un nome da Mondiale', golden: 'Una carriera d’oro', architect: 'Il maestro dell’ultimo passaggio', scorer: 'Una vita per il gol', wall: 'Il muro della squadra', elite: 'Talento d’élite', veteran: 'Una carriera senza fretta', complete: 'Il giocatore completo', personal: 'Una storia tutta tua' },
      reasons: { uncrowned: g => `${g}, ma nessun trofeo in bacheca.`, collector: n => `${n} trofei di squadra: il palmarès è il tuo segno distintivo.`, world: n => `${n} Mondiali vinti lasciano il segno nella tua carriera.`, golden: n => `${n} Palloni d’Oro raccontano il riconoscimento del tuo talento.`, architect: a => `${a}: la tua firma è l’ultimo passaggio.`, scorer: g => `${g}: il gol è il filo conduttore della tua carriera.`, wall: (d, p) => `Difesa ${d} e Forza ${p}: una carta costruita sulla solidità.`, elite: n => `OVR ${n}: la qualità della carta è il tuo punto forte.`, veteran: n => `${n} stagioni: una lunga strada nel calcio.`, complete: () => 'Tutti e sei gli attributi hanno raggiunto almeno 80.', personal: (role, style) => [role, style].filter(Boolean).join(' · ') || 'La tua impronta nasce dai risultati delle ruote.' },
      labels: { world: 'La corona mondiale', ballon: 'Il riconoscimento individuale', champions: 'Le notti di Champions', league: 'I titoli nazionali', continental: 'I successi continentali', goals: 'La firma sotto porta', assists: 'L’ultimo passaggio', overall: 'La qualità della carta', attribute: 'Il tuo attributo migliore', seasons: 'La strada percorsa', style: 'Il tuo stile', role: 'Il tuo ruolo', club: 'La tua maglia' },
      counts: { world: 'Mondiali', ballon: 'Palloni d’Oro', champions: 'Champions League', league: 'campionati', continental: 'coppe continentali', goals: 'Fascia gol', assists: 'Fascia assist', seasons: 'stagioni' },
      exact: {goals: 'gol', assists: 'assist'},
      events: { training: 'Allenamento extra', scouting: 'Occhi puntati su di te', record: 'Stagione da record', injury: 'Infortunio lieve', transfer: 'Nuovo inizio', stay: 'La scelta di restare' },
      stats: ['Velocità', 'Finalizzazione', 'Passaggi', 'Dribbling', 'Difesa', 'Forza']
    },
    en: {
      eyebrow: 'YOUR LEGACY', demo: 'EXAMPLE PROFILE', full: 'Full career story', moments: 'Three career highlights',
      titles: { uncrowned: 'The uncrowned goalscorer', collector: 'The trophy collector', world: 'A World Cup name', golden: 'A golden career', architect: 'Master of the final pass', scorer: 'A life devoted to goals', wall: 'The team’s wall', elite: 'Elite talent', veteran: 'A lasting career', complete: 'The complete player', personal: 'A story of your own' },
      reasons: { uncrowned: g => `${g}, with no trophies in the cabinet.`, collector: n => `${n} team trophies: honours define your career.`, world: n => `${n} World Cups won leave their mark on your career.`, golden: n => `${n} Ballons d’Or recognise your talent.`, architect: a => `${a}: the final pass is your signature.`, scorer: g => `${g}: scoring is the thread running through your career.`, wall: (d, p) => `Defending ${d} and Physical ${p}: a card built on strength.`, elite: n => `OVR ${n}: card quality is your greatest asset.`, veteran: n => `${n} seasons: a long journey through football.`, complete: () => 'All six attributes reached at least 80.', personal: (role, style) => [role, style].filter(Boolean).join(' · ') || 'Your legacy comes from the wheel results.' },
      labels: { world: 'The world crown', ballon: 'Individual recognition', champions: 'Champions League nights', league: 'Domestic titles', continental: 'Continental success', goals: 'Your scoring signature', assists: 'The final pass', overall: 'Card quality', attribute: 'Your strongest attribute', seasons: 'The journey', style: 'Your playing style', role: 'Your position', club: 'Your club colours' },
      counts: { world: 'World Cups', ballon: 'Ballons d’Or', champions: 'Champions League titles', league: 'league titles', continental: 'continental cups', goals: 'Goal band', assists: 'Assist band', seasons: 'seasons' },
      exact: {goals: 'goals', assists: 'assists'},
      events: { training: 'Extra training', scouting: 'A scout spots you', record: 'Record season', injury: 'Minor injury', transfer: 'A new beginning', stay: 'Choosing to stay' },
      stats: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical']
    },
    es: {
      eyebrow: 'TU HUELLA', demo: 'PERFIL DE EJEMPLO', full: 'Historia completa', moments: 'Tres momentos de la carrera',
      titles: { uncrowned: 'El goleador sin corona', collector: 'El coleccionista de trofeos', world: 'Un nombre mundialista', golden: 'Una carrera de oro', architect: 'El maestro del último pase', scorer: 'Una vida para el gol', wall: 'El muro del equipo', elite: 'Talento de élite', veteran: 'Una carrera duradera', complete: 'El jugador completo', personal: 'Una historia propia' },
      reasons: { uncrowned: g => `${g}, pero ningún trofeo en la vitrina.`, collector: n => `${n} trofeos de equipo: el palmarés define tu carrera.`, world: n => `${n} Mundiales ganados dejan huella en tu carrera.`, golden: n => `${n} Balones de Oro reconocen tu talento.`, architect: a => `${a}: el último pase es tu firma.`, scorer: g => `${g}: el gol es el hilo de tu carrera.`, wall: (d, p) => `Defensa ${d} y Físico ${p}: una carta basada en la solidez.`, elite: n => `OVR ${n}: la calidad de la carta es tu punto fuerte.`, veteran: n => `${n} temporadas: un largo camino en el fútbol.`, complete: () => 'Los seis atributos alcanzaron al menos 80.', personal: (role, style) => [role, style].filter(Boolean).join(' · ') || 'Tu huella nace de los resultados de las ruletas.' },
      labels: { world: 'La corona mundial', ballon: 'El reconocimiento individual', champions: 'Las noches de Champions', league: 'Los títulos nacionales', continental: 'Los éxitos continentales', goals: 'Tu firma goleadora', assists: 'El último pase', overall: 'La calidad de la carta', attribute: 'Tu mejor atributo', seasons: 'El camino recorrido', style: 'Tu estilo', role: 'Tu posición', club: 'Tus colores' },
      counts: { world: 'Mundiales', ballon: 'Balones de Oro', champions: 'Champions League', league: 'ligas', continental: 'copas continentales', goals: 'Rango de goles', assists: 'Rango de asistencias', seasons: 'temporadas' },
      exact: {goals: 'goles', assists: 'asistencias'},
      events: { training: 'Entrenamiento extra', scouting: 'Un ojeador se fija en ti', record: 'Temporada de récord', injury: 'Lesión leve', transfer: 'Un nuevo comienzo', stay: 'La decisión de quedarse' },
      stats: ['Ritmo', 'Tiro', 'Pase', 'Regate', 'Defensa', 'Físico']
    },
    fr: {
      eyebrow: 'TON EMPREINTE', demo: 'PROFIL D’EXEMPLE', full: 'Histoire complète', moments: 'Trois temps forts de la carrière',
      titles: { uncrowned: 'Le buteur sans couronne', collector: 'Le collectionneur de trophées', world: 'Un nom de Coupe du monde', golden: 'Une carrière en or', architect: 'Le maître de la dernière passe', scorer: 'Une vie pour les buts', wall: 'Le mur de l’équipe', elite: 'Un talent d’élite', veteran: 'Une carrière qui dure', complete: 'Le joueur complet', personal: 'Une histoire à toi' },
      reasons: { uncrowned: g => `${g}, mais aucun trophée au palmarès.`, collector: n => `${n} trophées d’équipe : le palmarès définit ta carrière.`, world: n => `${n} Coupes du monde remportées marquent ta carrière.`, golden: n => `${n} Ballons d’Or récompensent ton talent.`, architect: a => `${a} : la dernière passe est ta signature.`, scorer: g => `${g} : le but est le fil de ta carrière.`, wall: (d, p) => `Défense ${d} et Physique ${p} : une carte fondée sur la solidité.`, elite: n => `GEN ${n} : la qualité de la carte est ton point fort.`, veteran: n => `${n} saisons : un long parcours dans le football.`, complete: () => 'Les six attributs ont atteint au moins 80.', personal: (role, style) => [role, style].filter(Boolean).join(' · ') || 'Ton empreinte vient des résultats des roues.' },
      labels: { world: 'La couronne mondiale', ballon: 'La reconnaissance individuelle', champions: 'Les soirées de Ligue des champions', league: 'Les titres nationaux', continental: 'Les succès continentaux', goals: 'Ta signature de buteur', assists: 'La dernière passe', overall: 'La qualité de la carte', attribute: 'Ton meilleur attribut', seasons: 'Le chemin parcouru', style: 'Ton style', role: 'Ton poste', club: 'Tes couleurs' },
      counts: { world: 'Coupes du monde', ballon: 'Ballons d’Or', champions: 'Ligues des champions', league: 'championnats', continental: 'coupes continentales', goals: 'Tranche de buts', assists: 'Tranche de passes', seasons: 'saisons' },
      exact: {goals: 'buts', assists: 'passes décisives'},
      events: { training: 'Entraînement supplémentaire', scouting: 'Un recruteur te remarque', record: 'Saison record', injury: 'Petite blessure', transfer: 'Un nouveau départ', stay: 'Le choix de rester' },
      stats: ['Vitesse', 'Tir', 'Passes', 'Dribble', 'Défense', 'Physique']
    }
  };
  const statKeys = ['Velocità', 'Finalizzazione', 'Passaggi', 'Dribbling', 'Difesa', 'Forza'];
  const exactSingular = {it: {goals: 'gol', assists: 'assist'}, en: {goals: 'goal', assists: 'assist'}, es: {goals: 'gol', assists: 'asistencia'}, fr: {goals: 'but', assists: 'passe décisive'}};
  const clean = value => String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 140);
  const number = value => Math.max(0, Number(value) || 0);
  const translate = value => {
    try { return window.fcwExperience?.translate?.(clean(value)) || clean(value); } catch { return clean(value); }
  };
  function summarize(state) {
    if (!state?.complete) return null;
    const lang = languages.includes(state.language) ? state.language : 'it', c = words[lang];
    const p = state.playerResult || {}, career = p.career || {}, context = state.context || {};
    const counts = Object.fromEntries(['goals', 'assists', 'seasons', 'league', 'champions', 'world', 'continental', 'ballon'].map(key => [key, number(career[key])]));
    const stats = (Array.isArray(p.stats) ? p.stats : []).slice(0, 6).map(number);
    const teamTrophies = counts.league + counts.champions + counts.world + counts.continental;
    const allTrophies = teamTrophies + counts.ballon;
    const goals = clean(context.goals) || String(counts.goals), assists = clean(context.assists) || String(counts.assists);
    // Keep legacy bands (+100, 100–200) distinct from exact Realistic results.
    const metricText = (key, value) => /^\d+$/.test(value) ? `${value} ${(Number(value) === 1 ? exactSingular[lang] : c.exact)[key]}` : `${c.counts[key]} ${value}`;
    const goalText = metricText('goals', goals), assistText = metricText('assists', assists);
    const role = translate(p.position), style = translate(context.style), overall = number(p.overall);
    let kind = 'personal', parameters = [role, style];
    if (counts.goals >= 500 && allTrophies === 0) { kind = 'uncrowned'; parameters = [goalText]; }
    else if (teamTrophies >= 10) { kind = 'collector'; parameters = [teamTrophies]; }
    else if (counts.world) { kind = 'world'; parameters = [counts.world]; }
    else if (counts.ballon) { kind = 'golden'; parameters = [counts.ballon]; }
    else if (counts.assists >= 300 && counts.assists > counts.goals) { kind = 'architect'; parameters = [assistText]; }
    else if (counts.goals >= 500) { kind = 'scorer'; parameters = [goalText]; }
    else if (['CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'GK', 'Portiere'].includes(p.position) && stats[4] >= 90 && stats[5] >= 80) { kind = 'wall'; parameters = [stats[4], stats[5]]; }
    else if (overall >= 90) { kind = 'elite'; parameters = [overall]; }
    else if (counts.seasons >= 20) { kind = 'veteran'; parameters = [counts.seasons]; }
    else if (stats.length === 6 && stats.every(value => value >= 80)) { kind = 'complete'; parameters = []; }

    const facts = [];
    const add = (key, score, icon, detail) => facts.push({key, score, icon, title: c.labels[key], detail});
    [['world', 1000, '🌍'], ['ballon', 900, '🏅'], ['champions', 800, '✦'], ['league', 600, '🏆'], ['continental', 580, '🌐']].forEach(([key, score, icon]) => {
      if (counts[key]) add(key, score + Math.min(20, counts[key]), icon, `${counts[key]} ${c.counts[key]}`);
    });
    if (counts.goals) add('goals', counts.goals >= 500 ? 750 : 360, '⚽', goalText);
    if (counts.assists) add('assists', counts.assists >= 300 ? 700 : 350, '↗', assistText);
    if (overall) add('overall', overall >= 90 ? 590 : 330, '◇', `${lang === 'fr' ? 'GEN' : 'OVR'} ${overall}`);
    if (stats.length) {
      const best = Math.max(...stats), index = stats.indexOf(best);
      add('attribute', best >= 90 ? 570 : 320, '◆', `${c.stats[index]} ${best}`);
    }
    if (counts.seasons) add('seasons', counts.seasons >= 20 ? 540 : 300, '⌛', `${counts.seasons} ${c.counts.seasons}`);
    if (style) add('style', 310, '◉', style);
    if (role) add('role', 280, '▣', role);
    if (context.club) add('club', 270, '⚑', translate(context.club));
    facts.sort((a, b) => b.score - a.score);

    // Events carry only effects and choices already committed by the real career.
    const events = (Array.isArray(context.events) ? context.events : []).map((event, index) => {
      if (!c.events[event.id] || !Number.isFinite(Number(event.delta))) return null;
      const statIndex = statKeys.indexOf(event.stat);
      if (statIndex < 0) return null;
      const delta = Number(event.delta), effect = `${delta > 0 ? '+' : ''}${delta} ${c.stats[statIndex]}`;
      const changed = event.id === 'transfer' && event.clubChanged && (event.clubFrom || event.fromClub) && event.clubTo;
      const stayed = event.id === 'transfer' && event.choiceId === 'stay';
      return {key: `event-${index}`, score: changed ? 100 : ({record: 90, injury: 80, scouting: 70, training: 60, transfer: 50}[event.id] || 0), icon: {training: '↗', scouting: '◎', record: '✦', injury: '✚', transfer: '⇄'}[event.id], title: c.events[stayed ? 'stay' : event.id], detail: changed ? `${clean(event.clubFrom || event.fromClub)} → ${clean(event.clubTo)} · ${effect}` : effect};
    }).filter(Boolean).sort((a, b) => b.score - a.score);
    const moments = events.length ? [...facts.slice(0, 2), events[0]] : facts.slice(0, 3);
    return {kind, language: lang, demo: Boolean(state.demo), title: c.titles[kind], description: c.reasons[kind](...parameters), moments: moments.map(({key, icon, title, detail}) => ({key, icon, title, detail}))};
  }

  let panel, eyebrow, title, description, list, lastKey = '', current = null;
  function mount() {
    if (panel?.isConnected) return true;
    const record = document.querySelector('#careerSummary .career-record');
    if (!record) return false;
    panel = document.createElement('section'); panel.id = 'careerStoryHighlights'; panel.className = 'career-story-highlights'; panel.hidden = true;
    panel.setAttribute('aria-labelledby', 'careerStoryHeadline');
    eyebrow = document.createElement('small'); eyebrow.className = 'career-story-eyebrow';
    title = document.createElement('h3'); title.id = 'careerStoryHeadline'; title.className = 'career-story-headline';
    description = document.createElement('p'); description.className = 'career-story-description';
    list = document.createElement('ol'); list.className = 'career-story-moments';
    panel.append(eyebrow, title, description, list);
    const fullStory = $('careerStory');
    if (fullStory) { fullStory.before(panel); panel.append(fullStory); }
    else record.append(panel);
    return true;
  }
  function snapshot() { try { return window.fcwExperience?.snapshot?.() || null; } catch { return null; } }
  function refresh(event) {
    if (!mount()) return;
    const state = event?.detail?.playerResult ? event.detail : snapshot();
    current = summarize(state);
    panel.hidden = !current;
    if (!current) { lastKey = ''; title.textContent = ''; description.textContent = ''; list.replaceChildren(); const full = $('careerStory'); if (full) full.open = false; return; }
    const c = words[current.language], key = JSON.stringify(current);
    if (key !== lastKey) {
      if (lastKey && current.demo !== panel.classList.contains('is-demo')) { const full = $('careerStory'); if (full) full.open = false; }
      lastKey = key;
      eyebrow.textContent = current.demo ? c.demo : c.eyebrow;
      title.textContent = current.title; description.textContent = current.description;
      panel.classList.toggle('is-demo', current.demo);
      list.setAttribute('aria-label', c.moments);
      list.replaceChildren(...current.moments.map(moment => {
        const row = document.createElement('li'), mark = document.createElement('span'), text = document.createElement('span'), heading = document.createElement('strong'), detail = document.createElement('small');
        mark.className = 'career-story-moment-mark'; mark.textContent = moment.icon; mark.setAttribute('aria-hidden', 'true');
        heading.textContent = moment.title; detail.textContent = moment.detail; text.append(heading, detail); row.append(mark, text); return row;
      }));
    }
    // Personality continues to own the long narrative and its copy action.
    const full = $('careerStory');
    if (full) { if (full.parentElement !== panel) panel.append(full); const summary = full.querySelector('summary'); if (summary) summary.textContent = c.full; }
  }
  window.fcwCareerStory = Object.freeze({summarize, refresh, snapshot: () => current ? {...current, moments: current.moments.map(moment => ({...moment}))} : null});
  ['fcw:state', 'fcw:complete', 'fcw:language', 'fcw:ready', 'fcw:account-restore'].forEach(name => window.addEventListener(name, refresh));
  window.addEventListener('fcw:reset', () => { current = null; lastKey = ''; if (panel) { panel.hidden = true; title.textContent = ''; description.textContent = ''; list.replaceChildren(); } const full = $('careerStory'); if (full) full.open = false; });
  $('languageSelect')?.addEventListener('change', () => requestAnimationFrame(() => refresh()));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => refresh(), {once: true}); else refresh();
})();
