import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 10 — "The Key"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 2 close.
 * The key turns up hidden inside Lila's favorite book at the register,
 * a detail only someone who knew her habits would think to check. The
 * drawer opens. Mystery-thread touchpoint: inside, a diagram referencing
 * a second door somewhere in the shop.
 */
export const chapter10: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 10,
  title: "The Key",
  act: 2,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c10-n1",
      speaker: "narrator",
      text: "It's a slow Tuesday, the kind where you end up reorganizing things that don't strictly need it. Your hand lands on the one book that's never moved from its spot by the register, the whole time you've owned this place.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c10-n2",
      speaker: "narrator",
      text: "You've dusted around it a dozen times without really looking at it. Lila's copy, worn soft at the spine, heavier in your hand than a paperback has any business being.",
    },
    {
      type: "dialogue",
      id: "c10-n3",
      speaker: "narrator",
      text: "When you open it, a small key drops straight into your palm. Ornate, old-fashioned, nothing like the plain household keys on the shop's ring.",
    },
    {
      type: "dialogue",
      id: "c10-n4",
      speaker: "narrator",
      text: "It's exactly the kind of hiding place only someone who actually knew Lila's habits would think to check. You never would have found it on your own, and you know it.",
    },
    {
      type: "choice",
      id: "c10-c1",
      prompt: "Your hands are already shaking a little. You want someone there when you open it.",
      options: [
        {
          id: "callKai",
          text: "Call Kai. He'd want to be careful about this, and you could use that right now.",
          affectionDelta: { kai: 2 },
          setsFlag: "ch10LeanedKai",
        },
        {
          id: "callRen",
          text: "Call Ren. You want someone who'll be excited alongside you, not just cautious.",
          affectionDelta: { ren: 2 },
          setsFlag: "ch10LeanedRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c10-n5a",
      speaker: "kai",
      emotion: "serious",
      text: "Kai's there within twenty minutes, still in his work apron, like he ran the whole way. He doesn't say much, just stands beside you at the desk, steady in the way you needed without having to ask for it.",
      requiresFlag: "ch10LeanedKai",
    },
    {
      type: "dialogue",
      id: "c10-n5b",
      speaker: "ren",
      emotion: "happy",
      text: "Ren shows up practically vibrating, flour still on his hands, already narrating the moment like it's the best thing that's happened to him all week. \"Okay. Okay. This is genuinely the coolest thing to happen in this shop since I've known you.\"",
      requiresFlag: "ch10LeanedRen",
    },
    {
      type: "dialogue",
      id: "c10-n6",
      speaker: "narrator",
      text: "The key turns easier than you expected, like the lock has been waiting for exactly this and nothing else. The drawer slides open on the first try.",
    },
    {
      type: "dialogue",
      id: "c10-n7",
      speaker: "narrator",
      text: "Inside: a small stack of photographs, most too faded to make sense of, and underneath them, a hand-drawn sketch of the shop's floor plan. Someone has marked a second door in the back wall, right where the poetry shelf currently stands, and written three words beside it in handwriting you don't recognize.",
    },
    {
      type: "dialogue",
      id: "c10-n8",
      speaker: "narrator",
      text: "*Ask her first.*",
    },
    {
      type: "dialogue",
      id: "c10-n9",
      speaker: "narrator",
      text: "Ask who. There's no door there now, just shelving that's been in the same place as long as you've owned the shop. But for the first time since the note in the returned book, the questions feel like they're circling something real instead of just multiplying.",
    },
  ],
};
