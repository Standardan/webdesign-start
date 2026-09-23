# Format: instrument (the object is the page)

**Load when:** the concept is a device, mechanism or product shown as the page itself: a watch, a turntable, a console, a synth, a pendulum array, a configurator. It fits hardware and products, tools, luxury objects, and SaaS with a strong mechanical metaphor.

**Study:** gallery 017 (Harmonia pendulum wave). Also 024 (luxury watch), 057 (vinyl listening room), 007 (synth), 090 (word clock).

## What makes it work

The page is not *about* the object. The page is the object plus its console. The subject fills 70–80% of the first viewport, lit and alive. Every other element is either a **true live reading** of the object or a **control** for it. There are no sections, no cards and no mid-size headings.

## Architecture

1. **Two-zone layout:** a stage above and a console below, filling the viewport.
   ```css
   .app { display: grid; grid-template-rows: minmax(0, 1fr) auto; height: 100dvh; }
   ```
   The brand sits small in a stage corner with `pointer-events: none`. Longer content (specs, story, buying) can follow below the fold, but the first screen is the instrument.
2. **Model the subject as a function of time or state:** `value = f(t)` rather than accumulated simulation, wherever possible. Scrubbing, trails, exact loops and resets then come free, with no drift.
3. **Render the object** in canvas or SVG with a simple camera. Project its bounding points each frame and fit them into the free area below the measured overlays. Change the camera *angle*, not just the scale, with aspect ratio.
4. **Fake the world cheaply:** a vignette, a soft bloom behind the subject, light pools on an implied floor, a rim light, one procedural material (brushed metal, lacquer, walnut), and a specular band that moves with the camera.
5. **Console as hardware:**
   - 10–11px uppercase mono labels tracked at 0.15–0.2em;
   - 1px hairline boxes with a 2px radius and no fills;
   - an LED dot for "on", driven by `aria-pressed`;
   - detents on rate controls;
   - `<kbd>` hints for shortcuts that only work while the instrument has focus.
6. **Readings:** live values with units and tabular numerals, the governing formula or spec shown as a small plate, and a timeline annotated with the subject's named phases.
7. **A second, abstract view** of the same state (a dial, an orrery, a phase diagram). It doubles as ornament and explanation.
8. **A first frame and a ritual:** start at the most beautiful moment (mid-pattern, at 10:10, needle down), not at zero. Stage the primary action in beats: gather, hold, release.

## Key mechanics

```js
// closed-form state: any t is instantly renderable (scrub, trails, replay)
const angle = (i, t) => A0 * Math.cos(2 * Math.PI * t / period(i));
function drawTrail(i, t) { ctx.beginPath();
  for (let k = 0; k < 48; k++) { const tk = t - k * .03; const [x, y] = project(bob(i, angle(i, tk)));
    k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
```

```js
// fit the projected object into the free stage area every frame
const pts = corners.map(project), b = bounds(pts);
const s = Math.min(freeW / b.w, freeH / b.h) * .9;
camera.scale *= s; camera.cx += (freeCx - (b.x + b.w / 2)); camera.cy += (freeCy - (b.y + b.h / 2));
```

```css
.toggle { border: 1px solid var(--hair); border-radius: 2px; font: 500 10.5px/1 var(--mono); letter-spacing: .18em; text-transform: uppercase; }
.toggle::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--led-off); }
.toggle[aria-pressed="true"]::before { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
.value { font-variant-numeric: tabular-nums; font-weight: 300; font-size: 1.6em; }   /* values bigger and lighter than labels */
```

## Variation levers

- **The object:** a mechanical, optical, musical, horological, culinary or architectural model.
- **The material:** brass, brushed steel, walnut, bakelite, glass, paper.
- **The console genre:** a studio mixer, a lab bench, a cockpit, a vintage radio, a darkroom timer.
- **Lighting:** a dark studio with glows, or a daylight bench with soft shadows.
- **The ritual:** release, wind, drop the needle, open the aperture.

## Business uses

- A watch or jewellery brand whose watch shows the real time and has an exploded view.
- A coffee grinder product page where the grind-size dial changes the drawn grounds and the brew recommendation.
- A SaaS scheduling tool shown as an elegant mechanical calendar.
- A hi-fi shop with a turntable that plays short synthesised tones.

## Pitfalls

- Label collisions in alternate views (top view, zoomed) and at 1200–1440px widths. Check every view.
- Muted console text below 4.5:1 contrast.
- Hard-coded timeline bands. Derive them from the model.
- Single-key global shortcuts. Scope them to the focused instrument.
- Sound without rate limiting. Use a token bucket, keep it off by default, and flash the element that sounds.

## Signals (what a user might say)

- "Show how the product actually works."
- "It's a precision thing, like a watch."
- "Let people play with it / tweak it."
- "Engineering", "mechanism", "the inner workings."
- "Our product is beautiful as an object."
- "Like a piece of lab equipment" / "like a mixing desk."
- "Numbers matter to our customers."
- "I want it to feel expensive and exact."

**Not this format if:** there's no physical or mechanical object to model; the audience needs lots of reading or browsing; or the object only matters as one section (put an instrument section inside a product showcase instead).
