# Format: poster / type-led

**Load when:** the concept is a poster, a manifesto, a sign, a zine spread or a title sequence, and the *letters themselves* are the hero. Giant type is the architecture; a strict grid holds it; motion, collage or corruption gives it a voice. Fits studios, agencies, events and festivals, launches, record labels, architects, artists, and bold brands with something short and loud to say.

**Study:** gallery 003 (Raster, a Swiss poster that recomposes itself), 006 (Loud House, a neo-brutalist zine), 014 (Move, a scroll-played manifesto). Also 054 (Elastic, letters made of sprung points), 058 (Radical Shapes, a Memphis festival), 081 (Signal/Noise, a controlled-glitch portfolio), 096 (Monolith, concrete slabs and a huge grotesk).

## Five variants

- **Grid poster (003, 096):** one sheet on a visible modular grid, one giant word or numeral, small flush-left text, geometric elements in cells. Severe and quiet, or severe and red.
- **Zine collage (006, 058):** stacked, tilted blocks with thick borders, hard offset shadows, stickers, stamps and a marquee. Loud, but a 12- or 16-column grid sits underneath every piece.
- **Kinetic manifesto (014):** a few short statements, each a pinned full-screen scene whose typographic motion is played by scroll.
- **Type as material (054):** the word is turned into points, filaments or particles that react to the pointer and spring home.
- **Controlled corruption (081):** RGB split, slice displacement and tear events in bursts, with calm between them and a "stabilize" switch.

## What makes it work

Scale contrast does the design. One word fills 40–70% of the first frame, measured to its real ink edges so it sits exactly on grid lines; everything else is 10–14px, tracked labels, and a column of body text. There is no mid-size layer. The grid is visible or nearly visible (hairlines, column numbers, a toggle), so even the chaotic variants read as *composed*. Every page carries print-shop detail: an edition number, a sheet size, a date and time, a venue, "Eintritt frei", "sheet 3 of 7".

## Architecture

1. **Compute the grid, don't hard-code it.** Derive columns, gutter and margin from the viewport; switch to 6 columns (or 4) in portrait. Make rows roughly square to the column width so circles and bars stay true. Expose the grid (`G` key or toggle) as hairlines.
2. **Fit the display word to its ink** (`techniques.md` §5, `fitWord`) and snap its left edge to a column line. Pick words with good shapes; test the longest one at 390 wide.
3. **Place type in zones.** Reserve cells for the text blocks first (headline, date, body, meta), then let geometry fill the remaining cells. Nothing geometric may cross a text zone unless it multiplies underneath legibly.
4. **Palette of two or three inks** plus paper: signal red and black on off-white; cobalt, yellow and one hot pink; black, white and RGB channels. An `invert` state swaps paper and ink and must look designed, not just flipped.
5. **One voice of motion per variant:**
   - grid poster: recompose on click/Space from a seed, with FLIP transitions;
   - zine: press-down buttons, a draggable sticker, a marquee strip, stamps that thunk in;
   - manifesto: sticky scenes, each with one named move (assemble, stretch, split, cascade, rotate, type, zoom-through);
   - material: spring physics with pointer force;
   - corruption: burst scheduler with stable periods.
6. **Metadata voice:** mono or small-caps labels for scene numbers ("SC. 03 / 07"), coordinates, timecode, seed ("No. 0417"), sheet size and print method. This is where the world detail lives.
7. **Secondary content keeps the poster grammar.** Tracklists as ruled tables, tour dates with rotated SOLD OUT stamps, lineups as numbered cards on the same grid, project data as caption blocks (location, year, m²).
8. **A calm switch:** `Motion off`, `Stabilize` or `Static` in the header, defaulting on under `prefers-reduced-motion`. The static poster must be a finished poster.

## Key mechanics

```js
// modular grid from the viewport; square-ish rows; 6 columns on portrait phones
function grid(W, H) {
  const portrait = W < 640 || W / H < .82, cols = portrait ? 6 : 12;
  const m = Math.round(Math.min(64, Math.max(16, Math.min(W, H) * .045)));
  const g = Math.round(Math.min(20, Math.max(8, W * .012)));
  const cw = (W - 2 * m - (cols - 1) * g) / cols;
  const rows = Math.max(4, Math.round((H - 2 * m + g) / (cw + g)));
  const rh = (H - 2 * m - (rows - 1) * g) / rows;
  const cell = (c, r, w = 1, h = 1) => ({ x: m + c * (cw + g), y: m + r * (rh + g),
    w: w * cw + (w - 1) * g, h: h * rh + (h - 1) * g });
  return { cols, rows, cell };
}
```

```js
// recompose with FLIP: measure, re-layout from a new seed, animate the difference
function recompose(seed) {
  const before = new Map(items.map(el => [el, el.getBoundingClientRect()]));
  layout(mulberry32(seed));                       // writes new left/top (and the `rotate` property) to each item
  for (const el of items) { const a = before.get(el), b = el.getBoundingClientRect();
    el.animate([{ transform: `translate(${a.left - b.left}px,${a.top - b.top}px)` }, { transform: 'none' }],
      { duration: reduced ? 0 : 700, easing: 'cubic-bezier(.7,0,.2,1)' }); }
  edition.textContent = 'No. ' + String(seed % 10000).padStart(4, '0');
}
```

```js
// scroll-played scenes: each sticky scene gets p in 0..1; ease toward it; render only visible ones
function tick() {
  for (const s of scenes) { const r = s.el.getBoundingClientRect(), span = r.height - innerHeight;
    const target = Math.min(1, Math.max(0, -r.top / span));
    s.p += (target - s.p) * (reduced ? 1 : .2);
    if (r.bottom > 0 && r.top < innerHeight) s.render(s.p); }   // e.g. stretch: scaleX(1 + 3 * seg(p, .2, .8))
  requestAnimationFrame(tick);
}
const seg = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
```

```css
/* zine press: the hard shadow collapses as the block moves into it */
.block { border: 4px solid var(--ink); box-shadow: 8px 8px 0 var(--ink); transition: transform .08s, box-shadow .08s; }
.block:is(:hover, :focus-visible) { transform: translate(3px, 3px); box-shadow: 5px 5px 0 var(--ink); }
.block:active { transform: translate(8px, 8px); box-shadow: 0 0 0 var(--ink); }
.stamp { rotate: -9deg; border: 3px double currentColor; mix-blend-mode: multiply; }
```

```js
// controlled corruption: short bursts, long calm, hover intensifies, "stabilize" wins
function glitchStep(t) {
  if (stable) return calm();
  if (t > nextBurst) { burstEnd = t + .15 + Math.random() * .35; nextBurst = burstEnd + 1.5 + Math.random() * 3; }
  if (hover || t < burstEnd) slice(hover ? .9 : .5);   // redraw N horizontal bands, offset x, split R/G/B by 2–6px
  else calm();                                          // one clean band: the readable headline
}
```

For type-as-material (054): draw the word on an offscreen canvas, read `getImageData`, keep every *n*th filled pixel as a point with a home position, and choose *n* from the canvas area so the point count stays within budget (roughly 1,500–3,000). Integrate springs with damping per frame; colour by speed.

## Variation levers

- **Style anchor:** Swiss International Style, Soviet constructivism, 1970s supergraphics, Memphis 1986, 1990s rave flyer, photocopied punk zine, brutalist concrete, broadcast title card.
- **Grid visibility:** hidden, hairlines on a toggle, printed column numbers, a ruler strip, full graph paper.
- **The word's behaviour:** static and huge, recomposed, scroll-played, springy, corrupted, lit, split by a line.
- **Ink count:** one colour plus black, three flat inks, RGB channels, material greys plus one oxide accent.
- **Collage density:** a single sheet, a few overlapping blocks, a full pasted-up spread.

## Business uses

- A design studio whose homepage is a poster that recomposes each visit, with the edition number as a shareable permalink.
- A music festival or record label with a zine-style lineup, stamped sell-outs and a marquee of acts.
- A product launch told as a seven-line manifesto, one scroll scene per claim, ending on the signup.
- An architecture practice with slab-like type, precise project data and one living drawing.
- A type foundry or brand agency where the visitor can type a word and push it around.

## Signals (what a user might say)

- "I want it loud." / "Make it shout."
- "Like a concert poster" or "like a gig flyer."
- "Big, bold words. Hardly any pictures."
- "We're a design studio, it has to look designed."
- "Something like a magazine cover or a zine."
- "Swiss / Bauhaus / Helvetica vibe."
- "Punk", "raw", "DIY", "photocopied".
- "We've got one big message and a date."
- "It should feel like a manifesto."
- "Glitchy", "broken on purpose", "techno".
- "Brutalist", "concrete", "stark black and white".
- "When people scroll I want the words to move."

**Not this format if…**
- The site's job is to show many products, rooms or photographs; a collection, scene or editorial format will serve the pictures better.
- The audience needs reassurance and long reading (clinics, legal, care services); loud type reads as aggressive there. Borrow one poster section at most.
- There is no short, strong line to set huge. Poster type amplifies copy; it can't invent it.

## Pitfalls

- A giant word that breaks mid-letter or overflows at 390 wide. Fit to ink per breakpoint and test the longest real word.
- Chaos without a grid. If blocks don't snap to columns, collage reads as broken, not bold.
- Recomposition that puts shapes over text, or a seed that produces an ugly sheet. Reserve text zones and reject layouts that fail a simple overlap check.
- Headlines split into per-letter spans without an `aria-label` on the parent, so screen readers spell them out.
- Glitch, flicker and tear effects without a stable mode, or flashing faster than three times a second. Default to stable under reduced motion.
- Scroll scenes that fight the scrollbar (scroll-jacking) or leave blank screens while a scene is pinned. Let native scroll drive progress, and keep text readable at every `p`.
- Hard black borders and shadows at 4px on a phone eating the layout. Scale borders and offsets down with the viewport.
