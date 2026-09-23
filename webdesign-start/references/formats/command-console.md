# Format: command console (a real dashboard)

**Load when:** the concept is a dense operational interface that looks and behaves like the real thing: a trading terminal, mission control, a radar or network operations console, a logistics tower, a CI/CD or observability screen. It fits data products, internal tools, fintech, ops and security, dev tools, and any product whose buyers live in a console all day and judge software by its density and speed.

**Study:** gallery 060 (QUANTA, a simulated trading terminal), 076 (ARES VII mission control), 089 (SENTINEL radar array).

**Not the bento grid.** A bento grid is a marketing layout of equal-weight tiles, each with an icon and a sentence, and nothing in it *works*. A command console has one **primary instrument** (the chart, the trajectory, the scope) and satellite panels that are all live, linked and interactive: selecting a contact in the table locks the scope; selecting a ticker re-points the chart, the book and the order ticket. If the tiles could be shuffled without anyone noticing, it's a bento grid. For a data picture drawn as art rather than a working console, use `living-data-hero.md`.

## What makes it work

**Density with hierarchy.** Dozens of numbers are visible, but the eye knows where to go: one large primary panel, a status strip on top with the single most important reading (equity, mission elapsed time, "all systems nominal"), and small uppercase mono labels over large tabular values. **Everything moves plausibly**: prices follow a random walk with volatility clustering, telemetry has noise around a trend, contacts follow different track models, and the comms log waits out the light-time delay. **The genre's own conventions** are honoured (candles and depth bars, master caution and acknowledge, range rings and a sweep afterglow), so experts recognise it at once. The honesty strip ("Simulated market", "All telemetry simulated", "Training simulation: all contacts fictional") is part of the design, not a footnote.

## Architecture

1. **A simulation model, separate from the panels.** One `world` object advanced by `step(dt)` at a fixed rate (4–20 Hz for data, faster only for the primary canvas). Panels subscribe to it and read from it. Seed the generator (`mulberry32`) so a screenshot, a demo and a bug report can be reproduced.
2. **Honest demo data.**
   - Fictional names that can't be mistaken for real ones (tickers like AXLM, a vessel named ARES VII, contact IDs like S-0112).
   - A visible label on the page and in the `<title>` or description.
   - Plausible statistics: a Gaussian random walk with clustered volatility, mean-reverting sensor values, correct physics where it's cheap (Kepler orbits, light-time delay, sweep-and-decay).
   - Generate a history on load so charts are full on the first frame.
   - Never show invented performance claims ("+340% returns") as if they were the product's results.
3. **Layout: a named grid with one primary panel.** Use `grid-template-areas` on desktop (primary panel two columns wide, the others around it), a status bar across the top, and an event log at the edge. Panels have a header (a mono label, a live badge, a panel action) and hairline borders. Below about 900px, collapse into **tabs** (a `role="tablist"` bar: Chart · Book · Trade · Log), not an endless stack. Keep the status bar pinned.
4. **Linked selection.** One `selected` value in state (a ticker, subsystem or contact). Every panel highlights it, and every panel can set it: a click in the table, a click on the canvas (hit-test the nearest item within a radius), or a keyboard shortcut.
5. **Keyboard first.**
   - Number keys switch range or time frame, `/` focuses search, J/K or arrows move through lists, Enter locks or opens, Esc releases or closes, B/S opens a buy/sell ticket.
   - Show them in a `?` overlay and as `<kbd>` hints in panel headers.
   - Ignore shortcuts while typing in inputs, and scope canvas shortcuts (pan, zoom) to the focused canvas.
6. **Alerts with a lifecycle.** An alert goes `raised → acknowledged → resolved`. Raised means a flashing lamp, a banner, a log line and an optional tone. Acknowledged means a steady lamp and silence. Resolved clears it and logs it. One master caution control, reachable by keyboard. Rate-limit alerts and never stack more than one modal.
7. **Rendering discipline.**
   - Canvases sized for `devicePixelRatio`; static layers (grids, rings, bezels) on their own canvas, drawn only on resize.
   - Numbers in the DOM with `font-variant-numeric: tabular-nums` so columns don't jitter.
   - Change flashes as a class toggle (green up, red down) that alternates between two class names so it restarts every time.
   - Pause the simulation on `visibilitychange`, then catch up with a bounded number of steps.
8. **Accessibility of a live console.**
   - The event log is `role="log"` with `aria-live="polite"` and throttled; alerts use `role="alert"` once, on raise.
   - Each canvas has a text twin: the scope's contact table, a chart's OHLC readout of the hovered or latest candle, and an `aria-label` summarising the trend.
   - Status is never shown by colour alone: lamps carry text (NOM, CAUT, WARN) and prices carry a sign and an arrow.
   - Muted labels stay at 4.5:1 or better on the dark ground.
   - Reduced motion stops flicker, sweep afterglow trails and flashing banners, but not the data.
9. **Sound opt-in.** Beeps, pings and the quindar tone start only after a gesture and a visible sound toggle, rate-limited, one per alert.

## Key mechanics

```js
// plausible prices: Gaussian steps with clustered volatility (a simple GARCH-like update)
const gauss = r => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
function stepPrice(m, r) {
  const shock = gauss(r);
  m.vol = Math.sqrt(0.02 * m.base ** 2 + 0.9 * m.vol ** 2 + 0.08 * (shock * m.vol) ** 2);  // calm spells and bursts
  m.price = Math.max(m.tick, +(m.price * Math.exp(m.vol * shock)).toFixed(m.dp));
  return Math.sign(shock); }
```

```js
// fixed-rate simulation, decoupled from the frame rate, with bounded catch-up
let acc = 0; const STEP = 1 / 10;
function frame(dt) { acc = Math.min(acc + dt, 1);          // at most 1 s of catch-up after a hidden tab
  while (acc >= STEP) { world.step(STEP); acc -= STEP; }
  drawPrimary(world, acc / STEP);                          // interpolate the hero canvas only
  if (panelsDirty) paintPanels(world); }
```

```js
// alert lifecycle with one master caution control
function raise(a) { if (active) return; active = { ...a, state: 'raised' };
  master.dataset.state = 'raised'; master.setAttribute('aria-label', `Master caution: ${a.text}. Press to acknowledge.`);
  alertRegion.textContent = a.text; log('CAUTION', a.text); sound.beep(); }
function acknowledge() { if (active?.state !== 'raised') return; active.state = 'acked';
  master.dataset.state = 'acked'; master.setAttribute('aria-label', `Acknowledged: ${active.text}`);
  log('ACK', active.text); setTimeout(resolve, 12000 + Math.random() * 8000); }
```

```js
// radar: returns brighten when the sweep passes, then decay; hit-test clicks to lock
const since = (b, sweep) => ((sweep - b) % 360 + 360) % 360 / RPM_DEG;   // seconds since swept
const glow = c => Math.exp(-since(c.bearing, sweepDeg) / DECAY);
scope.addEventListener('click', e => { const p = toScope(e);
  const hit = contacts.reduce((best, c) => { const d = Math.hypot(c.sx - p.x, c.sy - p.y);
    return d < 18 && (!best || d < best.d) ? { c, d } : best; }, null);
  select(hit?.c ?? null); });
```

```css
/* the console grammar: tiny labels, big tabular values, hairlines, flashes that restart */
.panel { border: 1px solid var(--hair); background: var(--surface); }
.panel h2 { font: 600 10px/1 var(--mono); letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
.val { font: 400 clamp(18px, 2vw, 28px)/1 var(--mono); font-variant-numeric: tabular-nums; }
.up-a, .up-b { animation: flashUp .6s ease-out; }  .dn-a, .dn-b { animation: flashDn .6s ease-out; }
@media (prefers-reduced-motion: reduce) { .up-a, .up-b, .dn-a, .dn-b { animation: none; } }
```

## Variation levers

- **The genre:** a trading desk, mission control, radar or sonar, a power grid, air traffic, a fleet or warehouse, a CI pipeline, a SOC or incident console, a newsroom wire.
- **The era and material:** 1960s NASA (off-white on slate, orange), phosphor CRT (green or amber, with a scanline), a modern exchange (near-black, emerald and crimson), a submarine (blue-green), a paper ops board.
- **The primary instrument:** a candlestick chart, a trajectory diagram, a PPI scope, a network map, a Gantt of jobs, a heatmap of racks.
- **The theme toggle:** radar or sonar, UTC or Mars sol, phosphor green or amber, day or night shift.
- **The density:** trader-dense (every pixel a number) or ops-calm (fewer panels, bigger status).

## Business uses

- A fintech or data API showing its feed in a simulated terminal, with a "connect your key" call to action where the demo label sits.
- An observability or dev-tools product whose homepage hero is a working incident console: raise, acknowledge, resolve.
- A logistics company with a control tower of simulated shipments, delays and exceptions.
- A space, defence-adjacent or maritime training firm with a clearly fictional exercise console.
- An internal tool pitch or investor demo that shows the product's real workflow on synthetic data.

## Pitfalls

- Fake data that could be mistaken for real: real tickers, real ships, real people's names, or return claims. Use fictional names and label the simulation in the page and the metadata.
- Implausible motion: prices that drift off forever, sensor values that never vary, every panel updating on the same beat. Mean-revert, add noise, stagger rates.
- A bento grid in a dark theme: equal tiles with no primary panel and no linking. Pick one hero instrument and connect every panel to the selection.
- Shortcuts that fire while typing in the order ticket or search.
- Live regions that chatter. Throttle log announcements and announce alerts once.
- Colour-only status, and muted grey labels below 4.5:1 on near-black.
- Canvases blurry on high-DPI screens, or redrawing static grids every frame.
- Phones: a squeezed desktop grid. Use tabs with the primary panel first and the status bar pinned.
- An order ticket or "send" that looks like it does something real. Validate, confirm with a toast that says "simulated", and never collect real account details.

## Signals (what a user might say)

- "It should look like a real trading screen or control room."
- "Our customers stare at dashboards all day; show them ours."
- "Lots of live numbers, charts and panels moving."
- "Like mission control or a cockpit."
- "Can we show the product working without real customer data?"
- "Dark, dense, serious, for power users."
- "Everything should be usable from the keyboard."
- "Alerts that flash and need to be acknowledged."
- "A radar or map with things moving on it."
- "Make it feel like Bloomberg, but ours."
- "An internal tool that doesn't look like a spreadsheet."

**Not this format if…**

- The audience is non-technical consumers who need reassurance, not density; a calm living-data hero or editorial explanation fits better.
- There's no real workflow to simulate, so the panels would be decorative tiles (that's the bento-grid trap).
- The product can't be shown honestly with synthetic data (for example, it's regulated and any number could be read as advice or a promise).
