# Format: generative studio (a seeded artwork for every visitor)

**Load when:** the concept is a generator that makes a unique, finished artwork per click, per seed or per visitor, and presents it as a numbered, named edition with presets and export. Fits brand imagery systems, per-customer or per-order art, event and attendee posters, collectibles without crypto, limited packaging runs, greetings, and any brand whose promise is "no two alike".

**Study:** gallery 065 (generative quilt), 034 (flow-field studio), 084 (snowflake generator), 066 (planet forge), 097 (harmonograph). Also 086 (cellular-automaton tapestries), 045 (stained glass), 071 (palette generation), 049 (riso print separations).

## What makes it work

One algorithm is wrapped in one material with a real tradition: quilting blocks, a loom, leaded glass, a pendulum pen, ice crystals, a planetary survey. Because of that, every output reads as a *crafted object*, not "random art". The randomness is curated: parameters come from hand-tuned ranges, palettes are named and authored, and each piece picks a small **personality** (065 favours three block types per quilt, so each quilt has a coherent character instead of an even mix).

Each output gets an **identity**: a generated name, an edition number, a date and a caption plate (065's "Bramble Supper, No. 9149", 066's "JH-4471 e", 084's "Nº 0128, fernlike stellar dendrite"). The identity is what makes it collectible and worth sharing. The piece **arrives with a ritual**: grown, stitched, woven or drawn stroke by stroke, never just swapped in.

## Two variants

- **Edition generator (065, 084, 066, 045):** one button ("Stitch a new quilt", "Grow a snowflake", "Forge"). A few trait controls and presets. The artefact is framed like an object, with a catalogue card and a gallery of past editions.
- **Studio (034, 097, 086):** the same seeded core, plus 4–8 expressive parameters grouped into numbered sections, a seed field with a dice button, and a live, evolving render. Nearer an instrument, but the output is still the hero.

## Architecture

1. **The seed is the identity.** Take a string or number (typed, random, or derived from context), hash it to 32 bits, and feed a small PRNG (`techniques.md` §1). Split it into **named sub-streams** (layout, palette, detail, name), so that changing one trait doesn't reshuffle everything else.
2. **Recipe = seed + overrides.** `params = derive(seed)` picks every trait from curated ranges. The visitor's slider or preset changes are stored as overrides on top. `{seed, overrides, version}` is the complete recipe: it drives rendering, the permalink, the filename and the order record. Put a version on the algorithm, so old links still reproduce their piece after you tune it.
3. **Curate, don't randomise.** Use weighted picks from authored lists (palettes, motifs, block types), ranges narrowed to where the output is beautiful, and a per-piece personality (2–3 favoured motifs, one accent colour). Presets are named parameter sets written in the world's voice ("Earthlike", "Kilim", "Glacier").
4. **Resolution-independent and deterministic.** Generate geometry in unit space, and render it from the recipe at any size. Animation only *reveals* the piece. The final frame must be identical however fast it was drawn, so that export matches what people saw.
5. **Reveal with a time budget.** Draw progressively within about 8ms per frame (strokes, rows of weave, crystal growth), with the ritual's verb on the button. Under reduced motion, render immediately with a short fade. Pre-warm so the first frame is never empty.
6. **Quality guard.** Score each candidate cheaply (coverage, contrast between neighbours, balance, text contrast on the palette). If it fails, reroll from `seed + ':' + n`, up to about 8 tries. The visitor should never see a dud.
7. **Identity plate.** Generate a name from curated word lists by the name stream, an edition number (hash mod 10,000, or a real counter if editions are limited), the date and the key traits. Show them on a caption card in the world's typography, and also generate alt text from the traits ("A 4×5 quilt of mostly Log Cabin blocks in Farmhouse reds and mustard").
8. **Controls stay few.** Generate (Space or N), a seed field and dice, 4–6 presets, and 3–6 sliders with value readouts. Keep a **history strip** of the last 12 recipes: Back and Forward act as undo for a generator (Ctrl/Cmd+Z steps back). Offer "lock" toggles for traits the visitor wants to keep while rerolling the rest (071's locked colours).
9. **Keyboard and touch.** The generator is button-driven, so the core is accessible by default. The artwork is `role="img"` with the generated alt text, updated in an `aria-live` caption. Canvas interactions (065 click-to-cycle a block, 034 click-to-plant a vortex, 066 drag-to-rotate) get DOM equivalents: blocks as buttons in a grid, a "plant vortex at centre" button, arrow keys to rotate. On touch, drag rotates or pans with `setPointerCapture`, and the page scroll is not trapped.
10. **Export and permalink.** Re-render the recipe off-screen at export size (2–4× the screen, or print size), include the caption plate, and name the file `name-edition-seed.png`. Offer SVG for vector generators (084). Write the recipe to the URL hash, so that a shared link reproduces the exact piece. A "gallery" can simply be a list of recipes in localStorage, rendered as thumbnails.
11. **Per-visitor seeds, safely.** Derive the seed from the order number, event and ticket number, date, or a name the visitor types, but hash it first, and never put personal data in the URL. Put only the hash or the visitor's chosen seed word there.
12. **Performance.** Use typed arrays for particles, batch same-colour paths, pre-render textures (fabric, glass grain, paper), and render a low-resolution preview during slider drags and refine on release (066). See `techniques.md` §8.

## Key mechanics

```js
// seed -> 32-bit hash -> independent named streams (changing the palette won't move the layout)
function hash32(str) { let h = 2166136261 >>> 0;
  for (const ch of str) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }
const streams = seed => new Proxy({}, { get: (m, name) => m[name] ??= rng(hash32(seed + '/' + name)) });
const S = streams('tidewater');
const layout = S.layout, paint = S.palette;            // each is an independent rng() (techniques.md §1)
```

```js
// derive traits from curated lists, with a per-piece personality; the visitor's overrides sit on top
const pickW = (r, items) => { let t = r() * items.reduce((s, i) => s + i.w, 0);
  return items.find(i => (t -= i.w) < 0) ?? items.at(-1); };
function derive(seed, overrides = {}) {
  const S = streams(seed), palette = pickW(S.palette, PALETTES);
  const favourites = [0, 1, 2].map(() => pickW(S.motif, MOTIFS).id);   // 2-3 favoured motifs
  const motifFor = () => S.motif() < 0.7 ? favourites[Math.floor(S.motif() * 3)] : pickW(S.motif, MOTIFS).id;
  return { palette, density: lerp(0.35, 0.8, S.layout()), motifFor, ...overrides };
}
```

```js
// identity: name + edition + alt text, all from the recipe
const pick = (r, list) => list[Math.floor(r() * list.length)];
function identity(seed, p) {
  const r = streams(seed).name;
  const name = `${pick(r, ADJECTIVES)} ${pick(r, NOUNS)}`;              // "Bramble Supper"
  const edition = String(hash32(seed) % 10000).padStart(4, '0');
  const alt = `${p.palette.name} piece, mostly ${p.lead} motifs, density ${Math.round(p.density * 100)}%`;
  return { name, edition, alt, date: new Date().toISOString().slice(0, 10) };
}
```

```js
// reveal within a frame budget; the final pixels don't depend on frame rate
function reveal(ops, ctx, done) {
  let i = 0;
  (function step() { const t0 = performance.now();
    while (i < ops.length && performance.now() - t0 < 8) ops[i++](ctx);
    if (i < ops.length && !calm) requestAnimationFrame(step);
    else { while (i < ops.length) ops[i++](ctx); done(); } })();
}
```

```js
// quality guard: reroll quietly until the piece passes; record which attempt won in the recipe
function generate(seed, overrides) {
  for (let n = 0; n < 8; n++) {
    const s = n ? `${seed}:${n}` : seed, p = derive(s, overrides), piece = build(p);
    if (score(piece) >= 0.6 || n === 7) return { seed, attempt: n, p, piece, id: identity(s, p) };
  }
}
// score = weighted coverage balance + minimum neighbour contrast + palette text contrast
```

## Variation levers

- **The material and the algorithm:** quilt blocks, a loom automaton, a Voronoi window, a pendulum pen, flow-field ink, crystal growth, a planet, marbled paper, a woodcut, a mosaic, a knit chart, terrazzo, a risograph separation.
- **The seed source:** a click, a typed word, the date, an order or ticket number, a location, the visitor's name (hashed).
- **Scarcity:** infinite, numbered-but-open, a fixed edition of N with a real counter, one per day.
- **The reveal ritual:** stitched, woven row by row, grown, drawn by the machine, printed drum by drum.
- **The display:** a catalogue card, a museum plate, a survey record, a proof taped to a wall, a gallery grid of past editions.
- **Control depth:** one button, presets and a seed, or a full studio of parameters.

## Business uses

- A coffee roaster whose every bag carries a generated label from the lot number, and whose site lets you regenerate yours from the code on the bag.
- A conference that gives each attendee a numbered poster generated from their ticket, to download and post.
- A bank or SaaS brand with a generative illustration system (one algorithm, the brand palette), producing on-brand imagery for every blog post from its slug.
- A wedding stationer where a couple types their names and date and gets a unique pattern for the invitations, printable at real size.
- A children's museum where "grow your own snowflake" ends with a printable catalogue card.
- A perfume or wine limited edition where each numbered bottle's artwork is reproducible from its number.

## Pitfalls

- Randomness without curation: even mixes of every motif and full-range sliders produce mud. Narrow the ranges and give each piece a personality.
- Changing a slider reshuffles the whole piece. Use separate sub-streams per trait.
- Tuning the algorithm breaks old links and orders. Version the recipe and keep old versions renderable where orders depend on them.
- An export that doesn't match the screen (different aspect ratio, a missing plate, a different random state). Export must re-render the same recipe.
- A frame-rate-dependent reveal (for example, a particle simulation that stops at "whatever was drawn after 5s"). Fix a step count in the recipe.
- Personal data in the seed or URL. Hash it, and keep names out of links.
- Duds reaching the visitor. Add a cheap score and reroll.
- An "edition number" that pretends to scarcity it doesn't have. If editions are unlimited, don't imply otherwise.
- A generator with nothing to do after the first click. Add a history strip, locks, a gallery and a clear next step (print, order, share).
- The generator's canvas blocking the page from scrolling on phones, or trapping keyboard focus.

## Signals (what a user might say)

- "Every customer should get their own unique one."
- "No two the same."
- "Generative art for our brand."
- "Can it make a new pattern every time you click?"
- "A poster for each attendee with their name on it."
- "Numbered editions, like a limited print run."
- "Collectibles, but not NFTs."
- "Different packaging art for every batch."
- "Turn their order number (or birthday, or name) into artwork."
- "A pattern that is clearly ours but always different."
- "People should want to screenshot their result and share it."

**Not this format if…**

- Visitors should make each mark or choice themselves. That is a [maker tool](maker-tool.md).
- The brand needs one exact approved image. Static design is the right choice.
- The picture should show real, live information (weather, sales, orbits). That is [living data](living-data-hero.md).
