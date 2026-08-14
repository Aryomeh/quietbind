import type { Chapter } from "@/lib/engine/types";

/**
 * Dummy chapter used only to exercise the engine (dialogue, a flagged
 * line, and a choice with affection/flag/goto) before real chapter
 * content is written. Not part of any story's canon.
 */
export const dummyChapter: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 0,
  title: "Engine Test",
  act: 0,
  route: "shared",
  freeTier: true,
  nodes: [
    {
      type: "dialogue",
      id: "n1",
      speaker: "narrator",
      text: "The bell above the door rings as you step inside for the first time.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "n2",
      speaker: "kai",
      emotion: "neutral",
      text: "You're here. I wasn't sure you would be, this early.",
    },
    {
      type: "choice",
      id: "c1",
      prompt: "How do you respond?",
      options: [
        {
          id: "warm",
          text: "\"Couldn't stay away, honestly.\"",
          affectionDelta: { kai: 2 },
          setsFlag: "warmToKai",
          goto: "n3",
        },
        {
          id: "guarded",
          text: "\"I didn't have much of a choice.\"",
          affectionDelta: { kai: -1 },
          goto: "n3",
        },
      ],
    },
    {
      type: "dialogue",
      id: "n3",
      speaker: "kai",
      text: "Fair enough either way. Coffee's already on.",
    },
    {
      type: "dialogue",
      id: "n4",
      speaker: "narrator",
      text: "He notices something in the way you're standing there. He doesn't say it yet.",
      requiresFlag: "warmToKai",
    },
    {
      type: "dialogue",
      id: "n5",
      speaker: "ren",
      text: "Don't let him hog you before I've even said hello!",
    },
  ],
};
