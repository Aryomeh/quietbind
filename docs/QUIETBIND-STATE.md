# QUIETBIND — Platform State
**Last updated:** 2026-08-14 · **Repo:** https://github.com/Aryomeh/quietbind (public)
**Owner:** Ayobami (GitHub: `doxxedghostman` / `Aryomeh`) · Publishing entity: D&D Interiors and Construction Ltd (RC 9006178)

> This file is the canonical, current-state summary of the Quietbind project.
> If you are an AI assistant picking up this project in a new session, read
> this file first, in full, before taking any action. It supersedes
> conversational context — if this file and an old chat disagree, trust
> this file.

---

## 1. What Quietbind is

Quietbind is a multi-story visual novel **platform** (not a single game).
One app, one engine, one account system, multiple romance/mystery stories
a player can pick from a story-selection screen. Target audience:
female-skewing, anime-style art, PG romance (no explicit content — this is
a hard constraint, see §6).

## 2. Repo structure — current state

```
app/                                    Next.js app (App Router)
  page.tsx                              Placeholder home page (real story picker = step 5, not built yet)
  dev/engine-preview/                   Internal route: engine sanity-check against a dummy chapter
  dev/inkwell-ch1/                      Internal route: plays Inkwell & Ivy Ch.1 end-to-end
components/engine/                      Shared VN engine UI — BUILT
  DialogueBox.tsx, ChoiceButtons.tsx, AffectionHud.tsx, ChapterPlayer.tsx
lib/engine/                             Engine internals — BUILT
  types.ts                              Platform-wide chapter data schema (Chapter, DialogueLine, ChoiceBlock, StoryManifest...)
  player.ts                             useChapterPlayer — playback state machine (advance/choose, flags, affection, goto)
  __fixtures__/dummyChapter.ts          Test fixture, not story canon
lib/stories/inkwell-and-ivy/            Chapter data for story #1
  manifest.ts                           Cast, route lock (Ch.11), 6 ending tiers — BUILT
  chapter-01.ts                         "The Bell Above the Door" — real dialogue, BUILT
  chapters 2-20                         NOT YET WRITTEN
lib/stories/<other 6 slugs>/            Folders exist, no chapter data yet
public/assets/stories/<slug>/{characters,backgrounds}/  Folders exist, no art yet — CSS/SVG chibi
                                         placeholders only exist in the old standalone HTML prototype, not in this app
supabase/migrations/                    DB schema — folder exists, no migrations written yet
android/                                Capacitor Android wrapper — not initialized yet
.github/workflows/ci.yml                Runs `npm ci && npm run build` on push/PR to main — BUILT
docs/                                   One STORY-OUTLINE.md per story + this file
README.md                               Human-readable index of all stories
```

**Deployment:** repo is imported into Vercel; every push to `main` auto-deploys.

## 3. Shared conventions across ALL stories

Every story submitted so far follows the same skeleton. Treat this as the
platform's engine contract — new stories should conform to it unless
explicitly told otherwise:

| Convention | Value |
|---|---|
| Chapter count | 20 |
| Route lock point | Chapter 11 (Act III opens) |
| Chapters per route after lock | 9 (Ch. 12–20) |
| Love interests per story | 3 |
| Endings per story | 6 (typically: True / Good / Bittersweet / Bad / Secret / Tragic) |
| Free chapters | Ch. 1–3 (convention carried from Inkwell & Ivy; not yet confirmed for stories 2–7) |
| Ad-gate | Ch. 4+ behind rewarded ad (AdMob/Monetag), per Inkwell & Ivy pattern |
| Naming | Slug = kebab-case of title, e.g. `the-midnight-cafe` |

## 4. Story catalog (7 stories, all outline-stage; Inkwell & Ivy is the only one with any chapter data written)

| # | Slug | Title | Genre | Love interests | Secret ending hooks universe? |
|---|---|---|---|---|---|
| 1 | `inkwell-and-ivy` | Inkwell & Ivy | Cozy romance / mystery | Kai, Ren | No — self-contained mystery (Thorne/Lila family history) |
| 2 | `moonlight-letters` | Moonlight Letters | Romance / mystery / drama | Adrian, Noah, Ethan | No — self-contained |
| 3 | `the-midnight-cafe` | The Midnight Café | Fantasy romance | Lucas, Julian, Oliver | **Yes** — vague ("café exists in many worlds") |
| 4 | `crimson-masquerade` | Crimson Masquerade | Murder mystery / thriller | Adrian, Damien, Leo | **Yes** — vague ("hidden society") |
| 5 | `echoes-of-tomorrow` | Echoes of Tomorrow | Time-loop romance | Aiden, Noah, Kai | **Yes** — vague ("another clock tower") |
| 6 | `the-forgotten-garden` | The Forgotten Garden | Cozy family mystery | Rowan, Elliot, Sebastian | **Yes** — vague ("another forgotten place") |
| 7 | `the-last-train-home` | The Last Train Home | Supernatural romance | Asher, Ryan, Daniel | **Yes — EXPLICIT.** Names The Midnight Café directly. |

**Name collisions to be aware of** (not necessarily a problem — separate
stories, separate universes — but flag if a shared-universe canon gets
built): "Adrian" appears in both Moonlight Letters and Crimson Masquerade
as a different character. "Noah" appears in both Moonlight Letters and
Echoes of Tomorrow as a different character. "Kai" appears in both
Inkwell & Ivy and Echoes of Tomorrow as a different character.

Each story's full chapter-by-chapter breakdown is in
`docs/<slug>-STORY-OUTLINE.md`. Inkwell & Ivy additionally has
`docs/inkwell-and-ivy-PLAN.md` (story-specific project plan, still valid
for its mystery-layer chapter mapping).

## 5. UNRESOLVED: the shared-universe question

**Still the single biggest open decision on the project.** Not touched
this session — no new story has arrived since it was flagged. 5 of 7
stories have a "secret ending" gesturing at a larger connected mystery.
Story #7 (The Last Train Home) escalated this to an explicit named
crossover with Story #3 (The Midnight Café).

**Do not silently continue adding more crossover hooks to new stories
without checking in on this decision.** Priority when it resurfaces: get
an explicit decision on what the shared concept actually IS, then retrofit
the 5 vague hooks to point at the same concept, keyed off what Story #7
already committed to. Does not block current build order — it only
matters once chapters touching a secret ending get written (Ch. 12+ on
stories 3–7), which is well past the current focus (Inkwell & Ivy
Ch. 1–11).

## 6. Hard constraints (do not violate these when writing/fixing story content)

- No explicit sexual content, ever — PG romance only, for store eligibility
  across Google Play, Samsung Galaxy Store, Amazon Appstore, Xiaomi
  GetApps, Palm Store.
- Every story submitted so far gets relabeled to the correct next sequence
  number regardless of what number the source document says.
- Content tone varies (Crimson Masquerade is notably darker than the rest)
  — flagged as needing a possible content indicator on the story picker,
  not yet built.

## 7. Monetization plan (from Inkwell & Ivy, intended platform-wide)

- Rewarded ads (AdMob/Monetag) gate chapters past the free tier — same
  pattern as Ayobami's existing app Kid Number Adventure.
- Possible later: paid route unlocks or "skip ads" IAP, reusing
  NOWPayments/Flutterwave/Paystack integration patterns from his FOREXVERSE
  app if crypto/card purchases make sense for this audience.
- Not yet implemented — no ad SDK wired in, no gate logic built.

## 8. Tech stack

- Next.js (App Router) + Tailwind — scaffolded and live. Capacitor not
  yet added.
- Supabase: planned tables `players`, `progress` (per-story chapter
  position + affection scores), `unlocked_chapters` (per-story,
  per-chapter, unlock method) — none created yet.
- Story content as structured TS under `lib/stories/<slug>/`, built on the
  shared schema in `lib/engine/types.ts` — pattern proven with Inkwell &
  Ivy's manifest + Chapter 1.
- Character art: no real art sourced for any story. The engine currently
  renders scenes with a background-name label only, no art assets.
- CI: GitHub Actions runs a build check on every push/PR to `main`.
  Vercel auto-deploys `main` separately.

## 9. Build order / progress log

1. ✅ **Scaffold Next.js app** (App Router, TypeScript, Tailwind) + CI
   build check. Builds clean, deployed via Vercel.
2. ✅ **Chapter data schema** (`lib/engine/types.ts`) + Inkwell & Ivy
   story manifest (`lib/stories/inkwell-and-ivy/manifest.ts`) — cast,
   route lock, 6 ending tiers.
3. ✅ **Core VN engine** — `useChapterPlayer` playback hook, `DialogueBox`,
   `ChoiceButtons`, `AffectionHud`, `ChapterPlayer`. Verified end-to-end
   against a dummy chapter at `/dev/engine-preview`.
4. ✅ **Inkwell & Ivy Chapter 1** ("The Bell Above the Door") written as
   real dialogue (`lib/stories/inkwell-and-ivy/chapter-01.ts`), playable
   end-to-end at `/dev/inkwell-ch1` — dialogue, the Ch.1 affection choice,
   and the resulting flag-gated branch line all confirmed working against
   the real engine, not just the dummy fixture.
5. ⬜ **Story picker screen** — landing page listing all 7 stories
   (Inkwell & Ivy playable, rest "coming soon"), routing into the player
   shell. Not started.
6. ⬜ **Supabase + ad-gate** — `players` / `progress` / `unlocked_chapters`
   tables and migrations, save/resume, Chapter 4+ rewarded-ad unlock. Not
   started.
7. ⬜ **Chapters 2–20** of Inkwell & Ivy — only Ch. 1 exists so far.
8. ⬜ Source or generate real character art.
9. ⬜ Package for Android via Capacitor.

**Immediate next step:** step 5, the story picker screen — or continuing
Inkwell & Ivy's chapter scripts (Ch. 2+) before building the picker UI
around them. Either is reasonable; not yet decided which comes first.

## 10. For an AI assistant continuing this project

**Repo access:** No persistent GitHub connector is configured. Access is
via a personal access token the user pastes into chat when needed. The
user has indicated they'll reuse the same token for all pushes within one
working session rather than regenerating it per push, and revokes it once
that session's work is done — so within a session, do not re-request a
token that was already provided; only ask again in a new session. After
any push, immediately run `git remote set-url origin
https://github.com/Aryomeh/quietbind.git` to strip the token back out of
the local git config, every time, regardless of the reuse-within-session
policy. Still remind the user to revoke the token once the session's work
is fully done.

**When a new story document arrives:**
1. Check what sequence number it claims — ignore it, renumber to the
   actual next slot (currently next available: **#8**).
2. Clean up formatting into the platform's standard outline format.
3. Check for a secret-ending universe hook — if present, cross-reference
   §5 of this file and flag consistency with prior stories.
4. Scaffold `lib/stories/<slug>/.gitkeep` and
   `public/assets/stories/<slug>/{characters,backgrounds}/.gitkeep`.
5. Add an entry to the README story list AND to the table in §4 of this
   file.
6. Commit, push, strip token from remote.
7. Update `## Last updated` date at the top of this file.

**When resuming code work:** check §9 for the current step — do not
re-scaffold anything already marked ✅ above; check the repo tree first
if unsure.
