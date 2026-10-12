/* Browser caches are isolated by owner; server saves use optimistic revisions. */
(() => {
  'use strict';
  const KEYS = ['fcw-careers-v1','fcw-achievement-profile-v1','fcw-achievement-earned-at-v1','fcw-achievement-notified-v1','fcw-achievement-careers-v1','fcw-personal-records-v1','fcw-daily-challenge-v1','fcw-scenario-tour-v1','fcw-profile-cosmetics-v1','fcw-card-personality-v1','fcw-career-tournament-v1','fcw-active-career-v1','fcw-language-v1','fcw-feedback-draft-v1'];
  const OWNER = 'fcw-account-owner-v1', BASE = 'fcw-account-base-v1', GUEST = 'fcw-account-guest-backup-v1', CACHE = 'fcw-account-pending-v1', CONFLICT = 'fcw-account-conflict-v1';
  const nativeSet = Storage.prototype.setItem, nativeRemove = Storage.prototype.removeItem;
  const parse = (value, fallback=null) => { try { return JSON.parse(value); } catch { return fallback; } };
  const clone = value => JSON.parse(JSON.stringify(value));
  const fault = code => Object.assign(new Error(code), {code});
  const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const safeSnapshot = value => Object.fromEntries(KEYS.filter(key=>typeof value?.[key] === 'string').map(key=>[key,value[key]]));
  const ACTIVE = 'fcw-active-career-v1', PERSONALITY = 'fcw-card-personality-v1';
  let transient = null;
  const protectSolo = snapshot => {
    if(!transient)return snapshot;
    const result={...snapshot};
    [[ACTIVE,transient.active],[PERSONALITY,transient.personality]].forEach(([key,value])=>{if(value===null)delete result[key];else result[key]=value;});
    return result;
  };
  const read = () => protectSolo(Object.fromEntries(KEYS.map(key=>[key,localStorage.getItem(key)]).filter(([,value])=>value !== null)));
  const rawWrite = (key,value) => value === null ? nativeRemove.call(localStorage,key) : nativeSet.call(localStorage,key,typeof value==='string'?value:JSON.stringify(value));
  let owner = parse(localStorage.getItem(OWNER)), base = safeSnapshot(parse(localStorage.getItem(BASE),{})), user = null;
  let revision = Number(owner?.revision)||0, updatedAt = owner?.updatedAt||null, phase='idle', error=null, conflict=null;
  let timer=null, flight=null, offlineFlight=null, starting=true, changing=false, installed=false, generation=0, muted=0, dirty=false, externalOwner=false;
  let localMemory=read();
  const startupChallenge=new URLSearchParams(location.search).get('challenge');
  const isBusy=()=>starting||changing||externalOwner||Boolean(flight)||Boolean(user&&!installed)||window.fcwAccountHydrating===true;
  window.fcwAccountHydrating = true;
  function status(next,code=null) {
    phase=next;error=code;
    window.dispatchEvent(new CustomEvent('fcw:account-sync',{detail:state()}));
  }
  function state() { return {phase,error,updatedAt,conflict:Boolean(conflict),userId:user?.id||null}; }
  function schedule() {
    if(muted || window.fcwAccountHydrating)return;
    dirty=true;clearTimeout(timer);
    if(!transient && user && installed && owner?.userId===user.id && !starting && !changing)timer=setTimeout(()=>sync().catch(()=>{}),1100);
  }
  Storage.prototype.setItem=function(key,value) {
    if(this===localStorage && transient && String(key)===ACTIVE)return;
    const before=this===localStorage&&KEYS.includes(String(key))?this.getItem(key):null;
    const result=nativeSet.call(this,key,value);
    if(this===localStorage&&KEYS.includes(String(key))&&before!==String(value)){if(!muted&&!externalOwner)localMemory[String(key)]=String(value);schedule();}
    return result;
  };
  Storage.prototype.removeItem=function(key) {
    if(this===localStorage && transient && String(key)===ACTIVE)return;
    const exists=this===localStorage&&KEYS.includes(String(key))&&this.getItem(key)!==null;
    const result=nativeRemove.call(this,key);if(exists){if(!muted&&!externalOwner)delete localMemory[String(key)];schedule();}return result;
  };
  async function api(payload) {
    let response;
    try { response=await fetch('/api/account/saves',{method:payload?'POST':'GET',credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(15000),headers:payload?{'Content-Type':'application/json'}:{'Accept':'application/json'},...(payload?{body:JSON.stringify({...payload,userId:user?.id})}:{})}); }
    catch { throw fault('network_error'); }
    const data=await response.json().catch(()=>({error:'server_unavailable'}));
    if(!response.ok || data.error)throw fault(data.error||'server_error');
    if(data.userId!==user?.id){installed=false;externalOwner=true;throw fault('unauthorized');}
    return data;
  }
  function cacheCurrent() {
    const snapshot=externalOwner?protectSolo({...localMemory}):read();
    if(owner?.userId){const cache=parse(localStorage.getItem(CACHE),{});cache[owner.userId]={snapshot,base,revision,updatedAt};rawWrite(CACHE,cache);}
    else rawWrite(GUEST,snapshot);
  }
  function saveOwner() { owner={userId:user.id,revision,updatedAt};rawWrite(OWNER,owner);rawWrite(BASE,base); }
  function buildActive() {
    if(window.fcwAccountHydrating || starting || changing || externalOwner || user&&!installed || spinning || wheelPreviewActive || demoPreviewActive || window.fcwExperience?.snapshot()?.restored)return null;
    const data={version:1,order:3,index:idx,rotation,name:document.getElementById('careerName').value,number:document.getElementById('shirtNumber').value,mode:careerMode,locked:document.getElementById('careerName').readOnly,complete:!document.getElementById('careerSummary').hidden,answers:clone(answers),scores:[...scores],traits:[...chosenTraits],timeline:clone(careerTimeline),events:clone(careerEvents),pending:pendingCareerChoice?clone(pendingCareerChoice):null,experience:window.fcwExperience?.accountState(),challenge:window.fcwChallenges?.accountState(),daily:window.fcwDaily?.accountState()};
    return JSON.stringify(data);
  }
  function captureActive() {
    if(transient)return;
    const encoded=buildActive();if(encoded!==null && localStorage.getItem(ACTIVE)!==encoded)localStorage.setItem(ACTIVE,encoded);
  }
  function validateActive(raw) {
    const data=parse(raw);
    if(!data || data.version!==1 || data.order!==3 || !Number.isInteger(data.index) || data.index<0 || data.index>=steps.length || !Array.isArray(data.answers) || data.answers.length>steps.length)return null;
    if(data.answers.length<data.index || data.answers.length>data.index+1 || data.complete&&data.answers.length!==steps.length)return null;
    if(!data.answers.every((answer,index)=>answer && answer.kind===steps[index]?.kind && typeof answer.value==='string' && answer.value.length<1000 && !/[<>]/.test(answer.value) && typeof answer.detail==='string' && answer.detail.length<2000 && !/[<>]/.test(answer.detail)))return null;
    if(typeof data.name!=='string' || data.name.length>100 || typeof data.number!=='string' || data.number.length>3 || !['rapid','normal','realistic'].includes(data.mode))return null;
    if(!Array.isArray(data.traits) || !data.traits.every(value=>typeof value==='string' && value.length<100 && !/[<>]/.test(value)))return null;
    const validEvent=event=>event && Object.hasOwn(careerEventCopy.it.events,event.id) && typeof event.icon==='string' && Number.isInteger(event.checkpoint) && event.checkpoint>=0 && event.checkpoint<steps.length;
    data.events=Array.isArray(data.events)?data.events.filter(event=>validEvent(event)&&careerEventStatKeys.includes(event.stat)&&Number.isFinite(event.delta)&&Math.abs(event.delta)<=10).slice(0,2):[];
    data.pending=validEvent(data.pending)&&Array.isArray(data.pending.options)&&data.pending.options.length<=2&&data.pending.options.every(option=>careerEventStatKeys.includes(option.stat)&&Number.isFinite(option.delta)&&Math.abs(option.delta)<=10)?data.pending:null;
    data.timeline=Array.isArray(data.timeline)?data.timeline.filter(event=>event&&typeof event.value==='string'&&typeof event.question==='string').slice(0,100):[];
    data.scores=Array.isArray(data.scores)?data.scores.filter(Number.isFinite).slice(0,10):[];
    return data;
  }
  const currentOwnerId = () => user?.id || owner?.userId || null;
  const validateTransientActive = raw => typeof raw==='string' && raw.length<=8*1024*1024 && Boolean(validateActive(raw));
  function transientBackup(value) {
    if(!value || typeof value!=='object' || Array.isArray(value) || value.ownerId!==currentOwnerId())throw fault('operation_busy');
    if(value.active!==null && !validateTransientActive(value.active))throw fault('invalid_backup');
    if(value.personality!==null && (typeof value.personality!=='string' || value.personality.length>8*1024*1024 || !parse(value.personality) || typeof parse(value.personality)!=='object' || Array.isArray(parse(value.personality))))throw fault('invalid_backup');
    return {ownerId:value.ownerId,active:value.active,personality:value.personality};
  }
  function beginTransient() {
    if(transient)return {...transient};
    if(isBusy() || owner?.userId&&!user || spinning || conflict || window.fcwRoom?.getState()?.busy)throw fault('operation_busy');
    captureActive();
    const backup={ownerId:currentOwnerId(),active:localStorage.getItem(ACTIVE),personality:localStorage.getItem(PERSONALITY)};
    // A preview or reopened archive keeps the last genuine Solo career in storage.
    transient=transientBackup(backup);clearTimeout(timer);timer=null;
    try{cacheCurrent();}catch(error){transient=null;throw error;}
    return {...transient};
  }
  function captureTransient() {
    if(!transient)return null;
    return buildActive();
  }
  function restoreSoloStorage(backup) {
    rawWrite(ACTIVE,backup.active);rawWrite(PERSONALITY,backup.personality);
    [[ACTIVE,backup.active],[PERSONALITY,backup.personality]].forEach(([key,value])=>{if(value===null)delete localMemory[key];else localMemory[key]=value;});
  }
  async function restoreTransient(backup,currentActiveString) {
    if(isBusy() || owner?.userId&&!user || spinning || conflict || window.fcwRoom?.getState()?.busy)throw fault('operation_busy');
    const saved=transientBackup(backup),continuing=currentActiveString!==undefined;
    if(continuing && !validateTransientActive(currentActiveString))throw fault('invalid_backup');
    if(transient && transient.ownerId!==saved.ownerId)throw fault('operation_busy');
    const displayedPersonality=localStorage.getItem(PERSONALITY);
    transient=saved;clearTimeout(timer);timer=null;changing=true;
    const next=read();
    const selectedActive=continuing?currentActiveString:saved.active;
    const selectedPersonality=continuing?displayedPersonality:saved.personality;
    [[ACTIVE,selectedActive],[PERSONALITY,selectedPersonality]].forEach(([key,value])=>{if(value===null)delete next[key];else next[key]=value;});
    let applied=false;
    try {
      await applySnapshot(next);
      rawWrite(ACTIVE,saved.active);
      if(!continuing)restoreSoloStorage(saved);
      cacheCurrent();applied=true;
    } finally {
      rawWrite(ACTIVE,saved.active);
      changing=false;window.fcwAccountHydrating=false;
      if(applied && !continuing){transient=null;dirty=true;update();schedule();}
    }
    return {restored:true,transient:continuing};
  }
  function abortTransient(reason) {
    if(!transient)return;
    const saved=transient;
    // Another tab may already have installed the new owner into shared storage.
    if(!externalOwner)restoreSoloStorage(saved);
    else [[ACTIVE,saved.active],[PERSONALITY,saved.personality]].forEach(([key,value])=>{if(value===null)delete localMemory[key];else localMemory[key]=value;});
    transient=null;clearTimeout(timer);timer=null;
    window.dispatchEvent(new CustomEvent('fcw:transient-abort',{detail:{reason,ownerId:saved.ownerId}}));
  }
  async function applySnapshot(snapshot) {
    if(spinning)throw fault('operation_busy');
    window.fcwAccountHydrating=true;muted++;
    window.fcwAchievementGeneration=(window.fcwAchievementGeneration||0)+1;
    document.getElementById('achievementToasts')?.replaceChildren();
    try {
      KEYS.forEach(key=>rawWrite(key,snapshot[key]??null));
      const active=validateActive(snapshot['fcw-active-career-v1']);
      window.fcwDaily?.restoreAccountState(null);
      demoPreviewActive=false;restoringArchive=false;wheelPreviewActive=false;wheelPreviewIndex=0;previewRotation=0;spinning=false;
      answers=active?clone(active.answers):[];scores=active?.scores||[];chosenTraits=active?.traits||[];
      idx=active?.index||0;rotation=Number.isFinite(active?.rotation)?active.rotation:0;careerMode=active?.mode||'normal';
      careerTimeline=active?.timeline||[];careerEvents=active?.events||[];pendingCareerChoice=active?.pending||null;
      careerEventBonuses=careerEvents.reduce((sum,event)=>{sum[event.stat]=(sum[event.stat]||0)+event.delta;return sum;},{});
      careerCompareIds=[];document.getElementById('comparePanel').hidden=true;
      document.getElementById('careerName').value=active?.name||'';document.getElementById('shirtNumber').value=active?.number||'';
      ['careerSummary','careerCard','downloadCard','previewCardPicker','careerEventNotice','careerEventRecap'].forEach(id=>{const node=document.getElementById(id);if(node)node.hidden=true;});
      document.querySelectorAll('.career-share').forEach(node=>node.remove());
      document.getElementById('wheelPreviewPanel').open=false;
      setCareerIdentityLocked(Boolean(active?.locked||answers.length));
      const selectedLanguage=['it','en','es','fr'].includes(snapshot['fcw-language-v1'])?snapshot['fcw-language-v1']:language;
      document.getElementById('languageSelect').value=selectedLanguage;
      document.getElementById('languageSelect').dispatchEvent(new Event('change',{bubbles:true}));
      document.getElementById('hint').innerHTML=tr('Ogni giro determina una parte della tua storia.<br>Il risultato viene scelto dalla ruota.');
      delete document.getElementById('hint').dataset.identityError;
      let challenge=null;
      try{const savedChallenge=active?.experience?.challenge||active?.challenge?.challenge;if(savedChallenge)challenge=window.FCWChallenges.validateChallenge(savedChallenge);}catch{}
      if(starting&&startupChallenge&&!answers.length){try{challenge=window.FCWChallenges.decodeChallenge(startupChallenge);}catch{}}
      const experience={...active?.experience,challenge};
      window.fcwExperience?.restoreAccountState(experience);
      window.fcwChallenges?.restoreAccountState({version:1,challenge});
      update();renderCareerTimeline();renderWheelPreviewControls();
      if(active?.complete){restoringArchive=true;try{finishCareer();}finally{restoringArchive=false;}}
      if(pendingCareerChoice)showCareerEvent(pendingCareerChoice);
      window.fcwExperience?.restoreAccountState(experience);
      window.fcwDaily?.restoreAccountState(active?.daily||null);
      tournamentSelectedIds.clear();careerTournament=parse(snapshot['fcw-career-tournament-v1']);
      if(!isValidCareerTournament(careerTournament))careerTournament=null;
      window.dispatchEvent(new CustomEvent('fcw:account-restore',{detail:{userId:user?.id||null}}));
      renderArchive();renderAchievements();
      await Promise.resolve();await Promise.resolve();
      localMemory=read();
    } finally {muted--;window.fcwAccountHydrating=false;update();}
  }
  const union=(a,b)=>[...new Set([...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])])];
  const firstDate=(a,b)=>!a?b:!b?a:String(a)<String(b)?a:b;
  function mergeValue(key,b,l,r) {
    if(l===r || r===b)return {value:l};if(l===b)return {value:r};
    const B=parse(b),L=parse(l),R=parse(r);
    if(key==='fcw-scenario-tour-v1'){
      try{return {value:JSON.stringify(window.FCWScenarioTourModel.mergeLedgers(L,R))};}
      catch{return {conflict:true};}
    }
    if(key==='fcw-careers-v1' && Array.isArray(L)&&Array.isArray(R)){
      const old=new Map((Array.isArray(B)?B:[]).map(item=>[item.id,item])), left=new Map(L.map(item=>[item.id,item])),right=new Map(R.map(item=>[item.id,item])), all=new Map();
      for(const id of union([...left.keys()],[...right.keys()])){const a=left.get(id),c=right.get(id),prior=old.get(id);if(prior&&(!a||!c)&&same(a||c,prior))continue;all.set(id,a||c);}
      const created=item=>Number(String(item.id).match(/^c(\d{13})/)?.[1])||Date.parse(item.createdAt||'')||0;
      return {value:JSON.stringify([...all.values()].sort((a,c)=>created(c)-created(a)).slice(0,50))};
    }
    if(key==='fcw-achievement-profile-v1' && L?.unlocked&&R?.unlocked){const unlocked={...R.unlocked};Object.entries(L.unlocked).forEach(([id,value])=>{if(!unlocked[id]||String(value.date)<String(unlocked[id].date))unlocked[id]=value;});return {value:JSON.stringify({version:1,unlocked})};}
    if(['fcw-achievement-earned-at-v1','fcw-achievement-notified-v1'].includes(key)&&L&&R){const result={...R};Object.entries(L).forEach(([id,value])=>{if(key.endsWith('notified-v1'))result[id]=union(value,result[id]);else{const dates={...result[id]};Object.entries(value||{}).forEach(([mission,date])=>dates[mission]=firstDate(date,dates[mission]));result[id]=dates;}});return {value:JSON.stringify(result)};}
    if(key==='fcw-achievement-careers-v1' && L?.version===1 && R?.version===1){
      const seen=union(L.seen,R.seen), prior=new Set(B?.seen||[]), runs={...R.runs,...L.runs};
      const localSubset=(L.seen||[]).every(id=>(R.seen||[]).includes(id)),remoteSubset=(R.seen||[]).every(id=>(L.seen||[]).includes(id));
      let totals;
      if(localSubset)totals=R.totals;else if(remoteSubset)totals=L.totals;
      else{const added=seen.filter(id=>!prior.has(id));if(added.some(id=>!runs[id]))return {conflict:true};totals={goals:Number(B?.totals?.goals)||0,assists:Number(B?.totals?.assists)||0};added.forEach(id=>{totals.goals+=Number(runs[id].goals)||0;totals.assists+=Number(runs[id].assists)||0;});}
      const sets={};['nations','leagues','roles','styles'].forEach(key=>sets[key]=union(L.sets?.[key],R.sets?.[key]));return {value:JSON.stringify({version:1,seen,totals,sets,runs})};
    }
    if(key==='fcw-personal-records-v1' && L?.best&&R?.best){const best={...R.best};Object.entries(L.best).forEach(([id,value])=>{if(!best[id]||Number(value.value)>Number(best[id].value))best[id]=value;});const seen=union(L.seen,R.seen);return {value:JSON.stringify({best,seen,count:Math.max(seen.length,Number(L.count)||0,Number(R.count)||0)})};}
    if(key==='fcw-daily-challenge-v1' && L?.date&&R?.date){const latest=String(L.date)>String(R.date)?L:R;if(L.date!==R.date)return {value:JSON.stringify(latest)};return {value:JSON.stringify({...R,...L,attempts:Math.max(L.attempts||0,R.attempts||0),bestScore:Math.max(L.bestScore||0,R.bestScore||0),success:Boolean(L.success||R.success)})};}
    return {conflict:true};
  }
  function merge(b,l,r,choice) {
    const result={}, conflicts=[];
    KEYS.forEach(key=>{const merged=mergeValue(key,b[key],l[key],r[key]);if(merged.conflict){conflicts.push(key);if(choice)merged.value=choice==='local'?l[key]:r[key];}if(merged.value!==undefined)result[key]=merged.value;});
    return {snapshot:result,conflicts};
  }
  function preserveConflict(data) {
    conflict=data;rawWrite(CONFLICT,{version:1,userId:user.id,...data});status('conflict','revision_conflict');
  }
  async function performSync(choice) {
    if(!user)throw fault('unauthorized');if(transient||!installed||owner?.userId!==user.id||starting||changing||spinning)throw fault('operation_busy');
    const token=generation, id=user.id;captureActive();status('syncing');
    try {
      for(let attempt=0;attempt<3;attempt++){
        const local=read(), remote=await api();if(token!==generation||user?.id!==id)throw fault('operation_busy');
        const merged=merge(base,local,safeSnapshot(remote.snapshot),choice);
        if(merged.conflicts.length&&!choice){preserveConflict({base,local,remote:safeSnapshot(remote.snapshot),revision:remote.revision,updatedAt:remote.updatedAt,keys:merged.conflicts});throw fault('revision_conflict');}
        let saved=remote, uploaded=0;
        if(!same(merged.snapshot,safeSnapshot(remote.snapshot))){try{saved=await api({snapshot:merged.snapshot,expectedRevision:remote.revision});uploaded=1;}catch(e){if(e.code==='revision_conflict')continue;throw e;}}
        if(token!==generation||user?.id!==id)throw fault('operation_busy');
        const current=read(), edited=KEYS.filter(key=>current[key]!==local[key]);
        base=merged.snapshot;revision=saved.revision;updatedAt=saved.updatedAt;saveOwner();
        const next={...merged.snapshot};edited.forEach(key=>{if(current[key]===undefined)delete next[key];else next[key]=current[key];});
        const downloaded=!same(next,current)?1:0;
        if(downloaded){changing=true;try{await applySnapshot(next);}finally{changing=false;}}
        conflict=null;dirty=edited.length>0;status('success');if(dirty)schedule();
        return {uploaded,downloaded,updatedAt};
      }
      throw fault('revision_conflict');
    }catch(e){if(phase!=='conflict')status(e.code==='revision_conflict'?'conflict':'error',e.code||'network_error');if(['unauthorized','authentication_required'].includes(e.code)){installed=false;externalOwner=true;window.fcwAccount?.refresh();}throw e;}
  }
  function sync() {
    if(transient)return Promise.reject(fault('operation_busy'));
    clearTimeout(timer);if(flight)return flight;
    if(user&&!installed)return accountChanged({detail:{user,action:'session'}}).then(()=>{if(!installed)throw fault(error||'network_error');return sync();});
    flight=performSync().finally(()=>{flight=null;});return flight;
  }
  async function resolveConflict(choice) {
    if(transient)throw fault('operation_busy');
    if(!['local','remote'].includes(choice)||!conflict)throw fault('revision_conflict');
    if(flight)await flight.catch(()=>{});
    flight=performSync(choice).finally(()=>{flight=null;});return flight;
  }
  function backupConflict() {
    const data=conflict||parse(localStorage.getItem(CONFLICT));if(!data||data.userId&&data.userId!==user?.id)return;
    const blob=new Blob([JSON.stringify({version:1,userId:user?.id,savedAt:new Date().toISOString(),...data},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='career-wheel-saves-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function beforeAuth() {if(transient||starting||changing||spinning||flight)throw fault('operation_busy');}
  function prepareRegistration() {
    if(transient)throw fault('operation_busy');
    if(owner?.userId)return safeSnapshot(parse(localStorage.getItem(GUEST),{}));
    captureActive();const snapshot=read();rawWrite(GUEST,snapshot);return snapshot;
  }
  async function beforeLogout() {await beforeAuth();if(user)await sync();cacheCurrent();}
  async function accountChanged(event) {
    const next=event.detail?.user||null,action=event.detail?.action||'session';
    if(action==='nickname'){user=next;return;}
    if(transient && installed && !externalOwner && (next?.id||null)===transient.ownerId){user=next;return;}
    if(spinning)await new Promise(resolve=>{const landed=event=>{if(!event.detail?.spinning){window.removeEventListener('fcw:state',landed);resolve();}};window.addEventListener('fcw:state',landed);});
    if(changing)return;
    const wasTransient=Boolean(transient);
    if(wasTransient)abortTransient('owner-change');
    else if(!starting)captureActive();
    const previousOwner=owner,previousBase=base,previousRevision=revision,previousUpdated=updatedAt;
    changing=true;installed=false;generation++;clearTimeout(timer);status(next?'syncing':'idle');
    try {
      // Preserve the current owner before any other user's server state is installed.
      cacheCurrent();
      const previousId=owner?.userId;
      user=next;
      if(!next){
        if(previousId){const guest=safeSnapshot(parse(localStorage.getItem(GUEST),{}));owner=null;base={};revision=0;updatedAt=null;rawWrite(OWNER,null);rawWrite(BASE,null);await applySnapshot(guest);}
        else if(starting)await applySnapshot(read());
        conflict=null;installed=true;externalOwner=false;status('idle');return;
      }
      const remote=await api(), server=safeSnapshot(remote.snapshot);
      const cached=parse(localStorage.getItem(CACHE),{})[next.id];
      const sameOwner=!externalOwner&&previousId===next.id;
      const local=sameOwner?read():cached?.snapshot?cached.snapshot:server;
      base=sameOwner?base:cached?.base?safeSnapshot(cached.base):server;
      revision=Number(remote.revision)||0;updatedAt=remote.updatedAt||null;
      const mergeBase=base,merged=merge(mergeBase,safeSnapshot(local),server);
      if(merged.conflicts.length){base=mergeBase;preserveConflict({base:mergeBase,local:safeSnapshot(local),remote:server,revision,updatedAt,keys:merged.conflicts});await applySnapshot(local);saveOwner();}
      else{base=server;await applySnapshot(merged.snapshot);saveOwner();dirty=!same(merged.snapshot,server);status('success');}
      installed=true;externalOwner=false;
    }catch(e){owner=previousOwner;base=previousBase;revision=previousRevision;updatedAt=previousUpdated;try{rawWrite(OWNER,owner||null);rawWrite(BASE,base);}catch{}status('error',e.code||'storage_unavailable');}
    finally{starting=false;changing=false;window.fcwAccountHydrating=false;update();if(user&&installed&&dirty&&!conflict)schedule();}
  }
  function exportProgress() {
    if(transient||isBusy()||spinning)throw fault('operation_busy');
    captureActive();
    const backup={format:'career-wheel-progress',version:1,createdAt:new Date().toISOString(),snapshot:read()};
    const url=URL.createObjectURL(new Blob([JSON.stringify(backup)],{type:'application/json'})),a=document.createElement('a');
    a.href=url;a.download='career-wheel-progress.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function validateImportedValue(key,raw) {
    if(key==='fcw-language-v1')return ['it','en','es','fr'].includes(raw);
    const value=parse(raw),object=data=>Boolean(data&&typeof data==='object'&&!Array.isArray(data));
    const strings=data=>Array.isArray(data)&&data.every(item=>typeof item==='string');
    if(key===ACTIVE)return Boolean(validateActive(raw));
    if(key==='fcw-careers-v1')return Array.isArray(value)&&value.every(entry=>{
      if(!object(entry)||typeof entry.id!=='string'||typeof entry.name!=='string')return false;
      if(Object.hasOwn(entry,'answers')&&(!Array.isArray(entry.answers)||!entry.answers.every(answer=>answer===null||object(answer)&&typeof answer.value==='string')))return false;
      if(Object.hasOwn(entry,'stats')&&(!Array.isArray(entry.stats)||!entry.stats.every(stat=>Number.isFinite(stat)||typeof stat==='string'||Array.isArray(stat)&&stat.length===2&&typeof stat[0]==='string'&&['string','number'].includes(typeof stat[1]))))return false;
      if(Object.hasOwn(entry,'traits')&&!strings(entry.traits))return false;
      if(Object.hasOwn(entry,'events')&&(!Array.isArray(entry.events)||!entry.events.every(object)))return false;
      if(Object.hasOwn(entry,'timeline')&&(!Array.isArray(entry.timeline)||!entry.timeline.every(object)))return false;
      if(Object.hasOwn(entry,'trophies')&&!object(entry.trophies))return false;
      return true;
    });
    // Invalid JSON shapes must be rejected before any existing progress is replaced.
    if(!object(value))return false;
    if(key==='fcw-achievement-profile-v1')return object(value.unlocked)&&Object.values(value.unlocked).every(object);
    if(key==='fcw-achievement-notified-v1')return Object.values(value).every(strings);
    if(key==='fcw-achievement-earned-at-v1')return Object.values(value).every(records=>object(records)&&Object.values(records).every(date=>typeof date==='string'));
    if(key==='fcw-achievement-careers-v1')return value.version===1&&strings(value.seen)&&object(value.totals)&&object(value.sets)&&Object.values(value.sets).every(strings)&&(!Object.hasOwn(value,'runs')||object(value.runs));
    if(key==='fcw-personal-records-v1')return object(value.best)&&strings(value.seen);
    if(key==='fcw-feedback-draft-v1')return ['bug','idea'].includes(value.type)&&typeof value.message==='string';
    if(key==='fcw-scenario-tour-v1'){
      try{return Boolean(window.FCWScenarioTourModel?.validateLedger(value));}
      catch{return false;}
    }
    return true;
  }
  async function importProgress(file) {
    await beforeAuth();if(isBusy()||conflict||window.fcwRoom?.getState()?.busy)throw fault('operation_busy');
    if(!file||file.size>11*1024*1024)throw fault('invalid_backup');
    const data=parse(await file.text());
    if(data?.format!=='career-wheel-progress'||data.version!==1||!data.snapshot||typeof data.snapshot!=='object'||Array.isArray(data.snapshot))throw fault('invalid_backup');
    let bytes=0;const encoder=new TextEncoder();
    for(const [key,value] of Object.entries(data.snapshot)){
      if(!KEYS.includes(key)||typeof value!=='string'||encoder.encode(value).length>8*1024*1024)throw fault('invalid_backup');
      bytes+=encoder.encode(key+value).length;
      if(!validateImportedValue(key,value))throw fault('invalid_backup');
    }
    if(bytes>10*1024*1024||data.snapshot['fcw-active-career-v1']&&!validateActive(data.snapshot['fcw-active-career-v1']))throw fault('invalid_backup');
    await beforeAuth();captureActive();
    const current=read(),incoming=safeSnapshot(data.snapshot),next={...current};
    for(const [key,value] of Object.entries(incoming)){
      const combined=mergeValue(key,undefined,current[key],value);
      if(combined.conflict&&key==='fcw-achievement-careers-v1')throw fault('transfer_conflict');
      if(key==='fcw-active-career-v1'&&validateActive(current[key])?.answers.length)continue;
      next[key]=combined.conflict?value:combined.value;
    }
    // Keep a private recovery copy on this device before importing any progress.
    rawWrite('fcw-progress-before-import-v1',{version:1,savedAt:new Date().toISOString(),userId:user?.id||null,snapshot:current});
    changing=true;generation++;clearTimeout(timer);
    try{await applySnapshot(next);cacheCurrent();dirty=true;}
    catch(error){
      // The recovery copy and the previous working state survive a failed import.
      try{await applySnapshot(current);cacheCurrent();}catch{}
      throw error;
    }
    finally{changing=false;window.fcwAccountHydrating=false;update();}
    if(user)await sync();
    return {imported:true};
  }
  window.fcwAccountSync={sync,state,isBusy,prepareRegistration,beforeAuth,beforeLogout,resolveConflict,backupConflict,exportProgress,importProgress,beginTransient,transientActive:()=>Boolean(transient),captureTransient,restoreTransient,validateTransientActive};
  window.addEventListener('fcw:account',accountChanged);
  async function restoreOffline(code) {
    if(!starting){status('error',code);return;}
    if(changing)return;
    if(offlineFlight)return offlineFlight;
    const token=generation,savedOwner=owner?.userId||null;
    if(externalOwner||(parse(localStorage.getItem(OWNER))?.userId||null)!==savedOwner){
      externalOwner=true;installed=false;window.fcwAccountHydrating=true;status('error','operation_busy');return;
    }
    // Hydrate the cached run before startup updates can capture an empty career.
    // Its owner remains attached to the cache until a verified session is available.
    window.fcwAccountHydrating=true;
    offlineFlight=(async()=>{
      try{
        await applySnapshot(protectSolo({...localMemory}));
        if(token!==generation||externalOwner||changing)return;
        starting=false;installed=!user;window.fcwAccountHydrating=false;
        status('error',code);update();
      }catch(error){
        // Failed hydration must not let the blank screen replace cached progress.
        window.fcwAccountHydrating=true;status('error',error.code||'storage_unavailable');
      }finally{offlineFlight=null;}
    })();
    return offlineFlight;
  }
  window.addEventListener('fcw:account-unavailable',event=>{restoreOffline(event.detail?.error||'server_unavailable').catch(()=>{});});
  ['fcw:state','fcw:complete','fcw:reset'].forEach(name=>window.addEventListener(name,()=>{captureActive();}));
  window.addEventListener('fcw:language',()=>{if(!window.fcwAccountHydrating)localStorage.setItem('fcw-language-v1',document.documentElement.lang);});
  window.addEventListener('pagehide',()=>{captureActive();try{if(transient&&!externalOwner)restoreSoloStorage(transient);if(!user||installed)cacheCurrent();}catch{}if(!transient&&user&&installed&&owner?.userId===user.id&&dirty&&!starting&&!changing&&!conflict)fetch('/api/account/saves',{method:'POST',credentials:'same-origin',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({snapshot:read(),expectedRevision:revision,userId:user.id})}).catch(()=>{});});
  window.addEventListener('storage',event=>{if(event.key!==OWNER)return;const nextOwner=parse(event.newValue);if(nextOwner?.userId===owner?.userId)return;externalOwner=true;installed=false;window.fcwAccountHydrating=true;clearTimeout(timer);abortTransient('owner-change');window.fcwAccount?.refresh();});
  window.addEventListener('online',()=>{if(user)sync().catch(()=>{});});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&user&&!spinning)sync().catch(()=>{});});
  function init() {
    document.addEventListener('click',event=>{if(isBusy()&&!event.target.closest('.cw-account,.cw-friends,.cw-top-nav,.cw-hub-head,.cw-hub-tabs')){event.preventDefault();event.stopImmediatePropagation();}},{capture:true});
    ['spin','wheel','reset','testCard'].forEach(id=>document.getElementById(id)?.addEventListener('click',event=>{if(starting||changing||flight||user&&!installed||window.fcwAccountHydrating){event.preventDefault();event.stopImmediatePropagation();}},{capture:true}));
    ['careerName','shirtNumber'].forEach(id=>document.getElementById(id)?.addEventListener('input',captureActive));
    // A failed session request leaves the browser cache usable for offline play.
    setTimeout(()=>{if(starting)restoreOffline('network_error').catch(()=>{});},18000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
