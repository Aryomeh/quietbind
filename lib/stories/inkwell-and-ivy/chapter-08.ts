import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 8 — "The Locked Drawer"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 2.
 * Player finds a locked drawer in Lila's desk. No key yet, sets up a
 * small mystery beat. Mystery-thread touchpoint: a torn photo corner
 * hints at a second lock somewhere else.
 */
export const chapter08: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 8,
  title: "The Locked Drawer",
  act: 2,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c8-n1",
      speaker: "narrator",
      text: "You've been putting off the back office for two weeks now. Today you finally push the door open and start clearing a path through what Lila apparently never once threw away.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c8-n2",
      speaker: "narrator",
      text: "Under a stack of old ledgers and a box of receipts you find a writing desk, the rolltop kind, pushed so far into the corner it's practically part of the wall.",
    },
    {
      type: "dialogue",
      id: "c8-n3",
      speaker: "narrator",
      text: "Every drawer slides open easily except one. That one doesn't give at all, not even a rattle, and the rest of the desk is loose enough with age that the difference is impossible to miss.",
    },
    {
      type: "dialogue",
      id: "c8-n4",
      speaker: "narrator",
      text: "You try the ring of keys that came with the shop. None of them are close to the right shape. This lock is small and precise, more like something off a jewelry box than a piece of furniture.",
    },
    {
      type: "dialogue",
      id: "c8-n5",
      speaker: "narrator",
      text: "That's when you notice it: wedged in the seam where the drawer meets the frame, a torn corner of a photograph, poking out just enough to see. Pulling on it risks tearing it further, so you leave it where it is.",
    },
    {
      type: "dialogue",
      id: "c8-n6",
      speaker: "narrator",
      text: "You can't make out what's in the photo, just old paper gone soft at the edges the way photographs do after decades in a drawer nobody opens.",
    },
    {
      type: "choice",
      id: "c8-c1",
      prompt: "Someone should probably know about this.",
      options: [
        {
          id: "tellKai",
          text: "Mention it to Kai when he's next in. He knew this shop better than most.",
          affectionDelta: { kai: 2 },
          setsFlag: "ch8ToldKai",
        },
        {
          id: "tellRen",
          text: "Mention it to Ren instead. He'll want to help either way.",
          affectionDelta: { ren: 2 },
          setsFlag: "ch8ToldRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c8-n7a",
      speaker: "kai",
      emotion: "serious",
      text: "Kai goes quiet when you describe it, thinking. \"Lila mentioned a strongbox once. Family thing, passed down. I always assumed she meant something metaphorical.\" He glances toward the office. \"Maybe not.\"",
      requiresFlag: "ch8ToldKai",
    },
    {
      type: "dialogue",
      id: "c8-n7b",
      speaker: "ren",
      emotion: "happy",
      text: "Ren's whole face lights up in a way that has nothing to do with the actual seriousness of a locked drawer. \"We're basically detectives now. I want that on record.\" Then, quieter: \"But yeah. Let's figure out what she was keeping.\"",
      requiresFlag: "ch8ToldRen",
    },
    {
      type: "dialogue",
      id: "c8-n8",
      speaker: "narrator",
      text: "The drawer stays locked for now. But it stops being just an odd piece of furniture in the corner, and starts being something you're actually trying to solve, with someone who wants to solve it alongside you.",
    },
  ],
};
