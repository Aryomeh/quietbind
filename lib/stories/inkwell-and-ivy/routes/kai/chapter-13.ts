import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 13 — "Thorne's Offer" (KAI ROUTE)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 3A.
 *
 * Thorne makes a personal buyout pitch directly to the player. Kai's
 * reaction is quiet but pointed, in keeping with his character. Also the
 * mystery-thread touchpoint: the second "sabotage" incident, timed right
 * after Thorne's visit, pushing suspicion toward him as a red herring.
 */
export const chapter13Kai: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 13,
  title: "Thorne's Offer",
  act: 3,
  route: "kai",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c13k-n1",
      speaker: "narrator",
      text: "Marcus Thorne doesn't send a letter this time. He comes in himself, on a Wednesday afternoon when the shop is empty enough that there's no pretending it's a coincidence, and takes off his coat like he intends to stay a while.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c13k-n2",
      speaker: "thorne",
      emotion: "neutral",
      text: "\"I'll keep this simple.\" He sets a folder on the counter without opening it. \"A number, fair market plus a margin most people in this town would call generous, and a closing date that lets you walk away clean before winter. No lawyers required on your end, if you don't want them.\"",
    },
    {
      type: "dialogue",
      id: "c13k-n3",
      speaker: "narrator",
      text: "He's not unpleasant about it. That's almost the worst part, how reasonable he manages to sound, like he's doing you a courtesy instead of asking you to hand over the last thing your aunt built.",
    },
    {
      type: "dialogue",
      id: "c13k-n4",
      speaker: "thorne",
      text: "\"I know how this looks from where you're standing. I'd ask you to consider how it looks from mine. A shop that's barely breaking even, a lease fight that only gets uglier from here, against a number that sets you up for whatever you actually want to do next. I'm not your enemy here. I'm just the only one being direct about the math.\"",
    },
    {
      type: "dialogue",
      id: "c13k-n5",
      speaker: "narrator",
      text: "Kai has gone very still behind the register, close enough to hear every word, saying nothing at all, which somehow lands louder than if he'd said something.",
    },
    {
      type: "choice",
      id: "c13k-c1",
      prompt: "Thorne's waiting for an answer. How do you handle it?",
      options: [
        {
          id: "shutItDown",
          text: "\"I'm not selling. You can leave the folder if it makes you feel better, but the answer's no.\"",
          affectionDelta: { kai: 3 },
          setsFlag: "ch13KaiShutDown",
        },
        {
          id: "stayNeutral",
          text: "\"I'll think about it.\" Noncommittal, mostly to get him out the door faster.",
          affectionDelta: { kai: 1 },
          setsFlag: "ch13KaiStayedNeutral",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c13k-n6a",
      speaker: "thorne",
      emotion: "neutral",
      text: "Thorne's expression doesn't change much, but something behind it does, a small recalibration. \"Understood.\" He leaves the folder anyway. \"The offer doesn't have an expiration date. That's not a threat, for what it's worth. Just an open door.\"",
      requiresFlag: "ch13KaiShutDown",
    },
    {
      type: "dialogue",
      id: "c13k-n6b",
      speaker: "thorne",
      emotion: "neutral",
      text: "\"Take your time.\" He nods once, unbothered, like patience costs him nothing. \"I find people usually come around once the lease fight actually gets expensive. I'll check back.\"",
      requiresFlag: "ch13KaiStayedNeutral",
    },
    {
      type: "dialogue",
      id: "c13k-n7",
      speaker: "narrator",
      text: "The bell rings behind him. Kai doesn't move for a second, staring at the folder on the counter like it might do something on its own.",
    },
    {
      type: "dialogue",
      id: "c13k-n8",
      speaker: "kai",
      emotion: "serious",
      text: "\"You don't owe me an explanation for whatever you decide.\" He says it carefully, like he's rehearsed it. \"I just want to be clear about one thing. I'm not going to pretend I have no stake in what happens to this place. I do. I'd rather say that now than have you find out some other way.\"",
    },
    {
      type: "dialogue",
      id: "c13k-n9",
      speaker: "narrator",
      text: "It's the closest he's come to saying anything about the two of you outright, and neither of you pretends otherwise. He goes back to the poetry shelf before either of you has to figure out what comes next.",
    },
    {
      type: "dialogue",
      id: "c13k-n10",
      speaker: "narrator",
      text: "That night, closing up, you find the ledger has been moved again, this time with a page corner folded down at the exact section covering the shop's original ownership records from before Lila's time. Nothing torn, nothing missing. Just marked, like someone wants you to look there next.",
      background: "shop-interior-evening",
    },
    {
      type: "dialogue",
      id: "c13k-n11",
      speaker: "narrator",
      text: "Two incidents now, both timed close to something involving Thorne. It's starting to feel less like coincidence and more like someone's trying to tell you something they don't want to say out loud.",
    },
  ],
};
