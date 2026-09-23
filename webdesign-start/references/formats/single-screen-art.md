# Format: single-screen art piece

**Load when:** the whole site can be one made artwork in one viewport: an object, scene or field living on its own clock, with a small band of UI attached. Fits coming-soon and launch pages, a single-product splash, one-verb tools (timer, breathing guide, tuner, picker), event countdowns and live "now" pages, personal homepages with 3–5 links, and holding, 404 or maintenance pages.

**Study:** gallery 088 (Tempus, an hourglass timer whose sand is the clock). Also 041, 044 (tide and moon clock) and 090.

**Don't use it** when content has to be read (menus, pricing, case studies), when there is more than one primary action or more than about 7 controls, when the page must rank on several hundred words of copy (one screen holds about 40–80 words), or when the concept produced no subject that can become a picture. A gradient blob is not an art piece.

## What makes it work

One large, finely made subject at 60–80% of the short axis, lit from behind, grounded, and **already doing something on the first frame**. The page's state (time left, progress, hour, weather) is shown *through* the art, not beside it: in 088 the amount of sand in the top bulb *is* the remaining time. The UI is one quiet band in the art's material, so it reads as a caption to the object. Every visit opens on the same composed frame.

## Architecture

1. **Name the subject and its truth variable:** "The art is ___; it displays ___." (088: an hourglass displays `remaining / duration`.) If there is no truth variable, the art needs strong idle life instead (step 7).
2. **Lay out one viewport as a stage grid** (sketch 1): `100svh`, `overflow: hidden`, 3–4 named areas: `art`, `mark` (brand, small, in a corner), `band` (all controls) and optionally `colophon` (one line). Below about 560px of height, release the lock (`min-height`, scroll allowed) rather than clipping controls.
3. **Build the art in its own coordinate system:** one fixed-aspect wrapper, sized by `min(height budget, width budget)`, stacking back SVG → simulation canvas → front SVG (glass, rims, highlights, frame). **Drive every layer from one shared geometry function** (sketch 2), so drawing, clipping, masking and physics always agree. This is the most transferable idea in 088.
4. **Anchor light and ground to the subject, not the viewport** (sketch 3). Glow, contact shadow and horizon live inside the wrapper or are positioned from its measured rect.
5. **Build the UI as one band** in the art's negative space (beside, under, or engraved into the base), in the art's material (088's chips are brass). When the verb is physical (turn, pour, strike, wind), make the art itself the primary control, and mirror every gesture with a labelled button.
6. **Model state as a small machine:** `idle`, `running`, `paused`, `transition`, `done`. Keep one source of truth (a wall-clock `endAt`, not accumulated `dt`), and have the art *derive* its state from it every frame (sketch 4). Hidden tabs, pauses and slow devices then cannot desync it.
7. **One loop** (`techniques.md` §1) that advances the simulation toward the truth variable, runs 3–6 ambient details on mismatched periods, stops when hidden, and is **pre-warmed and seeded** so frame one is composed.
8. **Design the transition ritual** for the main verb: anticipation, the move, a midpoint where physics swaps, a settle, a live-region line. Freeze the simulation during the move so matter travels rigidly with its container (sketch 5).
9. **Design the end state as its own composition:** the art at rest, one sentence, one action ("Turn again").
10. **Recompose, don't shrink,** for portrait and short landscape, then screenshot every state at 1440×900, 390×844 and 844×390.

## Key mechanics

```css
/* one viewport, recomposed per aspect band; the lock releases on very short screens */
html, body { height: 100%; margin: 0; }
.stage { height: 100vh; height: 100svh; overflow: hidden; display: grid; gap: 2vmin;
  grid-template: "mark mark" auto "art band" 1fr "art colo" auto / minmax(0,1.1fr) minmax(280px,.9fr); }
.art { grid-area: art; container-type: size; display: grid; place-items: center; }
.object { height: min(80cqh, 80cqw * var(--ar-inv)); aspect-ratio: var(--ar); position: relative; }
@media (max-aspect-ratio: 4/5) { .stage { grid-template: "mark" auto "art" 1fr "band" auto / 1fr; } }
@media (max-height: 500px) and (orientation: landscape) { .mark { display: none; } }
@media (max-height: 560px) and (orientation: portrait) { .stage { height: auto; min-height: 100svh; overflow: visible; } }
```

```js
// one profile function drives the SVG outline and the physics mask
const ROWS = 160, NECK = ROWS / 2, R = 36;                    // half-widths in grid cells
const halfWidth = row => { const d = Math.abs(row - NECK) / NECK;
  return Math.min(1.2 + 0.9 * Math.abs(row - NECK), R * Math.sin(Math.PI * (0.03 + 0.94 * d)) ** 0.5); };
const HW = Float32Array.from({ length: ROWS }, (_, r) => halfWidth(r));
function outline(scale, cx, top, inset = 0) {                  // SVG path in scene units
  const side = s => HW.map((w, r) => [cx + s * (w * scale + inset), top + r * scale]);
  return 'M' + [...side(-1), ...side(1).reverse()].map(p => p.map(n => n.toFixed(1)).join(' ')).join('L') + 'Z';
}
const COLS = 2 * R + 3, MID = (COLS - 1) / 2, inside = new Uint8Array(COLS * ROWS);
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) inside[r * COLS + c] = Math.abs(c - MID) <= HW[r];
```

```js
// light that follows the subject through every recomposition
const glow = document.querySelector('.glow'), obj = document.querySelector('.object');
const LIGHT = { x: 0.62, y: 0.78, r: 0.9 };                   // object-relative units
new ResizeObserver(() => {
  const b = obj.getBoundingClientRect(), s = Math.max(b.width, b.height) * LIGHT.r;
  Object.assign(glow.style, { width: s + 'px', height: s + 'px',
    left: b.left + b.width * LIGHT.x - s / 2 + 'px', top: b.top + b.height * LIGHT.y - s / 2 + 'px' });
}).observe(document.documentElement);
```

```js
// the clock is the truth; the art is gated to it (only the surplus may cross the neck)
const clock = { dur: 300e3, endAt: 0, left: 300e3, running: false };
const now = () => performance.now();
function remaining() { return clock.running ? Math.max(0, clock.endAt - now()) : clock.left; }
function play()  { clock.endAt = now() + clock.left; clock.running = true; }
function pause() { clock.left = remaining(); clock.running = false; }
function neckBudget(grainsAbove, total) {
  return Math.max(0, grainsAbove - Math.round(total * remaining() / clock.dur)); }
setInterval(() => { if (clock.running && remaining() === 0) finish(); }, 250); // survives hidden tabs
```

```js
// the turn ritual: rotate, swap physics at the midpoint, announce
let angle = 0, turning = false;
async function turn() {
  if (turning) return; turning = true; pause();
  const ms = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1100;
  angle += 180; const anim = obj.animate([{ rotate: `${angle - 180}deg` }, { rotate: `${angle}deg` }],
    { duration: ms, easing: 'cubic-bezier(.6,-.12,.3,1.08)', fill: 'forwards' });
  setTimeout(() => { gravity = -gravity; }, ms / 2);
  await anim.finished;
  clock.left = clock.dur - clock.left; turning = false;        // what was below is now above
  if (clock.left > 0) play(); announce(clock.left > 0 ? `Turned. ${words(clock.left)} to go.` : 'All sand is below.');
}
```

For granular media (sand, beans, salt), a cellular grid that does straight falls first, then diagonal slides with a ~12–15% friction skip, alternating sweep direction each step, settles at believable angles. Render at grid resolution into `ImageData`, shade by depth from the free surface (lit crust, darker core), and upscale **with smoothing on** so slopes do not stair-step.

## Variation levers

Pick one per row, and never reuse a subject/medium pair across two projects.

- **Subject:** object in a vitrine (hourglass, bottle, clock), landscape (dune, orchard, harbour), field (ink in water, aurora, pollen), mechanism (orrery, loom, metronome), organism (bonsai, sourdough, coral).
- **Medium:** granular cells, fluid or ink advection, particles on springs, growth (L-system, reaction-diffusion), light (caustics, rays), cloth or paper, pure CSS keyframes.
- **Truth variable:** countdown, days until launch, time of day, progress %, live count, weather, a daily seed.
- **Camera:** frontal still life, three-quarter hero, top-down plate, macro crop, far landscape, cutaway.
- **UI docking:** side panel, bottom plaque, engraved into the base, ticket stub in a corner, bezel around the art, handwritten margin.
- **Main verb and end state:** turn, pour, wind, strike, breathe, reveal → pile at rest, bloom, bell, lights out, stamp, curtain.
- **Type voice:** old-style book serif (088, with old-style figures), Didone, inscriptional caps, mono instrument, drawn SVG numerals.

## Business uses

- A roastery launch page: a cutaway drum roaster whose beans darken one by one as the countdown to opening day runs down; a brass plaque with the date and an email field.
- A single-fragrance splash: one flacon in a vitrine, the scent's colours rising as ink in water, the backlight following the local time of day, "Request a sample" in a corner stub.
- A breathwork studio "breathe" page: ripples on a paper-cut lake expanding on a 4-7-8 cycle, the phase written on the water, "Book a class" in the band.

## Pitfalls

- **The single screen breaks on phones.** 088 is 1320px tall at 390×844, with controls below the fold. The phone composition must fit `100svh` at 390×844 and 360×740 with the primary control visible: subject at 58–64% of the height, mark top-centre, band as a bottom plaque, settings behind one disclosure.
- **Light pinned to viewport percentages.** In 088 the sun and dunes end up behind the dial on phones instead of behind the glass. Position light from the subject.
- **Two focal points.** 088's 124px cream numeral outshines the hourglass. The lit subject's brightest value must beat the UI's; put the readout inside the art (on the plinth, over the sky) or a step dimmer.
- **No rotation clearance.** Mid-flip, 088's object nearly touches the viewport edge and the panel. Reserve a box as large as the diagonal, or scale down during the turn.
- **Pixelated simulations** (unless pixel art is the concept). Keep cells at 2 CSS px or less, or draw at 2× with smoothing. Check degenerate states: grains stuck on walls, a lopsided pile after a flip, empty frames at t=0 and t=end.
- **Auto-start on a tool.** Starting a countdown on load is a liberty, and a chime that needs a gesture-created AudioContext stays silent for visitors who never touched the page. Wait for consent; keep the idle state alive with ambient life and a pre-warmed partial state. The end state must be clear muted (visual change plus live-region text).
- **Hidden controls.** If the band dims on idle, keep it at 0.55 opacity or more, restore it on pointer movement and `:focus-within`.
- **Art-as-control without semantics.** It needs `role="button"`, a verb label ("Turn the hourglass"), Enter and Space, a visible focus ring in the accent, and a duplicate labelled button.
- **Chatty live regions.** Announce transitions only, never a per-second count; mirror state in `document.title` for background tabs.
- **Reduced motion that removes information.** Freeze ambient loops on a chosen frame and make transitions instant, but keep informational motion (the sand) running calmly.
- **Unseeded ambient particles** (088's dust motes), per-frame DOM writes without a diff, and a loop that keeps running while hidden.
- **Band text contrast** checked only against the ground. Check it against the brightest part of the art behind it, at every aspect band.

## Signals (what a user might say)

- "I just want one beautiful thing on the screen, no scrolling."
- "A coming-soon page that feels like art, not a form."
- "Make the countdown *be* the picture."
- "Something people leave open in a tab."
- "Like a screensaver, but it's our site."
- "One object, really well made, and nothing else."
- "A timer / breathing thing that's calming to look at."
- "The homepage should just be our bottle, lit up."
- "A holding page while we rebrand, but make it special."
- "Can the 404 page be a little artwork?"

Not this format if…
- the user needs visitors to read menus, prices, case studies or long copy on that page;
- they list several actions of equal weight ("book, shop, subscribe and see the team");
- the page's job is to rank in search on its own words.
