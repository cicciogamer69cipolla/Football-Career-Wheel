(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.FCWScoring = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const round1 = value => Math.round(value * 10) / 10;
  function careerPoints(result) {
    const role = result.position;
    const attacking = ['ST', 'CF', 'LW', 'RW'].includes(role);
    const midfield = ['CAM', 'CM', 'CDM', 'LM', 'RM'].includes(role);
    const defending = ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(role);
    const goalkeeper = role === 'Portiere' || role === 'GK';
    const goalsWeight = attacking ? 1.2 : midfield ? 1 : defending ? 0.8 : goalkeeper ? 0.5 : 1;
    const assistsWeight = attacking ? 0.9 : midfield ? 1.2 : defending ? 1 : goalkeeper ? 0.5 : 1;
    const c = result.career;
    const goals = Math.round(c.goals * goalsWeight / 10);
    const assists = Math.round(c.assists * assistsWeight / 10);
    const seasons = c.seasons * 2;
    const trophies = c.league * 12 + c.champions * 22 + c.world * 25 + c.continental * 15 + c.ballon * 20;
    return { total: goals + assists + seasons + trophies, goals, assists, seasons, trophies };
  }
  function cardStrength(result) { return round1((result.overall * 2 + result.stats.reduce((sum, value) => sum + value, 0)) / 8); }
  function combinedScore(points, cardScore) { return round1(Math.min(100, points / 4) * 0.7 + cardScore * 0.3); }
  // Tied attributes share the mean rank. Identical cards receive 50 each.
  function scoreRound(entries) {
    const scores = entries.map(entry => ({ id: entry.id, result: entry.result, careerPoints: careerPoints(entry.result), cardScore: 0 }));
    const categories = [{ get: result => result.overall, weight: 2 }, ...Array.from({ length: 6 }, (_, i) => ({ get: result => result.stats[i], weight: 1 }))];
    for (const category of categories) {
      const ranked = [...scores].sort((a, b) => category.get(b.result) - category.get(a.result));
      let start = 0;
      while (start < ranked.length) {
        let end = start + 1;
        while (end < ranked.length && category.get(ranked[end].result) === category.get(ranked[start].result)) end++;
        const meanRank = (start + end - 1) / 2;
        const percentile = ranked.length < 2 ? 50 : (ranked.length - 1 - meanRank) / (ranked.length - 1) * 100;
        for (let i = start; i < end; i++) ranked[i].cardScore += percentile * category.weight / 8;
        start = end;
      }
    }
    return scores.map(score => ({ ...score, cardScore: round1(score.cardScore), cardStrength: cardStrength(score.result), careerRating: round1(Math.min(100, score.careerPoints.total / 4)), combinedScore: combinedScore(score.careerPoints.total, score.cardScore) }));
  }
  return Object.freeze({ careerPoints, cardStrength, combinedScore, scoreRound });
});
