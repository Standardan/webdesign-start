# Format: interactive story

**Load when:** the site tells a narrative in discrete scenes that the visitor steps through, rather than scrolls past: a case file, a picture book, a poem in exposures, a founder's journey, a product's origin as chapters. The visitor turns, chooses or clicks to advance, and something is collected, revealed or changed along the way. Fits brand stories, children's products and publishers, campaigns, founders' stories, museum and heritage interpretation, onboarding told as a tale.

**Study:** gallery 077 (The Glass Alibi, a branching noir case), 098 (Pip and the Paper Moon, a picture book with page turns), 072 (Somewhere Inside, a double-exposure poem whose inner world changes).

## Three variants

- **Branching case (077):** about six scenes, each with narration and 2–3 choice cards. Choices collect clues into a notebook; some choices are locked until you hold the right clue. Two or three endings. Iris wipes and title cards between scenes.
- **Picture book (098):** a fixed sequence of spreads (a two-page spread on desktop, one page on phones) turned with a 3D page curl. Each spread hides small tap delights. A read-along mode highlights words and turns pages by itself.
- **Exposure sequence (072):** one fixed frame (a silhouette, a window, a lens) through which the scene changes. The visitor cycles scenes; text fragments fade in beside the frame. Closer to a poem than a plot.

## What makes it work

The **frame never moves**: a film screen, a book, a silhouette. Only what is inside it changes, so each step reads as the next scene of the same work. **Transitions are punctuation** (an iris closing, a page curling, a cross-fade through the mask) and last long enough to mark a chapter but never block the reader. The visitor **carries something forward**: clues in a case file, a page count, a fragment number. **One accent is reserved for meaning** (the only red in a black-and-white film is the lipstick clue), so the eye learns what matters. Text is **short, voiced and paced**: a typewriter for noir, large read-along words for a picture book, one italic line for a poem.

## Architecture

1. **Write the story before the code.** A scene list with, for each scene: an id, title, time or page number, art key, 1–3 short paragraphs, and its exits (choices, "next", or an ending). Six to ten scenes for a campaign; three endings at most. A founder's story usually needs no branches, only chapters.
2. **Model it as data (a scene graph).** Choices carry optional `requires` (clue ids), a `locked` explanation shown when requirements aren't met, `gives` (clue ids) and `go` (next scene). Rendering, the notebook, endings and restart all read the same object.
3. **One stage, many scenes.** A single framed stage holds pre-built scene art (SVG groups or canvas painters) that is switched, not re-navigated. Keep persistent chrome outside it: title, sound toggle, notebook, restart, progress dots.
4. **Every scene is addressable.** Update the URL hash (`#scene-3`, `#page-5`) so Back, refresh and shared links land in the right place, and restore collected state from `sessionStorage`.
5. **The transition sequence** is an awaited script: lock input, close (iris, curl, fade), show a title card with scene number and time, swap art and text, open, then type the text. On reduced motion, replace it with a quick cross-fade and keep the title card as static text.
6. **Text delivery:**
   - typewriter or word-by-word reveal, always skippable by click or Space;
   - the full line sent to a polite live region at once, never character by character;
   - choices appear only after the text finishes, as buttons with number-key shortcuts;
   - picture books use large type (at least 22px) and an optional read-along highlight.
7. **The collected object** (case file, sticker album, map, fragment counter) opens as a side panel or dialog, stamps when something new arrives, and is shown in full on the ending screen as the story's summary.
8. **Small delights per scene:** 2–4 tappable things that respond (a fox hops, a star chimes, a pond ripples, the lamp flickers). They must never be required to progress.
9. **Sound is opt-in,** off by default, synthesized or tiny, with a visible toggle whose label changes with state.
10. **The ending carries the business action:** buy the book, visit the museum, read the founder's full letter, join the list. Offer "read again" and "see other endings".

## Key mechanics

```js
// a scene graph as data; locked choices explain themselves instead of disappearing
const scenes = {
  alley: { n: 'II', title: 'The Alley', art: 'alley', text: ['…'],
    choices: [
      { label: 'Pocket the lipstick.', gives: ['tube'], go: 'club' },
      { label: 'Leave it to the rain.', go: 'club' } ] },
  pier: { n: 'VI', title: 'Pier 9', art: 'pier', text: ['…'],
    choices: [
      { label: 'Lay out the alibi.', requires: ['tube', 'glass'], end: 'truth',
        locked: 'A hunch is not a case. You need the tube and the glass.' } ] },
};
const open = c => (c.requires || []).every(id => clues.has(id));
```

```js
// transition as an awaited script: close, title card, swap, open, type
const iris = (from, to, ms) => stage.animate(
  [{ clipPath: `circle(${from} at 50% 50%)` }, { clipPath: `circle(${to} at 50% 50%)` }],
  { duration: reduce ? 0 : ms, easing: 'cubic-bezier(.6,0,.4,1)', fill: 'forwards' }).finished;
async function go(id) {
  if (busy) return; busy = true; const s = scenes[id];
  await iris('75%', '0%', 600);
  card.textContent = `${s.n} · ${s.title}`; card.hidden = false;
  showArt(s.art); location.hash = id; await wait(reduce ? 0 : 900);
  card.hidden = true; await iris('0%', '75%', 700);
  busy = false; await typeLines(s.text); showChoices(s);
}
```

```js
// skippable typewriter; screen readers get the whole line once
async function typeLines(lines) {
  for (const line of lines) {
    const p = log.appendChild(document.createElement('p'));
    live.textContent = line;                    // aria-live="polite", visually hidden
    for (let i = 1; i <= line.length && !skip; i++) {
      p.textContent = line.slice(0, i);
      await wait(/[.,;?!]/.test(line[i - 1]) ? 180 : 22);
    }
    p.textContent = line;
  }
  skip = false;                                  // click or Space sets skip = true
}
```

```css
/* a page leaf hinged at the spine; shading follows the angle so the curl reads as paper */
.leaf { position: absolute; inset: 0 0 0 50%; transform-origin: left center;
  transform-style: preserve-3d; transform: rotateY(calc(var(--a) * -1deg));
  transition: --a .9s cubic-bezier(.45,.05,.25,1); }
.leaf .front, .leaf .back { position: absolute; inset: 0; backface-visibility: hidden; }
.leaf .back { transform: rotateY(180deg); }
.leaf .front::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, rgb(0 0 0 / calc(var(--a) / 300)), transparent 40%); }
@property --a { syntax: "<number>"; inherits: true; initial-value: 0; }
.leaf.turned { --a: 180; }
```

```js
// double exposure: paint the inner world, then keep only what falls inside the silhouette
function paint(t) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, W, H);
  drawWorld(ctx, current, t, px, py);           // sky, ridges, water, per-scene palette
  if (mix < 1) { ctx.globalAlpha = 1 - mix; drawWorld(ctx, previous, t, px, py); ctx.globalAlpha = 1; }
  ctx.globalCompositeOperation = 'destination-in';
  ctx.setTransform(S, 0, 0, S, OX, OY); ctx.fill(silhouette); ctx.setTransform(1, 0, 0, 1, 0, 0);
}
```

## Variation levers

- **The frame:** a film screen, a book, a silhouette, a keyhole, a porthole, a shop window, a stage with curtains, a phone screen, a slide projector.
- **The step:** a choice card, a page turn, a click on the frame, a dial, a scroll snap per scene.
- **The transition:** iris, page curl, curtain, film burn, cross-fade through a mask, a camera flash, a slide-projector clack.
- **What is carried:** clues, stamps, a collected object per scene, a map filling in, a counter of fragments.
- **The voice:** hard-boiled narrator, bedtime storyteller, poet, the founder in first person, the product itself.
- **Branching:** none (chapters), cosmetic (choices change a detail), or real (2–3 endings).

## Business uses

- A children's book publisher's launch page that is the first four spreads of the book, ending with "Read the rest".
- A founder's story as six dated chapters, each with a scene and one artefact collected into a "things we kept" drawer.
- A museum exhibition teaser as a short mystery, where the clues are real objects from the show.
- A spirits or perfume campaign as a noir case, each choice revealing a note of the product.
- A charity's appeal told through one person's day in five scenes, ending with a single, specific donation action.

## Pitfalls

- Blocking transitions. Input must skip typing instantly, and a transition may never take longer than about 1.8s including the title card.
- Story as the only route to essential information. Prices, dates, addresses and the main call to action also live outside the story (a plain "About" and a footer).
- Hidden progress. Always show where the reader is (scene II of VI, page dots) and how to go back or restart.
- Choices that don't matter while pretending to. If a branch changes nothing, make it a chapter "Next" instead.
- Typewriter text announced character by character, or choices appearing before a screen reader has heard the scene.
- A 3D page turn that breaks on touch. Swipe, tap on the page edge, arrow keys and visible buttons all need to work, and phones get one page, not a squeezed spread.
- Autoplaying sound. Keep audio off until the visitor asks for it.
- Reading age mismatched to the audience. Picture books need short sentences and large type; a campaign story needs lines a busy adult will read.

## Signals (what a user might say)

- "I want to tell our story, not just list facts."
- "It should feel like a book / a film / a comic."
- "Can visitors make choices that change what happens?"
- "Our product is for kids and parents read it together."
- "I want people to discover things as they go, like clues."
- "Walk people through how the company started, chapter by chapter."
- "Something they click through, like turning pages."
- "A campaign people will play with and share."
- "The exhibition has a mystery at its heart."
- "Make it feel like a bedtime story / a detective case / a poem."

**Not this format if…**

- Visitors arrive to do a task quickly (book, buy, find opening hours). Use a conventional structure and borrow one story section at most.
- The narrative is one continuous change (depth, time, altitude, a process). Use a scroll-driven journey instead.
- There is no story yet. Without a written scene list, the format produces pretty transitions around empty scenes; go back to discovery.
