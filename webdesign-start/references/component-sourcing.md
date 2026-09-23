# Component sourcing for ordinary controls

**Load at:** Phase 5, when the site needs ordinary interface controls.

Heroes, illustrations, scenes, signature objects and section devices are **always made for the site** (`craft.md`). Component libraries and catalogs are for **ordinary controls** only, where a well-tested, accessible implementation saves time and a custom one adds risk:

- forms and inputs, date and time pickers, selects and comboboxes;
- dialogs, drawers, menus, tabs, accordions, tooltips, toasts;
- carousels (rarely justified), data tables, pagination.

## Rules

1. **Accessibility first.** Prefer libraries with correct keyboard and ARIA behaviour (headless or unstyled ones are ideal, because you restyle them anyway). Check the pattern against the WAI-ARIA Authoring Practices.
2. **Restyle into the site's material.** A control from a library must look like it belongs to the concept: paper tabs, an engraved select, a stamped toast. A visible library default is a review failure (`review.md`, kit assembly).
3. **Follow the stack.** In Project mode, use what the codebase already uses before adding anything. In Showcase mode there are no external libraries; write the control by hand with correct ARIA.
4. **No demo layouts.** Never import a catalog's page sections, hero blocks or card grids. They carry the kit look this skill exists to avoid.
5. **Check the licence** before copying any code, and credit where the licence asks.

## Sources worth knowing (optional, no priority)

- **Headless or accessible primitives:** Radix UI, React Aria, Headless UI, Ark UI, Melt UI (for Svelte), and native `<dialog>`, `<details>` and `popover`.
- **Styled catalogs to adapt carefully:** beUI (github.com/starc007/ui-components), Uiverse (uiverse.io), Material Components Web. Take mechanics and micro-interactions from them, not their look.
- **3D and WebGL**, only when the concept truly needs a real 3D engine: ThreeUI Community (github.com/MengTo/threeui), three.js. Always provide a static, no-WebGL and reduced-motion fallback, and budget the load.

You don't need to inventory these catalogs before building. Look something up only when a specific control is needed.
