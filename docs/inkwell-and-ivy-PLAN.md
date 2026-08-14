# Inkwell & Ivy — Project Plan

## Concept
Anime-style romance visual novel for a female-skewing audience. Player inherits
her late aunt's café-bookshop and manages it day-to-day while a branching
romance unfolds with multiple love interests. Cozy, slice-of-life tone, not
explicit — think otome/romance-anime, not adult content.

## Story structure
- **Format:** Visual novel — narrated scenes, character dialogue, branching
  player choices, affection-point system per love interest.
- **Chapters:** Story split into discrete chapters (Chapter 1 free, Chapter 2+
  gated behind rewarded ads or a paid unlock).
- **Routes:** Each love interest has their own route. Player choices nudge
  affection scores; crossing a threshold locks the story onto that character's
  route for the finale.
- **Cast (demo):**
  - **Kai** — quiet, observant regular, coffee-and-books type.
  - **Ren** — playful, brings pastries, chef/baker energy.
  - (Room to add 1–2 more love interests + side characters later.)
- **Length target (v1):** ~6–8 chapters, 2 full romance routes, multiple
  endings per route (good/neutral/bad depending on affection at finale).
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

## Repo / delivery plan
- New repo (name TBD, e.g. `inkwell-and-ivy`), separate from `forex` and
  `kid-number-adventure-game`.
- Claude doesn't have GitHub write access in this chat — either:
  (a) Ayobami creates the empty repo, Claude scaffolds locally and hands off
      push commands, or
  (b) Ayobami provides a scoped PAT for direct push.
- Same publishing entity: **D&D Interiors and Construction Ltd (RC 9006178)**
  for app store registrations once ready to ship.

## Build order (next steps)
1. Scaffold Next.js + Capacitor project skeleton.
2. Move prototype's script into structured JSON chapter format.
3. Wire Supabase schema (players / progress / unlocked_chapters).
4. Build real Chapter 1 with proper writing (currently just a placeholder
   scene) + at least the Chapter 1→2 ad-gate working end to end.
5. Source or generate real character art to replace CSS/SVG placeholders.
6. Package for Android (Capacitor) once core loop is solid.

## Open decisions
- Final title (Inkwell & Ivy is a placeholder, easy to change).
- Number of love interests for v1 (2 in prototype, could expand to 3).
- Whether to add a light "café management" mini-mechanic (like a cozy-sim
  hybrid) or keep it pure visual novel.
- Ad network split: AdMob only, or same Telegram/AdMob/Monetag split used in
  FOREXVERSE.
