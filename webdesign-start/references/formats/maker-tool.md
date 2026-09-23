# Format: maker tool (the visitor makes the hero)

**Load when:** the concept is a tool or toy in which the visitor composes, paints, types, arranges or configures something, and **what they make is the hero**. Fits configurators, custom and personalised products, creative services, gift and card makers, campaign toys, "build your own" pages, and any brand whose promise is "made by you".

**Study:** gallery 021 (Bauhaus composer), 023 (symmetry painter), 064 (magnetic poetry), 075 (calligraphy pad), 029 (typewriter letters). Also 025 (isometric town builder), 009 (constellation drawing), 049 (riso print lab), 071 (palette studio), 046 (habit garden, where the thing you make grows over weeks).

## What makes it work

The tool can't make anything ugly. Each strong page takes a medium with a real tradition (Bauhaus primaries, a fridge door of word magnets, sumi ink on rice paper, a typewriter, a star atlas) and turns its rules into constraints: a hidden snap grid, a curated vocabulary, N-fold symmetry, a fixed ink set, a monospace carriage. The visitor supplies the choices and the medium supplies the craft. So the first mark already looks good, and the tenth looks like *theirs*.

The output sits on a surface from its world: paper on a desk, a proof taped to a wall, a board with a hard offset shadow, a window in a stone wall. The tools are made of the same material (a tray, a dock, brass knobs, paper tags). The page opens *mid-making*, never on a blank canvas.

## Three variants

- **Arrange (021, 064, 025, 009):** discrete pieces (shapes, words, tiles, stars) placed on a board. Snap, spring and stacking order give it the tactile feel. Keyboard access is easy because every piece is an object.
- **Mark-make (023, 075, 029):** freehand strokes or typed characters rendered with the imperfections of a real tool: velocity width, dry brush, baseline jitter, ribbon texture. The feel lives in the stroke model.
- **Transform or configure (049, 071, 045):** the visitor sets a small number of meaningful choices and the tool renders a finished artefact (a print, a palette, a window). This is the closest variant to a product configurator.

## Architecture

1. **Stage the artefact.** The output takes 55–70% of the first viewport, framed as a physical object with a shadow and a surface under it. Tools dock at one edge (bottom dock, side panel or tray). On phones, the artefact stays on top and the tools become a bottom sheet or a scrolling strip. Never shrink the artefact below about 60% of the viewport width.
2. **The model is the truth, not the pixels.** Keep a serialisable document (pieces, strokes, characters, settings) in unit space (0–1, or grid cells), and render the canvas from it. This one decision gives you resize without loss (023 replays strokes after a resize), undo, export at any resolution, permalinks and autosave.
3. **Constraints that flatter.** Snap to a hidden grid with a spring settle. Curate the palette (4–6 inks) and the vocabulary. Add symmetry or mirroring where the medium has it. Give a "compose for me" button that follows the medium's rules (021's balanced auto-composition by visual weight, 023's idle autodraw that stops when touched).
4. **Start mid-making.** Seed a beautiful first state: an example piece, a prefilled letter, three habits with history, a random town. Use it as the demo, and give a one-click "fresh sheet" with a material transition (paper slides away, the board is wiped).
5. **Undo is a stack of model snapshots.** Commit after each finished gesture (pointer up, a keyboard nudge after a short pause), not on every move. Cap the stack at 50–100. Make Clear undoable (keep the cleared document). Bind Ctrl/Cmd+Z and Shift+Ctrl/Cmd+Z, and disable the buttons when there is nothing to undo or redo.
6. **Touch drawing.** Use Pointer Events with `setPointerCapture`, `touch-action: none` on the drawing surface only (never the page), and `getCoalescedEvents()` for smooth fast strokes. Use `pressure` only for `pointerType === 'pen'`. Map long-press to the secondary action (delete, bulldoze), and two fingers to pan and zoom. Keep hit targets at least 44px, and make pieces bigger on touch.
7. **Keyboard access to the canvas.** Make the surface focusable (`tabindex="0"`, `role="application"`, an `aria-roledescription` such as "composition board", and instructions through `aria-describedby`). Then:
   - *Arrange:* Tab or [ and ] cycles through pieces (announce each one); arrows nudge by one grid cell (Shift for fine); R rotates; Delete removes; Enter picks up and drops.
   - *Mark-make:* a visible keyboard reticle moves with the arrows; Space holds the pen down; every stroke is announced as "stroke 4, 12 segments". Also offer a non-drawing route to a good result (stamps, a traced model, autodraw).
   - Report every change in a polite `aria-live` region, and show shortcuts as `<kbd>` hints that work only while the surface has focus.
8. **Export re-renders from the model.** Draw into an offscreen canvas at export size (2048px, or real print size at 300dpi), add a colophon strip (title, maker's name, date, edition), then call `toBlob` to download a well-named file. Export SVG when the medium is vector, and plain text where words are the output (064 copies the poem). Offer `navigator.share({ files })` where it exists, with download as the fallback.
9. **Permalink and autosave.** Encode the document compactly into the URL hash with a debounced `history.replaceState`. On load, read the hash first, then localStorage, then the seeded demo. If the document is too big for a link (freehand ink), say so and offer export or a local save instead of a broken URL. Wrap every storage call in try/catch.
10. **Close the loop to the business.** The made thing flows into the conversion: "Order this print", "Add to basket with this engraving", "Send as a card", "Book a session to make it real". Pass the model as structured data, not a screenshot.

## Key mechanics

```js
// document + undo: commit a snapshot after each finished gesture; Clear is just another commit
let doc = load() ?? demoDoc(), past = [], future = [];
function commit(next) {
  past.push(structuredClone(doc)); if (past.length > 80) past.shift();
  future = []; doc = next; render(); persistSoon(); syncButtons();
}
function undo() { if (!past.length) return; future.push(doc); doc = past.pop(); render(); announce('Undone'); }
function redo() { if (!future.length) return; past.push(doc); doc = future.pop(); render(); announce('Redone'); }
```

```js
// stroke input: coalesced samples, unit-space points, width eased from speed (slow = wide)
surface.addEventListener('pointerdown', e => { surface.setPointerCapture(e.pointerId);
  live = { ink: tool.ink, pts: [] }; addSample(e); });
surface.addEventListener('pointermove', e => { if (!live) return;
  for (const s of e.getCoalescedEvents?.() ?? [e]) addSample(s); drawTail(live); });
surface.addEventListener('pointerup', () => { if (live) commit({ ...doc, strokes: [...doc.strokes, live] }); live = null; });
function addSample(e) { const p = toUnit(e), q = live.pts.at(-1);
  const v = q ? Math.hypot(p.x - q.x, p.y - q.y) / Math.max(1, e.timeStamp - q.t) : 0;
  const pen = e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 0.6;
  const w = (q ? q.w : 1) * 0.7 + 0.3 * pen * Math.max(0.25, 1 - v * 120);   // smoothed width
  live.pts.push({ x: p.x, y: p.y, t: e.timeStamp, w }); }
```

```js
// keyboard reticle on a canvas: arrows move, Space holds the pen, Enter stamps
const cur = { x: 0.5, y: 0.5, down: false };
surface.addEventListener('keydown', e => {
  const step = e.shiftKey ? 0.005 : 0.025, d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
  if (d) { e.preventDefault(); cur.x = clamp(cur.x + d[0] * step, 0, 1); cur.y = clamp(cur.y + d[1] * step, 0, 1);
    if (cur.down) live.pts.push({ ...cur, w: 0.6 }); drawReticle(cur); }
  else if (e.key === ' ' && !cur.down) { e.preventDefault(); cur.down = true; live = { ink: tool.ink, pts: [{ ...cur, w: 0.6 }] }; }
  else if (e.key === 'Enter') { stampAt(cur); announce(`Stamped at ${Math.round(cur.x * 100)}%, ${Math.round(cur.y * 100)}%`); }
});
surface.addEventListener('keyup', e => { if (e.key === ' ' && cur.down) { cur.down = false; commit({ ...doc, strokes: [...doc.strokes, live] }); } });
```

```js
// permalink: compact JSON -> base64url in the hash; refuse politely when too big
const toHash = d => btoa(unescape(encodeURIComponent(JSON.stringify(pack(d))))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromHash = h => unpack(JSON.parse(decodeURIComponent(escape(atob(h.replace(/-/g, '+').replace(/_/g, '/'))))));
let t; function persistSoon() { clearTimeout(t); t = setTimeout(() => {
  const h = toHash(doc); linkOk = h.length < 1800;
  if (linkOk) history.replaceState(null, '', '#' + h);
  try { localStorage.setItem('maker', JSON.stringify(doc)); } catch {} }, 300); }
try { if (location.hash.length > 1) doc = fromHash(location.hash.slice(1)); } catch { /* bad link: keep demo */ }
```

```js
// export: re-render the model at print size with a colophon strip, then download or share
async function exportPNG(px = 2400) {
  const c = new OffscreenCanvas(px, Math.round(px * 1.25)), g = c.getContext('2d');
  renderDoc(g, doc, px, px);                                  // same renderer, bigger unit
  g.font = `${px * 0.018}px ui-serif, Georgia, serif`; g.fillStyle = INK;
  g.fillText(`${doc.title || 'Untitled'} · made ${new Date().toLocaleDateString()}`, px * 0.06, px * 1.19);
  const blob = await c.convertToBlob({ type: 'image/png' }), name = slug(doc.title || 'my-piece') + '.png';
  const file = new File([blob], name, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) return navigator.share({ files: [file], title: doc.title });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name }); a.click();
}
```

## Variation levers

- **The medium and its rules:** Bauhaus primaries on a grid, word magnets, sumi ink, a typewriter, stained glass leading, embroidery stitches, neon tube bends, a letterpress chase, LEGO-like studs, a florist's bouquet.
- **The surface:** paper on a desk, a proof taped to a wall, a fridge door, a board with an offset shadow, a window, a garment on a mannequin.
- **Freedom level:** freehand, snapped, slot-based (pick one of N per slot), or parameters only.
- **The assist:** autodraw, "compose for me", trace-over guides, a symmetry or mirror, templates.
- **Output form:** PNG print, SVG, text, a link, an order, a physical product mock-up.
- **Time:** made in one sitting, or grown over days (046's plants that grow with a streak).

## Business uses

- A stationer's "write a letter" page on a typewriter, whose export is the card they print and post for you.
- A jeweller's engraving tool that stamps the visitor's words onto the real ring render in the chosen font, and passes that text to the basket.
- A florist's bouquet arranger with a curated stem vocabulary and a real price that updates as stems are added.
- A festival poster maker in the event's graphic system, where every export carries the date and ticket link.
- A paint brand's room palette composer, with a contrast checker, that exports a swatch card and a shopping list.
- A children's charity campaign where kids draw a star into a shared sky that grows over the campaign.

## Pitfalls

- A blank canvas on arrival. Open on a finished example and let the first touch take over.
- The canvas swallowing page scroll on phones. Apply `touch-action: none` only to the drawing surface, and leave a scrollable margin around it.
- Undo on every `pointermove`. Snapshot per gesture, or one stroke will need 200 presses of Undo.
- Storing pixels as the document. Resize, export and links break. Store the model.
- Exporting a screenshot of the on-screen canvas: wrong size, UI in the frame, DPR artefacts. Re-render from the model.
- A tool that can only be used with a mouse. Every action needs a keyboard route and a touch route, and freehand tools need a keyboard-friendly way to a good result.
- Too many controls. Keep 5–8 in view, and hide the rest behind a "more" disclosure. The artefact must stay bigger than the panel.
- Hints that promise gestures the device can't do (right-click on a phone). Swap the hint text by pointer type.
- Links that silently break for large documents. Measure the length, and fall back to export with an honest message.
- A pretty toy with no path to the business. Show the next step (order, send, book) beside Export.

## Signals (what a user might say)

- "I want customers to design their own…"
- "Can people personalise it before they buy?"
- "Let visitors make something and share it."
- "A 'build your own' page."
- "People should be able to play with it."
- "Like a gift card maker, but nicer."
- "Show them what their name or engraving would look like."
- "Try it before you buy."
- "Something fun for the campaign that people post."
- "Our workshop is about making things — the site should let you make something."
- "Pick the colours and see the result straight away."
- "Kids should be able to draw on it."

**Not this format if…**

- The visitor should just press a button and get a surprise, with no hand in the details. That is a [generative studio](generative-studio.md).
- The product is fixed and the page shows it working (a watch, a machine). That is an [instrument](instrument.md).
- The options are pure specifications (plan, size, quantity) with no visual output. A clear standard form serves better than a toy.
