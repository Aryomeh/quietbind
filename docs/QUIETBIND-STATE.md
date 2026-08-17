# QUIETBIND — Platform State
**Last updated:** 2026-08-17 (audio settings toggles, Ch.4–10 written, em-dash cleanup) · **Repo:** https://github.com/Aryomeh/quietbind (public)
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
  page.tsx                              App entry sequence: splash (Wobblewing Studios logo) -> ~8s simulated loading (stalls at 50%/80%) -> main menu. Skips splash/loading on return trips to "/" via a sessionStorage flag — only plays on true first open per browser session.
  stories/                              Story picker (moved here from /) — lists all 7 stories, links to /play/inkwell-and-ivy/1
  achievements/, settings/, account/    Placeholder screens off the main menu — not wired up, UI only (account has Google/Email sign-in placeholders); each has a "← Menu" back link
  play/inkwell-and-ivy/[chapter]/       Real player route — checks Supabase unlock status before rendering; ChapterPlayer now also has a "← Menu" back link
  dev/engine-preview/                   Internal route: engine sanity-check against a dummy chapter
  dev/inkwell/[chapter]/                Internal route: plays any written Inkwell & Ivy chapter, e.g. /dev/inkwell/1
components/menu/                        App shell UI — BUILT
  SplashScreen.tsx, LoadingScreen.tsx, MainMenu.tsx
components/engine/                      Shared VN engine UI — BUILT
  DialogueBox.tsx, ChoiceButtons.tsx, AffectionHud.tsx, ChapterPlayer.tsx, AdGateModal.tsx
lib/supabase/                           Supabase integration — BUILT
  client.ts                             Browser client (env-var driven)
  device.ts                             Anonymous device-id (localStorage) + qb_players upsert
  progress.ts                           isChapterUnlocked / unlockChapter / saveProgress
lib/engine/                             Engine internals — BUILT
  types.ts                              Platform-wide chapter data schema (Chapter, DialogueLine, ChoiceBlock, StoryManifest...)
  player.ts                             useChapterPlayer — playback state machine (advance/choose, flags, affection, goto)
  __fixtures__/dummyChapter.ts          Test fixture, not story canon
lib/stories/inkwell-and-ivy/            Chapter data for story #1
  manifest.ts                           Cast, route lock (Ch.11), 6 ending tiers — BUILT
  chapter-01 through chapter-10.ts       "The Bell Above the Door" through "The Key" — BUILT (Ch.1-10 of 20, half done)
  chapters.ts                           Chapter-number → Chapter map, read by the dev route (and eventually the picker)
  chapters 11-20                        NOT YET WRITTEN — Ch.11 is the route-split chapter
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
- Supabase: **shared project** — Quietbind reuses the `kid-number-adventure`
  Supabase project (id `zymsxpehfwqmzrmcsgxa`) rather than a dedicated
  project, since the account is capped at 2 free projects and that one had
  the least data. Tables are prefixed `qb_` to stay separate: `qb_players`,
  `qb_progress` (per-story chapter position, affection, flags as jsonb),
  `qb_unlocked_chapters` (per-story, per-chapter, unlock method). Anonymous
  device-id-based access, same RLS pattern (`anon` role, policies open by
  device_id trust rather than `auth.uid()`) as that project's existing
  `devices` table. Client env vars: `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` — set in `.env.local` (gitignored) and
  must also be added to the Vercel project's env settings for prod to work
  (see `.env.local.example` for the var names).
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
4. ✅ **Inkwell & Ivy Chapters 1–3** — "The Bell Above the Door," "Two
   Regulars," "The Lease Letter" — written as real dialogue
   (`lib/stories/inkwell-and-ivy/chapter-01/02/03.ts`), playable
   end-to-end at `/dev/inkwell/1`, `/dev/inkwell/2`, `/dev/inkwell/3` — a
   dynamic dev route reading from `lib/stories/inkwell-and-ivy/chapters.ts`
   (chapter number → Chapter map) rather than one page per chapter. This
   completes the entire free tier (Ch. 1–3) end-to-end.
5. ✅ **Story picker screen** (`app/page.tsx`) — lists all 7 stories,
   Inkwell & Ivy links to `/play/inkwell-and-ivy/1`, the rest show
   "Coming soon."
6. ✅ **Supabase + ad-gate** — `qb_players` / `qb_progress` /
   `qb_unlocked_chapters` tables live in the shared `kid-number-adventure`
   project (see §8). Real play route at `/play/inkwell-and-ivy/[chapter]`
   checks unlock status client-side before rendering (Ch.1 always open,
   later chapters need a `qb_unlocked_chapters` row). `AdGateModal` runs
   a **placeholder ad waterfall** via `lib/ads/adService.ts`
   (`runRewardedAdWaterfall`): tries AdMob first, falls back to Monetag
   if AdMob fails to load/fill. Both networks are placeholders for now
   (always "succeed" after a countdown), so only the AdMob branch runs
   in practice today — the Monetag fallback branch starts exercising
   itself once the real AdMob SDK is wired in and can actually reject on
   no-fill. Pops on chapter completion, auto-dismisses after a few
   seconds, then `ChapterPlayer` saves progress and unlocks the next
   chapter via Supabase. This is a stand-in for the real rewarded-ad
   SDKs (needed anyway once Capacitor/native builds happen); swapping in
   real AdMob/Monetag zone/app IDs later is a change inside
   `adService.ts` only, not a rework of `AdGateModal` or its call sites.
   **Not yet verified against the live anon-key path** — the sandbox this
   was built in can't reach Supabase's REST API (network egress doesn't
   include Supabase hosts), so only the underlying SQL/schema was verified
   directly, not the actual client-side `@supabase/supabase-js` + RLS
   round-trip a real browser session would do. Worth an end-to-end click-
   through on Vercel once deployed to confirm the ad → unlock → continue
   flow works in a real browser.
7. 🔶 **Chapters 4–20** of Inkwell & Ivy — Ch. 1–10 done (10 of 20, exactly
   half). Ch.4 "Lila's Ledger" (introduces Priya, first mystery-thread
   note), Ch.5 "Festival Announcement" (community-rallying beat), Ch.6
   "Coffee and Confessions" (Kai-focused one-on-one, poetry-shelf origin),
   Ch.7 "Flour on the Counter" (Ren-focused one-on-one, Thorne/bakery
   backstory), Ch.8 "The Locked Drawer" (torn photo corner, second-lock
   hint), Ch.9 "Festival Prep" (group chapter; the Kai/Ren choice here is
   the Ch.11 route-split tiebreaker), Ch.10 "The Key" (drawer opens,
   diagram of a second door behind the poetry shelf). All ad-gated
   (`freeTier: false`), all follow the Ch.1-3 flag convention
   (`ch{N}Leaned{Kai|Ren}`). Next up: Ch.11, the actual route split.
8. ✅ **Character art plumbing + first real art** — `lib/engine/characterArt.ts`
   holds a per-story registry (`AVAILABLE_ART`) mapping `"characterId:emotion"`
   keys to real art files at
   `public/assets/stories/<slug>/characters/<characterId>/<emotion>.png`.
   `CharacterStage` component renders above the dialogue box for every
   dialogue line with a non-narrator speaker: real image if registered,
   otherwise a placeholder card (initial + name + emotion tag). Wired into
   `ChapterPlayer` for both `/play/...` and `/dev/...` routes (single call
   site). **Real art now in for all 3 speaking characters so far:** Kai
   (blushing, neutral, happy, serious, annoyed, sad — sad is a reused copy
   of neutral.png as a stand-in, flagged in the registry, swap when a real
   one is generated), Ren (blushing, neutral, happy, annoyed, sad), Priya
   (neutral, happy) — 13 files total. This fully covers Ch. 1–3 (written)
   plus the emotion range expected through Ch. 11 per the story outline.
   All 13 have transparent (alpha-channel) backgrounds via `rembg` —
   the first upload batch had opaque white/gradient backgrounds, caught
   live in Ch. 2 (visible white box behind Kai's portrait), fixed same
   day. Not yet needed: Thorne/Elias art (no dialogue until Ch. 13+), or
   wider emotion coverage for Kai/Ren's later route-lock chapters (Ch. 12+).
9. ✅ **Audio/music system** — landed via a separate work session merged
   into this branch: `lib/audio/AudioManager.ts`, `lib/audio/assets.ts`
   (BGM-per-chapter/background + SFX registry), `useAudioSettings` hook,
   settings-screen mute/volume toggles, and the first real audio batch
   (4 BGM tracks + 4 SFX) for Inkwell & Ivy under
   `public/assets/stories/inkwell-and-ivy/audio/{bgm,sfx}/`. Wired into
   `ChapterPlayer` (BGM keyed on scene background, SFX on chapter
   complete + ad-gate unlock).
9b. ✅ **Music/Sound Effects settings toggles** — Settings page now has
   real on/off switches for Music and Sound Effects (previously
   placeholder rows), backed by `AudioManager`'s persisted
   `musicEnabled`/`sfxEnabled` state (localStorage, survives reload).
   Bgm keeps playing across menu/settings/achievements navigation since
   `AudioManager` is a singleton outside the React tree; only
   `ChapterPlayer` explicitly switches tracks. Known scoping gap: Ch.3's
   tension bgm variant is selected via a chapter-number special case in
   `getBgmForChapter` rather than a real mood field on `Chapter`, since
   the schema doesn't have one yet — fine for now, worth revisiting if
   more chapters need a tonal music shift without a background change.
10. ✅ Source real character art for Kai/Ren/Priya — done, see step 8.
   ⬜ Still need: Thorne/Elias art (once they get dialogue, Ch.13+), and
   wider Kai/Ren emotion coverage for route-lock chapters (Ch.12+).
11. ⬜ Package for Android via Capacitor.
12. ✅ **Post-launch fixes from first real playtest feedback:**
   - Dialogue card no longer leaves a large empty gap on narrator-only
     lines (no portrait) — `DialogueBox` takes a `fill` prop that lets it
     grow to fill the space up to the affection bar; stays compact below
     the portrait whenever one is shown.
   - Character art background removal redone — 3 of the first 13 files
     (`kai/happy`, `kai/neutral`/`sad`, `priya/happy`) had failed cutouts
     from `rembg`'s default model on soft-gradient source images,
     leaving a hazy semi-transparent fringe that looked like the
     character was blending into the dark app background. Reprocessed
     with `isnet-general-use` + alpha matting. Separately, all 13 files
     had zero padding (hair/shoulders touching the raw canvas edge),
     which read as an inconsistent "crop" once scaled into the portrait
     frame — normalized every file to a uniform 6% margin.
   - New chapter picker at `/stories/inkwell-and-ivy` — lists every
     written chapter with lock/unlock state (via new
     `getUnlockedChapters` / `getLastReadChapter` in
     `lib/supabase/progress.ts`) and a "Continue" shortcut to the
     furthest chapter reached. `/stories` "Play" button now routes here
     instead of hardcoding Chapter 1.
   - Prose pass on Ch. 1–3 to remove repeated AI-sounding phrasing: a
     "less like X, more like Y" closing-line template that appeared
     verbatim-structured in both Ch.1 and Ch.2, doubled-up "somehow"
     hedges in Ch.3, and an inanimate-object-with-intent cliché
     ("like it's not planning on being ignored"). Only `text` fields
     changed — no ids/flags/choice logic touched.

**Immediate next step:** app is live and confirmed reachable at
https://quietbind-git-main-aryomehs-projects.vercel.app/ (Vercel
Deployment Protection was initially blocking outside access — user
disabled/adjusted it; if it stops being reachable again, check that
setting first). Two UX bugs reported after first live testing were fixed
(back-to-menu link in the chapter reader; splash/loading no longer
replays on back-navigation to "/"; loading bar retimed to ~8s with
stalls). **Not yet done:** a real click-through of the ad-gate ->
Supabase unlock -> Chapter 2 sequence hasn't been explicitly confirmed
working by the user — worth asking about specifically.

Story writing is now the main active thread: Ch.1-10 of 20 are done
(exactly halfway to the Ch.11 route split). Next chapter to write is
**Ch.11 "The Choice"** — the actual route-split chapter, branching to
`route: "kai"` or `route: "ren"` based on total affection (tiebreaker:
the Ch.9 festival-prep choice flag). This is a bigger lift than Ch.4-10
since it needs the branch logic itself (not just flag-gated dialogue
lines within one linear chapter) — check how `player.ts` and
`ChapterPlayer` currently resolve `route` before writing it, since nothing
route-specific has been built yet.

**Style notes for any AI writing chapter text**, learned mid-session:
- No em-dashes ("—") in any `text` field the player will see. Use
  periods, commas, or colons instead. (Code comments are fine, players
  never see those.) This was flagged directly by the user after seeing
  it rendered in Ch.4 — checked and fixed in Ch.4-10 since; Ch.1-3 were
  explicitly left untouched per the user's instruction not to touch
  chapters written by someone else.
- The player never gets a `speaker: "player"` dialogue line — their
  voice comes through narrator prose (second person) or the choice
  options themselves only. `DialogueBox` would render an ugly raw
  "PLAYER" label if this slips through since "player" isn't in any
  story's character roster.

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
