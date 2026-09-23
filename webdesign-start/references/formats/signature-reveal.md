# Format: signature object and reveal

**Load when:** one object deserves the full tactile treatment and a moment of ceremony. Examples: a collectible or membership card, a pricing plan, a gift card, a ticket, a product box being unwrapped, a certificate, a tarot or recipe card deck. It can be a whole page (a launch, a campaign, a collectible drop) or one section inside a calm business site.

**Study:** gallery 032 (holographic card and pack opening). Also 053 (tarot reading) and 082 (the perfume bottle as a signature object).

## What makes it work

Everything about the object is driven by **one simulated state** (a spring for tilt), not by the raw pointer. Light, foil, shadow and halo all read that state, so idle sway, keyboard tilt, touch drag and flips all look right. The reveal is a **choreographed ritual** with anticipation, a break, emergence, one payoff and a settle, not an instant swap. One motif (a particle shape, a palette, a story such as "prism") ties the art, foil, particles and interface together.

## Architecture

1. **Pick one object** and keep the rest of the page calm. Removing the effects must leave a fully working conventional page.
2. **Build the object in layers:**
   - a base material;
   - art (drawn for the site);
   - foil (four layers, `techniques.md` §7);
   - glare;
   - an edge;
   - a contact shadow and halo outside the object.
3. **A spring for tilt and lift,** capped at ±12° on business sites. Write 3–4 custom properties from the spring output (`--lx --ly --tilt --lift`) and let CSS layers read them.
4. **Idle life after about 2.5s without input:** sums of mismatched slow sines at low amplitude, pre-rolled so the first frame is already posed. Stop it when the object is off-screen or the tab is hidden.
5. **Reveal ritual.** A business site keeps this under about 2.5s; a game or collectible drop can run up to about 4s.
   1. The old state exits.
   2. The container springs in.
   3. Anticipation: a wobble plus a shimmer.
   4. The break: a shared jagged `clip-path` so the halves fit.
   5. The object emerges from behind the container.
   6. One payoff: a soft flash or a pooled particle ring.
   7. A spring settle.
   8. An `aria-live` announcement.

   Guard it with a busy flag. Trigger it only by an explicit action, and make it skippable and replayable.
6. **Secondary responders:** a shadow that shifts opposite to the tilt, a halo that tracks it, and dust or sparkles in the same glyph as the foil.
7. **Content stays real:** the plan name, price, member number or card text is real DOM text, not only drawn.

## Key mechanics

```js
async function reveal() {
  if (busy) return; busy = true; button.disabled = true;
  try {
    await animate(pack, [{ scale: .6, opacity: 0 }, { scale: 1, opacity: 1 }], 600, 'cubic-bezier(.2,1.25,.4,1)');
    await animate(pack, [{ rotate: '0deg' }, { rotate: '-2deg' }, { rotate: '2deg' }, { rotate: '0deg' }], 380);
    tear(pack);                                   // both halves clipped along one shared jagged path
    await animate(card, [{ translate: '0 30%', opacity: 0 }, { translate: '0 0', opacity: 1 }], 700, 'cubic-bezier(.16,1,.3,1)');
    payoff(); kick(springs, 18); live.textContent = `Revealed: ${card.dataset.name}`;
  } finally { busy = false; button.disabled = false; }
}
const animate = (el, k, d, e = 'ease') => calm ? Promise.resolve() : el.animate(k, { duration: d, easing: e, fill: 'forwards' }).finished;
```

Under reduced motion, run the same steps as short fades (about 1.5s in total), use a critically damped spring and no idle sway, and keep the lighting following keyboard and pointer input.

## Variation levers

- **The object:** a card, ticket, box, envelope, seal, badge, bottle or coin.
- **The finish:** holographic foil, gold foil, letterpress, enamel, frosted glass, wax.
- **The break:** tear, unwrap, crack a wax seal, lift a lid, slide from a sleeve, scratch off.
- **The payoff:** a particle ring, a chime, a light flash, confetti in the brand glyph, a stamp.

## Business uses

- A membership tier card that tilts and catches the light, with an "unlock" that reveals the perks.
- A gift card configurator where the finished card slides out of an envelope.
- An event ticket that tears along a perforation to reveal your seat.
- A premium pricing plan whose card has a subtle foil and lifts on focus.

## Pitfalls

- The whole card repainting every frame with blend modes. Test on a low-end phone and stop loops off-screen.
- Tilt that is too strong for business contexts. Cap it around 12° and keep foil opacity below about 0.6.
- Single-key shortcuts (F to flip). Scope them to the focused object.
- The same result every time when the concept promises randomness.
- A reveal gating content, or starting automatically.

## Signals (what a user might say)

- "Like opening a pack of cards" / "an unboxing moment."
- "Make the membership feel special."
- "A launch people remember."
- "Collectible", "limited edition", "exclusive."
- "Shiny", "holographic", "foil", "premium finish."
- "A gift card / ticket / invitation that feels real."
- "A little ceremony when you sign up."
- "Something people screenshot and share."

**Not this format if:** visitors need the information immediately with no ceremony (hours, prices, urgent services); there's no single object worth elevating; or the audience is sensitive to gimmicks (medical, legal, finance with serious stakes). There, keep the tactile finish but drop the reveal.
