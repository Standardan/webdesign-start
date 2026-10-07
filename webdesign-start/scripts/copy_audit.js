// Copy and cadence audit for webdesign-start (references/human-copy.md). Paste into the browser console (or evaluate
// with your browser tool) on the rendered page at 1440x900. Returns a promise of findings (empty array = clean).
// Checks: em dashes / dash-like hyphens in visible text (DASH), en-dash ranges (RANGE), stock AI phrases (PHRASE),
// too many small tracked uppercase labels (LABELS), sections opening with label -> big heading -> paragraph (STACK),
// stacked one-word slogan sentences (SLOGAN).
(async () => {
  const F = [], cs = e => getComputedStyle(e);
  const visible = e => { for (let n = e; n && n !== document.body; n = n.parentElement) { const s = cs(n);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < .05) return false; if (n.getAttribute && n.getAttribute('aria-hidden') === 'true') return false; }
    const b = e.getBoundingClientRect(); return b.width > 1 && b.height > 1; };
  const tag = e => `<${e.tagName.toLowerCase()}${e.classList[0] ? '.' + e.classList[0] : ''}>`;
  // 1. visible text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n =>
    n.textContent.trim() && !n.parentElement.closest('script,style,noscript,code,pre') && visible(n.parentElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  const text = nodes.map(n => n.textContent).join(' ');
  for (const n of nodes) { const t = n.textContent; const at = `${tag(n.parentElement)} "${t.trim().slice(0, 50)}"`;
    if (/—/.test(t)) F.push(`DASH em dash in ${at}: rewrite with a period, comma, colon or parentheses`);
    if (/\s[–-]\s/.test(t)) F.push(`DASH dash-like hyphen in ${at}: rewrite the sentence`);
    const rg = t.match(/(\d[\w:.]*)\s?–\s?(\d[\w:.]*)/) || t.match(/([A-Z][a-z]{2})\s?–\s?([A-Z][a-z]{2})/);
    if (rg) F.push(`RANGE en-dash range "${rg[0]}" in ${at}: write "${rg[1]} to ${rg[2]}" (or a plain hyphen in compact data)`); }
  // 2. stock phrases
  const phrases = [/\bnot just\b[^.]{0,40}\bit'?s\b/i, /\bisn'?t just\b/i, /\bmore than just\b/i, /\bwhether you'?re\b/i, /\belevate(s|d)?\b/i, /\bseamless(ly)?\b/i,
    /\bcrafted with care\b/i, /\bcurated\b/i, /\bnestled\b/i, /\bvibrant\b/i, /\bunparalleled\b/i, /\bcutting[- ]edge\b/i, /\bgame[- ]changer\b/i, /\bunlock\b/i,
    /\bembark\b/i, /\bdelve\b/i, /\btapestry\b/i, /\btestament to\b/i, /\btrusted partner\b/i, /\bwe'?ve got you covered\b/i, /\blook no further\b/i,
    /\bsay goodbye to\b/i, /\bfrom a to z\b/i, /\bat the heart of\b/i, /\bexperience the difference\b/i, /\bwhere \w+ meets \w+\b/i, /^\s*imagine\b/im,
    /\bpicture this\b/i, /\bhere'?s the thing\b/i, /\bthe best part\?/i, /\bready to [^?]{2,40}\?/i];
  for (const re of phrases) { const m = text.match(re); if (m) F.push(`PHRASE stock wording "${m[0].trim()}": say it the way the owner would`); }
  // 3. small tracked uppercase labels
  const els = [...document.querySelectorAll('body *')].filter(e => [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim()) && visible(e));
  const isLabel = e => { const s = cs(e); return s.textTransform === 'uppercase' && parseFloat(s.letterSpacing || 0) >= parseFloat(s.fontSize) * .05 &&
    parseFloat(s.fontSize) <= 14.5 && e.textContent.trim().split(/\s+/).length <= 7 && !e.closest('nav,button,a,th,label,[role=tab]'); };
  const labels = els.filter(isLabel);
  if (labels.length > 4) F.push(`LABELS ${labels.length} small tracked uppercase labels visible (max 4, for real metadata only): ${labels.slice(0, 6).map(e => `"${e.textContent.trim().slice(0, 20)}"`).join(', ')}`);
  // 4. eyebrow stacks: label -> big heading -> paragraph at the top of a section
  const body = parseFloat(cs(document.body).fontSize) || 16; let stacks = 0; const where = [], counted = new Set();
  for (const sec of document.querySelectorAll('section, header, [class*="section"]')) {
    const seq = [...sec.querySelectorAll('*')].filter(e => els.includes(e)).slice(0, 4);
    for (let i = 0; i + 2 < seq.length; i++) { const [a, b, c] = seq.slice(i, i + 3);
      if (isLabel(a) && parseFloat(cs(b).fontSize) >= body * 2 && parseFloat(cs(c).fontSize) <= body * 1.35 && c.textContent.trim().split(/\s+/).length > 6) {
        if (!counted.has(b)) { counted.add(b); stacks++; where.push(`"${b.textContent.trim().slice(0, 30)}"`); } break; } } }
  if (stacks >= 2) F.push(`STACK ${stacks} sections open with label -> big heading -> paragraph (${where.slice(0, 4).join(', ')}): vary how sections open (human-copy.md §3)`);
  // 5. one-word slogan stacks
  const slogans = text.match(/(\b[A-Z][a-z]+\.\s+){2,}[A-Z][a-z]+\./g) || [];
  if (slogans.length > 1) F.push(`SLOGAN ${slogans.length} stacked one-word slogans (e.g. "${slogans[0]}"): keep at most one, and only if the owner would say it`);
  return [...new Set(F)];
})();
