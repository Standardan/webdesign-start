# Concepts: from particulars to a singular idea

**Load at:** Phase 2.

A concept is the decision that makes a site unlike any other. It answers six questions:

| Part | Question | Example (a lighthouse long-read) |
|---|---|---|
| **Governing idea** | What single phenomenon from the subject runs through everything? | Light leaving a lamp |
| **Artefact** | What *is* the site, as an object or world? | A printed magazine feature |
| **Style anchor** | Which one movement, era, tradition or material gives it a coherent visual language? | Late-19th-century engraving and book typography |
| **Palette** | Which 4–5 named colours, with hex values, come from the subject's materials? | Cream paper, ink navy, signal red, fog grey |
| **Hero** | What single picture, drawn for this site, fills the first frame, and how does it move on its own? | A lighthouse at dusk whose beam sweeps across the headline |
| **Signature moment** | What will people remember and describe to a friend? | The headline lights up where the beam crosses it |

If you cannot fill all six, you don't have a concept yet.

## Procedure

1. **Reread the particulars** from the Discovery Notes. The concept must use at least two of them. A concept that ignores the particulars could belong to any business in the category.
2. **Brainstorm 8–10 raw ideas quickly**, spread across the leading formats and the wildcard on the hypothesis board. Take them from the particulars (the 3 a.m. start, the river, the 40-year-old starter), from the world answers (the object, the time, the feeling) and from the craft's own vocabulary.
3. **Pick three that pass the diversity grid** (below).
4. **Develop each to all six parts**, then write it up for the user in the presentation format.
5. **Test each one:** could it be described in a sentence a stranger would repeat? Could it belong to a competitor? If it could, replace it.

## Formats (from the hypothesis board)

The format is the kind of experience: a story you read, a place you step into, pages you turn, a product you hold, something you play or make. Discovery narrows it without the user ever naming it (`discovery.md`), and `formats/index.md` lists every format with its signals and gallery examples.

- **Concept A and concept B** normally use the two leading formats on the hypothesis board (or the leading format with two very different worlds, if one format is clearly right).
- **Concept C** uses the board's **wildcard**: a plausible format nobody in the category would expect.
- Once a concept is chosen, load its format file (`formats/<name>.md`) for the architecture, mechanics and pitfalls. A site can borrow one or two sections from other formats; name them in the paragraph.

The format supplies architecture, never the look. Two sites in the same format must still differ in idea, material, palette, type and art. Each format file lists its variation levers.

## Style anchors

Pick **exactly one** anchor per concept. It gives the model a large, coherent visual language to draw from. Two anchors dilute each other. Take the anchor from the particulars (era, place, craft), not from fashion.

- **Movements and eras:** Art Nouveau 1899 · Vienna Secession · Art Deco 1928 · Bauhaus · Swiss International Style · mid-century modern · 1960s space age · 1970s supergraphics · Memphis 1986 · 1990s rave flyers · Y2K chrome · Victorian scientific plates · Edo woodblock · Soviet constructivism · Scandinavian functionalism · Brutalist concrete.
- **Traditions and trades:** botanical engraving · nautical charts · railway timetables and transit diagrams · apothecary labels · letterpress · risograph · enamel signage · hand-painted shopfronts · museum placards · patent drawings · architectural drafting · field notebooks · seed packets · matchbook covers · record sleeves · film title cards.
- **Materials:** cut paper · washi · letterpress cotton paper · brass · brushed steel · lacquer · walnut · concrete · terracotta · stained glass · frosted glass · enamel · felt · knit wool · clay · wax seal · gold foil · neon · chalk · ink wash.
- **Places and light:** a lighthouse at dusk · a greenhouse in the morning · a harbour in fog · a night market · a mountain hut · a sunlit kitchen at 6 a.m. · the deep sea · an observatory · a library after closing.

This list is vocabulary, not a menu. The best anchor is often one the particulars suggest and no list contains.

## The diversity grid

The three concepts must differ from each other on **at least four** of these six axes:

| Axis | Examples of different values |
|---|---|
| Format | any two different entries in `formats/index.md` |
| Ground value | light (paper, plaster, bone) · dark (ink, lacquer, night) · saturated (cobalt, tomato, blueprint) |
| Type voice | book serif · Didone display · heavy grotesk · condensed poster caps · geometric · monospace instrument · drawn lettering |
| Hero technique | vector illustration · layered paper depth · canvas particles or light · CSS 3D object · giant type · treated real photography · generative pattern |
| Motion signature | idle ambient life · scroll-scrubbed journey · spring physics · self-drawing line · state-change retheme · reveal ritual |
| Palette temperature | warm · cool · neutral with one hot accent · high-chroma |

Also make sure of three things:
- **At least one concept is the confident, safe-for-the-category choice done exceptionally well.**
- **At least one is unexpected:** it takes a particular literally or picks a format nobody in the category uses (the wildcard).
- **None is the house look** (below).

## The house look (the trap to avoid)

Some combinations have become the default output of AI design tools, including earlier versions of this skill. Use one only when the concept specifically calls for it, and say why:

- A cream or off-white ground, an ink headline in a heavy serif, one rationed accent colour, small tracked-caps labels and fade-up reveals.
- A dark ground with a violet-to-blue gradient glow, glass cards and a centred headline.
- Hero, then three feature cards, then testimonials, then a CTA band.
- A bento grid of icon-and-text tiles.
- A neutral sans (Inter or system-ui) at medium weights everywhere, with no scale contrast.
- Abstract gradient blobs or "mesh gradients" as the hero picture.

A concept escapes this by having a governing idea that makes its own choices. The escape is never "pick something weird".

## Hero silhouettes

The first-frame composition follows from the format and the artefact. For inspiration, some silhouettes seen in the gallery:
- the object at 55–80% of the viewport with a console band (017, 057, 082);
- a full-bleed scene with a thin HUD (002, 012, 041);
- a giant word as the floor of the hero, bleeding off the edge (014, 081, 096);
- type layered with the subject, behind and in front (043), or cut by it (022, the waterline title);
- a museum plate: title left, object centre, labels right (004);
- strict bilateral symmetry for heritage (015, 085);
- a framed diorama with a deckle-edged mat (018);
- a split: editorial headline on one side, product object on the other (024, 035, 040);
- near-wordless: one scene and one line of text (041, 047).

Choose the silhouette that expresses the artefact. Never choose one because it's familiar.

## Presenting the three concepts

Write each concept for a non-designer, vividly, in about 120–160 words:

```markdown
### A. "[Concept name]": [one-line idea]
**What you'd see first:** [the first frame, described as a picture: what fills the screen, what moves, where the words sit]
**The idea:** [the governing idea and the artefact, in plain words]
**Palette:** [name #hex] · [name #hex] · [name #hex] · [name #hex]
**Type:** [the voice, in plain words: "tall, elegant, old-newspaper headlines"]
**The moment people remember:** [signature moment]
**Why it fits you:** [ties to two or more of their particulars and answers]
```

End with a recommendation (which one and why) and an invitation: "Pick one, mix two ('A's palette with C's idea'), or tell me what's missing."

## Worked example (illustrative)

*Brief:* a sourdough bakery in a riverside mill town. It opens at 7, bakers start at 3 a.m., uses a 40-year-old starter, and customers call the Saturday morning queue "the line".

- **A. "The 3 A.M. Shift":** a *journey* from dark to dawn. Scrolling moves the clock from 3 a.m. to 7 a.m.: the page starts night-blue with one lit oven window, dough rises in stages, the sky warms to apricot, and the doors open at the bottom with today's bakes and hours. A clock gauge shows the time. Book serif, dark to light ground.
- **B. "Starter No. 1983":** a *print artefact*, a bound baker's ledger. Cotton-paper ground, letterpress-red and iron-gall ink. The hero is an engraved-style drawing of the starter jar with gently rising bubbles. Each bread is a ledger plate with hydration and bake time. Stamped dates, ruled lines, and a "feed the starter" interaction that makes it bubble.
- **C. "The Line":** a *poster/type-led* concept. A giant condensed "THE LINE" set as a queue of letters that shuffle forward with scroll. A saturated tomato ground and flour-white type. Each bread is a ticket stub you tear off to see details. Loud and local, with a counter for "loaves left today" (clearly a placeholder until connected to real data).

The three differ on format, ground, type voice, hero technique and motion. Each uses at least two particulars.
