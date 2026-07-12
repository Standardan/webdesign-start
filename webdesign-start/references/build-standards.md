# Build Standards & Pre-Delivery Checklist

This file defines how to implement designs for this project: the HTML foundations, token discipline, stack-specific conventions, asset strategy, and motion patterns that keep the codebase consistent and maintainable. It ends with the pre-delivery checklist and self-review protocol that gate every deliverable — no page ships without passing through them.

**When to read this file:** At the start of the build phase (before writing the first component), and again in full during self-review before presenting finished work to the user.

## Table of contents

1. [Semantic HTML foundations](#semantic-html-foundations)
2. [Design-token implementation](#design-token-implementation)
3. [Stack detection & adaptation](#stack-detection--adaptation)
4. [Asset handling](#asset-handling)
5. [Motion implementation](#motion-implementation)
6. [Responsive verification protocol](#responsive-verification-protocol)
7. [Pre-delivery checklist](#pre-delivery-checklist)
8. [Self-review protocol](#self-review-protocol)

---

## Semantic HTML foundations

Semantic HTML is the cheapest quality multiplier available. It gives screen readers a navigable structure for free, gives browsers correct default behaviors (keyboard handling, form semantics), and — just as important — gives *future AI edits* an unambiguous map of the page. A `<nav>` is self-describing; a `<div class="nv-wrp">` requires re-deriving intent from CSS every time the file is touched. Semantic markup is documentation that can't drift out of date.

### Rules

- **Use landmark elements to structure every page:** `<header>`, `<nav>`, `<main>` (exactly one), `<aside>`, `<footer>`, and `<section>` with an accessible name (heading or `aria-label`). Screen reader users navigate by landmark; a page of nested divs has no map. Landmarks also let a later editor (human or AI) locate "the footer" without reading the whole file.
- **One `<h1>` per page, and heading levels never skip.** `h1 → h2 → h3`, never `h1 → h4` because the h4's font size looked right. Headings are the page's outline for assistive tech and for search engines; size is a styling concern, solved with CSS classes, never by choosing a different heading level. If a heading looks too big, restyle it — don't demote it.
- **`<button>` for actions, `<a href>` for navigation. No exceptions.** A `<div onclick>` has no keyboard support, no focus, no role, and no semantics — you'd have to re-add all four by hand and will get at least one wrong. A `<button>` styled as a link is fine; a link styled as a button is fine; a div impersonating either is not. The test: does it change the URL? Then `<a>`. Does it do something on this page? Then `<button type="button">` (be explicit — inside a `<form>`, the default type is `submit`, a classic accidental-submit bug).
- **Lists are `<ul>`/`<ol>`/`<li>`.** Nav menus, card grids, feature lists, footer link columns — anything that is a set of peer items. Screen readers announce "list, 6 items", giving users a size estimate before they commit to traversing it.
- **Use the native element before reaching for ARIA.** `<dialog>`, `<details>`, `<select>`, `<input type="date">`, `<progress>` ship with keyboard handling, focus behavior, and semantics already correct. The first rule of ARIA: don't use ARIA when a native element does the job. ARIA adds promises ("this div is a listbox") that you must then keep entirely in JavaScript.
- **Forms: every input associated with its `<label for>`, related inputs grouped in `<fieldset>`/`<legend>`, correct `type`, `inputmode`, and `autocomplete` attributes.** These attributes drive mobile keyboards and browser autofill — pure win, zero cost.
- **Images: `alt` on every `<img>`** — descriptive for meaningful images, empty (`alt=""`) for decorative ones. An omitted alt attribute makes screen readers read the file name aloud.
- **Tabular data lives in `<table>` with `<th scope>`; key–value pairs in `<dl>`.** Div-grids impersonating tables lose column/row association for screen readers, and lose copy-paste-into-spreadsheet behavior for everyone.

### The litmus test for any element choice

Strip all CSS mentally. Does the bare markup still communicate what everything *is* — headings, navigation, a list of six features, a form with labeled fields? If the unstyled page would be an undifferentiated soup of text, the markup is failing its half of the job, and every future edit (styling, theming, accessibility fixes, AI-assisted refactors) gets harder because intent must be reverse-engineered from class names.

---

## Design-token implementation

Tokens exist so a design decision is made once and referenced everywhere. The moment a raw hex or px value appears inside a component, that component has forked from the design system — it won't respond to theme changes, dark mode, or rebrand edits, and the divergence is invisible until it bites.

### Rules

- **The project's `DESIGN-BRIEF.md` is the single source of truth for tokens.** Before writing any styles, read the brief's token section (colors, type scale, spacing, radii, shadows) and transcribe it into code *once*. If the brief and the code ever disagree, the brief wins — update the code, or flag the conflict to the user if the brief seems wrong.
- **Express tokens as CSS custom properties on `:root`** (plain CSS/vanilla projects), for example:

  ```css
  :root {
    --color-bg: #faf9f7;
    --color-surface: #ffffff;
    --color-text: #1a1a1a;
    --color-text-secondary: #52525b;
    --color-accent: #2563eb;
    --color-accent-hover: #1d4ed8;
    --color-border: #e4e4e7;
    --radius-md: 8px;
    --space-4: 1rem;
    --shadow-card: 0 1px 3px rgb(0 0 0 / 0.08);
    --font-body: "Inter", system-ui, sans-serif;
  }
  :root[data-theme="dark"] { /* redefine only the values that change */ }
  ```

  Dark mode redefines the same custom properties under a theme selector/media query — components never know which theme is active, which is the entire point.
- **When Tailwind is detected, extend the theme config instead** (`theme.extend.colors`, `spacing`, `borderRadius` in `tailwind.config.*`, or `@theme` in Tailwind v4 CSS config) so tokens become utilities (`bg-accent`, `text-secondary`). Never mix approaches: if Tailwind holds the tokens, don't also scatter `var(--color-accent)` in ad-hoc style attributes.
- **Never hardcode hex colors, px spacing, or font sizes inside components.** Every visual value in a component traces to a token. If a needed value has no token, that's a signal: either add it to the token set deliberately (and to the brief), or you're introducing an inconsistency. The one-off `#3b82f6` you hardcode today is the light-blue-on-light-gray dark-mode bug of next week.
- **Name tokens semantically, not literally.** `--color-danger` survives a rebrand from red to orange; `--color-red` becomes a lie. Two layers work well: primitive palette (`--blue-600`) referenced only by semantic tokens (`--color-accent: var(--blue-600)`), and components use only the semantic layer.
- **Spacing comes from the scale, not from eyeballing.** If the brief defines a 4/8px rhythm, `margin: 22px` is a violation even if it "looks right" — use the nearest scale step and adjust the composition, not the scale.
- **Type scale is tokens too.** Define the brief's sizes as `--text-sm` through `--text-4xl` (or Tailwind `fontSize` entries) with paired line-heights, and use `rem` units so user font-size preferences are respected. A component that sets `font-size: 17px` has opted out of both the scale and the user's browser settings.
- **Acceptable non-token values are rare and structural:** `0`, `1px` hairlines, `100%`, `auto`, aspect-ratio numbers, and media-query breakpoints (which are their own fixed set). Everything visual — color, spacing, radius, shadow, type — goes through a token.

### Token workflow

1. Read `DESIGN-BRIEF.md`; extract every color, font, size, spacing step, radius, and shadow it specifies.
2. Write them once into the token layer (`:root` custom properties or Tailwind theme).
3. Build components exclusively against the token layer.
4. During self-review, grep components for `#[0-9a-fA-F]{3,8}` and raw `px` values — every hit is either a bug or a missing token to promote.

---

## Stack detection & adaptation

Before writing code, detect what exists. Check for `package.json` (and its dependencies), config files (`next.config.*`, `nuxt.config.*`, `svelte.config.*`, `astro.config.*`, `tailwind.config.*`, `components.json`), and existing source structure. Then adapt — never impose a different stack's conventions on an existing project, because consistency with the codebase beats your preference every time.

| Detected stack | How to adapt |
|---|---|
| **Plain HTML/CSS/JS** (no package.json, or no framework deps) | One CSS file (or small set: `tokens.css`, `base.css`, `components.css`) linked in order. Tokens on `:root`. Vanilla JS in `defer` scripts. No build step — do not introduce one unprompted. Repeat shared header/footer markup per page or use trivial JS includes; do not add a bundler just for templating. |
| **React / Next.js** | Components in the existing directory convention (`components/`, `app/` for App Router). One component per file, PascalCase. Prefer Server Components (App Router) for static content; `"use client"` only where interactivity demands it. Tokens: global CSS custom properties in the root layout's stylesheet, or Tailwind theme if present. Use `next/image` and `next/font` when in Next.js — they implement the P3 performance rules for free. |
| **Vue / Nuxt** | Single-file components (`.vue`), `<script setup>`. Follow existing composition patterns. Scoped styles reference global tokens — define tokens in a global CSS file, never inside a scoped block (scoping would trap them). Nuxt: pages in `pages/`, use `NuxtImg` if the image module is present. |
| **Svelte / SvelteKit** | `.svelte` components, routes under `src/routes/` (SvelteKit). Svelte scopes styles per-component by default — same rule: tokens live in a global stylesheet (`app.css`), components consume `var(--token)`. Use Svelte transitions for motion but wrap them in reduced-motion checks. |
| **Astro** | `.astro` components; keep pages static-first (zero JS by default is Astro's whole value). Add `client:*` directives only on genuinely interactive islands, and pick the cheapest (`client:visible` over `client:load`). Tokens in a global stylesheet imported in the base layout. |
| **Tailwind present** | Tokens go into the Tailwind theme (see previous section). Use utility classes consistently — do not write parallel bespoke CSS for things utilities cover, and do not use arbitrary values (`p-[13px]`) that bypass the scale. Extract repeated utility clusters into components, not `@apply` soup. |
| **Tailwind absent** | Do not add it to an existing project unprompted. Write plain CSS with custom properties; use BEM-ish or component-scoped class naming consistent with whatever the project already does. |
| **shadcn/ui present** (`components.json`, `components/ui/`) | Use existing `components/ui` primitives instead of hand-rolling buttons/dialogs/dropdowns — they already handle focus traps, keyboard nav, and ARIA. Style via the CSS-variable theme (`--primary`, `--radius`, etc. in `globals.css`), which is where the brief's tokens map in. Add new primitives via the established pattern rather than inventing parallel ones. |

**Greenfield default (nothing detected):** Static-first, minimal dependencies. Plain HTML + CSS custom properties + small vanilla JS is the default recommendation for marketing sites, portfolios, landing pages, and docs — it loads fastest, has zero build fragility, and remains editable by anyone (human or AI) without toolchain knowledge. Escalate to a framework only when you discover genuinely app-like requirements: client-side state shared across many views, auth-gated dashboards, real-time data, complex form wizards. When escalating, say why — "this needs X, which justifies Y" — rather than defaulting to a framework out of habit. A framework you didn't need is permanent complexity purchased for nothing.

---

## Asset handling

Users often have no assets ready at build time. The standard here is: the page must look intentional and complete with placeholders, never broken, and swapping in real assets later must be a find-and-replace, not a re-layout.

### Placeholder images

- **Generate SVG placeholders or CSS gradient blocks at the exact aspect ratio the real asset will have.** A 16:9 hero gets a 16:9 placeholder; a square avatar gets a square. Correct aspect ratios mean zero layout shift when real images arrive. Inline SVG placeholders can carry a label ("Hero image — product screenshot 16:9") so the user knows what belongs there.
- **Never hotlink images that can break.** No arbitrary URLs found on the web, no deep links into sites that will 404 or block hotlinking. A broken image icon is the fastest way to make a delivered page look abandoned.
- **Placeholder services (picsum.photos, etc.) — use with caution and disclosure.** They require network access (broken offline/in sandboxed previews), can be slow, and return *random* content that may clash with the design's tone. Unsplash's old `source.unsplash.com` endpoint is deprecated and returns errors — do not use it. If you use picsum, pin a seed (`picsum.photos/seed/<name>/800/450`) so the image is stable across reloads, and tell the user these are temporary stand-ins.
- **Local-first when possible:** write the SVG placeholder to the project's asset directory so the site is self-contained.
- **Placeholder markup should already be final markup.** Ship the real `<img>`/`<picture>` structure now — dimensions, `alt`, `loading`, `srcset` slots — pointing at the placeholder, so swapping assets later means changing a `src`, nothing else:

  ```html
  <img
    src="/assets/hero-placeholder.svg"
    alt="Product dashboard overview"
    width="1200" height="675"
    fetchpriority="high"
  />
  ```

### Icons

- **Pick one icon library per project and inline the SVGs.** Lucide and Heroicons are safe defaults: consistent grid, open licenses, outline style. Inline SVG (not icon fonts, not `<img>`) so icons inherit `currentColor`, scale crisply, and add no font-loading cost.
- **Fix size and stroke once, globally.** E.g., 20px or 24px at `stroke-width: 2` (Lucide default) — then never deviate per icon. Mixed sizes and strokes read as sloppiness (see UX rulebook P4).
- **Decorative icons get `aria-hidden="true"`; functional icon-only controls get an `aria-label` on the control** (not on the SVG).

### Favicon & social

- **Every deliverable includes a favicon.** Minimum viable: an inline SVG favicon (`<link rel="icon" type="image/svg+xml" href="/favicon.svg">`) — a simple monogram or mark in the brand accent color beats the browser default globe. Add a 180px `apple-touch-icon` PNG when the project warrants it.
- **Set Open Graph and Twitter card basics:** `og:title`, `og:description`, `og:image` (1200x630 — generate a simple branded placeholder if no real one exists), plus `twitter:card`. Pages get shared; an unfurl with no image or title looks broken in every chat app.
- **Set `<title>` and `<meta name="description">` uniquely per page.** These are both SEO and the browser-tab/screen-reader identity of the page.

---

## Motion implementation

CSS-first: CSS transitions and animations run on the compositor, survive JS failures, and are trivially gated on user preference. Reach for JS animation libraries only when motion is genuinely interactive (dragging, physics, gesture-driven) — not for reveals and hovers.

### Reduced motion — the exact pattern

Include this in the global stylesheet of every project, and mirror the check in any JS that animates:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```js
const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

The near-zero duration (rather than `none`) still fires `animationend`/`transitionend` events, so JS waiting on animation completion doesn't hang.

### Scroll-reveal — the standard pattern

Use IntersectionObserver, never scroll-event listeners (which fire constantly and jank). The contract: content is fully visible if JS fails, the hidden state is applied *by* JS, elements animate once.

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

```js
const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  // Only opt elements in when we can actually animate them —
  // if JS never runs, no element is ever hidden.
  const els = document.querySelectorAll("[data-reveal]");
  els.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // animate once, never re-trigger
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}
```

Note the order: elements carry only a `data-reveal` attribute in markup; the `.reveal` (hidden) class is added by JS. This is what makes the pattern fail-safe — never ship markup that is invisible until JS arrives.

### Stagger rules

- Stagger siblings by 50–80ms per item, capped at ~6 items (then the rest appear together). A 12-item list staggered at 100ms makes the last item wait 1.2s — that's not polish, it's a loading delay you built on purpose.
- Implement via a per-item index custom property:

  ```css
  [data-reveal] { transition-delay: calc(var(--i, 0) * 60ms); }
  ```

  ```html
  <li data-reveal style="--i: 0">…</li>
  <li data-reveal style="--i: 1">…</li>
  ```

- Only stagger elements that enter *together* (one card grid); don't stagger unrelated sections.
- Reset `transition-delay` to `0` on hover/interactive transitions of the same elements — a reveal delay leaking into hover states makes buttons feel laggy.

### General motion rules

- Animate only `transform` and `opacity` (compositor-friendly — see UX rulebook P7 for the reasoning and duration table: 150–300ms micro, 400ms max).
- `will-change` only on elements about to animate, removed after — permanent `will-change` wastes GPU memory.
- Hover transitions: apply the transition to the base state, not the `:hover` state, so the exit animates too.

---

## Responsive verification protocol

Verify at these four widths, in this order (mobile-first — if 375 is broken, wider widths don't matter yet). Use browser devtools device emulation or resize the preview window to the exact widths. Also spot-check 320px if content is text-dense.

| Width | Represents | Check specifically |
|---|---|---|
| **375px** | iPhone-class mobile | No horizontal scroll (scroll right deliberately to check). Text ≥16px, line lengths readable. Touch targets ≥44px with gaps. Nav collapsed and operable. Images fill width without overflow. Fixed elements respect safe areas and don't stack over content. Forms usable: full-width inputs, correct mobile keyboards. |
| **768px** | Tablet / large phone landscape | The awkward middle: layouts often stretch single-column too wide (100-char lines) or jump to cramped desktop columns. Check line lengths stay ≤75ch, grids use a sensible intermediate column count (2 not 4), nav is deliberate (either pattern is fine — half-transformed is not), spacing scales up from mobile without dead zones. |
| **1024px** | Small laptop / iPad landscape | Desktop layout should be engaged by now. Check multi-column grids balance, sidebars don't crush main content, hover states exist (this is the first hover-capable width), sticky elements behave, no elements still stretched full-width that should be capped. |
| **1440px** | Standard desktop | Max-width containers cap content (~1200–1280px typical) — nothing stretches edge-to-edge. Hero images stay sharp at this width (resolution check). Whitespace is composed, not just accumulated at the margins. Prose ≤75ch. Check one size beyond too (1920) for background/section seams. |

At every width, additionally: switch to dark mode and repeat a fast visual pass; tab through the page once to confirm focus order follows layout.

### How to run the pass

1. Start at 375px. Scroll the full page height slowly — read it as a user would, don't just glance.
2. Deliberately try to scroll horizontally (trackpad swipe or shift-scroll). Any movement is a failure to fix now, before checking wider widths.
3. Open every interactive surface at this width: nav menu, modals, dropdowns, accordions. Overlays that fit at 1440px routinely overflow at 375px.
4. Repeat at 768, 1024, 1440. Between the fixed widths, drag-resize continuously and watch for a broken intermediate state — breakpoints are where layouts snap, but bugs live *between* them.
5. Fix everything found at one width before moving up; mobile fixes frequently resolve (or reshape) desktop issues, rarely the reverse.

---

## Pre-delivery checklist

Walk every item before presenting work. Check items honestly — an unchecked item with a stated reason beats a falsely checked one, because the user can act on the truth.

### Visual quality

- [ ] All spacing values come from the 4/8px scale — no arbitrary margins/paddings
- [ ] Consistent border radii from tokens across cards, inputs, buttons, modals
- [ ] One icon family, one size, one stroke width throughout; no emoji as icons
- [ ] Vertical rhythm consistent between sections (no random gaps)
- [ ] Images sharp at rendered size (not stretched or upscaled), correct aspect ratios, no distortion
- [ ] Text doesn't overflow, truncates gracefully where constrained (long names, long URLs tested)
- [ ] Visual hierarchy scannable: one clear primary action per view, headings outline the page
- [ ] No placeholder/lorem text remaining unless explicitly agreed with the user

### Interaction

- [ ] Every interactive element has visible hover (pointer devices), focus-visible, and active states
- [ ] Pressed/active states don't shift layout
- [ ] Touch targets ≥44px with ≥8px gaps at mobile widths
- [ ] Disabled states visually distinct and, where relevant, explained
- [ ] All buttons/links actually work — no dead `href="#"` or empty handlers left behind
- [ ] Feedback within 150ms for every click/tap (state change, spinner, or navigation start)
- [ ] Modals: Escape closes, focus trapped, focus returns to trigger, backdrop behavior deliberate

### Light / dark

- [ ] Every page inspected in both themes (not just the homepage)
- [ ] No hardcoded colors bypassing tokens (search the diff for hex literals)
- [ ] Contrast re-verified in dark mode: 4.5:1 body, 3:1 large/UI
- [ ] Borders and dividers visible in both themes
- [ ] Images/illustrations don't glow or vanish against dark surfaces; shadows replaced by surface lightness where needed
- [ ] Theme preference respected (`prefers-color-scheme`) and toggle state persists if a toggle exists

### Layout & responsive

- [ ] Verified at 375 / 768 / 1024 / 1440 per the protocol above
- [ ] Zero horizontal page scroll at any width from 320px up
- [ ] Wide content (tables, code) scrolls in its own container
- [ ] Prose line length capped ~65–75ch
- [ ] Fixed/sticky elements respect safe areas and don't cover content or each other
- [ ] Layout survives 200% browser zoom without clipping or overlap

### Accessibility

- [ ] Landmarks present: one `<main>`, `<nav>`, `<header>`, `<footer>`
- [ ] One `<h1>` per page; heading levels don't skip
- [ ] Full keyboard pass performed: every control reachable, operable, visible focus, logical order
- [ ] Skip link present and functional
- [ ] All images have appropriate `alt`; icon-only controls have `aria-label`
- [ ] Forms: visible labels bound with `for`, errors announced below fields, correct input types/autocomplete
- [ ] `prefers-reduced-motion` disables/reduces all animation including JS-driven
- [ ] Drag interactions have non-drag alternatives; no target below 24px anywhere

### Content

- [ ] Button labels state the action ("Create account", never bare "Submit")
- [ ] Empty, loading, and error states exist for every data-driven view
- [ ] Error copy is human and actionable (no raw status codes)
- [ ] Page `<title>` and meta description unique per page; OG tags set
- [ ] Headings front-load meaning and work as a standalone outline
- [ ] Dates, numbers, currency formatted for humans

### Anti-slop (see `references/anti-slop.md` for the full catalog)

- [ ] Site copy contains zero em dashes, hype-lexicon words, emoji, or "Get Started"/"Learn More" buttons where a specific label exists
- [ ] No headline or section could be pasted onto an unrelated business's site unchanged (the specificity test)
- [ ] Palette, hero pattern, and section anatomy each trace to the brief — no violet-gradient defaults, glow orbs, or template three-card grids that nobody chose
- [ ] The client's own phrases from discovery appear in the copy where they had good ones

### Performance

- [ ] Images in WebP/AVIF with `srcset`; dimensions declared on all media (zero CLS)
- [ ] Hero/LCP image NOT lazy-loaded; below-fold images are
- [ ] `font-display: swap` on web fonts; font files preloaded if critical
- [ ] Animations use transform/opacity only
- [ ] Lists >50 items virtualized or paginated
- [ ] No console errors or failed network requests in a fresh page load

---

## Self-review protocol

Run this after the build is complete and *before* telling the user it's done. Its purpose is honest verification, not ritual — the failure mode it prevents is confidently delivering work that drifted from the agreed design.

**Step 1 — Re-read DESIGN-BRIEF.md in full.** Not from memory: open the file and read it. Builds drift; memory of the brief drifts faster.

**Step 2 — Audit the build against the brief, section by section.** For each section of the brief, answer concretely:

- Does the hero (layout, imagery, tone, copy) match the approved reference direction — not just "a nice hero", but *that* direction?
- Are the brief's tokens actually used in the code, or did parallel values creep in? Grep for hex literals and raw px values in components as an objective check.
- Is every page/section listed in the brief present? List them and tick them off — missing pages are the most common silent failure.
- Does the typography match the brief's specified families and scale?
- Do interactive behaviors described in the brief (nav style, animations, theme toggle) exist as described?

**Step 3 — Walk the pre-delivery checklist above**, at the four protocol widths, in both themes, with one full keyboard pass. Fix violations as you find them; re-verify anything the fix could have disturbed.

**Step 4 — Cross-check against the UX rulebook's Critical 15** (`references/ux-rules.md`). Any hit is a blocker: fix before delivery.

**Step 4b — Run the slop audit** (`references/anti-slop.md`): grep the content files for em dashes, hype-lexicon words, and generic button labels; check the palette and section anatomy against the "banned by default" list; read the headlines in sequence for the specificity test. Include the audit outcome in the report.

**Step 5 — Report honestly.** Tell the user what was verified and what the outcome was, in three buckets:

- **Passed:** what you checked and confirmed (be specific: "keyboard pass at all four widths, both themes").
- **Fixed during review:** violations found and corrected — this builds trust, don't hide them.
- **Known gaps:** anything unresolved, ambiguous, or intentionally deferred (missing real assets, a brief requirement that conflicted with an accessibility rule, an unverified browser). Never claim a clean bill of health you didn't earn — a stated limitation costs a sentence; a discovered false claim costs the user's trust in every future report.
