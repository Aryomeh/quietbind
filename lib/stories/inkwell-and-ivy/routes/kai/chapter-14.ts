import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 14 — "Festival Eve" (KAI ROUTE)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 3A.
 *
 * A slow, quiet walk-and-talk chapter, the night before the Autumn
 * Festival. Near-confession, interrupted.
 */
export const chapter14Kai: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 14,
  title: "Festival Eve",
  act: 3,
  route: "kai",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c14k-n1",
      speaker: "narrator",
      text: "The booth's finished, the samples are prepped, and there's nothing left to do tonight except wait for morning. Kai locks up a few minutes after you do and, instead of heading straight home, falls into step beside you without asking if that's all right.",
      background: "town-square-evening",
    },
    {
      type: "dialogue",
      id: "c14k-n2",
      speaker: "kai",
      emotion: "neutral",
      text: "\"Long way around,\" he says, nodding toward the square instead of the shorter route past the bakery. \"If you're not in a hurry.\"",
    },
    {
      type: "dialogue",
      id: "c14k-n3",
      speaker: "narrator",
      text: "You're not, so you take it. The town's quiet in the particular way it gets the night before something, string lights already up over the square for tomorrow, dark now, waiting.",
    },
    {
      type: "dialogue",
      id: "c14k-n4",
      speaker: "kai",
      emotion: "serious",
      text: "\"I keep thinking about something Lila said once.\" He's looking at the empty booth frames lined up along the square, not at you. \"She told me the shop was never really about the books. Said books just gave people a reason to stay long enough for the actual thing to happen.\"",
    },
    {
      type: "dialogue",
      id: "c14k-n5",
      speaker: "kai",
      text: "\"I didn't understand it for years. I think I finally do.\"",
    },
    {
      type: "dialogue",
      id: "c14k-n6",
      speaker: "narrator",
      text: "He stops walking. You stop too, close enough now that the space between you feels smaller than the actual distance, and for a second neither of you moves to close it or step back.",
    },
    {
      type: "choice",
      id: "c14k-c1",
      prompt: "The moment's open. What do you do with it?",
      options: [
        {
          id: "leanIn",
          text: "Close the distance yourself instead of waiting to see what he'll do.",
          affectionDelta: { kai: 4 },
          setsFlag: "ch14KaiLeanedIn",
        },
        {
          id: "holdStill",
          text: "Hold still and let him decide what happens next.",
          affectionDelta: { kai: 2 },
          setsFlag: "ch14KaiHeldStill",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c14k-n7a",
      speaker: "kai",
      emotion: "blushing",
      text: "He goes still like he wasn't fully expecting it, and then, a beat later, leans in to meet you the rest of the way, one hand coming up to rest against your jaw like he's checking this is actually happening.",
      requiresFlag: "ch14KaiLeanedIn",
    },
    {
      type: "dialogue",
      id: "c14k-n7b",
      speaker: "kai",
      emotion: "serious",
      text: "He reaches up slowly, like he's giving you every chance to step back if you want to, and when you don't, his hand settles at your jaw instead, careful, like something that might startle if he moved too fast.",
      requiresFlag: "ch14KaiHeldStill",
    },
    {
      type: "dialogue",
      id: "c14k-n8",
      speaker: "narrator",
      text: "It doesn't quite happen. A burst of laughter carries across the square, some of the festival committee finishing up a last-minute banner, and Kai pulls back half a step, not far, just enough for the moment to lose its edge.",
    },
    {
      type: "dialogue",
      id: "c14k-n9",
      speaker: "kai",
      emotion: "neutral",
      text: "\"Terrible timing,\" he says, and there's something almost like a laugh underneath it, rough with how close it just was. \"For the record, I wasn't planning on letting that stay unfinished forever.\"",
    },
    {
      type: "dialogue",
      id: "c14k-n10",
      speaker: "narrator",
      text: "He walks you the rest of the way home anyway, slower than he needs to, and says goodnight at your door like it costs him something to leave it there.",
      background: "shop-interior-evening",
    },
  ],
};
