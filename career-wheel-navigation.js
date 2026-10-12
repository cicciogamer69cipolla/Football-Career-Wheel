/* One navigation hub owns the existing tools; live career state stays on the pitch. */
(() => {
  'use strict';
  const copy = {
    it: {
      nav: 'Navigazione Career Wheel', close: 'Chiudi', level: 'Livello',
      labels: ['Messaggi', 'Feedback', 'Obiettivi', 'Classifiche', 'Amici', 'Archivio', 'Profilo'],
      intros: ['Novità e aggiornamenti di Career Wheel.', 'Segnala un problema o proponi la tua prossima idea.', 'Scegli la tua prossima impresa. I progressi restano tra le carriere.', 'Le tue carriere migliori e i tuoi primati su questo dispositivo.', 'Invita il tuo gruppo e sfidatevi con le ruote.', 'Ritrova le tue carriere, la collezione e i tornei.', 'Il tuo livello, i titoli e gli stili della carta.'],
      tabs: { missions:'Missioni', daily:'Sfida del giorno', scenarios:'Scenari', careers:'Carriere', album:'Album', tournament:'Torneo', saved:'Carriere salvate', records:'Record personali', invite:'Invita', custom:'Sfida con codice', styles:'Livello e stili', guide:'Guida alle carte' },
      local:'Su questo dispositivo', profileNote:'XP, missioni, stili e carriere sono salvati in questo browser. Il nome del calciatore si sceglie prima di ogni carriera.',
      inviteTitle:'La tua prossima sfida è in compagnia.', inviteNote:'Crea una stanza privata oppure entra con il codice ricevuto. Puoi anche condividere una sfida con la stessa sequenza di ruote.',
      lobby:'Apri lobby online', room:'La tua stanza', copy:'Copia invito', copied:'Invito copiato.', manual:'Seleziona il link e copialo.', noRoom:'Crea una stanza nella lobby per ottenere il tuo invito.', players:n=>`${n} partecipanti`,
      sort:'Ordina per', sorts:['Career Points', 'OVR'], rankingNote:'Classifica delle carriere salvate. I Career Points usano lo stesso calcolo delle sfide private; gol, assist, stagioni e trofei contano insieme.',
      empty:'Salva una carriera completa per vederla in classifica.', open:'Apri carriera', onlineRank:'Per confrontarti con gli amici, usa la classifica della tua stanza.', objectives:n=>`${n} missioni ottenute`, version:'Versione'
    },
    en: {
      nav:'Career Wheel navigation', close:'Close', level:'Level', labels:['Messages','Feedback','Objectives','Rankings','Friends','Archive','Profile'],
      intros:['Career Wheel news and updates.','Report an issue or suggest your next idea.','Choose your next feat. Progress carries across careers.','Your best careers and personal records on this device.','Invite your group and challenge each other with the wheels.','Find your careers, collection and tournaments.','Your level, titles and card styles.'],
      tabs:{missions:'Quests',daily:'Daily challenge',scenarios:'Scenarios',careers:'Careers',album:'Album',tournament:'Tournament',saved:'Saved careers',records:'Personal records',invite:'Invite',custom:'Code challenge',styles:'Level & styles',guide:'Card guide'},
      local:'On this device',profileNote:'XP, quests, styles and careers are saved in this browser. Choose your footballer’s name before each career.',inviteTitle:'Your next challenge is with friends.',inviteNote:'Create a private room or join with an invitation code. You can also share a challenge with the same wheel sequence.',lobby:'Open online lobby',room:'Your room',copy:'Copy invitation',copied:'Invitation copied.',manual:'Select and copy the link.',noRoom:'Create a room in the lobby to get your invitation.',players:n=>`${n} players`,sort:'Sort by',sorts:['Career Points','OVR'],rankingNote:'Your saved career ranking. Career Points use the private challenge formula: goals, assists, seasons and trophies count together.',empty:'Save a completed career to see it in the rankings.',open:'Open career',onlineRank:'Use your room standings to compete with friends.',objectives:n=>`${n} quests earned`,version:'Version'
    },
    es: {
      nav:'Navegación de Career Wheel',close:'Cerrar',level:'Nivel',labels:['Mensajes','Feedback','Objetivos','Clasificaciones','Amigos','Archivo','Perfil'],
      intros:['Novedades y actualizaciones de Career Wheel.','Señala un problema o propone tu próxima idea.','Elige tu próxima hazaña. El progreso se conserva entre carreras.','Tus mejores carreras y récords en este dispositivo.','Invita a tu grupo y competid con las ruletas.','Encuentra tus carreras, colección y torneos.','Tu nivel, títulos y estilos de carta.'],
      tabs:{missions:'Misiones',daily:'Reto diario',scenarios:'Escenarios',careers:'Carreras',album:'Álbum',tournament:'Torneo',saved:'Carreras guardadas',records:'Récords personales',invite:'Invitar',custom:'Reto con código',styles:'Nivel y estilos',guide:'Guía de cartas'},
      local:'En este dispositivo',profileNote:'Los XP, misiones, estilos y carreras se guardan en este navegador. Elige el nombre de tu futbolista antes de cada carrera.',inviteTitle:'Tu próximo reto es con amigos.',inviteNote:'Crea una sala privada o entra con un código de invitación. También puedes compartir un reto con la misma secuencia de ruletas.',lobby:'Abrir lobby online',room:'Tu sala',copy:'Copiar invitación',copied:'Invitación copiada.',manual:'Selecciona y copia el enlace.',noRoom:'Crea una sala en el lobby para obtener tu invitación.',players:n=>`${n} participantes`,sort:'Ordenar por',sorts:['Career Points','OVR'],rankingNote:'Clasificación de tus carreras guardadas. Los Career Points usan la fórmula de los retos privados: goles, asistencias, temporadas y trofeos cuentan juntos.',empty:'Guarda una carrera completa para verla en la clasificación.',open:'Abrir carrera',onlineRank:'Usa la clasificación de tu sala para competir con amigos.',objectives:n=>`${n} misiones obtenidas`,version:'Versión'
    },
    fr: {
      nav:'Navigation Career Wheel',close:'Fermer',level:'Niveau',labels:['Messages','Feedback','Objectifs','Classements','Amis','Archives','Profil'],
      intros:['Nouveautés et mises à jour de Career Wheel.','Signalez un problème ou proposez votre prochaine idée.','Choisissez votre prochain exploit. La progression reste entre les carrières.','Vos meilleures carrières et records sur cet appareil.','Invitez votre groupe et défiez-vous avec les roues.','Retrouvez vos carrières, collection et tournois.','Votre niveau, vos titres et styles de carte.'],
      tabs:{missions:'Missions',daily:'Défi du jour',scenarios:'Scénarios',careers:'Carrières',album:'Album',tournament:'Tournoi',saved:'Carrières enregistrées',records:'Records personnels',invite:'Inviter',custom:'Défi avec code',styles:'Niveau et styles',guide:'Guide des cartes'},
      local:'Sur cet appareil',profileNote:'Les XP, missions, styles et carrières sont enregistrés dans ce navigateur. Choisissez le nom de votre footballeur avant chaque carrière.',inviteTitle:'Votre prochain défi se joue entre amis.',inviteNote:'Créez une salle privée ou rejoignez-la avec un code d’invitation. Vous pouvez aussi partager un défi avec la même suite de roues.',lobby:'Ouvrir le lobby en ligne',room:'Votre salle',copy:'Copier l’invitation',copied:'Invitation copiée.',manual:'Sélectionnez et copiez le lien.',noRoom:'Créez une salle dans le lobby pour obtenir votre invitation.',players:n=>`${n} participants`,sort:'Trier par',sorts:['Career Points','OVR'],rankingNote:'Classement des carrières enregistrées. Les Career Points suivent la formule des défis privés : buts, passes, saisons et trophées comptent ensemble.',empty:'Enregistrez une carrière terminée pour la voir au classement.',open:'Ouvrir la carrière',onlineRank:'Utilisez le classement de votre salle pour défier vos amis.',objectives:n=>`${n} missions obtenues`,version:'Version'
    }
  };
  Object.entries(copy).forEach(([language,value]) => value.labels.push({it:'Account',en:'Account',es:'Cuenta',fr:'Compte'}[language]));
  copy.it.intros[4]='Cerca un nickname, gestisci le richieste e ritrova i tuoi amici.';
  copy.en.intros[4]='Search a nickname, manage requests and find your saved friends.';
  copy.es.intros[4]='Busca un apodo, gestiona solicitudes y encuentra a tus amigos.';
  copy.fr.intros[4]='Cherche un pseudo, gère les demandes et retrouve tes amis.';
  copy.it.intros.push('Accedi per ritrovare i tuoi progressi o crea il tuo account.');
  copy.en.intros.push('Sign in to find your progress or create your account.');
  copy.es.intros.push('Accede para recuperar tu progreso o crea tu cuenta.');
  copy.fr.intros.push('Connecte-toi pour retrouver ta progression ou crée ton compte.');
  const routes = ['messages','feedback','objectives','rankings','friends','archive','profile','account'];
  const groups = {messages:[],feedback:[],objectives:['missions','daily','scenarios','custom'],rankings:['saved','records'],friends:[],archive:['careers','album','tournament'],profile:['styles','guide'],account:[]};
  const $ = id => document.getElementById(id);
  const words = () => copy[document.documentElement.lang] || copy.it;
  const make = (tag, className='', id='', text='') => { const node=document.createElement(tag);node.className=className;if(id)node.id=id;node.textContent=text;return node; };
  const number = value => Number(String(value ?? '').match(/\d+/)?.[0]) || 0;
  let mounted=false, active='', returnFocus=null, sort='points';
  const pages={}, panels={}, selections={}, links={}, tabButtons={};
  let nav,dialog,title,intro,eyebrow,closeButton,tabs,content,levelBadge,rankingList,rankingHelp,sortLabel,sortSelect,profileNote,inviteHeading,inviteNote,inviteEmpty,inviteStatus,inviteBox,inviteLink,inviteCopy,roomInfo,rankingRoomNote;
  function move(id, destination, disclosure=false) {
    const node=$(id); if(!node)return;
    destination.append(node);
    if(disclosure){node.open=true;node.classList.add('cw-hub-module');}
  }
  function close() { if(dialog?.open)dialog.close(); }
  function lobby() {close();$('stadiumOnline').click();}
  function action(parent, id, handler) {const button=make('button','cw-action',id);button.type='button';button.addEventListener('click',handler);parent.append(button);return button;}
  function init() {
    if(mounted)return;
    // Challenge panels must mount before their original parent is retired.
    if(!$('fcwScenarios')||!$('profileProgression')||!$('fcwPersonalRecords'))return;
    mounted=true;
    nav=make('nav','cw-top-nav','cwTopNav');
    routes.forEach(route=>{
      const link=make('button','cw-top-link',`cwNav-${route}`);link.type='button';link.dataset.route=route;
      link.setAttribute('aria-haspopup','dialog');link.setAttribute('aria-controls','cwHubDialog');
      link.append(make('span','cw-nav-label'));
      if(route==='profile'){levelBadge=make('small','cw-nav-profile-level');link.append(levelBadge);}
      link.addEventListener('click',()=>open(route));nav.append(link);links[route]=link;
    });
    document.querySelector('main.app').prepend(nav);
    dialog=make('dialog','cw-hub-dialog','cwHubDialog');dialog.setAttribute('aria-labelledby','cwHubTitle');dialog.setAttribute('aria-describedby','cwHubIntro');
    const head=make('header','cw-hub-head'),headCopy=make('div');
    eyebrow=make('small','','cwHubEyebrow');title=make('h2','','cwHubTitle');intro=make('p','','cwHubIntro');headCopy.append(eyebrow,title,intro);
    closeButton=make('button','cw-hub-close','cwHubClose');closeButton.type='button';closeButton.autofocus=true;closeButton.addEventListener('click',close);head.append(headCopy,closeButton);
    tabs=make('nav','cw-hub-tabs','cwHubTabs');tabs.setAttribute('role','tablist');content=make('div','cw-hub-content');
    routes.forEach(route=>{
      const page=make('section','cw-hub-page',`cwHubPage-${route}`);page.hidden=true;pages[route]=page;content.append(page);
      groups[route].forEach(key=>{const panel=make('section','cw-hub-tabpanel',`cwHubPanel-${key}`);panel.hidden=true;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`cwHubTab-${key}`);page.append(panel);panels[key]=panel;});
      selections[route]=groups[route][0] || '';
    });
    dialog.append(head,tabs,content);document.body.append(dialog);
    move('achievementPanel',panels.missions);$('achievementPanel').hidden=false;
    move('dailyChallengeDisclosure',panels.daily,true);move('fcwScenarios',panels.scenarios,true);
    move('fcwPersonalRecords',panels.records,true);move('fcwCustomChallenges',panels.custom,true);
    move('archiveDisclosure',panels.careers,true);move('cardAlbumDisclosure',panels.album,true);move('careerTournament',panels.tournament,true);
    move('profileProgression',panels.styles);move('profileRewards',panels.styles);
    profileNote=make('p','cw-muted');panels.styles.append(profileNote);move('ovrLegend',panels.guide,true);
    // The timeline belongs to the result. Keep legacy tool IDs for old renderers.
    move('careerTimelinePanel',$('careerSummary'));
    $('extraTools').hidden=true;document.documentElement.classList.add('cw-nav-ready');
    const rankingToolbar=make('label','cw-field cw-ranking-sort');sortLabel=make('span');sortSelect=make('select','','cwRankingSort');sortSelect.setAttribute('aria-label',words().sort);
    ['points','ovr'].forEach(value=>{const option=make('option');option.value=value;sortSelect.append(option);});
    sortSelect.addEventListener('change',()=>{sort=sortSelect.value;renderRankings();});rankingToolbar.append(sortLabel,sortSelect);
    rankingHelp=make('p','cw-muted');rankingList=make('ol','cw-ranking-list','cwRankingList');rankingRoomNote=make('p','cw-muted');
    panels.saved.append(rankingHelp,rankingToolbar,rankingList,rankingRoomNote);action(panels.saved,'cwRankingLobby',lobby);
    window.fcwCommunity?.mount({messages:pages.messages,feedback:pages.feedback});
    window.fcwAccount?.mount({account:pages.account,friends:pages.friends});
    dialog.addEventListener('close',()=>{document.documentElement.classList.remove('cw-hub-open');routes.forEach(route=>{links[route].removeAttribute('aria-current');links[route].removeAttribute('data-active');});active='';if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();});
    tabs.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const keys=groups[active];const index=keys.indexOf(selections[active]);if(index<0)return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?keys.length-1:(index+(event.key==='ArrowRight'?1:-1)+keys.length)%keys.length;selectTab(keys[next]);tabButtons[keys[next]].focus();});
    $('archiveList').addEventListener('click',event=>{const button=event.target.closest('.archive-item-actions button');if(button&&button===button.parentElement.querySelector('button')){close();if(document.querySelector('main.app').dataset.view!=='solo'){$('stadiumSolo').click();requestAnimationFrame(()=>$('careerSummary').scrollIntoView({behavior:'smooth',block:'start'}));}}});
    // Legacy links route to the new home rather than to hidden accordions.
    [['progress','objectives','missions'],['challenges','objectives','scenarios'],['cards','archive','album']].forEach(([old,route,key])=>$(`extraToolsTab-${old}`)?.addEventListener('click',()=>open(route,key)));
    ['fcw:challenge','fcw:reset'].forEach(event=>window.addEventListener(event,()=>{if(dialog.open&&['objectives','friends'].includes(active))close();}));
    ['fcw:language','fcw:achievements','fcw:complete','fcw:room','fcw:account','fcw:account-restore'].forEach(event=>window.addEventListener(event,render));
    $('languageSelect').addEventListener('change',()=>queueMicrotask(render));window.addEventListener('storage',render);
    const originalArchive=window.renderArchive;
    window.renderArchive=function(...args){const value=originalArchive.apply(this,args);renderRankings();return value;};
    window.fcwNavigation={open,close};window.renderArchive();render();
    if(new URLSearchParams(location.search).has('friend'))open('friends');
  }
  function selectTab(key) {
    if(!groups[active]?.includes(key))return;
    selections[active]=key;
    groups[active].forEach(id=>{panels[id].hidden=id!==key;tabButtons[id].setAttribute('aria-selected',String(id===key));tabButtons[id].tabIndex=id===key?0:-1;});
    content.scrollTop=0;
  }
  function open(route,key) {
    if(!mounted||!routes.includes(route))return;
    if(!dialog.open)returnFocus=document.activeElement;
    active=route;if(key&&groups[route].includes(key))selections[route]=key;
    tabs.replaceChildren();
    groups[route].forEach(id=>{const button=make('button','','cwHubTab-'+id);button.type='button';button.setAttribute('role','tab');button.setAttribute('aria-controls',`cwHubPanel-${id}`);button.addEventListener('click',()=>selectTab(id));tabs.append(button);tabButtons[id]=button;});
    routes.forEach(id=>{pages[id].hidden=id!==route;links[id].toggleAttribute('data-active',id===route);if(id===route)links[id].setAttribute('aria-current','page');else links[id].removeAttribute('aria-current');});
    tabs.hidden=groups[route].length<2;
    render();if(groups[route].length)selectTab(selections[route]);else content.scrollTop=0;
    if(!dialog.open){dialog.showModal();document.documentElement.classList.add('cw-hub-open');}closeButton.focus();
  }
  function savedResults() {
    let entries=[];try{entries=typeof savedCareers==='function'?savedCareers():[];}catch{}
    return entries.map(entry=>{
      const answers=typeof normalizeCareerAnswers==='function'?normalizeCareerAnswers(entry):entry.answers||[];
      const read=question=>answers.find((answer,index)=>steps[index]?.q===question)?.value;
      const valueFor=(stored,question)=>stored==null||stored===''||stored==='—'?read(question):stored;
      const stats=(entry.stats||[]).map(stat=>number(Array.isArray(stat)?stat[1]:stat));
      const result={position:valueFor(entry.position,'In quale ruolo giochi?'),overall:number(entry.overall),stats,career:{goals:number(valueFor(entry.goals,'Quanti gol hai segnato?')),assists:number(valueFor(entry.assists,'Quanti assist hai fatto?')),seasons:number(read('Quante stagioni hai giocato?')),league:number(valueFor(entry.trophies?.league,'Quanti campionati nazionali hai vinto?')),champions:number(valueFor(entry.trophies?.champions,'Quante Champions League hai vinto?')),world:number(valueFor(entry.trophies?.world,'Quanti Mondiali hai vinto?')),continental:number(valueFor(entry.trophies?.continental,'Quante coppe continentali hai vinto?')),ballon:number(valueFor(entry.trophies?.ballon,'Quanti Palloni d’Oro hai vinto?'))}};
      return{entry,result,points:window.FCWScoring.careerPoints(result).total};
    });
  }
  function renderRankings() {
    if(!rankingList)return;const t=words();rankingHelp.textContent=t.rankingNote;rankingRoomNote.textContent=t.onlineRank;sortLabel.textContent=t.sort;sortSelect.setAttribute('aria-label',t.sort);[...sortSelect.options].forEach((option,index)=>option.textContent=t.sorts[index]);
    rankingList.replaceChildren();const entries=savedResults().sort((a,b)=>sort==='ovr'?b.result.overall-a.result.overall||b.points-a.points:b.points-a.points||b.result.overall-a.result.overall);
    if(!entries.length){rankingList.append(make('li','cw-empty','',t.empty));return;}
    entries.forEach(({entry,result,points},index)=>{
      const row=make('li','cw-ranking-row'),rank=make('span','cw-ranking-place','',String(index+1)),who=make('div','cw-ranking-copy');const position=window.fcwExperience?.translate(result.position)||result.position||'';who.append(make('strong','','',entry.name),make('small','cw-muted','',`${position} · ${entry.club}`));
      const score=make('div','cw-ranking-score');score.append(make('strong','','',`${points} CP`),make('small','','',`OVR ${result.overall}`));
      const openButton=make('button','cw-ranking-open','','↗');openButton.type='button';openButton.setAttribute('aria-label',`${t.open}: ${entry.name}`);
      openButton.addEventListener('click',()=>{const index=savedCareers().findIndex(saved=>saved.id===entry.id);if(index<0){renderRankings();return;}close();document.querySelectorAll('#archiveList .archive-item-actions button:first-child')[index]?.click();});row.append(rank,who,score,openButton);rankingList.append(row);
    });
  }
  function render() {
    if(!mounted)return;const t=words(),profile=window.fcwProgression?.state(),room=window.fcwRoom?.getState()?.room;
    nav.setAttribute('aria-label',t.nav);routes.forEach((route,index)=>links[route].querySelector('.cw-nav-label').textContent=t.labels[index]);
    levelBadge.textContent=String(profile?.level||1);links.profile.setAttribute('aria-label',`${t.labels[6]} · ${t.level} ${profile?.level||1}`);
    closeButton.textContent=t.close;eyebrow.textContent='CAREER WHEEL';
    if(active){const index=routes.indexOf(active);title.textContent=t.labels[index];intro.textContent=t.intros[index];tabs.setAttribute('aria-label',t.labels[index]);groups[active].forEach(key=>tabButtons[key].textContent=t.tabs[key]);}
    profileNote.textContent=t.profileNote;
    $('cwRankingLobby').textContent=t.lobby;
    renderRankings();window.fcwCommunity?.render();window.fcwAccount?.render();
  }
  if(document.readyState==='complete')init();else document.addEventListener('DOMContentLoaded',init,{once:true});
})();
