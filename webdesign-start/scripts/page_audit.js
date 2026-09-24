// Whole-page polish audit for webdesign-start (references/polish.md). Paste into the browser console (or evaluate
// with your browser tool) at 1440x900 and at 390x844. It scrolls the whole page itself, in steps of 60% of the
// viewport, and returns a promise of findings. Checks: content passing under fixed or sticky chrome without a
// backing, floating panels hiding content, lone last words, cut-off text, unstyled native controls, placeholder filler, and one container style
// repeated section after section. Canvas art (overlapping sprites, mid-roll digits) still needs screenshots.
(async () => {
  const F = new Set(), cs = e => getComputedStyle(e), r = e => e.getBoundingClientRect(), vh = innerHeight;
  const tag = e => `<${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${e.classList[0] ? '.' + e.classList[0] : ''}>`;
  const alpha = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return 0; const p = m[1].split(/[ ,/]+/).filter(Boolean); return p.length > 3 ? parseFloat(p[3]) : 1; };
  const backed = e => { for (let n = e; n && n !== document.body; n = n.parentElement) { const s = cs(n);   // a full-width fading gradient is not a backing
    if (alpha(s.backgroundColor) >= .85 || (s.backdropFilter && s.backdropFilter !== 'none') || (s.backgroundImage !== 'none' && r(n).width < innerWidth * .6)) return true; } return false; };
  const roots = [...document.querySelectorAll('body *')].filter(e => /fixed|sticky/.test(cs(e).position) && !e.closest('[aria-hidden="true"]') && !(r(e).width > innerWidth * .9 && r(e).height > vh * .9));
  const chrome = roots.flatMap(c => [c, ...c.querySelectorAll('*')]).filter(e => { const b = r(e); return b.width > 8 && b.height > 8 && b.width < innerWidth * .6 &&
    ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || e.matches('img, svg, canvas, button, a, input')); });
  const texts = [...document.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,label,figcaption,blockquote,td,th,a,button,span')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1));
  const seen = e => { let b = r(e), o = 1; for (let n = e; n && n !== document.body; n = n.parentElement) { const s = cs(n); o *= +s.opacity;   // clip to overflow ancestors, skip invisible
      if (s.visibility === 'hidden' || s.display === 'none' || o < .1) return null;
      if (n !== e && s.overflow !== 'visible') { const c = r(n); b = { left: Math.max(b.left, c.left), right: Math.min(b.right, c.right), top: Math.max(b.top, c.top), bottom: Math.min(b.bottom, c.bottom) }; } }
    return b.right - b.left > 2 && b.bottom - b.top > 2 ? b : null; };
  const start = scrollY, H = document.documentElement.scrollHeight, hit = new Map();
  for (let y = 0; y <= H - vh + 1; y += Math.round(vh * .6)) {
    scrollTo(0, y); await new Promise(res => setTimeout(res, 350));
    for (const c of chrome) { const cr = seen(c); if (!cr || cr.bottom <= 0 || cr.top >= vh) continue; const solid = backed(c);
      for (const t of texts) { if (hit.has(t) || roots.some(k => k.contains(t)) || t.contains(c)) continue; const b = seen(t);
        if (b && b.left < cr.right && b.right > cr.left && b.top < cr.bottom - 2 && b.bottom > cr.top + 2) hit.set(t, solid
          ? `COVER floating ${tag(c)} hides ${tag(t)} "${t.textContent.trim().slice(0, 24)}" (at scroll ${y}): give floating UI its own lane, or let content clear it`
          : `CHROME ${tag(t)} "${t.textContent.trim().slice(0, 24)}" passes under ${tag(c)} "${c.textContent.trim().slice(0, 12)}" with no backing (at scroll ${y})`); } } }
  hit.forEach(v => F.add(v));
  scrollTo(0, start);
  // lone last word: the last word sits alone on the final line of a multi-line block of 4+ words
  for (const e of document.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,figcaption')) { const t = e.textContent.trim(); if (t.split(/\s+/).length < 4 || r(e).height < parseFloat(cs(e).lineHeight || 20) * 1.8) continue;
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let last = null; while (walker.nextNode()) if (walker.currentNode.textContent.trim()) last = walker.currentNode; if (!last) continue;
    const s = last.textContent, end = s.trimEnd().length, sp = s.lastIndexOf(' ', end - 1); if (sp < 1) continue;
    const a = document.createRange(), b = document.createRange(); a.setStart(last, sp + 1); a.setEnd(last, end); b.setStart(last, Math.max(0, sp - 1)); b.setEnd(last, sp);
    if (a.getBoundingClientRect().top - b.getBoundingClientRect().top > 4) F.add(`WIDOW ${tag(e)} ends with "${s.slice(sp + 1, end)}" alone on its last line (use text-wrap: pretty, or rewrite)`); }
  // cut-off text and unstyled native controls
  for (const e of document.querySelectorAll('body *')) { const s = cs(e); if (e.matches('input, select') && !seen(e)) continue;   // visually hidden native inputs behind custom visuals are fine
    if ((s.textOverflow === 'ellipsis' || (s.overflow !== 'visible' && s.whiteSpace === 'nowrap') || e.tagName === 'INPUT') && e.clientWidth > 8 && e.scrollWidth > e.clientWidth + 2 && e.textContent.trim() + (e.value || ''))
      F.add(`CUT ${tag(e)} "${(e.value || e.textContent).trim().slice(0, 24)}" is cut off (${e.scrollWidth}px of content in ${e.clientWidth}px)`);
    if (e.tagName === 'SELECT' && e.selectedOptions[0]) { const cv = document.createElement('canvas').getContext('2d'); cv.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const need = cv.measureText(e.selectedOptions[0].textContent.trim()).width, room = e.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
      if (need > room + 1) F.add(`CUT ${tag(e)} "${e.selectedOptions[0].textContent.trim().slice(0, 24)}" is cut off in its select`); }
    if (e.matches('input[type=date], input[type=time], input[type=datetime-local], input[type=month], input[type=week]'))
      F.add(`NATIVE ${tag(e)} (${e.type}) keeps the browser's picker icon and date format; style ::-webkit-calendar-picker-indicator and check the rendered value, or use a custom picker`);
    else if (e.matches('select, input[type=date], input[type=time], input[type=datetime-local], input[type=number], input[type=range], input[type=checkbox], input[type=radio], input[type=file]') && s.appearance !== 'none' && s.webkitAppearance !== 'none')
      F.add(`NATIVE ${tag(e)} (${e.type || e.tagName.toLowerCase()}) shows the browser's default control; restyle it in the site's material`);
    if (e.matches('input, textarea') && /example|lorem|placeholder|john|jane|doe/i.test(e.placeholder || '')) F.add(`FILLER placeholder "${e.placeholder}" in ${tag(e)}`); }
  // one container style repeated section after section: each top-level section's main block, by base class and side
  const util = /^(js|in|is-|has-|reveal|fade|anim|visible|show|active|sr-|vh|u-)/;
  const secs = [...document.querySelectorAll('section, article, footer')].filter(x => !x.parentElement.closest('section, article, footer'));
  const panel = e => { const s = cs(e); return parseFloat(s.borderTopLeftRadius) > 0 || alpha(s.backgroundColor) > .3 || s.backgroundImage !== 'none' || s.borderTopWidth !== '0px' || s.boxShadow !== 'none'; };
  const kinds = sec => new Set([...sec.querySelectorAll('*')].filter(e => r(e).width >= innerWidth * .3 && r(e).height >= 120 && e.tagName !== 'CANVAS' && !/fixed|sticky/.test(cs(e).position) && panel(e))
    .map(e => [...e.classList].find(c => !util.test(c))).filter(Boolean));
  const K = secs.map(kinds); let worst = [0, ''];
  new Set(K.flatMap(k => [...k])).forEach(c => { let run = 0; K.forEach(k => { run = k.has(c) ? run + 1 : 0; if (run > worst[0]) worst = [run, c]; }); });
  if (worst[0] >= 4) F.add(`RHYTHM ${worst[0]} sections in a row are built from the same block ".${worst[1]}"; vary scale, layout or staging at least every 2–3 sections`);
  const out = [...F]; console.log(`${out.length} findings at ${innerWidth}x${vh}\n` + out.join('\n')); return out;
})();
