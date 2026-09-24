# Components: the modern building blocks

**Load at:** Phase 3 (to plan the component set in the brief) and Phases 4–5 (to build with it).

Beautiful, well-engineered components are a core ingredient of a striking modern site: animated heroes, text effects, backgrounds, cards, scroll sections, 3D scenes, and polished controls. The concept still decides the look. Components are how it gets delivered at a high finish, quickly. The skill's job is to **choose the right component for each surface, then restyle and compose it so the result looks designed for this site**, never like a library demo.

## Sources (no priority; pick the best fit per surface)

| Source | Strong for | Stack |
|---|---|---|
| **shadcn/ui** (ui.shadcn.com) | Accessible, restyleable foundations: dialogs, menus, forms, tabs, sheets, command palettes, charts | React + Tailwind (Radix) |
| **Aceternity UI** (ui.aceternity.com) | Hero effects, spotlight and glow cards, parallax and scroll sections, 3D cards, text reveals | React + Tailwind + Motion |
| **Magic UI** (magicui.design) | Animated text, marquees, number tickers, shine borders, device mockups, backgrounds | React + Tailwind + Motion |
| **React Bits** (reactbits.dev) | Text animations, interactive backgrounds, cursor effects, image and gallery effects | React (many with vanilla/CSS versions) |
| **Motion Primitives** (motion-primitives.com) | Refined motion building blocks: morphing dialogs, text effects, carousels, in-view reveals | React + Motion |
| **Origin UI** (originui.com) | Large set of polished inputs, buttons, navigation and form patterns | React + Tailwind |
| **beUI** (github.com/starc007/ui-components) | Clean modern components and micro-interactions | React + Tailwind |
| **Uiverse** (uiverse.io) | Buttons, toggles, loaders, cards, inputs in plain HTML/CSS | HTML + CSS (ports anywhere) |
| **ThreeUI Community** (github.com/MengTo/threeui), three.js, React Three Fiber | Real 3D and shader scenes when the concept needs them | WebGL |
| **GSAP** (gsap.com) and **Motion** (motion.dev) | Scroll-driven timelines, pinned scenes, complex choreography | Any |

Library names, URLs and contents change. When you have web access, open the source and check the current component before using it. Without web access, use what you know, say so, and prefer patterns you can build accurately.

## Choosing components

1. **List the surfaces** from the Creative Direction Paragraph: hero, headline treatment, background, navigation, each section's device, cards or product displays, the signature interaction, calls to action, forms and controls, footer.
2. **For each surface, consider 2–3 candidates across sources** and pick the one whose *behaviour* best serves the concept. Judge the mechanics (how it moves, responds, reveals), not the demo's colours.
3. **Record the plan in the brief** (`brief-template.md`, "Component plan"): surface → component → source → how it will be restyled.
4. **Compose, don't stack.** Two or three strong components working together in one composition beat ten effects in a row. Each viewport still has one leading motion.

## Restyling: make it this site's component

A component in its demo styling is the fastest way to a generic site. For every component:

- **Tokens:** replace every colour, radius, shadow, font and easing with the brief's tokens. There are no library defaults left.
- **Material and idea:** give it the concept's material and light (paper, glass, metal, light-as-accent). A spotlight card in a bakery might become warm oven light sweeping across a tag.
- **Content:** real copy and real data, never the demo's lorem, avatars or fake logos.
- **Motion:** tune durations and easing to the concept's motion vocabulary (`craft.md` §13). Lower the intensity of effects that are loud by default.
- **Scale and placement:** change proportions and position so the composition follows the concept's silhouette, not the demo page's.
- **Accessibility:** keep or add keyboard support, focus styles, labels, reduced-motion variants and touch equivalents. Many demo components lack some of these, so check each one.

## Overused effects (use only when motivated and restyled)

These appear on thousands of sites. Use one only when the concept gives it a reason, and transform its look:

- aurora or gradient-blob backgrounds; beams, meteors, sparkles and grid-glow backgrounds;
- spotlight or glow-follow cards in a bento grid;
- shimmer or animated-border buttons;
- infinite logo marquees;
- typewriter or word-rotating headlines;
- 3D tilt cards;
- dot or globe heroes without real data (`formats/living-data-hero.md`).

## Build-mode notes

- **Project mode (React, Next.js, Vite, Tailwind):** install or copy components the way each library documents, keep them in the project's component folder, and wire them to the shared tokens.
- **Single-file mode:** port the component's technique to plain HTML, CSS and JavaScript (most effects are CSS, canvas or a small script). Libraries such as GSAP or three.js can load from a CDN unless the user needs the file fully offline.
- **Licences:** check each source's licence before copying code, keep required notices, and never copy paid or "pro" components without the user's licence.

## What stays made for the site

Components deliver the look; they don't replace the concept. The governing idea, the palette, the typography, the copy, and any illustration or photography treatment the concept depends on are still decided for this site. Where no component fits a surface, build it from `techniques.md`.
