/* Dedicated lobby and game views share the existing career and room state. */
(() => {
  'use strict';
  const labels = {
    it: { nav:'Scegli come giocare', solo:'Solo', soloNote:'Gira le ruote. Crea la tua leggenda.', online:'Online', onlineNote:'La tua carriera contro quelle degli amici.', title:'Lobby online', eyebrow:'SFIDA PRIVATA', create:'Crea', join:'Entra', name:'Il tuo nome in lobby', number:'Numero maglia', invite:'Codice o link invito', inviteHint:'Incolla un invito oppure scrivi il codice della stanza.', createAction:'Crea la tua stanza', joinAction:'Entra in lobby', tabs:'Crea o raggiungi una stanza', player:'Il tuo calciatore', private:'Solo su invito. Condividi il codice con i tuoi amici e giocate le vostre carriere.', lock:'Nome e numero sono bloccati dopo il primo giro. Torna a Solo e ricomincia per cambiarli.', play:'Vai alla ruota', resume:'Continua la carriera', back:'Torna alla stanza', method:'Come si vince', room:n=>`${n} in stanza`, round:(n,total)=>`Carriera ${n} di ${total}` },
    en: { nav:'Choose how to play', solo:'Solo', soloNote:'Spin the wheels. Create your legend.', online:'Online', onlineNote:'Challenge your friends with your career.', title:'Online lobby', eyebrow:'PRIVATE CHALLENGE', create:'Create', join:'Join', name:'Your lobby name', number:'Shirt number', invite:'Room code or invite link', inviteHint:'Paste an invitation or enter the room code.', createAction:'Create your room', joinAction:'Join lobby', tabs:'Create or join a room', player:'Your player', private:'Invite only. Share the code with friends and play your careers.', lock:'Name and shirt number are locked after your first spin. Return to Solo and restart to change them.', play:'Go to the wheel', resume:'Continue career', back:'Back to room', method:'How to win', room:n=>`${n} in room`, round:(n,total)=>`Career ${n} of ${total}` },
    es: { nav:'Elige cómo jugar', solo:'Solo', soloNote:'Gira las ruletas. Crea tu leyenda.', online:'Online', onlineNote:'Enfrenta tu carrera a las de tus amigos.', title:'Lobby online', eyebrow:'RETO PRIVADO', create:'Crear', join:'Entrar', name:'Tu nombre en el lobby', number:'Dorsal', invite:'Código o enlace de invitación', inviteHint:'Pega una invitación o escribe el código de la sala.', createAction:'Crea tu sala', joinAction:'Entrar al lobby', tabs:'Crear o entrar en una sala', player:'Tu jugador', private:'Solo con invitación. Comparte el código con tus amigos y jugad vuestras carreras.', lock:'Nombre y dorsal bloqueados después del primer giro. Vuelve a Solo y reinicia para cambiarlos.', play:'Ir a la ruleta', resume:'Continuar carrera', back:'Volver a la sala', method:'Cómo ganar', room:n=>`${n} en la sala`, round:(n,total)=>`Carrera ${n} de ${total}` },
    fr: { nav:'Choisis comment jouer', solo:'Solo', soloNote:'Fais tourner les roues. Crée ta légende.', online:'En ligne', onlineNote:'Défie tes amis avec ta carrière.', title:'Lobby en ligne', eyebrow:'DÉFI PRIVÉ', create:'Créer', join:'Rejoindre', name:'Ton nom dans le lobby', number:'Numéro de maillot', invite:'Code ou lien d’invitation', inviteHint:'Colle une invitation ou saisis le code de la salle.', createAction:'Crée ta salle', joinAction:'Rejoindre le lobby', tabs:'Créer ou rejoindre une salle', player:'Ton joueur', private:'Sur invitation. Partage le code avec tes amis et jouez vos carrières.', lock:'Nom et numéro verrouillés après le premier tour. Reviens à Solo et recommence pour les changer.', play:'Aller à la roue', resume:'Continuer la carrière', back:'Retour à la salle', method:'Comment gagner', room:n=>`${n} dans la salle`, round:(n,total)=>`Carrière ${n} sur ${total}` }
  };
  function init() {
    const byId = id => document.getElementById(id);
    const app = document.querySelector('main.app'), nav = byId('stadiumPlayNav');
    const solo = byId('stadiumSolo'), online = byId('stadiumOnline'), room = byId('onlineRoomDisclosure');
    if (!app || !nav || !solo || !online || !room) return;
    const words = () => labels[document.documentElement.lang] || labels.it;
    const state = () => window.fcwExperience?.snapshot();
    const roomState = () => window.fcwRoom?.getState() || { room:null, playerId:'', busy:false };
    let view = 'solo', tab = 'create';
    const make = (tag,id,className) => { const node=document.createElement(tag); if(id)node.id=id; if(className)node.className=className; return node; };
    const body=room.querySelector('.online-room-body');
    const head=make('div','onlineLobbyHead','online-lobby-head'), heading=make('div','','online-lobby-heading');
    const eyebrow=make('small','onlineLobbyEyebrow'), title=make('h2','onlineLobbyTitle'); heading.append(eyebrow,title);
    const tabs=make('div','onlineLobbyTabs','online-lobby-tabs'); tabs.setAttribute('role','tablist');
    const createTab=make('button','onlineLobbyCreateTab'), joinTab=make('button','onlineLobbyJoinTab');
    [createTab,joinTab].forEach(button=>{button.type='button';button.setAttribute('role','tab');});
    createTab.setAttribute('aria-controls','onlineLobbyCreatePanel');joinTab.setAttribute('aria-controls','onlineLobbyJoinPanel');
    tabs.append(createTab,joinTab);head.append(heading,tabs);
    const entry=make('div','onlineLobbyEntry','online-lobby-entry'), identity=make('div','','online-lobby-identity'); identity.setAttribute('role','group');
    function inputLabel(id,type){const label=make('label','','online-lobby-field'),text=make('span',`${id}Label`),input=make('input',id);input.type=type;label.append(text,input);identity.append(label);return input;}
    const name=inputLabel('onlineLobbyName','text');name.maxLength=24;name.autocomplete='nickname';
    const number=inputLabel('onlineLobbyNumber','number');number.min='1';number.max='99';number.inputMode='numeric';number.placeholder='1–99';
    const lock=make('p','onlineLobbyIdentityLock','online-lobby-lock');lock.hidden=true;
    const createPanel=make('div','onlineLobbyCreatePanel','online-lobby-panel'),joinPanel=make('div','onlineLobbyJoinPanel','online-lobby-panel');
    [createPanel,joinPanel].forEach(panel=>panel.setAttribute('role','tabpanel'));
    createPanel.setAttribute('aria-labelledby',createTab.id);joinPanel.setAttribute('aria-labelledby',joinTab.id);
    createPanel.append(room.querySelector('.online-room-form'));
    const joinForm=room.querySelector('.online-room-join'),code=byId('onlineRoomCode');
    const inviteField=make('label','','online-lobby-field'),inviteLabel=make('span','onlineLobbyInviteLabel');code.before(inviteField);inviteField.append(inviteLabel,code);code.setAttribute('aria-describedby','onlineLobbyInviteHint');
    const inviteHint=make('small','onlineLobbyInviteHint','online-lobby-hint');joinPanel.append(joinForm,inviteHint);entry.append(identity,lock,createPanel,joinPanel);body.prepend(head,entry);
    const privateNote=make('p','onlineLobbyPrivateNote','online-lobby-private');entry.after(privateNote);
    const scoring=make('details','onlineLobbyScoring','online-lobby-scoring'),method=make('summary','onlineLobbyMethod');byId('onlineRoomFormula').before(scoring);scoring.append(method,byId('onlineRoomFormula'));
    const play=make('button','onlineLobbyPlay','online-lobby-play');play.type='button';byId('onlineRoomSeriesStatus').after(play);
    const statusBadge=make('small','stadiumOnlineStatus','stadium-online-status');statusBadge.hidden=true;online.append(statusBadge);
    const gameBar=make('div','onlineGameBar','online-game-bar'),gameInfo=make('span','onlineGameInfo'),back=make('button','onlineGameBack');back.type='button';gameBar.append(gameInfo,back);nav.after(gameBar);
    const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
    function setView(next,focus=false){
      view=next;app.dataset.view=next;const isOnline=next==='online'||next==='online-game';solo.dataset.current=String(next==='solo');online.dataset.current=String(isOnline);solo.setAttribute('aria-pressed',String(next==='solo'));online.setAttribute('aria-pressed',String(isOnline));if(next==='online')room.open=true;render();
      if(focus){const destination=next==='online'?title:next==='online-game'?byId('careerGame'):nav;destination.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});if(next==='online'){title.tabIndex=-1;title.focus({preventScroll:true});}}
    }
    function setTab(next){tab=next;createPanel.hidden=next!=='create';joinPanel.hidden=next!=='join';[createTab,joinTab].forEach((button,index)=>{const selected=(index===0?'create':'join')===next;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;});render();}
    function validInvite(){const raw=code.value.trim();if(/^[a-z0-9]{6}$/i.test(raw))return true;try{const url=new URL(raw);return /^https?:$/.test(url.protocol)&&/^[a-z0-9]{6}$/i.test(url.searchParams.get('room')||'');}catch{return false;}}
    function render(){
      const t=words(),session=roomState(),current=session.room,career=state();nav.setAttribute('aria-label',t.nav);
      byId('stadiumSoloTitle').textContent=t.solo;byId('stadiumSoloNote').textContent=t.soloNote;byId('stadiumOnlineTitle').textContent=t.online;byId('stadiumOnlineNote').textContent=t.onlineNote;
      title.textContent=t.title;eyebrow.textContent=t.eyebrow;tabs.setAttribute('aria-label',t.tabs);createTab.textContent=t.create;joinTab.textContent=t.join;identity.setAttribute('aria-label',t.player);
      byId('onlineLobbyNameLabel').textContent=t.name;byId('onlineLobbyNumberLabel').textContent=t.number;inviteLabel.textContent=t.invite;inviteHint.textContent=t.inviteHint;privateNote.textContent=t.private;lock.textContent=t.lock;method.textContent=t.method;back.textContent=t.back;
      if(document.activeElement!==name)name.value=byId('careerName').value;if(document.activeElement!==number)number.value=byId('shirtNumber').value;
      const locked=byId('careerName').readOnly;name.readOnly=locked;number.readOnly=locked;lock.hidden=!locked;name.disabled=session.busy;number.disabled=session.busy;createTab.disabled=session.busy;joinTab.disabled=session.busy;room.classList.toggle('has-room',Boolean(current));
      const valid=Boolean(byId('careerName').value.trim())&&Number.isInteger(Number(byId('shirtNumber').value))&&Number(byId('shirtNumber').value)>=1&&Number(byId('shirtNumber').value)<=99;
      byId('onlineCreateRoom').textContent=t.createAction;byId('onlineJoinRoom').textContent=t.joinAction;byId('onlineCreateRoom').disabled=session.busy||Boolean(current)||!valid;byId('onlineJoinRoom').disabled=session.busy||Boolean(current)||!valid||!validInvite();
      statusBadge.hidden=!current;statusBadge.textContent=current?t.room(current.players.length):'';
      byId('onlineRoomLeaders').hidden=!current?.players.some(player=>player.submitted);
      const own=current?.players.find(player=>player.id===session.playerId);play.hidden=!current||current.complete||current.round.complete||!own||own.submittedThisRound;play.disabled=session.busy||Boolean(career?.spinning);play.textContent=career?.started&&!career.complete?t.resume:t.play;
      gameInfo.textContent=current?`${current.code} · ${t.round(current.round.number,current.rounds)}`:'';gameBar.hidden=view!=='online-game';
    }
    solo.addEventListener('click',()=>setView('solo',true));online.addEventListener('click',()=>setView('online',true));back.addEventListener('click',()=>setView('online',true));
    createTab.addEventListener('click',()=>setTab('create'));joinTab.addEventListener('click',()=>setTab('join'));
    tabs.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||roomState().busy)return;event.preventDefault();setTab(event.key==='Home'?'create':event.key==='End'?'join':tab==='create'?'join':'create');(tab==='create'?createTab:joinTab).focus();});
    [[name,'careerName'],[number,'shirtNumber']].forEach(([input,originalId])=>input.addEventListener('input',()=>{const original=byId(originalId);if(original.readOnly){render();return;}original.value=input.value;original.dispatchEvent(new Event('input',{bubbles:true}));render();}));
    code.addEventListener('input',render);
    [name,number].forEach(input=>input.addEventListener('keydown',event=>{if(event.key!=='Enter')return;event.preventDefault();const button=byId(tab==='create'?'onlineCreateRoom':'onlineJoinRoom');if(!button.disabled)button.click();}));
    play.addEventListener('click',()=>{if(play.disabled||play.hidden)return;const career=state();if(career?.complete||career?.demo||career?.restored){window.fcwRoom?.playCareer();return;}setView('online-game',true);});
    window.addEventListener('fcw:room-play',()=>setView('online-game'));window.addEventListener('fcw:room',render);window.addEventListener('fcw:state',render);byId('languageSelect').addEventListener('change',()=>queueMicrotask(render));
    const canOpen=()=>!roomState().busy&&!state()?.spinning&&!window.fcwAccountSync?.isBusy()&&!window.fcwLocalDuelSession?.state().active;
    const fillNickname=()=>{const original=byId('careerName'),nickname=window.fcwAccount?.state()?.user?.nickname;if(!original.readOnly&&!original.value.trim()&&nickname){original.value=nickname;original.dispatchEvent(new Event('input',{bubbles:true}));}};
    window.fcwLobby={
      getView:()=>view,
      setView(next,focus=false){if(!['solo','online','online-game','duel','duel-game'].includes(next))return false;setView(next,focus);return true;},
      openCreate(){if(!canOpen())return false;window.fcwNavigation?.close();fillNickname();setTab('create');setView('online',true);return true;},
      openJoin(value){const invite=String(value||'').toUpperCase();if(!/^[A-Z0-9]{6}$/.test(invite)||!canOpen())return false;if(roomState().room&&roomState().room.code!==invite)window.fcwRoom.disconnect();window.fcwNavigation?.close();fillNickname();code.value=invite;setTab('join');setView('online',true);return true;}
    };
    setTab(new URL(location.href).searchParams.has('room')?'join':'create');setView(new URL(location.href).searchParams.has('room')?'online':'solo');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
