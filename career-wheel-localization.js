/* Translate canonical dynamic values without changing stored Italian answer keys. */
(() => {
  'use strict';
  const copy={
    en:{role:'Position',height:'Height',result:'Result',club:'career club',assign:n=>`${n} talents to assign`,talents:n=>`${n} talents`,choose:(n,total)=>`Choose talent ${n} of ${total}`,trait:(n,total)=>`Talent ${n} of ${total}`,share:'My football career',card:'My player card',exportError:'The card background could not be exported. Check your connection and try again.'},
    es:{role:'Posición',height:'Altura',result:'Resultado',club:'club de la carrera',assign:n=>`${n} talentos por asignar`,talents:n=>`${n} talentos`,choose:(n,total)=>`Elige el talento ${n} de ${total}`,trait:(n,total)=>`Talento ${n} de ${total}`,share:'Mi carrera de fútbol',card:'Mi carta de jugador',exportError:'No se ha podido exportar el fondo de la carta. Comprueba la conexión e inténtalo de nuevo.'},
    fr:{role:'Poste',height:'Taille',result:'Résultat',club:'club de la carrière',assign:n=>`${n} talents à attribuer`,talents:n=>`${n} talents`,choose:(n,total)=>`Choisis le talent ${n} sur ${total}`,trait:(n,total)=>`Talent ${n} sur ${total}`,share:'Ma carrière de footballeur',card:'Ma carte de joueur',exportError:'Le fond de la carte n’a pas pu être exporté. Vérifie la connexion et réessaie.'}
  };
  const bonusNames={
    en:{Tiro:'Shooting',Passaggio:'Passing',Visione:'Vision',Resistenza:'Stamina',Leadership:'Leadership',Rigori:'Penalties','Colpo di testa':'Heading'},
    es:{Tiro:'Tiro',Passaggio:'Pases',Visione:'Visión',Resistenza:'Resistencia',Leadership:'Liderazgo',Rigori:'Penaltis','Colpo di testa':'Remate de cabeza'},
    fr:{Tiro:'Tir',Passaggio:'Passes',Visione:'Vision',Resistenza:'Endurance',Leadership:'Leadership',Rigori:'Penalties','Colpo di testa':'Jeu de tête'}
  };
  const original=window.tr;
  const trophyKeys=['Quanti campionati nazionali vinti','Champions League vinti','Quanti Mondiali vinti','coppe continentali vinti','Quanti Palloni d’Oro vinti'];
  const trophyLabels={it:['Campionati','Champions League','Mondiali','Coppe continentali','Palloni d’Oro'],en:['League titles','Champions League','World Cups','Continental cups','Ballon d’Or'],es:['Ligas','Champions League','Mundiales','Copas continentales','Balones de Oro'],fr:['Championnats','Ligue des champions','Coupes du monde','Coupes continentales','Ballons d’Or']};
  window.tr=function(value) {
    const key=String(value??''),t=copy[language];
    const trophyIndex=trophyKeys.indexOf(key.split(':')[0]);
    if(trophyIndex>=0)return (trophyLabels[language]||trophyLabels.it)[trophyIndex]+(key.includes(':')?': '+window.tr(key.slice(key.indexOf(':')+1).trim()):'');
    if(!t)return original(value);
    const direct=original(value);if(direct!==value)return direct;
    if(Object.prototype.hasOwnProperty.call(bonusNames[language],key))return bonusNames[language][key];
    const suffix=key.match(/^(.*?)(\s+(?:\p{Regional_Indicator}{2}|[\p{Extended_Pictographic}\uFE0F\u200D]+))$/u);
    if(suffix){const label=window.tr(suffix[1]);if(label!==suffix[1])return label+suffix[2];}
    const prefixes=[['Ruolo in campo: ',t.role],['Altezza: ',t.height],['Risultato: ',t.result]];
    for(const [prefix,label]of prefixes)if(key.startsWith(prefix))return `${label}: ${window.tr(key.slice(prefix.length))}`;
    let match;
    if((match=key.match(/^Scegli il talento (\d+) di (\d+)$/)))return t.choose(match[1],match[2]);
    if((match=key.match(/^Talento (\d+) di (\d+)$/)))return t.trait(match[1],match[2]);
    if((match=key.match(/^(\d+) talenti da assegnare$/)))return t.assign(match[1]);
    if((match=key.match(/^(\d+) talenti: (.+)$/)))return `${t.talents(match[1])}: ${match[2].split(/\s*·\s*/).map(item=>window.tr(item)).join(' · ')}`;
    if(key.endsWith(' · club della carriera'))return `${window.tr(key.slice(0,-' · club della carriera'.length))} · ${t.club}`;
    if(key==='Rimuovi carriera')return {en:'Remove career',es:'Eliminar carrera',fr:'Supprimer la carrière'}[language];
    if(key==='Nessun bonus agli attributi')return {en:'No attribute bonus',es:'Sin bonificación de atributos',fr:'Aucun bonus d’attribut'}[language];
    if(key==='La mia Football Career')return t.share;
    if(key==='La mia carta giocatore')return t.card;
    if(key==='Non riesco a esportare lo sfondo della carta. Controlla la connessione e riprova.')return t.exportError;
    if(key.includes(' · ')||key.includes(' + '))return key.split(/( · | \+ )/).map(part=>part===' · '||part===' + '?part:window.tr(part)).join('');
    if((match=key.match(/^(.+?)(\s+\+\d+.*)$/)))return `${window.tr(match[1])}${match[2]}`;
    return direct;
  };
})();
