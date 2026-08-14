# Quietbind — Project Plan
### (Platform: Quietbind — First story: Inkwell & Ivy)

## Concept
**Quietbind** is the platform/brand — a home for multiple anime-style,
story-driven romance visual novels over time, aimed at a female-skewing
audience. **Inkwell & Ivy** is the first story on it: player inherits her
late aunt's café-bookshop and manages it day-to-day while a branching
romance unfolds with multiple love interests, underlaid with a mystery
thread. Cozy, slice-of-life tone with real stakes — think otome/romance-anime,
not adult content.

Future stories live alongside Inkwell & Ivy on the same platform (same app,
same engine, same account system) — see repo structure below.

## Story structure — Inkwell & Ivy (finalized)
- **Format:** Visual novel — narrated scenes, character dialogue, branching
  player choices, affection-point system per love interest.
- **Length:** 20 chapters. Chapters 1–11 shared/linear; route locks at
  Ch. 11 based on affection totals; Chapters 12–20 are route-specific
  (9 chapters per route).
- **Chapter gating:** Chapters 1–3 free, Chapter 4+ gated behind rewarded
  ads (or paid unlock later).
- **Routes:** Two love interest routes, locked at Ch. 11 when Lila's letters
  are found. Each route has 3 ending tiers based on final affection —
  6 endings total.
- **Cast:**
  - **Kai** — quiet, observant regular, coffee-and-books type. Has quietly
    maintained the shop's poetry shelf for years.
  - **Ren** — playful, brings pastries, chef/baker energy. His family's
    bakery lost its storefront to a Thorne-adjacent deal years ago.
  - **Marcus Thorne** — antagonist, developer trying to buy the block.
    Not cartoonish — has real unresolved history tied to the mystery plot.
  - **Priya** — player's best friend, flower stall next door. Seeded as a
    strong candidate for a future third route/DLC.
  - **Elias Voss** — town archivist, revealed late as the anonymous
    note-writer; his "sabotage" was protectiveness, not malice.
- **Mystery/suspense layer** (woven through the same 20 chapters, not
  extra chapters): anonymous notes in returned books (light mystery) → a
  hidden room behind the poetry shelf revealing Thorne and Lila's families
  share history (bigger secret) → small unsettling incidents that look like
  sabotage but turn out to be Elias protecting the secret (the unease). All
  three threads resolve together at the Ch. 17–18 climax alongside the
  romance and business plots. Full chapter-by-chapter breakdown lives in
  `docs/inkwell-and-ivy-STORY-OUTLINE.md`.
- **Tone guardrails:** Romantic, cozy, PG — flirtation and emotional stakes,
  no explicit sexual content. Keeps it eligible on all target stores
  (Google Play, Samsung, Amazon, Xiaomi, Palm Store) without an adult rating.

## Monetization
- **Rewarded ads (AdMob/Monetag)** — watch an ad to unlock the next chapter,
  same pattern as Kid Number Adventure's daily check-in ads.
- Optional later: premium one-time unlock per route, or a "skip ads" IAP —
  can reuse the NOWPayments/Flutterwave/Paystack integration from FOREXVERSE
  if crypto/card purchases make sense for this audience.

## Tech stack (reusing existing patterns)
- **Frontend:** Next.js (App Router) + Capacitor, same as Kid Number
  Adventure and FOREXVERSE.
- **Backend:** Supabase — tables for:
  - `players` (auth, display name)
  - `progress` (current chapter, affection scores per character)
  - `unlocked_chapters` (which chapters/routes are unlocked, and how —
    ad-reward vs. paid)
- **Story data:** Script stored as structured JSON/TS data files (not
  hardcoded in components) so new chapters can be added without touching
  game logic — same idea as separating `snapshotConfig` from
  `snapshotService` in FOREXVERSE.
- **Ads:** AdMob rewarded ad unit for chapter unlocks (mirrors the rewarded
  ad flow already built for Kid Number Adventure's daily check-in).
- **Art:** Placeholder CSS/SVG chibi portraits in the prototype. Needs real
  anime-style character art before store launch — either commissioned or via
  an AI image pipeline for consistent portraits per character/emotion.

## Repo / delivery plan — done
- **Repo live:** https://github.com/Aryomeh/quietbind (public).
- Separate from `forex` and `kid-number-adventure-game`.
- Repo structure supports multiple stories under one platform:
  ```
  app/                                  Next.js app (story picker, player shell)
  components/                           Shared VN engine (dialogue box, choices, HUD)
  lib/stories/inkwell-and-ivy/          Chapter data for story #1
  public/assets/stories/inkwell-and-ivy/{characters,backgrounds}
  supabase/migrations/                  DB schema (players, progress, unlocked_chapters)
  android/                              Capacitor Android wrapper
  docs/                                 Planning docs per story
  ```
- Same publishing entity: **D&D Interiors and Construction Ltd (RC 9006178)**
  for app store registrations once ready to ship.

## Build order (next steps)
1. ~~Scaffold Next.js + Capacitor project skeleton.~~ Folder structure done,
   repo pushed. Actual Next.js app code not yet written.
2. Move the finalized 20-chapter outline into structured JSON chapter format
   under `lib/stories/inkwell-and-ivy/`.
3. Wire Supabase schema (players / progress / unlocked_chapters) —
   `supabase/migrations/` folder is scaffolded, no migrations written yet.
4. Write the real Chapter 1–3 script (free tier) + get the Chapter 3→4
   ad-gate working end to end.
5. Source or generate real character art to replace the CSS/SVG chibi
   placeholders from the prototype.
6. Package for Android (Capacitor) once the core loop is solid.

## Open decisions
- Number of love interests beyond Kai/Ren for v1 (Priya seeded as a future
  third route/DLC rather than launch scope).
- Whether to add a light "café management" mini-mechanic (like a cozy-sim
  hybrid) or keep it pure visual novel.
- Ad network split: AdMob only, or same Telegram/AdMob/Monetag split used in
  FOREXVERSE.
- Whether Thorne's arc should ever branch into a non-romantic third ending
  path (e.g. "took the deal") — noted as a possibility, not committed.
