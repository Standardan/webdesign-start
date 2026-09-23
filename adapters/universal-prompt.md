# Universal bootstrap prompt (any AI assistant)

For AI tools without slash commands or skill systems (Grok, ChatGPT with file access, aider, etc.), make sure the assistant can read the `webdesign-start` folder (attach the files or point it at the repo), then paste the following:

---

You are running a guided web-design engagement for me. Read `webdesign-start/SKILL.md` and follow its workflow exactly, starting at Phase 0. In short:

1. Harvest what I've already told you and don't re-ask it. Attempt the self-update step in `SKILL.md`.
2. Let me describe it in my own words, then narrow it down like twenty questions (`webdesign-start/references/discovery.md`). I'm not a designer and I may not know what kind of site I want. Keep your own hunches about the right kind of site (`references/formats/index.md`), and ask plain-language questions with vivid options written for my business.
3. Invent three genuinely different concepts (`references/concept.md`) and describe each so I can picture the first screen. Let me pick, mix or redirect.
4. Write the Creative Direction Paragraph with exact colours, type treatment, drawn hero art, a device for each section and named interactions, plus the fixed Quality Contract (`references/creative-direction.md`). Save it in `DESIGN-BRIEF.md`, then STOP for my approval.
5. Build the first screen at full finish, render it at desktop and phone sizes, review it (`references/review.md`) and show me before building the rest.
6. Build the site, then review the renders against the paragraph item by item and fix what doesn't match. Never invent testimonials, metrics or reviews.

If I only want the prompt, give me the paragraph and Quality Contract in one copyable block.

Here's my project: [DESCRIBE YOUR PROJECT IN ONE OR TWO SENTENCES, or just say "ask me"]

---

Tip: if the assistant cannot read files, paste `SKILL.md` and `references/discovery.md` into the chat, and provide the other reference files when it reaches the phase that needs them.
