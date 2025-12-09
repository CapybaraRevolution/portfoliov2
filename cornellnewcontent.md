# Cornell Case Study Content Rewrite

You are helping me rewrite the *content* of my Cornell University — SC Johnson College of Business case study page.

## IMPORTANT CONSTRAINTS

- Content-only. Do not propose technical refactors, component rewrites, new data models, or architecture changes.
- You may suggest light presentation patterns ONLY if it helps readability (e.g., 1 quote block, 1 collapsible "Nerdy" aside), but don't be prescriptive about implementation.
- Keep the writing: professional, factual, precise, clear. Small hints of dry humour are welcome, but don't overdo it.
- Minimize bullet overload. Use bullets as a break for clarity, not as the entire structure.
- Avoid heavy em-dash usage.
- Keep claims "safe-to-share" and directional. No confidential details. If a metric is directional, label it as such.

## GOAL FOR THE PAGE

Make this case study read like a story about creating clarity across complexity:

- big Goal statement up top
- clear problem ("the mess")
- what I owned + how I created clarity (system, rules, artifacts)
- practical AI as an accelerant (human-in-the-loop)
- outcomes (directional)
- learnings

## REQUIRED PRODUCT DECISIONS TO REFLECT IN THE COPY

- Include a subtle above-the-fold AI indicator (not a loud badge). Example: "AI-accelerated (human-reviewed)."
- Keep "Where AI helped" in the narrative, but frame it as practical and selective.

## DELIVERABLE

Replace the existing Cornell prose with the following revised copy. You can keep the existing images/figures; update captions if they feel off-tone. Keep headings with ids where helpful for navigation.

## NEW CORNELL COPY (v1)

[Hero]
Cornell University — SC Johnson College of Business

[Goal (big statement)]
Goal: Unify three distinct schools into one digital experience that feels coherent, findable, and maintainable.

(Optional goal detail)
This was not a visual refresh. It was a system-building job: shared navigation rules, shared page modules, and shared language, without sanding off each school's identity.

(Subtle AI indicator — above the fold)
AI-accelerated (human-reviewed): used to speed first drafts and consistency checks, never to "decide."

[Context]
In 2016, Cornell combined three business schools under the SC Johnson College of Business (Johnson, Nolan, and Dyson). By 2024, the web experience still behaved like three separate institutions: different navigation patterns, different terminology, and different page structures that made it harder than it should be to do basic tasks.

Prospective students were the clearest signal. They were trying to compare programs, understand admissions, and find requirements quickly. Instead, they kept running into mismatch: "same goal, different layout, different labels." That kind of inconsistency quietly erodes trust, and it's especially costly on high-intent journeys.

I joined the project via Briteweb to help diagnose the problem, align stakeholders, and design a system Cornell's internal team could own and evolve.

[The Mess / Challenge] (id: the-mess or challenge)
The core issue wasn't a lack of content. It was a lack of shared rules.

- Navigation changed depending on which school you were browsing.
- Identical concepts were labeled differently across sections.
- Page modules looked similar enough to feel "almost consistent," but behaved differently in ways that made users second-guess themselves.
- Internally, this created a design debt problem: every new page required re-deciding patterns that should have been settled once.

If a user needs a mental model of Cornell's org chart to find a program, the system has already lost.

Optional short bridge sentence:
The work ahead was less "make it prettier," more "make it predictable."

[My Role] (id: my-role)
I worked as a UX strategist and systems designer. My job was to turn a multi-stakeholder, multi-site reality into a coherent digital experience with rules the team could actually run with.

What I optimized for:

1. Alignment: getting stakeholders to agree on shared language and shared priorities.
2. Clarity: reducing interpretation gaps by making patterns explicit.
3. Maintainability: a module system and navigation rules that scale without redesigning the site every semester.

[How I Created Clarity / Approach] (id: how-i-created-clarity or approach)

I approached this like any other "merged product": start by understanding where users fall off, then build a system that prevents the same problems from reappearing.

1. Insight work (data-informed, human-interpreted)
We triangulated quantitative signals (Hotjar + GA) with qualitative observation to locate friction and validate what the data couldn't explain on its own.

The output wasn't a giant research deck. It was a practical map:

- the journeys that matter most (especially prospective students)
- the pages and modules that were creating drop-offs
- a clear "problem → hypothesis → design probe → success signal" trail

(Keep the existing "Nerdy" collapsible if you want, but rewrite the framing slightly to match tone.)
Suggested collapsible copy:
"Nerdy aside: We treated analytics like a map for where to look, and observation like a metal detector for the exact spot to dig."

1. Anchor decisions with personas + user stories
We defined and validated three core personas to keep decisions grounded, especially when stakeholder opinions diverged (which they will, because they're stakeholders).

The key benefit was speed with integrity: when the persona is clear, decisions stop being philosophical.

(Keep persona figure and caption; update caption to feel more "you.")
Caption suggestion:
"Personas kept debates short. Not because everyone agreed, but because we agreed who we were designing for."

1. Module design (system first)
We designed a library of reusable page modules (heroes, program cards, stats blocks, admissions CTAs, content sections) with:

- clear inputs
- clear variants
- rules for when to use what

This is where the consistency debt gets paid down. Once modules are stable, pages stop feeling like bespoke one-offs and start feeling like one product.

(Keep the module figure; update caption.)
Caption suggestion:
"One pattern, many contexts. Fewer decisions. Better consistency."

1. Navigation system (patterns + rules)
Navigation was treated as a system, not a set of menus.

We prototyped and iterated:

- global navigation
- sectional navigation
- in-page wayfinding

Then we documented naming and grouping rules tied to user tasks. The goal was simple: the same type of user should get the same type of path, regardless of which school's content they started on.

(Keep the nav flow figures; keep captions factual and plain-language.)

1. Handoff (so it lives beyond us)

The work only matters if it survives the handoff.

We organized the design system and documentation so Cornell's team could:

- onboard quickly
- implement predictably
- evolve the system without re-breaking consistency

This meant clean component structure, naming, spacing/token logic, and "PRD-lite" specs that reduced interpretation gaps.

[Practical AI / Where AI Helped] (id: where-ai-helped)
We used AI like an assistant, not an authority: fast first drafts, faster consistency checks, and more time for the real work (stakeholder alignment and simplifying journeys).

Human-in-the-loop, safety-first:

- IA clustering support: accelerated early grouping and surfaced naming collisions. We made the decisions.
- Story synthesis: drafted first-pass user stories from research notes, then edited for accuracy and tone.
- Terminology linting: flagged inconsistent labels between schools so we could standardize intentionally.
- Doc automation: generated checklists from module specs to speed QA and reduce missed edge cases.

The result was not "AI magic." It was fewer hours spent on admin work and more time spent making the system coherent.

[Outcomes] (id: outcomes)
Outcomes are directional and safe-to-share:

- Findability improved in unmoderated tests on key tasks after IA/nav prototyping.
- Time-to-find for core program information dropped to under two minutes in testing (directional; ~1.7 min).
- Three personas defined and socialized to align stakeholders.
- ~55 modules/screens wireframed to establish the system and reduce one-off design decisions.
- The documented module library reduced consistency debt and made future page creation calmer and faster.

[Learnings] (id: learnings)

1. In complex institutions, consistency is a trust feature.
If the same action "looks different" across sections, users start second-guessing the whole system.

2. Mergers don't just need new visuals. They need shared rules.
Once the rules exist, design and content work stop being a recurring negotiation.

3. AI is most useful when it accelerates the unglamorous parts.
Clustering, drafts, consistency checks. The value is time and focus, not novelty.

(Short closing)
This project was about clarity at scale: helping SC Johnson feel like one institution online, while still respecting what makes each school distinct.

## QUESTIONS TO ASK ME (only if needed to tighten accuracy)

1. What were the three personas (names + 1-sentence goals)?
2. Which 2–3 user journeys mattered most (e.g., compare programs, admissions requirements, faculty, executive education)?
3. Was ~1.7 min a post-prototype test result? What was the baseline (even directional)?
4. What was the biggest stakeholder tension (terminology, ownership, nav politics, content governance)?
5. What artifact was most impactful internally: module library, nav rules, IA map, or testing results?
6. Any "before/after" example you want called out (one concrete inconsistency you fixed)?
