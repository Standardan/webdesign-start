# Format: scroll journey (and pinned scenes)

**Load at:** Phase 4 or 5, when the paragraph describes a scroll journey, a pinned scene or a scroll-played explainer.

Most "scroll animation" sites fade sections in as they arrive. The benchmark scroll stories (an ocean descent, a lighthouse long-read, a kinetic manifesto, an exploded watch) work differently. **Scroll drives one number, and the whole world is calculated from that number every frame.** Nothing pops in. Things become visible for a reason that belongs to the world: light, depth, time, assembly.

There are two patterns. Use the **journey** when the whole page is one path. Use **pinned scenes** when a normal page needs one or two scroll-played set pieces.

---

## Pattern A: the journey (the whole page is one path)

Fits: a descent or ascent (ocean, mountain, atmosphere); time (a day in a bakery, a company's history, geological ages); scale (small to vast); layers (a product teardown, soil strata, a network stack); a process (bean to cup, idea to launch).

### Step 1: name the variable

Name the single continuous variable the reader travels along, with its unit: depth in metres, the hour, the year, altitude, layer number. **Every visual state must be derivable from this one number.** Decide how the reader sees its value: a gauge, a clock, a year counter, a scale readout. If you can't name the variable, you have a slideshow, not a journey. Use pinned scenes instead.

### Step 2: write the story table before any code

One row per beat: `{ at, kind, title, caption, visual }`.
- **4–7 zones:** named bands, each with a palette keyframe and a one-sentence thesis.
- **12–20 subjects:** things placed at exact values.
- **2–4 set pieces:** terrain, walls closing in, a sunrise, an exploded view.
- **A finale** that restates the end value at display size, with a return or replay action.

Aim for about one beat per 0.7–1 viewport height. Where emptiness is the point, keep something alive (drifting particles, distant blinks, a ticking counter).

### Step 3: author the pacing separately from the data

Give each band a chosen number of screens by **story density, not real magnitude**. Stretch rich bands and compress empty ones. Keep the gauge in true units, and say honestly when scroll distance is compressed.

```js
const SEGS = [ { v0: 0, v1: 200, screens: 2 }, { v0: 200, v1: 1000, screens: 2.6 },
               { v0: 1000, v1: 4000, screens: 4 }, { v0: 4000, v1: 11000, screens: 3.4 } ];
let segPx, segY;
function measure(vh) { let y = 0; segPx = SEGS.map(s => s.screens * vh); segY = segPx.map(p => (y += p) - p); return y; }
function valueToY(v) { for (let i = 0; i < SEGS.length; i++) { const s = SEGS[i];
  if (v <= s.v1) return segY[i] + (v - s.v0) / (s.v1 - s.v0) * segPx[i]; } return segY.at(-1) + segPx.at(-1); }
function yToValue(y) { for (let i = 0; i < SEGS.length; i++) { const s = SEGS[i];
  if (y <= segY[i] + segPx[i]) return s.v0 + Math.max(0, y - segY[i]) / segPx[i] * (s.v1 - s.v0); } return SEGS.at(-1).v1; }
```

### Step 4: place content in domain units

Write where each thing belongs *in the story*, and let layout turn that into pixels:
```html
<article class="subject" data-at="2560" data-at-mobile="2400" style="--x: 64; --w: min(30vw, 290px)">…</article>
```
```js
function layout() {
  const vh = innerHeight, total = measure(vh), mobile = innerWidth < 700;
  document.querySelectorAll('[data-at]').forEach(el => {
    const at = +(mobile && el.dataset.atMobile || el.dataset.at);
    el.style.top = INTRO * vh + valueToY(at) + 'px'; el._y = INTRO * vh + valueToY(at);
  });
  document.body.style.height = (INTRO + OUTRO) * vh + total + 'px';
}
```
Content scrolls natively. **Never move text with JavaScript.** Keep a safe area clear of any fixed gauge.

### Step 5: build a three-layer stage

1. A **fixed atmosphere** element whose background is a gradient from the colour at the value under the viewport's top edge to the colour under its bottom edge. The world then darkens or warms *within* the screen, continuously.
2. A **fixed effects canvas** (`pointer-events: none`) for light, particles and weather.
3. The **native-scroll content column**, plus a fixed **gauge**, and optionally a small reading-line marker at 35–45% of the viewport height.

### Step 6: one loop, derived state, no scroll listeners

```js
function frame(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  const y = scrollY, dy = y - lastY; lastY = y;
  const v = clamp(yToValue(y + innerHeight * .4 - INTRO * innerHeight), MIN, MAX);   // the reading line
  const bg = `linear-gradient(${colorAt(yToValue(y - INTRO*innerHeight))}, ${colorAt(yToValue(y + innerHeight - INTRO*innerHeight))})`;
  if (bg !== lastBg) atmosphere.style.background = lastBg = bg;
  updateGauge(v); updateSubjects(v, dt); drawEffects(v, dy, dt);
  raf = requestAnimationFrame(frame);
}
```
Every effect is a **smoothstep over a band** of the variable, and neighbouring bands overlap so effects cross-fade:
```js
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const rays = 1 - smooth(40, 380, v);   const dark = smooth(300, 900, v);
```
Feed `dy` into particles, weighted by their depth, so they sit in the world rather than on the glass.

### Step 7: reveal with a model, not a trigger

Give each subject a continuous value (`--lit`, `--age`, `--heat`, `--assembled`) computed from the world and eased every frame:
```js
const target = Math.max(ambient(s.at), torchNear(s), s.focused ? 1 : 0);
s.lit = approach(s.lit, target, 5, dt);
if (Math.abs(s.lit - s.shown) > .01) s.el.style.setProperty('--lit', (s.shown = s.lit).toFixed(3));
```
CSS maps it: `.subject .body { opacity: var(--lit) }`. Keep a subject's signature part outside the faded group so it survives (light organs in the dark, the one coloured layer, a glowing window). **Every pointer-driven reveal needs a touch and keyboard path**: raise subjects near the reading line automatically, and light them on focus.

### Step 8: a keyframed palette ramp

Use 8–12 colour stops in value space, not one colour per section. Front-load the stops where perception changes fastest. Accents come from the subject (bioluminescent green, lamplight amber). The interface can switch accent by zone with a class.

### Step 9: signature moments (plan at least four)

1. **A first frame that shows the axis itself:** a waterline cutting the title, a horizon, a clock at 3:00.
2. **A scale moment:** something huge relative to the viewport.
3. **A set piece at a band change:** walls converging, strata, sunrise.
4. **A human or narrative beat** near the end.
5. **The finale:** the gauge value repeated at display size.
6. **A return journey:** an eased, cancellable replay back to the start. Cancel it on any wheel, touch or key input. Under reduced motion, jump instead.

### Step 10: detail on demand

Make subjects real `<button>`s that open a small non-modal card: a fully revealed copy of the illustration, a label, a range chip and two or three careful sentences. Move focus in, return it on Escape, and close on an outside click.

### Step 11: harden it

- DPR at most 2; particle counts scaled to viewport area; glow sprites pre-rendered; typed arrays.
- Diff the DOM writes, and skip subjects more than about 300px off-screen.
- Pause on `visibilitychange` and clamp `dt`.
- Set viewport height from `innerHeight` into a `--vh` variable, and ignore height-only resizes under about 90px (the mobile URL bar). Keep the scroll position proportional when layout reruns.
- Reduced motion: stop CSS loops, slow and thin the canvas, jump instead of animating scroll, and keep the whole story readable.
- A skip link to the finale. On phones, the gauge collapses to a top bar.

---

## Pattern B: pinned scenes (set pieces inside a normal page)

Fits: "how it works", product anatomy, an exploded view, a dusk-to-night section, a manifesto told in beats.

```css
.scene { height: calc(var(--len, 300) * 1vh); position: relative; }
.stage { position: sticky; top: 0; height: 100svh; overflow: hidden; contain: paint; }
.static .scene { height: auto; } .static .stage { position: relative; height: auto; }  /* reduced-motion layout */
```
```js
function sceneProgress(scene) { const r = scene.getBoundingClientRect();
  return clamp(-r.top / (r.height - innerHeight), 0, 1); }
// in the single loop: read every scene's progress first, then write; smooth p toward target; render with transform/opacity only
```

Recipes for the scene body:
- **Palette scrub:** interpolate between keyframed colour arrays into CSS variables (dusk to night).
- **Assembly:** store each part's start offset in `data-*`, then ease it home with a staggered easeBack as progress rises. Reverse on scroll back.
- **Draw, then label:** once parts arrive, draw strokes with `pathLength="1"` and fade in the labels.
- **Readout:** a clock, counter or gauge that tracks the progress in real units.
- **Exploded view:** separate the layers along one axis in CSS 3D (`rotateX(60deg)` on the stage), and draw leader lines to labels.

Under reduced motion, add a class that un-pins the scenes and shows each one in its finished state.

---

## Rules that separate great scroll stories from fade-ins

1. **One continuous variable, not N sections.** The page is a scale model of the subject.
2. **Pacing is authored.** Map value to screens by story density, and disclose any compression.
3. **The environment changes continuously and the content scrolls natively.** No scrolljacking and no JavaScript-translated paragraphs.
4. **Sample state at the viewport's edges,** so the whole screen reads as one continuous world.
5. **Reveal with a model** (light, age, assembly), eased every frame, instead of add-a-class-and-fade-up.
6. **Give the reader an instrument:** a live gauge in real units with tabular numerals.
7. **Particles live in the world.** Feed scroll delta into them with depth-weighted parallax.
8. **Build a set piece at each band change, and resolve the ending** with a finale and a return.
9. **One loop, derived state, diffed writes,** paused when hidden, with a readable reduced-motion story.
10. **Every interaction has a non-pointer path.**

## Signals (what a user might say)

- "As you scroll it should go deeper / higher / through the years."
- "Take people on a journey."
- "Tell our story from the beginning to today."
- "Show how it's made, step by step, from start to finish."
- "Like those Apple pages where things happen as you scroll."
- "From the farm to your cup" / "from the seed to the bottle."
- "A day in the life of…"
- "Scroll animations" (ask what should change as you scroll: that answer is the variable).

**Not this format if:** there's no natural path (use pinned scenes inside another format); visitors need to jump straight to information; or the content is a collection to browse rather than a sequence.
