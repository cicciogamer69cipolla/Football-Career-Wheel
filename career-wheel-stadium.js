/* Navigation uses the existing game and room without changing career state. */
(() => {
  const labels = {
    it: { nav: 'Scegli come giocare', solo: 'Solo', soloNote: 'Gira le ruote. Crea la tua leggenda.', online: 'Online', onlineNote: 'La tua carriera contro quelle degli amici.' },
    en: { nav: 'Choose how to play', solo: 'Solo', soloNote: 'Spin the wheels. Create your legend.', online: 'Online', onlineNote: 'Challenge your friends with your career.' },
    es: { nav: 'Elige cómo jugar', solo: 'Solo', soloNote: 'Gira las ruletas. Crea tu leyenda.', online: 'Online', onlineNote: 'Enfrenta tu carrera a las de tus amigos.' },
    fr: { nav: 'Choisis comment jouer', solo: 'Solo', soloNote: 'Fais tourner les roues. Crée ta légende.', online: 'En ligne', onlineNote: 'Défie tes amis avec ta carrière.' }
  };
  function initStadiumNavigation() {
    const nav = document.getElementById('stadiumPlayNav');
    const solo = document.getElementById('stadiumSolo');
    const online = document.getElementById('stadiumOnline');
    const room = document.getElementById('onlineRoomDisclosure');
    if (!nav || !solo || !online || !room) return;
    const render = () => {
      const currentLanguage = typeof language === 'string' ? language : document.documentElement.lang;
      const copy = labels[currentLanguage] || labels.it;
      nav.setAttribute('aria-label', copy.nav);
      document.getElementById('stadiumSoloTitle').textContent = copy.solo;
      document.getElementById('stadiumSoloNote').textContent = copy.soloNote;
      document.getElementById('stadiumOnlineTitle').textContent = copy.online;
      document.getElementById('stadiumOnlineNote').textContent = copy.onlineNote;
    };
    const setDestination = target => {
      solo.dataset.current = String(target === 'solo');
      online.dataset.current = String(target === 'online');
    };
    const reveal = element => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    };
    solo.addEventListener('click', () => {
      setDestination('solo');
      reveal(document.getElementById('careerGame'));
    });
    online.addEventListener('click', () => {
      room.open = true;
      setDestination('online');
      reveal(room);
      room.querySelector('summary').focus({ preventScroll: true });
    });
    room.addEventListener('toggle', () => setDestination(room.open ? 'online' : 'solo'));
    document.getElementById('languageSelect')?.addEventListener('change', render);
    setDestination(room.open ? 'online' : 'solo');
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initStadiumNavigation, { once: true });
  else initStadiumNavigation();
})();
