import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 6 — "Coffee and Confessions"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 2.
 * One-on-one scene with Kai. He reveals he's kept the poetry shelf
 * curated for years, unasked. Heavier affection choice than Ch.1-5.
 * Also the mystery-thread touchpoint for Ch.6/7: a second, stranger note,
 * with Kai noticing the player's unease.
 */
export const chapter06: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 6,
  title: "Coffee and Confessions",
  act: 2,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c6-n1",
      speaker: "narrator",
      text: "Ren's got a wholesale order to fill, which means the shop is quiet in the particular way it only gets when it's just you and Kai. He's at the poetry shelf again, straightening spines that don't need straightening.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c6-n2",
      speaker: "narrator",
      text: "You've watched him do this three times now. Same shelf, same slow methodical pass, like it's a small ritual he's not fully aware he's performing.",
    },
    {
      type: "dialogue",
      id: "c6-n3",
      speaker: "kai",
      emotion: "neutral",
      text: "\"You're staring.\" He doesn't turn around. \"I can feel it.\"",
    },
    {
      type: "dialogue",
      id: "c6-n4",
      speaker: "narrator",
      text: "You point out that the shelf isn't even that messy, mostly just to see what he'll say.",
    },
    {
      type: "dialogue",
      id: "c6-n5",
      speaker: "kai",
      emotion: "serious",
      text: "He finally turns, and there's a beat before he answers, like he's deciding how much of it to say out loud. \"I started keeping this shelf in order before Lila got sick. Nobody asked me to. It just became the thing I did when I came in.\"",
    },
    {
      type: "dialogue",
      id: "c6-n6",
      speaker: "kai",
      text: "\"After, it felt wrong to stop. Like the shelf was the one thing I could still actually do something about.\"",
    },
    {
      type: "dialogue",
      id: "c6-n7",
      speaker: "narrator",
      text: "You realize your hand has drifted to your pocket, to the folded note that's been sitting there since the returned books, and Kai catches the motion before you do.",
    },
    {
      type: "dialogue",
      id: "c6-n8",
      speaker: "kai",
      emotion: "neutral",
      text: "\"You've been somewhere else all afternoon.\" Not a question. \"What is it.\"",
    },
    {
      type: "choice",
      id: "c6-c1",
      prompt: "You could show him.",
      options: [
        {
          id: "showNote",
          text: "Take the note out and hand it to him. \"Found this in a returned book. Doesn't say who from.\"",
          affectionDelta: { kai: 3 },
          setsFlag: "ch6ShowedKai",
        },
        {
          id: "brushOff",
          text: "\"It's nothing. Just been a long week.\"",
          affectionDelta: { kai: 1 },
          setsFlag: "ch6GuardedKai",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c6-n9a",
      speaker: "kai",
      emotion: "serious",
      text: "He reads it twice, turns it over like the back might explain the front. \"I don't recognize the handwriting.\" A pause. \"Doesn't mean it's nothing, though. Keep it somewhere you won't lose it. If another one turns up, tell me.\"",
      requiresFlag: "ch6ShowedKai",
    },
    {
      type: "dialogue",
      id: "c6-n9b",
      speaker: "kai",
      emotion: "neutral",
      text: "He looks at you for a second longer than the answer deserves, and you can tell he doesn't believe you. But he lets it go. \"Okay.\" A small pause. \"I'm not going anywhere, if that changes.\"",
      requiresFlag: "ch6GuardedKai",
    },
    {
      type: "dialogue",
      id: "c6-n10",
      speaker: "narrator",
      text: "The bell rings before either of you can say anything else, some regular wanting their usual, and the moment folds itself back into the ordinary rhythm of the afternoon.",
    },
    {
      type: "dialogue",
      id: "c6-n11",
      speaker: "narrator",
      text: "But you notice, later, that the poetry shelf is perfectly straight, and it stays that way for the rest of the day.",
    },
  ],
};
