# Build standards

**Load at:** Phase 4.

These standards set the engineering floor under the Quality Contract. They stop an ambitious site from shipping broken. They are not a style guide: the look comes from the Creative Direction Paragraph.

## Build modes

**Ask the user each time** (discovery practicals), unless an existing codebase already decides it. Offer it in plain words, with a recommendation:
- "One file you can open or upload anywhere" → **Single-file mode**. Best for one-page sites, launches, portfolios and quick sharing.
- "A full project a developer can grow" → **Project mode**. Best for multi-page sites, stores, CMS content, or when the component plan leans on React libraries.

Record the answer in the brief.

**Single-file mode:**
- One `index.html` with CSS in `<style>` and JavaScript in `<script>`.
- Web fonts may load from Google Fonts, and small libraries (GSAP, three.js, Motion) from a CDN (jsDelivr or cdnjs). Components are ported to plain HTML, CSS and JavaScript (`component-sourcing.md`).
- **Offline variant**, when the user needs it to work with no network: no external requests at all, system font stacks only (`craft.md` §9), and display lettering drawn in SVG where the look depends on it. This matches the benchmark gallery's conditions.
- Works when opened directly from disk (`file://`), with fonts falling back gracefully when offline.

**Project mode** (an existing codebase, or a new one when the user chooses it):
- Detect and follow the existing stack, conventions and file layout. Never add a framework the project doesn't use without asking.
- For a new project, propose a modern stack that suits the component plan (for example Next.js or Vite with React, Tailwind and Motion) and confirm it with the user.
- Web fonts: self-host where possible, use `font-display: swap`, subset if you can, and preload only the display face.
- Real photography is allowed and encouraged when it exists. Treat it by the concept: duotone, cut-out, framed as plates, graded to the palette, cropped with intent. Serve modern formats with sizes and `srcset`. Never use stock photography as the signature visual.
- Component libraries are first-class (`component-sourcing.md`). Other libraries are allowed for real needs (routing, forms, data, a 3D engine).
- Keep the tokens (colours, type, easing, spacing) in one place: CSS custom properties, or the project's theme file, and wire every component to them.

## Structure

- Valid HTML5: doctype, `lang`, charset, viewport meta, a meaningful `<title>` and meta description, and a `theme-color` matching the ground.
- Semantic landmarks (`header`, `nav`, `main`, `section` with headings, `footer`), one `h1`, and a logical heading order.
- `<button type="button">` for actions and `<a href>` for navigation. Never use clickable `div`s.
- Unique ids, and labels tied to every control.
- Decorative SVG and canvas get `aria-hidden="true"`. Meaningful art gets `role="img"` and a real description.
- Open Graph title, description and a share image when the site will be shared (in single-file mode, a share image can be skipped or rendered later).

## Tokens first

Before writing sections, define the paragraph's values once:
```css
:root {
  --ground: #f4eee2; --ink: #2a2622; --accent: #b3261e;   /* named in comments after the paragraph's things */
  --display: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --ease-reveal: cubic-bezier(.18,.7,.16,1); --ease-spring: cubic-bezier(.3,1.6,.5,1);
  --measure: 36rem; --space: clamp(1rem, 2.5vw, 2rem);
}
```
No raw colour or font values are allowed elsewhere, except inside drawn art, where gradients and shading legitimately need extra tones derived from the palette.

## Responsive: recompose, don't scale

- Support widths from 360px to large desktops with no horizontal scroll at any width. Check 360, 390, 768, 1024, 1440 and 1920.
- Give heroes and scenes their own phone composition (`craft.md` §2): crop bands, repositioned subjects, fewer elements, type that restacks.
- Use `svh`/`dvh` units, or an `innerHeight`-based `--vh`, for full-height stages so the mobile URL bar doesn't cause jumps.
- Canvases follow their container and devicePixelRatio (capped at 2), and re-layout on resize.
- Touch targets are at least 44×44px. Hover-only behaviour needs a tap or focus equivalent.

## Motion and performance

- Animate transform and opacity. Avoid animating layout properties, and heavy filters on large areas.
- Use one `requestAnimationFrame` loop per concern, paused on `visibilitychange` and when its element is off-screen.
- Clamp `dt`, and use frame-rate-independent smoothing.
- Pre-render sprites and static layers, and re-bake only on a debounced resize.
- **Reduced motion is a designed variant**, detected in both CSS and JavaScript, with live `change` handling:
  - freeze ambient loops on a chosen frame;
  - show assemblies in their finished state;
  - replace motion with short fades;
  - thin particles;
  - jump instead of smooth-scrolling;
  - keep every interaction working.
- Budgets (guidance): first paint shows the finished hero; no long task over about 50ms after load on a mid-range phone; animation holds about 60fps on a mid-range laptop and degrades gracefully (fewer particles, lower buffer resolution) on phones.
- Audio: synthesised with Web Audio or supplied files, starting only after a user gesture, with a visible mute toggle and off by default on business sites.

## Accessibility floor

- **Contrast:** body text at least 4.5:1; large text and essential UI at least 3:1. Check text over art at its worst point, and add a scrim, shadow or repositioning where needed. Muted labels still count.
- **Focus:** a visible `:focus-visible` style in the site's own language (an accent ring, a double ring, an LED glow), never removed. For cards with a stretched link, ring the whole card with `:has(:focus-visible)`.
- **Keyboard:** every interaction is reachable and operable. Custom widgets follow ARIA patterns (arrow keys for radio groups, sliders and tabs). Dialogs move focus in and return it on close, and close on Escape.
- **No single-key global shortcuts** unless they can be turned off or only work while a widget has focus.
- **Text stays text.** Headlines drawn as SVG keep an accessible name. Kinetic per-letter spans have an `aria-label` on the parent.
- **Live updates** that matter (a reveal result, a state change) are announced politely. Continuous readouts (gauges) use `aria-live="off"`.
- **Forms:** visible labels, clear errors next to the field, correct input types and autocomplete.
- **Motion safety:** no flashing more than three times a second, and reduced motion respected.

## Honesty and content

- No lorem ipsum. Write real copy in the paragraph's voice, or mark placeholders clearly (`[Placeholder: opening hours]`) and list them in the report.
- Never invent testimonials, client logos, reviews, metrics, awards or press for a real business. Fictional projects label their fiction in the page, for example in the footer.
- Hedge facts that are approximate. Invented data never uses "live", "now" or real-time language.

## Robustness

- No console errors on load or on basic interaction.
- Storage access (`localStorage` and similar) is wrapped in try/catch, and the page works without it.
- Decorative steps (grain generation, sound) fail silently and never break the page.
- External requests (fonts, CDNs, APIs) are intentional and listed in the brief. The offline single-file variant makes none.
- Include a print stylesheet when the content is something people print (recipes, menus, itineraries).

## Before handing to review

- Tokens are defined and used, and there are no stray colours or fonts.
- The first viewport at 1440×900 and 390×844 is finished before any interaction.
- Reduced motion has been checked by emulation.
- Keyboard-only navigation works through every interaction.
- Then run `review.md`.
