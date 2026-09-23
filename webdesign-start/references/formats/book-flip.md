# Format: book / page-flip site

**Load when:** the business makes, or is naturally described by, a bound or paged object, and its content comes in **discrete, finite, composed units** (roughly 4–24 pages) where browsing order and pacing matter. Fits portfolios and lookbooks, menus and wine lists, annual or impact reports, zines, field guides, recipe books, children's books, travel journals and wedding albums.

**Study:** gallery 087 (Juno's sketchbook, a one-sided spiral pad with a 2D corner peel). Also 098 (storybook).

**Don't use it** when content is long, growing or searchable (docs, blogs, filtered catalogues); when copy cannot be edited to fit a fixed page; when the main task is a multi-step transaction (put the form on a back-cover page that opens a normal panel); or when you cannot name the object's physical format ("A5 landscape spiral pad", "saddle-stitched A4 report", "folded card menu"). If you can't, the book is decoration, not direction.

## What makes it work

Print composition on a screen. Each page is a fixed-aspect canvas composed like a printed page, and the turn is a physical event that reveals the next composition. 087 makes one decision that removes half the complexity: a spiral sketchbook is used on one side only, so there are no spreads and the blank back of the turning sheet is correct for the material. Every page's decoration leads the eye toward the corner you turn, and drawings finish arriving as the page lands.

## Architecture

1. **Decide the medium:** one-sided (sketchpad, flip pad, menu card: blank backs, single pages) or two-sided (book, magazine, report: spreads). Two-sided spreads are cover alone on the right, then [1,2], [3,4] …, then back cover alone on the left. A position is a spread index; deep links address pages, and the spread is derived.
2. **One page array is the source of truth.** Every page is a real `<article>` in reading order with an `id` slug, a `data-title` and one heading. Without JS it renders as a vertical stack of page-shaped cards with folios, which is also the print stylesheet.
3. **Choose the mode from both dimensions and from content fit:**
   - `spread`: landscape with room for two readable pages (about ≥1000×620);
   - `single`: one page at a time, still turned (portrait tablets, large phones);
   - `stack`: scroll-stacked pages that keep the binding, page edges, folios and a sticky "page 3 of 12" tab.

   After sizing, if any page has `scrollHeight > clientHeight`, fall back to `stack`. Never scroll inside a page and never clip text.
4. **Size the book to fit both axes** (sketch 1), with the chrome (nav, counter) reserved outside the page. Compose inside each page in container units (`cqw`/`cqh`) so the collage scales as one picture.
5. **Pick one turn mechanic** (see levers). Aim for 700–1100ms per turn.
6. **One progress variable per turn,** `p ∈ [0,1]`. Buttons tween it, drags set it, release commits or returns. Crease, sheen, cast shadow and lift are all functions of `p`, so drag, keyboard and animation look identical.
7. **Input** (sketch 4): drag or swipe anywhere on the stage with commit by distance or flick; prev/next buttons of at least 44px; ←/→ (mirrored for right-to-left), PageUp/PageDown, Home/End. Queue one pending turn during an animation. Riffle jumps animate at most 3 intermediate leaves at about 160ms each, capped near 900ms.
8. **Settle** (sketch 5): hidden pages are `inert`; the incoming page stays inert until settled; `#slug` updates (`replaceState` for steps, `pushState` for jumps) with `popstate` handled; `document.title` and a polite "Page 5 of 12: Starters" status update; focus moves to the heading on jumps and deep links and stays put on prev/next.
9. **Arrival:** page content (drawings, highlighter, stamps, a chart) starts at about 40% of the turn so it is visibly finishing as the page lands (self-drawing lines: `techniques.md` §4). Play once per page per visit.
10. **Reduced motion:** turns become a 150–200ms cross-fade, drags slide instead of curl, arrivals show finished.

## Key mechanics

```css
/* fit the book to both axes; compose inside each page in page units */
.book { --aspect: .707; --across: 2; --chrome: 88px; --gut: 16px;   /* A-series page, spread */
  --page-h: min(100svh - var(--chrome) - 2*var(--gut),
                (100vw - 2*var(--gut)) / (var(--aspect) * var(--across)));
  --page-w: calc(var(--page-h) * var(--aspect));
  width: calc(var(--page-w) * var(--across)); height: var(--page-h); margin: auto;
  position: relative; perspective: 2200px; }
.book[data-mode="single"] { --across: 1; }
.pg { container-type: size; width: var(--page-w); height: var(--page-h); }
.pg .title { font-size: 9cqh; }
```

```js
// 2D fold-line peel: the fold is the perpendicular bisector of corner C → pulled point P
function fold(C, P, W, H) {
  const dx = C.x - P.x, dy = C.y - P.y, d = Math.hypot(dx, dy) || 1e-6;
  const nx = dx / d, ny = dy / d, c = nx * (C.x + P.x) / 2 + ny * (C.y + P.y) / 2; // line n·x = c
  const s = ([x, y]) => nx * x + ny * y - c, rect = [[0, 0], [W, 0], [W, H], [0, H]];
  const half = sign => rect.flatMap((a, i) => {            // clip the page rect to one side
    const b = rect[(i + 1) % 4], sa = sign * s(a), sb = sign * s(b), out = sa <= 0 ? [a] : [];
    if (sa * sb < 0) { const t = sa / (sa - sb); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
    return out; });
  const m = [1 - 2 * nx * nx, -2 * nx * ny, -2 * nx * ny, 1 - 2 * ny * ny, 2 * c * nx, 2 * c * ny];
  return { down: half(1), lifted: half(-1), mirror: `matrix(${m.join(',')})`, nx, ny, c, d };
}
const poly = pts => `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(',')})`;
```
Clip the page with `poly(f.down)`, clip the back with `poly(f.lifted)` and give it `transform: f.mirror` at `transform-origin: 0 0`. Shade with fold-aligned bands: a crease (dark 25–30% → 0 over 6–10% of depth) and a sheen (white 35–45% peak at about 25% depth) on the flap; a tinted cast shadow on the revealed page, depth `12 + 0.2·d` capped near 110px; a tinted `drop-shadow` under the flap. Constrain the corner so paper never stretches (within one page width of the bottom spine end, within the diagonal of the top one) and fade the flap over the last 15% of travel.

```css
/* hinge leaf for spreads: curvature faked with light, driven by one registered --p */
@property --p { syntax: "<number>"; inherits: true; initial-value: 0; }
.spread { transition: --p .95s cubic-bezier(.45,.05,.25,1); }
.spread.dragging { transition: none; }                    /* JS sets --p from the pointer */
.leaf { position: absolute; inset: 0 0 0 50%; transform-origin: 0 50%; transform-style: preserve-3d; }
.leaf.turning { transform: rotateY(calc(var(--p) * -180deg)); }
.leaf > * { position: absolute; inset: 0; backface-visibility: hidden; }
.leaf > .verso { transform: rotateY(180deg); }
.leaf::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, #1e140a 0%, #1e140a00 35%);
  opacity: calc(sin(var(--p) * 180deg) * .45); }          /* darkest when the leaf stands upright */
.spread::before { opacity: calc(sin(var(--p) * 180deg) * .6); } /* gutter shadow on pages beneath */
```
Keep `perspective` at 1800–2600px. For a real curl, nest 3–4 vertical strips in `preserve-3d`, each bending a further `sin(p·π)·8°`.

```js
// drag or swipe anywhere; commit by distance or flick; keys scoped away from fields
let g = null;
stage.addEventListener('pointerdown', e => {
  if (busy || e.button > 0 || e.target.closest('a,button,input,select,textarea,[data-no-turn]')) return;
  g = { x: e.clientX, t: e.timeStamp, id: e.pointerId }; stage.setPointerCapture(e.pointerId); });
stage.addEventListener('pointermove', e => g && e.pointerId === g.id &&
  drag(dir * (g.x - e.clientX) / stage.clientWidth));      // dir = -1 for right-to-left books
stage.addEventListener('pointerup', e => { if (!g) return;
  const dx = dir * (g.x - e.clientX), v = dx / Math.max(1, e.timeStamp - g.t); g = null;
  Math.abs(dx) > stage.clientWidth * .22 || Math.abs(v) > .45 ? turn(Math.sign(dx)) : settleBack(); });
addEventListener('keydown', e => {
  if (e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey || e.target.closest('input,textarea,select,[contenteditable]')) return;
  const k = { ArrowRight: dir, PageDown: 1, ArrowLeft: -dir, PageUp: -1, Home: -99, End: 99 }[e.key];
  if (k) { e.preventDefault(); k > 1 || k < -1 ? jump(k > 0 ? last : 0) : turn(k); } });
```
Set `touch-action: pan-y` on the stage so vertical scroll and pinch-zoom still work.

```js
// settle: inert, deep link, title, status, focus
function settle(i, { via = 'step' } = {}) {
  current = clamp(i); const open = visibleIndexes(current, book.dataset.mode); // [i] or [2k-1, 2k]
  pages.forEach((p, k) => { const on = open.includes(k); p.inert = !on; p.toggleAttribute('data-open', on); });
  const pg = pages[current], url = '#' + pg.id;
  if (via === 'jump') history.pushState({ i: current }, '', url);
  else if (via === 'step') history.replaceState({ i: current }, '', url);
  document.title = `${pg.dataset.title} · ${SITE_NAME}`;
  status.textContent = `Page ${current + 1} of ${pages.length}: ${pg.dataset.title}`;
  if (via === 'jump' || via === 'load') pg.querySelector('[tabindex="-1"]')?.focus({ preventScroll: true });
  arrive(pg);                                               // drawings once per visit
}
addEventListener('popstate', () => settle(indexOfHash(location.hash), { via: 'history' }));
```

## Variation levers

- **Object:** spiral sketchpad, saddle-stitched zine, perfect-bound monograph, cloth hardback, folded menu card, desk calendar, reporter's pad, ring binder, concertina, passport, photo album, field notebook with elastic.
- **Sides and view:** one-sided single page, two-sided spread, top-bound, right-to-left.
- **Turn mechanic:** corner peel (2D, one-sided paper), hinge leaf (spreads, hardbacks), top-flip `rotateX` (calendars, flip-boards), slide or fan (loose sheets), concertina unfold, tear-off.
- **Paper and turn physics:** dot grid, laid, coated gloss (fast turn with a specular flash), newsprint, heavy card (1100ms, stiff, little bend), tracing vellum (next page shows through), black paper with white ink.
- **Binding:** wire coil, gutter stitches, deep perfect-bound shadow, rings, ribbon bookmark, loose leaves in a folio.
- **Ground:** desk with props, linen tablecloth, museum plinth, void black, the brand's colour field.
- **Wayfinding:** fore-edge index tabs, a printed contents page, a thumbnail strip, running heads, a page-number dial.
- **Arrival:** self-drawing line art, stamps landing, photos dropping onto tape, ink bleeding in, charts building, recipe steps ticking off.

## Business uses

- A neighbourhood restaurant's seasonal menu: a two-panel heavy-card menu with a ribbon on linen, stiff hinge turns, tabular prices with dotted leaders, dishes inking in on arrival, table QR codes deep-linking to `#desserts`, reservations and allergens on the back cover.
- An architecture practice's monograph: cloth-bound, one project per spread (full-bleed photograph on the recto, a self-drawing plan and caption block on the verso), a contents page that doubles as the jump menu, shareable per-project URLs for press.
- A charity's annual impact report: saddle-stitched A4 with running heads, one chart building per programme spread, sourced figures in footnotes, a donate action and an accessible PDF on the back cover.

## Pitfalls

- **A book sized from width only.** At 1280×640, 087 overflows the viewport, its nav drops below the fold and a desk note collides with the coil. Check 1440×900, 1280×640, 1024×768, 768×1024 and 390×844 with the nav visible.
- **No deep links or history.** 087 always reloads to the cover, so "the work pages" cannot be shared.
- **Dropping the signature interaction on phones by default.** 087 abandons flipping below 861px. Use `single` mode where pages fit, and choose `stack` deliberately.
- **Phone collage collisions.** In 087 a coffee ring runs through a heading and a doodle covers the envelope stamp. Treat the phone as a separate composition: promote decorations into flow or drop them, at most one overlapping ornament per page.
- **A corner-only gesture.** 087's only drag target is a 70px corner, with no swipe for touch laptops or tablets. Allow drag anywhere and teach the affordance once (a dog-ear, a hand-drawn arrow, a small idle peel after about 1.5s, skipped under reduced motion).
- **Riffles that chain full turns and drop input.** 087's four-hop jump takes about 2.2s behind a busy lock. Cap riffles near 900ms and queue one pending turn.
- **Losing the h1 with the cover, and not moving focus.** Keep one site h1 that is never hidden, an h2 per page, and focus management on jumps.
- **Decorations above content.** When 087's envelope opens, the stamp and postmark sit over the letter. Check stacking order in every open state.
- **Handwriting as body text.** 087's handwriting stack falls back to generic `cursive` on Linux. Keep handwriting for display unless fallbacks are checked on Windows and Linux.
- **Glyph content read aloud.** Checklist marks from `::before` are announced ("☑"). Use `aria-hidden` icons or real list semantics; give toggles like an envelope `aria-expanded`.
- **Abrupt reduced motion.** Instant swaps lose the sense of place; use a short cross-fade.
- **Contact buried at the back.** Contact, booking or purchase must be reachable in one jump from every page.

## Signals (what a user might say)

- "I want it to feel like flipping through my sketchbook."
- "Our menu should be the website."
- "Can visitors turn the pages like a real book?"
- "Like a lookbook or a magazine you page through."
- "Our annual report, but nicer than a PDF."
- "A storybook for our kids' brand."
- "I want it to feel printed, like a zine."
- "Each project gets its own page, one at a time."
- "Like a travel journal with photos taped in."
- "Our wedding album as a site."

Not this format if…
- the content grows every week or needs search and filters (a blog, a shop catalogue, docs);
- the writing is long, unedited paragraphs that cannot be cut to fit a page;
- the main job is a checkout or a multi-step booking.
