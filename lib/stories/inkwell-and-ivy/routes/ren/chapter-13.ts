import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 13 — "Thorne's Offer" (REN ROUTE)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 3B.
 *
 * Same beat as the Kai route: Thorne makes a personal buyout pitch. Ren's
 * reaction is far more openly angry than Kai's, history resurfacing. Also
 * the mystery-thread touchpoint: the second "sabotage" incident, timed
 * right after Thorne's visit.
 */
export const chapter13Ren: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 13,
  title: "Thorne's Offer",
  act: 3,
  route: "ren",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c13r-n1",
      speaker: "narrator",
      text: "Marcus Thorne doesn't send a letter this time. He walks in on a slow Wednesday afternoon, coat still on, and sets a folder on the counter like he's already decided this conversation will go his way.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c13r-n2",
      speaker: "thorne",
      emotion: "neutral",
      text: "\"I'll keep this simple. A number, fair market plus a margin most people would call generous, and a closing date that lets you walk away clean before winter. No lawyers required on your end, if you don't want them.\"",
    },
    {
      type: "dialogue",
      id: "c13r-n3",
      speaker: "narrator",
      text: "Ren has gone rigid at the pastry case, and you can feel the temperature of the room change before he says a single word.",
    },
    {
      type: "dialogue",
      id: "c13r-n4",
      speaker: "ren",
      emotion: "annoyed",
      text: "\"You've got some nerve.\" It comes out low, not shouted, which is somehow worse than if he'd yelled it. \"Coming in here yourself. Last time your company did this to a family, you at least had the decency to send someone else.\"",
    },
    {
      type: "dialogue",
      id: "c13r-n5",
      speaker: "thorne",
      text: "\"I'm not the same person who handled that deal, and this offer isn't personal.\" He says it evenly, like he's used to this reaction and has decided not to match it. \"I understand it doesn't feel that way to you.\"",
    },
    {
      type: "dialogue",
      id: "c13r-n6",
      speaker: "ren",
      emotion: "annoyed",
      text: "\"It's always personal once you're the one losing something.\" Ren's hands have curled into fists at his sides, and he catches himself doing it, forces them flat against the counter instead. \"You should go. Before I say something you'll actually get to use against her.\"",
    },
    {
      type: "choice",
      id: "c13r-c1",
      prompt: "The room feels like it could go either way. What do you do?",
      options: [
        {
          id: "backRen",
          text: "Step in beside him. \"He's right. Get out. The answer's no.\"",
          affectionDelta: { ren: 3 },
          setsFlag: "ch13RenBacked",
        },
        {
          id: "calmTheRoom",
          text: "Put a hand on Ren's arm first, steadying him, before answering Thorne yourself. \"I'll think about it. Please go.\"",
          affectionDelta: { ren: 1 },
          setsFlag: "ch13RenCalmed",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c13r-n7a",
      speaker: "thorne",
      emotion: "neutral",
      text: "Thorne's jaw tightens, the only real crack in his composure, but he picks up his coat without arguing. \"Understood. The offer stands regardless.\" He leaves the folder on the counter and doesn't look at Ren again on his way out.",
      requiresFlag: "ch13RenBacked",
    },
    {
      type: "dialogue",
      id: "c13r-n7b",
      speaker: "thorne",
      emotion: "neutral",
      text: "\"Fair enough.\" He nods once, unhurried, and leaves the folder behind anyway. \"Take whatever time you need. I'll check back.\" He's gone before Ren fully relaxes.",
      requiresFlag: "ch13RenCalmed",
    },
    {
      type: "dialogue",
      id: "c13r-n8",
      speaker: "narrator",
      text: "The bell rings. Ren doesn't move right away, breathing hard through his nose, staring at the door like Thorne might come back through it.",
    },
    {
      type: "dialogue",
      id: "c13r-n9",
      speaker: "ren",
      emotion: "sad",
      text: "\"Sorry.\" He finally looks at you, some of the anger draining into something closer to exhaustion. \"That's not usually how I handle things. I just heard him say 'fair market' and every part of me went right back to standing in an empty storefront watching my grandmother sign papers she didn't want to sign.\"",
    },
    {
      type: "dialogue",
      id: "c13r-n10",
      speaker: "ren",
      text: "\"I don't want that to happen to you. To this place. I probably should've said that instead of nearly getting myself thrown out of a shop I don't even own.\"",
    },
    {
      type: "dialogue",
      id: "c13r-n11",
      speaker: "narrator",
      text: "That night, closing up, you find the ledger moved again, a page corner folded down at the section covering the shop's original ownership records from before Lila's time. Nothing torn, nothing missing. Just marked, like someone wants you looking there next.",
      background: "shop-interior-evening",
    },
    {
      type: "dialogue",
      id: "c13r-n12",
      speaker: "narrator",
      text: "Two incidents now, both timed close to something involving Thorne. It's starting to feel less like coincidence and more like someone's trying to tell you something they don't want to say out loud.",
    },
  ],
};
