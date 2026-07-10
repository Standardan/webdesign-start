# Industry & Product-Type Playbooks

This file contains category-specific design reasoning: what visitors in each industry expect, what builds trust, how conversion works, and — most importantly — the anti-patterns that make a site in that category fail. Generic design taste is not enough; a palette that works for a skate brand destroys a law firm, and a layout that sells sneakers buries a restaurant's menu. Use these playbooks to constrain and sharpen every downstream style, color, and layout decision.

**When to read this file:** after the discovery questionnaire, once you know (or can infer) what kind of business or product the site is for — and before choosing style direction, colors, or page structure.

## Table of contents

- [How to use these playbooks](#how-to-use-these-playbooks)
- [Playbooks](#playbooks)
  - [B2B SaaS](#b2b-saas)
  - [Developer tools & API products](#developer-tools--api-products)
  - [AI products & startups](#ai-products--startups)
  - [Fintech & banking](#fintech--banking)
  - [Crypto & web3](#crypto--web3)
  - [Healthcare & medical practice](#healthcare--medical-practice)
  - [Dental & specialty clinics](#dental--specialty-clinics)
  - [Legal](#legal)
  - [Accounting & consulting](#accounting--consulting)
  - [Real estate](#real-estate)
  - [Trades, construction & local services](#trades-construction--local-services)
  - [Restaurant & café](#restaurant--café)
  - [Hotel & travel](#hotel--travel)
  - [Fitness & gym](#fitness--gym)
  - [Beauty, salon & spa](#beauty-salon--spa)
  - [Fashion e-commerce](#fashion-e-commerce)
  - [General e-commerce & DTC](#general-e-commerce--dtc)
  - [Luxury goods](#luxury-goods)
  - [Education & courses](#education--courses)
  - [Kids & family](#kids--family)
  - [Nonprofit & charity](#nonprofit--charity)
  - [Creative agency & studio](#creative-agency--studio)
  - [Freelancer portfolio & personal/résumé](#freelancer-portfolio--personalrésumé)
  - [Photography](#photography)
  - [Music, entertainment & events](#music-entertainment--events)
  - [Blog, media & newsletter](#blog-media--newsletter)
  - [Gaming](#gaming)
  - [Church & community organizations](#church--community-organizations)
- [Conflict resolution: user preference vs. industry norm](#conflict-resolution-user-preference-vs-industry-norm)

## How to use these playbooks

1. **Read only the playbook(s) that match the discovered product type.** If the project spans two categories (a dental clinic selling whitening products; a SaaS with a developer API), read both and blend, letting the primary revenue path win ties.
2. **Playbooks constrain downstream choices.** When you later pick a style direction, palette, or layout, the playbook's "Design leanings" and "Anti-patterns" act as hard filters. A choice that violates an anti-pattern needs an explicit, articulated reason to survive.
3. **Playbooks override generic preferences when they conflict — but never silently.** If the user asked for brutalism and the project is a medical clinic, do not just build it, and do not just ignore them. Flag the conflict ("brutalist rawness reads as unprofessional in healthcare, where visitors are often anxious and scanning for safety cues"), then propose a compromise that keeps the *spirit* of the request (e.g., a stark grid, oversized type, and monochrome restraint — but with generous whitespace, a calm accent color, and softened interaction states). Let the user decide. The conflict table at the end of this file covers the common cases.
4. **Anti-patterns are the highest-value content here.** When reviewing your own output, check it against the anti-pattern list for the category before showing the user.

## Playbooks

### B2B SaaS

- **Visitor mindset:** an evaluator (often not the final buyer) asking "does this solve my team's problem, and can I justify it internally?" They fear wasted evaluation time and vendor lock-in.
- **Must-haves:**
  - Outcome-focused hero with product screenshot or short demo.
  - Pricing page (even if "contact us" tiers).
  - Social proof (logos, case studies).
  - Feature-to-benefit sections.
  - Clear trial/demo CTA.
  - Security/compliance page for upmarket buyers.
- **Trust signals:** recognizable customer logos, case studies with concrete numbers, SOC 2/GDPR badges, G2/Capterra ratings, a real changelog or blog showing the product is alive.
- **Conversion pattern:** primary CTA is "Start free trial" or "Book a demo" — repeated after every major scroll section, with a low-friction secondary path (watch demo video) for evaluators not ready to commit.
- **Design leanings:** clean, confident, generous whitespace; one strong brand color against neutral grounds; real product UI shown honestly. Exemplars: linear.app (dark, product-first), notion.com (friendly, illustration-led), stripe.com (gradient restraint, dense but ordered).
- **Anti-patterns:**
  - Feature lists without outcome framing ("Kanban boards, Gantt charts" instead of "ship on time").
  - Hiding pricing entirely when the product is self-serve.
  - Abstract 3D blob illustrations instead of the actual product.
  - Five competing CTAs in the hero.
  - Jargon walls ("synergize your workflow orchestration").
  - Fake urgency banners on a considered B2B purchase.
- **Copy tone:** confident, concrete, outcome-first; write to the practitioner, not the press release.

### Developer tools & API products

- **Visitor mindset:** a skeptical engineer who wants to see the code, judge the docs, and try it without talking to sales. Marketing fluff actively repels them.
- **Must-haves:**
  - Code sample in or near the hero (real, runnable, syntax-highlighted).
  - Prominent docs link in the nav.
  - Quickstart that gets to "hello world" in minutes.
  - Transparent pricing with a free tier.
  - SDK/language support list.
  - Status page link.
- **Trust signals:** excellent documentation (the product IS the docs), GitHub presence with stars/activity, uptime/status transparency, changelog, engineering blog with real depth, logos of companies whose engineers are respected.
- **Conversion pattern:** "Get API key" / "Read the docs" — the funnel is self-serve activation, not a demo call. Reduce every step between landing and first successful API call.
- **Design leanings:** dark themes and monospace accents are native here; terminal aesthetics, precise grids, restrained color. Exemplars: stripe.com/docs (the docs benchmark), vercel.com (stark black/white), tailwindcss.com (shows the product by being it).
- **Anti-patterns:**
  - Stock photos of people pointing at screens.
  - Marketing copy where a code sample should be.
  - Docs behind a signup wall.
  - Fake or pseudo-code in the hero that wouldn't actually run.
  - Light-only theme with no dark mode.
  - Burying the free tier to force sales contact.
- **Copy tone:** technically precise, zero fluff; respect the reader's intelligence.

### AI products & startups

- **Visitor mindset:** curious but fatigued — they've seen a hundred "AI-powered" landing pages and want proof this one actually does something, plus reassurance about data handling.
- **Must-haves:**
  - An interactive demo, real output examples, or an embedded playground (show, don't claim).
  - Clear "what it does" in one sentence.
  - Data privacy / model usage statement.
  - Pricing.
  - Honest capability boundaries.
- **Trust signals:** live demo that works, real customer results, transparency about model behavior and limitations, security posture (where does my data go?), team credibility for research-heavy products.
- **Conversion pattern:** "Try it now" with minimal or no signup friction — the product experience is the pitch. Secondary: waitlist or demo call for enterprise.
- **Design leanings:** clean and calm outperforms sci-fi; the current strong pattern is warm minimalism or serif-accented editorial calm that says "considered, trustworthy." Exemplars: anthropic.com (editorial warmth), openai.com (restrained, content-first).
- **Anti-patterns:**
  - Glowing neural-network brain imagery and circuit-board clichés.
  - Sparkle emoji as a design system.
  - Claiming AGI-adjacent magic the product can't deliver.
  - Purple-gradient-on-dark used identically by every competitor (differentiate or you're wallpaper).
  - No answer to "what happens to my data?".
  - A static screenshot when the product could be demoed live.
- **Copy tone:** plain-spoken and specific about capability; understate rather than oversell.

### Fintech & banking

- **Visitor mindset:** "can I trust these people with my money?" Every design decision is read as a proxy for operational competence. One typo costs more here than anywhere.
- **Must-haves:**
  - Regulatory/licensing info (FDIC, FCA, licenses) visible in the footer at minimum.
  - Security explanation page.
  - Transparent fee structure.
  - Clear onboarding steps.
  - Real support channels (not just a chatbot).
- **Trust signals:** regulatory badges and partner-bank disclosure, security architecture explained in plain language, established investor/press logos, real human support availability, precise legal footer.
- **Conversion pattern:** "Open an account" / "Get started" — but the funnel must feel deliberate, not pushy; over-aggressive CTAs read as scammy in finance.
- **Design leanings:** precision and calm: deep blues, greens, restrained neutrals; strong typographic hierarchy; data visualized cleanly. Modern fintech allows more personality than legacy banks but never at the cost of solidity. Exemplars: mercury.com (elegant restraint), wise.com (bold green but rigorously clear about fees).
- **Anti-patterns:**
  - Get-rich imagery (rockets, stacks of cash, sports cars) — reads as a scam.
  - Hiding fees behind signup.
  - Countdown timers or scarcity tactics on financial products.
  - Playful Comic-Sans-adjacent typography.
  - Dark patterns in account flows (regulators and users both punish these).
  - Vague security claims ("bank-level encryption") with no substance behind them.
- **Copy tone:** clear, exact, calm; explain fees and risk like a fiduciary, not a hype machine.

### Crypto & web3

- **Visitor mindset:** ranges from degens to institutions, but all arrive pattern-matching for rug-pulls. The category's baseline trust is negative; the design's job is to counteract that.
- **Must-haves:**
  - What the protocol/product actually does in plain language.
  - Audit reports linked prominently.
  - Team or governance transparency.
  - Documentation.
  - Tokenomics/fees stated clearly.
  - Working links to contracts and repos.
- **Trust signals:** named security audits (with links to the actual reports), open-source repos, TVL/usage stats from verifiable sources, established backers, longevity signals (founded date, uptime).
- **Conversion pattern:** "Launch app" (for protocols) or "Get started" — the marketing site is a credibility layer in front of the dApp; keep the two visually consistent so the handoff doesn't feel like a phishing redirect.
- **Design leanings:** two viable lanes: (a) institutional-clean to court serious money (coinbase.com), or (b) precise technical-brutalist for protocol-native audiences (uniswap.org). Pick one lane; don't straddle.
- **Anti-patterns:**
  - Laser-eyes, rockets, and moon imagery (instant scam-pattern match).
  - Anonymous team with no governance explanation.
  - APY numbers in the hero with no risk disclosure.
  - Broken or placeholder links (fatal in a category where phishing is rampant).
  - Dense jargon with no plain-language layer for newcomers.
  - Dark-glow gradient template indistinguishable from a thousand rug-pulls.
- **Copy tone:** precise and risk-honest; hype vocabulary is a negative trust signal here.

### Healthcare & medical practice

- **Visitor mindset:** often anxious, possibly in pain, frequently older or searching on behalf of a family member. They want reassurance, competence, and a fast path to an appointment.
- **Must-haves:**
  - Appointment booking (or phone number) reachable in one tap from anywhere.
  - Location(s) with parking/transit info.
  - Insurance accepted.
  - Provider bios with photos and credentials.
  - Conditions/services treated.
  - Patient portal link.
- **Trust signals:** provider credentials and board certifications, real photos of staff and facility (not stock), patient reviews, hospital affiliations, clear privacy posture, accessibility of the site itself (WCAG matters doubly here — the audience skews older and less able).
- **Conversion pattern:** "Book an appointment" / "Call now" — sticky and persistent; secondary funnel for new-patient info (forms, insurance, what to expect).
- **Design leanings:** calm blues, greens, soft neutrals; generous type sizes (16px+ body, larger for older audiences); warm real photography; unambiguous navigation. Exemplars: onemedical.com (warm, human, modern), mayoclinic.org (authoritative information architecture).
- **Anti-patterns:**
  - Red as a primary color — reads as emergency/blood in a medical context.
  - Stock photos of models in lab coats (patients can tell, and it erodes trust).
  - Burying the phone number or making booking a multi-page hunt.
  - Medical jargon without plain-language explanation.
  - Autoplaying video with sound.
  - Trendy low-contrast gray-on-white text that older patients cannot read.
- **Copy tone:** warm, plain-language, reassuring; explain like a good doctor talks to a patient.

### Dental & specialty clinics

- **Visitor mindset:** dental anxiety is real and common — many visitors are actively afraid. Cosmetic-leaning visitors additionally want aesthetic proof; everyone wants price transparency for uninsured procedures.
- **Must-haves:**
  - Online booking.
  - Services with plain-language descriptions.
  - Pricing or financing info for major procedures.
  - Before/after gallery for cosmetic work.
  - "what to expect at your first visit," insurance and payment options.
  - Team photos.
- **Trust signals:** dentist credentials and continuing education, genuine patient reviews (Google rating embedded), real office photos showing a clean modern space, sedation/comfort options explicitly addressed, before/after results.
- **Conversion pattern:** "Book online" persistent in header + mobile sticky bar; secondary CTA for a free consult on high-ticket cosmetic services.
- **Design leanings:** brighter and friendlier than general medical — clean whites, aqua/teal, warm accents; smiles in photography (authentic, not stock-perfect). Exemplar: hellotend.com (spa-like reframing of the dental visit).
- **Anti-patterns:**
  - Graphic procedure close-ups (drills, extractions, open mouths mid-surgery) that trigger the exact anxiety keeping people away.
  - Clip-art tooth mascots that undercut clinical credibility.
  - Hiding all pricing on procedures people comparison-shop.
  - A booking flow that ends in "we'll call you back".
  - Neglecting the mobile experience when most bookings are mobile.
- **Copy tone:** friendly and calming; acknowledge anxiety directly ("nervous? here's how we help").

### Legal

- **Visitor mindset:** stressed, often in a crisis (arrest, divorce, injury, dispute), evaluating whether this firm is competent and whether they can afford it. Gravitas and clarity win.
- **Must-haves:**
  - Practice areas clearly enumerated.
  - Attorney bios with credentials and bar admissions.
  - Consultation CTA (free consult if offered — say so).
  - Office location(s).
  - Results/case outcomes where bar rules permit.
  - Fee structure explanation (hourly/contingency/flat).
- **Trust signals:** bar admissions, years in practice, notable results or settlements, peer recognitions (Super Lawyers, Chambers), professional photography of actual attorneys, published articles demonstrating expertise.
- **Conversion pattern:** "Schedule a consultation" — phone prominent for urgent practice areas (criminal, injury); an intake form with realistic response-time promise for the rest.
- **Design leanings:** serif typography, deep navy/charcoal/burgundy palettes, disciplined layouts, quality photography. Modern firms can be clean and editorial rather than stuffy — restraint reads as confidence. Exemplars: wsgr.com (modern corporate), cravath.com (heritage authority).
- **Anti-patterns:**
  - Playful rounded fonts and pastel palettes that undermine gravitas.
  - Gavel/scales-of-justice stock clichés on every page.
  - Guarantee language ("we win every case") that violates bar ethics rules.
  - Walls of unreadable legalese on a site meant to attract laypeople.
  - Aggressive TV-lawyer styling (flames, bold-red ALL CAPS) unless that is genuinely the firm's market position.
  - Missing attorney photos — people hire a person, not a logo.
- **Copy tone:** authoritative but human; plain English explanations of legal situations, zero condescension.

### Accounting & consulting

- **Visitor mindset:** a business owner or executive asking "do these people understand businesses like mine, and are they worth the fee?" Competence signaling is everything; flash is suspect.
- **Must-haves:**
  - Services broken down by client type or problem (not by internal org chart).
  - Team credentials (CPA, certifications).
  - Industries served.
  - Case studies or client results.
  - Clear engagement/contact path.
  - Thought-leadership content.
- **Trust signals:** professional certifications, named client industries with outcomes ("cut close time from 10 days to 3"), longevity, publications and speaking, association memberships.
- **Conversion pattern:** "Book a consultation" or "Get in touch" — a considered-purchase funnel where content (guides, insights) nurtures until the visitor is ready.
- **Design leanings:** structured, editorial, typographically confident; navy/slate/forest palettes with one warm accent; data and diagrams presented cleanly. Exemplars: mckinsey.com (editorial authority), pilot.com (approachable modern accounting).
- **Anti-patterns:**
  - Describing services in internal jargon ("assurance and advisory solutions") instead of client problems.
  - Stock photos of handshakes and skyline boardrooms.
  - No named humans anywhere (relationship businesses need faces).
  - Burying "how engagements work and roughly what they cost" so prospects must cold-call to learn anything.
  - A blog last updated three years ago (worse than none).
- **Copy tone:** measured, insightful, client-problem-first; demonstrate expertise by teaching, not claiming.

### Real estate

- **Visitor mindset:** making the largest transaction of their life; buyers want inventory and neighborhood truth, sellers want proof you can get top dollar. Photography quality is read as marketing competence.
- **Must-haves:**
  - Property search or featured listings with large high-quality photos.
  - Agent/team profiles.
  - Sold results and testimonials.
  - Neighborhood/area guides.
  - Valuation or "what's my home worth" lead capture.
  - Direct contact (call/text/WhatsApp).
- **Trust signals:** sales volume and recent solds, years in market, hyperlocal knowledge demonstrated in content, professional listing photography, client testimonials with names and neighborhoods.
- **Conversion pattern:** dual funnel — buyers: search/browse → inquire on a listing; sellers: home-valuation lead magnet → listing consultation. Both need fast, human follow-up promises.
- **Design leanings:** photography-led with restrained UI that gets out of the image's way; sophisticated neutrals with a single luxury accent for high-end markets. Exemplars: compass.com (clean, search-first), sothebysrealty.com (luxury photographic restraint).
- **Anti-patterns:**
  - Tiny, dark, or watermark-slathered listing photos (the photos ARE the product).
  - Listings that are stale or say "sold" with no date — signals a dead site.
  - Auto-playing drone-video heroes that delay the search bar.
  - Agent glamour-shot hero with the actual inventory buried.
  - Forcing registration before showing any listings (kills top-of-funnel trust).
- **Copy tone:** knowledgeable and local; sell the neighborhood and the outcome, not adjectives.

### Trades, construction & local services

Covers plumbers, electricians, HVAC, roofing, cleaning, landscaping, general contractors, and similar local service businesses.

- **Visitor mindset:** often has an urgent problem (burst pipe, dead furnace) or is collecting 2–3 quotes. They decide in seconds: "does this company serve my area, look legit, and can I reach them right now?"
- **Must-haves:**
  - Phone number tappable in the header and a sticky mobile call button.
  - Service area stated explicitly (cities/zips).
  - Services listed plainly.
  - License and insurance numbers.
  - Emergency availability if offered.
  - Quote-request form with response-time promise.
  - Photos of real jobs and real crew.
- **Trust signals:** license #, bonded/insured statement, years in business, Google review rating embedded, before/after job photos, real trucks and uniformed crew (not stock), local landmarks or neighborhood names in content.
- **Conversion pattern:** "Call now" for emergencies + "Get a free quote" form for planned work; both above the fold; the phone number IS the primary CTA on mobile.
- **Design leanings:** sturdy, high-contrast, unpretentious; bold sans-serif headings, brand colors that match the trucks; big touch targets. Function over fashion — visitors are on a phone, possibly standing in water.
- **Anti-patterns:**
  - Hiding the phone number in a contact page (each extra tap loses emergency callers).
  - Stock photos of models in spotless hard hats — locals recognize fake instantly.
  - No service area listed, forcing visitors to call just to learn you don't cover them.
  - Parallax animations and heavy heroes on the slow mobile connections these users have.
  - A quote form with 15 required fields.
  - No reviews visible when the competitor down the road shows 4.9 stars.
- **Copy tone:** direct, dependable, zero fluff: what you do, where, how fast, and what it roughly costs.

### Restaurant & café

- **Visitor mindset:** "what's the food, when are you open, where are you, can I book?" — usually on a phone, often standing on a sidewalk or deciding among three tabs. Answer in seconds or lose them.
- **Must-haves:**
  - Menu as real HTML text (not PDF, not images) — reachable in one tap from the homepage.
  - Hours — visible without scrolling or hunting.
  - Address with map link.
  - Reservation or order-online path, one tap from anywhere on the site.
  - Food photography.
  - Dietary notation (V/GF).
  - Phone number.
- **Trust signals:** appetizing original food photography, press mentions, chef/story authenticity, an up-to-date menu with prices (a stale menu signals a closed or careless restaurant), embedded reviews.
- **Conversion pattern:** "Reserve a table" / "Order online" persistent in the header and a sticky mobile bar; the entire homepage funnels to menu → book.
- **Design leanings:** the food photography carries the site; typography sets the register (elegant serif for fine dining, warm hand-touched sans for cafés); palettes drawn from the interior and the plates. Exemplars: noma.dk (restrained fine dining), sweetgreen.com (fresh, ordering-first).
- **Anti-patterns:**
  - PDF-only menus (unreadable on mobile, invisible to search, ignored by accessibility tools).
  - Autoplay background music or video with sound.
  - Hours buried on a contact page.
  - Splash screens or "enter site" gates.
  - Menus without prices.
  - Flash-era animations and slow heroes on what is fundamentally a utility lookup.
  - Letting third-party ordering widgets clash visually with the brand.
- **Copy tone:** appetizing and brief; let dish names and photos do the selling.

### Hotel & travel

- **Visitor mindset:** dreaming and comparing — usually cross-shopping against an OTA (Booking, Expedia) tab. The site must sell the *experience* and make direct booking obviously worth it.
- **Must-haves:**
  - Booking widget (dates/guests) above the fold.
  - Room types with generous photo galleries and real rates.
  - Location and "what's nearby," amenities.
  - Direct-booking incentive stated plainly (best-rate guarantee, free breakfast).
  - Cancellation policy findable.
- **Trust signals:** professional but honest photography (rooms as they actually are), review scores, awards, clear policies, secure-booking cues, responsive contact.
- **Conversion pattern:** persistent "Book now" with a date-picker; every page (rooms, dining, spa) routes back to booking with context preserved.
- **Design leanings:** immersive photography-first with editorial typography; palette pulled from the property (coastal blues, desert terracottas); whitespace signals luxury. Exemplars: acehotel.com (personality-rich boutique), aman.com (extreme photographic restraint).
- **Anti-patterns:**
  - Booking engine that jarringly hands off to an off-brand third-party page (feels like a scam mid-checkout).
  - Stock photography that overpromises and produces bad reviews.
  - Hiding rates until deep in the funnel.
  - Auto-playing full-screen video that makes finding the booking widget a chore.
  - No mobile optimization of the booking flow itself.
  - Burying the direct-booking benefit so visitors return to the OTA.
- **Copy tone:** transportive but concrete; sell the morning light and the ten-minute walk to the beach.

### Fitness & gym

- **Visitor mindset:** motivated but intimidated — "will I fit in there?" is the silent question. They want schedule, price, location, and a low-risk way to try it.
- **Must-haves:**
  - Class schedule (live, current).
  - Membership pricing or at least ranges.
  - Trial/first-class-free offer.
  - Location + parking.
  - Coach/trainer bios.
  - Real member photos.
  - "what to expect your first visit.".
- **Trust signals:** real members of varied body types and ages in photos (not just shredded models — that intimidates the exact people deciding), coach certifications, transformation stories or testimonials, community feel on display.
- **Conversion pattern:** "Claim your free trial / first class" — the single conversion that matters; schedule and pricing exist to remove blockers on the way to it.
- **Design leanings:** energetic and high-contrast: bold condensed type, black/white with an electric accent, dynamic photography of movement. Boutique studios can go warmer and softer (yoga/pilates). Exemplars: barrys.com (high-energy dark), equinox.com (fitness-as-luxury).
- **Anti-patterns:**
  - Hiding all pricing behind "come in and talk to us" (reads as a hard-sell trap and kills the comparison-shopper).
  - Intimidation-only imagery that filters out beginners — the growth market.
  - An out-of-date schedule (worse than none).
  - Infinite-scroll motivational content with the trial CTA buried.
  - Making cancellation info impossible to find (breeds distrust before signup).
- **Copy tone:** energizing and inclusive; challenge without intimidation.

### Beauty, salon & spa

- **Visitor mindset:** part treat, part trust exercise — "will they get *my* hair/skin right?" They browse work, check prices, and want frictionless booking.
- **Must-haves:**
  - Online booking integrated (not "call to book").
  - Full service menu with prices.
  - Portfolio of actual work (their clients, not stock).
  - Stylist/therapist profiles with individual booking.
  - Location and hours.
  - Cancellation policy.
- **Trust signals:** genuine before/after and portfolio galleries, stylist specializations (curly hair, balayage, sensitive skin), review ratings, product lines used, hygiene/certification notes for medi-spa services.
- **Conversion pattern:** "Book now" everywhere → service → stylist → time; keep the booking flow inside the brand experience as much as the platform allows.
- **Design leanings:** soft, editorial, aspirational: muted neutrals, blush/sage/cream palettes, elegant serif or refined sans, generous imagery. Exemplars: glossier.com (soft minimal beauty language), drybar.com (playful, service-menu clarity).
- **Anti-patterns:**
  - No prices on the service menu (price-shoppers just leave; nobody calls to ask).
  - Stock photos of models instead of the salon's actual work — the portfolio is the product.
  - Booking that dead-ends in a phone number after promising online scheduling.
  - Over-filtered images that misrepresent results.
  - Cluttered layouts fighting the serenity the business sells.
- **Copy tone:** warm, indulgent, confidence-giving; "you, but on your best day."

### Fashion e-commerce

- **Visitor mindset:** shopping visually and emotionally, deciding in flicks of the thumb; fit anxiety and return-hassle fear are the two conversion killers.
- **Must-haves:**
  - Large product photography (multiple angles, on-body, zoom).
  - Size guide with real measurements.
  - Model size/height noted ("wears size M, 5'9"").
  - Visible price and shipping/returns policy near the buy button.
  - Filters that match how people shop (size in stock, color).
  - Wishlist.
- **Trust signals:** honest product photos plus customer photos/reviews with fit feedback, transparent returns, sizing consistency notes, sustainability/production claims backed by specifics if made.
- **Conversion pattern:** browse → product page → "Add to bag" with size selected; recover with cart persistence and low-friction guest checkout; email capture via style content, not an instant popup.
- **Design leanings:** photography IS the design; UI recedes to near-invisibility — thin type, monochrome chrome, whitespace. Exemplars: ssense.com (stark editorial), everlane.com (transparent-basics clarity).
- **Anti-patterns:**
  - A newsletter popup before the visitor has seen a single product.
  - Hiding shipping costs until checkout (top cart-abandonment cause).
  - Tiny non-zoomable product images.
  - Out-of-stock sizes discovered only at the last step.
  - Carousel-only heroes that hide the actual catalog.
  - Vague size guides ("S, M, L" with no measurements) for a category where fit is the #1 return reason.
- **Copy tone:** editorial and sensory but brief; fabric, fit, and feel over superlatives.

### General e-commerce & DTC

- **Visitor mindset:** "is this product good, is this price fair, will it arrive, and can I return it?" — four questions, answered fast, or they're back to the marketplace tab.
- **Must-haves:**
  - Clear product photography and demo video where relevant.
  - Price always visible.
  - Reviews with volume.
  - Shipping cost/time before checkout.
  - Returns policy in one click.
  - Trust badges at payment.
  - Mobile-first checkout with express pay (Apple/Google Pay).
- **Trust signals:** review count and recency, UGC photos, concrete guarantees ("60-night trial"), press logos, responsive support entry points, an About page with real humans for brand-driven DTC.
- **Conversion pattern:** land → product → add to cart → checkout in as few taps as possible; every added step measurably bleeds conversion. Bundles/subscriptions offered without dark-pattern pre-selection.
- **Design leanings:** clean product-forward layouts, strong benefit-led headlines, brand color used to make the buy button unmissable. Exemplars: allbirds.com (sustainable-simple), casper.com (benefit-led storytelling).
- **Anti-patterns:**
  - Hiding the price behind clicks or "add to cart to see price" (kills conversion and trust simultaneously).
  - Fake countdown timers and fabricated "3 left!" scarcity (users recognize it; brands get named-and-shamed).
  - Pre-checked subscription upsells.
  - Checkout requiring account creation.
  - Burying the returns policy.
  - Slow image-heavy pages on mobile where most traffic lives.
- **Copy tone:** benefit-first and concrete; answer objections in the copy before they're asked.

### Luxury goods

- **Visitor mindset:** buying meaning, scarcity, and craft — not utility. They expect to be seduced, not sold to; anything that smells of discount retail breaks the spell.
- **Must-haves:**
  - Exceptional photography and art direction (the bar is editorial print).
  - Craft/heritage storytelling.
  - Restrained product presentation.
  - Discreet purchase or inquiry path.
  - Boutique/stockist locator.
  - Impeccable typography and detail polish.
- **Trust signals:** heritage and provenance, craftsmanship detail (materials, hours, ateliers), editorial press, the *absence* of hard-sell mechanics — restraint itself is the trust signal.
- **Conversion pattern:** slow funnel: immerse → desire → inquire/purchase. CTAs are quiet ("Discover," "Enquire"). For true high-end, the site's job may be to drive boutique visits, not carts.
- **Design leanings:** vast whitespace, refined serif or immaculate grotesque type, near-monochrome palettes with material accents (gold, deep green), cinematic imagery, slow deliberate motion. Exemplars: hermes.com (playful yet exacting), aesop.com (restraint as identity), rolex.com (heritage precision).
- **Anti-patterns:**
  - Sales banners, discount codes, and urgency tactics (instantly repositions the brand as mass-market).
  - Cluttered grids showing everything at once — scarcity of presentation mirrors scarcity of product.
  - Cheap stock photography anywhere.
  - Aggressive popups.
  - Sloppy typography or inconsistent spacing (in luxury, detail flaws are brand flaws).
  - Loud animated gimmicks that read as trying too hard.
- **Copy tone:** spare, evocative, assured; never begs, never shouts.

### Education & courses

- **Visitor mindset:** "will this actually get me the outcome (skill, job, grade, certificate), and is it worth the time and money?" Skepticism of course-selling hype is high.
- **Must-haves:**
  - Curriculum/syllabus visible in detail.
  - Instructor credentials.
  - Outcomes and testimonials (jobs landed, scores improved).
  - Pricing with refund policy.
  - Sample lesson or free preview.
  - Time commitment stated honestly.
  - FAQ.
- **Trust signals:** instructor real-world credibility, student results with specifics, accreditation/certification value explained, preview content that demonstrates teaching quality, cohort sizes and support structure.
- **Conversion pattern:** "Enroll" / "Start free" — with the free sample as the trust bridge; email capture via a genuinely useful lead resource for those not ready.
- **Design leanings:** clear, encouraging, structured: friendly but organized layouts, progress-and-path visual metaphors, optimistic palette with strong readability. Exemplars: coursera.org (institutional clarity), masterclass.com (cinematic instructor-led aspiration).
- **Anti-patterns:**
  - Income-claim hype ("students make $10k/month!") — regulatory risk and instant distrust.
  - Hiding the actual curriculum so buyers can't judge substance.
  - Fake countdown "enrollment closes tonight" that resets on refresh.
  - Wall-of-text sales pages with fifteen testimonial sliders (the internet-marketer template educated buyers now flee).
  - No refund policy stated.
  - Burying total time commitment.
- **Copy tone:** encouraging, honest about effort required; teach a little in the copy itself.

### Kids & family

- **Visitor mindset:** two audiences at once — the child (fun, color, characters) and the parent (safety, values, screen-time guilt, price). The parent holds the wallet and the veto.
- **Must-haves:**
  - Instant clarity on age range.
  - Safety/privacy commitments (COPPA compliance for kids' digital products).
  - Parent-facing information section.
  - Vibrant but navigable design.
  - Educational or developmental value stated.
  - Pricing.
- **Trust signals:** safety certifications and privacy plain-talk, educator/pediatric endorsements, parent testimonials, transparent content policies, awards (Parents' Choice etc.).
- **Conversion pattern:** parent-directed CTA ("Try free," "Shop," "Find a class") supported by kid-appeal visuals; never dark-pattern the child into pestering flows.
- **Design leanings:** bright saturated palettes, rounded generous shapes, playful illustration and characters, chunky type — but with genuine information hierarchy underneath for parents. Exemplars: pbskids.org (playful and safe), duolingo.com (character-driven friendliness).
- **Anti-patterns:**
  - Manipulative mechanics aimed at children (loot-box psychology, "ask your parents!" nag loops) — ethically wrong and legally dangerous.
  - Garish everything-is-shouting layouts that parents read as cheap.
  - Ignoring the parent layer entirely.
  - Scary or ambiguous content with no age guidance.
  - Data collection on kids without clear consent flows.
  - Tiny unreadable "parents click here" links.
- **Copy tone:** playful for kids, plainly reassuring for parents — two registers, clearly separated.

### Nonprofit & charity

- **Visitor mindset:** emotionally moved but wary — "will my money actually reach the cause?" Donor skepticism about overhead is the central objection to answer.
- **Must-haves:**
  - Donate button persistent in the header (high contrast, one tap to a working form).
  - Impact numbers ("$50 = clean water for one person for a year").
  - Financial transparency (annual report, % to programs).
  - Concrete stories of beneficiaries told with dignity.
  - Ways to help beyond money (volunteer, share).
- **Trust signals:** charity ratings (Charity Navigator, GuideStar seals), audited financials linked, specific outcome metrics, named partners, board and leadership visible.
- **Conversion pattern:** story → impact equation → "Donate" with suggested tiers tied to outcomes; monthly giving offered prominently (recurring revenue matters more than one-offs); minimal-friction payment.
- **Design leanings:** photography-led storytelling with dignified, hopeful imagery; clean modern layout that itself signals funds well-spent (dated design implies dated operations, but overtly lavish design triggers overhead suspicion — aim between). Exemplars: charitywater.org (radical transparency as brand), wwf.org (mission-driven visual power).
- **Anti-patterns:**
  - Poverty-porn imagery that strips subjects of dignity (increasingly damages trust and violates modern NGO ethics codes).
  - Donate flows with surprise fees or confusing recurring pre-checks.
  - Vague impact claims ("help us make a difference") with no numbers.
  - Burying financials.
  - A donate button that leads to a clunky third-party form styled nothing like the site.
- **Copy tone:** hopeful and concrete; the donor is the hero enabling the outcome, the beneficiary is portrayed with dignity.

### Creative agency & studio

- **Visitor mindset:** a potential client silently asking "are they better than us at this, and can I afford them?" — plus peers and award juries. The site is the portfolio's first item.
- **Must-haves:**
  - Case studies with process and results (not just pretty finals).
  - Client list.
  - Services/capabilities.
  - Team and culture glimpse.
  - Contact path that sets engagement expectations.
  - The site itself demonstrating craft.
- **Trust signals:** name-brand clients, awards, results metrics inside case studies, press, the sheer quality of the site's own execution — here, the medium genuinely is the message.
- **Conversion pattern:** work → capabilities → "Start a project" contact; qualify leads with a brief-shaped contact form (budget range, timeline) to filter serious inquiries.
- **Design leanings:** this is the one category where experimentation is the norm: bold type, unconventional grids, motion, WebGL — as long as performance and usability survive. Exemplars: instrument.com (polished interactive craft), pentagram.com (work-first restraint).
- **Anti-patterns:**
  - Style over legibility — visitors who can't find the work or the contact leave.
  - A 20MB hero that takes 8 seconds to load (a self-own for a digital agency).
  - Case studies that show only finals with no problem/process/result narrative — clients buy thinking, not JPEGs.
  - Cleverness that hides navigation entirely.
  - Showing 40 mediocre projects instead of 8 great ones.
  - Broken experimental features on mobile.
- **Copy tone:** confident and distinct; the voice is a work sample too.

### Freelancer portfolio & personal/résumé

Covers independent designers/developers/writers seeking clients, and personal sites aimed at recruiters or general professional presence.

- **Visitor mindset:** a busy client or recruiter giving you 30 seconds: "what do you do, are you good, are you available, how do I contact you?"
- **Must-haves:**
  - One-line positioning statement above the fold ("I design mobile apps for fintech startups").
  - 3–6 best work samples or proof of work.
  - Availability status.
  - Contact method that works in one click (email visible, not just a form).
  - Résumé/CV download for job-seekers.
  - Links to living profiles (GitHub, LinkedIn, published work).
- **Trust signals:** real shipped work with your role stated, client/employer names, testimonials, writing or talks demonstrating expertise, a current "now" signal (recent project, updated date) proving the site isn't abandoned.
- **Conversion pattern:** work → about → "Email me" / "Book a call"; for résumé sites, funnel to the CV and LinkedIn. One primary action, not six.
- **Design leanings:** simple, fast, personality-forward; a distinctive typographic voice beats template-sameness; single accent color; the craft ceiling should match your discipline (a designer's portfolio is judged as a design work; a writer's needs beautiful typography, not WebGL).
- **Anti-patterns:**
  - Listing 15 skills at "90%" in skill-bar charts (meaningless and dated).
  - Hiding contact behind a form with no visible email.
  - Describing yourself in third person on a one-person site.
  - Showing every project ever instead of the best few.
  - Long autobiographical About before any work is shown.
  - For job-seekers, no downloadable résumé.
  - Buzzword soup ("passionate creative ninja") in place of a concrete positioning line.
- **Copy tone:** first person, specific, human; say what you do and prove it immediately.

### Photography

- **Visitor mindset:** judging within three images whether the style matches their taste and event/brand; then checking price range and availability. The work must load fast and look flawless.
- **Must-haves:**
  - Curated galleries organized by genre (weddings, portraits, commercial).
  - Full-screen viewing.
  - Pricing or starting-price ranges.
  - Booking/inquiry form with date-availability question.
  - About-the-photographer with a portrait.
  - Client gallery delivery link if applicable.
- **Trust signals:** consistency of style across galleries (clients buy a look), full real weddings/shoots (not just ten hero shots — clients check consistency across a whole event), testimonials, publication features, professional presentation of licensing/print options.
- **Conversion pattern:** gallery immersion → investment/pricing page → "Check my date" inquiry form; respond-time promise on the form.
- **Design leanings:** near-invisible UI — white or black grounds, minimal type, images edge-to-edge; the layout is a frame, never a competitor. Site palette must stay neutral so it never fights the photographs' color grading.
- **Anti-patterns:**
  - Slow-loading uncompressed galleries (the single most common failure — optimize aggressively).
  - Music autoplay.
  - Heavy watermarks defacing the work.
  - Showing 60 images per gallery instead of a ruthless 15–20 (weak images dilute strong ones).
  - No pricing signal at all, generating unqualified inquiries and ghosting.
  - A busy decorative theme that visually competes with the photos.
- **Copy tone:** minimal and personal; let the images speak, use words for logistics and warmth.

### Music, entertainment & events

- **Visitor mindset:** a fan wanting tour dates and tickets, or a first-timer wanting to hear/see the act instantly. Both decide fast: play me something or show me the date, now.
- **Must-haves:**
  - Upcoming dates/shows with direct ticket links (auto-updating from a source of truth).
  - Embedded music/video that plays in one tap.
  - Latest release front and center.
  - Mailing list signup.
  - Press kit/booking contact.
  - Merch link.
  - Social links.
- **Trust signals:** current tour dates (stale dates read as "broken up"), streaming/social proof, press quotes, professional live photography and video quality.
- **Conversion pattern:** "Get tickets" per event + email/SMS list capture (the only fan channel the artist owns); merch as secondary revenue funnel.
- **Design leanings:** identity-driven and era-specific — the site is an extension of the current album/tour art; bold display type, atmospheric imagery, dark themes common; motion welcome if performance holds. Exemplars: coachella.com (festival maximalism), boilerroom.tv (raw utility-cool).
- **Anti-patterns:**
  - Autoplaying audio (universally hated, tab-closed instantly — always user-initiated playback).
  - Tour dates that are outdated or lead to dead ticket links.
  - Burying the listen/watch action beneath biography.
  - Splash pages before content.
  - Flyer-quality event pages missing time/venue/age/price basics.
  - Ignoring the mailing list, leaving the fanbase hostage to platform algorithms.
- **Copy tone:** in the artist's voice, brief; dates, links, and vibe.

### Blog, media & newsletter

- **Visitor mindset:** arrived for one article from search or social; the site has one chance to convert a drive-by reader into a subscriber. Reading comfort is the entire product.
- **Must-haves:**
  - Exceptional reading typography (18–21px body, 60–75 character measure, real line-height).
  - Subscribe CTA present but polite.
  - Clear article metadata (author, date — critical for trust).
  - Related/next content paths.
  - Fast load.
  - Working RSS.
  - About/author pages.
- **Trust signals:** named authors with real bios, visible publication dates (undated content reads as SEO sludge), editorial consistency, citation/linking practice, an archive that shows longevity.
- **Conversion pattern:** article → inline or end-of-article subscribe (value proposition stated: what do I get, how often) → email capture; the aggressive-popup alternative trades long-term trust for a spike.
- **Design leanings:** typography-first, restrained chrome, strong hierarchy; distinctive editorial identity via type pairing and one accent. Exemplars: stratechery.com (pure reading focus), theverge.com (bold editorial identity).
- **Anti-patterns:**
  - Popup before the first paragraph is read (you've given no value yet).
  - Infinite interstitials, autoplay video, and ad-density that makes reading combat (readers leave and never return).
  - Undated articles.
  - 14px gray-on-gray body text.
  - Burying the actual content below three screens of hero and featured carousels.
  - Newsletter signup that doesn't say what or how often.
- **Copy tone:** the publication's editorial voice; headlines that inform rather than bait.

### Gaming

- **Visitor mindset:** a player deciding in seconds whether the game looks fun — they want gameplay footage, platform availability, and a wishlist/buy link; press and creators want assets.
- **Must-haves:**
  - Gameplay trailer above the fold (real gameplay, clearly labeled).
  - Platform badges and store links (Steam wishlist is the indie conversion metric).
  - Release date/status.
  - Screenshots.
  - System requirements for PC.
  - Press kit.
  - Community links (Discord).
- **Trust signals:** actual gameplay footage vs. pre-rendered cinematics honestly labeled, review scores/quotes, active Discord and dev-log cadence (signals the game isn't vaporware), studio track record.
- **Conversion pattern:** trailer → "Wishlist on Steam" / "Buy now" / platform store buttons; email or Discord capture for pre-launch communities.
- **Design leanings:** the game's own art direction drives everything — the site should feel like an artifact from the game world; dark themes dominate; bold display type matched to the game's genre register. Exemplars: supergiantgames.com (art-forward clarity), riotgames.com (polished ecosystem hub).
- **Anti-patterns:**
  - Hiding gameplay behind cinematic-only marketing (players distrust it and reviewers punish it).
  - No platform/store links visible without scrolling.
  - Heavy uncompressed backgrounds that stutter on the average player's machine — ironic and fatal.
  - Missing press kit (costs free coverage).
  - Dead community links or a "news" page last updated a year ago on an in-development title.
- **Copy tone:** in-world flavor welcome, but core facts (genre, platforms, date) stated plainly.

### Church & community organizations

- **Visitor mindset:** a newcomer nervously checking "would I belong here?" — they want service times, location, what to expect, and the vibe, before ever walking in. Members want events, sermons, and giving.
- **Must-haves:**
  - Service/meeting times and location above the fold.
  - "I'm new / plan a visit" page (what to wear, where to park, kids programs).
  - Sermon/talk archive or livestream.
  - Events calendar.
  - Online giving.
  - Staff/leadership with photos.
  - Contact.
- **Trust signals:** real photos of the actual congregation and building (diversity and warmth as it truly is), leadership transparency, clear statement of beliefs/values, financial accountability for giving, active recent content.
- **Conversion pattern:** "Plan your visit" for newcomers (the #1 conversion) + "Give" and "Watch" for members; each audience gets one clear path from the homepage.
- **Design leanings:** warm, welcoming, modern-clean; soft warm palettes, human photography, friendly rounded-but-not-childish type; contemporary churches skew toward polished media-brand aesthetics. Exemplars: life.church (media-brand polish), local congregations often do best with warm simplicity.
- **Anti-patterns:**
  - Service times buried anywhere but the top (the single most-sought fact).
  - Insider language ("join us in the CLC after second service") impenetrable to visitors.
  - Stock congregation photos that misrepresent the real community — newcomers feel the bait-and-switch in person.
  - Giving flows via sketchy third-party pages that don't match the site.
  - Outdated events calendar (signals a dying community).
  - Autoplay worship music.
- **Copy tone:** warm, welcoming, jargon-free; write to the nervous first-timer.

## Conflict resolution: user preference vs. industry norm

When the user's stated preference collides with a category norm, never silently override in either direction. Surface the tension in one or two sentences, explain the visitor-trust stakes, give your recommendation, and offer a compromise that honors the request's intent. The user always gets the final call.

| User wants | Industry context | Tension | Resolution to propose |
|---|---|---|---|
| Brutalism / raw aesthetic | Medical, legal, fintech | Rawness reads as unprofessional or unsafe where visitors are anxious and scanning for competence cues | Keep the brutalist skeleton (stark grid, oversized type, monochrome) but add generous whitespace, a calm accent, softened states; flag the risk, recommend the softened version |
| Dark theme | Local services, healthcare, kids | Older/stressed/mobile-in-sunlight audiences read dark UIs poorly; kids' brands lose warmth | Recommend light-first with a dark accent section (footer, feature band) so the vibe survives without the readability cost |
| Red as primary color | Healthcare, finance | Reads as emergency/blood in medical, loss/danger in finance | Shift to burgundy/coral/warm terracotta, or keep red strictly as a small accent; explain the association explicitly |
| Playful, quirky, animated | Legal, accounting, funeral, high-stakes B2B | Playfulness undermines gravitas where clients are in crisis or committing large budgets | Concentrate personality in micro-interactions and copy warmth while keeping structure and type authoritative |
| "Hide prices, make them contact us" | E-commerce, salons, gyms, courses | Hidden pricing kills conversion and reads as a hard-sell trap in self-serve categories | Show at least ranges/starting-at prices; reserve "contact us" for genuinely custom enterprise tiers; cite the drop-off risk |
| Maximalist, dense, everything above the fold | Luxury, photography, spa | Density destroys the scarcity and calm these categories sell | Propose editing to fewer, larger moments; if density is non-negotiable, contain it in an ordered grid with strict typographic discipline |
| Minimalist one-pager | Restaurants, churches, medical practices | These visitors need specific utility facts (menu, times, insurance) findable in one tap — extreme minimalism buries them | Keep the minimal aesthetic but with a persistent utility bar (hours/book/call) and anchor navigation; minimal ≠ information-hidden |
| Trend-chasing (glassmorphism, heavy 3D, scroll-jacking) | Trades, nonprofits, media | Slow, heavy effects punish the mobile/older/low-bandwidth audiences these categories depend on; scroll-jacking blocks utility reading | Apply the trend to one hero moment with graceful degradation; hold the rest of the page to fast, boring, reliable patterns |

If a conflict falls outside this table, apply the same protocol: name the industry norm, name the visitor cost of violating it, recommend a direction, and propose a compromise that preserves what the user actually liked about their original idea.
