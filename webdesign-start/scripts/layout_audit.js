// Layout cadence audit for webdesign-start (references/layout-cadence.md). Paste into the browser console (or evaluate
// with your browser tool) on the rendered page at 1440x900, with default motion (do not emulate reduced motion and do not
// scroll first: REVEAL needs to see what is hidden at load). Returns a promise of findings (empty array = clean).
// Same convention as copy_audit.js, which covers the words; this covers the structure. All checks read computed styles.
// Codes: EYEBROW SUBLINE OPENER HEADINGS TWOCOL PILLS TICKS NUMROW NUP TWIN FAQ CTABAND FOOTMARK HMONO SCALE REVEAL
//        MOCKUP ALTERNATE TESTIMONIAL ORDER PADDING. Thresholds were tuned on pages known to read as AI-made (many findings)
// and on redesigned pages that read as human-made (clean or one or two). Don't tighten one without re-running both sets.
(async () => {
  const F = [], cs = (e, p) => getComputedStyle(e, p), px = v => parseFloat(v) || 0;
  const body = px(cs(document.body).fontSize) || 16, VH = innerHeight, absTop = e => e.getBoundingClientRect().top + scrollY;
  const words = t => (t || '').trim().split(/\s+/).filter(Boolean).length;
  const tag = e => `<${e.tagName.toLowerCase()}${e.classList && e.classList[0] ? '.' + e.classList[0] : ''}>`;
  const clip = (t, n = 28) => `"${(t || '').trim().replace(/\s+/g, ' ').slice(0, n)}"`;
  const shown = e => { const s = cs(e); if (s.display === 'none' || s.visibility === 'hidden') return false; const b = e.getBoundingClientRect(); return b.width > 2 && b.height > 2; };
  const srOnly = e => { const s = cs(e), b = e.getBoundingClientRect(); return b.width <= 2 || b.height <= 2 || (s.clip && s.clip !== 'auto' && /rect\(\s*0/.test(s.clip)) || /inset\(\s*(50%|100%)/.test(s.clipPath || ''); };
  // colour helpers (canvas normalises rgb, oklch, color() and hex alike)
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true }); cv.canvas.width = cv.canvas.height = 1;
  const rgba = c => { try { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; } catch (e) { return [0, 0, 0, 1]; } };
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const bgOf = e => { for (let n = e; n; n = n.parentElement) { const s = cs(n), c = rgba(s.backgroundColor);
    if (c[3] > .6) return c; const im = s.backgroundImage; if (im && im !== 'none') { const m = im.match(/(rgba?\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|color\([^)]*\)|#[0-9a-f]{3,8})/gi);
      if (m) { const cols = m.map(rgba).filter(x => x[3] > .5); if (cols.length) return [0, 1, 2].map(i => cols.reduce((a, x) => a + x[i], 0) / cols.length).concat(1); } } }
    return [255, 255, 255, 1]; };
  const fgOf = e => { const c = rgba(cs(e).color), bg = bgOf(e), a = c[3] * (+cs(e).opacity || 1); return [0, 1, 2].map(i => c[i] * a + bg[i] * (1 - a)); };
  const isHeading = e => /^H[1-6]$/.test(e.tagName) || e.getAttribute('role') === 'heading';
  const isBtn = e => { if (!e.matches('a,button,[role=button],input[type=submit]') || e.closest('nav,footer,header nav')) return false; const s = cs(e);
    return shown(e) && words(e.textContent) <= 6 && words(e.textContent) >= 1 && (px(s.paddingLeft) >= 8) && (rgba(s.backgroundColor)[3] > .3 || px(s.borderTopWidth) >= 1); };
  const filled = e => { const bg = rgba(cs(e).backgroundColor); return bg[3] > .5 && contrast(bg.slice(0, 3), bgOf(e.parentElement)) > 1.25; };
  const pill = e => { const b = e.getBoundingClientRect(); return px(cs(e).borderTopLeftRadius) >= Math.min(b.height, b.width) / 2 - 2; };
  const isLabel = e => { if (!e.isConnected || [...e.children].some(c => !/^(SPAN|B|I|EM|STRONG|SMALL|BR)$/.test(c.tagName))) return false;
    if (!(e.textContent || '').trim() || words(e.textContent) > 7 || e.closest('nav,button,a,th,label,[role=tab],footer')) return false; const s = cs(e), fs = px(s.fontSize);
    const caps = s.textTransform === 'uppercase' || (/[A-Z]{3}/.test(e.textContent) && e.textContent === e.textContent.toUpperCase());
    if (caps && px(s.letterSpacing) >= fs * .05 && fs <= 14.5) return true;
    const mono = /mono|courier|consol|menlo|code/i.test(s.fontFamily); return mono && fs <= 13.5 && (caps || /^\s*(\d{1,2}\b|\/\/|\[|§|#\d)/.test(e.textContent)) && !/[.!?]$/.test(e.textContent.trim()); };

  // ---- sections (outermost page blocks, in order) ----
  let secs = [...new Set([...document.querySelectorAll('body > header, body > section, main > *, body > main > div > section, body > div > section, body > div > header, body > article > section, body > div > main > section')])]
    .filter(e => !/^(NAV|SCRIPT|STYLE|ASIDE|FOOTER)$/.test(e.tagName) && shown(e) && e.getBoundingClientRect().height > 90 && !e.matches('[role=navigation],[role=contentinfo]'));
  secs = secs.filter(e => !secs.some(o => o !== e && o.contains(e)));
  if (secs.length < 3) { const wrap = [...document.querySelectorAll('main, body > div, #app, #root')].find(w => [...w.children].filter(shown).length >= 3); if (wrap) secs = [...wrap.children].filter(e => shown(e) && !/^(NAV|SCRIPT|STYLE|FOOTER)$/.test(e.tagName) && e.getBoundingClientRect().height > 90); }
  secs.sort((a, b) => absTop(a) - absTop(b));
  const footer = [...document.querySelectorAll('footer, [role=contentinfo]')].filter(shown).pop();
  const inner = secs.slice(1); // everything after the hero
  const hero = secs[0];

  // ---- 1. EYEBROW: tracked or mono small label directly before a heading ----
  const candidates = [...document.querySelectorAll('body *')].filter(e => shown(e) && isLabel(e));
  const svgLabels = [...document.querySelectorAll('svg')].filter(s => { const t = s.textContent.trim(); const b = s.getBoundingClientRect(); return t && words(t) <= 7 && b.height < 60 && /[A-Z]{3}/.test(t) && t === t.toUpperCase() && !s.closest('nav,button,a,footer'); });
  const nextVis = e => { let n = e; while (n && n !== document.body) { let s = n.nextElementSibling; while (s && !shown(s)) s = s.nextElementSibling; if (s) { while (s.firstElementChild && !isHeading(s) && shown(s.firstElementChild)) s = s.firstElementChild; return s; } n = n.parentElement; } return null; };
  const eyes = [...candidates, ...svgLabels].filter(l => { const n = nextVis(l); return n && /^H[1-3]$/.test(n.tagName); });
  const eyeSet = new Set(eyes);
  if (eyes.length >= 2) F.push(`EYEBROW ${eyes.length} tracked/mono labels sit directly above a heading (${eyes.slice(0, 4).map(e => clip(e.textContent, 18)).join(', ')}): put the fact in the heading, drop the label (layout-cadence.md §2)`);

  // ---- section opening signatures ----
  const kindOf = e => { if (isHeading(e)) return 'H'; if (isLabel(e) || eyeSet.has(e)) return 'E'; const t = e.tagName;
    if (t === 'P') return 'P'; if (/^(UL|OL|DL|TABLE|DETAILS)$/.test(t)) return 'L'; if (t === 'FORM') return 'F'; if (t === 'BLOCKQUOTE') return 'Q';
    if (/^(FIGURE|IMG|PICTURE|VIDEO|CANVAS|IFRAME|SVG)$/i.test(t) || e.getAttribute('role') === 'img') { const b = e.getBoundingClientRect(); return b.width >= 60 && b.height >= 40 ? 'M' : null; }
    if (isBtn(e)) return 'B'; return null; };
  const opening = sec => { const out = []; let last = null; for (const e of sec.querySelectorAll('*')) { if (last && last.contains(e)) continue; if (e.closest('nav') || !shown(e) || srOnly(e)) continue;
    const k = kindOf(e); if (!k) continue; out.push({ k, e }); last = e; if (out.length >= 4) break; } return out; };
  const heads = e => { const s = px(cs(e).fontSize); return s >= body * 2.2 ? 'big' : s >= body * 1.4 ? 'mid' : 'small'; };
  const sig = inner.map(sec => { const o = opening(sec); const first = o.find(x => x.k !== 'E'); const kinds = o.map(x => x.k).join('');
    const headFirst = !!first && first.k === 'H'; return { sec, o, kinds, headFirst, band: headFirst ? heads(first.e) : '', hp: headFirst && o[o.findIndex(x => x === first) + 1]?.k === 'P', e: o[0] && o[0].k === 'E' }; });

  // OPENER: same opening shape repeated, or consecutive heading+paragraph openers
  if (inner.length >= 4) {
    const counts = {}; for (const s of sig) if (s.headFirst) { const k = (s.e ? 'E' : '') + 'H' + (s.hp ? 'P' : '') + ':' + s.band; (counts[k] = counts[k] || []).push(s); }
    const worst = Object.entries(counts).sort((a, b) => b[1].length - a[1].length)[0];
    const share = worst ? worst[1].length / inner.length : 0;
    if (worst && worst[1].length >= 3 && share >= .5) F.push(`OPENER ${worst[1].length} of ${inner.length} sections open the same way (${worst[0].replace(':', ', ')} heading: ${worst[1].slice(0, 3).map(s => clip(s.o[s.o.findIndex(x => x.k === 'H')]?.e.textContent, 16)).join(', ')}): open some with content, a number, a figure or no heading (layout-cadence.md §1)`);
    let run = 0, best = 0; for (const s of sig) { run = s.hp ? run + 1 : 0; best = Math.max(best, run); }
    if (best >= 3) F.push(`OPENER ${best} consecutive sections open with heading then paragraph: break the run`);
    const nonHead = sig.filter(s => !s.headFirst).length;
    if (inner.length >= 5 && nonHead < 2) F.push(`HEADINGS ${inner.length - nonHead} of ${inner.length} sections after the hero open with a visible heading (need 2+ that open with content, media, a figure or nothing)`);
  }

  // ---- SUBLINE: heading then a dim paragraph ----
  const sublines = []; for (const sec of secs) { const h = [...sec.querySelectorAll('h1,h2,h3')].find(shown); if (!h) continue; let n = h.nextElementSibling; while (n && !shown(n)) n = n.nextElementSibling;
    if (n && /^(P|DIV|SPAN)$/.test(n.tagName) && !n.children.length && words(n.textContent) >= 6 && px(cs(n).fontSize) <= body * 1.4 && contrast(fgOf(n), bgOf(n)) < 7) sublines.push(h); }
  if (sublines.length >= 3) F.push(`SUBLINE ${sublines.length} headings are followed by a dim grey paragraph (${sublines.slice(0, 3).map(h => clip(h.textContent, 16)).join(', ')}): let the heading stand, or put the detail inside the content`);

  // ---- TWOCOL: heading beside paragraph as a section head ----
  const twocol = []; for (const sec of inner) { const h = [...sec.querySelectorAll('h2,h3')].find(shown); if (!h) continue; const hb = h.getBoundingClientRect();
    const p = [...sec.querySelectorAll('p')].find(q => shown(q) && words(q.textContent) >= 8 && q.getBoundingClientRect().top < hb.bottom + 160); if (!p) continue; const pb = p.getBoundingClientRect();
    if (pb.left >= hb.right - 8 && pb.top < hb.bottom && pb.bottom > hb.top && pb.width > 180) twocol.push(h); }
  if (twocol.length >= 2) F.push(`TWOCOL ${twocol.length} sections head with a heading on the left and a paragraph on the right (${twocol.slice(0, 3).map(h => clip(h.textContent, 16)).join(', ')})`);

  // ---- PILLS and TICKS ----
  const btns = [...document.querySelectorAll('a,button,[role=button],input[type=submit]')].filter(isBtn);
  const toggle = b => b.matches('[role=tab],[role=radio],[role=switch],[aria-pressed],[aria-selected],[aria-checked],[aria-expanded],[data-filter],[data-tab]') || b.closest('[role=tablist],[role=radiogroup],[role=group]');
  const pairs = []; for (const b of btns) { if (!pill(b) || toggle(b)) continue; const sib = [...b.parentElement.children].filter(x => x !== b && btns.includes(x) && pill(x) && !toggle(x)); if (sib.length >= 1 && sib.length <= 2) pairs.push(b.parentElement); }
  const pairSet = [...new Set(pairs)];
  if (pairSet.length) F.push(`PILLS ${pairSet.length} group(s) of side-by-side pill buttons (${pairSet.slice(0, 2).map(g => [...g.children].filter(c => btns.includes(c)).map(c => clip(c.textContent, 14)).join(' + ')).join('; ')}): one clear action, or a different shape`);
  const fb = btns.filter(filled); let crowd = null;
  for (let y = 0; y < document.documentElement.scrollHeight && !crowd; y += 300) { const inView = fb.filter(b => { const t = absTop(b); return t >= y && t < y + VH; }); if (inView.length >= 3) crowd = inView; }
  if (crowd) F.push(`PILLS ${crowd.length} filled buttons within one viewport (${crowd.map(c => clip(c.textContent, 12)).join(', ')}): one primary action per screen`);
  if (hero) { const hb = [...hero.querySelectorAll('a,button')].filter(isBtn); const g = hb.length ? hb[0].parentElement : null;
    if (g) { let n = g.nextElementSibling; for (let i = 0; i < 2 && n; i++, n = n.nextElementSibling) { const items = [...n.children].filter(shown); if (items.length >= 3 && items.length <= 6 && items.every(x => words(x.textContent) <= 5)) {
      const mark = x => /^[\s✓✔✅•·●★☑√]/.test(x.textContent) || [...x.querySelectorAll('svg,i')].some(s => s.getBoundingClientRect().width <= 24) || (cs(x, '::before').content || 'none') !== 'none' && cs(x, '::before').content !== 'normal' && cs(x, '::before').content !== '""';
      if (items.filter(mark).length >= 3) { F.push(`TICKS a row of ${items.length} ticked reassurances sits under the hero buttons (${items.slice(0, 3).map(x => clip(x.textContent, 14)).join(', ')}): say it in the body or drop it`); break; } } } } }

  // ---- NUMROW, NUP, TWIN ----
  const rowOf = ks => ks.length >= 3 && ks.filter(k => Math.abs(k.getBoundingClientRect().top - ks[0].getBoundingClientRect().top) < 24).length >= Math.min(ks.length, 3);
  const numLeaf = c => { const l = [...c.querySelectorAll('*')].find(x => !x.children.length && x.textContent.trim()); return l && /^(0?[1-9]|1[0-2]|[IVX]{1,4})\s*[.)]?$|^step\s*\d/i.test(l.textContent.trim()); };
  const numRows = [], nups = [], twins = [], seenCards = new Set();
  for (const p of document.querySelectorAll('body *')) {
    if (p.closest('nav,footer,select') || !shown(p)) continue; const ks = [...p.children].filter(shown); if (ks.length < 2 || ks.length > 12) continue;
    if (ks.length >= 3 && ks.length <= 5 && rowOf(ks)) {
      const counter = p.tagName === 'OL' && ks.every(k => /counter/.test(cs(k, '::before').content || '')); const nums = ks.filter(numLeaf).length;
      if ((counter || nums >= 3) && ks.filter(k => k.querySelector('h2,h3,h4,h5,strong,b')).length >= 3) { numRows.push(p); ks.forEach(k => seenCards.add(k)); continue; } }
    if (ks.length >= 3 && rowOf(ks) && !ks.some(k => seenCards.has(k))) {
      const w = ks.map(k => k.getBoundingClientRect().width), h = ks.map(k => k.getBoundingClientRect().height);
      const eq = (Math.max(...w) - Math.min(...w)) / Math.max(...w) < .06 && (Math.max(...h) - Math.min(...h)) / Math.max(...h) < .18;
      const card = k => k.querySelector('h2,h3,h4,h5,h6') && [...k.querySelectorAll('p')].some(q => words(q.textContent) >= 4) && k.getBoundingClientRect().height >= 90;
      if (eq && ks.filter(card).length === ks.length && ks.length <= 6 && !ks.every(k => k.tagName === 'LI' && k.closest('dl,[class*=faq]'))) nups.push(p); }
    if (ks.length === 2) { const priced = k => /[$]\s?\d/.test(k.textContent) && (k.querySelector('ul,ol') || [...k.querySelectorAll('a,button')].some(isBtn)); const a = ks[0].getBoundingClientRect(), b = ks[1].getBoundingClientRect();
      if (priced(ks[0]) && priced(ks[1]) && Math.abs(a.width - b.width) / a.width < .2 && Math.abs(a.top - b.top) < 40) twins.push(p); } }
  if (numRows.length) F.push(`NUMROW ${numRows.length} row(s) of 3 to 5 numbered steps (${numRows[0].children.length} columns of numeral, heading, paragraph): a process is a sequence in the world of the site, not a numbered row`);
  if (nups.length >= 2) F.push(`NUP ${nups.length} groups of 3+ equal cards each with heading and paragraph (${nups.slice(0, 3).map(n => `${n.children.length} x ${tag(n)}`).join(', ')}): vary size, count and form per group`);
  if (twins.length) F.push(`TWIN two side-by-side price panels with a price and a list or button (${tag(twins[0])}): set the prices as a list, a table, a sentence or one offer`);

  // ---- FAQ accordion ----
  const faqs = []; for (const p of document.querySelectorAll('body *')) { const kids = [...p.children]; if (kids.filter(k => k.tagName === 'DETAILS' && shown(k)).length >= 3) faqs.push(p);
    else if (kids.length >= 3 && kids.filter(k => k.querySelector(':scope > button[aria-expanded], :scope > h3 > button[aria-expanded], :scope > [role=button][aria-expanded]')).length >= 3) faqs.push(p); }
  if (faqs.length) F.push(`FAQ accordion of ${[...faqs[0].children].length} collapsible items (${tag(faqs[0])}): answer the real questions in the flow of the page, or show them open`);

  // ---- CTABAND and FOOTMARK ----
  const lastSec = secs[secs.length - 1];
  if (lastSec && secs.length >= 4 && (!footer || absTop(lastSec) < absTop(footer))) { const bg = bgOf(lastSec), bt = [...lastSec.querySelectorAll('a,button')].filter(x => shown(x) && (isBtn(x) || x.matches('button,.btn,[class*=btn],[class*=button]')));
    if (lum(bg) < .1 && lastSec.querySelector('h1,h2,h3') && bt.length >= 1 && bt.length <= 2 && words(lastSec.innerText) < 40 && !lastSec.querySelector('input,textarea,select')) F.push(`CTABAND the last section is a dark band with a heading and ${bt.length} button${bt.length > 1 ? 's' : ''} (${words(lastSec.innerText)} words): end on the site's own last beat instead`); }
  if (footer) { const big = [...footer.querySelectorAll('*')].find(e => (e.childNodes.length && [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim().length > 2)) && px(cs(e).fontSize) > 60 && shown(e));
    if (big) F.push(`FOOTMARK footer wordmark set at ${Math.round(px(cs(big).fontSize))}px (${clip(big.textContent, 16)}): the oversize footer name is a template habit`); }

  // ---- HMONO and SCALE ----
  const h2s = [...document.querySelectorAll('h2')].filter(h => shown(h) && !srOnly(h)); const sizes = h2s.map(h => px(cs(h).fontSize));
  if (h2s.length >= 4 && Math.max(...sizes) / Math.min(...sizes) < 1.3) F.push(`HMONO ${h2s.length} section headings share one size (${Math.round(Math.min(...sizes))} to ${Math.round(Math.max(...sizes))}px): size each heading for what it does in its section`);
  const bigSecs = []; for (const sec of inner) { let m = 0, el = null; for (const e of sec.querySelectorAll('*')) { if (!shown(e) || !e.textContent.trim() || [...e.childNodes].every(c => c.nodeType !== 3 || !c.textContent.trim())) continue; const s = px(cs(e).fontSize); if (s > m) { m = s; el = e; } }
    if (m > body * 3.5) bigSecs.push(`${clip(el.textContent, 14)} ${Math.round(m)}px`); }
  if (bigSecs.length >= 3) F.push(`SCALE ${bigSecs.length} sections each carry display type over 3.5x body size (${bigSecs.slice(0, 3).join(', ')}): reserve the very large size for one or two moments`);

  // ---- REVEAL: one entrance everywhere, content hidden until scrolled ----
  const groups = {}; for (const e of document.querySelectorAll('body *')) { if (e.closest('svg') || !shown(e) && cs(e).display === 'none') continue; const s = cs(e);
    const name = s.animationName !== 'none' && s.animationIterationCount !== 'infinite' ? 'anim:' + s.animationName : ''; const cls = (e.getAttribute('class') || '').match(/\b(reveal|fade-?up|fade-?in|aos|animate-in|in-?view|appear|rise|slide-?up|scroll-?in|will-?reveal)[\w-]*/i); const data = e.hasAttribute('data-aos') || e.hasAttribute('data-reveal') || e.hasAttribute('data-animate');
    const key = name || (cls ? 'class:' + cls[1].toLowerCase() : '') || (data ? 'data-attr' : ''); if (key) (groups[key] = groups[key] || []).push(e); }
  const grp = Object.entries(groups).sort((a, b) => b[1].length - a[1].length)[0];
  if (grp && grp[1].length >= 5) F.push(`REVEAL ${grp[1].length} blocks share one entrance animation (${grp[0]}): pick the few moments that earn motion; static is fine`);
  const hidden = []; for (const e of document.querySelectorAll('main *, body > section *, body > div *')) { if (e.closest('svg,nav,dialog,[aria-hidden=true]') || hidden.some(h => h.contains(e))) continue; const s = cs(e); if (s.display === 'none' || s.visibility === 'hidden') continue;
    const b = e.getBoundingClientRect(); if (+s.opacity < .1 && b.width > 80 && b.height > 30 && words(e.innerText || e.textContent) >= 3 && b.top + scrollY > VH && !s.animationName.match(/^(?!none)/)) hidden.push(e); }
  if (hidden.length >= 3) F.push(`REVEAL ${hidden.length} blocks are invisible until scrolled into view (${hidden.slice(0, 3).map(e => tag(e)).join(', ')}): content must be on the page at load; reveal is decoration, never the way content appears`);

  // ---- MOCKUP: device frame around a screenshot in the hero ----
  const frames = []; for (const e of document.querySelectorAll('body *')) { if (!hero || !hero.contains(e) && !(absTop(e) < VH * 1.5)) continue; if (!shown(e) || e.closest('nav')) continue; const cls = ((e.getAttribute('class') || '') + ' ' + (e.id || '')).toLowerCase();
    const holds = e.querySelector('img,picture,video,iframe,canvas,svg'); const b = e.getBoundingClientRect(); if (!holds || b.width < 200) continue; const s = cs(e);
    const named = /laptop|macbook|mockup|bezel|iphone|device|browser-?(frame|window|chrome)|window-?(bar|chrome)/.test(cls);
    const dots = [...e.querySelectorAll(':scope > * > span,:scope > * > i,:scope > * > b')].filter(d => { const r = d.getBoundingClientRect(); return r.width >= 6 && r.width <= 16 && Math.abs(r.width - r.height) < 2 && px(cs(d).borderTopLeftRadius) >= r.width / 2 - 1; }).length >= 3;
    const bezel = px(s.borderTopWidth) >= 6 && px(s.borderTopLeftRadius) >= 14 && lum(rgba(s.borderTopColor)) < .12; if (named || dots || bezel) frames.push(e); }
  const topFrames = frames.filter(f => !frames.some(o => o !== f && o.contains(f)));
  if (topFrames.length) F.push(`MOCKUP a drawn device or browser frame holds a screenshot near the top of the page (${tag(topFrames[0])}): show the real thing, the place, the product or the work, not a laptop around it`);

  // ---- ALTERNATE: strict light/dark or A/B background stripes ----
  const bgs = inner.map(sec => { const c = bgOf(sec); return { key: c.slice(0, 3).map(v => Math.round(v / 6)).join(','), dark: lum(c) < .18 }; });
  const alt = (f) => { let run = 1, best = 1; for (let i = 1; i < bgs.length; i++) { run = f(bgs[i], bgs[i - 1], bgs[i - 2], run) ? run + 1 : 1; best = Math.max(best, run); } return best; };
  const lightDark = alt((a, b) => a.dark !== b.dark); const ab = alt((a, b, c) => a.key !== b.key && (!c || a.key === c.key) || false);
  if (inner.length >= 5 && Math.max(lightDark, ab >= 5 ? ab : 0) >= 5) F.push(`ALTERNATE section backgrounds stripe light and dark (or A/B) across ${Math.max(lightDark, ab)} sections: change background where the content changes, not on a timer`);

  // ---- TESTIMONIAL shape ----
  const attrib = e => { const f = e.closest('figure') || e; const n = e.nextElementSibling; return !!(e.querySelector('cite,footer,figcaption') || [...f.querySelectorAll('figcaption,cite')].some(c => !/\?\s*$/.test(c.textContent) && !isLabel(c)) || (n && words(n.textContent) <= 8 && /^\s*[—–-]\s*\S|^<?cite/i.test(n.textContent)) || (n && n.tagName === 'CITE')); };
  const interactive = e => { const f = e.closest('figure'); return (!!f && f !== e && !!f.querySelector('button,input,[aria-live]')) || e.matches('[aria-live]') || !!e.querySelector('[aria-live],button,input,mark,select,textarea') || !!e.closest('[aria-live],form'); };
  const quotes = [...document.querySelectorAll('blockquote, figure, [class*=testimonial], [class*=review]')].filter(e => shown(e) && !e.closest('footer,nav') && words(e.textContent) >= 8 && !interactive(e) && (
    /testimonial|review/.test((e.getAttribute('class') || '').toLowerCase()) || (e.tagName === 'BLOCKQUOTE' && attrib(e)) ||
    (e.tagName === 'FIGURE' && e.querySelector('figcaption') && !e.querySelector('img,picture,video,canvas') && cs(e.querySelector('p,blockquote') || e).fontStyle === 'italic')));
  const qTop = quotes.filter(q => !quotes.some(o => o !== q && o.contains(q)));
  if (qTop.length) F.push(`TESTIMONIAL ${qTop.length} quote-and-attribution block(s) (${qTop.slice(0, 2).map(q => clip(q.textContent, 22)).join('; ')}): only a real, sourced customer quote, and never card-shaped; otherwise remove`);

  // ---- ORDER: hero, services, about, process, cta in that order ----
  const roleOf = (sec, i) => { if (i === 0) return 'hero'; const label = ((sec.id || '') + ' ' + (sec.getAttribute('class') || '') + ' ' + (sec.getAttribute('aria-label') || '') + ' ' + ((sec.querySelector('h1,h2,h3') || {}).textContent || '')).toLowerCase();
    if (/process|how it works|how we work|steps|our approach|what to expect/.test(label)) return 'process'; if (/about|our story|who we are|meet |our team|why (us|choose)|our (mission|values)/.test(label)) return 'about';
    if (/services?|what we (do|offer)|our work|specialt|solutions|offerings|capabilit/.test(label)) return 'services'; if (/contact|get (a|your|started)|quote|book|ready to|call us|request|schedule/.test(label)) return 'cta'; return ''; };
  const roles = secs.map(roleOf).filter(Boolean), tmpl = ['hero', 'services', 'about', 'process', 'cta']; let ti = 0, hit = 0; for (const r of roles) if (r === tmpl[ti]) { hit++; ti++; } else if (tmpl.indexOf(r) > ti) { hit++; ti = tmpl.indexOf(r) + 1; }
  if (hit >= 4 && secs.length >= 4) F.push(`ORDER sections run in the stock order (${roles.join(' > ')}): order them by what this visitor needs to decide, and cut sections the concept doesn't need`);

  // ---- PADDING: identical vertical padding on every section ----
  if (inner.length >= 5) { const pads = inner.map(sec => `${Math.round(px(cs(sec).paddingTop))}/${Math.round(px(cs(sec).paddingBottom))}`); const uniq = new Set(pads);
    if (uniq.size === 1 && pads[0] !== '0/0') F.push(`PADDING all ${inner.length} sections after the hero use the same vertical padding (${pads[0].replace('/', 'px top, ')}px bottom): let dense and loose sections differ`); }

  return [...new Set(F)];
})();
