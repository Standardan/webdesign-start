# Techniques: recipes for crafted visuals

**Load at:** Phases 4 and 5. Use the section you need, not the whole file.

These are compact, original recipes for the techniques that recur in the benchmark gallery. Adapt names, values and colours to the Creative Direction Paragraph, since every value here is only an example. Gallery page numbers point to live examples (see `research.md`).

## Contents

1. [Foundations](#1-foundations): loop, smoothing, springs, seeded random, reduced motion, canvas setup
2. [Texture](#2-texture): grain, tinted paper noise, hand-drawn wobble, wood, stamps
3. [Light and glass](#3-light-and-glass): glass hairlines, pointer spotlight, glow sprites, fixed specular, foil sweep
4. [Drawn illustration](#4-drawn-illustration): scenes with a camera, layered depth, self-drawing lines, steam
5. [Type as image](#5-type-as-image): fitted display type, art-lit headlines, split headlines, drawn numerals, odometers
6. [Motion and transitions](#6-motion-and-transitions): reveals, retheming, expand-from-tile, iris wipe, particles that avoid text
7. [Signature objects](#7-signature-objects): tilt with glare, foil layers, reveal ritual
8. [Canvas performance](#8-canvas-performance)

---

## 1. Foundations

**One animation loop, paused when hidden, with a clamped time step.**
```js
let raf = 0, last = 0;
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  update(dt); draw();
  raf = requestAnimationFrame(frame);
}
function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
function stop() { cancelAnimationFrame(raf); raf = 0; }
document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
start();
```
Also stop loops for elements that are off-screen, using an `IntersectionObserver` flag.

**Frame-rate-independent smoothing** (use instead of `x += (t - x) * 0.1`):
```js
const approach = (x, target, rate, dt) => x + (target - x) * (1 - Math.exp(-rate * dt));
```

**A damped spring**, for anything the user pushes (tilt, a swinging tag, a needle):
```js
function spring(s, target, dt, k = 170, c = 16) {   // s = {x, v}
  const a = -k * (s.x - target) - c * s.v;
  s.v += a * dt; s.x += s.v * dt; return s.x;
}
```
Use k≈150–200 and c≈14–18 for a lively settle. Raise c toward critical damping (c ≈ 2√k) for calm or reduced-motion variants.

**Seeded randomness**, so the first frame is identical on every load:
```js
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0;
  let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rand = rng(1983);
```

**Reduced motion, read live:**
```js
const rm = matchMedia('(prefers-reduced-motion: reduce)');
let calm = rm.matches; rm.addEventListener('change', e => { calm = e.matches; applyMotionMode(); });
```

**Canvas sized to its container, with DPR capped at 2:**
```js
function fit(canvas, ctx) {
  const r = canvas.parentElement.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
  canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
  canvas.style.width = r.width + 'px'; canvas.style.height = r.height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); rebuildSprites();
}
new ResizeObserver(() => fit(cv, ctx)).observe(cv.parentElement);
```

**Pre-warm** simulations for about 100–150ms before the first paint, so the page never opens empty.

---

## 2. Texture

**Grain tile generated once and used as a CSS variable** (film or paper tooth). Seen on most gallery pages.
```js
const n = document.createElement('canvas'); n.width = n.height = 160;
const g = n.getContext('2d'), img = g.createImageData(160, 160);
for (let i = 0; i < img.data.length; i += 4) {
  const v = 110 + Math.random() * 90; img.data[i] = img.data[i+1] = img.data[i+2] = v; img.data[i+3] = 255;
}
g.putImageData(img, 0, 0);
document.documentElement.style.setProperty('--grain', `url(${n.toDataURL()})`);
```
```css
.surface::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: var(--grain); background-size: 160px; opacity: .08; mix-blend-mode: multiply; }
```

**Tinted paper noise with no JavaScript** (feTurbulence, tinted toward the palette's darkest colour through the matrix's last column):
```html
<svg class="paper" aria-hidden="true"><filter id="paper">
  <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/>
  <feColorMatrix values="0 0 0 0 .16  0 0 0 0 .11  0 0 0 0 .08  0 0 0 .5 0"/>
</filter><rect width="100%" height="100%" filter="url(#paper)"/></svg>
```
```css
.paper { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: .14; mix-blend-mode: multiply; }
```

**Hand-drawn wobble** for line art (ink on paper). Keep animated parts in a separate SVG so the filter never repaints (040, 087).
```html
<filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter>
```
For a "line boil" on hover, make three copies with seeds 4, 11 and 27 and cycle them with `animation: boil .36s steps(1) infinite`.

**Procedural wood grain.** Long x frequency and short y frequency give the grain direction (057, 070).
```html
<filter id="wood" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".003 .07" numOctaves="4" seed="9"/>
  <feColorMatrix values=".62 0 0 0 .05  .40 0 0 0 .02  .26 0 0 0 0  0 0 0 0 1"/>
</filter>
```

**Worn stamp or seal.** Noise eats holes in the ink, and a small displacement roughens the edge (006, 011).
```html
<filter id="worn"><feTurbulence type="fractalNoise" baseFrequency=".85" result="n"/>
  <feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -6 4.5" result="holes"/>
  <feComposite in="SourceGraphic" in2="holes" operator="in"/></filter>
```
```css
.stamp { filter: url(#worn); rotate: -7deg; mix-blend-mode: multiply; border: 3px double currentColor; }
```

**Paper depth grammar** for cut-paper and layered scenes (018): each plane gets a larger, softer, warm-tinted shadow and a 1px light rim on its lit edge.
```css
.plane { filter: drop-shadow(0 calc(var(--z) * 2px) calc(var(--z) * 3px) rgb(70 40 20 / .28)); }
.plane path.edge { stroke: rgb(255 250 235 / .5); stroke-width: 1; }
/* --z: 1 at the back … 9 at the front; merge same-colour shapes per plane into one path */
```

---

## 3. Light and glass

**Glass with a gradient hairline edge.** Use it only over a living background, because glass on a flat colour is the generic look (001, 012).
```css
.glass { position: relative; background: rgb(255 255 255 / .07); backdrop-filter: blur(22px) saturate(1.4);
  border-radius: 22px; box-shadow: 0 22px 48px -30px rgb(10 20 40 / .6), inset 0 1px 0 rgb(255 255 255 / .25); }
.glass::before { content: ""; position: absolute; inset: 0; padding: 1px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(155deg, rgb(255 255 255 / .5), rgb(255 255 255 / .06) 30%, rgb(255 255 255 / .02) 60%, rgb(255 255 255 / .22));
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
```

**Pointer spotlight with a lit rim** for cards and tiles. Mouse only; touch gets the plain card (068).
```css
.tile { --mx: -999px; --my: -999px; position: relative; isolation: isolate; }
.tile::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  background: radial-gradient(340px circle at var(--mx) var(--my), rgb(var(--accent-rgb) / .14), transparent 45%); }
.tile::after { content: ""; position: absolute; inset: 0; padding: 1px; border-radius: inherit; pointer-events: none;
  background: radial-gradient(240px circle at var(--mx) var(--my), rgb(var(--accent-rgb) / .6), transparent 45%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
```
```js
grid.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return;
  for (const t of tiles) { const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', e.clientX - r.left + 'px'); t.style.setProperty('--my', e.clientY - r.top + 'px'); } });
```

**Additive glow sprites**, pre-rendered once and stamped (sun, stars, bioluminescence, lamps):
```js
function glowSprite(r, rgb) { const c = document.createElement('canvas'); c.width = c.height = r * 2;
  const g = c.getContext('2d'), grd = g.createRadialGradient(r, r, 0, r, r, r);
  grd.addColorStop(0, `rgb(${rgb} / 1)`); grd.addColorStop(.35, `rgb(${rgb} / .35)`); grd.addColorStop(1, `rgb(${rgb} / 0)`);
  g.fillStyle = grd; g.fillRect(0, 0, r * 2, r * 2); return c; }
ctx.globalCompositeOperation = 'lighter';
for (const p of lights) { ctx.globalAlpha = p.a; ctx.drawImage(sprite, p.x - 32, p.y - 32); }
ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
```
For soft light fields (aurora, fog, rays), draw at quarter resolution and upscale. The upscale blurs for free.

**Fixed specular on a moving surface.** The record spins but the reflection stays put, and that is what makes it read as physical (057).
```css
.disc { animation: spin 1.8s linear infinite; }
.disc-specular { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; mix-blend-mode: screen;
  background: conic-gradient(from 10deg, #0000 0 20deg, #fff3 34deg, #0000 60deg 200deg, #fff2 220deg, #0000 245deg); }
```

**Occasional foil glint on type.** A long hold, then a sweep, so it catches the light instead of shimmering all the time (015).
```css
.foil { background: linear-gradient(100deg, #8a6a1e, #d9b44a 25%, #fff4d0 45%, #d9b44a 65%, #8a6a1e) 100% 0 / 260% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent; animation: glint 10s cubic-bezier(.6,0,.2,1) infinite; }
@keyframes glint { 0%, 60% { background-position: 100% 0 } 100% { background-position: -60% 0 } }
@media (prefers-reduced-motion: reduce) { .foil { animation: none; background-position: 40% 0; } }
```

**Room lighting from one variable** (a lamp, a fire, a sign) (051, 062):
```css
.room-dark { background: #1b1430; mix-blend-mode: multiply; opacity: calc(.1 + (1 - var(--lamp)) * .55); }
.room-glow { background: radial-gradient(40vmax 45vmax at 30% 40%, rgb(255 180 90 / .6), transparent 70%);
  mix-blend-mode: screen; opacity: var(--lamp); }
```

---

## 4. Drawn illustration

**A scene with a camera.** Draw one SVG larger than any frame, then choose the crop per aspect band so the focal subject and copy area land deliberately (008, 051, 098).
```js
const FOCUS = { x: 1180, y: 520 };                       // e.g. the lamp, in scene units
function frameScene() {
  const ar = innerWidth / innerHeight;
  const [w, fx, fy] = ar > 1.5 ? [1600, .72, .45] : ar > .9 ? [1250, .66, .42] : [760, .62, .34];
  const h = w / ar, x = FOCUS.x - w * fx, y = FOCUS.y - h * fy;
  svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);    // paint scene beyond these bounds
}
addEventListener('resize', frameScene); frameScene();
```

**Illustrating from primitives.** For a product or object (a cup, a jar, a bottle, a watch):
- Use 3–6 gradient stops per surface along the light direction, plus a darker shadow strip.
- Draw one rim highlight path on the lit edge.
- Add a separate contact-shadow ellipse on the ground.
- Add speckle or noise for material.
- Build repeated features (flutes, indices, ridges) in a JavaScript loop.
- Fake perspective on flat art with `scale(1, .3)`.

**Seeded generators for natural forms** (ridges, trees, ferns, waves). Write 10–30 lines each, with an edge jitter whose amplitude scales with object size, like real scissors or a real hand:
```js
function ridge(y0, amp, seed) { const r = rng(seed); let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += 8) d += ` L${x} ${y0 - amp * (Math.sin(x * .004 + r() * 6) * .6 + Math.sin(x * .013) * .3 + r() * .1)}`;
  return d + ` L${W} ${H}Z`; }
```

**Self-drawing lines with `pathLength="1"`.** The delay is the distance from the start, so ink moves at one speed (011, 015, 056, 085).
```css
.draw path { stroke-dasharray: 1 2; stroke-dashoffset: 1.01;
  transition: stroke-dashoffset var(--t, 1.2s) cubic-bezier(.45,.1,.3,1) var(--d, 0s); }
.in .draw path { stroke-dashoffset: 0; }
.draw .fill { opacity: 0; transition: opacity .8s 1s; } .in .draw .fill { opacity: 1; }
```
```js
paths.forEach(p => { p.setAttribute('pathLength', 1); p.style.setProperty('--d', (p.dataset.order * .08) + 's'); });
```

**Steam or smoke.** Thick round-cap strokes displaced by slowly changing turbulence, plus a rise-and-fade loop per plume (035).
```html
<filter id="steam" x="-60%" y="-40%" width="220%" height="180%">
  <feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="2">
    <animate attributeName="baseFrequency" dur="11s" values=".012 .03;.016 .042;.012 .03" repeatCount="indefinite"/></feTurbulence>
  <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="5"/></filter>
```

**Two compositions in one drawing.** For heavily illustrated heroes, author a landscape and a portrait arrangement (different positions and counts) and switch by aspect, rather than scaling one (018, 051).

---

## 5. Type as image

**Display type fitted to its real ink edges**, so system fonts sit exactly on grid lines (003, 014):
```js
function fitWord(el, word, stack, width) {
  const c = document.createElement('canvas').getContext('2d'); c.font = `800 100px ${stack}`;
  const m = c.measureText(word), ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  el.style.fontSize = (width / ink) * 100 + 'px'; el.style.marginLeft = -(m.actualBoundingBoxLeft / 100) + 'em';
}
```

**A headline lit by the art.** Keep an `aria-hidden` duplicate styled as the "lit" state, and clip it each frame to the shape of the light (008):
```js
const [ax, ay] = beamOriginInHeadlineCoords(), spread = .12;
const pts = [[ax, ay], [ax + Math.cos(angle - spread) * 3000, ay + Math.sin(angle - spread) * 3000],
             [ax + Math.cos(angle + spread) * 3000, ay + Math.sin(angle + spread) * 3000]];
lit.style.clipPath = `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(',')})`;
```

**A headline split by the scene** (a waterline, a horizon, a fold). Use two copies clipped to either side, and let the lower one move (022):
```css
.title { position: relative; } .title span { position: absolute; inset: 0; }
.title .above { clip-path: inset(0 0 calc(100% - var(--line)) 0); }
.title .below { clip-path: inset(var(--line) 0 0 0); color: var(--water-ink); animation: sway 6s ease-in-out infinite; }
@keyframes sway { 50% { transform: skewX(-3deg) scaleY(1.03); } }
```

**Type layered with the subject**: word behind, figure, word in front, with `mix-blend-mode: multiply` on the front word (043).

**Condensed display from any serif** with SVG `textLength` (077):
```html
<svg viewBox="0 0 1000 160" role="img" aria-label="The Glass Alibi">
  <text x="500" y="130" text-anchor="middle" textLength="960" lengthAdjust="spacingAndGlyphs" font-size="150">THE GLASS ALIBI</text></svg>
```

**Drawn numerals or wordmarks** as SVG paths with `pathLength="1"`, animated in on change (012). Keep the value in visible text for screen readers, or give it an `aria-label`.

**Odometer digits** for counts and stats, rolling to the value instead of tweening it (003, 047):
```css
.digit { display: inline-block; height: 1em; overflow: hidden; } .digit i { display: block; transition: transform 1.2s cubic-bezier(.2,.8,.2,1); }
```
```js
digitEl.firstElementChild.style.transform = `translateY(${-n}em)`; // column holds 0–9 stacked
```
Use `font-variant-numeric: tabular-nums` on every changing number.

**Per-letter kinetic type.** Wrap each letter in a span with `--i`, give the parent an `aria-label`, and give the spans `aria-hidden="true"` (014).

---

## 6. Motion and transitions

**Reveals on the individual `translate` property**, so hover `transform` never fights the entrance (068):
```css
.js .reveal { opacity: 0; translate: 0 24px; }
.js .reveal.in { opacity: 1; translate: 0 0; transition: opacity .9s, translate 1.1s cubic-bezier(.18,.7,.16,1); transition-delay: calc(var(--i, 0) * 90ms); }
```
Reveal with a reason that belongs to the world (assembly, ink, light, growth) wherever you can. A plain fade-up is the fallback, not the signature.

**Whole-page retheme by state**, with registered colour tokens that can animate (012, 031):
```css
@property --ground { syntax: '<color>'; inherits: true; initial-value: #f4eee2; }
@property --ink { syntax: '<color>'; inherits: true; initial-value: #2a2622; }
:root { transition: --ground .9s ease, --ink .9s ease; background: var(--ground); color: var(--ink); }
[data-state="night"] { --ground: #0d1226; --ink: #e9e4d8; }
```

**Expand from tile to full screen.** The card grows from its exact rectangle into a case study (068):
```js
const inset = r => `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 20px)`;
panel.hidden = false; panel.style.clipPath = inset(tile.getBoundingClientRect());
requestAnimationFrame(() => { panel.style.transition = 'clip-path .7s cubic-bezier(.7,0,.2,1)'; panel.style.clipPath = 'inset(0 0 0 0 round 0)'; });
// reduced motion: skip straight to the open state; move focus into the panel; Escape returns focus to the tile
```

**Iris wipe** between scenes (077):
```js
el.animate([{ clipPath: 'circle(100% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)' }],
  { duration: 700, easing: 'cubic-bezier(.6,0,.4,1)', fill: 'forwards' });
```

**Stagger as story order.** Diagonal waves, reading order or drafting order through `--i` or `calc(var(--row) + var(--col))` delays (056, 090).

**Ambient particles that avoid the copy.** Mark text blocks `data-clear` and spawn particles outside their rectangles (082). Scale counts to the viewport area and thin them under reduced motion.

**Vertical scroll driving a horizontal track** (043): set the section height to `track.scrollWidth - innerWidth + innerHeight`, pin the stage with `position: sticky`, and translate the track by the section's scroll progress. On phones, use a plain vertical list.

**Pinned scenes and journeys:** see `formats/scroll-journey.md`.

---

## 7. Signature objects

For business sites, give **one object per page** (membership card, product, pricing plan, gift card) the full tactile treatment and keep the rest calm (032).

**Tilt with glare driven by the spring, not the pointer.** Keyboard, idle and touch motion then all light correctly:
```js
const S = { rx: { x: 0, v: 0 }, ry: { x: 0, v: 0 } }; let target = { rx: 0, ry: 0 };
card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
  target = { rx: (.5 - py) * 20, ry: (px - .5) * 24 }; });          // cap at ±12° on business sites
card.addEventListener('pointerleave', () => target = { rx: 0, ry: 0 });
function tick(dt) { const rx = spring(S.rx, target.rx, dt), ry = spring(S.ry, target.ry, dt);
  card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  card.style.setProperty('--lx', 50 + ry * 3 + '%'); card.style.setProperty('--ly', 50 - rx * 3 + '%');
  card.style.setProperty('--tilt', Math.min(1, Math.hypot(rx, ry) / 16)); }
```

**Foil in four layers**, strength growing with tilt:
- (a) a static metallic base gradient;
- (b) an oversized repeating gradient in 2–3 brand hues, moved by `--lx/--ly`, in `color-dodge`;
- (c) a fine hatch or noise in `overlay`;
- (d) a radial glare at `--lx/--ly` in `overlay`.

Keep foil opacity near `.2 + var(--tilt) * .4` and below about .6.

**Embossed type and seals** with four shadows that scale in `em`:
```css
.emboss { text-shadow: 0 .08em .05em rgb(255 255 255 / .7), 0 -.06em .08em rgb(0 0 0 / .45); }
.seal { box-shadow: inset 0 .08em 0 rgb(255 255 255 / .3), inset 0 -.14em .28em rgb(0 0 0 / .45); }
```

**Reveal ritual** (a pack opening, a product unboxing, a plan upgrade). Keep it under about 2.5s on business sites:
1. exit the old state (ease-in, ~300ms);
2. the container enters with overshoot (~600ms);
3. anticipation: a small wobble and a shimmer (~400ms);
4. the break: a clip-path split along one shared jagged path, so the halves fit;
5. the object emerges from behind (strong ease-out);
6. one payoff (a soft flash or a small particle ring);
7. a settle with a spring impulse;
8. an `aria-live` announcement.

Guard it with a busy flag, keep it skippable, trigger it only by an explicit action, and never hide content behind it.

**Secondary responders:** a contact shadow that shifts opposite to the tilt and shrinks with lift, and a soft halo whose opacity tracks the tilt.

---

## 8. Canvas performance

- Pre-render glows, stars, stitches and static layers to offscreen canvases. Per frame, only `drawImage`.
- Keep particle state in typed arrays or ring buffers with no allocation per frame. Batch same-coloured strokes into one path.
- Scale particle counts to the viewport area (for example `W * H / 6000`, clamped).
- Re-bake static layers on a debounced resize (about 80–150ms), never per frame.
- Diff DOM writes: set a style only when the rounded value changes.
- Use `contain: paint` on stages. Keep heavy SVG filters on static layers.
- Skip updates for off-screen elements, and stop loops entirely when nothing is visible.
- Test on a throttled mobile profile. Blend modes and masks over large areas repaint every frame.
