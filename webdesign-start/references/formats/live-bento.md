# Format: live bento / dashboard

**Load when:** the story is **many small true facts** rather than one narrative, and at least half of them can be *shown working* in a tile. Fits designers, developers, makers, studios, indie apps, open-source projects and bands; personal homepages that should feel inhabited (time zone, availability, what I'm building or reading); product overviews where each capability is a working mini-demo; and real dashboards or status pages where readers scan many independent readings.

**Study:** gallery 068 (Mira Okafor, a bento portfolio where every tile is a different live object). Also 012 (Nimbus weather: glass tiles over a living sky), 060 (QUANTA trading terminal: density as the aesthetic) and 076 (ARES VII mission control: domain chrome and designed states).

**Don't use it** when the content is a sequence (a story, a process, an argument), when fewer than about 6 things are worth showing or most tiles would be text only (that is the template bento), when you cannot make at least half the tiles do something, when the concept already has a strong artefact (borrow at most one live tile), or when users of an operational tool need their own saved layouts (build an app).

## What makes it work

`craft.md` §10 says a bento where every tile does something live is the exception that earns it. 068 earns it by breaking every part of the template: **every tile is a different kind of object** (a clock, a player, a phone, a map, a book, a poster), **every tile carries evidence rather than a claim** ("based in Lisbon" is a map with coordinates and a pin), **liveness is real where it can be** (the clock is real Lisbon time via `Intl`), **size follows importance**, **one accent is used only as light** (the second hand, the pin halo, the rim), and **tiles lead somewhere** (two open full case studies). The dashboards share the same thread: one domain-specific panel chrome, states as design objects, data that behaves like its real counterpart, and an honest "simulated" label.

## Architecture

1. **Write the tile inventory before drawing the grid.** One row per tile: *the fact it proves · its verb (ticks, plays, counts, drifts, generates, opens) · data class (real / derived / demo / fictional) · what it opens to.*
   - Every tile passes the delete test: removing it loses a fact.
   - At most 1 in 5 tiles is static, and static tiles are objects (a book, a stamp, a signed quote), never icon + text.
   - No two tiles share an internal layout. Two "label, big number, caption" tiles merge into one with a shared scale.
   - At least one tile opens something; one hero tile holds the identity and is the biggest thing on the grid. Aim for 8–14 tiles.
2. **Size by importance, then compose the silhouette** (sketch 1). Hero 2×2; flagship 1×2 for tall objects (phone, poster, feed) or 2×1 for wide ones (browser, timeline, quote); facts 1×1. The hero sits where reading starts, tall tiles are offset by a row so no row line runs across the grid, dark or saturated tiles form a diagonal, and a wide tile closes the last row (contact, subscribe). Never enlarge a tile to fill a hole; cut, merge or change the silhouette.
3. **Build the shell once, vary the inside.** Tiles share only radius, padding, surface, shadow, label position and focus ring. Layers back to front: surface → spotlight glow → content → rim light → stretched link. Each tile is an inline-size container so its content responds to the tile, not the viewport. Pointer spotlight and rim: `techniques.md` §3 (refresh coordinates on scroll too).
4. **Choose one chrome from the concept:** soft white cards (068), hairline panels (060), bracketed instrument plates (076), frosted glass over one living background (012). Not the default rounded card when the concept suggests something else.
5. **Classify liveness honestly** (see Pitfalls) and wire every live tile into **one scheduler** that pauses offscreen tiles, hidden tabs and open dialogs (sketch 2). Tiles that tick per second or minute compute from wall-clock time so pausing never drifts them.
6. **One leading motion per viewport:** one lead (the scrolling phone, the generative poster), a few mid (clock, equalizer), the rest near-still (`craft.md` §13).
7. **Design every data tile's states:** loading (the final shape with a shimmer on the data only), ready (readout, comparison, "as of"), empty (a sentence on what will fill it), error (plain words, last good value dimmed with its time, Retry), stale ("last updated 18 min ago"). One `data-state` attribute drives them (sketch 3), so review can force each one.
8. **Animate from empty; rest on the finished state** (sketch 4), so reduced motion, print and slow devices still show every chart and number.
9. **Expand transitions** for tiles that open: clip-path grow from the tile rect (`techniques.md` §6) or a view-transition morph (sketch 5), with the page behind `inert` and focus returned to the opener. Lift and arrow belong only to tiles that open something.
10. **Recompose for tablet and phone:** tablet re-lists named areas in 2 columns so pairs belong together; phones keep a 2-column micro-grid for small square facts and give hero and flagship tiles the full width. Real dashboards on phones use tabs or a segmented control per panel group (060), with each group's headline readout in its tab. Rows use `minmax(base, auto)`; probe `scrollHeight > clientHeight` per tile at every breakpoint.

**For a real data dashboard,** keep the discipline and drop the portfolio's charm: each tile answers one question and leads with the answer as a sentence ("Signups are up 12% on last week, mostly from the Tuesday newsletter"), then the number with its comparison and period, then the chart. Repeated sparklines share one y-domain and label only extremes and "now". The tile with a problem gets the accent and moves up, or an annunciator strip appears above the grid (076). Numbers change with a brief fading flash (060), charts extend at the right edge rather than redrawing, every panel shows freshness ("as of 14:02 · every 60s"), and the page shows its time zone.

## Key mechanics

```css
/* meaning-sized named areas; rows grow instead of clipping; phones keep a 2-column micro-grid */
.board { --row: 184px; display: grid; gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: minmax(var(--row), auto);
  grid-template-areas:
    "who  who  now   feed"
    "who  who  ship  feed"
    "map  ship ship  art"
    "talk talk read  art"; }
.t-who { grid-area: who; } .t-now { grid-area: now; } /* …one rule per tile */
.tile { container: tile / inline-size; }
@media (max-width: 1000px) { .board { grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-areas: "who who" "now feed" "ship ship" "map read" "art art" "talk talk"; } }
@media (max-width: 600px) { .board { grid-template-areas: "who who" "now map" "feed feed" "ship ship" "read art" "talk talk"; } }
```

```js
// one scheduler for all live tiles: offscreen, hidden tab, open dialog, reduced motion
const live = new Map();                       // tile -> { step(t, dt), visible }
const still = matchMedia('(prefers-reduced-motion: reduce)');
const seen = new IntersectionObserver(es => es.forEach(e => (live.get(e.target).visible = e.isIntersecting)));
export function register(tile, step) { live.set(tile, { step, visible: false }); seen.observe(tile); step(0, 0); }
let last = 0;
function frame(t) {
  const dt = Math.min(64, t - (last || t)); last = t;
  if (!document.hidden && !document.body.hasAttribute('data-dialog-open'))
    for (const [, s] of live) if (s.visible) s.step(t, still.matches ? 0 : dt);  // dt 0 = hold the frame
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

```js
// data tile states owned by one attribute; the last good values stay in the DOM
async function fill(tile, load, render) {
  tile.dataset.state = 'loading';
  try {
    const data = await load();
    if (!data || !data.length) return (tile.dataset.state = 'empty');
    render(tile, data); tile.dataset.state = 'ready';
    tile.querySelector('.asof').textContent = 'as of ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    clearTimeout(tile._stale); tile._stale = setTimeout(() => (tile.dataset.state = 'stale'), 10 * 60e3);
  } catch { tile.dataset.state = 'error'; }   // CSS dims .value and shows .when-error
}
```

```css
/* animate from empty, rest on the finished state (pathLength="1" on the path) */
.trend path { stroke-dasharray: 1; stroke-dashoffset: 0; }
.bars i { transform-origin: bottom; }
@media (prefers-reduced-motion: no-preference) {
  .tile.in .trend path { animation: trace 1.4s cubic-bezier(.3,.7,.2,1) both; }
  .tile.in .bars i { animation: rise .9s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * 40ms); }
}
@keyframes trace { from { stroke-dashoffset: 1; } }
@keyframes rise  { from { transform: scaleY(.05); } }
```

```js
// expand a tile with the View Transitions API; modal <dialog> makes the page inert
function openDetail(tile, panel) {
  const opener = document.activeElement, art = tile.querySelector('[data-morph]');
  const swap = () => { art.style.viewTransitionName = ''; panel.querySelector('[data-morph]').style.viewTransitionName = 'hero';
    panel.showModal(); };
  art.style.viewTransitionName = 'hero';
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) swap();
  else document.startViewTransition(swap);
  panel.addEventListener('close', () => opener.focus(), { once: true });  // custom overlays: set main.inert yourself
}
```

A local-time tile becomes a useful fact when it says what the time means: format the owner's zone with `Intl.DateTimeFormat({ timeZone })` and add "at the desk", "may reply later" or "asleep" from the hour. Device mockups sized in `em` can render the same DOM in the tile and, larger, in the case study.

## Variation levers

Pick at least four that differ from the last bento the skill produced.

- **Tile chrome:** soft white cards, hairline panels with no radius, bracketed instrument plates, frosted glass over a living background, paper cards with tape, enamel badges, ledger cells.
- **Ground and gap:** light neutral, tinted dark, one full-bleed world visible through the gaps; 16px airy gaps, 1px hairline gaps, or no gap with rules like a newspaper grid.
- **Silhouette:** 4 columns with a 2×2 hero; 6 columns with a 3×3 hero; an asymmetric 12-column grid with an uncarded hero area (012); a tall hero column beside a 2-column stack; slightly rotated tiles like a pinboard.
- **Accent job:** live indicator only, availability, the data "now" point, the one CTA, caution amber by state.
- **Type voice:** tight system sans (068), condensed display with mono readouts (076), serif display with small-caps labels, rounded sans.
- **Leading live tile:** generative art, a device mockup demo, a map with live position, audio, a playable mini-app, a real chart.
- **Reveal and expand:** reading-order stagger, diagonal wave by `row + col`, a boot sequence, tiles sliding in from their grid edge; clip-path grow, view-transition morph, side drawer (076), in-place expansion.
- **Hover:** spotlight and rim, tilt, press depth, an LED on the label, none (operational dashboards).

## Business uses

- An indie developer's "workbench": hairline bench cells on a dark ground with one amber LED accent; a real commit sparkline with "as of" and a stale state; a local-time tile that says "at the desk" or "asleep"; a playable 20-second slice of their actual game that opens full screen.
- A note-taking app overview: paper cards with one ink-red accent; each capability a working demo (Markdown rendering as you type, two small devices syncing, a search filtering a sample library), each labelled "sample notes"; real numbers only with dates ("v3.2 · released 2 Sept 2026").
- A team operations board: instrument plates, cyan data, amber for caution only; each tile an editorial sentence first ("Build queue is clear; last deploy 11 min ago"); shared-scale sparklines; an annunciator strip only when something is in caution; tabs by group on phones.

## Pitfalls

- **Icon-in-circle tiles,** or any tile whose content could appear on another site unchanged.
- **Fixed row heights that clip.** At 1440, 068's Fieldnote content is 242px in a 196px row, hiding its "View case study" link; the intro and contact tiles overflow too.
- **Charts whose resting state is empty.** Under reduced motion, 068's line chart snaps back to hidden, leaving bars with no line.
- **Mockup type overflowing its device** ("€1,284.50" touching 068's bezel). Test mockups at their smallest size and let text truncate.
- **Lift on dead tiles.** 068 lifts every tile, including ones that open nothing.
- **Fake liveness.** 068's "Now playing" bar advances while nothing plays. Never animate a metric that implies activity that isn't happening, and never count up a business claim unless it is true and dated ("48 products shipped · since 2014"). Demo tiles look like demonstrations (inside a device frame, labelled "sample"); fictional or simulated content is labelled visibly on the page.
- **Auto-rotating content in an `aria-live` region.** 068's testimonials announce every 6 seconds. Rotate outside a live region, and pause on hover and focus.
- **A dialog without `inert` behind it** (068), or focus that does not return to the opener.
- **Broken references.** 068's location tile points `aria-labelledby` at an id that doesn't exist.
- **Stale spotlight.** Pointer coordinates not refreshed on scroll leave a glow where the cursor used to be.
- **Reveal-on-scroll with no fallback,** leaving blank tiles in print, full-page screenshots and when IntersectionObserver fails. Add a timeout and a `@media print` override.
- **Per-tile rAF loops** that keep running offscreen, in hidden tabs or behind an open dialog.
- **Everything moving at once.** Pick a lead.
- **A 7,000px single-column feed on phones.** 068 reaches about 7,500px at 390 wide.
- **Real dashboards without empty, error and stale states,** or without an "as of" time.
- **Mockup pastels leaking into the chrome,** diluting the one accent.

## Signals (what a user might say)

- "Like one of those bento grids, but not boring."
- "I want my homepage to show lots of little things about me at once."
- "Show my time zone and whether I'm available."
- "Each feature should be a small working demo."
- "Like a dashboard, but for my portfolio."
- "A status page people can scan in five seconds."
- "Tiles I can click into for each project."
- "What I'm building, reading and listening to right now."
- "Mission-control vibes for our ops screen."
- "Everything on one screen, like a desk full of things."

Not this format if…
- the user is telling one story in order (a founder journey, a process, an argument);
- they have only three or four points, mostly text;
- the audience needs to build and save their own views (that is an app, not a page).
