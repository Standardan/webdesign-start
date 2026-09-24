# Registers: world, product, interface

**Load at:** Phase 1 (with `discovery.md`), and again in Phases 2 and 4.

Not every site should be a world. A bakery can be a little lit scene you step into, but a SaaS dashboard, an Apple-style product launch or a developer tool should feel precise, clean and fast, with no invented place, no story set at golden hour, and no metaphor to decode. The **register** is the first thing discovery settles, because it changes what "concept", "material", "hero" and "depth" mean.

| Register | The site feels like… | Beauty comes from | Typical formats |
|---|---|---|---|
| **World** | Stepping into a place, a story or an object | An invented world with its own light, material and devices | living scene, scroll journey, editorial long-read, book, interactive story, heritage brand, ambient, poster, themed interface, playable |
| **Product** | A flagship product launch: Apple, Nothing, Teenage Engineering, a premium hardware or software launch | The product itself, shown with cinematic light, huge confident type, precise motion and real specs | product film, product showcase, instrument, signature reveal, living data hero |
| **Interface** | A tool people use: a dashboard, an app, an admin, a data product (Linear, Stripe, Vercel, Arc) | Clarity, hierarchy, density done well, a refined system, micro-interactions, and real data made beautiful | app interface, command console, live bento, data reference, everyday tool, maker tool |

A site can mix registers by section (a product film whose last section is a live dashboard demo), but one register sets the first frame and the overall feel.

## How discovery detects it

Listen for these signals. When they're unclear, ask the splitting question below early.

- **World:** "feel like walking into…", "cosy", "magical", "tell our story", a place or craft business, a strong sense of place or era, "something people remember".
- **Product:** "like Apple", "sleek", "premium launch", "show off the product", "clean and modern", hardware, a flagship app, "cinematic", a product with renders or great photography.
- **Interface:** "dashboard", "app", "admin", "portal", "analytics", "for our customers to log in", "data", "tool", "SaaS product UI", "like Linear / Stripe / Notion".

**Splitting question (plain language):** "When someone lands, should it feel like **stepping into a world or story**, like **a sleek product launch**, or like **a tool they'll actually use**?" Offer three tiny pictures if they hesitate:
- a lit little world;
- a huge product shot with bold type sliding in as you scroll;
- a crisp dashboard with live numbers.

## What changes per register

| Concept part | World | Product | Interface |
|---|---|---|---|
| **Governing idea** | A phenomenon from the subject (light, paper, depth) | A **product truth**: the one thing it does better (quiet, thin, fast, precise, all-day battery) | A **working truth**: what the user decides or does here (triage in seconds, one number that matters, calm under load) |
| **Artefact** | An object or place (a ledger, a diorama) | The product itself on a stage | The product's own interface, at its best |
| **Style anchor** | A tradition, material, place or era | A contemporary design language (Swiss-precise product film, spatial glass, soft industrial) | A contemporary system language (precise neutral, dense technical, calm editorial data) |
| **Material** | The world's material makes the UI (paper tags, brass) | The product's own materials (anodised aluminium, glass, fabric) plus a restrained UI | The design system: surfaces, hairlines, elevation, type, motion tokens |
| **Hero** | A scene or object drawn for the site | The product, huge, lit like a studio shot, with one headline that states the truth | The product UI itself, real and alive (with honest demo data), or its one key number |
| **Depth** | Object-space or light-space scenes | Studio light on the product: soft key, rim, reflections, contact shadow | The elevation scale, layered surfaces, subtle translucency |
| **Motion** | Idle life, scene changes | Scroll-pinned chapters, product turns and explodes, type reveals, spec counters | Fast, precise feedback (100–250ms), state morphs, live data updates, no idle wiggles |
| **"Information lives in the world"** | Painted, printed or lettered into the scene | Typography and layout *are* the world: big clean type, precise spec grids | Information is the product: real tables, charts and states, designed |

The rules that never change across registers: the beauty floor (`aesthetics.md`), the polish pass (`polish.md`), honesty, accessibility, the completeness gate, and the ban on generic templates. A product page still needs one governing idea carried through four or more systems; an interface still needs a signature moment and must not look like a component-library demo.

## Light and time are tools, not themes

Time of day (golden hour, blue hour, dusk to night, sunrise, "a night of baking") is **one possible idea among many, not a default**. It's easy to reach for because it gives a palette and a motion for free, and that's exactly why it becomes a house look.
- Use it as the governing idea only when time is genuinely the subject: a sunrise tour, a nightlife venue, a 24-hour service, a weather product, a business whose particulars are about the hour.
- **At most one of the three concepts** may be built around time of day or a day-to-night change.
- Product and interface registers use **neutral studio or daylight lighting** by default, and dark mode only as a considered theme.
- In the review, a site themed on time of day that the user never asked for fails the sameness check.

## Product register essentials

- **The product is the hero.** Use real renders or photography (Project mode) or a rendered-looking 3D or CSS object, lit like a studio shot: one soft key, a rim, a floor reflection or contact shadow. No scene, no invented world.
- **One truth per chapter.** Each scroll chapter makes one claim in a huge headline (at 8–14vw), shows it with the product (a turn, an explode, a zoom, a before/after), and backs it with one real number.
- **Restraint is the style.**
  - A near-neutral ground (true white, soft grey or deep black) and one accent, often the product's own colour.
  - Generous space, and a single grotesk or neo-grotesk family at many weights.
  - Motion that is smooth, scroll-linked and never bouncy.
- **Specs and comparison are designed:** large numbers with units, a clean compare table, and finishes as swatches.
- Format recipe: `formats/product-film.md` (the launch story) and `formats/product-showcase.md` (the buy page).

## Interface register essentials

- **The first screen is the product working:** real layout, real hierarchy and honest demo data, labelled as demo, never lorem.
- **One primary job per screen,** and the most important number or decision is the largest thing.
- **A real system:**
  - tokens for colour, type, space, radius, elevation and motion;
  - an 8px grid;
  - a type scale of 4–6 sizes, with tabular numerals;
  - one accent for primary actions and focus;
  - a semantic colour set (success, warning, danger, info) calibrated for contrast;
  - light and dark themes when users live in it.
- **States are part of the design:** loading skeletons, empty states with a next step, errors with recovery, and success feedback.
- **Micro-interactions carry the delight:** crisp hover and press, smooth sorting and filtering, command palette, keyboard shortcuts, live updates that settle rather than jump.
- Format recipe: `formats/app-interface.md` (dashboards and product apps), plus `command-console.md`, `live-bento.md` and `data-reference.md`.
