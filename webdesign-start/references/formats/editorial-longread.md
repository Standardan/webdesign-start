# Format: editorial long-read

**Load when:** the concept is a print artefact read top to bottom: a magazine feature, a founder's story, a case study, a field guide, an annual report, a menu with a story, an "about" page that deserves to be read.

**Study:** gallery 008 (The Last Keepers). Also 011 (herbarium), 040 (recipe), 085 (Art Nouveau tea room).

## What makes it work

The site borrows the **apparatus of print**: masthead and issue, plate captions, chapter numerals, a drop cap, pull quotes that break the column, marginal notes, footnotes and a colophon. A single idea from the subject runs through every system (in 008, light leaving a lamp). The rhythm alternates light paper sections with full-bleed dark scenes, so it reads like a film with scene changes rather than a stack of same-width blocks.

## Architecture

1. **Masthead:** a thin fixed bar, transparent over the hero and solid after it. It holds the publication name, issue or date, the current chapter label, and a reading-progress indicator drawn in the site's metaphor.
2. **Hero plate:** a full-bleed 100svh illustration composed as a scene with a camera (`techniques.md` §4). The headline is *seated in the art* (lit by it, cut by it, or overlapping it), with a caption in the corner ("Plate I. …") and a quiet "Begin reading" cue.
3. **Standfirst:** a narrow italic deck (about 30ch), an ornament, and a meta row (genre · read time · issue).
4. **Chapters:** a single column at a 60–66 character measure. Chapter openers use a large numeral in the accent. The first chapter gets the drop cap.
5. **Breaks from the column:** pull quotes overhang the column by about 7rem each side on wide screens, and margin notes hang into the right margin at ≥1180px (inline with a rule below that).
6. **One pinned scene:** a full-bleed sticky section whose state is scrubbed by scroll (dusk to night, a season turning, a building going up), with the text scrolling over it. See `scroll-journey.md`, pattern B.
7. **One explanatory plate:** the only place the layout widens. A figure that assembles on scroll, with a lettered key and a caption.
8. **Ending:** a closing ornament, endnotes with back-links, a fiction or sources note, and a colophon that names the typefaces. End quietly, as a book does.

## Key mechanics

```css
:root { --measure: 35rem; }
.chapter p { max-width: var(--measure); margin-inline: auto; }
.chapter p + p { text-indent: 1.4em; margin-top: 0; }          /* book convention */
.pull { margin-inline: max(-7.5rem, calc((var(--measure) - 100vw) / 2 + 1rem)); text-wrap: balance; }
@media (min-width: 1180px) { .note { float: right; width: 14rem; margin-right: -16.5rem; } }
```

```css
/* text scrolling over a pinned, changing scene */
.scene-sky { position: sticky; top: 0; height: 100svh; }
.scene-text { margin-top: -100svh; padding: 34vh 0 52vh; }
.scene-text p + p { margin-top: 36vh; text-shadow: 0 1px 2px var(--shade), 0 0 24px var(--shade); }
```

```js
// reading progress drawn in the metaphor: one CSS variable feeds the drawing
const p = clamp(scrollY / (document.documentElement.scrollHeight - innerHeight), 0, 1);
progress.style.setProperty('--p', p.toFixed(4)); progress.setAttribute('aria-valuenow', Math.round(p * 100));
```

Footnotes are `<button>`s that open a small anchored popover (a bottom sheet on phones), close on Escape or an outside click, and return focus to the reference.

## Variation levers

To stop two long-reads looking alike, vary:
- **the publication genre:** a literary quarterly, a scientific journal, a field notebook, a trade catalogue, a newspaper broadsheet, a zine;
- **the ground:** paper, newsprint, blueprint, black lacquer;
- **the type voice:** book serif, Didone, grotesk, typewriter;
- **the pinned scene's subject;**
- **the plate's subject:** anatomy, map, process, timeline.

A broadsheet uses columns and rules. A zine uses collage and rotated slabs. A field notebook uses pencil and tape.

## Pitfalls

- Display faces that exist on one OS only. Draw the headline in SVG, or load a web font in Project mode.
- Long empty gaps in the pinned scene on phones. Shorten the gaps below 700px.
- Layout reads (`getBoundingClientRect`) inside scroll loops. Cache the offsets on resize.
- Low contrast for text over the scene. Use layered scrims and double text-shadows, and check the worst frame.
- Footnote popovers that let focus wander off. Manage focus explicitly.

## Signals (what a user might say)

- "I want people to actually read our story."
- "Like a magazine article" / "like a feature in a nice magazine."
- "There's a lot to tell: the history, the people, the process."
- "Something you'd sit with over a coffee."
- "Elegant, literary, a bit old-fashioned."
- "Our founder writes beautifully."
- "An annual report people enjoy reading."
- "A field guide" / "a journal."

**Not this format if:** visitors come to act fast (book, buy, check hours) and won't read; there's no real text to tell; or the user says "nobody reads anymore" (consider a poster or scene with one short story section).
