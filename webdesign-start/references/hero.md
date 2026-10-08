# The hero is an experience, never the formula

**Load at:** Phase 2 (when giving each concept its hero), Phase 3 (the paragraph's hero slot), Phase 4 (building the first frame), Phase 7 (`scripts/layout_audit.js`, code `HERO`).

## The default hero, named and banned

> **The formula hero:** a big headline, a one-paragraph subline and one or two buttons, stacked in one block, with an image beside it or behind it.

Everyone has seen it, so nobody feels it. It is the first frame of the average business site, and it is what a model produces when the concept stops at "make it look nice". Sites built with it look alike even when the palette, type and illustration all differ, because the *composition* is the same: text block on one side, picture on the other, a button under a sentence.

**The rule:** the formula is never the dominant composition of the first frame. A first frame may contain a headline, a line of text and a button, but one of three things must be true:

1. **The first frame is something you look at or use**, and the words are small, set into it, or secondary (a product, a photograph, a scene, a working tool, a board, a poster).
2. **The words are the picture** (a typographic poster whose size and placement are the composition), with the action placed as part of it, or absent.
3. **The words are not the formula's three parts**: a single line set into the art, no subline, and the action built into the object rather than a button beneath a sentence.

`scripts/layout_audit.js` flags `HERO` when a first viewport has a headline of 44px or more, a subline of 6 to 70 words under it, and one to four buttons under that, in one column, with no poster-scale type (14% of the viewport width), no working tool (two or more inputs) and no larger type elsewhere. Most sites built before v2.6 fail it, on purpose.

**Don't fix it by shrinking the subline to five words or removing the button from the audit's sight.** That is the formula with its disguise on. Change what the first frame *is*.

## Choose the hero from the concept

The hero comes from the concept's artefact and the business's product, never from this list. The list is vocabulary for finding one the concept wants. Pick the type before you draw anything, write it in the paragraph and the brief, and log it in the portfolio ledger (`better-every-time.md`).

| Hero type | The first frame is… | Fits | Notes |
|---|---|---|---|
| **Product you can touch** | The product at 55–80% of the viewport, interactive: turn it, open it, pick a variant, and the picture answers | Shops, bakeries, florists, makers, anything physical | Small name, one line, the price or action attached to the object. Selection changes the image (`techniques.md` §9) |
| **Full-bleed photograph, one line** | One art-directed photograph edge to edge, a single line of type set into its negative space or overlapping its subject | Food, venues, trades with real work, salons, gyms | No subline, no button cluster. The action lives in the nav or sits as a small tab on the picture (`photography.md`) |
| **Editorial cover** | A magazine or catalogue cover: masthead, one dominant image, two or three cover lines, an issue line | Restaurants, shops, studios, venues with a story | Cover lines are real content (today's special, this week's arrival), not slogans |
| **Working tool** | The thing the visitor came to do, already usable: a bouquet builder, a quote or booking strip, a menu filter, a calculator, a slot picker | Florists, salons, groomers, gyms, trades, rentals | The tool must be the main object, not a strip bolted under the formula. The headline is a label for the tool |
| **A scene** | A place or moment drawn, rendered or photographed, with the information inside it (`craft.md` §4) | Venues, shops, trades with a place | A scene whose text is a headline plus a button over it is still the formula |
| **A board or menu that is the hero** | The menu, the price list, the schedule or the day's bake, set large as the first thing seen | Restaurants, bakeries, cafés, class schedules | The real content, formatted beautifully, beats any slogan |
| **Video or animated still** | A short silent loop (the pour, the cut, the rinse, the bake) or a still with one thing moving | Anything with a satisfying process | Poster frame must already be beautiful; reduced-motion freezes it (`build-standards.md`) |
| **Typographic poster** | The name or one claim set so large it is the picture, with art cutting through it, and no button | Brands with a strong name or voice; events | Action sits in the nav or at the foot. Passes `HERO` by scale |
| **A split decision** | Two or three big doors into the site ("Order flowers" / "Plan an event" / "Sympathy"), each a photograph | Businesses with distinct customer paths | Each door is an image and a verb, not three buttons |
| **A live board** | Something that is true right now: open or closed, today's stock, the next free slot, the wait | Cafés, bakeries, trades with capacity, clinics | Real data or clearly marked sample data. Never a fake counter |
| **A map or route as the experience** | The place and how to reach it are the point (a dive shop, a mobile service) | Only when location is the product. Never as decoration | Not a default for "local business" |
| **A hand of the work** | The work itself as one touchable object: a fan or hand of cards (screenshots, products, finished jobs) you run a pointer along, with the chosen card lit and its caption under the fan | Studios, agencies, makers and any business whose work is its product | One line of type small on the stage; the action is a card in the hand (a form) or a text link, never a button under a sentence. Recipe: `techniques.md` §7 |
| **The detail close-up** | A macro of the craft: crumb, grain, bristle, weld | Makers, trades, food | Often the best first frame for a small business with one great product |

### Questions that find it

- What do this business's customers *look at* before they decide? (The flowers, the dish, the finished roof, the dog after the groom.) That is the hero's subject.
- What do they *do* first? (Pick a bouquet, check hours, request an estimate, pick a slot.) That is the hero's interaction (`primary-action.md`).
- What is the one frame a customer would screenshot and send to a friend?

If the answers are a photograph and a tool, the hero is that photograph with that tool in it, not a headline.

### Not the formula, still a trap

- **A photograph with the formula text block over it.** The picture is wallpaper. Same composition.
- **A giant headline over a gradient or blob.** A bigger formula.
- **A tool strip under a formula hero** (three fields under the subline). The tool must be the main object.
- **A carousel of formula heroes.**
- **A hero whose picture is a mockup** (a laptop or phone frame): see `MOCKUP`.
- **The same hero type twice in a row across the portfolio.** Check the ledger (`better-every-time.md`).

## When `HERO` fires on a page that is not a formula hero

- **Interactive diagrams count as buttons.** A route, stepper or tab diagram built from `<button>` elements, sitting in the first viewport under a headline and a sentence, reads as headline, subline and buttons. Do not hide the buttons: move the sentence below the diagram (the diagram is then the tool and the headline labels it), or build the diagram so its first-frame state is the picture.
- **A one-line headline of 40px or less with no subline under it passes by design.** That is the point of a hero where the object carries the frame and the words are set into it.

## Writing the headline when there is one

- A headline is a line a person would say. It can be the product's name, a price, a time ("Ovens lit at 3:30"), or a fact only this business has.
- **One colour.** No two-tone highlighted word or phrase (`HEADLINE2`). Emphasis comes from size, weight, position, line breaks, or the picture touching the type.
- The line and the art touch (`craft.md` §2): overlap, a cut, a shadow across the letters, a window in the type.
- No eyebrow above it, no grey subline beneath it (`layout-cadence.md`).

## The phone

Recompose, don't shrink. On a phone the first screen is the picture or tool at full width, with the line set into it or directly under it. Never stack headline, paragraph, two buttons and then the art below the fold.

## Review

In the first-frame test (`review.md`), add: name the hero type, name the first thing the eye lands on, name the first thing the hand can do. If the answers are "a headline", "a headline" and "tap the button", the formula has won. Re-open Phase 2.
