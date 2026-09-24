# Format: product film (Apple-style launch)

**Load when:** the site introduces a flagship product (hardware, a device, a premium app, a vehicle, an appliance, a piece of furniture, a new model) and should feel like a cinematic launch. The product is the hero in every chapter, and the page tells its story one truth at a time. This is the product register's signature format (`../registers.md`).

**Study:** gallery 024 (the luxury watch with an exploded movement), 082 (the perfume bottle as a living object), 017 (an object-first stage). For the genre itself, look at contemporary flagship product pages (Apple, Nothing, Teenage Engineering, premium automotive). Learn the rhythm; never copy their layouts, copy or imagery.

**Don't use it** for a catalogue (use a collection format), a service with no object (use editorial or an offer page), or when the user wants a story set in a world (world register). Use `product-showcase.md` for the buy page itself; a product film usually ends by handing off to it.

## What makes it work

Restraint and conviction. A near-neutral stage, one product lit like a studio photograph, and one enormous headline per chapter that states a single truth ("Thinner than a pencil." "All-day battery. Really.").

Scroll plays each chapter like film: the product turns, explodes, zooms into a detail, changes finish, or shows the result. A real number seals the claim. Nothing else competes. Every chapter looks like a keynote slide you could screenshot.

## Architecture

1. **The product asset comes first.** Choose one of these sources:
   - real renders or photography (Project mode, the best);
   - an image sequence exported from a 3D file;
   - a 3D model rendered live (three.js or a restyled ThreeUI component);
   - for single-file sites, a CSS or SVG object built with studio lighting (`../techniques.md` §4, "Illustrating from primitives").

   Decide it in Phase 3. The film is only as good as its product asset; list it under Assets in the brief (`../brief-template.md`).
2. **The stage.** Pick one ground: true white (#fbfbfd-like), soft grey, or deep black (#0a0a0c-like). Add a single soft key light with a rim and a floor reflection or contact shadow (`../aesthetics.md` §2). No scenery, no texture, no time of day.
3. **The chapters.** Plan 5–8 of them, each one truth. Write the chapter table first: `{ truth, headline (≤ 6 words), proof number, product move, supporting line }`. Typical order:
   1. reveal;
   2. the design (finish, thinness, materials);
   3. the key capability;
   4. performance (the number);
   5. a detail close-up;
   6. ecosystem or accessories;
   7. finishes;
   8. specs and compare;
   9. price and buy.
4. **Each chapter is a pinned scene** (`scroll-journey.md`, pattern B). The product move is scrubbed by scroll:
   - a turn (image sequence or model rotation);
   - an explode (layers separate along one axis);
   - a zoom into a detail;
   - a finish change;
   - a cut to the product in use.

   The headline sets in as the move completes, not before.
5. **Type:** one neo-grotesk or grotesk family at many weights. Headlines 8–14vw at weight 600–700 with −0.03 to −0.05em tracking, supporting lines 19–24px at a 30–40ch measure, and proof numbers huge with units in a lighter weight. Colour-shift one key word to the product's accent at most once per chapter.
6. **Proof numbers count up once when they arrive**, in tabular numerals, then stay still. Footnote every claim with its test condition (honesty: `../build-standards.md`).
7. **The finishes chapter** swaps the product's colour for real, with swatches as native radios (see `product-showcase.md`, sketch 1).
8. **Specs and compare:** a clean, generous table: sticky model headers, and rows grouped by topic with hairline dividers, not a bento of icons.
9. **Chrome:**
   - a slim sticky sub-nav with the product name, 3–4 chapter links and a "Buy" button, frosted with at least 85% backing (`../polish.md` §1);
   - no other floating UI;
   - the buy button stays reachable.
10. **Phones:** chapters restack vertically, and turns become 3–5 still frames stepped by scroll. Headlines stay at least 2× the body text. The product keeps at least 45% of the screen in each chapter.

## Key mechanics

```js
// image-sequence scrub for a product turn: frames preloaded, drawn to a canvas from pinned-scene progress
const frames = Array.from({ length: 120 }, (_, i) => Object.assign(new Image(), { src: `turn/${String(i).padStart(3, '0')}.webp` }));
function drawTurn(p) {                                   // p: 0..1 from sceneProgress(), smoothed
  const f = frames[Math.min(frames.length - 1, Math.round(p * (frames.length - 1)))];
  if (f.complete) { ctx.clearRect(0, 0, W, H); ctx.drawImage(f, (W - f.width * s) / 2, (H - f.height * s) / 2, f.width * s, f.height * s); }
}
```

```css
/* explode: layers separate along one axis as progress rises; the headline arrives after the move */
.explode .layer { translate: 0 calc(var(--p) * var(--gap) * var(--i)); }
.explode .headline { opacity: clamp(0, (var(--p) - .7) * 4, 1); translate: 0 calc((1 - clamp(0, (var(--p) - .7) * 4, 1)) * 24px); }
```

```css
/* studio light on a CSS or SVG product: soft key from the upper left, rim, floor reflection */
.product { filter: drop-shadow(0 40px 60px rgb(0 0 0 / .18)); }
.product::after { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, rgb(255 255 255 / .35), transparent 35% 70%, rgb(255 255 255 / .12)); mix-blend-mode: soft-light; }
.reflection { transform: scaleY(-1); opacity: .12; mask-image: linear-gradient(to bottom, #000, transparent 40%); }
```

```js
// a proof number that counts once when it arrives, then holds still
new IntersectionObserver(([e], o) => { if (!e.isIntersecting) return; o.disconnect();
  const el = e.target, to = +el.dataset.to, t0 = performance.now(), fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
  (function tick(t) { const k = Math.min(1, (t - t0) / 900), v = to * (1 - Math.pow(1 - k, 3)); el.textContent = fmt.format(v);
    if (k < 1 && !calm) requestAnimationFrame(tick); else el.textContent = fmt.format(to); })(t0); }, { threshold: .6 }).observe(stat);
```

## Variation levers

- **The stage:** true white, soft grey, deep black, or the product's own colour as the ground.
- **The product move per chapter:** turn, explode, zoom, cut to use, finish swap, or x-ray/cutaway.
- **The typographic voice:** neutral neo-grotesk, geometric, condensed technical, or a refined serif for luxury.
- **The accent:** the product's own finish colour, a single signal colour, or none (pure monochrome).
- **The pacing:** a few long cinematic chapters, or many short punchy ones.

## Business uses

- A hardware start-up launching a speaker, a bike, a camera or a keyboard.
- A premium app launch told as chapters of capability, with the real UI as the product.
- A furniture or appliance brand introducing a flagship model.
- An EV or e-bike model page with a range number, finishes and a spec comparison.

## Pitfalls

- **A weak product asset.** A flat drawing or a blurry render sinks the whole film. Resolve the asset first.
- **Scenery creeping in:** backgrounds, weather or golden hour. Product films are studio-lit.
- **Two claims in one chapter,** or a headline that says nothing ("Innovation, reimagined."). One truth, stated plainly, with a number.
- **Scroll-jacking.** Native scroll drives progress, and every chapter must be readable at any point.
- **Heavy frames.** Image sequences need compression (WebP or AVIF), lazy chapters and a still-image fallback. The first chapter loads fast.
- **Claims without footnotes,** or numbers that aren't real.
- **A sub-nav without a backing,** or a buy button that disappears.

## Signals (what a user might say)

- "Like an Apple product page."
- "Sleek, premium, clean."
- "Show off the product. It's beautiful."
- "A launch page for our new model."
- "Cinematic", "when you scroll the product turns / comes apart."
- "Big bold statements about what it does."
- "Minimal, lots of white space, just the product."
- "Like a keynote."

**Not this format if:** there's no physical or visual product to show; the user wants warmth, story or a sense of place (world register); or they need a shop with many items (collection format).
