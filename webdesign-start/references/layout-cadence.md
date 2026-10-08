# Layout cadence (no template structure)

**Load at:** Phase 3 (when writing the section devices), Phase 5 (while building sections), Phase 6 and Phase 7 (run `scripts/layout_audit.js`).

`human-copy.md` fixes the words. This file fixes the structure. A page can have human words and still read as machine-made because every section is the same shape: a small label, a giant headline and a grey subline, then three equal cards, a numbered step row, two price cards, an accordion FAQ and a dark call-to-action band, in the order hero, services, about, process, call to action. Visitors never name it, they just feel they have seen it.

## The principle

**Each section takes its form from the concept's objects, not from a section type.** Ask "what is this content in this world?" before "what does a services section look like?". A repair list is a work order, a menu is a menu, a process is a route on the map, prices are a rate card pinned to the wall. Then vary three things on purpose:

- **Openings.** Start sections different ways: with the content itself (the menu, the photo wall, the map), with a number or a figure, with a quote from the business's own words, with a sentence set inline, or with no heading at all because the content explains itself. A heading is one way to open, not the way.
- **Scale.** Type sizes follow what each section does. Section headings are not one size; the very large size is for one or two moments, not every section.
- **Rhythm.** Padding, density and background change where the content changes. Dense then loose. Some sections run edge to edge, some sit narrow.

The sections' order is also a choice: put first what this visitor needs to decide. Cut the sections the concept doesn't need (not every site has a process or an about section).

## The tells and the fix

| Code | The tell | Do instead |
|---|---|---|
| `EYEBROW` | Tracked or mono small label directly above a heading (including a label drawn in SVG or built in script) | Put the fact in the heading. Labels stay for real metadata (a time, a unit, a status), never above headings |
| `SUBLINE` | Heading, then a dim grey paragraph, opening several sections | Let the heading stand, or put the detail inside the content |
| `OPENER`, `HEADINGS` | Sections open with the same shape; every section after the hero opens with a visible heading | At least two sections open with content, media, a figure or nothing. Hidden or aria-label-only headings count as headless |
| `TWOCOL` | Heading left, paragraph right, as the head of 2+ sections | Set the head inline, over the content, or inside it |
| `PILLS` | Two side-by-side pill buttons, or 3+ filled buttons in one screen | One clear action per screen; make the secondary one a text link, or change the shape |
| `TICKS` | A row of ticked reassurances under the hero buttons | Say it once in the body copy with a real number |
| `NUMROW` | 3 to 5 numbered columns of numeral, heading, paragraph | A sequence the site's world already has: a route, a ticket, a timeline that is drawn, not boxed |
| `NUP` | Two or more groups of 3+ equal cards each with heading and paragraph | Vary size, count and form per group; one hero item and the rest smaller; a list; a table |
| `TWIN` | Two price panels side by side | Prices as a rate card, a table, one sentence or a single offer |
| `FAQ` | Accordion of 3+ items | Answer the real questions inside the page where they come up, or show them open |
| `CTABAND`, `FOOTMARK` | A dark band with one heading and one or two buttons before the footer; a footer wordmark over 60px | End on the site's own last beat (the booking form, the phone number set big in context, the map) |
| `HMONO` | Every section heading the same size | Size by role |
| `SCALE` | Display type over 3.5x body size in 3+ sections | Reserve it for one or two moments |
| `REVEAL` | One fade-up on every block; content invisible until scrolled into view | Motion for the few moments that earn it. Content is visible at load, always |
| `MOCKUP` | A drawn laptop or phone frame around a screenshot beside the hero headline | Show the real thing (the place, the product, the work) |
| `ALTERNATE` | Dark and light (or A/B) backgrounds alternating across 5+ sections | Change the background when the content changes |
| `TESTIMONIAL` | Quote-and-attribution block | Only a real, sourced customer quote, never card-shaped (the no-fake-testimonials rule still applies) |
| `ORDER` | Sections in the stock order: hero, services, about, process, call to action | Order by the visitor's decision |
| `PADDING` | Identical vertical padding on every section | Dense and loose sections differ |

These are tells, not bans. A single numbered row, one trio of cards or a dark closing section is fine when the concept puts it there. Two or three together on one page is the template.

## The check

Run `scripts/layout_audit.js` in the rendered page at 1440×900 with **default motion** (don't emulate reduced motion, and don't scroll first, or `REVEAL` can't see what is hidden at load). Paste it into the console or evaluate it with your browser tool. It returns `CLEAN` or one line per finding with the code and evidence.

- Fix by restructuring, not by renaming classes or hiding the evidence from the audit.
- A finding that the concept truly demands (for example four numbered bays on a floor plan) may stay if the review report names it and says why. Exceptions are never self-granted for more than one or two codes; if five codes remain, the page is a template.
- Run it again after fixes. Required before the review report, together with `copy_audit.js`.

Thresholds came from rendered pages that read as AI-made (many findings each) against redesigned pages that read as made by a person (clean or one or two findings). If you change a threshold, re-run both kinds.
