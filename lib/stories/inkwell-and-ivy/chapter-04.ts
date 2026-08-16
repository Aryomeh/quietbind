import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 4 — "Lila's Ledger"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 1.
 * Player finds Lila's ledger full of cryptic marginal notes. Introduces
 * Priya, who fills in town history. Also the first mystery-layer
 * touchpoint (Thread 1): an anonymous note turns up in a returned book.
 * First ad-gated chapter (Ch. 4+ per platform convention).
 */
export const chapter04: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 4,
  title: "Lila's Ledger",
  act: 1,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c4-n1",
      speaker: "narrator",
      text: "The register drawer sticks the same way the front door does, which is how you find the ledger — wedged behind it, jammed there long enough that the leather cover has taken on the drawer's shape.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c4-n2",
      speaker: "narrator",
      text: "Most of it is exactly what you'd expect. Delivery dates. A running note about the espresso machine's temperature drifting in cold weather. Something about the Talbot boy asking, three separate times, whether he could work the register.",
    },
    {
      type: "dialogue",
      id: "c4-n3",
      speaker: "narrator",
      text: "Then the entries start doing something else. \"K. — same page again.\" A few weeks later: \"R. brought the good ones today. Didn't tell him why I kept the last batch.\" No explanation attached to either. Lila clearly didn't think she'd need one.",
    },
    {
      type: "dialogue",
      id: "c4-n4",
      speaker: "priya",
      emotion: "happy",
      text: "\"If you're doing inventory, I want it on record that I saw the good vases first.\"",
    },
    {
      type: "dialogue",
      id: "c4-n5",
      speaker: "narrator",
      text: "A woman leans through the open door, an armful of flowers wrapped in newspaper, not waiting for an invitation to come further in.",
    },
    {
      type: "dialogue",
      id: "c4-n6",
      speaker: "priya",
      text: "\"Priya. Flower stall, next door, entirely too much opinion about how this counter should look.\" She sets the bundle down without asking. \"I've been dying for an excuse to come say hi properly. Funerals don't count.\"",
    },
    {
      type: "dialogue",
      id: "c4-n7",
      speaker: "narrator",
      text: "She says it easily, like she's decided in advance not to let the word sit heavy between you. You get the sense she's had practice deciding things like that.",
    },
    {
      type: "dialogue",
      id: "c4-n8",
      speaker: "priya",
      text: "\"I've known this shop longer than I've known most people in this town. Lila used to keep my stall in fresh water on the days I forgot. Least I can do is keep her counter from looking bare.\"",
    },
    {
      type: "dialogue",
      id: "c4-n9",
      speaker: "priya",
      emotion: "neutral",
      text: "She spots the ledger open on the counter and goes quiet for a second. \"Oh. She kept that going the whole time, huh.\"",
    },
    {
      type: "choice",
      id: "c4-c1",
      prompt: "You turn the ledger toward her.",
      options: [
        {
          id: "shareKai",
          text: "\"There's a line about Kai. 'Same page again.' Any idea what that means?\"",
          affectionDelta: { kai: 2 },
          setsFlag: "ch4LeanedKai",
        },
        {
          id: "shareRen",
          text: "\"There's one about Ren, too. 'Didn't tell him why I kept the last batch.'\"",
          affectionDelta: { ren: 2 },
          setsFlag: "ch4LeanedRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c4-n10a",
      speaker: "priya",
      emotion: "happy",
      text: "Priya's eyebrows go up, delighted. \"The poetry shelf thing. He'd bring in a book, she'd mark a page, he'd 'happen' to read it before he left. Went on for years. I don't think either of them ever called it anything.\"",
      requiresFlag: "ch4LeanedKai",
    },
    {
      type: "dialogue",
      id: "c4-n10b",
      speaker: "priya",
      emotion: "happy",
      text: "Priya laughs, but it's fonder than it is amused. \"Ren's family recipe. She'd only ever take the ugly, lopsided ones off his hands — said the good-looking batch was for paying customers. He never once questioned why she wanted the rejects.\"",
      requiresFlag: "ch4LeanedRen",
    },
    {
      type: "dialogue",
      id: "c4-n11",
      speaker: "priya",
      text: "\"She was doing something with both of them, in her own slow way. Never told me what. I don't think she planned to tell anyone.\"",
    },
    {
      type: "dialogue",
      id: "c4-n12",
      speaker: "narrator",
      text: "Later, alone, you're sorting through a stack of returned books when a folded slip of paper slides out from between the pages — not a bookmark, not anything that looks like it belongs to a customer.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c4-n13",
      speaker: "narrator",
      text: "Four words, in handwriting you don't recognize: *Ask about the ivy door.*",
    },
    {
      type: "dialogue",
      id: "c4-n14",
      speaker: "narrator",
      text: "There's no ivy door that you know of. You fold the note back up and put it in your pocket instead of the trash, for reasons you can't fully explain to yourself.",
    },
  ],
};
