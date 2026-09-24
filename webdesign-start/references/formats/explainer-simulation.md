# Format: explainer / simulation

**Load when:** the concept teaches how something works by letting people operate a faithful model of it: a fold sequence, a linkage, a field, a wave, a gravity well, a drawing that drafts itself. Fits products with a real mechanism (hardware, tools, engines, locks, watches), education, science, engineering, architecture and "how it works" sections. The model is the hero; the interface is the lab bench or the instrument around it.

**Study:** gallery 027 (paper crane folded in eight steps), 093 (a Jansen-linkage walker solved every frame), 056 (a house plan that drafts itself, with plan, elevation and section views), 004 (a brass orrery at true orbital periods). Also 052 (DNA helix with leader-line annotations), 095 (magnetic field in three renderings), 100 (ripple tank with experiment presets and a probe), 030 (n-body gravity), 055 (falling sand), 013 (Game of Life as knitting), 042 (Mandelbrot explorer with bookmarks).

## Three variants

- **Stepper (027, 056):** a fixed sequence of authored states. Next and previous buttons, a progress rail, one instruction per step, and a continuous interpolation between states so every step can be scrubbed.
- **Mechanism (093, 004, 052):** a closed-form model driven by one input (a crank angle, a date, a sequence). The user turns the input; everything else is derived from it every frame.
- **Sandbox (095, 100, 030, 055, 013):** an open simulation with tools and presets. The user places things and watches the rules act. Presets are the curriculum.

## What makes it work

- **The model is real.** 004 uses true orbital periods, 093 the canonical Jansen link lengths, 052 10.5 base pairs per turn, 095 an inverse-square pole model. Visitors trust what they can poke, and the brand borrows that trust.
- **One honest model note.** Each strong page states in one sentence what is true and what is simplified: "periods and order are true; distances are log-compressed" (004), "faithful outside the magnets; strengths in arbitrary units" (095). It sits next to the model, not in a footer.
- **One input that makes the principle obvious.** A crank, a wind slider, a step rail, a drag-to-fling. The principle becomes visible because the user caused it.
- **Presets as lessons.** 100's double slit, lens and parabolic dish; 095's attracting and repelling pairs; 030's figure-eight orbit. Each preset is a question with its answer already running.
- **The instrument around the model is in the subject's material:** brass plaques (004), a blueprint title block (056), a lab notebook (093), knitting needles and a row counter (013). See `craft.md` §5.
- **Readouts that name the physics.** Crank angle, pace, field magnitude, total energy, row count, room area. Numbers change as the user acts, so cause and effect stay linked.

## Architecture

1. **Pick the model and write its fact sheet first.** List the constants, units and sources (a spec sheet, a patent drawing, a textbook, the client's CAD) in a comment block at the top of the script. Mark each value as *exact*, *approximate* or *invented for illustration*. A client mechanism uses the client's real dimensions; if they are unavailable, say so and label the model as illustrative.
2. **Separate model, view and input.** A pure `state(t)` or `solve(input)` function returns positions; the renderer only draws. This makes stepping, reduced motion, screenshots and tests possible.
3. **Choose the exploration model.**
   - *Stepper:* an array of authored poses plus a continuous `pos` that eases toward an integer `target`. Buttons, arrow keys and the rail set `target`; the renderer interpolates.
   - *Mechanism:* one driving parameter with a speed control that includes 0 (pause) and a manual control (crank, slider, scrubber).
   - *Sandbox:* tools (place, drag, erase, probe), 3–6 presets, pause and single-step, reset.
4. **Fix the timestep for physics.** Accumulate real time and advance the model in fixed steps (velocity Verlet or symplectic Euler for orbits; a fixed dt for wave grids). Clamp substeps per frame so a background tab does not explode the simulation.
5. **Annotate the model, not the page.** Leader lines from numbered markers on the model to short notes in a side panel (052). Hovering or focusing a note highlights its part, and the reverse. Keep each note to two or three sentences in plain language.
6. **Detail panel for parts.** Clicking or pressing Enter on a part (a planet, a room, a base pair, a link) opens a panel with its name, its real value and one sentence of explanation. Escape closes it and returns focus to the part.
7. **Views and renderings as tabs.** Plan / elevation / section (056); filings / field lines / heat map (095). Use `role="tablist"`, keep the model state across views, and cross-fade or redraw between them.
8. **Keyboard access.**
   - Arrow keys step (stepper) or nudge the driving input (mechanism); Page Up and Page Down take a large step (004 moves a year).
   - Parts are focusable with `role="button"` and a name that includes their value.
   - The canvas region gets `tabindex="0"`, an `aria-label` that explains the controls, and arrow-key pan.
   - A live region announces the current step or reading, throttled to changes a person would care about.
9. **Reduced motion.** Pause autoplay and idle loops, jump between steps instead of animating, and keep manual controls working. Draw-on animations render complete.
10. **Text alternative.** A short written sequence (for a stepper) or a table of the model's constants (093 publishes its link lengths as a `<table>`) so the explanation survives without the canvas.

## Key mechanics

```js
// stepper: authored poses, continuous position easing toward the chosen step
let pos = 0, target = 0;
const go = i => { target = clamp(i, 0, STEPS.length - 1); announce(STEPS[target].line); };
function frame(dt) {
  pos += (target - pos) * (1 - Math.exp(-dt * 6));            // frame-rate independent
  const k = Math.min(Math.floor(pos), STEPS.length - 2), s = smooth(pos - k);
  render(blendPose(STEPS[k].pose, STEPS[k + 1].pose, s));
}
```

```js
// mechanism: a joint from two known joints and two link lengths (circle-circle intersection)
function joint(a, b, ra, rb, side = 1) {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
  const along = (ra * ra - rb * rb + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, ra * ra - along * along)) * side;  // pick the branch once, keep it
  return { x: a.x + (dx * along - dy * h) / d, y: a.y + (dy * along + dx * h) / d };
}
```

```js
// sandbox: fixed-step integration, capped so a slow frame cannot blow up the model
const DT = 1 / 240; let acc = 0;
function tick(realDt) {
  acc = Math.min(acc + realDt * speed, DT * 12);
  while (acc >= DT) { step(DT); acc -= DT; }       // velocity Verlet or grid update inside step()
  draw();
}
```

```css
/* self-drafting drawing: normalise every path length, stagger by layer (walls, openings, dimensions) */
.draft path { stroke-dasharray: 1 1; stroke-dashoffset: 1;
  transition: stroke-dashoffset var(--dur, .9s) cubic-bezier(.5, .1, .3, 1) calc(var(--layer) * .35s + var(--i) * 20ms); }
.draft.is-drawn path { stroke-dashoffset: 0; }       /* each <path pathLength="1"> */
@media (prefers-reduced-motion: reduce) { .draft path { transition: none; stroke-dashoffset: 0; } }
```

```js
// probe: sample the model at a point and plot a rolling trace (oscilloscope, readout, compass)
const trace = new Float32Array(240); let head = 0;
function probe(x, y) { trace[head] = model.sample(x, y); head = (head + 1) % trace.length; }
```

## Variation levers

- **The instrument:** a brass orrery, a lab bench, an engineer's notebook, a blueprint sheet, a museum cutaway, a textbook plate.
- **The input:** a crank, a slider, a step rail, a scroll position, a drag, a typed sequence (052), the real clock.
- **The rendering:** true-3D projection, flat diagram, engraving, pixel grid, streamlines, heat map. Offer two or three renderings of the same model when each teaches something different.
- **Openness:** a strict stepper, a guided sandbox with presets, a free sandbox.
- **Honesty dial:** exact model, scaled model (log distances, slowed time), or illustrative model. State which.

## Business uses

- A lock maker: the key turns, pins rise to the shear line one by one, and the user can try a wrong key.
- A mechanical watch brand: the escapement ticks at its real beat rate, with a crank to wind it and a slow-motion toggle.
- An architect: each project's plan drafts itself; a tab switches to section; rooms report their real areas.
- A heat-pump installer: a refrigerant loop you can step through (compress, condense, expand, evaporate) with temperatures at each stage.
- A physics or maths course: each lesson opens on a preset of the same sandbox.
- A bike or e-bike brand: the gear train with a cadence slider and a readout of speed at each gear.

## Pitfalls

- A pretty model that is wrong. A single impossible pose or wrong ratio destroys the trust the format exists to earn. Check against the source and screenshot every step.
- No model note, or a note that overclaims ("to scale" when distances are compressed).
- Branch flips in linkages: circle intersections have two solutions; choose one and keep it, or legs snap inside out.
- Frame-rate-dependent physics, and simulations that explode after a background tab. Use fixed steps and caps.
- Every control shown at once. Lead with one input and the presets; put advanced sliders behind a disclosure.
- The canvas as the only way in: no keyboard path, no text sequence, no table of values.
- Annotations that drift away from the parts they label when the model rotates. Recompute anchor points every frame.
- Grid and particle sandboxes that melt phones. Size grids from area and cap them (see `techniques.md` §8).

## Signals (what a user might say)

- "I want people to actually see how it works."
- "Our product is hard to explain in words."
- "Can visitors play with it?"
- "Show the mechanism inside."
- "Like those interactive science museum exhibits."
- "Walk them through it step by step."
- "I want a 'how it's made' section that isn't a video."
- "Engineers and nerds are our audience; they'll want the real numbers."
- "Let them try different settings and see what happens."
- "Our drawings and plans are beautiful; can the site use them?"
- "It should feel like a toy, but teach something."

**Not this format if…**

- There is no real mechanism or principle to model, only benefits and outcomes. A faked model would be dishonest; use an editorial or signature-reveal format instead.
- The visitor's job is to browse, compare or look up many items. That is a data reference (`data-reference.md`).
- The client cannot supply or approve the real dimensions, and an illustrative model would mislead buyers about the product.
