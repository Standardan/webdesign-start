# Format: collection cabinet

**Load when:** the business *is* a set of distinct things that people browse, compare and pick from: products, dishes, works, services, specimens, releases, rooms, seasons. The site presents them as a curated collection with a physical logic (a specimen drawer, a museum room, a lookbook, a periodic-table-like grid, an almanac dial, a comb of cells) rather than as a product grid. Fits shops, portfolios, menus, catalogues, archives, galleries, subscription boxes and seasonal offers.

**Study:** gallery 011 (Herbarium Imaginarium, a specimen drawer), 039 (Galerie Nocturne, a walk-through museum corridor), 043 (Atelier Noire, a horizontal fashion lookbook), 028 (Elementa, a periodic table). Also 031 (the twenty-four seasons as a dial) and 069 (a honeycomb as a living grid).

## Four variants

- **Drawer of plates (011):** a fixed, small set of cards (about six) with an index panel beside them. Each card is a full specimen sheet with a consistent label. One action adds a new item; the oldest is filed away.
- **Room you walk (039):** items hung in a 3D space; the camera moves between them and "approaches" one for a detail view. On phones it becomes a swipeable wall of the same framed works.
- **Lookbook track (043):** a horizontal sequence of numbered looks, each its own composition, with giant type sliding behind. Vertical on phones.
- **Meaningful grid or dial (028, 031, 069):** the position of each item carries information (group and period, time of year, neighbourhood). One selection fills a large detail panel.

## What makes it work

The collection feels **finite and curated**, not infinite. "Six sheets in this drawer", "eight looks", "118 elements", "24 terms": a stated count makes each item matter. Every item follows one **label grammar** (number, name, provenance, date, material, price) set in the style anchor's type, so the set reads as a series. The **arrangement has a reason** (a drawer, a corridor, a table, a year), and that reason becomes the navigation. The **detail view is a ceremony**: a loupe, a walk up to the wall, a Bohr diagram, a fabric swatch. There is exactly one "collector's action" (collect, press, filter by category, today) that changes the whole set.

## Architecture

1. **Model the collection as data first.** One array of items with every field the label needs. Cards, index, detail view, filters and structured data (JSON-LD `Product`, `Menu`, `VisualArtwork`) are all rendered from it. Real products need real names, prices and images from the client; generated art is only for items that are genuinely abstract or for honest placeholders.
2. **Pick the arrangement from the subject,** not from the CSS grid default:
   - specimens, recipes, tea blends, ceramics → drawer of plates;
   - artworks, rooms, properties → a room or corridor;
   - garments, editions, chapters of a collection → a lookbook track;
   - things with inherent coordinates (seasons, sizes, flavour profiles, regions) → a meaningful grid or dial.
3. **Write the label grammar** once: accession number, name (with a secondary line such as Latin binomial, kanji or colourway), provenance or maker, date, material or medium, price. Put the same fields in the same places on every card. Stamps, tape, placards and swatches are the style anchor's version of a label.
4. **An index beside the collection.** A drawer index (011), a floor plan (039), a progress bar with look numbers (043), a category legend with counts (028). It doubles as navigation and as the visible statement of how many items there are.
5. **Detail view:**
   - opens in place or in a dialog with a focus trap and Escape to close;
   - previous and next within the collection (arrow keys);
   - one inspection tool (loupe, zoom, rotating diagram, swatch);
   - the primary action (add to basket, reserve, enquire) inside the detail view, not only on the card.
6. **One collector's action** that changes the set: filter by category (dim, don't remove), a "today" or "in season" jump, a "pressed" or "evening" treatment, or adding a new generated item. Announce the result in a live region ("Showing halogens, 6 elements").
7. **Keyboard and phone:** a grid is one tab stop with arrow keys moving spatially (roving tabindex). A 3D room, horizontal track or wide table gets a phone layout that is a real second design (a swipeable wall, a vertical stack, a table panning inside its own container), not a squeezed desktop.
8. **Arrival and departure motion.** New items grow in (stroke-by-stroke drawing, a fill, a fade up); items leaving are filed away with a FLIP animation so the rest of the set visibly makes room.

## Key mechanics

```js
// one label grammar, rendered from data; the same fields in the same places on every card
const card = it => `
  <article class="plate" id="no-${it.no}" tabindex="-1" aria-labelledby="t-${it.no}">
    <figure class="plate-art">${it.art}</figure>
    <dl class="label">
      <dt class="sr-only">Number</dt><dd class="no">No. ${it.no}</dd>
      <dt class="sr-only">Name</dt><dd id="t-${it.no}" class="name"><i>${it.name}</i></dd>
      <dt>From</dt><dd>${it.origin}</dd><dt>Price</dt><dd>${fmt(it.price)}</dd>
    </dl>
  </article>`;
drawer.innerHTML = items.map(card).join('');
count.textContent = `${items.length} sheets in this drawer`;
```

```js
// spatial arrow keys on a grid with holes: nearest item in the pressed direction
function neighbour(from, dr, dc) {
  let best = null, score = Infinity;
  for (const t of tiles) {
    const r = t.row - from.row, c = t.col - from.col;
    const along = dr ? r * dr : c * dc, across = Math.abs(dr ? c : r);
    if (along <= 0) continue;
    const s = along * 10 + across * 3;          // prefer straight lines, then the closest
    if (s < score) { score = s; best = t; }
  }
  return best;
}
// on keydown: tile.tabIndex = -1; next.tabIndex = 0; next.el.focus(); show(next);
```

```css
/* a loupe: a circle holding a scaled copy of the sheet, positioned by two custom properties */
.loupe { position: fixed; left: 0; top: 0; width: 220px; aspect-ratio: 1; border-radius: 50%;
  translate: calc(var(--x) * 1px - 50%) calc(var(--y) * 1px - 50%);
  overflow: hidden; pointer-events: none; opacity: 0; transition: opacity .2s;
  box-shadow: 0 0 0 6px #3b2a17, 0 18px 40px rgb(0 0 0 / .35); }
.loupe > .copy { transform-origin: 0 0; scale: var(--zoom);
  translate: calc(110px - var(--px) * var(--zoom) * 1px) calc(110px - var(--py) * var(--zoom) * 1px); }
.sheet.looking + .loupe { opacity: 1; }
```

```js
// FLIP: the set makes room for a new item instead of jumping
const before = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
drawer.prepend(newCard); if (cards.length >= MAX) fileAway(cards.at(-1));
for (const [c, r] of before) {
  const n = c.getBoundingClientRect(), dx = r.left - n.left, dy = r.top - n.top;
  if (dx || dy) c.animate([{ translate: `${dx}px ${dy}px` }, { translate: '0 0' }],
    { duration: reduce ? 0 : 520, easing: 'cubic-bezier(.3,.7,.2,1)' });
}
```

```js
// lookbook track: vertical scroll drives a sticky horizontal track (phones fall back to vertical)
function measure() {
  const extra = track.scrollWidth - innerWidth;
  stage.style.height = wide.matches ? `${extra + innerHeight}px` : '';
  maxX = Math.max(0, extra);
}
function frame() {
  const t = Math.min(maxX, Math.max(0, scrollY - stage.offsetTop));
  x += (t - x) * (reduce ? 1 : .12);            // eased follow
  track.style.transform = `translate3d(${-x}px,0,0)`;
  backdropWord.style.transform = `translate3d(${-x * .35}px,0,0)`;   // the giant word lags
  requestAnimationFrame(frame);
}
```

## Variation levers

- **The container:** a drawer, a museum corridor, a card catalogue, a vitrine, a seed-packet rack, a record crate, a menu board, a dial, a hex comb, a map of plots.
- **The label:** a museum placard, a herbarium slip with tape and stamp, a price tag on string, an apothecary label, a garment swing tag, a periodic tile.
- **The inspection tool:** a loupe, a walk-up camera move, a turntable rotation, a swatch zoom, a cross-section, a diagram.
- **The collector's action:** filter, press or age, "in season now", add a specimen, compare two, rearrange.
- **The count:** a small curated set (6–12) shown in full, or a large set (50–200) with an index and filters.

## Business uses

- A tea merchant whose blends are herbarium sheets with tasting notes on the label and "Add to caddy" in the detail view.
- A ceramicist's portfolio as a lit gallery corridor, with each piece's placard giving dimensions, glaze and availability.
- A restaurant menu as a seasonal dial: this week's dishes sit on the current segment; past and coming seasons are browsable.
- A fashion label's new season as a numbered lookbook with material swatches and a stockist link per look.
- A paint or yarn company's colour range as a periodic table grouped by family, with a detail panel showing pairings.

## Pitfalls

- An arrangement with no reason. If position carries no meaning, a periodic grid or dial is decoration; use a drawer or a track instead.
- Invented items presented as real stock. Generated specimens and artworks are fine for an art piece; on a shop, mark placeholders and replace them with the client's products.
- The detail view that has no action. Every item detail needs the next step (buy, book, enquire, share).
- Filtering that removes items and reflows the layout of a meaningful grid. Dim instead, so positions keep their meaning.
- A 3D corridor or horizontal track as the only way to reach items. Provide an index list, keyboard steps and a phone layout.
- Scroll-jacked horizontal tracks that break trackpad inertia or the browser's find. Keep native vertical scrolling as the driver and test Ctrl/Cmd+F.
- Label text baked into images or canvas. Names, prices and dates must be real text for search, translation and screen readers.
- Too many items at once in the ceremonial format. Past about 12 plates, add pagination by drawer, room or season.

## Signals (what a user might say)

- "We have a lot of products and I want people to enjoy browsing them."
- "It should feel like a museum / a cabinet of curiosities / an old apothecary."
- "I want each piece to feel special, not like a list of thumbnails."
- "Our menu changes with the seasons."
- "Show our range like a colour chart / a table / a map."
- "A lookbook for the new collection."
- "People should be able to compare our blends / flavours / models."
- "My portfolio should feel like walking through a gallery."
- "Every item has a story: where it's from, who made it, when."
- "I collect / archive / catalogue things."
- "Can visitors filter by type but still see the whole range?"

**Not this format if…**

- There is one hero product and the rest is support. Use `signature-reveal.md` or an object-led page instead.
- The catalogue is large, changes daily, and people arrive knowing exactly what they want (spare parts, groceries). Use a conventional, fast catalogue and keep the cabinet for a curated edit.
- The story matters more than the items (how the company started, what happened when). Use `interactive-story.md` or a journey.
