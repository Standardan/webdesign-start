# Format: themed interface world

**Load when:** the concept dresses the whole site as one fictional interface or era: a retro desktop with windows and a taskbar, a CRT terminal you type into, a vaporwave mall, a clay or soft-3D UI kit, a specimen sheet of loaders, a Y2K chrome product page. The interface *is* the world, and navigation happens through its own controls. Fits tech brands, games and game studios, nostalgia products, developer tools, UI kits and design systems, creative coders, and campaigns that want to be played with.

**Study:** gallery 016 (Plaza Aeterna, a vaporwave mall run by a 1990s desktop), 019 (Helios/OS, a phosphor CRT shell). Also 048 (Squishy, a claymorphism kit), 050 (Loading, Beautifully, a loader specimen gallery), 010 (Mercury, a Y2K liquid-chrome hero: the era's surface without the OS chrome).

## Three variants

- **Operating system (016, 019):** the page is a machine. Content lives in windows, files or commands; a taskbar, prompt or status line frames it; a boot or welcome sequence opens it.
- **Material kit (048, 010):** the page is a showcase of one invented surface (clay, chrome, glass, jelly). Every control is made of it and demonstrates it; the hero is a cluster of objects in that material.
- **Specimen sheet (050):** the page is a catalogue of working pieces, each on its own small stage with a number, a name, the technique in mono, and replay/copy controls.

## What makes it work

Commitment to the fiction at every scale, with an honest exit. The title bar has minimise buttons that work; the clock in the taskbar is real; `ls` lists real files; the pressed clay button actually sinks. Each surface is defined once as tokens (bevel light/dark, clay in/out/press, phosphor glow) and reused everywhere, so the world is consistent. And it stays usable: every command has a button, every window has a phone layout, every effect has an off switch.

## Architecture

1. **Pick the era and write its rulebook first:** surface tokens (bevels, shadows, glows), 2–3 type voices (a system UI face, a mono, one display), a palette of 5–7 named values, and the era's sounds and timings (boot pauses, 60 Hz flicker, springy squash).
2. **Choose the container:**
   - desktop: fixed scene layer, a `pointer-events: none` desktop layer, windows with `pointer-events: auto`, a taskbar;
   - terminal: a bezel frame, a scrolling `role="log"` output, one input line;
   - kit or specimen: a normal scrolling page whose sections are showrooms.
3. **Map the content to native objects.** Pages become windows, files or commands; sections become tabs, folders or specimen cards; the CTA becomes a real action in the world ("Enter the mall", `cat pricing.txt`, "Grab the kit").
4. **Open with a ritual that can be skipped:** a BIOS count, a login banner, a welcome window, a kit that pops in. Any key or tap fast-forwards; returning visitors skip it (remember that in `localStorage`, wrapped in try/catch).
5. **Give the machine a pulse:** a real clock, uptime, a status line, a now-playing track, a blinking caret, idle bobbing on clay objects. Small, constant, true.
6. **Provide a non-expert path.** A terminal gets a row of command buttons; a desktop gets desktop icons and a Start menu; a specimen gets "replay all" and "pause all".
7. **Phones get a different arrangement of the same world:** windows become stacked cards with their title bars as headers; the terminal gets tap-to-focus and command chips; kit grids go to two columns.
8. **Era effects as a top layer:** scanlines, vignette, VHS tracking, grain, chromatic rim. One fixed, `pointer-events: none` overlay, off under reduced motion and on a user toggle.

## Key mechanics

```js
// window manager: .win sits at left/top 0 and lives in `translate`; drag by title bar, raise on focus, keep a handle on screen
let z = 10;
function makeWindow(win) {
  const bar = win.querySelector('.titlebar');
  win.addEventListener('pointerdown', () => { win.style.zIndex = ++z; });
  bar.addEventListener('pointerdown', e => { if (phone.matches || e.target.closest('button')) return;
    bar.setPointerCapture(e.pointerId); const r = win.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
    const move = ev => { const x = Math.min(innerWidth - 80, Math.max(-r.width + 80, ev.clientX - dx));
      const y = Math.min(innerHeight - taskbarH - 24, Math.max(0, ev.clientY - dy));
      win.style.translate = `${x}px ${y}px`; };
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', () => bar.removeEventListener('pointermove', move), { once: true }); });
}
const phone = matchMedia('(max-width: 760px)');   // on phones: CSS stacks .win as cards, dragging off
```

```css
/* one surface, defined once: a bevel set and a clay set, each scaled by a single knob */
:root { --hi: #fff; --lo: #7b7b86; --edge: #1a1a22;
  --out: inset -1px -1px var(--edge), inset 1px 1px var(--hi), inset -2px -2px var(--lo);
  --in:  inset 1px 1px var(--edge), inset -1px -1px var(--hi), inset 2px 2px var(--lo);
  --soft: 1; --clay: calc(var(--soft) * 10px) calc(var(--soft) * 14px) calc(var(--soft) * 28px) rgb(90 60 130 / .22),
    inset calc(var(--soft) * -6px) calc(var(--soft) * -8px) calc(var(--soft) * 14px) rgb(90 60 130 / .14),
    inset calc(var(--soft) * 6px) calc(var(--soft) * 8px) calc(var(--soft) * 12px) rgb(255 255 255 / .75); }
.btn95 { box-shadow: var(--out); } .btn95:active, .btn95[aria-pressed="true"] { box-shadow: var(--in); }
.clay { box-shadow: var(--clay); border-radius: 28px; } .clay:active { --soft: .45; scale: .97; }
```

```js
// terminal: a command table, history, completion; output goes to a role="log" region
const cmds = { help, ls, cat, clear, date, theme, whoami };
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') { const line = input.value.trim(); input.value = ''; hist.push(line); hi = hist.length;
    print('$ ' + line); const [name, ...args] = line.split(/\s+/);
    (cmds[name] || (() => print(`${name}: command not found. Try "help".`)))(...args); }
  else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault();
    hi = Math.max(0, Math.min(hist.length, hi + (e.key === 'ArrowUp' ? -1 : 1))); input.value = hist[hi] ?? ''; }
  else if (e.key === 'Tab') { e.preventDefault(); const m = Object.keys(cmds).filter(c => c.startsWith(input.value));
    if (m.length === 1) input.value = m[0] + ' '; else if (m.length) print(m.join('  ')); }
});
```

```css
/* CRT layer: scanlines, curvature vignette, glow and a slow roll bar; all quiet under reduced motion */
.crt { position: fixed; inset: 0; pointer-events: none; border-radius: 24px;
  background: repeating-linear-gradient(transparent 0 2px, rgb(0 0 0 / .22) 2px 3px);
  box-shadow: inset 0 0 90px 20px rgb(0 0 0 / .7); animation: flicker 4s steps(60) infinite; }
.crt::after { content: ""; position: absolute; inset: -20% 0 auto; height: 18%; animation: roll 7s linear infinite;
  background: linear-gradient(transparent, rgb(var(--phos) / .06), transparent); }
.screen { color: rgb(var(--phos)); text-shadow: 0 0 2px rgb(var(--phos) / .8), 0 0 10px rgb(var(--phos) / .35); }
@media (prefers-reduced-motion: reduce) { .crt, .crt::after { animation: none; } }
```

```js
// specimen card: replay restarts CSS animations; copy hands over that card's own <style> block
card.querySelector('.replay').onclick = () => { const s = card.querySelector('.stage');
  s.replaceWith(s.cloneNode(true)); };                       // fresh node = animations from frame 0
card.querySelector('.copy').onclick = async () => {
  const css = document.getElementById('css-' + card.dataset.key).textContent.trim();
  try { await navigator.clipboard.writeText(css); announce(`Copied ${card.dataset.name} CSS`); }
  catch { showSourceDialog(css); }                           // fallback: a selectable <textarea>
};
```

## Variation levers

- **The era:** 1980s green-screen, 1990s desktop, early-web GeoCities, Y2K chrome and translucent plastic, 2010s skeuomorphic, clay/soft-3D, a fictional future OS.
- **The container:** desktop with windows, terminal, handheld console, arcade cabinet, pager, set-top box menu, specimen sheet.
- **Input model:** click and drag, type commands, press physical-looking buttons, play a mini-game.
- **Scene behind it:** a sunset grid, a bezel on a desk, a pastel void, warm charcoal, none.
- **Themes as authored twins:** phosphor green/amber/ice, day/night, invert. Each is hand-picked, not a hue rotation.

## Business uses

- A developer tool whose docs homepage is a terminal where `install`, `pricing` and `docs` are real commands, with buttons for the same.
- An indie game studio whose site is its own in-world OS, each game a desktop icon.
- A nostalgia product (a synth, a camera, a retro console) presented on the desktop of its era.
- A UI kit or design system whose landing page is built entirely from its own components, with copyable code on every specimen.
- A music or fashion drop dressed as a vaporwave mall, with the store directory as the product list.

## Signals (what a user might say)

- "Make it look like an old computer."
- "Like Windows 95" or "like a 90s desktop." (Evoke the era; don't copy the brand.)
- "A hacker terminal", "green text on black", "like The Matrix."
- "Nostalgic", "retro tech", "Y2K", "vaporwave", "aesthetic".
- "I want people to *play* with it, not just scroll it."
- "Our users are developers."
- "It's for our game."
- "Squishy", "puffy", "3D cartoon buttons", "soft and bubbly."
- "We're selling a UI kit / design system, show the components off."
- "Like a gallery of little animations people can copy."
- "Chrome", "liquid metal", "shiny early-2000s."

**Not this format if…**
- The visitor must complete a task quickly (booking, checkout, urgent information); a fiction they have to learn first gets in the way. Use one themed section or a themed 404 instead.
- The fiction has nothing to do with the product. A bakery in a DOS terminal is a gimmick unless the particulars support it.
- Most visitors are on phones and the concept depends on dragging windows or a physical keyboard, with no phone arrangement planned.

## Pitfalls

- Copying a real OS: logos, the exact Windows start flag, Apple's menu bar, real product names. Invent the machine ("Helios/OS", "Plaza Aeterna") and evoke the era through bevels, type and timing.
- A boot sequence that holds visitors hostage. Keep it under about 3 seconds, skippable by any key or tap, and skipped on return.
- A terminal that only responds to typing. Mirror every important command as a button; make "command not found" helpful.
- Drag-only windows. Windows need keyboard focus, a close control with an accessible name, `role="dialog"` or a labelled region, and a phone layout without dragging.
- Era effects (scanlines, flicker, VHS tears) that reduce text contrast or flash. Keep them light over text, provide a toggle, and disable under reduced motion.
- Clay or neumorphic controls with no visible focus ring and low-contrast labels. Soft shadows are not a focus style; pastel on pastel fails contrast.
- `localStorage` for history or themes without try/catch, breaking the page in private windows.
- Sound on by default. Keep it off until the visitor turns it on with a gesture.
