# Quietbind

A visual novel platform for anime-style, story-driven romance games.
Built with Next.js, Capacitor, and Supabase.

## Stories

- **Inkwell & Ivy** — a cozy café-bookshop romance with a mystery thread
  running underneath. See `docs/inkwell-and-ivy-PLAN.md` and
  `docs/inkwell-and-ivy-STORY-OUTLINE.md`.
- **Moonlight Letters** — a full-moon mystery romance about handwritten
  letters that predict the future, and the twenty-year-old secret behind
  them. Three romance routes (Adrian / Noah / Ethan), 20 chapters, six
  endings. See `docs/moonlight-letters-STORY-OUTLINE.md`.
- **The Midnight Café** — a fantasy romance about a café that only exists
  from midnight to 4 AM, open only to those carrying deep regrets. Three
  romance routes (Lucas / Julian / Oliver), 20 chapters, six endings
  including a secret ending that hooks into the wider Quietbind universe.
  See `docs/the-midnight-cafe-STORY-OUTLINE.md`.
- **Crimson Masquerade** — a darker murder-mystery romance set at a
  century-old masked ball where someone dies every year. Three romance
  routes (Adrian / Damien / Leo), 20 chapters, six endings. See
  `docs/crimson-masquerade-STORY-OUTLINE.md`.
- **Echoes of Tomorrow** — a time-loop romance where one girl relives the
  same day until she meets someone else who remembers too. Three romance
  routes (Aiden / Noah / Kai), 20 chapters, six endings. See
  `docs/echoes-of-tomorrow-STORY-OUTLINE.md`.

## Structure

```
app/                                Next.js app (story picker, player shell)
components/                         Shared VN engine (dialogue box, choices, HUD)
lib/stories/<story-slug>/           Chapter data per story
public/assets/stories/<story-slug>/ Character art + backgrounds per story
supabase/migrations/                DB schema (players, progress, unlocked_chapters)
android/                            Capacitor Android wrapper
docs/                               Planning docs per story
```

## Stack

- Next.js (App Router) + Capacitor for Android packaging
- Supabase for auth + save state
- Rewarded ads (AdMob/Monetag) gate chapter unlocks

## Status

Early scaffold — story engine and first chapters in progress.
