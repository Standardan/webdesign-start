# Format: playable (the visitor plays)

**Load when:** the concept is something the visitor *plays*, as the whole site or as one section: a maze, an arcade game, a board game, a puzzle, a playable instrument, a sound mixer. It fits games studios, campaigns and launches, events, music products and teachers, kids' brands, and lead magnets where the game is the reason to visit and share.

**Study:** gallery 033 (Labyrinthos, a stone maze with a flame-lit fog of war), 038 (HYPERBRICK, a synthwave breakout in an arcade bezel), 070 (Grandmaster's Study, hot-seat chess on a wooden board). Also 080 (falling-notes piano with a learn mode), 092 (soundscape mixer), 007 (neumorphic synth).

**Not the instrument format:** in `instrument.md` the page is an object you watch and adjust. Here the visitor has a goal, a turn, a score, a song or a mix, and the page is built around one loop of play.

## What makes it work

The game is **themed all the way down**. The playfield, the HUD and even the controls are made of the world's material: carved terracotta and Roman numerals in 033, a neon cabinet with an attract-mode demo in 038, a lacquered board and a paper score sheet in 070. The playfield is the hero and fills the first frame. Side panels hold only what play needs: time, score, mode, controls legend. It is **playable within two seconds**, with no tutorial screen, and every action has **juice**: a sound, a particle, a squash, a glow, a line in the log.

## Architecture

1. **One state machine, named phases.** `title → play → paused → won/lost`, plus format-specific ones (`carve` while the maze builds itself, `attract` for the demo, `promo` while choosing a promotion). Input handlers ask the phase before acting (`canAct()`). Every screen is a phase, not a stacked modal.
2. **The loop.**
   - Real-time games: one `requestAnimationFrame` loop, `dt` in seconds, clamped (≤ 50 ms) so a tab switch never teleports the ball. Sub-step fast objects so they can't tunnel through bricks.
   - Turn-based games: no loop at all; render on each move and animate the move with a CSS transform or WAAPI.
   - Stop the loop on `visibilitychange` and auto-pause a running game.
3. **Model the rules separately from the drawing.** Chess legality, maze graphs and brick grids live in plain data with pure functions (`legalMoves(state)`, `neighbours(cell)`). Rendering reads state; it never decides rules. This is what makes undo, hints (BFS for Ariadne's thread in 033) and replays cheap.
4. **Input on all three devices, mapped to the same verbs.**
   - Keyboard: arrows and WASD, Space for the primary action, P or Esc to pause, `<kbd>` hints in the legend. Scope keys to the focused playfield so they don't hijack page scrolling.
   - Touch: swipe for direction (a threshold of about 20px), tap to step, and an on-screen d-pad or big buttons on coarse pointers. `touch-action: none` on the playfield only.
   - Pointer: click-to-select and drag with `setPointerCapture`; for a paddle, map pointer x directly.
   - All three call the same functions (`move(dir)`, `launch()`), and a held button repeats.
5. **Persistence behind a guard.** Best times, high scores, settings and an unfinished game go through one `store` wrapper with `try/catch`. If storage is blocked, the game still works and says quietly that scores won't be kept. Seed rounds (`mulberry32(seed)`) so "Labyrinth No. VII" can be replayed and shared by URL.
6. **Sound is opt-in and synthesised.**
   - Create the `AudioContext` on the first gesture. Show the sound toggle's state with `aria-pressed`, and remember it.
   - Tie pitch to game state (the combo climbs in 038).
   - Rate-limit sounds, give each a short envelope, and never loop sound on the title screen.
   - For instruments and mixers, schedule ahead on the audio clock (a lookahead of about 0.1–0.35 s), never with `setTimeout` timing.
7. **Accessibility of games and canvases.**
   - Put a hidden `aria-live="polite"` region beside the canvas and announce outcomes in words: "Knight takes e5, check", "Stage 3 cleared", "Wall to the north".
   - A DOM grid game (chess, puzzles) uses real buttons with roving tabindex and arrow-key navigation, and each square's label names the piece on it.
   - A canvas needs `role="img"` or `role="application"` with a label that explains the controls.
   - Offer a slower speed or "relaxed mode" instead of assuming reflexes, and put reduced-motion alternatives on screen shake and flashes.
   - Status is never shown by colour alone: pair check glow with the text "Check".
8. **Screens with the same craft.** A title with an attract demo or a first-frame tableau, a pause overlay, and a win screen with an illustration (a laurel, a cabinet high-score table). The end screen carries the business call to action: a play-again button first, the offer second.

## Key mechanics

```js
// fixed-cap dt loop with sub-stepping; pauses itself when hidden
let last = 0, raf = 0;
function frame(now) { raf = requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  const steps = Math.ceil(speedOf(ball) * dt / (BALL_R * 0.8));
  for (let i = 0; i < steps; i++) step(dt / steps);
  draw(); }
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(raf); raf = 0; if (phase === 'play') setPhase('paused'); }
  else if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } });
```

```js
// one set of verbs, three input sources
const KEYS = { ArrowUp: 'n', KeyW: 'n', ArrowDown: 's', KeyS: 's', ArrowLeft: 'w', KeyA: 'w', ArrowRight: 'e', KeyD: 'e' };
field.addEventListener('keydown', e => { const d = KEYS[e.code]; if (d) { e.preventDefault(); move(d); } });
let start = null;
field.addEventListener('pointerdown', e => { start = { x: e.clientX, y: e.clientY }; });
field.addEventListener('pointerup', e => { if (!start) return;
  const dx = e.clientX - start.x, dy = e.clientY - start.y; start = null;
  if (Math.hypot(dx, dy) < 20) return tapStep(e);
  move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'e' : 'w') : (dy > 0 ? 's' : 'n')); });
```

```js
// fog of war that remembers: a low-res mask canvas, one pixel per cell
const seen = new OffscreenCanvas(COLS, ROWS), sctx = seen.getContext('2d');
function reveal(cx, cy, r) { sctx.fillStyle = '#fff';
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++)
    if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) sctx.fillRect(x, y, 1, 1); }
// draw: dark overlay, then cut out remembered cells at 25% and the live torch radius at 100%
```

```js
// guarded storage + an announcer the whole game uses
const store = { ok: true,
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { this.ok = false; return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { this.ok = false; } } };
const live = document.getElementById('live');          // <p class="sr-only" aria-live="polite">
const say = t => { live.textContent = ''; requestAnimationFrame(() => live.textContent = t); };
```

```js
// audio-clock scheduling for sequencers, loops and falling-note songs
function pump() { const ahead = ctx.currentTime + (document.hidden ? 1.5 : 0.15);
  while (nextAt < ahead) { playStep(stepIdx, nextAt); queueVisual(stepIdx, nextAt);
    nextAt += 60 / bpm / 4; stepIdx = (stepIdx + 1) % 16; } }
setInterval(pump, 25);                                   // visuals read the queue against ctx.currentTime
```

## Variation levers

- **The genre:** a maze, a breakout or arcade game, a board game, a match or sliding puzzle, a rhythm or learn-the-song game, a mixer, a sequencer, a drum pad.
- **The material:** stone and parchment, a neon cabinet, wood and brass, felt, paper cut-outs, chalkboard, clay (neumorphic).
- **The mode ladder:** free play, guided or learn, challenge; or small, medium and large; or five authored levels plus endless.
- **The goal:** a score, a time, a finished song, a mix saved as a preset, a solved study.
- **Sharing:** a seed in the URL, a result card to copy, a preset link.

## Business uses

- A games studio whose site opens on a 60-second playable slice of its art style, with the store link on the win screen.
- A music school with a falling-notes piano whose learn mode waits for the right key; the end screen books a trial lesson.
- A festival with a maze of its site map; finding the stage reveals the line-up.
- A headphone brand with a soundscape mixer that sells the product's quiet.
- A kids' brand with a gentle puzzle with no fail state.
- A chess club or café with a study board that loads this week's puzzle.

## Pitfalls

- A game that needs instructions to start. If a first-time visitor can't play in two seconds, simplify the first round.
- Arrow keys and Space scrolling the page. `preventDefault` only when the playfield has focus.
- `dt` spikes after a tab switch that send the ball through walls. Clamp and sub-step.
- Sound on page load, or a mute state that isn't remembered.
- Touch targets under 44px on the d-pad, or a playfield that overflows a phone in portrait. Recompose the playfield (portrait breakout court, board above the move list).
- An unwinnable or absurd generated round. Validate generated mazes and levels (a path exists, the exit isn't next to the start).
- A canvas game that is silent to screen readers. Announce outcomes and state in a live region.
- Timing-dependent input with no slower mode, and screen shake with no reduced-motion alternative.
- A mix of game and marketing where banners cover the playfield. Put the offer on the end screen.

## Signals (what a user might say)

- "Can people play something on the site?"
- "I want visitors to actually spend time on it, not just scroll past."
- "Something kids would love to click around in."
- "Like a little game that shows off our style."
- "Could it be a puzzle or a maze?"
- "Let people try the instrument or the sound in the browser."
- "Something people would share with friends or send their score."
- "A fun giveaway or competition page."
- "Make learning the song or the skill feel like a game."
- "Our brand is playful; I want the site to be too."
- "Let them build their own mix or beat."

**Not this format if…**

- The visitor needs to complete a task quickly (book, buy, look something up); a game in the way is friction. Use a playable *section* at most.
- The "game" would be decoration with no goal, feedback or ending. Use `living-scene.md` or `instrument.md` instead.
- The audience is using assistive tech or low-power devices heavily and the game can't be made accessible in scope. Ship a simpler interactive instead.
