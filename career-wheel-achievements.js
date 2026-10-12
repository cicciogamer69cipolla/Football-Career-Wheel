/* Lifetime quest catalogue; classic script loaded after experience and challenges. */
(() => {
  'use strict';
  const LEDGER_KEY = 'fcw-achievement-careers-v1';
  const RECORD_KEY = 'fcw-personal-records-v1';
  const statQuestions = ['Velocità', 'Finalizzazione', 'Passaggi', 'Dribbling', 'Difesa', 'Forza'];
  const statMetrics = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
  const number = value => {
    if (typeof value === 'number') return Number.isFinite(value) ? Math.max(0, value) : 0;
    const match = String(value ?? '').match(/\d+/);
    return match ? Number(match[0]) : 0;
  };
  const unique = values => [...new Set((Array.isArray(values) ? values : []).filter(value => typeof value === 'string' && value && value.length <= 160))];
  const realRunId = value => typeof value === 'string' && value.length > 0 && value.length <= 160 && !value.startsWith('archive-');
  function emptyLedger() { return { version: 1, seen: [], totals: { goals: 0, assists: 0 }, sets: { nations: [], leagues: [], roles: [], styles: [] }, runs: Object.create(null) }; }
  function normalizeLedger(value) {
    if (!value || typeof value !== 'object' || value.version !== 1) return null;
    const result = emptyLedger();
    result.seen = unique(value.seen).filter(realRunId);
    result.totals.goals = number(value.totals?.goals); result.totals.assists = number(value.totals?.assists);
    Object.keys(result.sets).forEach(key => { result.sets[key] = unique(value.sets?.[key]); });
    // Keep historical aggregates intact; new runs also retain their individual contribution.
    const known = new Set(result.seen);
    Object.entries(value.runs && typeof value.runs === 'object' ? value.runs : {}).forEach(([id, run]) => {
      if (!known.has(id) || !run || typeof run !== 'object') return;
      result.runs[id] = {
        goals: number(run.goals), assists: number(run.assists),
        nation: String(run.nation || '').slice(0, 160), league: String(run.league || '').slice(0, 160),
        role: String(run.role || '').slice(0, 160), style: String(run.style || '').slice(0, 160)
      };
    });
    return result;
  }
  function addSet(data, key, value) {
    const text = String(value || '').trim();
    if (text && text !== '—' && !data.sets[key].includes(text)) data.sets[key].push(text.slice(0, 160));
  }
  function appendMetrics(data, player, context = {}) {
    data.totals.goals += number(player?.career?.goals); data.totals.assists += number(player?.career?.assists);
    addSet(data, 'nations', context.nation); addSet(data, 'leagues', context.league);
    addSet(data, 'roles', player?.position); addSet(data, 'styles', context.style);
  }
  function rememberRun(data, id, player, context = {}) {
    if (!realRunId(id)) return;
    data.runs[id] = {
      goals: number(player?.career?.goals), assists: number(player?.career?.assists),
      nation: String(context.nation || '').slice(0, 160), league: String(context.league || '').slice(0, 160),
      role: String(player?.position || '').slice(0, 160), style: String(context.style || '').slice(0, 160)
    };
  }
  function bootstrapLedger() {
    try {
      const stored = normalizeLedger(JSON.parse(localStorage.getItem(LEDGER_KEY) || 'null'));
      if (stored) return stored;
    } catch { /* A new ledger is safe when storage is unavailable or malformed. */ }
    const data = emptyLedger();
    try {
      // The personal-record registry contains only completed, non-demo run IDs.
      const records = JSON.parse(localStorage.getItem(RECORD_KEY) || 'null');
      data.seen = unique(records?.seen).filter(realRunId);
      const known = new Set(data.seen), migrated = new Set();
      const entries = typeof savedCareers === 'function' ? savedCareers() : [];
      entries.forEach(entry => {
        const id = entry?.experience?.runId;
        if (!known.has(id) || migrated.has(id)) return;
        migrated.add(id);
        const source = typeof normalizeCareerAnswers === 'function' ? normalizeCareerAnswers(entry) : entry.answers || [];
        const answer = (question, kind) => source[steps.findIndex(step => step.q === question)]?.value || (kind && kind !== 'range' ? source.find(item => item?.kind === kind)?.value : '') || '';
        appendMetrics(data, { position: entry.position || answer('In quale ruolo giochi?', 'position'), career: { goals: number(entry.goals || answer('Quanti gol hai segnato?', 'range')), assists: number(entry.assists || answer('Quanti assist hai fatto?', 'range')) } }, {
          nation: answer('Qual è la tua nazionalità?', 'country'), league: entry.league || answer('In quale campionato giochi al top?', 'league'), style: entry.playStyle || answer('Qual è il tuo stile di gioco?', 'playstyle')
        });
      });
    } catch { /* Opening archived careers never adds them to this registry. */ }
    return data;
  }
  let ledger = bootstrapLedger(), suppressNotifications = false, suppressCommits = false;
  function saveLedger() { try { localStorage.setItem(LEDGER_KEY, JSON.stringify(ledger)); } catch { /* Keep the current session accurate if storage is full. */ } }
  saveLedger();

  const added = [
    { icon: '🏁', metric: 'accountCareers', target: 1, color: '#77c699', xp: 100, group: 'account' },
    { icon: '🛤️', metric: 'accountCareers', target: 3, color: '#65b8aa', xp: 100, group: 'account' },
    { icon: '📚', metric: 'accountCareers', target: 10, color: '#90b8db', xp: 200, group: 'account' },
    { icon: '🏛️', metric: 'accountCareers', target: 25, color: '#e9bd6f', xp: 300, group: 'account' },
    { icon: '⚽', metric: 'accountGoals', target: 1500, color: '#e6ae70', xp: 200, group: 'account' },
    { icon: '🎁', metric: 'accountAssists', target: 1000, color: '#b49bcf', xp: 200, group: 'account' },
    { icon: '🌎', metric: 'visitedNations', target: 3, color: '#8fcbab', xp: 100, group: 'account' },
    { icon: '🧳', metric: 'visitedLeagues', target: 3, color: '#86b4ce', xp: 100, group: 'account' },
    { icon: '🔄', metric: 'playedRoles', target: 3, color: '#c4a8d4', xp: 100, group: 'account' },
    { icon: '🎮', metric: 'exploredStyles', target: 3, color: '#a8c698', xp: 100, group: 'account' },
    { icon: '⚖️', metric: 'steadySix', target: 1, color: '#7bc5b1', xp: 100, group: 'attributes' },
    { icon: '🤝', metric: 'dualContribution', target: 1, color: '#d4b576', xp: 200, group: 'combinations' },
    { icon: '📈', metric: 'careerPoints', target: 300, color: '#e8bb70', xp: 200, group: 'career' },
    { icon: '🕊️', metric: 'fairPlay', target: 1, color: '#9cd0c2', xp: 100, group: 'career' },
    { icon: '🥅', metric: 'clinicalFinish', target: 1, color: '#e3a084', xp: 200, group: 'combinations' },
    { icon: '📐', metric: 'assistArchitect', target: 1, color: '#baa0d7', xp: 200, group: 'combinations' },
    { icon: '💨', metric: 'lightningDribbler', target: 1, color: '#d7c579', xp: 200, group: 'combinations' },
    { icon: '🧱', metric: 'physicalGuardian', target: 1, color: '#7dbbb4', xp: 100, group: 'combinations' },
    { icon: '🎼', metric: 'midfieldMaestro', target: 1, color: '#a4a8d8', xp: 100, group: 'combinations' },
    { icon: '🏅', metric: 'clubAndCountry', target: 1, color: '#d6b275', xp: 200, group: 'honours' },
    { icon: '👑', metric: 'europeanDynasty', target: 1, color: '#9cbddd', xp: 200, group: 'honours' },
    { icon: '🏆', metric: 'silverwareFirst', target: 1, color: '#daa973', xp: 200, group: 'combinations' },
    { icon: '🌿', metric: 'naturalHero', target: 1, color: '#9cc690', xp: 200, group: 'combinations' },
    { icon: '🌐', metric: 'nationalDouble', target: 1, color: '#74beb5', xp: 300, group: 'honours' }
  ];
  const newCopy = {
    it: [
      ['Prima storia', 'Completa una carriera reale.'], ['Ci hai preso gusto', 'Completa 3 carriere reali.'], ['Archivista', 'Completa 10 carriere reali.'], ['Una lunga storia', 'Completa 25 carriere reali.'],
      ['Gol senza fine', 'Accumula 1.500 gol nelle carriere reali registrate.'], ['Generosità costante', 'Accumula 1.000 assist nelle carriere reali registrate.'], ['Passaporto del calcio', 'Completa carriere con 3 nazionalità diverse.'], ['Giro dei campionati', 'Completa carriere in 3 campionati diversi.'], ['Versatile', 'Completa carriere in 3 ruoli diversi.'], ['Identità di gioco', 'Completa carriere con 3 stili di gioco diversi.'],
      ['Base solida', 'Termina con tutti e sei gli attributi almeno a 70.'], ['Segna e crea', 'Termina con almeno 300 gol e 200 assist.'], ['Carriera di valore', 'Termina con almeno 300 Career Points.'], ['Fair play', 'Termina con gialli e rossi entrambi nella fascia 0–10.'], ['Finalizzatore affidabile', 'Termina con almeno 500 gol e tiro almeno 90.'], ['Architetto del gol', 'Termina con almeno 300 assist e passaggi almeno 90.'], ['Imprendibile', 'Termina con velocità almeno 90 e dribbling almeno 85.'], ['Guardiano', 'Termina con difesa e fisico entrambi almeno 85.'], ['Orchestra a centrocampo', 'Termina con passaggi e dribbling entrambi almeno 85.'], ['Club e nazionale', 'Vinci almeno un campionato e un Mondiale nella stessa carriera.'], ['Dinastia europea', 'Vinci almeno 3 campionati e 2 Champions nella stessa carriera.'], ['Il palmarès conta', 'Termina con OVR tra 75 e 84 e almeno 8 trofei.'], ['Talento naturale', 'Termina con OVR almeno 85 senza talenti speciali.'], ['Orgoglio nazionale', 'Vinci almeno un Mondiale e 2 coppe continentali nella stessa carriera.']
    ],
    en: [
      ['First story', 'Finish one real career.'], ['Getting into it', 'Finish 3 real careers.'], ['Archivist', 'Finish 10 real careers.'], ['A long history', 'Finish 25 real careers.'],
      ['Goals keep coming', 'Accumulate 1,500 goals across registered real careers.'], ['Always generous', 'Accumulate 1,000 assists across registered real careers.'], ['Football passport', 'Finish careers with 3 different nationalities.'], ['League traveller', 'Finish careers in 3 different leagues.'], ['Versatile', 'Finish careers in 3 different positions.'], ['Playing identity', 'Finish careers with 3 different playing styles.'],
      ['Solid foundation', 'Finish with all six attributes at 70 or higher.'], ['Score and create', 'Finish with at least 300 goals and 200 assists.'], ['A valuable career', 'Finish with at least 300 Career Points.'], ['Fair play', 'Finish with both yellow and red cards in the 0–10 bracket.'], ['Reliable finisher', 'Finish with at least 500 goals and shooting of at least 90.'], ['Goal architect', 'Finish with at least 300 assists and passing of at least 90.'], ['Uncatchable', 'Finish with pace of at least 90 and dribbling of at least 85.'], ['The guardian', 'Finish with defending and physical both at least 85.'], ['Midfield orchestra', 'Finish with passing and dribbling both at least 85.'], ['Club and country', 'Win at least one league title and one World Cup in the same career.'], ['European dynasty', 'Win at least 3 league titles and 2 Champions Leagues in the same career.'], ['Honours matter', 'Finish with OVR between 75 and 84 and at least 8 trophies.'], ['Natural talent', 'Finish with OVR of at least 85 and no special traits.'], ['National pride', 'Win at least one World Cup and 2 continental cups in the same career.']
    ],
    es: [
      ['Primera historia', 'Completa una carrera real.'], ['Le has cogido el gusto', 'Completa 3 carreras reales.'], ['Archivista', 'Completa 10 carreras reales.'], ['Una larga historia', 'Completa 25 carreras reales.'],
      ['Goles sin fin', 'Acumula 1.500 goles en las carreras reales registradas.'], ['Siempre generoso', 'Acumula 1.000 asistencias en las carreras reales registradas.'], ['Pasaporte del fútbol', 'Completa carreras con 3 nacionalidades diferentes.'], ['Viajero de ligas', 'Completa carreras en 3 ligas diferentes.'], ['Versátil', 'Completa carreras en 3 posiciones diferentes.'], ['Identidad de juego', 'Completa carreras con 3 estilos de juego diferentes.'],
      ['Base sólida', 'Termina con los seis atributos en 70 o más.'], ['Marca y crea', 'Termina con al menos 300 goles y 200 asistencias.'], ['Carrera de valor', 'Termina con al menos 300 puntos de carrera.'], ['Juego limpio', 'Termina con amarillas y rojas en el intervalo 0–10.'], ['Finalizador fiable', 'Termina con al menos 500 goles y tiro de 90 o más.'], ['Arquitecto del gol', 'Termina con al menos 300 asistencias y pases de 90 o más.'], ['Inalcanzable', 'Termina con velocidad de 90 o más y regate de 85 o más.'], ['El guardián', 'Termina con defensa y físico en 85 o más.'], ['Orquesta del centro', 'Termina con pases y regate en 85 o más.'], ['Club y selección', 'Gana al menos una liga y un Mundial en la misma carrera.'], ['Dinastía europea', 'Gana al menos 3 ligas y 2 Champions en la misma carrera.'], ['El palmarés cuenta', 'Termina con OVR entre 75 y 84 y al menos 8 trofeos.'], ['Talento natural', 'Termina con OVR de 85 o más sin talentos especiales.'], ['Orgullo nacional', 'Gana al menos un Mundial y 2 copas continentales en la misma carrera.']
    ],
    fr: [
      ['Première histoire', 'Terminez une vraie carrière.'], ['Vous y prenez goût', 'Terminez 3 vraies carrières.'], ['Archiviste', 'Terminez 10 vraies carrières.'], ['Une longue histoire', 'Terminez 25 vraies carrières.'],
      ['Des buts sans fin', 'Cumulez 1 500 buts dans les vraies carrières enregistrées.'], ['Toujours généreux', 'Cumulez 1 000 passes décisives dans les vraies carrières enregistrées.'], ['Passeport du football', 'Terminez des carrières avec 3 nationalités différentes.'], ['Voyageur des ligues', 'Terminez des carrières dans 3 championnats différents.'], ['Polyvalent', 'Terminez des carrières à 3 postes différents.'], ['Identité de jeu', 'Terminez des carrières avec 3 styles de jeu différents.'],
      ['Base solide', 'Terminez avec les six attributs à 70 ou plus.'], ['Marquer et créer', 'Terminez avec au moins 300 buts et 200 passes décisives.'], ['Une carrière de valeur', 'Terminez avec au moins 300 points de carrière.'], ['Fair-play', 'Terminez avec jaunes et rouges dans la tranche 0–10.'], ['Finisseur fiable', 'Terminez avec au moins 500 buts et un tir à 90 ou plus.'], ['Architecte des buts', 'Terminez avec au moins 300 passes décisives et des passes à 90 ou plus.'], ['Insaisissable', 'Terminez avec une vitesse à 90 ou plus et un dribble à 85 ou plus.'], ['Le gardien du mur', 'Terminez avec défense et physique à 85 ou plus.'], ['Orchestre au milieu', 'Terminez avec passes et dribble à 85 ou plus.'], ['Club et sélection', 'Gagnez au moins un championnat et une Coupe du monde dans la même carrière.'], ['Dynastie européenne', 'Gagnez au moins 3 championnats et 2 Ligues des champions dans la même carrière.'], ['Le palmarès compte', 'Terminez avec une GEN entre 75 et 84 et au moins 8 trophées.'], ['Talent naturel', 'Terminez avec une GEN à 85 ou plus sans talent spécial.'], ['Fierté nationale', 'Gagnez au moins une Coupe du monde et 2 coupes continentales dans la même carrière.']
    ]
  };
  const groupLabels = {
    it: { account: 'Percorso', attributes: 'Attributi', career: 'Carriera', honours: 'Palmarès', combinations: 'Combinazioni' },
    en: { account: 'Journey', attributes: 'Attributes', career: 'Career', honours: 'Honours', combinations: 'Combinations' },
    es: { account: 'Trayectoria', attributes: 'Atributos', career: 'Carrera', honours: 'Palmarés', combinations: 'Combinaciones' },
    fr: { account: 'Parcours', attributes: 'Attributs', career: 'Carrière', honours: 'Palmarès', combinations: 'Combinaisons' }
  };
  const legacyCount = achievementDefinitions.length;
  const existingIds = new Set(achievementDefinitions.map(item => `${item.metric}-${item.target}`));
  added.forEach((item, index) => {
    if (existingIds.has(`${item.metric}-${item.target}`)) return;
    achievementDefinitions.push(item);
    Object.keys(newCopy).forEach(locale => achievementCopy[locale].items.push(newCopy[locale][index]));
  });
  const goalRecordIndex = achievementDefinitions.findIndex(item => item.metric === 'goals' && item.target === 1000);
  if (goalRecordIndex >= 0) {
    // Keep goals-1000, its historical date, and 300 XP; only its attainable goal changes.
    ['it', 'en', 'es', 'fr'].forEach(locale => {
      achievementCopy[locale].items[goalRecordIndex][1] = { it: '900+ gol', en: '900+ goals', es: '900+ goles', fr: '900+ buts' }[locale];
    });
  }
  const originalXP = achievementXP;
  achievementXP = function (item) { return [100, 200, 300].includes(item?.xp) ? item.xp : originalXP(item); };
  function groupFor(item) {
    if (item.group) return item.group;
    if (item.secret) return 'combinations';
    if (['overall', 'bestStat', 'eliteStats', 'highStats', ...statMetrics].includes(item.metric)) return 'attributes';
    if (['league', 'champions', 'world', 'continental', 'ballon', 'totalTrophies', 'trophyTypes'].includes(item.metric)) return 'honours';
    return 'career';
  }
  const accountMetrics = new Set(added.filter(item => item.group === 'account').map(item => item.metric));
  function ledgerMetrics() {
    return { accountCareers: ledger.seen.length, accountGoals: ledger.totals.goals, accountAssists: ledger.totals.assists, visitedNations: ledger.sets.nations.length, visitedLeagues: ledger.sets.leagues.length, playedRoles: ledger.sets.roles.length, exploredStyles: ledger.sets.styles.length };
  }

  const originalMetrics = missionMetrics;
  missionMetrics = function (answerSet = answers, statValues = null, overallValue = null, traits = chosenTraits) {
    const source = Array.isArray(answerSet) ? answerSet : [];
    const valueFor = question => source[steps.findIndex(step => step.q === question)]?.value || '';
    const current = source === answers;
    const cardStats = current && !document.getElementById('careerSummary').hidden ? [...document.querySelectorAll('#cardStats .card-stat strong')].map(node => number(node.textContent)) : [];
    // Six fixed positions avoid treating an early shooting result as pace.
    const stats = statQuestions.map((question, index) => Array.isArray(statValues) ? number(Array.isArray(statValues[index]) ? statValues[index][1] : statValues[index]) : cardStats.length === 6 ? cardStats[index] : number(valueFor(question)));
    const result = originalMetrics(source, stats, overallValue, traits);
    const metrics = result.metrics;
    const position = source.find(answer => answer?.kind === 'position')?.value || '';
    const player = { name: '', position, overall: metrics.overall, stats, career: { goals: metrics.goals, assists: metrics.assists, seasons: metrics.seasons, league: metrics.league, champions: metrics.champions, world: metrics.world, continental: metrics.continental, ballon: metrics.ballon } };
    const points = window.FCWScoring?.careerPoints?.(player);
    const yellow = String(valueFor('Quanti cartellini gialli?')).match(/\d+/g), red = String(valueFor('Quanti cartellini rossi?')).match(/\d+/g);
    Object.assign(metrics, {
      steadySix: stats.every(value => value >= 70) ? 1 : 0,
      dualContribution: metrics.goals >= 300 && metrics.assists >= 200 ? 1 : 0,
      careerPoints: number(points?.total),
      fairPlay: yellow?.length === 2 && red?.length === 2 && Number(yellow[0]) === 0 && Number(yellow[1]) === 10 && Number(red[0]) === 0 && Number(red[1]) === 10 ? 1 : 0,
      clinicalFinish: metrics.goals >= 500 && metrics.shooting >= 90 ? 1 : 0,
      assistArchitect: metrics.assists >= 300 && metrics.passing >= 90 ? 1 : 0,
      lightningDribbler: metrics.pace >= 90 && metrics.dribbling >= 85 ? 1 : 0,
      physicalGuardian: metrics.defending >= 85 && metrics.physical >= 85 ? 1 : 0,
      midfieldMaestro: metrics.passing >= 85 && metrics.dribbling >= 85 ? 1 : 0,
      clubAndCountry: metrics.league >= 1 && metrics.world >= 1 ? 1 : 0,
      europeanDynasty: metrics.league >= 3 && metrics.champions >= 2 ? 1 : 0,
      silverwareFirst: metrics.overall >= 75 && metrics.overall <= 84 && metrics.totalTrophies >= 8 ? 1 : 0,
      naturalHero: metrics.overall >= 85 && metrics.talents === 0 && source.some(answer => answer?.kind === 'talents') ? 1 : 0,
      nationalDouble: metrics.world >= 1 && metrics.continental >= 2 ? 1 : 0
    }, current && statValues === null ? ledgerMetrics() : Object.fromEntries([...accountMetrics].map(metric => [metric, 0])));
    return { ...result, stats, metrics };
  };
  const originalState = missionState;
  missionState = function (...args) {
    const state = originalState(...args);
    const missions = state.missions.map(mission => {
      if (mission.id !== 'goals-1000') return mission;
      return { ...mission, item: { ...mission.item, target: 900, legacyTarget: 1000 }, current: state.metrics.goals, earned: state.metrics.goals >= 900 };
    });
    const unlocked = missions.filter(mission => mission.earned), xp = unlocked.reduce((sum, mission) => sum + mission.xp, 0);
    return { ...state, missions, unlocked, xp, level: Math.floor(xp / 500) + 1, levelProgress: xp % 500, rank: xp >= 5000 ? 'legend' : xp >= 3000 ? 'gold' : xp >= 1500 ? 'silver' : xp >= 500 ? 'bronze' : 'rookie' };
  };
  function genuineCompletion(state = window.fcwExperience?.snapshot?.()) { return Boolean(state?.complete && !state.demo && !state.restored && state.runId && state.playerResult); }
  function canCommit() {
    if (suppressCommits || window.fcwAccountHydrating === true) return false;
    const state = window.fcwExperience?.snapshot?.();
    // The complete event registers this run before committing every quest together.
    return genuineCompletion(state) && ledger.seen.includes(String(state.runId));
  }
  const originalWriter = recordLifetimeAchievementUnlocks;
  recordLifetimeAchievementUnlocks = function (state) {
    return canCommit() ? originalWriter(state) : loadAchievementProfile();
  };
  const originalNotify = notifyNewAchievements;
  notifyNewAchievements = function (...args) {
    if (suppressNotifications || !canCommit()) return;
    return originalNotify(...args);
  };
  function catalog() {
    return achievementDefinitions.map((item, index) => ({ ...item, id: `${item.metric}-${item.target}`, index, target: item.metric === 'goals' && item.target === 1000 ? 900 : item.target, xp: achievementXP(item), group: groupFor(item) }));
  }
  function profileState() {
    const profile = loadAchievementProfile(), items = catalog();
    const missions = items.map(item => ({ ...item, earned: Boolean(profile.unlocked[item.id]), date: profile.unlocked[item.id]?.date || '' }));
    const unlocked = missions.filter(mission => mission.earned), xp = unlocked.reduce((sum, item) => sum + item.xp, 0);
    return { xp, level: Math.floor(xp / 500) + 1, levelProgress: xp % 500, rank: xp >= 5000 ? 'legend' : xp >= 3000 ? 'gold' : xp >= 1500 ? 'silver' : xp >= 500 ? 'bronze' : 'rookie', total: items.length, unlockedCount: unlocked.length, unlockedIds: unlocked.map(item => item.id), missions };
  }
  function nextMilestone() {
    const profile = loadAchievementProfile(), live = missionState();
    const state = window.fcwExperience?.snapshot?.();
    const preview = Boolean(state?.demo || state?.restored);
    const candidates = catalog().filter(item => !item.secret && !profile.unlocked[item.id] && (!preview || accountMetrics.has(item.metric))).map(item => {
      const target = Number(item.target), current = Math.max(0, Math.min(target, number(live.metrics[item.metric])));
      return { ...item, current, progress: target > 0 ? current / target : 0, scope: accountMetrics.has(item.metric) ? 'lifetime' : 'career', ready: current >= target };
    }).filter(item => item.target > 0);
    // A real, visible amount of progress takes priority. With a fresh career,
    // completing the next lifetime career is a useful first goal.
    candidates.sort((a, b) => b.progress - a.progress || Number(b.metric === 'accountCareers') - Number(a.metric === 'accountCareers') || a.target - b.target || a.index - b.index);
    return candidates[0] || null;
  }
  window.fcwAchievements = {
    catalog, profileState, nextMilestone, groupFor, addedCount: added.length, legacyCount,
    groups(locale = document.documentElement.lang || 'it') { const labels = groupLabels[locale] || groupLabels.it; return Object.keys(labels).map(id => ({ id, label: labels[id] })); },
    ledger() { return { ...ledgerMetrics(), registeredRunIds: [...ledger.seen] }; }
  };
  function refresh(silent = false) {
    const previous = suppressNotifications, previousCommits = suppressCommits;
    suppressNotifications = silent; suppressCommits = silent;
    try { renderAchievements(); } finally { suppressNotifications = previous; suppressCommits = previousCommits; }
    window.dispatchEvent(new CustomEvent('fcw:achievements', { detail: profileState() }));
  }
  window.addEventListener('fcw:complete', event => {
    const state = event.detail;
    if (window.fcwAccountHydrating === true || !genuineCompletion(state) || !realRunId(String(state.runId))) return;
    const id = String(state.runId);
    if (!ledger.seen.includes(id)) {
      ledger.seen.push(id); appendMetrics(ledger, state.playerResult, state.context);
      rememberRun(ledger, id, state.playerResult, state.context); saveLedger();
    }
    refresh();
  });
  // State transitions from archive/demo update progress without awarding account XP.
  let priorKind = '';
  window.addEventListener('fcw:state', event => {
    const state = event.detail, kind = `${state?.runId}:${Boolean(state?.complete)}:${Boolean(state?.demo)}:${Boolean(state?.restored)}`;
    if (kind === priorKind) return;
    priorKind = kind; refresh(true);
  });
  window.addEventListener('storage', event => {
    if (event.key !== LEDGER_KEY && event.key !== 'fcw-achievement-profile-v1') return;
    if (event.key === LEDGER_KEY) {
      try { ledger = normalizeLedger(JSON.parse(event.newValue || 'null')) || emptyLedger(); } catch { return; }
    }
    refresh(true);
  });
  window.addEventListener('fcw:account-restore', () => {
    try { ledger = normalizeLedger(JSON.parse(localStorage.getItem(LEDGER_KEY) || 'null')) || emptyLedger(); }
    catch { ledger = emptyLedger(); }
    priorKind = '';
    document.getElementById('achievementToasts')?.replaceChildren();
    refresh(true);
  });
  refresh(true);
})();
