/* A keyboard accessible hub delegates every action to the existing spin button. */
(() => {
  'use strict';
  const copy = {
    it:{spin:'GIRA',next:'AVANTI',done:'FINE',preview:'ANTEPRIMA',busy:'…',spinLabel:'Gira la ruota',nextLabel:'Vai alla prossima ruota',doneLabel:'Carriera completata',previewLabel:'Anteprima della ruota',busyLabel:'Ruota in movimento',identity:'Inserisci nome e numero di maglia per girare la ruota.',pending:'Completa la scelta dell’evento prima di continuare.'},
    en:{spin:'SPIN',next:'NEXT',done:'DONE',preview:'PREVIEW',busy:'…',spinLabel:'Spin the wheel',nextLabel:'Go to the next wheel',doneLabel:'Career complete',previewLabel:'Wheel preview',busyLabel:'Wheel spinning',identity:'Enter a name and shirt number to spin the wheel.',pending:'Finish the event choice before continuing.'},
    es:{spin:'GIRA',next:'SIGUE',done:'FIN',preview:'VISTA PREVIA',busy:'…',spinLabel:'Gira la ruleta',nextLabel:'Ir a la siguiente ruleta',doneLabel:'Carrera completada',previewLabel:'Vista previa de la ruleta',busyLabel:'Ruleta en movimiento',identity:'Introduce nombre y dorsal para girar la ruleta.',pending:'Completa la elección del evento antes de continuar.'},
    fr:{spin:'TOURNE',next:'SUITE',done:'FIN',preview:'APERÇU',busy:'…',spinLabel:'Tourner la roue',nextLabel:'Passer à la roue suivante',doneLabel:'Carrière terminée',previewLabel:'Aperçu de la roue',busyLabel:'Roue en mouvement',identity:'Saisis un nom et un numéro de maillot pour tourner la roue.',pending:'Termine le choix de l’événement avant de continuer.'}
  };
  Object.assign(copy.it,{replay:'RIGIOCA',replayLabel:'Inizia una nuova carriera'});
  Object.assign(copy.en,{replay:'REPLAY',replayLabel:'Start a new career'});
  Object.assign(copy.es,{replay:'REPETIR',replayLabel:'Empieza una nueva carrera'});
  Object.assign(copy.fr,{replay:'REJOUER',replayLabel:'Commencer une nouvelle carrière'});
  let hub, label, shell, pin, spinButton, observer, pointerAnimation;
  let lastPointer=-1, lastSpinning=false, lastTick=0;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function visualState() { return window.fcwWheelVisual?.snapshot?.() || {spinning,preview:wheelPreviewActive,complete:!document.getElementById('careerSummary').hidden,selectedIndex:-1,rare:false}; }
  function updateHub() {
    if (!hub) return;
    const state=visualState(), text=copy[document.documentElement.lang] || copy.it;
    const selected=Boolean(answers[idx]) || steps[idx]?.kind==='trait' && chosenTraits.length>=(answers.find(answer=>answer?.kind==='talents')?.count||1);
    const key=state.spinning?'busy':state.preview?'preview':state.complete?'replay':selected?'next':'spin';
    // Replay follows the same canonical button and its capture guards as a spin.
    const locked=Boolean(spinButton.disabled || state.spinning || state.preview || pendingCareerChoice || window.fcwAccountHydrating || window.fcwAccountSync?.isBusy?.());
    label.textContent=text[key]; hub.disabled=locked;
    hub.setAttribute('aria-label',text[key+'Label']);
    hub.setAttribute('aria-busy',String(Boolean(state.spinning)));
    hub.title=pendingCareerChoice?text.pending:!hasCareerIdentity()?text.identity:text[key+'Label'];
    hub.dataset.state=key;
    shell.dataset.wheelState=state.spinning?'spinning':Number.isInteger(state.selectedIndex)&&state.selectedIndex>=0?'selected':'ready';
    shell.dataset.wheelRare=String(Boolean(state.rare && !state.spinning && !state.preview));
  }
  function frame(event) {
    if (!hub) return;
    const state=event.detail || visualState();
    if (state.spinning && !state.preview) {
      const pointer=Number.isInteger(state.pointerIndex)?state.pointerIndex:underPointer(state);
      const now=performance.now();
      if (lastPointer>=0 && pointer!==lastPointer && now-lastTick>=75 && !reduced()) {
        lastTick=now; pointerAnimation?.cancel();
        pointerAnimation=pin.animate([{transform:'translateX(-50%) rotate(0deg)'},{transform:'translateX(-50%) rotate(-11deg)',offset:.35},{transform:'translateX(-50%) rotate(0deg)'}],{duration:105,easing:'ease-out'});
      }
      lastPointer=pointer;
    } else {
      if (lastSpinning && !reduced()) {
        pointerAnimation?.cancel();
        pointerAnimation=pin.animate([{filter:'drop-shadow(0 0 2px #eccd8b55)'},{filter:'drop-shadow(0 0 10px #eccd8bcc)',offset:.3},{filter:'drop-shadow(0 2px 3px #0008)'}],{duration:420,easing:'ease-out'});
      }
      lastPointer=-1;
    }
    lastSpinning=Boolean(state.spinning); updateHub();
  }
  function underPointer(state) {
    const angle=((-(state.rotation||0)%TAU)+TAU)%TAU;
    const parts=Array.isArray(state.parts)?state.parts:sliceGeometry(displayStep());
    return parts.findIndex(part=>angle>=part.start+Math.PI/2 && angle<part.end+Math.PI/2);
  }
  function init() {
    shell=document.querySelector('.wheel-shell');spinButton=document.getElementById('spin');pin=shell?.querySelector('.pin');
    if (!shell || !spinButton || !pin) return;
    pin.setAttribute('aria-hidden','true');
    hub=document.createElement('button');hub.id='wheelHub';hub.type='button';hub.className='wheel-hub';
    label=document.createElement('span');label.className='wheel-hub-label';hub.append(label);shell.append(hub);
    hub.addEventListener('click',()=>{updateHub();if(!hub.disabled)spinButton.click();updateHub();});
    observer=new MutationObserver(updateHub);observer.observe(spinButton,{attributes:true,attributeFilter:['disabled'],childList:true,subtree:true});
    window.addEventListener('fcw:wheel-frame',frame);
    ['fcw:state','fcw:language','fcw:account-restore','fcw:local-duel','fcw:reset'].forEach(event=>window.addEventListener(event,updateHub));
    // Sync status is emitted before its promise clears the busy flag.
    window.addEventListener('fcw:account-sync',()=>{updateHub();setTimeout(updateHub,0);});
    document.getElementById('languageSelect')?.addEventListener('change',()=>queueMicrotask(updateHub));
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{pointerAnimation?.cancel();lastPointer=-1;updateHub();});
    updateHub();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
