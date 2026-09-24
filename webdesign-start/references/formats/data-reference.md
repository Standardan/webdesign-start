# Format: data reference / visual atlas

**Load when:** the concept is a beautiful, accurate reference that people browse and return to: an atlas of rivers, a transit diagram, a periodic-table-style grid, a room schedule, a specimen index. Every item is drawn by the same rule, so comparison is the pleasure. Fits data-rich brands, nonprofits, publishers, service-area and network maps, product ranges, menus with real specifications, and collections with measurable traits.

**Study:** gallery 020 (Long Water, ten rivers as ribbons on one true scale), 036 (Meridian Metro, a transit diagram with line toggles, station cards and a route planner). Also 004 (the orrery's "Index of Wanderers" table beside the model), 056 (the blueprint's room schedule and title block), 052 (a measurements panel with units), 042 (bookmarks as named places in a vast space).

## Two variants

- **Proportional atlas (020):** one encoding for every item (length, area, height, age) drawn on a single shared scale. The layout is a sortable list or grid; each mark *is* the data.
- **Network or diagram (036):** items connected by relationships (lines, routes, families, supply chains) drawn in a strict grammar (45° and 90° bends, fixed spacing), explorable by selecting a node or a path.

A periodic-table grid is a third, related layout: a fixed matrix where position encodes two categories and colour a third. It follows the same architecture.

## What makes it work

- **One rule, applied without exception.** Every river starts at the same source line and is drawn to the same km scale (020); every line bends only at 45° or 90° (036). The discipline reads as authority.
- **Honesty is designed, not footnoted.** 020 marks every length "≈" and explains in the intro why river lengths vary; 036 says "fictional city · not to scale" in its masthead. The caveat is part of the typography.
- **Beauty comes from the data's own shape.** Meanders, line colours, a river band behind the map. Decoration that carries no data stays pale and sits behind.
- **Filters and toggles are the legend.** 036's line legend toggles lines; 020's sort and unit switches sit above the plate. The key and the controls are one object.
- **A detail panel that adds, not repeats.** 020's tooltip adds the continent and the outflow; 036's station card adds live departures. The panel answers the next question.
- **A playful comparison.** 020's "race the droplets" lets people feel the length differences; 036's route planner turns the diagram into a tool. One such moment, not five.
- **Print apparatus:** plate numbers, an issue line, a key, a scale bar, a colophon with sources (`craft.md` §5).

## Architecture

1. **Build the dataset before the design.** One JSON array, one object per item, every field with a unit. Add `source`, `year` and `approx: true|false` per value where sources disagree. Keep the array in the page (or a sibling file) so it can be audited and updated without touching the drawing code.
2. **Source and label every number.**
   - A "Sources and method" block names each source, the date accessed and how conflicts were resolved.
   - Approximate values carry a visible mark (≈) and the reason appears once in plain language.
   - Invented or placeholder data is labelled in the masthead ("illustrative", "fictional"), never only in a footer.
   - Never fill gaps with plausible-looking numbers; show an empty state ("not measured").
3. **Fix the scale and show it.** Choose one scale for all items and draw a scale bar or axis ticks. When the range forces compression (log scale, broken axis), say so beside the scale. Decoration (meanders, wobble) must not change the encoded length: measure along the axis, not along the wiggle.
4. **Choose the explore model.**
   - *Sort:* 2–4 orders (by value, by category, alphabetical) with animated reordering so items can be followed.
   - *Filter:* category toggles that dim rather than remove, so the whole stays visible; a count of what is showing.
   - *Select:* hover previews, click or Enter pins; a pinned item survives sort and filter changes.
   - *Search* when there are more than about 30 items.
   - *Units:* a toggle (km / miles, °C / °F) that converts every label and the scale bar together.
5. **Detail panel.** A side panel on wide screens and a bottom sheet on phones. It shows the item's name, its primary value with unit and approx mark, 2–4 secondary fields, a one-line story and its source. Pinned state lives in the URL hash (`#nile`) so a detail view can be shared.
6. **Keyboard access.**
   - Items are focusable in reading order; arrow keys move between neighbours (in the list, the grid or along a line); Enter pins; Escape unpins and returns focus.
   - Filters are real buttons with `aria-pressed`; sorts are a radio group.
   - A polite live region announces the result of a change ("Showing 4 of 10 rivers, sorted by continent").
   - Maps accept arrow-key pan and +/− zoom when focused.
7. **An accessible table twin.** Every atlas also ships a real `<table>` of the same data (visually hidden or behind a "View as table" toggle). It is the screen-reader path, the print path and the audit path.
8. **Recompose for portrait.** 020 turns horizontal ribbons into vertical flows on phones. Rotate the axis rather than shrinking it, and keep labels at a readable size.
9. **Reduced motion.** Reorders jump instead of animating; ambient particles stop; the playful comparison shows its end state with the numbers.

## Key mechanics

```js
// one scale for everything, plus a unit layer that relabels without re-measuring
const KM_TO_MI = 0.621371;
const scale = (plotWidth) => plotWidth / Math.max(...items.map(d => d.km));
const fmt = (km, unit) => (unit === 'mi' ? km * KM_TO_MI : km)
  .toLocaleString(undefined, { maximumFractionDigits: 0 }) + (unit === 'mi' ? ' mi' : ' km');
const label = d => (d.approx ? '≈ ' : '') + fmt(d.km, state.unit);
```

```js
// decorative meander that keeps the encoded length: offset perpendicular to the axis only
function ribbon(len, amp, seed) {
  const pts = [];
  for (let a = 0; a <= len; a += 6) pts.push([a, amp * noise1(seed + a * 0.004) * Math.min(1, a / 40)]);
  return 'M' + pts.map(p => p.join(',')).join('L');   // x runs 0..len exactly; y is decoration
}
```

```js
// animated sort: FLIP each row from its old position to its new one
function reorder(compare) {
  const before = new Map(rows.map(r => [r, r.getBoundingClientRect().top]));
  rows.sort(compare).forEach(r => list.append(r));
  rows.forEach(r => { const dy = before.get(r) - r.getBoundingClientRect().top;
    r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }],
      { duration: reduced ? 0 : 450, easing: 'cubic-bezier(.2,.7,.2,1)' }); });
}
```

```js
// network route: Dijkstra over (station, line) states so changing lines costs a transfer penalty
function route(from, to) {
  const dist = new Map([[`${from}|*`, 0]]), queue = [[0, from, '*']], prev = new Map();
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]); const [d, s, line] = queue.shift();
    if (s === to) return unwind(prev, `${s}|${line}`);
    for (const e of edges[s]) { const nd = d + e.minutes + (line !== '*' && e.line !== line ? TRANSFER : 0);
      const k = `${e.to}|${e.line}`; if (nd < (dist.get(k) ?? Infinity)) { dist.set(k, nd); prev.set(k, `${s}|${line}`); queue.push([nd, e.to, e.line]); } }
  }
}
```

## Variation levers

- **The encoding:** length, area, height, a grid position, a network position, a timeline position.
- **The artefact:** an atlas plate, a transit diagram, a periodic table, a field-guide index, a specimen drawer, a stock list.
- **The ground:** limestone paper, crisp map white, blueprint blue, night chart.
- **The playful comparison:** a race, a stack to the same height, a "fit them in" overlay, a route planner, a "you are here".
- **Density:** 10 items drawn large (020) or 100+ in a dense grid with search.

## Business uses

- A conservation charity's atlas of the rivers it protects, each ribbon drawn to scale and coloured by water quality, with sources per reading.
- A tea merchant's periodic table of teas: rows by oxidation, columns by region, with caffeine and steep time in each cell.
- A regional bus company's network diagram with a planner, and a status panel fed by the real service feed.
- A tyre or bicycle brand's range as a proportional chart of real widths and weights, filterable by use.
- A publisher's atlas of all its titles by page count and year, clickable to each book.
- A service business's coverage map with honest boundaries and an "is my postcode covered" lookup.

## Pitfalls

- Plausible invented numbers. Every value needs a source or a visible "illustrative" label; placeholder data must be reported in the build report.
- Decoration that changes the encoding: meanders that add length, 3D bars, areas scaled by radius instead of area.
- Colour as the only channel. Pair line and category colours with labels, patterns or position, and check contrast of thin coloured strokes on the ground.
- Filters that remove items so the reader loses the whole. Dim instead, and state the count.
- Tooltips as the only way to read values. Label the primary value on the plate and ship the table twin.
- Hover-only detail on touch screens. Tap pins; a close control and Escape unpin.
- A beautiful plate that no one can update. Keep the data separate from the drawing and document how to edit it.
- Stale "live" data. If a status or a count is simulated, say so on the panel itself (036 labels its schedules as simulated).

## Signals (what a user might say)

- "We have loads of data but nobody reads the spreadsheets."
- "I want people to compare our products side by side."
- "Can it look like a proper map or atlas?"
- "Show where we work and what we cover."
- "People keep asking which one is the biggest, longest, strongest."
- "Something teachers or journalists would bookmark and cite."
- "Like a periodic table, but for our range."
- "Let them filter by type and see the details."
- "It needs to be accurate; we'll be judged on the numbers."
- "Our network or routes are confusing; can we make a clear diagram?"
- "I want one page that shows everything at once."

**Not this format if…**

- There are only three or four items to show. That is a comparison section or a set of plates, not an atlas.
- The data cannot be sourced or will not be supplied before build, and the design depends on it being real.
- The goal is to explain how one thing works rather than to compare many things. Use `explainer-simulation.md`.
