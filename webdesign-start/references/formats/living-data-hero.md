# Format: living data hero

**Load when:** the business's value is reach, flow, coverage or throughput (infrastructure, networks, logistics, payments corridors, travel, energy, marketplaces) and there is a **real structure to draw**: real locations, a real topology, a real schedule.

**Study:** gallery 083 (Connected, a dot-matrix globe). Also 012 (Nimbus), 044 (tide and moon clock) and 089 (radar console).

**Don't use it** when the product has no geography or flow (a globe is then decoration), when the business is local (draw the city, not the planet), or when no one can say what the dots mean.

## What makes it work

A procedurally drawn object with real structure, plus motion that reads as activity, **already busy on the first frame**, with a small readout rail attached. Every visual variable carries meaning. In 083, coral arcs are eastbound and gold arcs are westbound.

## Architecture

1. **Write the semantics sentence first:** "Each dot is ___; each moving thing is ___; colour means ___; the readouts count ___." If you can't finish it, choose another format.
2. **Choose the object, style and silhouette** (see the levers below) from the business, not from the category cliché.
3. **Encode the structure with no external assets** (a bitmask string, a polygon list, a node/edge list), and decode it once into typed arrays.
4. **Build static geometry once** per density tier (phone or desktop). Never rebuild it per frame.
5. **Render in layers:**
   - a baked background (redrawn on resize only);
   - the object body (a disc, halo and rim from a few gradients);
   - points batched by colour bucket;
   - flows with a head, a tail and an arrival;
   - markers and labels with a collision pass;
   - the HTML overlay (title, rail, legend).
6. **Keep the simulation separate from drawing,** driven by `dt` and a **seeded** random generator. Cap the number of live flows. Arrivals fire events for the rail.
7. **Pre-roll:** spawn flows at random progress, fill the history buffers, and give every readout a value before the first paint. There must be no "—" on frame one.
8. **Camera:**
   1. a rest pose;
   2. idle drift;
   3. drag with inertia;
   4. fly-to on selection;
   5. a return to idle after 3–4s.

   Pointer, keyboard and list buttons all call the same `focusOn(id)`.
9. **Readout rail:**
   - one hero figure;
   - a small history chart;
   - 3–5 secondary figures;
   - a "happening now" line;
   - a provenance label (the source and "as of" time, or DEMO).

   Update the DOM at 2–4Hz, with tabular numerals.
10. **Page integration:** pause when the hero is off-screen or the tab is hidden, debounce resize, and never trap vertical touch scrolling.
11. **Reduced motion:** freeze on a composed frame. Flows become static drawn routes, numbers show a snapshot marked "as of …", and selection still works instantly.

## Key mechanics (original sketches)

```js
// even points on a sphere (golden-angle spiral), classified once
function spherePoints(n, classify) {
  const P = new Float32Array(n * 4), g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) { const y = 1 - (2 * i + 1) / n, r = Math.sqrt(1 - y * y), a = g * i;
    const x = r * Math.sin(a), z = r * Math.cos(a), k = i * 4; P[k] = x; P[k+1] = y; P[k+2] = z;
    P[k+3] = classify(Math.asin(y) * 57.2958, Math.atan2(x, z) * 57.2958); }
  return P;
}
```

```js
// geography with no image: 36 rows × 72 columns of 5° cells as hex bits (~650 bytes), sampled smoothly
const ROWS = MASK_HEX.split(',');
const bit = (r, c) => { r = Math.min(35, Math.max(0, r)); c = (c % 72 + 72) % 72;
  return (parseInt(ROWS[r][c >> 2], 16) >> (3 - (c & 3))) & 1; };
function landness(lat, lon) { const fr = (90 - lat) / 5 - .5, fc = (lon + 180) / 5 - .5;
  const r = Math.floor(fr), c = Math.floor(fc), u = fr - r, v = fc - c;
  return (bit(r, c) * (1 - v) + bit(r, c + 1) * v) * (1 - u) + (bit(r + 1, c) * (1 - v) + bit(r + 1, c + 1) * v) * u; }
```
For finer coasts, use a 2.5° mask (about 2.6KB) or about 40 hand-placed continent polygons. Label the map "schematic".

```js
// rotate (yaw, then pitch) and project orthographically without allocating
const V = { x: 0, y: 0, z: 0 }; let cy = 1, sy = 0, cp = 1, sp = 0;
function setCamera(yaw, pitch) { const a = yaw * Math.PI / 180, b = pitch * Math.PI / 180;
  cy = Math.cos(a); sy = Math.sin(a); cp = Math.cos(b); sp = Math.sin(b); }
function view(x, y, z) { const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
  V.x = x1; V.y = y * cp - z1 * sp; V.z = y * sp + z1 * cp; return V; }   // screen: cx + V.x*R, cy - V.y*R
```

```js
// great-circle flow, lifted by distance; hidden only when behind AND inside the disc
function flowPoint(a, b, t, lift, out) {
  const d = Math.min(1, Math.max(-1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2])), w = Math.acos(d), s = Math.sin(w) || 1e-6;
  const ka = Math.sin((1 - t) * w) / s, kb = Math.sin(t * w) / s, h = 1 + lift * w * Math.sin(Math.PI * t);
  for (let i = 0; i < 3; i++) out[i] = (a[i] * ka + b[i] * kb) * h; return out; }
const hidden = v => v.z < 0 && v.x * v.x + v.y * v.y < 1;
```

```js
// drag with inertia that keeps page scroll on phones (CSS: canvas { touch-action: pan-y; })
el.addEventListener('pointermove', e => { if (!dragging) return; const dt = Math.max(1, e.timeStamp - lastT), dx = e.clientX - lastX;
  cam.yaw -= dx * degPerPx; vx = .8 * vx + .2 * (-dx * degPerPx / dt); lastX = e.clientX; lastT = e.timeStamp; });
function coast(dt) { if (!dragging) { cam.yaw += vx * dt; vx *= Math.exp(-dt / 350); } }   // degPerPx = 57.3 / R
```

Batch points into about 8 brightness buckets from preallocated buffers, with one `fill()` per bucket. Beyond about 50k points, move to WebGL.

## Variation levers

Pick one **object**, one **style** and one **silhouette**, all taken from the business.

| Object | Structure | Moving thing | Fits |
|---|---|---|---|
| Globe | Sphere points + mask | Great-circle arcs | Global networks, payments corridors, travel |
| Network graph | Seeded force layout, solved before boot | Packets along edges | Security, APIs, knowledge products |
| Orbit system | Kepler ellipses | Bodies, conjunction flashes | Scheduling, recurring billing, space |
| City grid | Seeded streets with road ranks | Vehicles, lit windows by time | Mobility, delivery, local services |
| River map | Hand-authored polylines with widths | Particles along the flow | Water, energy, data pipelines |
| Supply line | One long polyline with stations | Units with dwell times | Logistics, cold chain, provenance |
| Field | Seeded vortices | Streamlines and trails | Climate, agritech, analytics |

**Styles:**
- **Dot-matrix glass:** midnight ground, one cool and one warm hue.
- **Engraved:** hatched ink on cream, one spot colour.
- **Halftone:** dot size carries value, CMY misregistration.
- **Neon:** additive strokes on near-black.
- **Paper cut-out:** layered fills with offset shadows.
- **Blueprint:** white line work on Prussian blue.
- **Terminal:** glyphs as points, stepped 12fps refresh.

**Silhouettes:**
- a full disc beside the text;
- a horizon crop rising from the bottom edge;
- a dim backdrop behind a centred headline;
- a cutaway;
- an edge-to-edge strip;
- the object inside an instrument bezel.

**Readouts:**
- a glass rail;
- an editorial margin ledger;
- placards on the object;
- a departure-board flap;
- a ticker;
- one enormous number.

The default of midnight, cyan dots, a globe and coral arcs is the category cliché. Earn it with meaning, or change the object, style or silhouette.

## Honesty

- Use real coordinates only for places the business actually serves. Label approximate maps "schematic".
- Put demo data labels **next to the numbers, in visible text, at every width**. 083 hid its "simulated" labels on phones.
- Never imply scale the business doesn't have. Use real numbers with a source and "as of" time, or unit-free demo figures clearly marked.
- If a live feed fails, show the last snapshot marked stale, never invented numbers presented as live.
- Screen readers get a static summary, not animated numbers.
- Keep units consistent between markup, script and copy.

## Pitfalls

- Flows crossing the headline. Define exclusion rectangles around the title and rail.
- Label soup. Run a placement pass and show only the top N labels.
- Empty readouts on the first frame. Pre-roll every counter.
- Reduced motion that still moves. Stop the flows too, not just the camera.
- `touch-action: none` on full-width canvases, which traps phone scrolling.
- Per-frame allocation and per-mark gradients. Use sprites and typed buffers.
- Unseeded randomness, which makes review screenshots unrepeatable and allows ugly first frames.
- Slerp breaking down for antipodal or identical endpoints. Pitch flipping at the poles.

## Signals (what a user might say)

- "Show our global reach" / "we're in 40 countries."
- "All the connections", "the network", "everything flowing."
- "Our infrastructure is the product."
- "Like a live map of what's happening."
- "Investors should see the scale."
- "Shipments / payments / data moving around the world."
- "Tech, but beautiful, not a stock photo of servers."
- "Real-time" (ask whether there's real data).

**Not this format if:** the business is local or has no flow; no one can say what the dots mean; or there's no real data and nobody wants a clearly labelled demo.
