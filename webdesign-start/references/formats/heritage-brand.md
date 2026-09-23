# Format: heritage brand

**Load when:** the business sells an atmosphere with a lineage: a hotel, tea room, restaurant, bar, maison, perfumer, tailor, distillery or members' club, where the founding era, the building or the house style is part of what people pay for. The site is built from one period's **ornament vocabulary**, holds to **symmetry**, presents offers as **printed objects** (menu cards, suite cards, blend labels) and makes navigation an **in-world object** (an elevator dial, a room key rack, a bell board). It ends in a reservation.

**Study:** gallery 015 (The Aurelian, a 1928 Art Deco grand hotel) and 085 (Maison Lierre, an 1899 Art Nouveau tea house). Also 011 for label and stamp craft, and 043 for Didone display type at poster scale.

## Two variants

- **Geometric house (015):** a black-lacquer and emerald ground, gold line ornament (stepped ziggurat frame, sunburst, fans, chevrons), tall thin capitals with wide tracking, a floor-indicator dial that follows scroll and moves you between "floors".
- **Organic house (085):** a cream ground framed by whiplash curves, lilies and ivy that draw themselves and sway; a mosaic halo behind hand-drawn title lettering; decorative initials; a Day and Salon (evening) palette.

## What makes it work

**One period, obeyed everywhere.** The frame, dividers, initials, buttons, form borders, icons and even the loading motion come from one ornament vocabulary (Deco: steps, rays, fans, chevrons; Nouveau: whiplash, stems, halos, mosaic). **Symmetry is the default**: ornament is drawn once and mirrored, compositions are centred, and asymmetry is kept for one deliberate moment. **Gold behaves like metal**: a gradient with a bright band that sweeps now and then, never flat yellow. **Offers are objects the house would print**: an engraved menu card with a double rule and corner ornaments, arched suite cards, blend cards with vines. **Navigation lives in the world**: the dial's needle swings to the floor you are on, which makes scrolling feel like travelling through the building. **Ornament arrives by being made**: strokes draw in, fans open, vines grow, so the decoration reads as craft rather than wallpaper.

## Architecture

1. **Fix the period and its vocabulary** from the particulars (the building's year, the founder's era). Write down 5–7 motifs, 1 display face plus 1 text face (or SVG-drawn title lettering), 4–6 named colours, and 2 materials (lacquer and gold leaf; cream paper and enamel). Use nothing outside that list.
2. **Build a small ornament kit** as inline SVG symbols: a frame (drawn as one half, mirrored), a divider, a corner, an initial, one hero emblem (sunburst, halo, crest, monogram). Keep strokes on `pathLength="1"` so any piece can draw itself.
3. **The hero is a centred emblem:** the house name in display caps or custom lettering, framed by the emblem, with the frame drawing in over about 1.5s, then a slow idle life (rays rotating over minutes, vines swaying 1–2°).
4. **Map the site to the building.** Name sections after places in the house (Lobby, The Suites, The Salon, Dining, Reception) and build the in-world navigator:
   - a dial or indicator fixed in a corner whose needle follows scroll position with a spring;
   - buttons for each floor plus up and down, all real `<button>`s with names;
   - collapsed to a small toggle on phones, closed with Escape;
   - a conventional top nav as well, for scanning.
5. **Offers as printed objects.** Rooms or blends as 3 cards with the period's shape (arches, cartouches, labels); the menu as a single card with a double rule, mirrored corner ornaments and dotted leaders to prices. Hover and focus bring the card to life (rays turn, vines grow, a glint passes).
6. **An evening mode if the house changes by night** (salon, bar, dinner service). Give every colour token an authored evening twin; gold lines glow at night. The toggle's label names the mode it switches to, and the choice persists.
7. **Reservation as the destination.** The form wears the same borders and type, but stays a plain accessible form: labelled fields, native date inputs, a live summary (nights, guests, estimate). It submits to the client's real booking engine, or hands off to it with the details pre-filled.
8. **Symmetry that survives phones.** Rebuild mirrored ornaments at phone width with fewer steps; drop outer frieze elements; keep the centred axis. The frame simplifies, it does not disappear.
9. **Delight is ceremonial:** one foil sweep across headings every few seconds, fans opening on scroll into view, an opt-in lift chime. Everything stops under reduced motion and leaves the finished state.

## Key mechanics

```js
// draw half a stepped Deco frame, then mirror it; rebuilt on resize with fewer steps on phones
function stepHalf(W, H, m, steps, sw, sh) {
  const cx = W / 2, pts = [[cx, H - m], [m, H - m], [m, m + steps * sh]];
  for (let i = 0; i < steps; i++) pts.push([m + i * sw, m + (steps - i - 1) * sh], [m + (i + 1) * sw, m + (steps - i - 1) * sh]);
  pts.push([cx, m]);
  return pts;
}
const mirror = (pts, W) => pts.map(([x, y]) => [W - x, y]).reverse();
const d = pts => 'M' + pts.map(p => p.map(n => n.toFixed(1)).join(' ')).join('L');
const half = stepHalf(W, H, 8, W < 700 ? 2 : 3, W * .09, 20);
framePath.setAttribute('d', d(half) + d(mirror(half, W)).replace('M', 'L'));
```

```css
/* ornament that draws itself: every stroke normalised to length 1, staggered by --d */
.orn path { fill: none; stroke: var(--gilt); stroke-dasharray: 1; stroke-dashoffset: 1;
  animation: ink 1.6s cubic-bezier(.5,.1,.3,1) var(--d, 0s) forwards; }
@keyframes ink { to { stroke-dashoffset: 0; } }
.card:is(:hover, :focus-within) .vine { stroke-dashoffset: 0; transition: stroke-dashoffset 1.3s; }
.card .leaf { scale: 0; transform-box: fill-box; transform-origin: 50% 100%;
  transition: scale .4s cubic-bezier(.3,1.6,.5,1) var(--d, .6s); }
.card:is(:hover, :focus-within) .leaf { scale: 1; }
@media (prefers-reduced-motion: reduce) { .orn path { animation: none; stroke-dashoffset: 0; } }
```

```css
/* metal, not yellow: a foil gradient in the letters with a sweep that rests most of the time */
.gilt { --foil: linear-gradient(100deg, #7d5f16, #d1a93a 25%, #f6e7b0 42%, #fffbef 48%, #f6e7b0 54%, #d1a93a 72%, #7d5f16);
  background: var(--foil) 100% 0 / 260% 100%; -webkit-background-clip: text; background-clip: text;
  color: transparent; animation: sweep 10s cubic-bezier(.6,0,.2,1) infinite; }
@keyframes sweep { 0%, 65% { background-position: 100% 0; } 100% { background-position: -60% 0; } }
@media (forced-colors: active) { .gilt { color: CanvasText; background: none; } }
```

```js
// an in-world navigator: the needle follows scroll between floors on a spring
const floors = [...document.querySelectorAll('[data-floor]')], ANG = [-72, -36, 0, 36, 72];
function target() {
  const probe = scrollY + innerHeight * .4; let i = 0;
  while (i < floors.length - 1 && probe >= floors[i + 1].offsetTop) i++;
  const a = floors[i].offsetTop, b = floors[i + 1]?.offsetTop ?? a + 1;
  const f = Math.min(1, Math.max(0, ((probe - a) / (b - a) - .6) / .4));   // move late, like a lift
  return ANG[i] + ((ANG[i + 1] ?? ANG[i]) - ANG[i]) * f * f * (3 - 2 * f);
}
function spring() {
  vel = (vel + (target() - ang) * .09) * .74; ang += vel;
  needle.style.rotate = `${ang}deg`;
  if (Math.abs(vel) > .02 || Math.abs(target() - ang) > .05) requestAnimationFrame(spring); else moving = false;
}
addEventListener('scroll', () => { if (!moving) { moving = true; requestAnimationFrame(spring); } }, { passive: true });
```

```js
// fans open as each section arrives; each blade's angle is set once as a custom property
document.querySelectorAll('.fan').forEach(fan => {
  const blades = fan.querySelectorAll('.blade'), n = blades.length;
  blades.forEach((b, i) => { b.style.setProperty('--a', `${-80 + (160 / (n - 1)) * i}deg`);
                             b.style.setProperty('--d', `${i * 40}ms`); });
});
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('open'); io.unobserve(e.target); } }), { threshold: .4 });
document.querySelectorAll('.fan').forEach(f => io.observe(f));
// CSS: .blade { rotate: 0deg; transition: rotate 1s var(--d) } .fan.open .blade { rotate: var(--a) }
```

## Variation levers

- **The period:** Victorian, Belle Époque, Art Nouveau 1899, Vienna Secession, Art Deco 1928, Streamline Moderne, mid-century, 1970s supper club, Meiji, Edwardian seaside.
- **The in-world navigator:** an elevator floor dial, a room-key board, a bell board, a train-departure flap board, a menu's course list, a compass rose, a wine-cellar bin map.
- **The printed objects:** menu card, suite card, luggage label, cocktail napkin, matchbook, wax-sealed letter, tea label, ticket.
- **Day and night:** day room and evening salon, lunch and dinner service, summer and winter terrace, none.
- **The ceremony:** frame drawing, sunburst turning, fans opening, vines growing, foil sweep, a lift chime, a bell.

## Business uses

- A boutique hotel whose floor dial moves between lobby, rooms, restaurant and spa, ending at a booking engine hand-off with dates already filled.
- A tea room or patisserie whose blends are labelled cards and whose afternoon-tea menu is one engraved card with real prices.
- A cocktail bar with a daytime café mode and an evening mode that switches the palette and the menu shown.
- A tailor or perfumer's maison with a crest emblem, a "the house" chapter and an appointment request as the final floor.
- A heritage distillery with a stepped-frame hero, expressions as labels, and a tour booking.

## Pitfalls

- Pastiche overload. Ornament on every edge, every button and every paragraph turns into costume. Leave calm space between ornamented objects; body text sits on plain ground.
- Thin, widely tracked capitals used for reading text. Keep them for names and short labels; body text needs a readable serif at 17–20px.
- Gold on black or cream failing contrast. Check each gold against its ground and use a darker gold for small text.
- Symmetry that breaks at mid widths (a mirrored frame clipping the nav, a centred title wrapping into one orphaned letter). Screenshot at 360, 768, 1024 and 1440.
- An in-world navigator that replaces normal navigation or hides floors. It is an addition; the top nav and footer links remain.
- A reservation form that pretends to book. On a real business, submit to the real system or say plainly that the request will be confirmed by staff.
- Using a real historical brand's name, monogram or artwork. Draw original ornament in the period's grammar.
- Stroke-drawing animations on dozens of paths repainting forever. Draw once, then stop; idle motion only on 1–2 elements.

## Signals (what a user might say)

- "We've been here since 1928 and I want the site to feel like it."
- "It should feel like walking into the hotel / the tea room / the bar."
- "Elegant, old-world, grand, but not dusty."
- "Our building is Art Deco / Victorian / Belle Époque."
- "I want the menu to look like the real printed menu."
- "It should feel luxurious and timeless."
- "Guests should be able to reserve a table / a room at the end."
- "We're a family house, a maison, a heritage brand."
- "Different mood in the evening: the lights go down, the bar opens."
- "Can the navigation be something from the building, like the lift?"
- "Gold, black, green… like an old grand hotel."

**Not this format if…**

- The heritage is a claim rather than a fact (a brand-new business borrowing a period look with no reason). Choose an anchor from its real particulars instead.
- Visitors need speed over atmosphere (a busy takeaway, a budget hotel chain). Use a fast, conventional structure with one period touch.
- The brand is deliberately contemporary or minimal. Ornament and symmetry will fight it; consider `editorial-longread.md` or a poster-led approach.
