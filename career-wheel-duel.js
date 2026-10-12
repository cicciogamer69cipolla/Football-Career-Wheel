/* Two real careers, played in turn on the same computer. The session owns gameplay. */
(() => {
  'use strict';
  const copy = {
    it: {
      nav: 'Duello locale', navNote: 'Due giocatori. Un PC. La stessa ruota.', eyebrow: 'SFIDA SULLO STESSO PC', title: 'Una ruota, due leggende.', intro: 'Create un calciatore a testa, giocate a turno e confrontate le vostre carriere.',
      player: n => `Giocatore ${n}`, name: 'Nome del calciatore', number: 'Numero maglia', placeholder: n => `Nome del giocatore ${n}`, mode: 'Modalità per entrambi', rapid: 'Rapida', normal: 'Normale', realistic: 'Realistica', rapidNote: 'Tutte le ruote, con giri più veloci.', normalNote: 'L’esperienza completa, con le stesse probabilità per entrambi.', realisticNote: 'Valori alti e grandi trofei sono più rari per entrambi.', criterion: 'Come si vince', combined: 'Carriera + carta', career: 'Più Career Points', card: 'Carta più forte',
      combinedNote: '70% carriera e 30% confronto delle carte. La carriera vale da 0 a 100: 400 Career Points raggiungono il massimo.', careerNote: 'Vince chi ha più Career Points: gol e assist pesati per ruolo, stagioni e trofei.', cardNote: 'Confronto diretto di OVR e sei attributi. L’OVR vale doppio; le parità condividono i punti.',
      saveNote: 'La tua carriera Solo resta al suo posto: la ritrovi quando esci dal duello.', start: 'Inizia il duello', cancel: 'Torna a Solo', cancelGame: 'Esci dal duello', turn: (n, name) => `Turno ${n} di 2 · ${name}`, playing: 'Gira tutte le ruote per completare la tua carriera.', waiting: 'CAMBIO GIOCATORE', pass: name => `Passa il PC a ${name}.`, firstDone: name => `${name} ha completato la sua carriera. Ora tocca al secondo giocatore.`, next: name => `Inizia il turno di ${name}`, roundComplete: 'DUELLO COMPLETATO', winner: name => `Vince ${name}!`, tie: 'Finisce in parità.', finalNote: 'Due carriere giocate fino all’ultima ruota.', rematch: 'Rivincita', cp: 'Career Points', cardScore: 'Duello carta', strength: 'Forza della carta', total: 'Punteggio finale', points: 'pt', overall: 'OVR', shirt: n => `Maglia n° ${n}`, statNames: ['Velocità', 'Tiro', 'Passaggi', 'Dribbling', 'Difesa', 'Fisico'], careerDetails: 'Gol, assist e palmarès a confronto', metric: 'Carriera', goals: 'Gol', assists: 'Assist', seasons: 'Stagioni', league: 'Campionati', champions: 'Champions League', world: 'Mondiali', continental: 'Coppe continentali', ballon: 'Palloni d’Oro', comparison: 'CONFRONTO DELLE CARTE', winsCard: name => `Carta più forte: ${name}`, tiedCards: 'Le carte sono alla pari.', winsCareer: name => `Miglior carriera: ${name}`, tiedCareer: 'Le carriere hanno gli stessi Career Points.', busy: 'Attendi la fine del giro o del salvataggio in corso.', invalid: 'Inserisci un nome e un numero da 1 a 99 per entrambi i giocatori.', unavailable: 'Il duello non è ancora pronto. Riprova tra un momento.', incomplete: 'Il risultato conta solo dopo una carriera completa giocata con le ruote.', generic: 'Non è stato possibile proseguire. I progressi Solo restano salvati.', loading: 'Preparazione del turno…', sameNames: 'Usa due nomi diversi per riconoscere i giocatori.', accountChanged: 'Il duello è stato chiuso perché è cambiato l’account.'
    },
    en: {
      nav: 'Local duel', navNote: 'Two players. One PC. The same wheel.', eyebrow: 'SAME COMPUTER CHALLENGE', title: 'One wheel, two legends.', intro: 'Create a player each, take turns and compare your careers.',
      player: n => `Player ${n}`, name: 'Player name', number: 'Shirt number', placeholder: n => `Player ${n} name`, mode: 'Mode for both players', rapid: 'Quick', normal: 'Normal', realistic: 'Realistic', rapidNote: 'All wheels, with faster spins.', normalNote: 'The full experience, with the same odds for both players.', realisticNote: 'High attributes and major trophies are rarer for both players.', criterion: 'How to win', combined: 'Career + card', career: 'Most Career Points', card: 'Strongest card',
      combinedNote: '70% career and 30% card comparison. Career is rated from 0 to 100: 400 Career Points reach the maximum.', careerNote: 'Most Career Points wins: goals and assists adjusted by position, seasons and trophies.', cardNote: 'Head-to-head comparison of OVR and six attributes. OVR counts double; tied attributes share points.',
      saveNote: 'Your Solo career stays saved: return to it when you leave the duel.', start: 'Start duel', cancel: 'Back to Solo', cancelGame: 'Leave duel', turn: (n, name) => `Turn ${n} of 2 · ${name}`, playing: 'Spin every wheel to complete your career.', waiting: 'NEXT PLAYER', pass: name => `Pass the PC to ${name}.`, firstDone: name => `${name} has completed their career. It is the second player’s turn.`, next: name => `Start ${name}’s turn`, roundComplete: 'DUEL COMPLETE', winner: name => `${name} wins!`, tie: 'It is a draw.', finalNote: 'Two careers played through the final wheel.', rematch: 'Rematch', cp: 'Career Points', cardScore: 'Card duel', strength: 'Card strength', total: 'Final score', points: 'pts', overall: 'OVR', shirt: n => `Shirt no. ${n}`, statNames: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical'], careerDetails: 'Compare goals, assists and honours', metric: 'Career', goals: 'Goals', assists: 'Assists', seasons: 'Seasons', league: 'League titles', champions: 'Champions League', world: 'World Cups', continental: 'Continental cups', ballon: 'Ballons d’Or', comparison: 'CARD COMPARISON', winsCard: name => `Strongest card: ${name}`, tiedCards: 'The cards are tied.', winsCareer: name => `Best career: ${name}`, tiedCareer: 'Both careers have equal Career Points.', busy: 'Wait for the current spin or save to finish.', invalid: 'Enter a name and a shirt number from 1 to 99 for both players.', unavailable: 'The duel is not ready yet. Try again in a moment.', incomplete: 'Only a complete career played with the wheels can count.', generic: 'Could not continue. Your Solo progress remains saved.', loading: 'Preparing the turn…', sameNames: 'Use different names to tell the players apart.', accountChanged: 'The duel was closed because the account changed.'
    },
    es: {
      nav: 'Duelo local', navNote: 'Dos jugadores. Un PC. La misma ruleta.', eyebrow: 'RETO EN EL MISMO PC', title: 'Una ruleta, dos leyendas.', intro: 'Cread un jugador cada uno, jugad por turnos y comparad vuestras carreras.',
      player: n => `Jugador ${n}`, name: 'Nombre del jugador', number: 'Dorsal', placeholder: n => `Nombre del jugador ${n}`, mode: 'Modo para ambos', rapid: 'Rápida', normal: 'Normal', realistic: 'Realista', rapidNote: 'Todas las ruletas, con giros más rápidos.', normalNote: 'La experiencia completa, con las mismas probabilidades para ambos.', realisticNote: 'Los atributos altos y grandes trofeos son más raros para ambos.', criterion: 'Cómo ganar', combined: 'Carrera + carta', career: 'Más Career Points', card: 'Carta más fuerte',
      combinedNote: '70% carrera y 30% comparación de cartas. La carrera vale de 0 a 100: 400 Career Points alcanzan el máximo.', careerNote: 'Gana quien tenga más Career Points: goles y asistencias según posición, temporadas y trofeos.', cardNote: 'Comparación directa de media y seis atributos. La media pesa doble; los empates comparten puntos.',
      saveNote: 'Tu carrera Solo sigue guardada: la recuperas al salir del duelo.', start: 'Iniciar duelo', cancel: 'Volver a Solo', cancelGame: 'Salir del duelo', turn: (n, name) => `Turno ${n} de 2 · ${name}`, playing: 'Gira todas las ruletas para completar tu carrera.', waiting: 'CAMBIO DE JUGADOR', pass: name => `Pasa el PC a ${name}.`, firstDone: name => `${name} ha terminado su carrera. Ahora le toca al segundo jugador.`, next: name => `Iniciar el turno de ${name}`, roundComplete: 'DUELO TERMINADO', winner: name => `¡Gana ${name}!`, tie: 'Termina en empate.', finalNote: 'Dos carreras jugadas hasta la última ruleta.', rematch: 'Revancha', cp: 'Career Points', cardScore: 'Duelo de cartas', strength: 'Fuerza de la carta', total: 'Puntuación final', points: 'ptos.', overall: 'MED', shirt: n => `Dorsal n.º ${n}`, statNames: ['Ritmo', 'Tiro', 'Pases', 'Regate', 'Defensa', 'Físico'], careerDetails: 'Comparar goles, asistencias y palmarés', metric: 'Carrera', goals: 'Goles', assists: 'Asistencias', seasons: 'Temporadas', league: 'Ligas', champions: 'Champions League', world: 'Mundiales', continental: 'Copas continentales', ballon: 'Balones de Oro', comparison: 'COMPARACIÓN DE CARTAS', winsCard: name => `Carta más fuerte: ${name}`, tiedCards: 'Las cartas están empatadas.', winsCareer: name => `Mejor carrera: ${name}`, tiedCareer: 'Las carreras tienen los mismos Career Points.', busy: 'Espera a que termine el giro o guardado actual.', invalid: 'Introduce un nombre y un dorsal del 1 al 99 para ambos jugadores.', unavailable: 'El duelo aún no está listo. Inténtalo de nuevo en un momento.', incomplete: 'Solo cuenta una carrera completa jugada con las ruletas.', generic: 'No se ha podido continuar. Los progresos Solo siguen guardados.', loading: 'Preparando el turno…', sameNames: 'Usa nombres distintos para reconocer a los jugadores.', accountChanged: 'El duelo se cerró porque cambió la cuenta.'
    },
    fr: {
      nav: 'Duel local', navNote: 'Deux joueurs. Un PC. La même roue.', eyebrow: 'DÉFI SUR LE MÊME PC', title: 'Une roue, deux légendes.', intro: 'Créez un joueur chacun, jouez à tour de rôle et comparez vos carrières.',
      player: n => `Joueur ${n}`, name: 'Nom du joueur', number: 'Numéro de maillot', placeholder: n => `Nom du joueur ${n}`, mode: 'Mode pour les deux joueurs', rapid: 'Rapide', normal: 'Normal', realistic: 'Réaliste', rapidNote: 'Toutes les roues, avec des tours plus rapides.', normalNote: 'L’expérience complète, avec les mêmes probabilités pour les deux.', realisticNote: 'Les attributs élevés et grands trophées sont plus rares pour les deux.', criterion: 'Comment gagner', combined: 'Carrière + carte', career: 'Plus de Career Points', card: 'Carte la plus forte',
      combinedNote: '70 % carrière et 30 % comparaison des cartes. La carrière vaut de 0 à 100 : 400 Career Points atteignent le maximum.', careerNote: 'Le plus de Career Points gagne : buts et passes pondérés par poste, saisons et trophées.', cardNote: 'Comparaison directe de la note et des six attributs. La note compte double ; les égalités partagent les points.',
      saveNote: 'Ta carrière Solo reste sauvegardée : retrouve-la en quittant le duel.', start: 'Commencer le duel', cancel: 'Retour à Solo', cancelGame: 'Quitter le duel', turn: (n, name) => `Tour ${n} sur 2 · ${name}`, playing: 'Tourne toutes les roues pour terminer ta carrière.', waiting: 'JOUEUR SUIVANT', pass: name => `Passe le PC à ${name}.`, firstDone: name => `${name} a terminé sa carrière. C’est au tour du deuxième joueur.`, next: name => `Commencer le tour de ${name}`, roundComplete: 'DUEL TERMINÉ', winner: name => `${name} gagne !`, tie: 'Match nul.', finalNote: 'Deux carrières jouées jusqu’à la dernière roue.', rematch: 'Revanche', cp: 'Career Points', cardScore: 'Duel de cartes', strength: 'Force de la carte', total: 'Score final', points: 'pts', overall: 'GEN', shirt: n => `Maillot n° ${n}`, statNames: ['Vitesse', 'Tir', 'Passes', 'Dribbles', 'Défense', 'Physique'], careerDetails: 'Comparer buts, passes et palmarès', metric: 'Carrière', goals: 'Buts', assists: 'Passes décisives', seasons: 'Saisons', league: 'Championnats', champions: 'Ligue des champions', world: 'Coupes du monde', continental: 'Coupes continentales', ballon: 'Ballons d’Or', comparison: 'COMPARAISON DES CARTES', winsCard: name => `Meilleure carte : ${name}`, tiedCards: 'Les cartes sont à égalité.', winsCareer: name => `Meilleure carrière : ${name}`, tiedCareer: 'Les carrières ont les mêmes Career Points.', busy: 'Attends la fin du tour ou de la sauvegarde en cours.', invalid: 'Saisis un nom et un numéro de 1 à 99 pour chaque joueur.', unavailable: 'Le duel n’est pas encore prêt. Réessaie dans un instant.', incomplete: 'Seule une carrière complète jouée avec les roues peut compter.', generic: 'Impossible de continuer. Les progrès Solo restent sauvegardés.', loading: 'Préparation du tour…', sameNames: 'Utilise des noms différents pour reconnaître les joueurs.', accountChanged: 'Le duel a été fermé car le compte a changé.'
    }
  };
  Object.assign(copy.it, { storage: 'Non riesco a salvare il duello su questo dispositivo. Riprova.', recovery: 'Il duello salvato non può essere ripristinato.' });
  Object.assign(copy.en, { storage: 'Could not save the duel on this device. Please try again.', recovery: 'The saved duel could not be restored.' });
  Object.assign(copy.es, { storage: 'No se ha podido guardar el duelo en este dispositivo. Inténtalo de nuevo.', recovery: 'No se ha podido recuperar el duelo guardado.' });
  Object.assign(copy.fr, { storage: 'Impossible de sauvegarder le duel sur cet appareil. Réessaie.', recovery: 'Impossible de restaurer le duel sauvegardé.' });
  Object.assign(copy.it, { comparing: 'Due carriere. Un verdetto.', skip: 'Mostra subito il risultato', cardsStage: 'Le vostre carte', statsStage: 'OVR e attributi a confronto', careerStage: 'Gol, assist e trofei', scoreStage: 'Calcolo del punteggio finale', resultStage: 'Il verdetto', flag: 'Bandiera', logo: 'Logo', cardAlt: name => `Carta di ${name}`, stages: ['Carte', 'Carriera', 'Verdetto'] });
  Object.assign(copy.en, { comparing: 'Two careers. One verdict.', skip: 'Show result now', cardsStage: 'Your player cards', statsStage: 'Comparing OVR and attributes', careerStage: 'Goals, assists and trophies', scoreStage: 'Calculating the final score', resultStage: 'The verdict', flag: 'Flag', logo: 'Logo', cardAlt: name => `${name}’s card`, stages: ['Cards', 'Career', 'Verdict'] });
  Object.assign(copy.es, { comparing: 'Dos carreras. Un veredicto.', skip: 'Mostrar el resultado ahora', cardsStage: 'Vuestras cartas', statsStage: 'Comparando media y atributos', careerStage: 'Goles, asistencias y trofeos', scoreStage: 'Calculando la puntuación final', resultStage: 'El veredicto', flag: 'Bandera', logo: 'Logo', cardAlt: name => `Carta de ${name}`, stages: ['Cartas', 'Carrera', 'Veredicto'] });
  Object.assign(copy.fr, { comparing: 'Deux carrières. Un verdict.', skip: 'Afficher le résultat', cardsStage: 'Vos cartes de joueurs', statsStage: 'Comparaison de la note et des attributs', careerStage: 'Buts, passes et trophées', scoreStage: 'Calcul du score final', resultStage: 'Le verdict', flag: 'Drapeau', logo: 'Logo', cardAlt: name => `Carte de ${name}`, stages: ['Cartes', 'Carrière', 'Verdict'] });
  // These are the same tier artworks as the Solo card. Values come only from
  // the two completed results; rendering never hydrates or rewrites a career.
  const cardArt = {
    bronze: 'https://preview.redd.it/fc27-card-designs-v0-x4z34ix107fh1.png?width=320&crop=smart&auto=webp&s=bc3faefbde9a0fe812bf5d90b320f6aca03cc478',
    silver: 'https://preview.redd.it/fc27-card-designs-v0-ccukmfy007fh1.png?width=320&crop=smart&auto=webp&s=f56ede0a580df4b16d8be3850d0390ce5e02e0eb',
    gold: 'https://preview.redd.it/fc27-card-designs-v0-6q2b3szzz6fh1.png?width=320&crop=smart&auto=webp&s=d8712a378c550bd613929060f14d6931575bc381',
    hero: 'https://preview.redd.it/fc27-card-designs-v0-1n8lt0syz6fh1.png?width=320&crop=smart&auto=webp&s=f1e4f6fbbc99bab0fdf6c05485da582435e0e4a1',
    legend: 'https://preview.redd.it/fc27-card-designs-v0-znd7dysxz6fh1.png?width=320&crop=smart&auto=webp&s=70a2745cee265e729a070eab29cf4c00ae6a2f3f',
    halloffut: 'https://preview.redd.it/fc27-card-designs-v0-ocsybwawz6fh1.png?width=320&crop=smart&auto=webp&s=1e354ad0e3873063e4d108c50235cd36c9523672'
  };
  function init() {
    const app = document.querySelector('main.app'), nav = document.getElementById('stadiumPlayNav');
    if (!app || !nav || document.getElementById('stadiumDuel')) return;
    const words = () => copy[document.documentElement.lang] || copy.it;
    const api = () => window.fcwLocalDuelSession;
    let session = api()?.state?.() || { phase: 'idle', active: false, players: [], results: [] };
    let pending = false, errorCode = '', renderedResult = '', previousPhase = 'idle';
    let finale = null, finaleFrame = 0;
    const playedFinales = new Set(), visuals = new Map(), motion = matchMedia('(prefers-reduced-motion: reduce)');
    const node = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text != null) element.textContent = text; return element; };
    const button = (className, handler) => { const element = node('button', className); element.type = 'button'; element.addEventListener('click', handler); return element; };
    const route = button('stadium-play-route stadium-duel-route', () => invoke('open'));
    route.id = 'stadiumDuel'; route.dataset.current = 'false'; route.setAttribute('aria-controls', 'localDuelPanel'); route.setAttribute('aria-pressed', 'false');
    const routeTitle = node('strong', 'stadium-route-title'), routeNote = node('small', 'stadium-route-description'), routeArrow = node('span', 'stadium-route-arrow', '⇄'); routeArrow.setAttribute('aria-hidden', 'true'); route.append(routeTitle, routeNote, routeArrow); nav.append(route); nav.classList.add('has-local-duel');
    const panel = node('section', 'local-duel-panel'); panel.id = 'localDuelPanel'; panel.hidden = true;
    const head = node('header', 'local-duel-head'), eyebrow = node('small', 'local-duel-eyebrow'), title = node('h2'), intro = node('p', 'local-duel-intro'); title.id = 'localDuelTitle'; title.tabIndex = -1; head.append(eyebrow, title, intro); panel.setAttribute('aria-labelledby', title.id); panel.append(head);
    const setup = node('form', 'local-duel-setup'); setup.id = 'localDuelSetup'; setup.noValidate = true;
    const playersWrap = node('div', 'local-duel-players'), inputs = [];
    for (let i = 0; i < 2; i++) {
      const fieldset = node('fieldset', 'local-duel-player'), legend = node('legend'), identity = node('div', 'local-duel-identity');
      const nameLabel = node('label', 'local-duel-field'), nameText = node('span'), name = node('input'); name.id = `localDuelPlayer${i + 1}Name`; name.type = 'text'; name.maxLength = 24; name.required = true; name.autocomplete = 'off'; nameLabel.append(nameText, name);
      const shirtLabel = node('label', 'local-duel-field'), shirtText = node('span'), shirt = node('input'); shirt.id = `localDuelPlayer${i + 1}Number`; shirt.type = 'number'; shirt.min = '1'; shirt.max = '99'; shirt.step = '1'; shirt.required = true; shirt.inputMode = 'numeric'; shirt.placeholder = '1–99'; shirtLabel.append(shirtText, shirt);
      identity.append(nameLabel, shirtLabel); fieldset.append(legend, identity); playersWrap.append(fieldset); inputs.push({ legend, nameText, name, shirtText, shirt });
      [name, shirt].forEach(input => input.addEventListener('input', () => { errorCode = ''; renderControls(); }));
    }
    const modeSet = node('fieldset', 'local-duel-mode'), modeLegend = node('legend'), modeOptions = node('div', 'local-duel-mode-options'), modeHelp = node('p', 'local-duel-help'); modeHelp.id = 'localDuelModeHelp'; modeSet.setAttribute('aria-describedby', modeHelp.id);
    const modeNodes = ['rapid', 'normal', 'realistic'].map(value => { const label = node('label'), input = node('input'), text = node('span'); input.type = 'radio'; input.name = 'localDuelMode'; input.value = value; input.checked = value === 'normal'; label.append(input, text); modeOptions.append(label); input.addEventListener('change', renderControls); return { value, input, text }; }); modeSet.append(modeLegend, modeOptions, modeHelp);
    const criterionLabel = node('label', 'local-duel-field local-duel-criterion'), criterionText = node('span'), criterion = node('select'); criterion.id = 'localDuelCriterion'; ['combined', 'career', 'card'].forEach(value => { const option = node('option'); option.value = value; criterion.append(option); }); criterionLabel.append(criterionText, criterion);
    const criterionHelp = node('p', 'local-duel-help'); criterionHelp.id = 'localDuelCriterionHelp'; criterion.setAttribute('aria-describedby', criterionHelp.id); criterion.addEventListener('change', renderControls);
    const saved = node('p', 'local-duel-save-note'), setupActions = node('div', 'local-duel-actions'), start = node('button', 'local-duel-primary'), setupBack = button('local-duel-secondary', () => invoke('cancel')); start.type = 'submit'; setupActions.append(start, setupBack); setup.append(playersWrap, modeSet, criterionLabel, criterionHelp, saved, setupActions); panel.append(setup);
    const between = node('div', 'local-duel-between'); between.hidden = true;
    const firstResult = node('div', 'local-duel-first-result'), handover = button('local-duel-primary', () => invoke('next')), betweenBack = button('local-duel-secondary', () => invoke('cancel')), betweenActions = node('div', 'local-duel-actions'); betweenActions.append(handover, betweenBack); between.append(firstResult, betweenActions); panel.append(between);
    const result = node('div', 'local-duel-result'); result.hidden = true;
    const resultContent = node('div', 'local-duel-result-content'), resultActions = node('div', 'local-duel-actions'), rematch = button('local-duel-primary', async () => { const settings = settingsFromSession(); if (await invoke('cancel')) await invoke('start', settings); }), resultBack = button('local-duel-secondary', () => invoke('cancel')); resultActions.append(rematch, resultBack); result.append(resultContent, resultActions); panel.append(result);
    const status = node('p', 'local-duel-status'); status.id = 'localDuelStatus'; status.hidden = true; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); panel.append(status);
    const gameBar = node('section', 'local-duel-game-bar'); gameBar.id = 'localDuelGameBar'; gameBar.hidden = true; const gameHeading = node('div'), turnText = node('strong'), playNote = node('small'), gameStatus = node('p', 'local-duel-game-status'), gameExit = button('local-duel-secondary', () => invoke('cancel')); gameStatus.hidden = true; gameStatus.setAttribute('role', 'status'); gameStatus.setAttribute('aria-live', 'polite'); gameHeading.append(turnText, playNote, gameStatus); gameBar.append(gameHeading, gameExit); nav.after(panel, gameBar);
    const formSettings = () => ({ players: inputs.map(entry => ({ name: entry.name.value.trim(), shirtNumber: Number(entry.shirt.value) })), mode: modeNodes.find(entry => entry.input.checked)?.value || 'normal', criterion: criterion.value });
    function settingsFromSession() { return { players: (session.players || []).map(player => ({ name: player.name, shirtNumber: Number(player.shirtNumber) })), mode: session.mode || 'normal', criterion: session.criterion || 'combined' }; }
    function busy() { return pending || Boolean(session.busy || window.fcwExperience?.snapshot?.().spinning || window.fcwAccountSync?.isBusy?.() || window.fcwAccountHydrating); }
    const format = value => new Intl.NumberFormat(document.documentElement.lang || 'it', { maximumFractionDigits: 1 }).format(value);
    function validIdentity(players) { return players.every(player => player.name.length > 0 && player.name.length <= 24 && Number.isInteger(player.shirtNumber) && player.shirtNumber >= 1 && player.shirtNumber <= 99); }
    function errorText() {
      const t = words(), code = String(errorCode || session.error || '').toUpperCase();
      if (['BUSY', 'DUEL_BUSY', 'SPINNING', 'SAVE_BUSY', 'ACCOUNT_BUSY', 'OPERATION_BUSY'].includes(code)) return t.busy;
      if (['INVALID_IDENTITY', 'INVALID_PLAYERS', 'INVALID_SETUP', 'INVALID_MODE', 'INVALID_CRITERION'].includes(code)) return t.invalid;
      if (['SAME_NAMES', 'DUPLICATE_NAME', 'DUPLICATE_NAMES'].includes(code)) return t.sameNames;
      if (['INCOMPLETE_RUN', 'INVALID_RESULT', 'DUEL_INCOMPLETE', 'PREVIEW_RESULT'].includes(code)) return t.incomplete;
      if (code === 'STORAGE_UNAVAILABLE') return t.storage;
      if (code === 'RECOVERY_INVALID') return t.recovery;
      if (['ACCOUNT_CHANGED', 'OWNER_CHANGED'].includes(code)) return t.accountChanged;
      if (['UNAVAILABLE', 'NOT_READY', 'DUEL_UNAVAILABLE'].includes(code)) return t.unavailable;
      return code ? t.generic : '';
    }
    async function invoke(method, payload) {
      if (busy()) { errorCode = 'BUSY'; renderControls(); return false; }
      const service = api();
      if (typeof service?.[method] !== 'function') { errorCode = 'UNAVAILABLE'; renderControls(); return false; }
      if (method === 'cancel' || method === 'start') finishFinale();
      errorCode = ''; pending = true; renderControls();
      try {
        const outcome = await service[method](payload);
        session = service.state?.() || session;
        if (outcome === false && !session.error) errorCode = 'NOT_READY';
        render(); return outcome !== false;
      } catch (error) { errorCode = error?.code || error?.message || 'ERROR'; session = service.state?.() || session; render(); return false; }
      finally { pending = false; renderControls(); }
    }
    setup.addEventListener('submit', event => {
      event.preventDefault(); const settings = formSettings();
      if (!validIdentity(settings.players)) { errorCode = 'INVALID_IDENTITY'; renderControls(); const invalid = inputs.flatMap(entry => [entry.name, entry.shirt]).find(input => !input.validity.valid || input.type === 'text' && !input.value.trim()); invalid?.focus(); return; }
      invoke('start', settings);
    });
    function renderControls() {
      const t = words(), locked = busy(), selectedMode = modeNodes.find(entry => entry.input.checked)?.value || 'normal';
      modeHelp.textContent = t[`${selectedMode}Note`]; criterionHelp.textContent = t[`${criterion.value}Note`] || t.combinedNote;
      const message = errorText(); status.textContent = message || (pending ? t.loading : ''); status.hidden = !status.textContent; status.dataset.error = String(Boolean(message));
      gameStatus.textContent = message; gameStatus.hidden = !message;
      panel.setAttribute('aria-busy', String(pending || Boolean(session.busy)));
      [...inputs.flatMap(entry => [entry.name, entry.shirt]), ...modeNodes.map(entry => entry.input), criterion].forEach(input => { input.disabled = locked; });
      [start, setupBack, handover, betweenBack, rematch, resultBack, gameExit, route].forEach(control => { control.disabled = locked; });
    }
    function metricFor(score) { return session.criterion === 'career' ? score.careerPoints.total : session.criterion === 'card' ? score.cardScore : score.combinedScore; }
    function summaryWinner(scores, metric, winnerText, tieText) {
      const a = metric(scores[0]), b = metric(scores[1]); return a === b ? tieText : winnerText((a > b ? scores[0] : scores[1]).result.name);
    }
    function resultScores() {
      const entries = session.results;
      if (!Array.isArray(entries) || entries.length !== 2 || entries.some(entry => !entry?.result || !Array.isArray(entry.result.stats) || entry.result.stats.length !== 6) || !window.FCWScoring) return null;
      try { const scores = window.FCWScoring.scoreRound(entries.map((entry, index) => ({ id: entry.id || `local-player-${index}`, result: entry.result }))); return scores.every(score => Number.isFinite(metricFor(score))) ? scores : null; } catch { return null; }
    }
    function captureVisuals() {
      const source = document.getElementById('cardInner');
      if (!source || document.getElementById('careerCard')?.hidden) return;
      const current = window.fcwExperience?.snapshot?.();
      const entry = session.results?.find(item => item?.runId === current?.runId);
      if (!entry || visuals.has(entry.runId)) return;
      visuals.set(entry.runId, { background: source.style.backgroundImage, silhouette: source.querySelector('.card-silhouette')?.getAttribute('src') || 'player-silhouette.png' });
      if (visuals.size > 4) visuals.delete(visuals.keys().next().value);
    }
    function playerCard(score, index, scores) {
      const t = words(), player = score.result, entry = session.results[index], context = entry.context || {}, appearance = visuals.get(entry.runId);
      const tier = player.overall >= 95 ? 'halloffut' : player.overall >= 90 ? 'legend' : player.overall >= 85 ? 'hero' : player.overall >= 75 ? 'gold' : player.overall >= 65 ? 'silver' : 'bronze';
      const art = node('div', 'local-duel-player-card'); art.dataset.tier = tier; art.setAttribute('aria-label', t.cardAlt(player.name));
      if (appearance?.background) art.style.backgroundImage = appearance.background;
      else art.style.backgroundImage = `url("${cardArt[tier]}")`;
      const portrait = node('img', 'local-duel-card-portrait'); portrait.src = appearance?.silhouette || 'player-silhouette.png'; portrait.alt = ''; portrait.setAttribute('aria-hidden', 'true');
      const top = node('div', 'local-duel-art-rating'), rating = node('strong', '', format(player.overall)), position = node('span', '', window.fcwExperience?.translateLabel?.(player.position) || player.position);
      top.dataset.attribute = '0'; top.dataset.leading = String(player.overall > scores[1 - index].result.overall); rating.setAttribute('aria-label', `${t.overall} ${format(player.overall)}`); top.append(rating, position);
      const shirt = node('span', 'local-duel-art-shirt', String(player.shirtNumber)); shirt.setAttribute('aria-label', t.shirt(player.shirtNumber));
      const information = node('div', 'local-duel-art-info'), name = node('h3', '', player.name), stats = node('dl', 'local-duel-art-stats');
      player.stats.forEach((value, statIndex) => {
        const item = node('div'); item.dataset.attribute = String(statIndex + 1); item.dataset.leading = String(value > scores[1 - index].result.stats[statIndex]);
        const label = node('dt', '', ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'][statIndex]); label.setAttribute('aria-label', t.statNames[statIndex]); item.append(label, node('dd', '', format(value))); stats.append(item);
      });
      const badges = node('div', 'local-duel-art-badges'), nation = String(context.nation || ''), countryFlag = nation.split(' ').at(-1) || '';
      const marks = [
        { text: nation, source: countryFlag && typeof window.flagEmojiUrl === 'function' ? window.flagEmojiUrl(countryFlag) : '', label: t.flag },
        { text: context.league, source: context.league && typeof window.leagueBadgeUrl === 'function' ? window.leagueBadgeUrl(context.league) : '', label: t.logo },
        { text: context.club, source: context.club && typeof window.clubBadgeUrl === 'function' ? window.clubBadgeUrl(context.club) : '', label: t.logo }
      ];
      marks.forEach(mark => {
        if (!mark.text) return;
        if (mark.source) {
          const image = node('img'); image.src = mark.source; image.alt = `${mark.label} ${window.fcwExperience?.translateLabel?.(mark.text) || mark.text}`;
          image.addEventListener('error', () => { const fallback = node('span', 'local-duel-badge-fallback', String(mark.text).replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 3).toUpperCase()); fallback.setAttribute('aria-label', image.alt); image.replaceWith(fallback); }, { once: true }); badges.append(image);
        } else { const fallback = node('span', 'local-duel-badge-fallback', String(mark.text).replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 3).toUpperCase()); fallback.setAttribute('aria-label', `${mark.label} ${mark.text}`); badges.append(fallback); }
      });
      information.append(name, stats, badges); art.append(portrait, top, shirt, information); return art;
    }
    function cancelFinaleFrame() { if (finaleFrame) cancelAnimationFrame(finaleFrame); finaleFrame = 0; }
    function setFinaleStage(stage) {
      if (!finale) return;
      const t = words(); finale.stage = stage; result.dataset.finaleStage = String(stage);
      const label = [t.cardsStage, t.statsStage, t.careerStage, t.scoreStage, t.resultStage][stage];
      finale.stageLabel.textContent = label; finale.announcement.textContent = stage === 4 ? summaryWinner(finale.scores, finale.metric, t.winner, t.tie) : label;
      finale.steps.forEach((step, index) => { step.dataset.current = String(index === (stage < 2 ? 0 : stage < 4 ? 1 : 2)); step.dataset.done = String(index < (stage < 2 ? 0 : stage < 4 ? 1 : 2)); });
      finale.details.hidden = stage < 2; finale.leaders.hidden = stage < 4;
      if (stage === 4) {
        title.textContent = summaryWinner(finale.scores, finale.metric, t.winner, t.tie);
        finale.verdict.textContent = title.textContent; finale.verdict.hidden = false;
      }
    }
    function writeCount(counter, fraction) {
      const amount = fraction === 1 ? counter.value : Math.round(counter.value * Math.max(0, fraction) * (counter.integer ? 1 : 10)) / (counter.integer ? 1 : 10);
      counter.node.textContent = `${format(amount)}${counter.suffix}`;
    }
    function finishFinale(animateWinner = false) {
      cancelFinaleFrame(); if (!finale) return;
      const wasRunning = finale.running, skipHadFocus = document.activeElement === finale.skip;
      finale.running = false; finale.counters.forEach(counter => writeCount(counter, 1));
      finale.progress.style.width = '100%'; finale.attributes.forEach(attribute => attribute.classList.remove('is-comparing'));
      result.dataset.animating = 'false'; result.classList.toggle('is-verdict-arriving', Boolean(wasRunning && animateWinner));
      setFinaleStage(4); finale.skip.hidden = true;
      if (skipHadFocus && !panel.hidden && session.phase === 'result' && String(app.dataset.view || '').startsWith('duel')) title.focus({ preventScroll: true });
    }
    function playFinale() {
      if (!finale) return;
      finale.running = true; finale.started = null; result.dataset.animating = 'true'; result.classList.remove('is-verdict-arriving');
      title.textContent = words().comparing; setFinaleStage(0); finale.skip.hidden = false;
      finale.counters.forEach(counter => writeCount(counter, 0));
      const active = finale;
      function frame(timestamp) {
        finaleFrame = 0;
        if (finale !== active || !active.running) return;
        if (document.hidden || panel.hidden || !String(app.dataset.view || '').startsWith('duel') || session.phase !== 'result' || motion.matches) { finishFinale(); return; }
        if (active.started === null) active.started = timestamp;
        const elapsed = timestamp - active.started, stage = elapsed < 650 ? 0 : elapsed < 2150 ? 1 : elapsed < 3500 ? 2 : elapsed < 4700 ? 3 : 4;
        if (stage !== active.stage) setFinaleStage(stage);
        active.progress.style.width = `${Math.min(100, elapsed / 47)}%`;
        const category = stage === 1 ? Math.min(6, Math.floor((elapsed - 650) / 210)) : -1;
        if (category !== active.category) { active.category = category; active.attributes.forEach(attribute => attribute.classList.toggle('is-comparing', Number(attribute.dataset.attribute) === category)); }
        active.counters.forEach(counter => { const progress = Math.min(1, Math.max(0, (elapsed - (counter.kind === 'career' ? 2150 : 3500)) / (counter.kind === 'career' ? 1150 : 1000))); writeCount(counter, 1 - Math.pow(1 - progress, 3)); });
        if (stage === 4) { finishFinale(true); return; }
        finaleFrame = requestAnimationFrame(frame);
      }
      finaleFrame = requestAnimationFrame(frame);
    }
    function renderResult(animate) {
      const t = words(), scores = resultScores();
      if (!scores) { finishFinale(); finale = null; resultContent.replaceChildren(node('p', 'local-duel-help', t.incomplete)); return; }
      const key = JSON.stringify([document.documentElement.lang, session.criterion, session.results]); if (key === renderedResult) return; renderedResult = key;
      finishFinale(); finale = null;
      const winning = Math.max(...scores.map(metricFor)), draw = metricFor(scores[0]) === metricFor(scores[1]);
      title.textContent = summaryWinner(scores, metricFor, t.winner, t.tie);
      const stageBar = node('div', 'local-duel-finale-bar'), stageLabel = node('strong', 'local-duel-finale-label'), skip = button('local-duel-finale-skip', () => finishFinale()); skip.textContent = t.skip;
      stageBar.append(stageLabel, skip);
      const stepList = node('ol', 'local-duel-finale-steps'), stepNodes = t.stages.map(text => { const step = node('li', '', text); stepList.append(step); return step; });
      const track = node('div', 'local-duel-finale-track'), progress = node('i'); track.setAttribute('aria-hidden', 'true'); track.append(progress);
      const announcement = node('p', 'local-duel-visually-hidden'); announcement.setAttribute('role', 'status'); announcement.setAttribute('aria-live', 'polite'); announcement.setAttribute('aria-atomic', 'true');
      const verdict = node('div', 'local-duel-verdict'); verdict.hidden = true; verdict.dataset.draw = String(draw);
      const cards = node('div', 'local-duel-cards'), counters = [];
      function countNode(value, kind, suffix = '', integer = false, tag = 'span') {
        const wrapper = node(tag), visual = node('span', 'local-duel-count', `${format(value)}${suffix}`), accessible = node('span', 'local-duel-visually-hidden', `${format(value)}${suffix}`); visual.setAttribute('aria-hidden', 'true'); wrapper.append(visual, accessible); counters.push({ node: visual, value, kind, suffix, integer }); return wrapper;
      }
      scores.forEach((score, index) => {
        const card = node('article', 'local-duel-scorecard'); card.dataset.winner = String(!draw && metricFor(score) === winning); card.dataset.player = String(index + 1); card.append(playerCard(score, index, scores));
        const scoreList = node('dl', 'local-duel-card-points'); [['cp', score.careerPoints.total], ['cardScore', score.cardScore]].forEach(([keyName, value]) => { const row = node('div'); row.dataset.kind = keyName; row.append(node('dt', '', t[keyName]), countNode(value, keyName === 'cp' ? 'career' : 'score', keyName === 'cardScore' ? ' / 100' : '', keyName === 'cp', 'dd')); scoreList.append(row); }); card.append(scoreList);
        const final = node('div', 'local-duel-final-score'); final.append(node('span', '', session.criterion === 'career' ? t.cp : session.criterion === 'card' ? t.cardScore : t.total), countNode(metricFor(score), 'score', session.criterion === 'career' ? ` ${t.points}` : ' / 100', session.criterion === 'career', 'strong')); card.append(final); cards.append(card);
      });
      const note = node('p', 'local-duel-result-note', t[`${session.criterion || 'combined'}Note`]);
      const leaders = node('div', 'local-duel-leaders'); leaders.append(node('span', '', summaryWinner(scores, score => score.careerPoints.total, t.winsCareer, t.tiedCareer)), node('span', '', summaryWinner(scores, score => score.cardScore, t.winsCard, t.tiedCards)));
      const details = node('details', 'local-duel-comparison'); details.open = true; const summary = node('summary', '', t.careerDetails), tableWrap = node('div', 'local-duel-table-wrap'), table = node('table'), caption = node('caption', '', t.careerDetails); caption.className = 'local-duel-visually-hidden'; table.append(caption);
      const thead = node('thead'), headerRow = node('tr'); [t.metric, ...scores.map(score => score.result.name)].forEach(text => { const th = node('th', '', text); th.scope = 'col'; headerRow.append(th); }); thead.append(headerRow); table.append(thead);
      const tbody = node('tbody'); ['goals', 'assists', 'seasons', 'league', 'champions', 'world', 'continental', 'ballon'].forEach(keyName => { const row = node('tr'), label = node('th', '', t[keyName]); label.scope = 'row'; row.append(label); const values = scores.map(score => score.result.career[keyName]); values.forEach(value => { const cell = node('td', '', format(value)); cell.dataset.leading = String(values[0] !== values[1] && value === Math.max(...values)); row.append(cell); }); tbody.append(row); }); table.append(tbody); tableWrap.append(table); details.append(summary, tableWrap);
      resultContent.replaceChildren(stageBar, stepList, track, announcement, cards, verdict, note, leaders, details);
      const resultCriterion = session.criterion;
      finale = { scores, metric: score => resultCriterion === 'career' ? score.careerPoints.total : resultCriterion === 'card' ? score.cardScore : score.combinedScore, stageLabel, steps: stepNodes, progress, announcement, skip, verdict, counters, details, leaders, attributes: [...cards.querySelectorAll('[data-attribute]')], category: -1, stage: -1, running: false };
      const identity = JSON.stringify(session.results.map(entry => entry.runId || entry.result));
      const shouldAnimate = animate && !playedFinales.has(identity) && !session.busy && !document.hidden && !motion.matches;
      playedFinales.add(identity);
      if (shouldAnimate) playFinale(); else finishFinale();
    }
    function render() {
      const t = words(), phase = session.phase || 'idle', duelView = String(app.dataset.view || '').startsWith('duel'), visible = phase !== 'idle' && duelView;
      captureVisuals();
      if (phase !== 'result' || !visible) finishFinale();
      routeTitle.textContent = t.nav; routeNote.textContent = t.navNote; route.dataset.current = String(visible); route.setAttribute('aria-pressed', String(visible));
      panel.hidden = !visible || phase === 'playing'; gameBar.hidden = !visible || phase !== 'playing'; setup.hidden = phase !== 'setup'; between.hidden = phase !== 'between'; result.hidden = phase !== 'result';
      inputs.forEach((entry, index) => { entry.legend.textContent = t.player(index + 1); entry.nameText.textContent = t.name; entry.shirtText.textContent = t.number; entry.name.placeholder = t.placeholder(index + 1); }); modeLegend.textContent = t.mode; modeNodes.forEach(entry => { entry.text.textContent = t[entry.value]; }); criterionText.textContent = t.criterion; [...criterion.options].forEach(option => { option.textContent = t[option.value]; }); saved.textContent = t.saveNote; start.textContent = t.start; [setupBack, betweenBack, resultBack].forEach(control => { control.textContent = t.cancel; }); gameExit.textContent = t.cancelGame; rematch.textContent = t.rematch;
      if (phase === 'setup') {
        eyebrow.textContent = t.eyebrow; title.textContent = t.title; intro.textContent = t.intro;
        if (previousPhase !== 'setup' && Array.isArray(session.players) && session.players.length === 2) { inputs.forEach((entry, index) => { entry.name.value = session.players[index].name || ''; entry.shirt.value = session.players[index].shirtNumber ? String(session.players[index].shirtNumber) : ''; }); if (session.mode) modeNodes.forEach(entry => { entry.input.checked = entry.value === session.mode; }); if (session.criterion) criterion.value = session.criterion; }
      } else if (phase === 'between') {
        const nextPlayer = session.players?.[1]?.name || t.player(2), first = session.results?.[0]?.result;
        eyebrow.textContent = t.waiting; title.textContent = t.pass(nextPlayer); intro.textContent = t.firstDone(session.players?.[0]?.name || t.player(1)); handover.textContent = t.next(nextPlayer);
        firstResult.replaceChildren();
        if (first && window.FCWScoring) { const cp = window.FCWScoring.careerPoints(first).total; firstResult.append(node('strong', '', first.name), node('span', '', `${t.overall} ${format(first.overall)} · ${format(cp)} ${t.cp}`)); }
      } else if (phase === 'result') { eyebrow.textContent = t.roundComplete; intro.textContent = t.finalNote; renderResult(previousPhase === 'playing' && visible); }
      const turn = Number(session.turn) === 1 ? 1 : 0; turnText.textContent = t.turn(turn + 1, session.players?.[turn]?.name || t.player(turn + 1)); playNote.textContent = t.playing;
      renderControls();
      if (phase !== previousPhase && ['setup', 'between', 'result'].includes(phase)) queueMicrotask(() => { if (!panel.hidden && String(app.dataset.view || '').startsWith('duel')) { title.focus({ preventScroll: true }); panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); } });
      previousPhase = phase;
    }
    window.fcwDuel = Object.freeze({ getState: () => api()?.state?.() || session, isActive: () => Boolean((api()?.state?.() || session).active) });
    window.addEventListener('fcw:local-duel', event => { session = event.detail || api()?.state?.() || session; errorCode = ''; render(); });
    ['fcw:state', 'fcw:complete', 'fcw:language', 'fcw:account', 'fcw:account-restore', 'fcw:ready'].forEach(event => window.addEventListener(event, () => { session = api()?.state?.() || session; render(); }));
    document.getElementById('languageSelect')?.addEventListener('change', () => queueMicrotask(render));
    nav.addEventListener('click', () => queueMicrotask(render));
    document.addEventListener('visibilitychange', () => { if (document.hidden) finishFinale(); });
    window.addEventListener('pagehide', () => finishFinale());
    motion.addEventListener?.('change', () => { if (motion.matches) finishFinale(); });
    new MutationObserver(() => { if (!String(app.dataset.view || '').startsWith('duel')) finishFinale(); }).observe(app, { attributes: true, attributeFilter: ['data-view'] });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
