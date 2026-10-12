/* Bounded card image loading and local fallback art. No saved data is changed. */
(() => {
  'use strict';
  const copy={
    it:{preparing:'Preparazione carta…',ready:'Carta pronta.',error:'Non riesco a esportare la carta. Riprova.'},
    en:{preparing:'Preparing card…',ready:'Card ready.',error:'The card could not be exported. Try again.'},
    es:{preparing:'Preparando carta…',ready:'Carta lista.',error:'No se ha podido exportar la carta. Inténtalo de nuevo.'},
    fr:{preparing:'Préparation de la carte…',ready:'Carte prête.',error:'La carte n’a pas pu être exportée. Réessaie.'}
  };
  const cached=new Map();
  window.fcwCardExportCopy=()=>copy[document.documentElement.lang]||copy.it;
  window.fcwCardFallbackUrl=card=>{
    const tier=['bronze','silver','gold','hero','legend','halloffut'].find(value=>card?.classList.contains(value))||'gold';
    return new URL(`card-fallback-${tier}.svg`,location.href).href;
  };
  window.fcwLoadCardImage=(source,timeoutMs=2500)=>{
    const key=String(source);
    if(cached.has(key))return Promise.resolve(cached.get(key));
    return new Promise((resolve,reject)=>{
      const image=new Image();image.crossOrigin='anonymous';let done=false;
      const finish=(error)=>{if(done)return;done=true;clearTimeout(timer);image.onload=image.onerror=null;if(error){image.src='';reject(error);}else{cached.set(key,image);resolve(image);}};
      const timer=setTimeout(()=>finish(new Error('Card image timeout')),timeoutMs);
      image.onload=()=>finish();image.onerror=()=>finish(new Error('Card image unavailable'));
      image.src=key;
    });
  };
  function init(){
    const card=document.getElementById('cardInner'),button=document.getElementById('downloadCard');if(!card||!button)return;
    const status=document.createElement('p');status.id='cardExportStatus';status.className='card-export-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');button.after(status);
    let observed='';
    const ensureBackground=()=>{
      const source=card.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
      if(!source||source===observed||source.includes('card-fallback-'))return;observed=source;
      window.fcwLoadCardImage(source).catch(()=>{
        const current=card.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
        if(current===source)card.style.backgroundImage=`url("${window.fcwCardFallbackUrl(document.getElementById('careerCard'))}")`;
      });
    };
    new MutationObserver(ensureBackground).observe(card,{attributes:true,attributeFilter:['style']});ensureBackground();
    document.getElementById('languageSelect')?.addEventListener('change',()=>{status.textContent='';});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
