import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 1 — "The Bell Above the Door"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 1.
 * Player arrives, opens the shop for the first time since the funeral.
 * Meets Kai, already waiting outside like it's routine. First affection
 * choice: warmth vs. guardedness.
 */
export const chapter01: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 1,
  title: "The Bell Above the Door",
  act: 1,
  route: "shared",
  freeTier: true,
  nodes: [
    {
      type: "dialogue",
      id: "c1-n1",
      speaker: "narrator",
      text: "The key sticks a little in the lock, the same way it always has. You have to lift the door slightly on its hinge before it'll turn — a trick only Lila ever remembered.",
      background: "shop-exterior-morning",
    },
    {
      type: "dialogue",
      id: "c1-n2",
      speaker: "narrator",
      text: "The bell above the door rings when it finally swings open. It's the first time it's rung since the funeral.",
    },
    {
      type: "dialogue",
      id: "c1-n3",
      speaker: "kai",
      emotion: "neutral",
      text: "\"Took you long enough.\"",
    },
    {
      type: "dialogue",
      id: "c1-n4",
      speaker: "narrator",
      text: "You turn around. A man is leaning against the wall outside, like he's been there a while and isn't in any hurry to explain why.",
    },
    {
      type: "dialogue",
      id: "c1-n5",
      speaker: "kai",
      text: "Kai. I used to come by most mornings. Figured today wasn't a day to break that.",
    },
    {
      type: "choice",
      id: "c1-c1",
      prompt: "How do you greet him?",
      options: [
        {
          id: "warm",
          text: "\"I'm glad someone did. It's good to see a familiar face already.\"",
          affectionDelta: { kai: 2 },
          setsFlag: "ch1LeanedWarm",
        },
        {
          id: "guarded",
          text: "\"I didn't realize anyone would be waiting for me.\"",
          affectionDelta: { kai: -1 },
          setsFlag: "ch1LeanedGuarded",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c1-n6a",
      speaker: "kai",
      emotion: "happy",
      text: "Kai's mouth twitches, almost a smile. \"Don't get used to it. I just didn't want you unlocking this place alone.\"",
      requiresFlag: "ch1LeanedWarm",
    },
    {
      type: "dialogue",
      id: "c1-n6b",
      speaker: "kai",
      emotion: "neutral",
      text: "He shrugs, unbothered. \"Fair. You don't know me yet. I'll let the coffee do the talking.\"",
      requiresFlag: "ch1LeanedGuarded",
    },
    {
      type: "dialogue",
      id: "c1-n7",
      speaker: "kai",
      text: "He nods toward the door. \"Go on. I'll put the coffee on if you tell me where Lila kept it — she moved it every few months and never told anyone why.\"",
    },
    {
      type: "dialogue",
      id: "c1-n8",
      speaker: "narrator",
      text: "You step inside. Dust hangs in the morning light over the shelves, the register, the little reading nook by the window. For the first time in weeks, the shop feels less like something you inherited and more like somewhere you could stand to be.",
      background: "shop-interior-morning",
    },
  ],
};
