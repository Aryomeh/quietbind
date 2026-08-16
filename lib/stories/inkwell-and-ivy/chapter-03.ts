import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 3 — "The Lease Letter"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 1.
 * A certified letter arrives: Thorne Holdings wants the block, lease
 * renewal in question. Tone shifts — cozy morning undercut by real stakes.
 * Last free chapter (Ch. 4+ is ad-gated per platform convention).
 */
export const chapter03: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 3,
  title: "The Lease Letter",
  act: 1,
  route: "shared",
  freeTier: true,
  nodes: [
    {
      type: "dialogue",
      id: "c3-n1",
      speaker: "narrator",
      text: "A week in, and the mornings have started to fall into something like a rhythm — Kai first, usually, then Ren not long after, both of them acting like this was always going to happen.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c3-n2",
      speaker: "narrator",
      text: "The mail carrier knocks instead of just leaving things in the slot, which is how you know before you even see it that it isn't ordinary mail.",
    },
    {
      type: "dialogue",
      id: "c3-n3",
      speaker: "narrator",
      text: "Certified. Thorne Holdings, LLC, printed above an address that means nothing to you yet. You sign for it because you don't know what else to do.",
    },
    {
      type: "dialogue",
      id: "c3-n4",
      speaker: "narrator",
      text: "The letter is short, and it doesn't waste time being kind about it: the block's lease is up for renewal within the quarter, and Thorne Holdings has submitted a competing offer for the property.",
    },
    {
      type: "dialogue",
      id: "c3-n5",
      speaker: "kai",
      emotion: "serious",
      text: "Kai reads it over your shoulder without asking. It doesn't feel like an intrusion, not from him. \"Thorne Holdings. They've been buying up this side of town for two years now.\"",
    },
    {
      type: "dialogue",
      id: "c3-n6",
      speaker: "ren",
      emotion: "annoyed",
      text: "\"That name.\" Ren's easy grin is gone entirely. \"They don't 'renew leases.' They wait for you to fail to fight back.\"",
    },
    {
      type: "choice",
      id: "c3-c1",
      prompt: "How do you handle it, in front of them?",
      options: [
        {
          id: "thinkWithKai",
          text: "Set the letter down carefully, ask Kai what he knows about how these fights usually go.",
          affectionDelta: { kai: 2 },
          setsFlag: "ch3LeanedKai",
        },
        {
          id: "matchRen",
          text: "\"Then we don't fail to fight back.\" Match Ren's stubbornness before you've even had time to feel anything else.",
          affectionDelta: { ren: 2 },
          setsFlag: "ch3LeanedRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c3-n7a",
      speaker: "kai",
      emotion: "neutral",
      text: "He doesn't offer easy reassurance. It helps more than if he had. \"I know a few names. People who've dealt with this before. We'll figure out what leverage you actually have.\"",
      requiresFlag: "ch3LeanedKai",
    },
    {
      type: "dialogue",
      id: "c3-n7b",
      speaker: "ren",
      emotion: "happy",
      text: "Something in his shoulders eases, just slightly, like he needed to hear someone else say it first. \"That's the first thing you've said since you got here that sounds like Lila.\"",
      requiresFlag: "ch3LeanedRen",
    },
    {
      type: "dialogue",
      id: "c3-n8",
      speaker: "narrator",
      text: "Whatever this morning was supposed to be, it's not that anymore. The shop still smells like coffee and old paper, but the letter sits on the counter now, impossible to ignore.",
    },
  ],
};
