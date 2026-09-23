# Format: living scene

**Load when:** the concept is a lit place you look into: a paper diorama, a room, a landscape, a sky, a street, a garden. The scene *is* the hero, and the interface sits on or in it. Fits hospitality, travel, wellness, local businesses with a sense of place, kids' brands, weather or state-driven products.

**Study:** gallery 018 (Foxglove Hollow, a paper diorama), 012 (Nimbus, a weather sky behind glass cards). Also 051 (winter cabin), 061 (firefly meadow), 062 (lava-lamp room).

## Two variants

- **Diorama (018):** a framed stack of layered planes that parallax with pointer and idle drift. The interface is made of the scene's material (paper tags, torn buttons).
- **World layer (012):** a full-viewport canvas world behind translucent interface panels. The world and the whole colour system change with state (weather, time, mode).

## Architecture

1. **Decide the stack.**
   - A diorama uses 6–9 numbered planes, back to front, each with a depth factor, shadow size, and a colour value step (pale and cool at the back, dark and warm at the front).
   - A world layer uses one canvas (sky, particles, light) plus overlay panels.
2. **Frame it** (diorama): put a mat, window or box frame on top that moves *less* than the scene, so you look *into* a box.
3. **Generate the art** with small seeded generators (ridges, trees, plants, clouds) and an edge jitter that scales with object size. Hand-draw only the one hero character or object.
4. **Recompose for portrait.** A helper `P(landscape, portrait)` picks horizon heights, focal positions and element counts per orientation. Size things with an area unit `U = sqrt(W*H)/100`. Rebuild the scene on a debounced resize.
5. **Motion:**
   - parallax from pointer position (mouse) or drag deltas (touch);
   - idle drift from slow sines of mismatched periods when there is no input;
   - frame-rate-independent smoothing;
   - layers oversized by the maximum shift so their edges never show.
6. **States as authored palettes.** Give every colour token a hand-picked twin per state (day/night, weather). Stagger the transition by depth, back to front. Swap props with anticipation-and-overshoot easing (the sun hoisted out, the moon lowered). Add 2–3 things that exist only in the new state (lit windows, fireflies, bioluminescence).
7. **Interface in the material:** the title as a tag, card or sign; controls as torn paper, enamel, brass or glass. For a world layer, use glass panels over the living sky with a gradient hairline edge (`techniques.md` §3).
8. **Life:** 5 or more small loops (leaves, birds, smoke, a blinking character, a flickering light) with mismatched durations and negative delays so they never sync.

## Key mechanics

```js
// parallax: deeper planes move more, slightly super-linear; oversize each plane by the max shift
const S = Math.min(W, H) * .04;
planes.forEach(p => { const f = Math.pow(p.depth / MAX_DEPTH, 1.15) * S;
  p.el.style.transform = `translate3d(${-px * f}px, ${-py * f * .55}px, 0)`; });
// idle drift when no input for a few seconds
if (idle > 3) { tx = Math.sin(t * .19) * .4; ty = Math.sin(t * .13 + 1) * .18; }
px = approach(px, tx, calm ? 9 : 3.4, dt); py = approach(py, ty, calm ? 9 : 3.4, dt);
```

```css
/* depth grammar: warm shadow grows with depth, 1px light rim on the cut edge, staggered state change */
.plane { filter: drop-shadow(0 -1px 0 var(--rim)) drop-shadow(0 calc(var(--z) * 1px) calc(var(--z) * 1.5px) var(--shade));
  transition: filter 1.2s ease calc(var(--i) * .1s); }
.plane path { transition: fill 1.25s cubic-bezier(.55,.05,.3,1) calc(var(--i) * .1s); }
[data-state="night"] { --shade: rgb(6 6 32 / .6); --rim: rgb(176 186 255 / .2); }
```

```js
// world layer: particle counts from area, sprites pre-rendered, whole palette per state
const count = Math.round(clamp(W * H / 3600, 80, 600));
document.body.dataset.state = weather;          // CSS redefines ~10–13 colour tokens per state
```

## Variation levers

- **The material:** cut paper, felt, clay, stained glass, watercolour, woodcut, pixel art, low-poly.
- **The framing:** a box, a window, a porthole, a book plate, a TV bezel, none.
- **The state axis:** time of day, season, weather, open or closed, busy or quiet.
- **The character:** a fox, a shopkeeper, a boat, none.
- **Camera behaviour:** pointer parallax, gyroscope tilt, a slow pan, fixed.

## Business uses

- A café whose scene shows the real time: the lights are on when it's open, and the chalkboard lists today's bakes.
- A cabin rental with seasons you can switch between.
- A kids' bookshop as a paper-cut village, with each building leading to a section.
- A spa where the room lighting follows a "calm" slider.

## Pitfalls

- The title block eating the phone screen. Size the interface smaller on phones and check that nothing covers the focal subject.
- Hints that promise interactions which behave differently.
- Characters that can land somewhere absurd (in the river). Seed or constrain their targets.
- Toggles whose accessible name doesn't change with state.
- Colour-coded elements that change meaning between states. Screenshot every state.
- Filters on large areas repainting every frame. Keep heavy filters on static layers.

## Signals (what a user might say)

- "It should feel like walking into the shop."
- "A little world people can look around."
- "Cosy", "magical", "like a storybook illustration."
- "I want it to change with the time of day / the weather / the seasons."
- "Like looking through a window."
- "Our place is the star: the building, the view, the room."
- "Something kids would love" (paper, clay or toy-like variants).
- "Calm but alive."

**Not this format if:** there's a lot of content to read or browse (use it as the hero, then another format below); the product must be inspected in detail (product showcase); or the brand wants loud and graphic (poster).
