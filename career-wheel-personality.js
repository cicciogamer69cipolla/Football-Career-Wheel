/* Local card identity and a factual, deterministic career story. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const STORE = 'fcw-card-personality-v1';
  const MAX_PHOTO_DATA = 64000;
  const DEFAULT = {avatar:'silhouette', nickname:'', signature:'', photo:''};
  const copy = {
    it:{title:'Personalizza la carta',hint:'Scegli un volto, un soprannome e una firma. Sono dettagli facoltativi della tua carta.',avatar:['Silhouette','Capitano','Regista','Velocista','Baller'],nickname:'Soprannome',signature:'Firma',nicknameHint:'Es. Il Maestro',signatureHint:'La tua firma',upload:'Carica un volto',local:'PNG, JPG o WEBP · massimo 2 MB',photo:'Volto personale selezionato',photoError:'Scegli un’immagine PNG, JPG o WEBP fino a 2 MB.',photoLarge:'Questa immagine è troppo grande. Scegli una foto più piccola.',photoFailed:'Non riesco a leggere questa immagine. Scegline un’altra.',locked:'Dettagli bloccati dopo il primo giro. Premi “Ricomincia” per modificarli.',story:'La storia del tuo calciatore',sample:'Storia di esempio',copy:'Copia storia',copied:'Storia copiata',copyFail:'Non riesco a copiare. Puoi selezionare il testo.',season:'stagioni',goals:'gol',assists:'assist',league:'campionati',champions:'Champions League',world:'Mondiali',continental:'coppe continentali',ballon:'Palloni d’Oro',club:'club',style:'stile',record:'Numeri della carriera',titles:'Palmarès',none:'nessun trofeo',fallbackName:'Il tuo calciatore'},
    en:{title:'Customize your card',hint:'Choose a face, nickname and signature. These are optional details on your card.',avatar:['Silhouette','Captain','Playmaker','Sprinter','Baller'],nickname:'Nickname',signature:'Signature',nicknameHint:'E.g. The Maestro',signatureHint:'Your signature',upload:'Upload a face',local:'PNG, JPG or WEBP · up to 2 MB',photo:'Custom face selected',photoError:'Choose a PNG, JPG or WEBP image up to 2 MB.',photoLarge:'This image is too large. Choose a smaller photo.',photoFailed:'This image could not be read. Choose another one.',locked:'Details lock after the first spin. Press “Start again” to edit them.',story:'Your player’s story',sample:'Example story',copy:'Copy story',copied:'Story copied',copyFail:'Copying failed. You can select the text.',season:'seasons',goals:'goals',assists:'assists',league:'league titles',champions:'Champions League titles',world:'World Cups',continental:'continental cups',ballon:'Ballons d’Or',club:'club',style:'style',record:'Career numbers',titles:'Honours',none:'no trophies',fallbackName:'Your player'},
    es:{title:'Personaliza tu carta',hint:'Elige un rostro, un apodo y una firma. Son detalles opcionales de tu carta.',avatar:['Silueta','Capitán','Creador','Velocista','Baller'],nickname:'Apodo',signature:'Firma',nicknameHint:'Ej. El Maestro',signatureHint:'Tu firma',upload:'Sube un rostro',local:'PNG, JPG o WEBP · hasta 2 MB',photo:'Rostro personal seleccionado',photoError:'Elige una imagen PNG, JPG o WEBP de hasta 2 MB.',photoLarge:'Esta imagen es demasiado grande. Elige una foto más pequeña.',photoFailed:'No se puede leer esta imagen. Elige otra.',locked:'Los detalles se bloquean tras el primer giro. Pulsa “Reiniciar” para cambiarlos.',story:'La historia de tu jugador',sample:'Historia de ejemplo',copy:'Copiar historia',copied:'Historia copiada',copyFail:'No se pudo copiar. Puedes seleccionar el texto.',season:'temporadas',goals:'goles',assists:'asistencias',league:'ligas',champions:'Champions League',world:'Mundiales',continental:'copas continentales',ballon:'Balones de Oro',club:'club',style:'estilo',record:'Números de carrera',titles:'Palmarés',none:'ningún trofeo',fallbackName:'Tu jugador'},
    fr:{title:'Personnalise ta carte',hint:'Choisis un visage, un surnom et une signature. Ces détails sont facultatifs.',avatar:['Silhouette','Capitaine','Meneur','Sprinteur','Baller'],nickname:'Surnom',signature:'Signature',nicknameHint:'Ex. Le Maestro',signatureHint:'Ta signature',upload:'Importer un visage',local:'PNG, JPG ou WEBP · 2 Mo maximum',photo:'Visage personnel sélectionné',photoError:'Choisis une image PNG, JPG ou WEBP de 2 Mo maximum.',photoLarge:'Cette image est trop grande. Choisis une photo plus petite.',photoFailed:'Impossible de lire cette image. Choisis-en une autre.',locked:'Les détails sont verrouillés après le premier tour. Appuie sur « Recommencer » pour les modifier.',story:'L’histoire de ton joueur',sample:'Exemple d’histoire',copy:'Copier l’histoire',copied:'Histoire copiée',copyFail:'Impossible de copier. Tu peux sélectionner le texte.',season:'saisons',goals:'buts',assists:'passes décisives',league:'championnats',champions:'Ligues des champions',world:'Coupes du monde',continental:'coupes continentales',ballon:'Ballons d’Or',club:'club',style:'style',record:'Chiffres de carrière',titles:'Palmarès',none:'aucun trophée',fallbackName:'Ton joueur'}
  };
  const lang = () => ['it','en','es','fr'].includes(document.documentElement.lang) ? document.documentElement.lang : 'it';
  const words = () => copy[lang()];
  const singularTrophies = {
    it:{league:'campionato',champions:'Champions League',world:'Mondiale',continental:'coppa continentale',ballon:'Pallone d’Oro'},
    en:{league:'league title',champions:'Champions League title',world:'World Cup',continental:'continental cup',ballon:'Ballon d’Or'},
    es:{league:'liga',champions:'Champions League',world:'Mundial',continental:'copa continental',ballon:'Balón de Oro'},
    fr:{league:'championnat',champions:'Ligue des champions',world:'Coupe du monde',continental:'coupe continentale',ballon:'Ballon d’Or'}
  };
  const cleanText = text => Array.from(String(text || '').replace(/[\u0000-\u001f\u007f]/g,'').trim()).slice(0,24).join('');
  const allowedAvatar = ['silhouette','captain','playmaker','sprinter','baller','photo'];
  function normalize(data) {
    if (!data || typeof data !== 'object') return {...DEFAULT};
    const validPhoto = typeof data.photo === 'string' && data.photo.length <= MAX_PHOTO_DATA && /^data:image\/(?:webp|png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(data.photo);
    const avatar = allowedAvatar.includes(data.avatar) && (data.avatar !== 'photo' || validPhoto) ? data.avatar : 'silhouette';
    return {avatar,nickname:cleanText(data.nickname),signature:cleanText(data.signature),photo:validPhoto ? data.photo : ''};
  }
  function loadDraft() {try {return normalize(JSON.parse(localStorage.getItem(STORE) || 'null'));} catch {return {...DEFAULT};}}
  let personality = loadDraft(), currentSnapshot = null, persistenceRegistered = false, uploadRevision = 0, storyText = '', storyFeedbackKey = '';
  let panel, fieldset, hint, lockNotice, avatarGrid, nickname, signature, photoStatus, uploadButton, uploadInput, storyPanel, storyParagraph, storyStatus, copyButton;
  const avatarKeys = ['silhouette','captain','playmaker','sprinter','baller'];
  const defaultSilhouette = document.querySelector('.card-silhouette')?.getAttribute('src') || 'player-silhouette.png';
  function avatarSvg(key) {
    const palette = {captain:['#ac7152','#211d1c','#253d3b','#e8a948'],playmaker:['#c18b64','#513226','#1c384e','#70c3c0'],sprinter:['#684831','#151a1b','#4a2538','#e98673'],baller:['#d8a380','#342a23','#343c20','#d3c773']}[key] || ['#9d6d50','#202323','#354338','#e1b867'];
    const [skin,hair,shirt,trim] = palette;
    const haircut = key === 'sprinter' ? '<path d="M65 62q-3-28 31-29 37 0 36 31l-8-6-5-12-39 1-10 18z"/>' : key === 'playmaker' ? '<path d="M65 69V54q4-34 34-29 36-5 37 30v17l-13-25q-30 10-48 1l-8 24z"/>' : key === 'baller' ? '<path d="M65 70V49q5-24 31-21l29-3 12 11-5 36-10-23-49 2-6 22z"/>' : '<path d="M65 70V53q2-27 33-26 34-2 36 27v16l-12-20q-25 6-49 0l-8 22z"/>';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="${shirt}" d="M11 200v-26q9-23 55-33l21-12h26l22 12q43 10 54 33v26z"/><path fill="${trim}" opacity=".85" d="m68 140 21 21h22l23-21 7 4-26 25H85l-26-25z"/><path fill="${skin}" d="M84 113h32v29q-14 20-32 0z"/><path fill="#000" opacity=".12" d="M84 113h32v19q-18 7-32-5z"/><path fill="${skin}" d="M68 63q0-28 32-28t32 28v35q-6 29-32 34-26-5-32-34z"/><path fill="${skin}" d="M67 73q-13-5-10 10t12 14zm66 0q13-5 10 10t-12 14z"/><g fill="${hair}">${haircut}</g><path fill="none" stroke="${hair}" stroke-width="3.5" stroke-linecap="round" d="m79 73 10-2m24 0 10 2"/><circle fill="#272525" cx="86" cy="81" r="2.5"/><circle fill="#272525" cx="116" cy="81" r="2.5"/><path fill="none" stroke="#694a36" stroke-width="2" stroke-linecap="round" d="m98 85-3 14 8 1m-11 10q10 6 18 0"/><path fill="${trim}" d="M160 163h9v16h-9z" opacity=".6"/></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  const avatarSources = Object.fromEntries(avatarKeys.map(key => [key,key === 'silhouette' ? defaultSilhouette : avatarSvg(key)]));
  function snapshot() {
    const api = window.fcwExperience;
    if (api?.snapshot) {try {return api.snapshot();} catch {}}
    return {started:Boolean($('careerName')?.readOnly),complete:!$('careerSummary')?.hidden,demo:false,identity:{name:$('careerName')?.value || '',shirtNumber:$('shirtNumber')?.value || ''},playerResult:{name:$('cardName')?.value || '',position:$('cardPosition')?.textContent || '',career:{seasons:$('careerHighlightSeasons')?.textContent,goals:$('careerHighlightGoals')?.textContent,assists:$('careerHighlightAssists')?.textContent}},context:{}};
  }
  function isLocked(state = currentSnapshot || snapshot()) {return Boolean(state?.started || (!state?.demo && state?.complete));}
  function writeDraft() {try {localStorage.setItem(STORE,JSON.stringify(personality));} catch {}}
  function translated(value) {
    const text = typeof value === 'string' || typeof value === 'number' ? String(value) : value?.value || value?.name || '';
    try {if (window.fcwExperience?.translate) return window.fcwExperience.translate(text); if (typeof tr === 'function') return tr(text);} catch {}
    return text;
  }
  function updatePersonalization() {
    const c = words();
    panel.querySelector('summary').textContent = c.title;
    hint.textContent = c.hint;
    panel.querySelector('[data-label="nickname"]').textContent = c.nickname;
    panel.querySelector('[data-label="signature"]').textContent = c.signature;
    nickname.placeholder = c.nicknameHint;
    signature.placeholder = c.signatureHint;
    avatarGrid.querySelectorAll('button').forEach((button,index) => {
      button.querySelector('span').textContent = c.avatar[index];
      button.setAttribute('aria-label',c.avatar[index]);
      button.setAttribute('aria-pressed',String(personality.avatar === avatarKeys[index]));
    });
    nickname.value = personality.nickname;
    signature.value = personality.signature;
    const locked = isLocked();
    fieldset.disabled = locked;
    lockNotice.hidden = !locked;
    lockNotice.textContent = c.locked;
    uploadButton.textContent = c.upload;
    photoStatus.textContent = personality.avatar === 'photo' ? c.photo : c.local;
  }
  function saveInput() {
    if (isLocked()) {updatePersonalization();return;}
    personality.nickname = cleanText(nickname.value);
    personality.signature = cleanText(signature.value);
    writeDraft();
    applyCard();
  }
  function applyCard() {
    const inner = $('cardInner'), image = inner?.querySelector('.card-silhouette');
    if (!inner || !image) return;
    const src = personality.avatar === 'photo' ? personality.photo : avatarSources[personality.avatar] || defaultSilhouette;
    if (image.getAttribute('src') !== src) image.src = src;
    image.alt = (personality.avatar === 'silhouette' ? {it:'Silhouette del calciatore',en:'Player silhouette',es:'Silueta del jugador',fr:'Silhouette du joueur'} : {it:'Ritratto del calciatore',en:'Player portrait',es:'Retrato del jugador',fr:'Portrait du joueur'})[lang()];
    let nick = $('cardPersonalityNickname'), sign = $('cardPersonalitySignature');
    if (!nick) {nick = document.createElement('div');nick.id='cardPersonalityNickname';nick.className='card-personality-nickname';inner.append(nick);}
    if (!sign) {sign = document.createElement('div');sign.id='cardPersonalitySignature';sign.className='card-personality-signature';inner.append(sign);}
    nick.textContent = personality.nickname;
    nick.hidden = !personality.nickname;
    inner.dataset.personalityNickname=String(Boolean(personality.nickname));
    sign.textContent = personality.signature;
    sign.hidden = !personality.signature;
    nick.setAttribute('aria-label',words().nickname + ': ' + personality.nickname);
    sign.setAttribute('aria-label',words().signature + ': ' + personality.signature);
  }
  function valueText(value) {
    if (value === null || value === undefined || value === '' || value === '—') return '';
    if (typeof value === 'number') return String(value);
    return translated(value);
  }
  function makeStory(state) {
    const c = words(), p = state?.playerResult || {}, context = state?.context || {}, career = p.career || {};
    const name = cleanText(p.name || state?.identity?.name || $('cardName')?.value) || c.fallbackName;
    const labelName = name + (personality.nickname ? ` «${personality.nickname}»` : '');
    const nation = valueText(context.nation || p.nation || career.nation);
    const club = valueText(context.club || p.club || career.club);
    const rawPosition = String(p.position || context.position || '');
    const position = valueText(rawPosition);
    const seasons = valueText(context.seasons || career.seasons || p.seasons || $('careerHighlightSeasons')?.textContent);
    const style = valueText(context.style || p.playStyle || career.playStyle);
    const subject = labelName + (nation ? ` (${nation})` : '');
    const identityClauses = {
      it:[club && `il suo club è ${club}`,style && `il suo stile di gioco è ${style}`],
      en:[club && `their club is ${club}`,style && `their playing style is ${style}`],
      es:[club && `su club es ${club}`,style && `su estilo de juego es ${style}`],
      fr:[club && `son club est ${club}`,style && `son style de jeu est ${style}`]
    };
    const identityTail = identityClauses[lang()].filter(Boolean).join({it:' e ',en:' and ',es:' y ',fr:' et '}[lang()]);
    const firstBuilders = {
      it:()=>`${subject} chiude${seasons ? ` una carriera di ${seasons} stagioni` : ' la sua carriera'}${position ? ` nel ruolo di ${position}` : ''}${identityTail ? `; ${identityTail}` : ''}.`,
      en:()=>`${subject} finishes${seasons ? ` a career spanning ${seasons} seasons` : ' their career'}${position ? ` in the ${position} role` : ''}${identityTail ? `; ${identityTail}` : ''}.`,
      es:()=>`${subject} termina${seasons ? ` una carrera de ${seasons} temporadas` : ' su carrera'}${position ? ` en la posición de ${position}` : ''}${identityTail ? `; ${identityTail}` : ''}.`,
      fr:()=>`${subject} termine${seasons ? ` une carrière de ${seasons} saisons` : ' sa carrière'}${position ? ` au poste de ${position}` : ''}${identityTail ? ` ; ${identityTail}` : ''}.`
    };
    const first = firstBuilders[lang()]();
    const goals = valueText(context.goals || career.goals || p.goals || $('careerHighlightGoals')?.textContent), assists = valueText(context.assists || career.assists || p.assists || $('careerHighlightAssists')?.textContent);
    const numbers = [goals && `${goals} ${c.goals}`,assists && `${assists} ${c.assists}`].filter(Boolean);
    const trophies = career.trophies || p.trophies || career;
    const trophyFields = [['league','league','#palLeague'],['champions','champions','#palUcl'],['world','world','#palWorld'],['continental','continental','#palContinent'],['ballon','ballon','#palBallon']];
    const titles = trophyFields.map(([key,label,selector]) => {
      const raw = document.querySelector(selector)?.textContent || trophies[key] || (key === 'champions' ? trophies.ucl : undefined);
      const val = valueText(raw);
      return val && /[1-9]/.test(val) ? `${val} ${val === '1' ? singularTrophies[lang()][label] : c[label]}` : '';
    }).filter(Boolean);
    const conjunction = {it:' e ',en:' and ',es:' y ',fr:' et '}[lang()];
    const join = values => values.length > 1 ? values.slice(0,-1).join(', ') + conjunction + values[values.length-1] : values[0] || '';
    const record = join(numbers), honours = join(titles);
    const secondBuilders = {
      it:()=>`${record ? `Il bilancio è di ${record}; ` : ''}${honours ? `in bacheca ci sono ${honours}` : 'la carriera si conclude senza trofei'}.`,
      en:()=>`${record ? `The final record is ${record}; ` : ''}${honours ? `the honours include ${honours}` : 'the career ends without trophies'}.`,
      es:()=>`${record ? `El balance es de ${record}; ` : ''}${honours ? `el palmarés incluye ${honours}` : 'la carrera termina sin trofeos'}.`,
      fr:()=>`${record ? `Le bilan est de ${record} ; ` : ''}${honours ? `le palmarès comprend ${honours}` : 'la carrière se termine sans trophées'}.`
    };
    return first + ' ' + secondBuilders[lang()]();
  }
  function renderStory(state) {
    if (!storyPanel) return;
    storyPanel.hidden = !state?.complete;
    if (!state?.complete) return;
    storyPanel.querySelector('summary').textContent = state.demo ? words().sample : words().story;
    storyText = makeStory(state);
    storyParagraph.textContent = storyText;
    copyButton.textContent = words().copy;
    storyStatus.textContent = words()[storyFeedbackKey] || '';
  }
  async function uploadPhoto(file) {
    if (!file || isLocked()) return;
    const c = words(), revision = ++uploadRevision;
    if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024 || file.size === 0) {photoStatus.textContent=c.photoError;return;}
    const source = URL.createObjectURL(file);
    try {
      const img = new Image();img.src = source;await img.decode();
      if (img.naturalWidth * img.naturalHeight > 16000000 || img.naturalWidth < 16 || img.naturalHeight < 16) {photoStatus.textContent=c.photoLarge;return;}
      const surface = document.createElement('canvas');surface.width=192;surface.height=192;
      const ctx = surface.getContext('2d'), scale = Math.min(192 / img.naturalWidth,192 / img.naturalHeight);
      ctx.drawImage(img,(192-img.naturalWidth*scale)/2,(192-img.naturalHeight*scale)/2,img.naturalWidth*scale,img.naturalHeight*scale);
      const data = surface.toDataURL('image/webp',.86);
      if (data.length > MAX_PHOTO_DATA) {photoStatus.textContent=c.photoLarge;return;}
      if (revision !== uploadRevision || isLocked()) return;
      personality.avatar='photo';personality.photo=data;writeDraft();updatePersonalization();applyCard();
    } catch {photoStatus.textContent=c.photoFailed;} finally {URL.revokeObjectURL(source);uploadInput.value='';}
  }
  function mount() {
    if (panel) return;
    const host = $('playerSetupBody') || $('extraToolsPanel-cards') || document.querySelector('.player-identity-entry')?.parentElement;
    if (!host) return;
    panel = document.createElement('details');panel.id='personalitySetup';panel.className='personality-setup';
    const summary=document.createElement('summary');panel.append(summary);
    fieldset=document.createElement('fieldset');fieldset.className='personality-fields';panel.append(fieldset);
    hint=document.createElement('p');hint.className='personality-hint';fieldset.append(hint);
    avatarGrid=document.createElement('div');avatarGrid.className='personality-avatar-grid';fieldset.append(avatarGrid);
    avatarKeys.forEach(key => {
      const button=document.createElement('button');button.type='button';button.className='personality-avatar';
      const img=document.createElement('img');img.src=avatarSources[key];img.alt='';
      const label=document.createElement('span');button.append(img,label);
      button.addEventListener('click',() => {if(isLocked())return;personality.avatar=key;writeDraft();updatePersonalization();applyCard();});
      avatarGrid.append(button);
    });
    const fields=document.createElement('div');fields.className='personality-inputs';fieldset.append(fields);
    [['nickname','personalityNickname'],['signature','personalitySignature']].forEach(([key,id]) => {
      const label=document.createElement('label');label.className='personality-label';const caption=document.createElement('span');caption.dataset.label=key;
      const input=document.createElement('input');input.id=id;input.type='text';input.maxLength=24;input.autocomplete='off';input.spellcheck=false;input.addEventListener('input',saveInput);label.append(caption,input);fields.append(label);
      if (key==='nickname') nickname=input;else signature=input;
    });
    const uploadRow=document.createElement('div');uploadRow.className='personality-upload-row';fieldset.append(uploadRow);
    uploadInput=document.createElement('input');uploadInput.type='file';uploadInput.accept='image/png,image/jpeg,image/webp';uploadInput.hidden=true;uploadInput.addEventListener('change',()=>uploadPhoto(uploadInput.files?.[0]));
    uploadButton=document.createElement('button');uploadButton.type='button';uploadButton.className='personality-upload';uploadButton.addEventListener('click',()=>uploadInput.click());
    photoStatus=document.createElement('span');photoStatus.className='personality-photo-status';photoStatus.setAttribute('role','status');uploadRow.append(uploadButton,uploadInput,photoStatus);
    lockNotice=document.createElement('p');lockNotice.className='personality-lock';fieldset.after(lockNotice);host.append(panel);
    const storyHost=document.querySelector('#careerSummary .career-record') || $('careerSummary');
    if (storyHost) {
      storyPanel=document.createElement('details');storyPanel.id='careerStory';storyPanel.className='career-story';storyPanel.hidden=true;
      const title=document.createElement('summary');const body=document.createElement('div');body.className='career-story-body';storyParagraph=document.createElement('p');storyParagraph.className='career-story-copy';
      const actions=document.createElement('div');actions.className='career-story-actions';copyButton=document.createElement('button');copyButton.type='button';copyButton.className='career-story-copy-btn';storyStatus=document.createElement('span');storyStatus.className='career-story-status';storyStatus.setAttribute('role','status');
      copyButton.addEventListener('click',async()=>{try {await navigator.clipboard.writeText(storyText);storyFeedbackKey='copied';} catch {storyFeedbackKey='copyFail';}storyStatus.textContent=words()[storyFeedbackKey];});
      actions.append(copyButton,storyStatus);body.append(storyParagraph,actions);storyPanel.append(title,body);storyHost.append(storyPanel);
    }
    updatePersonalization();applyCard();
  }
  function registerPersistence() {
    if (persistenceRegistered || !window.fcwExperience?.registerPersistence) return;
    window.fcwExperience.registerPersistence({id:'personality',serialize:()=>normalize(personality),restore(data,state){personality=normalize(data);currentSnapshot=state || snapshot();updatePersonalization();applyCard();renderStory(currentSnapshot);}});
    persistenceRegistered=true;
  }
  function refresh(event) {
    mount();if (!panel) return;
    const previous=currentSnapshot;
    currentSnapshot=event?.detail?.snapshot || event?.detail?.state || (event?.detail?.playerResult ? event.detail : snapshot());
    registerPersistence();updatePersonalization();applyCard();renderStory(currentSnapshot);
    if (!previous?.started && currentSnapshot?.started && !currentSnapshot.demo) {saveInput();panel.open=false;++uploadRevision;}
  }
  window.fcwPersonality = {apply:applyCard,configuration:()=>normalize(personality),story:()=>storyText,
    restoreDraft(data){++uploadRevision;personality=normalize(data);writeDraft();currentSnapshot=snapshot();refresh();},
    exportElements:()=>[$('cardPersonalityNickname'),$('cardPersonalitySignature')].filter(el=>el&&!el.hidden)};
  ['fcw:state','fcw:complete','fcw:language','fcw:ready'].forEach(name=>window.addEventListener(name,refresh));
  window.addEventListener('fcw:reset',event=>{++uploadRevision;currentSnapshot=event.detail?.snapshot || snapshot();storyFeedbackKey='';if (fieldset)fieldset.disabled=false;if(storyPanel){storyPanel.hidden=true;storyStatus.textContent='';}refresh(event);});
  window.addEventListener('fcw:account-restore', () => {
    ++uploadRevision;
    personality = loadDraft(); currentSnapshot = snapshot(); storyFeedbackKey = '';
    if (storyStatus) storyStatus.textContent = '';
    refresh();
  });
  $('languageSelect')?.addEventListener('change',()=>{requestAnimationFrame(()=>refresh());});
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>refresh(),{once:true});else refresh();
})();
