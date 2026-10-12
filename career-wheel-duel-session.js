/* Two sequential real careers, with the Solo run kept separate from the duel. */
(() => {
  'use strict';
  const STORE = 'fcw-local-duel-v1:';
  const clone = value => JSON.parse(JSON.stringify(value));
  const fault = code => Object.assign(new Error(code), {code});
  const byId = id => document.getElementById(id);
  const experience = () => window.fcwExperience;
  const sync = () => window.fcwAccountSync;
  const ownerId = () => sync()?.state().userId || null;
  const storageKey = id => STORE + (id || 'guest');
  const initial = () => ({phase:'idle', active:false, busy:false, players:[], mode:'normal', balanceRevision:2, criterion:'combined', turn:0, results:[null,null], error:null});
  let session = initial(), backup = null, activeCareer = null, expectedRun = '', internal = false, recovering = false;
  let attemptedOwner = undefined;

  function state() { return clone(session); }
  function setView(view, focus = false) {
    window.fcwLobby?.setView(view, focus);
    const app = document.querySelector('main.app');
    if (app) app.dataset.view = view;
  }
  function emit() {
    const app = document.querySelector('main.app');
    if (app) app.dataset.duelActive = String(session.active);
    if (session.active) {
      byId('careerModePicker').disabled = true;
      setCareerIdentityLocked(true);
      byId('reset').disabled = true;
      byId('testCard').disabled = true;
    }
    window.dispatchEvent(new CustomEvent('fcw:local-duel', {detail:state()}));
  }
  function persist() {
    if (!session.active || !backup) return;
    const displayed = sync()?.captureTransient?.();
    if (displayed) activeCareer = displayed;
    const value = {version:1, ownerId:backup.ownerId, savedAt:new Date().toISOString(), backup, session:state(), active:activeCareer, expectedRun};
    try { localStorage.setItem(storageKey(backup.ownerId), JSON.stringify(value)); }
    catch { throw fault('storage_unavailable'); }
  }
  function safePersist() {
    try { persist(); }
    catch (error) { session.error = error.code || 'storage_unavailable'; emit(); }
  }
  function available() {
    if (!experience() || !sync()?.beginTransient || sync().isBusy() || experience().snapshot().spinning || window.fcwRoom?.getState().busy) throw fault('operation_busy');
  }
  function validatePlayers(players) {
    if (!Array.isArray(players) || players.length !== 2) throw fault('invalid_players');
    return players.map(player => {
      const name = String(player?.name || '').trim();
      const shirtNumber = Number(player?.shirtNumber);
      if (!name || name.length > 24 || /[<>\u0000-\u001f\u007f]/.test(name) || !Number.isInteger(shirtNumber) || shirtNumber < 1 || shirtNumber > 99) throw fault('invalid_players');
      return {name, shirtNumber};
    });
  }
  const careerMetrics = ['goals','assists','seasons','league','champions','world','continental','ballon'];
  const positions = ['Portiere','GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST','CF'];
  function validResult(result, player) {
    return Boolean(result && result.name === player?.name && result.shirtNumber === player?.shirtNumber
      && positions.includes(result.position) && Number.isInteger(result.overall) && result.overall >= 1 && result.overall <= 99
      && Array.isArray(result.stats) && result.stats.length === 6 && result.stats.every(value => Number.isInteger(value) && value >= 0 && value <= 99)
      && result.career && careerMetrics.every(key => Number.isInteger(result.career[key]) && result.career[key] >= 0 && result.career[key] <= 10000));
  }
  function captureResult(snapshot) {
    const result = snapshot.playerResult;
    if (!validResult(result, session.players[session.turn])) return null;
    return {id:`duel-${session.turn + 1}`, result:clone(result), context:clone(snapshot.context), runId:snapshot.runId};
  }
  function finishTurn(snapshot) {
    if (!session.active || session.busy || session.phase !== 'playing' || !snapshot?.complete || snapshot.demo || snapshot.restored || snapshot.runId !== expectedRun || session.results[session.turn]) return;
    const result = captureResult(snapshot);
    if (!result) { session.error = 'recovery_invalid'; emit(); return; }
    session.results[session.turn] = result;
    session.phase = session.turn === 0 ? 'between' : 'result';
    session.error = null;
    window.fcwNavigation?.close();
    setView('duel');
    safePersist(); emit();
    requestAnimationFrame(() => byId('localDuelPanel')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));
  }
  async function playTurn(turn) {
    internal = true;
    try {
      window.fcwDaily?.restoreAccountState(null);
      const previousRun = experience().snapshot().runId;
      wheelPreviewActive = false;
      byId('wheelPreviewPanel').open = false;
      byId('reset').disabled = false;
      if (!experience().resetForRoom(session.players[turn])) throw fault('operation_busy');
      const fresh = experience().snapshot();
      if (fresh.runId === previousRun || fresh.completedSteps !== 0 || fresh.complete) throw fault('operation_busy');
      window.fcwChallenges?.restoreAccountState(null);
      window.fcwPersonality?.restoreDraft(null);
      careerMode = session.mode;
      window.fcwRealistic?.setRevision(session.balanceRevision === 2 ? 2 : 1);
      renderCareerModeUI();
      setCareerIdentityLocked(true);
      update();
      session.turn = turn; session.phase = 'playing'; session.error = null;
      expectedRun = experience().snapshot().runId;
      // resetForRoom queues lifecycle events; let those settle before saving.
      await Promise.resolve(); await Promise.resolve();
      activeCareer = sync().captureTransient();
      if (!activeCareer) throw fault('recovery_invalid');
      setView('duel-game', true);
    } finally { internal = false; }
  }
  async function open() {
    if (session.busy) return false;
    if (session.active) {
      setView(session.phase === 'playing' ? 'duel-game' : 'duel', true);
      emit(); return true;
    }
    try { available(); }
    catch (error) { session.error = error.code; emit(); return false; }
    session = {...initial(), phase:'setup'};
    window.fcwNavigation?.close(); setView('duel', true); emit(); return true;
  }
  async function start(options) {
    if (session.busy || session.active) return false;
    try {
      available();
      const players = validatePlayers(options?.players);
      if (!['rapid','normal','realistic'].includes(options?.mode)) throw fault('invalid_mode');
      if (!['combined','career','card'].includes(options?.criterion)) throw fault('invalid_criterion');
      // Check local recovery storage before touching the current career.
      const key = storageKey(ownerId());
      try { const previous = localStorage.getItem(key); localStorage.setItem(key, previous || 'null'); if (previous === null) localStorage.removeItem(key); }
      catch { throw fault('storage_unavailable'); }
      backup = sync().beginTransient();
      session = {...initial(), phase:'playing', active:true, busy:true, players, mode:options.mode, criterion:options.criterion};
      emit();
      window.fcwNavigation?.close(); window.fcwRoom?.disconnect();
      await playTurn(0);
      session.busy = false; persist(); emit(); return true;
    } catch (error) {
      if (backup) {
        try { internal = true; await sync().restoreTransient(backup); backup = null; }
        catch { session.busy = false; session.error = error.code || 'operation_busy'; emit(); return false; }
        finally { internal = false; }
      }
      session = {...initial(), phase:'setup', error:error.code || 'operation_busy'};
      setView('duel'); emit(); return false;
    }
  }
  async function next() {
    if (!session.active || session.busy || session.phase !== 'between') return false;
    try {
      available(); session.busy = true; emit();
      await playTurn(1);
      session.busy = false; persist(); emit(); return true;
    } catch (error) {
      session.busy = false; session.error = error.code || 'operation_busy';
      safePersist(); emit(); return false;
    }
  }
  async function cancel() {
    if (session.busy || experience()?.snapshot().spinning) {
      session.error = 'operation_busy'; emit(); return false;
    }
    if (backup) {
      session.busy = true; emit(); internal = true;
      try { await sync().restoreTransient(backup); localStorage.removeItem(storageKey(backup.ownerId)); }
      catch (error) { session.busy = false; session.error = error.code || 'operation_busy'; emit(); return false; }
      finally { internal = false; }
    }
    session = initial(); backup = null; activeCareer = null; expectedRun = '';
    setView('solo', true); emit(); return true;
  }
  function validStored(data, id) {
    if (!data || data.version !== 1 || data.ownerId !== id || data.backup?.ownerId !== id || !data.session?.active) return false;
    const saved = data.session;
    if (saved.balanceRevision != null && ![1,2].includes(saved.balanceRevision)) return false;
    if (!['playing','between','result'].includes(saved.phase) || !['rapid','normal','realistic'].includes(saved.mode) || !['combined','career','card'].includes(saved.criterion) || ![0,1].includes(saved.turn)) return false;
    try { validatePlayers(saved.players); } catch { return false; }
    if (!Array.isArray(saved.results) || saved.results.length !== 2) return false;
    // A stored duel must represent one exact handover state. Reject partial or
    // contradictory records instead of resuming a turn that cannot be finished.
    const [first, second] = saved.results;
    if (saved.phase === 'playing' && (saved.turn === 0 ? Boolean(first || second) : !first || Boolean(second))) return false;
    if (saved.phase === 'between' && (saved.turn !== 0 || !first || second)) return false;
    if (saved.phase === 'result' && (saved.turn !== 1 || !first || !second)) return false;
    for (let index=0; index<2; index++) {
      const entry = saved.results[index];
      if (!entry) continue;
      const result = entry.result;
      if (entry.id !== `duel-${index+1}` || !validResult(result, saved.players[index])) return false;
    }
    if (!sync().validateTransientActive(data.active) || data.backup.active !== null && !sync().validateTransientActive(data.backup.active)) return false;
    const active = JSON.parse(data.active);
    return active.mode === saved.mode && active.name === saved.players[saved.turn].name && Number(active.number) === saved.players[saved.turn].shirtNumber && active.experience?.runId === data.expectedRun;
  }
  async function recover() {
    if (session.active || recovering || !sync()?.beginTransient || sync().isBusy()) return;
    const id = ownerId();
    if (attemptedOwner === id) return;
    attemptedOwner = id;
    let saved;
    try { saved = JSON.parse(localStorage.getItem(storageKey(id)) || 'null'); } catch { return; }
    if (!saved) return;
    if (!validStored(saved, id)) { session = {...initial(), phase:'setup', error:'recovery_invalid'}; setView('duel'); emit(); return; }
    recovering = true; internal = true;
    try {
      backup = saved.backup;
      session = {...saved.session, balanceRevision:saved.session.balanceRevision === 2 ? 2 : 1, busy:true, error:null}; expectedRun = saved.expectedRun; activeCareer = saved.active;
      emit(); window.fcwRoom?.disconnect();
      await sync().restoreTransient(backup, activeCareer);
      window.fcwPersonality?.restoreDraft(null);
      session.busy = false;
      setView(session.phase === 'playing' ? 'duel-game' : 'duel');
      emit();
      finishTurn(experience().snapshot());
    } catch (error) {
      try { if (backup) await sync().restoreTransient(backup); } catch {}
      session = {...initial(), error:error.code || 'recovery_invalid'}; backup = null;
      setView('solo'); emit();
    } finally { internal = false; recovering = false; }
  }
  window.fcwLocalDuelSession = {open, start, next, cancel, state};
  window.addEventListener('fcw:state', () => {
    if (session.active && !session.busy && !internal) { safePersist(); emit(); }
  });
  window.addEventListener('fcw:complete', event => finishTurn(event.detail));
  window.addEventListener('fcw:account-sync', () => queueMicrotask(recover));
  window.addEventListener('fcw:transient-abort', () => {
    session = {...initial(), error:'owner_changed'}; backup = null; activeCareer = null; expectedRun = '';
    attemptedOwner = undefined; setView('solo'); emit();
  });
  window.addEventListener('pagehide', safePersist);
  // User navigation restores Solo before opening another mode. Internal resets
  // bypass this guard only while a turn is being created or hydrated.
  document.addEventListener('click', event => {
    if (internal || session.phase === 'idle' || !(event.target instanceof Element)) return;
    const destination = event.target.closest('#stadiumSolo, #stadiumOnline');
    if (destination) {
      event.preventDefault(); event.stopImmediatePropagation();
      const view = destination.id === 'stadiumOnline' ? 'online' : 'solo';
      cancel().then(ok => { if (ok) setView(view, true); }); return;
    }
    if (!session.active) return;
    const blocked = event.target.closest('#reset, #testCard, #previewCardPicker, #wheelPreviewPanel, #careerModePicker, #personalitySetup, #dailyChallengeStart, #fcwScenarios, #fcwCustomChallenges, #archiveList .archive-item-actions, .cw-ranking-row, #onlineRoomDisclosure, .cw-friends-invite');
    if (blocked || session.phase !== 'playing' && event.target.closest('#spin, #wheel')) {
      event.preventDefault(); event.stopImmediatePropagation(); session.error = 'operation_busy'; emit();
    }
  }, {capture:true});
  document.addEventListener('submit', event => {
    if (session.active && !internal && event.target.closest('#fcwCustomChallenges, #fcwScenarios')) { event.preventDefault(); event.stopImmediatePropagation(); session.error='operation_busy'; emit(); }
  }, {capture:true});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => queueMicrotask(recover), {once:true});
  else queueMicrotask(recover);
})();
