# UX & Accessibility Rulebook

This file is the authoritative rulebook for user-experience and accessibility decisions in this project. It exists because generated interfaces fail in predictable ways — low contrast, unreachable keyboard states, layout shift, dead-end error states — and every rule below targets one of those failure modes with the reasoning behind it. Treat these rules as constraints on your output, not suggestions to weigh.

**When to read this file:** During the design phase (before writing any layout or component code) and again during build whenever you make a decision about color, interaction, motion, forms, navigation, or content. Consult the Critical 15 at the end before declaring any page finished.

## Table of contents

1. [Priority index](#priority-index)
2. [P1 — Accessibility (CRITICAL)](#p1--accessibility-critical)
3. [P2 — Touch & interaction (CRITICAL)](#p2--touch--interaction-critical)
4. [P3 — Performance (HIGH)](#p3--performance-high)
5. [P4 — Style consistency (HIGH)](#p4--style-consistency-high)
6. [P5 — Layout & responsive (HIGH)](#p5--layout--responsive-high)
7. [P6 — Typography & color (MEDIUM)](#p6--typography--color-medium)
8. [P7 — Animation (MEDIUM)](#p7--animation-medium)
9. [P8 — Forms (MEDIUM)](#p8--forms-medium)
10. [P9 — Navigation (HIGH)](#p9--navigation-high)
11. [P10 — Charts & data display (LOW)](#p10--charts--data-display-low)
12. [Content & UX writing](#content--ux-writing)
13. [Perceived performance](#perceived-performance)
14. [Popups, consent, and interruption etiquette](#popups-consent-and-interruption-etiquette)
15. [Scroll behavior](#scroll-behavior)
16. [Focus management in SPAs](#focus-management-in-spas)
17. [WCAG 2.2 additions](#wcag-22-additions)
18. [The Critical 15](#the-critical-15)

## Priority index

Resolve conflicts by priority: a CRITICAL rule always wins over a HIGH rule, and so on. When two rules at the same tier conflict, prefer the one that protects users with disabilities.

| Tier | Domain | Severity | One-line summary |
|------|--------|----------|------------------|
| P1 | Accessibility | CRITICAL | Contrast, keyboard, semantics, motion respect |
| P2 | Touch & interaction | CRITICAL | Target sizes, feedback timing, gesture safety |
| P3 | Performance | HIGH | Modern images, zero layout shift, lazy loading |
| P4 | Style consistency | HIGH | One icon family, stable pressed states |
| P5 | Layout & responsive | HIGH | Mobile-first, no horizontal scroll, spacing rhythm |
| P6 | Typography & color | MEDIUM | Readable sizes, semantic tokens, real dark mode |
| P7 | Animation | MEDIUM | Short, purposeful, compositor-friendly, skippable |
| P8 | Forms | MEDIUM | Visible labels, kind validation, reversible actions |
| P9 | Navigation | HIGH | Deep links, predictable back, preserved state |
| P10 | Charts & data display | LOW | Honest encodings, accessible fallbacks |

---

## P1 — Accessibility (CRITICAL)

Accessibility is first because its failures exclude people entirely rather than merely annoying them, and because retrofitting it is far more expensive than building it in. Roughly one in six people has a disability that affects how they use interfaces; many more use keyboards, zoom, or reduced motion situationally.

### Rules

- **Contrast: 4.5:1 minimum for body text, 3:1 for large text (24px+, or 18.5px+ bold) and UI components.** Low-contrast gray-on-gray text is the single most common generated-UI failure. It looks "elegant" in a mockup and is unreadable in sunlight, on cheap panels, and for anyone with low vision. Verify actual computed ratios — do not eyeball it, because dark-mode palettes especially drift below threshold.
- **Every interactive element must be reachable and operable by keyboard alone, in a logical order, with a visible focus indicator.** Keyboard access is the substrate that screen readers, switch devices, and power users all depend on. If you build a custom dropdown, dialog, or tab set, you own its full keyboard contract (arrow keys, Escape, Enter/Space).
- **Never remove focus outlines without replacing them.** `outline: none` with no replacement makes the page unusable for keyboard users while looking identical to sighted mouse users — which is exactly why it ships so often. Provide a `:focus-visible` style with at least 3:1 contrast against adjacent colors.
- **Icon-only controls need an accessible name.** An icon button with no `aria-label` announces as "button" — meaningless. Meaningful images need `alt` text describing purpose, not appearance ("Search" not "magnifying glass"); decorative images need `alt=""` so screen readers skip them.
- **Semantic order must match visual order.** Screen readers and keyboard tabbing follow the DOM. If you reorder content with CSS (`order`, absolute positioning), a non-visual user experiences a scrambled page. Structure the DOM in reading order first, then style.
- **Respect user settings: text scaling and `prefers-reduced-motion`.** Layouts must survive 200% text zoom without clipping or overlap — avoid fixed pixel heights on text containers. Motion preferences are a vestibular-safety issue, not an aesthetic one; parallax and large zooms can cause genuine nausea.

### Smell tests — common generated violations

- Placeholder-gray body text (`#999` on white is 2.8:1 — fails).
- A hamburger menu built from three `<div>`s with an `onClick` — unreachable by keyboard, invisible to assistive tech.
- `outline: none` in a global reset "for cleanliness" with no `:focus-visible` replacement.
- A card grid where CSS `order` puts the featured card first visually while it sits fourth in the DOM.

---

## P2 — Touch & interaction (CRITICAL)

Touch failures make interfaces physically unusable. Fingers are imprecise (average contact patch ~10mm), users are often walking or one-handed, and there is no hover state on touch devices to preview intent.

### Rules

- **Minimum touch target: 44x44px (48dp on Android-flavored designs).** Smaller targets cause mis-taps, and mis-taps on adjacent destructive controls cause data loss. The *visual* element can be smaller — pad the hit area with padding or a pseudo-element.
- **At least 8px gap between adjacent targets.** Two 44px buttons touching edge-to-edge still produce mis-taps at the seam. Spacing is part of the target-size contract.
- **Acknowledge every interaction within 100–150ms.** Below ~100ms feels instant; beyond ~200ms users assume the tap failed and tap again, causing double-submits. The acknowledgment can be a pressed style, ripple, or spinner — the network response can come later, but the *acknowledgment* cannot.
- **Never nest conflicting gestures.** A horizontal carousel inside a horizontally-swipeable view, or a scrollable map filling a scrollable page, creates a trap where the user's gesture is ambiguous. If nesting is unavoidable, give the inner element explicit affordances (visible scrollbar, drag handle) and constrain the axis.
- **Disabled states must be visually distinct AND explain themselves.** A disabled button that looks 90% like an enabled one gets tapped repeatedly with no feedback — the user blames the app. Reduce opacity, remove elevation/shadow, and where possible show *why* it is disabled (e.g., helper text "Add at least one item to continue").
- **Hover is an enhancement, never a requirement.** Any information or action revealed only on hover (tooltips carrying essential info, hover-only action buttons on cards) is unreachable on touch devices. Provide a tap/focus path to the same content.

### Smell tests

- 32px icon buttons in a toolbar with 4px gaps — nearly every tap on mobile is ambiguous.
- "Delete" and "Save" adjacent, same size, no gap, no confirmation on delete.
- A card whose edit/delete buttons appear only on `:hover`.
- A submit button that shows no state change until the server responds 800ms later.

---

## P3 — Performance (HIGH)

Performance is user experience: every 100ms of added load time measurably increases abandonment, and layout shift destroys trust by moving targets under the user's finger. Generated sites fail here through unoptimized hero images and undeclared dimensions.

### Rules

- **Serve images as WebP or AVIF with `srcset` for responsive sizes.** A 2MB JPEG hero on a 4G connection is a multi-second blank screen. AVIF/WebP cut weight 30–70% at equal quality; `srcset` stops phones downloading desktop-resolution images.
- **Declare dimensions on all media to prevent CLS.** Every `<img>` gets `width` and `height` attributes (or `aspect-ratio` in CSS); embeds and ads get reserved space. Cumulative Layout Shift happens when content pops in and pushes the page down — often just as the user taps something.
- **Lazy-load below-the-fold images (`loading="lazy"`), but NEVER the LCP hero image.** Lazy-loading the largest above-the-fold image delays the most important paint on the page — a common copy-paste mistake.
- **Use `font-display: swap` (or `optional`) on web fonts.** Without it, some browsers hide all text until the font loads — an invisible page. With swap, users read system-font text immediately.
- **Virtualize lists longer than ~50 items.** Rendering 500 DOM rows makes scroll jank and memory bloat inevitable on mid-range phones. Windowing renders only what's visible.

### Smell tests

- `<img src="hero.jpg">` — no dimensions, no format optimization, no srcset.
- `loading="lazy"` applied uniformly to every image, including the hero.
- A testimonial section that pops in on load and shifts the CTA button 300px down.
- A "recent activity" feed that maps 1,000 items straight into the DOM.

---

## P4 — Style consistency (HIGH)

Inconsistency reads as broken. Users can't articulate *why* a page feels untrustworthy, but mixed icon styles and jittering buttons register subconsciously as low quality — the visual equivalent of typos.

### Rules

- **One icon family per project, one stroke width, one optical size.** Mixing outline icons with filled icons, or 1.5px strokes with 2px strokes, creates visual noise. Pick a family at design time and never import a stray icon from elsewhere; redraw or substitute within the family instead.
- **Never use emoji as functional icons.** Emoji render differently on every OS (a "gear" on one platform is a different color, weight, and style on another), can't inherit `currentColor`, can't be resized cleanly, and are announced verbosely by screen readers. Emoji are acceptable in *content* (user text), never in *chrome* (buttons, nav, bullets).
- **Pressed/active states must not shift layout.** A button that gains a 2px border or changes font-weight on press makes neighboring content jump. Reserve the space: use transparent borders that change color, `box-shadow` insets, or transform/opacity — never properties that change the element's box size.
- **Reuse spacing, radius, and shadow values from the design system.** Three slightly different border radii on one screen (6px, 8px, 10px) is a classic generated-UI tell. Every value should trace back to a token.

### Smell tests

- A nav bar with a Lucide home icon, a Heroicons settings icon, and an emoji bell.
- A button whose `:active` state adds `border: 2px solid`, nudging its siblings.
- Cards with `border-radius: 8px` next to a modal with `border-radius: 12px` next to inputs at `6px`, with no system behind the choice.

---

## P5 — Layout & responsive (HIGH)

Most traffic is mobile, and mobile is the constrained case — if the layout works at 375px, expanding it to desktop is easy; the reverse (cramming desktop into mobile) always produces horizontal scroll and unreadable text.

### Rules

- **Design and build mobile-first.** Write base styles for the narrow viewport and add complexity in `min-width` media queries. This forces content prioritization and keeps the CSS additive rather than a pile of overrides.
- **Use one consistent set of breakpoints project-wide.** Standard set: 640 / 768 / 1024 / 1280. Per-component ad-hoc breakpoints (one component breaks at 700px, another at 750px) cause layouts to disagree mid-resize.
- **Zero horizontal scroll at any viewport width.** Horizontal overflow on mobile is the most user-visible layout bug there is. Usual culprits: fixed-width elements, unbroken long strings (URLs), negative margins, `100vw` (which includes the scrollbar). Wide content (tables, code) scrolls inside its *own* container, never the page.
- **Respect device safe areas.** Notches and home-indicator regions clip fixed headers and bottom bars. Use `env(safe-area-inset-*)` padding on fixed-position chrome.
- **Use a 4/8px spacing rhythm.** All margins, paddings, and gaps come from a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64). Arbitrary values (13px, 22px) accumulate into misaligned, "off" compositions. Rhythm is what makes a layout feel designed rather than assembled.
- **Content width caps: ~65–75 characters per line for prose.** Full-width text on a 1440px monitor is unreadable; cap prose containers around 65ch–72ch.

### Smell tests

- Desktop-oriented three-column layout with a `@media (max-width: 768px)` bolt-on that stacks badly.
- A hero using `width: 100vw` producing a 15px horizontal scrollbar on Windows.
- A fixed bottom nav that sits underneath the iPhone home indicator.
- Paragraphs spanning the full 1440px viewport width.

---

## P6 — Typography & color (MEDIUM)

Typography carries most of the information on most pages; color carries hierarchy and mood. Failures here degrade reading comfort continuously rather than breaking anything outright — which is why they persist unnoticed.

### Rules

- **Body text: 16px minimum on mobile.** Below 16px, iOS Safari zooms in on input focus (breaking layouts) and reading strain rises sharply. 14px is acceptable only for genuinely secondary text (captions, timestamps).
- **Line-height 1.5–1.75 for body text.** Tight leading (1.2) suits headlines only; body text at 1.2 forces re-reading because the eye loses the line on return sweep.
- **Use semantic color tokens, never raw hex in components.** `color: var(--color-text-secondary)` can be re-themed, dark-moded, and audited; `color: #666` scattered across 40 components cannot. Semantic names (`--color-danger`, `--color-surface`) beat literal names (`--color-red`, `--color-gray-100`) because meaning survives a palette change.
- **Dark mode is a designed palette, not an inversion.** Pure inversion produces `#000` backgrounds (smearing on OLED, harsh halation around text) and neon-bright accent colors. Correct approach: dark surfaces around `#121212`–`#1a1a1a`, *desaturated and lightened* brand colors (saturated colors vibrate against dark backgrounds), reduced shadow reliance (use surface lightness for elevation instead), and re-verified contrast ratios — light-theme ratios do not transfer.
- **Test every screen in both themes before delivery.** The second theme is where hardcoded colors, invisible borders, and unreadable text hide.
- **Maximum two font families.** One is usually enough; a second only for a deliberate display/body split. Every additional family costs load time and coherence.

### Smell tests

- `font-size: 14px` on body copy "to fit more content" on mobile.
- Dark mode implemented as `filter: invert(1)` or by flipping black/white only, leaving brand blue at full saturation glowing against `#000`.
- A component with `#374151` hardcoded, invisible when the theme switches.
- Line-height 1.2 on paragraph text because the heading style was copy-pasted.

---

## P7 — Animation (MEDIUM)

Animation exists to explain cause and effect — where a panel came from, what triggered what. Animation that merely decorates slows users down; users perceive interfaces with >400ms transitions as sluggish even when they can't say why.

### Rules

- **Durations: 150–300ms for micro-interactions (hover, toggle, button feedback); 400ms absolute maximum for larger transitions (page, modal).** Below 150ms motion isn't perceived as motion; above 400ms it's perceived as waiting.
- **Animate only `transform` and `opacity`.** These composite on the GPU without triggering layout or paint. Animating `width`, `height`, `top`, `left`, or `margin` forces layout recalculation every frame and stutters on mid-range devices.
- **Motion must convey cause and effect.** A modal scales up from the button that opened it; a deleted item collapses; a drawer slides from its edge. Motion disconnected from user action (ambient floating, perpetual pulsing) is noise.
- **Exit animations run at ~60–70% of entrance duration.** Users have already decided to leave; making them watch a full-length exit is friction. Enter 300ms → exit ~200ms.
- **Always implement `prefers-reduced-motion`.** This is a P1 accessibility rule restated here because animation code is where it gets forgotten. Reduce means reduce: swap movement for opacity fades or instant changes, don't just shorten it.
- **Never animate on an infinite loop near text content.** Perpetual motion in peripheral vision makes reading nearby text difficult for everyone and impossible for some.

### Smell tests

- `transition: all 0.5s ease` as a global default.
- A hero headline animating `left` from -100px, dropping frames on scroll.
- A pulsing "New!" badge looping forever beside body copy.
- Entrance animations wrapped in reduced-motion checks, but the JS-driven carousel autoplay isn't.

---

## P8 — Forms (MEDIUM)

Forms are where users do work and where they abandon. Every rule here reduces the chance a user makes an error, and softens the landing when they do — because in forms, user errors are design errors.

### Rules

- **Visible labels, always. Placeholder-only labeling is banned.** Placeholders vanish on input, so the user filling field 6 can't recheck what field 2 was; screen reader support is inconsistent; low-contrast placeholder text fails P1 anyway. Placeholders may *supplement* labels with format examples ("e.g. jane@company.com").
- **Errors appear directly below the offending field, in text, with a fix suggestion.** A red border alone fails color-blind users; a summary-only error at the top of a long form forces a search. "Password needs at least 8 characters" beats "Invalid password" — one is actionable, the other an accusation.
- **Validate on blur, not on keystroke.** Keystroke validation shows "Invalid email" while the user is mid-typing their email — punishing them for not being done yet. Validate when they leave the field; re-validate on keystroke only *after* a field has been marked invalid, so they see the error clear as they fix it.
- **Confirm success explicitly.** After submit, show a distinct success state (message, redirect, check animation). A form that just goes quiet leaves users unsure whether to submit again — and duplicate submissions follow.
- **Destructive actions get undo, not just confirmation dialogs.** Users click through confirmations on autopilot ("Are you sure?" → yes, always). An undo window (toast with "Undo", 5–10s) protects against the errors confirmations were supposed to prevent. Reserve blocking confirmations for truly irreversible bulk operations, and make those type-to-confirm.
- **Use correct input types and autocomplete attributes.** `type="email"`, `inputmode="numeric"`, `autocomplete="postal-code"` give mobile users the right keyboard and let browsers autofill — removing entire categories of typos for free.
- **Never clear a form on failed validation.** Discarding the user's typed input because one field failed is the single fastest way to lose a submission permanently.

### Smell tests

- `<input placeholder="Email address">` with no `<label>`.
- An email field flashing red after the first character typed.
- A "Delete account" flow guarded only by a default-focused "OK" button.
- A signup form that reloads blank after a server-side validation error.

---

## P9 — Navigation (HIGH)

Navigation failures strand users. The browser back button, the URL bar, and scroll position are contracts the web made with users decades ago; break them and the interface feels haunted.

### Rules

- **Meaningful state must be deep-linkable.** Selected tab, open detail view, search query, active filters — encoded in the URL (path or query params). Users share links, refresh pages, and open tabs; if state lives only in JS memory, all three actions destroy their context.
- **Back must always do the predictable thing.** Back closes the modal that just opened, returns from the detail view, exits the lightbox — it never dumps the user out of the app or, worse, does nothing. In SPAs this means pushing history entries for modal/route-like state and handling `popstate`.
- **Bottom navigation: 3–5 items maximum, current location always indicated.** Six-plus items shrink below touch-target minimums; without a highlighted current item users can't build a mental map. If you have more destinations, restructure the hierarchy — don't shrink the buttons.
- **Every modal needs three exits: close button, Escape key, and backdrop click (backdrop optional for forms with unsaved input — then warn instead).** A modal without visible escape is a trap; users on keyboards need Escape specifically.
- **Preserve scroll position and applied filters on back-navigation.** A user 40 items deep in a filtered list who checks a detail and returns to the unfiltered top of the list will not do that a third time — they'll leave. Cache list state; restore on return.
- **Links are links, buttons are buttons.** Navigation uses `<a href>` (enabling open-in-new-tab, copy link, middle-click); actions use `<button>`. A `<div onClick={navigate}>` breaks every one of those affordances.

### Smell tests

- A tabbed settings page where refreshing always lands on tab 1.
- A modal opened via state with no history entry — pressing back leaves the site.
- Back from a product page returning the user to the top of an unfiltered catalog.
- A bottom nav with 6 icons, none highlighted.

---

## P10 — Charts & data display (LOW)

Charts are the one place a design can *lie*. The rules here protect honesty first, then accessibility, then polish. Low priority only because many projects have no charts — when charts exist, the honesty rules are non-negotiable.

### Rules

- **Match chart type to data shape.** Time series → line. Category comparison → bar. Part-of-whole → stacked bar (pies only for 2–3 slices). Correlation → scatter. Distribution → histogram. A pie chart with 9 slices or a line chart connecting unordered categories misrepresents the data's structure.
- **Never encode meaning in color alone.** ~8% of men have color vision deficiency. Pair color with position, pattern, direct labels, or icons. A red/green up/down indicator must also carry an arrow or +/- sign.
- **Bar charts start at zero.** Truncated axes exaggerate differences — the canonical chart lie. Line charts may use a non-zero baseline when the *change* is the story, but must say so.
- **Provide tooltips/details on demand, but never make tooltips the only way to read values.** Label key data points directly where space allows.
- **Simplify responsively.** A 12-series desktop legend chart becomes unreadable at 375px. On mobile: fewer gridlines, abbreviated labels, top 3–5 series with a "view all" path, or swap to a summary stat + sparkline.
- **Design the empty state.** "No data yet" with guidance beats a blank axes skeleton or, worse, a JS error. Charts are the component most likely to receive an empty array in production.
- **Give screen readers a real alternative.** A `<canvas>` or SVG chart is silence to assistive tech. Provide a data `<table>` (visually hidden if necessary) or a text summary of the trend ("Revenue rose 23% over the period, peaking in March").

### Smell tests

- A 7-slice pie chart with a color-only legend.
- A bar chart y-axis starting at 80 to dramatize a 5% difference.
- A dashboard that renders blank white when the API returns `[]`.
- An SVG chart with no `role`, no title, no table fallback.

---

## Content & UX writing

Words are interface. Users don't read — they scan, decide, and act; every string you write either speeds that up or slows it down. Generated interfaces default to filler ("Welcome to our platform") and vague labels ("Submit") — both banned.

### Rules

- **Front-load value in headings and paragraphs.** The first 2–3 words of any heading must carry its meaning, because scanning eyes touch only those. "Pricing that scales with you" beats "Here is some information about how our pricing works."
- **Headings must be scannable as an outline.** A user reading *only* the headings should understand the page's argument. If a heading is generic ("Features", "About"), the section under it is invisible to scanners.
- **Button labels state the action's outcome, never "Submit", "Click here", or "Learn more" alone.** "Create account", "Save changes", "Download report (PDF)". The label is the user's last confirmation of what's about to happen — vague labels cause hesitation and errors. This also serves screen reader users navigating by a list of buttons, where context-free labels are indistinguishable.
- **Empty, error, and loading states are first-class screens — design all three for every data-driven view.** Every list, table, chart, and feed will at some point be empty, failed, or loading. An unhandled empty state looks broken; a good one ("No projects yet — create your first") teaches the interface. Error states must say what happened and what to do next, in human language ("Couldn't save — check your connection and try again", never a raw status code).
- **Write in the user's vocabulary, not the system's.** "Your changes are saved" not "Persistence operation successful". Error copy blames the system, not the user.
- **Numbers, dates, and quantities get formatted for humans.** "2 hours ago" or "Mar 4" per context, thousands separators, currency symbols — raw ISO timestamps or unformatted floats are a tell of an unfinished interface.
- **Microcopy for consequences.** Before a destructive or costly action, one line of plain-language consequence ("This removes the project for all 4 members") outperforms any warning icon.

### Smell tests

- A hero reading "Welcome to [Product]. We provide innovative solutions."
- Three cards all ending in a "Learn more" link.
- A table component with no branch for `items.length === 0`.
- An error toast reading "Error: request failed with status 500".

---

## Perceived performance

Users judge speed by what they *see*, not by network timings. A 2-second load that shows structure immediately feels faster than a 1-second load behind a spinner. Manage perception deliberately.

### Rules

- **Prefer skeletons over spinners for content loading.** A skeleton mirroring the final layout (gray blocks where cards/text will be) sets expectations and prevents the "blank → pop" jolt. Spinners communicate only "wait" and make time feel longer. Use spinners solely for actions with no predictable layout (form submit buttons).
- **Skeletons must match final layout dimensions** — otherwise they cause the CLS they were meant to prevent.
- **Use optimistic UI for high-success, low-cost actions.** Likes, toggles, renames, reorders: apply the change immediately, sync in background, roll back with a notice on failure. Waiting 400ms for a server round-trip to show a heart fill makes the app feel broken. Do NOT be optimistic about payments, deletes, sends, or anything hard to reverse.
- **Delay loading indicators ~150–300ms.** Flashing a spinner for a 90ms request creates flicker that reads as instability. If the response beats the delay, show nothing.
- **Show progress for anything over ~2 seconds.** Determinate progress (percent, steps) where possible; if indeterminate, rotate status messages ("Uploading… Processing… Almost done") so users know work is happening.
- **Render above-the-fold content first, then hydrate/enhance.** The user should see and read something meaningful while the interactive parts finish arriving.

### Smell tests

- A full-page spinner gating the whole app while one widget's data loads.
- A like button that waits for the API before filling in.
- A 100ms fetch wrapped in a spinner that visibly flashes.

---

## Popups, consent, and interruption etiquette

Every interruption spends trust. A user who hasn't yet received any value owes you nothing — no email, no notification permission, no cookie beyond the essential. Generated marketing pages are notorious for stacking three overlays over content nobody has read yet.

### Rules

- **No popup before value is delivered.** Newsletter modals, discount overlays, and chat bubbles must not appear on page load. Earn the interruption: trigger only after meaningful engagement (e.g., >50% scroll, 30+ seconds, or exit intent) — and even then, at most one per session.
- **Never ask for browser permissions (notifications, location) on load.** The browser prompt is unskippable and a cold ask converts near-zero, burning the permission permanently. Ask in context, after a user action that implies the need ("Notify me" button → then the browser prompt).
- **Cookie/consent UI: equal-prominence choices, no dark patterns.** "Reject non-essential" must be as visible and as few clicks as "Accept all" — legally required under GDPR and ethically required everywhere. Don't hide reject behind "Manage preferences". Don't block the entire page with the banner; a bottom bar suffices. Don't reload or nag after rejection.
- **Interruptions must never steal focus mid-task.** A modal appearing while the user types (search, form) discards their input focus and sometimes their keystrokes. Queue interruptions for idle moments.
- **Everything dismissible, dismissal remembered.** A popup that reappears on every page view after dismissal is hostile. Persist dismissal (localStorage/cookie) for a sensible period.
- **Sticky/floating elements must not cover content or controls.** Chat widgets covering the checkout button, cookie bars covering footer links, floating CTAs covering the last paragraph — audit at mobile sizes where coverage is worst.

### Smell tests

- A newsletter modal at `t=0` on first visit, above an unclicked cookie banner.
- Consent UI with a bright "Accept all" button and a gray "options" text link.
- A chat bubble overlapping the mobile bottom nav.

---

## Scroll behavior

Scrolling is the most-performed interaction on the web and users have absolute muscle-memory expectations about it. Any deviation from native scroll physics registers instantly as wrong.

### Rules

- **Never hijack scroll.** No scroll-speed manipulation, no snapping the user to sections against their gesture, no converting vertical scroll into horizontal movement without an explicit, visible affordance. Scroll-jacking breaks the user's proprioceptive model of the page and is a common accessibility barrier. CSS `scroll-snap` is acceptable for carousels/galleries where snapping matches user intent — never for full-page section snapping on general sites.
- **Scroll-triggered animations: trigger when the element is 10–20% into the viewport, animate once, and keep it subtle.** Elements animating at 50% viewport entry leave the top half of every section blank as the user scrolls; re-triggering on every scroll direction change is exhausting. Content must be readable even if the animation never fires (JS failure, reduced motion) — animate from `opacity: 0.0001` only via progressive enhancement, never hide content in base CSS with no fallback.
- **Nothing may move under an in-progress scroll.** Late-loading content above the viewport shifts the user's reading position — reserve space (see P3 CLS rules).
- **Sticky headers: keep them short or shrink them on scroll.** A 120px sticky header steals 18% of a phone's viewport permanently. Shrink after scroll starts, or hide-on-scroll-down / reveal-on-scroll-up.
- **Respect scroll restoration.** Back-navigation returns to the previous scroll position (see P9); in-app anchors use smooth scroll but respect `prefers-reduced-motion` (instant jump instead).

### Smell tests

- Full-page scroll-snap sections on a content marketing site.
- Sections styled `opacity: 0` in CSS, invisible forever when JS fails to load.
- A sticky header + sticky sub-nav + cookie bar consuming 40% of a phone screen.

---

## Focus management in SPAs

In a traditional multi-page site, navigation resets focus to the top of the new document and screen readers announce the new page. Client-side routing silently breaks both — the URL changes, the content swaps, and a screen reader user hears *nothing*. You must rebuild what the browser used to give for free.

### Rules

- **On route change, move focus to the new content.** Standard pattern: focus the new page's `<h1>` (given `tabindex="-1"` so it's programmatically focusable without joining the tab order). This tells assistive tech where it is and puts keyboard users at the start of the new content, not stranded on a nav link that may no longer exist.
- **Announce route changes to screen readers.** A visually hidden `aria-live="polite"` region updated with the new page title ("Navigated to Pricing") covers cases where focus movement alone is missed. Update `document.title` on every route change too — it's what screen readers announce and what tabs display.
- **Modals must trap and return focus.** On open: move focus inside (first focusable element or the dialog itself). While open: Tab cycles within the modal only. On close: return focus to the element that opened it. A modal without focus trapping lets keyboard users tab into the obscured page behind it — invisible, interactive, and utterly disorienting. Use the native `<dialog>` element or a proven library primitive rather than hand-rolling.
- **Removing a focused element must relocate focus deliberately.** When a user deletes the list item their focus is on, focus falls to `<body>` and their keyboard position is lost. Move it to the next sibling, previous sibling, or list container.
- **Provide a skip link.** "Skip to main content" as the first focusable element saves keyboard users from tabbing through the entire header on every page. Visually hidden until focused.
- **Never use positive `tabindex` values.** `tabindex="3"` creates a shadow tab order that fights the DOM order and breaks the moment content changes. Only `0` (join natural order) and `-1` (programmatic only) are legitimate.

### Smell tests

- Client-side navigation where `document.title` never changes.
- A custom modal that closes on Escape but strands focus on `<body>`.
- A notification "X" button that, when clicked, sends focus back to the top of the page.

---

## WCAG 2.2 additions

WCAG 2.2 (2023) added criteria that specifically target patterns generated interfaces get wrong. These are current legal-compliance baseline in many jurisdictions — treat them as P1-adjacent.

### Rules

- **Target size minimum (2.5.8): 24x24 CSS px absolute floor for any target, with exceptions only when an equivalent larger target exists or spacing compensates.** Note this is the legal *floor* — this rulebook's P2 standard of 44px remains the design target. The 24px criterion exists to catch tiny inline controls: pagination numbers, tag-remove ✕ buttons, icon links in footers.
- **Focus appearance / not obscured (2.4.11–13): the focused element must not be hidden by author content.** Sticky headers, cookie banners, and chat widgets routinely cover the element a keyboard user just tabbed to — they can't see where they are. Use `scroll-padding-top` matching sticky header height, and audit fixed overlays against tab order.
- **Dragging alternatives (2.5.7): any drag operation needs a single-pointer, non-drag alternative.** Sortable lists need up/down buttons or a move menu; sliders need direct input or +/- steppers; kanban cards need a "move to column" action. Dragging is impossible for many motor-impaired users and miserable with switch access or voice control.
- **Consistent help (3.2.6): help mechanisms (contact link, chat, FAQ) appear in the same relative location on every page.**
- **Redundant entry (3.3.7): never ask for the same information twice in one flow.** Auto-fill the shipping address into billing with a "same as" toggle; carry the email from step 1 to step 3. Re-asking penalizes memory- and motor-impaired users most, and annoys everyone.
- **Accessible authentication (3.3.8): no cognitive-function tests for login.** Don't disable paste on password fields (breaks password managers), don't require transcribing codes when a click-link alternative is possible, don't rely on puzzle CAPTCHAs without alternatives.

### Smell tests

- A tag input whose remove buttons are 16x16px.
- `onpaste="return false"` on a password or confirmation field.
- A sortable list with drag-and-drop as the only reorder mechanism.
- Checkout asking for the email address twice on consecutive steps.

---

## The Critical 15

Never ship a page with any of these. This is the final gate — walk it explicitly before delivery.

1. Body text contrast below 4.5:1 (verify computed values, both themes).
2. Any interactive element unreachable or inoperable by keyboard.
3. Focus outlines removed without a visible `:focus-visible` replacement.
4. Icon-only buttons without an accessible name (`aria-label`).
5. Touch targets under 44x44px on primary mobile controls.
6. Horizontal page scroll at any viewport from 320px up.
7. Layout shift from undeclared image/embed dimensions.
8. `prefers-reduced-motion` not respected by any animation on the page.
9. Placeholder-only form labels.
10. Form input cleared or lost on validation failure.
11. A modal without Escape-key close and focus trap/return.
12. Meaningful state (tab, filter, detail view) not reflected in the URL.
13. Missing empty/error/loading states on any data-driven view.
14. Emoji used as functional icons, or mixed icon families.
15. Popup or permission prompt shown before the user has received any value.

If any item fails, fix it before presenting the work — and if one genuinely cannot be fixed, say so explicitly rather than staying silent.
