import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 11 — "Lila's Letters" (ROUTE SPLIT)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 2 close / Act 3 gate.
 *
 * The drawer holds a year of letters: Lila had been quietly encouraging
 * both Kai and Ren to spend time at the shop, hoping one of them would
 * matter to whoever inherited it. She never picked a side.
 *
 * This chapter itself doesn't contain a Kai/Ren-swaying choice — the route
 * is decided by the *existing* affection totals from Ch.1–10 (tiebreaker:
 * the ch9LeanedKai/ch9LeanedRen flag from Ch.9's festival-prep choice), via
 * lib/engine/route.ts + manifest.inkwellAndIvyRouteSplit. The one choice
 * here is deliberately neutral — how the player processes the letters, not
 * who they lean on — so the split reads as "this is what you already
 * decided," not a last-second coin flip.
 *
 * Mystery-thread touchpoint (Thread 3): the first "sabotage" incident, a
 * torn ledger page, happens the same night — sets threadUneaseCh11.
 */
export const chapter11: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 11,
  title: "Lila's Letters",
  act: 2,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c11-n1",
      speaker: "narrator",
      text: "The key from the ledger drawer fits a second lock too — the one on the drawer itself, the one you'd assumed was just stuck. It isn't stuck. It's been waiting for the same key the whole time.",
      background: "shop-interior-evening",
    },
    {
      type: "dialogue",
      id: "c11-n2",
      speaker: "narrator",
      text: "Inside, tied with the same ribbon Priya used on the festival banners, is a stack of letters. Dozens of them. Lila's handwriting, dated across more than a year, addressed to no one — or maybe to whoever eventually stood where you're standing now.",
    },
    {
      type: "dialogue",
      id: "c11-n3",
      speaker: "narrator",
      text: "You read for a long time. The shop goes dark around you without you noticing, and by the time you look up, you understand something you weren't expecting to.",
    },
    {
      type: "dialogue",
      id: "c11-n4",
      speaker: "narrator",
      text: "Lila had been arranging this for over a year. Small things — a reason for Kai to reorganize the poetry shelf every few weeks, a standing order that kept Ren stopping by three mornings out of seven. She never wrote down which one she thought you'd choose. She wrote, more than once, that it wasn't her choice to make.",
    },
    {
      type: "dialogue",
      id: "c11-n5",
      speaker: "narrator",
      text: "\"I only wanted you to have people already in the room when you got here,\" one letter says. \"The rest is yours.\"",
    },
    {
      type: "choice",
      id: "c11-c1",
      prompt: "It's a lot to sit with. What do you do first?",
      options: [
        {
          id: "sitAlone",
          text: "Stay in the shop a while longer, just you and the letters.",
          setsFlag: "ch11SatAlone",
        },
        {
          id: "callPriya",
          text: "Call Priya. You don't want to hold this by yourself tonight.",
          setsFlag: "ch11CalledPriya",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c11-n6a",
      speaker: "narrator",
      text: "You sit with it alone until the streetlights outside flicker on, the shop quiet in the particular way it only gets after closing. It doesn't feel lonely. It feels like the first honest conversation you've had with Lila since the funeral.",
      requiresFlag: "ch11SatAlone",
    },
    {
      type: "dialogue",
      id: "c11-n6b",
      speaker: "priya",
      emotion: "serious",
      text: "Priya doesn't say much when she arrives — just pulls a stool up next to yours and reads two of the letters over your shoulder before quietly setting a hand on your back. \"She was always going to do this the sideways way,\" she says eventually. \"Sounds about right, honestly.\"",
      requiresFlag: "ch11CalledPriya",
    },
    {
      type: "dialogue",
      id: "c11-n7",
      speaker: "narrator",
      text: "Word gets around fast in a town this size, or maybe Priya says something to someone who says something to someone else — either way, both Kai and Ren turn up at the shop within a day of each other, each having clearly heard some version of what the letters said.",
    },
    {
      type: "dialogue",
      id: "c11-n8",
      speaker: "kai",
      emotion: "serious",
      text: "\"I wondered, sometimes.\" Kai turns one of the letters over carefully, like it might come apart in his hands. \"Whether the shelf thing was really about the shelf.\" He sets it down. \"I'm not going to pretend I'm not glad to know. I just don't want you to feel like you owe anyone a decision because of it.\"",
    },
    {
      type: "dialogue",
      id: "c11-n9",
      speaker: "ren",
      emotion: "neutral",
      text: "Ren is quieter than you've ever seen him, turning a pastry box over in his hands without opening it. \"She never once made it weird,\" he says finally. \"Never pushed, never picked sides out loud. I figured that was just Lila being Lila. Guess it was more deliberate than that.\" He looks up. \"Doesn't change anything on my end, for what it's worth.\"",
    },
    {
      type: "dialogue",
      id: "c11-n10",
      speaker: "narrator",
      text: "Late that night, closing up alone, you notice the ledger on the counter isn't quite how you left it. One page near the back — old entries, nothing recent — has been torn out clean, no scrap left behind. The shop's other locks are untouched. Nothing else is missing.",
      background: "shop-interior-evening",
    },
    {
      type: "dialogue",
      id: "c11-n11",
      speaker: "narrator",
      text: "It's small. It's probably nothing. But it's the first time something in this shop has felt like it was moved on purpose by someone who wasn't you, and the letters are still open on the counter when you notice.",
    },
  ],
};
