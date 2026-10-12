/* Canonical talent effects shared by the wheel result and final player card. */
(() => {
  'use strict';
  // Keep these effects identical to the historical final-card balances.
  const bonuses = Object.assign(Object.create(null), {
    'Velocità ⚡': {Velocità:3},
    'Tiro 🎯': {Finalizzazione:3},
    'Passaggi 👟': {Passaggi:3},
    'Dribbling 🪄': {Dribbling:3},
    'Difesa 🗿': {Difesa:3},
    'Forza 💪': {Forza:3},
    'Leadership 🧠': {Passaggi:1},
    'Resistenza 🔥': {Forza:2},
    'Visione 👁️': {Passaggi:2},
    'Colpo di testa 🦅': {Forza:1},
    'Rigori 🥅': {Finalizzazione:1},
    'Contrasto 🦵': {Difesa:2,Forza:1},
    'Agilità 🌀': {Dribbling:2,Velocità:1},
    'Tecnica 👟': {Dribbling:2,Passaggi:1},
    'Controllo palla 🧲': {Dribbling:2,Passaggi:1},
    'Creatività 🎨': {Passaggi:2},
    'Anticipo 👀': {Difesa:2},
    'Equilibrio 🤸': {Forza:1,Dribbling:1},
    'Cross 🎯': {Passaggi:2},
    'Finalizzazione 🥅': {Finalizzazione:3},
    'Velocità + Dribbling ⚡🪄': {Velocità:3,Dribbling:3},
    'Tiro + Forza 🎯💪': {Finalizzazione:3,Forza:3},
    'Passaggi + Visione 👟👁️': {Passaggi:3},
    'Difesa + Forza 🗿💪': {Difesa:3,Forza:3},
    'Tecnica + Agilità 👟🌀': {Dribbling:3,Velocità:2},
    'Velocità + Resistenza ⚡🔥': {Velocità:2,Forza:2},
    'Tiro + Rigori 🎯🥅': {Finalizzazione:3},
    'Cross + Colpo di testa 🎯🦅': {Passaggi:2,Forza:2},
    'Leadership + Visione 🧠👁️': {Passaggi:2}
  });
  Object.values(bonuses).forEach(effect => Object.freeze(effect));
  Object.freeze(bonuses);
  const none = 'Nessun bonus agli attributi';
  const noBonus = {it:none,en:'No attribute bonus',es:'Sin bonificación de atributos',fr:'Aucun bonus d’attribut'};
  const locale = () => {
    const value = typeof language === 'string' ? language : typeof document !== 'undefined' ? document.documentElement?.lang : 'it';
    return Object.hasOwn(noBonus, value) ? value : 'it';
  };
  const translateDefault = key => key === none ? noBonus[locale()] : typeof window.tr === 'function' ? window.tr(key) : key;
  function describe(value, translate = translateDefault) {
    const effect = bonuses[String(value ?? '')];
    if (!effect) return translate(none);
    return Object.entries(effect).map(([stat, amount]) => translate(stat) + ' +' + amount).join(' · ');
  }
  const total = value => Object.values(bonuses[String(value ?? '')] || {}).reduce((sum, amount) => sum + amount, 0);
  window.fcwTraits = Object.freeze({bonuses, describe, total});
})();
