// Composition audit for webdesign-start (references/aesthetics.md, "Composition and geometry").
// Paste into the browser console (or evaluate with your browser tool) on the first frame at 1440x900 and 390x844.
// Mark the subject with data-focal; declare allowed angles on <html data-angles="-3,2">; mark drawn curve paths
// data-drawn, drawn display lettering data-display, and designed overlaps data-overlap-ok. Returns the findings.
(() => { // Composition audit. Paste into the console on the first frame at 1440x900 and 390x844. Put data-focal on the subject; list any declared angles in <html data-angles="-4,3">.
  const vw = innerWidth, vh = innerHeight, ph = vw < 700, F = [], r = e => e.getBoundingClientRect(), cs = e => getComputedStyle(e), tag = e => `<${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${e.classList && e.classList[0] ? '.' + e.classList[0] : ''}>`;
  const C = { angles: (document.documentElement.dataset.angles || '').split(',').filter(Boolean).map(Number), edges: ph ? 5 : 8, near: 0, tier: ph ? 3 : 4, ratio: ph ? 2 : 3, radii: 2, cpl: [ph ? 28 : 45, 75] };
  const on = e => { const b = r(e), s = cs(e); return b.width > 2 && b.height > 2 && b.bottom > 0 && b.top < vh && b.right > 0 && b.left < vw && s.visibility !== 'hidden' && +s.opacity > .05; };
  const els = [...document.querySelectorAll('body *')].filter(on), html = els.filter(e => !e.closest('svg'));
  const hasText = e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1), texts = html.filter(hasText), filled = e => cs(e).backgroundColor !== 'rgba(0, 0, 0, 0)' || cs(e).borderTopWidth !== '0px' || cs(e).backgroundImage !== 'none';
  // 1 ALIGNMENT: left edges of text blocks (nav and toolbar items excluded), then near-misses between layout-level blocks.
  const blocksT = texts.filter(e => !e.closest('nav,[role=toolbar],button') && !cs(e).display.startsWith('inline') && !/center|right|end/.test(cs(e).textAlign));
  const lefts = [...new Set(blocksT.map(e => Math.round(r(e).left / 4) * 4))].sort((a, b) => a - b);
  if (lefts.length > C.edges) F.push(`ALIGN ${lefts.length} left text edges (max ${C.edges}): ${lefts.join(' ')}`);
  const lay = [...document.querySelectorAll('header>*,section>*,footer>*,main>*,body>*,[data-layout]>*')].filter(e => !e.closest('svg') && on(e) && r(e).width >= 120 && r(e).height >= 24 && r(e).width < vw * .9 && cs(e).position !== 'fixed');
  const near = new Set(); ['left', 'right'].forEach(k => lay.forEach(a => lay.forEach(b => { const d = Math.round(r(b)[k]) - Math.round(r(a)[k]); if (d > 2 && d <= 10) near.add(`${k} ${tag(a)} ${Math.round(r(a)[k])} vs ${tag(b)} ${Math.round(r(b)[k])}`); })));
  if (near.size > C.near) F.push(`NEAR-MISS ${near.size} block side edges 3-10px apart (align them or separate by 24px+):\n  ${[...near].slice(0, 8).join('\n  ')}`);
  // 2 TYPE SCALE: at most 4 sizes (3 on phones) in the 14-27px text tier; display type (HTML or SVG) at least 3x the running text (2x on phones).
  const sz = e => e.closest('svg') || e.matches('[data-display]') ? r(e).height / 1.25 : parseFloat(cs(e).fontSize), all = [...new Set(els.filter(e => hasText(e) || e.matches('[data-display]')).map(e => Math.round(sz(e))))].sort((a, b) => a - b);
  const tier = [...new Set(texts.map(e => Math.round(sz(e))))].filter(s => s >= 14 && s < 28).sort((a, b) => a - b); if (tier.length > C.tier) F.push(`TYPE ${tier.length} sizes in the 14-27px text tier (max ${C.tier}): ${tier.join(' ')}`);
  const run = texts.filter(e => e.textContent.trim().length > 60).map(e => Math.round(sz(e))).sort((a, b) => b - a)[0] || 16;
  if (all.at(-1) / run < C.ratio) F.push(`TYPE largest ${all.at(-1)}px is ${(all.at(-1) / run).toFixed(1)}x the ${run}px running text (min ${C.ratio}x)`);
  // 3 RADIUS: at most two corner radii on filled boxes (circles and pills are shapes, so they do not count); border-image silently squares corners.
  const radii = [...new Set(html.filter(filled).map(e => { const v = parseFloat(cs(e).borderTopLeftRadius), b = r(e); return v && !cs(e).borderTopLeftRadius.includes('%') && v < Math.min(b.width, b.height) / 2 - 1 ? Math.round(v) : 0; }).filter(Boolean))].sort((a, b) => a - b);
  if (radii.length > C.radii) F.push(`RADIUS ${radii.length} radii (max ${C.radii}): ${radii.join(' ')}px`);
  html.filter(e => cs(e).borderImageSource !== 'none' && parseFloat(cs(e).borderTopLeftRadius)).forEach(e => F.push(`RADIUS ${tag(e)} has border-image and border-radius, so it renders with square corners`));
  // 4 ROTATION: static rotations must use a declared angle; rotated display type (24px+) is always reported; curved text must ride a circle (arc path) at true glyph shapes.
  html.forEach(e => { if (e.getAnimations().some(a => a.playState === 'running')) return; const m = cs(e).transform.match(/^matrix\(([^,]+),([^,]+)/), a = m ? Math.atan2(+m[2], +m[1]) * 180 / Math.PI : 0;
    if (Math.abs(a) > .2 && [90, 180].every(q => Math.abs(Math.abs(a) - q) > .2) && (!C.angles.some(d => Math.abs(d - a) < .3) || parseFloat(cs(e).fontSize) >= 24 && hasText(e))) F.push(`ROTATE ${a.toFixed(1)}deg on ${tag(e)} "${e.textContent.trim().slice(0, 20)}"`); });
  document.querySelectorAll('textPath').forEach(t => { const p = document.querySelector(t.getAttribute('href') || t.getAttribute('xlink:href')), d = p ? p.getAttribute('d') || '' : '';
    if ((!/[Aa]/.test(d) && !p?.hasAttribute('data-drawn')) || t.getAttribute('lengthAdjust') === 'spacingAndGlyphs') F.push(`CURVE "${t.textContent.trim()}": ${/[Aa]/.test(d) ? '' : 'path is not a circular arc; '}${t.getAttribute('lengthAdjust') === 'spacingAndGlyphs' ? 'glyphs are stretched' : ''}`); });
  // 5 FOCAL: the [data-focal] subject is exactly centred or clearly off-centre, big enough, and free of panels and text.
  const foc = document.querySelector('[data-focal]');
  if (!foc) F.push('FOCAL no [data-focal] element, so the subject cannot be checked'); else { const f = r(foc), cx = (f.left + f.right) / 2 / vw, share = Math.max(0, Math.min(f.right, vw) - Math.max(f.left, 0)) * Math.max(0, Math.min(f.bottom, vh) - Math.max(f.top, 0)) / vw / vh;
    if (Math.abs(cx - .5) > .008 && Math.abs(cx - .5) < .06) F.push(`FOCAL subject centre at ${(cx * 100).toFixed(1)}% of the width: centre it exactly, or move it to a third or beyond`);
    if (share < (ph ? .25 : .2)) F.push(`FOCAL subject covers only ${(share * 100) | 0}% of the viewport`);
    html.filter(e => !foc.contains(e) && !e.contains(foc) && !e.closest('[data-overlap-ok]') && (hasText(e) || filled(e)) && r(e).width * r(e).height > 1500).forEach(e => { const b = r(e), o = Math.max(0, Math.min(b.right, f.right) - Math.max(b.left, f.left)) * Math.max(0, Math.min(b.bottom, f.bottom) - Math.max(b.top, f.top)) / (b.width * b.height);
      if (o > .15) F.push(`FOCAL ${tag(e)} sits ${(o * 100) | 0}% over the subject (mark data-overlap-ok only if the overlap is designed)`); }); }
  // 6 MEASURE: characters per line in running text.
  const cv = document.createElement('canvas').getContext('2d');
  texts.filter(e => e.textContent.trim().length > 140).forEach(e => { const s = cs(e), t = e.textContent.trim().replace(/\s+/g, ' '); cv.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`; const n = Math.round((r(e).width - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight)) / (cv.measureText(t).width / t.length));
    if (n < C.cpl[0] || n > C.cpl[1]) F.push(`MEASURE ${n} characters per line in ${tag(e)} (want ${C.cpl.join('-')})`); });
  console.log(`${F.length} findings at ${vw}x${vh}\n` + F.join('\n')); return F; })();
