import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 12 — "A Quiet Understanding" (KAI ROUTE)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 3A.
 *
 * First route-specific chapter. Kai admits the library-book notes were
 * half for Lila, half hoping the player would find them someday. Ren
 * still appears in the shop this chapter (he doesn't vanish just because
 * the route locked) but the scene belongs to Kai.
 */
export const chapter12Kai: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 12,
  title: "A Quiet Understanding",
  act: 3,
  route: "kai",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c12k-n1",
      speaker: "narrator",
      text: "Ren takes the news the way you expected him to: a long look, a short nod, and a box of day-old croissants left on the counter without comment before he heads out to make his morning deliveries. Nothing dramatic. Just a door closing somewhere quiet, and another one, somewhere else, staying open.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c12k-n2",
      speaker: "narrator",
      text: "Kai doesn't say anything about it either, not directly. But he shows up earlier than usual, and he brings his own mug instead of using one of the shop's, which is somehow the thing that convinces you this is real.",
    },
    {
      type: "dialogue",
      id: "c12k-n3",
      speaker: "kai",
      emotion: "neutral",
      text: "\"I've been thinking about the notes.\" He says it to the poetry shelf, not to you, hands stilling on a spine he's already straightened once. \"The ones in the library books. Before you ask, no, I didn't only leave those for Lila.\"",
    },
    {
      type: "dialogue",
      id: "c12k-n4",
      speaker: "narrator",
      text: "You wait. He turns around when the silence stretches past comfortable, like he'd rather say the rest to your face than the shelf's.",
    },
    {
      type: "dialogue",
      id: "c12k-n5",
      speaker: "kai",
      emotion: "serious",
      text: "\"The first ones were for her. She'd underline something in a margin, I'd write back in the next one she picked up, and it turned into this whole conversation neither of us ever had out loud.\" A pause. \"Somewhere in the last year, I started leaving them for whoever might find them next. I told myself that was still just Lila. It wasn't, by the end.\"",
    },
    {
      type: "dialogue",
      id: "c12k-n6",
      speaker: "kai",
      text: "\"I knew she was sick longer than most people. I think some part of me was already writing to you before I had a reason to.\"",
    },
    {
      type: "choice",
      id: "c12k-c1",
      prompt: "That's a lot to say out loud for him. How do you respond?",
      options: [
        {
          id: "meetHonesty",
          text: "\"I found three of them before I ever met you. I used to wonder about the handwriting.\"",
          affectionDelta: { kai: 4 },
          setsFlag: "ch12KaiMetHonesty",
        },
        {
          id: "giveSpace",
          text: "Let the quiet sit for a moment instead of filling it. \"Thank you for telling me.\"",
          affectionDelta: { kai: 2 },
          setsFlag: "ch12KaiGaveSpace",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c12k-n7a",
      speaker: "kai",
      emotion: "happy",
      text: "Something in his shoulders lets go that you hadn't noticed was held there. \"Three. Which ones.\" He's already crossing to the shelf again, like he means to go find them. \"I want to know which ones you kept.\"",
      requiresFlag: "ch12KaiMetHonesty",
    },
    {
      type: "dialogue",
      id: "c12k-n7b",
      speaker: "kai",
      emotion: "neutral",
      text: "He nods slowly, like he wasn't sure what he expected but it wasn't quite this. \"Okay.\" A small, private almost-smile. \"That's fair. I know that was a lot for a Tuesday morning.\"",
      requiresFlag: "ch12KaiGaveSpace",
    },
    {
      type: "dialogue",
      id: "c12k-n8",
      speaker: "narrator",
      text: "The bell rings. A customer, then two more, the shop filling with the ordinary noise of a Tuesday that doesn't know anything important just happened in it. Kai goes back to the register like nothing's different, except for the way he catches your eye once, halfway through ringing someone up, just to make sure you're still there.",
    },
    {
      type: "dialogue",
      id: "c12k-n9",
      speaker: "narrator",
      text: "Later, closing alone, you find a folded scrap tucked between two poetry collections that weren't shelved together yesterday. No name. Just a line copied out in Kai's careful handwriting, and underneath it, for the first time, an actual question instead of another quiet observation.",
      background: "shop-interior-evening",
    },
  ],
};
