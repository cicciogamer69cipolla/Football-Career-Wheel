/* Permanent scenario medals. A medal always belongs to one genuine career. */
(function(root, factory) {
  const model = factory();
  if (typeof module === 'object' && module.exports) module.exports = model;
  else root.FCWScenarioTourModel = model;
})(typeof window === 'undefined' ? {} : window, function() {
  'use strict';
  const tiers = ['bronze', 'silver', 'gold'];
  const rules = {
    bomber: {bronze:[['goals',200],['shooting',75]],silver:[['goals',500],['shooting',85]],gold:[['goals',700],['shooting',95]]},
    maestro: {bronze:[['assists',100],['passing',75]],silver:[['assists',300],['passing',85]],gold:[['assists',400],['passing',95]]},
    captain: {bronze:[['seasons',12],['league',1]],silver:[['seasons',15],['league',3]],gold:[['seasons',20],['league',5]]},
    national: {bronze:[['continental',1]],silver:[['world',1],['continental',1]],gold:[['world',2],['continental',2]]},
    wall: {bronze:[['defending',80],['physical',75]],silver:[['defending',90],['physical',85]],gold:[['defending',95],['physical',90]]},
    complete: {bronze:[['overall',75],['lowestStat',65]],silver:[['overall',85],['lowestStat',80]],gold:[['overall',88],['lowestStat',80]]}
  };
  const caps = {goals:900,assists:500,shooting:99,passing:99,seasons:30,league:10,world:4,continental:5,defending:99,physical:99,overall:99,lowestStat:99};
  const medals = Object.keys(rules).flatMap(theme => tiers.map(tier => theme+'-'+tier));
  const emptyLedger = () => ({version:1,unlocked:{},seen:[],best:{}});
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  function exact(value, keys) {if (!object(value) || Object.keys(value).some(key => !keys.includes(key))) throw new Error('invalid_tour');}
  function provenance(value, best=false) {
    exact(value, ['runId','name','date','mode',...(best?['metrics']:[])]);
    if (typeof value.runId!=='string' || !value.runId || value.runId.length>128 || /[\u0000-\u001f]/.test(value.runId) || typeof value.name!=='string' || value.name.length>24 || /[\u0000-\u001f]/.test(value.name) || typeof value.date!=='string' || !/^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(value.date) || !Number.isFinite(Date.parse(value.date)) || !['rapid','normal','realistic'].includes(value.mode)) throw new Error('invalid_tour');
    const result = {runId:value.runId,name:value.name,date:value.date,mode:value.mode};
    if (best) result.metrics = validateMetrics(value.metrics);
    return result;
  }
  function validateMetrics(value) {
    exact(value, Object.keys(caps));
    if (Object.keys(value).length!==Object.keys(caps).length) throw new Error('invalid_tour');
    const result = {};
    Object.entries(caps).forEach(([key,cap]) => {if (!Number.isInteger(value[key]) || value[key]<0 || value[key]>cap) throw new Error('invalid_tour');result[key]=value[key];});
    return result;
  }
  function validateLedger(value) {
    exact(value, ['version','unlocked','seen','best']);
    if (value.version!==1 || !object(value.unlocked) || !object(value.best) || !Array.isArray(value.seen) || value.seen.length>200 || value.seen.some(id=>typeof id!=='string'||!id||id.length>128||/[\u0000-\u001f]/.test(id)) || new Set(value.seen).size!==value.seen.length) throw new Error('invalid_tour');
    const result=emptyLedger(); result.seen=[...value.seen];
    Object.entries(value.unlocked).forEach(([id,entry]) => {if (!medals.includes(id)) throw new Error('invalid_tour'); result.unlocked[id]=provenance(entry);});
    Object.entries(value.best).forEach(([theme,entry]) => {if (!Object.hasOwn(rules,theme)) throw new Error('invalid_tour');result.best[theme]=provenance(entry,true);});
    return result;
  }
  function evaluate(theme,tier,metrics) {
    if (!Object.hasOwn(rules,theme) || !tiers.includes(tier)) throw new Error('invalid_tour');
    const checks=rules[theme][tier].map(([metric,target])=>({metric,target,current:Number(metrics?.[metric])||0,reached:(Number(metrics?.[metric])||0)>=target}));
    return {checks,success:checks.every(check=>check.reached),progress:Math.min(...checks.map(check=>Math.min(1,Math.max(0,check.current/check.target))))};
  }
  function better(theme,a,b) {
    if (!b) return true;
    const rank = entry => {const result=evaluate(theme,'gold',entry.metrics);return [result.progress,result.checks.reduce((sum,c)=>sum+Math.min(1,c.current/c.target),0)];};
    const left=rank(a),right=rank(b);
    return left[0]!==right[0]?left[0]>right[0]:left[1]!==right[1]?left[1]>right[1]:a.date!==b.date?a.date<b.date:a.runId<b.runId;
  }
  function mergeLedgers(left,right) {
    const a=validateLedger(left),b=validateLedger(right),result=emptyLedger();
    result.seen=[...new Set([...a.seen,...b.seen])].slice(-200);
    medals.forEach(id=>{const entries=[a.unlocked[id],b.unlocked[id]].filter(Boolean).sort((x,y)=>x.date.localeCompare(y.date)||x.runId.localeCompare(y.runId));if(entries.length)result.unlocked[id]=entries[0];});
    Object.keys(rules).forEach(theme=>{const x=a.best[theme],y=b.best[theme];if(x||y)result.best[theme]=x&&better(theme,x,y)?x:y;});
    return validateLedger(result);
  }
  function metricsFor(player) {
    if (!object(player)||!Array.isArray(player.stats)||player.stats.length!==6||player.stats.some(value=>!Number.isInteger(value)||value<0||value>99)||!object(player.career)) throw new Error('invalid_tour');
    const c=player.career;
    return validateMetrics({goals:c.goals,assists:c.assists,shooting:player.stats[1],passing:player.stats[2],seasons:c.seasons,league:c.league,world:c.world,continental:c.continental,defending:player.stats[4],physical:player.stats[5],overall:player.overall,lowestStat:Math.min(...player.stats)});
  }
  function recordCompletion(value,state,mode='normal',date=new Date().toISOString()) {
    const ledger=validateLedger(value),fresh=[];
    if (!state?.complete||state.demo||state.restored||state.archive||state.preview||state.spinning||!state.runId||ledger.seen.includes(state.runId)) return {ledger,fresh};
    const metrics=metricsFor(state.playerResult),meta=provenance({runId:state.runId,name:String(state.identity?.name||state.playerResult.name||'').replace(/[\u0000-\u001f]/g,'').slice(0,24),date,mode});
    Object.keys(rules).forEach(theme=>{
      tiers.forEach(tier=>{const id=theme+'-'+tier;if(!ledger.unlocked[id]&&evaluate(theme,tier,metrics).success){ledger.unlocked[id]={...meta};fresh.push(id);}});
      const attempt={...meta,metrics:{...metrics}}; if(better(theme,attempt,ledger.best[theme]))ledger.best[theme]=attempt;
    });
    ledger.seen=[...ledger.seen,state.runId].slice(-200);
    return {ledger:validateLedger(ledger),fresh};
  }
  return Object.freeze({tiers,rules,medals,caps,emptyLedger,validateLedger,mergeLedgers,evaluate,metricsFor,recordCompletion});
});

(() => {
  'use strict';
  if (typeof window==='undefined'||!window.FCWScenarioTourModel) return;
  const model=window.FCWScenarioTourModel, KEY='fcw-scenario-tour-v1';
  const copy={
    it:{title:'Tour delle leggende',intro:'18 medaglie da conquistare. Ogni nuova carriera in Singolo conta, anche libera. Gli obiettivi degli scenari restano gli stessi.',hint:'Ogni medaglia si ottiene una volta sola. Le anteprime e le carriere riaperte non contano; non ci sono XP ripetibili.',count:n=>n+'/18 medaglie',all:'Tour completato. Ora prova a migliorare i tuoi record!',tier:['Bronzo','Argento','Oro'],next:'Prossima medaglia',earned:'Ottenuta',best:'Miglior tentativo per l’oro',live:'In questa carriera',unplayed:'Nessun tentativo ancora',fresh:'Nuove medaglie',open:'Vedi il Tour',remaining:'Continua a girare: puoi conquistare medaglie anche in una carriera libera.',metrics:{goals:'Gol',assists:'Assist',shooting:'Tiro',passing:'Passaggi',seasons:'Stagioni',league:'Campionati',world:'Mondiali',continental:'Coppe continentali',defending:'Difesa',physical:'Fisico',overall:'OVR',lowestStat:'Ogni attributo'},themes:['Bomber','Regista','Capitano','Leggenda nazionale','Il muro','Calciatore completo']},
    en:{title:'Legends tour',intro:'18 medals to collect. Every new Solo career counts, including free careers. Scenario goals stay the same.',hint:'Each medal is earned once. Previews and reopened careers do not count; there is no repeatable XP.',count:n=>n+'/18 medals',all:'Tour complete. Now try to improve your records!',tier:['Bronze','Silver','Gold'],next:'Next medal',earned:'Earned',best:'Best attempt towards gold',live:'This career',unplayed:'No attempts yet',fresh:'New medals',open:'View the Tour',remaining:'Keep spinning: free careers can earn medals too.',metrics:{goals:'Goals',assists:'Assists',shooting:'Shooting',passing:'Passing',seasons:'Seasons',league:'League titles',world:'World Cups',continental:'Continental cups',defending:'Defending',physical:'Physical',overall:'OVR',lowestStat:'Every attribute'},themes:['Goal machine','Playmaker','Captain','National legend','The wall','Complete player']},
    es:{title:'Tour de leyendas',intro:'18 medallas por conseguir. Cada nueva carrera en Solo cuenta, también las libres. Los objetivos de los escenarios no cambian.',hint:'Cada medalla se consigue una vez. Las vistas previas y carreras reabiertas no cuentan; no hay XP repetibles.',count:n=>n+'/18 medallas',all:'Tour completado. ¡Ahora mejora tus récords!',tier:['Bronce','Plata','Oro'],next:'Próxima medalla',earned:'Conseguida',best:'Mejor intento hacia el oro',live:'En esta carrera',unplayed:'Sin intentos aún',fresh:'Nuevas medallas',open:'Ver el Tour',remaining:'Sigue girando: las carreras libres también consiguen medallas.',metrics:{goals:'Goles',assists:'Asistencias',shooting:'Tiro',passing:'Pases',seasons:'Temporadas',league:'Ligas',world:'Mundiales',continental:'Copas continentales',defending:'Defensa',physical:'Físico',overall:'OVR',lowestStat:'Cada atributo'},themes:['Goleador','Organizador','Capitán','Leyenda nacional','El muro','Jugador completo']},
    fr:{title:'Tour des légendes',intro:'18 médailles à obtenir. Chaque nouvelle carrière Solo compte, même libre. Les objectifs des scénarios restent identiques.',hint:'Chaque médaille est obtenue une seule fois. Les aperçus et carrières rouvertes ne comptent pas ; aucun XP répétable.',count:n=>n+'/18 médailles',all:'Tour terminé. Essayez maintenant de battre vos records !',tier:['Bronze','Argent','Or'],next:'Prochaine médaille',earned:'Obtenue',best:'Meilleure tentative vers l’or',live:'Cette carrière',unplayed:'Aucune tentative',fresh:'Nouvelles médailles',open:'Voir le Tour',remaining:'Continuez à tourner : les carrières libres rapportent aussi des médailles.',metrics:{goals:'Buts',assists:'Passes décisives',shooting:'Tir',passing:'Passes',seasons:'Saisons',league:'Championnats',world:'Coupes du monde',continental:'Coupes continentales',defending:'Défense',physical:'Physique',overall:'OVR',lowestStat:'Chaque attribut'},themes:['Buteur','Meneur de jeu','Capitaine','Légende nationale','Le mur','Joueur complet']}
  };
  const $=id=>document.getElementById(id), words=()=>copy[document.documentElement.lang]||copy.it;
  const saveCopy={it:['Medaglie non salvate: lo spazio del browser potrebbe essere pieno. Riprova il salvataggio.','Riprova salvataggio'],en:['Medals were not saved: browser storage may be full. Try saving again.','Retry saving'],es:['Medallas sin guardar: el almacenamiento del navegador puede estar lleno. Vuelve a intentarlo.','Reintentar guardado'],fr:['Médailles non sauvegardées : le stockage du navigateur est peut-être plein. Réessayez.','Réessayer la sauvegarde']};
  const readCopy={it:'I progressi del Tour non sono leggibili. Il salvataggio è sospeso per conservarli. Riprova.',en:'Tour progress could not be read. Saving is paused to preserve it. Try again.',es:'No se puede leer el progreso del Tour. El guardado está suspendido para conservarlo. Reinténtalo.',fr:'La progression du Tour est illisible. La sauvegarde est suspendue pour la préserver. Réessayez.'};
  const make=(tag,className='',text='')=>{const el=document.createElement(tag);el.className=className;el.textContent=text;return el;};
  let ledger=model.emptyLedger(), fresh=[], freshRun='', mounted=false, summary,title,intro,count,note,fill,result,retrySave,saveError=false,readBlocked=false,pendingState=null;
  const cards=new Map();
  function load() {try{const raw=localStorage.getItem(KEY);ledger=raw===null?model.emptyLedger():model.validateLedger(JSON.parse(raw));readBlocked=false;}catch{ledger=model.emptyLedger();readBlocked=true;}}
  function mode() {return typeof careerMode==='string'?careerMode:'normal';}
  function themeName(theme) {return words().themes[Object.keys(model.rules).indexOf(theme)];}
  function medalLabel(id) {const [theme,tier]=id.split('-');return themeName(theme)+' · '+words().tier[model.tiers.indexOf(tier)];}
  function checkText(checks) {return checks.map(check=>words().metrics[check.metric]+' ≥ '+check.target).join(' · ');}
  function mount() {
    const parent=document.querySelector('#fcwScenarios .fcw-challenge-body');if(mounted||!parent)return;
    mounted=true;summary=make('section','cw-tour-summary');summary.id='cwScenarioTour';summary.setAttribute('aria-labelledby','cwScenarioTourTitle');
    const head=make('div','cw-tour-heading');title=make('h3');title.id='cwScenarioTourTitle';count=make('strong','cw-tour-count');head.append(title,count);
    intro=make('p');const meter=make('div','cw-tour-meter');meter.setAttribute('aria-hidden','true');fill=make('i');meter.append(fill);note=make('small');
    retrySave=make('button','cw-tour-open');retrySave.type='button';retrySave.hidden=true;retrySave.addEventListener('click',()=>{if(readBlocked)load();if(pendingState?.runId===window.fcwExperience?.snapshot()?.runId)complete({detail:pendingState});else render();});
    summary.append(head,intro,meter,note,retrySave);parent.prepend(summary);
    Object.keys(model.rules).forEach(theme=>{
      const card=document.querySelector('.fcw-scenario-card[data-scenario="'+theme+'"] .fcw-scenario-content');if(!card)return;
      const medals=make('span','cw-tour-medals'),badges=model.tiers.map(tier=>{const badge=make('span','cw-tour-medal');badge.dataset.tier=tier;medals.append(badge);return badge;});
      const goal=make('span','cw-tour-goal'),progress=make('span','cw-tour-progress');card.append(medals,goal,progress);cards.set(theme,{badges,goal,progress});
    });
    window.fcwScenarioTour={refresh:render,ledger:()=>model.validateLedger(ledger)};
  }
  function render() {
    mount();if(!mounted)return;const t=words(),state=window.fcwExperience?.snapshot(),total=Object.keys(ledger.unlocked).length;
    const saveWords=saveCopy[document.documentElement.lang]||saveCopy.it;
    title.textContent=t.title;intro.textContent=total===18?t.all:t.intro;count.textContent=readBlocked?'—/18':t.count(total);note.textContent=readBlocked?(readCopy[document.documentElement.lang]||readCopy.it):saveError?saveWords[0]:t.hint;note.classList.toggle('cw-tour-save-error',saveError||readBlocked);retrySave.hidden=!saveError&&!readBlocked;retrySave.textContent=saveWords[1];fill.style.width=(total/18*100)+'%';
    let live=null;if(state?.started&&!state.demo&&!state.restored&&!state.preview&&!window.fcwLocalDuelSession?.state?.()?.active){try{live=model.metricsFor(state.playerResult);}catch{}}
    cards.forEach((nodes,theme)=>{
      nodes.badges.forEach((badge,index)=>{const tier=model.tiers[index],entry=ledger.unlocked[theme+'-'+tier];badge.dataset.earned=String(Boolean(entry));badge.textContent=(entry?'✓ ':'○ ')+t.tier[index];badge.title=checkText(model.evaluate(theme,tier,{}).checks)+(entry?' · '+entry.name:'');});
      const next=model.tiers.find(tier=>!ledger.unlocked[theme+'-'+tier]);
      nodes.goal.textContent=next?t.next+' · '+t.tier[model.tiers.indexOf(next)]+': '+checkText(model.evaluate(theme,next,{}).checks):'✓ '+t.all;
      const best=ledger.best[theme],metrics=live||best?.metrics;
      if(!metrics){nodes.progress.textContent=t.unplayed;return;}
      const result=model.evaluate(theme,live?(next||'gold'):'gold',metrics);
      nodes.progress.textContent=(live?t.live:t.best)+' · '+Math.round(result.progress*100)+'%'+(!live&&best?' · '+best.name:'');
    });
    renderResult(state);
  }
  function renderResult(state) {
    const parent=document.querySelector('#careerSummary .career-record');if(!parent)return;
    if(!result){result=make('section','cw-tour-result');result.id='cwScenarioTourResult';result.setAttribute('role','status');parent.append(result);}
    result.hidden=!state?.complete||state.demo||state.restored||state.preview||freshRun!==state.runId||!fresh.length;
    if(result.hidden)return;const t=words();result.replaceChildren(make('small','',t.fresh));
    const list=make('ul');fresh.forEach(id=>{const li=make('li','',medalLabel(id));li.dataset.tier=id.split('-')[1];list.append(li);});
    const open=make('button','cw-tour-open',t.open);open.type='button';open.addEventListener('click',()=>window.fcwNavigation?.open('objectives','scenarios'));result.append(list,open);
  }
  function complete(event) {
    const state=event.detail||window.fcwExperience?.snapshot();
    if(window.fcwAccountHydrating||window.fcwAccountSync?.transientActive?.()||window.fcwLocalDuelSession?.state?.()?.active||!state?.complete||state.demo||state.restored||state.archive||state.preview||state.spinning||!state.runId||ledger.seen.includes(state.runId))return;
    if(readBlocked){pendingState=state;render();return;}
    try {
      const recorded=model.recordCompletion(ledger,state,mode());
      try{localStorage.setItem(KEY,JSON.stringify(recorded.ledger));}catch(error){saveError=true;pendingState=state;render();return;}
      ledger=recorded.ledger;saveError=false;pendingState=null;
      if(recorded.fresh.length){fresh=recorded.fresh;freshRun=state.runId;}
      window.dispatchEvent(new CustomEvent('fcw:tour',{detail:{count:Object.keys(ledger.unlocked).length,fresh:[...recorded.fresh]}}));
    } catch(error){console.warn('Scenario medals could not be saved.',error);}
    render();
  }
  load();
  ['fcw:state','fcw:language','fcw:ready'].forEach(type=>window.addEventListener(type,render));
  window.addEventListener('fcw:complete',complete);
  window.addEventListener('fcw:reset',()=>{fresh=[];freshRun='';saveError=false;pendingState=null;render();});
  window.addEventListener('fcw:account-restore',()=>{load();fresh=[];freshRun='';saveError=false;pendingState=null;render();});
  window.addEventListener('storage',event=>{if(event.key===KEY){load();render();}});
  document.getElementById('languageSelect')?.addEventListener('change',render);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
