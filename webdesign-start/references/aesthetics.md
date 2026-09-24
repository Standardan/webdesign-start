# The beauty floor: colour, depth and composition

**Load at:** Phase 3 (colour and depth decisions go into the brief), Phase 4 (first-frame gate) and Phase 7 (review gate). Also for audit-only requests.

None of the 100 benchmark gallery pages looks ugly. That isn't taste or luck: all 100 follow the same measurable rules for colour, depth and composition. These rules were derived by measuring every page in OKLCH colour, blurred value maps, the DOM and the source code, and tested against a failed build (Hermosa Baking, 2026-09) whose colours clashed, whose scene had no depth, and whose angles and alignment looked wrong.

A site can be singular in concept and still fail this floor. **Every rule here is a gate, not a suggestion.** The tools in `scripts/` check the measurable parts; the rest is checked by eye against screenshots.

| Check | Tool | When |
|---|---|---|
| Palette harmony | `python3 scripts/palette_check.py tokens.json [screenshot.png ...]` | Phase 3 (tokens), Phase 4 (first frame), Phase 7 (a screenshot every 50–75% of a viewport through the whole page) |
| Focal value structure | `python3 scripts/squint_check.py frame.png C0,R0,C1,R1` (the subject only, at most 40 cells) | Phases 4 and 7: the first frame and the opening frame of every set piece, desktop and phone |
| Alignment, type scale, radii, rotation, focal overlap, measure | `scripts/composition_audit.js` pasted into the page, or run by your browser tool | Phases 4 and 7, at 1440×900 and 390×844 |
| Whole-page polish | `scripts/page_audit.js` in the page (it scrolls itself) | Phases 6 and 7, at 1440×900 and 390×844 |
| Gallery calibration | Side by side with 2 gallery pages of the same format (§4), first frame and whole page | Phases 4 and 7 |

`palette_check.py` needs only Python 3 for tokens, and Pillow for screenshots. `squint_check.py` needs Pillow. If a tool can't run, do the check by eye against the rule, and say it was done by eye.

---

## 1. Colour

Harmony comes from how colours *relate*, not which colours are chosen. Navy and orange appear together on several beautiful gallery pages. Hermosa failed because its navy and brown covered large areas at nearly the same darkness, its two accents fought, and its warm colours were dim surfaces instead of light.

### 1.1 Build the palette in this order

1. **Anchor hue (family A).** Take it from the subject's dominant light or material (blue-hour sky h 255–265, crust h 45–60, sage h 130–150). Write down its OKLCH hue.
2. **Temperature of neutrals.** Warm paper (h 60–105) or cool night (h 240–300), usually on the anchor's side. Every neutral (ground, surface, ink, muted, rules, grain) gets **chroma 0.008–0.035 at that hue**. Pure grey (C < 0.004) is only for declared stark concepts (Swiss, brutalist, monochrome).
3. **Ground.**
   - **Dark ground:** L 0.12–0.26 (limits 0.10–0.30) with C ≤ 0.07.
   - **Light ground:** L 0.90–0.97 (at least 0.88) with C ≤ 0.035.
   - Mid-lightness or high-chroma areas (a sky, the sea, a blueprint, wood) are *scene fields*, not text grounds. They are allowed as one family with a real value gradient; text on them sits on a plate or passes contrast.
4. **Value ladder.**

   | Step | Rule |
   |---|---|
   | Surface or card | ground ± 0.02–0.05 L, same hue, ΔC ≤ 0.01 |
   | Rule or hairline | ground ± 0.10–0.20 L |
   | Muted text | contrast ≥ 4.5:1 |
   | Ink | ≥ 0.60 L from the ground (gallery median 0.67–0.74), contrast 7:1 target, 4.5:1 floor |

5. **One accent hue.** Chroma 0.12–0.24. L 0.62–0.88 on dark grounds, 0.45–0.70 on light ones. Contrast ≥ 3:1 against its ground (≥ 4.5:1 where it is text). All accent tokens (hover, pressed, glow, focus ring) stay **within 10° of hue**; variants change only L and C. The accent covers **≤ 5% of the frame** (≤ 12% only for declared maximal or pop concepts). State its job in one sentence.
6. **Optional second family (B).** Allowed if it stays small (under 10% of the frame), or if it differs from A by **ΔL ≥ 0.30**. If A and B are more than 130° apart (near-complementary), they never share a value band over large areas, unless both are light (L ≥ 0.50). B should be the scene's *light* (a warm lamp on a cool night) or its *shade* (cool shadow on warm paper).
7. **At most two families** each covering ≥ 15% of the frame, and at most three covering ≥ 10%. Data and category colours are exempt only as small marks (under 5% each).
8. **Ramps lean yellow as they lighten.** Each family gets a 3–5 step ramp. Lighter steps turn toward h ≈ 100 and darker steps away from it: warm dark h 45–60, mid h 65–75, light h 80–95; blue lightens toward cyan (260 → 235). Every illustration, material and state colour is a step on a ramp, not a new hex. Across two tokens in one family, the lighter must never be the redder.
9. **No dark yellows as flat colour.** Hue 80–110 at L < 0.62 reads as olive. Darken gold toward bronze and amber (h 60–70). Dark yellow is allowed only as the shadow stop of a metal gradient.

### 1.2 Dark grounds

- Build the black from the anchor hue: L 0.10–0.22 at C 0.02–0.06 (indigo, violet-black, green-black), never `#000`.
- Give the ground a light source: a radial or vertical gradient of 0.05–0.15 L within the family, centred on the focal point.
- **Colours on a dark ground are lights.** Accents and warm areas sit at L ≥ 0.60. A warm *object* on a cool night must be lit (median L ≥ 0.55) or it turns to mud.
- On near-black, large surfaces may reach C 0.06–0.085 (night violets). Anything more saturated is a light.

### 1.3 Sections, gradients, light and shadow

- **Consecutive section grounds** change *value* (dark ↔ light, ΔL ≥ 0.5) or *hue within one family* (≤ 35°), never family at the same value. Hermosa went from navy L 0.26 to chocolate L 0.25. Join sections with a shaped edge or a gradient through a bridge hue.
- **Gradients:** adjacent chromatic stops ≤ 60° apart (≤ 90° in quiet areas). Stops further apart need both stops light (L ≥ 0.70), a value step of ΔL ≥ 0.15, an explicit bridge stop (night blue → violet-mauve → rose → peach), or `in oklch` interpolation. Never gradient between complementary colours at equal darkness.
- **Metal gradients** follow the ramp: highlight L 0.86–0.93 h 85–95 → body L 0.72–0.80 h 72–82 → shadow L 0.45–0.58 h 58–70.
- **Shadows** are the surface's own hue at lower L (or its tinted shade colour at ≤ 40% alpha), never the opposite family. **Highlights** are the light source's hue at higher L; warm light on cool objects becomes a rim of the accent at L ≥ 0.75, not a fill.
- **Illustration palettes are built from the UI ramps.** Every fill is within 10° of a ramp hue and inside its L range, plus at most one small "story spot" hue under 3% of the frame. Grain is tinted with the ground's darkest ramp step.

### 1.4 Clashes to reject (the checker flags most of these)

1. **Equal-value opposites:** two families more than 130° apart, each ≥ 10% of the frame, ΔL < 0.30, one below L 0.50. This is mud, and Hermosa's main failure.
2. **Dim warm on a cool night:** warm areas with median L < 0.55 covering over 10% of a dark cool frame.
3. **Twin accents:** two accent colours 10–30° apart. Pick one, or push them ≥ 60° apart with separate jobs.
4. **Inverted ramp:** the lighter token in a warm family is the redder one.
5. **Olive gold:** flat yellow (h 80–110, C ≥ 0.07) below L 0.62.
6. **Mid-value ground:** a text ground at L 0.30–0.88 that isn't a declared scene field.
7. **Loud large areas:** any area of 10% or more at C > 0.09 while a second family is present.
8. **Grey bridge:** a gradient across more than 90° of hue with no light stop, value step or bridge hue.
9. **Neutral grey on a tinted page:** C < 0.004 greys for text or rules in a warm or cool concept.
10. **Accent sprawl:** off-hue saturated pixels over 5% of the frame (12% for declared maximal concepts).
11. **Family-switch sections:** consecutive grounds in different families at the same value.

### 1.5 Tokens file for the checker

Write the palette tokens to a JSON file (for example `.webdesign-start/tokens.json`) and run the checker before showing the palette to the user:

```json
[{"name": "night", "hex": "#0a152a", "role": "ground", "area": 0.5},
 {"name": "flour", "hex": "#f4eee1", "role": "ink", "area": 0.05, "on": ["night"]},
 {"name": "glow", "hex": "#f7ac4d", "role": "accent", "area": 0.03},
 {"name": "leaf-shadow", "hex": "#9a632c", "role": "other", "area": 0.01, "stop": true}]
```

Roles: `ground`, `surface`, `ink`, `muted`, `accent`, `other`. `area` is the estimated share of the first frame. `on` lists the grounds a text colour sits on. `field` marks a scene field, `stop` a metal-gradient stop, and `maximal` a declared maximal concept.

---

## 2. Depth and light

The gallery never looks flat because every page chooses how it creates depth and then uses enough cues to deliver it. Hermosa had over 20 layers but no depth: three different projections in one frame, no cast shadows, glows where contact shadows belong, and a clock brighter than the window it was built around.

### 2.1 Declare a depth family for each surface

| Family | For | Mandatory cues | Plus at least two of |
|---|---|---|---|
| **Object-space** | Illustrated places, product objects, paper, clay, UI cards | One declared key light · grounded contact shadows · overlap between depth bands | rim or specular, cast shadow, atmospheric step, texture on objects, vignette, parallax |
| **Light-space** | Night, space, underwater, instruments, dark UI | One dominant light source with falloff · the brightest blurred mass on the subject · a vignette or darkness gradient | bloom, light pool on an implied floor, depth-scaled particles, rim light, haze |
| **Graphic-flat** | Posters, type-led pages, maps, data | No soft shadows or fake 3D · a wide value range, or emissive lines on near-black · display-to-body type ratio ≥ 6:1 | overprint, hard offset shadows all in one direction, texture |

**A place or a physical product is never graphic-flat.** Hybrids are fine (flat type over an object-space hero) as long as each surface declares its family in the brief.

**Minimum cues:** the hero uses **at least 5** of these 13, including its family's mandatory ones; every other designed section uses at least 3. The gallery median is 4, and every one of its 88 spatial pages uses 3 or more.

light pool or directional gradient on a volume · cast or contact shadow · overlap · texture on surfaces · glow or bloom · rim or specular highlight · vignette · extreme scale contrast · layered planes or parallax · atmospheric perspective · translucency or backdrop blur · true 3D projection · focus blur

### 2.2 One light, declared as tokens

```css
:root {
  --light-x: -0.6; --light-y: -0.8;   /* unit vector toward the key light; default upper left */
  --key: 255 244 225;                 /* key light colour (rgb triplet) */
  --fill: 120 150 210;                /* counter-light or ambient colour, opposite temperature */
  --shade: 38 26 18;                  /* the palette's shadow ink, used for every shadow */
}
```

- **One key and at most one counter-light** of opposite temperature. The counter only produces rims and ambient tint, never a competing hard shadow.
- **Everything derives from the vector:** shadows fall along `(−x, −y)`, highlights and gradient origins sit on the `(x, y)` side of each volume, rims go on edges facing the light.
- **Default to upper left** unless the scene has a visible source (a lamp, window, sun, oven). Then the light comes from that source, and shadows radiate from it.
- **World-fixed light:** when an object rotates or tilts, its highlight and shadow stay put.
- **Shadows** use `--shade` at 0.2–0.6 alpha. **Highlights** use `--key`, never pure white on matte materials.
- **Light has consequences in the first frame.** A lit window lights the ground below it, the wall around it and the undersides above it.

### 2.3 Elevation for interface surfaces

Five levels, with no more than three visible in one viewport. `S` is `rgb(var(--shade) / alpha)`; offsets shown for top light.

| Level | Use | Recipe |
|---|---|---|
| e0 flush | Inputs, rows, inset panels | `inset 0 0 0 1px S.08, inset 0 1px 0 rgb(var(--key)/.5)` |
| e1 resting | Cards, tiles, tags | `0 1px 1px S.06, 0 2px 6px S.06, 0 14px 30px -18px S.28` |
| e2 raised | Hover, sticky bars, selected | `0 1px 2px S.08, 0 6px 14px S.10, 0 28px 48px -22px S.36` |
| e3 floating | Menus, popovers, floating objects | `0 2px 4px S.10, 0 12px 24px -6px S.16, 0 40px 70px -28px S.42` |
| e4 overlay | Modals, device mockups, hero products | `0 3px 6px S.12, 0 24px 48px -12px S.24, 0 70px 110px -40px S.5` |

Blur is about twice the offset. The contact layer stays at y ≤ 3px. Cards and glass add a 1px lit inner edge on the light side. Hover moves up exactly one level. A coloured primary action may tint its shadow with its own hue.

### 2.4 Grounding objects

Everything that rests on something gets three parts:
1. **Occlusion core:** the darkest spot where object meets surface. An ellipse (width:height 7:1 to 10:1), 80–110% of the footprint, `--shade` at 0.45–0.65, barely blurred.
2. **Cast shadow:** offset away from the light, opacity 0.2–0.35, softer with distance, clipped to the surface it falls on.
3. **Underside darkening** on the object itself, 15–25% toward the contact.

**Never put a glow under a contact point.** A light pool goes around or beside the object, toward the source. Hanging objects cast shadows on the wall behind them. Floating objects keep a detached shadow that shrinks and fades as they rise.

### 2.5 Angles and perspective in drawn scenes

1. **One projection per scene, written in the brief:**

   | Projection | What must be true |
   |---|---|
   | Flat elevation | No receding lines at all. Depth comes from overlap, thin side faces all on the side away from the light, and cast shadows at one angle |
   | 1-point | One horizon at eye height; every receding edge meets one vanishing point on it; verticals stay vertical |
   | 2-point | Two vanishing points on the same horizon, at least 2.5× the subject's width apart (usually outside the frame) |
   | Isometric or axonometric | Parallel lines stay parallel. Isometric uses 30°; clean 2:1 dimetric uses 26.565°; free axonometric states its angles |

2. **One horizon for everything.** Surfaces above it show their undersides (awning soffits, shelf undersides). Surfaces below it show their tops (pavement, shelf tops, tables). No object shows both views of one plane.
3. **Place the eye deliberately.** For a street-level scene, the horizon sits 32–40% up from the pavement, inside the frame, never far above it.
4. **No near-axis angles.** A receding line leans at least 12° from horizontal or vertical. A square line is exactly 0°. Anything 1–8° off reads as a mistake.
5. **Repetition diminishes with distance** (paving joints, slats, tiles) in perspective, and stays constant in axonometric.
6. **Thickness is mandatory:** window reveals, sills, door recesses, sign edges, clock cases.
7. **Projecting forms cast shadows** (awnings, sills, signs, lamps) consistent with the key light, falling across what's behind them.
8. **Check convergence.** Tag receding lines `data-vp="L|R|C"` and confirm each family meets within 2% of the scene width (the snippet in §2.7).

### 2.6 Value structure (the squint test)

- **The subject is the strongest thing on the screen.** Blurred to 16×10 cells, the brightest cell (dark and mid scenes) or darkest cell (light scenes) sits on the declared focal area. `squint_check.py` fails the frame otherwise. On gallery pages this is always true: the lit bottle, the sun through the hourglass, the lighthouse lamp.
- **Nothing else competes:** no clock, badge, button or panel brighter than the subject.
- **Enough range:** focal pull and value range above the gallery's 10th percentile (35 and 40 levels); the script warns below that.
- **No dead zones:** a flat block of one colour (an empty wall, a bare pavement, a blank sign) covering 8% or more of the frame that isn't the page's ground. Grade it, texture it, put something in it, or crop it out. Check this by eye.
- **Atmospheric perspective:** each depth band steps 8–15% toward the sky or haze colour and loses about 20% of its contrast. The farthest band sits within 15 L of the sky, and the nearest band holds the extreme values. Warm, saturated accents live in the near plane.
- **Depth bands:** a hero has at least 4 (typically 6–12), each different from its neighbours in value, scale, parallax rate (far:near at least 1:6) or shadow size. At least one foreground element overlaps the subject or crops the frame edge.

### 2.7 Recipes

```css
/* derived shadow and highlight from the light vector */
.lit { box-shadow: calc(var(--light-x) * -12px) calc(var(--light-y) * -18px) 40px -14px rgb(var(--shade) / .32),
         inset calc(var(--light-x) * -1px) calc(var(--light-y) * -1px) 0 rgb(var(--key) / .45);
  background-image: radial-gradient(120% 90% at calc(50% + var(--light-x) * 30%) calc(50% + var(--light-y) * 30%),
    rgb(var(--key) / .16), transparent 60%); }
```

```js
// Lambert shading for the faces of boxes, awnings, sills: every face from one light
const L = norm([-0.55, -0.35, 0.76]);
const shade = (n, dark, light, amb = .22) => { const k = amb + (1 - amb) * Math.max(0, dot(norm(n), L));
  return `rgb(${dark.map((v, i) => Math.round(v + (light[i] - v) * k))})`; };
// front [0,0,1], left side [-1,0,0], top [0,-1,0], underside [0,1,0]
function dot(a, b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }  function norm(v) { const m = Math.hypot(...v); return v.map(x => x / m); }
```

```js
// cast shadow of a form projecting `depth` from the wall, for light elevation `el` and side angle `az` (degrees)
const wallShadow = (pts, depth, el, az) => { const dy = depth * Math.tan(el * Math.PI / 180), dx = -depth * Math.tan(az * Math.PI / 180);
  return 'M' + pts.map(([x, y]) => `${x + dx} ${y + dy}`).join(' L') + 'Z'; };
```

```js
// vanishing-point audit: tag receding lines data-vp="L|R|C"; each family should meet within 2% of the width
function vpAudit(svg, tol = .02) { const W = svg.viewBox.baseVal.width, fam = {};
  svg.querySelectorAll('[data-vp]').forEach(p => (fam[p.dataset.vp] ??= []).push([p.getPointAtLength(0), p.getPointAtLength(p.getTotalLength())]));
  for (const [k, ls] of Object.entries(fam)) { const h = ls.slice(1).map(l => meet(ls[0], l)), cx = h.reduce((s, p) => s + p.x, 0) / h.length,
    cy = h.reduce((s, p) => s + p.y, 0) / h.length, worst = Math.max(...h.map(p => Math.hypot(p.x - cx, p.y - cy))) / W;
    console.log(`VP ${k}: worst miss ${(worst * 100).toFixed(1)}% ${worst > tol ? 'FAIL' : 'ok'}`); } }
function meet([a, b], [c, d]) { const r = ((c.x-a.x)*(d.y-c.y)-(c.y-a.y)*(d.x-c.x)) / ((b.x-a.x)*(d.y-c.y)-(b.y-a.y)*(d.x-c.x)); return { x: a.x + r*(b.x-a.x), y: a.y + r*(b.y-a.y) }; }
```

```css
/* atmospheric perspective by depth band: --z 0 = nearest … 1 = farthest */
.band { fill: color-mix(in oklab, var(--base), var(--haze) calc(var(--z) * 55%));
  filter: contrast(calc(1 - var(--z) * .35)) saturate(calc(1 - var(--z) * .4)); }
```

---

## 3. Composition and geometry

The gallery's pages hold together because every edge, size, angle and gap is either exactly aligned or clearly different. Hermosa's shopfront sat at 53% of the width (almost centred), its panel used a different margin from the header, its headline curved along a path that followed nothing, and its type used five sizes within a 1.5× range.

### 3.1 Focal point and balance

- **One focal subject per viewport**, marked in code with `data-focal` so the audit can find it.
- **Placement:** exactly on the axis (within 0.8% of the width) or clearly off it (at least 6%, in practice on or beyond a third). **1–5% off centre fails.**
- **Size:** at least 20% of the desktop viewport (25% on phones). Objects and instruments 55–80% of the viewport height; scenes full-bleed; type-as-subject at least 70% of the width.
- **Balance:** declare it *symmetric* (heritage, ceremony, a centred object) or *asymmetric* (editorial, product split, subject on a third). Asymmetric splits run 40:60 to 50:50. A frame mixing the two fails (a centred scene with a heavy panel on one side).
- **Controls are never brighter than the subject.** The primary action is at most the second-strongest element.

### 3.2 Alignment and grid

- **One gutter value** used by the header, hero copy, sections and any panels. Two gutter formulas fail.
- **Left text edges:** at most 8 distinct on desktop and 5 on phones, with 2–4 shared edges carrying most of the text. (Instruments, games and dashboards may go to 12 and must say so.)
- **No near-misses:** two block edges are aligned (within 2px) or at least 24px apart. 3–10px apart fails.
- **No tangents:** a block edge never lands within 12px of a major art edge (a frame, a horizon, a silhouette). Overlap it clearly (24px or more, as a designed overlap) or clear it by 24px.
- **Grid:** a 12-column grid, `fr` ratios between 0.8 and 1.25, or a symmetric `1fr auto 1fr`. A deliberate break (a bleed, an overhang) extends at least one gutter past the grid, never 2%.

### 3.3 Spacing, type and measure

- **Spacing scale:** base 8px (4px for dense instruments): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding `clamp(64px, 10vw, 160px)`. Gaps between groups are at least 2× the largest gap inside a group. Text inside a frame, sign or panel keeps an inset of at least 0.75× its cap height; text never touches its container.
- **Type in three tiers with jumps:**
  - Labels 10–13px, tracked 0.08–0.3em, at most 2 sizes.
  - Text 15–20px body; the whole 14–27px band holds at most 4 sizes on desktop (3 on phones), neighbours at least 1.2× apart.
  - Display at least **3× the running text on desktop and 2× on phones** (gallery median 3.5×).
  - At most one size between 28px and the display size. At most 4 hierarchy levels per viewport, 3 tracking values, display line-height 0.9–1.1, body 1.45–1.65.
- **Display type gets no effect stacks.** One shade or one stroke, and only when a named lettering tradition calls for it. Lettering is drawn at true proportions: never `lengthAdjust="spacingAndGlyphs"`, never a non-uniform scale.
- **Measure:** running text 45–75 characters per line (at least 28 on phones), ledes 30–46, long reading 60–66, captions 12–30.

### 3.4 Radii, rotation and curved type

- **Radii:** declare 0, 1 or 2 radii for filled boxes, taken from the material (print, signage, concrete, Swiss 0–3px; glass or soft UI one value of 16–28px; clay or toy 18–26px). Circles and pills are for controls, dots and seals only. Inner radius = outer radius − padding, or 0. `border-image` squares corners, so pair it only with radius 0.
- **Rotation is strictly 0° by default** (77 of the 100 gallery pages rotate nothing). It is allowed only for:
  - loose physical objects on a surface (notes, photos, tags) with a declared set such as {−3°, −1.5°, +2°, +4°};
  - tape at 35–45°;
  - stamps and seals at one angle between −8° and −2°;
  - a collage system with one declared set;
  - a fan with a constant step;
  - angles that show a value (dials, gauges).

  Declare the set on the root element (`<html data-angles="-3,-1.5,2,4">`). **Headlines, panels, frames, cameras and sections are never rotated between 0.3° and 3°**, and display type is rotated only inside a collage system.
- **Curved text** follows a circle concentric with a drawn circular form (a dial, a seal, an arch, a record), or a path drawn in the art (a ribbon, a horizon), marked `data-drawn`. A shallow "smile" curve under straight elements fails. One baseline logic per lockup: all straight, or all on the same circle.

### 3.5 Overlap, space and edges

- **Overlap is designed or absent:** at least 24px (or 15% of the smaller element) with a reason (art crossing type, a figure between words). Anything smaller is a collision. Panels and text cover at most 15% of the focal subject unless marked `data-overlap-ok` and justified in the brief. Type over art sits on a quiet area or on a plate made of the world's material.
- **Negative space:** at least 40% of the first viewport is quiet on editorial and marketing pages (gallery median 53%); instruments and fields at least 20%.
- **Density:** the first viewport holds at most about 90 words and 10 controls on desktop, 50 words and 5 controls on phones. Each fact appears once.
- **Crops:** a bleed crops at least 10% of the element (1–9% looks like a bug). A peek shows at least 15% of the next item. The subject's key feature (a door, a face, a dial) stays at least one gutter from the viewport edge from 360 to 1920px wide.

### 3.6 Phones

Choose one recomposition and name it in the brief:
1. art first, type below (the object takes 55–65% of the screen);
2. type in the scene's quiet zone (the subject moves to an edge);
3. the scene redrawn in portrait (restacked vertically);
4. type first, then the object.

The subject keeps at least 25% of the first screen, and information and controls take at most 35%. Anything with a named interaction stays on screen at 390px, or gets a visible substitute. The display-to-text ratio stays at 2× or more, with at most 3 text sizes and one shared 16–24px gutter.

---

## 4. Gallery calibration

Numbers catch most failures, but beauty is also judged by eye. At Phase 4 and Phase 7:

1. Pick **two gallery pages in the same format** (`formats/index.md` lists them) and screenshot or open them at the same size as your first frame. Their thumbnails are at `https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/` (open the page) or in the source repository's `thumbs/` folder.
2. Put your screenshot beside them and compare, one at a time: **colour** (does yours feel as harmonious and intentional?), **depth** (as dimensional and lit?), **composition** (as clear a focal point, as clean an alignment?), **finish** (as polished at the edges, the type and the details?).
3. If yours is weaker on any of the four, it fails. Name the gap, fix it, and compare again. "Different style" is not an excuse for weaker colour, depth or composition.
4. **In Phase 7, compare the whole page:** scroll yours and the two gallery pages side by side, section by section. The first frame is where effort goes naturally; the middle of the page is where it runs out.

## 5. The gate

A first frame or a finished page passes the beauty floor only when all of these hold, at 1440×900 and 390×844:

- [ ] `palette_check.py` passes on the tokens and on screenshots at every 50–75% of a viewport through the whole page.
- [ ] `squint_check.py` passes on the first frame and each set piece's opening frame, with an honest focal area (the subject itself, at most 40 cells).
- [ ] `composition_audit.js` and `page_audit.js` report no findings, or each remaining finding is an exception the user agreed to (never self-granted).
- [ ] Each surface's depth family is declared, and the hero shows at least 5 depth cues including the mandatory ones.
- [ ] One key light, consistent shadows and highlights, grounded objects, no glow under contact points.
- [ ] Drawn scenes: one projection, one horizon, converging lines, no near-axis angles, thickness on architecture and objects.
- [ ] No dead zones, no near-miss edges, no stray rotations, no stretched or effect-stacked lettering.
- [ ] Calibration: not weaker than two same-format gallery pages on colour, depth, composition or finish, on the first frame and scrolled side by side through the whole page.

Record the tool outputs and the calibration verdict in the review report.
