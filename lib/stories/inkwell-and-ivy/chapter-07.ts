import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 7 — "Flour on the Counter"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 2.
 * One-on-one scene with Ren. He reveals his family's bakery lost their
 * old storefront to a Thorne-adjacent deal years ago, and why this fight
 * is personal for him. Also carries the Ch.6/7 mystery-thread touchpoint:
 * a second, stranger note, with Ren noticing the player's unease.
 */
export const chapter07: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 7,
  title: "Flour on the Counter",
  act: 2,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c7-n1",
      speaker: "narrator",
      text: "Kai's off running errands for the afternoon, which means Ren has the counter to himself and no one to perform for. He's quieter than usual, working a batch of dough with more attention than it strictly needs.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c7-n2",
      speaker: "ren",
      emotion: "neutral",
      text: "\"Family recipe. You have to actually pay attention or it turns out wrong.\" He doesn't look up. \"Lila used to say I only ever shut up when I was baking.\"",
    },
    {
      type: "dialogue",
      id: "c7-n3",
      speaker: "narrator",
      text: "There's flour on the counter, on his sleeves, dusted faintly across one cheekbone. You almost point it out, then decide against it, and pull up a stool instead.",
    },
    {
      type: "dialogue",
      id: "c7-n4",
      speaker: "ren",
      text: "\"You know we used to have a real storefront. Two blocks over. My grandmother opened it.\" His hands don't stop moving while he talks. \"Thorne's company bought the building out from under the old landlord. New owner tripled the rent inside a year. We were gone before the lease was even up for renewal.\"",
    },
    {
      type: "dialogue",
      id: "c7-n5",
      speaker: "ren",
      emotion: "sad",
      text: "\"My dad still won't say the company's name out loud. Just calls them 'the buyers.' Like saying it properly might make it happen again.\"",
    },
    {
      type: "dialogue",
      id: "c7-n6",
      speaker: "narrator",
      text: "He finally looks up, and there's none of the usual teasing in his face. Just something tired and a little raw, like the story costs him something every time he tells it.",
    },
    {
      type: "dialogue",
      id: "c7-n7",
      speaker: "ren",
      text: "\"So when I say I want this shop to keep its lease, it's not just about you, or Lila, or the coffee. It's the one time I get to actually be in the room when it happens instead of finding out after.\"",
    },
    {
      type: "dialogue",
      id: "c7-n8",
      speaker: "narrator",
      text: "You reach into your pocket without quite meaning to, fingers finding the edge of the folded note, and Ren catches the motion the way he catches most things about you lately.",
    },
    {
      type: "dialogue",
      id: "c7-n9",
      speaker: "ren",
      emotion: "neutral",
      text: "\"You've got that look again. The one from earlier this week.\" He sets the dough down, wipes his hands. \"Something's been bothering you. What is it.\"",
    },
    {
      type: "choice",
      id: "c7-c1",
      prompt: "You could show him.",
      options: [
        {
          id: "showNote",
          text: "Pull the note out and set it on the counter. \"It was tucked in a returned book. No name on it.\"",
          affectionDelta: { ren: 3 },
          setsFlag: "ch7ShowedRen",
        },
        {
          id: "brushOff",
          text: "\"It's fine. Just a weird week.\"",
          affectionDelta: { ren: 1 },
          setsFlag: "ch7GuardedRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c7-n10a",
      speaker: "ren",
      emotion: "serious",
      text: "He picks it up, reads it twice, frowns at the handwriting like it might jog something loose. \"I don't know whose this is. But whoever wrote it knew this shop.\" He hands it back carefully. \"Tell me if there's another one. I mean it.\"",
      requiresFlag: "ch7ShowedRen",
    },
    {
      type: "dialogue",
      id: "c7-n10b",
      speaker: "ren",
      emotion: "neutral",
      text: "He doesn't push, but he doesn't quite buy it either. \"Alright.\" A beat. \"For what it's worth, I'm decent at figuring out what people won't say out loud. Comes with the job.\"",
      requiresFlag: "ch7GuardedRen",
    },
    {
      type: "dialogue",
      id: "c7-n11",
      speaker: "narrator",
      text: "He goes back to the dough, and the quiet that settles over the shop is easier than it was an hour ago, even if nothing's actually been solved.",
    },
  ],
};
