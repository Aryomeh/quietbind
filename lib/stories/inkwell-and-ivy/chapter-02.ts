import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 2 — "Two Regulars"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 1.
 * Ren crashes the moment, pastries in hand, light rivalry banter with Kai
 * established. Player choice sets an early lean.
 */
export const chapter02: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 2,
  title: "Two Regulars",
  act: 1,
  route: "shared",
  freeTier: true,
  nodes: [
    {
      type: "dialogue",
      id: "c2-n1",
      speaker: "narrator",
      text: "Kai is still hunting through cupboards for the coffee when the bell rings again, hard enough to rattle.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c2-n2",
      speaker: "ren",
      emotion: "happy",
      text: "\"Please tell me he hasn't already talked your ear off about coffee grounds.\"",
    },
    {
      type: "dialogue",
      id: "c2-n3",
      speaker: "narrator",
      text: "A second man pushes through the door, a paper bag balanced on one arm, already grinning like he's mid-conversation with someone who isn't you yet.",
    },
    {
      type: "dialogue",
      id: "c2-n4",
      speaker: "kai",
      emotion: "annoyed",
      text: "\"I was being helpful. Some of us don't announce ourselves from the street.\"",
    },
    {
      type: "dialogue",
      id: "c2-n5",
      speaker: "ren",
      text: "\"Ren. I run — well, my family runs — the bakery two doors down. Brought you something better than whatever he's found in that cupboard.\" He sets the bag on the counter. \"From the place that isn't ours, before you ask. Long story.\"",
    },
    {
      type: "dialogue",
      id: "c2-n6",
      speaker: "kai",
      text: "\"It's a two-word story. 'We lost.'\"",
    },
    {
      type: "dialogue",
      id: "c2-n7",
      speaker: "ren",
      emotion: "annoyed",
      text: "\"Not helping, Kai.\"",
    },
    {
      type: "dialogue",
      id: "c2-n8",
      speaker: "narrator",
      text: "The bickering has the easy rhythm of something they've done a hundred times before, in this exact spot, probably in front of Lila. Neither of them seems inclined to stop on your account.",
    },
    {
      type: "choice",
      id: "c2-c1",
      prompt: "Who do you let win the argument?",
      options: [
        {
          id: "sideRen",
          text: "\"I'll take whatever's in the bag. Sorry, Kai.\"",
          affectionDelta: { ren: 2, kai: -1 },
          setsFlag: "ch2LeanedRen",
        },
        {
          id: "sideKai",
          text: "\"Coffee first. The pastries can wait their turn.\"",
          affectionDelta: { kai: 2, ren: -1 },
          setsFlag: "ch2LeanedKai",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c2-n9a",
      speaker: "ren",
      emotion: "happy",
      text: "Ren looks entirely too pleased with himself, sliding the bag across the counter like he's won something. \"See? Good taste runs in this shop.\"",
      requiresFlag: "ch2LeanedRen",
    },
    {
      type: "dialogue",
      id: "c2-n9b",
      speaker: "kai",
      emotion: "happy",
      text: "Kai doesn't gloat, exactly, but there's something satisfied in how quickly he finally finds the coffee tin. \"Told you. Priorities.\"",
      requiresFlag: "ch2LeanedKai",
    },
    {
      type: "dialogue",
      id: "c2-n10",
      speaker: "narrator",
      text: "Somewhere between the arguing and the coffee finally brewing, the shop starts to feel less like a room full of Lila's things and more like a room two people have quietly decided is worth showing up to. You're starting to understand why.",
    },
  ],
};
