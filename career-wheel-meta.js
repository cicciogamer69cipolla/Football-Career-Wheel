(() => {
  'use strict';

  const challengeStorageKey = 'fcw-daily-challenge-v1';
  const dailyChallenges = [
    { id: 'elite', test: data => data.overall >= 85 },
    { id: 'goals', test: data => data.goals >= 300 },
    { id: 'europe', test: data => data.champions >= 2 },
    { id: 'talents', test: data => data.talents >= 3 },
    { id: 'balanced', test: data => data.stats.length === 6 && data.stats.every(value => value >= 75) },
    { id: 'trophies', test: data => data.trophies >= 8 }
  ];
  const copy = {
    it: {
      challengeSummary: 'SFIDA DEL GIORNO', challengeLabel: 'SFIDA DI OGGI', challengeTitle: 'Una nuova carriera, la stessa sfida per tutti',
      challengeHelp: 'Le ruote seguono la stessa sequenza per tutti oggi. Completa la carriera e raggiungi l’obiettivo per ottenere punti.',
      objectiveLabel: 'OBIETTIVO', codeLabel: 'CODICE SFIDA', start: 'Avvia la sfida', retry: 'Riprova la sfida', running: 'Sfida in corso',
      noAttempts: 'Non hai ancora giocato la sfida di oggi.', inProgress: 'Sfida attiva: completa tutte le ruote per vedere il punteggio.',
      history: r => 'Tentativi oggi: ' + r.attempts + ' · miglior punteggio: ' + r.bestScore + (r.success ? ' · obiettivo raggiunto' : ''),
      completed: (score, goal) => 'Sfida completata! ' + goal + ' · ' + score + ' punti.',
      missed: (score, goal) => 'Carriera completata: ' + score + ' punti. Obiettivo non raggiunto: ' + goal + '.',
      confirmRestart: 'La carriera in corso verrà ricominciata per avviare la sfida del giorno. Continuare?',
      win: (score, goal) => '🏅 Sfida del giorno completata · ' + score + ' punti · ' + goal,
      loss: (score, goal) => 'Sfida del giorno · ' + score + ' punti · obiettivo: ' + goal,
      shareTitle: 'La mia Sfida del giorno', copied: 'Risultato della sfida copiato!', share: 'Condividi risultato', points: 'punti',
      objectives: {
        elite: ['Da promessa a leggenda', 'Chiudi la carriera con OVR almeno 85.'],
        goals: ['Bomber', 'Raggiungi almeno +300 gol in carriera.'],
        europe: ['Re d’Europa', 'Vinci almeno 2 Champions League.'],
        talents: ['Talento puro', 'Scegli almeno 3 talenti speciali.'],
        balanced: ['Tuttofare', 'Chiudi con tutti e sei gli attributi a 75 o più.'],
        trophies: ['Bacheca piena', 'Vinci almeno 8 trofei in totale.']
      },
      albumSummary: 'ALBUM DELLE CARTE', albumTitle: 'La tua collezione',
      albumHelp: 'Qui trovi le rarità, le nazionalità e i campionati delle carriere che hai salvato.',
      savedCareers: n => n + (n === 1 ? ' carriera salvata' : ' carriere salvate'), rarity: 'Rarità',
      nations: 'Nazionalità', leagues: 'Campionati', found: (n, total) => n + ' di ' + total + ' raccolte',
      tierCount: n => n + (n === 1 ? ' carta' : ' carte'), empty: 'Salva una carriera completa per iniziare a riempire l’album.',
      collection: 'Collezione', collected: 'Raccolta', missing: 'Da trovare'
    },
    en: {
      challengeSummary: 'DAILY CHALLENGE', challengeLabel: 'TODAY’S CHALLENGE', challengeTitle: 'A new career, the same challenge for everyone',
      challengeHelp: 'Everyone gets the same wheel sequence today. Finish the career and meet the goal to score points.',
      objectiveLabel: 'GOAL', codeLabel: 'CHALLENGE CODE', start: 'Start challenge', retry: 'Retry challenge', running: 'Challenge in progress',
      noAttempts: 'You have not played today’s challenge yet.', inProgress: 'Challenge active: finish every wheel to see your score.',
      history: r => 'Attempts today: ' + r.attempts + ' · best score: ' + r.bestScore + (r.success ? ' · goal reached' : ''),
      completed: (score, goal) => 'Challenge complete! ' + goal + ' · ' + score + ' points.',
      missed: (score, goal) => 'Career complete: ' + score + ' points. Goal not reached: ' + goal + '.',
      confirmRestart: 'Your current career will restart to begin today’s challenge. Continue?',
      win: (score, goal) => '🏅 Daily challenge complete · ' + score + ' points · ' + goal,
      loss: (score, goal) => 'Daily challenge · ' + score + ' points · goal: ' + goal,
      shareTitle: 'My Daily Challenge', copied: 'Challenge result copied!', share: 'Share result', points: 'points',
      objectives: {
        elite: ['From prospect to legend', 'Finish with an OVR of at least 85.'],
        goals: ['Goal machine', 'Reach at least +300 career goals.'],
        europe: ['King of Europe', 'Win at least 2 Champions Leagues.'],
        talents: ['Pure talent', 'Choose at least 3 special traits.'],
        balanced: ['All-rounder', 'Finish with all six attributes at 75 or higher.'],
        trophies: ['Full trophy cabinet', 'Win at least 8 trophies in total.']
      },
      albumSummary: 'CARD ALBUM', albumTitle: 'Your collection',
      albumHelp: 'See the rarities, nationalities, and leagues from your saved careers.',
      savedCareers: n => n + (n === 1 ? ' saved career' : ' saved careers'), rarity: 'Rarities',
      nations: 'Nationalities', leagues: 'Leagues', found: (n, total) => n + ' of ' + total + ' collected',
      tierCount: n => n + (n === 1 ? ' card' : ' cards'), empty: 'Save a completed career to start filling the album.',
      collection: 'Collection', collected: 'Collected', missing: 'To find'
    },
    es: {
      challengeSummary: 'RETO DEL DÍA', challengeLabel: 'RETO DE HOY', challengeTitle: 'Una nueva carrera, el mismo reto para todos',
      challengeHelp: 'Hoy todos tienen la misma secuencia de ruletas. Completa la carrera y alcanza el objetivo para sumar puntos.',
      objectiveLabel: 'OBJETIVO', codeLabel: 'CÓDIGO DEL RETO', start: 'Empezar reto', retry: 'Repetir reto', running: 'Reto en curso',
      noAttempts: 'Aún no has jugado el reto de hoy.', inProgress: 'Reto activo: completa todas las ruletas para ver tu puntuación.',
      history: r => 'Intentos de hoy: ' + r.attempts + ' · mejor puntuación: ' + r.bestScore + (r.success ? ' · objetivo alcanzado' : ''),
      completed: (score, goal) => '¡Reto completado! ' + goal + ' · ' + score + ' puntos.',
      missed: (score, goal) => 'Carrera completada: ' + score + ' puntos. Objetivo no alcanzado: ' + goal + '.',
      confirmRestart: 'La carrera actual se reiniciará para empezar el reto de hoy. ¿Continuar?',
      win: (score, goal) => '🏅 Reto diario completado · ' + score + ' puntos · ' + goal,
      loss: (score, goal) => 'Reto diario · ' + score + ' puntos · objetivo: ' + goal,
      shareTitle: 'Mi reto diario', copied: '¡Resultado del reto copiado!', share: 'Compartir resultado', points: 'puntos',
      objectives: {
        elite: ['De promesa a leyenda', 'Termina con una media de al menos 85.'],
        goals: ['Goleador', 'Alcanza al menos +300 goles en tu carrera.'],
        europe: ['Rey de Europa', 'Gana al menos 2 Champions League.'],
        talents: ['Puro talento', 'Elige al menos 3 talentos especiales.'],
        balanced: ['Todoterreno', 'Termina con los seis atributos en 75 o más.'],
        trophies: ['Vitrina llena', 'Gana al menos 8 trofeos en total.']
      },
      albumSummary: 'ÁLBUM DE CARTAS', albumTitle: 'Tu colección',
      albumHelp: 'Consulta las rarezas, nacionalidades y ligas de tus carreras guardadas.',
      savedCareers: n => n + (n === 1 ? ' carrera guardada' : ' carreras guardadas'), rarity: 'Rarezas',
      nations: 'Nacionalidades', leagues: 'Ligas', found: (n, total) => n + ' de ' + total + ' obtenidas',
      tierCount: n => n + (n === 1 ? ' carta' : ' cartas'), empty: 'Guarda una carrera completa para empezar a llenar el álbum.',
      collection: 'Colección', collected: 'Conseguida', missing: 'Por conseguir'
    },
    fr: {
      challengeSummary: 'DÉFI DU JOUR', challengeLabel: 'DÉFI DU JOUR', challengeTitle: 'Une nouvelle carrière, le même défi pour tous',
      challengeHelp: 'Tout le monde reçoit la même suite de roues aujourd’hui. Termine la carrière et atteins l’objectif pour marquer des points.',
      objectiveLabel: 'OBJECTIF', codeLabel: 'CODE DU DÉFI', start: 'Lancer le défi', retry: 'Rejouer le défi', running: 'Défi en cours',
      noAttempts: 'Vous n’avez pas encore joué au défi du jour.', inProgress: 'Défi actif : terminez toutes les roues pour voir votre score.',
      history: r => 'Tentatives aujourd’hui : ' + r.attempts + ' · meilleur score : ' + r.bestScore + (r.success ? ' · objectif atteint' : ''),
      completed: (score, goal) => 'Défi terminé ! ' + goal + ' · ' + score + ' points.',
      missed: (score, goal) => 'Carrière terminée : ' + score + ' points. Objectif non atteint : ' + goal + '.',
      confirmRestart: 'La carrière en cours va recommencer pour lancer le défi du jour. Continuer ?',
      win: (score, goal) => '🏅 Défi du jour terminé · ' + score + ' points · ' + goal,
      loss: (score, goal) => 'Défi du jour · ' + score + ' points · objectif : ' + goal,
      shareTitle: 'Mon défi du jour', copied: 'Résultat du défi copié !', share: 'Partager le résultat', points: 'points',
      objectives: {
        elite: ['De l’espoir à la légende', 'Terminez avec une note d’au moins 85.'],
        goals: ['Machine à buts', 'Atteignez au moins +300 buts en carrière.'],
        europe: ['Roi d’Europe', 'Remportez au moins 2 Ligues des champions.'],
        talents: ['Pur talent', 'Choisissez au moins 3 talents spéciaux.'],
        balanced: ['Joueur complet', 'Terminez avec les six attributs à 75 ou plus.'],
        trophies: ['Vitrine pleine', 'Remportez au moins 8 trophées au total.']
      },
      albumSummary: 'ALBUM DE CARTES', albumTitle: 'Votre collection',
      albumHelp: 'Retrouvez les raretés, nationalités et championnats de vos carrières enregistrées.',
      savedCareers: n => n + (n === 1 ? ' carrière enregistrée' : ' carrières enregistrées'), rarity: 'Raretés',
      nations: 'Nationalités', leagues: 'Championnats', found: (n, total) => n + ' sur ' + total + ' obtenues',
      tierCount: n => n + (n === 1 ? ' carte' : ' cartes'), empty: 'Enregistrez une carrière complète pour commencer l’album.',
      collection: 'Collection', collected: 'Obtenue', missing: 'À trouver'
    }
  };
  const tierData = [
    { id: 'bronze', name: 'Bronzo' }, { id: 'silver', name: 'Argento' }, { id: 'gold', name: 'Oro' },
    { id: 'hero', name: 'Eroe' }, { id: 'legend', name: 'Icona' }, { id: 'halloffut', name: 'Hall of FUT' }
  ];
  const dailyDetails = document.createElement('details');
  dailyDetails.id = 'dailyChallengeDisclosure';
  dailyDetails.className = 'sub-disclosure';
  const dailySummary = document.createElement('summary');
  dailySummary.className = 'sub-disclosure-summary';
  const dailySummaryTitle = document.createElement('span');
  dailySummaryTitle.id = 'dailyChallengeSummaryTitle';
  const dailySummaryMeta = document.createElement('span');
  dailySummaryMeta.id = 'dailyChallengeDate';
  dailySummaryMeta.className = 'daily-meta-date';
  dailySummary.append(dailySummaryTitle, dailySummaryMeta);
  const dailyPanel = document.createElement('section');
  dailyPanel.className = 'meta-panel daily-meta-card';
  dailyPanel.setAttribute('aria-labelledby', 'dailyChallengeHeading');
  const dailyTop = document.createElement('div');
  dailyTop.className = 'daily-meta-top';
  const dailyIcon = document.createElement('span');
  dailyIcon.className = 'daily-meta-icon';
  dailyIcon.setAttribute('aria-hidden', 'true');
  dailyIcon.textContent = '⚡';
  const dailyCopyBlock = document.createElement('div');
  dailyCopyBlock.className = 'daily-meta-copy';
  const dailyEyebrow = document.createElement('small');
  dailyEyebrow.id = 'dailyChallengeLabel';
  dailyEyebrow.className = 'daily-meta-eyebrow';
  const dailyHeading = document.createElement('strong');
  dailyHeading.id = 'dailyChallengeHeading';
  dailyHeading.className = 'daily-meta-title';
  const dailyDescription = document.createElement('p');
  dailyDescription.id = 'dailyChallengeDescription';
  dailyDescription.className = 'daily-meta-description';
  dailyCopyBlock.append(dailyEyebrow, dailyHeading, dailyDescription);
  dailyTop.append(dailyIcon, dailyCopyBlock);
  const dailyObjective = document.createElement('div');
  dailyObjective.className = 'daily-meta-note';
  const dailyObjectiveLabel = document.createElement('strong');
  dailyObjectiveLabel.id = 'dailyObjectiveLabel';
  const dailyObjectiveText = document.createElement('span');
  dailyObjectiveText.id = 'dailyObjectiveText';
  dailyObjective.append(dailyObjectiveLabel, document.createTextNode(' · '), dailyObjectiveText);
  const dailyCode = document.createElement('span');
  dailyCode.id = 'dailyChallengeCode';
  dailyCode.className = 'daily-meta-code';
  const dailyStatus = document.createElement('div');
  dailyStatus.id = 'dailyChallengeStatus';
  dailyStatus.className = 'daily-meta-status';
  dailyStatus.setAttribute('role', 'status');
  dailyStatus.setAttribute('aria-live', 'polite');
  const dailyActions = document.createElement('div');
  dailyActions.className = 'daily-meta-actions';
  const dailyStart = document.createElement('button');
  dailyStart.id = 'dailyChallengeStart';
  dailyStart.type = 'button';
  dailyStart.className = 'tool-button';
  const dailyShare = document.createElement('button');
  dailyShare.id = 'dailyChallengeShare';
  dailyShare.type = 'button';
  dailyShare.className = 'tool-button';
  dailyActions.append(dailyStart, dailyShare);
  dailyPanel.append(dailyTop, dailyObjective, dailyCode, dailyStatus, dailyActions);
  dailyDetails.append(dailySummary, dailyPanel);

  const albumDetails = document.createElement('details');
  albumDetails.id = 'cardAlbumDisclosure';
  albumDetails.className = 'sub-disclosure';
  const albumSummary = document.createElement('summary');
  albumSummary.className = 'sub-disclosure-summary';
  const albumSummaryTitle = document.createElement('span');
  albumSummaryTitle.id = 'cardAlbumSummaryTitle';
  const albumSummaryMeta = document.createElement('span');
  albumSummaryMeta.id = 'cardAlbumCount';
  albumSummaryMeta.className = 'album-summary-count';
  albumSummary.append(albumSummaryTitle, albumSummaryMeta);
  const albumPanel = document.createElement('section');
  albumPanel.className = 'meta-panel';
  albumPanel.setAttribute('aria-labelledby', 'cardAlbumHeading');
  const albumHeading = document.createElement('strong');
  albumHeading.id = 'cardAlbumHeading';
  albumHeading.className = 'daily-meta-title';
  const albumIntro = document.createElement('p');
  albumIntro.id = 'cardAlbumIntro';
  albumIntro.className = 'album-meta-intro';
  const albumSaved = document.createElement('div');
  albumSaved.id = 'cardAlbumSaved';
  albumSaved.className = 'daily-meta-status';
  const albumRarityLabel = document.createElement('div');
  albumRarityLabel.id = 'cardAlbumRarityLabel';
  albumRarityLabel.className = 'record-group';
  const albumTiers = document.createElement('div');
  albumTiers.id = 'cardAlbumTiers';
  albumTiers.className = 'album-tier-grid';
  const albumEmpty = document.createElement('div');
  albumEmpty.id = 'cardAlbumEmpty';
  albumEmpty.className = 'album-empty';
  const albumNationDetails = document.createElement('details');
  albumNationDetails.className = 'album-collection-group';
  const albumNationSummary = document.createElement('summary');
  const albumNationTitle = document.createElement('span');
  const albumNationCount = document.createElement('span');
  albumNationCount.id = 'cardAlbumNationCount';
  albumNationCount.className = 'album-collection-count';
  albumNationSummary.append(albumNationTitle, albumNationCount);
  const albumNations = document.createElement('div');
  albumNations.id = 'cardAlbumNations';
  albumNations.className = 'album-pill-list';
  albumNationDetails.append(albumNationSummary, albumNations);
  const albumLeagueDetails = document.createElement('details');
  albumLeagueDetails.className = 'album-collection-group';
  const albumLeagueSummary = document.createElement('summary');
  const albumLeagueTitle = document.createElement('span');
  const albumLeagueCount = document.createElement('span');
  albumLeagueCount.id = 'cardAlbumLeagueCount';
  albumLeagueCount.className = 'album-collection-count';
  albumLeagueSummary.append(albumLeagueTitle, albumLeagueCount);
  const albumLeagues = document.createElement('div');
  albumLeagues.id = 'cardAlbumLeagues';
  albumLeagues.className = 'album-pill-list';
  albumLeagueDetails.append(albumLeagueSummary, albumLeagues);
  albumPanel.append(albumHeading, albumIntro, albumSaved, albumRarityLabel, albumTiers, albumEmpty, albumNationDetails, albumLeagueDetails);
  albumDetails.append(albumSummary, albumPanel);

  const tools = document.getElementById('extraTools');
  const legend = document.getElementById('ovrLegend');
  const achievementDetails = document.getElementById('achievementDisclosure');
  const archiveDetails = document.getElementById('archiveDisclosure');
  const timeline = document.getElementById('careerTimelinePanel');
  const languageSelect = document.getElementById('languageSelect');
  if (tools && legend && achievementDetails && archiveDetails && dailyDetails && albumDetails) {
    const tabList = document.createElement('div');
    tabList.className = 'extra-tools-tabs';
    tabList.setAttribute('role', 'tablist');

    const sections = [
      { id: 'progress', items: [achievementDetails, timeline] },
      { id: 'challenges', items: [dailyDetails, archiveDetails] },
      { id: 'cards', items: [albumDetails, legend] }
    ];
    const tabCopy = {
      it: { labels: ['Progressi', 'Sfide', 'Carte'], listLabel: 'Sezioni progressi e strumenti' },
      en: { labels: ['Progress', 'Challenges', 'Cards'], listLabel: 'Progress and tools sections' },
      es: { labels: ['Progreso', 'Desafíos', 'Cartas'], listLabel: 'Secciones de progreso y herramientas' },
      fr: { labels: ['Progression', 'Défis', 'Cartes'], listLabel: 'Sections de progression et outils' }
    };
    const tabs = [];
    sections.forEach((section, index) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'extra-tools-tab';
      tab.id = 'extraToolsTab-' + section.id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', 'extraToolsPanel-' + section.id);
      tab.setAttribute('aria-selected', String(index === 0));
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.dataset.toolsTab = section.id;
      tabs.push(tab);
      tabList.append(tab);

      const panel = document.createElement('section');
      panel.className = 'extra-tools-group';
      panel.id = 'extraToolsPanel-' + section.id;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      panel.hidden = index !== 0;
      section.items.filter(Boolean).forEach(item => panel.append(item));
      tools.append(panel);
    });
    const summary = tools.querySelector(':scope > summary');
    if (summary) tools.insertBefore(tabList, summary.nextSibling);

    const selectSection = (id, moveFocus = false) => {
      tabs.forEach(tab => {
        const active = tab.dataset.toolsTab === id;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
        if (active && moveFocus) tab.focus();
      });
    };
    tabList.addEventListener('click', event => {
      const tab = event.target.closest('[role="tab"]');
      if (tab && tabList.contains(tab)) selectSection(tab.dataset.toolsTab);
    });
    tabList.addEventListener('keydown', event => {
      const current = tabs.indexOf(event.target.closest('[role="tab"]'));
      if (current < 0) return;
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectSection(tabs[next].dataset.toolsTab, true);
    });
    const updateTabLabels = () => {
      const locale = tabCopy[languageSelect?.value] || tabCopy.it;
      tabList.setAttribute('aria-label', locale.listLabel);
      tabs.forEach((tab, index) => { tab.textContent = locale.labels[index]; });
    };
    languageSelect?.addEventListener('change', updateTabLabels);
    updateTabLabels();
  }
  let dailyChallengeActive = false;
  let dailyRandomState = 0;
  let dailyLastRun = null;
  let dailyAccountRestored = false;
  let dailyRunDate = '';
  let dailyNormalMode = false;
  function getCopy() { return copy[language] || copy.it; }
  function dateKey() { return new Date().toISOString().slice(0, 10); }
  function hash32(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
    return hash >>> 0;
  }
  function getChallenge(date) {
    const objectiveIndex = hash32('fcw-objective-' + date) % dailyChallenges.length;
    const seed = hash32('fcw-sequence-' + date) || 0x6d2b79f5;
    const code = 'FCW-' + date.replaceAll('-', '') + '-' + seed.toString(36).toUpperCase().slice(0, 4);
    return { date, seed, code, objective: dailyChallenges[objectiveIndex] };
  }
  function nextDailyRandom() {
    dailyRandomState ^= dailyRandomState << 13;
    dailyRandomState ^= dailyRandomState >>> 17;
    dailyRandomState ^= dailyRandomState << 5;
    dailyRandomState >>>= 0;
    return dailyRandomState / 4294967296;
  }
  window.fcwWheelRandom = function () { return dailyChallengeActive ? nextDailyRandom() : Math.random(); };
  if (typeof window.rand === 'function') {
    const regularRand = window.rand;
    window.rand = function (max) { return dailyChallengeActive ? Math.floor(nextDailyRandom() * max) : regularRand(max); };
  }
  function readDailyRecord(date) {
    try {
      const saved = JSON.parse(localStorage.getItem(challengeStorageKey) || 'null');
      return saved && saved.date === date && Number.isFinite(saved.attempts) ? saved : null;
    } catch { return null; }
  }
  function writeDailyRecord(record) { try { localStorage.setItem(challengeStorageKey, JSON.stringify(record)); } catch {} }
  function formatDate(date) {
    try { return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z')); }
    catch { return date; }
  }
  function renderDailyChallenge() {
    if (!dailyDetails.isConnected) return;
    const text = getCopy(), challenge = getChallenge(dailyChallengeActive && dailyRunDate ? dailyRunDate : dateKey()), objective = text.objectives[challenge.objective.id], record = readDailyRecord(challenge.date);
    dailySummaryTitle.textContent = text.challengeSummary;
    dailySummaryMeta.textContent = formatDate(challenge.date);
    dailyEyebrow.textContent = text.challengeLabel;
    dailyHeading.textContent = text.challengeTitle;
    dailyDescription.textContent = text.challengeHelp;
    dailyObjectiveLabel.textContent = text.objectiveLabel;
    dailyObjectiveText.textContent = objective[0] + ' — ' + objective[1];
    dailyCode.textContent = text.codeLabel + ' · ' + challenge.code;
    dailyStart.textContent = dailyChallengeActive ? text.running : (record ? text.retry : text.start);
    dailyStart.disabled = dailyChallengeActive || spinning || wheelPreviewActive || window.fcwAccountHydrating === true || Boolean(window.fcwAccountSync?.isBusy?.()) || Boolean(window.fcwLocalDuelSession?.state?.()?.active);
    dailyShare.textContent = text.share;
    dailyShare.hidden = !record;
    dailyShare.disabled = !record;
    dailyStatus.classList.toggle('is-success', Boolean(record?.success));
    dailyStatus.classList.toggle('is-failure', Boolean(record && !record.success));
    dailyStatus.textContent = dailyChallengeActive ? text.inProgress : record ? text.history(record) : text.noAttempts;
  }
  function numeric(value) { const match = String(value ?? '').match(/\d+/); return match ? Number(match[0]) : 0; }
  function answerValue(question) {
    const index = steps.findIndex(step => step.q === question);
    return index >= 0 ? (answers[index]?.value ?? '') : '';
  }
  function evaluateCareer() {
    const overall = Number(document.getElementById('cardRating')?.textContent) || 0;
    const goals = numeric(answerValue('Quanti gol hai segnato?'));
    const champions = numeric(answerValue('Quante Champions League hai vinto?'));
    const talentIndex = steps.findIndex(step => step.kind === 'talents');
    const talents = talentIndex >= 0 ? Number(answers[talentIndex]?.count) || numeric(answers[talentIndex]?.value) : 0;
    const trophies = answers.reduce((sum, answer, index) => sum + (steps[index]?.kind === 'trophy' ? numeric(answer?.value) : 0), 0);
    const stats = [...document.querySelectorAll('#cardStats .card-stat strong')].map(node => Number(node.textContent) || 0);
    return { overall, goals, champions, talents, trophies, stats };
  }
  function challengeResultText(result) {
    const text = getCopy(), goal = text.objectives[result.objectiveId][0];
    return result.success ? text.win(result.score, goal) : text.loss(result.score, goal);
  }
  function showDailyResult(result) {
    const summary = document.querySelector('#careerSummary .career-record');
    if (!summary) return;
    let banner = document.getElementById('dailyChallengeResult');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'dailyChallengeResult';
      banner.className = 'daily-result-banner';
      const resultText = document.createElement('span');
      resultText.id = 'dailyChallengeResultText';
      const shareButton = document.createElement('button');
      shareButton.id = 'dailyChallengeResultShare';
      shareButton.type = 'button';
      shareButton.addEventListener('click', shareDailyResult);
      banner.append(resultText, shareButton);
      const note = summary.querySelector('.record-note');
      if (note) note.after(banner); else summary.append(banner);
    }
    banner.classList.toggle('is-failure', !result.success);
    document.getElementById('dailyChallengeResultText').textContent = challengeResultText(result);
    document.getElementById('dailyChallengeResultShare').textContent = getCopy().share;
  }
  function finishDailyChallenge() {
    if (!dailyChallengeActive || window.fcwAccountHydrating === true || restoringArchive || (typeof demoPreviewActive !== 'undefined' && demoPreviewActive)) return;
    const challenge = getChallenge(dailyRunDate || dateKey()), data = evaluateCareer(), success = challenge.objective.test(data);
    const score = data.overall * 10 + Math.min(data.trophies, 20) * 25 + (success ? 200 : 0);
    const previous = readDailyRecord(challenge.date);
    const result = {
      date: challenge.date, attempts: (previous?.attempts || 0) + 1,
      bestScore: Math.max(previous?.bestScore || 0, score), score, success: Boolean(previous?.success || success),
      lastSuccess: success, overall: data.overall, name: document.getElementById('cardName')?.value.trim() || document.getElementById('careerName')?.value.trim() || 'Calciatore',
      objectiveId: challenge.objective.id, code: challenge.code
    };
    writeDailyRecord(result);
    // History remembers whether any attempt succeeded; the result panel describes
    // this attempt, including after a language change or session restoration.
    dailyLastRun = { ...result, success };
    dailyChallengeActive = false;
    dailyNormalMode = false;
    showDailyResult({ ...result, success });
    renderDailyChallenge();
  }
  async function shareDailyResult() {
    const text = getCopy(), challenge = getChallenge(dateKey()), record = dailyLastRun || readDailyRecord(challenge.date);
    if (!record) return;
    const objective = text.objectives[record.objectiveId] || text.objectives[challenge.objective.id];
    const message = text.shareTitle + ' · ' + formatDate(record.date) + '\n' + objective[0] + '\n' + record.name + ' · OVR ' + record.overall + ' · ' + record.score + ' ' + text.points + '\n' + record.code;
    try {
      if (navigator.share) await navigator.share({ title: text.shareTitle, text: message });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(message); if (typeof toast === 'function') toast(); }
      else {
        const area = document.createElement('textarea'); area.value = message; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.append(area); area.select(); document.execCommand('copy'); area.remove();
        if (typeof toast === 'function') toast();
      }
    } catch {}
  }
  function startDailyChallenge() {
    if(window.fcwAccountSync?.isBusy?.() || window.fcwAccountHydrating === true || spinning || wheelPreviewActive || window.fcwLocalDuelSession?.state?.()?.active)return;
    if (dailyChallengeActive) return;
    const text = getCopy(), hasCareerProgress = answers.some(Boolean) && !(typeof demoPreviewActive !== 'undefined' && demoPreviewActive);
    if (hasCareerProgress && !window.confirm(text.confirmRestart)) return;
    const resetButton = document.getElementById('reset');
    if (resetButton) resetButton.click();
    const challenge = getChallenge(dateKey());
    dailyRunDate = challenge.date;
    dailyRandomState = challenge.seed;
    dailyLastRun = null;
    dailyChallengeActive = true;
    dailyNormalMode = true;
    careerMode = 'normal'; renderCareerModeUI(); update();
    renderDailyChallenge();
    const nameInput = document.getElementById('careerName');
    if (nameInput && !nameInput.value.trim()) nameInput.focus();
    document.querySelector('.wheel-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  dailyStart.addEventListener('click', startDailyChallenge);
  dailyShare.addEventListener('click', shareDailyResult);
  function clearDailyChallenge() {
    dailyChallengeActive = false;
    dailyRandomState = 0;
    dailyLastRun = null;
    dailyRunDate = ''; dailyNormalMode = false;
    document.getElementById('dailyChallengeResult')?.remove();
    renderDailyChallenge();
  }
  document.getElementById('reset')?.addEventListener('click', clearDailyChallenge);
  document.getElementById('testCard')?.addEventListener('click', clearDailyChallenge);
  if (typeof window.finishCareer === 'function') {
    const finishCareerBeforeDaily = window.finishCareer;
    window.finishCareer = function (...args) {
      const scoreDaily = dailyChallengeActive;
      const result = finishCareerBeforeDaily.apply(this, args);
      if (scoreDaily) finishDailyChallenge();
      return result;
    };
  }

  function tierForOverall(overall) {
    if (overall >= 95) return 'halloffut';
    if (overall >= 90) return 'legend';
    if (overall >= 85) return 'hero';
    if (overall >= 75) return 'gold';
    if (overall >= 65) return 'silver';
    return 'bronze';
  }
  function collectedValues(entries, kind) {
    return new Set(entries.map(entry => {
      if (kind === 'league') return entry.league || entry.answers?.find(answer => answer?.kind === 'league')?.value || '';
      return entry.answers?.find(answer => answer?.kind === 'country')?.value || entry.nationality || '';
    }).filter(Boolean));
  }
  function addPills(container, values, found, text) {
    container.replaceChildren();
    values.forEach(value => {
      const pill = document.createElement('span');
      const collected = found.has(value);
      pill.className = 'album-pill' + (collected ? ' is-collected' : '');
      pill.textContent = typeof tr === 'function' ? tr(value) : value;
      pill.title = collected ? text.collected : text.missing;
      pill.setAttribute('aria-label', pill.textContent + ' · ' + pill.title);
      container.append(pill);
    });
  }
  function renderCardAlbum() {
    if (!albumDetails.isConnected) return;
    const text = getCopy(), entries = typeof savedCareers === 'function' ? savedCareers() : [];
    const nationValues = [...new Set(Object.values(countryGroups || {}).flat())].sort((a, b) => a.localeCompare(b, language));
    const leagueStep = steps.find(step => step.kind === 'league');
    const leagueValues = [...new Set(leagueStep?.items || [])].sort((a, b) => a.localeCompare(b, language));
    const nations = collectedValues(entries, 'country'), leagues = collectedValues(entries, 'league');
    albumSummaryTitle.textContent = text.albumSummary;
    albumSummaryMeta.textContent = String(entries.length);
    albumHeading.textContent = text.albumTitle;
    albumIntro.textContent = text.albumHelp;
    albumSaved.textContent = text.savedCareers(entries.length);
    albumRarityLabel.textContent = text.rarity;
    albumTiers.replaceChildren();
    tierData.forEach(tier => {
      const count = entries.filter(entry => tierForOverall(Number(entry.overall) || 0) === tier.id).length;
      const item = document.createElement('div');
      item.className = 'album-tier';
      item.dataset.tier = tier.id;
      const name = document.createElement('strong');
      name.textContent = typeof tr === 'function' ? tr(tier.name) : tier.name;
      const total = document.createElement('span');
      total.textContent = text.tierCount(count);
      item.append(name, total);
      albumTiers.append(item);
    });
    albumEmpty.hidden = entries.length > 0;
    albumEmpty.textContent = text.empty;
    albumNationTitle.textContent = text.nations;
    albumNationCount.textContent = text.found(nations.size, nationValues.length);
    albumLeagueTitle.textContent = text.leagues;
    albumLeagueCount.textContent = text.found(leagues.size, leagueValues.length);
    addPills(albumNations, nationValues, nations, text);
    addPills(albumLeagues, leagueValues, leagues, text);
  }
  if (typeof window.renderArchive === 'function') {
    const renderArchiveBeforeAlbum = window.renderArchive;
    window.renderArchive = function (...args) {
      const result = renderArchiveBeforeAlbum.apply(this, args);
      renderCardAlbum();
      return result;
    };
  }
  document.getElementById('languageSelect')?.addEventListener('change', () => {
    renderDailyChallenge();
    renderCardAlbum();
    const result = document.getElementById('dailyChallengeResult');
    if (result && dailyLastRun) showDailyResult(dailyLastRun);
  });
  window.fcwDaily = {
    normalMode() { return dailyChallengeActive && dailyNormalMode; },
    accountState() {
      return { version: 1, date: dateKey(), runDate: dailyRunDate, normalMode: dailyNormalMode, active: dailyChallengeActive, randomState: dailyRandomState >>> 0, lastRun: dailyLastRun ? { ...dailyLastRun } : null };
    },
    restoreAccountState(data) {
      const runDate = typeof data?.runDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.runDate) ? data.runDate : data?.date;
      dailyChallengeActive = Boolean(data?.version === 1 && typeof runDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(runDate) && data.active === true && Number.isSafeInteger(data.randomState) && data.randomState > 0 && data.randomState <= 0xffffffff);
      dailyRunDate = dailyChallengeActive ? runDate : '';
      // Old active saves retain the mode they already used. New daily careers
      // use Normal consistently, with the mode locked from setup onwards.
      dailyNormalMode = dailyChallengeActive && data.normalMode === true;
      if (dailyNormalMode) { careerMode = 'normal'; renderCareerModeUI(); }
      dailyRandomState = dailyChallengeActive ? data.randomState >>> 0 : 0;
      dailyLastRun = data?.version === 1 && typeof runDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(runDate) && data.lastRun && typeof data.lastRun === 'object' && data.lastRun.date === runDate && Number.isFinite(data.lastRun.score) && Object.hasOwn(getCopy().objectives, data.lastRun.objectiveId) ? { ...data.lastRun, success: Boolean(data.lastRun.lastSuccess ?? data.lastRun.success) } : null;
      if (!dailyChallengeActive && dailyLastRun) dailyRunDate = dailyLastRun.date;
      dailyAccountRestored = true;
      document.getElementById('dailyChallengeResult')?.remove();
      renderDailyChallenge();
      if (dailyLastRun && !document.getElementById('careerSummary')?.hidden) showDailyResult(dailyLastRun);
    }
  };
  window.addEventListener('fcw:account-restore', () => {
    if (!dailyAccountRestored) {
      dailyChallengeActive = false; dailyRandomState = 0; dailyLastRun = null;
      dailyRunDate = ''; dailyNormalMode = false;
      document.getElementById('dailyChallengeResult')?.remove();
    }
    dailyAccountRestored = false;
    renderDailyChallenge(); renderCardAlbum();
  });
  window.addEventListener('fcw:state', event => {
    if (event.detail?.restored || event.detail?.demo) clearDailyChallenge();
    else renderDailyChallenge();
  });
  renderDailyChallenge();
  renderCardAlbum();
})();
