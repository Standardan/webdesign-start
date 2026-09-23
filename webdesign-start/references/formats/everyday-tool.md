# Format: everyday tool (a small app made beautiful)

**Load when:** the concept is a useful single-purpose app that someone would return to or bookmark: a recipe with timers and scaling, a habit tracker, a clock, a converter, a calculator, a planner, a checklist, a countdown. It fits businesses whose best marketing is a useful tool (a bakery's recipe card, a bank's savings planner, a gym's habit tracker), personal utilities, food brands, wellness, and anything where "useful every day" is the brand promise.

**Study:** gallery 040 (Nonna Lucia's lemon ricotta tart, a recipe with scaling, timers and cook mode), 046 (Tend, a habit tracker where each habit is a plant). Also 090 (Horologe, a word clock) and 044 (Selene, a tide and moon clock) for single-reading tools.

**Not the instrument format:** an instrument is watched and adjusted. An everyday tool is *used*: the visitor puts in their data (servings, habits, a date) and gets back a result they act on, and it remembers them next time.

## What makes it work

The tool is **fully functional and honest**: the maths is right, timers keep time in a background tab, and the data survives a reload. The beauty comes from **one metaphor that also explains the state**. In 046, the plant's growth stage *is* the streak (seed, sprout, leaves, bud, bloom). In 040, the page *is* Nonna's recipe card, with her notes in the margin. In 090, the letters *are* the time. The tool has **a voice** (the greeting in 046 changes with the hour: "Still up, night gardener?") and **a first run that already looks lived-in**, with seeded example data clearly marked as an example.

## Architecture

1. **Model first, one source of truth.** Keep one plain state object (`{ servings, units, checked[], steps[], timers[] }` or `{ habits: [{ id, name, log: { '2026-09-22': 1 } }] }`). Derive everything else (scaled quantities, streaks, best runs, the lit letters) with pure functions. Store facts, not results: store the log and compute the streak; store the base recipe and compute the scaled amounts.
2. **Rendering from state.** A `render()` that reads state and updates the DOM, called after each action. Use small keyed updates for lists so checkbox focus and animations aren't lost.
3. **Time that tells the truth.**
   - Timers store an end timestamp (`Date.now() + ms`), not a decrementing counter, so they survive throttled background tabs and sleep.
   - Dates use local calendar days (`YYYY-MM-DD` from local parts), not UTC slices, or streaks break at midnight.
   - Clocks tick on the minute or second boundary, not on a drifting interval.
   - Add a "demo" or scrub control (a whole day in 20 seconds, ±30 days) that drives the same model with a fake clock.
4. **Input on keyboard, touch and pointer.** Use real form controls (`<input type="checkbox">`, `<button>`, `<input type="range">`), so everything works everywhere by default. Big tap targets for kitchen or bedside use, steppers with − and + (not only a text field), and keyboard shortcuts only in focused modes (arrows between steps in cook mode, Esc to leave).
5. **Persistence with guarded storage.** One `load()`/`save()` pair with `try/catch`, versioned keys (`tend.v1`), and a migration hook. If storage fails, keep working in memory and say so once ("Changes last until you close this tab"). Offer export and import (JSON download) for anything a person would be sad to lose. Seed example data only on a true first run, never over a failed read.
6. **Sound and attention, opt-in.** A timer chime is the main legitimate sound, synthesised with Web Audio once the visitor has made a gesture, with a visible "Chime on" toggle. Also flash the title (`document.title = '⏰ 0:00 · …'`), and offer a Notification only on request. Hold a Screen Wake Lock in cook mode and release it on exit.
7. **Accessibility.**
   - Timers use `role="timer"` with a visually hidden `aria-live` summary that announces only milestones (started, one minute left, done), never every second.
   - Checklists are real checkboxes; the strike-through is decoration on the label.
   - Charts (a heatmap, a completion ring) have a text equivalent ("12 of 14 days this fortnight") and each heatmap cell gets a date label.
   - Modals (add or edit a habit, cook mode) trap focus and return it.
   - A print stylesheet for anything printable (a recipe, a plan).
8. **Real content in the tool's voice.** Write a short story intro, tips in the maker's hand (an italic "Nonna's tip"), empty states that invite ("Your first habit goes here: something small you'll do tomorrow"), and a finish state worth reaching (all steps done, the plant in bloom).

## Key mechanics

```js
// scaling with kitchen-friendly fractions
const GLYPH = [[0, ''], [.125, '⅛'], [.25, '¼'], [1/3, '⅓'], [.5, '½'], [2/3, '⅔'], [.75, '¾'], [1, '']];
function nice(x) { const w = Math.floor(x), f = x - w;
  const [v, g] = GLYPH.reduce((a, b) => Math.abs(b[0] - f) < Math.abs(a[0] - f) ? b : a);
  const whole = v === 1 ? w + 1 : w;
  return (whole ? String(whole) : '') + g || '0'; }
const qty = (item, serves) => item.amount * serves / RECIPE.serves;   // grams scale linearly; round eggs up
```

```js
// timers that survive background tabs: store the end, derive the rest
function startTimer(t) { t.end = Date.now() + t.left * 1000; t.running = true; }
function tick() { for (const t of timers) if (t.running) {
    t.left = Math.max(0, (t.end - Date.now()) / 1000);
    ring(t.el, 1 - t.left / t.total);                   // stroke-dashoffset on an SVG circle
    if (t.left === 0) { t.running = false; chime(); say(`${t.label} is done`); } } }
setInterval(tick, 250);   // not rAF: rAF stops in background tabs, so the chime would never fire
```

```js
// local-day keys and a streak derived from the log
const dayKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const shift = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
function streak(h, today = new Date()) {
  let d = h.log[dayKey(today)] ? today : shift(today, -1), n = 0;  // today not yet done keeps yesterday's streak
  while (h.log[dayKey(d)]) { n++; d = shift(d, -1); }
  return n; }
const STAGES = ['seed', 'sprout', 'leaves', 'bud', 'bloom'];
const stage = n => STAGES[Math.min(STAGES.length - 1, Math.floor(Math.sqrt(n)))];  // quick early growth, slower later
```

```js
// guarded, versioned storage with an honest fallback
const KEY = 'tend.v1';
function load() { try { const o = JSON.parse(localStorage.getItem(KEY)); return o?.v === 1 ? o : null; }
  catch { memoryOnly = true; return null; } }
function save(s) { if (memoryOnly) return;
  try { localStorage.setItem(KEY, JSON.stringify({ v: 1, ...s })); }
  catch { memoryOnly = true; toast('Storage is blocked here: changes last until you close this tab.'); } }
const state = load() ?? (memoryOnly ? blank() : exampleData());  // example data only on a true first run
```

```js
// a clock that ticks on the boundary and a demo that reuses the same renderer
function schedule() { const now = demo ? demoClock() : new Date(); render(now);
  setTimeout(schedule, demo ? 50 : 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())); }
```

## Variation levers

- **The metaphor that shows state:** a plant, a jar filling, a candle burning down, a tide, lit letters, a paper card getting stained with use.
- **The material:** a recipe card, a paper planner, a brass clock face, frosted glass, a chalkboard, a wall calendar.
- **The focus mode:** cook mode (one huge step), focus mode (one timer), bedside mode (dimmed, big numerals), fullscreen.
- **Voice:** a named maker (Nonna Lucia), a gentle coach, a dry butler, none.
- **Outputs:** print, a shareable link with the settings in the URL, a calendar file, a JSON export.

## Business uses

- A bakery or food brand with its signature recipe as a card that scales, converts units, runs the oven timer and ends on "Order the flour we use".
- A bank or credit union with a savings planner whose jar fills as you move the monthly amount.
- A gym or physio with a habit tracker where each exercise is a plant.
- A watchmaker or interiors brand with a beautiful clock page people leave open.
- A wedding or event planner with a countdown and checklist that couples keep returning to.
- A tea brand with a steeping timer per tea, with the temperature and a chime.

## Pitfalls

- Wrong maths. Test scaling at 1, 2, 3, 7 and 12 servings, unit conversions both ways, and streaks across midnight, month ends and daylight-saving changes.
- Countdowns that decrement a counter and lose time in background tabs, or run on `requestAnimationFrame` and never fire there. Store end timestamps and check them on an interval.
- UTC date keys (`toISOString().slice(0, 10)`) that shift a day for half the world.
- Example data that overwrites real data after a storage error. Seed only when a read succeeded and found nothing.
- A tool that's beautiful but slow to use: tiny steppers, hover-only controls, or the key action below the fold on a phone.
- Timer or live regions that announce every second.
- Illustrative models presented as real (a tide clock used for navigation, a savings rate that isn't the bank's). Label them clearly.
- No way out of the example state. Offer "Clear example habits" and "Start fresh".

## Signals (what a user might say)

- "I'd love something people actually use, not just read."
- "Can the recipe scale for more people and have timers?"
- "A little tool customers would bookmark."
- "Something useful we could give away for free."
- "A tracker for habits, workouts or water that looks nice."
- "A calculator or converter, but not ugly."
- "I want people to come back every day."
- "A beautiful clock or countdown to our launch."
- "Make our checklist or planner feel special."
- "It should remember what they entered."
- "Something for the kitchen or the bedside table."

**Not this format if…**

- The tool needs accounts, sync across devices or real private data handling; that's a product build, not a page. Scope a demo or a waitlist instead.
- The numbers need regulated accuracy (medical dosing, tax, navigation) and no one can supply and sign off the real rules.
- The visitor would use it once and never again; a signature interactive or explainer fits better (`signature-reveal.md`, `scroll-journey.md`).
