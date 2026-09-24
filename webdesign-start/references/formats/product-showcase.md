# Format: product showcase / store page

**Load when:** the page sells **one product or a small collection (at most about 6 SKUs)**, and the product can be a living drawn or treated object whose buying flow is part of the craft. Fits a launch or hero SKU, a single-product brand (fragrance, watch, speaker, chair, board game, font licence, app), a small drop or capsule, and a software "buy" page with one or two plans.

**Study:** gallery 082 (Rosée, a perfume bottle with sloshing liquid and a buy box beside it). Also 024 (a watch showing the viewer's real time, with a reserve desk) and 035 (a coffee roaster with a subscription configurator).

**Don't use it** for catalogues of more than about 6 products or anything needing filters (use a collection format and apply this only to the product detail page), for commodities bought on spec and price, for regulated goods where compliance copy must lead, or for services with no object (use an offer or pricing format). If the client's real photography *is* the brand, treat the photos rather than redraw them (photography mode below).

## What makes it work

The product is the brightest, most saturated thing on the page, and the buy box beside it holds the whole purchase above the fold. **One choice moves several true things:** in 082, picking a size rescales the bottle, rewrites the ml line on its label, changes the caption and price, and widens the shadow and caustic. The object feels like the thing you are buying. Every section below answers one buying question, in order: what is it → what's in it → why it's good → who else likes it → will it arrive and can I return it → buy.

## Architecture

1. **Hero:** living product at 55–65% width, buy box at most 520px: eyebrow, name (`h1`, drawn if the display face won't survive every OS), a one-line promise and at most a two-sentence lede, variant fieldsets, price with unit and stock or lead time, primary CTA, 2–3 reassurance lines (delivery, returns, payment). Name, price, variant and CTA are visible at 1280×720 and 1440×900 without scrolling.
2. **Choose one living property true to the product** and drive it with springs (`techniques.md` §1, §7), responding to idle time, pointer or tilt, and the variant: liquid slosh for fragrance or spirits, real time and glare for a watch, sole compression for a sneaker, steam and roast colour for coffee, light across fabric for furniture, the app running a real micro-task for software. The living object can be the SKU (082, 024) or its ritual (035's cup and roast).
3. **Draw it in separable groups:** body, top (cap, lid), contents, label, ground, so each variant can target one. The silhouette must read at 60px so the same drawing serves as the variant icon. Material cues per surface, a contact shadow plus one light effect caused by the product (a caustic, a screen glow), and world text on the object that updates with the variant (`techniques.md` §4, "Illustrating from primitives").
4. **Keep the object's palette separate.** The product owns the saturated colours; the page uses muted brand tokens plus one accent for the CTA.
5. **Variants are native radios in a real `<form>`** (sketch 1): one `<fieldset>` + `<legend>` per dimension, visible labels styled as cards or swatches, a sensible default preselected. Sold-out variants stay focusable, say "sold out" and offer "Notify me".
6. **Price animates visually and speaks once** (sketch 2): `Intl.NumberFormat`, tabular or lining figures, unit price where sizes differ (`€4.20 / 10 ml`), tax inclusion stated.
7. **The CTA is a submit button** labelled with verb and object ("Add Rosée 50 ml to bag"), guarded against double submission. Over about €1,000, made-to-order or limited: "Reserve", "Enquire" or "Book a fitting", with a short form and a line on what happens next (024).
8. **Cart:** one small store persisted with guarded `localStorage`, rendered by one function; the bag opens a modal `<dialog>` drawer with line items, steppers, subtotal and checkout. One `role="status"` region for the page ("Rosée 50 ml added. Bag: 2 items, €290."), and the bag button's name includes the count. Feedback appears where the eye is at the moment of adding.
9. **Details sections each get a device from the product's world** (`craft.md` §10): a notes pyramid, a tasting wheel, an exploded view, a swatch book, annotated UI. Then proof, practicals (delivery, returns, care, FAQ in `<details>`), a **closing buy** section, and a footer with company facts.
10. **Phones recompose:** object at 45–55vh, name and price inside the first screen, variant and CTA next, and a sticky bottom purchase bar once the main CTA leaves the viewport (sketch 5).
11. **It works without the effect:** the form submits without JavaScript, every control works under reduced motion, and the CTA never waits on the animation.

**Photography mode.** With real photos, request one consistent angle and light per variant on a plain ground, and crossfade them over 250–400ms (incoming at 1.00 → 1.02). Add the living layer on top: a pointer-tracked sheen masked to the cut-out, a drawn contact shadow moving opposite the tilt, at most ±6° tilt, all written from a spring. Keep drawings for the page (diagrams, dividers). Serve `srcset` AVIF or WebP, `fetchpriority="high"` on the hero, other variants after first interaction. Label renders as renders.

## Key mechanics

```html
<!-- variant cards as native radios: arrow keys, grouping, submission and no-JS for free -->
<form id="buy" action="/cart" method="post">
  <fieldset class="variants"><legend class="cap">Size</legend>
    <label class="v"><input type="radio" name="size" value="30" data-price="98" data-scale=".82"><b>30 ml</b><span>€98</span></label>
    <label class="v"><input type="radio" name="size" value="50" data-price="145" data-scale=".92" checked><b>50 ml</b><span>€145</span></label>
    <label class="v"><input type="radio" name="size" value="100" data-price="210" data-scale="1.04"><b>100 ml</b><span>€210</span></label>
  </fieldset>
  <button type="submit" class="cta"><span class="go">Add to bag</span></button>
</form>
<style>
.v { position: relative; display: grid; place-items: center; border: 1px solid var(--hair); padding: 14px 8px; cursor: pointer; }
.v input { position: absolute; opacity: 0; inset: 0; margin: 0; cursor: inherit; }   /* stays focusable */
.v:has(input:checked) { border-color: var(--accent); background: var(--paper); box-shadow: inset 0 0 0 1px var(--accent); }
.v:has(input:focus-visible) { outline: 2px solid var(--ink); outline-offset: 3px; }
</style>
```

```js
// price that counts visually (aria-hidden copy) and announces once after it settles
const fmt = new Intl.NumberFormat(document.documentElement.lang || 'en', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
let from = 145, raf = 0;
function setPrice(to, label) {
  real.textContent = fmt.format(to);                       // visually hidden; what assistive tech reads
  cancelAnimationFrame(raf); const t0 = performance.now(), a = from;
  const step = now => { const k = Math.min(1, (now - t0) / (matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 420));
    from = Math.round(a + (to - a) * (1 - (1 - k) ** 3)); shown.textContent = fmt.format(from);
    if (k < 1) raf = requestAnimationFrame(step); };
  raf = requestAnimationFrame(step);
  clearTimeout(setPrice.t); setPrice.t = setTimeout(() => status.textContent = `${label}, ${fmt.format(to)}`, 450);
}
buy.addEventListener('change', e => { const i = e.target; setPrice(+i.dataset.price, i.closest('label').querySelector('b').textContent);
  stage.style.setProperty('--size', i.dataset.scale); });
```

```js
// contents that lag the vessel: the surface chases the *opposite* tilt on a looser spring
const vessel = { x: 0, v: 0 }, surface = { x: 0, v: 0 };
const springStep = (s, target, k, c, dt) => { s.v += (-(s.x - target) * k - s.v * c) * dt; s.x += s.v * dt; return s.x; };
function contents(dt, t, lean) {                            // lean: -1..1 from pointer, idle sine or tilt
  const a = springStep(vessel, lean * 5, 24, 8, dt);        // heavy glass: nearly critical
  const b = springStep(surface, -a, 32, reduced ? 12 : 2.8, dt); // liquid: underdamped, so it sloshes
  const slope = Math.tan(b * Math.PI / 180), chop = 1 + Math.min(1.5, Math.abs(surface.v) * .05);
  const lvl = x => LEVEL + slope * (x - MID) + chop * (1.4 * Math.sin(x * .06 + t * 1.8) + .8 * Math.sin(x * .12 - t * 2.6));
  let d = `M${L},${lvl(L)}`; for (let x = L + 6; x <= R; x += 6) d += `L${x},${lvl(x).toFixed(1)}`;
  liquid.setAttribute('d', d + `L${R},${FLOOR}L${L},${FLOOR}Z`);
  body.setAttribute('transform', `rotate(${a.toFixed(2)} ${MID} ${FLOOR})`);   // pivot on the base
}
```
To fake refraction in faceted glass, reuse the liquid path through `<use>` in each facet's clip, offset a few units and re-tinted per facet, so the surface line breaks at every facet edge.

```css
/* per-variant geometry, not uniform scale: the body grows, the cap stays true */
@property --body-h { syntax: '<number>'; inherits: true; initial-value: 1; }
@property --body-w { syntax: '<number>'; inherits: true; initial-value: 1; }
.stage { transition: --body-h .7s cubic-bezier(.3,1.25,.5,1), --body-w .7s cubic-bezier(.3,1.25,.5,1); }
.stage:has(input[value="30"]:checked)  { --body-h: .74; --body-w: .86; }
.stage:has(input[value="100"]:checked) { --body-h: 1.22; --body-w: 1.08; }
.product .body { transform-box: fill-box; transform-origin: 50% 100%; transform: scale(var(--body-w), var(--body-h)); }
.product .cap  { transform: translateY(calc((1 - var(--body-h)) * var(--body-px))); }   /* cap rides the shoulder */
.product .shadow { transform-box: fill-box; transform-origin: center; transform: scaleX(var(--body-w)); }
@media (prefers-reduced-motion: reduce) { .stage { transition-duration: .01s; } }
```

```js
// sticky phone purchase bar, shown only while the real CTA and the closing buy are both off-screen
const bar = document.getElementById('buybar');              // <aside aria-label="Quick buy"> name · price · button
let ctaVisible = true, closingVisible = false;
const sync = () => { const show = !ctaVisible && !closingVisible; bar.toggleAttribute('data-on', show); bar.inert = !show; };
new IntersectionObserver(([e]) => { ctaVisible = e.isIntersecting; sync(); }).observe(document.querySelector('#buy .cta'));
new IntersectionObserver(([e]) => { closingVisible = e.isIntersecting; sync(); }).observe(document.getElementById('closing-buy'));
bar.querySelector('button').addEventListener('click', () => document.getElementById('buy').requestSubmit());
```
Pad the footer by the bar's height, respect `env(safe-area-inset-bottom)`, and hide the bar at 900px and up.

**The add ritual** is small and product-specific: a flight of the variant icon to whichever bag is on screen, a petal burst, a lid closing, a tag re-inked. Keep it under a second, spawn particles outside the buy box, and cap the pool. A CTA glint should hold for 40–60% of its cycle before sweeping (`techniques.md` §3, "Occasional foil glint").

## Variation levers

Change at least five between projects.

- **Silhouette:** pedestal still life with buy box beside (082); full-bleed poster where the product breaks the headline and the buy rail docks at the bottom; shop counter with a tasting card; room set with a pinned spec card; device on a desk with plan cards as ticket stubs.
- **Ground:** soft blush to cream, concrete or flat saturated colour, kraft with paper grain, linen with daylight, near-black or white with a grid.
- **Type voice:** Didone with wide tracked caps (082), condensed poster grotesk with mono sizes, soft slab with humanist sans, book serif with small caps and tabular dimensions, grotesk with mono UI labels.
- **Variant device:** size cards with growing mini icons (082), colourway chips with a per-size stock dot, a grind dial, swatch-book pages, a plan toggle that changes the live demo.
- **Details device:** notes pyramid, exploded sole layers, flavour wheel with a brew-ratio calculator, dimension drawing with a human figure, annotated screenshots, a spec sheet drawn as a technical drawing (024).
- **Add ritual and motion character:** liquid and underdamped; snappy with overshoot; warm and rising; slow and weighty; crisp 150ms UI easing.

Reject the sameness tells: a centred product on a gradient blob, pill variant chips in system blue, a five-star row with an invented count, a "Free shipping" marquee, three icon-in-circle benefits.

## Business uses

- A ceramics studio's pour-over set: the dripper on a shelf lit from a window, water blooming the grounds on hover, a glaze choice swapping the glaze ramp, the buy box as a price tag on string, a brew-ratio dial with true arithmetic.
- A sneaker drop: a giant condensed name broken by the shoe, a press squashing the midsole on a spring, colourway chips repainting panel groups, a size grid with honest stock and "Notify me", the buy rail becoming the sticky bar on phones.
- A desktop finance app with two plans: the app running live in a window frame, dragging a sample receipt categorises it, a monthly/yearly toggle recomputing the true saving, checkout hosted off-page.

## Pitfalls

- **Announcing an animated price every frame.** 082's price element is itself `aria-live` and is rewritten per frame. Tween an `aria-hidden` copy and announce once.
- **ARIA radios on buttons instead of a form.** 082 groups them twice and nothing submits without JavaScript. Use native inputs, as 024 and 035 do.
- **Hover-to-switch content.** 082's notes pyramid changes panels on `pointerenter`. Use the tabs pattern with click or focus activation.
- **Cart feedback off-screen.** On 082's phone layout the badge pops above the fold while the button sits at y≈1234. Use a sticky header, the sticky bar or a toast by the CTA.
- **A first phone screen that is only the object.** 082's bottle fills 844px and the name starts near y≈1300. Cap the object near half the viewport.
- **Uniform scaling for sizes.** 082's 30 ml cap is as large, proportionally, as the 100 ml cap. Scale the body, not the cap.
- **Particles over copy and the buy box.** 082's petals are pushed only after entering a clear zone, and its burst petals land on the price. Spawn outside protected rectangles, measure them on resize rather than every frame, and cap the pool (082 adds 7 nodes per click without a limit).
- **The page ending at the story.** 082 has no delivery estimate, returns, payment methods, reviews, FAQ or closing CTA. A store needs proof, practicals and a closing buy.
- **Invented proof.** No fabricated ratings, "bestseller" badges, press logos, testimonials or scarcity counters. Stock and lead time must be true. `aggregateRating` in `Product` JSON-LD only when real reviews are shown. Fictional brands say so in the footer, as 082 does.
- **Tilt too strong.** More than about ±6–8° reads as a toy on a premium page (082 uses 5.5°).
- **Product and UI in the same saturated palette.** The product loses focus.
- **Spec tables as generic zebra grids.** Draw them in the product's world.

## Signals (what a user might say)

- "We only sell one product and I want its page to feel special."
- "Make the bottle feel real, like you could pick it up."
- "When you pick a size, the product should change."
- "A launch page where people can actually buy."
- "Like an Apple product page, but for our candle."
- "Our new drop: a few colourways, one shoe."
- "I want the add-to-cart moment to feel nice."
- "A premium shop page, not a Shopify template."
- "Show the watch ticking, with a reserve button."
- "A pricing page for our app that shows the app working."

Not this format if…
- they have dozens of products and people need to browse, filter or search;
- they sell a service with no object (consulting, therapy, cleaning);
- buyers choose on spec sheet and price alone, and speed matters more than delight.
