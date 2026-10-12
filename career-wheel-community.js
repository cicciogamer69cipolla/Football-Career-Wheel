/* Local release notes and feedback drafts. No account or remote submission. */
(() => {
  'use strict';
  const DRAFT_KEY = 'fcw-feedback-draft-v1';
  const MAX_MESSAGE = 4000;
  const supported = ['it', 'en', 'es', 'fr'];
  const copy = {
    it: {
      messagesHint: 'Novità di Career Wheel, raccolte in un solo posto.',
      releaseLabel: 'AGGIORNAMENTO',
      navTitle: 'La ruota al centro, gli strumenti in alto',
      navIntro: 'La nuova barra ti porta agli obiettivi, alle classifiche e alle carriere salvate. Ogni sezione apre il suo pannello, così la partita resta più pulita.',
      navFeatures: ['Obiettivi e archivio hanno un accesso dedicato.', 'I tuoi progressi continuano a essere salvati su questo dispositivo.', 'Feedback ti permette di preparare, copiare o scaricare una segnalazione.'],
      achievementsTitle: 'Più obiettivi, un livello che conta',
      achievementsIntro: 'Le missioni sono diventate 67: 24 nuovi traguardi, anche tra più carriere. Il livello del profilo sblocca titoli e sfondi della carta.',
      achievementsFeatures: ['Gli XP di ogni missione si ottengono una sola volta.', 'Ricompense ai livelli 3, 6, 10, 15 e 20.', 'I progressi e le date delle missioni già ottenute restano disponibili.'],
      feedbackHint: 'Hai trovato un problema o hai un’idea? Prepara qui una segnalazione.',
      type: 'Tipo', bug: 'Bug', idea: 'Idea', message: 'Il tuo messaggio',
      placeholder: 'Descrivi cosa succede, cosa ti aspettavi e come riprodurre il problema. Per un’idea, spiega cosa vorresti aggiungere.',
      localNote: 'La bozza viene conservata nei tuoi progressi. Per condividerla, copia o scarica il report: questo modulo non invia messaggi.',
      reportNote: 'Il report include solo il testo che scrivi, il tipo, la versione del sito, la lingua e l’orario di creazione.',
      save: 'Salva bozza', copy: 'Copia report', download: 'Scarica report',
      empty: 'Scrivi un messaggio prima di creare il report.',
      saved: 'Bozza salvata su questo dispositivo. Non inviata.',
      restored: 'Bozza ritrovata su questo dispositivo. Non inviata.',
      edited: 'Bozza modificata. Non inviata.',
      saveError: 'Non riesco a salvare la bozza su questo dispositivo. Puoi copiare o scaricare il report.',
      copied: 'Report copiato. Puoi incollarlo dove vuoi condividerlo.',
      copyError: 'Non riesco a copiare il report. Usa “Scarica report”.',
      downloaded: 'Report preparato per il download. Non inviato.',
      downloadError: 'Non riesco a scaricare il report. Puoi copiare il testo.',
      reportTitle: 'Career Wheel — Segnalazione', version: 'Versione', language: 'Lingua', created: 'Creato il', reportMessage: 'Messaggio',
      reportFooter: 'Report creato localmente. Non inviato automaticamente.'
    },
    en: {
      messagesHint: 'Career Wheel updates, all in one place.',
      releaseLabel: 'UPDATE',
      navTitle: 'The wheel in the spotlight, tools at the top',
      navIntro: 'The new navigation takes you to objectives, rankings and saved careers. Each section opens its own panel to keep the game area clear.',
      navFeatures: ['Objectives and the archive have dedicated access.', 'Your progress is still saved on this device.', 'Feedback lets you prepare, copy or download a report.'],
      achievementsTitle: 'More objectives, meaningful levels',
      achievementsIntro: 'There are now 67 missions: 24 new milestones, including goals across several careers. Your profile level unlocks titles and card backgrounds.',
      achievementsFeatures: ['Each mission awards its XP only once.', 'Rewards at levels 3, 6, 10, 15 and 20.', 'Progress and dates for previously earned missions remain available.'],
      feedbackHint: 'Found an issue or have an idea? Prepare a report here.',
      type: 'Type', bug: 'Bug', idea: 'Idea', message: 'Your message',
      placeholder: 'Describe what happens, what you expected and how to reproduce the issue. For an idea, explain what you would like to add.',
      localNote: 'The draft is kept with your progress. Copy or download the report to share it: this form does not send messages.',
      reportNote: 'The report includes only the text you enter, its type, the website version, the language and the creation time.',
      save: 'Save draft', copy: 'Copy report', download: 'Download report',
      empty: 'Write a message before creating the report.',
      saved: 'Draft saved on this device. Not sent.',
      restored: 'Draft restored from this device. Not sent.',
      edited: 'Draft edited. Not sent.',
      saveError: 'The draft could not be saved on this device. You can copy or download the report.',
      copied: 'Report copied. Paste it wherever you want to share it.',
      copyError: 'The report could not be copied. Use “Download report”.',
      downloaded: 'Report prepared for download. Not sent.',
      downloadError: 'The report could not be downloaded. You can copy the text.',
      reportTitle: 'Career Wheel — Feedback report', version: 'Version', language: 'Language', created: 'Created', reportMessage: 'Message',
      reportFooter: 'Report created locally. Not sent automatically.'
    },
    es: {
      messagesHint: 'Las novedades de Career Wheel, en un solo lugar.',
      releaseLabel: 'ACTUALIZACIÓN',
      navTitle: 'La rueda en el centro, las herramientas arriba',
      navIntro: 'La nueva barra te lleva a los objetivos, las clasificaciones y las carreras guardadas. Cada sección abre su propio panel para despejar la zona de juego.',
      navFeatures: ['Los objetivos y el archivo tienen un acceso propio.', 'Tu progreso sigue guardándose en este dispositivo.', 'Feedback permite preparar, copiar o descargar un informe.'],
      achievementsTitle: 'Más objetivos, niveles con sentido',
      achievementsIntro: 'Ahora hay 67 misiones: 24 nuevos logros, también entre varias carreras. El nivel de tu perfil desbloquea títulos y fondos para la carta.',
      achievementsFeatures: ['Cada misión concede sus XP una sola vez.', 'Recompensas en los niveles 3, 6, 10, 15 y 20.', 'El progreso y las fechas de las misiones ya obtenidas siguen disponibles.'],
      feedbackHint: '¿Has encontrado un problema o tienes una idea? Prepara un informe aquí.',
      type: 'Tipo', bug: 'Error', idea: 'Idea', message: 'Tu mensaje',
      placeholder: 'Describe qué ocurre, qué esperabas y cómo reproducir el problema. Para una idea, explica qué te gustaría añadir.',
      localNote: 'El borrador se conserva con tu progreso. Copia o descarga el informe para compartirlo: este formulario no envía mensajes.',
      reportNote: 'El informe solo incluye el texto que escribes, el tipo, la versión del sitio, el idioma y la hora de creación.',
      save: 'Guardar borrador', copy: 'Copiar informe', download: 'Descargar informe',
      empty: 'Escribe un mensaje antes de crear el informe.',
      saved: 'Borrador guardado en este dispositivo. No enviado.',
      restored: 'Borrador recuperado de este dispositivo. No enviado.',
      edited: 'Borrador modificado. No enviado.',
      saveError: 'No se puede guardar el borrador en este dispositivo. Puedes copiar o descargar el informe.',
      copied: 'Informe copiado. Pégalo donde quieras compartirlo.',
      copyError: 'No se puede copiar el informe. Usa “Descargar informe”.',
      downloaded: 'Informe preparado para descargar. No enviado.',
      downloadError: 'No se puede descargar el informe. Puedes copiar el texto.',
      reportTitle: 'Career Wheel — Informe de comentarios', version: 'Versión', language: 'Idioma', created: 'Creado el', reportMessage: 'Mensaje',
      reportFooter: 'Informe creado localmente. No enviado automáticamente.'
    },
    fr: {
      messagesHint: 'Les nouveautés de Career Wheel, au même endroit.',
      releaseLabel: 'MISE À JOUR',
      navTitle: 'La roue au centre, les outils en haut',
      navIntro: 'La nouvelle barre donne accès aux objectifs, aux classements et aux carrières enregistrées. Chaque rubrique ouvre son propre panneau pour dégager la zone de jeu.',
      navFeatures: ['Les objectifs et les archives ont un accès dédié.', 'Ta progression reste enregistrée sur cet appareil.', 'Feedback permet de préparer, copier ou télécharger un rapport.'],
      achievementsTitle: 'Plus d’objectifs, des niveaux utiles',
      achievementsIntro: 'Il y a désormais 67 missions : 24 nouveaux objectifs, dont certains sur plusieurs carrières. Le niveau de ton profil débloque des titres et des fonds pour la carte.',
      achievementsFeatures: ['Chaque mission donne ses XP une seule fois.', 'Des récompenses aux niveaux 3, 6, 10, 15 et 20.', 'La progression et les dates des missions déjà obtenues restent disponibles.'],
      feedbackHint: 'Tu as trouvé un problème ou tu as une idée ? Prépare un rapport ici.',
      type: 'Type', bug: 'Bug', idea: 'Idée', message: 'Ton message',
      placeholder: 'Décris ce qui se passe, ce que tu attendais et comment reproduire le problème. Pour une idée, explique ce que tu aimerais ajouter.',
      localNote: 'Le brouillon est conservé avec ta progression. Copie ou télécharge le rapport pour le partager : ce formulaire n’envoie aucun message.',
      reportNote: 'Le rapport contient uniquement ton texte, son type, la version du site, la langue et l’heure de création.',
      save: 'Enregistrer le brouillon', copy: 'Copier le rapport', download: 'Télécharger le rapport',
      empty: 'Écris un message avant de créer le rapport.',
      saved: 'Brouillon enregistré sur cet appareil. Non envoyé.',
      restored: 'Brouillon retrouvé sur cet appareil. Non envoyé.',
      edited: 'Brouillon modifié. Non envoyé.',
      saveError: 'Impossible d’enregistrer le brouillon sur cet appareil. Tu peux copier ou télécharger le rapport.',
      copied: 'Rapport copié. Colle-le où tu souhaites le partager.',
      copyError: 'Impossible de copier le rapport. Utilise « Télécharger le rapport ».',
      downloaded: 'Rapport préparé pour le téléchargement. Non envoyé.',
      downloadError: 'Impossible de télécharger le rapport. Tu peux copier le texte.',
      reportTitle: 'Career Wheel — Rapport de retour', version: 'Version', language: 'Langue', created: 'Créé le', reportMessage: 'Message',
      reportFooter: 'Rapport créé localement. Aucun envoi automatique.'
    }
  };
  const languageNames = {it: 'Italiano', en: 'English', es: 'Español', fr: 'Français'};
  const localeNames = {it: 'it-IT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR'};
  const language = () => {
    const value = document.getElementById('languageSelect')?.value || document.documentElement.lang;
    return supported.includes(value) ? value : 'it';
  };
  const words = () => copy[language()];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  let messagesNode = null, feedbackNode = null, messagesUI = null, feedbackUI = null;
  let messageType = 'bug', statusKey = '', saveTimer = null;
  const draft = () => {
    try {
      const value = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (!value || typeof value !== 'object') return null;
      return {type: value.type === 'idea' ? 'idea' : 'bug', message: typeof value.message === 'string' ? value.message.slice(0, MAX_MESSAGE) : ''};
    } catch { return null; }
  };
  const setStatus = key => {
    statusKey = key;
    if (feedbackUI) feedbackUI.status.textContent = words()[key] || '';
  };
  function saveDraft() {
    if (!feedbackUI) return;
    clearTimeout(saveTimer);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({version: 1, type: messageType, message: feedbackUI.textarea.value.slice(0, MAX_MESSAGE), savedAt: new Date().toISOString()}));
      setStatus('saved');
    } catch { setStatus('saveError'); }
  }
  function report() {
    const textarea = feedbackUI?.textarea;
    if (!textarea) return null;
    const message = textarea.value.trim();
    textarea.setCustomValidity(message ? '' : words().empty);
    if (!message) {
      textarea.reportValidity();
      setStatus('empty');
      return null;
    }
    const c = words(), code = language(), now = new Date();
    const version = document.getElementById('siteVersion')?.textContent.match(/\b\d+\.\d+\.\d+\b/)?.[0] || '2.1.1';
    const time = new Intl.DateTimeFormat(localeNames[code], {dateStyle: 'medium', timeStyle: 'long'}).format(now);
    return {
      text: [c.reportTitle, '', `${c.type}: ${c[messageType]}`, `${c.version}: ${version}`, `${c.language}: ${languageNames[code]} (${code})`, `${c.created}: ${time}`, '', `${c.reportMessage}:`, message, '', c.reportFooter].join('\n'),
      filename: `career-wheel-${messageType}-${now.toISOString().slice(0, 10)}.txt`
    };
  }
  async function copyReport() {
    const output = report();
    if (!output) return;
    saveDraft();
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(output.text);
      setStatus('copied');
    } catch { setStatus('copyError'); }
  }
  function downloadReport() {
    const output = report();
    if (!output) return;
    saveDraft();
    let url;
    try {
      url = URL.createObjectURL(new Blob([output.text], {type: 'text/plain;charset=utf-8'}));
      const link = element('a');
      link.href = url;
      link.download = output.filename;
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setStatus('downloaded');
    } catch { setStatus('downloadError'); }
    finally { if (url) setTimeout(() => URL.revokeObjectURL(url), 1000); }
  }
  function createRelease(version) {
    const article = element('article', 'cw-utility-card cw-community-release');
    const badge = element('p', 'cw-community-release-label');
    const title = element('h3');
    const intro = element('p', 'cw-muted');
    const features = element('ul', 'cw-community-release-list');
    article.append(badge, title, intro, features);
    return {article, badge, title, intro, features, version};
  }
  function buildMessages(node) {
    if (window.fcwChangelog) { window.fcwChangelog.mount(node); return; }
    const hint = element('p', 'cw-muted cw-community-intro');
    const latest = createRelease('1.5.0'), achievements = createRelease('1.4.0');
    node.replaceChildren(hint, latest.article, achievements.article);
    messagesUI = {hint, latest, achievements};
  }
  function buildFeedback(node) {
    const stored = draft();
    messageType = stored?.type || 'bug';
    statusKey = stored?.message ? 'restored' : '';
    const form = element('form', 'cw-community-feedback');
    const hint = element('p', 'cw-muted cw-community-intro');
    const types = element('fieldset', 'cw-community-type-field');
    const typeLabel = element('legend', 'cw-community-field-label');
    const options = element('div', 'cw-button-row');
    const typeButtons = ['bug', 'idea'].map(type => {
      const button = element('button', 'cw-action cw-community-type');
      button.type = 'button';
      button.dataset.feedbackType = type;
      button.addEventListener('click', () => {
        messageType = type;
        saveDraft();
        renderFeedback();
      });
      return button;
    });
    options.append(...typeButtons);
    types.append(typeLabel, options);
    const field = element('div', 'cw-community-message-field');
    const label = element('label', 'cw-community-field-label');
    label.htmlFor = 'cw-community-feedback-message';
    const textarea = element('textarea', 'cw-field cw-community-textarea');
    textarea.id = 'cw-community-feedback-message';
    textarea.name = 'message';
    textarea.rows = 6;
    textarea.required = true;
    textarea.maxLength = MAX_MESSAGE;
    textarea.value = stored?.message || '';
    textarea.setAttribute('aria-describedby', 'cw-community-local-note cw-community-report-note');
    const length = element('small', 'cw-muted cw-community-length');
    field.append(label, textarea, length);
    const localNote = element('p', 'cw-muted cw-community-local-note');
    localNote.id = 'cw-community-local-note';
    const reportNote = element('p', 'cw-muted cw-community-report-note');
    reportNote.id = 'cw-community-report-note';
    const actions = element('div', 'cw-button-row cw-community-actions');
    const save = element('button', 'cw-action');
    save.type = 'button';
    save.addEventListener('click', saveDraft);
    const copyButton = element('button', 'cw-action');
    copyButton.type = 'button';
    copyButton.addEventListener('click', copyReport);
    const download = element('button', 'cw-action');
    download.type = 'button';
    download.addEventListener('click', downloadReport);
    actions.append(save, copyButton, download);
    const status = element('p', 'cw-form-status');
    status.id = 'cw-community-feedback-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    textarea.addEventListener('input', () => {
      textarea.setCustomValidity('');
      length.textContent = `${textarea.value.length}/${MAX_MESSAGE}`;
      setStatus('edited');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveDraft, 350);
    });
    form.addEventListener('submit', event => { event.preventDefault(); saveDraft(); });
    form.append(hint, types, field, localNote, reportNote, actions, status);
    node.replaceChildren(form);
    feedbackUI = {form, hint, typeLabel, typeButtons, label, textarea, length, localNote, reportNote, save, copyButton, download, status};
  }
  function renderMessages() {
    if (window.fcwChangelog && messagesNode) { window.fcwChangelog.render(); return; }
    if (!messagesUI) return;
    const c = words();
    messagesUI.hint.textContent = c.messagesHint;
    [['latest', 'nav'], ['achievements', 'achievements']].forEach(([key, prefix]) => {
      const release = messagesUI[key];
      release.badge.textContent = `${c.releaseLabel} · ${release.version}`;
      release.title.textContent = c[`${prefix}Title`];
      release.intro.textContent = c[`${prefix}Intro`];
      release.features.replaceChildren(...c[`${prefix}Features`].map(text => element('li', '', text)));
    });
  }
  function renderFeedback() {
    if (!feedbackUI) return;
    const c = words(), ui = feedbackUI;
    ui.hint.textContent = c.feedbackHint;
    ui.typeLabel.textContent = c.type;
    ui.typeButtons.forEach(button => {
      const type = button.dataset.feedbackType;
      button.textContent = c[type];
      button.setAttribute('aria-pressed', String(type === messageType));
    });
    ui.label.textContent = c.message;
    ui.textarea.placeholder = c.placeholder;
    ui.length.textContent = `${ui.textarea.value.length}/${MAX_MESSAGE}`;
    ui.localNote.textContent = c.localNote;
    ui.reportNote.textContent = c.reportNote;
    ui.save.textContent = c.save;
    ui.copyButton.textContent = c.copy;
    ui.download.textContent = c.download;
    ui.status.textContent = c[statusKey] || '';
    if (ui.textarea.validity.customError) ui.textarea.setCustomValidity(c.empty);
  }
  function render() { renderMessages(); renderFeedback(); }
  function mount({messages, feedback} = {}) {
    if (messages instanceof Element && messages !== messagesNode) {
      messagesNode = messages;
      buildMessages(messages);
    }
    if (feedback instanceof Element && feedback !== feedbackNode) {
      clearTimeout(saveTimer);
      feedbackNode = feedback;
      buildFeedback(feedback);
    }
    render();
  }
  document.addEventListener('fcw:language', render);
  document.getElementById('languageSelect')?.addEventListener('change', render);
  window.addEventListener('fcw:account-restore', () => {
    clearTimeout(saveTimer); saveTimer = null;
    const stored = draft();
    messageType = stored?.type || 'bug'; statusKey = stored?.message ? 'restored' : '';
    if (feedbackUI) {
      feedbackUI.textarea.value = stored?.message || '';
      feedbackUI.textarea.setCustomValidity('');
    }
    render();
  });
  window.fcwCommunity = {mount, render};
})();
