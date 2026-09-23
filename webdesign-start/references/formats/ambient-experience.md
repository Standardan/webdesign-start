# Format: ambient experience

**Load when:** the page's job is a *feeling* rather than a pitch: a calm or hypnotic full-screen piece the visitor mostly watches, gently touches, or breathes along with (ink in water, rain on a window, raked sand, a day passing over mountains, a breathing orb, a field that moves to music). Fits wellness and spas, meditation and sleep products, musicians and labels, galleries, coming-soon and holding pages, 404 pages, and brand-mood pages.

**Study:** gallery 005 (Sumi, ink in water), 041 (Midnight Window, rain on fogged glass), 059 (Karesansui, a raked sand garden), 001 (Stillwater, a breathing orb over aurora). Also 091 (alpenglow day cycle), 026 (Pulse, audio-reactive bloom), 067 (ASCII tides), 037 (frost garden growth), 074 (soap bubbles), 078 (fractal tree seasons), 079 (pulsar ridges), 094 (watercolour landscapes), 099 (Droste infinite zoom), 002 (neon rain) and 073 (living circuit board).

**How it differs from the single-screen art piece:** an art piece is an object to admire and play with. An ambient experience is a *state to be in*. It keeps running with nobody touching it, every interaction lowers the energy rather than raising it, sound is part of the design, it often follows the real clock, and it has to carry a small amount of real content (a booking link, opening hours, a release date) without breaking the calm.

## What makes it work

1. **It is alive before anyone touches it.** The first frame already has ink blooming, drops sliding, or the orb mid-breath. 005 plays an opening drop; 041 pre-wipes a swoosh through the fog and pre-runs a few seconds of rain; 026 has an idle "breathing" spectrum before any audio starts.
2. **One slow simulation, not many effects.** Each page is built on a single physical idea (fluid, condensation, a heightmap, growth, a day's light) and does it convincingly. Everything else, including the type, supports it.
3. **Touch is gentle and it heals.** Stir, wipe, rake, pop. Every mark the visitor makes decays back towards rest on its own (fog re-forms, ink fades, sand can be returned to calm). A "Still the water" or "Return to calm" button makes that reset an event in itself.
4. **Quiet interface.** Captions are small and set in a light serif or a widely tracked monospace, titles run vertically (005, 059), tools sit in one thin vertical bar, and hints fade after the first interaction.
5. **Time is real.** 041 reads "It's 00:47" from the local clock, 078 opens on today's season, 091 has a "now" button, 099's window sky follows the hour. Using the visitor's own moment makes the piece feel present rather than looped.

## Simulation families

| Family | Gallery | Core idea | Cost |
|---|---|---|---|
| Fluids / dye | 005 | coarse velocity grid (advect, diffuse, project), finer dye grid, vorticity for curls | high: size the grid to the device |
| Condensation / surface | 041 | a low-res mask canvas: wiping cuts holes, a faint fill re-fogs; drops as pooled sprites | low to medium |
| Heightmap + light | 059 | tools write heights; normals × sun direction shade only the rectangles that changed | medium, touch-driven |
| Growth / aggregation | 037, 078, 094 | walkers stick, branches recurse, washes layer; the *building* is the show | bursty, then idle |
| Noise fields / waves | 001, 067, 079 | summed sines plus noise; a wave-equation grid for ripples | low |
| Day / season cycles | 091, 078 | hand-authored colour keyframes interpolated by hour or day of year | very low |
| Feedback / recursion | 026, 099 | redraw the last frame slightly zoomed and faded, or draw the scene inside itself | low, but high vestibular risk |
| Pooled particles | 002, 074 | rain, bubbles, leaves from a fixed pool, counts from screen area | low to medium |

## Architecture

1. **Write the calm sentence first:** "You watch ___; you can gently ___; left alone it ___; the one real thing on screen is ___." If the last blank is empty and the page has a business purpose, redesign before you build.
2. **Pick one family** from the table and one material to render it in (washi paper, fogged glass, gravel, phosphor characters, watercolour paper). Bake the static material (paper fibres, sand grain, wood frame) into an offscreen canvas once per resize.
3. **Separate simulation from drawing.** Run the simulation on `dt` with a seeded random generator, at a reduced grid, and upscale smoothly. Draw in layers: baked material, live simulation, effects (ripples, glints), then the HTML interface.
4. **Pre-roll the first frame:** run a few seconds of simulation before the first paint, place an opening gesture (a drop, a wipe, a raked arc), and give every caption a value.
5. **Gentle input:**
   - pointer and touch share one path (`pointerdown`/`move`/`up` with `touch-action: none` on the stage only);
   - interpolate between pointer samples so fast strokes stay continuous (041's `wipeLine`, 059's segment rake);
   - every tool has a keyboard or button twin (a "Wipe the glass" sweep, "drop ink" on Space, number keys for tools);
   - one reset action animates back to rest (fade the fields, then re-rake in a sweep from left to right).
6. **Idle life:** after 8–20 s without input, add one small event on a randomised timer: a falling droplet, a maple leaf crossing, a meteor, distant lightning. Never on a fixed beat.
7. **Sound bed (optional but powerful):** synthesise it (filtered noise for rain or wind, a few sine partials for chimes, a slow drone). Start only after a user gesture, default to muted with a visible toggle, ramp gain in over 1–2 s, and duck it when the tab is hidden. Tie a few interactions to it (a plink per drop, a chime on "return to calm").
8. **Time tie-ins:** read `new Date()` for the caption, the palette (hour → keyframes) and the season. Offer "Play the day/year" as a 60 s scrub, plus a "now" button to come back.
9. **Attach the real content** in a calm dock (see below), then run the governor: pause when hidden or off-screen, adapt quality, handle reduced motion.

## Attaching real content without breaking the calm

- **One dock, one action.** A small glass or paper plate in a corner holding the name, one line, and a single primary action ("Book a treatment", "Pre-save the album", "Notify me"). Secondary facts (hours, address) go in a disclosure or a quieter second line. For a spa or an app, the piece can be a 100svh hero with ordinary calm sections below.
- **Let the scene carry state.** Open or closed can be shown as lit or unlit windows, today's hours can be written in the steam, and a launch countdown can live in the tide or the sky. Always repeat the fact in plain text as well.
- **The content is real HTML** layered above the canvas, reachable by keyboard, never drawn only in canvas. Keep it outside the stage's `touch-action: none` area so taps on the button never become strokes.
- **404 / coming soon:** the piece is the apology or the wait ("The water is still; this page isn't here"), with a clear way home or a sign-up field.

## Key mechanics (original sketches)

```js
// breath pacer: one phase clock drives scale, caption and progress; announce only on phase change
const PATTERN = [['Breathe in', 4], ['Hold', 7], ['Breathe out', 8]];
const CYCLE = PATTERN.reduce((s, p) => s + p[1], 0);
function breath(t) {                       // t in seconds since the session started
  let u = t % CYCLE, i = 0;
  while (u >= PATTERN[i][1]) u -= PATTERN[i++][1];
  const k = u / PATTERN[i][1], ease = .5 - .5 * Math.cos(Math.PI * k);
  const size = i === 0 ? ease : i === 1 ? 1 : 1 - ease;   // 0 = empty lungs, 1 = full
  return { i, size, label: PATTERN[i][0] };
}
const b = breath(t); orb.style.scale = .72 + .28 * b.size;
if (b.i !== lastPhase) { live.textContent = b.label; lastPhase = b.i; }   // aria-live="polite"
```

```js
// fog you can wipe that slowly returns: a low-res alpha mask composited over a blurred copy of the scene
function wipeAt(x, y, r) {
  mctx.globalCompositeOperation = 'destination-out';
  const g = mctx.createRadialGradient(x, y, r * .4, x, y, r);
  g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
  mctx.fillStyle = g; mctx.fillRect(x - r, y - r, r * 2, r * 2);
}
function refog(dt) {                        // ~20 s to fully mist over again
  mctx.globalCompositeOperation = 'source-over';
  mctx.fillStyle = `rgba(0,0,0,${Math.min(1, dt * .05)})`; mctx.fillRect(0, 0, mw, mh);
}
// frame: draw sharp scene, then blurred scene masked by the fog canvas ('destination-in') on top
```

```js
// rake: tines carve a cosine groove profile into a heightmap, blended so re-raking softens old lines
function rakeSegment(ax, ay, bx, by, tines = 5, gap = 6, depth = 1) {
  const len = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / len, uy = (by - ay) / len;
  const half = gap * tines / 2, [x0, y0, x1, y1] = bounds(ax, ay, bx, by, half);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const along = (x - ax) * ux + (y - ay) * uy, across = (x - ax) * -uy + (y - ay) * ux;
    if (along < 0 || along > len || Math.abs(across) > half) continue;
    const i = y * W + x, groove = -depth * Math.cos(2 * Math.PI * across / gap);
    height[i] += (groove - height[i]) * .85;
  }
  markDirty(x0, y0, x1, y1);                // relight only this rectangle: shade = max(0, n · sun)
}
```

```js
// real-clock light: interpolate authored keyframes by local hour, push them into CSS tokens
const KEYS = [[0, '#050818', '#1a2046'], [6, '#f2a9a0', '#ffe2c0'], [12, '#6fa8e8', '#dcecf8'],
              [19, '#e0725e', '#ffb877'], [21.5, '#1a1d52', '#3d3f84'], [24, '#050818', '#1a2046']];
function lightAt(h) {
  let i = 0; while (KEYS[i + 1][0] < h) i++;
  const [ha, ...a] = KEYS[i], [hb, ...b] = KEYS[i + 1], k = (h - ha) / (hb - ha);
  return a.map((c, j) => mixHex(c, b[j], k * k * (3 - 2 * k)));
}
const d = new Date(), [sky, horizon] = lightAt(d.getHours() + d.getMinutes() / 60);
root.style.setProperty('--sky', sky); root.style.setProperty('--horizon', horizon);
caption.textContent = `It's ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
```

```js
// rain bed: looped noise → band filters → gain that fades in; only after a gesture, muted by default
function startRain(ac) {
  const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), ch = buf.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  const src = new AudioBufferSourceNode(ac, { buffer: buf, loop: true });
  const hp = new BiquadFilterNode(ac, { type: 'highpass', frequency: 450 });
  const lp = new BiquadFilterNode(ac, { type: 'lowpass', frequency: 5200 });
  const out = new GainNode(ac, { gain: 0 });
  src.connect(hp).connect(lp).connect(out).connect(ac.destination); src.start();
  out.gain.setTargetAtTime(.18, ac.currentTime, .8);            // ~2 s swell, never a click
  return out;                                                   // duck to 0 on visibilitychange
}
```

## Performance on phones

- Cap `devicePixelRatio` at 2 (1.5 for full-screen per-pixel work). Run fluids and heightmaps at a fraction of the screen resolution and upscale with smoothing; the softness suits the mood.
- Use 2–3 quality tiers chosen from area and measured frame cost, not from user-agent sniffing. 005 lowers its quality by about 20% (up to twice) when frames average over 20 ms.
- Allocate typed arrays once, pool particles, and keep heavy filters on baked layers. Relight or redraw only dirty rectangles.
- Keep it battery-kind: pause on `visibilitychange` and when an `IntersectionObserver` says the stage is off-screen, and drop to ~30 fps once the scene has been idle for a while.
- Idle events run on a randomised timer (next one in 9–19 s), reset by any input.

## Reduced motion (matters more here than anywhere)

The whole format is motion, and its failure modes (endless zoom, rotating feedback, drifting parallax, flicker) are exactly the vestibular triggers the setting exists for. Much of the gallery only *slows* motion (0.2–0.45×). Go further:

- **Default to a composed still:** a pre-rolled frame with the ink mid-bloom, the fog half-wiped, the sand freshly raked. Then offer an explicit "Let it move" toggle.
- **Never under reduced motion:** zoom loops (099), feedback zoom or rotation (026), camera drift, lightning flashes, or neon flicker.
- **Keep touch working instantly:** a wipe still clears and a rake still carves, but "return to calm" snaps to the result (059 does this).
- A breathing guide may still pace, but by colour or opacity and a text count rather than large scale changes. Say this in the toggle label.
- Also honour a manual pause control for everyone (WCAG 2.2.2: anything that moves for more than 5 s needs one).

## Variation levers

- **The element:** water, ink, fog, sand, snow, light, sound, growth.
- **The material:** washi, fogged glass, gravel, phosphor text, watercolour paper, frosted glass, felt.
- **The touch verb:** stir, wipe, rake, pop, drop, breathe, plant, tune.
- **The clock:** none, the hour, the season, the moon, a countdown, the visitor's breath.
- **The soundscape:** silence, rain, wind chimes, a drone, a generative track, the microphone.
- **Energy:** near-still (sand) through drifting (aurora) to pulsing (visualiser).

## Business uses

- A day spa whose hero is steam on a mirror: wipe it to reveal today's hours and a "Book a treatment" plate.
- A sleep app with a 4-7-8 breathing orb over a slow sky that follows the visitor's local time towards night.
- A musician's release page where the ridges or the bloom listen to a 30 s snippet (after a tap), with pre-save as the only button.
- A gallery or ceramics studio holding page: ink drops in water spell nothing and sell nothing, plus the opening date and a mailing-list field.
- A 404 that is a raked garden with one stone out of place, "This path isn't raked yet", and a link home.

## Pitfalls

- **Nothing to do next.** A beautiful mood with no dock loses the visitor. Every business page needs one visible, real, keyboard-reachable action.
- **Sound that autoplays or is hard to stop.** Start sound only after a gesture, default to muted, keep the toggle visible, and never tie it to the first tap on the canvas without saying so.
- **Hints that lie.** "Drag to stir" must stir on touch too. Fade hints after the first success, not on a timer.
- **Excitable interaction or visible loops.** Bursts, shakes and fast particles break the spell; so does a cycle you can spot. Keep reactions soft and self-healing, and use mismatched periods and seeded randomness.
- **Overheating phones.** A full-resolution fluid solver running forever drains the battery. Use tiers, a DPR cap, pausing, and an idle frame-rate drop.
- **Canvas-only information.** Clocks, hours and phase names drawn only in canvas are invisible to screen readers. Mirror them in text; use `aria-live="polite"` only for meaningful changes (a breath phase), never per frame.
- **The stage eating the page.** `touch-action: none` on the whole body blocks scrolling on phones. Scope it to the stage, and leave a scroll path when there is content below.

## Signals (what a user might say)

- "I want it to feel calm, like you could just sit and look at it."
- "Something relaxing people can play with for a minute."
- "Like watching rain on a window" / "like ink dropping in water."
- "A breathing exercise right on the homepage."
- "It should feel like our spa: slow, quiet, steamy."
- "Can the site change with the time of day?"
- "A holding page while we get ready to launch, but nice to look at."
- "Our 404 page should be something people enjoy."
- "Visuals that move with the music."
- "Hypnotic," "meditative," "zen," "soothing," "dreamy."
- "More of a mood than a website," or "could it make a gentle sound, like rain?"

**Not this format if…**

- The visitor needs to compare, choose or buy several things (menus, pricing tables, product ranges). Use a structured site and keep an ambient piece, at most, as a hero.
- The energy they describe is "exciting," "bold," "loud," or "game-like." That is a signature reveal, an instrument or an art-piece toy, not a calm state.
- There is a real structure to show (routes, data, a map). Use the living data hero; ambience alone would hide the substance.
