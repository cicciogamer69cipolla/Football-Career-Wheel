/* One arena surrounds the canonical game. No new save format or random draws. */
(() => {
  'use strict';
  const copy = {
    it: {
      skip:'Vai alla ruota', tools:'Strumenti della ruota', help:'Come si gioca', close:'Chiudi', journey:'Le fasi della tua carriera',
      phases:['Origini','Club','Profilo','Attributi','Palmarès'], current:'In corso', done:'Completata', pending:'Da scoprire',
      live:'La tua carriera prende forma', base:'Valori estratti dalle ruote. Bonus e OVR vengono applicati alla carta finale.',
      fields:['Nazionalità','Ruolo','Club','Stile di gioco'], stats:['Velocità','Tiro','Passaggi','Dribbling','Difesa','Fisico'], unknown:'Da scoprire',
      turns:(n,total)=>`${n} di ${total} tappe`, guide:'Ogni giro, una parte della tua leggenda.',
      guideSteps:[['Crea il tuo calciatore','Scegli nome, numero e modalità. Nome e maglia si bloccano al primo giro.'],['Gira al centro','Premi GIRA sulla ruota o il pulsante sotto. Il settore indicato dalla freccia è il risultato. Poi premi AVANTI.'],['Costruisci la carriera','Ogni risultato si aggiunge al riepilogo. Completa le ruote per rivelare carta, trofei e Career Points.'],['Sfida e conserva','Nel Duello locale due giocatori si alternano sullo stesso PC. Archivio, obiettivi e account sono nel menu in alto.']],
      modeTitle:'Scegli il ritmo', modes:[['Rapida','Giri più brevi.'],['Normale','L’esperienza completa.'],['Realistica','Attributi, risultati e OVR tengono conto del ruolo e delle stagioni.']],
      scoreTitle:'Come contano i Career Points', score:'Gol e assist sono pesati per ruolo. Stagioni e trofei aggiungono punti. Nel confronto misto, carriera e forza della carta contano rispettivamente il 70% e il 30%.',
      local:'I tuoi progressi si salvano in questo browser. Con un account locale restano anche nel server di questo PC.', preview:'Anteprima', complete:'Carriera completa'
    },
    en: {
      skip:'Skip to the wheel',tools:'Wheel tools',help:'How to play',close:'Close',journey:'Your career stages',phases:['Origins','Club','Profile','Attributes','Honours'],current:'In progress',done:'Completed',pending:'To discover',
      live:'Your career takes shape',base:'Values drawn from the wheels. Bonuses and OVR are applied to the final card.',fields:['Nationality','Position','Club','Playing style'],stats:['Pace','Shooting','Passing','Dribbling','Defence','Physical'],unknown:'To discover',turns:(n,total)=>`${n} of ${total} stages`,guide:'Every spin adds to your legend.',
      guideSteps:[['Create your player','Choose a name, shirt number and mode. Your name and shirt lock after the first spin.'],['Spin at the centre','Press SPIN on the wheel or the button below. The pointer marks your result. Then press NEXT.'],['Build your career','Every result joins your live summary. Finish the wheels to reveal your card, honours and Career Points.'],['Challenge and save','In Local duel, two players take turns on one PC. Find archives, objectives and your account in the top menu.']],modeTitle:'Choose your pace',modes:[['Quick','Shorter spins.'],['Normal','The complete experience.'],['Realistic','Attributes, results and OVR take position and seasons into account.']],scoreTitle:'How Career Points count',score:'Goals and assists are weighted by position. Seasons and trophies add points. In the combined comparison, career and card strength count for 70% and 30% respectively.',local:'Progress is saved in this browser. A local account also keeps it on this PC’s server.',preview:'Preview',complete:'Career complete'
    },
    es: {
      skip:'Ir a la ruleta',tools:'Herramientas de la ruleta',help:'Cómo jugar',close:'Cerrar',journey:'Las etapas de tu carrera',phases:['Origen','Club','Perfil','Atributos','Palmarés'],current:'En curso',done:'Completada',pending:'Por descubrir',
      live:'Tu carrera toma forma',base:'Valores obtenidos de las ruletas. Los bonus y el OVR se aplican a la carta final.',fields:['Nacionalidad','Posición','Club','Estilo de juego'],stats:['Ritmo','Tiro','Pases','Regate','Defensa','Físico'],unknown:'Por descubrir',turns:(n,total)=>`${n} de ${total} etapas`,guide:'Cada giro añade algo a tu leyenda.',
      guideSteps:[['Crea tu jugador','Elige nombre, dorsal y modo. El nombre y el dorsal se bloquean tras el primer giro.'],['Gira en el centro','Pulsa GIRA en la ruleta o el botón de abajo. La flecha indica tu resultado. Después pulsa SIGUE.'],['Construye tu carrera','Cada resultado se añade al resumen. Completa las ruletas para revelar la carta, los títulos y los Career Points.'],['Compite y guarda','En Duelo local, dos jugadores se turnan en un PC. Archivo, objetivos y cuenta están en el menú superior.']],modeTitle:'Elige el ritmo',modes:[['Rápida','Giros más cortos.'],['Normal','La experiencia completa.'],['Realista','Atributos, resultados y OVR tienen en cuenta la posición y las temporadas.']],scoreTitle:'Cómo cuentan los Career Points',score:'Goles y asistencias se ponderan por posición. Temporadas y títulos añaden puntos. En el criterio mixto, la carrera y la fuerza de la carta cuentan un 70% y un 30%, respectivamente.',local:'El progreso se guarda en este navegador. Una cuenta local también lo conserva en el servidor de este PC.',preview:'Vista previa',complete:'Carrera completada'
    },
    fr: {
      skip:'Aller à la roue',tools:'Outils de la roue',help:'Comment jouer',close:'Fermer',journey:'Les étapes de ta carrière',phases:['Origines','Club','Profil','Attributs','Palmarès'],current:'En cours',done:'Terminée',pending:'À découvrir',
      live:'Ta carrière prend forme',base:'Valeurs tirées des roues. Les bonus et l’OVR sont appliqués à la carte finale.',fields:['Nationalité','Poste','Club','Style de jeu'],stats:['Vitesse','Tir','Passes','Dribble','Défense','Physique'],unknown:'À découvrir',turns:(n,total)=>`${n} étapes sur ${total}`,guide:'Chaque tour enrichit ta légende.',
      guideSteps:[['Crée ton joueur','Choisis un nom, un numéro et un mode. Le nom et le maillot sont verrouillés après le premier tour.'],['Tourne au centre','Appuie sur TOURNE au centre ou sur le bouton dessous. La flèche indique ton résultat. Appuie ensuite sur SUITE.'],['Construis ta carrière','Chaque résultat rejoint le résumé. Termine les roues pour découvrir ta carte, tes titres et tes Career Points.'],['Défie et sauvegarde','En Duel local, deux joueurs jouent à tour de rôle sur un PC. Archives, objectifs et compte sont dans le menu supérieur.']],modeTitle:'Choisis le rythme',modes:[['Rapide','Des tours plus courts.'],['Normal','L’expérience complète.'],['Réaliste','Les attributs, résultats et OVR tiennent compte du poste et des saisons.']],scoreTitle:'Le calcul des Career Points',score:'Les buts et passes sont pondérés par poste. Les saisons et titres ajoutent des points. Dans le critère mixte, la carrière et la force de la carte comptent respectivement pour 70 % et 30 %.',local:'La progression est enregistrée dans ce navigateur. Un compte local la conserve aussi sur le serveur de ce PC.',preview:'Aperçu',complete:'Carrière terminée'
    }
  };
  const $ = id => document.getElementById(id);
  const make = (tag,className='',text='') => {const node=document.createElement(tag);node.className=className;node.textContent=text;return node;};
  const ranges = [[0,3],[4,5],[6,10],[11,16],[17,25]];
  let mounted=false, journey, live, liveTitle, liveIdentity, liveMeta, liveNote, fields=[], stats=[], tools, help, dialog, helpTitle, helpClose, helpBody, skip, pendingEvent='';
  const words=()=>copy[document.documentElement.lang]||copy.it;
  const translate=value=>window.fcwExperience?.translate(value)||String(value||'');
  function mount() {
    if(mounted||!$('playerSetup')||!$('cwTopNav')||!$('cwReleaseMeta'))return;
    mounted=true;
    const app=document.querySelector('main.app'),top=app.querySelector('.top'),game=$('careerGame'),side=game.querySelector('.wheel-side-panel');
    top.after($('cwTopNav'));
    top.querySelector('.brand').after($('cwReleaseMeta'));
    skip=make('a','cw-skip-link');skip.href='#careerGame';app.prepend(skip);game.tabIndex=-1;
    // Existing disclosures keep their handlers and preview safeguards.
    tools=make('div','cw-wheel-tools');tools.id='cwWheelTools';
    tools.append($('wheelPreviewPanel'),$('oddsGuide'));
    help=make('button','cw-game-help');help.id='cwGameHelp';help.type='button';help.setAttribute('aria-haspopup','dialog');help.setAttribute('aria-controls','cwGameGuide');tools.append(help);
    $('testCard').after(tools);
    journey=make('ol','cw-journey');journey.id='cwJourney';
    ranges.forEach(()=>{const li=make('li'),number=make('span','cw-journey-number'),text=make('span','cw-journey-label');li.append(number,text);journey.append(li);});
    $('playerSetup').after(journey);
    live=make('details','cw-live-career');live.id='cwLiveCareer';live.hidden=true;
    const summary=make('summary'),heading=make('span','cw-live-heading');liveTitle=make('small');liveIdentity=make('strong');liveMeta=make('span','cw-live-meta');heading.append(liveTitle,liveIdentity);summary.append(heading,liveMeta);
    const body=make('div','cw-live-body'),grid=make('dl','cw-live-fields'),statGrid=make('div','cw-live-stats');
    for(let i=0;i<4;i++){const pair=make('div'),label=make('dt'),value=make('dd');pair.append(label,value);grid.append(pair);fields.push({label,value});}
    for(let i=0;i<6;i++){const stat=make('div','cw-live-stat'),label=make('span'),value=make('strong'),track=make('span','cw-live-stat-track'),fill=make('i');track.setAttribute('aria-hidden','true');track.append(fill);stat.append(label,value,track);statGrid.append(stat);stats.push({label,value,fill});}
    liveNote=make('p','cw-live-note');body.append(grid,statGrid,liveNote);live.append(summary,body);tools.after(live);
    dialog=make('dialog','cw-guide-dialog');dialog.id='cwGameGuide';dialog.setAttribute('aria-labelledby','cwGameGuideTitle');
    const head=make('header','cw-guide-head');helpTitle=make('h2');helpTitle.id='cwGameGuideTitle';helpClose=make('button','cw-hub-close');helpClose.type='button';helpBody=make('div','cw-guide-body');head.append(helpTitle,helpClose);dialog.append(head,helpBody);document.body.append(dialog);
    help.addEventListener('click',()=>{renderGuide();dialog.showModal();helpClose.focus();});helpClose.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>help.focus({preventScroll:true}));
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
    const translateRender=()=>render(window.fcwExperience?.snapshot());
    ['fcw:state','fcw:complete','fcw:reset','fcw:account-restore','fcw:language'].forEach(event=>window.addEventListener(event,translateRender));
    $('languageSelect').addEventListener('change',()=>queueMicrotask(translateRender));
    document.documentElement.classList.add('cw-arena-ready');translateRender();
    window.fcwArena={refresh:translateRender};
  }
  function renderGuide() {
    const t=words();helpTitle.textContent=t.help;helpClose.textContent=t.close;
    const intro=make('p','cw-guide-intro',t.guide),list=make('ol','cw-guide-steps');
    t.guideSteps.forEach(([title,text])=>{const li=make('li'),strong=make('h3','',title),p=make('p','',text);li.append(strong,p);list.append(li);});
    const modeTitle=make('h3','cw-guide-section',t.modeTitle),modes=make('dl','cw-guide-modes');
    t.modes.forEach(([label,text])=>{const pair=make('div');pair.append(make('dt','',label),make('dd','',text));modes.append(pair);});
    helpBody.replaceChildren(intro,list,modeTitle,modes,make('h3','cw-guide-section',t.scoreTitle),make('p','cw-guide-note',t.score),make('p','cw-guide-local',t.local));
  }
  function render(state) {
    if(!mounted||!state)return;const t=words();skip.textContent=t.skip;help.textContent=t.help;tools.setAttribute('aria-label',t.tools);journey.setAttribute('aria-label',t.journey);
    const modePicker=$('careerModePicker');if(modePicker){modePicker.setAttribute('role','radiogroup');modePicker.setAttribute('aria-label',translate('Modalità carriera'));}
    const phase=ranges.findIndex(([start,end])=>state.index>=start&&state.index<=end);
    [...journey.children].forEach((li,index)=>{
      const [start,end]=ranges[index],count=Array.isArray(answers)?answers.slice(start,end+1).filter(Boolean).length:0;
      const done=state.complete||count===end-start+1,active=index===phase&&!state.complete;
      li.dataset.state=done?'done':active?'current':'pending';li.querySelector('.cw-journey-number').textContent=done?'✓':String(index+1);li.querySelector('.cw-journey-label').textContent=t.phases[index];
      li.setAttribute('aria-label',`${t.phases[index]}: ${done?t.done:active?t.current:t.pending}`);if(active)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');
    });
    live.hidden=!state.started||state.complete||state.demo;
    liveTitle.textContent=t.live;liveIdentity.textContent=`${state.identity.name} · #${state.identity.shirtNumber||'—'}`;
    liveMeta.textContent=[translate(state.playerResult.position),t.turns(state.completedSteps,state.total)].filter(Boolean).join(' · ');
    const values=[state.context.nation,state.playerResult.position,state.context.club,state.context.style];
    fields.forEach(({label,value},index)=>{label.textContent=t.fields[index];value.textContent=values[index]?translate(values[index]):t.unknown;value.dataset.pending=String(!values[index]);});
    stats.forEach(({label,value,fill},index)=>{const raw=state.playerResult.stats[index],known=Array.isArray(answers)&&Boolean(answers[11+index]);label.textContent=t.stats[index];value.textContent=known?String(raw):'—';fill.style.width=known?`${Math.max(0,Math.min(99,raw))}%`:'0%';});
    liveNote.textContent=t.base;
    document.documentElement.classList.toggle('cw-career-started',state.started&&!state.complete);
    document.documentElement.classList.toggle('cw-career-complete',state.complete);
    if(state.complete&&!state.preview){
      const finalLabels={resultLabel:translate('PALMARÈS COMPLETO'),resultName:translate('Carriera completata'),question:translate('Tutti i tuoi trofei'),resultSub:answers.filter(answer=>answer?.kind==='trophy').map(answer=>`${translate(answer.value)} × ${translate(answer.detail.split(':')[0])}`).join(' · ')};
      Object.entries(finalLabels).forEach(([id,text])=>{if($(id).textContent!==text)$(id).textContent=text;});
    }
    // Bring a required event choice into view once; a disabled wheel otherwise hides its reason.
    const eventId=typeof pendingCareerChoice==='object'&&pendingCareerChoice?String(pendingCareerChoice.id||pendingCareerChoice.key||pendingCareerChoice.title):'';
    if(eventId&&eventId!==pendingEvent&&!state.spinning) {
      const notice=$('careerEventNotice'),rect=notice.getBoundingClientRect();
      if(rect.top<0||rect.bottom>innerHeight)notice.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
      notice.querySelector('button')?.focus({preventScroll:true});
    }
    pendingEvent=eventId;
    if(dialog.open)renderGuide();
  }
  if(document.readyState==='complete')mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});
})();
