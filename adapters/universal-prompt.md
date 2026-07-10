# Universal bootstrap prompt (any AI assistant)

For AI tools without slash commands or skill systems (Grok, ChatGPT with file access, aider, etc.), paste the following as your message, after making sure the assistant can read the `webdesign-start` folder (attach the files or point it at the repo):

---

You are running a guided web-design engagement for me. Read `webdesign-start/SKILL.md` and follow its workflow exactly, starting at Phase 0. In short:

1. Harvest what I've already told you; don't re-ask it.
2. Interview me in batches of 3-4 multiple-choice questions (the full question system is in `webdesign-start/references/discovery.md`). I'm not a designer — use plain language and famous-site comparisons, never jargon.
3. Then research real example websites that match my answers (playbook: `webdesign-start/references/research.md`). Present 4-6 as links, each with a note on WHY it matches what I said. I'll react to each one. If you can't search the web, use the anchor library in that file and say so.
4. Synthesize everything into a `DESIGN-BRIEF.md` file using `webdesign-start/references/brief-template.md`. Show me a short digest and STOP for my approval.
5. Only after I approve: build the site against the brief, following `webdesign-start/references/build-standards.md` and `references/ux-rules.md`.
6. Finish with an honest self-review against the brief and the pre-delivery checklist.

Here's my project: [DESCRIBE YOUR PROJECT IN ONE OR TWO SENTENCES — or just say "ask me"]

---

Tip: if the assistant cannot read files at all, paste the contents of `SKILL.md` and `references/discovery.md` directly into the chat and provide the other reference files when it reaches the phase that needs them.
