/* Account sessions and friendships are owned by the local Career Wheel server. */
(() => {
  'use strict';
  const copy = {
    it: {
      login:'Accedi', register:'Crea account', recover:'Recupera account', email:'Email', password:'Password', nickname:'Nickname', emailPlaceholder:'tu@email.com', passwordPlaceholder:'La tua password', nicknamePlaceholder:'Il tuo nome tra gli amici', newPassword:'Nuova password', passwordHint:'Almeno 12 caratteri.', nicknameHint:'Da 2 a 24 caratteri. Gli amici ti trovano con questo nome.', authNote:'Account e salvataggi restano sul server Career Wheel che stai usando. Puoi ritrovarli da un altro browser collegato allo stesso server.', offlineNote:'I progressi di questo browser restano disponibili anche senza account.', recoveryLink:'Hai dimenticato la password?', recoveryLabel:'Codice di recupero', recoveryPlaceholder:'Il codice salvato alla creazione dell’account', recoveryNote:'Usa il codice privato ricevuto quando hai creato l’account. Da questo server non vengono inviate email di recupero.', recoveryTitle:'Conserva il tuo codice di recupero', recoverySave:'Scarica codice', recoveryCopy:'Copia codice', recoveryCopied:'Codice copiato.', recoveryDownloaded:'Codice preparato per il download.', recoveryWarning:'Questo codice permette di recuperare l’account. Salvalo in un posto privato: viene mostrato solo adesso.', recoveryDone:'Ho salvato il codice', recoveryFile:'Career Wheel — codice privato di recupero', signedIn:'Account connesso', serverNote:'I dati dell’account sono conservati sul server. La sessione rimane attiva su questo browser.', saveNickname:'Salva nickname', sync:'Sincronizza ora', logout:'Esci', signedOut:'Disconnesso. I progressi di questo browser restano disponibili.', accountCreated:'Account creato.', loggedIn:'Accesso completato.', passwordReset:'Password aggiornata. Conserva il nuovo codice di recupero.', nicknameSaved:'Nickname aggiornato.', working:'Operazione in corso…', connecting:'Connessione al server…', syncing:'Sincronizzazione in corso…', synced:'Salvataggi sincronizzati.', syncUnavailable:'Sincronizzazione non disponibile. Riprova tra poco.', copyFailed:'Copia non riuscita. Puoi selezionare il codice oppure scaricarlo.', syncHelp:'Carriere, obiettivi e preferenze si sincronizzano con il tuo account su questo server.', friendsGate:'Crea un account oppure accedi per salvare i tuoi amici e ritrovarli quando torni.', openAccount:'Crea account o accedi', friendsNote:'Cerca un nickname o condividi il tuo link. L’amicizia viene salvata quando la richiesta è accettata.', copyInvite:'Copia link di amicizia', inviteCopied:'Link di amicizia copiato.', inviteManual:'Seleziona e copia il link qui sotto.', search:'Cerca', searchLabel:'Cerca un amico', searchPlaceholder:'Cerca nickname…', results:'Risultati', noResults:'Nessun giocatore trovato.', searchShort:'Scrivi almeno 2 caratteri per cercare un nickname.', savedFriends:n=>`Amici · ${n}`, incoming:n=>`Richieste ricevute · ${n}`, outgoing:n=>`Richieste inviate · ${n}`, emptyFriends:'Nessun amico ancora. Cerca un nickname e invia la prima richiesta.', add:'Aggiungi', accept:'Accetta', decline:'Rifiuta', cancel:'Annulla richiesta', remove:'Rimuovi', isFriend:'Amico', requestSent:'Richiesta inviata.', alreadySent:'In attesa', requestAccepted:'Amicizia salvata.', requestDeclined:'Richiesta rimossa.', friendRemoved:'Amico rimosso.', removeConfirm:n=>`Rimuovere ${n} dai tuoi amici?`, invited:'Invito di amicizia', inviteInvalid:'Questo invito non è valido oppure non è più disponibile.', inviteReady:'Puoi inviare una richiesta a questo giocatore.', errors:{invalid_email:'Inserisci un indirizzo email valido.',invalid_password:'Usa una password di almeno 12 caratteri.',invalid_nickname:'Il nickname deve avere da 2 a 24 caratteri.',email_taken:'Questa email ha già un account. Puoi accedere.',nickname_taken:'Questo nickname è già usato. Scegline un altro.',invalid_credentials:'Email o password non corrette.',invalid_recovery:'Email o codice di recupero non corretti.',invalid_recovery_code:'Email o codice di recupero non corretti.',unauthorized:'La sessione è scaduta. Accedi di nuovo.',rate_limited:'Troppi tentativi. Aspetta un momento e riprova.',not_found:'Il giocatore non è più disponibile.',self_request:'Non puoi aggiungere il tuo stesso account.',already_friends:'Questo giocatore è già tra i tuoi amici.',request_exists:'La richiesta è già stata inviata.',request_not_found:'Questa richiesta non è più disponibile.',invalid_invite:'Questo link di amicizia non è valido.',server_unavailable:'Il server degli account non risponde. Riprova quando è avviato.',network_error:'Non riesco a collegarmi al server degli account.',unknown:'Operazione non riuscita. Riprova.'}
    },
    en: {
      login:'Sign in', register:'Create account', recover:'Recover account', email:'Email', password:'Password', nickname:'Nickname', emailPlaceholder:'you@email.com', passwordPlaceholder:'Your password', nicknamePlaceholder:'Your name among friends', newPassword:'New password', passwordHint:'At least 12 characters.', nicknameHint:'2–24 characters. Friends find you by this name.', authNote:'Your account and saves stay on the Career Wheel server you are using. Access them from another browser connected to the same server.', offlineNote:'Progress in this browser remains available without an account.', recoveryLink:'Forgot your password?', recoveryLabel:'Recovery code', recoveryPlaceholder:'The code saved when you created your account', recoveryNote:'Use the private code received when you created your account. This server does not send recovery emails.', recoveryTitle:'Keep your recovery code', recoverySave:'Download code', recoveryCopy:'Copy code', recoveryCopied:'Code copied.', recoveryDownloaded:'Code prepared for download.', recoveryWarning:'This code can recover your account. Store it privately: it is only shown now.', recoveryDone:'I saved the code', recoveryFile:'Career Wheel — private recovery code', signedIn:'Account connected', serverNote:'Account data is stored on the server. Your session stays active in this browser.', saveNickname:'Save nickname', sync:'Sync now', logout:'Sign out', signedOut:'Signed out. Progress in this browser remains available.', accountCreated:'Account created.', loggedIn:'Signed in.', passwordReset:'Password updated. Keep the new recovery code.', nicknameSaved:'Nickname updated.', working:'Working…', connecting:'Connecting to the server…', syncing:'Syncing…', synced:'Saves synced.', syncUnavailable:'Sync is unavailable. Try again shortly.', copyFailed:'Copy failed. Select the code or download it.', syncHelp:'Careers, objectives and preferences sync with your account on this server.', friendsGate:'Create an account or sign in to save your friends and find them again when you return.', openAccount:'Create account or sign in', friendsNote:'Search a nickname or share your link. The friendship is saved after the request is accepted.', copyInvite:'Copy friendship link', inviteCopied:'Friendship link copied.', inviteManual:'Select and copy the link below.', search:'Search', searchLabel:'Find a friend', searchPlaceholder:'Search nickname…', results:'Results', noResults:'No player found.', searchShort:'Enter at least 2 characters to search a nickname.', savedFriends:n=>`Friends · ${n}`, incoming:n=>`Received requests · ${n}`, outgoing:n=>`Sent requests · ${n}`, emptyFriends:'No friends yet. Search a nickname and send your first request.', add:'Add', accept:'Accept', decline:'Decline', cancel:'Cancel request', remove:'Remove', isFriend:'Friend', requestSent:'Request sent.', alreadySent:'Pending', requestAccepted:'Friendship saved.', requestDeclined:'Request removed.', friendRemoved:'Friend removed.', removeConfirm:n=>`Remove ${n} from your friends?`, invited:'Friendship invitation', inviteInvalid:'This invitation is invalid or no longer available.', inviteReady:'You can send a request to this player.', errors:{invalid_email:'Enter a valid email address.',invalid_password:'Use a password with at least 12 characters.',invalid_nickname:'Your nickname must have 2–24 characters.',email_taken:'This email already has an account. You can sign in.',nickname_taken:'This nickname is taken. Choose another.',invalid_credentials:'Incorrect email or password.',invalid_recovery:'Incorrect email or recovery code.',invalid_recovery_code:'Incorrect email or recovery code.',unauthorized:'Your session expired. Sign in again.',rate_limited:'Too many attempts. Wait a moment and try again.',not_found:'This player is no longer available.',self_request:'You cannot add your own account.',already_friends:'This player is already your friend.',request_exists:'The request has already been sent.',request_not_found:'This request is no longer available.',invalid_invite:'This friendship link is invalid.',server_unavailable:'The account server is not responding. Try again when it is running.',network_error:'Unable to connect to the account server.',unknown:'The action failed. Try again.'}
    },
    es: {
      login:'Acceder', register:'Crear cuenta', recover:'Recuperar cuenta', email:'Email', password:'Contraseña', nickname:'Apodo', emailPlaceholder:'tu@email.com', passwordPlaceholder:'Tu contraseña', nicknamePlaceholder:'Tu nombre entre amigos', newPassword:'Nueva contraseña', passwordHint:'Al menos 12 caracteres.', nicknameHint:'Entre 2 y 24 caracteres. Tus amigos te encuentran con este nombre.', authNote:'La cuenta y las partidas se guardan en el servidor Career Wheel que estás usando. Puedes recuperarlas desde otro navegador conectado al mismo servidor.', offlineNote:'El progreso de este navegador sigue disponible sin cuenta.', recoveryLink:'¿Olvidaste la contraseña?', recoveryLabel:'Código de recuperación', recoveryPlaceholder:'El código guardado al crear tu cuenta', recoveryNote:'Usa el código privado recibido al crear tu cuenta. Este servidor no envía emails de recuperación.', recoveryTitle:'Conserva tu código de recuperación', recoverySave:'Descargar código', recoveryCopy:'Copiar código', recoveryCopied:'Código copiado.', recoveryDownloaded:'Código preparado para descargar.', recoveryWarning:'Este código permite recuperar la cuenta. Guárdalo en un lugar privado: solo se muestra ahora.', recoveryDone:'He guardado el código', recoveryFile:'Career Wheel — código privado de recuperación', signedIn:'Cuenta conectada', serverNote:'Los datos de la cuenta se guardan en el servidor. La sesión permanece activa en este navegador.', saveNickname:'Guardar apodo', sync:'Sincronizar ahora', logout:'Salir', signedOut:'Sesión cerrada. El progreso de este navegador sigue disponible.', accountCreated:'Cuenta creada.', loggedIn:'Sesión iniciada.', passwordReset:'Contraseña actualizada. Conserva el nuevo código de recuperación.', nicknameSaved:'Apodo actualizado.', working:'Operación en curso…', connecting:'Conectando al servidor…', syncing:'Sincronizando…', synced:'Partidas sincronizadas.', syncUnavailable:'La sincronización no está disponible. Inténtalo en un momento.', copyFailed:'No se ha podido copiar. Selecciona el código o descárgalo.', syncHelp:'Las carreras, objetivos y preferencias se sincronizan con tu cuenta en este servidor.', friendsGate:'Crea una cuenta o accede para guardar tus amigos y volver a encontrarlos cuando regreses.', openAccount:'Crear cuenta o acceder', friendsNote:'Busca un apodo o comparte tu enlace. La amistad se guarda al aceptar la solicitud.', copyInvite:'Copiar enlace de amistad', inviteCopied:'Enlace de amistad copiado.', inviteManual:'Selecciona y copia el enlace de abajo.', search:'Buscar', searchLabel:'Buscar un amigo', searchPlaceholder:'Buscar apodo…', results:'Resultados', noResults:'No se ha encontrado ningún jugador.', searchShort:'Escribe al menos 2 caracteres para buscar un apodo.', savedFriends:n=>`Amigos · ${n}`, incoming:n=>`Solicitudes recibidas · ${n}`, outgoing:n=>`Solicitudes enviadas · ${n}`, emptyFriends:'Todavía no hay amigos. Busca un apodo y envía tu primera solicitud.', add:'Añadir', accept:'Aceptar', decline:'Rechazar', cancel:'Cancelar solicitud', remove:'Eliminar', isFriend:'Amigo', requestSent:'Solicitud enviada.', alreadySent:'Pendiente', requestAccepted:'Amistad guardada.', requestDeclined:'Solicitud eliminada.', friendRemoved:'Amigo eliminado.', removeConfirm:n=>`¿Eliminar a ${n} de tus amigos?`, invited:'Invitación de amistad', inviteInvalid:'Esta invitación no es válida o ya no está disponible.', inviteReady:'Puedes enviar una solicitud a este jugador.', errors:{invalid_email:'Introduce un email válido.',invalid_password:'Usa una contraseña de al menos 12 caracteres.',invalid_nickname:'El apodo debe tener entre 2 y 24 caracteres.',email_taken:'Este email ya tiene cuenta. Puedes acceder.',nickname_taken:'Este apodo ya está en uso. Elige otro.',invalid_credentials:'Email o contraseña incorrectos.',invalid_recovery:'Email o código de recuperación incorrectos.',invalid_recovery_code:'Email o código de recuperación incorrectos.',unauthorized:'La sesión ha caducado. Accede de nuevo.',rate_limited:'Demasiados intentos. Espera un momento y vuelve a intentarlo.',not_found:'Este jugador ya no está disponible.',self_request:'No puedes añadir tu propia cuenta.',already_friends:'Este jugador ya es tu amigo.',request_exists:'La solicitud ya se ha enviado.',request_not_found:'Esta solicitud ya no está disponible.',invalid_invite:'Este enlace de amistad no es válido.',server_unavailable:'El servidor de cuentas no responde. Inténtalo cuando esté iniciado.',network_error:'No se puede conectar al servidor de cuentas.',unknown:'La operación ha fallado. Vuelve a intentarlo.'}
    },
    fr: {
      login:'Se connecter', register:'Créer un compte', recover:'Récupérer le compte', email:'Email', password:'Mot de passe', nickname:'Pseudo', emailPlaceholder:'vous@email.com', passwordPlaceholder:'Votre mot de passe', nicknamePlaceholder:'Votre nom entre amis', newPassword:'Nouveau mot de passe', passwordHint:'Au moins 12 caractères.', nicknameHint:'De 2 à 24 caractères. Vos amis vous trouvent avec ce nom.', authNote:'Le compte et les sauvegardes restent sur le serveur Career Wheel que vous utilisez. Retrouvez-les depuis un autre navigateur connecté au même serveur.', offlineNote:'La progression de ce navigateur reste disponible sans compte.', recoveryLink:'Mot de passe oublié ?', recoveryLabel:'Code de récupération', recoveryPlaceholder:'Le code conservé lors de la création du compte', recoveryNote:'Utilisez le code privé reçu lors de la création du compte. Ce serveur n’envoie pas d’emails de récupération.', recoveryTitle:'Conservez votre code de récupération', recoverySave:'Télécharger le code', recoveryCopy:'Copier le code', recoveryCopied:'Code copié.', recoveryDownloaded:'Code prêt à télécharger.', recoveryWarning:'Ce code permet de récupérer votre compte. Gardez-le en lieu privé : il est affiché uniquement maintenant.', recoveryDone:'J’ai conservé le code', recoveryFile:'Career Wheel — code privé de récupération', signedIn:'Compte connecté', serverNote:'Les données du compte sont conservées sur le serveur. La session reste active dans ce navigateur.', saveNickname:'Enregistrer le pseudo', sync:'Synchroniser', logout:'Se déconnecter', signedOut:'Déconnecté. La progression de ce navigateur reste disponible.', accountCreated:'Compte créé.', loggedIn:'Connexion réussie.', passwordReset:'Mot de passe modifié. Conservez le nouveau code de récupération.', nicknameSaved:'Pseudo mis à jour.', working:'Opération en cours…', connecting:'Connexion au serveur…', syncing:'Synchronisation…', synced:'Sauvegardes synchronisées.', syncUnavailable:'Synchronisation indisponible. Réessayez dans un moment.', copyFailed:'Copie impossible. Sélectionnez le code ou téléchargez-le.', syncHelp:'Carrières, objectifs et préférences se synchronisent avec votre compte sur ce serveur.', friendsGate:'Créez un compte ou connectez-vous pour conserver vos amis et les retrouver à votre retour.', openAccount:'Créer un compte ou se connecter', friendsNote:'Cherchez un pseudo ou partagez votre lien. L’amitié est conservée lorsque la demande est acceptée.', copyInvite:'Copier le lien d’amitié', inviteCopied:'Lien d’amitié copié.', inviteManual:'Sélectionnez et copiez le lien ci-dessous.', search:'Rechercher', searchLabel:'Trouver un ami', searchPlaceholder:'Chercher un pseudo…', results:'Résultats', noResults:'Aucun joueur trouvé.', searchShort:'Saisissez au moins 2 caractères pour chercher un pseudo.', savedFriends:n=>`Amis · ${n}`, incoming:n=>`Demandes reçues · ${n}`, outgoing:n=>`Demandes envoyées · ${n}`, emptyFriends:'Aucun ami pour le moment. Cherchez un pseudo et envoyez votre première demande.', add:'Ajouter', accept:'Accepter', decline:'Refuser', cancel:'Annuler la demande', remove:'Retirer', isFriend:'Ami', requestSent:'Demande envoyée.', alreadySent:'En attente', requestAccepted:'Amitié enregistrée.', requestDeclined:'Demande retirée.', friendRemoved:'Ami retiré.', removeConfirm:n=>`Retirer ${n} de vos amis ?`, invited:'Invitation d’amitié', inviteInvalid:'Cette invitation est invalide ou n’est plus disponible.', inviteReady:'Vous pouvez envoyer une demande à ce joueur.', errors:{invalid_email:'Saisissez une adresse email valide.',invalid_password:'Utilisez un mot de passe d’au moins 12 caractères.',invalid_nickname:'Le pseudo doit avoir de 2 à 24 caractères.',email_taken:'Cette adresse a déjà un compte. Vous pouvez vous connecter.',nickname_taken:'Ce pseudo est déjà utilisé. Choisissez-en un autre.',invalid_credentials:'Email ou mot de passe incorrect.',invalid_recovery:'Email ou code de récupération incorrect.',invalid_recovery_code:'Email ou code de récupération incorrect.',unauthorized:'Votre session a expiré. Connectez-vous à nouveau.',rate_limited:'Trop de tentatives. Attendez un moment et réessayez.',not_found:'Ce joueur n’est plus disponible.',self_request:'Vous ne pouvez pas ajouter votre propre compte.',already_friends:'Ce joueur est déjà votre ami.',request_exists:'La demande a déjà été envoyée.',request_not_found:'Cette demande n’est plus disponible.',invalid_invite:'Ce lien d’amitié est invalide.',server_unavailable:'Le serveur des comptes ne répond pas. Réessayez lorsqu’il est lancé.',network_error:'Impossible de joindre le serveur des comptes.',unknown:'L’opération a échoué. Réessayez.'}
    }
  };
  const conflictCopy = {
    it:{conflictTitle:'Scegli quale versione continuare',conflictHelp:'Le due versioni sono conservate. Carriere archiviate e obiettivi sono già stati uniti; scegli quale carriera in corso e quali preferenze usare.',useLocal:'Usa questo browser',useRemote:'Usa salvataggi server',backupConflict:'Scarica backup',backupReady:'Backup delle due versioni preparato per il download.'},
    en:{conflictTitle:'Choose which version to continue',conflictHelp:'Both versions are kept. Archived careers and objectives have already been merged; choose which active career and preferences to use.',useLocal:'Use this browser',useRemote:'Use server saves',backupConflict:'Download backup',backupReady:'A backup of both versions is ready to download.'},
    es:{conflictTitle:'Elige qué versión continuar',conflictHelp:'Se conservan las dos versiones. Las carreras archivadas y los objetivos ya se han unido; elige qué carrera en curso y preferencias usar.',useLocal:'Usar este navegador',useRemote:'Usar partidas del servidor',backupConflict:'Descargar copia',backupReady:'La copia de las dos versiones está preparada para descargar.'},
    fr:{conflictTitle:'Choisissez la version à continuer',conflictHelp:'Les deux versions sont conservées. Les carrières archivées et les objectifs ont déjà été fusionnés ; choisissez la carrière en cours et les préférences à utiliser.',useLocal:'Utiliser ce navigateur',useRemote:'Utiliser les sauvegardes serveur',backupConflict:'Télécharger la sauvegarde',backupReady:'La sauvegarde des deux versions est prête à télécharger.'}
  };
  Object.keys(copy).forEach(language=>Object.assign(copy[language],conflictCopy[language]));
  const gameCopy = {
    it:{gameInvites:n=>`Inviti a giocare · ${n}`,gameInvite:'Invita a giocare',gameInvited:'Invito inviato',gameInviteSent:'Invito inviato. Il tuo amico lo trova qui in “Amici”.',gameInviteDeclined:'Invito rimosso.',gameCreate:'Crea stanza',gameCreateHint:'Crea una stanza privata per invitare i tuoi amici a girare le ruote insieme.',gameRoom:code=>`Stanza ${code}`,gameRoomHint:'Invita un amico dalla lista. Ognuno gioca la propria carriera nella stessa sfida.',gameFrom:name=>`${name} ti invita a giocare`,gameExpires:time=>`Scade alle ${time}`,gameAccept:'Accetta invito',gameOpen:'Apri stanza',gameDecline:'Rifiuta',gameAccepted:'Invito accettato',game_room_not_found:'La stanza non è più disponibile. Chiedi un nuovo invito.',game_room_locked:'La sfida è già iniziata. Chiedi un nuovo invito.',game_room_full:'La stanza è piena.',game_room_session_invalid:'Riapri la tua stanza prima di invitare un amico.',game_invite_not_found:'Questo invito non è più disponibile.',game_invite_expired:'Questo invito è scaduto. Chiedi un nuovo invito.',game_invite_limit:'Hai già inviato molti inviti. Aspetta un momento e riprova.',game_room_active:'Sei già in un’altra stanza. Apri Online e premi “Nuova stanza” prima di accettare questo invito.'},
    en:{gameInvites:n=>`Game invitations · ${n}`,gameInvite:'Invite to play',gameInvited:'Invitation sent',gameInviteSent:'Invitation sent. Your friend will find it here in “Friends”.',gameInviteDeclined:'Invitation removed.',gameCreate:'Create room',gameCreateHint:'Create a private room to invite your friends and spin the wheels together.',gameRoom:code=>`Room ${code}`,gameRoomHint:'Invite a friend from your list. Each player builds a career in the same challenge.',gameFrom:name=>`${name} invites you to play`,gameExpires:time=>`Expires at ${time}`,gameAccept:'Accept invitation',gameOpen:'Open room',gameDecline:'Decline',gameAccepted:'Invitation accepted',game_room_not_found:'This room is no longer available. Ask for a new invitation.',game_room_locked:'The challenge has already started. Ask for a new invitation.',game_room_full:'The room is full.',game_room_session_invalid:'Reopen your room before inviting a friend.',game_invite_not_found:'This invitation is no longer available.',game_invite_expired:'This invitation has expired. Ask for a new one.',game_invite_limit:'You have already sent many invitations. Wait a moment and try again.',game_room_active:'You are already in another room. Open Online and press “New room” before accepting this invitation.'},
    es:{gameInvites:n=>`Invitaciones a jugar · ${n}`,gameInvite:'Invitar a jugar',gameInvited:'Invitación enviada',gameInviteSent:'Invitación enviada. Tu amigo la encontrará aquí, en “Amigos”.',gameInviteDeclined:'Invitación eliminada.',gameCreate:'Crear sala',gameCreateHint:'Crea una sala privada para invitar a tus amigos y girar las ruletas juntos.',gameRoom:code=>`Sala ${code}`,gameRoomHint:'Invita a un amigo de tu lista. Cada jugador crea una carrera en el mismo reto.',gameFrom:name=>`${name} te invita a jugar`,gameExpires:time=>`Caduca a las ${time}`,gameAccept:'Aceptar invitación',gameOpen:'Abrir sala',gameDecline:'Rechazar',gameAccepted:'Invitación aceptada',game_room_not_found:'Esta sala ya no está disponible. Pide una nueva invitación.',game_room_locked:'El reto ya ha empezado. Pide una nueva invitación.',game_room_full:'La sala está llena.',game_room_session_invalid:'Vuelve a abrir tu sala antes de invitar a un amigo.',game_invite_not_found:'Esta invitación ya no está disponible.',game_invite_expired:'Esta invitación ha caducado. Pide otra.',game_invite_limit:'Ya has enviado muchas invitaciones. Espera un momento y vuelve a intentarlo.',game_room_active:'Ya estás en otra sala. Abre Online y pulsa “Nueva sala” antes de aceptar esta invitación.'},
    fr:{gameInvites:n=>`Invitations à jouer · ${n}`,gameInvite:'Inviter à jouer',gameInvited:'Invitation envoyée',gameInviteSent:'Invitation envoyée. Votre ami la retrouvera ici, dans “Amis”.',gameInviteDeclined:'Invitation retirée.',gameCreate:'Créer une salle',gameCreateHint:'Créez une salle privée pour inviter vos amis et faire tourner les roues ensemble.',gameRoom:code=>`Salle ${code}`,gameRoomHint:'Invitez un ami de votre liste. Chaque joueur crée une carrière dans le même défi.',gameFrom:name=>`${name} vous invite à jouer`,gameExpires:time=>`Expire à ${time}`,gameAccept:'Accepter l’invitation',gameOpen:'Ouvrir la salle',gameDecline:'Refuser',gameAccepted:'Invitation acceptée',game_room_not_found:'Cette salle n’est plus disponible. Demandez une nouvelle invitation.',game_room_locked:'Le défi a déjà commencé. Demandez une nouvelle invitation.',game_room_full:'La salle est pleine.',game_room_session_invalid:'Rouvrez votre salle avant d’inviter un ami.',game_invite_not_found:'Cette invitation n’est plus disponible.',game_invite_expired:'Cette invitation a expiré. Demandez-en une autre.',game_invite_limit:'Vous avez déjà envoyé beaucoup d’invitations. Attendez un moment et réessayez.',game_room_active:'Vous êtes déjà dans une autre salle. Ouvrez En ligne et appuyez sur “Nouvelle salle” avant d’accepter cette invitation.'}
  };
  Object.keys(copy).forEach(language=>{Object.assign(copy[language],gameCopy[language]);Object.assign(copy[language].errors,gameCopy[language]);});
  const transferCopy = {
    it:{transfer:'Trasferisci progressi',transferNote:'Scarica una copia delle tue carriere, obiettivi e preferenze per ritrovarli in un altro browser. Conserva il file in un posto privato.',exportProgress:'Scarica progressi',importProgress:'Importa progressi',progressExported:'Copia dei progressi preparata per il download.',progressImported:'Progressi importati.',invalid_backup:'Questo file non è una copia valida dei progressi di Career Wheel.',transfer_conflict:'Questi progressi non possono essere uniti automaticamente. Scarica una copia dei progressi attuali prima di continuare.'},
    en:{transfer:'Transfer progress',transferNote:'Download a copy of your careers, objectives and preferences to restore them in another browser. Keep the file private.',exportProgress:'Download progress',importProgress:'Import progress',progressExported:'Progress backup prepared for download.',progressImported:'Progress imported.',invalid_backup:'This file is not a valid Career Wheel progress backup.',transfer_conflict:'This progress cannot be merged automatically. Download a backup of your current progress before continuing.'},
    es:{transfer:'Transferir progreso',transferNote:'Descarga una copia de tus carreras, objetivos y preferencias para recuperarlos en otro navegador. Guarda el archivo en un lugar privado.',exportProgress:'Descargar progreso',importProgress:'Importar progreso',progressExported:'Copia del progreso preparada para descargar.',progressImported:'Progreso importado.',invalid_backup:'Este archivo no es una copia válida del progreso de Career Wheel.',transfer_conflict:'Este progreso no se puede combinar automáticamente. Descarga una copia del progreso actual antes de continuar.'},
    fr:{transfer:'Transférer la progression',transferNote:'Téléchargez une copie de vos carrières, objectifs et préférences pour les retrouver dans un autre navigateur. Conservez ce fichier en lieu privé.',exportProgress:'Télécharger la progression',importProgress:'Importer la progression',progressExported:'Sauvegarde de la progression prête à télécharger.',progressImported:'Progression importée.',invalid_backup:'Ce fichier n’est pas une sauvegarde valide de la progression Career Wheel.',transfer_conflict:'Cette progression ne peut pas être fusionnée automatiquement. Téléchargez une sauvegarde de votre progression actuelle avant de continuer.'}
  };
  Object.keys(copy).forEach(language=>{Object.assign(copy[language],transferCopy[language]);Object.assign(copy[language].errors,transferCopy[language]);});
  const extraCopy = {
    it:{syncConflict:'I salvataggi sono cambiati da un altro browser. Premi “Sincronizza ora” per riprovare senza sovrascriverli.',savedAt:'Ultima sincronizzazione',server_error:'Il server non ha completato l’operazione. Riprova.',storage_unavailable:'Il server non riesce a salvare i dati. Riprova tra poco.',friend_limit:'Hai raggiunto il limite di amici.',friend_request_pending:'Questo giocatore ti ha già inviato una richiesta. Puoi accettarla qui.',invalid_snapshot:'Non riesco a sincronizzare questi salvataggi. I dati nel browser restano disponibili.',operation_busy:'Aspetta che il giro della ruota o il salvataggio finisca, poi riprova.'},
    en:{syncConflict:'Saves changed in another browser. Press “Sync now” to retry without overwriting them.',savedAt:'Last sync',server_error:'The server could not complete the action. Try again.',storage_unavailable:'The server cannot save data. Try again shortly.',friend_limit:'You reached the friend limit.',friend_request_pending:'This player has already sent you a request. You can accept it here.',invalid_snapshot:'These saves could not be synced. Your browser data remains available.',operation_busy:'Wait for the wheel spin or save to finish, then try again.'},
    es:{syncConflict:'Las partidas cambiaron en otro navegador. Pulsa “Sincronizar ahora” para volver a intentarlo sin sobrescribirlas.',savedAt:'Última sincronización',server_error:'El servidor no ha completado la operación. Vuelve a intentarlo.',storage_unavailable:'El servidor no puede guardar los datos. Inténtalo en un momento.',friend_limit:'Has alcanzado el límite de amigos.',friend_request_pending:'Este jugador ya te ha enviado una solicitud. Puedes aceptarla aquí.',invalid_snapshot:'No se pueden sincronizar estas partidas. Los datos del navegador siguen disponibles.',operation_busy:'Espera a que termine el giro de la ruleta o el guardado y vuelve a intentarlo.'},
    fr:{syncConflict:'Les sauvegardes ont changé dans un autre navigateur. Appuyez sur “Synchroniser” pour réessayer sans les écraser.',savedAt:'Dernière synchronisation',server_error:'Le serveur n’a pas terminé l’opération. Réessayez.',storage_unavailable:'Le serveur ne peut pas conserver les données. Réessayez dans un moment.',friend_limit:'Vous avez atteint la limite d’amis.',friend_request_pending:'Ce joueur vous a déjà envoyé une demande. Vous pouvez l’accepter ici.',invalid_snapshot:'Ces sauvegardes ne peuvent pas être synchronisées. Les données du navigateur restent disponibles.',operation_busy:'Attendez la fin du tour de roue ou de la sauvegarde, puis réessayez.'}
  };
  Object.keys(copy).forEach(language=>{Object.assign(copy[language],extraCopy[language]);Object.assign(copy[language].errors,extraCopy[language],{revision_conflict:extraCopy[language].syncConflict});});
  const roomBusyCopy={it:'La stanza si sta aggiornando. Riprova tra un momento.',en:'The room is updating. Try again shortly.',es:'La sala se está actualizando. Inténtalo en un momento.',fr:'La salle se met à jour. Réessayez dans un moment.'};
  Object.keys(copy).forEach(language=>copy[language].errors.game_room_busy=roomBusyCopy[language]);
  const aliases = {password_too_short:'invalid_password',password_required:'invalid_password',nickname_invalid:'invalid_nickname',email_exists:'email_taken',nickname_exists:'nickname_taken',authentication_required:'unauthorized',auth_required:'unauthorized',invalid_session:'unauthorized',invalid_recovery_code:'invalid_recovery',too_many_requests:'rate_limited',user_not_found:'not_found',friend_not_found:'not_found',cannot_add_self:'self_request',friend_request_exists:'request_exists',friend_request_not_found:'request_not_found'};
  const w = () => copy[document.documentElement.lang] || copy.it;
  const node = (tag, cls='', text='') => {const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
  const btn = (cls='', handler) => {const b=node('button',`cw-action ${cls}`);b.type='button';if(handler)b.addEventListener('click',handler);return b;};
  const status = () => {const s=node('p','cw-form-status');s.setAttribute('role','status');s.setAttribute('aria-live','polite');return s;};
  const field = (id,type,autocomplete) => {const l=node('label','cw-field'),label=node('span'),input=node('input'),hint=node('small');input.id=id;input.type=type;input.autocomplete=autocomplete;l.htmlFor=id;l.append(label,input,hint);return {wrap:l,label,input,hint};};
  let accountUI, friendsUI, user=null, revision=0, sessionReady=false, sessionLoading=false, authBusy=false, friendsBusy=false, friendsLoading=false, friendsGeneration=0, friendsPoll=0, friendsWasVisible=false, mode='login', recoveryCode='', authMessage=null, friendMessage=null, syncState=null, friends={friends:[],incoming:[],outgoing:[],inviteCode:'',gameInvites:{incoming:[],outgoing:[]}}, results=null, invitedUsers=null;
  const invitation = new URLSearchParams(location.search).get('friend') || '';
  const textStatus = (target,value) => {target.textContent=value?.error ? errorText(value.error) : value?.key ? w()[value.key] || '' : '';target.dataset.state=value?.error?'error':value?.kind || 'success';};
  const errorText = code => w().errors[aliases[code] || code] || w().errors.unknown;
  async function api(path, payload) {
    let response;const requestUser=user?.id;
    try {response=await fetch(path,{method:payload===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(15000),headers:payload===undefined?{'Accept':'application/json'}:{'Accept':'application/json','Content-Type':'application/json'},...(payload===undefined?{}:{body:JSON.stringify(payload)})});}
    catch {throw Object.assign(new Error('network_error'),{code:'network_error'});}
    let data;
    try {data=await response.json();} catch {throw Object.assign(new Error('server_unavailable'),{code:'server_unavailable'});}
    if(!response.ok || data.error) {
      const code=data.error || 'unknown';
      if(response.status===401 && user&&user.id===requestUser){setUser(null);authMessage={error:'unauthorized'};}
      throw Object.assign(new Error(code),{code});
    }
    return data;
  }
  function setUser(next, nextRevision=0, action='session') {
    const previous=user?.id;
    user=next || null;revision=Number(nextRevision)||0;sessionReady=true;
    if(previous!==user?.id){if(previous)recoveryCode='';friendsGeneration++;friendsLoading=false;friendsBusy=false;stopFriendsPolling();friends={friends:[],incoming:[],outgoing:[],inviteCode:'',gameInvites:{incoming:[],outgoing:[]}};results=null;invitedUsers=null;friendMessage=null;syncState=null;if(accountUI){accountUI.profileNickname.input.value=user?.nickname || '';accountUI.profileNickname.input.dataset.dirty='';}}
    render();
    window.dispatchEvent(new CustomEvent('fcw:account',{detail:{user:user?{...user}:null,revision,action}}));
    if(user)refreshFriends();
  }
  async function refresh() {
    if(sessionLoading)return state();sessionLoading=true;
    try {const data=await api('/api/account/session');if(authMessage?.error==='server_unavailable'||authMessage?.error==='network_error')authMessage=null;setUser(data.user,data.revision);}
    catch(error){sessionReady=true;authMessage={error:error.code};render();window.dispatchEvent(new CustomEvent('fcw:account-unavailable',{detail:{error:error.code||'unknown'}}));}
    finally {sessionLoading=false;}
    return state();
  }
  function selectMode(next) {
    if(authBusy)return;
    mode=next;authMessage=null;
    if(accountUI){accountUI.password.input.value='';accountUI.recovery.input.value='';}
    render();
    accountUI?.email.input.focus({preventScroll:true});
  }
  async function submitAuth(event) {
    event.preventDefault();if(authBusy)return;
    if(!accountUI.form.reportValidity())return;
    const email=accountUI.email.input.value.trim(),password=accountUI.password.input.value;
    authBusy=true;authMessage={key:'working',kind:'pending'};render();
    try {
      await window.fcwAccountSync?.beforeAuth?.();
      const path=mode==='register'?'register':mode==='recover'?'recovery-reset':'login';
      const body=mode==='register'?{email,password,nickname:accountUI.nickname.input.value.trim(),snapshot:window.fcwAccountSync?.prepareRegistration()}:mode==='recover'?{email,recoveryCode:accountUI.recovery.input.value.trim(),newPassword:password}:{email,password};
      const data=await api(`/api/account/${path}`,body);
      recoveryCode=typeof data.recoveryCode==='string'?data.recoveryCode:'';
      authMessage={key:mode==='register'?'accountCreated':mode==='recover'?'passwordReset':'loggedIn'};
      accountUI.password.input.value='';accountUI.recovery.input.value='';
      setUser(data.user,data.revision,mode==='register'?'register':'login');
    } catch(error){authMessage={error:error.code};}
    finally {authBusy=false;render();}
  }
  async function saveNickname(event) {
    event.preventDefault();if(authBusy||!user)return;if(!accountUI.profileForm.reportValidity())return;
    authBusy=true;authMessage={key:'working',kind:'pending'};render();
    try {const data=await api('/api/account/nickname',{nickname:accountUI.profileNickname.input.value.trim()});user=data.user;accountUI.profileNickname.input.dataset.dirty='';authMessage={key:'nicknameSaved'};window.dispatchEvent(new CustomEvent('fcw:account',{detail:{user:{...user},revision,action:'nickname'}}));}
    catch(error){authMessage={error:error.code};}
    finally{authBusy=false;render();}
  }
  async function signOut() {
    if(authBusy)return;authBusy=true;authMessage={key:'working',kind:'pending'};render();
    try {await window.fcwAccountSync?.beforeLogout();await api('/api/account/logout',{});recoveryCode='';setUser(null,0,'logout');authMessage={key:'signedOut'};mode='login';}
    catch(error){authMessage={error:error.code};}
    finally{authBusy=false;render();}
  }
  async function manualSync() {
    if(authBusy||!user||syncState?.phase==='syncing')return;
    if(!window.fcwAccountSync?.sync){syncState={phase:'error',error:'sync_unavailable'};render();return;}
    syncState={phase:'syncing'};render();
    try {await window.fcwAccountSync.sync();if(syncState?.phase==='syncing')syncState={phase:'success'};}
    catch(error){syncState={phase:'error',error:error.code || 'unknown'};}
    render();
  }
  async function resolveConflict(version) {
    if(authBusy||!user||syncState?.phase==='syncing')return;
    if(!window.fcwAccountSync?.resolveConflict){syncState={phase:'error',error:'sync_unavailable'};renderAccount();return;}
    syncState={phase:'syncing'};renderAccount();
    try {await window.fcwAccountSync.resolveConflict(version);if(syncState?.phase==='syncing')syncState={phase:'success'};}
    catch(error){syncState={phase:'error',error:error.code || 'unknown'};}
    renderAccount();
  }
  async function downloadConflict() {
    if(authBusy||!user||syncState?.phase==='syncing')return;
    if(!window.fcwAccountSync?.backupConflict){syncState={phase:'error',error:'sync_unavailable'};renderAccount();return;}
    try {await window.fcwAccountSync.backupConflict();authMessage={key:'backupReady'};}
    catch(error){authMessage={error:error.code || 'unknown'};}
    renderAccount();
  }
  async function copyRecovery() {
    if(!recoveryCode)return;
    try {await navigator.clipboard.writeText(recoveryCode);authMessage={key:'recoveryCopied'};}
    catch{authMessage={key:'copyFailed',kind:'error'};accountUI.recoveryValue.focus();accountUI.recoveryValue.select();}
    render();
  }
  function downloadRecovery() {
    if(!recoveryCode || !user)return;
    const blob=new Blob([`${w().recoveryFile}\n\n${w().email}: ${user.email}\n${w().recoveryLabel}: ${recoveryCode}\n\n${w().recoveryWarning}\n`],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='career-wheel-recovery.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);authMessage={key:'recoveryDownloaded'};render();
  }
  async function exportProgress(){
    if(authBusy)return;authBusy=true;authMessage={key:'working',kind:'pending'};renderAccount();
    try {
      if(!window.fcwAccountSync?.exportProgress)throw Object.assign(new Error('operation_busy'),{code:'operation_busy'});
      await window.fcwAccountSync.exportProgress();authMessage={key:'progressExported'};
    }catch(error){authMessage={error:error.code||'unknown'};}
    finally{authBusy=false;renderAccount();}
  }
  async function importProgress(){
    const file=accountUI?.transferFile.files?.[0];if(accountUI)accountUI.transferFile.value='';
    if(!file||authBusy)return;authBusy=true;authMessage={key:'working',kind:'pending'};renderAccount();
    try {
      if(!window.fcwAccountSync?.importProgress)throw Object.assign(new Error('operation_busy'),{code:'operation_busy'});
      await window.fcwAccountSync.importProgress(file);authMessage={key:'progressImported'};
    }catch(error){authMessage={error:error.code||'unknown'};}
    finally{authBusy=false;renderAccount();}
  }
  function buildAccount(host) {
    const root=node('div','cw-account'),tabs=node('div','cw-account-tabs');tabs.setAttribute('role','tablist');
    const login=btn('is-secondary',()=>selectMode('login')),register=btn('is-secondary',()=>selectMode('register'));
    login.id='cwAccountLoginTab';register.id='cwAccountRegisterTab';login.setAttribute('role','tab');register.setAttribute('role','tab');login.setAttribute('aria-controls','cwAccountAuthForm');register.setAttribute('aria-controls','cwAccountAuthForm');tabs.append(login,register);
    tabs.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||authBusy)return;event.preventDefault();selectMode(event.key==='Home'?'login':event.key==='End'?'register':mode==='register'?'login':'register');(mode==='register'?register:login).focus();});
    const signedOut=node('section','cw-account-auth'),form=node('form','cw-account-form');form.id='cwAccountAuthForm';
    const email=field('cwAccountEmail','email','username'),nickname=field('cwAccountNickname','text','nickname'),password=field('cwAccountPassword','password','current-password'),recovery=field('cwAccountRecovery','text','off');
    email.input.required=true;email.input.maxLength=254;nickname.input.minLength=2;nickname.input.maxLength=24;password.input.required=true;password.input.maxLength=128;recovery.input.maxLength=100;recovery.input.spellcheck=false;recovery.input.autocapitalize='off';
    const recover=btn('cw-account-text-action',()=>selectMode('recover')),submit=btn('cw-account-submit');submit.type='submit';
    const recoveryHelp=node('p','cw-muted'),authNote=node('p','cw-muted cw-account-note'),offlineNote=node('p','cw-muted');
    form.append(email.wrap,nickname.wrap,recovery.wrap,password.wrap,recover,recoveryHelp,submit);form.addEventListener('submit',submitAuth);signedOut.append(tabs,form,authNote,offlineNote);
    const signedIn=node('section','cw-account-profile'),badge=node('small','cw-account-badge'),identity=node('strong','cw-account-email'),serverNote=node('p','cw-muted');
    const profileForm=node('form','cw-account-nickname-form'),profileNickname=field('cwAccountProfileNickname','text','nickname'),save=btn('is-secondary');save.type='submit';profileNickname.input.required=true;profileNickname.input.minLength=2;profileNickname.input.maxLength=24;profileNickname.input.addEventListener('input',()=>{profileNickname.input.dataset.dirty='true';render();});profileForm.append(profileNickname.wrap,save);profileForm.addEventListener('submit',saveNickname);
    const syncHelp=node('p','cw-muted'),actions=node('div','cw-account-actions'),sync=btn('cw-account-sync',manualSync),logout=btn('is-secondary',signOut),syncStatus=status();actions.append(sync,logout);
    const conflictBox=node('section','cw-account-recovery-box cw-account-conflict-box'),conflictTitle=node('h3'),conflictHelp=node('p','cw-muted'),conflictActions=node('div','cw-account-actions'),useLocal=btn('',()=>resolveConflict('local')),useRemote=btn('is-secondary',()=>resolveConflict('remote')),backup=btn('is-secondary',downloadConflict);
    conflictBox.id='cwAccountConflict';useLocal.id='cwAccountUseLocal';useRemote.id='cwAccountUseRemote';backup.id='cwAccountConflictBackup';conflictActions.append(useLocal,useRemote,backup);conflictBox.append(conflictTitle,conflictHelp,conflictActions);
    signedIn.append(badge,identity,profileForm,serverNote,syncHelp,actions,syncStatus,conflictBox);
    const recoveryBox=node('section','cw-account-recovery-box'),recoveryTitle=node('h3'),recoveryWarning=node('p','cw-muted'),recoveryValue=node('input','cw-account-recovery-value');recoveryValue.readOnly=true;recoveryValue.type='text';recoveryValue.spellcheck=false;
    const recoveryActions=node('div','cw-account-actions'),copyCode=btn('is-secondary',copyRecovery),downloadCode=btn('',downloadRecovery),done=btn('cw-account-text-action',()=>{recoveryCode='';render();});recoveryActions.append(copyCode,downloadCode);recoveryBox.append(recoveryTitle,recoveryWarning,recoveryValue,recoveryActions,done);
    const transfer=node('details','cw-account-transfer'),transferSummary=node('summary'),transferNote=node('p','cw-muted'),transferActions=node('div','cw-account-actions'),transferExport=btn('is-secondary',exportProgress),transferImport=btn('is-secondary',()=>{if(!authBusy)transferFile.click();}),transferFile=node('input');transfer.id='cwAccountTransfer';transferFile.type='file';transferFile.accept='.json,application/json';transferFile.hidden=true;transferFile.addEventListener('change',importProgress);transferActions.append(transferExport,transferImport);transfer.append(transferSummary,transferNote,transferActions,transferFile);
    const message=status();root.append(signedOut,signedIn,recoveryBox,transfer,message);host.replaceChildren(root);
    accountUI={root,login,register,tabs,signedOut,signedIn,form,email,nickname,password,recovery,recover,recoveryHelp,submit,authNote,offlineNote,badge,identity,profileForm,profileNickname,save,serverNote,syncHelp,sync,logout,syncStatus,conflictBox,conflictTitle,conflictHelp,useLocal,useRemote,backup,recoveryBox,recoveryTitle,recoveryWarning,recoveryValue,copyCode,downloadCode,done,transfer,transferSummary,transferNote,transferExport,transferImport,transferFile,message};
  }
  function normalFriends(data) {return {friends:Array.isArray(data.friends)?data.friends:[],incoming:Array.isArray(data.incoming)?data.incoming:[],outgoing:Array.isArray(data.outgoing)?data.outgoing:[],inviteCode:typeof data.inviteCode==='string'?data.inviteCode:'',gameInvites:{incoming:Array.isArray(data.gameInvites?.incoming)?data.gameInvites.incoming:[],outgoing:Array.isArray(data.gameInvites?.outgoing)?data.gameInvites.outgoing:[]}};}
  function roomState(){return window.fcwRoom?.getState?.() || {room:null,busy:false};}
  function friendsVisible(){return Boolean(user&&friendsUI?.root.isConnected&&document.visibilityState==='visible'&&!friendsUI.root.closest('.cw-hub-page')?.hidden&&friendsUI.root.closest('dialog')?.open);}
  function stopFriendsPolling(){clearInterval(friendsPoll);friendsPoll=0;friendsWasVisible=false;}
  function watchFriendsVisibility(){
    const visible=friendsVisible();
    if(!visible){stopFriendsPolling();return;}
    if(!friendsWasVisible){friendsWasVisible=true;refreshFriends();}
    if(!friendsPoll)friendsPoll=setInterval(()=>{if(friendsVisible())refreshFriends();else stopFriendsPolling();},20000);
  }
  async function refreshFriends() {
    if(!user||friendsLoading||friendsBusy)return;
    const generation=friendsGeneration;
    friendsLoading=true;let changed=false;
    try {
      const data=await api('/api/friends');if(generation!==friendsGeneration)return;
      const next=normalFriends(data);changed=JSON.stringify(next)!==JSON.stringify(friends);friends=next;
      if(invitation&&!invitedUsers){const found=await api(`/api/friends/search?invite=${encodeURIComponent(invitation)}`);if(generation!==friendsGeneration)return;invitedUsers=Array.isArray(found.users)?found.users:[];changed=true;}
      if(friendMessage?.error){friendMessage=null;changed=true;}
    }
    catch(error){if(generation===friendsGeneration){friendMessage={error:error.code};changed=true;}}
    finally{if(generation===friendsGeneration){friendsLoading=false;if(changed)renderFriends();}}
  }
  async function searchFriends(event) {
    event.preventDefault();if(!user||friendsBusy)return;
    const query=friendsUI.query.input.value.trim();if(query.length<2){friendMessage={key:'searchShort',kind:'error'};renderFriends();return;}
    const generation=++friendsGeneration;friendsLoading=false;friendsBusy=true;friendMessage={key:'working',kind:'pending'};renderFriends();
    try {const data=await api(`/api/friends/search?q=${encodeURIComponent(query)}`);if(generation!==friendsGeneration)return;results=Array.isArray(data.users)?data.users:[];friendMessage=null;}
    catch(error){if(generation===friendsGeneration)friendMessage={error:error.code};}
    finally{if(generation===friendsGeneration){friendsBusy=false;renderFriends();}}
  }
  async function friendship(action,player) {
    if(!user||friendsBusy)return;
    if(action==='remove'&&!window.confirm(w().removeConfirm(player.nickname)))return;
    const generation=++friendsGeneration;friendsLoading=false;friendsBusy=true;friendMessage={key:'working',kind:'pending'};renderFriends();
    try {const data=await api(`/api/friends/${action}`,{userId:player.id});if(generation!==friendsGeneration)return;friends=normalFriends(data);friendMessage={key:action==='request'?'requestSent':action==='accept'?'requestAccepted':action==='remove'?'friendRemoved':'requestDeclined'};}
    catch(error){if(generation===friendsGeneration)friendMessage={error:error.code};}
    finally{if(generation===friendsGeneration){friendsBusy=false;renderFriends();}}
  }
  function createGameRoom(){if(!user||friendsBusy||roomState().busy)return;window.fcwLobby?.openCreate?.();}
  async function inviteToGame(player){
    if(!user||friendsBusy||roomState().busy)return;
    if(!roomState().room){createGameRoom();return;}
    const generation=++friendsGeneration;friendsLoading=false;friendsBusy=true;friendMessage={key:'working',kind:'pending'};renderFriends();
    try {
      if(!window.fcwRoom?.inviteFriend)throw Object.assign(new Error('server_unavailable'),{code:'server_unavailable'});
      const data=await window.fcwRoom.inviteFriend(player.id);if(generation!==friendsGeneration)return;
      friends=normalFriends(data);friendMessage={key:'gameInviteSent'};
    }catch(error){if(generation===friendsGeneration)friendMessage={error:error.code||'unknown'};}
    finally{if(generation===friendsGeneration){friendsBusy=false;renderFriends();}}
  }
  async function gameInvitation(action,invite){
    if(!user||friendsBusy||roomState().busy)return;
    if(action==='accept'&&window.fcwExperience?.snapshot?.().spinning){friendMessage={error:'operation_busy'};renderFriends();return;}
    const generation=++friendsGeneration;friendsLoading=false;friendsBusy=true;friendMessage={key:'working',kind:'pending'};renderFriends();
    try {
      const data=await api(`/api/friends/game-invites/${encodeURIComponent(invite.id)}/${action}`,{});if(generation!==friendsGeneration)return;
      friends=normalFriends(data);friendMessage={key:action==='accept'?'gameAccepted':'gameInviteDeclined'};
      if(action==='accept'&&typeof data.roomCode==='string'&&window.fcwLobby?.openJoin?.(data.roomCode)===false)friendMessage={error:'operation_busy'};
    }catch(error){if(generation===friendsGeneration)friendMessage={error:error.code||'unknown'};}
    finally{if(generation===friendsGeneration){friendsBusy=false;renderFriends();}}
  }
  function inviteLink() {const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('friend',friends.inviteCode);return url.href;}
  async function copyInvitation() {
    if(!friends.inviteCode)return;
    const value=inviteLink(),generation=friendsGeneration;
    try {await navigator.clipboard.writeText(value);if(generation!==friendsGeneration)return;friendMessage={key:'inviteCopied'};friendsUI.inviteValue.hidden=true;}
    catch{if(generation!==friendsGeneration)return;friendsUI.inviteValue.value=value;friendsUI.inviteValue.hidden=false;friendsUI.inviteValue.focus();friendsUI.inviteValue.select();friendMessage={key:'inviteManual'};}
    renderFriends();
  }
  function buildFriends(host) {
    const root=node('div','cw-friends'),gate=node('section','cw-friends-gate'),gateNote=node('p','cw-muted'),open=btn('',()=>window.fcwNavigation?.open('account'));gate.append(gateNote,open);
    const content=node('section','cw-friends-content'),intro=node('p','cw-muted'),invite=btn('is-secondary cw-friend-invite',copyInvitation),inviteValue=node('input','cw-friend-invite-value');inviteValue.type='text';inviteValue.readOnly=true;inviteValue.hidden=true;
    const form=node('form','cw-friend-search'),query=field('cwFriendsSearch','search','off'),search=btn('is-secondary');search.type='submit';query.input.maxLength=24;form.append(query.wrap,search);form.addEventListener('submit',searchFriends);
    const message=status(),invitedBox=node('section','cw-friend-group'),invitedHeading=node('h3'),invitedNote=node('p','cw-muted'),invitedList=node('ul','cw-friend-list');invitedBox.append(invitedHeading,invitedNote,invitedList);
    const resultsBox=node('section','cw-friend-group'),resultsHeading=node('h3'),resultsList=node('ul','cw-friend-list'),resultsEmpty=node('p','cw-muted');resultsBox.append(resultsHeading,resultsList,resultsEmpty);
    const savedBox=node('section','cw-friend-group'),savedHeading=node('h3'),savedList=node('ul','cw-friend-list'),savedEmpty=node('p','cw-muted');savedBox.append(savedHeading,savedList,savedEmpty);
    const incomingBox=node('section','cw-friend-group'),incomingHeading=node('h3'),incomingList=node('ul','cw-friend-list');incomingBox.append(incomingHeading,incomingList);
    const outgoingBox=node('section','cw-friend-group'),outgoingHeading=node('h3'),outgoingList=node('ul','cw-friend-list');outgoingBox.append(outgoingHeading,outgoingList);
    const gameBox=node('section','cw-friend-group cw-friend-game-invites'),gameHeading=node('h3'),gameList=node('ul','cw-friend-list');gameBox.append(gameHeading,gameList);
    const roomBox=node('section','cw-friend-room'),roomCopy=node('div'),roomHeading=node('strong'),roomHint=node('p','cw-muted'),roomCreate=btn('is-secondary',createGameRoom);roomCopy.append(roomHeading,roomHint);roomBox.append(roomCopy,roomCreate);
    content.append(intro,invite,inviteValue,form,message,gameBox,invitedBox,resultsBox,incomingBox,roomBox,savedBox,outgoingBox);root.append(gate,content);host.replaceChildren(root);
    friendsUI={root,gate,gateNote,open,content,intro,invite,inviteValue,form,query,search,message,invitedBox,invitedHeading,invitedNote,invitedList,resultsBox,resultsHeading,resultsList,resultsEmpty,savedBox,savedHeading,savedList,savedEmpty,incomingBox,incomingHeading,incomingList,outgoingBox,outgoingHeading,outgoingList,gameBox,gameHeading,gameList,roomBox,roomHeading,roomHint,roomCreate};
    const dialog=root.closest('dialog');
    if(dialog)new MutationObserver(watchFriendsVisibility).observe(dialog,{attributes:true,subtree:true,attributeFilter:['hidden','open']});
  }
  function relationship(player) {if(friends.friends.some(p=>p.id===player.id))return 'friend';if(friends.incoming.some(p=>p.id===player.id))return 'incoming';if(friends.outgoing.some(p=>p.id===player.id))return 'outgoing';return 'none';}
  function listFocus(list){return list.contains(document.activeElement)?document.activeElement.dataset.cwAction:'';}
  function restoreListFocus(list,key){if(key)[...list.querySelectorAll('button')].find(button=>button.dataset.cwAction===key&&!button.disabled)?.focus({preventScroll:true});}
  function fillPlayers(list,players,kind) {
    const fragment=document.createDocumentFragment(),focus=listFocus(list);
    players.forEach(player=>{
      if(typeof player?.id!=='string'||typeof player?.nickname!=='string')return;
      const row=node('li','cw-friend-row'),avatar=node('span','cw-friend-avatar',player.nickname.slice(0,2).toUpperCase()),name=node('strong','',player.nickname),actions=node('div','cw-friend-actions');avatar.setAttribute('aria-hidden','true');
      const rel=kind==='search'?relationship(player):kind;
      const addAction=(key,action)=>{const button=btn('is-secondary',()=>friendship(action,player));button.dataset.cwAction=`${player.id}:${action}`;button.textContent=w()[key];button.disabled=friendsBusy;actions.append(button);};
      if(rel==='friend'){
        if(kind==='search')actions.append(node('small','cw-friend-state',w().isFriend));
        else {
          const current=roomState(),sent=friends.gameInvites.outgoing.some(invite=>invite.to?.id===player.id&&invite.roomCode===current.room?.code);
          const play=btn('cw-friend-play',()=>inviteToGame(player));play.dataset.cwAction=`${player.id}:play`;play.textContent=sent?w().gameInvited:w().gameInvite;play.disabled=friendsBusy||current.busy||!current.room||current.room.complete||sent;actions.append(play);addAction('remove','remove');
        }
      }
      else if(rel==='incoming'){addAction('accept','accept');addAction('decline','decline');}
      else if(rel==='outgoing'){if(kind==='search')actions.append(node('small','cw-friend-state',w().alreadySent));else addAction('cancel','decline');}
      else addAction('add','request');
      row.append(avatar,name,actions);fragment.append(row);
    });
    // Account and language updates do not rebuild focused form controls.
    list.replaceChildren(fragment);restoreListFocus(list,focus);
  }
  function visibleGameInvites(){
    const current=roomState().room?.code;
    return friends.gameInvites.incoming.filter(invite=>typeof invite?.id==='string'&&typeof invite.from?.nickname==='string'&&/^[a-z0-9]{6}$/i.test(invite.roomCode||'')&&new Date(invite.expiresAt).getTime()>Date.now()&&invite.roomCode!==current);
  }
  function fillGameInvites(list,invitations){
    const t=w(),fragment=document.createDocumentFragment(),focus=listFocus(list);
    invitations.forEach(invite=>{
      const row=node('li','cw-friend-row cw-friend-game-row'),avatar=node('span','cw-friend-avatar',invite.from.nickname.slice(0,2).toUpperCase()),description=node('div','cw-friend-game-copy'),name=node('strong','',t.gameFrom(invite.from.nickname)),info=node('small','cw-muted'),actions=node('div','cw-friend-actions');avatar.setAttribute('aria-hidden','true');
      const time=new Date(invite.expiresAt).toLocaleTimeString(document.documentElement.lang||'it',{hour:'2-digit',minute:'2-digit'});info.textContent=`${t.gameRoom(invite.roomCode)} · ${t.gameExpires(time)}`;description.append(name,info);
      const accept=btn('cw-friend-play',()=>gameInvitation('accept',invite)),decline=btn('is-secondary',()=>gameInvitation('decline',invite));accept.dataset.cwAction=`${invite.id}:accept`;decline.dataset.cwAction=`${invite.id}:decline`;accept.textContent=invite.status==='accepted'?t.gameOpen:t.gameAccept;decline.textContent=t.gameDecline;[accept,decline].forEach(button=>button.disabled=friendsBusy||roomState().busy);actions.append(accept,decline);row.append(avatar,description,actions);fragment.append(row);
    });
    list.replaceChildren(fragment);restoreListFocus(list,focus);
  }
  function renderAccount() {
    if(!accountUI)return;const t=w(),u=accountUI;
    u.signedOut.hidden=Boolean(user);u.signedIn.hidden=!user;u.login.textContent=t.login;u.register.textContent=t.register;
    u.login.setAttribute('aria-selected',String(mode!=='register'));u.register.setAttribute('aria-selected',String(mode==='register'));u.login.tabIndex=mode==='register'?-1:0;u.register.tabIndex=mode==='register'?0:-1;
    u.login.disabled=authBusy;u.register.disabled=authBusy;
    u.email.label.textContent=t.email;u.email.input.placeholder=t.emailPlaceholder;u.nickname.label.textContent=t.nickname;u.nickname.input.placeholder=t.nicknamePlaceholder;u.nickname.hint.textContent=t.nicknameHint;
    u.password.label.textContent=mode==='recover'?t.newPassword:t.password;u.password.input.placeholder=t.passwordPlaceholder;u.password.hint.textContent=mode==='login'?'':t.passwordHint;u.password.input.minLength=mode==='login'?1:12;u.password.input.autocomplete=mode==='login'?'current-password':'new-password';
    u.nickname.wrap.hidden=mode!=='register';u.nickname.input.required=mode==='register';u.nickname.input.disabled=mode!=='register'||authBusy;
    u.recovery.wrap.hidden=mode!=='recover';u.recovery.input.required=mode==='recover';u.recovery.input.disabled=mode!=='recover'||authBusy;u.recovery.label.textContent=t.recoveryLabel;u.recovery.input.placeholder=t.recoveryPlaceholder;
    u.recoveryHelp.hidden=mode!=='recover';u.recoveryHelp.textContent=t.recoveryNote;u.recover.hidden=mode!=='login';u.recover.textContent=t.recoveryLink;u.recover.disabled=authBusy;
    u.email.input.disabled=authBusy;u.password.input.disabled=authBusy;u.submit.disabled=authBusy||!sessionReady;u.submit.textContent=authBusy?t.working:mode==='register'?t.register:mode==='recover'?t.recover:t.login;
    u.authNote.textContent=t.authNote;u.offlineNote.textContent=t.offlineNote;u.badge.textContent=t.signedIn;u.identity.textContent=user?.email || '';
    u.profileNickname.label.textContent=t.nickname;u.profileNickname.hint.textContent=t.nicknameHint;if(user&&u.profileNickname.input.dataset.dirty!=='true')u.profileNickname.input.value=user.nickname;u.profileNickname.input.disabled=authBusy;
    u.save.textContent=t.saveNickname;u.save.disabled=authBusy||!user||u.profileNickname.input.value.trim()===user?.nickname;u.serverNote.textContent=t.serverNote;u.syncHelp.textContent=t.syncHelp;u.sync.textContent=syncState?.phase==='syncing'?t.syncing:t.sync;u.sync.disabled=authBusy||syncState?.phase==='syncing';u.logout.textContent=t.logout;u.logout.disabled=authBusy;
    u.syncStatus.textContent=syncState?.phase==='syncing'?t.syncing:syncState?.phase==='success'?t.synced:syncState?.phase==='conflict'?t.syncConflict:syncState?.phase==='error'?(syncState.error==='sync_unavailable'?t.syncUnavailable:errorText(syncState.error)):'';
    if(syncState?.phase==='success'&&syncState.updatedAt){const date=new Date(syncState.updatedAt);if(!Number.isNaN(date.getTime()))u.syncStatus.textContent+=` ${t.savedAt}: ${date.toLocaleString(document.documentElement.lang||'it')}.`;}
    u.syncStatus.dataset.state=['error','conflict'].includes(syncState?.phase)?'error':'success';
    u.conflictBox.hidden=!user||!(syncState?.phase==='conflict'||window.fcwAccountSync?.state?.().conflict);u.conflictTitle.textContent=t.conflictTitle;u.conflictHelp.textContent=t.conflictHelp;u.useLocal.textContent=t.useLocal;u.useRemote.textContent=t.useRemote;u.backup.textContent=t.backupConflict;
    [u.useLocal,u.useRemote,u.backup].forEach(button=>button.disabled=authBusy||syncState?.phase==='syncing');
    u.recoveryBox.hidden=!recoveryCode;u.recoveryTitle.textContent=t.recoveryTitle;u.recoveryWarning.textContent=t.recoveryWarning;u.recoveryValue.value=recoveryCode;u.recoveryValue.setAttribute('aria-label',t.recoveryLabel);u.copyCode.textContent=t.recoveryCopy;u.downloadCode.textContent=t.recoverySave;u.done.textContent=t.recoveryDone;
    u.transferSummary.textContent=t.transfer;u.transferNote.textContent=t.transferNote;u.transferExport.textContent=t.exportProgress;u.transferImport.textContent=t.importProgress;u.transferFile.setAttribute('aria-label',t.importProgress);[u.transferExport,u.transferImport].forEach(button=>button.disabled=authBusy||syncState?.phase==='syncing');
    textStatus(u.message,!sessionReady?{key:'connecting',kind:'pending'}:authMessage);
  }
  function renderFriends() {
    if(!friendsUI)return;const t=w(),u=friendsUI;u.gate.hidden=Boolean(user);u.content.hidden=!user;u.gateNote.textContent=t.friendsGate;u.open.textContent=t.openAccount;u.intro.textContent=t.friendsNote;u.invite.textContent=t.copyInvite;u.invite.disabled=!friends.inviteCode||friendsBusy;u.inviteValue.setAttribute('aria-label',t.copyInvite);u.query.label.textContent=t.searchLabel;u.query.input.placeholder=t.searchPlaceholder;u.query.input.disabled=friendsBusy;u.search.textContent=t.search;u.search.disabled=friendsBusy;
    textStatus(u.message,friendMessage);
    u.invitedBox.hidden=!invitation||!invitedUsers;u.invitedHeading.textContent=t.invited;u.invitedNote.textContent=invitedUsers?.length?t.inviteReady:t.inviteInvalid;fillPlayers(u.invitedList,invitedUsers||[],'search');
    u.resultsBox.hidden=results===null;u.resultsHeading.textContent=t.results;u.resultsEmpty.textContent=t.noResults;u.resultsEmpty.hidden=Boolean(results?.length);fillPlayers(u.resultsList,results||[],'search');
    u.savedHeading.textContent=t.savedFriends(friends.friends.length);u.savedEmpty.textContent=t.emptyFriends;u.savedEmpty.hidden=friends.friends.length>0;fillPlayers(u.savedList,friends.friends,'friend');
    u.incomingBox.hidden=!friends.incoming.length;u.incomingHeading.textContent=t.incoming(friends.incoming.length);fillPlayers(u.incomingList,friends.incoming,'incoming');
    u.outgoingBox.hidden=!friends.outgoing.length;u.outgoingHeading.textContent=t.outgoing(friends.outgoing.length);fillPlayers(u.outgoingList,friends.outgoing,'outgoing');
    const gameInvites=visibleGameInvites();u.gameBox.hidden=!gameInvites.length;u.gameHeading.textContent=t.gameInvites(gameInvites.length);fillGameInvites(u.gameList,gameInvites);
    const current=roomState();u.roomBox.hidden=!friends.friends.length;u.roomHeading.textContent=current.room?t.gameRoom(current.room.code):t.gameCreate;u.roomHint.textContent=current.room?t.gameRoomHint:t.gameCreateHint;u.roomCreate.textContent=t.gameCreate;u.roomCreate.hidden=Boolean(current.room);u.roomCreate.disabled=friendsBusy||current.busy;
  }
  function render(){renderAccount();renderFriends();}
  function state(){return {user:user?{...user}:null,revision,ready:sessionReady};}
  function mount({account,friends:friendsHost}={}) {
    if(account instanceof Element&&!accountUI)buildAccount(account);
    if(friendsHost instanceof Element&&!friendsUI)buildFriends(friendsHost);
    render();if(!sessionReady)refresh();
  }
  function setSyncStatus(next){syncState=next||null;renderAccount();}
  window.fcwAccount={mount,render,state,refresh,refreshFriends,setSyncStatus};
  window.addEventListener('fcw:language',render);
  window.addEventListener('fcw:account-sync',event=>setSyncStatus(event.detail));
  window.addEventListener('fcw:room',()=>{if(friendsVisible())renderFriends();});
  document.getElementById('languageSelect')?.addEventListener('change',()=>queueMicrotask(render));
  // Poll only while the Friends surface is visible, and stop when signed out.
  document.addEventListener('visibilitychange',()=>{watchFriendsVisibility();if(document.visibilityState==='visible'&&user)refreshFriends();});
})();
