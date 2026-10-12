/* Wheel presentation only: the original weighted geometry and spin logic remain authoritative. */
(() => {
  'use strict';
  if (typeof canvas === 'undefined' || !canvas || typeof displayStep !== 'function') return;

  const palette = ['#2864ed', '#e32c65', '#149d56', '#079ab5', '#dc7d16', '#7e40e8'];
  const rarityColors = { common: '#159b61', uncommon: '#2864ed', rare: '#9c39e8', veryRare: '#f0b52c' };
  const rarityCopy = {
    it: { uncommon: 'Poco comune', veryRare: 'Molto raro', colorMeaning: 'I colori mostrano la rarità rispetto agli altri esiti di questa ruota, non la forza del risultato.' },
    en: { uncommon: 'Uncommon', veryRare: 'Very rare', colorMeaning: 'Colours show rarity relative to the other outcomes on this wheel, not how strong the result is.' },
    es: { uncommon: 'Poco común', veryRare: 'Muy raro', colorMeaning: 'Los colores muestran la rareza respecto a los otros resultados de esta ruleta, no su fuerza.' },
    fr: { uncommon: 'Peu courant', veryRare: 'Très rare', colorMeaning: 'Les couleurs indiquent la rareté par rapport aux autres résultats de cette roue, pas leur force.' }
  };
  Object.entries(rarityCopy).forEach(([code, copy]) => Object.assign(probabilityCopy[code], copy));
  const originalColorAt = window.colorAt;
  let cachedSignature = '', lastState = null, spinSurface = null, previouslySpinning = false, heldMotionAngle = null;
  let rarityLegend, legendSignature = '', accessibleSignature = '';
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const labelCache = new Map();
  let pendingIcons = new Set();
  const modulo = value => (value % TAU + TAU) % TAU;
  const mix = (hex, other, fraction) => {
    const parse = value => value.slice(1).match(/../g).map(part => parseInt(part, 16));
    const a = parse(hex), b = parse(other);
    return '#' + a.map((channel, index) => Math.round(channel + (b[index] - channel) * fraction).toString(16).padStart(2, '0')).join('');
  };
  const hueOf = hex => {
    const raw = String(hex || '#2864ed').replace('#', '');
    const normalized = raw.length === 3 ? [...raw].map(char => char + char).join('') : raw;
    const channels = normalized.match(/../g)?.map(part => parseInt(part, 16) / 255) || [0, 0, 1];
    const [r, g, b] = channels, max = Math.max(...channels), delta = max - Math.min(...channels);
    if (!delta) return 215;
    const hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
    return (hue * 60 + 360) % 360;
  };
  window.colorAt = function curatedWheelColor(colors, index, count, kind) {
    let base;
    if (kind === 'foot') base = [palette[0], palette[4], palette[5]][index % 3];
    else if (colors?.length && colors.every(value => value === colors[0])) {
      const hue = hueOf(colors[0]);
      base = hue < 65 || hue > 330 ? palette[4] : hue < 185 ? palette[2] : hue < 250 ? palette[0] : palette[5];
    } else base = palette[index % palette.length];
    return base;
  };

  function pointerIndex(parts, angle) {
    const local = modulo(-Math.PI / 2 - angle + Math.PI / 2) - Math.PI / 2;
    const found = parts.findIndex(part => local >= part.start && local < part.end);
    return found < 0 ? Math.max(0, parts.length - 1) : found;
  }
  function rarityFor(step, weights = weightsFor(step)) {
    const grouped = new Map(), total = weights.reduce((sum, weight) => sum + weight, 0);
    step.items.forEach((item, index) => grouped.set(String(item), (grouped.get(String(item)) || 0) + weights[index]));
    const values = [...grouped.values()], average = total / Math.max(1, values.length);
    const balanced = values.length < 2 || Math.max(...values) <= Math.min(...values) * 1.8;
    // Rarity is relative to the unique outcomes on this wheel. Duplicate wedges
    // share a tier; a wheel with thirty equally likely outcomes stays balanced.
    const tiers = step.items.map(item => {
      if (balanced || !(average > 0)) return 'balanced';
      const ratio = grouped.get(String(item)) / average;
      return ratio >= 1.4 ? 'common' : ratio <= .2 ? 'veryRare' : ratio <= .65 ? 'rare' : 'uncommon';
    });
    return { balanced, tiers, colors: tiers.map((tier, index) => rarityColors[tier] || colorAt(step.colors, index, step.items.length, step.kind)) };
  }
  function renderRarityLegend(model) {
    const signature = model.signature + '\0' + document.documentElement.lang;
    if (legendSignature === signature) return;
    legendSignature = signature;
    if (!rarityLegend) {
      rarityLegend = document.createElement('div'); rarityLegend.id = 'wheelRarityLegend';
      rarityLegend.className = 'wheel-rarity-legend'; rarityLegend.setAttribute('role', 'group');
      document.querySelector('.wheel-shell')?.after(rarityLegend);
    }
    rarityLegend.replaceChildren(); rarityLegend.hidden = model.rarity.balanced;
    if (model.rarity.balanced) return;
    const copy = probabilityCopy[language] || probabilityCopy.it;
    rarityLegend.setAttribute('aria-label', copy.title); rarityLegend.title = copy.colorMeaning;
    ['common', 'uncommon', 'rare', 'veryRare'].filter(tier => model.rarity.tiers.includes(tier)).forEach(tier => {
      const item = document.createElement('span'), swatch = document.createElement('i');
      item.className = 'wheel-rarity-key'; item.dataset.rarity = tier;
      swatch.style.backgroundColor = rarityColors[tier]; swatch.setAttribute('aria-hidden', 'true');
      item.append(swatch, document.createTextNode(copy[tier])); rarityLegend.append(item);
    });
  }
  function currentRun() {
    return window.fcwExperience?.accountState?.().runId || '';
  }
  function wheelModel() {
    const step = displayStep(), weights = weightsFor(step), parts = sliceGeometry(step, weights);
    const angle = wheelPreviewActive ? previewRotation : rotation;
    if (spinning && reducedMotion?.matches) {
      if (heldMotionAngle === null) heldMotionAngle = lastState?.rotation ?? angle;
    } else heldMotionAngle = null;
    const signature = JSON.stringify([idx, currentRun(), careerMode, step.kind, step.items, weights]);
    const underPointer = pointerIndex(parts, angle);
    if (spinning && !wheelPreviewActive) {
      if (!previouslySpinning || spinSurface?.signature !== signature) spinSurface = { signature, landedIndex: null };
      spinSurface.landedIndex = underPointer;
    }
    let selected = null;
    const answer = answers[idx];
    if (!spinning && !wheelPreviewActive && step.kind !== 'trait' && answer) {
      // A restored result is highlighted only when its saved rotation points at that actual value.
      if (String(step.items[underPointer]) === String(answer.value)) selected = underPointer;
      if (spinSurface?.signature === signature && spinSurface.landedIndex === underPointer && String(step.items[underPointer]) === String(answer.value)) selected = underPointer;
    }
    if (wheelPreviewActive || (!spinning && spinSurface && spinSurface.signature !== signature)) spinSurface = null;
    previouslySpinning = spinning;
    const rarity = rarityFor(step, weights), rare = rarity.tiers.map(tier => tier === 'rare' || tier === 'veryRare');
    return { step, weights, parts, angle, displayAngle: heldMotionAngle ?? angle, selected, rare, rarity, signature, underPointer };
  }
  function sectorPath(context, radius, part) {
    context.beginPath(); context.moveTo(0, 0); context.arc(0, 0, radius, part.start, part.end); context.closePath();
  }
  function buildSurface(model) {
    const width = canvas.width, center = width / 2, radius = center - 13;
    cacheCanvas.width = width; cacheCanvas.height = width; labelCache.clear();
    cacheCtx.clearRect(0, 0, width, width); cacheCtx.save(); cacheCtx.translate(center, center);
    model.parts.forEach((part, index) => {
      const color = model.rarity.colors[index];
      const fill = cacheCtx.createRadialGradient(0, 0, center * .23, 0, 0, radius);
      fill.addColorStop(0, mix(color, '#fffaf0', .05)); fill.addColorStop(.7, color); fill.addColorStop(1, mix(color, '#121824', .06));
      sectorPath(cacheCtx, radius, part); cacheCtx.fillStyle = fill; cacheCtx.fill();
      cacheCtx.lineWidth = 1.7; cacheCtx.strokeStyle = 'rgba(7, 12, 23, .72)'; cacheCtx.stroke();
      if (model.rare[index]) {
        cacheCtx.beginPath(); cacheCtx.arc(0, 0, radius - 5, part.start + Math.min(.004, part.span / 8), part.end - Math.min(.004, part.span / 8));
        cacheCtx.lineWidth = 4; cacheCtx.strokeStyle = model.rarity.tiers[index] === 'veryRare' ? '#fff0b7' : '#dcaaff'; cacheCtx.stroke();
      }
    });
    cacheCtx.restore(); cachedSignature = model.signature; wheelDirty = false;
  }
  function twoLines(text, maxWidth) {
    const words = text.trim().split(/\s+/);
    if (ctx.measureText(text).width <= maxWidth || words.length < 2) return [text];
    let best = null, bestWidth = Infinity;
    for (let split = 1; split < words.length; split++) {
      const lines = [words.slice(0, split).join(' '), words.slice(split).join(' ')];
      const width = Math.max(...lines.map(line => ctx.measureText(line).width));
      if (width < bestWidth) { bestWidth = width; best = lines; }
    }
    return best || [text];
  }
  function fitText(text, width) {
    if (ctx.measureText(text).width <= width) return text;
    const letters = Array.from(text);
    while (letters.length && ctx.measureText(letters.join('') + '…').width > width) letters.pop();
    return letters.length ? letters.join('') + '…' : '';
  }
  function labelLayout(label, part, radius, iconSize, count) {
    const nominal = count > 24 ? 18 : count > 18 ? 19 : count > 12 ? 22 : count > 8 ? 24 : 27;
    const textRight = radius - 23 - (iconSize ? iconSize + 7 : 0), maxWidth = textRight - (canvas.width * .125 + 22);
    for (let size = nominal; size >= 10; size--) {
      ctx.font = `750 ${size}px Inter, system-ui, sans-serif`;
      const lines = twoLines(label, maxWidth), widths = lines.map(line => ctx.measureText(line).width);
      const innerEdge = Math.max(canvas.width * .14, textRight - Math.max(...widths));
      const chord = 2 * innerEdge * Math.sin(Math.min(Math.PI / 2, part.span / 2));
      if (Math.max(...widths) <= maxWidth && size * lines.length * 1.14 <= chord * .88) return { size, lines, textRight, compact: false };
    }
    // Exact weighted wedges can be narrower than a glyph. Never widen them to fit a label.
    const available = 2 * (radius - 38) * Math.sin(Math.min(Math.PI / 2, part.span / 2));
    const size = Math.min(10, available * .86);
    ctx.font = `750 ${Math.max(1, size)}px Inter, system-ui, sans-serif`;
    return { size, lines: [fitText(label, maxWidth)], textRight, compact: true };
  }
  function queueIcon(promise) {
    if (!promise || pendingIcons.has(promise)) return;
    pendingIcons.add(promise);
    promise.finally(() => { pendingIcons.delete(promise); draw(); });
  }
  function paintLabel(model, index, radius) {
    const part = model.parts[index];
    let cached = labelCache.get(index);
    if (!cached) {
      const info = wheelLabelParts(model.step, index), iconSize = info.emoji ? 22 : 0;
      cached = { info, iconSize, layout: labelLayout(info.text, part, radius, iconSize, model.parts.length) };
      labelCache.set(index, cached);
    }
    const { info, iconSize, layout } = cached;
    const asset = info.emoji ? wheelEmojiAsset(info.emoji) : { image: null, promise: null };
    queueIcon(asset.promise);
    const worldAngle = part.center + model.displayAngle;
    const flipped = Math.cos(worldAngle) < 0, sign = flipped ? -1 : 1;
    ctx.save(); ctx.rotate(worldAngle + (flipped ? Math.PI : 0));
    ctx.globalAlpha = model.selected === null || model.selected === index ? 1 : .72;
    ctx.font = `750 ${Math.max(1, layout.size)}px Inter, system-ui, sans-serif`;
    ctx.textAlign = flipped ? 'left' : 'right'; ctx.textBaseline = 'middle';
    const gold = model.rarity.tiers[index] === 'veryRare';
    ctx.fillStyle = gold ? '#251b05' : '#fffdf5'; ctx.shadowColor = gold ? '#fff3ce' : '#050b18dd'; ctx.shadowBlur = gold ? 1 : 3;
    ctx.strokeStyle = gold ? 'rgba(255, 244, 199, .6)' : 'rgba(4, 12, 22, .9)'; ctx.lineWidth = Math.min(3, Math.max(.7, layout.size * .11)); ctx.lineJoin = 'round';
    layout.lines.forEach((line, lineIndex) => {
      const y = (lineIndex - (layout.lines.length - 1) / 2) * layout.size * 1.14;
      ctx.strokeText(line, sign * layout.textRight, y); ctx.fillText(line, sign * layout.textRight, y);
    });
    if (iconSize && !layout.compact) {
      ctx.shadowBlur = 0;
      const x = sign * (radius - 23 - iconSize / 2);
      if (asset.image) ctx.drawImage(asset.image, x - iconSize / 2, -iconSize / 2, iconSize, iconSize);
      else if (!asset.promise) { ctx.textAlign = 'center'; ctx.fillText(info.emoji, x, 0, iconSize + 2); }
    }
    if (model.selected === index && layout.compact) {
      // A small readable in-wheel label makes even the narrowest landed result clear.
      ctx.globalAlpha = 1; ctx.font = '750 21px Inter, system-ui, sans-serif'; ctx.shadowBlur = 0;
      const text = fitText(info.text, radius * .52), width = ctx.measureText(text).width + 20;
      const x = sign * Math.min(radius * .76, radius - width / 2 - 14);
      ctx.fillStyle = '#111a29ef'; ctx.beginPath(); ctx.roundRect(x - width / 2, -17, width, 34, 9); ctx.fill();
      ctx.strokeStyle = model.rare[index] ? '#ebc685' : '#e8f1ffb0'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = '#fffdf5'; ctx.textAlign = 'center'; ctx.fillText(text, x, 0);
    }
    ctx.restore();
  }
  window.draw = function drawCuratedWheel() {
    const model = wheelModel(), width = canvas.width, center = width / 2, radius = center - 13;
    renderRarityLegend(model);
    if (wheelDirty || cachedSignature !== model.signature) buildSurface(model);
    ctx.clearRect(0, 0, width, width); ctx.save(); ctx.translate(center, center);
    ctx.save(); ctx.rotate(model.displayAngle); ctx.drawImage(cacheCanvas, -center, -center);
    if (model.selected !== null) {
      model.parts.forEach((part, index) => {
        sectorPath(ctx, radius, part);
        ctx.fillStyle = index === model.selected ? 'rgba(247, 249, 255, .15)' : 'rgba(6, 12, 23, .42)'; ctx.fill();
      });
      const selected = model.parts[model.selected];
      ctx.beginPath(); ctx.arc(0, 0, radius - 3, selected.start + Math.min(.004, selected.span / 8), selected.end - Math.min(.004, selected.span / 8));
      ctx.strokeStyle = model.rare[model.selected] ? '#f1cd88' : '#e8f1ff'; ctx.lineWidth = 5;
      ctx.shadowColor = model.rare[model.selected] ? '#d5a658' : '#80c9f2'; ctx.shadowBlur = 13; ctx.stroke();
    }
    ctx.restore();
    model.parts.forEach((_, index) => { if (index !== model.selected) paintLabel(model, index, radius); });
    // The landed badge stays above neighbouring labels, including when its sector is narrow.
    if (model.selected !== null) paintLabel(model, model.selected, radius);
    ctx.beginPath(); ctx.arc(0, 0, radius + 2, 0, TAU); ctx.lineWidth = 2.3; ctx.strokeStyle = '#c7d6d145'; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, radius + 6, 0, TAU); ctx.lineWidth = 2; ctx.strokeStyle = '#090f18c7'; ctx.stroke();
    ctx.restore();
    const accessibleLabel = `${tr('Ruota della fortuna')}: ${tr(model.step.q)}` + (model.selected === null ? '' : `. ${tr('Risultato selezionato')}: ${tr(model.step.items[model.selected])}`);
    const accessibleState = `${accessibleLabel}\0${spinning}`;
    if (accessibleSignature !== accessibleState || canvas.getAttribute('aria-label') !== accessibleLabel) {
      accessibleSignature = accessibleState;
      canvas.setAttribute('aria-label', accessibleLabel); canvas.setAttribute('aria-busy', String(spinning));
    }
    lastState = {
      rotation: model.angle, spinning, preview: wheelPreviewActive, complete: !document.getElementById('careerSummary').hidden,
      selectedIndex: model.selected, pointerIndex: model.underPointer, rare: model.selected !== null && model.rare[model.selected],
      canSpin: !document.getElementById('spin').disabled, question: tr(model.step.q), itemCount: model.parts.length, stepIndex: idx,
      parts: model.parts.map(part => ({ start: part.start, end: part.end, span: part.span }))
    };
    window.dispatchEvent(new CustomEvent('fcw:wheel-frame', { detail: lastState }));
  };
  window.fcwWheelVisual = {
    invalidate() { wheelDirty = true; draw(); },
    redraw() { draw(); },
    snapshot() { return lastState ? { ...lastState, complete: !document.getElementById('careerSummary').hidden, parts: lastState.parts.map(part => ({ ...part })) } : null; },
    rarityFor,
    previousPalette: originalColorAt
  };
  ['fcw:reset', 'fcw:account-restore'].forEach(name => window.addEventListener(name, () => {
    spinSurface = null; previouslySpinning = false; heldMotionAngle = null; wheelDirty = true; draw();
  }));
  document.getElementById('languageSelect')?.addEventListener('change', () => { wheelDirty = true; draw(); });
  renderOdds(); wheelDirty = true; draw();
})();
