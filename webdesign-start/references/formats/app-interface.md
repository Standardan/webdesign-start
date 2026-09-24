# Format: app interface (dashboards and product apps)

**Load when:** the deliverable is the product's own interface or a realistic slice of it: an analytics dashboard, an admin, a customer portal, a SaaS app screen, an internal tool, or a demo of the app inside a marketing page. This is the interface register's core format (`../registers.md`).

**Study:** gallery 068 (live bento), 060 (trading terminal), 076 (mission control), 012 (Nimbus: data made editorial). For the genre, look at contemporary product interfaces admired for their craft (Linear, Stripe, Vercel, Arc, Things). Learn their clarity, rhythm and states; never copy their layouts or branding.

**Don't use it** for a marketing page that only *talks about* an app (use product film, with the UI as the product), for dense real-time operations floors (use `command-console.md`), or for a personal homepage of live tiles (use `live-bento.md`).

## What makes it work

The interface is calm, fast and obviously built by people who use it. One primary job per screen, and the most important number or decision is the largest thing on it.

A real design system carries everything: tokens, an 8px grid, a small type scale with tabular numerals, one accent, calibrated semantic colours, and an elevation scale. The delight lives in precision: crisp hover and press, smooth sorting and filtering, a command palette, live values that settle rather than jump, and empty and error states that were designed rather than left over. It never looks like a component-library demo, because every component is restyled to the product's tokens and the content is specific.

## Architecture

1. **Name the primary job** in one sentence ("see today's revenue and what changed", "triage new tickets in under a minute"). The layout exists to serve it.
2. **The shell:**
   - a slim sidebar or top bar with 5–7 destinations, the current one clearly marked;
   - a content area on a 12-column grid with one consistent gutter;
   - a page header with a title, a date or scope control, and one primary action.
3. **Hierarchy on the first screen:**
   - **The one number or decision,** large (32–56px, tabular numerals) with its change and a short sentence ("Up 12% on last week, led by annual plans").
   - **Supporting charts:** 2–4, sharing scales where they compare.
   - **The working surface** below: a table, a list, a board or a feed.
4. **The system (tokens first):**
   - neutral ramps tinted toward the brand hue (`../aesthetics.md` §1);
   - one accent for primary actions, focus and selection;
   - semantic colours (success, warning, danger, info) checked for contrast on both themes;
   - a 4–6 step type scale, with 13–14px for dense UI and 15–16px for reading;
   - radius 6–10px (one or two values);
   - elevation e0–e3 (`../aesthetics.md` §2.3);
   - motion tokens: 120–200ms for feedback and 200–320ms for layout changes.
5. **Data display:**
   - charts built for reading: labels on extremes and "now", no chart junk, gridlines at 8–12% contrast, a consistent series colour order, and tooltips with exact values;
   - tables: tabular numerals, right-aligned numbers, sticky headers, row hover, sortable columns with a visible sort state, and density toggles for power users.
6. **States for every data surface:**
   - loading skeletons shaped like the content;
   - empty states with a sentence and the next step;
   - errors with a cause and a retry;
   - stale data marked with its age;
   - success feedback inline.
7. **Interaction:**
   - a command palette (⌘K or Ctrl+K);
   - keyboard shortcuts shown in tooltips and menus;
   - filters as removable chips;
   - optimistic updates with undo;
   - drawers or sheets for detail without losing context.
8. **Honest data:** use real data where it exists. Otherwise, use realistic demo data that is clearly labelled as demo in the UI, is internally consistent (totals add up, trends make sense), and has names that are obviously fictional.
9. **Themes:** a light theme and a dark theme, each designed rather than inverted. Dark uses tinted near-blacks and lifted surfaces, not grey on black.
10. **Phones:**
    - the sidebar becomes a bottom bar or a sheet;
    - the one number stays first;
    - charts simplify;
    - tables become cards with the 3 most important fields;
    - every action stays reachable.

## Key mechanics

```css
/* tokens: the whole interface reads from these; dark theme redefines them rather than inverting */
:root { --bg: oklch(0.985 0.004 260); --surface: oklch(1 0 0); --line: oklch(0.92 0.006 260); --ink: oklch(0.22 0.02 260);
  --muted: oklch(0.52 0.015 260); --accent: oklch(0.62 0.17 262); --good: oklch(0.62 0.14 150); --bad: oklch(0.58 0.19 27);
  --r: 8px; --t-fast: 140ms; --t-move: 240ms; --ease: cubic-bezier(.2,.8,.2,1); }
[data-theme="dark"] { --bg: oklch(0.17 0.012 260); --surface: oklch(0.21 0.014 260); --line: oklch(0.29 0.014 260); --ink: oklch(0.95 0.005 260); --muted: oklch(0.7 0.012 260); }
.num { font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
```

```js
// a live value that settles instead of jumping, with an honest "demo" source label
function setValue(el, next) { const from = +el.dataset.v || next, t0 = performance.now(); el.dataset.v = next;
  (function tick(t) { const k = Math.min(1, (t - t0) / 420), e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt.format(from + (next - from) * e); if (k < 1 && !calm) requestAnimationFrame(tick); })(t0); }
```

```html
<!-- empty state: says what's missing and offers the next step -->
<div class="empty" role="status"><svg aria-hidden="true">…</svg>
  <p class="empty-title">No invoices yet</p><p class="empty-text">Invoices you send appear here with their status.</p>
  <button type="button" class="btn primary">Create an invoice</button></div>
```

```js
// command palette: one keyboard entry point to every action
addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.showModal(); input.focus(); } });
input.addEventListener('input', () => render(actions.filter(a => fuzzy(a.label, input.value)).slice(0, 8)));
```

## Variation levers

- **Density:** calm and spacious (a customer portal) or compact and powerful (an internal tool).
- **The personality of the system:** precise neutral, warm editorial, technical monospace, or soft and friendly.
- **The hero surface:** one big number, a map, a timeline, a board, or a feed.
- **The accent and chart palette:** taken from the brand's hue, with one family for categories.
- **The signature interaction:** a command palette, a timeline scrubber, a live map, a drag-to-compare, or a satisfying complete-and-archive.

## Business uses

- A SaaS company's in-app dashboard, or its most important screen, built for real.
- An interactive demo of the product inside a marketing site, with honest demo data.
- A client portal for a service business: projects, invoices, files, messages.
- An internal operations tool that people will enjoy opening every morning.

## Pitfalls

- **A component-library demo look:** default shadcn or Tailwind colours, radii and spacing left as they come. Restyle everything to the tokens (`../component-sourcing.md`).
- **Stat-tile soup:** eight equal KPI cards with icons in circles. One number leads, and the rest support it.
- **Fake precision:** random numbers that don't add up, trends without cause, or "live" data that isn't. Label demo data.
- **Chart junk:** 3D, heavy gridlines, legends far from the lines, rainbow palettes.
- **Missing states:** a blank table while loading, an empty page with no next step, or an error with no recovery.
- **Grey-on-black dark mode,** and semantic colours that fail contrast on one theme.
- **Motion that performs rather than informs:** bouncing cards, long entrances, or idle loops in a working tool.

## Signals (what a user might say)

- "A dashboard for our customers / our team."
- "Our app", "the admin", "a portal where clients log in."
- "Like Linear / Stripe / Notion / Vercel."
- "Clean, fast, lots of data but easy to read."
- "Show our product's actual screens."
- "Analytics", "reports", "metrics at a glance."
- "Something people use every day."
- "Dark mode."

**Not this format if:** the site's job is to sell or tell a story (product film or a world format), the "dashboard" is really a personal homepage of live tiles (live bento), or the users run a real-time operations floor (command console).
