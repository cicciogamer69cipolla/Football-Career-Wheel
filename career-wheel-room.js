(() => {
  const byId = id => document.getElementById(id);
  const storagePrefix = 'fcw-online-room-v1:';
  const isLocalPreview = ['localhost', '127.0.0.1'].includes(location.hostname);
  const localRoomApi = isLocalPreview && location.port === '8765' ? `${location.protocol}//${location.hostname}:8766` : '';
  const criterionLabels = {
    combined: { it: 'Combinata · 70% carriera + 30% carta', en: 'Combined · 70% career + 30% card', es: 'Combinada · 70% carrera + 30% carta', fr: 'Combiné · 70 % carrière + 30 % carte' },
    career: { it: 'Più Punti Carriera', en: 'Most Career Points', es: 'Más puntos de carrera', fr: 'Plus de points de carrière' },
    card: { it: 'Carta più forte', en: 'Strongest card', es: 'Carta más fuerte', fr: 'Carte la plus forte' }
  };
  const copy = {
    it: { title: '🌐 Sfida privata online', teaser: 'Crea o unisciti a una stanza', intro: 'Crea una stanza e condividi il codice. Ognuno invia la propria carriera: il sito confronta Punti Carriera e carte.', criterion: 'Criterio di vittoria', create: 'Crea stanza e invia la carriera', codePlaceholder: 'CODICE STANZA', codeLabel: 'Codice stanza', inviteLabel: 'Link invito', leadersLabel: 'Classifica sintetica', joinErrorNoCode: 'Inserisci un codice di 6 caratteri per entrare nella stanza.', join: 'Entra e invia', idle: 'La stanza è privata: condividi il codice solo con chi vuoi invitare.', localOnly: 'Anteprima locale: per giocare con amici da Internet, il sito e il server stanze vanno pubblicati online.', roomCode: 'CODICE INVITO', copyLink: 'Copia link invito', copyDone: 'Link copiato.', copyError: 'Non riesco a copiare il link: selezionalo e copialo manualmente.', players: (n, max) => `${n}/${max} partecipanti · le stanze scadono dopo 12 ore di inattività.`, waiting: 'In attesa delle altre carriere.', standings: 'Classifica della stanza', careerLeader: 'Miglior carriera', cardLeader: 'Carta più forte', overallLeader: 'Vincitore', submitted: 'inviata', pending: 'deve ancora inviare la carriera', pendingScore: 'In attesa', card: 'Carta', career: 'Punti carriera', combined: 'Totale', points: 'pt', copied: 'Codice copiato.', badCareer: 'Completa prima tutte le ruote per creare o raggiungere una stanza.', serverOffline: 'Server stanza non disponibile: riavvia il server locale aggiornato.', formula: 'Punti carriera: ogni 10 gol e assist = 1 pt (peso per ruolo); stagione = 2; campionato = 12; Champions = 22; Mondiale = 25; coppa continentale = 15; Pallone d’Oro = 20. Duello carta: graduatoria in stanza su OVR (peso doppio) e sei attributi, convertita in 0–100. Totale: 70% carriera (400 pt = 100) + 30% classifica carte.', loading: 'Connessione alla stanza…', joined: 'Carriera inviata. Condividi il link con gli altri.', created: 'Stanza creata e carriera inviata.', refresh: 'Aggiorna classifica', empty: 'Ancora nessun partecipante.', copyCode: 'Copia codice', player: 'Calciatore', sent: 'Carriera inviata', createError: 'Non è stato possibile creare la stanza.', joinError: 'Non è stato possibile entrare nella stanza.', sendError: 'Non è stato possibile inviare la carriera.' },
    en: { title: '🌐 Private online challenge', teaser: 'Create or join a room', intro: 'Create a room and share its code. Everyone submits a career; the site compares Career Points and player cards.', criterion: 'Winning criterion', create: 'Create room and submit career', codePlaceholder: 'ROOM CODE', join: 'Join and submit', idle: 'The room is private: share its code only with people you invite.', localOnly: 'Local preview: to play with friends over the Internet, the site and room server need public hosting.', roomCode: 'INVITE CODE', copyLink: 'Copy invite link', copyDone: 'Invite link copied.', copyError: 'Could not copy the link. Select and copy it manually.', players: (n, max) => `${n}/${max} players · rooms expire after 12 hours of inactivity.`, waiting: 'Waiting for more careers.', standings: 'Room standings', careerLeader: 'Best career', cardLeader: 'Strongest card', overallLeader: 'Winner', submitted: 'submitted', pending: 'has not submitted a career yet', pendingScore: 'Waiting', card: 'Card', career: 'Career Points', combined: 'Total', points: 'pts', copied: 'Code copied.', badCareer: 'Complete all wheels before creating or joining a room.', serverOffline: 'Room server unavailable: restart the updated local server.', formula: 'Career Points: every 10 goals or assists = 1 pt (adjusted by position); each season = 2; league title = 12; Champions League = 22; World Cup = 25; continental cup = 15; Ballon d’Or = 20. Card duel: room ranking for OVR (double weight) and six attributes, converted to 0–100. Total: 70% career (400 pts = 100) + 30% card ranking.', loading: 'Connecting to room…', joined: 'Career submitted. Share the invite link with the others.', created: 'Room created and career submitted.', refresh: 'Refresh standings', empty: 'No participants yet.', copyCode: 'Copy code', player: 'Player', sent: 'Career submitted', createError: 'Could not create the room.', joinError: 'Could not join the room.', sendError: 'Could not submit the career.' },
    es: { title: '🌐 Desafío privado online', teaser: 'Crea o únete a una sala', intro: 'Crea una sala y comparte el código. Cada participante envía su carrera; la web compara puntos de carrera y cartas.', criterion: 'Criterio de victoria', create: 'Crear sala y enviar carrera', codePlaceholder: 'CÓDIGO DE SALA', join: 'Entrar y enviar', idle: 'La sala es privada: comparte el código solo con quien quieras invitar.', localOnly: 'Vista previa local: para jugar con amigos por Internet, hay que publicar la web y el servidor de salas.', roomCode: 'CÓDIGO DE INVITACIÓN', copyLink: 'Copiar enlace', copyDone: 'Enlace copiado.', copyError: 'No se pudo copiar el enlace. Selecciónalo y cópialo manualmente.', players: (n, max) => `${n}/${max} participantes · las salas caducan tras 12 horas de inactividad.`, waiting: 'Esperando más carreras.', standings: 'Clasificación de la sala', careerLeader: 'Mejor carrera', cardLeader: 'Carta más fuerte', overallLeader: 'Ganador', submitted: 'enviada', pending: 'aún debe enviar su carrera', pendingScore: 'En espera', card: 'Carta', career: 'Puntos de carrera', combined: 'Total', points: 'ptos.', copied: 'Código copiado.', badCareer: 'Completa todas las ruletas antes de crear o unirte a una sala.', serverOffline: 'Servidor de salas no disponible: reinicia el servidor local actualizado.', formula: 'Puntos de carrera: cada 10 goles o asistencias = 1 pto. (ajustado por posición); temporada = 2; liga = 12; Champions = 22; Mundial = 25; copa continental = 15; Balón de Oro = 20. Duelo de cartas: clasificación de la sala por media (doble peso) y seis atributos, convertida a 0–100. Total: 70% carrera (400 ptos. = 100) + 30% clasificación de cartas.', loading: 'Conectando con la sala…', joined: 'Carrera enviada. Comparte el enlace con los demás.', created: 'Sala creada y carrera enviada.', refresh: 'Actualizar clasificación', empty: 'Todavía no hay participantes.', copyCode: 'Copiar código', player: 'Jugador', sent: 'Carrera enviada', createError: 'No se pudo crear la sala.', joinError: 'No se pudo entrar en la sala.', sendError: 'No se pudo enviar la carrera.' },
    fr: { title: '🌐 Défi privé en ligne', teaser: 'Créer ou rejoindre une salle', intro: 'Créez une salle et partagez son code. Chacun envoie sa carrière ; le site compare les points de carrière et les cartes.', criterion: 'Critère de victoire', create: 'Créer la salle et envoyer la carrière', codePlaceholder: 'CODE DE SALLE', join: 'Rejoindre et envoyer', idle: 'La salle est privée : partagez le code uniquement avec vos invités.', localOnly: 'Aperçu local : pour jouer avec des amis sur Internet, le site et le serveur doivent être hébergés publiquement.', roomCode: 'CODE D’INVITATION', copyLink: 'Copier le lien', copyDone: 'Lien copié.', copyError: 'Impossible de copier le lien. Sélectionnez-le et copiez-le manuellement.', players: (n, max) => `${n}/${max} participants · expiration après 12 heures d’inactivité.`, waiting: 'En attente des autres carrières.', standings: 'Classement de la salle', careerLeader: 'Meilleure carrière', cardLeader: 'Carte la plus forte', overallLeader: 'Vainqueur', submitted: 'envoyée', pending: 'n’a pas encore envoyé sa carrière', pendingScore: 'En attente', card: 'Carte', career: 'Points de carrière', combined: 'Total', points: 'pts', copied: 'Code copié.', badCareer: 'Terminez toutes les roues avant de créer ou rejoindre une salle.', serverOffline: 'Serveur de salle indisponible : redémarrez le serveur local mis à jour.', formula: 'Points de carrière : 10 buts ou passes décisives = 1 pt (ajusté selon le poste) ; saison = 2 ; championnat = 12 ; Ligue des champions = 22 ; Coupe du monde = 25 ; coupe continentale = 15 ; Ballon d’Or = 20. Duel de cartes : classement de la salle selon la note (poids double) et six attributs, converti sur 100. Total : 70 % carrière (400 pts = 100) + 30 % classement des cartes.', loading: 'Connexion à la salle…', joined: 'Carrière envoyée. Partagez le lien avec les autres.', created: 'Salle créée et carrière envoyée.', refresh: 'Actualiser le classement', empty: 'Aucun participant pour le moment.', copyCode: 'Copier le code', player: 'Joueur', sent: 'Carrière envoyée', createError: 'Impossible de créer la salle.', joinError: 'Impossible de rejoindre la salle.', sendError: 'Impossible d’envoyer la carrière.' }
  };
  Object.assign(copy.en, { codeLabel: 'Room code', inviteLabel: 'Invite link', leadersLabel: 'Summary standings', joinErrorNoCode: 'Enter a 6-character code to join the room.' });
  Object.assign(copy.es, { codeLabel: 'Código de sala', inviteLabel: 'Enlace de invitación', leadersLabel: 'Clasificación resumida', joinErrorNoCode: 'Introduce un código de 6 caracteres para entrar en la sala.' });
  Object.assign(copy.fr, { codeLabel: 'Code de salle', inviteLabel: 'Lien d’invitation', leadersLabel: 'Classement résumé', joinErrorNoCode: 'Saisissez un code de 6 caractères pour rejoindre la salle.' });

  const features = {
    it: { intro: 'Apri una stanza prima di giocare e segui in diretta le ruote degli amici. La carriera finita viene inviata automaticamente.', create: 'Crea stanza', join: 'Entra nella stanza', created: 'Stanza pronta. Condividi il codice e gira le ruote.', joined: 'Sei nella stanza. La tua carriera verrà inviata a fine partita.', format: 'Formato della sfida', single: 'Una carriera', three: 'Tre carriere · punti cumulativi', threeNote: 'Tre carriere a testa: sommiamo Punti Carriera e punteggi dei duelli carta di ogni round. Vince chi ha il totale più alto.', badIdentity: 'Scrivi nome e numero maglia (1–99) prima di entrare.', sent: 'Carriera inviata automaticamente.', live: 'In diretta', round: 'Round', completed: 'carriere completate', awaiting: 'Aspettando gli amici', ready: 'Pronto a girare', last: 'Ultima estrazione', playing: 'Sta giocando', host: 'Organizzatore', you: 'Tu', next: 'Apri il prossimo round', play: 'Gioca questa carriera', rematch: 'Rivincita', newRoom: 'Nuova stanza', provisional: 'Classifica provvisoria', winner: 'Vincitore della sfida', draw: 'Pareggio', pendingRound: 'Il prossimo round sarà aperto dall’organizzatore quando tutti avranno finito.', seriesDone: 'Sfida conclusa', nextReady: 'Il prossimo round è pronto: premi “Gioca questa carriera”.', waitPlayers: 'Invita almeno un amico: la carriera sarà inviata quando sarete in due.', roundReady: 'Tutti hanno finito il round.', formula: 'Gol e assist ogni 10 = 1 pt, con peso per ruolo; stagione 2; campionato 12; Champions 22; Mondiale 25; coppa continentale 15; Pallone d’Oro 20. Carta: OVR pesa doppio e i sei attributi si confrontano con le altre carte del round. Combinata: 70% carriera (400 pt = 100) + 30% duello carta. Nelle serie si sommano i punteggi di tutti e tre i round.', series: 'Serie', invalidSession: 'Sessione scaduta: ricarica e rientra con il codice.', serverOffline: 'Server stanze non raggiungibile. I risultati locali restano salvati.', roomLocked: 'La sfida è già iniziata: chiedi un nuovo codice.', roundPending: 'Prima devono finire tutti i partecipanti.', hostOnly: 'Solo l’organizzatore può aprire round e rivincite.', roomMissing: 'Stanza non trovata o scaduta. Chiedi un nuovo codice.', roomFull: 'Stanza piena: massimo 10 partecipanti.', resultError: 'La carriera non è valida. Completa tutte le ruote di una nuova partita.', genericError: 'Operazione non riuscita. Riprova.', copied: 'Codice copiato.', identityLocked: 'Nome e numero devono corrispondere alla carriera in corso.', retry: 'Riprova invio' },
    en: { intro: 'Open a room before playing and follow your friends’ wheels live. Completed careers are submitted automatically.', create: 'Create room', join: 'Join room', created: 'Room ready. Share the code and spin the wheels.', joined: 'You joined the room. Your career will be submitted when you finish.', format: 'Challenge format', single: 'One career', three: 'Three careers · cumulative points', threeNote: 'Three careers each: Career Points and card duel scores add up every round. The highest total wins.', badIdentity: 'Enter your name and shirt number (1–99) before joining.', sent: 'Career submitted automatically.', live: 'Live', round: 'Round', completed: 'careers completed', awaiting: 'Waiting for friends', ready: 'Ready to spin', last: 'Last result', playing: 'Playing', host: 'Host', you: 'You', next: 'Open next round', play: 'Play this career', rematch: 'Rematch', newRoom: 'New room', provisional: 'Provisional standings', winner: 'Challenge winner', draw: 'Draw', pendingRound: 'The host opens the next round after everyone finishes.', seriesDone: 'Challenge complete', nextReady: 'Next round is ready: press “Play this career”.', waitPlayers: 'Invite at least one friend: your career will be submitted when there are two players.', roundReady: 'Everyone finished this round.', formula: 'Every 10 goals or assists = 1 pt, adjusted by position; season 2; league title 12; Champions League 22; World Cup 25; continental cup 15; Ballon d’Or 20. Card: OVR has double weight and six attributes are ranked against the other cards in the round. Combined: 70% career (400 pts = 100) + 30% card duel. Series add up scores from all three rounds.', series: 'Series', invalidSession: 'Session expired: reload and join again with the code.', serverOffline: 'Room server unreachable. Local results remain saved.', roomLocked: 'This challenge has started: ask for a new code.', roundPending: 'All participants must finish first.', hostOnly: 'Only the host can open rounds and rematches.', roomMissing: 'Room missing or expired. Ask for a new code.', roomFull: 'Room full: maximum 10 players.', resultError: 'Invalid career. Complete all wheels in a new game.', genericError: 'The action failed. Please try again.', copied: 'Code copied.', identityLocked: 'Name and shirt number must match the current career.', retry: 'Retry submission' },
    es: { intro: 'Abre una sala antes de jugar y sigue las ruletas de tus amigos en directo. Las carreras terminadas se envían automáticamente.', create: 'Crear sala', join: 'Entrar en la sala', created: 'Sala lista. Comparte el código y gira las ruletas.', joined: 'Has entrado en la sala. La carrera se enviará al terminar.', format: 'Formato del desafío', single: 'Una carrera', three: 'Tres carreras · puntos acumulados', threeNote: 'Tres carreras por persona: se suman puntos de carrera y puntuaciones de los duelos de cartas de cada ronda. Gana el total más alto.', badIdentity: 'Introduce nombre y dorsal (1–99) antes de entrar.', sent: 'Carrera enviada automáticamente.', live: 'En directo', round: 'Ronda', completed: 'carreras completadas', awaiting: 'Esperando a los amigos', ready: 'Listo para girar', last: 'Último resultado', playing: 'Jugando', host: 'Organizador', you: 'Tú', next: 'Abrir siguiente ronda', play: 'Jugar esta carrera', rematch: 'Revancha', newRoom: 'Nueva sala', provisional: 'Clasificación provisional', winner: 'Ganador del desafío', draw: 'Empate', pendingRound: 'El organizador abre la siguiente ronda cuando todos terminan.', seriesDone: 'Desafío terminado', nextReady: 'La siguiente ronda está lista: pulsa «Jugar esta carrera».', waitPlayers: 'Invita al menos a un amigo: la carrera se enviará cuando seáis dos.', roundReady: 'Todos han terminado la ronda.', formula: 'Cada 10 goles o asistencias = 1 pto., según posición; temporada 2; liga 12; Champions 22; Mundial 25; copa continental 15; Balón de Oro 20. Carta: la media pesa doble y los seis atributos se comparan con las otras cartas de la ronda. Combinada: 70% carrera (400 ptos. = 100) + 30% duelo de cartas. Las series suman las tres rondas.', series: 'Serie', invalidSession: 'Sesión caducada: recarga y entra con el código.', serverOffline: 'Servidor de salas no disponible. Los resultados locales siguen guardados.', roomLocked: 'El desafío ya ha empezado: pide otro código.', roundPending: 'Primero deben terminar todos los participantes.', hostOnly: 'Solo el organizador puede abrir rondas y revanchas.', roomMissing: 'Sala no encontrada o caducada. Pide otro código.', roomFull: 'Sala llena: máximo 10 participantes.', resultError: 'Carrera no válida. Completa todas las ruletas de una partida nueva.', genericError: 'La operación falló. Inténtalo de nuevo.', copied: 'Código copiado.', identityLocked: 'Nombre y dorsal deben coincidir con la carrera actual.', retry: 'Reintentar envío' },
    fr: { intro: 'Ouvrez une salle avant de jouer et suivez les roues de vos amis en direct. Les carrières terminées sont envoyées automatiquement.', create: 'Créer une salle', join: 'Rejoindre la salle', created: 'Salle prête. Partagez le code et tournez les roues.', joined: 'Vous avez rejoint la salle. Votre carrière sera envoyée à la fin.', format: 'Format du défi', single: 'Une carrière', three: 'Trois carrières · points cumulés', threeNote: 'Trois carrières chacun : les points de carrière et les scores des duels de cartes s’additionnent à chaque manche. Le meilleur total gagne.', badIdentity: 'Saisissez nom et numéro de maillot (1–99) avant de rejoindre.', sent: 'Carrière envoyée automatiquement.', live: 'En direct', round: 'Manche', completed: 'carrières terminées', awaiting: 'En attente des amis', ready: 'Prêt à tourner', last: 'Dernier résultat', playing: 'En jeu', host: 'Organisateur', you: 'Vous', next: 'Ouvrir la prochaine manche', play: 'Jouer cette carrière', rematch: 'Revanche', newRoom: 'Nouvelle salle', provisional: 'Classement provisoire', winner: 'Vainqueur du défi', draw: 'Égalité', pendingRound: 'L’organisateur ouvre la prochaine manche quand tout le monde a terminé.', seriesDone: 'Défi terminé', nextReady: 'La prochaine manche est prête : appuyez sur « Jouer cette carrière ».', waitPlayers: 'Invitez au moins un ami : la carrière sera envoyée lorsque vous serez deux.', roundReady: 'Tout le monde a terminé cette manche.', formula: '10 buts ou passes décisives = 1 pt, selon le poste ; saison 2 ; championnat 12 ; Ligue des champions 22 ; Coupe du monde 25 ; coupe continentale 15 ; Ballon d’Or 20. Carte : note doublement pondérée et six attributs classés face aux autres cartes de la manche. Combiné : 70 % carrière (400 pts = 100) + 30 % duel de cartes. Une série additionne les trois manches.', series: 'Série', invalidSession: 'Session expirée : rechargez et rejoignez avec le code.', serverOffline: 'Serveur de salle inaccessible. Les résultats locaux restent enregistrés.', roomLocked: 'Le défi a déjà commencé : demandez un nouveau code.', roundPending: 'Tous les participants doivent terminer d’abord.', hostOnly: 'Seul l’organisateur peut ouvrir manches et revanches.', roomMissing: 'Salle introuvable ou expirée. Demandez un nouveau code.', roomFull: 'Salle pleine : 10 participants maximum.', resultError: 'Carrière non valide. Terminez les roues d’une nouvelle partie.', genericError: 'L’action a échoué. Réessayez.', copied: 'Code copié.', identityLocked: 'Nom et numéro doivent correspondre à la carrière en cours.', retry: 'Réessayer l’envoi' }
  };
  Object.keys(features).forEach(language => Object.assign(copy[language], features[language]));
  Object.assign(copy.it, { codePlaceholder: 'CODICE O LINK INVITO', codeLabel: 'Codice stanza o link invito', joinErrorNoCode: 'Inserisci un codice di 6 caratteri oppure un link invito valido.', playUnavailable: 'Attendi che il giro in corso finisca, poi riprova.' });
  Object.assign(copy.en, { codePlaceholder: 'CODE OR INVITE LINK', codeLabel: 'Room code or invite link', joinErrorNoCode: 'Enter a 6-character code or a valid invite link.', playUnavailable: 'Wait for the current spin to finish, then try again.' });
  Object.assign(copy.es, { codePlaceholder: 'CÓDIGO O ENLACE', codeLabel: 'Código de sala o enlace de invitación', joinErrorNoCode: 'Introduce un código de 6 caracteres o un enlace de invitación válido.', playUnavailable: 'Espera a que termine el giro actual y vuelve a intentarlo.' });
  Object.assign(copy.fr, { codePlaceholder: 'CODE OU LIEN D’INVITATION', codeLabel: 'Code de salle ou lien d’invitation', joinErrorNoCode: 'Saisissez un code de 6 caractères ou un lien d’invitation valide.', playUnavailable: 'Attendez la fin du tour en cours, puis réessayez.' });
  let roomCode = '', roomToken = '', playerId = '', pollTimer = 0, currentRoom = null, busy = false, sending = false, lastStatusKey = 'idle', latestSnapshot = null, syncTimer = 0, lastProgressKey = '', renderKey = '';
  let roomGeneration = 0, accountOwner = null, accountKnown = false;
  const pendingRequests = new Set();
  const currentOwner = () => accountKnown ? accountOwner : window.fcwAccount?.state?.().user?.id || null;
  const contextChanged = () => Object.assign(new Error('ROOM_CONTEXT_CHANGED'), { code: 'ROOM_CONTEXT_CHANGED' });
  const checkContext = generation => { if (generation !== roomGeneration || window.fcwAccountHydrating) throw contextChanged(); };
  const lang = () => document.documentElement.lang || 'it';
  const words = () => copy[lang()] || copy.it;
  const criterionName = criterion => (criterionLabels[criterion] || criterionLabels.combined)[lang()] || criterionLabels.combined.it;
  const text = (id, value) => { const element = byId(id); if (element) element.textContent = value; };
  const ownPlayer = () => currentRoom?.players.find(player => player.id === playerId);
  const getSnapshot = () => window.fcwExperience?.snapshot?.() || latestSnapshot;
  const roomState = () => ({ room: currentRoom, playerId, busy });
  const emitRoomState = () => window.dispatchEvent(new CustomEvent('fcw:room', { detail: roomState() }));
  const translate = value => window.fcwExperience?.translateLabel?.(value) || value;
  const status = (key, state = '') => { lastStatusKey = key; text('onlineRoomFeedback', words()[key] || words().genericError); byId('onlineRoomFeedback').dataset.state = state; byId('onlineRoomFeedback').dataset.status = key; };
  const errorKeys = { INVALID_IDENTITY: 'badIdentity', INVALID_SESSION: 'invalidSession', ROOM_NOT_FOUND: 'roomMissing', ROOM_LOCKED: 'roomLocked', ROOM_FULL: 'roomFull', HOST_ONLY: 'hostOnly', ROUND_PENDING: 'roundPending', SERIES_PENDING: 'roundPending', INVALID_RESULT: 'resultError', INVALID_PROGRESS: 'resultError', INCOMPLETE_RUN: 'resultError', IDENTITY_LOCKED: 'identityLocked', NEED_PLAYERS: 'waitPlayers', STALE_ROUND: 'nextReady' };
  const reportError = error => { if (error.code !== 'ROOM_CONTEXT_CHANGED') status(errorKeys[error.code] || (error instanceof TypeError ? 'serverOffline' : 'genericError'), 'error'); };
  function buildEnhancements() {
    const format = document.createElement('label'); format.className = 'online-room-format';
    const title = document.createElement('span'); title.id = 'onlineRoomFormatLabel';
    const select = document.createElement('select'); select.id = 'onlineRoomFormat';
    for (const value of [1, 3]) { const option = document.createElement('option'); option.value = value; select.append(option); }
    format.append(title, select); byId('onlineCreateRoom').before(format);
    const note = document.createElement('p'); note.id = 'onlineRoomFormatNote'; note.className = 'online-room-method'; byId('onlineRoomFeedback').before(note);
    const series = document.createElement('p'); series.id = 'onlineRoomSeriesStatus'; series.className = 'online-room-series-status'; series.setAttribute('role', 'status'); byId('onlineRoomLeaders').before(series);
    const actions = document.createElement('div'); actions.className = 'online-room-series-actions';
    const buttons = [['onlineRoomNextRound', () => advance('next')], ['onlineRoomPlayRound', playCareer], ['onlineRoomRematch', () => advance('rematch')], ['onlineRoomNew', () => { disconnectRoom(); byId('onlineCreateRoom').focus(); }]];
    buttons.forEach(([id, handler]) => { const button = document.createElement('button'); button.id = id; button.type = 'button'; button.className = 'online-room-secondary'; button.addEventListener('click', handler); actions.append(button); });
    byId('onlineRoomRefresh').after(actions);
    select.addEventListener('change', () => { byId('onlineRoomFormatNote').hidden = select.value !== '3'; });
  }
  function renderStatic() {
    const t = words();
    if (currentRoom) {
      byId('onlineRoomSelect').value = currentRoom.criterion;
      byId('onlineRoomFormat').value = String(currentRoom.rounds);
    }
    ['Title', 'Intro', 'CriterionLabel', 'CodeLabel', 'Formula'].forEach((suffix, index) => text('onlineRoom' + suffix, [t.title, t.intro, t.criterion, t.roomCode, t.formula][index]));
    text('onlineCreateRoom', t.create); text('onlineJoinRoom', t.join); text('onlineCopyRoomLink', t.copyLink); text('onlineCopyRoomCode', t.copyCode); text('onlineRoomRefresh', t.refresh);
    text('onlineRoomIdle', isLocalPreview ? t.localOnly : t.idle); text('onlineRoomFormatLabel', t.format); text('onlineRoomFormatNote', t.threeNote);
    text('onlineRoomNextRound', t.next); text('onlineRoomPlayRound', t.play); text('onlineRoomRematch', t.rematch); text('onlineRoomNew', t.newRoom);
    const options = byId('onlineRoomFormat').options; options[0].textContent = t.single; options[1].textContent = t.three;
    byId('onlineRoomFormatNote').hidden = byId('onlineRoomFormat').value !== '3' || Boolean(currentRoom);
    byId('onlineRoomCode').placeholder = t.codePlaceholder; byId('onlineRoomCode').setAttribute('aria-label', t.codeLabel); byId('onlineRoomInviteUrl').setAttribute('aria-label', t.inviteLabel); byId('onlineRoomLeaders').setAttribute('aria-label', t.leadersLabel);
    byId('onlineRoomSelect').querySelectorAll('option').forEach(option => { option.textContent = criterionName(option.value); });
    byId('onlineRoomSelect').disabled = Boolean(currentRoom); byId('onlineRoomFormat').disabled = Boolean(currentRoom);
    byId('onlineCreateRoom').disabled = busy || Boolean(currentRoom); byId('onlineJoinRoom').disabled = busy || Boolean(currentRoom);
    status(lastStatusKey, byId('onlineRoomFeedback').dataset.state); renderKey = ''; if (currentRoom) renderRoom(currentRoom); else { text('onlineRoomSummaryStatus', t.teaser); emitRoomState(); }
  }
  async function request(path, options = {}) {
    const generation = roomGeneration, controller = new AbortController();
    pendingRequests.add(controller);
    try {
      const response = await fetch(`${localRoomApi}${path}`, { ...options, signal: controller.signal, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
      const payload = await response.json().catch(() => ({}));
      if (generation !== roomGeneration) throw contextChanged();
      if (!response.ok) throw Object.assign(new Error(payload.error || 'SERVER_ERROR'), { code: payload.error });
      return payload;
    } catch (error) {
      if (generation !== roomGeneration) throw contextChanged();
      throw error;
    } finally { pendingRequests.delete(controller); }
  }
  function identity() {
    const current = getSnapshot()?.identity;
    const name = String(current?.name || byId('careerName')?.value || '').trim().slice(0, 24);
    const shirtNumber = Number(current?.shirtNumber || byId('shirtNumber')?.value);
    if (!name || !Number.isInteger(shirtNumber) || shirtNumber < 1 || shirtNumber > 99) throw Object.assign(new Error('INVALID_IDENTITY'), { code: 'INVALID_IDENTITY' });
    return { name, shirtNumber };
  }
  function sessionKey(code) { return `${storagePrefix}${code}:${currentOwner() || 'guest'}`; }
  function readSession(code) {
    try {
      const ownerId = currentOwner();
      const saved = JSON.parse(localStorage.getItem(sessionKey(code)) || localStorage.getItem(storagePrefix + code) || 'null');
      return saved && (saved.ownerId ?? null) === ownerId ? saved : null;
    } catch { return null; }
  }
  function storeSession(extra = {}) { try { localStorage.setItem(sessionKey(roomCode), JSON.stringify({ ...(readSession(roomCode) || {}), ownerId: currentOwner(), token: roomToken, playerId, ...extra })); } catch {} }
  function setInviteUrl(code) { const url = new URL(location.href); url.searchParams.set('room', code); history.replaceState(null, '', url); byId('onlineRoomInviteUrl').value = url.href; }
  function setRoomState(payload) {
    roomCode = payload.room.code; roomToken = payload.token || roomToken; playerId = payload.playerId || playerId; currentRoom = payload.room;
    byId('onlineRoomCode').value = roomCode; byId('onlineRoomLobby').hidden = false; byId('onlineRoomIdle').hidden = true;
    const own = ownPlayer(), state = getSnapshot();
    if (own && !state?.started && !state?.identity?.name) {
      byId('careerName').value = own.name;
      byId('shirtNumber').value = String(own.shirtNumber);
      byId('careerName').dispatchEvent(new Event('input', { bubbles: true }));
      byId('shirtNumber').dispatchEvent(new Event('input', { bubbles: true }));
    }
    setInviteUrl(roomCode); storeSession(); lastProgressKey = ''; renderStatic(); stopPolling(); pollTimer = window.setInterval(refreshRoom, 2500); queueSync();
  }
  async function createRoom() {
    if (window.fcwAccountHydrating || busy || currentRoom) return;
    const generation = roomGeneration;
    let player; try { player = identity(); } catch (error) { reportError(error); return; }
    busy = true; status('loading'); renderStatic();
    try { const payload = await request('/api/rooms', { method: 'POST', body: JSON.stringify({ ...player, criterion: byId('onlineRoomSelect').value, rounds: Number(byId('onlineRoomFormat').value) }) }); checkContext(generation); setRoomState(payload); status('created', 'success'); }
    catch (error) { reportError(error); }
    finally { if (generation === roomGeneration) { busy = false; renderStatic(); } }
  }
  async function joinRoom() {
    if (window.fcwAccountHydrating || busy || currentRoom) return;
    const generation = roomGeneration;
    let player; try { player = identity(); } catch (error) { reportError(error); return; }
    const code = parseRoomCode(byId('onlineRoomCode').value);
    if (!code) { status('joinErrorNoCode', 'error'); return; }
    busy = true; status('loading'); renderStatic();
    try {
      const saved = readSession(code); let payload;
      if (saved?.token && saved?.playerId) {
        const existing = await request(`/api/rooms/${code}`);
        checkContext(generation);
        if (existing.room.players.some(player => player.id === saved.playerId)) payload = { ...existing, token: saved.token, playerId: saved.playerId };
      }
      if (!payload) payload = await request(`/api/rooms/${code}/join`, { method: 'POST', body: JSON.stringify(player) });
      checkContext(generation);
      setRoomState(payload); status('joined', 'success');
    } catch (error) { reportError(error); }
    finally { if (generation === roomGeneration) { busy = false; renderStatic(); } }
  }
  function parseRoomCode(value) {
    const input = String(value || '').trim();
    if (/^[A-Z0-9]{6}$/i.test(input)) return input.toUpperCase();
    try {
      const url = new URL(input);
      const code = url.searchParams.get('room');
      return ['http:', 'https:'].includes(url.protocol) && code && /^[A-Z0-9]{6}$/i.test(code) ? code.toUpperCase() : '';
    } catch { return ''; }
  }
  function scoreValue(room, player) { return room.criterion === 'career' ? `${player.careerPoints.total} CP` : room.criterion === 'card' ? `${player.cardScore} C` : `${player.combinedScore} ${words().points}`; }
  function renderRoom(room) {
    if (!room) { currentRoom = null; renderKey = ''; emitRoomState(); return; }
    if (currentRoom?.code === room.code && room.updatedAt < currentRoom.updatedAt) return;
    currentRoom = room;
    const key = JSON.stringify(room) + lang() + String(busy) + playerId; if (renderKey === key) return; renderKey = key;
    const t = words(), own = ownPlayer();
    text('onlineRoomCodeValue', room.code); text('onlineRoomStatusline', `${room.players.length}/${room.capacity} · ${criterionName(room.criterion)} · ${t.round} ${room.round.number}/${room.rounds}`);
    text('onlineRoomSummaryStatus', `${t.live} · ${room.submittedCount}/${room.players.length} · ${t.round} ${room.round.number}/${room.rounds}`);
    const finish = room.complete ? `${room.tied ? t.draw : t.winner}: ${room.winners.map(player => player.name).join(' · ')}` : room.round.complete ? t.roundReady : room.players.length < 2 ? t.waitPlayers : t.provisional;
    text('onlineRoomSeriesStatus', finish); byId('onlineRoomSeriesStatus').dataset.complete = String(room.complete);
    const leaders = byId('onlineRoomLeaders'); leaders.replaceChildren();
    const submitted = room.players.filter(player => player.submitted);
    [[t.careerLeader, [...submitted].sort((a,b)=>b.careerPoints.total-a.careerPoints.total)[0], p=>`${p.careerPoints.total} CP`], [t.cardLeader, [...submitted].sort((a,b)=>b.cardScore-a.cardScore)[0], p=>`${p.cardScore} C`], [room.complete ? t.overallLeader : t.provisional, submitted[0], p=>scoreValue(room,p)]].forEach(([label, player, format]) => {
      const item = document.createElement('div'); item.className = 'online-room-leader';
      const small = document.createElement('small'); small.textContent = label;
      const strong = document.createElement('strong'); strong.textContent = player ? player.name : t.awaiting;
      const span = document.createElement('span'); span.textContent = player ? format(player) : '—'; item.append(small,strong,span); leaders.append(item);
    });
    const list = byId('onlineRoomPlayers'); list.replaceChildren();
    room.players.forEach(player => {
      const row = document.createElement('li'); row.className = 'online-room-player'; row.dataset.self = String(player.id === playerId);
      const rank = document.createElement('span'); rank.className = 'online-room-rank'; rank.textContent = player.rank ? `#${player.rank}` : '·';
      const body = document.createElement('span'); body.className = 'online-room-player-copy';
      const name = document.createElement('strong'); name.className = 'online-room-player-name'; name.textContent = `${player.name} · ${player.shirtNumber}${player.id === playerId ? ` · ${t.you}` : ''}${player.host ? ` · ${t.host}` : ''}`;
      const meta = document.createElement('small'); meta.className = 'online-room-player-meta'; const progress = player.progress;
      meta.textContent = player.submittedThisRound ? `${t.sent} · ${player.roundsCompleted}/${room.rounds}` : progress?.started ? `${t.playing} · ${progress.index}/${progress.total} · ${translate(progress.question)}` : t.ready;
      body.append(name,meta);
      if (progress?.started) {
        const meter = document.createElement('progress'); meter.className = 'online-room-live-meter'; meter.max = progress.total; meter.value = progress.index; meter.setAttribute('aria-label', `${player.name} · ${progress.index}/${progress.total}`); body.append(meter);
        if (progress.result) { const last = document.createElement('small'); last.className = 'online-room-last'; last.textContent = `${t.last}: ${translate(progress.result)}`; body.append(last); }
      }
      const score = document.createElement('strong'); score.className = 'online-room-score'; score.textContent = player.submitted ? scoreValue(room,player) : '—'; row.append(rank,body,score); list.append(row);
    });
    byId('onlineRoomNextRound').hidden = !own?.host || !room.round.complete || room.complete;
    byId('onlineRoomRematch').hidden = !own?.host || !room.complete;
    byId('onlineRoomNew').hidden = !room.complete;
    const snapshot = getSnapshot(); const sentRuns = readSession(roomCode)?.sentRuns || [];
    byId('onlineRoomPlayRound').hidden = room.complete || room.round.complete || own?.submittedThisRound || !(snapshot?.complete || snapshot?.demo || sentRuns.includes(snapshot?.runId));
    byId('onlineRoomPlayRound').disabled = busy;
    byId('onlineRoomNextRound').disabled = busy; byId('onlineRoomRematch').disabled = busy;
    if (!window.fcwAccountHydrating && !room.round.complete && own && snapshot?.complete && !snapshot.demo && !sentRuns.includes(snapshot.runId)) queueSync();
    emitRoomState();
  }
  function queueSync(snapshot) {
    if (window.fcwAccountHydrating) return;
    if (snapshot) latestSnapshot = snapshot;
    clearTimeout(syncTimer); syncTimer = window.setTimeout(syncCurrent, 180);
  }
  async function syncCurrent() {
    if (window.fcwAccountHydrating || sending || !currentRoom || !roomToken) return;
    const generation = roomGeneration;
    const snapshot = getSnapshot(); const own = ownPlayer(), saved = readSession(roomCode);
    if (!snapshot || snapshot.demo || snapshot.restored || own?.submittedThisRound || (saved?.sentRuns || []).includes(snapshot.runId)) return;
    let player; try { player = identity(); } catch { return; }
    const progress = { runId: snapshot.runId, started: snapshot.started, complete: snapshot.complete, demo: snapshot.demo, index: snapshot.completedSteps ?? snapshot.index, total: snapshot.total, question: snapshot.question, result: snapshot.result || snapshot.lastResult || '', group: snapshot.group || snapshot.context?.group || '', identity: player };
    const roundId = currentRoom.round.id, key = JSON.stringify(progress) + roundId; sending = true;
    try {
      if (key !== lastProgressKey) { const payload = await request(`/api/rooms/${roomCode}/progress`, { method: 'POST', body: JSON.stringify({ token: roomToken, roundId, progress }) }); checkContext(generation); lastProgressKey = key; renderRoom(payload.room); }
      if (!window.fcwAccountHydrating && generation === roomGeneration && snapshot.complete && snapshot.started && snapshot.playerResult && currentRoom?.players.length >= 2 && !ownPlayer()?.submittedThisRound) {
        const payload = await request(`/api/rooms/${roomCode}/result`, { method: 'POST', body: JSON.stringify({ token: roomToken, roundId, runId: snapshot.runId, result: snapshot.playerResult }) });
        checkContext(generation);
        storeSession({ sentRuns: [...new Set([...(saved?.sentRuns || []), snapshot.runId])].slice(-24) }); renderRoom(payload.room); status('sent', 'success');
      }
    } catch (error) { if (!['RUN_USED', 'ALREADY_SUBMITTED'].includes(error.code)) reportError(error); }
    finally { if (generation === roomGeneration) sending = false; }
  }
  async function advance(action) {
    if (window.fcwAccountHydrating || busy || !currentRoom) return;
    const generation = roomGeneration;
    busy = true; renderKey = ''; renderRoom(currentRoom);
    try { const payload = await request(`/api/rooms/${roomCode}/${action}`, { method: 'POST', body: JSON.stringify({ token: roomToken, roundId: currentRoom.round.id }) }); checkContext(generation); lastProgressKey = ''; renderRoom(payload.room); status('nextReady', 'success'); }
    catch (error) { reportError(error); }
    finally { if (generation === roomGeneration) { busy = false; renderKey = ''; renderRoom(currentRoom); } }
  }
  function playCareer() {
    if (window.fcwAccountHydrating) return false;
    const player = ownPlayer(); if (busy || !player || currentRoom.complete || currentRoom.round.complete || player.submittedThisRound) return false;
    let resetAccepted = false;
    try { resetAccepted = window.fcwExperience?.resetForRoom?.({ name: player.name, shirtNumber: player.shirtNumber }) === true; }
    catch { status('genericError', 'error'); return false; }
    if (!resetAccepted) { status('playUnavailable', 'error'); return false; }
    window.dispatchEvent(new CustomEvent('fcw:room-play', { detail: roomState() }));
    byId('careerGame')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    queueSync(); renderKey = ''; renderRoom(currentRoom);
    return true;
  }
  async function refreshRoom() {
    if (window.fcwAccountHydrating || !roomCode) return;
    const generation = roomGeneration;
    try { const payload = await request(`/api/rooms/${roomCode}`); checkContext(generation); renderRoom(payload.room); queueSync(); }
    catch (error) { reportError(error); if (error.code === 'ROOM_NOT_FOUND') stopPolling(); }
  }
  function stopPolling() { if (pollTimer) window.clearInterval(pollTimer); pollTimer = 0; }
  function disconnectRoom() {
    ++roomGeneration;
    clearTimeout(syncTimer); syncTimer = 0; stopPolling();
    pendingRequests.forEach(controller => controller.abort()); pendingRequests.clear();
    currentRoom = null; roomCode = ''; roomToken = ''; playerId = ''; busy = false; sending = false;
    latestSnapshot = null; lastProgressKey = ''; renderKey = ''; lastStatusKey = 'idle';
    byId('onlineRoomLobby').hidden = true; byId('onlineRoomIdle').hidden = false;
    byId('onlineRoomInviteUrl').value = '';
    byId('onlineRoomPlayers')?.replaceChildren(); byId('onlineRoomLeaders')?.replaceChildren();
    text('onlineRoomCodeValue', ''); text('onlineRoomSeriesStatus', '');
    const url = new URL(location.href); url.searchParams.delete('room'); history.replaceState(null, '', url);
    renderStatic();
  }
  async function copyText(value) { try { await navigator.clipboard.writeText(value); return true; } catch { const input = byId(value === roomCode ? 'onlineRoomCode' : 'onlineRoomInviteUrl'); input.focus(); input.select(); return false; } }
  async function inviteFriend(userId) {
    if (busy || window.fcwAccountSync?.isBusy() || getSnapshot()?.spinning) throw Object.assign(new Error('operation_busy'), {code:'operation_busy'});
    if (!currentRoom || !roomCode || !roomToken) throw Object.assign(new Error('game_room_session_invalid'), {code:'game_room_session_invalid'});
    const generation = roomGeneration;
    const response = await fetch('/api/friends/game-invites', {method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId,roomCode,roomToken}), signal:AbortSignal.timeout(15000)});
    const data = await response.json().catch(()=>({error:'server_unavailable'}));
    checkContext(generation);
    if (!response.ok || data.error) throw Object.assign(new Error(data.error || 'server_error'), {code:data.error || 'server_error'});
    return data;
  }
  window.fcwRoom = { getState: roomState, playCareer, inviteFriend, disconnect:disconnectRoom };
  buildEnhancements();
  byId('onlineCreateRoom').addEventListener('click', createRoom); byId('onlineJoinRoom').addEventListener('click', joinRoom);
  byId('onlineRoomCode').removeAttribute('maxlength');
  byId('onlineRoomCode').addEventListener('keydown', event => { if (event.key === 'Enter') joinRoom(); });
  byId('onlineRoomRefresh').addEventListener('click', refreshRoom);
  byId('onlineCopyRoomLink').addEventListener('click', async () => status(await copyText(byId('onlineRoomInviteUrl').value) ? 'copyDone' : 'copyError'));
  byId('onlineCopyRoomCode').addEventListener('click', async () => status(await copyText(roomCode) ? 'copied' : 'copyError'));
  byId('onlineRoomDisclosure').addEventListener('toggle', async event => { if (event.target.open) { if (roomCode) refreshRoom(); else try { await request('/api/health'); status('idle'); } catch { status('serverOffline', 'error'); } } });
  byId('languageSelect')?.addEventListener('change', () => window.setTimeout(renderStatic, 0));
  ['fcw:state', 'fcw:complete', 'fcw:reset'].forEach(event => window.addEventListener(event, event => { queueSync(event.detail); if (currentRoom) { renderKey = ''; renderRoom(currentRoom); } }));
  window.addEventListener('fcw:account', event => {
    if (event.detail?.action === 'nickname') return;
    const nextOwner = event.detail?.user?.id || null;
    if (!accountKnown || nextOwner !== accountOwner) disconnectRoom();
    accountOwner = nextOwner; accountKnown = true;
  });
  window.addEventListener('fcw:account-restore', () => { disconnectRoom(); });
  window.addEventListener('pagehide', stopPolling);
  const initialCode = new URL(location.href).searchParams.get('room');
  if (initialCode && /^[A-Z0-9]{6}$/i.test(initialCode)) {
    const code = initialCode.toUpperCase();
    byId('onlineRoomCode').value = code; byId('onlineRoomDisclosure').open = true;
    // Joining is explicit after the account cache has been restored; a prior owner's token never reconnects automatically.
  }
  renderStatic();
})();
